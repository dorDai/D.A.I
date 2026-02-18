export default function ThankYou({ onBack }) {
  return (
    <div dir="rtl" lang="he" className="text-white min-h-screen bg-gradient-to-b from-black via-[#0a0015] to-[#1a001f] flex items-center justify-center">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0015] to-[#1a001f]" />
        <div className="absolute -top-32 left-[20%] w-[40vw] h-[40vw] rounded-full blur-3xl opacity-30 bg-fuchsia-700 animate-pulse" />
        <div className="absolute bottom-0 right-[10%] w-[35vw] h-[35vw] rounded-full blur-3xl opacity-30 bg-purple-600 animate-ping" />
      </div>

      {/* Success Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="relative bg-[#0f0518] border border-pink-500/30 p-8 rounded-2xl max-w-sm w-full text-center shadow-[0_0_40px_rgba(236,72,153,0.2)] transform transition-all scale-100">
          
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-fuchsia-600 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-pink-500/40">
            <span className="text-3xl">✨</span>
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold text-white mb-2">תודה רבה!</h3>
          <p className="text-white/70 mb-8">
            הפרטים התקבלו בהצלחה.<br/>
            ניצור איתך קשר בהקדם.
          </p>

          {/* Button */}
          <button
            onClick={onBack}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-500 font-bold text-black hover:brightness-110 transition-all active:scale-95"
          >
            חזרה לדף הבית
          </button>
        </div>
      </div>
    </div>
  );
}