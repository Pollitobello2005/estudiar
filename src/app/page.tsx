"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const GREETINGS = [
  "¡Hola Gerarda! 😊 ¿Lista para aprender algo nuevo hoy?",
  "¡Bienvenida Gerarda! 🌟 ¡Hoy vas a aprender cosas increíbles!",
  "¡Qué gusto verte, Gerarda! 💜 ¿Empezamos a estudiar?",
];

export default function Home() {
  const [typed, setTyped] = useState("");
  const [showCards, setShowCards] = useState(false);
  const fullText = GREETINGS[0];

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(t);
        setTimeout(() => setShowCards(true), 400);
      }
    }, 45);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(160deg, #F0F4FF 0%, #EDE9FE 100%)" }}>
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
          style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>
          🐿️
        </div>
        <div>
          <h1 className="text-2xl font-black" style={{ color: "#4C1D95" }}>EstudiaGerardilla</h1>
          <p className="text-sm font-semibold" style={{ color: "#7C3AED" }}>Tu compañera de aprendizaje</p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Mascot + greeting */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="floating mb-6">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 mx-auto"
              style={{ borderColor: "#A855F7", boxShadow: "0 8px 32px rgba(124,58,237,0.25)" }}>
              <Image src="/gerardilla.png" alt="Gerardilla" width={160} height={160} className="object-cover w-full h-full" priority loading="eager" />
            </div>
          </div>

          {/* Speech bubble */}
          <div className="relative bg-white rounded-3xl px-8 py-5 shadow-lg max-w-lg"
            style={{ border: "2px solid #DDD6FE" }}>
            <div className="absolute left-1/2 -top-4 -translate-x-1/2 w-0 h-0"
              style={{ borderLeft: "14px solid transparent", borderRight: "14px solid transparent", borderBottom: "16px solid white" }} />
            <p className="text-xl font-bold cursor" style={{ color: "#1e1b4b", lineHeight: 1.5 }}>
              {typed}
            </p>
            {showCards && (
              <p className="mt-3 text-lg font-semibold" style={{ color: "#7C3AED" }}>
                👇 ¿Qué quieres estudiar hoy?
              </p>
            )}
          </div>
        </div>

        {/* Topic cards */}
        <AnimatePresence>
          {showCards && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-5"
            >
              {/* VENTAS */}
              <Link href="/estudiar/ventas">
                <motion.div
                  className="card-lift bg-white rounded-3xl p-7 flex items-center gap-6 cursor-pointer"
                  style={{ border: "3px solid #DDD6FE", boxShadow: "0 4px 20px rgba(124,58,237,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>
                    🤝
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-black mb-1" style={{ color: "#4C1D95" }}>Técnicas de Venta</h2>
                    <p className="text-lg font-semibold" style={{ color: "#6D28D9" }}>
                      Aprende a vender con confianza y resultados
                    </p>
                    <p className="text-base mt-2 font-semibold" style={{ color: "#8B5CF6" }}>
                      👆 Toca aquí para empezar
                    </p>
                  </div>
                  <div className="text-4xl">→</div>
                </motion.div>
              </Link>

              {/* PROGRESO */}
              <Link href="/progreso">
                <motion.div
                  className="card-lift bg-white rounded-3xl p-7 flex items-center gap-6 cursor-pointer"
                  style={{ border: "3px solid #FDE68A", boxShadow: "0 4px 20px rgba(245,158,11,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}>
                    📊
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-black mb-1" style={{ color: "#92400E" }}>Mi Progreso</h2>
                    <p className="text-lg font-semibold" style={{ color: "#B45309" }}>
                      Ve cuánto has aprendido y tus logros
                    </p>
                    <p className="text-base mt-2 font-semibold" style={{ color: "#D97706" }}>
                      👆 Toca aquí para ver tu avance
                    </p>
                  </div>
                  <div className="text-4xl">→</div>
                </motion.div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
