"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const START_TIME = 240; // Minuto 4 = 240 segundos

type Phase = "video" | "quiz" | "result";

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  tip: string;
};

const QUESTIONS: Question[] = [
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
    explanation:
      "Dolac (Ketorolaco) es un analgésico antiinflamatorio no esteroideo (AINE) muy potente, ideal para el dolor moderado a severo.",
    tip: "Tip de venta: destaca que alivia dolor e inflamación con acción rápida.",
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
    explanation:
      "El Ketorolaco (Dolac) comienza a actuar entre 30 y 60 minutos después de tomarlo.",
    tip: "Tip de venta: menciona que el paciente puede notar alivio en menos de una hora.",
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
    explanation:
      "Dolac suele ofrecerse en tabletas de 10mg para uso oral, además de forma inyectable.",
    tip: "Tip de venta: confirma qué presentaciones tiene tu sucursal para cerrar la venta más rápido.",
  },
];

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

function useVideoBackground(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const [wakeLockActive, setWakeLockActive] = useState(false);

  const requestWakeLock = useCallback(async () => {
    if (!("wakeLock" in navigator)) return;
    try {
      wakeLockRef.current = await navigator.wakeLock.request("screen");
      setWakeLockActive(true);
      wakeLockRef.current.addEventListener("release", () => {
        setWakeLockActive(false);
      });
    } catch (err) {
      console.warn("Wake Lock request fallido (batería baja o política del dispositivo)", err);
      setWakeLockActive(false);
    }
  }, []);

  const releaseWakeLock = useCallback(async () => {
    if (!wakeLockRef.current) return;
    try {
      await wakeLockRef.current.release();
      wakeLockRef.current = null;
      setWakeLockActive(false);
    } catch (err) {
      console.warn("Error al liberar Wake Lock", err);
    }
  }, []);

  // Reactivar Wake Lock cuando la página vuelve visible
  useEffect(() => {
    const onVisibility = async () => {
      if (document.visibilityState === "visible") {
        if (videoRef.current && !videoRef.current.paused) {
          await requestWakeLock();
        }
      } else if (document.visibilityState === "hidden") {
        // Cuando la pantalla se apaga, liberar wake lock pero permitir que siga reproduciendo audio
        await releaseWakeLock();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [requestWakeLock, releaseWakeLock, videoRef]);

  // Limpiar al desmontar/navegar
  useEffect(() => {
    const onBeforeUnload = async () => {
      await releaseWakeLock();
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      releaseWakeLock();
    };
  }, [releaseWakeLock]);

  const setupVideoMediaSession = useCallback(() => {
    if (!("mediaSession" in navigator) || !videoRef.current) return;

    const video = videoRef.current;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: "Dolac - Técnicas de Venta",
      artist: "EstudiaGerardilla 🐿️",
      album: "Profesional de farmacia",
      artwork: [
        { src: "/gerardilla.png", sizes: "512x512", type: "image/png" },
        { src: "/dolac1.png", sizes: "256x256", type: "image/png" },
      ],
    });

    navigator.mediaSession.setActionHandler("play", () => {
      video.play();
      navigator.mediaSession.playbackState = "playing";
    });
    navigator.mediaSession.setActionHandler("pause", () => {
      video.pause();
      navigator.mediaSession.playbackState = "paused";
    });
    navigator.mediaSession.setActionHandler("seekbackward", (details) => {
      video.currentTime = Math.max(START_TIME, video.currentTime - (details.seekOffset ?? 10));
    });
    navigator.mediaSession.setActionHandler("seekforward", (details) => {
      video.currentTime = Math.min(video.duration || video.currentTime, video.currentTime + (details.seekOffset ?? 10));
    });
    navigator.mediaSession.setActionHandler("seekto", (details) => {
      if (details.seekTime !== undefined) {
        video.currentTime = Math.max(START_TIME, details.seekTime);
      }
    });
  }, [videoRef]);

  const updateVideoPositionState = useCallback(() => {
    if (!("mediaSession" in navigator) || !videoRef.current) return;
    const video = videoRef.current;
    if (video.duration && !Number.isNaN(video.duration)) {
      navigator.mediaSession.setPositionState({
        duration: video.duration,
        position: video.currentTime,
        playbackRate: video.playbackRate,
      });
    }
  }, [videoRef]);

  return {
    wakeLockActive,
    requestWakeLock,
    releaseWakeLock,
    setupVideoMediaSession,
    updateVideoPositionState,
  };
}

export default function DolacPage() {
  const [phase, setPhase] = useState<Phase>("video");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    wakeLockActive,
    requestWakeLock,
    releaseWakeLock,
    setupVideoMediaSession,
    updateVideoPositionState,
  } = useVideoBackground(videoRef);

  const q = QUESTIONS[currentQ];
  const totalQ = QUESTIONS.length;

  const goPrevImage = useCallback(() => {
    setLightbox((index) => {
      if (index === null) return null;
      return index === 0 ? DOLAC_IMAGES.length - 1 : index - 1;
    });
  }, []);

  const goNextImage = useCallback(() => {
    setLightbox((index) => {
      if (index === null) return null;
      return index === DOLAC_IMAGES.length - 1 ? 0 : index + 1;
    });
  }, []);

  const setupAudioMediaSession = useCallback(() => {
    if (!("mediaSession" in navigator) || !audioRef.current) return;

    const audio = audioRef.current;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: "Dolac - Audio de repaso",
      artist: "EstudiaGerardilla",
      album: "Ventas",
      artwork: [{ src: "/dolac1.png", sizes: "512x512", type: "image/png" }],
    });

    navigator.mediaSession.setActionHandler("play", () => {
      audio.play();
      navigator.mediaSession.playbackState = "playing";
    });
    navigator.mediaSession.setActionHandler("pause", () => {
      audio.pause();
      navigator.mediaSession.playbackState = "paused";
    });
    navigator.mediaSession.setActionHandler("seekbackward", (details) => {
      audio.currentTime = Math.max(0, audio.currentTime - (details.seekOffset ?? 10));
    });
    navigator.mediaSession.setActionHandler("seekforward", (details) => {
      audio.currentTime = Math.min(audio.duration || audio.currentTime, audio.currentTime + (details.seekOffset ?? 10));
    });
    navigator.mediaSession.setActionHandler("seekto", (details) => {
      if (details.seekTime !== undefined) {
        audio.currentTime = details.seekTime;
      }
    });
  }, []);

  useEffect(() => {
    if (lightbox === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowLeft") goPrevImage();
      if (event.key === "ArrowRight") goNextImage();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox, goPrevImage, goNextImage]);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) setScore((prev) => prev + 1);
  };

  const handleNextQuestion = () => {
    if (currentQ + 1 >= totalQ) {
      setPhase("result");
      return;
    }

    setCurrentQ((prev) => prev + 1);
    setSelected(null);
  };

  const pct = Math.round((score / totalQ) * 100);
  const resultMsg =
    pct >= 80
      ? "Excelente avance"
      : pct >= 60
        ? "Muy buen trabajo"
        : "Sigue practicando, vas bien";

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(1200px 500px at 10% -10%, #f7e8ef 0%, transparent 45%), radial-gradient(900px 420px at 100% -10%, #e8efff 0%, transparent 45%), #f8f9fc",
      }}
    >
      <header
        className="sticky top-0 z-30 border-b backdrop-blur-md"
        style={{ background: "rgba(248,249,252,0.86)", borderColor: "#e5e7eb" }}
      >
        <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/estudiar/ventas"
            className="rounded-full border px-3 py-2 text-sm font-semibold"
            style={{ borderColor: "#d1d5db", color: "#3f3f46", background: "#ffffff" }}
          >
            Volver
          </Link>
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl text-lg"
              style={{ background: "#fff", border: "1px solid #e5e7eb" }}
            >
              💊
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-extrabold" style={{ color: "#1f2937" }}>
                Dolac - Técnicas de Venta
              </p>
              <p className="text-xs font-medium" style={{ color: "#6b7280" }}>
                Experiencia optimizada para móvil y iPad
              </p>
            </div>
          </div>

          <div
            className="ml-auto flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold"
            style={{
              background: wakeLockActive ? "#e6f9ef" : "#f3f4f6",
              color: wakeLockActive ? "#0f766e" : "#6b7280",
            }}
          >
            <span className={`inline-block h-2 w-2 rounded-full ${wakeLockActive ? "bg-green-600" : "bg-gray-400"}`} style={{ animation: wakeLockActive ? "pulse 2s ease-in-out infinite" : "none" }} />
            {wakeLockActive ? "Pantalla activa" : "Audio en 2º plano"}
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-4 pb-14 pt-6 sm:px-6 sm:pt-8">
        {phase === "video" && (
          <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div
              className="mb-5 rounded-3xl border bg-white p-5 sm:p-6"
              style={{ borderColor: "#e5e7eb", boxShadow: "0 10px 30px rgba(17,24,39,0.05)" }}
            >
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-2xl border" style={{ borderColor: "#e5e7eb" }}>
                  <Image src="/gerardilla.png" alt="Gerardilla" width={56} height={56} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h1 className="text-xl font-extrabold sm:text-2xl" style={{ color: "#111827" }}>
                    Estudia Dolac en modo práctico
                  </h1>
                  <p className="mt-1 text-sm sm:text-base" style={{ color: "#4b5563" }}>
                    Revisa el video, explora las imágenes y luego responde el mini quiz.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="mb-3 overflow-hidden rounded-3xl border bg-black p-0"
              style={{ borderColor: "#e5e7eb", boxShadow: "0 8px 22px rgba(17,24,39,0.05)", aspectRatio: "16 / 9" }}
            >
              <video
                ref={videoRef}
                controls
                playsInline
                crossOrigin="anonymous"
                controlsList="nodownload"
                className="h-full w-full"
                preload="auto"
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = START_TIME;
                  }
                }}
                onPlay={async () => {
                  setupVideoMediaSession();
                  await requestWakeLock();
                  if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
                }}
                onPause={() => {
                  if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
                }}
                onEnded={() => {
                  releaseWakeLock();
                  if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "none";
                }}
                onTimeUpdate={() => {
                  if (videoRef.current && videoRef.current.currentTime < START_TIME) {
                    videoRef.current.currentTime = START_TIME;
                  }
                  updateVideoPositionState();
                }}
                onSeeking={() => {
                  if (videoRef.current && videoRef.current.currentTime < START_TIME) {
                    videoRef.current.currentTime = START_TIME;
                  }
                }}
              >
                <source src="https://ik.imagekit.io/wjf1f3pce/dolac.mp4" type="video/mp4" />
                Tu navegador no soporta video.
              </video>
            </div>

            <p className="mb-6 px-1 text-sm" style={{ color: "#6b7280" }}>
              El video inicia en el minuto 4 y mantiene controles de reproducción en el bloqueo del celular cuando el navegador lo permite.
            </p>

            <div className="mb-8">
              <h2 className="mb-3 text-base font-bold sm:text-lg" style={{ color: "#1f2937" }}>
                Material visual
              </h2>

              <div
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
                style={{ gridAutoRows: "1fr" }}
              >
                {DOLAC_IMAGES.map((img, idx) => (
                  <motion.button
                    key={img.src}
                    onClick={() => setLightbox(idx)}
                    className="relative w-full overflow-hidden rounded-2xl border bg-white"
                    style={{ borderColor: "#e5e7eb", aspectRatio: "1 / 1" }}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ y: -2 }}
                  >
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 24vw"
                    />
                    <span
                      className="absolute bottom-2 left-2 rounded-full px-2 py-1 text-xs font-semibold"
                      style={{ background: "rgba(255,255,255,0.88)", color: "#374151" }}
                    >
                      {idx + 1}/{DOLAC_IMAGES.length}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div
              className="mb-8 rounded-3xl border bg-white p-5 sm:p-6"
              style={{ borderColor: "#e5e7eb", boxShadow: "0 8px 22px rgba(17,24,39,0.05)" }}
            >
              <div className="mb-3">
                <h3 className="text-base font-bold sm:text-lg" style={{ color: "#1f2937" }}>
                  Reproducir audio de repaso
                </h3>
                <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
                  Este audio está pensado para seguir reproduciéndose con la pantalla apagada si el navegador del dispositivo lo permite.
                </p>
              </div>

              <audio
                ref={audioRef}
                controls
                preload="metadata"
                className="w-full"
                onPlay={() => {
                  setupAudioMediaSession();
                  if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
                }}
                onPause={() => {
                  if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
                }}
                onEnded={() => {
                  if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "none";
                }}
                onTimeUpdate={() => {
                  if (!("mediaSession" in navigator) || !audioRef.current) return;
                  const audio = audioRef.current;
                  if (!audio.duration || Number.isNaN(audio.duration)) return;
                  navigator.mediaSession.setPositionState({
                    duration: audio.duration,
                    position: audio.currentTime,
                    playbackRate: audio.playbackRate,
                  });
                }}
              >
                <source src="/dolacaudio.mp3" type="audio/mpeg" />
                Tu navegador no soporta audio.
              </audio>
            </div>

            <div className="flex justify-center">
              <motion.button
                onClick={() => setPhase("quiz")}
                className="w-full rounded-2xl px-7 py-4 text-lg font-extrabold text-white sm:w-auto"
                style={{
                  background: "linear-gradient(90deg, #111827 0%, #374151 100%)",
                  boxShadow: "0 12px 24px rgba(17,24,39,0.25)",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Empezar quiz
              </motion.button>
            </div>

            <AnimatePresence>
              {lightbox !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex flex-col"
                  style={{ background: "rgba(17,24,39,0.95)" }}
                  onClick={() => setLightbox(null)}
                >
                  <div className="flex items-center justify-between px-4 py-4 sm:px-6" onClick={(e) => e.stopPropagation()}>
                    <p className="text-sm font-semibold text-white sm:text-base">
                      Imagen {lightbox + 1} de {DOLAC_IMAGES.length}
                    </p>
                    <button
                      onClick={() => setLightbox(null)}
                      className="rounded-full px-3 py-2 text-sm font-bold text-white"
                      style={{ background: "rgba(255,255,255,0.14)" }}
                    >
                      Cerrar
                    </button>
                  </div>

                  <div
                    className="relative flex flex-1 items-center justify-center px-2 py-2 sm:px-4"
                    onClick={(e) => e.stopPropagation()}
                    onTouchStart={(e) => {
                      touchStartX.current = e.touches[0]?.clientX ?? null;
                    }}
                    onTouchEnd={(e) => {
                      const endX = e.changedTouches[0]?.clientX;
                      if (touchStartX.current === null || endX === undefined) return;
                      const delta = touchStartX.current - endX;
                      if (Math.abs(delta) < 50) return;
                      if (delta > 0) goNextImage();
                      if (delta < 0) goPrevImage();
                    }}
                  >
                    <div className="relative w-full" style={{ height: "calc(100svh - 170px)" }}>
                      <Image
                        src={DOLAC_IMAGES[lightbox].src}
                        alt={DOLAC_IMAGES[lightbox].label}
                        fill
                        className="object-contain object-center"
                        sizes="(max-width: 768px) 100vw, 92vw"
                        priority
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 px-4 pb-6 sm:px-6" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={goPrevImage}
                      className="rounded-full px-4 py-2 text-sm font-semibold text-white"
                      style={{ background: "rgba(255,255,255,0.14)" }}
                    >
                      Anterior
                    </button>
                    <div className="max-w-[56vw] overflow-x-auto whitespace-nowrap text-xs text-white/80 sm:text-sm">
                      Desliza izquierda/derecha para cambiar
                    </div>
                    <button
                      onClick={goNextImage}
                      className="rounded-full px-4 py-2 text-sm font-semibold text-white"
                      style={{ background: "rgba(255,255,255,0.14)" }}
                    >
                      Siguiente
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}

        {phase === "quiz" && (
          <section>
            <div className="mb-4 rounded-3xl border bg-white p-5" style={{ borderColor: "#e5e7eb" }}>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold sm:text-base" style={{ color: "#374151" }}>
                  Pregunta {currentQ + 1} de {totalQ}
                </p>
                <p className="text-sm font-semibold sm:text-base" style={{ color: "#374151" }}>
                  Aciertos: {score}
                </p>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: "#eceff3" }}>
                <motion.div
                  className="h-2 rounded-full"
                  style={{ background: "#111827" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentQ / totalQ) * 100}%` }}
                  transition={{ duration: 0.35 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="mb-4 rounded-3xl border bg-white p-6 sm:p-7"
                  style={{ borderColor: "#e5e7eb", boxShadow: "0 10px 30px rgba(17,24,39,0.05)" }}
                >
                  <p className="text-xl font-extrabold leading-snug sm:text-2xl" style={{ color: "#111827" }}>
                    {q.question}
                  </p>
                </div>

                <div className="grid gap-3">
                  {q.options.map((opt, idx) => {
                    const isCorrect = selected !== null && idx === q.correct;
                    const isWrong = selected !== null && idx === selected && idx !== q.correct;

                    let borderColor = "#e5e7eb";
                    let bg = "#ffffff";
                    let textColor = "#111827";

                    if (isCorrect) {
                      borderColor = "#10b981";
                      bg = "#ecfdf5";
                      textColor = "#065f46";
                    }
                    if (isWrong) {
                      borderColor = "#ef4444";
                      bg = "#fef2f2";
                      textColor = "#991b1b";
                    }

                    return (
                      <button
                        key={opt}
                        disabled={selected !== null}
                        onClick={() => handleSelect(idx)}
                        className="rounded-2xl border p-4 text-left sm:p-5"
                        style={{
                          borderColor,
                          background: bg,
                          color: textColor,
                          transition: "all .2s ease",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                            style={{ background: "#f3f4f6", color: "#4b5563" }}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="text-base font-semibold sm:text-lg">{opt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selected !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 rounded-3xl border p-5"
                    style={{
                      borderColor: selected === q.correct ? "#a7f3d0" : "#fecaca",
                      background: selected === q.correct ? "#f0fdf4" : "#fff7ed",
                    }}
                  >
                    <p className="text-base font-bold sm:text-lg" style={{ color: "#111827" }}>
                      {selected === q.correct ? "Respuesta correcta" : "Repaso de la respuesta"}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed sm:text-base" style={{ color: "#374151" }}>
                      {q.explanation}
                    </p>
                    <p className="mt-2 text-sm font-semibold sm:text-base" style={{ color: "#4b5563" }}>
                      {q.tip}
                    </p>

                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={handleNextQuestion}
                        className="rounded-xl px-5 py-2.5 text-sm font-bold text-white sm:text-base"
                        style={{ background: "#111827" }}
                      >
                        {currentQ + 1 >= totalQ ? "Ver resultados" : "Siguiente"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </section>
        )}

        {phase === "result" && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-xl"
          >
            <div
              className="rounded-3xl border bg-white p-7 text-center sm:p-9"
              style={{ borderColor: "#e5e7eb", boxShadow: "0 10px 30px rgba(17,24,39,0.05)" }}
            >
              <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-2xl border" style={{ borderColor: "#e5e7eb" }}>
                <Image src="/gerardilla.png" alt="Gerardilla" width={80} height={80} className="h-full w-full object-cover" />
              </div>

              <p className="text-2xl font-extrabold sm:text-3xl" style={{ color: "#111827" }}>
                {resultMsg}
              </p>
              <p className="mt-2 text-base sm:text-lg" style={{ color: "#4b5563" }}>
                Obtuviste {score} de {totalQ} ({pct}%)
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl p-4" style={{ background: "#ecfdf5" }}>
                  <p className="text-2xl font-extrabold" style={{ color: "#065f46" }}>
                    {score}
                  </p>
                  <p className="text-xs font-semibold" style={{ color: "#047857" }}>
                    Correctas
                  </p>
                </div>
                <div className="rounded-2xl p-4" style={{ background: "#fef2f2" }}>
                  <p className="text-2xl font-extrabold" style={{ color: "#991b1b" }}>
                    {totalQ - score}
                  </p>
                  <p className="text-xs font-semibold" style={{ color: "#b91c1c" }}>
                    Incorrectas
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => {
                  setPhase("video");
                  setCurrentQ(0);
                  setSelected(null);
                  setScore(0);
                }}
                className="rounded-xl border px-5 py-3 text-sm font-semibold sm:text-base"
                style={{ borderColor: "#d1d5db", background: "#fff", color: "#374151" }}
              >
                Repetir módulo
              </button>

              <Link
                href="/estudiar/ventas"
                className="rounded-xl px-5 py-3 text-center text-sm font-semibold text-white sm:text-base"
                style={{ background: "#111827" }}
              >
                Elegir otro producto
              </Link>
            </div>
          </motion.section>
        )}
      </div>
    </main>
  );
}
