import { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PlayCircle, Rocket, CheckCircle2, PhoneCall, ChevronRight, ChevronLeft, Send } from "lucide-react";

// === CONFIG ===
const site = {
  brand: {
    name: "D.A.I",
    tagline: "NEXTGEN VIDEO",
    logoImg: "/logo.png",
    whatsapp: "https://wa.me/972544475705?text=היי%20דור,%20אני%20רוצה%20סרטון%20AI%20מרשים!",
    email: "dordor860@gmail.com",
  },
  hero: {
    headline: "סרטוני AI קולנועיים שכבר הצילו את הרחבה",
    sub: "וזה רק חלק קטן ממה שאפשר ליצור...",
    ctaPrimary: "דברו איתי בווטסאפ",
    ctaSecondary: "צפו בעבודות",
    video: "https://player.cloudinary.com/embed/?cloud_name=dfbmxtx3p&public_id=dekel_4_ratovt&profile=cld-looping",
  },
  portfolio: [
    { title: "אפטר־פארטי", src: "https://player.cloudinary.com/embed/?cloud_name=dfbmxtx3p&public_id=tair_sofi&profile=cld-looping", note: "16:9 / Full HD" },
    { title: "כניסה", src: "https://player.cloudinary.com/embed/?cloud_name=dfbmxtx3p&public_id=milana_entry&profile=cld-looping", note: "16:9 / Full HD" },
    { title: "רצף וידאו", src: "https://player.cloudinary.com/embed/?cloud_name=dfbmxtx3p&public_id=dekel_4_ratovt&profile=cld-looping", note: "סרטון רציף" },
  ],
  pricing: [
    { tier: "חבילה קלאסית", price: "החל מ־500₪", features: ["עד דקה וחצי", "בחירת דמות מהנבחרת", "ברכה/טקסט אישי", "רקע דינמי + מוזיקה", "איכות למסכים גדולים", "עד 14 ימי עסקים", "עד 3 תיקונים ללא עלות"], note: "מושלם לאירועים ולבסיס" },
    { tier: "חבילת פרימיום", price: "בהתאמה אישית", popular: true, features: ["תסריט וקריינות", "יצירת דמות חדשה", "אפקטים מתקדמים", "איכות קולנועית", "ליווי אישי ותיקונים ללא הגבלה", "קדימות בזמנים"], note: "מחיר מותאם לאחר שיחה קצרה" },
  ],
  faqs: [
    { q: "מה זמן האספקה?", a: "קלאסית: עד 14 ימי עסקים. פרימיום: לפי היקף – לרוב 5–10 ימים." },
    { q: "איך מעבירים חומרים?", a: "שולחים לוגו, טקסטים והשראות בווטסאפ או למייל." },
    { q: "תיקונים?", a: "קלאסית – 3 תיקונים ללא עלות. פרימיום – עד לשביעות רצון." },
  ],
  testimonialsSeed: [
    { name: "מור & ניר", text: "הסרטון הפך את החתונה שלנו לאירוע בלתי נשכח! כולם דיברו על זה.", avatar: "/client1.jpg" },
    { name: "תאיר & לירן", text: "האנרגיה והאווירה שדור יצר עם הסרטון פשוט הרימו את הרחבה!", avatar: "/client2.jpg" },
    { name: "עדן & דקל", text: "השירות אישי, מהיר ואיכותי – מומלץ לכל מי שרוצה אירוע שיזכרו.", avatar: "/client3.jpg" },
  ],
};

// === GLOBAL STYLES ===
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700;900&family=Secular+One&display=swap');
    :root{ --font-display:'Secular One','Rubik',system-ui,'Segoe UI','Heebo',Arial,sans-serif; --font-body:'Rubik',system-ui,'Segoe UI','Heebo',Arial,sans-serif; }
    html,body{ font-family: var(--font-body); }
    .font-display{ font-family: var(--font-display); letter-spacing:.5px; }
    .neon-border{ box-shadow:0 0 0 1px rgba(255,0,128,.25), inset 0 0 30px rgba(255,0,128,.15); }
    .reduced-motion *{ animation:none !important; transition:none !important; }
    .high-contrast{ filter:contrast(1.15) saturate(1.1); }
  `}</style>
);

// === UI Helpers ===
const Container = ({ children, className = "" }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-pink-500/30 bg-gradient-to-br from-[#1a001f] via-[#0a0010] to-black backdrop-blur-xl shadow-xl hover:shadow-pink-500/40 transition ${className}`}>{children}</div>
);

const SectionTitle = ({ title, sub }) => (
  <div className="text-center mb-10">
    <h2 className="text-3xl md:text-4xl font-black leading-tight bg-gradient-to-r from-pink-500 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent drop-shadow-xl">{title}</h2>
    {sub && <p className="text-white/80 mt-3 max-w-2xl mx-auto text-base">{sub}</p>}
  </div>
);

// === Accessibility Add‑ons (add-only) ===
const A11yFab = ({ prefs, setPrefs, open, setOpen }) => (
  <div className="fixed bottom-20 left-5 z-50">
    <button
      aria-label="אפשרויות נגישות"
      onClick={() => setOpen(!open)}
      className="px-3 py-2 text-sm rounded-full bg-white/10 border border-white/10 backdrop-blur-md hover:bg-white/20"
    >
      ♿
    </button>
    {open && (
      <div className="mt-2 w-60 p-3 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-md text-sm space-y-3">
        <label className="flex items-center justify-between gap-3">
          <span>ניגודיות גבוהה</span>
          <input
            type="checkbox"
            checked={prefs.highContrast}
            onChange={(e) =>
              setPrefs((prev) => ({ ...prev, highContrast: e.target.checked }))
            }
          />
        </label>
        <label className="flex items-center justify-between gap-3">
          <span>הפחתת אנימציות</span>
          <input
            type="checkbox"
            checked={prefs.reducedMotion}
            onChange={(e) =>
              setPrefs((prev) => ({ ...prev, reducedMotion: e.target.checked }))
            }
          />
        </label>
        <div className="flex items-center justify-between">
          <span>גודל גופן</span>
          <div className="flex gap-2">
            <button
              onClick={() =>
                setPrefs((p) => ({
                  ...p,
                  fontScale: Math.max(0.85, +(p.fontScale - 0.05).toFixed(2)),
                }))
              }
              className="px-2 py-1 bg-white/10 rounded"
            >
              A-
            </button>
            <button
              onClick={() =>
                setPrefs((p) => ({
                  ...p,
                  fontScale: Math.min(1.4, +(p.fontScale + 0.05).toFixed(2)),
                }))
              }
              className="px-2 py-1 bg-white/10 rounded"
            >
              A+
            </button>
          </div>
        </div>
        <button
          onClick={() =>
            setPrefs({ highContrast: false, reducedMotion: false, fontScale: 1 })
          }
          className="w-full px-3 py-2 bg-white/10 rounded"
        >
          איפוס
        </button>
      </div>
    )}
  </div>
);


const EpilepsyModal = ({ open, onAccept, onReduceMotion }) => {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
      <div className="max-w-lg w-full rounded-2xl bg-[#120012] border border-pink-500/30 p-6 text-white">
        <h3 className="font-display text-2xl font-extrabold text-pink-400 mb-2">אזהרה: יתכנו אורות מהבהבים</h3>
        <p className="text-sm text-white/80 leading-relaxed">חלק מהסרטונים באתר כוללים אפקטים מהירים שעלולים להשפיע על אנשים הרגישים לאורות מהבהבים (פוטוסנסטיביות/אפילפסיה). אם את/ה רגיש/ה – הפעל/י מצב "הפחתת אנימציות" או הימנע/י מצפייה.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={onReduceMotion} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">הפעל הפחתת אנימציות</button>
          <button onClick={onAccept} className="px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-pink-500 text-black font-bold">הבנתי, המשך</button>
        </div>
        <p className="mt-3 text-[11px] text-white/60">אין באמור ייעוץ רפואי. שימוש בתוכן על אחריות המשתמש בלבד.</p>
      </div>
    </div>
  );
};

// === COMPONENT ===
export default function DAISite() {
  // Accessibility prefs (add‑only)
  const [prefs, setPrefs] = useState({ highContrast: false, reducedMotion: false, fontScale: 1 });
  const [a11yOpen, setA11yOpen] = useState(false);
  const [epilepsyOpen, setEpilepsyOpen] = useState(false);
  useEffect(() => { try { const s = localStorage.getItem('a11y_prefs'); if (s) setPrefs(JSON.parse(s)); } catch { } try { const ack = localStorage.getItem('epilepsy_ack'); if (!ack) setEpilepsyOpen(true); } catch { setEpilepsyOpen(true); } }, []);
  useEffect(() => { try { localStorage.setItem('a11y_prefs', JSON.stringify(prefs)); } catch { } }, [prefs]);
  useEffect(() => { const b = document.body; if (!b) return; prefs.reducedMotion ? b.classList.add('reduced-motion') : b.classList.remove('reduced-motion'); prefs.highContrast ? b.classList.add('high-contrast') : b.classList.remove('high-contrast'); b.style.fontSize = `${Math.round(prefs.fontScale * 100)}%`; }, [prefs]);
  const acceptEpilepsy = () => { try { localStorage.setItem('epilepsy_ack', '1'); } catch { } setEpilepsyOpen(false); };
  const reduceAndAccept = () => { setPrefs(p => ({ ...p, reducedMotion: true })); acceptEpilepsy(); };

  // Testimonials + approval
  const [testimonials, setTestimonials] = useState(site.testimonialsSeed);
  const [pendingTestimonials, setPendingTestimonials] = useState([]);
  const [newName, setNewName] = useState("");
  const [newText, setNewText] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [adminMode, setAdminMode] = useState(false);
  const scrollerRef = useRef(null);

  useEffect(() => {
    try {
      const a = localStorage.getItem('dai_testimonials_approved');
      const p = localStorage.getItem('dai_testimonials_pending');
      if (a) setTestimonials(JSON.parse(a));
      if (p) setPendingTestimonials(JSON.parse(p));
      const isAdmin = (typeof window !== 'undefined' && window.location.search.includes('admin=1')) || localStorage.getItem('dai_admin') === '1';
      if (isAdmin) { setAdminMode(true); localStorage.setItem('dai_admin', '1'); }
    } catch { }
  }, []);
  useEffect(() => { try { localStorage.setItem('dai_testimonials_approved', JSON.stringify(testimonials)); } catch { } }, [testimonials]);
  useEffect(() => { try { localStorage.setItem('dai_testimonials_pending', JSON.stringify(pendingTestimonials)); } catch { } }, [pendingTestimonials]);

  const addTestimonial = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;
    const item = { name: newName.trim(), text: newText.trim(), avatar: newAvatar.trim() || "/client_placeholder.jpg" };
    setPendingTestimonials([item, ...pendingTestimonials]);
    setNewName(""); setNewText(""); setNewAvatar("");
    alert('ההמלצה נשלחה וממתינה לאישור מנהל.');
  };
  const approveTestimonial = (index) => {
    const item = pendingTestimonials[index]; if (!item) return;
    const rest = pendingTestimonials.filter((_, i) => i !== index);
    setPendingTestimonials(rest);
    setTestimonials([item, ...testimonials]);
  };
  const rejectTestimonial = (index) => {
    setPendingTestimonials(pendingTestimonials.filter((_, i) => i !== index));
  };

  const bg = useMemo(() => (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0015] to-[#1a001f]" />
      <div className="absolute -top-32 left-[20%] w-[40vw] h-[40vw] rounded-full blur-3xl opacity-30 bg-fuchsia-700 animate-pulse" />
      <div className="absolute bottom-0 right-[10%] w-[35vw] h-[35vw] rounded-full blur-3xl opacity-30 bg-purple-600 animate-ping" />
    </div>
  ), []);

  return (
    <div dir="rtl" lang="he" className="text-white">
      <GlobalStyles />
      {bg}

      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-black/70 border-b border-pink-500/30">
        <Container className="py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-pink-500/30 bg-black grid place-items-center">
              <img src={site.brand.logoImg} alt="logo" className="w-full h-full object-contain" onError={(e) => { const d = document.createElement('div'); d.className = 'text-pink-400 font-black'; d.innerText = 'D.A.I'; (e.currentTarget).replaceWith(d); }} />
            </div>
            <div>
              <div className="font-display text-xl md:text-2xl font-black text-pink-300 tracking-wide">{site.brand.name}</div>
              <div className="text-[11px] md:text-xs text-fuchsia-400/90">{site.brand.tagline}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href={site.brand.whatsapp} className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-black font-bold flex items-center gap-2"><PhoneCall className="w-4 h-4" />ווטסאפ</a>
            <a href={`mailto:${site.brand.email}`} className="px-4 py-2 rounded-xl bg-white/10 border border-white/10">מייל</a>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <section className="relative py-16 md:py-24">
        <Container className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-display text-[40px] sm:text-6xl md:text-7xl leading-[1.05] tracking-tight font-black bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent drop-shadow-xl">{site.hero.headline}</h1>
            <p className="mt-4 text-white/90 text-lg">{site.hero.sub}</p>
            <div className="mt-8 flex gap-3">
              <a href={site.brand.whatsapp} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-500 font-extrabold text-black hover:brightness-110 transition flex items-center gap-2"><Rocket className="w-5 h-5" /> {site.hero.ctaPrimary}</a>
              <a href="#portfolio" className="px-5 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition flex items-center gap-2"><PlayCircle className="w-5 h-5" /> {site.hero.ctaSecondary}</a>
            </div>
          </motion.div>
          <Card>
            <div className="aspect-video rounded-xl overflow-hidden border border-pink-500/30 shadow-lg grid place-items-center">
              {String(site.hero.video || '').includes('player.cloudinary.com') ? (
                <iframe src={`${site.hero.video}${site.hero.video.includes('?') ? '&' : '?'}autoplay=true&muted=true&playsinline=true&controls=false&loop=true`} className="w-full h-full" allow="autoplay; fullscreen; encrypted-media" frameBorder={0} allowFullScreen title="Hero Video" />
              ) : (
                <video className="w-full h-full object-cover" src={site.hero.video} autoPlay loop muted playsInline preload="auto" onError={(e) => { (e.currentTarget).outerHTML = "<div class='p-6 text-center text-white/70'>לא נמצא hero.mp4 ב/public</div>"; }} />
              )}
            </div>
          </Card>
        </Container>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-14">
        <Container>
          <SectionTitle title="סרטונים שכבר הצילו את הרחבה" sub="וזה רק חלק קטן ממה שאפשר ליצור..." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {site.portfolio.map((v, i) => (
              <Card key={i} className="overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                <div className="aspect-video bg-black/60 border-b border-white/10 grid place-items-center">
                  {String(v.src || '').includes('player.cloudinary.com') ? (
                    <iframe src={`${v.src}${v.src.includes('?') ? '&' : '?'}autoplay=true&muted=true&playsinline=true&controls=false&loop=true`} className="w-full h-full" allow="autoplay; fullscreen; encrypted-media" frameBorder={0} allowFullScreen title={v.title || 'Video'} />
                  ) : (
                    <video className="w-full h-full object-cover" src={v.src} autoPlay loop muted playsInline preload="auto" onError={(e) => { const name = (v.src || '').replace('/', ''); (e.currentTarget).outerHTML = `<div class='p-6 text-center text-white/70'>לא נמצא ${name} ב/public</div>`; }} />
                  )}
                </div>
                <div className="p-4 bg-gradient-to-r from-fuchsia-800/30 to-pink-800/30">
                  <div className="font-bold text-pink-400 text-lg">{v.title}</div>
                  <div className="text-xs text-white/60 mt-1">{v.note}</div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-14">
        <Container>
          <SectionTitle title="חבילות" sub="קלאסית — החל מ־500₪ · פרימיום — בהתאמה אישית" />
          <div className="grid md:grid-cols-2 gap-5">
            {site.pricing.map((p, i) => (
              <Card key={i} className={`p-6 ${p.popular ? 'ring-2 ring-pink-500/60' : ''}`}>
                {p.popular && <div className="mb-2 text-xs text-pink-400">הכי פופולרי</div>}
                <div className="flex items-baseline justify-between">
                  <div className="text-xl font-black">{p.tier}</div>
                  <div className="text-3xl font-black text-pink-400">{p.price}</div>
                </div>
                <ul className="mt-4 space-y-2 text-white/80 text-sm">
                  {p.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-pink-400" /> {f}</li>
                  ))}
                </ul>
                <div className="text-xs text-white/60 mt-3">{p.note}</div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-gradient-to-r from-purple-900/30 to-fuchsia-900/30">
        <Container>
          <SectionTitle title="המלצות מלקוחות" sub="לקוחות מספרים על החוויה..." />
          <div className="relative">
            <button aria-label="prev" onClick={() => scrollerRef.current?.scrollBy({ left: -400, behavior: 'smooth' })} className="absolute right-0 -top-10 rounded-full p-2 bg-white/10 hover:bg-white/20 border border-white/10"><ChevronRight className="w-5 h-5" /></button>
            <button aria-label="next" onClick={() => scrollerRef.current?.scrollBy({ left: 400, behavior: 'smooth' })} className="absolute right-12 -top-10 rounded-full p-2 bg-white/10 hover:bg-white/20 border border-white/10"><ChevronLeft className="w-5 h-5" /></button>
          </div>
          <div className="overflow-x-auto flex gap-6 snap-x snap-mandatory pb-4" ref={scrollerRef}>
            {testimonials.map((t, i) => (
              <Card key={i} className="min-w-[300px] snap-center p-6 flex flex-col items-center text-center">
                <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-4 object-cover" onError={(e) => { (e.currentTarget).style.display = 'none'; }} />
                <p className="text-white/90 italic mb-3">“{t.text}”</p>
                <div className="font-bold text-pink-400">{t.name}</div>
              </Card>
            ))}
          </div>

          <Card className="p-6 mt-6">
            <div className="font-bold text-pink-400 mb-2">השאירו המלצה משלכם</div>
            <form className="grid md:grid-cols-4 gap-3" onSubmit={addTestimonial}>
              <input value={newName} onChange={(e) => setNewName(e.target.value)} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none" placeholder="שם / בני זוג / עסק" />
              <input value={newAvatar} onChange={(e) => setNewAvatar(e.target.value)} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none" placeholder="לינק לתמונה (לא חובה)" />
              <input value={newText} onChange={(e) => setNewText(e.target.value)} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none md:col-span-2" placeholder="כמה מילים יפות על החוויה" />
              <button type="submit" className="md:col-span-4 w-full mt-1 px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-500 font-bold text-black flex items-center justify-center gap-2"><Send className="w-4 h-4" /> שלח לאישור</button>
            </form>
          </Card>

          {adminMode && (
            <Card className="p-6 mt-6">
              <div className="font-extrabולד text-pink-400 mb-3">המלצות בהמתנה לאישור</div>
              {pendingTestimonials.length === 0 ? (
                <div className="text-white/70 text-sm">אין כרגע המלצות בהמתנה.</div>
              ) : (
                <div className="space-y-3">
                  {pendingTestimonials.map((t, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="font-bold text-white/90">{t.name}</div>
                      <div className="text-sm text-white/80 mt-1">{t.text}</div>
                      <div className="mt-3 flex gap-2">
                        <button onClick={() => approveTestimonial(i)} className="px-3 py-1 rounded bg-green-500/20 border border-green-500/30 text-green-200">אישור</button>
                        <button onClick={() => rejectTestimonial(i)} className="px-3 py-1 rounded bg-red-500/20 border border-red-500/30 text-red-200">דחייה</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="text-xs text-white/50 mt-4">לכניסה למצב ניהול (במחשב שלך בלבד): הוסף <code>?admin=1</code> ל‑URL או שמור מקומית <code>dai_admin=1</code>.</div>
            </Card>
          )}
        </Container>
      </section>

      {/* Contact */}
      <section id="contact" className="py-14">
        <Container>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <SectionTitle title="FAQ" />
              <div className="space-y-3">
                {site.faqs.map((item, i) => (
                  <Card key={i} className="p-4">
                    <div className="font-bold text-pink-400">{item.q}</div>
                    <div className="text-sm text-white/85 mt-1">{item.a}</div>
                  </Card>
                ))}
              </div>
            </div>
            <Card className="p-6">
              <div className="font-extrabold text-xl text-pink-400">דברו איתי</div>
              <p className="text-white/80 text-sm mt-1">השאירו פרטים – ואחזור אליכם בהקדם.</p>
              <form className="mt-4 grid grid-cols-1 gap-3" onSubmit={(e) => e.preventDefault()}>
                <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none" placeholder="שם" />
                <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none" placeholder="טלפון/ווטסאפ" />
                <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none" placeholder="תאריך אירוע (אם יש)" />
                <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none text-white">
                  <option className="bg-black text-white">סוג פרויקט</option>
                  <option className="bg-black text-white">אינטרו אירוע</option>
                  <option className="bg-black text-white">לוגו חתונה</option>
                  <option className="bg-black text-white">תדמית עסק</option>
                  <option className="bg-black text-white">אחר</option>
                </select>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none" placeholder="פרויקט/רעיון בקצרה" />
                <button type="submit" className="px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-500 font-bold text-black hover:brightness-110 transition">קבלו הצעת מחיר</button>
                <div className="text-xs text-white/70">או במייל: <a className="underline ml-1" href={`mailto:${site.brand.email}`}>{site.brand.email}</a></div>
              </form>
            </Card>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-white/70 text-sm tracking-wide">
        © {new Date().getFullYear()} {site.brand.name} — {site.brand.tagline}. נבנה באהבה וב‑AI.
        <div className="mt-2 text-[11px] text-white/50">התוכן עשוי לכלול אפקטים חזותיים מהירים. השימוש באתר ובסרטונים באחריות המשתמש בלבד.</div>
      </footer>

      {/* Floating WhatsApp */}
      <a href={site.brand.whatsnapp} target="_blank" rel="noreferrer" className="fixed bottom-5 left-5 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-black font-black shadow-lg hover:scale-105 transition">ווטסאפ – שריון מהיר</a>

      {/* Accessibility & Epilepsy (non‑intrusive) */}
      <EpilepsyModal open={epilepsyOpen} onAccept={acceptEpilepsy} onReduceMotion={reduceAndAccept} />
      <A11yFab prefs={prefs} setPrefs={setPrefs} open={a11yOpen} setOpen={setA11yOpen} />
    </div>
  );
}
