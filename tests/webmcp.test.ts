import { describe, it, expect, beforeEach } from 'vitest';
import { SqliteEngine } from '../src/core/sqlite-engine';
import { WebMcpService } from '../src/core/webmcp-service';

describe('WebMCP Database Tools Specification', () => {
  let engine: SqliteEngine;
  let service: WebMcpService;

  beforeEach(async () => {
    engine = new SqliteEngine();
    await engine.init();
    service = new WebMcpService(engine);
  });

  it('registers all 7 database tools with correct metadata', () => {
    const tools = service.getRegisteredTools();
    expect(tools).toHaveLength(7);

    const toolNames = tools.map(t => t.name);
    expect(toolNames).toContain('db_query');
    expect(toolNames).toContain('db_execute');
    expect(toolNames).toContain('db_get_schema');
    expect(toolNames).toContain('db_import_json');
    expect(toolNames).toContain('db_export_json');
    expect(toolNames).toContain('db_export_sql');
    expect(toolNames).toContain('db_table_preview');
  });

  it('executes db_query via WebMCP bridge', async () => {
    const res: any = await service.executeTool('db_query', {
      sql: 'SELECT name, email FROM users ORDER BY id ASC LIMIT 1;'
    });

    expect(res.columns).toEqual(['name', 'email']);
    expect(res.rowCount).toBe(1);
    expect(res.rows[0].name).toBe('Ada Lovelace');
    expect(res.rows[0].email).toBe('ada@computing.org');
  });

  it('executes db_execute to create and populate table', async () => {
    const createRes: any = await service.executeTool('db_execute', {
      sql: 'CREATE TABLE audit_log (id INTEGER PRIMARY KEY, action TEXT);'
    });
    expect(createRes.success).toBe(true);

    const insertRes: any = await service.executeTool('db_execute', {
      sql: 'INSERT INTO audit_log (action) VALUES (?);',
      params: ['login_success']
    });
    expect(insertRes.rowsAffected).toBe(1);

    const check: any = await service.executeTool('db_query', {
      sql: 'SELECT action FROM audit_log;'
    });
    expect(check.rowCount).toBe(1);
    expect(check.rows[0].action).toBe('login_success');
  });

  it('fetches full schema via db_get_schema', async () => {
    const schema: any = await service.executeTool('db_get_schema', {});
    expect(schema.totalTables).toBeGreaterThanOrEqual(2);
    const usersTable = schema.tables.find((t: any) => t.name === 'users');
    expect(usersTable).toBeDefined();
    expect(usersTable.columns.length).toBeGreaterThanOrEqual(4);
  });

  it('imports JSON array and auto-creates table via db_import_json', async () => {
    const records = [
      { order_id: 'ORD-001', customer: 'Alice Cooper', total: 125.50, items: 3 },
      { order_id: 'ORD-002', customer: 'Bob Marley', total: 89.90, items: 1 }
    ];

    const importRes: any = await service.executeTool('db_import_json', {
      tableName: 'orders',
      data: records,
      autoCreateTable: true
    });

    expect(importRes.success).toBe(true);
    expect(importRes.rowsImported).toBe(2);

    const check: any = await service.executeTool('db_query', {
      sql: 'SELECT customer, total FROM orders ORDER BY order_id ASC;'
    });
    expect(check.rowCount).toBe(2);
    expect(check.rows[0].customer).toBe('Alice Cooper');
    expect(check.rows[0].total).toBe(125.50);
  });

  it('exports table as JSON via db_export_json', async () => {
    const exportRes: any = await service.executeTool('db_export_json', {
      tableOrSql: 'users'
    });
    expect(Array.isArray(exportRes)).toBe(true);
    expect(exportRes.length).toBeGreaterThanOrEqual(3);
    expect(exportRes[0]).toHaveProperty('name');
  });

  it('exports SQL dump via db_export_sql', async () => {
    const dumpRes: any = await service.executeTool('db_export_sql', {});
    expect(dumpRes).toHaveProperty('dump');
    expect(dumpRes.dump).toContain('CREATE TABLE');
    expect(dumpRes.dump).toContain('INSERT INTO "users"');
    expect(dumpRes.sizeBytes).toBeGreaterThan(100);
  });

  it('previews table with db_table_preview', async () => {
    const previewRes: any = await service.executeTool('db_table_preview', {
      tableName: 'users',
      limit: 2,
      offset: 0
    });
    expect(previewRes.rowCount).toBe(2);
    expect(previewRes.rows[0].name).toBe('Ada Lovelace');
  });

  it('records execution logs for all tool invocations', async () => {
    await service.executeTool('db_query', { sql: 'SELECT 1 AS alive;' });
    const logs = service.getExecutionLogs();
    expect(logs.length).toBeGreaterThanOrEqual(1);
    expect(logs[0].toolName).toBe('db_query');
    expect(logs[0].status).toBe('success');
    expect(logs[0].durationMs).toBeGreaterThanOrEqual(0);
  });
});
