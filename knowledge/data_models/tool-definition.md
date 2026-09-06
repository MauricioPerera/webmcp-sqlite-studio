---
type: 'Data Model'
title: 'Definición de Herramientas WebMCP'
description: 'Metadatos, esquemas Zod y firmas de las herramientas WebMCP expuestas en SQLite Studio.'
tags: ['okf', 'data_model', 'webmcp', 'tools', 'schema']
version: '1.0.0'
author: 'Mauricio Perera'
created: '2026-09-06'
updated: '2026-09-06'
---

# Definición de Herramientas WebMCP

Estructura de metadatos de las 7 herramientas expuestas por `WebMcpService`:
- `db_query`
- `db_execute`
- `db_get_schema`
- `db_import_json`
- `db_export_json`
- `db_export_sql`
- `db_table_preview`

## Relaciones
- Implementado en [webmcp-contract.md](../contracts/webmcp-contract.md).
