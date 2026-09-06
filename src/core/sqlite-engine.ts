import initSqlJs, { Database, SqlJsStatic } from 'sql.js';

export interface QueryResult {
  columns: string[];
  values: any[][];
  rows: Record<string, any>[];
  rowCount: number;
  executionTimeMs: number;
}

export interface ExecuteResult {
  success: boolean;
  rowsAffected: number;
  executionTimeMs: number;
  message?: string;
}

export interface TableColumn {
  cid: number;
  name: string;
  type: string;
  notnull: boolean;
  dflt_value: any;
  pk: boolean;
}

export interface TableSchema {
  name: string;
  type: 'table' | 'view';
  sql: string;
  columns: TableColumn[];
  rowCount: number;
}

export interface DatabaseSchema {
  tables: TableSchema[];
  views: TableSchema[];
  totalTables: number;
  totalViews: number;
}

export interface ImportJsonResult {
  success: boolean;
  tableName: string;
  rowsImported: number;
  message: string;
}

export class SqliteEngine {
  private SQL: SqlJsStatic | null = null;
  private db: Database | null = null;
  private wasmPath: string;

  constructor(wasmPath?: string) {
    this.wasmPath = wasmPath || '';
  }

  public async init(existingBinary?: Uint8Array): Promise<void> {
    if (!this.SQL) {
      this.SQL = await initSqlJs({
        locateFile: (file: string) => {
          if (this.wasmPath) {
            return this.wasmPath;
          }
          if (typeof window !== 'undefined') {
            const base = (import.meta as any).env?.BASE_URL || '/';
            return `${base}${file}`;
          }
          // Node.js environment
          const path = require('path');
          return path.join(process.cwd(), 'public', file);
        }
      });
    }

    if (existingBinary) {
      this.db = new this.SQL.Database(existingBinary);
    } else {
      this.db = new this.SQL.Database();
      this.seedInitialData();
    }
  }

  public getDatabase(): Database {
    if (!this.db) {
      throw new Error('SQLite database is not initialized. Call init() first.');
    }
    return this.db;
  }

  public seedInitialData(): void {
    if (!this.db) return;
    const seedSql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role TEXT DEFAULT 'developer',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        title TEXT NOT NULL,
        status TEXT DEFAULT 'active',
        budget REAL DEFAULT 0.0,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );

      INSERT INTO users (name, email, role) VALUES
        ('Ada Lovelace', 'ada@computing.org', 'architect'),
        ('Alan Turing', 'alan@bletchley.uk', 'lead_cryptanalyst'),
        ('Grace Hopper', 'grace@navy.mil', 'compiler_engineer');

      INSERT INTO projects (user_id, title, status, budget) VALUES
        (1, 'Analytical Engine Program', 'active', 15000.50),
        (2, 'Enigma Solver Core', 'completed', 42000.00),
        (3, 'COBOL Standard Specification', 'active', 28500.75),
        (1, 'Bernoulli Numbers Table', 'active', 5500.00);
    `;
    this.db.exec(seedSql);
  }

  public query(sql: string, params: any[] = []): QueryResult {
    const db = this.getDatabase();
    const start = performance.now();
    try {
      const res = db.exec(sql, params);
      const executionTimeMs = Math.round((performance.now() - start) * 100) / 100;

      if (!res || res.length === 0) {
        return {
          columns: [],
          values: [],
          rows: [],
          rowCount: 0,
          executionTimeMs
        };
      }

      // Return the result of the last select query in case of multiple statements
      const lastResult = res[res.length - 1];
      const columns = lastResult.columns;
      const values = lastResult.values;
      const rows = values.map((row: any[]) => {
        const item: Record<string, any> = {};
        columns.forEach((col, idx) => {
          item[col] = row[idx];
        });
        return item;
      });

      return {
        columns,
        values,
        rows,
        rowCount: rows.length,
        executionTimeMs
      };
    } catch (err: any) {
      throw new Error(`SQL Query Error: ${err.message || String(err)}`);
    }
  }

  public execute(sql: string, params: any[] = []): ExecuteResult {
    const db = this.getDatabase();
    const start = performance.now();
    try {
      db.run(sql, params);
      const rowsAffected = db.getRowsModified();
      const executionTimeMs = Math.round((performance.now() - start) * 100) / 100;

      return {
        success: true,
        rowsAffected,
        executionTimeMs,
        message: `Statement executed successfully. Rows modified: ${rowsAffected}`
      };
    } catch (err: any) {
      throw new Error(`SQL Execute Error: ${err.message || String(err)}`);
    }
  }

  public getSchema(): DatabaseSchema {
    const db = this.getDatabase();
    const masterQuery = `
      SELECT type, name, sql 
      FROM sqlite_master 
      WHERE type IN ('table', 'view') AND name NOT LIKE 'sqlite_%'
      ORDER BY type, name;
    `;
    const res = db.exec(masterQuery);
    const tables: TableSchema[] = [];
    const views: TableSchema[] = [];

    if (res.length > 0) {
      const rows = res[0].values;
      for (const row of rows) {
        const type = row[0] as 'table' | 'view';
        const name = row[1] as string;
        const sql = (row[2] as string) || '';

        // Query columns via PRAGMA table_info
        const pragmaRes = db.exec(`PRAGMA table_info("${name}");`);
        const columns: TableColumn[] = [];
        if (pragmaRes.length > 0) {
          for (const c of pragmaRes[0].values) {
            columns.push({
              cid: Number(c[0]),
              name: String(c[1]),
              type: String(c[2] || 'TEXT'),
              notnull: Boolean(c[3]),
              dflt_value: c[4],
              pk: Boolean(c[5])
            });
          }
        }

        // Count rows
        let rowCount = 0;
        try {
          const countRes = db.exec(`SELECT COUNT(*) FROM "${name}";`);
          if (countRes.length > 0 && countRes[0].values.length > 0) {
            rowCount = Number(countRes[0].values[0][0]);
          }
        } catch {
          rowCount = 0;
        }

        const schemaEntry: TableSchema = {
          name,
          type,
          sql,
          columns,
          rowCount
        };

        if (type === 'table') {
          tables.push(schemaEntry);
        } else {
          views.push(schemaEntry);
        }
      }
    }

    return {
      tables,
      views,
      totalTables: tables.length,
      totalViews: views.length
    };
  }

  public importJson(tableName: string, data: Record<string, any>[], autoCreateTable = true): ImportJsonResult {
    const db = this.getDatabase();
    if (!Array.isArray(data) || data.length === 0) {
      return {
        success: false,
        tableName,
        rowsImported: 0,
        message: 'No records provided to import'
      };
    }

    const cleanTableName = tableName.replace(/[^a-zA-Z0-9_]/g, '_');
    const firstRow = data[0];
    const columns = Object.keys(firstRow);

    if (columns.length === 0) {
      throw new Error('Data records have no columns');
    }

    if (autoCreateTable) {
      const colDefs = columns.map(col => {
        const sampleVal = firstRow[col];
        let colType = 'TEXT';
        if (typeof sampleVal === 'number') {
          colType = Number.isInteger(sampleVal) ? 'INTEGER' : 'REAL';
        } else if (typeof sampleVal === 'boolean') {
          colType = 'INTEGER';
        }
        return `"${col}" ${colType}`;
      });

      const createSql = `CREATE TABLE IF NOT EXISTS "${cleanTableName}" (${colDefs.join(', ')});`;
      db.exec(createSql);
    }

    // Insert batch using transaction
    const placeholders = columns.map(() => '?').join(', ');
    const insertSql = `INSERT INTO "${cleanTableName}" (${columns.map(c => `"${c}"`).join(', ')}) VALUES (${placeholders});`;

    db.exec('BEGIN TRANSACTION;');
    try {
      const stmt = db.prepare(insertSql);
      for (const row of data) {
        const values = columns.map(col => {
          const val = row[col];
          if (val === undefined || val === null) return null;
          if (typeof val === 'boolean') return val ? 1 : 0;
          if (typeof val === 'object') return JSON.stringify(val);
          return val;
        });
        stmt.run(values);
      }
      stmt.free();
      db.exec('COMMIT;');

      return {
        success: true,
        tableName: cleanTableName,
        rowsImported: data.length,
        message: `Successfully imported ${data.length} records into table "${cleanTableName}"`
      };
    } catch (err: any) {
      db.exec('ROLLBACK;');
      throw new Error(`Failed to import JSON: ${err.message || String(err)}`);
    }
  }

  public exportJson(tableOrSql: string): Record<string, any>[] {
    const trimmed = tableOrSql.trim();
    const sql = trimmed.toUpperCase().startsWith('SELECT') || trimmed.toUpperCase().startsWith('WITH')
      ? trimmed
      : `SELECT * FROM "${trimmed}";`;

    const res = this.query(sql);
    return res.rows;
  }

  public exportSqlDump(): string {
    const schema = this.getSchema();
    const lines: string[] = [
      '-- SQLite Studio Dump',
      `-- Exported At: ${new Date().toISOString()}`,
      '-- Engine: SQLite WASM (Client-Side)',
      '',
      'PRAGMA foreign_keys=OFF;',
      'BEGIN TRANSACTION;'
    ];

    for (const table of schema.tables) {
      lines.push('');
      lines.push(`-- Table: ${table.name}`);
      lines.push(`${table.sql};`);

      const queryRes = this.query(`SELECT * FROM "${table.name}";`);
      if (queryRes.rows.length > 0) {
        const cols = queryRes.columns.map(c => `"${c}"`).join(', ');
        for (const row of queryRes.values) {
          const formattedVals = row.map(val => {
            if (val === null || val === undefined) return 'NULL';
            if (typeof val === 'number') return String(val);
            if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
            return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
          }).join(', ');
          lines.push(`INSERT INTO "${table.name}" (${cols}) VALUES (${formattedVals});`);
        }
      }
    }

    for (const view of schema.views) {
      lines.push('');
      lines.push(`-- View: ${view.name}`);
      lines.push(`${view.sql};`);
    }

    lines.push('');
    lines.push('COMMIT;');
    return lines.join('\n');
  }

  public exportBinary(): Uint8Array {
    const db = this.getDatabase();
    return db.export();
  }

  public tablePreview(tableName: string, limit = 50, offset = 0): QueryResult {
    const clean = tableName.replace(/[^a-zA-Z0-9_]/g, '');
    const sql = `SELECT * FROM "${clean}" LIMIT ${Math.max(1, limit)} OFFSET ${Math.max(0, offset)};`;
    return this.query(sql);
  }
}
