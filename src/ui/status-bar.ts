import { WebMcpService } from '../core/webmcp-service';
import { SqliteEngine } from '../core/sqlite-engine';
import { eventBus } from '../core/event-bus';

export class StatusBar {
  private container: HTMLElement;
  private service: WebMcpService;
  private engine: SqliteEngine;

  constructor(container: HTMLElement, service: WebMcpService, engine: SqliteEngine) {
    this.container = container;
    this.service = service;
    this.engine = engine;
    this.init();
  }

  private init(): void {
    this.render();
    eventBus.on('db:schema_changed', () => this.render());
    eventBus.on('webmcp:tools_updated', () => this.render());
  }

  public render(): void {
    const schema = this.engine.getSchema();
    const tools = this.service.getRegisteredTools();
    const native = this.service.getIsNativeSupported() ? 'Native W3C' : 'Polyfilled Bridge';

    this.container.innerHTML = `
      <div class="status-group">
        <span class="status-item"><span class="status-dot online"></span> SQLite WASM (In-Memory)</span>
        <span class="status-item">Tables: <strong>${schema.totalTables}</strong></span>
        <span class="status-item">Views: <strong>${schema.totalViews}</strong></span>
      </div>
      <div class="status-group">
        <span class="status-item" title="Available on window.modelContext & document.modelContext">
          ⚡ WebMCP: <strong>${tools.length} Tools</strong> (${native})
        </span>
        <span class="status-item trilogy-links">
          <a href="https://mauricioperera.github.io/mockaroo-webmcp/" target="_blank" rel="noopener">Mockaroo</a> •
          <a href="https://mauricioperera.github.io/webmcp-code-studio/" target="_blank" rel="noopener">Code Studio</a> •
          <span class="active-app">SQLite Studio</span>
        </span>
      </div>
    `;
  }
}
