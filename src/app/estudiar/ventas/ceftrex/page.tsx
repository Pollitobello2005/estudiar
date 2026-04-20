"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CeftrexPage() {
  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(160deg, #F0F4FF 0%, #E0F2FE 100%)" }}>
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-4">
        <Link href="/estudiar/ventas"
          className="text-xl font-bold px-5 py-3 rounded-2xl"
          style={{ background: "#F3F4F6", color: "#0C4A6E" }}>
          ← Volver
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "linear-gradient(135deg, #0891B2, #06B6D4)" }}>💉</div>
          <span className="text-xl font-black" style={{ color: "#0C4A6E" }}>Ceftrex — Próximamente</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-16 flex flex-col items-center text-center gap-8">
        <div className="floating">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4"
            style={{ borderColor: "#06B6D4", boxShadow: "0 8px 32px rgba(8,145,178,0.2)" }}>
            <Image src="/gerardilla.png" alt="Gerardilla" width={128} height={128} className="object-cover w-full h-full" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-10"
          style={{ border: "3px solid #BAE6FD", boxShadow: "0 6px 24px rgba(8,145,178,0.1)" }}>
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-3xl font-black mb-3" style={{ color: "#0C4A6E" }}>
            ¡Ceftrex viene pronto, Gerarda!
          </h2>
          <p className="text-xl font-semibold" style={{ color: "#0891B2" }}>
            Estamos preparando el material de estudio para este producto. ¡Pronto podrás aprenderlo aquí!
          </p>
        </div>

        <Link href="/estudiar/ventas">
          <motion.button
            className="px-10 py-5 rounded-3xl text-2xl font-black text-white"
            style={{ background: "linear-gradient(135deg, #0891B2, #06B6D4)", boxShadow: "0 6px 24px rgba(8,145,178,0.3)" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            ← Volver a los productos
          </motion.button>
        </Link>
      </div>
    </main>
  );
}
