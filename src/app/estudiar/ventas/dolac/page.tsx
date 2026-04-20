"use client";

const START_TIME = 240; // Minuto 4 = 240 segundos
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const QUESTIONS = [
  {
    id: 1,
    question: "¿Para qué se usa principalmente el Dolac?",
    options: [
      "Para tratar infecciones bacterianas",
      "Para aliviar el dolor e inflamación",
      "Como suplemento vitamínico",
      "Para bajar la presión arterial",
    ],
    correct: 1,
    explanation: "Dolac (Ketorolaco) es un analgésico antiinflamatorio no esteroideo (AINE) muy potente, ideal para el dolor moderado a severo.",
    tip: "💡 Al presentarlo: 'Dolac es ideal para pacientes con dolor fuerte, actúa rápido y es muy efectivo.'",
  },
  {
    id: 2,
    question: "¿Cuánto tiempo tarda en hacer efecto el Dolac?",
    options: [
      "3 a 4 horas",
      "Al día siguiente",
      "30 a 60 minutos",
      "Inmediatamente al tomarlo",
    ],
    correct: 2,
    explanation: "El Ketorolaco (Dolac) comienza a actuar entre 30 y 60 minutos después de tomarlo, lo que lo hace muy efectivo para el dolor agudo.",
    tip: "💡 Argumento de venta: 'El paciente sentirá alivio en menos de una hora.'",
  },
  {
    id: 3,
    question: "¿Cuál es la presentación oral más común de Dolac?",
    options: [
      "Jarabe de 250ml",
      "Tabletas de 10mg",
      "Cápsulas de 500mg",
      "Supositorios de 200mg",
    ],
    correct: 1,
    explanation: "Dolac viene principalmente en tabletas de 10mg para uso oral, aunque también existe en ampolletas para uso inyectable.",
    tip: "💡 Siempre menciona la presentación disponible en tu farmacia para facilitar la compra.",
  },
];

type Phase = "video" | "quiz" | "result";

function ConfettiPiece({ color, delay, left }: { color: string; delay: number; left: string }) {
  return (
    <div className="confetti-piece" style={{
      left, top: "0", background: color,
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
      animationDuration: `${Math.random() * 2 + 2.5}s`,
      animationDelay: `${delay}s`,
      width: `${Math.random() * 10 + 8}px`,
      height: `${Math.random() * 10 + 8}px`,
    }} />
  );
}

const CONFETTI_COLORS = ["#7C3AED", "#A855F7", "#F59E0B", "#EC4899", "#10B981", "#EF4444", "#3B82F6"];

// ─── Hook: Wake Lock + Media Session ───────────────────────────────────────
function useVideoBackground(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const [wakeLockActive, setWakeLockActive] = useState(false);

  // Pedir Wake Lock (mantiene pantalla encendida)
  const requestWakeLock = useCallback(async () => {
    if (!("wakeLock" in navigator)) return;
    try {
      wakeLockRef.current = await navigator.wakeLock.request("screen");
      setWakeLockActive(true);
      wakeLockRef.current.addEventListener("release", () => {
        setWakeLockActive(false);
      });
    } catch {
      // El dispositivo puede rechazarlo si la batería está muy baja
    }
  }, []);

  // Liberar Wake Lock
  const releaseWakeLock = useCallback(async () => {
    if (wakeLockRef.current) {
      await wakeLockRef.current.release();
      wakeLockRef.current = null;
      setWakeLockActive(false);
    }
  }, []);

  // Cuando la pestaña vuelve a ser visible, reactivar wake lock si el video sigue corriendo
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible" && videoRef.current && !videoRef.current.paused) {
        await requestWakeLock();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [requestWakeLock, videoRef]);

  // Configurar Media Session API (controles en pantalla de bloqueo)
  const setupMediaSession = useCallback(() => {
    if (!("mediaSession" in navigator) || !videoRef.current) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: "Dolac — Técnicas de Venta",
      artist: "EstudiaGerardilla 🐿️",
      album: "Certificaciones Gerarda",
      artwork: [
        { src: "/gerardilla.png", sizes: "512x512", type: "image/png" },
      ],
    });

    const video = videoRef.current;

    navigator.mediaSession.setActionHandler("play", () => {
      video.play();
      navigator.mediaSession.playbackState = "playing";
    });
    navigator.mediaSession.setActionHandler("pause", () => {
      video.pause();
      navigator.mediaSession.playbackState = "paused";
    });
    navigator.mediaSession.setActionHandler("seekbackward", (d) => {
      video.currentTime = Math.max(0, video.currentTime - (d.seekOffset ?? 10));
    });
    navigator.mediaSession.setActionHandler("seekforward", (d) => {
      video.currentTime = Math.min(video.duration, video.currentTime + (d.seekOffset ?? 10));
    });
    navigator.mediaSession.setActionHandler("seekto", (d) => {
      if (d.seekTime !== undefined) video.currentTime = d.seekTime;
    });
  }, [videoRef]);

  // Actualizar posición de reproducción en media session (para barra de progreso en lock screen)
  const updatePositionState = useCallback(() => {
    if (!("mediaSession" in navigator) || !videoRef.current) return;
    const video = videoRef.current;
    if (video.duration && !isNaN(video.duration)) {
      navigator.mediaSession.setPositionState({
        duration: video.duration,
        playbackRate: video.playbackRate,
        position: video.currentTime,
      });
    }
  }, [videoRef]);

  return { requestWakeLock, releaseWakeLock, wakeLockActive, setupMediaSession, updatePositionState };
}
// ────────────────────────────────────────────────────────────────────────────

const DOLAC_IMAGES = [
  { src: "/dolac1.png", label: "Imagen 1" },
  { src: "/dolac2.png", label: "Imagen 2" },
  { src: "/dolac3.png", label: "Imagen 3" },
  { src: "/dolac4.png", label: "Imagen 4" },
  { src: "/dolac5.png", label: "Imagen 5" },
  { src: "/dolac6.png", label: "Imagen 6" },
  { src: "/dolac7.png", label: "Imagen 7" },
  { src: "/dolac8.png", label: "Imagen 8" },
];

export default function DolacPage() {
  const [phase, setPhase] = useState<Phase>("video");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null); // índice imagen abierta

  const videoRef = useRef<HTMLVideoElement>(null);
  const { requestWakeLock, releaseWakeLock, wakeLockActive, setupMediaSession, updatePositionState } =
    useVideoBackground(videoRef);

  const q = QUESTIONS[currentQ];
  const totalQ = QUESTIONS.length;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentQ + 1 >= totalQ) {
      setPhase("result");
      setConfetti(true);
      setTimeout(() => setConfetti(false), 4000);
    } else {
      setCurrentQ((c) => c + 1);
      setSelected(null);
    }
  };

  const pct = Math.round((score / totalQ) * 100);
  const resultMsg = pct >= 80 ? "¡Excelente, Gerarda! 🏆" : pct >= 60 ? "¡Muy bien! ⭐ Sigue así" : "¡Sigue practicando! 💪 Tú puedes";

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(160deg, #F0F4FF 0%, #EDE9FE 100%)" }}>
      {confetti && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <ConfettiPiece key={i} color={CONFETTI_COLORS[i % CONFETTI_COLORS.length]}
              delay={Math.random() * 1.5} left={`${Math.random() * 100}%`} />
          ))}
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-4">
        <Link href="/estudiar/ventas"
          className="text-xl font-bold px-5 py-3 rounded-2xl"
          style={{ background: "#F3F4F6", color: "#4C1D95" }}>
          ← Volver
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>💊</div>
          <span className="text-xl font-black" style={{ color: "#4C1D95" }}>Dolac — Técnicas de Venta</span>
        </div>

        {/* Indicador Wake Lock */}
        {wakeLockActive && (
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold"
            style={{ background: "#D1FAE5", color: "#065F46" }}>
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Pantalla activa
          </div>
        )}
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* ─── VIDEO PHASE ─── */}
        {phase === "video" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Mascot */}
            <div className="flex items-center gap-5 mb-8 bg-white rounded-3xl p-6"
              style={{ border: "2px solid #DDD6FE", boxShadow: "0 4px 20px rgba(124,58,237,0.1)" }}>
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 flex-shrink-0"
                style={{ borderColor: "#A855F7" }}>
                <Image src="/gerardilla.png" alt="Gerardilla" width={80} height={80} className="object-cover w-full h-full" />
              </div>
              <div>
                <p className="text-xl font-black mb-1" style={{ color: "#4C1D95" }}>
                  ¡Primero mira este video sobre Dolac! 🎬
                </p>
                <p className="text-lg font-semibold" style={{ color: "#7C3AED" }}>
                  El video seguirá sonando aunque apagues la pantalla. 📱✅
                </p>
              </div>
            </div>

            {/* Tip de pantalla apagada */}
            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-6 text-base font-semibold"
              style={{ background: "#FEF3C7", border: "2px solid #FDE68A", color: "#92400E" }}>
              <span className="text-2xl">💡</span>
              <span>Puedes apagar la pantalla de tu celular y el video seguirá reproduciéndose con audio. Los controles aparecerán en tu pantalla de bloqueo.</span>
            </div>

            {/* Video player */}
            <div className="bg-black rounded-3xl overflow-hidden mb-8"
              style={{ boxShadow: "0 8px 40px rgba(124,58,237,0.25)" }}>
              <video
                ref={videoRef}
                controls
                playsInline
                className="w-full"
                style={{ maxHeight: "480px" }}
                preload="metadata"
                onLoadedMetadata={() => {
                  // Saltar directo al minuto 4 cuando el video esté listo
                  if (videoRef.current) {
                    videoRef.current.currentTime = START_TIME;
                  }
                }}
                onPlay={async () => {
                  setupMediaSession();
                  await requestWakeLock();
                  if ("mediaSession" in navigator) {
                    navigator.mediaSession.playbackState = "playing";
                  }
                }}
                onPause={() => {
                  releaseWakeLock();
                  if ("mediaSession" in navigator) {
                    navigator.mediaSession.playbackState = "paused";
                  }
                }}
                onEnded={() => {
                  releaseWakeLock();
                  if ("mediaSession" in navigator) {
                    navigator.mediaSession.playbackState = "none";
                  }
                }}
                onTimeUpdate={() => {
                  // Evitar que retroceda antes del minuto 4
                  if (videoRef.current && videoRef.current.currentTime < START_TIME) {
                    videoRef.current.currentTime = START_TIME;
                  }
                  updatePositionState();
                }}
                onSeeking={() => {
                  // Si el usuario arrastra la barra antes del min 4, corregir
                  if (videoRef.current && videoRef.current.currentTime < START_TIME) {
                    videoRef.current.currentTime = START_TIME;
                  }
                }}
              >
                <source src="/dolac.mp4" type="video/mp4" />
                Tu navegador no soporta video.
              </video>
            </div>

            {/* ─── GALERÍA DE IMÁGENES ─── */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🖼️</span>
                <h2 className="text-xl font-black" style={{ color: "#4C1D95" }}>Material de apoyo — Toca para ver</h2>
              </div>
              {/* Grid responsive: 2 cols móvil | 3 cols tablet | 4 cols iPad grande */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: "12px",
              }}>
                {DOLAC_IMAGES.map((img, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setLightbox(i)}
                    className="relative overflow-hidden rounded-2xl"
                    style={{
                      aspectRatio: "1 / 1",
                      border: "3px solid #DDD6FE",
                      boxShadow: "0 4px 14px rgba(124,58,237,0.12)",
                      background: "#fff",
                    }}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(124,58,237,0.25)" }}
                  >
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
                    />
                    {/* overlay con número */}
                    <div className="absolute bottom-0 left-0 right-0 px-2 py-1 text-center text-xs font-bold text-white"
                      style={{ background: "rgba(76,29,149,0.6)" }}>
                      {i + 1}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* ─── LIGHTBOX ─── */}
            <AnimatePresence>
              {lightbox !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex flex-col"
                  style={{ background: "rgba(0,0,0,0.92)" }}
                  onClick={() => setLightbox(null)}
                >
                  {/* Header lightbox */}
                  <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
                    onClick={e => e.stopPropagation()}>
                    <span className="text-white font-bold text-lg">
                      Imagen {lightbox + 1} de {DOLAC_IMAGES.length}
                    </span>
                    <button
                      onClick={() => setLightbox(null)}
                      className="text-white text-3xl font-black w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                    >✕</button>
                  </div>

                  {/* Imagen principal */}
                  <div className="flex-1 relative flex items-center justify-center px-4"
                    onClick={e => e.stopPropagation()}>
                    <div className="relative w-full h-full max-w-2xl">
                      <Image
                        src={DOLAC_IMAGES[lightbox].src}
                        alt={DOLAC_IMAGES[lightbox].label}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                      />
                    </div>
                  </div>

                  {/* Navegación anterior / siguiente */}
                  <div className="flex items-center justify-between px-5 py-5 flex-shrink-0"
                    onClick={e => e.stopPropagation()}>
                    <motion.button
                      onClick={() => setLightbox(i => i !== null && i > 0 ? i - 1 : DOLAC_IMAGES.length - 1)}
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white text-lg"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                      whileTap={{ scale: 0.95 }}
                    >← Anterior</motion.button>

                    {/* Miniaturas */}
                    <div className="flex gap-2 overflow-x-auto" style={{ maxWidth: "55vw" }}>
                      {DOLAC_IMAGES.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setLightbox(i)}
                          className="relative flex-shrink-0 rounded-xl overflow-hidden"
                          style={{
                            width: 48, height: 48,
                            border: lightbox === i ? "3px solid #A855F7" : "2px solid rgba(255,255,255,0.2)",
                          }}
                        >
                          <Image src={img.src} alt={img.label} fill className="object-cover" sizes="48px" />
                        </button>
                      ))}
                    </div>

                    <motion.button
                      onClick={() => setLightbox(i => i !== null && i < DOLAC_IMAGES.length - 1 ? i + 1 : 0)}
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white text-lg"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                      whileTap={{ scale: 0.95 }}
                    >Siguiente →</motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA button */}
            <div className="text-center">
              <p className="text-lg font-semibold mb-4" style={{ color: "#6D28D9" }}>
                Cuando termines de ver el video, ¡pon a prueba lo que aprendiste! 👇
              </p>
              <motion.button
                onClick={() => setPhase("quiz")}
                className="glow-btn px-10 py-5 rounded-3xl text-2xl font-black text-white"
                style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                🧠 ¡Hacer las preguntas!
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ─── QUIZ PHASE ─── */}
        {phase === "quiz" && (
          <div>
            {/* Progress */}
            <div className="bg-white rounded-3xl p-5 mb-6"
              style={{ border: "2px solid #DDD6FE" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold" style={{ color: "#4C1D95" }}>
                  Pregunta {currentQ + 1} de {totalQ}
                </span>
                <span className="text-lg font-bold" style={{ color: "#7C3AED" }}>
                  ✅ {score} correctas
                </span>
              </div>
              <div className="w-full h-4 rounded-full" style={{ background: "#E5E7EB" }}>
                <motion.div
                  className="h-4 rounded-full"
                  style={{ background: "linear-gradient(90deg, #7C3AED, #A855F7)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentQ / totalQ) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                {/* Question */}
                <div className="bg-white rounded-3xl p-8 mb-5"
                  style={{ border: "2px solid #DDD6FE", boxShadow: "0 4px 20px rgba(124,58,237,0.08)" }}>
                  <p className="text-2xl font-black leading-relaxed" style={{ color: "#1e1b4b" }}>
                    {q.question}
                  </p>
                </div>

                {/* Options */}
                <div className="grid gap-4 mb-5">
                  {q.options.map((opt, idx) => {
                    const letter = ["A", "B", "C", "D"][idx];
                    let bgColor = "white";
                    let borderColor = "#DDD6FE";
                    let textColor = "#1e1b4b";

                    if (selected !== null) {
                      if (idx === q.correct) { bgColor = "#D1FAE5"; borderColor = "#059669"; textColor = "#065F46"; }
                      else if (idx === selected) { bgColor = "#FEE2E2"; borderColor = "#DC2626"; textColor = "#991B1B"; }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selected !== null}
                        onClick={() => handleSelect(idx)}
                        className="choice-opt w-full rounded-2xl p-6 flex items-center gap-5 text-left"
                        style={{ background: bgColor, borderColor, cursor: selected !== null ? "default" : "pointer" }}
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0 text-white"
                          style={{
                            background: selected === null ? "#7C3AED"
                              : idx === q.correct ? "#059669"
                              : idx === selected ? "#DC2626"
                              : "#9CA3AF"
                          }}>
                          {letter}
                        </div>
                        <span className="text-xl font-bold" style={{ color: textColor }}>{opt}</span>
                        {selected !== null && idx === q.correct && <span className="ml-auto text-3xl">✅</span>}
                        {selected !== null && idx === selected && idx !== q.correct && <span className="ml-auto text-3xl">❌</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {selected !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-3xl p-6 mb-5"
                      style={{
                        background: selected === q.correct ? "#ECFDF5" : "#FEF2F2",
                        border: `2px solid ${selected === q.correct ? "#A7F3D0" : "#FECACA"}`,
                      }}
                    >
                      <p className="text-xl font-black mb-2" style={{ color: selected === q.correct ? "#065F46" : "#991B1B" }}>
                        {selected === q.correct ? "✅ ¡Correcto, Gerarda!" : "❌ ¡Casi! Aquí está la respuesta correcta:"}
                      </p>
                      <p className="text-lg font-semibold leading-relaxed mb-3" style={{ color: "#374151" }}>
                        {q.explanation}
                      </p>
                      <p className="text-lg font-bold" style={{ color: "#7C3AED" }}>
                        {q.tip}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next button */}
                {selected !== null && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
                    <motion.button
                      onClick={handleNext}
                      className="px-10 py-5 rounded-3xl text-2xl font-black text-white"
                      style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", boxShadow: "0 6px 24px rgba(124,58,237,0.4)" }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {currentQ + 1 >= totalQ ? "Ver mis Resultados 🏆" : "Siguiente Pregunta →"}
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* ─── RESULT PHASE ─── */}
        {phase === "result" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center gap-6"
          >
            <div className="bg-white rounded-3xl p-10 w-full max-w-lg"
              style={{ border: "3px solid #DDD6FE", boxShadow: "0 8px 40px rgba(124,58,237,0.15)" }}>
              <div className="text-7xl mb-4">{pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "💪"}</div>
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 mx-auto mb-4 floating"
                style={{ borderColor: "#A855F7" }}>
                <Image src="/gerardilla.png" alt="Gerardilla" width={112} height={112} className="object-cover w-full h-full" />
              </div>
              <p className="text-3xl font-black mb-2" style={{ color: "#4C1D95" }}>{resultMsg}</p>
              <p className="text-xl font-semibold mb-6" style={{ color: "#7C3AED" }}>
                Obtuviste {score} de {totalQ} respuestas correctas ({pct}%)
              </p>

              <div className="flex justify-center gap-6 text-center mb-6">
                <div className="px-6 py-4 rounded-2xl" style={{ background: "#D1FAE5" }}>
                  <p className="text-4xl font-black" style={{ color: "#059669" }}>{score}</p>
                  <p className="text-base font-bold" style={{ color: "#065F46" }}>Correctas ✅</p>
                </div>
                <div className="px-6 py-4 rounded-2xl" style={{ background: "#FEE2E2" }}>
                  <p className="text-4xl font-black" style={{ color: "#DC2626" }}>{totalQ - score}</p>
                  <p className="text-base font-bold" style={{ color: "#991B1B" }}>Incorrectas ❌</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap justify-center">
              <motion.button
                onClick={() => { setPhase("video"); setCurrentQ(0); setSelected(null); setScore(0); }}
                className="px-8 py-4 rounded-2xl text-xl font-black"
                style={{ background: "#F3F4F6", color: "#4C1D95", border: "2px solid #DDD6FE" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                🔄 Repetir
              </motion.button>
              <Link href="/estudiar/ventas">
                <motion.button
                  className="px-8 py-4 rounded-2xl text-xl font-black text-white"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  🔙 Elegir otro producto
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
