import { z } from 'zod';
import { registerTool, supportsWebMcp, createWebMcpMock } from 'fastwebmcp';
import { SqliteEngine } from './sqlite-engine';
import { eventBus } from './event-bus';
import { WebMcpToolMetadata, WebMcpExecutionLog } from './types';

export class WebMcpService {
  private engine: SqliteEngine;
  private registeredTools: Map<string, {
    metadata: WebMcpToolMetadata;
    execute: (args: any) => Promise<any>;
    schema: z.ZodTypeAny;
  }> = new Map();
  private executionLogs: WebMcpExecutionLog[] = [];
  private isNativeSupported: boolean = false;

  constructor(engine: SqliteEngine) {
    this.engine = engine;
    this.initEnvironment();
    this.registerDatabaseTools();
    this.exposePublicBridge();
  }

  private initEnvironment(): void {
    this.isNativeSupported = supportsWebMcp();

    const globalObj: any = typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : {});
    const docObj: any = typeof document !== 'undefined' ? document : (globalObj.document || null);

    if (docObj && !docObj.modelContext) {
      const mock = createWebMcpMock();
      docObj.modelContext = mock.document.modelContext;
    }
  }

  public exposePublicBridge(): void {
    const globalObj: any = typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : {});
    const docObj: any = typeof document !== 'undefined' ? document : (globalObj.document || null);

    const existingDocContext = docObj?.modelContext || {};
    const existingWinContext = globalObj.modelContext || {};

    const bridge = {
      registerTool: existingDocContext.registerTool || existingWinContext.registerTool || (() => {}),
      unregisterTool: (name: string) => {
        this.registeredTools.delete(name);
        eventBus.emit('webmcp:tools_updated', this.getRegisteredTools());
      },
      getTools: () => this.getRegisteredTools(),
      listTools: () => this.getRegisteredTools(),
      hasTool: (name: string) => this.registeredTools.has(name),
      executeTool: async (name: string, args: Record<string, unknown> = {}) => {
        return await this.executeTool(name, args);
      },
    };

    if (docObj) {
      docObj.modelContext = Object.assign(existingDocContext, bridge);
    }
    globalObj.modelContext = Object.assign(existingWinContext, bridge);
    globalObj.webmcp = {
      getTools: () => this.getRegisteredTools(),
      executeTool: async (name: string, args: Record<string, unknown> = {}) => this.executeTool(name, args),
      invoke: async (name: string, args: Record<string, unknown> = {}) => this.executeTool(name, args),
    };
  }

  public getIsNativeSupported(): boolean {
    return this.isNativeSupported;
  }

  public getRegisteredTools(): WebMcpToolMetadata[] {
    return Array.from(this.registeredTools.values()).map(t => t.metadata);
  }

  public getToolMetadata(toolName: string): WebMcpToolMetadata | undefined {
    return this.registeredTools.get(toolName)?.metadata;
  }

  public getExecutionLogs(): WebMcpExecutionLog[] {
    return [...this.executionLogs];
  }

  public registerTool<T extends z.ZodTypeAny>(options: {
    name: string;
    description: string;
    inputSchema: T;
    execute: (args: z.infer<T>) => Promise<unknown>;
    parametersList: Array<{ name: string; type: string; description: string; required: boolean }>;
    readOnlyHint?: boolean;
  }): void {
    const { name, description, inputSchema, execute, parametersList, readOnlyHint } = options;

    registerTool({
      name,
      description,
      inputSchema,
      execute,
      annotations: {
        readOnlyHint: readOnlyHint ?? false,
      },
    });

    const metadata: WebMcpToolMetadata = {
      name,
      description,
      parameters: parametersList,
      readOnlyHint,
    };

    this.registeredTools.set(name, {
      metadata,
      execute,
      schema: inputSchema,
    });

    this.exposePublicBridge();
    eventBus.emit('webmcp:tools_updated', this.getRegisteredTools());
  }

  public async executeTool(toolName: string, args: Record<string, unknown> = {}): Promise<unknown> {
    const tool = this.registeredTools.get(toolName);
    if (!tool) {
      throw new Error(`WebMCP tool "${toolName}" is not registered.`);
    }

    const logId = Math.random().toString(36).substring(2, 9);
    const logEntry: WebMcpExecutionLog = {
      id: logId,
      toolName,
      timestamp: Date.now(),
      args,
      status: 'pending',
    };
    this.executionLogs.unshift(logEntry);
    eventBus.emit('webmcp:log', logEntry);

    const startTime = performance.now();
    try {
      const parsedArgs = tool.schema.parse(args);
      const result = await tool.execute(parsedArgs);
      const durationMs = Math.round((performance.now() - startTime) * 100) / 100;

      logEntry.status = 'success';
      logEntry.result = result;
      logEntry.durationMs = durationMs;

      eventBus.emit('webmcp:log_updated', logEntry);
      return result;
    } catch (err: any) {
      const durationMs = Math.round((performance.now() - startTime) * 100) / 100;
      logEntry.status = 'error';
      logEntry.error = err.message || String(err);
      logEntry.durationMs = durationMs;

      eventBus.emit('webmcp:log_updated', logEntry);
      throw err;
    }
  }

  private registerDatabaseTools(): void {
    // 1. db_query
    this.registerTool({
      name: 'db_query',
      description: 'Executes a read-only or analytical SQL query on the client-side SQLite database and returns structured rows and columns.',
      inputSchema: z.object({
        sql: z.string().describe('The SQL query string (e.g. SELECT * FROM users)'),
        params: z.array(z.any()).optional().describe('Optional parameter bindings'),
      }),
      parametersList: [
        { name: 'sql', type: 'string', description: 'SQL SELECT query', required: true },
        { name: 'params', type: 'array', description: 'Optional positional query parameters', required: false },
      ],
      readOnlyHint: true,
      execute: async ({ sql, params }) => {
        const res = this.engine.query(sql, params || []);
        eventBus.emit('db:query_executed', { sql, res });
        return res;
      },
    });

    // 2. db_execute
    this.registerTool({
      name: 'db_execute',
      description: 'Executes a DDL or DML SQL statement (CREATE TABLE, INSERT, UPDATE, DELETE, ALTER) on the SQLite database.',
      inputSchema: z.object({
        sql: z.string().describe('The SQL statement to execute'),
        params: z.array(z.any()).optional().describe('Optional parameter bindings'),
      }),
      parametersList: [
        { name: 'sql', type: 'string', description: 'DDL or DML SQL statement', required: true },
        { name: 'params', type: 'array', description: 'Optional positional statement parameters', required: false },
      ],
      readOnlyHint: false,
      execute: async ({ sql, params }) => {
        const res = this.engine.execute(sql, params || []);
        eventBus.emit('db:schema_changed');
        return res;
      },
    });

    // 3. db_get_schema
    this.registerTool({
      name: 'db_get_schema',
      description: 'Inspects the full database schema, returning all tables, views, columns, data types, primary keys, and current row counts.',
      inputSchema: z.object({}),
      parametersList: [],
      readOnlyHint: true,
      execute: async () => {
        return this.engine.getSchema();
      },
    });

    // 4. db_import_json
    this.registerTool({
      name: 'db_import_json',
      description: 'Imports an array of JSON objects into a SQLite table, optionally auto-creating the table based on inferred column types.',
      inputSchema: z.object({
        tableName: z.string().describe('Target table name'),
        data: z.array(z.record(z.string(), z.any())).describe('Array of row objects to insert'),
        autoCreateTable: z.boolean().optional().default(true).describe('Whether to automatically CREATE TABLE if it does not exist'),
      }),
      parametersList: [
        { name: 'tableName', type: 'string', description: 'Target table name', required: true },
        { name: 'data', type: 'array', description: 'Array of JSON row objects to import', required: true },
        { name: 'autoCreateTable', type: 'boolean', description: 'Automatically create table if missing', required: false },
      ],
      readOnlyHint: false,
      execute: async ({ tableName, data, autoCreateTable }) => {
        const res = this.engine.importJson(tableName, data, autoCreateTable);
        eventBus.emit('db:schema_changed');
        return res;
      },
    });

    // 5. db_export_json
    this.registerTool({
      name: 'db_export_json',
      description: 'Exports an entire table or custom SELECT query result as a JSON array of objects.',
      inputSchema: z.object({
        tableOrSql: z.string().describe('Table name or full SELECT query'),
      }),
      parametersList: [
        { name: 'tableOrSql', type: 'string', description: 'Table name or SELECT query', required: true },
      ],
      readOnlyHint: true,
      execute: async ({ tableOrSql }) => {
        return this.engine.exportJson(tableOrSql);
      },
    });

    // 6. db_export_sql
    this.registerTool({
      name: 'db_export_sql',
      description: 'Generates a complete, portable SQL dump containing DDL CREATE TABLE statements and DML INSERT statements for all tables.',
      inputSchema: z.object({}),
      parametersList: [],
      readOnlyHint: true,
      execute: async () => {
        const dump = this.engine.exportSqlDump();
        return {
          dump,
          sizeBytes: new TextEncoder().encode(dump).length,
        };
      },
    });

    // 7. db_table_preview
    this.registerTool({
      name: 'db_table_preview',
      description: 'Fetches a paginated preview of records from a specific table with configurable limit and offset.',
      inputSchema: z.object({
        tableName: z.string().describe('Name of the table to preview'),
        limit: z.number().optional().default(50).describe('Maximum number of rows to return'),
        offset: z.number().optional().default(0).describe('Number of rows to skip'),
      }),
      parametersList: [
        { name: 'tableName', type: 'string', description: 'Table name', required: true },
        { name: 'limit', type: 'number', description: 'Maximum rows (default 50)', required: false },
        { name: 'offset', type: 'number', description: 'Row offset (default 0)', required: false },
      ],
      readOnlyHint: true,
      execute: async ({ tableName, limit, offset }) => {
        return this.engine.tablePreview(tableName, limit, offset);
      },
    });
  }
}
