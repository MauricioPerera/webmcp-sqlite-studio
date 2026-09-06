---
type: 'Task Contract'
title: 'Contrato de Implementacion del Motor SQLite WASM'
description: 'Especificacion y oraculo congelado para el motor SQLite 100% client-side basado en sql.js.'
tags: ['ccdd', 'sqlite', 'wasm', 'contract']
task: 'sqlite_core_engine'
intent: 'Proveer un motor relacional SQLite completo ejecutado via WebAssembly en el navegador con soporte de queries, DDL, transacciones e introspeccion'
target: 'src/core/sqlite-engine.ts'
signature: 'export class SqliteEngine'
test_command: 'npm test'
budget:
  cyclomatic_max: 18
tests: 'tests/sqlite.test.ts'
tests_sha256: 'fff129acfb0f85bae02d5f2c8a6b76ac3b6328885980b85b3422f87d5f042645'
touch_only: ['src/core/sqlite-engine.ts']
deps_allowed: ['sql.js']
forbids: ['child_process', 'fs']
---

## Intent
Implementar y mantener el motor de base de datos relacional client-side basado en SQLite compilado a WebAssembly (sql.js), asegurando soporte para ejecucion de consultas SQL analiticas, sentencias DDL/DML, introspeccion automatica de esquemas, importacion/exportacion en lote de JSON, volcados SQL portables y persistencia binaria.

## Interface
El modulo expone la clase `SqliteEngine` con metodos publicos:
- `init(existingBinary?: Uint8Array): Promise<void>`
- `getDatabase(): Database`
- `seedInitialData(): void`
- `query(sql: string, params?: any[]): QueryResult`
- `execute(sql: string, params?: any[]): ExecuteResult`
- `getSchema(): DatabaseSchema`
- `importJson(tableName: string, data: Record<string, any>[], autoCreateTable?: boolean): ImportJsonResult`
- `exportJson(tableOrSql: string): Record<string, any>[]`
- `exportSqlDump(): string`
- `exportBinary(): Uint8Array`
- `tablePreview(tableName: string, limit?: number, offset?: number): QueryResult`

## Invariants
1. El motor SQLite opera 100% en memoria en el navegador sin backend.
2. Todas las operaciones DDL y DML son atomicas mediante transacciones cuando se importan lotes.
3. La introspeccion de esquema incluye tablas, vistas, tipos de columnas y claves primarias.
4. El volcado SQL generado es portable y compatible con cualquier motor SQLite estandar.

## Examples
- **Ejemplo 1 (Consulta Analitica):**
  ```ts
  const res = engine.query('SELECT role, COUNT(*) as total FROM users GROUP BY role;');
  console.log(res.rows);
  ```
- **Ejemplo 2 (Importacion JSON):**
  ```ts
  engine.importJson('inventory', [{ id: 1, item: 'Keyboard', price: 49.99 }]);
  ```

## Do / Don't
- **DO:** Emplear transacciones explicitas (BEGIN/COMMIT) en inserciones masivas para maximizar rendimiento.
- **DO:** Escapar y sanitizar nombres de identificadores al generar esquemas y dumps.
- **DON'T:** Realizar peticiones HTTP para procesar consultas SQL; todo debe procesarse localmente.
- **DON'T:** Mutar la base de datos sin notificar al EventBus cuando opere integrado con la UI.

## Tests
El oraculo formal de pruebas esta congelado bajo el archivo [tests/sqlite.test.ts](../../tests/sqlite.test.ts) y verificado por el hash SHA-256 declarado en el Frontmatter.

## Constraints
- PARAR y reportar si se intenta ejecutar SQLite fuera del entorno cliente WebAssembly.
- Preservar compatibilidad estricta con navegadores modernos mediante sql.js.
- Complejidad ciclomatica acotada al presupuesto declarado en `budget.cyclomatic_max`.
