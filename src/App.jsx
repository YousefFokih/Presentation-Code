import React, { useState, useEffect } from "react";
import "./styles.css";
import img1 from "../Images/1.png";
import img2 from "../Images/2.jpg";
import img3 from "../Images/3.jpg";
import img4 from "../Images/4.jpg";
import img5 from "../Images/5.jpg";
import img6 from "../Images/6.jpg";
import img7 from "../Images/7.jpg";
import img8 from "../Images/8.jpg";
import img9 from "../Images/9.jpg";
import img10 from "../Images/10.jpg";
import img11 from "../Images/11.jpg";
import img12 from "../Images/12.png";
import logoLgna from "../Images/logo lgna.png";

const INITIAL_XIII_MEMBERS = [
  "ماريو جرجس",
  "فيرو اشرف",
  "جورج موسي",
  "ابانوب اسامة",
  "مايكل نبيل",
  "افرايم نبيل",
  "كيرلس عزت",
  "ابانوب فتحي",
  "عبدالله فتحي",
  "ميرهان غبريال",
  "توماس اشرف",
  "جون حنا",
  "مادونا هاني",
  "مينا رزق",
  "يوسف فوكية",
  "بولا عصام",
  "عادل عيد",
  "مارينا ميخائيل",
  "ابانوب جرجس",
  "كيرلس نان",
];

const MEDIA_TRACKS = [
  {
    id: "video",
    en: "VIDEO",
    ar: "فيديو",
    desc: "لقطات الأنشطة والمعسكرات",
    icon: "🎬",
  },
  {
    id: "photo",
    en: "PHOTO",
    ar: "تصوير فوتوغرافي",
    desc: "كاميرات وإضاءة وكادرات",
    icon: "📸",
  },
  {
    id: "edit",
    en: "EDIT",
    ar: "معالجة وتعديل",
    desc: "تنقية وألوان وريتوتش",
    icon: "✨",
  },
  {
    id: "graphic",
    en: "GRAPHIC DESIGNER",
    ar: "تصميم جرافيك",
    desc: "بوسترات وهوية وسوشيال ميديا",
    icon: "🎨",
  },
  {
    id: "editor",
    en: "VIDEO EDITOR",
    ar: "مونتاج فيديو",
    desc: "قص ودمج وصوت وتلوين",
    icon: "🎞️",
  },
  {
    id: "drone",
    en: "DRONE",
    ar: "تصوير درون",
    desc: "لقطات سينمائية من فوق",
    icon: "🚁",
  },
];

const SLIDES_META = [
  { id: 0, label: "00 الدخول", bg: null },
  { id: 1, label: "01 البداية", bg: img1 },
  { id: 2, label: "02 الآية", bg: img2 },
  { id: 3, label: "03 الهيكل", bg: img3 },
  { id: 4, label: "04 Impact X 5", bg: img4 },
  { id: 5, label: "05 التخصصات", bg: img5 },
  { id: 6, label: "06 TOP LEADER", bg: img7 },
  { id: 7, label: "07 XIII", bg: img6 },
  { id: 8, label: "08 XVIII", bg: img8 },
  { id: 9, label: "09 IX", bg: img9 },
  { id: 10, label: "10 II", bg: img10 },
  { id: 11, label: "11 XIV", bg: img11 },
  { id: 12, label: "12 الختام", bg: img12 },
];

const TEAM_CONFIGS = {
  7: {
    storageKey: "a3lmy100_team_xiii_v1",
    teamName: "impact • XIII",
    mode: "single_leader",
    leader: "يؤانا طارق",
    defaultMembers: INITIAL_XIII_MEMBERS,
    placeholderSlots: 0,
  },
  8: {
    storageKey: "a3lmy100_team_xviii_v1",
    teamName: "IMPACT XVIII",
    mode: "dual_x",
    leftLeader: "فادي كمال",
    rightLeader: "مرثا نعمت الله",
    defaultMembers: [],
    placeholderSlots: 15,
  },
  9: {
    storageKey: "a3lmy100_team_ix_v1",
    teamName: "IMPACT IX",
    mode: "dual_x",
    leftLeader: "مادونا هاني",
    rightLeader: "مايكل إكرامي",
    defaultMembers: [],
    placeholderSlots: 15,
  },
  10: {
    storageKey: "a3lmy100_team_ii_v1",
    teamName: "IMPACT II",
    mode: "dual_x",
    leftLeader: "فيرو اشرف",
    rightLeader: "فادي القس",
    defaultMembers: [],
    placeholderSlots: 15,
  },
  11: {
    storageKey: "a3lmy100_team_xiv_v1",
    teamName: "IMPACT XIV",
    mode: "dual_x",
    leftLeader: "يوسف فوكية",
    rightLeader: "بولا رأفت",
    defaultMembers: [],
    placeholderSlots: 15,
  },
};

function RosterSlide({ config }) {
  const [members, setMembers] = useState(() => {
    try {
      const saved = localStorage.getItem(config.storageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return config.defaultMembers;
  });

  const [leadersRevealed, setLeadersRevealed] = useState(
    config.mode === "single_leader"
  );
  const [openMenuIdx, setOpenMenuIdx] = useState(null);
  const [editingIdx, setEditingIdx] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(config.storageKey, JSON.stringify(members));
    } catch (e) {
      console.error(e);
    }
  }, [members, config.storageKey]);

  const handleAddMember = (e) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) return;
    setMembers((prev) => [...prev, trimmed]);
    setNewName("");
    setIsAdding(false);
  };

  const handleStartEdit = (idx) => {
    setEditingIdx(idx);
    setEditValue(members[idx]);
    setOpenMenuIdx(null);
  };

  const handleSaveEdit = (idx) => {
    const trimmed = editValue.trim();
    if (trimmed) {
      setMembers((prev) => prev.map((item, i) => (i === idx ? trimmed : item)));
    }
    setEditingIdx(null);
  };

  const handleDelete = (idx) => {
    setMembers((prev) => prev.filter((_, i) => i !== idx));
    setOpenMenuIdx(null);
  };

  const handleReset = () => {
    setMembers(config.defaultMembers);
    setOpenMenuIdx(null);
  };

  const remainingPlaceholders = Math.max(
    0,
    config.placeholderSlots - members.length - 1
  );

  return (
    <div
      className="slide-inner roster-slide"
      onClick={() => setOpenMenuIdx(null)}
    >
      <div className="roster-top-bar">
        <div className="team-badge-glow">{config.teamName}</div>
        {config.defaultMembers.length > 0 && (
          <button
            type="button"
            className="subtle-reset-btn"
            onClick={handleReset}
            title="استعادة القائمة الأصلية"
          >
            ↺
          </button>
        )}
      </div>

      {config.mode === "single_leader" ? (
        <div className="single-leader-header">
          <span className="leader-crown-tag">LEADER</span>
          <h2 className="single-leader-name">{config.leader}</h2>
        </div>
      ) : (
        <div className="dual-leader-stage">
          <div
            className={`dual-leader-name left-entry ${
              leadersRevealed ? "revealed" : ""
            }`}
          >
            {config.leftLeader}
          </div>

          <button
            type="button"
            className={`x-trigger-btn ${leadersRevealed ? "active" : ""}`}
            onClick={() => setLeadersRevealed(true)}
            title="اضغط لإظهار القادة"
          >
            <span>X</span>
          </button>

          <div
            className={`dual-leader-name right-entry ${
              leadersRevealed ? "revealed" : ""
            }`}
          >
            {config.rightLeader}
          </div>
        </div>
      )}

      <div
        className={`members-grid-container ${
          leadersRevealed ? "grid-visible" : "grid-dimmed"
        }`}
      >
        {members.map((name, idx) => (
          <div
            key={`${name}-${idx}`}
            className={`member-pill-card ${
              openMenuIdx === idx ? "menu-open" : ""
            }`}
            style={{ animationDelay: `${idx * 0.04}s` }}
          >
            {editingIdx === idx ? (
              <div
                className="inline-edit-box"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  value={editValue}
                  autoFocus
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveEdit(idx);
                    if (e.key === "Escape") setEditingIdx(null);
                  }}
                />
                <button type="button" onClick={() => handleSaveEdit(idx)}>
                  ✓
                </button>
              </div>
            ) : (
              <>
                <span className="member-pill-text">{name}</span>
                <div
                  className="pill-menu-wrapper"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className="three-dots-btn"
                    onClick={() =>
                      setOpenMenuIdx(openMenuIdx === idx ? null : idx)
                    }
                    aria-label="خيارات"
                  >
                    ⋮
                  </button>
                  {openMenuIdx === idx && (
                    <div className="pill-dropdown-menu">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(idx)}
                      >
                        تغيير الاسم
                      </button>
                      <button
                        type="button"
                        className="danger"
                        onClick={() => handleDelete(idx)}
                      >
                        حذف
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}

        {isAdding ? (
          <form
            className="member-pill-card add-input-card"
            onSubmit={handleAddMember}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="اكتب الاسم..."
              value={newName}
              autoFocus
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsAdding(false);
              }}
            />
            <button type="submit">✓</button>
          </form>
        ) : (
          <button
            type="button"
            className="member-pill-card add-plus-card"
            onClick={(e) => {
              e.stopPropagation();
              setIsAdding(true);
            }}
            title="إضافة اسم جديد"
          >
            <span className="plus-symbol">+</span>
          </button>
        )}

        {Array.from({ length: remainingPlaceholders }).map((_, i) => (
          <div
            key={`slot-${i}`}
            className="member-pill-card empty-slot-card"
            onClick={(e) => {
              e.stopPropagation();
              setIsAdding(true);
            }}
            title="اضغط لإضافة اسم"
          >
            <span className="slot-dash">—</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [introExiting, setIntroExiting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Slide 1 states
  const [s1Typed, setS1Typed] = useState("");
  const [s1SubReady, setS1SubReady] = useState(false);

  // Slide 2 states
  const [s2Typed, setS2Typed] = useState("");
  const [s2RefReady, setS2RefReady] = useState(false);

  // Slide 3 states
  const [s3Opened, setS3Opened] = useState(false);

  // Slide 4 states
  const [s4Expanded, setS4Expanded] = useState(false);

  // Slide 5 states
  const [s5OpenTrack, setS5OpenTrack] = useState(null);

  // Slide 6 (Top Leader) states: 0 = "؟", 1 = "TOP LEADER", 2 = "Names"
  const [s6Stage, setS6Stage] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev < 12 ? prev + 1 : prev));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleEnterFromLogo = () => {
    if (introExiting) return;
    setIntroExiting(true);
    setTimeout(() => {
      setCurrentSlide(1);
      setIntroExiting(false);
    }, 460);
  };

  // Reset per-slide animations on slide change
  useEffect(() => {
    setMenuOpen(false);
    setS3Opened(false);
    setS4Expanded(false);
    setS5OpenTrack(null);
    setS6Stage(0);

    if (currentSlide === 1) {
      const fullText = "A3LMY100";
      setS1Typed("");
      setS1SubReady(false);
      let i = 0;
      const timer = setInterval(() => {
        i += 1;
        setS1Typed(fullText.slice(0, i));
        if (i >= fullText.length) {
          clearInterval(timer);
          setTimeout(() => setS1SubReady(true), 250);
        }
      }, 110);
      return () => clearInterval(timer);
    }

    if (currentSlide === 2) {
      const verse =
        "«فَلْيُضِئْ نُورُكُمْ هكَذَا قُدَّامَ النَّاسِ، لِكَيْ يَرَوْا أَعْمَالَكُمُ الْحَسَنَةَ، وَيُمَجِّدُوا أَبَاكُمُ الَّذِي فِي السَّمَاوَاتِ»";
      setS2Typed("");
      setS2RefReady(false);
      let i = 0;
      const timer = setInterval(() => {
        i += 1;
        setS2Typed(verse.slice(0, i));
        if (i >= verse.length) {
          clearInterval(timer);
          setTimeout(() => setS2RefReady(true), 300);
        }
      }, 38);
      return () => clearInterval(timer);
    }
  }, [currentSlide]);

  // Keyboard navigation + Escape closes menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (
        document.activeElement &&
        ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
      ) {
        return;
      }
      if (
        e.key === "ArrowLeft" ||
        e.key === "ArrowDown" ||
        e.key === "PageDown"
      ) {
        setCurrentSlide((prev) => (prev < 12 ? prev + 1 : prev));
      } else if (
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "PageUp"
      ) {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activeSlideMeta =
    SLIDES_META.find((s) => s.id === currentSlide) || SLIDES_META[0];

  return (
    <div
      className="presentation-viewport"
      dir="rtl"
      onClick={() => {
        if (menuOpen) setMenuOpen(false);
      }}
    >
      {/* Fullscreen Animated Background Image (Hidden on Slide 0 Black Screen) */}
      {currentSlide !== 0 && activeSlideMeta.bg && (
        <>
          <div
            key={`bg-${currentSlide}`}
            className="fullscreen-bg-layer"
            style={{ backgroundImage: `url(${activeSlideMeta.bg})` }}
          />
          <div className="fullscreen-vignette-overlay" />
        </>
      )}

      {/* Logo Trigger Button for Slides Menu (Closed by Default) */}
      {currentSlide !== 0 && (
        <div
          className="top-corner-menu-wrap"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className={`logo-menu-btn ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="فتح أو إغلاق قائمة التنقل"
            aria-expanded={menuOpen}
            title="قائمة السلايدات"
          >
            <span className="logo-continuous-aura" aria-hidden="true" />
            <span className="logo-shutter-arc" aria-hidden="true" />
            <img
              src={logoLgna}
              alt="Om ElNour Logo"
              className="logo-trigger-img"
            />
          </button>

          {menuOpen && (
            <nav
              className="corner-slides-drawer"
              aria-label="السلايدات"
              onPointerMove={(e) => {
                const items = e.currentTarget.querySelectorAll(
                  ".drawer-slide-item"
                );
                const pointerY = e.clientY;
                items.forEach((el) => {
                  const rect = el.getBoundingClientRect();
                  const centerY = rect.top + rect.height / 2;
                  const dist = Math.abs(pointerY - centerY);
                  const radius = 115;
                  if (dist < radius) {
                    const factor = 1 - dist / radius;
                    const scale = 1 + factor * 0.06;
                    const shiftX = -factor * 6;
                    el.style.setProperty("--wave-scale", scale.toFixed(3));
                    el.style.setProperty("--wave-x", `${shiftX.toFixed(1)}px`);
                    el.classList.add("is-hovered-wave");
                  } else {
                    el.style.setProperty("--wave-scale", "1");
                    el.style.setProperty("--wave-x", "0px");
                    el.classList.remove("is-hovered-wave");
                  }
                });
              }}
              onPointerLeave={(e) => {
                const items = e.currentTarget.querySelectorAll(
                  ".drawer-slide-item"
                );
                items.forEach((el) => {
                  el.style.setProperty("--wave-scale", "1");
                  el.style.setProperty("--wave-x", "0px");
                  el.classList.remove("is-hovered-wave");
                });
              }}
            >
              <div className="drawer-header">
                <span className="dock-brand">
                  A3LMY100 <span>• 2026/2027</span>
                </span>
                <span className="dock-counter">{currentSlide} / 12</span>
              </div>

              <div className="drawer-slides-list">
                {SLIDES_META.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    className={`drawer-slide-item ${
                      currentSlide === slide.id ? "active" : ""
                    }`}
                    style={{ "--idx": idx }}
                    onClick={() => {
                      setCurrentSlide(slide.id);
                      setMenuOpen(false);
                    }}
                  >
                    <span className="drawer-item-index">
                      {String(slide.id).padStart(2, "0")}
                    </span>
                    <span className="drawer-item-label">{slide.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          )}
        </div>
      )}

      {/* Main Slide Stage */}
      <main className="slides-stage">
        {/* SLIDE 0: BLACK SCREEN + PULSING LOGO ENTRY */}
        {currentSlide === 0 && (
          <section
            className={`slide-inner slide-0-splash ${
              introExiting ? "is-exiting" : ""
            }`}
          >
            <button
              type="button"
              className="splash-logo-btn"
              onClick={handleEnterFromLogo}
              aria-label="اضغط للدخول إلى العرض"
              title="اضغط للدخول"
            >
              <span className="splash-logo-halo" aria-hidden="true" />
              <img
                src={logoLgna}
                alt="Om ElNour Media Logo"
                className="splash-logo-img"
              />
            </button>
          </section>
        )}

        {/* SLIDE 1 */}
        {currentSlide === 1 && (
          <section className="slide-inner slide-1">
            <h1 className="hero-typewriter">
              {s1Typed}
              <span className="typing-cursor">|</span>
            </h1>
            <p className={`hero-subtitle ${s1SubReady ? "show" : ""}`}>
              اللجنة الإعلامية — مجموعة أم النور الكشفية
            </p>
            <div className={`hero-season-glow ${s1SubReady ? "show" : ""}`}>
              2026 / 2027
            </div>
          </section>
        )}

        {/* SLIDE 2 */}
        {currentSlide === 2 && (
          <section className="slide-inner slide-2">
            <div className="verse-handwriting-box">
              <p className="verse-handwriting-text">{s2Typed}</p>
              <div className={`verse-ref-glow ${s2RefReady ? "show" : ""}`}>
                (متى ٥: ١٦)
              </div>
            </div>
          </section>
        )}

        {/* SLIDE 3 */}
        {currentSlide === 3 && (
          <section className="slide-inner slide-3">
            <button
              type="button"
              className={`structure-main-trigger ${s3Opened ? "opened" : ""}`}
              onClick={() => setS3Opened(true)}
            >
              هيكل اللجنة
            </button>

            {s3Opened && (
              <div className="structure-tree-reveal">
                <div className="structure-year-badge">قيادة 2026 / 2027</div>

                <div className="leader-node-group">
                  <span className="node-role-label">قائد اللجنة</span>
                  <div className="structure-bar primary-bar">ق. كيرلس نان</div>
                </div>

                {/* Animated Branching Arrows */}
                <div className="dual-arrows-svg-wrap">
                  <svg
                    viewBox="0 0 400 90"
                    className="animated-branch-svg"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 200 0 C 200 45, 95 40, 95 82"
                      className="branch-line"
                    />
                    <polygon
                      points="95,90 88,76 102,76"
                      className="branch-head"
                    />

                    <path
                      d="M 200 0 C 200 45, 305 40, 305 82"
                      className="branch-line"
                    />
                    <polygon
                      points="305,90 298,76 312,76"
                      className="branch-head"
                    />
                  </svg>
                </div>

                <div className="assistants-dual-row">
                  <div className="structure-bar assistant-bar left-bar">
                    م.ق ش/ يؤانا طارق
                  </div>
                  <div className="structure-bar assistant-bar right-bar">
                    م.ق ق/يوسف فوكية
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* SLIDE 4 */}
        {currentSlide === 4 && (
          <section className="slide-inner slide-4">
            <div
              className={`impact-hero-trigger ${s4Expanded ? "expanded" : ""}`}
              onClick={() => setS4Expanded(true)}
            >
              <span className="impact-word">IMPACT</span>
              <span className="impact-x5-burst">X 5</span>
            </div>

            {s4Expanded && (
              <div className="impact-details-cascade">
                <div className="tagline-sequence">
                  <span className="tag-part p1">ONE TEAM</span>
                  <span className="tag-sep s1">|</span>
                  <span className="tag-part p2">MANY TALENTS</span>
                  <span className="tag-sep s2">|</span>
                  <span className="tag-part p3">ONE IMPACT</span>
                </div>

                <p className="impact-footer-signature">
                  إعلامية — مجموعة أم النور الكشفية 2026 / 2027
                </p>
              </div>
            )}
          </section>
        )}

        {/* SLIDE 5 */}
        {currentSlide === 5 && (
          <section className="slide-inner slide-5">
            <h2 className="tracks-main-heading">اللجنة الإعلامية</h2>

            <div className="tracks-elements-grid">
              {MEDIA_TRACKS.map((track, idx) => {
                const isOpen = s5OpenTrack === track.id;
                return (
                  <div
                    key={track.id}
                    className={`track-element-card ${isOpen ? "open" : ""}`}
                    style={{ animationDelay: `${idx * 0.08}s` }}
                    onClick={() => setS5OpenTrack(isOpen ? null : track.id)}
                  >
                    <div className="track-element-front">
                      <span className="track-icon-orb">{track.icon}</span>
                      <span className="track-en-title">{track.en}</span>
                    </div>

                    <div className="track-element-drawer">
                      <h3>{track.ar}</h3>
                      <p>{track.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SLIDE 6 (TOP LEADER) */}
        {currentSlide === 6 && (
          <section className="slide-inner slide-6">
            {s6Stage === 0 && (
              <button
                type="button"
                className="mystery-question-orb"
                onClick={() => setS6Stage(1)}
                title="اضغط لاكتشاف المفاجأة"
              >
                <span>؟</span>
              </button>
            )}

            {s6Stage >= 1 && (
              <div className="top-leader-reveal-stage">
                <button
                  type="button"
                  className={`top-leader-title-btn ${
                    s6Stage === 2 ? "lifted" : ""
                  }`}
                  onClick={() => setS6Stage(2)}
                >
                  TOP LEADER
                </button>

                {s6Stage === 2 && (
                  <div className="top-leaders-names-drop">
                    <div className="top-leader-name-card card-1">
                      ميرهان غبريال
                    </div>
                    <div className="top-leader-amp">&amp;</div>
                    <div className="top-leader-name-card card-2">
                      جورج موسي
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* SLIDES 7, 8, 9, 10, 11 (TEAM ROSTERS) */}
        {TEAM_CONFIGS[currentSlide] && (
          <RosterSlide
            key={`roster-${currentSlide}`}
            config={TEAM_CONFIGS[currentSlide]}
          />
        )}

        {/* SLIDE 12 (THANK YOU) */}
        {currentSlide === 12 && (
          <section className="slide-inner slide-12">
            <div className="thank-you-showcase" dir="ltr">
              <div className="ty-aura-ring" aria-hidden="true" />
              <div className="ty-scan-beam" aria-hidden="true" />

              <h1 className="thank-you-kinetic-word" aria-label="Thank You">
                {"Thank You".split("").map((char, idx) => (
                  <span
                    key={`${char}-${idx}`}
                    className={`ty-char ${char === " " ? "ty-space" : ""}`}
                    style={{ "--i": idx }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>

              <div className="ty-accent-bar" aria-hidden="true" />
            </div>
          </section>
        )}
      </main>

      {/* Bottom Right & Left Navigation Arrows (Mobile Friendly) */}
      <div
        className="bottom-nav-arrows"
        role="group"
        aria-label="التنقل بين الصفحات"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="bottom-arrow-btn arrow-right-btn"
          onClick={handleNextSlide}
          disabled={currentSlide === 12}
          aria-label="الصفحة التالية"
          title="التالي"
        >
          ›
        </button>

        <span className="bottom-slide-indicator">{currentSlide} / 12</span>

        <button
          type="button"
          className="bottom-arrow-btn arrow-left-btn"
          onClick={handlePrevSlide}
          disabled={currentSlide === 0}
          aria-label="الصفحة السابقة"
          title="السابق"
        >
          ‹
        </button>
      </div>
    </div>
  );
}