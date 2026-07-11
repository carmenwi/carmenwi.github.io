"use strict";
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ————— i18n ————— */
const I18N = {
  en: {
    "skip": "Skip to content",
    "nav.work": "Work", "nav.skills": "Skills", "nav.journey": "Journey", "nav.about": "About", "nav.contact": "Contact",
    "hero.status": "Open to internships & junior roles — US & EU work authorization",
    "hero.sub": "I turn raw data into decisions — machine learning, statistics and storytelling with",
    "hero.cta1": "Selected work", "hero.cta2": "Get in touch",
    "hero.loc": "Seville, Spain · Dual citizen US / ES",
    "stats.gpa": "GPA — B.S. Data Science",
    "stats.projects": "university & personal projects",
    "stats.first": "1st",
    "stats.hack": "Innovation Award — Hack4Edu 2025",
    "stats.community": "students in the community I lead",
    "work.kicker": "Selected work",
    "work.title": "Projects that shipped, won, or taught me the most.",
    "work.more": "Everything else lives on GitHub",
    "p1.award": "1st Place — Hack4Edu 2025, global hackathon",
    "p1.title": "AI-powered study platform",
    "p1.desc": "Led a team of 4 building an educational platform to fight dropout rates: a recommendation engine generating personalized study paths and AI summaries. MVP deployed on Streamlit Cloud.",
    "p2.award": "NASA Space Apps Challenge 2025",
    "p2.desc": "48-hour build for the Planetary Defense challenge: near-Earth-object telemetry from NASA's NeoWs API, classified by hazard level and rendered as an interactive orbital dashboard.",
    "p3.award": "Academic research — healthcare ML",
    "p3.title": "Frailty prediction in elderly patients",
    "p3.desc": "95% sensitivity detecting mortality risk on a highly imbalanced medical dataset — KNN + K-Means pipeline, SMOTE resampling and cross-validation against overfitting.",
    "p4.award": "Risk modeling in R",
    "p4.title": "Credit default detection",
    "p4.desc": "Logistic regression model predicting loan default at 82% precision / 95% sensitivity, isolating the variables that drive risk and validating against overfit.",
    "p5.award": "Devpost — Gemini hackathon 2026",
    "p5.title": "Building with Gemini",
    "p5.desc": "Latest hackathon entry exploring Google's Gemini models in a TypeScript app — rapid prototyping outside my Python comfort zone.",
    "skills.kicker": "Toolkit",
    "skills.title": "Depth where it matters, breadth everywhere else.",
    "skills.g1": "Languages & core", "skills.g2": "Machine learning", "skills.g3": "Data & cloud", "skills.g4": "Visualization & BI",
    "skills.reg": "Regression", "skills.cls": "Classification", "skills.etl": "ETL pipelines",
    "journey.kicker": "Journey",
    "journey.title": "A short history of momentum.",
    "j5.t": "Devpost Gemini hackathon",
    "j5.d": "Kept shipping — exploring generative AI tooling beyond coursework.",
    "j4.t": "1st Place, Hack4Edu · NASA Space Apps · IBM Power BI certificate",
    "j4.d": "Innovation Award at a global hackathon (ProEduca — Telefónica), planetary-defense data viz for NASA's challenge, and BI certification.",
    "j3.t": "Google Data Analytics Professional Certificate",
    "j3.d": "Full analytics cycle: from cleaning to dashboards, capstone on GitHub.",
    "j2.t": "B.S. in Data Science — UNIR",
    "j2.d": "9.5/10 GPA, six High Honors so far. Elected admin of the degree's official student community (250+ students, peer mentoring).",
    "j1.t": "Summer Work & Travel — Washington, USA",
    "j1.d": "Worked two seasons in a fully English-speaking environment. Adaptability, first-hand.",
    "about.kicker": "About",
    "about.title": "Problem-solver first, technologist second.",
    "about.p1": "I'm Carmen — a data science student who measures work by outcomes: models that catch what humans miss, dashboards that change decisions, products that win awards. Dual US/Spanish citizen, so I can work on either side of the Atlantic without sponsorship.",
    "about.p2": "Off the keyboard I run a 250-student community, mentor peers, and collect hackathon weekends. Spanish native, English C1, French B1.",
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
    "nav.work": "Proyectos", "nav.skills": "Skills", "nav.journey": "Trayectoria", "nav.about": "Sobre mí", "nav.contact": "Contacto",
    "hero.status": "Disponible para prácticas y roles junior — permiso de trabajo en EE. UU. y UE",
    "hero.sub": "Convierto datos en decisiones — machine learning, estadística y storytelling con",
    "hero.cta1": "Ver proyectos", "hero.cta2": "Hablemos",
    "hero.loc": "Sevilla, España · Doble nacionalidad EE. UU. / ES",
    "stats.gpa": "Nota media — Grado en Ciencia de Datos",
    "stats.projects": "proyectos universitarios y personales",
    "stats.first": "1er",
    "stats.hack": "Premio a la Innovación — Hack4Edu 2025",
    "stats.community": "estudiantes en la comunidad que lidero",
    "work.kicker": "Proyectos destacados",
    "work.title": "Proyectos que se lanzaron, ganaron o me enseñaron más.",
    "work.more": "Todo lo demás está en GitHub",
    "p1.award": "1er Premio — Hack4Edu 2025, hackathon global",
    "p1.title": "Plataforma de estudio con IA",
    "p1.desc": "Lideré un equipo de 4 creando una plataforma educativa contra el abandono escolar: motor de recomendación con rutas de estudio personalizadas y resúmenes con IA. MVP desplegado en Streamlit Cloud.",
    "p2.award": "NASA Space Apps Challenge 2025",
    "p2.desc": "Construido en 48 horas para el reto de Defensa Planetaria: telemetría de objetos cercanos a la Tierra desde la API NeoWs de la NASA, clasificados por peligrosidad en un dashboard orbital interactivo.",
    "p3.award": "Investigación académica — ML en salud",
    "p3.title": "Predicción de fragilidad en pacientes ancianos",
    "p3.desc": "95% de sensibilidad detectando riesgo de mortalidad en un dataset médico muy desbalanceado — pipeline KNN + K-Means, SMOTE y validación cruzada contra el sobreajuste.",
    "p4.award": "Modelado de riesgo en R",
    "p4.title": "Detección de impago de créditos",
    "p4.desc": "Regresión logística que predice el impago con 82% de precisión y 95% de sensibilidad, aislando las variables que determinan el riesgo y validando contra el sobreajuste.",
    "p5.award": "Devpost — hackathon de Gemini 2026",
    "p5.title": "Construyendo con Gemini",
    "p5.desc": "Mi entrada más reciente: explorando los modelos Gemini de Google en una app TypeScript — prototipado rápido fuera de mi zona de confort en Python.",
    "skills.kicker": "Herramientas",
    "skills.title": "Profundidad donde importa, amplitud en todo lo demás.",
    "skills.g1": "Lenguajes y base", "skills.g2": "Machine learning", "skills.g3": "Datos y cloud", "skills.g4": "Visualización y BI",
    "skills.reg": "Regresión", "skills.cls": "Clasificación", "skills.etl": "Pipelines ETL",
    "journey.kicker": "Trayectoria",
    "journey.title": "Una breve historia de impulso.",
    "j5.t": "Hackathon Gemini de Devpost",
    "j5.d": "Sin dejar de crear — explorando IA generativa más allá del temario.",
    "j4.t": "1er Premio Hack4Edu · NASA Space Apps · Certificado IBM Power BI",
    "j4.d": "Premio a la Innovación en un hackathon global (ProEduca — Telefónica), visualización de defensa planetaria para el reto de la NASA y certificación en BI.",
    "j3.t": "Certificado Profesional de Análisis de Datos de Google",
    "j3.d": "Ciclo completo de analítica: de la limpieza a los dashboards, capstone en GitHub.",
    "j2.t": "Grado en Ciencia de Datos — UNIR",
    "j2.d": "Nota media 9.5/10, seis Matrículas de Honor hasta ahora. Administradora de la comunidad oficial del grado (250+ estudiantes, mentoría entre pares).",
    "j1.t": "Summer Work & Travel — Washington, EE. UU.",
    "j1.d": "Dos temporadas trabajando en un entorno 100% angloparlante. Adaptabilidad de primera mano.",
    "about.kicker": "Sobre mí",
    "about.title": "Primero resolver problemas, después la tecnología.",
    "about.p1": "Soy Carmen — estudiante de ciencia de datos que mide el trabajo por resultados: modelos que detectan lo que el ojo humano no ve, dashboards que cambian decisiones, productos que ganan premios. Doble nacionalidad EE. UU./España: puedo trabajar a ambos lados del Atlántico sin patrocinio de visado.",
    "about.p2": "Fuera del teclado gestiono una comunidad de 250 estudiantes, hago mentoría y colecciono fines de semana de hackathon. Español nativo, inglés C1, francés B1.",
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
function applyLang() {
  const dict = I18N[lang];
  $$("[data-i18n]").forEach(el => { const t = dict[el.dataset.i18n]; if (t) el.innerHTML = t; });
  document.documentElement.lang = lang;
  langSwitch.setAttribute("aria-checked", lang === "es" ? "true" : "false");
  localStorage.setItem("lang", lang);
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
  const mode = resolved();
  root.dataset.theme = localStorage.getItem("theme") || "auto";
  root.dataset.mode = mode;
}
themeBtn.addEventListener("click", () => {
  const next = resolved() === "dark" ? "light" : "dark";
  localStorage.setItem("theme", next);
  if (document.startViewTransition && !reduceMotion) {
    document.startViewTransition(() => { paintTheme(); fieldColors(); });
  } else { paintTheme(); fieldColors(); }
});
systemDark.addEventListener("change", () => { paintTheme(); fieldColors(); });
paintTheme();

/* ————— Particle field (data network) ————— */
const canvas = $("#field");
const ctx = canvas.getContext("2d");
let pts = [], W = 0, H = 0, dpr = 1, raf = null, running = false;
let colDot = "", colLine = "";
const mouse = { x: -9e3, y: -9e3 };

function fieldColors() {
  const cs = getComputedStyle(document.body);
  const accent = cs.getPropertyValue("--accent").trim();
  colDot = accent; colLine = accent;
}
function fieldSize() {
  const r = canvas.parentElement.getBoundingClientRect();
  dpr = Math.min(devicePixelRatio || 1, 2);
  W = r.width; H = r.height;
  canvas.width = W * dpr; canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const n = Math.min(120, Math.round((W * H) / 16000));
  pts = Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
    r: Math.random() * 1.6 + .8
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
  ctx.globalAlpha = 1;
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j];
      const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
      if (d < LINK) {
        ctx.globalAlpha = (1 - d / LINK) * .14;
        ctx.strokeStyle = colLine;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
  }
  for (const p of pts) {
    ctx.globalAlpha = .5;
    ctx.fillStyle = colDot;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
  }
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
      el.textContent = (to * ease).toFixed(dec);
      if (k < 1) requestAnimationFrame(tick);
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

/* ————— Magnetic buttons ————— */
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

  /* ————— Card tilt + spotlight ————— */
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
