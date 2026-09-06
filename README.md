# WebMCP SQLite Studio 🗄️⚡

> 100% Client-Side In-Memory Relational Database Studio with Native W3C WebMCP Agent Tools powered by `sql.js` (WebAssembly) & `fastwebmcp`.

[![Deploy to GitHub Pages](https://github.com/MauricioPerera/webmcp-sqlite-studio/actions/workflows/deploy.yml/badge.svg)](https://github.com/MauricioPerera/webmcp-sqlite-studio/actions/workflows/deploy.yml)
[![W3C WebMCP Standard](https://img.shields.io/badge/WebMCP-W3C%20Draft-blue.svg)](https://github.com/modelcontextprotocol)
[![KDD Level 1](https://img.shields.io/badge/KDD-Level%201%20Certified-success.svg)](./knowledge/)

**WebMCP SQLite Studio** is the third installment in the browser-native static trilogy. It delivers a full-featured SQLite database engine directly in the browser with zero servers, zero containers, and zero external database dependencies.

---

## 🚀 Live Application
Access the production application directly:
👉 **[https://mauricioperera.github.io/webmcp-sqlite-studio/](https://mauricioperera.github.io/webmcp-sqlite-studio/)**

---

## ⚡ The WebMCP Browser Trilogy

1. **[Mockaroo Static WebMCP](https://mauricioperera.github.io/mockaroo-webmcp/)**: Autonomous Synthetic Data Generator.
2. **[WebMCP Code Studio](https://mauricioperera.github.io/webmcp-code-studio/)**: Client-Side IDE with VFS, Git VCS, and Unix Shell.
3. **[WebMCP SQLite Studio](https://mauricioperera.github.io/webmcp-sqlite-studio/)**: Client-Side Relational Database with 7 Agent Tools.

---

## 🛠️ The 7 Native WebMCP Database Tools

Exposed on both `window.modelContext` and `document.modelContext`:

| Tool | Mode | Description |
| :--- | :---: | :--- |
| `db_query` | Read | Executes analytical SQL queries and returns columns, rows, and execution time. |
| `db_execute` | Write | Executes DDL or DML SQL statements (`CREATE TABLE`, `INSERT`, `UPDATE`, `DELETE`). |
| `db_get_schema` | Read | Introspects tables, views, columns, data types, primary keys, and row counts. |
| `db_import_json` | Write | Imports JSON arrays into SQLite tables with automatic type inference. |
| `db_export_json` | Read | Exports tables or custom SELECT queries as JSON arrays. |
| `db_export_sql` | Read | Generates portable SQL dumps (`CREATE TABLE` + `INSERT` statements). |
| `db_table_preview` | Read | Fetches paginated previews with configurable `limit` and `offset`. |

---

## 🏛️ Knowledge-Driven Development (KDD Level 1)

This project strictly adheres to KDD Level 1 with:
- **CCDD Task Contracts**: `knowledge/contracts/sqlite-engine-contract.md` & `knowledge/contracts/webmcp-contract.md` with frozen SHA-256 test oracles.
- **OKF Knowledge Graph**: Markdown documentation in `knowledge/` covering architecture and data models.
- **Deterministic Validation**: Automated CI gate verifying contract hashes, OKF schemas, and ASCII compliance.

---

## 📦 Local Development

```bash
# Clone the repository
git clone https://github.com/MauricioPerera/webmcp-sqlite-studio.git
cd webmcp-sqlite-studio

# Install dependencies
npm install

# Run KDD validation
npm run kdd:validate

# Start development server
npm run dev
```

---

## 📄 License
MIT License &copy; 2026 Mauricio Perera & WebMCP Community.
