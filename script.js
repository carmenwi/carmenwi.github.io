"use strict";
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Fallback for browsers without IntersectionObserver: fire immediately */
if (!("IntersectionObserver" in window)) {
  window.IntersectionObserver = class {
    constructor(cb) { this.cb = cb; }
    observe(el) { this.cb([{ isIntersecting: true, target: el }], this); }
    unobserve() {} disconnect() {}
  };
}

/* ————— i18n ————— */
const I18N = {
  en: {
    "skip": "Skip to content",
    "nav.exp": "Experience", "nav.work": "Projects", "nav.skills": "Skills", "nav.journey": "Journey", "nav.about": "About", "nav.contact": "Contact",
    "hero.status": "Fresh off a Data & AI Engineering internship — US & EU work authorization",
    "hero.role": "Data Science & Engineering",
    "hero.sub": "From serverless pipelines on Google Cloud to RAG agents answering 1,000+ queries a month in production — I build data systems that ship.",
    "hero.cta1": "See what I've built", "hero.cta2": "Get in touch",
    "hero.loc": "Seville, Spain · Dual citizen US / ES",
    "stats.exp": "months shipping data & AI to production",
    "stats.range": "DEC — MAY",
    "stats.gpa": "GPA — 10× High Honors (≈ 4.0 US scale)",
    "stats.first": "1st",
    "stats.hack": "Innovation Award — Hack4Edu 2025",
    "stats.projects": "university & personal projects",
    "prin.kicker": "How I work",
    "pr1.t": "Ship beats perfect",
    "pr1.d": "Prototype in days, iterate on feedback. Hackathons taught me speed; production taught me when to slow down.",
    "pr2.t": "Users first",
    "pr2.d": "A dashboard nobody reads doesn't count. I build for the person on the other side — stakeholder, student or patient.",
    "pr3.t": "Data over opinions",
    "pr3.d": "Every system I ship reports its own impact: hours saved, queries resolved, risks caught. If it can't be measured, it isn't done.",
    "pr4.t": "Own it end to end",
    "pr4.d": "Architecture to production, without waiting to be asked — the way I ran a 250-student community and a company's data pipeline at once.",
    "exp.kicker": "Industry experience",
    "exp.title": "Six months owning data & AI in production.",
    "exp.sub": "Data & AI Engineer at IVB Wellness Lab (health-tech, remote) — full ownership of the data lifecycle: architecture decisions, production code, real users.",
    "exp.dates": "Dec 2025 — May 2026",
    "exp.mode": "Internship · Remote",
    "exp.lead": "One pipeline, end to end: raw events in, decisions out. This is the system I designed and ran —",
    "exp.m1": "hours of manual reporting eliminated weekly",
    "exp.m2": "support queries a month handled by my RAG agent",
    "exp.m3": "medically safe recommendations, guaranteed by design",
    "exp.m4": "pharmacy distribution points mapped for strategy",
    "exp.e1t": "Serverless ETL, from scratch",
    "exp.e1d": "Designed event-driven pipelines on Cloud Functions, Pub/Sub and Cloud Tasks, centralizing every data source in BigQuery for marketing and e-commerce teams.",
    "exp.e2t": "RAG in production",
    "exp.e2d": "Customer-support agent on Gemini 2.5 + Vertex AI with custom intent classifiers, latency-cutting caches and CI validators that block hallucinations before deploy.",
    "exp.e3t": "Clinical recommendation engine",
    "exp.e3d": "Deterministic Python scoring system that mathematically prioritizes real medical conditions over generic AI guesses — safety as a property, not a hope.",
    "exp.e4t": "Growth analytics",
    "exp.e4d": "Shopify and Gorgias APIs wired into the warehouse for cohort analyses that reshaped YoY marketing spend and mapped 2,000+ pharmacy distribution points.",
    "us.kicker": "Beyond data — United States",
    "us.title": "Three summers working in the US",
    "us.p": "Two Work & Travel seasons in operations and events at a 4-star property in Washington State (2023–24), and the summer of 2026 — through October — serving thousands of daily visitors at Jackson Hole Mountain Resort, Wyoming. Not data jobs, but they built the muscles data roles quietly demand: presenting and persuading in English all day, staying precise under real pressure, and reading what people actually need — the same skill that turns a dashboard into a decision.",
    "us.c1": "English, all day, every day",
    "us.c2": "Precision under pressure",
    "us.c3": "Customer-facing instincts",
    "us.c4": "Adaptability, proven abroad",
    "pipe.orders": "orders", "pipe.tickets": "tickets", "pipe.events": "events",
    "pipe.wh": "single source of truth", "pipe.dash": "dashboards", "pipe.rec": "Recommender", "pipe.clinical": "clinical scoring",
    "exp.hint": "Hover each node to see what I built there.",
    "tip.src": "Business sources: Shopify orders, Gorgias support tickets and web events — raw, messy, and arriving all day long.",
    "tip.ingest": "Event-driven ingestion I built from scratch: Cloud Functions triggered via Pub/Sub and Cloud Tasks. Serverless — no machines to babysit.",
    "tip.wh": "BigQuery as the single source of truth. Every team queries the same numbers, and every downstream product feeds from here.",
    "tip.dash": "Looker Studio dashboards for marketing and e-commerce — they replaced 10+ hours of manual reporting every week.",
    "tip.rag": "Support agent on Gemini 2.5 + Vertex AI: custom intent classifiers, latency-cutting caches and CI validators that block hallucinations. 1,000+ queries a month.",
    "tip.rec": "Deterministic clinical scoring in Python: real medical conditions always outrank generic AI symptoms. Safety by design, on the whole store.",
    "gh.repos": "public repos on GitHub", "gh.upd": "last push",
    "work.kicker": "Selected projects",
    "work.title": "Every project tells a story. Here are five.",
    "work.more": "Everything else lives on GitHub",
    "work.case": "Case study",
    "cs.problem": "The problem", "cs.approach": "What I built", "cs.impact": "Impact", "cs.role": "My role & stack",
    "cs1.r": "Team lead and developer of the core: architecture, OpenAI integration and deployment, coordinating a team of 4 with Git workflows against the hackathon clock.",
    "cs2.r": "Owner of the data side: NeoWs ingestion, cleaning and hazard-classification logic in Python (Pandas), feeding the JavaScript visualization layer.",
    "cs3.r": "Solo research project — full ML lifecycle: exploratory analysis, model selection, resampling strategy and clinical framing of the results.",
    "cs4.r": "Solo build in R: significance analysis of risk drivers, model fitting and a validation design that proves the model isn't overfit.",
    "cs5.r": "Solo build in TypeScript — my first shipped project outside Python, designed against the Gemini API.",
    "cs1.p": "Students juggle scattered platforms, deadlines and materials — and disorganization quietly turns into dropout.",
    "cs1.a": "MyLEA: a hub that connects to university virtual campuses and centralizes studying. AI-generated study paths and summaries via the OpenAI API, plus a virtual pet that gamifies staying on track. Python + Streamlit, leading a team of 4 with Git workflows, MVP deployed on Streamlit Cloud.",
    "cs1.i": "1st Place Innovation Award at Hack4Edu 2025, Iberoamerica's largest edtech hackathon (ProFuturo — Telefónica & \"la Caixa\"), against global teams.",
    "cs2.p": "NASA publishes near-Earth-object data only specialists can read — stakeholders can't act on raw telemetry.",
    "cs2.a": "In 48 hours at the Spanish Space Agency, our team Pleiades Protocol built Neoveo: NeoWs API ingestion and hazard classification in Python (my part), wrapped in an interactive orbital web app anyone can navigate.",
    "cs2.i": "A working app delivered under deadline — watch the demo below.",
    "cs3.p": "In elderly-care data the patients most at risk are exactly the ones models miss: severe class imbalance hides them.",
    "cs3.a": "A KNN risk classifier plus K-Means frailty segmentation, rebalanced with SMOTE and hardened with cross-validation to keep recall honest.",
    "cs3.i": "95% sensitivity detecting mortality risk on test data — the metric that matters when a false negative is a person.",
    "cs4.p": "Which variables actually drive loan default? Intuition disagrees; a lender needs evidence.",
    "cs4.a": "Logistic regression in R (Tidyverse, Caret, Broom): isolating statistically significant risk drivers and explicitly validating against overfitting.",
    "cs4.i": "82% precision and 95% sensitivity, consistent across validation — a model you can explain to a risk committee.",
    "cs5.p": "New model family, new language, one weekend: could I ship something useful with Gemini outside my Python comfort zone?",
    "cs5.a": "A TypeScript app on Google's Gemini API, built to the Devpost hackathon clock: prototype fast, cut scope, ship.",
    "cs5.i": "Entry submitted and a new stack unlocked — proof the learning curve is the fun part.",
    "p1.award": "1st Place — Hack4Edu 2025, Iberoamerica's largest edtech hackathon",
    "p1.title": "MyLEA — AI study companion",
    "p1.desc": "A platform that plugs into university virtual campuses and turns scattered coursework into one organized study hub — with AI study paths, summaries and a virtual pet that keeps motivation alive. Judged 1st for Innovation among global teams (ProFuturo — Telefónica & \"la Caixa\").",
    "p2.award": "NASA Space Apps Challenge 2025 — Spanish Space Agency",
    "p2.title": "Neoveo — asteroids, made legible",
    "p2.desc": "48 hours to make planetary defense understandable: live NASA NeoWs telemetry, hazard classification, and an orbital dashboard any stakeholder can read.",
    "p3.award": "Academic research — healthcare ML",
    "p3.title": "Frailty prediction in elderly patients",
    "p3.desc": "95% sensitivity detecting mortality risk on a heavily imbalanced medical dataset: KNN + K-Means, SMOTE resampling, cross-validation against overfitting.",
    "p4.award": "Risk modeling in R",
    "p4.title": "Credit default detection",
    "p4.desc": "Logistic regression predicting loan default at 82% precision / 95% sensitivity — isolating the variables that truly drive risk, validated against overfit.",
    "p5.award": "Devpost — Gemini hackathon 2026",
    "p5.title": "Building with Gemini",
    "p5.desc": "Latest hackathon entry exploring Google's Gemini models in a TypeScript app — rapid prototyping beyond my Python comfort zone.",
    "skills.kicker": "Toolkit",
    "skills.title": "Depth where it matters, breadth everywhere else.",
    "skills.g1": "Languages & core", "skills.g2": "ML & AI", "skills.g3": "Data engineering & cloud", "skills.g4": "Visualization & BI",
    "skills.rag": "RAG systems", "skills.cls": "Classification", "skills.etl": "Serverless ETL",
    "journey.kicker": "Journey",
    "journey.title": "A short history of momentum.",
    "tl.award": "Award", "tl.work": "Role", "tl.cert": "Certificate", "tl.edu": "Education", "tl.now": "In progress",
    "j7.t": "Santander Excelencia 360º Scholarship",
    "j7.d": "Selected for Santander's excellence program, recognizing academic record and project track.",
    "j6.t": "Data & AI Engineer — IVB Wellness Lab",
    "j6.d": "Six months owning serverless ETL, a production RAG agent and growth analytics for a health-tech company. Code straight to production.",
    "j5.t": "1st Place, Hack4Edu · NASA Space Apps · IBM Power BI",
    "j5.d": "Innovation Award at Iberoamerica's largest edtech hackathon, planetary-defense data viz at the Spanish Space Agency, and BI certification.",
    "j4.t": "Google Data Analytics Professional Certificate",
    "j4.d": "Full analytics cycle — cleaning to dashboards — completed alongside my degree and a summer job abroad. Capstone on GitHub.",
    "j3.t": "B.S. in Data Science — UNIR",
    "j3.d": "9.7/10 GPA with ten High Honors. Elected admin of the degree's official community — 250+ students, peer mentoring.",
    "about.kicker": "About",
    "about.title": "Problem-solver first, technologist second.",
    "about.p1": "I'm Carmen — I've shipped data systems a company runs on, won an international hackathon, and kept a 9.7/10 GPA while doing it. Dual US/Spanish citizen: I can work on either side of the Atlantic, no sponsorship needed.",
    "about.p2": "Off the keyboard I run a 250-student community, mentor peers, and collect hackathon weekends. Santander Excelencia 360º scholar. Spanish native, English C1, French B1.",
    "about.cven": "CV — English", "about.cves": "CV — Español",
    "contact.kicker": "Contact",
    "contact.title": "Let's build something with data.",
    "contact.sub": "Recruiting, collaborating, or just curious — my inbox is open.",
    "contact.copy": "Copy email", "contact.copied": "Copied to clipboard",
    "footer.built": "Designed & built by hand — no templates.",
    "footer.top": "Back to top"
  },
  es: {
    "skip": "Saltar al contenido",
    "nav.exp": "Experiencia", "nav.work": "Proyectos", "nav.skills": "Skills", "nav.journey": "Trayectoria", "nav.about": "Sobre mí", "nav.contact": "Contacto",
    "hero.status": "Recién salida de unas prácticas de Data & AI Engineering — permiso de trabajo en EE. UU. y UE",
    "hero.role": "Data Science & Engineering",
    "hero.sub": "De pipelines serverless en Google Cloud a agentes RAG respondiendo +1.000 consultas al mes en producción — construyo sistemas de datos que llegan a usuarios reales.",
    "hero.cta1": "Ver lo que he construido", "hero.cta2": "Hablemos",
    "hero.loc": "Sevilla, España · Doble nacionalidad EE. UU. / ES",
    "stats.exp": "meses llevando datos e IA a producción",
    "stats.range": "DIC — MAY",
    "stats.gpa": "Nota media — 10 Matrículas de Honor",
    "stats.first": "1er",
    "stats.hack": "Premio a la Innovación — Hack4Edu 2025",
    "stats.projects": "proyectos universitarios y personales",
    "prin.kicker": "Cómo trabajo",
    "pr1.t": "Lanzar gana a perfecto",
    "pr1.d": "Prototipo en días, itero con feedback. Los hackathons me enseñaron velocidad; producción me enseñó cuándo frenar.",
    "pr2.t": "Primero el usuario",
    "pr2.d": "Un dashboard que nadie lee no cuenta. Construyo para la persona al otro lado — stakeholder, estudiante o paciente.",
    "pr3.t": "Datos antes que opiniones",
    "pr3.d": "Cada sistema que entrego reporta su propio impacto: horas ahorradas, consultas resueltas, riesgos detectados. Si no se puede medir, no está terminado.",
    "pr4.t": "Propiedad de principio a fin",
    "pr4.d": "De la arquitectura a producción, sin esperar a que me lo pidan — así llevé a la vez una comunidad de 250 estudiantes y el pipeline de datos de una empresa.",
    "exp.kicker": "Experiencia en industria",
    "exp.title": "Seis meses a cargo de datos e IA en producción.",
    "exp.sub": "Data & AI Engineer en IVB Wellness Lab (health-tech, remoto) — propiedad completa del ciclo de datos: decisiones de arquitectura, código en producción, usuarios reales.",
    "exp.dates": "Dic 2025 — May 2026",
    "exp.mode": "Prácticas · Remoto",
    "exp.lead": "Un pipeline de principio a fin: entran eventos brutos, salen decisiones. Este es el sistema que diseñé y operé —",
    "exp.m1": "horas de reporting manual eliminadas cada semana",
    "exp.m2": "consultas de soporte al mes gestionadas por mi agente RAG",
    "exp.m3": "recomendaciones médicamente seguras, garantizadas por diseño",
    "exp.m4": "puntos de distribución en farmacias mapeados para estrategia",
    "exp.e1t": "ETL serverless, desde cero",
    "exp.e1d": "Diseñé pipelines orientados a eventos con Cloud Functions, Pub/Sub y Cloud Tasks, centralizando cada fuente de datos en BigQuery para marketing y e-commerce.",
    "exp.e2t": "RAG en producción",
    "exp.e2d": "Agente de atención al cliente sobre Gemini 2.5 + Vertex AI con clasificadores de intención propios, cachés que reducen latencia y validadores CI que bloquean alucinaciones antes del deploy.",
    "exp.e3t": "Motor de recomendación clínico",
    "exp.e3d": "Sistema determinista de scoring en Python que prioriza matemáticamente condiciones médicas reales sobre conjeturas genéricas de IA — la seguridad como propiedad, no como esperanza.",
    "exp.e4t": "Analítica de crecimiento",
    "exp.e4d": "APIs de Shopify y Gorgias conectadas al warehouse para análisis de cohortes que redefinieron la inversión de marketing YoY y mapearon +2.000 puntos de farmacia.",
    "us.kicker": "Más allá de los datos — Estados Unidos",
    "us.title": "Tres veranos trabajando en EE. UU.",
    "us.p": "Dos temporadas Work & Travel en operaciones y eventos en un hotel 4 estrellas del estado de Washington (2023–24), y el verano de 2026 — hasta octubre — atendiendo a miles de visitantes diarios en Jackson Hole Mountain Resort, Wyoming. No son trabajos de datos, pero entrenan los músculos que los roles de datos exigen en silencio: comunicar y persuadir en inglés todo el día, mantener la precisión bajo presión real y leer lo que la gente de verdad necesita — la misma habilidad que convierte un dashboard en una decisión.",
    "us.c1": "Inglés, todo el día, cada día",
    "us.c2": "Precisión bajo presión",
    "us.c3": "Instinto de cara al cliente",
    "us.c4": "Adaptabilidad probada fuera",
    "pipe.orders": "pedidos", "pipe.tickets": "tickets", "pipe.events": "eventos",
    "pipe.wh": "fuente única de verdad", "pipe.dash": "dashboards", "pipe.rec": "Recomendador", "pipe.clinical": "scoring clínico",
    "exp.hint": "Pasa el cursor por cada nodo para ver qué construí ahí.",
    "tip.src": "Fuentes de negocio: pedidos de Shopify, tickets de soporte de Gorgias y eventos web — datos brutos llegando a todas horas.",
    "tip.ingest": "Ingesta orientada a eventos construida desde cero: Cloud Functions disparadas vía Pub/Sub y Cloud Tasks. Serverless — sin máquinas que vigilar.",
    "tip.wh": "BigQuery como fuente única de verdad. Todos los equipos consultan los mismos números, y cada producto posterior se alimenta de aquí.",
    "tip.dash": "Dashboards en Looker Studio para marketing y e-commerce — sustituyeron 10+ horas de reporting manual cada semana.",
    "tip.rag": "Agente de soporte sobre Gemini 2.5 + Vertex AI: clasificadores de intención propios, cachés de latencia y validadores CI que bloquean alucinaciones. +1.000 consultas al mes.",
    "tip.rec": "Scoring clínico determinista en Python: las condiciones médicas reales siempre priman sobre síntomas genéricos de IA. Seguridad por diseño, en toda la tienda.",
    "gh.repos": "repositorios públicos en GitHub", "gh.upd": "último push",
    "work.kicker": "Proyectos destacados",
    "work.title": "Cada proyecto cuenta una historia. Aquí van cinco.",
    "work.more": "Todo lo demás está en GitHub",
    "work.case": "Caso de estudio",
    "cs.problem": "El problema", "cs.approach": "Qué construí", "cs.impact": "Impacto", "cs.role": "Mi rol y stack",
    "cs1.r": "Líder del equipo y desarrolladora del núcleo: arquitectura, integración con OpenAI y despliegue, coordinando a 4 personas con flujos de Git contra el reloj del hackathon.",
    "cs2.r": "Responsable de la parte de datos: ingesta de NeoWs, limpieza y lógica de clasificación de peligrosidad en Python (Pandas), alimentando la capa de visualización en JavaScript.",
    "cs3.r": "Proyecto de investigación en solitario — ciclo ML completo: análisis exploratorio, selección de modelo, estrategia de remuestreo y lectura clínica de los resultados.",
    "cs4.r": "Construcción en solitario en R: análisis de significancia de las variables de riesgo, ajuste del modelo y un diseño de validación que demuestra que no hay sobreajuste.",
    "cs5.r": "Construcción en solitario en TypeScript — mi primer proyecto lanzado fuera de Python, diseñado contra la API de Gemini.",
    "cs1.p": "Los estudiantes hacen malabares con plataformas dispersas, fechas y materiales — y la desorganización se convierte silenciosamente en abandono.",
    "cs1.a": "MyLEA: un hub que se conecta a los campus virtuales y centraliza el estudio. Rutas de estudio y resúmenes generados con IA (API de OpenAI), más una mascota virtual que gamifica la constancia. Python + Streamlit, liderando un equipo de 4 con flujos de Git, MVP desplegado en Streamlit Cloud.",
    "cs1.i": "1er Premio a la Innovación en Hack4Edu 2025, el mayor hackathon edtech de Iberoamérica (ProFuturo — Telefónica y \"la Caixa\"), frente a equipos globales.",
    "cs2.p": "La NASA publica datos de objetos cercanos a la Tierra que solo especialistas saben leer — los stakeholders no pueden actuar sobre telemetría bruta.",
    "cs2.a": "En 48 horas en la Agencia Espacial Española, nuestro equipo Pleiades Protocol construyó Neoveo: ingesta de la API NeoWs y clasificación de peligrosidad en Python (mi parte), envueltas en una app web orbital interactiva que cualquiera puede navegar.",
    "cs2.i": "Una app funcional entregada contra reloj — mira la demo abajo.",
    "cs3.p": "En datos geriátricos, los pacientes de mayor riesgo son justo los que los modelos pasan por alto: el desbalanceo severo los esconde.",
    "cs3.a": "Clasificador de riesgo KNN más segmentación de fragilidad con K-Means, rebalanceado con SMOTE y endurecido con validación cruzada para mantener el recall honesto.",
    "cs3.i": "95% de sensibilidad detectando riesgo de mortalidad en test — la métrica que importa cuando un falso negativo es una persona.",
    "cs4.p": "¿Qué variables determinan de verdad el impago? La intuición no se pone de acuerdo; un prestamista necesita evidencia.",
    "cs4.a": "Regresión logística en R (Tidyverse, Caret, Broom): aislando las variables estadísticamente significativas y validando explícitamente contra el sobreajuste.",
    "cs4.i": "82% de precisión y 95% de sensibilidad, consistentes en validación — un modelo que puedes explicar ante un comité de riesgo.",
    "cs5.p": "Nueva familia de modelos, nuevo lenguaje, un fin de semana: ¿podía lanzar algo útil con Gemini fuera de mi zona de confort en Python?",
    "cs5.a": "Una app TypeScript sobre la API de Gemini de Google, al ritmo del hackathon de Devpost: prototipar rápido, recortar alcance, lanzar.",
    "cs5.i": "Entrada presentada y un stack nuevo desbloqueado — prueba de que la curva de aprendizaje es la parte divertida.",
    "p1.award": "1er Premio — Hack4Edu 2025, el mayor hackathon edtech de Iberoamérica",
    "p1.title": "MyLEA — compañero de estudio con IA",
    "p1.desc": "Una plataforma que se conecta a los campus virtuales y convierte el caos de asignaturas en un centro de estudio organizado — con rutas de estudio por IA, resúmenes y una mascota virtual que mantiene viva la motivación. 1er Premio a la Innovación entre equipos globales (ProFuturo — Telefónica y \"la Caixa\").",
    "p2.award": "NASA Space Apps Challenge 2025 — Agencia Espacial Española",
    "p2.title": "Neoveo — asteroides, por fin legibles",
    "p2.desc": "48 horas para hacer entendible la defensa planetaria: telemetría en vivo de la API NeoWs de la NASA, clasificación por peligrosidad y un dashboard orbital que cualquier stakeholder puede leer.",
    "p3.award": "Investigación académica — ML en salud",
    "p3.title": "Predicción de fragilidad en pacientes ancianos",
    "p3.desc": "95% de sensibilidad detectando riesgo de mortalidad en un dataset médico muy desbalanceado: KNN + K-Means, SMOTE y validación cruzada contra el sobreajuste.",
    "p4.award": "Modelado de riesgo en R",
    "p4.title": "Detección de impago de créditos",
    "p4.desc": "Regresión logística que predice el impago con 82% de precisión y 95% de sensibilidad — aislando las variables que de verdad determinan el riesgo, validada contra el sobreajuste.",
    "p5.award": "Devpost — hackathon de Gemini 2026",
    "p5.title": "Construyendo con Gemini",
    "p5.desc": "Mi entrada más reciente: explorando los modelos Gemini de Google en una app TypeScript — prototipado rápido fuera de mi zona de confort en Python.",
    "skills.kicker": "Herramientas",
    "skills.title": "Profundidad donde importa, amplitud en todo lo demás.",
    "skills.g1": "Lenguajes y base", "skills.g2": "ML e IA", "skills.g3": "Data engineering y cloud", "skills.g4": "Visualización y BI",
    "skills.rag": "Sistemas RAG", "skills.cls": "Clasificación", "skills.etl": "ETL serverless",
    "journey.kicker": "Trayectoria",
    "journey.title": "Una breve historia de impulso.",
    "tl.award": "Premio", "tl.work": "Puesto", "tl.cert": "Certificado", "tl.edu": "Formación", "tl.now": "En curso",
    "j7.t": "Beca Santander Excelencia 360º",
    "j7.d": "Seleccionada para el programa de excelencia de Santander por expediente y trayectoria de proyectos.",
    "j6.t": "Data & AI Engineer — IVB Wellness Lab",
    "j6.d": "Seis meses a cargo de ETL serverless, un agente RAG en producción y analítica de crecimiento para una health-tech. Código directo a producción.",
    "j5.t": "1er Premio Hack4Edu · NASA Space Apps · IBM Power BI",
    "j5.d": "Premio a la Innovación en el mayor hackathon edtech de Iberoamérica, visualización de defensa planetaria en la Agencia Espacial Española y certificación en BI.",
    "j4.t": "Certificado Profesional de Análisis de Datos de Google",
    "j4.d": "Ciclo completo de analítica — de la limpieza a los dashboards — compaginado con el grado y un trabajo de verano en el extranjero. Capstone en GitHub.",
    "j3.t": "Grado en Ciencia de Datos — UNIR",
    "j3.d": "Nota media 9,7/10 con diez Matrículas de Honor. Administradora de la comunidad oficial del grado — 250+ estudiantes, mentoría entre pares.",
    "about.kicker": "Sobre mí",
    "about.title": "Primero resolver problemas, después la tecnología.",
    "about.p1": "Soy Carmen — he construido sistemas de datos de los que depende una empresa, he ganado un hackathon internacional y he mantenido un 9,7/10 de media mientras tanto. Doble nacionalidad EE. UU./España: puedo trabajar a ambos lados del Atlántico sin patrocinio de visado.",
    "about.p2": "Fuera del teclado gestiono una comunidad de 250 estudiantes, hago mentoría y colecciono fines de semana de hackathon. Becaria Santander Excelencia 360º. Español nativo, inglés C1, francés B1.",
    "about.cven": "CV — English", "about.cves": "CV — Español",
    "contact.kicker": "Contacto",
    "contact.title": "Construyamos algo con datos.",
    "contact.sub": "Recruiting, colaboración o simple curiosidad — mi bandeja está abierta.",
    "contact.copy": "Copiar email", "contact.copied": "Copiado al portapapeles",
    "footer.built": "Diseñado y programado a mano — sin plantillas.",
    "footer.top": "Volver arriba"
  }
};

let lang = localStorage.getItem("lang") || (navigator.language.startsWith("es") ? "es" : "en");
let ghData = null;
const langSwitch = $("#langSwitch");
const fmtNum = (n, dec = 0) => n.toLocaleString(lang === "es" ? "es-ES" : "en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
function applyLang() {
  const dict = I18N[lang];
  $$("[data-i18n]").forEach(el => {
    const t = dict[el.dataset.i18n];
    if (!t) return;
    if (t.includes("<") && !(el instanceof SVGElement)) el.innerHTML = t;
    else el.textContent = t;
  });
  document.documentElement.lang = lang;
  langSwitch.setAttribute("aria-checked", lang === "es" ? "true" : "false");
  localStorage.setItem("lang", lang);
  $$(".count.done").forEach(el => el.textContent = fmtNum(+el.dataset.to, +(el.dataset.dec || 0)));
  const pt = $("#pipeTip"); if (pt) pt.classList.remove("show");
  const dlg = $("#csDialog"); if (dlg && dlg.open) dlg.close();
  renderGH();
}
langSwitch.addEventListener("click", () => { lang = lang === "en" ? "es" : "en"; applyLang(); });
applyLang();

/* ————— Theme ————— */
const root = document.documentElement;
const themeBtn = $("#themeBtn");
const systemDark = matchMedia("(prefers-color-scheme: dark)");
function resolved() {
  const t = localStorage.getItem("theme");
  return t === "light" || t === "dark" ? t : (systemDark.matches ? "dark" : "light");
}
function paintTheme() {
  root.dataset.theme = localStorage.getItem("theme") || "auto";
  root.dataset.mode = resolved();
}
themeBtn.addEventListener("click", () => {
  localStorage.setItem("theme", resolved() === "dark" ? "light" : "dark");
  if (document.startViewTransition && !reduceMotion) {
    document.startViewTransition(() => { paintTheme(); fieldColors(); });
  } else { paintTheme(); fieldColors(); }
});
systemDark.addEventListener("change", () => { paintTheme(); fieldColors(); });
paintTheme();

/* ————— Particle field (multi-hue data network) ————— */
const canvas = $("#field");
const ctx = canvas.getContext("2d");
let pts = [], W = 0, H = 0, dpr = 1, raf = null, running = false;
let palette = [];
const mouse = { x: -9e3, y: -9e3 };

function fieldColors() {
  const cs = getComputedStyle(document.body);
  palette = ["--c-blue", "--c-violet", "--c-teal", "--c-amber", "--c-rose"]
    .map(v => cs.getPropertyValue(v).trim());
}
function fieldSize() {
  const r = canvas.parentElement.getBoundingClientRect();
  dpr = Math.min(devicePixelRatio || 1, 2);
  W = r.width; H = r.height;
  canvas.width = W * dpr; canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const n = Math.min(110, Math.round((W * H) / 17000));
  pts = Array.from({ length: n }, (_, i) => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
    r: Math.random() * 1.6 + .8, ci: i % palette.length
  }));
}
function fieldDraw() {
  ctx.clearRect(0, 0, W, H);
  const LINK = 115;
  for (const p of pts) {
    const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
    if (d2 < 22500) { const f = 12 / (d2 + 40); p.vx += dx * f * .012; p.vy += dy * f * .012; }
    p.x += p.vx; p.y += p.vy;
    p.vx *= .996; p.vy *= .996;
    if (Math.abs(p.vx) < .05) p.vx += (Math.random() - .5) * .02;
    if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
    if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
  }
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j];
      const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
      if (d < LINK) {
        ctx.globalAlpha = (1 - d / LINK) * .13;
        ctx.strokeStyle = palette[a.ci];
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
  }
  for (const p of pts) {
    ctx.globalAlpha = .55;
    ctx.fillStyle = palette[p.ci];
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
  }
  ctx.globalAlpha = 1;
  if (running) raf = requestAnimationFrame(fieldDraw);
}
function fieldStart() { if (!running && !reduceMotion) { running = true; raf = requestAnimationFrame(fieldDraw); } }
function fieldStop() { running = false; cancelAnimationFrame(raf); }
fieldColors(); fieldSize();
if (reduceMotion) fieldDraw(); else fieldStart();
addEventListener("resize", () => { fieldSize(); if (reduceMotion) fieldDraw(); });
addEventListener("pointermove", e => {
  const r = canvas.getBoundingClientRect();
  mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
}, { passive: true });
document.addEventListener("visibilitychange", () => document.hidden ? fieldStop() : fieldStart());
new IntersectionObserver(([e]) => e.isIntersecting ? fieldStart() : fieldStop()).observe(canvas);

/* ————— Cursor aura ————— */
const aura = $("#aura");
if (!reduceMotion && matchMedia("(pointer:fine)").matches) {
  addEventListener("pointermove", e => {
    aura.classList.add("on");
    aura.style.left = e.clientX + "px";
    aura.style.top = e.clientY + "px";
  }, { passive: true });
}

/* ————— Project dot grid (60 dots, staggered) ————— */
const dg = document.getElementById("dotGrid");
if (dg) {
  let i = 0;
  for (let r = 0; r < 6; r++) for (let c = 0; c < 10; c++) {
    const d = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    d.setAttribute("cx", 7 + c * 14); d.setAttribute("cy", 8 + r * 13.6); d.setAttribute("r", 3.2);
    d.style.transitionDelay = (i++ * 14) + "ms";
    dg.appendChild(d);
  }
}

/* ————— SMIL pause under reduced motion ————— */
if (reduceMotion) $$("svg").forEach(s => s.pauseAnimations && s.pauseAnimations());

/* ————— Reveals ————— */
const io = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}, { threshold: .12, rootMargin: "0px 0px -6% 0px" });
$$(".reveal").forEach(el => io.observe(el));
requestAnimationFrame(() => document.body.classList.add("loaded"));

/* ————— Counters ————— */
const cio = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    cio.unobserve(e.target);
    const el = e.target, to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0);
    const t0 = performance.now(), dur = 1400;
    (function tick(t) {
      const k = Math.min(1, (t - t0) / dur), ease = 1 - Math.pow(1 - k, 4);
      el.textContent = fmtNum(dec ? to * ease : Math.round(to * ease), dec);
      if (k < 1) requestAnimationFrame(tick);
      else { el.classList.add("done"); el.textContent = fmtNum(to, dec); }
    })(t0);
  }
}, { threshold: .6 });
$$(".count").forEach(el => cio.observe(el));

/* ————— Nav: progress, scrolled, scrollspy ————— */
const bar = $("#progressBar"), nav = $("#nav");
addEventListener("scroll", () => {
  const h = document.documentElement;
  bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
  nav.classList.toggle("scrolled", h.scrollTop > 8);
}, { passive: true });
const spy = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    $$(".nav-links a").forEach(a =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  }
}, { rootMargin: "-40% 0px -55% 0px" });
$$("main section[id]").forEach(s => spy.observe(s));

/* ————— Magnetic buttons + card tilt ————— */
if (!reduceMotion && matchMedia("(pointer:fine)").matches) {
  $$(".magnetic").forEach(el => {
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      el.style.transform = `translate(${x * 7}px, ${y * 7}px)`;
    });
    el.addEventListener("pointerleave", () => el.style.transform = "");
  });
  $$("[data-tilt]").forEach(card => {
    card.addEventListener("pointermove", e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", (px * 100) + "%");
      card.style.setProperty("--my", (py * 100) + "%");
      card.style.transform = `perspective(900px) rotateX(${(py - .5) * -3.5}deg) rotateY(${(px - .5) * 3.5}deg)`;
    });
    card.addEventListener("pointerleave", () => card.style.transform = "");
  });
}

/* ————— Pipeline node tooltips ————— */
const pipeTip = $("#pipeTip"), expCard = $(".exp-card");
if (pipeTip && expCard) {
  $$(".pipe .node[data-tip]").forEach(node => {
    const show = () => {
      pipeTip.hidden = false;
      pipeTip.textContent = I18N[lang][node.dataset.tip] || "";
      const nr = node.getBoundingClientRect(), cr = expCard.getBoundingClientRect();
      pipeTip.classList.add("show");
      const tw = pipeTip.offsetWidth, th = pipeTip.offsetHeight;
      let left = nr.left - cr.left + nr.width / 2 - tw / 2;
      left = Math.max(10, Math.min(left, cr.width - tw - 10));
      let top = nr.top - cr.top - th - 10;
      if (top < 6) top = nr.bottom - cr.top + 10;
      pipeTip.style.left = left + "px";
      pipeTip.style.top = top + "px";
      node.classList.add("tip-on");
    };
    const hide = () => { pipeTip.classList.remove("show"); node.classList.remove("tip-on"); };
    node.addEventListener("pointerenter", show);
    node.addEventListener("pointerleave", hide);
    node.addEventListener("focus", show);
    node.addEventListener("blur", hide);
  });
}

/* ————— Case studies ————— */
const csDlg = $("#csDialog");
if (csDlg) {
  $$(".cs-btn").forEach(btn => btn.addEventListener("click", () => {
    const n = btn.dataset.cs, card = btn.closest(".card");
    const hue = [...card.classList].find(c => c.startsWith("hue-")) || "hue-blue";
    csDlg.className = "cs " + hue;
    $("#csKicker").textContent = I18N[lang][`p${n}.award`] || "";
    $("#csTitle").textContent = I18N[lang][`p${n}.title`] || card.querySelector("h3").textContent;
    $("#csP").textContent = I18N[lang][`cs${n}.p`];
    $("#csA").textContent = I18N[lang][`cs${n}.a`];
    $("#csI").textContent = I18N[lang][`cs${n}.i`];
    $("#csR").textContent = I18N[lang][`cs${n}.r`];
    const tags = $("#csTags"); tags.innerHTML = "";
    const cardTags = card.querySelector(".tags"); if (cardTags) tags.appendChild(cardTags.cloneNode(true));
    const links = $("#csLinks"); links.innerHTML = "";
    card.querySelectorAll(".card-links a").forEach(a => links.appendChild(a.cloneNode(true)));
    const media = $("#csMedia"); media.innerHTML = "";
    if (n === "2") {
      media.innerHTML = `<div class="yt" role="button" tabindex="0" aria-label="Play Neoveo demo video">
        <img src="https://i.ytimg.com/vi/vKlY5o2FtXI/hqdefault.jpg" alt="Neoveo demo video" loading="lazy">
        <span class="yt-btn" aria-hidden="true"></span></div>`;
      const y = media.firstElementChild;
      const play = () => { y.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/vKlY5o2FtXI?autoplay=1" title="Neoveo demo" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>'; };
      y.addEventListener("click", play, { once: true });
      y.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); } }, { once: true });
    }
    csDlg.showModal();
  }));
  $("#csClose").addEventListener("click", () => csDlg.close());
  csDlg.addEventListener("click", e => { if (e.target === csDlg) csDlg.close(); });
  csDlg.addEventListener("close", () => { $("#csMedia").innerHTML = ""; });
}

/* ————— GitHub, live ————— */
function renderGH() {
  if (!ghData) return;
  const d = new Date(ghData.pushed).toLocaleDateString(lang === "es" ? "es-ES" : "en-US", { day: "numeric", month: "short", year: "numeric" });
  $("#ghText").innerHTML = `<strong>${ghData.repos}</strong> ${I18N[lang]["gh.repos"]} · ${I18N[lang]["gh.upd"]}: ${d}`;
  $("#ghLive").hidden = false;
}
(async () => {
  try {
    const [u, r] = await Promise.all([
      fetch("https://api.github.com/users/carmenwi").then(x => x.json()),
      fetch("https://api.github.com/users/carmenwi/repos?sort=pushed&per_page=1").then(x => x.json())
    ]);
    if (typeof u.public_repos !== "number") return;
    ghData = { repos: u.public_repos, pushed: (r[0] && r[0].pushed_at) || u.updated_at };
    renderGH();
  } catch {}
})();

/* ————— Copy email ————— */
$("#copyMail").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("witsglam@gmail.com");
    const toast = $("#toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  } catch { location.href = "mailto:witsglam@gmail.com"; }
});

$("#year").textContent = new Date().getFullYear();
