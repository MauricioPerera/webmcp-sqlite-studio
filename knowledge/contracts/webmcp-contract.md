---
type: 'Task Contract'
title: 'Contrato de Herramientas WebMCP para SQLite'
description: 'Especificacion y oraculo congelado para las 7 herramientas nativas WebMCP de base de datos.'
tags: ['ccdd', 'webmcp', 'database', 'contract']
task: 'webmcp_db_tools'
intent: 'Exponer 7 herramientas estandar WebMCP sobre document.modelContext y window.modelContext para interactuar con SQLite'
target: 'src/core/webmcp-service.ts'
signature: 'export class WebMcpService'
test_command: 'npm test'
budget:
  cyclomatic_max: 18
tests: 'tests/webmcp.test.ts'
tests_sha256: 'faf232e514376fb8e21357d8108c7198659df475aed7463a8291c1f32cfda024'
touch_only: ['src/core/webmcp-service.ts']
deps_allowed: ['fastwebmcp', 'zod']
forbids: ['child_process', 'fs']
---

## Intent
Definir y registrar las 7 herramientas estandar WebMCP para bases de datos cliente (`db_query`, `db_execute`, `db_get_schema`, `db_import_json`, `db_export_json`, `db_export_sql`, `db_table_preview`), exponiendolas a agentes de IA mediante el estandar W3C / WebMCP en `document.modelContext` y `window.modelContext`.

## Interface
El modulo expone la clase `WebMcpService` con metodos publicos:
- `getRegisteredTools(): WebMcpToolMetadata[]`
- `getToolMetadata(toolName: string): WebMcpToolMetadata | undefined`
- `getExecutionLogs(): WebMcpExecutionLog[]`
- `executeTool(toolName: string, args?: Record<string, unknown>): Promise<unknown>`
- `registerTool(options: any): void`
- `exposePublicBridge(): void`

## Invariants
1. El catalogo contiene exactamente 7 herramientas estandar con sus esquemas Zod rigurosos.
2. Cada ejecucion de herramienta registra traza con id unico, duracion en milisegundos y estatus.
3. Las herramientas se sincronizan bidireccionalmente con `window.modelContext` y `document.modelContext`.
4. El puente publico permite la interaccion tanto de agentes headless (Puppeteer/DevTools) como extensiones de navegador.

## Examples
- **Ejemplo 1 (Invocacion de Consulta):**
  ```js
  const result = await window.modelContext.executeTool('db_query', {
    sql: 'SELECT * FROM users LIMIT 5;'
  });
  ```
- **Ejemplo 2 (Importacion Masiva):**
  ```js
  await window.modelContext.executeTool('db_import_json', {
    tableName: 'metrics',
    data: [{ metric: 'cpu', val: 0.45 }]
  });
  ```

## Do / Don't
- **DO:** Validar minuciosamente los argumentos de entrada contra el esquema Zod antes de la ejecucion.
- **DO:** Asignar `readOnlyHint: true` a herramientas de solo lectura (`db_query`, `db_get_schema`, etc.).
- **DON'T:** Omitir el registro de errores en el log de ejecuciones.
- **DON'T:** Bloquear el hilo principal si una sentencia es rechazada por SQLite.

## Tests
El oraculo formal de pruebas esta congelado bajo el archivo [tests/webmcp.test.ts](../../tests/webmcp.test.ts) y verificado por el hash SHA-256 declarado en el Frontmatter.

## Constraints
- PARAR y reportar si se altera la firma o esquema de las 7 herramientas WebMCP base.
- Integracion obligatoria con la biblioteca estandar fastwebmcp.
- Complejidad ciclomatica acotada al presupuesto declarado en `budget.cyclomatic_max`.
