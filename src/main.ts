import { SqliteEngine } from './core/sqlite-engine';
import { WebMcpService } from './core/webmcp-service';
import { SchemaTree } from './ui/schema-tree';
import { QueryEditor } from './ui/query-editor';
import { DataGrid } from './ui/data-grid';
import { StatusBar } from './ui/status-bar';
import { ToolsInspector } from './ui/tools-inspector';
import { ModalManager } from './ui/modal-manager';

async function bootstrap() {
  console.log('Initializing WebMCP SQLite Studio...');

  // 1. Initialize SQLite WASM Engine
  const engine = new SqliteEngine();
  await engine.init();

  // 2. Initialize WebMCP Service
  const webmcpService = new WebMcpService(engine);

  // 3. Mount UI Components
  const schemaRoot = document.getElementById('schema-tree-root') as HTMLElement;
  const schemaTree = new SchemaTree(schemaRoot, engine);
  schemaTree.refresh();

  const queryInput = document.getElementById('sql-query-input') as HTMLTextAreaElement;
  const runBtnTop = document.getElementById('btn-run-top') as HTMLButtonElement;
  const queryEditor = new QueryEditor(queryInput, runBtnTop, engine);

  const gridRoot = document.getElementById('data-grid-root') as HTMLElement;
  const metaRoot = document.getElementById('results-meta') as HTMLElement;
  const jsonRoot = document.getElementById('json-results-root') as HTMLElement;
  new DataGrid(gridRoot, metaRoot, jsonRoot);

  const statusBarRoot = document.getElementById('status-bar-root') as HTMLElement;
  new StatusBar(statusBarRoot, webmcpService, engine);

  const toolsRoot = document.getElementById('webmcp-tools-root') as HTMLElement;
  const logsRoot = document.getElementById('webmcp-logs-root') as HTMLElement;
  new ToolsInspector(toolsRoot, logsRoot, webmcpService);

  new ModalManager(engine);

  // Setup Sidebar Tabs
  document.querySelectorAll('.sidebar-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-tab').forEach((t) => t.classList.remove('active'));
      document.querySelectorAll('.sidebar-panel').forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      if (targetId) {
        document.getElementById(targetId)?.classList.add('active');
      }
    });
  });

  // Setup Results Tabs
  document.querySelectorAll('.results-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.results-tab').forEach((t) => t.classList.remove('active'));
      document.querySelectorAll('.results-view').forEach((v) => v.classList.remove('active'));

      tab.classList.add('active');
      const targetView = tab.getAttribute('data-view');
      if (targetView) {
        document.getElementById(targetView)?.classList.add('active');
      }
    });
  });

  // Setup Snippets
  document.querySelectorAll('.snippet-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sql = btn.getAttribute('data-sql');
      if (sql) {
        queryEditor.setQuery(sql);
        queryEditor.executeCurrentQuery();
      }
    });
  });

  // Clear query button
  document.getElementById('btn-clear-query')?.addEventListener('click', () => {
    queryEditor.setQuery('');
  });

  // Run initial query to showcase live data
  queryEditor.setQuery('SELECT * FROM users;');
  queryEditor.executeCurrentQuery();

  console.log('WebMCP SQLite Studio ready! Available tools on window.modelContext:', webmcpService.getRegisteredTools().map(t => t.name));
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap WebMCP SQLite Studio:', err);
});
