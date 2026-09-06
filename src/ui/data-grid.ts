import { QueryResult } from '../core/sqlite-engine';
import { eventBus } from '../core/event-bus';

export class DataGrid {
  private tableContainer: HTMLElement;
  private metaContainer: HTMLElement;
  private jsonContainer: HTMLElement;

  constructor(tableContainer: HTMLElement, metaContainer: HTMLElement, jsonContainer: HTMLElement) {
    this.tableContainer = tableContainer;
    this.metaContainer = metaContainer;
    this.jsonContainer = jsonContainer;
    this.listenEvents();
  }

  private listenEvents(): void {
    eventBus.on<{ sql: string; res: QueryResult }>('query:result', ({ sql, res }) => {
      this.renderResults(res, sql);
    });

    eventBus.on<{ sql: string; res: any }>('execute:result', ({ sql, res }) => {
      this.renderExecuteMessage(res, sql);
    });

    eventBus.on<{ sql: string; error: string }>('query:error', ({ sql, error }) => {
      this.renderError(error, sql);
    });
  }

  public renderResults(result: QueryResult, _sql: string): void {
    this.metaContainer.innerHTML = `
      <span class="badge success">✓ Success</span>
      <span class="meta-item">Rows: <strong>${result.rowCount}</strong></span>
      <span class="meta-item">Columns: <strong>${result.columns.length}</strong></span>
      <span class="meta-item">Time: <strong>${result.executionTimeMs} ms</strong></span>
    `;

    // Render JSON tab
    this.jsonContainer.textContent = JSON.stringify(result.rows, null, 2);

    if (result.columns.length === 0 || result.rowCount === 0) {
      this.tableContainer.innerHTML = `
        <div class="grid-empty">
          <p>Query executed successfully with 0 rows returned.</p>
        </div>
      `;
      return;
    }

    let tableHtml = '<table class="data-table"><thead><tr>';
    tableHtml += '<th class="row-num">#</th>';
    for (const col of result.columns) {
      tableHtml += `<th>${this.escapeHtml(col)}</th>`;
    }
    tableHtml += '</tr></thead><tbody>';

    result.values.forEach((row, idx) => {
      tableHtml += `<tr><td class="row-num">${idx + 1}</td>`;
      for (const val of row) {
        const formatted = val === null || val === undefined ? '<span class="null-val">NULL</span>' : this.escapeHtml(String(val));
        tableHtml += `<td title="${this.escapeHtml(String(val ?? ''))}">${formatted}</td>`;
      }
      tableHtml += '</tr>';
    });

    tableHtml += '</tbody></table>';
    this.tableContainer.innerHTML = tableHtml;
  }

  public renderExecuteMessage(result: any, sql: string): void {
    this.metaContainer.innerHTML = `
      <span class="badge success">✓ Executed</span>
      <span class="meta-item">Rows Modified: <strong>${result.rowsAffected}</strong></span>
      <span class="meta-item">Time: <strong>${result.executionTimeMs} ms</strong></span>
    `;
    this.tableContainer.innerHTML = `
      <div class="grid-message success">
        <h3>Statement Executed Successfully</h3>
        <p>${this.escapeHtml(result.message || '')}</p>
        <code>${this.escapeHtml(sql)}</code>
      </div>
    `;
    this.jsonContainer.textContent = JSON.stringify(result, null, 2);
  }

  public renderError(error: string, sql: string): void {
    this.metaContainer.innerHTML = `
      <span class="badge error">✗ SQL Error</span>
    `;
    this.tableContainer.innerHTML = `
      <div class="grid-message error">
        <h3>SQL Error</h3>
        <p>${this.escapeHtml(error)}</p>
        <code>${this.escapeHtml(sql)}</code>
      </div>
    `;
    this.jsonContainer.textContent = JSON.stringify({ error, sql }, null, 2);
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
