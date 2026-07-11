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
    "stats.gpaval": "4.0<em>/4.0</em>",
    "stats.gpa": "GPA, 3rd year — B.S. Data Science",
    "stats.first": "1st",
    "stats.hack": "Innovation Award — Hack4Edu 2025",
    "stats.projects": "university & personal projects",
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
    "exp.prev": "Before data: two summer seasons in hospitality and events in Washington State, and a summer at Jackson Hole Mountain Resort, Wyoming — pressure, English, and customers, first-hand.",
    "pipe.orders": "orders", "pipe.tickets": "tickets", "pipe.events": "events",
    "pipe.wh": "single source of truth", "pipe.dash": "dashboards", "pipe.rec": "Recommender", "pipe.clinical": "clinical scoring",
    "work.kicker": "Selected projects",
    "work.title": "Every project tells a story. Here are five.",
    "work.more": "Everything else lives on GitHub",
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
    "j7.t": "Santander Excelencia 360º Scholarship",
    "j7.d": "Selected for Santander's excellence program, recognizing academic record and project track. Also: a summer serving thousands of visitors at Jackson Hole Mountain Resort, Wyoming.",
    "j6.t": "Data & AI Engineer — IVB Wellness Lab",
    "j6.d": "Six months owning serverless ETL, a production RAG agent and growth analytics for a health-tech company. Code straight to production.",
    "j5.t": "1st Place, Hack4Edu · NASA Space Apps · IBM Power BI",
    "j5.d": "Innovation Award at Iberoamerica's largest edtech hackathon, planetary-defense data viz at the Spanish Space Agency, and BI certification.",
    "j4.t": "Google Data Analytics Professional Certificate",
    "j4.d": "Full analytics cycle — cleaning to dashboards — completed alongside my degree and a summer job abroad. Capstone on GitHub.",
    "j3.t": "B.S. in Data Science — UNIR",
    "j3.d": "4.0/4.0 GPA this year (9.5/10 overall), six High Honors. Elected admin of the degree's official community — 250+ students, peer mentoring.",
    "j2.t": "Operations & Events — Columbia Hospitality, WA, USA",
    "j2.d": "Two Work & Travel seasons at a 4-star property: events, customer service, full-English environment.",
    "about.kicker": "About",
    "about.title": "Problem-solver first, technologist second.",
    "about.p1": "I'm Carmen — I've shipped data systems a company runs on, won an international hackathon, and kept a 4.0 GPA while doing it. Dual US/Spanish citizen: I can work on either side of the Atlantic, no sponsorship needed.",
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
    "stats.gpaval": "9,5<em>/10</em>",
    "stats.gpa": "Nota media — Grado en Ciencia de Datos",
    "stats.first": "1er",
    "stats.hack": "Premio a la Innovación — Hack4Edu 2025",
    "stats.projects": "proyectos universitarios y personales",
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
    "exp.prev": "Antes de los datos: dos temporadas de hostelería y eventos en el estado de Washington, y un verano en Jackson Hole Mountain Resort, Wyoming — presión, inglés y clientes, en primera persona.",
    "pipe.orders": "pedidos", "pipe.tickets": "tickets", "pipe.events": "eventos",
    "pipe.wh": "fuente única de verdad", "pipe.dash": "dashboards", "pipe.rec": "Recomendador", "pipe.clinical": "scoring clínico",
    "work.kicker": "Proyectos destacados",
    "work.title": "Cada proyecto cuenta una historia. Aquí van cinco.",
    "work.more": "Todo lo demás está en GitHub",
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
    "j7.t": "Beca Santander Excelencia 360º",
    "j7.d": "Seleccionada para el programa de excelencia de Santander por expediente y trayectoria de proyectos. Además: un verano atendiendo a miles de visitantes en Jackson Hole Mountain Resort, Wyoming.",
    "j6.t": "Data & AI Engineer — IVB Wellness Lab",
    "j6.d": "Seis meses a cargo de ETL serverless, un agente RAG en producción y analítica de crecimiento para una health-tech. Código directo a producción.",
    "j5.t": "1er Premio Hack4Edu · NASA Space Apps · IBM Power BI",
    "j5.d": "Premio a la Innovación en el mayor hackathon edtech de Iberoamérica, visualización de defensa planetaria en la Agencia Espacial Española y certificación en BI.",
    "j4.t": "Certificado Profesional de Análisis de Datos de Google",
    "j4.d": "Ciclo completo de analítica — de la limpieza a los dashboards — compaginado con el grado y un trabajo de verano en el extranjero. Capstone en GitHub.",
    "j3.t": "Grado en Ciencia de Datos — UNIR",
    "j3.d": "Nota media 9,5/10 (4.0/4.0 este año), seis Matrículas de Honor. Administradora de la comunidad oficial del grado — 250+ estudiantes, mentoría entre pares.",
    "j2.t": "Operaciones y eventos — Columbia Hospitality, WA, EE. UU.",
    "j2.d": "Dos temporadas Work & Travel en un hotel 4 estrellas: eventos, atención al cliente, entorno 100% en inglés.",
    "about.kicker": "Sobre mí",
    "about.title": "Primero resolver problemas, después la tecnología.",
    "about.p1": "Soy Carmen — he construido sistemas de datos de los que depende una empresa, he ganado un hackathon internacional y he mantenido una media de sobresaliente mientras tanto. Doble nacionalidad EE. UU./España: puedo trabajar a ambos lados del Atlántico sin patrocinio de visado.",
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
const langSwitch = $("#langSwitch");
const fmtNum = n => n >= 1000 ? n.toLocaleString(lang === "es" ? "es-ES" : "en-US") : String(n);
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
  $$(".count.done").forEach(el => el.textContent = fmtNum(+el.dataset.to));
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
      const v = to * ease;
      el.textContent = dec ? v.toFixed(dec) : fmtNum(Math.round(v));
      if (k < 1) requestAnimationFrame(tick);
      else { el.classList.add("done"); el.textContent = dec ? to.toFixed(dec) : fmtNum(to); }
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
