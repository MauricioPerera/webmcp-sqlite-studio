import { WebMcpService } from '../core/webmcp-service';
import { eventBus } from '../core/event-bus';

export class ToolsInspector {
  private toolsContainer: HTMLElement;
  private logsContainer: HTMLElement;
  private service: WebMcpService;

  constructor(toolsContainer: HTMLElement, logsContainer: HTMLElement, service: WebMcpService) {
    this.toolsContainer = toolsContainer;
    this.logsContainer = logsContainer;
    this.service = service;
    this.init();
  }

  private init(): void {
    this.renderTools();
    this.renderLogs();

    eventBus.on('webmcp:tools_updated', () => this.renderTools());
    eventBus.on('webmcp:log', () => this.renderLogs());
    eventBus.on('webmcp:log_updated', () => this.renderLogs());
  }

  public renderTools(): void {
    const tools = this.service.getRegisteredTools();
    this.toolsContainer.innerHTML = '';

    if (tools.length === 0) {
      this.toolsContainer.innerHTML = '<div class="tree-empty">No tools registered</div>';
      return;
    }

    for (const tool of tools) {
      const card = document.createElement('div');
      card.className = 'tool-card';

      let paramsHtml = '';
      if (tool.parameters && tool.parameters.length > 0) {
        paramsHtml = `
          <div class="tool-params">
            ${tool.parameters.map(p => `
              <div class="param-tag">
                <span class="param-name">${p.name}</span>: <span class="param-type">${p.type}</span>
                ${p.required ? '<span class="req">*</span>' : ''}
              </div>
            `).join('')}
          </div>
        `;
      }

      card.innerHTML = `
        <div class="tool-header">
          <span class="tool-name">⚡ ${tool.name}</span>
          ${tool.readOnlyHint ? '<span class="badge ro">Read-Only</span>' : '<span class="badge rw">Read-Write</span>'}
        </div>
        <div class="tool-desc">${tool.description}</div>
        ${paramsHtml}
      `;

      this.toolsContainer.appendChild(card);
    }
  }

  public renderLogs(): void {
    const logs = this.service.getExecutionLogs();
    this.logsContainer.innerHTML = '';

    if (logs.length === 0) {
      this.logsContainer.innerHTML = '<div class="tree-empty">No WebMCP invocations recorded yet.</div>';
      return;
    }

    for (const log of logs.slice(0, 30)) {
      const item = document.createElement('div');
      item.className = `log-item log-${log.status}`;

      const time = new Date(log.timestamp).toLocaleTimeString();
      item.innerHTML = `
        <div class="log-top">
          <span class="log-badge ${log.status}">${log.status.toUpperCase()}</span>
          <span class="log-tool">${log.toolName}</span>
          <span class="log-time">${time} (${log.durationMs ?? 0}ms)</span>
        </div>
        <div class="log-args"><code>${JSON.stringify(log.args)}</code></div>
        ${log.error ? `<div class="log-err">${log.error}</div>` : ''}
      `;
      this.logsContainer.appendChild(item);
    }
  }
}
