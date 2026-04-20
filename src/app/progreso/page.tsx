"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const STATS = [
  { icon: "✅", label: "Respuestas\nCorrectas", val: "8", color: "#059669", bg: "#D1FAE5" },
  { icon: "🔥", label: "Días\nSeguidos", val: "3", color: "#DC2626", bg: "#FEE2E2" },
  { icon: "⭐", label: "Puntos\nGanados", val: "160", color: "#D97706", bg: "#FEF3C7" },
];

const HISTORY = [
  { product: "Dolac", score: "3/3", date: "Hoy", icon: "💊", color: "#7C3AED", bg: "#EDE9FE" },
];

export default function ProgressPage() {
  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(160deg, #F0F4FF 0%, #EDE9FE 100%)" }}>
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-4">
        <Link href="/" className="text-xl font-bold px-5 py-3 rounded-2xl"
          style={{ background: "#F3F4F6", color: "#4C1D95" }}>
          ← Inicio
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>📊</div>
          <span className="text-xl font-black" style={{ color: "#4C1D95" }}>Mi Progreso</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Mascot */}
        <div className="flex flex-col items-center mb-8">
          <div className="floating mb-4">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4"
              style={{ borderColor: "#A855F7", boxShadow: "0 8px 32px rgba(124,58,237,0.2)" }}>
              <Image src="/gerardilla.png" alt="Gerardilla" width={112} height={112} className="object-cover w-full h-full" />
            </div>
          </div>
          <div className="bg-white rounded-3xl px-8 py-5 text-center"
            style={{ border: "2px solid #DDD6FE" }}>
            <p className="text-2xl font-black" style={{ color: "#4C1D95" }}>¡Mira tu avance, Gerarda! 🎉</p>
            <p className="text-lg font-semibold mt-1" style={{ color: "#7C3AED" }}>Cada día aprendes más 💜</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-5 text-center"
              style={{ border: `2px solid ${s.bg}`, boxShadow: `0 4px 16px ${s.bg}` }}>
              <div className="text-4xl mb-2">{s.icon}</div>
              <div className="text-4xl font-black mb-1" style={{ color: s.color }}>{s.val}</div>
              <div className="text-sm font-bold whitespace-pre-line leading-tight" style={{ color: "#6B7280" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Topics progress */}
        <div className="bg-white rounded-3xl p-7 mb-6"
          style={{ border: "2px solid #DDD6FE", boxShadow: "0 4px 20px rgba(124,58,237,0.08)" }}>
          <h2 className="text-2xl font-black mb-5" style={{ color: "#4C1D95" }}>Productos Estudiados 📚</h2>
          <div className="flex items-center gap-4 p-5 rounded-2xl mb-3"
            style={{ background: "#EDE9FE" }}>
            <span className="text-3xl">💊</span>
            <div className="flex-1">
              <p className="text-xl font-black" style={{ color: "#4C1D95" }}>Dolac</p>
              <div className="w-full h-4 rounded-full mt-2" style={{ background: "#DDD6FE" }}>
                <motion.div className="h-4 rounded-full"
                  style={{ background: "linear-gradient(90deg, #7C3AED, #A855F7)", width: "100%" }}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.3, duration: 0.8 }} />
              </div>
            </div>
            <span className="text-lg font-black" style={{ color: "#7C3AED" }}>100%</span>
          </div>
          <div className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: "#F0F9FF" }}>
            <span className="text-3xl">💉</span>
            <div className="flex-1">
              <p className="text-xl font-black" style={{ color: "#0C4A6E" }}>Ceftrex</p>
              <div className="w-full h-4 rounded-full mt-2" style={{ background: "#BAE6FD" }}>
                <div className="h-4 rounded-full" style={{ background: "#9CA3AF", width: "0%" }} />
              </div>
            </div>
            <span className="text-lg font-bold" style={{ color: "#9CA3AF" }}>Próximamente</span>
          </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-3xl p-7"
          style={{ border: "2px solid #DDD6FE", boxShadow: "0 4px 20px rgba(124,58,237,0.08)" }}>
          <h2 className="text-2xl font-black mb-5" style={{ color: "#4C1D95" }}>Últimas Sesiones 📝</h2>
          {HISTORY.map((h, i) => (
            <div key={i} className="flex items-center gap-4 p-5 rounded-2xl"
              style={{ background: h.bg }}>
              <span className="text-3xl">{h.icon}</span>
              <div className="flex-1">
                <p className="text-xl font-black" style={{ color: "#1e1b4b" }}>{h.product}</p>
                <p className="text-base font-semibold" style={{ color: "#6B7280" }}>{h.date}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black" style={{ color: "#059669" }}>{h.score}</p>
                <p className="text-sm font-bold" style={{ color: "#6B7280" }}>correctas</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
