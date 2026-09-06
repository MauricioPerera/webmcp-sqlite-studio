import { SqliteEngine } from '../core/sqlite-engine';
import { eventBus } from '../core/event-bus';

export class QueryEditor {
  private textarea: HTMLTextAreaElement;
  private runBtn: HTMLButtonElement;
  private engine: SqliteEngine;

  constructor(textarea: HTMLTextAreaElement, runBtn: HTMLButtonElement, engine: SqliteEngine) {
    this.textarea = textarea;
    this.runBtn = runBtn;
    this.engine = engine;
    this.init();
  }

  private init(): void {
    this.runBtn.addEventListener('click', () => this.executeCurrentQuery());

    this.textarea.addEventListener('keydown', (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        this.executeCurrentQuery();
      }
    });

    eventBus.on<string>('ui:table_selected', (tableName) => {
      this.textarea.value = `SELECT * FROM "${tableName}" LIMIT 50;`;
      this.executeCurrentQuery();
    });
  }

  public setQuery(sql: string): void {
    this.textarea.value = sql;
  }

  public getQuery(): string {
    return this.textarea.value.trim();
  }

  public executeCurrentQuery(): void {
    const sql = this.getQuery();
    if (!sql) return;

    try {
      // Check if query is SELECT or DDL/DML
      const upper = sql.toUpperCase().trim();
      if (upper.startsWith('SELECT') || upper.startsWith('PRAGMA') || upper.startsWith('EXPLAIN') || upper.startsWith('WITH')) {
        const res = this.engine.query(sql);
        eventBus.emit('query:result', { sql, res });
      } else {
        const res = this.engine.execute(sql);
        eventBus.emit('execute:result', { sql, res });
        eventBus.emit('db:schema_changed');
      }
    } catch (err: any) {
      eventBus.emit('query:error', { sql, error: err.message || String(err) });
    }
  }
}
