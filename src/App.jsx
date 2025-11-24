import { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PlayCircle, Rocket, CheckCircle2, PhoneCall, ChevronRight, ChevronLeft, Send, Volume2, VolumeX, Pause, Play } from "lucide-react";
import emailjs from "@emailjs/browser";


const VideoPlayer = ({ src, title, autoPlay = true }) => {
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(autoPlay);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    } else {
      setMuted(!muted);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  // Cloudinary iframe version
  if (String(src || "").includes("player.cloudinary.com")) {
    const iframeSrc = `${src}${src.includes("?") ? "&" : "?"
      }autoplay=${playing}&muted=${muted}&playsinline=true&controls=false&loop=true`;

    return (
      <div className="relative w-full h-full group">
        <iframe
          key={`${muted}-${playing}`}
          src={iframeSrc}
          className="w-full h-full"
          allow="autoplay; fullscreen; encrypted-media"
          frameBorder={0}
          allowFullScreen
          title={title || "Video"}
        />
        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-2 right-2 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition"
        >
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="absolute bottom-2 left-2 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition"
        >
          {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      </div>
    );
  }

  // Regular <video> version
  return (
    <div className="relative w-full h-full group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        autoPlay={autoPlay}
        loop
        muted={muted}
        playsInline
        preload="auto"
      />
      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-2 right-2 p-2 rounded-full bg-black/60 text-white"
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="absolute bottom-2 left-2 p-2 rounded-full bg-black/60 text-white"
      >
        {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>
    </div>
  );
};




// === CONFIG ===
const site = {
  brand: {
    name: "D.A.I",
    tagline: "NEXTGEN VIDEO",
    logoImg: "https://res.cloudinary.com/dfbmxtx3p/image/upload/v1758982081/logodor_kayefp.png",
    whatsapp: "https://wa.me/972544475705?text=היי%20דור,%20אני%20רוצה%20סרטון%20AI%20מרשים!",
    email: "dordor860@gmail.com",
  },
  team: [
    { name: "אסטריה", avatar: "https://res.cloudinary.com/dfbmxtx3p/image/upload/v1758979488/avatar1_bq9and.png" },
    { name: "ונוס", avatar: "https://res.cloudinary.com/dfbmxtx3p/image/upload/v1758980743/kakidalal_hfokhp.png" },
    { name: "אנאבל", avatar: "https://res.cloudinary.com/dfbmxtx3p/image/upload/v1758979488/avatar4_vpcaxu.png" },
    { name: "אנג'ל", avatar: "https://res.cloudinary.com/dfbmxtx3p/image/upload/v1759406806/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2025-10-02_150616_gbzvp6.png" },
    { name: "זואי", avatar: "https://res.cloudinary.com/dfbmxtx3p/image/upload/v1758979488/avatar3_yjq8xw.png" },
    { name: "ועוד המון בעיצוב אישי", avatar: "https://res.cloudinary.com/dfbmxtx3p/image/upload/v1758980614/20250927_1642_%D7%A7%D7%95%D7%9C%D7%90%D7%96_%D7%90%D7%95%D7%95%D7%90%D7%98%D7%A8%D7%99%D7%95%D7%AA_%D7%A2%D7%AA%D7%99%D7%93%D7%A0%D7%99_remix_01k65pf5vyex8v6grb5bmb29zk_blfvjr.png" },
  ],
  hero: {
    headline: "סרטוני AI קולנועיים ברמה הגבוהה ביותר",
    sub: "תנו למסכים לרקוד יחד איתכם",
    ctaPrimary: "דברו איתי ",
    ctaSecondary: "צפו בעבודות",
    video: "https://res.cloudinary.com/dfbmxtx3p/video/upload/v1758978915/entery_-_%D7%A0%D7%95%D7%A6%D7%A8_%D7%91%D7%90%D7%9E%D7%A6%D7%A2%D7%95%D7%AA_Clipchamp_z3iqs3.mp4",
  },
  portfolio: [
    { title: " סרטון רקע שרץ לאורך כל הערב", src: "https://res.cloudinary.com/dfbmxtx3p/video/upload/f_auto,q_auto,w_720/v1759404815/bacgroundtrailer_-_%D7%A0%D7%95%D7%A6%D7%A8_%D7%91%D7%90%D7%9E%D7%A6%D7%A2%D7%95%D7%AA_Clipchamp_tkfzkx.mp4", note: "" },
    { title: "הכלב שלכם מזמין אתכם לחגיגה", src: "https://res.cloudinary.com/dfbmxtx3p/video/upload/f_auto,q_auto,w_720/v1758976458/dogdog_-_%D7%A0%D7%95%D7%A6%D7%A8_%D7%91%D7%90%D7%9E%D7%A6%D7%A2%D7%95%D7%AA_Clipchamp_mhkzzw.mp4", note: "" },
    { title: "כניסה", src: "https://res.cloudinary.com/dfbmxtx3p/video/upload/f_auto,q_auto,w_720/v1757935114/dekel_4_ratovt.mp4", note: "" },
    { title: "אפטר פארטי", src: "https://res.cloudinary.com/dfbmxtx3p/video/upload/f_auto,q_auto,w_720/v1758978595/after_-_%D7%A0%D7%95%D7%A6%D7%A8_%D7%91%D7%90%D7%9E%D7%A6%D7%A2%D7%95%D7%AA_Clipchamp_uwuiz1.mp4", note: "" },
    { title: "דיבוב בכל שפה שתרצו", src: "https://res.cloudinary.com/dfbmxtx3p/video/upload/f_auto,q_auto,w_720/v1758976976/lanuges_-_%D7%A0%D7%95%D7%A6%D7%A8_%D7%91%D7%90%D7%9E%D7%A6%D7%A2%D7%95%D7%AA_Clipchamp_vfrzhf.mp4", note: "" },


  ],
  pricing: [
    { tier: "חבילה קלאסית", price: "החל מ₪500", features: ["עד דקה וחצי", "בחירת דמות מהנבחרת", "ברכה/טקסט אישי", "רקע דינמי + מוזיקה", "איכות למסכים גדולים", "עד 7 ימי עסקים", "עד 3 תיקונים ללא עלות"], note: "מושלם לאירועים " },
    { tier: "חבילת פרימיום", price: "בהתאמה אישית", popular: true, features: ["תסריט וקריינות", "יצירת דמות חדשה", "אפקטים מתקדמים", "איכות קולנועית", "ליווי אישי ותיקונים ללא הגבלה", "קדימות בזמנים"], note: "מחיר מותאם לאחר שיחה קצרה" },
  ],
  faqs: [
    {
      q: "מהם זמני האספקה?",
      a: "בחבילת קלאסי: עד 7 ימי עסקים. בחבילת פרימיום: לרוב עד 5 ימי עסקים, בהתאם לדרישות המותאמות אישית של הפרויקט."
    },
    {
      q: "איך מפעילים את הסרטון באולם?",
      a: "לאחר סיום ההפקה, אנחנו מעבירים לכם את הסרטון בקישור ישיר למייל. את הקישור מעבירים ל-DJ או לתאורן באולם, והם מקרינים את הסרטון במסכים בזמן הנכון."
    },
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


  const formRef = useRef(null);
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_dgsmucm",   // מה־EmailJS
        "template_pkuceoi",  // מה־EmailJS
        formRef.current,
        "RbKwnZqaDBHV82qY1"    // מה־EmailJS
      )
      .then(
        () => {
          setStatus("success");
          formRef.current.reset();
          alert('הטופס נשלח בהצלחה ✅');
        },
        () => {
          setStatus("error");
          alert('שגיאה בשליחה ❌');
        }
      );
  };

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
            {/* WhatsApp */}
            <a
              href={site.brand.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-black font-bold flex items-center gap-2 hover:brightness-110 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.4 2 7.7L.1 31.9l8.4-2.2c2.2 1.2 4.8 1.9 7.5 1.9 8.6 0 15.6-7 15.6-15.6C31.6 7.4 24.6.4 16 .4zm0 28.5c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-5 1.3 1.3-4.9-.3-.5c-1.2-2-1.8-4.3-1.8-6.7C3 9.2 8.9 3.3 16 3.3S29 9.2 29 16.3c0 7.1-5.9 12.6-13 12.6zm7.5-9.5c-.4-.2-2.4-1.2-2.8-1.3s-.6-.2-.8.2-1 1.3-1.2 1.5-.4.3-.8.1c-.4-.2-1.5-.6-2.8-1.8-1-1-1.8-2.2-2-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.6.2-.2.3-.3.4-.5.1-.2.1-.4 0-.6-.1-.2-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-1 .4-.4.3-1.3 1.2-1.3 3s1.4 3.5 1.6 3.7c.2.2 2.8 4.2 6.8 5.9.9.4 1.6.6 2.1.8.9.3 1.7.2 2.3.1.7-.1 2.4-1 2.7-1.9.3-.9.3-1.6.2-1.9-.1-.3-.4-.4-.8-.6z" />
              </svg>
              <span className="hidden md:inline">ווטסאפ</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/d.a.i_ai?igsh=MWduM2gwaGcxd2I0MA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold flex items-center gap-2 hover:brightness-110 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm4.5 3.25A5.25 5.25 0 1 1 6.75 12.5 5.25 5.25 0 0 1 12 7.25zm0 2A3.25 3.25 0 1 0 15.25 12.5 3.25 3.25 0 0 0 12 9.25zM17.75 6a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 17.75 6z" />
              </svg>
              <span className="hidden md:inline">אינסטגרם</span>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@rinaterblat?_t=ZS-90DWbS81sjU&_r=1" // 🔹 תחליף בלינק שלך
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-gray-800 to-black text-white font-bold flex items-center gap-2 hover:brightness-110 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="currentColor"
              >
                <path d="M41 16.5c-2.2 0-4.4-.7-6.2-2v14.2c0 7.6-6.2 13.8-13.8 13.8-2.8 0-5.4-.8-7.5-2.3-2.9-2-4.8-5.4-4.8-9.2 0-6.2 5-11.2 11.2-11.2 1.1 0 2.1.2 3 .5v6.4c-.9-.6-2-1-3.2-1-3.1 0-5.6 2.5-5.6 5.6 0 1.9.9 3.6 2.4 4.6 1 .7 2.2 1.1 3.5 1.1 3.1 0 5.6-2.5 5.6-5.6V7h6.3c1.3 2.9 4.2 5 7.6 5.5V16.5z" />
              </svg>
              <span className="hidden md:inline">טיקטוק</span>
            </a>
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
                <VideoPlayer src={site.hero.video} title="Hero Video" autoPlay={true} />
              ) : (
                <VideoPlayer src={site.hero.video} title="Hero Video" autoPlay={true} />
              )}
            </div>
          </Card>
        </Container>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-14">
        <Container>
          <SectionTitle
            title="סרטונים שכבר הצילו את הרחבה"
            sub="וזה רק חלק קטן ממה שאפשר ליצור..."
          />

          {/* מובייל – מציג אחד אחרי השני */}
          <div className="grid grid-cols-1 gap-5 lg:hidden">
            {site.portfolio.map((v, i) => (
              <Card
                key={i}
                className="overflow-hidden hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="aspect-video bg-black/60 border-b border-white/10">
                  <VideoPlayer src={v.src} title={v.title} autoPlay={true} />
                </div>
                <div className="p-4 bg-gradient-to-r from-fuchsia-800/30 to-pink-800/30">
                  <div className="font-bold text-pink-400 text-lg">{v.title}</div>
                  <div className="text-xs text-white/60 mt-1">{v.note}</div>
                </div>
              </Card>
            ))}
          </div>


          {/*ווב אם יש מעל 3 סרטונים */}
          {site.portfolio.length > 3 ? (
            <div className="hidden lg:block relative">
              {/* חץ ימינה */}
              <button
                onClick={() =>
                  document.getElementById("portfolio-scroller")?.scrollBy({ left: 400, behavior: "smooth" })
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 rounded-full text-white hover:bg-black/80"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* חץ שמאלה */}
              <button
                onClick={() =>
                  document.getElementById("portfolio-scroller")?.scrollBy({ left: -400, behavior: "smooth" })
                }
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 rounded-full text-white hover:bg-black/80"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* הקרוסלה */}
              <div
                id="portfolio-scroller"
                className="overflow-x-auto flex gap-5 snap-x snap-mandatory scroll-smooth px-8
             [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
              >
                {site.portfolio.map((v, i) => (
                  <Card
                    key={i}
                    className="min-w-[350px] max-w-[400px] snap-center overflow-hidden hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="aspect-video bg-black/60 border-b border-white/10">
                      <VideoPlayer src={v.src} title={v.title} autoPlay={true} />
                    </div>
                    <div className="p-4 bg-gradient-to-r from-fuchsia-800/30 to-pink-800/30">
                      <div className="font-bold text-pink-400 text-lg">{v.title}</div>
                      <div className="text-xs text-white/60 mt-1">{v.note}</div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            // אם יש עד 3 – גריד רגיל
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {site.portfolio.map((v, i) => (
                <Card
                  key={i}
                  className="overflow-hidden hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="aspect-video bg-black/60 border-b border-white/10">
                    <VideoPlayer src={v.src} title={v.title} autoPlay={true} />
                  </div>
                  <div className="p-4 bg-gradient-to-r from-fuchsia-800/30 to-pink-800/30">
                    <div className="font-bold text-pink-400 text-lg">{v.title}</div>
                    <div className="text-xs text-white/60 mt-1">{v.note}</div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>



      {/* Pricing */}
      <section id="pricing" className="py-14">
        <Container>
          <SectionTitle title="החבילות שלנו" />
          <div className="grid md:grid-cols-2 gap-5">
            {site.pricing.map((p, i) => (
              <Card key={i} className={`p-6 ${p.popular ? 'ring-2 ring-pink-500/60' : ''}`}>
                {p.popular && <div className="mb-2 text-sm text-pink-400">הכי פופולרי</div>}
                <div className="flex items-baseline justify-between">
                  <div className="text-xl font-black">{p.tier}</div>
                  <div className="text-2xl md:text-3xl font-black text-pink-400">{p.price}</div>
                </div>
                <ul className="mt-4 space-y-2 text-white/80 text-sm">
                  {p.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-pink-400" /> {f}</li>
                  ))}
                </ul>
                <div className="text-md text-white/100n mt-3">{p.note}</div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-gradient-to-r from-purple-900/30 to-fuchsia-900/30">
        <Container>
          <SectionTitle title="המלצות מלקוחות" sub="לקוחות מספרים על החוויה..." />
          <div className="overflow-x-auto flex gap-6 snap-x snap-mandatory pb-4" ref={scrollerRef}>
            {testimonials.map((t, i) => (
              <Card key={i} className="min-w-[300px] snap-center p-6 flex flex-col items-center text-center">
                <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-4 object-cover" onError={(e) => { (e.currentTarget).style.display = 'none'; }} />
                <p className="text-white/90 italic mb-3">“{t.text}”</p>
                <div className="font-bold text-pink-400">{t.name}</div>
              </Card>
            ))}
          </div>
          {/* Team Section */}
          <section id="team" className="py-16">
            <Container>
              <SectionTitle title=" חלק קטן מהנבחרת שלנו" />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 place-items-center">
                {site.team.map((member, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center text-center 
      ${i === 4 ? "md:hidden" : ""}`}
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-40 h-40 rounded-full border-4 border-pink-400 bg-white/10 
        object-cover scale-90 hover:scale-100 transition-transform duration-500 ease-out"
                    />
                    <div className="mt-3 text-lg font-extrabold text-pink-300">
                      {member.name}
                    </div>
                  </div>
                ))}

              </div>
            </Container>
          </section>


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
              <SectionTitle title="שאלות נפוצות" />
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
              <p className="text-white/80 text-sm mt-1">
                השאירו פרטים – ואחזור אליכם בהקדם.
              </p>

              <form ref={formRef} onSubmit={sendEmail} className="mt-4 grid grid-cols-1 gap-3">
                <input name="user_name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none" placeholder="שם" required />
                <input name="user_phone" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none" placeholder="טלפון/ווטסאפ" required />
                <input name="event_date" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none" placeholder="תאריך אירוע (אם יש)" />
                <select name="project_type" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none text-white">
                  <option className="bg-black text-white">סוג פרויקט</option>
                  <option className="bg-black text-white">אינטרו אירוע</option>
                  <option className="bg-black text-white">לוגו חתונה</option>
                  <option className="bg-black text-white">תדמית עסק</option>
                  <option className="bg-black text-white">אחר</option>
                </select>
                <textarea name="message" rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none" placeholder="פרויקט/רעיון בקצרה" />

                <button type="submit" className="px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-500 font-bold text-black hover:brightness-110 transition">
                  קבלו הצעת מחיר
                </button>

                <div className="text-xs text-white/70">
                  או במייל:{" "}
                  <a className="underline ml-1" href={`mailto:${site.brand.email}`}>
                    {site.brand.email}
                  </a>
                </div>
              </form>

              {status === "success" && (
                <p className="text-green-400 mt-3 text-sm">הטופס נשלח בהצלחה ✅</p>
              )}
              {status === "error" && (
                <p className="text-red-400 mt-3 text-sm">שגיאה בשליחה ❌</p>
              )}
            </Card>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-white/70 text-sm tracking-wide">
        © {new Date().getFullYear()} D.A.I – NEXTGEN VIDEO. נבנה באהבה וב-AI.
        <div className="mt-2 text-[11px] text-white/50 leading-relaxed max-w-3xl mx-auto">
          חלק מהתוכן באתר נוצר באמצעות פלטפורמות AI צד ג׳ (כגון HeyGen, Sora, ElevenLabs, MidJourney).
          הזכויות על הטכנולוגיה שייכות לספקים הרלוונטיים, והשימוש בתוצרים באתר נעשה בהתאם לרישוי המותר. <br />
          השימוש באתר ובסרטונים הוא באחריות המשתמש בלבד, ועלול לכלול אפקטים חזותיים מהירים או אורות מהבהבים. <br />
          למידע נוסף קראו את{" "}
          <a
            href="/terms-of-use.html"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            תנאי השימוש
          </a>{" "}
          ו־{" "}
          <a
            href="/privacy-policy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            מדיניות הפרטיות
          </a>.
        </div>
      </footer>



      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/972544475705?text=%D7%94%D7%99%D7%99%20%D7%93%D7%95%D7%A8%2C%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%9F%20%D7%91%D7%A1%D7%A8%D7%98%D7%95%D7%9F%20%D7%91%D7%A2%D7%99%D7%A6%D7%95%D7%91%20%D7%90%D7%99%D7%A9%D7%99"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-2 left-5 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-black font-black shadow-lg hover:scale-105 transition"
      >
        שריון מהיר
      </a>


      {/* Accessibility & Epilepsy (non‑intrusive)
      <EpilepsyModal open={epilepsyOpen} onAccept={acceptEpilepsy} onReduceMotion={reduceAndAccept} />
      <A11yFab prefs={prefs} setPrefs={setPrefs} open={a11yOpen} setOpen={setA11yOpen} /> */}
    </div>
  );

}

