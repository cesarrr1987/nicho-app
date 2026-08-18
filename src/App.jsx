import React, { useState, useEffect } from "react";

const FREE_LIMIT = 2;

const T = {
  es: {
    tagline: "Encuentra tu nicho",
    sub: "8 preguntas. Un análisis con IA de quién eres. Y un plan concreto de qué vender, cómo y dónde monetizarlo.",
    start: "Descubrir mi nicho",
    seeLast: "Ver mi último resultado",
    back: "Atrás",
    next: "Siguiente",
    analyzing: "Analizando tu perfil…",
    analyzingSub: "Cruzando tu vocación con oportunidades reales de venta.",
    yourNiche: "Tu nicho ideal",
    vocation: "Lo que revela tu perfil",
    whatToSell: "Qué vender",
    howToSell: "Cómo venderlo",
    hooks: "Ganchos listos para tus videos",
    hashtags: "Hashtags para arrancar",
    monetize: "Cómo monetizar",
    potential: "Potencial",
    week1: "Tu primera semana, día a día",
    redo: "Hacer el test de nuevo",
    share: "Copiar mi resultado",
    shared: "¡Copiado! Pégalo donde quieras",
    errTitle: "Algo salió mal",
    errBody: "No pudimos generar tu recomendación. Inténtalo otra vez.",
    retry: "Reintentar",
    of: "de",
    selectHint: "Marca todas las que sientas tuyas",
    pickOne: "La que más te representa",
    paywallTitle: "Desbloquea NICHO Premium",
    paywallBody: "Ya usaste tus análisis gratis. Con Premium obtienes análisis ilimitados, planes de contenido de 30 días, análisis de productos ganadores y nichos alternativos.",
    paywallCta: "Obtener Premium",
    paywallLater: "Quizás luego",
    freeLeft: (n) => `${n} análisis gratis ${n === 1 ? "restante" : "restantes"}`,
  },
  en: {
    tagline: "Find your niche",
    sub: "8 questions. An AI analysis of who you are. And a concrete plan for what to sell, how, and where to monetize it.",
    start: "Discover my niche",
    seeLast: "See my last result",
    back: "Back",
    next: "Next",
    analyzing: "Reading your profile…",
    analyzingSub: "Matching your calling with real selling opportunities.",
    yourNiche: "Your ideal niche",
    vocation: "What your profile reveals",
    whatToSell: "What to sell",
    howToSell: "How to sell it",
    hooks: "Ready-to-use video hooks",
    hashtags: "Hashtags to start",
    monetize: "How to make money",
    potential: "Potential",
    week1: "Your first week, day by day",
    redo: "Take the test again",
    share: "Copy my result",
    shared: "Copied! Paste it anywhere",
    errTitle: "Something went wrong",
    errBody: "We couldn't generate your recommendation. Try again.",
    retry: "Retry",
    of: "of",
    selectHint: "Check all that feel like you",
    pickOne: "Whichever fits best",
    paywallTitle: "Unlock NICHO Premium",
    paywallBody: "You've used your free analyses. Premium gives you unlimited analyses, 30-day content plans, winning-product breakdowns and alternative niches.",
    paywallCta: "Get Premium",
    paywallLater: "Maybe later",
    freeLeft: (n) => `${n} free ${n === 1 ? "analysis left" : "analyses left"}`,
  },
};

const QUESTIONS = {
  es: [
    { key: "passion", q: "¿Qué te apasiona de verdad?", hint: "Marca todo lo que te prenda, no hay límite", multi: true, options: ["Viajes y lugares", "Moda y estilo", "Fitness y deporte", "Tecnología y gadgets", "Belleza y cuidado personal", "Hogar y decoración", "Comida y recetas", "Finanzas y negocios", "Humor y entretenimiento", "Mascotas y animales", "Espiritualidad y motivación", "Manualidades y DIY", "Música y canto", "Baile", "Cine, series y videojuegos", "Arte, dibujo y fotografía", "Autos y motores", "Crianza y familia", "Educación e idiomas", "Oficios y arreglos", "Escribir e historias"] },
    { key: "natural", q: "¿Qué se te da naturalmente bien?", hint: "Eso que la gente siempre te dice: '¿cómo sabes hacer eso?'", multi: true, options: ["Explicar cosas con claridad", "Hacer reír", "Organizar y planear", "Encontrar ofertas y gangas", "Dar consejos", "Crear cosas con las manos", "Contar historias", "Motivar a otros", "Analizar y comparar", "Tener buen ojo estético", "Cantar o actuar", "Bailar", "Reparar y armar cosas", "Conectar rápido con la gente"] },
    { key: "freeTime", q: "Si tuvieras un día libre total, ¿qué harías por gusto?", multi: false, options: ["Explorar lugares nuevos", "Ver/crear contenido", "Cocinar o crear algo", "Hacer ejercicio", "Aprender algo nuevo", "Compartir con gente/familia", "Comprar o buscar productos"] },
    { key: "work", q: "¿A qué te dedicas hoy?", multi: false, options: ["Empleado/a tiempo completo", "Estudiante", "Emprendedor/a", "Creador/a de contenido", "Busco un cambio / desempleado", "Otro"] },
    { key: "personality", q: "¿Cómo te sientes frente a la cámara?", multi: false, options: ["Me encanta hablar y mostrarme", "Prefiero no salir, solo voz/manos", "Quiero usar IA o sin cara", "Aún no lo sé"] },
    { key: "time", q: "¿Cuánto tiempo real puedes dedicarle al día?", multi: false, options: ["Menos de 1 hora", "1–2 horas", "3–4 horas", "Tiempo completo"] },
    { key: "budget", q: "¿Con cuánto presupuesto cuentas para empezar?", multi: false, options: ["$0 (solo mi tiempo)", "Menos de $100", "$100–$500", "Más de $500"] },
    { key: "goal", q: "¿Cuál es tu meta principal?", multi: false, options: ["Ingreso extra", "Reemplazar mi empleo", "Construir una marca", "Probar y aprender"] },
  ],
  en: [
    { key: "passion", q: "What are you truly passionate about?", hint: "Check everything that lights you up, no limit", multi: true, options: ["Travel & places", "Fashion & style", "Fitness & sports", "Tech & gadgets", "Beauty & personal care", "Home & decor", "Food & recipes", "Finance & business", "Humor & entertainment", "Pets & animals", "Spirituality & motivation", "Crafts & DIY", "Music & singing", "Dance", "Movies, series & gaming", "Art, drawing & photography", "Cars & engines", "Parenting & family", "Education & languages", "Trades & fixing things", "Writing & storytelling"] },
    { key: "natural", q: "What are you naturally good at?", hint: "What people always say 'wow, how do you know how to do that?' about", multi: true, options: ["Explaining things clearly", "Making people laugh", "Organizing & planning", "Finding deals & bargains", "Giving advice", "Making things by hand", "Telling stories", "Motivating others", "Analyzing & comparing", "Having a good eye for aesthetics", "Singing or performing", "Dancing", "Fixing & building things", "Connecting quickly with people"] },
    { key: "freeTime", q: "On a totally free day, what would you do for fun?", multi: false, options: ["Explore new places", "Watch/create content", "Cook or make something", "Work out", "Learn something new", "Hang out with people/family", "Shop or hunt for products"] },
    { key: "work", q: "What do you do today?", multi: false, options: ["Full-time employee", "Student", "Entrepreneur", "Content creator", "Looking for a change / unemployed", "Other"] },
    { key: "personality", q: "How do you feel in front of the camera?", multi: false, options: ["I love talking & being on screen", "Prefer voice/hands only", "I want to use AI / faceless", "Not sure yet"] },
    { key: "time", q: "How much real time can you give per day?", multi: false, options: ["Less than 1 hour", "1–2 hours", "3–4 hours", "Full time"] },
    { key: "budget", q: "What's your starting budget?", multi: false, options: ["$0 (just my time)", "Under $100", "$100–$500", "Over $500"] },
    { key: "goal", q: "What's your main goal?", multi: false, options: ["Extra income", "Replace my job", "Build a brand", "Test & learn"] },
  ],
};

export default function App() {
  const [lang, setLang] = useState("es");
  const [stage, setStage] = useState("welcome");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [uses, setUses] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    setUses(Number(window.localStorage.getItem("nicho_uses") || "0"));
    setHasSaved(!!window.localStorage.getItem("nicho_last_result"));
  }, []);

  const t = T[lang];
  const questions = QUESTIONS[lang];

  const toggle = (key, opt, multi) => {
    setAnswers((prev) => {
      if (multi) {
        const cur = prev[key] || [];
        return { ...prev, [key]: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt] };
      }
      return { ...prev, [key]: [opt] };
    });
  };

  const isAnswered = (q) => (answers[q.key] || []).length > 0;

  const startQuiz = () => {
    if (uses >= FREE_LIMIT) { setShowPaywall(true); return; }
    setAnswers({}); setStep(0); setStage("quiz");
  };

  const loadLast = () => {
    try {
      const saved = JSON.parse(window.localStorage.getItem("nicho_last_result"));
      if (saved) { setResult(saved); setStage("result"); }
    } catch {}
  };

  const generate = async () => {
    setStage("loading");
    const profile = questions.map((q) => `${q.q} -> ${(answers[q.key] || []).join(", ")}`).join("\n");
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, lang }),
      });
      if (!res.ok) throw new Error("api");
      const parsed = await res.json();
      setResult(parsed);
      window.localStorage.setItem("nicho_last_result", JSON.stringify(parsed));
      setHasSaved(true);
      const newUses = uses + 1;
      setUses(newUses);
      window.localStorage.setItem("nicho_uses", String(newUses));
      setStage("result");
    } catch (e) {
      setStage("error");
    }
  };

  const copyResult = async () => {
    if (!result) return;
    const lines = [
      `◆ NICHO — ${lang === "es" ? "Mi nicho ideal" : "My ideal niche"}: ${result.niche}`,
      result.subNiche ? `→ ${result.subNiche}` : "",
      "",
      `${t.whatToSell}:`,
      ...(result.whatToSell || []).map((p) => `• ${p.product} (${p.priceRange})`),
      "",
      `${t.hashtags}: ${(result.hashtags || []).join(" ")}`,
    ].filter(Boolean).join("\n");
    try {
      await navigator.clipboard.writeText(lines);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const remaining = Math.max(0, FREE_LIMIT - uses);

  return (
    <div style={S.root}>
      <style>{CSS}</style>

      <header style={S.top}>
        <div style={S.brand}><span style={S.mark}>◆</span> NICHO</div>
        <div style={S.topRight}>
          {stage !== "welcome" && remaining > 0 && <span style={S.freeBadge}>{t.freeLeft(remaining)}</span>}
          <div style={S.langWrap}>
            {["es", "en"].map((l) => (
              <button key={l} onClick={() => setLang(l)} style={{ ...S.langBtn, ...(lang === l ? S.langOn : {}) }}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </header>

      <main style={S.main}>
        {stage === "welcome" && (
          <div className="fade" style={S.welcome}>
            <div style={S.eyebrow}>{t.tagline}</div>
            <h1 style={S.h1}>
              {lang === "es" ? "Deja de adivinar." : "Stop guessing."}<br />
              <span style={S.h1accent}>{lang === "es" ? "Encuentra tu vocación y tu producto." : "Find your calling and your product."}</span>
            </h1>
            <p style={S.lead}>{t.sub}</p>
            <button style={S.cta} onClick={startQuiz}>{t.start} →</button>
            {hasSaved && (
              <div><button style={{ ...S.ghost, marginTop: 14, border: "none" }} onClick={loadLast}>{t.seeLast}</button></div>
            )}
          </div>
        )}

        {stage === "quiz" && (
          <div className="fade" key={step} style={S.quiz}>
            <div style={S.progRow}>
              <span style={S.progLabel}>{step + 1} {t.of} {questions.length}</span>
              <div style={S.progTrack}><div style={{ ...S.progFill, width: `${((step + 1) / questions.length) * 100}%` }} /></div>
            </div>
            <h2 style={S.q}>{questions[step].q}</h2>
            <p style={S.qhint}>{questions[step].hint || (questions[step].multi ? t.selectHint : t.pickOne)}</p>
            <div style={S.opts}>
              {questions[step].options.map((opt) => {
                const on = (answers[questions[step].key] || []).includes(opt);
                return (
                  <button key={opt} onClick={() => toggle(questions[step].key, opt, questions[step].multi)} style={{ ...S.opt, ...(on ? S.optOn : {}) }}>
                    <span style={{ ...S.dot, ...(on ? S.dotOn : {}) }}>{on ? "✓" : ""}</span>{opt}
                  </button>
                );
              })}
            </div>
            <div style={S.nav}>
              {step > 0 && <button style={S.ghost} onClick={() => setStep((s) => s - 1)}>← {t.back}</button>}
              <button style={{ ...S.cta, opacity: isAnswered(questions[step]) ? 1 : 0.4, pointerEvents: isAnswered(questions[step]) ? "auto" : "none", marginLeft: "auto" }}
                onClick={() => (step === questions.length - 1 ? generate() : setStep((s) => s + 1))}>
                {step === questions.length - 1 ? "✨ " + (lang === "es" ? "Ver mi nicho" : "See my niche") : t.next + " →"}
              </button>
            </div>
          </div>
        )}

        {stage === "loading" && (
          <div className="fade" style={S.loading}>
            <div className="spinner" style={S.spinner} />
            <h2 style={S.q}>{t.analyzing}</h2>
            <p style={S.lead}>{t.analyzingSub}</p>
          </div>
        )}

        {stage === "error" && (
          <div className="fade" style={S.loading}>
            <h2 style={S.q}>{t.errTitle}</h2>
            <p style={S.lead}>{t.errBody}</p>
            <button style={S.cta} onClick={generate}>{t.retry}</button>
          </div>
        )}

        {stage === "result" && result && (
          <div className="fade" style={S.result}>
            <div style={S.eyebrow}>{t.yourNiche}</div>
            <h1 style={S.nicheName}>{result.niche}</h1>
            {result.subNiche && <div style={S.subNiche}>→ {result.subNiche}</div>}
            <p style={S.why}>{result.why}</p>

            {result.vocationInsight && (
              <div style={S.vocationBox}>
                <div style={S.vocationLabel}>✦ {t.vocation}</div>
                <p style={S.vocationText}>{result.vocationInsight}</p>
              </div>
            )}

            <Section title={t.whatToSell} icon="🛍️">
              <div style={S.products}>
                {(result.whatToSell || []).map((p, i) => (
                  <div key={i} style={S.productRow}>
                    <div style={S.productTop}>
                      <span style={S.productName}>{p.product}</span>
                      <span style={S.productPrice}>{p.priceRange}</span>
                    </div>
                    <span style={S.productWhy}>{p.whyItWorks}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title={t.howToSell} icon="🎬">
              <div style={S.money}>
                {(result.howToSell || []).map((f, i) => (
                  <div key={i} style={S.moneyRow}>
                    <span style={S.moneyP}>{f.format}</span>
                    <span style={S.moneyH}>{f.detail}</span>
                  </div>
                ))}
              </div>
            </Section>

            {result.hooks && (
              <Section title={t.hooks} icon="🪝">
                <div style={S.hooksWrap}>
                  {result.hooks.map((h, i) => (
                    <div key={i} style={S.hookCard}>"{h}"</div>
                  ))}
                </div>
              </Section>
            )}

            {result.hashtags && (
              <Section title={t.hashtags} icon="#️⃣">
                <div style={S.chips}>{result.hashtags.map((x, i) => <span key={i} style={S.chip}>{x}</span>)}</div>
              </Section>
            )}

            <Section title={t.monetize} icon="💰">
              <div style={S.money}>
                {(result.monetize || []).map((m, i) => (
                  <div key={i} style={S.moneyRow}>
                    <div style={S.moneyTop}>
                      <span style={S.moneyP}>{m.platform}</span>
                      {m.potential && <span style={S.potential}>{m.potential}</span>}
                    </div>
                    <span style={S.moneyH}>{m.how}</span>
                  </div>
                ))}
              </div>
            </Section>

            {result.week1Plan && (
              <Section title={t.week1} icon="🗓️">
                <div style={S.money}>
                  {result.week1Plan.map((d, i) => (
                    <div key={i} style={S.moneyRow}>
                      <span style={S.moneyP}>{d.day}</span>
                      <span style={S.moneyH}>{d.task}</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            <div style={S.resultActions}>
              <button style={{ ...S.cta, flex: 1 }} onClick={copyResult}>
                {copied ? "✓ " + t.shared : "📋 " + t.share}
              </button>
            </div>
            <button style={{ ...S.ghost, marginTop: 12, width: "100%" }} onClick={() => {
              setAnswers({}); setStep(0); setResult(null);
              if (uses >= FREE_LIMIT) { setShowPaywall(true); setStage("welcome"); }
              else setStage("welcome");
            }}>↺ {t.redo}</button>
          </div>
        )}
      </main>

      {showPaywall && (
        <div style={S.modalWrap} onClick={() => setShowPaywall(false)}>
          <div className="fade" style={S.modal} onClick={(e) => e.stopPropagation()}>
            <div style={S.eyebrow}>★ Premium</div>
            <h2 style={{ ...S.q, marginBottom: 12 }}>{t.paywallTitle}</h2>
            <p style={{ ...S.lead, marginBottom: 24 }}>{t.paywallBody}</p>
            <button style={{ ...S.cta, width: "100%", marginBottom: 10 }} >{t.paywallCta}</button>
            <button style={{ ...S.ghost, width: "100%", border: "none" }} onClick={() => setShowPaywall(false)}>{t.paywallLater}</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div style={S.section}>
      <div style={S.sectionHead}><span style={S.sectionIcon}>{icon}</span><h3 style={S.sectionTitle}>{title}</h3></div>
      {children}
    </div>
  );
}

const ink = "#12110F", ink2 = "#1C1B17", card = "#211F1A", line = "#34322B", lime = "#D9F24E", cream = "#F3EFE3", dim = "#9C988A";

const S = {
  root: { minHeight: "100vh", background: ink, color: cream, fontFamily: "'Inter', system-ui, sans-serif", display: "flex", flexDirection: "column" },
  top: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: `1px solid ${line}` },
  brand: { fontWeight: 800, letterSpacing: "0.18em", fontSize: 16, display: "flex", alignItems: "center", gap: 8 },
  mark: { color: lime, fontSize: 13 },
  topRight: { display: "flex", alignItems: "center", gap: 12 },
  freeBadge: { fontSize: 11, fontWeight: 700, color: lime, border: `1px solid ${line}`, padding: "5px 10px", borderRadius: 999, letterSpacing: "0.04em" },
  langWrap: { display: "flex", gap: 4, background: ink2, padding: 3, borderRadius: 999, border: `1px solid ${line}` },
  langBtn: { border: "none", background: "transparent", color: dim, fontWeight: 700, fontSize: 12, padding: "5px 12px", borderRadius: 999, cursor: "pointer", letterSpacing: "0.05em" },
  langOn: { background: lime, color: ink },
  main: { flex: 1, display: "flex", justifyContent: "center", padding: "32px 20px 60px" },
  welcome: { maxWidth: 540, textAlign: "center", paddingTop: "6vh" },
  eyebrow: { color: lime, fontSize: 12, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 18 },
  h1: { fontSize: "clamp(30px, 7.5vw, 52px)", lineHeight: 1.04, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 20px" },
  h1accent: { color: lime },
  lead: { color: dim, fontSize: 16, lineHeight: 1.6, margin: "0 auto 32px", maxWidth: 440 },
  cta: { background: lime, color: ink, border: "none", padding: "15px 28px", borderRadius: 14, fontWeight: 800, fontSize: 16, cursor: "pointer", letterSpacing: "0.01em" },
  quiz: { maxWidth: 560, width: "100%" },
  progRow: { display: "flex", alignItems: "center", gap: 14, marginBottom: 30 },
  progLabel: { fontSize: 12, color: dim, fontWeight: 700, whiteSpace: "nowrap", letterSpacing: "0.05em" },
  progTrack: { flex: 1, height: 4, background: line, borderRadius: 999, overflow: "hidden" },
  progFill: { height: "100%", background: lime, borderRadius: 999, transition: "width .4s cubic-bezier(.2,.8,.2,1)" },
  q: { fontSize: "clamp(22px, 5vw, 30px)", fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 6px", lineHeight: 1.15 },
  qhint: { color: dim, fontSize: 13, margin: "0 0 22px" },
  opts: { display: "flex", flexDirection: "column", gap: 10 },
  opt: { display: "flex", alignItems: "center", gap: 12, textAlign: "left", background: card, border: `1px solid ${line}`, color: cream, padding: "15px 16px", borderRadius: 13, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all .15s" },
  optOn: { borderColor: lime, background: "#2a2a1c" },
  dot: { width: 20, height: 20, borderRadius: 6, border: `1px solid ${line}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: ink, flexShrink: 0 },
  dotOn: { background: lime, borderColor: lime },
  nav: { display: "flex", alignItems: "center", marginTop: 28, gap: 12 },
  ghost: { background: "transparent", color: dim, border: `1px solid ${line}`, padding: "13px 20px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer" },
  loading: { maxWidth: 460, textAlign: "center", paddingTop: "12vh" },
  spinner: { width: 44, height: 44, border: `3px solid ${line}`, borderTopColor: lime, borderRadius: "50%", margin: "0 auto 26px" },
  result: { maxWidth: 600, width: "100%" },
  nicheName: { fontSize: "clamp(28px, 6.5vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 8px", lineHeight: 1.05, color: cream },
  subNiche: { color: lime, fontWeight: 700, fontSize: 16, marginBottom: 16 },
  why: { color: dim, fontSize: 16, lineHeight: 1.65, margin: "0 0 8px" },
  vocationBox: { marginTop: 20, background: "#232314", border: `1px solid #3d3d22`, borderRadius: 16, padding: "18px 20px" },
  vocationLabel: { color: lime, fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 },
  vocationText: { color: cream, fontSize: 15, lineHeight: 1.6, margin: 0 },
  section: { marginTop: 30, background: ink2, border: `1px solid ${line}`, borderRadius: 18, padding: "22px 22px 24px" },
  sectionHead: { display: "flex", alignItems: "center", gap: 10, marginBottom: 16 },
  sectionIcon: { fontSize: 18 },
  sectionTitle: { fontSize: 13, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: lime, margin: 0 },
  products: { display: "flex", flexDirection: "column", gap: 14 },
  productRow: { display: "flex", flexDirection: "column", gap: 4, paddingBottom: 14, borderBottom: `1px solid ${line}` },
  productTop: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 },
  productName: { fontWeight: 700, fontSize: 15 },
  productPrice: { color: lime, fontWeight: 800, fontSize: 13, whiteSpace: "nowrap" },
  productWhy: { color: dim, fontSize: 13.5, lineHeight: 1.5 },
  chips: { display: "flex", flexWrap: "wrap", gap: 9 },
  chip: { background: card, border: `1px solid ${line}`, padding: "9px 14px", borderRadius: 999, fontSize: 14, fontWeight: 600 },
  hooksWrap: { display: "flex", flexDirection: "column", gap: 10 },
  hookCard: { background: card, border: `1px solid ${line}`, borderLeft: `3px solid ${lime}`, borderRadius: 12, padding: "13px 15px", fontSize: 14.5, lineHeight: 1.5, fontStyle: "italic" },
  money: { display: "flex", flexDirection: "column", gap: 14 },
  moneyRow: { display: "flex", flexDirection: "column", gap: 3, paddingBottom: 14, borderBottom: `1px solid ${line}` },
  moneyTop: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 },
  moneyP: { fontWeight: 800, fontSize: 15, color: lime },
  potential: { color: cream, fontWeight: 700, fontSize: 12.5, background: card, border: `1px solid ${line}`, padding: "3px 9px", borderRadius: 999, whiteSpace: "nowrap" },
  moneyH: { color: dim, fontSize: 14, lineHeight: 1.5 },
  resultActions: { display: "flex", gap: 10, marginTop: 30 },
  modalWrap: { position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 50 },
  modal: { background: ink2, border: `1px solid ${line}`, borderRadius: 22, padding: "30px 26px", maxWidth: 420, width: "100%" },
};

const CSS = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  .fade { animation: fade .45s ease; }
  @keyframes fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
  .spinner { animation: spin .8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  button:hover { filter: brightness(1.08); }
  @media (prefers-reduced-motion: reduce) { .fade, .spinner { animation: none; } }
`;
