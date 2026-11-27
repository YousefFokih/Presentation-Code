import React, { useEffect, useMemo, useRef, useState } from "react";

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

const STORAGE_KEY = "a3lmy100_om_elnour_roster_2026_2027";

const MEDIA_TRACKS = [
  { code: "VIDEO", title: "فيديو", desc: "لقطات الأنشطة والمعسكرات" },
  { code: "PHOTO", title: "تصوير فوتوغرافي", desc: "كاميرات وإضاءة وكادرات" },
  { code: "EDIT", title: "معالجة وتعديل", desc: "تنقية وألوان وريتوتش" },
  { code: "GRAPHIC DESIGNER", title: "تصميم جرافيك", desc: "بوسترات وهوية وسوشيال ميديا" },
  { code: "VIDEO EDITOR", title: "مونتاج فيديو", desc: "قص ودمج وصوت وتلوين" },
  { code: "DRONE", title: "تصوير درون", desc: "لقطات من فوق" },
];

const DEFAULT_ROSTER = [
  "يؤانا طارق",
  "ماريو جرجس",
  "فيرو اشرف",
  "جورج موسي",
  "ابانوب اسامة",
  "مايكل نبيل",
  "افرايم نبيل",
  "كيرلس عزت",
  "ابانوب فتحي",
  "عبد الله فتحي",
  "ماریهان غبريال",
  "توماس اشرف",
  "جون حنا",
  "مادونا هاني",
  "مینا رزق",
  "يوسف فوكية",
  "بولا عصام",
  "عادل عيد",
  "مارينا ميخائيل",
  "ابانوب جرجس",
  "كيرلس نان",
].map((name, index) => ({
  id: `member-${index + 1}`,
  name,
  role: "عضو اللجنة الإعلامية",
  track: "A3LMY100 • XIII",
  notes: "مجموعة أم النور الكشفية — 2026 / 2027",
}));

const SLIDE_CONFIG = [
  {
    num: 1,
    navLabel: "01 البداية",
    badge: "SLIDE 01 • OM ELNOUR MEDIA COMMITTEE",
    title: "A3LMY100 — إعلا 100",
    subtitle: "مجموعة أم النور الكشفية • اللجنة الإعلامية — موسم 2026 / 2027",
    image: img1,
    fit: "cover",
  },
  {
    num: 2,
    navLabel: "02 الآية",
    badge: "SLIDE 02 • VERSE",
    title: "رسالة النور",
    subtitle:
      "«فَلْيُضِئْ نُورُكُمْ هَكَذَا قُدَّامَ النَّاسِ، لِكَيْ يَرَوْا أَعْمَالَكُمُ الْحَسَنَةَ، وَيُمَجِّدُوا أَبَاكُمُ الَّذِي فِي السَّمَاوَاتِ»",
    image: img2,
    fit: "contain",
  },
  {
    num: 3,
    navLabel: "03 الهيكل",
    badge: "SLIDE 03 • LEADERSHIP STRUCTURE",
    title: "هيكل اللجنة",
    subtitle: "قيادة وتنظيم موسم 2026 / 2027",
    image: img3,
    fit: "contain",
    leaders: [
      { name: "ق. يؤانا طارق", role: "قائد اللجنة" },
      { name: "ق. كيرلس نان", role: "مساعد قائد" },
      { name: "ق. يوسف فوكية", role: "هيكل اللجنة" },
    ],
  },
  {
    num: 4,
    navLabel: "04 Impact X 5",
    badge: "SLIDE 04 • IMPACT X 5",
    title: "ONE TEAM | MANY TALENTS | ONE IMPACT",
    subtitle: "إعلا 100 — مجموعة أم النور الكشفية 2026 / 2027",
    image: img4,
    fit: "contain",
  },
  {
    num: 5,
    navLabel: "05 التخصصات",
    badge: "SLIDE 05 • MEDIA TRACKS",
    title: "تخصصات اللجنة الإعلامية",
    subtitle: "الأدوار والمهام الأساسية داخل الفريق",
    image: img5,
    fit: "contain",
    showTracks: true,
  },
  {
    num: 6,
    navLabel: "06 الأعضاء",
    badge: "SLIDE 06 • TEAM ROSTER (XIII)",
    title: "قائمة أعضاء اللجنة",
    subtitle: "إدارة وتعديل وحذف الأعضاء مع حفظ تلقائي على المتصفح",
    image: img6,
    fit: "contain",
    showRoster: true,
  },
  {
    num: 7,
    navLabel: "07 TOP LEADER",
    badge: "SLIDE 07 • TOP LEADER",
    title: "مريهان غبريال & جورج موسي",
    subtitle: "A3LMY100 • 2026 / 2027",
    image: img7,
    fit: "contain",
  },
  {
    num: 8,
    navLabel: "08 XVIII",
    badge: "SLIDE 08 • IMPACT XVIII",
    title: "فادي كمال X مرثا نعمت الله",
    subtitle: "A3LMY100 • 2026 / 2027",
    image: img8,
    fit: "contain",
  },
  {
    num: 9,
    navLabel: "09 IX",
    badge: "SLIDE 09 • IMPACT IX",
    title: "مادونا هاني X مايكل إكرامي",
    subtitle: "A3LMY100 • 2026 / 2027",
    image: img9,
    fit: "contain",
  },
  {
    num: 10,
    navLabel: "10 II",
    badge: "SLIDE 10 • IMPACT II",
    title: "فيرو اشرف X فادي القس",
    subtitle: "A3LMY100 • 2026 / 2027",
    image: img10,
    fit: "contain",
  },
  {
    num: 11,
    navLabel: "11 XIV",
    badge: "SLIDE 11 • IMPACT XIV",
    title: "يوسف فوكية X بولا رأفت",
    subtitle: "A3LMY100 • 2026 / 2027",
    image: img11,
    fit: "contain",
  },
  {
    num: 12,
    navLabel: "12 الختام",
    badge: "SLIDE 12 • THANK YOU",
    title: "شكراً لمتابعتكم",
    subtitle: "مجموعة أم النور الكشفية — اللجنة الإعلامية 2026 / 2027",
    image: img12,
    fit: "contain",
  },
];

const SCOPED_FIX_CSS = `
  .a3-root {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
  .a3-nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 14px;
    position: sticky;
    top: 0;
    z-index: 20;
    backdrop-filter: blur(10px);
  }
  .a3-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    max-width: 100%;
  }
  .a3-pill {
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 999px;
    cursor: pointer;
    white-space: nowrap;
  }
  .a3-main {
    flex: 1;
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
    padding: 16px;
    box-sizing: border-box;
  }
  .a3-slide-box {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    text-align: center;
  }
  .a3-media-frame {
    width: 100%;
    max-width: 820px;
    max-height: 46dvh;
    border-radius: 14px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.25);
  }
  .a3-media-frame img {
    width: 100%;
    max-height: 46dvh;
    height: auto;
    display: block;
  }
  .a3-fit-cover {
    object-fit: cover;
  }
  .a3-fit-contain {
    object-fit: contain;
  }
  .a3-title {
    margin: 4px 0;
    font-size: clamp(1.35rem, 2.8vw, 2.2rem);
    line-height: 1.25;
  }
  .a3-sub {
    margin: 0 auto;
    max-width: 760px;
    font-size: clamp(0.95rem, 1.4vw, 1.15rem);
    line-height: 1.6;
  }
  .a3-leaders {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;
    width: 100%;
    max-width: 820px;
  }
  .a3-leader-card {
    padding: 12px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.04);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .a3-tracks {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 10px;
    width: 100%;
    text-align: right;
  }
  .a3-track-card {
    padding: 12px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.04);
  }
  .a3-track-card h3,
  .a3-track-card p {
    margin: 4px 0 0;
  }
  .a3-roster-wrap {
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(260px, 1fr);
    gap: 14px;
    width: 100%;
    text-align: right;
  }
  @media (max-width: 820px) {
    .a3-roster-wrap {
      grid-template-columns: 1fr;
    }
  }
  .a3-roster-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    gap: 8px;
    max-height: 44dvh;
    overflow-y: auto;
    padding-left: 4px;
  }
  .a3-member-card {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.04);
    cursor: pointer;
  }
  .a3-member-card.is-selected {
    border-color: #f59e0b;
  }
  .a3-member-card h4 {
    margin: 6px 0 2px;
    font-size: 0.98rem;
  }
  .a3-member-card p {
    margin: 0;
    font-size: 0.8rem;
    opacity: 0.82;
  }
  .a3-actions {
    display: flex;
    gap: 6px;
    justify-content: flex-end;
  }
  .a3-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.04);
  }
  .a3-form label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.88rem;
  }
  .a3-form input,
  .a3-form textarea {
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(0, 0, 0, 0.25);
    color: inherit;
    font-family: inherit;
  }
`;

function useTypewriter(text, speed = 22, active = true) {
  const [displayed, setDisplayed] = useState(active ? "" : text);

  useEffect(() => {
    if (!active) {
      setDisplayed(text);
      return;
    }

    setDisplayed("");
    if (!text) return;

    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, active]);

  return displayed;
}

function loadRoster() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_ROSTER;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ROSTER;
  } catch {
    return DEFAULT_ROSTER;
  }
}

export default function App() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [roster, setRoster] = useState(loadRoster);
  const [selectedMemberId, setSelectedMemberId] = useState(
    () => loadRoster()[0]?.id || ""
  );

  const [formState, setFormState] = useState({
    name: "",
    role: "عضو اللجنة الإعلامية",
    track: "A3LMY100 • XIII",
    notes: "",
  });
  const [editingId, setEditingId] = useState(null);

  const mainRef = useRef(null);
  const currentSlide = useMemo(
    () => SLIDE_CONFIG[slideIndex] || SLIDE_CONFIG[0],
    [slideIndex]
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(roster));
    } catch {
      // تجاهل أخطاء التخزين
    }
  }, [roster]);

  useEffect(() => {
    if (roster.length > 0 && !roster.some((m) => m.id === selectedMemberId)) {
      setSelectedMemberId(roster[0].id);
    }
  }, [roster, selectedMemberId]);

  const typedSubtitle = useTypewriter(
    currentSlide.subtitle,
    18,
    slideIndex === 0 || slideIndex === 1
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      if (e.key === "ArrowRight" || e.key === "PageDown") {
        setSlideIndex((prev) => (prev + 1) % SLIDE_CONFIG.length);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        setSlideIndex(
          (prev) => (prev - 1 + SLIDE_CONFIG.length) % SLIDE_CONFIG.length
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const goToSlide = (idx) => {
    const next = ((idx % SLIDE_CONFIG.length) + SLIDE_CONFIG.length) % SLIDE_CONFIG.length;
    setSlideIndex(next);
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = formState.name.trim();
    if (!cleanName) return;

    if (editingId) {
      setRoster((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: cleanName,
                role: formState.role.trim() || "عضو اللجنة الإعلامية",
                track: formState.track.trim() || "A3LMY100",
                notes: formState.notes.trim(),
              }
            : item
        )
      );
      setSelectedMemberId(editingId);
      setEditingId(null);
    } else {
      const created = {
        id: `member-${Date.now()}`,
        name: cleanName,
        role: formState.role.trim() || "عضو اللجنة الإعلامية",
        track: formState.track.trim() || "A3LMY100",
        notes: formState.notes.trim(),
      };
      setRoster((prev) => [...prev, created]);
      setSelectedMemberId(created.id);
    }

    setFormState({
      name: "",
      role: "عضو اللجنة الإعلامية",
      track: "A3LMY100 • XIII",
      notes: "",
    });
  };

  const startEdit = (member) => {
    setEditingId(member.id);
    setFormState({
      name: member.name,
      role: member.role,
      track: member.track,
      notes: member.notes || "",
    });
  };

  const deleteMember = (id) => {
    setRoster((prev) => prev.filter((m) => m.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const resetRoster = () => {
    setRoster(DEFAULT_ROSTER);
    setSelectedMemberId(DEFAULT_ROSTER[0].id);
    setEditingId(null);
  };

  const displaySubtitle =
    slideIndex === 0 || slideIndex === 1 ? typedSubtitle : currentSlide.subtitle;

  return (
    <div dir="rtl" className="app-shell a3-root">
      <style>{SCOPED_FIX_CSS}</style>

      <header className="top-nav a3-nav">
        <div className="brand-mark">A3LMY100 • 2026/2027</div>

        <nav className="a3-pills" aria-label="التنقل بين السلايدات الـ 12">
          {SLIDE_CONFIG.map((s, idx) => (
            <button
              key={s.num}
              type="button"
              onClick={() => goToSlide(idx)}
              className={`nav-pill a3-pill ${slideIndex === idx ? "is-active" : ""}`}
            >
              {s.navLabel}
            </button>
          ))}
        </nav>

        <div className="step-controls">
          <button
            type="button"
            onClick={() => goToSlide(slideIndex - 1)}
            className="icon-btn"
          >
            السابق
          </button>
          <span className="slide-counter">
            {slideIndex + 1} / {SLIDE_CONFIG.length}
          </span>
          <button
            type="button"
            onClick={() => goToSlide(slideIndex + 1)}
            className="icon-btn"
          >
            التالي
          </button>
        </div>
      </header>

      <main ref={mainRef} className="stage-viewport a3-main">
        <section key={currentSlide.num} className="slide is-active a3-slide-box">
          <span className="eyebrow">{currentSlide.badge}</span>
          <h1 className="a3-title">{currentSlide.title}</h1>
          <p className="a3-sub">{displaySubtitle}</p>

          <div className="a3-media-frame">
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              loading="eager"
              decoding="async"
              className={currentSlide.fit === "cover" ? "a3-fit-cover" : "a3-fit-contain"}
            />
          </div>

          {currentSlide.leaders && (
            <div className="a3-leaders">
              {currentSlide.leaders.map((leader) => (
                <div key={leader.name} className="a3-leader-card">
                  <strong>{leader.name}</strong>
                  <span>{leader.role}</span>
                </div>
              ))}
            </div>
          )}

          {currentSlide.showTracks && (
            <div className="a3-tracks">
              {MEDIA_TRACKS.map((track) => (
                <div key={track.code} className="a3-track-card">
                  <span className="track-tag">{track.code}</span>
                  <h3>{track.title}</h3>
                  <p>{track.desc}</p>
                </div>
              ))}
            </div>
          )}

          {currentSlide.showRoster && (
            <div className="a3-roster-wrap">
              <div>
                <div className="a3-actions" style={{ marginBottom: 8 }}>
                  <button
                    type="button"
                    onClick={resetRoster}
                    className="ghost-btn"
                  >
                    استعادة القائمة الأصلية ({DEFAULT_ROSTER.length})
                  </button>
                </div>

                <div className="a3-roster-grid">
                  {roster.map((member) => {
                    const active = selectedMemberId === member.id;
                    return (
                      <div
                        key={member.id}
                        onClick={() => setSelectedMemberId(member.id)}
                        className={`a3-member-card ${active ? "is-selected" : ""}`}
                      >
                        <div
                          className="a3-actions"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => startEdit(member)}
                            className="mini-btn"
                          >
                            تعديل
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteMember(member.id)}
                            className="mini-btn danger"
                          >
                            حذف
                          </button>
                        </div>
                        <h4>{member.name}</h4>
                        <p>{member.role}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="a3-form">
                <h3>{editingId ? "تعديل عضو" : "إضافة عضو جديد"}</h3>
                <label>
                  <span>الاسم</span>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="اكتب اسم العضو"
                    required
                  />
                </label>

                <label>
                  <span>الدور</span>
                  <input
                    type="text"
                    value={formState.role}
                    onChange={(e) =>
                      setFormState((p) => ({ ...p, role: e.target.value }))
                    }
                  />
                </label>

                <label>
                  <span>المجموعة / المسار</span>
                  <input
                    type="text"
                    value={formState.track}
                    onChange={(e) =>
                      setFormState((p) => ({ ...p, track: e.target.value }))
                    }
                  />
                </label>

                <label>
                  <span>ملاحظات</span>
                  <textarea
                    rows={2}
                    value={formState.notes}
                    onChange={(e) =>
                      setFormState((p) => ({ ...p, notes: e.target.value }))
                    }
                  />
                </label>

                <div className="a3-actions">
                  <button type="submit" className="primary-btn">
                    {editingId ? "حفظ التعديل" : "إضافة"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="secondary-btn"
                    >
                      إلغاء
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}