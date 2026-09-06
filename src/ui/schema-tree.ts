import { SqliteEngine, TableSchema } from '../core/sqlite-engine';
import { eventBus } from '../core/event-bus';

export class SchemaTree {
  private container: HTMLElement;
  private engine: SqliteEngine;

  constructor(container: HTMLElement, engine: SqliteEngine) {
    this.container = container;
    this.engine = engine;
    this.listenEvents();
  }

  private listenEvents(): void {
    eventBus.on('db:schema_changed', () => this.refresh());
  }

  public refresh(): void {
    const schema = this.engine.getSchema();
    this.container.innerHTML = '';

    const tablesHeader = document.createElement('div');
    tablesHeader.className = 'tree-section-header';
    tablesHeader.innerHTML = `<span>TABLES (${schema.totalTables})</span>`;
    this.container.appendChild(tablesHeader);

    if (schema.tables.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'tree-empty';
      empty.textContent = 'No tables yet';
      this.container.appendChild(empty);
    } else {
      for (const table of schema.tables) {
        this.renderTableNode(table);
      }
    }

    if (schema.views.length > 0) {
      const viewsHeader = document.createElement('div');
      viewsHeader.className = 'tree-section-header';
      viewsHeader.innerHTML = `<span>VIEWS (${schema.totalViews})</span>`;
      this.container.appendChild(viewsHeader);

      for (const view of schema.views) {
        this.renderTableNode(view);
      }
    }
  }

  private renderTableNode(table: TableSchema): void {
    const node = document.createElement('div');
    node.className = 'tree-node';

    const header = document.createElement('div');
    header.className = 'tree-node-header';
    header.innerHTML = `
      <span class="tree-icon">${table.type === 'table' ? '📊' : '👁️'}</span>
      <span class="tree-name" title="${table.name}">${table.name}</span>
      <span class="tree-badge">${table.rowCount}</span>
    `;

    const colsContainer = document.createElement('div');
    colsContainer.className = 'tree-columns-list';
    colsContainer.style.display = 'none';

    for (const col of table.columns) {
      const colEl = document.createElement('div');
      colEl.className = 'tree-column-item';
      colEl.innerHTML = `
        <span class="col-pk">${col.pk ? '🔑' : '•'}</span>
        <span class="col-name">${col.name}</span>
        <span class="col-type">${col.type}</span>
      `;
      colsContainer.appendChild(colEl);
    }

    header.addEventListener('click', () => {
      const isOpen = colsContainer.style.display === 'block';
      colsContainer.style.display = isOpen ? 'none' : 'block';
      eventBus.emit('ui:table_selected', table.name);
    });

    node.appendChild(header);
    node.appendChild(colsContainer);
    this.container.appendChild(node);
  }
}
