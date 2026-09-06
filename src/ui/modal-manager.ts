import { SqliteEngine } from '../core/sqlite-engine';
import { eventBus } from '../core/event-bus';

export class ModalManager {
  private engine: SqliteEngine;

  constructor(engine: SqliteEngine) {
    this.engine = engine;
    this.setupListeners();
  }

  private setupListeners(): void {
    const importBtn = document.getElementById('btn-import-modal');
    const exportDumpBtn = document.getElementById('btn-export-sql');
    const exportDbBtn = document.getElementById('btn-export-db');
    const resetDbBtn = document.getElementById('btn-reset-db');

    const modal = document.getElementById('import-modal') as HTMLElement;
    const closeModalBtn = document.getElementById('close-import-modal');
    const executeImportBtn = document.getElementById('btn-do-import');

    importBtn?.addEventListener('click', () => {
      modal.style.display = 'flex';
    });

    closeModalBtn?.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    executeImportBtn?.addEventListener('click', () => {
      const tableName = (document.getElementById('import-table-name') as HTMLInputElement)?.value.trim() || 'imported_data';
      const jsonText = (document.getElementById('import-json-data') as HTMLTextAreaElement)?.value.trim();
      const autoCreate = (document.getElementById('import-auto-create') as HTMLInputElement)?.checked ?? true;

      if (!jsonText) {
        alert('Please paste JSON data or array to import.');
        return;
      }

      try {
        let parsed = JSON.parse(jsonText);
        if (!Array.isArray(parsed)) {
          parsed = [parsed];
        }

        const res = this.engine.importJson(tableName, parsed, autoCreate);
        alert(res.message);
        modal.style.display = 'none';
        eventBus.emit('db:schema_changed');
        eventBus.emit('ui:table_selected', tableName);
      } catch (err: any) {
        alert('Import Failed: ' + (err.message || String(err)));
      }
    });

    exportDumpBtn?.addEventListener('click', () => {
      const dump = this.engine.exportSqlDump();
      this.downloadFile(dump, 'database_dump.sql', 'text/plain');
    });

    exportDbBtn?.addEventListener('click', () => {
      const binary = this.engine.exportBinary();
      const blob = new Blob([binary.buffer as ArrayBuffer], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'database.sqlite';
      a.click();
      URL.revokeObjectURL(url);
    });

    resetDbBtn?.addEventListener('click', () => {
      if (confirm('Reset database to default sample dataset? Current tables will be re-seeded.')) {
        this.engine.seedInitialData();
        eventBus.emit('db:schema_changed');
        alert('Database re-seeded successfully.');
      }
    });
  }

  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}
