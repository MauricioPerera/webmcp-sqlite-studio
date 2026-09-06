---
type: 'Data Model'
title: 'Modelo de Datos de Base de Datos y Consultas'
description: 'Estructuras de datos para resultados de consultas, esquemas de tablas y definiciones de columnas.'
tags: ['okf', 'data_model', 'sqlite', 'schema', 'query']
version: '1.0.0'
author: 'Mauricio Perera'
created: '2026-09-06'
updated: '2026-09-06'
---

# Modelo de Datos de Base de Datos y Consultas

Define las estructuras TypeScript que representan los esquemas y resultados de ejecución:

```typescript
export interface ColumnInfo {
  cid: number;
  name: string;
  type: string;
  notnull: boolean;
  dflt_value: any;
  pk: boolean;
}

export interface TableSchema {
  name: string;
  type: 'table' | 'view';
  columns: ColumnInfo[];
  rowCount: number;
  sql: string;
}

export interface QueryResult {
  columns: string[];
  values: any[][];
  rowCount: number;
  durationMs: number;
}

export interface ExecuteResult {
  rowsAffected: number;
  lastInsertRowId: number;
  durationMs: number;
}
```

## Relaciones
- Integrado en [sqlite-engine-contract.md](../contracts/sqlite-engine-contract.md).
- Utilizado por las herramientas descritas en [tool-definition.md](tool-definition.md).
