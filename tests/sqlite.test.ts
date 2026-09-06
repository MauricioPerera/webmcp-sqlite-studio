import { describe, it, expect, beforeEach } from 'vitest';
import { SqliteEngine } from '../src/core/sqlite-engine';

describe('SqliteEngine WASM Core', () => {
  let engine: SqliteEngine;

  beforeEach(async () => {
    engine = new SqliteEngine();
    await engine.init();
  });

  it('initializes and seeds default tables', () => {
    const schema = engine.getSchema();
    expect(schema.totalTables).toBeGreaterThanOrEqual(2);
    const tableNames = schema.tables.map(t => t.name);
    expect(tableNames).toContain('users');
    expect(tableNames).toContain('projects');
  });

  it('queries data with rows and columns structure', () => {
    const res = engine.query('SELECT name, role FROM users ORDER BY id ASC;');
    expect(res.columns).toEqual(['name', 'role']);
    expect(res.rowCount).toBe(3);
    expect(res.rows[0].name).toBe('Ada Lovelace');
    expect(res.rows[0].role).toBe('architect');
    expect(res.executionTimeMs).toBeGreaterThanOrEqual(0);
  });

  it('handles parameterized queries', () => {
    const res = engine.query('SELECT title, budget FROM projects WHERE status = ?;', ['active']);
    expect(res.rowCount).toBe(3);
    expect(res.rows.every(r => typeof r.budget === 'number')).toBe(true);
  });

  it('executes DML statements and returns affected rows', () => {
    const insertRes = engine.execute(
      'INSERT INTO users (name, email, role) VALUES (?, ?, ?);',
      ['Claude Shannon', 'claude@bell.labs', 'information_theorist']
    );
    expect(insertRes.success).toBe(true);
    expect(insertRes.rowsAffected).toBe(1);

    const updateRes = engine.execute(
      'UPDATE users SET role = ? WHERE email = ?;',
      ['pioneer', 'claude@bell.labs']
    );
    expect(updateRes.rowsAffected).toBe(1);

    const check = engine.query('SELECT role FROM users WHERE email = ?;', ['claude@bell.labs']);
    expect(check.rows[0].role).toBe('pioneer');
  });

  it('introspects database schema accurately', () => {
    const schema = engine.getSchema();
    const usersTable = schema.tables.find(t => t.name === 'users');
    expect(usersTable).toBeDefined();
    expect(usersTable?.columns.some(c => c.name === 'id' && c.pk)).toBe(true);
    expect(usersTable?.columns.some(c => c.name === 'email' && c.notnull)).toBe(true);
    expect(usersTable?.rowCount).toBe(3);
  });

  it('imports JSON array and auto-creates table', () => {
    const mockData = [
      { id: 101, product: 'Quantum Processor', price: 999.99, in_stock: 1 },
      { id: 102, product: 'Neural Accelerator', price: 499.50, in_stock: 1 },
      { id: 103, product: 'Optical Bus', price: 149.00, in_stock: 0 }
    ];

    const result = engine.importJson('inventory', mockData, true);
    expect(result.success).toBe(true);
    expect(result.rowsImported).toBe(3);

    const check = engine.query('SELECT * FROM inventory ORDER BY id ASC;');
    expect(check.rowCount).toBe(3);
    expect(check.rows[0].product).toBe('Quantum Processor');
    expect(check.rows[0].price).toBe(999.99);
  });

  it('exports table or custom query as JSON', () => {
    const jsonExport = engine.exportJson('SELECT name, email FROM users ORDER BY id ASC LIMIT 2;');
    expect(jsonExport).toHaveLength(2);
    expect(jsonExport[0]).toHaveProperty('name', 'Ada Lovelace');
    expect(jsonExport[1]).toHaveProperty('name', 'Alan Turing');
  });

  it('generates full SQL dump with DDL and INSERT statements', () => {
    const dump = engine.exportSqlDump();
    expect(dump).toContain('-- SQLite Studio Dump');
    expect(dump).toContain('CREATE TABLE');
    expect(dump).toContain('INSERT INTO "users"');
    expect(dump).toContain('Ada Lovelace');
    expect(dump).toContain('COMMIT;');
  });

  it('exports and rehydrates binary database state', async () => {
    engine.execute('CREATE TABLE cache (k TEXT, v TEXT);');
    engine.execute('INSERT INTO cache VALUES ("session", "active_123");');

    const binary = engine.exportBinary();
    expect(binary).toBeInstanceOf(Uint8Array);
    expect(binary.length).toBeGreaterThan(0);

    const rehydratedEngine = new SqliteEngine();
    await rehydratedEngine.init(binary);

    const res = rehydratedEngine.query('SELECT v FROM cache WHERE k = "session";');
    expect(res.rowCount).toBe(1);
    expect(res.rows[0].v).toBe('active_123');
  });

  it('previews table rows with pagination', () => {
    const preview = engine.tablePreview('projects', 2, 1);
    expect(preview.rowCount).toBe(2);
    expect(preview.rows[0].title).toBe('Enigma Solver Core');
  });
});
