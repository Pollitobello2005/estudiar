"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const PRODUCTS = [
  {
    id: "amplito-duo",
    name: "Amplito Duo",
    emoji: "🧪",
    color: "#1D4ED8",
    bg: "linear-gradient(135deg, #1D4ED8, #38BDF8)",
    border: "#BFDBFE",
    shadow: "rgba(29,78,216,0.2)",
    description: "Argumentos clave para\nrecomendacion efectiva",
    tag: "🎯 Guion rapido de venta",
  },
  {
    id: "ulkro",
    name: "Ulkro",
    emoji: "💠",
    color: "#B45309",
    bg: "linear-gradient(135deg, #B45309, #F59E0B)",
    border: "#FDE68A",
    shadow: "rgba(180,83,9,0.2)",
    description: "Practica comercial para\nrespuestas seguras",
    tag: "🗂️ Ficha de entrenamiento",
  },
  {
    id: "mistan",
    name: "Mistan",
    emoji: "🧴",
    color: "#15803D",
    bg: "linear-gradient(135deg, #16A34A, #22C55E)",
    border: "#BBF7D0",
    shadow: "rgba(22,163,74,0.2)",
    description: "Repaso comercial y puntos\nclave para recomendarlo",
    tag: "📚 Guía rápida de venta",
  },
  {
    id: "dolac",
    name: "Dolac",
    emoji: "💊",
    color: "#7C3AED",
    bg: "linear-gradient(135deg, #7C3AED, #A855F7)",
    border: "#DDD6FE",
    shadow: "rgba(124,58,237,0.2)",
    description: "Analgésico y antiinflamatorio\npara el dolor",
    tag: "💡 Ver video explicativo",
  },
  {
    id: "ceftrex",
    name: "Ceftrex",
    emoji: "💉",
    color: "#0891B2",
    bg: "linear-gradient(135deg, #0891B2, #06B6D4)",
    border: "#BAE6FD",
    shadow: "rgba(8,145,178,0.2)",
    description: "Antibiótico de amplio\nespectro cefalosporina",
    tag: "📝 Preguntas de práctica",
  },
];

export default function VentasPage() {
  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(160deg, #F0F4FF 0%, #EDE9FE 100%)" }}>
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-4">
        <Link href="/" className="text-3xl font-bold px-4 py-2 rounded-2xl"
          style={{ background: "#F3F4F6", color: "#4C1D95" }}>
          ← Inicio
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>🐿️</div>
          <span className="text-xl font-black" style={{ color: "#4C1D95" }}>Técnicas de Venta</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Mascot */}
        <div className="flex flex-col items-center mb-10">
          <div className="floating mb-5">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 mx-auto"
              style={{ borderColor: "#A855F7", boxShadow: "0 8px 32px rgba(124,58,237,0.2)" }}>
              <Image src="/gerardilla.png" alt="Gerardilla" width={112} height={112} className="object-cover w-full h-full" />
            </div>
          </div>

          {/* Speech bubble */}
          <div className="bg-white rounded-3xl px-8 py-5 shadow-lg text-center max-w-md"
            style={{ border: "2px solid #DDD6FE" }}>
            <p className="text-xl font-bold" style={{ color: "#1e1b4b" }}>
              ¡Perfecto Gerarda! 🤝
            </p>
            <p className="text-lg font-semibold mt-2" style={{ color: "#7C3AED" }}>
              ¿Sobre cuál producto quieres aprender?
            </p>
          </div>
        </div>

        {/* Product selector */}
        <div className="grid grid-cols-1 gap-6">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 120 }}
            >
              <Link href={`/estudiar/ventas/${p.id}`}>
                <div
                  className="card-lift bg-white rounded-3xl p-8 flex items-center gap-6 cursor-pointer"
                  style={{
                    border: `3px solid ${p.border}`,
                    boxShadow: `0 6px 24px ${p.shadow}`,
                  }}
                >
                  {/* Product icon */}
                  <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl flex-shrink-0"
                    style={{ background: p.bg, boxShadow: `0 6px 20px ${p.shadow}` }}>
                    {p.emoji}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h2 className="text-3xl font-black mb-2" style={{ color: p.color }}>
                      {p.name}
                    </h2>
                    <p className="text-lg font-semibold whitespace-pre-line mb-3" style={{ color: "#374151" }}>
                      {p.description}
                    </p>
                    <span className="inline-block px-4 py-2 rounded-full text-base font-bold text-white"
                      style={{ background: p.bg }}>
                      {p.tag}
                    </span>
                  </div>

                  <div className="text-5xl" style={{ color: p.color }}>→</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
