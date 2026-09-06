// Internationalization (i18n) dictionary for WebMCP SQLite Studio Landing Page

export type Language = 'es' | 'en' | 'pt';

export interface TranslationData {
  nav: {
    whatIs: string;
    tools: string;
    advantages: string;
    howTo: string;
    useCases: string;
    faq: string;
    openStudio: string;
  };
  hero: {
    pill: string;
    title: string;
    subtitle: string;
    ctaStudioTitle: string;
    ctaStudioDesc: string;
    ctaCodeTitle: string;
    ctaCodeDesc: string;
    ctaMockarooTitle: string;
    ctaMockarooDesc: string;
    capZeroInstall: string;
    capPrivate: string;
    capZeroCost: string;
    capSpeed: string;
  };
  showcase: {
    windowTitle: string;
    wasmBadge: string;
    queryPrompt: string;
    metaExecution: string;
    colName: string;
    colRole: string;
    colProject: string;
    colBudget: string;
  };
  paradigm: {
    tag: string;
    title: string;
    subtitle: string;
    oldBadge: string;
    oldTitle: string;
    oldItem1: string;
    oldItem2: string;
    oldItem3: string;
    oldItem4: string;
    newBadge: string;
    newTitle: string;
    newItem1: string;
    newItem2: string;
    newItem3: string;
    newItem4: string;
  };
  toolsSection: {
    tag: string;
    title: string;
    subtitle: string;
    tool1Name: string;
    tool1Desc: string;
    tool2Name: string;
    tool2Desc: string;
    tool3Name: string;
    tool3Desc: string;
    tool4Name: string;
    tool4Desc: string;
    tool5Name: string;
    tool5Desc: string;
    tool6Name: string;
    tool6Desc: string;
    tool7Name: string;
    tool7Desc: string;
    ctaRunInStudio: string;
  };
  comparison: {
    tag: string;
    title: string;
    subtitle: string;
    colFeature: string;
    colCloudDb: string;
    colDesktopGui: string;
    colSheets: string;
    colWebmcp: string;
    rowStart: string;
    rowStartCloud: string;
    rowStartDesktop: string;
    rowStartSheets: string;
    rowStartWebmcp: string;
    rowCost: string;
    rowCostCloud: string;
    rowCostDesktop: string;
    rowCostSheets: string;
    rowCostWebmcp: string;
    rowPrivacy: string;
    rowPrivacyCloud: string;
    rowPrivacyDesktop: string;
    rowPrivacySheets: string;
    rowPrivacyWebmcp: string;
    rowSpeed: string;
    rowSpeedCloud: string;
    rowSpeedDesktop: string;
    rowSpeedSheets: string;
    rowSpeedWebmcp: string;
    rowAi: string;
    rowAiCloud: string;
    rowAiDesktop: string;
    rowAiSheets: string;
    rowAiWebmcp: string;
    rowExport: string;
    rowExportCloud: string;
    rowExportDesktop: string;
    rowExportSheets: string;
    rowExportWebmcp: string;
  };
  howTo: {
    tag: string;
    title: string;
    subtitle: string;
    step1Num: string;
    step1Title: string;
    step1Desc: string;
    step2Num: string;
    step2Title: string;
    step2Desc: string;
    step3Num: string;
    step3Title: string;
    step3Desc: string;
  };
  roles: {
    tag: string;
    title: string;
    subtitle: string;
    tabAnalyst: string;
    tabData: string;
    tabEdu: string;
    tabDev: string;
    keyPointsLabel: string;
    analystTitle: string;
    analystQuote: string;
    analystP1: string;
    analystP2: string;
    analystP3: string;
    analystBenefitLabel: string;
    analystBenefitValue: string;
    dataTitle: string;
    dataQuote: string;
    dataP1: string;
    dataP2: string;
    dataP3: string;
    dataBenefitLabel: string;
    dataBenefitValue: string;
    eduTitle: string;
    eduQuote: string;
    eduP1: string;
    eduP2: string;
    eduP3: string;
    eduBenefitLabel: string;
    eduBenefitValue: string;
    devTitle: string;
    devQuote: string;
    devP1: string;
    devP2: string;
    devP3: string;
    devBenefitLabel: string;
    devBenefitValue: string;
  };
  faq: {
    tag: string;
    title: string;
    subtitle: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
  };
  bottomCta: {
    title: string;
    subtitle: string;
    btnStudio: string;
    btnCodeStudio: string;
    btnMockaroo: string;
  };
  footer: {
    text: string;
    copy: string;
    trilogyTitle: string;
    trilogyStudio: string;
    trilogyCode: string;
    trilogyMockaroo: string;
    resourcesTitle: string;
    resSqliteDocs: string;
    resW3c: string;
    resLlms: string;
    resGithub: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationData> = {
  es: {
    nav: {
      whatIs: "¿Qué es SQLite Studio?",
      tools: "Herramientas WebMCP (7)",
      advantages: "Ventajas vs Cloud",
      howTo: "Cómo Usar",
      useCases: "Casos de Uso",
      faq: "Preguntas",
      openStudio: "Abrir SQLite Studio",
    },
    hero: {
      pill: "Base de Datos Relacional WebAssembly • 100% In-Browser",
      title: "Tu base de datos SQL completa, veloz y privada. <br class=\"desktop-only\" /><span class=\"gradient-text\">Directamente en tu navegador.</span>",
      subtitle: "Impulsada por SQLite 3 y WebAssembly. Sin servidores que configurar, sin cobros sorpresa en la nube y con 7 herramientas nativas WebMCP para que los Agentes de IA interactúen con tus datos al instante.",
      ctaStudioTitle: "Abrir WebMCP SQLite Studio",
      ctaStudioDesc: "Editor SQL interactivo, visor de tablas y servidor WebMCP",
      ctaCodeTitle: "WebMCP Code Studio",
      ctaCodeDesc: "IDE web completo con VFS y terminal Unix",
      ctaMockarooTitle: "Mockaroo WebMCP",
      ctaMockarooDesc: "Generador de datos sintéticos y mocks",
      capZeroInstall: "<strong>0 Instalación:</strong> Abre el navegador y ejecuta SQL en 1 segundo",
      capPrivate: "<strong>100% Privado:</strong> Tus tablas y datos nunca salen de tu máquina",
      capZeroCost: "<strong>$0 Costo:</strong> Sin facturas mensuales de AWS, Supabase o Neon",
      capSpeed: "<strong>Ultra Rápido:</strong> Consultas en memoria en <1 ms (WASM)",
    },
    showcase: {
      windowTitle: "sqlite-wasm-studio -- In-Memory Engine",
      wasmBadge: "⚡ WASM SQLite 3.45 • 0.42 ms",
      queryPrompt: "Consulta SQL Relacional (JOIN con Agregación):",
      metaExecution: "4 filas devueltas en 0.42 ms (WASM) • Memoria: 1.2 MB",
      colName: "Usuario",
      colRole: "Rol",
      colProject: "Proyecto Activo",
      colBudget: "Presupuesto",
    },
    paradigm: {
      tag: "EL CAMBIO DE PARADIGMA",
      title: "¿Por qué una Base de Datos en el Navegador cambia el juego?",
      subtitle: "Hasta hoy, trabajar con bases de datos SQL requería configurar servidores remotos, lidiar con credenciales, pagar suscripciones y arriesgar la privacidad de tus datos sensibles.",
      oldBadge: "El Enfoque Tradicional en la Nube",
      oldTitle: "Antes: Complejidad, Costos y Fuga de Datos",
      oldItem1: "❌ <strong>Configuración tediosa:</strong> Levantar contenedores Docker, abrir puertos o configurar cadenas de conexión con contraseñas.",
      oldItem2: "❌ <strong>Facturas recurrentes:</strong> Pagar mensualmente por instancias DBaaS que cobran por cómputo, almacenamiento y ancho de banda.",
      oldItem3: "❌ <strong>Riesgo de privacidad:</strong> Subir información confidencial de clientes, finanzas o inventarios a servidores de terceros.",
      oldItem4: "❌ <strong>Latencia de red:</strong> Cada consulta debe viajar por internet hasta un centro de datos lejano antes de mostrar resultados.",
      newBadge: "La Revolución WebMCP SQLite (Local-First)",
      newTitle: "Ahora: SQLite 3 WASM 100% en tu Dispositivo",
      newItem1: "✅ <strong>Cero instalación y cero fricción:</strong> Entras al enlace y tienes un motor SQL completo listo para usar en 1 segundo.",
      newItem2: "✅ <strong>Privacidad absoluta (Zero-Knowledge):</strong> Tus datos viven exclusivamente en la memoria de tu navegador; nada viaja a ningún servidor.",
      newItem3: "✅ <strong>Velocidad sub-milisegundo:</strong> Consultas procesadas directamente en tu CPU mediante WebAssembly a velocidades de microsegundos.",
      newItem4: "✅ <strong>Agentes de IA habilitados:</strong> 7 herramientas nativas WebMCP para que asistentes como Claude, GPT o Gemini consulten y gestionen datos.",
    },
    toolsSection: {
      tag: "ESTÁNDAR WEBMCP (7 HERRAMIENTAS CLIENTE)",
      title: "Poder Relacional Nativo para Agentes de Inteligencia Artificial",
      subtitle: "WebMCP SQLite Studio implementa el protocolo W3C WebMCP para exponer una suite integral de operaciones SQL que cualquier agente o script puede invocar de forma segura.",
      tool1Name: "db_query",
      tool1Desc: "Ejecuta consultas SQL SELECT y analíticas con resultados estructurados, conteo de filas y tiempo de ejecución en milisegundos.",
      tool2Name: "db_execute",
      tool2Desc: "Ejecuta sentencias DDL y DML (CREATE TABLE, INSERT, UPDATE, DELETE, ALTER) con transacciones seguras.",
      tool3Name: "db_get_schema",
      tool3Desc: "Inspecciona el esquema completo: tablas, vistas, columnas, tipos de datos, llaves primarias y conteo de filas.",
      tool4Name: "db_import_json",
      tool4Desc: "Ingiere arreglos JSON con inferencia automática de esquemas y tipos de datos (INTEGER, REAL, TEXT).",
      tool5Name: "db_export_json",
      tool5Desc: "Extrae cualquier consulta o tabla completa en formato JSON estructurado listo para el razonamiento de LLMs.",
      tool6Name: "db_export_sql",
      tool6Desc: "Genera un volcado SQL portable completo con sentencias DDL CREATE TABLE y DML INSERT para todas las tablas.",
      tool7Name: "db_table_preview",
      tool7Desc: "Obtiene una vista previa paginada de registros de una tabla con límite y desplazamiento configurables.",
      ctaRunInStudio: "Probar en SQLite Studio",
    },
    comparison: {
      tag: "TABLA COMPARATIVA",
      title: "WebMCP SQLite Studio vs Otras Alternativas",
      subtitle: "Compara objetivamente cómo se posiciona nuestra solución frente a servidores cloud, programas de escritorio y hojas de cálculo.",
      colFeature: "Característica",
      colCloudDb: "Bases Cloud (Supabase/RDS)",
      colDesktopGui: "Apps Desktop (DBeaver)",
      colSheets: "Hojas de Cálculo (Airtable/Excel)",
      colWebmcp: "WebMCP SQLite Studio",
      rowStart: "Tiempo de Inicio",
      rowStartCloud: "Minutos (Crear cuenta, cluster)",
      rowStartDesktop: "10-20 min (Descarga 200MB, Java)",
      rowStartSheets: "1-2 min (Registro web)",
      rowStartWebmcp: "⚡ 1 segundo (Solo abre la web)",
      rowCost: "Costo Mensual",
      rowCostCloud: "$15 a $100+ USD / mes",
      rowCostDesktop: "Gratis a $199 USD (licencia)",
      rowCostSheets: "$10 a $45 USD / usuario",
      rowCostWebmcp: "🎉 $0.00 (Gratis y Libre)",
      rowPrivacy: "Privacidad de Datos",
      rowPrivacyCloud: "En servidores de terceros",
      rowPrivacyDesktop: "Local en tu equipo",
      rowPrivacySheets: "En la nube de la empresa",
      rowPrivacyWebmcp: "🔒 100% Local en Navegador",
      rowSpeed: "Latencia de Consulta",
      rowSpeedCloud: "50 - 250 ms (Latencia de red)",
      rowSpeedDesktop: "Variable según conexión",
      rowSpeedSheets: "Lento con >10,000 filas",
      rowSpeedWebmcp: "🚀 < 1 ms (WASM en memoria)",
      rowAi: "Herramientas para IA (MCP)",
      rowAiCloud: "Requiere proxies y API keys",
      rowAiDesktop: "No diseñado para agentes web",
      rowAiSheets: "Plugins limitados y costosos",
      rowAiWebmcp: "🤖 7 Herramientas Nativas WebMCP",
      rowExport: "Exportación y Portabilidad",
      rowExportCloud: "Dumps SQL complejos",
      rowExportDesktop: "Exportación local",
      rowExportSheets: "Solo CSV / XLSX planos",
      rowExportWebmcp: "📦 SQL Dump + .sqlite Binario",
    },
    howTo: {
      tag: "PASO A PASO",
      title: "¿Cómo empezar en 3 simples pasos?",
      subtitle: "No necesitas ser programador ni administrador de bases de datos para aprovechar el poder de SQL.",
      step1Num: "01",
      step1Title: "Abre el Studio y Carga tus Datos",
      step1Desc: "Entra a SQLite Studio. Puedes usar la base de datos preconfigurada de usuarios y proyectos, o pegar un arreglo JSON para que el sistema cree las tablas automáticamente.",
      step2Num: "02",
      step2Title: "Ejecuta Consultas o Conecta tu Agente IA",
      step2Desc: "Escribe consultas SQL como SELECT, JOINs o agregaciones con ayuda de los snippets rápidos, o deja que un Agente WebMCP interactúe con la base de datos de forma autónoma.",
      step3Num: "03",
      step3Title: "Exporta tu Base de Datos en Cualquier Formato",
      step3Desc: "Descarga un archivo .sql con todas las instrucciones de creación, exporta la base de datos binaria .sqlite para usarla en cualquier backend, o copia los resultados en JSON.",
    },
    roles: {
      tag: "CASOS DE USO POR PERFIL",
      title: "Diseñado para Potenciar a Todo Tipo de Equipos",
      subtitle: "Descubre cómo personas con distintos niveles técnicos resuelven problemas reales con WebMCP SQLite Studio.",
      tabAnalyst: "📊 Analistas de Negocio",
      tabData: "🧪 Data Science & ML",
      tabEdu: "🎓 Estudiantes & Docentes",
      tabDev: "💻 Devs & Creadores de IA",
      keyPointsLabel: "Ventajas clave para este rol:",
      analystTitle: "Analistas Financieros y de Negocio",
      analystQuote: "«Puedo cruzar reportes de ventas y presupuestos al instante sin depender del equipo de TI ni subir datos confidenciales a la nube.»",
      analystP1: "Limpia y analiza archivos pegando JSON o CSV directamente en el navegador con detección automática de esquemas.",
      analystP2: "Ejecuta filtros complejos, agrupaciones (GROUP BY) y métricas de suma o promedio en menos de 1 milisegundo.",
      analystP3: "Garantía total de privacidad para auditorías, nóminas confidenciales y balances contables.",
      analystBenefitLabel: "Ahorro de Tiempo",
      analystBenefitValue: "10x más ágil que lidiar con hojas de cálculo sobrecargadas",
      dataTitle: "Científicos de Datos y Machine Learning",
      dataQuote: "«Pruebo transformaciones relacionales y filtro datasets en memoria antes de lanzar pipelines pesados en la nube.»",
      dataP1: "Ingiere miles de registros y ejecuta JOINs a velocidad nativa de CPU sin latencia de red.",
      dataP2: "Exporta subconjuntos limpios en JSON para enriquecer prompts de LLMs o afinar modelos.",
      dataP3: "Prototipa consultas complejas y funciones de ventana (OVER, PARTITION) de forma 100% interactiva.",
      dataBenefitLabel: "Ahorro de Infraestructura",
      dataBenefitValue: "Cero gasto de cómputo en servidores durante la fase de exploración",
      eduTitle: "Docentes, Academias y Estudiantes",
      eduQuote: "«Toda la clase practica SQL real desde el primer minuto sin instalar Docker, PostgreSQL ni lidiar con puertos bloqueados.»",
      eduP1: "Soporte completo del estándar oficial SQLite 3 (claves foráneas, índices, transacciones ACID y CTEs).",
      eduP2: "Visualizador interactivo de esquemas y snippets didácticos para acelerar el aprendizaje.",
      eduP3: "Funciona en cualquier computadora, Chromebook o tablet moderna sin requisitos de instalación.",
      eduBenefitLabel: "Fricción de Soporte",
      eduBenefitValue: "0 minutos perdidos instalando programas en el aula",
      devTitle: "Desarrolladores y Creadores de Agentes IA",
      devQuote: "«Tengo un banco de pruebas SQL nativo para WebMCP donde mis agentes prueban consultas y migraciones antes de producción.»",
      devP1: "7 herramientas W3C WebMCP listas para conectar a Claude, ChatGPT o agentes autónomos vía navigator.modelContext.",
      devP2: "Exporta la base de datos completa a binario .sqlite para alimentar aplicaciones en Node, Python, iOS o Android.",
      devP3: "Se integra sinérgicamente con Mockaroo WebMCP para generación de mocks y Code Studio para frontend.",
      devBenefitLabel: "Velocidad de Iteración",
      devBenefitValue: "De la idea al esquema de base de datos validado en segundos",
    },
    faq: {
      tag: "RESOLVEMOS TUS DUDAS",
      title: "Preguntas Frecuentes",
      subtitle: "Todo lo que necesitas saber sobre la seguridad, tecnología y funcionamiento de WebMCP SQLite Studio.",
      q1: "¿Mis datos confidenciales se envían a algún servidor externo?",
      a1: "<strong>Absolutamente no.</strong> WebMCP SQLite Studio corre 100% en tu navegador a través de sql.js (WebAssembly). Tu base de datos reside en la memoria RAM de tu computadora. Cuando cierras la pestaña o reinicias la página, nada queda registrado en servidores externos.",
      q2: "¿Puedo guardar mi base de datos para usarla más tarde?",
      a2: "Sí. Tienes dos formas inmediatas: puedes hacer clic en <strong>Export SQL Dump</strong> para descargar un script .sql estándar, o en <strong>Export .sqlite</strong> para descargar el archivo binario SQLite estándar, compatible con cualquier servidor o aplicación móvil.",
      q3: "¿Qué es WebMCP y cómo lo utilizan los Agentes de IA?",
      a3: "WebMCP es el estándar propuesto ante el W3C para que las aplicaciones web expongan herramientas directamente a los Agentes de Inteligencia Artificial (en <code>navigator.modelContext</code>). Nuestro estudio expone 7 herramientas nativas para que un agente pueda consultar, crear tablas o extraer datos sin necesidad de backend.",
      q4: "¿Es compatible con el SQL estándar de la industria?",
      a4: "Sí, es 100% compatible con el motor oficial de <strong>SQLite 3</strong>. Soporta claves primarias, claves foráneas, restricciones UNIQUE/NOT NULL, transacciones (BEGIN/COMMIT/ROLLBACK), índices, CTEs (WITH) y funciones analíticas de ventana.",
      q5: "¿Cómo puedo combinarlo con Mockaroo WebMCP o Code Studio?",
      a5: "Forman una trilogía sinérgica: puedes generar datos sintéticos masivos en <strong>Mockaroo WebMCP</strong>, importarlos en <strong>SQLite Studio</strong> con un solo clic para analizarlos con SQL, y luego construir una aplicación visual conectada a esos datos en <strong>Code Studio</strong>.",
    },
    bottomCta: {
      title: "¿Listo para experimentar la base de datos del futuro?",
      subtitle: "Comienza a explorar, consultar y estructurar tus datos en segundos. Sin cuentas, sin tarjetas y sin descargas.",
      btnStudio: "🚀 Abrir SQLite Studio Ahora",
      btnCodeStudio: "💻 Explorar Code Studio",
      btnMockaroo: "📊 Generar Datos con Mockaroo",
    },
    footer: {
      text: "WebMCP SQLite Studio es una estación de datos relacionales 100% local-first desarrollada bajo la metodología Knowledge-Driven Development (KDD) y el estándar W3C WebMCP.",
      copy: "© 2026 WebMCP Suite • Código Abierto bajo Licencia MIT • Privacidad y Soberanía Total de Datos.",
      trilogyTitle: "La Trilogía WebMCP",
      trilogyStudio: "🗄️ WebMCP SQLite Studio",
      trilogyCode: "💻 WebMCP Code Studio",
      trilogyMockaroo: "📊 Mockaroo WebMCP",
      resourcesTitle: "Recursos y Especificaciones",
      resSqliteDocs: "Documentación SQLite 3",
      resW3c: "Borrador W3C WebMCP",
      resLlms: "Especificación LLM (llms.txt)",
      resGithub: "Repositorio en GitHub",
    }
  },
  en: {
    nav: {
      whatIs: "What is SQLite Studio?",
      tools: "WebMCP Tools (7)",
      advantages: "Advantages vs Cloud",
      howTo: "How to Use",
      useCases: "Use Cases",
      faq: "FAQ",
      openStudio: "Open SQLite Studio",
    },
    hero: {
      pill: "WebAssembly Relational Database • 100% In-Browser",
      title: "Your full SQL database, ultra-fast and private. <br class=\"desktop-only\" /><span class=\"gradient-text\">Directly inside your browser.</span>",
      subtitle: "Powered by SQLite 3 and WebAssembly. No servers to configure, no surprise cloud bills, and 7 native WebMCP tools allowing AI Agents to interact with your data immediately.",
      ctaStudioTitle: "Open WebMCP SQLite Studio",
      ctaStudioDesc: "Interactive SQL editor, table viewer, and native WebMCP server",
      ctaCodeTitle: "WebMCP Code Studio",
      ctaCodeDesc: "Full browser IDE with VFS and Unix terminal",
      ctaMockarooTitle: "Mockaroo WebMCP",
      ctaMockarooDesc: "Synthetic realistic data generator",
      capZeroInstall: "<strong>0 Install:</strong> Open your browser and execute SQL in 1 second",
      capPrivate: "<strong>100% Private:</strong> Your tables and data never leave your device",
      capZeroCost: "<strong>$0 Cost:</strong> No monthly invoices from AWS, Supabase, or Neon",
      capSpeed: "<strong>Ultra Fast:</strong> In-memory queries in <1 ms (WASM)",
    },
    showcase: {
      windowTitle: "sqlite-wasm-studio -- In-Memory Engine",
      wasmBadge: "⚡ WASM SQLite 3.45 • 0.42 ms",
      queryPrompt: "Relational SQL Query (JOIN with Aggregation):",
      metaExecution: "4 rows returned in 0.42 ms (WASM) • Memory: 1.2 MB",
      colName: "User",
      colRole: "Role",
      colProject: "Active Project",
      colBudget: "Budget",
    },
    paradigm: {
      tag: "THE PARADIGM SHIFT",
      title: "Why an In-Browser Database Changes the Game",
      subtitle: "Until today, working with SQL databases required configuring remote servers, managing passwords, paying monthly subscriptions, and risking the privacy of confidential data.",
      oldBadge: "The Traditional Cloud Database Approach",
      oldTitle: "Before: Complexity, Hidden Costs, and Data Leaks",
      oldItem1: "❌ <strong>Tedious setups:</strong> Booting Docker containers, forwarding ports, and managing complex connection strings with credentials.",
      oldItem2: "❌ <strong>Recurring cloud bills:</strong> Paying monthly fees for DBaaS providers that charge for compute hours, storage, and egress bandwidth.",
      oldItem3: "❌ <strong>Data privacy exposure:</strong> Uploading sensitive customer records, payroll, or business intelligence to third-party servers.",
      oldItem4: "❌ <strong>Network latency:</strong> Every single query travels over the internet to a remote data center before rendering results.",
      newBadge: "The WebMCP SQLite Revolution (Local-First)",
      newTitle: "Now: SQLite 3 WASM 100% on Your Device",
      newItem1: "✅ <strong>Zero install and zero friction:</strong> Open the link and you have a full SQL engine ready to use in 1 second.",
      newItem2: "✅ <strong>Absolute privacy (Zero-Knowledge):</strong> Your data lives exclusively in your browser memory; nothing is uploaded anywhere.",
      newItem3: "✅ <strong>Sub-millisecond speed:</strong> Queries run directly on your local CPU via WebAssembly at microsecond velocities.",
      newItem4: "✅ <strong>AI Agents ready:</strong> 7 native WebMCP tools for assistants like Claude, GPT, or Gemini to query and manage relational data.",
    },
    toolsSection: {
      tag: "WEBMCP STANDARD (7 CLIENT TOOLS)",
      title: "Native Relational Power for Artificial Intelligence Agents",
      subtitle: "WebMCP SQLite Studio implements the W3C WebMCP protocol to expose a comprehensive suite of SQL database operations that any agent or script can securely invoke.",
      tool1Name: "db_query",
      tool1Desc: "Executes read-only or analytical SQL SELECT queries returning structured rows, columns, rowCount, and execution time in ms.",
      tool2Name: "db_execute",
      tool2Desc: "Executes DDL or DML statements (CREATE TABLE, INSERT, UPDATE, DELETE, ALTER) with safe transactions.",
      tool3Name: "db_get_schema",
      tool3Desc: "Inspects full database schema: tables, views, column definitions, data types, primary keys, and row counts.",
      tool4Name: "db_import_json",
      tool4Desc: "Ingests JSON arrays with automated schema inference and datatype detection (INTEGER, REAL, TEXT).",
      tool5Name: "db_export_json",
      tool5Desc: "Extracts any query or full table into clean, structured JSON ready for LLM reasoning and processing.",
      tool6Name: "db_export_sql",
      tool6Desc: "Generates a complete, portable SQL script dump containing DDL CREATE TABLE and DML INSERT statements.",
      tool7Name: "db_table_preview",
      tool7Desc: "Fetches a paginated preview of records from a specific table with configurable limit and offset.",
      ctaRunInStudio: "Try in SQLite Studio",
    },
    comparison: {
      tag: "COMPARISON MATRIX",
      title: "WebMCP SQLite Studio vs Other Alternatives",
      subtitle: "Objectively compare how our local-first solution compares against cloud databases, desktop GUIs, and spreadsheet tools.",
      colFeature: "Feature",
      colCloudDb: "Cloud DBs (Supabase/RDS)",
      colDesktopGui: "Desktop Apps (DBeaver)",
      colSheets: "Spreadsheets (Airtable/Excel)",
      colWebmcp: "WebMCP SQLite Studio",
      rowStart: "Time to First Query",
      rowStartCloud: "Minutes (Create account, cluster)",
      rowStartDesktop: "10-20 min (200MB download, Java)",
      rowStartSheets: "1-2 min (Sign up)",
      rowStartWebmcp: "⚡ 1 second (Just open the web)",
      rowCost: "Monthly Cost",
      rowCostCloud: "$15 to $100+ USD / month",
      rowCostDesktop: "Free to $199 USD (license)",
      rowCostSheets: "$10 to $45 USD / seat",
      rowCostWebmcp: "🎉 $0.00 (Free & Open Source)",
      rowPrivacy: "Data Privacy",
      rowPrivacyCloud: "Stored on third-party cloud",
      rowPrivacyDesktop: "Local on your workstation",
      rowPrivacySheets: "Stored on vendor cloud",
      rowPrivacyWebmcp: "🔒 100% In-Browser Memory",
      rowSpeed: "Query Latency",
      rowSpeedCloud: "50 - 250 ms (Network latency)",
      rowSpeedDesktop: "Depends on connection",
      rowSpeedSheets: "Sluggish with >10,000 rows",
      rowSpeedWebmcp: "🚀 < 1 ms (WASM in memory)",
      rowAi: "AI Agent Tools (MCP)",
      rowAiCloud: "Requires backend proxies & keys",
      rowAiDesktop: "Not designed for web agents",
      rowAiSheets: "Limited & costly plugins",
      rowAiWebmcp: "🤖 7 Native WebMCP Tools",
      rowExport: "Export & Portability",
      rowExportCloud: "Complex remote SQL dumps",
      rowExportDesktop: "Local exports",
      rowExportSheets: "Flat CSV / XLSX only",
      rowExportWebmcp: "📦 SQL Dump + Raw .sqlite Binary",
    },
    howTo: {
      tag: "STEP BY STEP",
      title: "How to Get Started in 3 Simple Steps",
      subtitle: "You do not need to be a software engineer or database administrator to harness the full power of SQL.",
      step1Num: "01",
      step1Title: "Launch Studio & Load Your Data",
      step1Desc: "Open SQLite Studio. You can explore the preloaded users and projects database, or paste any JSON array to let the engine auto-generate the tables.",
      step2Num: "02",
      step2Title: "Run SQL Queries or Let AI Take Over",
      step2Desc: "Execute SQL queries like SELECT, JOINs, and aggregations using built-in snippets, or connect an AI agent to query the database autonomously.",
      step3Num: "03",
      step3Title: "Export Your Work in Any Format",
      step3Desc: "Download a standard .sql script, export a binary .sqlite database compatible with any backend or mobile app, or copy query results in JSON.",
    },
    roles: {
      tag: "USE CASES BY ROLE",
      title: "Built to Empower Everyone Across the Spectrum",
      subtitle: "See how professionals across different disciplines solve real problems with WebMCP SQLite Studio.",
      tabAnalyst: "📊 Business Analysts",
      tabData: "🧪 Data Science & ML",
      tabEdu: "🎓 Educators & Students",
      tabDev: "💻 Devs & AI Builders",
      keyPointsLabel: "Key benefits for this role:",
      analystTitle: "Business & Financial Analysts",
      analystQuote: "“I can cross-reference sales spreadsheets and customer data instantly without relying on IT tickets or exposing financial numbers to third-party clouds.”",
      analystP1: "Clean and join tabular data by pasting JSON or CSV directly into the browser with automatic schema inference.",
      analystP2: "Run advanced queries, aggregations (GROUP BY), and averages with instantaneous sub-millisecond feedback.",
      analystP3: "Complete peace of mind regarding data privacy for audits, payroll, and proprietary financial records.",
      analystBenefitLabel: "Time Saved",
      analystBenefitValue: "10x faster than struggling with overloaded spreadsheets",
      dataTitle: "Data Scientists & Machine Learning Engineers",
      dataQuote: "“I test relational transformations and filter datasets in memory before launching costly cloud pipelines in Snowflake or BigQuery.”",
      dataP1: "Ingest thousands of records and execute complex JOINs at native CPU speeds without network latency.",
      dataP2: "Export clean subsets in JSON to enrich LLM prompts or prepare training datasets.",
      dataP3: "Prototype complex window functions (OVER, PARTITION) and aggregations in a 100% interactive sandbox.",
      dataBenefitLabel: "Cloud Cost Saved",
      dataBenefitValue: "Zero cluster compute charges during data exploration phases",
      eduTitle: "Educators, Bootcamps & Students",
      eduQuote: "“The entire class practices real SQL from minute one without configuring Docker, installing PostgreSQL, or debugging port conflicts.”",
      eduP1: "Full support for standard SQLite 3 (foreign keys, indexes, ACID transactions, CTEs).",
      eduP2: "Interactive schema viewer and didactic snippets to accelerate student learning curves.",
      eduP3: "Runs seamlessly on any modern computer, Chromebook, or tablet without installation privileges.",
      eduBenefitLabel: "Setup Friction",
      eduBenefitValue: "0 minutes lost to software installation in the classroom",
      devTitle: "Developers & AI Agent Builders",
      devQuote: "“I have an in-browser relational testbed for WebMCP where my AI agents can test migrations and queries before production.”",
      devP1: "7 client W3C WebMCP tools ready to connect with Claude, ChatGPT, or autonomous agents via navigator.modelContext.",
      devP2: "Export the full database to a binary .sqlite file to power backend services in Node, Python, iOS, or Android.",
      devP3: "Seamless synergy with Mockaroo WebMCP for mock generation and Code Studio for frontend prototyping.",
      devBenefitLabel: "Iteration Velocity",
      devBenefitValue: "From idea to validated relational schema in seconds",
    },
    faq: {
      tag: "WE HAVE ANSWERS",
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about security, technology, and capabilities in WebMCP SQLite Studio.",
      q1: "Is my confidential data sent to any remote server?",
      a1: "<strong>Never.</strong> WebMCP SQLite Studio runs 100% inside your browser using sql.js (WebAssembly). Your database resides in your local computer memory. When you close the tab or refresh, nothing remains on any remote server.",
      q2: "Can I save my database to reuse or deploy later?",
      a2: "Yes. You can click <strong>Export SQL Dump</strong> to download a portable .sql script, or click <strong>Export .sqlite</strong> to download the raw binary database file, directly usable in Node.js, Python, iOS, Android, or desktop apps.",
      q3: "What is WebMCP and how do AI Agents use it?",
      a3: "WebMCP is the W3C draft standard enabling web applications to expose structured tools directly to AI Agents through <code>navigator.modelContext</code>. Our studio provides 7 native tools for agents to inspect, query, and modify tables securely.",
      q4: "How compatible is it with industry-standard SQL?",
      a4: "It is 100% compatible with the official <strong>SQLite 3</strong> engine. It supports primary and foreign keys, UNIQUE/NOT NULL constraints, ACID transactions (BEGIN/COMMIT/ROLLBACK), indexes, CTEs (WITH), and analytical window functions.",
      q5: "Can I combine it with Mockaroo WebMCP or Code Studio?",
      a5: "Yes, they form a powerful trio: generate realistic datasets in <strong>Mockaroo WebMCP</strong>, import them into <strong>SQLite Studio</strong> to analyze them with SQL, and build a web application powered by those queries in <strong>Code Studio</strong>.",
    },
    bottomCta: {
      title: "Ready to experience the future of databases?",
      subtitle: "Start exploring, querying, and structuring relational data in seconds. No signups, no credit cards, no downloads.",
      btnStudio: "🚀 Launch SQLite Studio Now",
      btnCodeStudio: "💻 Explore Code Studio",
      btnMockaroo: "📊 Generate Data with Mockaroo",
    },
    footer: {
      text: "WebMCP SQLite Studio is a 100% local-first relational data workstation developed under Knowledge-Driven Development (KDD) and the W3C WebMCP standard.",
      copy: "© 2026 WebMCP Suite • Open Source under MIT License • Complete Data Sovereignty.",
      trilogyTitle: "The WebMCP Trilogy",
      trilogyStudio: "🗄️ WebMCP SQLite Studio",
      trilogyCode: "💻 WebMCP Code Studio",
      trilogyMockaroo: "📊 Mockaroo WebMCP",
      resourcesTitle: "Resources & Specs",
      resSqliteDocs: "SQLite 3 Documentation",
      resW3c: "W3C WebMCP Draft",
      resLlms: "LLM Specification (llms.txt)",
      resGithub: "GitHub Repository",
    }
  },
  pt: {
    nav: {
      whatIs: "O que é SQLite Studio?",
      tools: "Ferramentas WebMCP (7)",
      advantages: "Vantagens vs Cloud",
      howTo: "Como Usar",
      useCases: "Casos de Uso",
      faq: "Perguntas",
      openStudio: "Abrir SQLite Studio",
    },
    hero: {
      pill: "Banco de Dados Relacional WebAssembly • 100% In-Browser",
      title: "Seu banco de dados SQL completo, veloz e privado. <br class=\"desktop-only\" /><span class=\"gradient-text\">Diretamente no seu navegador.</span>",
      subtitle: "Equipado com SQLite 3 e WebAssembly. Sem servidores para configurar, sem cobranças surpresa na nuvem e com 7 ferramentas nativas WebMCP para que Agentes de IA interajam com seus dados instantaneamente.",
      ctaStudioTitle: "Abrir WebMCP SQLite Studio",
      ctaStudioDesc: "Editor SQL interativo, visualizador de tabelas e servidor WebMCP",
      ctaCodeTitle: "WebMCP Code Studio",
      ctaCodeDesc: "IDE web completo com VFS e terminal Unix",
      ctaMockarooTitle: "Mockaroo WebMCP",
      ctaMockarooDesc: "Gerador de dados sintéticos e mocks",
      capZeroInstall: "<strong>0 Instalação:</strong> Abra o navegador e execute SQL em 1 segundo",
      capPrivate: "<strong>100% Privado:</strong> Suas tabelas e dados nunca saem da sua máquina",
      capZeroCost: "<strong>$0 Custo:</strong> Sem faturas mensais de AWS, Supabase ou Neon",
      capSpeed: "<strong>Ultra Rápido:</strong> Consultas em memória em <1 ms (WASM)",
    },
    showcase: {
      windowTitle: "sqlite-wasm-studio -- In-Memory Engine",
      wasmBadge: "⚡ WASM SQLite 3.45 • 0.42 ms",
      queryPrompt: "Consulta SQL Relacional (JOIN com Agregação):",
      metaExecution: "4 linhas retornadas em 0.42 ms (WASM) • Memória: 1.2 MB",
      colName: "Usuário",
      colRole: "Função",
      colProject: "Projeto Ativo",
      colBudget: "Orçamento",
    },
    paradigm: {
      tag: "A MUDANÇA DE PARADIGMA",
      title: "Por que um Banco de Dados no Navegador Muda o Jogo?",
      subtitle: "Até hoje, trabalhar com bancos de dados SQL exigia configurar servidores remotos, gerenciar senhas, pagar assinaturas mensais e arriscar a privacidade de dados confidenciais.",
      oldBadge: "O Enfoque Tradicional em Nuvem",
      oldTitle: "Antes: Complexidade, Custos Ocultos e Vazamentos",
      oldItem1: "❌ <strong>Configuração cansativa:</strong> Criar contêineres Docker, abrir portas e configurar strings de conexão com senhas.",
      oldItem2: "❌ <strong>Cobranças recorrentes:</strong> Pagar mensalmente por provedores DBaaS que cobram por horas de computação, armazenamento e tráfego.",
      oldItem3: "❌ <strong>Risco à privacidade:</strong> Enviar dados confidenciais de clientes, finanças ou inventário para servidores de terceiros.",
      oldItem4: "❌ <strong>Latência de rede:</strong> Cada consulta precisa viajar pela internet até um data center remoto antes de exibir o resultado.",
      newBadge: "A Revolução WebMCP SQLite (Local-First)",
      newTitle: "Agora: SQLite 3 WASM 100% no seu Dispositivo",
      newItem1: "✅ <strong>Zero instalação e zero fricção:</strong> Acesse o link e tenha um motor SQL completo pronto para uso em 1 segundo.",
      newItem2: "✅ <strong>Privacidade absoluta (Zero-Knowledge):</strong> Seus dados vivem exclusivamente na memória RAM do seu navegador; nada sobe para servidores.",
      newItem3: "✅ <strong>Velocidade sub-milissegundo:</strong> Consultas processadas na sua própria CPU via WebAssembly em velocidades de microssegundos.",
      newItem4: "✅ <strong>Pronto para Agentes de IA:</strong> 7 ferramentas nativas WebMCP para que assistentes como Claude, GPT ou Gemini consultem dados autonomamente.",
    },
    toolsSection: {
      tag: "PADRÃO WEBMCP (7 FERRAMENTAS CLIENTE)",
      title: "Poder Relacional Nativo para Agentes de Inteligência Artificial",
      subtitle: "O WebMCP SQLite Studio implementa o protocolo W3C WebMCP para disponibilizar um conjunto completo de operações SQL para qualquer agente ou script.",
      tool1Name: "db_query",
      tool1Desc: "Executa consultas SQL SELECT e analíticas retornando linhas estruturadas, colunas, rowCount e tempo de execução em ms.",
      tool2Name: "db_execute",
      tool2Desc: "Executa instruções DDL ou DML (CREATE TABLE, INSERT, UPDATE, DELETE, ALTER) com transações seguras.",
      tool3Name: "db_get_schema",
      tool3Desc: "Inspeciona o esquema completo: tabelas, views, colunas, tipos de dados, chaves primárias e contagem de linhas.",
      tool4Name: "db_import_json",
      tool4Desc: "Ingere arrays JSON com inferência automática de esquemas e tipos de dados (INTEGER, REAL, TEXT).",
      tool5Name: "db_export_json",
      tool5Desc: "Extrai qualquer consulta ou tabela completa em JSON estruturado otimizado para o raciocínio de LLMs.",
      tool6Name: "db_export_sql",
      tool6Desc: "Gera um dump SQL portátil completo com instruções DDL CREATE TABLE e DML INSERT para todas as tabelas.",
      tool7Name: "db_table_preview",
      tool7Desc: "Obtém uma pré-visualização paginada dos registros de uma tabela com limite e offset configuráveis.",
      ctaRunInStudio: "Testar no SQLite Studio",
    },
    comparison: {
      tag: "MATRIZ COMPARATIVA",
      title: "WebMCP SQLite Studio vs Outras Alternativas",
      subtitle: "Compare objetivamente nossa solução local-first com bancos de dados em nuvem, aplicativos desktop e planilhas.",
      colFeature: "Recurso",
      colCloudDb: "Bancos Nuvem (Supabase/RDS)",
      colDesktopGui: "Apps Desktop (DBeaver)",
      colSheets: "Planilhas (Airtable/Excel)",
      colWebmcp: "WebMCP SQLite Studio",
      rowStart: "Tempo de Início",
      rowStartCloud: "Minutos (Criar conta, cluster)",
      rowStartDesktop: "10-20 min (Download 200MB, Java)",
      rowStartSheets: "1-2 min (Cadastro)",
      rowStartWebmcp: "⚡ 1 segundo (Apenas abra a web)",
      rowCost: "Custo Mensal",
      rowCostCloud: "$15 a $100+ USD / mês",
      rowCostDesktop: "Grátis a $199 USD (licença)",
      rowCostSheets: "$10 a $45 USD / usuário",
      rowCostWebmcp: "🎉 $0.00 (Grátis e Aberto)",
      rowPrivacy: "Privacidade de Dados",
      rowPrivacyCloud: "Em servidores de terceiros",
      rowPrivacyDesktop: "Local no seu computador",
      rowPrivacySheets: "Armazenado na nuvem",
      rowPrivacyWebmcp: "🔒 100% Local no Navegador",
      rowSpeed: "Latência de Consulta",
      rowSpeedCloud: "50 - 250 ms (Latência de rede)",
      rowSpeedDesktop: "Depende da conexão",
      rowSpeedSheets: "Lento com >10.000 linhas",
      rowSpeedWebmcp: "🚀 < 1 ms (WASM em memória)",
      rowAi: "Ferramentas para IA (MCP)",
      rowAiCloud: "Exige proxies e chaves API",
      rowAiDesktop: "Não projetado para agentes web",
      rowAiSheets: "Plugins limitados e caros",
      rowAiWebmcp: "🤖 7 Ferramentas Nativas WebMCP",
      rowExport: "Exportação e Portabilidade",
      rowExportCloud: "Dumps SQL complexos",
      rowExportDesktop: "Exportação local",
      rowExportSheets: "Apenas CSV / XLSX planos",
      rowExportWebmcp: "📦 SQL Dump + Binário .sqlite",
    },
    howTo: {
      tag: "PASSO A PASSO",
      title: "Como Começar em 3 Passos Simples",
      subtitle: "Você não precisa ser programador nem administrador de banco de dados para aproveitar o poder do SQL.",
      step1Num: "01",
      step1Title: "Abra o Studio e Carregue seus Dados",
      step1Desc: "Acesse o SQLite Studio. Você pode explorar o banco pré-configurado de usuários e projetos, ou colar um array JSON para o sistema criar as tabelas automaticamente.",
      step2Num: "02",
      step2Title: "Execute Consultas ou Conecte sua IA",
      step2Desc: "Escreva consultas SQL como SELECT, JOINs ou agregações usando os snippets rápidos, ou deixe um Agente WebMCP consultar os dados de forma autônoma.",
      step3Num: "03",
      step3Title: "Exporte seu Trabalho em Qualquer Formato",
      step3Desc: "Baixe um arquivo .sql com todos os comandos, exporte o banco de dados binário .sqlite para uso em produção, ou copie os resultados em JSON.",
    },
    roles: {
      tag: "CASOS DE USO POR PERFIL",
      title: "Desenvolvido para Capacitar Todo Tipo de Equipe",
      subtitle: "Descubra como pessoas com diferentes níveis técnicos resolvem desafios reais com o WebMCP SQLite Studio.",
      tabAnalyst: "📊 Analistas de Negócios",
      tabData: "🧪 Data Science & ML",
      tabEdu: "🎓 Educadores & Alunos",
      tabDev: "💻 Devs & Criadores de IA",
      keyPointsLabel: "Vantagens essenciais para este perfil:",
      analystTitle: "Analistas Financeiros e de Negócios",
      analystQuote: "“Consigo cruzar relatórios de vendas e clientes instantaneamente sem depender da equipe de TI nem expor dados sigilosos para a nuvem.”",
      analystP1: "Limpe e processe arquivos colando JSON ou CSV diretamente no navegador com inferência automática de tipos.",
      analystP2: "Execute filtros complexos, agrupamentos (GROUP BY) e métricas de soma ou média em menos de 1 milissegundo.",
      analystP3: "Garantia total de confidencialidade para auditorias, folhas de pagamento e relatórios contábeis.",
      analystBenefitLabel: "Economia de Tempo",
      analystBenefitValue: "10x mais ágil do que lidar com planilhas sobrecarregadas",
      dataTitle: "Cientistas de Dados e Machine Learning",
      dataQuote: "“Testo transformações relacionais e filtro datasets na memória antes de disparar pipelines pesados na nuvem.”",
      dataP1: "Ingira milhares de registros e execute JOINs com velocidade nativa de CPU sem latência de rede.",
      dataP2: "Exporte subconjuntos limpos em JSON para enriquecer prompts de LLMs ou treinar modelos.",
      dataP3: "Prototipe consultas complexas e funções de janela analíticas (OVER, PARTITION) de forma 100% interativa.",
      dataBenefitLabel: "Economia em Nuvem",
      dataBenefitValue: "Zero custo de instâncias em nuvem durante a fase de exploração",
      eduTitle: "Educadores, Bootcamps e Alunos",
      eduQuote: "“Toda a turma pratica SQL real desde o primeiro minuto sem configurar Docker, instalar PostgreSQL nem debugar portas.”",
      eduP1: "Suporte completo ao padrão oficial do SQLite 3 (chaves estrangeiras, índices, transações ACID e CTEs).",
      eduP2: "Visualizador interativo de esquemas e snippets didáticos para acelerar o aprendizado dos alunos.",
      eduP3: "Funciona em qualquer computador, Chromebook ou tablet moderno sem requerer permissões de instalação.",
      eduBenefitLabel: "Atrito de Configuração",
      eduBenefitValue: "0 minutos perdidos com suporte técnico de instalação na aula",
      devTitle: "Desenvolvedores e Criadores de Agentes IA",
      devQuote: "“Tenho um ambiente de testes SQL nativo para WebMCP onde meus agentes validam consultas e migrações antes de produção.”",
      devP1: "7 ferramentas cliente W3C WebMCP prontas para conectar com Claude, ChatGPT ou agentes autônomos via navigator.modelContext.",
      devP2: "Exporte o banco de dados completo para binário .sqlite para rodar em backends em Node, Python, iOS ou Android.",
      devP3: "Sinergia nativa com Mockaroo WebMCP para geração de dados e Code Studio para prototipar a interface.",
      devBenefitLabel: "Velocidade de Iteração",
      devBenefitValue: "Da ideia ao esquema relacional validado em segundos",
    },
    faq: {
      tag: "TIRANDO DÚVIDAS",
      title: "Perguntas Frequentes",
      subtitle: "Tudo o que você precisa saber sobre segurança, tecnologia e recursos do WebMCP SQLite Studio.",
      q1: "Meus dados confidenciais são enviados para algum servidor externo?",
      a1: "<strong>Nunca.</strong> O WebMCP SQLite Studio roda 100% no seu navegador via sql.js (WebAssembly). Seu banco de dados fica na memória RAM do seu próprio computador. Ao fechar a aba ou atualizar a página, nada fica em servidores remotos.",
      q2: "Posso salvar meu banco de dados para reutilizá-lo depois?",
      a2: "Sim. Você pode clicar em <strong>Export SQL Dump</strong> para baixar um arquivo .sql portátil, ou em <strong>Export .sqlite</strong> para baixar o arquivo binário padrão do SQLite, compatível com Node.js, Python, iOS ou Android.",
      q3: "O que é WebMCP e como os Agentes de IA utilizam?",
      a3: "O WebMCP é o padrão proposto ao W3C para que aplicações web exponham ferramentas a Agentes de Inteligência Artificial em <code>navigator.modelContext</code>. Nosso estúdio disponibiliza 7 ferramentas nativas para consultas e manipulações seguras.",
      q4: "Ele é compatível com o padrão SQL da indústria?",
      a4: "Sim, é 100% compatível com o motor oficial do <strong>SQLite 3</strong>. Suporta chaves primárias, chaves estrangeiras, restrições UNIQUE/NOT NULL, transações ACID (BEGIN/COMMIT/ROLLBACK), índices, CTEs e funções de janela (Window Functions).",
      q5: "Posso combiná-lo com o Mockaroo WebMCP ou Code Studio?",
      a5: "Com certeza! Eles formam uma trilogia integrada: gere dados realistas no <strong>Mockaroo WebMCP</strong>, importe-os no <strong>SQLite Studio</strong> para análise com SQL, e crie uma aplicação visual conectada a esses dados no <strong>Code Studio</strong>.",
    },
    bottomCta: {
      title: "Pronto para experimentar o banco de dados do futuro?",
      subtitle: "Comece a explorar, consultar e estruturar dados relacionais em segundos. Sem cadastro, sem cartão e sem downloads.",
      btnStudio: "🚀 Abrir SQLite Studio Agora",
      btnCodeStudio: "💻 Explorar Code Studio",
      btnMockaroo: "📊 Gerar Dados com Mockaroo",
    },
    footer: {
      text: "O WebMCP SQLite Studio é uma estação de dados relacionais 100% local-first desenvolvida sob a metodologia Knowledge-Driven Development (KDD) e o padrão W3C WebMCP.",
      copy: "© 2026 WebMCP Suite • Código Aberto sob Licença MIT • Soberania e Privacidade Total dos Dados.",
      trilogyTitle: "A Trilogia WebMCP",
      trilogyStudio: "🗄️ WebMCP SQLite Studio",
      trilogyCode: "💻 WebMCP Code Studio",
      trilogyMockaroo: "📊 Mockaroo WebMCP",
      resourcesTitle: "Recursos e Especificações",
      resSqliteDocs: "Documentação do SQLite 3",
      resW3c: "Rascunho W3C WebMCP",
      resLlms: "Especificação LLM (llms.txt)",
      resGithub: "Repositório no GitHub",
    }
  }
};
