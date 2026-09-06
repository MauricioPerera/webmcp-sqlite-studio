---
type: 'Architecture'
title: 'Visión General de la Arquitectura WebMCP SQLite Studio'
description: 'Arquitectura estática cliente-side de base de datos relacional impulsada por SQLite WASM y WebMCP.'
tags: ['okf', 'architecture', 'sqlite', 'wasm', 'webmcp']
version: '1.0.0'
author: 'Mauricio Perera'
created: '2026-09-06'
updated: '2026-09-06'
---

# Visión General de la Arquitectura

WebMCP SQLite Studio es un entorno de base de datos relacional y servidor WebMCP autónomo que opera 100% en el navegador del cliente.

## Pilares Fundamentales
1. **Motor SQLite WASM (`sql.js`)**: Núcleo oficial de SQLite compilado en WebAssembly, ejecutado en memoria y con transacciones ACID completas.
2. **Servidor WebMCP (`fastwebmcp`)**: Catálogo de 7 herramientas nativas expuestas en `document.modelContext` para que los agentes de IA ejecuten queries, creen esquemas e importen datos.
3. **Entorno Visual de Estudio**: Explorador de esquemas, editor SQL con resaltado, visor tabular de datos y herramientas de importación/exportación.
