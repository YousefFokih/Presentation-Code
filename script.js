import React, { useEffect, useState } from "react";

const STORAGE_KEY = "a3lmy100_roster_v1";

const INITIAL_ROSTER = {
  leaderTitle: "قائد اللجنة",
  leaderName: "ق. كيرلس نان",
  assistants: [
    { id: "a1", name: "مساعد أول" },
    { id: "a2", name: "مساعد ثانٍ" },
  ],
};

const IMPACT_CARDS = [
  {
    id: "lens",
    badge: "40",
    alt: "عدسة الكاميرا مع شعار 40",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ai-bot",
    badge: "40",
    alt: "روبوت ومسار عمل رقمي مع شعار 40",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "clapper",
    badge: "40",
    alt: "كلاكيت التصوير مع شعار 40",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
  },
];

const HUB_SYMBOLS = [
  {
    id: "camera",
    icon: "📷",
    title: "التصوير الفوتوغرافي",
    summary:
      "توثيق اللحظات الأساسية للخدمة والفعاليات بجودة عالية، مع ضبط الإضاءة والتكوين وإخراج صور جاهزة للنشر والأرشيف.",
  },
  {
    id: "video",
    icon: "🎬",
    title: "الفيديو والمونتاج",
    summary:
      "إنتاج الفيديوهات القصيرة والتغطيات المصورة، مع سرد بصري متماسك، وتقطيع دقيق، وترجمة وصوت واضح.",
  },
  {
    id: "design",
    icon: "🎨",
    title: "التصميم الجرافيكي",
    summary:
      "بناء هوية بصرية موحدة للبوسترات والبنرات والعروض، مع مراعاة تناسق الألوان والخطوط وسهولة القراءة.",
  },
  {
    id: "motion",
    icon: "✨",
    title: "الموشن جرافيك",
    summary:
      "تحريك العناصر والنصوص والأفكار المعقدة بشكل جذاب ومبسط يرفع من تفاعل الجمهور ووضوح الرسالة.",
  },
  {
    id: "ai",
    icon: "🤖",
    title: "أدوات الذكاء الاصطناعي",
    summary:
      "توظيف أدوات الذكاء الاصطناعي لتسريع العصف الذهني، وتوليد الأفكار البصرية، وتحسين كفاءة العمل اليومي.",
  },
  {
    id: "content",
    icon: "✍️",
    title: "صناعة المحتوى",
    summary:
      "صياغة الرسائل والنصوص والسكربتات بروح قريبة وواضحة تخدم هدف السلايد وتوصل المعنى بسهولة.",
  },
];

const SLIDES_META = [
  {
    index: 0,
    label: "1 · الافتتاحية",
    footer: "2026 — 2027 · A3LMY100 · البداية",
    bg: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1600&q=80",
  },
  {
    index: 1,
    label: "2 · الآية",
    footer: "2026 — 2027 · A3LMY100 · الايه",
    bg: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80",
  },
  {
    index: 2,
    label: "3 · الهيكل",
    footer: "2026 — 2027 · A3LMY100 · الهيكل",
    bg: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    index: 3,
    label: "4 · Impact X 4",
    footer: "2026 — 2027 · A3LMY100 · impact",
    bg: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  },
  {
    index: 4,
    label: "5 · المحاور",
    footer: "2026 — 2027 · A3LMY100 · المحاور",
    bg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
  },
];

function useTypewriter(text, active, speed = 45) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      return;
    }
    let idx = 0;
    setDisplayed("");
    const timer = setInterval(() => {
      idx += 1;
      setDisplayed(text.slice(0, idx));
      if (idx >= text.length) {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, active, speed]);

  return displayed;
}

export default function App() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [refVisible, setRefVisible] = useState(false);
  const [activeSymbolId, setActiveSymbolId] = useState(null);
  const [rosterOpen, setRosterOpen] = useState(false);

  const [roster, setRoster] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ROSTER;
    } catch {
      return INITIAL_ROSTER;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(roster));
    } catch {
      // تجاهل أخطاء التخزين المحلي
    }
  }, [roster]);

  const currentSlide = SLIDES_META[slideIndex];

  const goToSlide = (targetIndex, initialStep = 0) => {
    const clamped = Math.max(0, Math.min(SLIDES_META.length - 1, targetIndex));
    setSlideIndex(clamped);
    setStep(initialStep);
    setRefVisible(false);
    setActiveSymbolId(null);
  };

  const advanceStep = () => {
    if (slideIndex === 4 && activeSymbolId) return;

    if (slideIndex === 0) {
      if (step < 1) setStep(1);
      else goToSlide(1, 0);
      return;
    }

    if (slideIndex === 1) {
      if (step < 1) setStep(1);
      else goToSlide(2, 0);
      return;
    }

    if (slideIndex === 2) {
      if (step < 2) setStep((s) => s + 1);
      else goToSlide(3, 0);
      return;
    }

    if (slideIndex === 3) {
      if (step < 2) setStep((s) => s + 1);
      else goToSlide(4, 0);
      return;
    }

    if (slideIndex === 4) {
      if (step < 1) setStep(1);
      else goToSlide(0, 0);
    }
  };

  useEffect(() => {
    if (slideIndex === 1 && step >= 1) {
      setRefVisible(false);
      const timer = setTimeout(() => {
        setRefVisible(true);
      }, 1450);
      return () => clearTimeout(timer);
    }
    setRefVisible(false);
  }, [slideIndex, step]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
      if (e.key === " " || e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        advanceStep();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        if (step > 0) setStep((s) => s - 1);
        else if (slideIndex > 0) goToSlide(slideIndex - 1, 1);
      } else if (e.key === "Home" || e.key.toLowerCase() === "r") {
        goToSlide(0, 0);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const heroHeadline = useTypewriter("A3LMY100 — 2026 / 2027", slideIndex === 0 && step >= 1, 42);
  const heroSubline = useTypewriter(
    "رؤية متجددة وحضور مؤثر في كل خطوة",
    slideIndex === 0 && step >= 1,
    38
  );

  const isBlurred = step >= 1;
  const selectedSymbol = HUB_SYMBOLS.find((item) => item.id === activeSymbolId) || null;

  const updateAssistant = (id, value) => {
    setRoster((prev) => ({
      ...prev,
      assistants: prev.assistants.map((a) => (a.id === id ? { ...a, name: value } : a)),
    }));
  };

  const addAssistant = () => {
    setRoster((prev) => ({
      ...prev,
      assistants: [
        ...prev.assistants,
        { id: `a_${Date.now()}`, name: `مساعد ${prev.assistants.length + 1}` },
      ],
    }));
  };

  const removeAssistant = (id) => {
    setRoster((prev) => ({
      ...prev,
      assistants: prev.assistants.filter((a) => a.id !== id),
    }));
  };

  return (
    <div
      className="deck-shell"
      onClick={(e) => {
        if (
          e.target.closest(".top-controls") ||
          e.target.closest(".roster-drawer") ||
          e.target.closest("button") ||
          e.target.closest("input")
        ) {
          return;
        }
        advanceStep();
      }}
    >
      <header className="top-controls">
        <div className="ctrl-group">
          <button
            type="button"
            className="ctrl-btn"
            onClick={() => goToSlide(0, 0)}
            title="العودة فوراً لأول شريحة"
          >
            ↩ البداية
          </button>
          {SLIDES_META.map((s) => (
            <button
              key={s.index}
              type="button"
              className={`ctrl-btn ${slideIndex === s.index ? "active" : ""}`}
              onClick={() => goToSlide(s.index, 0)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="ctrl-group">
          <button
            type="button"
            className={`ctrl-btn ${rosterOpen ? "active" : ""}`}
            onClick={() => setRosterOpen((v) => !v)}
          >
            👥 أسماء التيم
          </button>
        </div>
      </header>

      {rosterOpen && (
        <aside className="roster-drawer">
          <strong>إدارة أسماء الهيكل والتيم</strong>
          <input
            className="roster-input"
            value={roster.leaderName}
            onChange={(e) => setRoster((p) => ({ ...p, leaderName: e.target.value }))}
            placeholder="اسم القائد"
          />
          {roster.assistants.map((item) => (
            <div key={item.id} className="roster-row">
              <input
                className="roster-input"
                value={item.name}
                onChange={(e) => updateAssistant(item.id, e.target.value)}
              />
              <button
                type="button"
                className="ctrl-btn"
                onClick={() => removeAssistant(item.id)}
              >
                ✕
              </button>
            </div>
          ))}
          <div className="roster-row">
            <button type="button" className="ctrl-btn active" onClick={addAssistant}>
              + إضافة اسم
            </button>
            <button
              type="button"
              className="ctrl-btn"
              onClick={() => setRoster(INITIAL_ROSTER)}
            >
              استعادة الافتراضي
            </button>
          </div>
        </aside>
      )}

      <main className="slide">
        <img
          src={currentSlide.bg}
          alt={currentSlide.label}
          className={`slide-bg ${isBlurred ? "blurred-view" : "clear-view"}`}
        />
        <div className={`slide-scrim ${isBlurred ? "visible" : ""}`} />

        <div className="slide-content">
          {slideIndex === 0 && step >= 1 && (
            <>
              <h1 className="hero-title">
                {heroHeadline}
                <span className="type-cursor" />
              </h1>
              <p className="hero-sub">{heroSubline}</p>
            </>
          )}

          {slideIndex === 1 && step >= 1 && (
            <>
              <p className={`verse-handwriting ${step >= 1 ? "active" : ""}`}>
                «فَلْيُضِئْ نُورُكُمْ هٰكَذَا قُدَّامَ النَّاسِ، لِكَيْ يَرَوْا أَعْمَالَكُمُ
                الْحَسَنَةَ، وَيُمَجِّدُوا أَبَاكُمُ الَّذِي فِي السَّمَاوَاتِ.»
              </p>
              <div className={`verse-ref ${refVisible ? "revealed" : ""}`}>متى 5 : 16</div>
            </>
          )}

          {slideIndex === 2 && step >= 1 && (
            <div className="structure-wrap">
              <div className="header-layer">
                <span className={`red-bar-vertical ${step >= 1 ? "show" : ""}`} />
                <h2 className={`structure-title ${step >= 1 ? "show" : ""}`}>هيكل اللجنة</h2>
              </div>

              <div className={`team-layers ${step >= 2 ? "show" : ""}`}>
                <div className="leader-row">
                  <span className="leader-caption">{roster.leaderTitle}</span>
                  <span className="leader-badge-red">{roster.leaderName}</span>
                </div>

                <div className="assistants-glass-panel">
                  {roster.assistants.map((person) => (
                    <div key={person.id} className="assistant-line-item">
                      <span className="red-accent-line" />
                      <span>{person.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {slideIndex === 3 && step >= 1 && (
            <div className="impact-stage">
              <h2 className={`impact-title ${step >= 1 ? "show" : ""}`}>
                impact <span className="impact-x">X</span> 4
              </h2>

              <p className={`impact-sub-yellow ${step >= 2 ? "show" : ""}`}>
                ONE TEAM | MANY TALENTS | ONE IMPACT
              </p>
              <p className={`impact-sub-red ${step >= 2 ? "show" : ""}`}>اللجنة الاعلامية</p>

              <div className="impact-cards-grid">
                {IMPACT_CARDS.map((card) => (
                  <div
                    key={card.id}
                    className={`impact-frame-card ${step >= 2 ? "drawn" : ""}`}
                  >
                    <div className="impact-photo-inner">
                      <img src={card.image} alt={card.alt} />
                      <span className="embossed-40-badge">{card.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slideIndex === 4 &&
            step >= 1 &&
            (selectedSymbol ? (
              <div className="detail-panel">
                <div className="detail-header">
                  <h2 className="detail-title">
                    {selectedSymbol.icon} {selectedSymbol.title}
                  </h2>
                  <button
                    type="button"
                    className="ctrl-btn active"
                    onClick={() => setActiveSymbolId(null)}
                  >
                    ← رجوع للرموز
                  </button>
                </div>
                <p className="detail-body">{selectedSymbol.summary}</p>
              </div>
            ) : (
              <div className={`hub-grid ${step >= 1 ? "show" : ""}`}>
                {HUB_SYMBOLS.map((sym) => (
                  <button
                    key={sym.id}
                    type="button"
                    className="symbol-tile"
                    onClick={() => setActiveSymbolId(sym.id)}
                  >
                    <span className="symbol-glyph">{sym.icon}</span>
                    <span className="symbol-label">{sym.title}</span>
                  </button>
                ))}
              </div>
            ))}
        </div>
      </main>

      <footer className="slide-footer-meta">
        <span>{currentSlide.footer}</span>
        <span>
          شريحة {slideIndex + 1} / {SLIDES_META.length}
        </span>
      </footer>
    </div>
  );
}