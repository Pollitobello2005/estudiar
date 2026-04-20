"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { TOPICS, Question } from "@/lib/questions";

const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2.5 + 1,
  dur: `${Math.random() * 3 + 2}s`,
  delay: `${Math.random() * 4}s`,
}));

type Phase = "intro" | "quiz" | "result";

function ConfettiPiece({ color, delay, left }: { color: string; delay: number; left: string }) {
  return (
    <div
      className="confetti-piece"
      style={{
        left,
        top: "0",
        background: color,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        animationDuration: `${Math.random() * 2 + 2}s`,
        animationDelay: `${delay}s`,
        width: `${Math.random() * 8 + 6}px`,
        height: `${Math.random() * 8 + 6}px`,
      }}
    />
  );
}

const CONFETTI_COLORS = ["#7C3AED", "#A855F7", "#F59E0B", "#EC4899", "#10B981", "#EF4444", "#ffd700"];

export default function StudyPage() {
  const params = useParams<{ topicId: string }>();
  const router = useRouter();
  const topicId = params.topicId || "ventas";
  const topic = TOPICS[topicId];

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [confetti, setConfetti] = useState(false);

  const questions: Question[] = topic?.questions ?? [];
  const totalQ = questions.length;
  const q = questions[currentQ];
  const progress = ((currentQ) / totalQ) * 100;

  useEffect(() => {
    if (!topic) router.push("/");
  }, [topic, router]);

  if (!topic) return null;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    const isCorrect = idx === q.correct;
    if (isCorrect) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, idx]);
  };

  const handleNext = () => {
    if (currentQ + 1 >= totalQ) {
      setPhase("result");
      setConfetti(true);
      setTimeout(() => setConfetti(false), 4000);
    } else {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  const handleRestart = () => {
    setPhase("intro");
    setCurrentQ(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setAnswers([]);
  };

  const percentage = Math.round((score / totalQ) * 100);
  const resultEmoji = percentage >= 80 ? "🏆" : percentage >= 60 ? "⭐" : "💪";
  const resultMsg =
    percentage >= 80
      ? "¡Increíble, Gerarda! ¡Eres una experta!"
      : percentage >= 60
      ? "¡Muy bien! ¡Sigue practicando!"
      : "¡No te rindas! ¡Con práctica lo lograrás!";

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0F0A1E 0%, #1A0A3E 50%, #0F0A1E 100%)" }}
    >
      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {STARS.map((s) => (
          <div key={s.id} className="star" style={{ top: s.top, left: s.left, width: s.size, height: s.size, "--dur": s.dur, "--delay": s.delay } as React.CSSProperties} />
        ))}
      </div>

      {/* Confetti */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => (
            <ConfettiPiece
              key={i}
              color={CONFETTI_COLORS[i % CONFETTI_COLORS.length]}
              delay={Math.random() * 1.5}
              left={`${Math.random() * 100}%`}
            />
          ))}
        </div>
      )}

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors font-bold">
          ← Inicio
        </Link>
        <span className="font-black text-lg gradient-text">EstudiaGerardilla 🐿️</span>
        <div className="text-purple-300 text-sm font-semibold">
          {phase === "quiz" ? `${currentQ + 1}/${totalQ}` : ""}
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">

        {/* INTRO PHASE */}
        {phase === "intro" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center gap-8"
          >
            {/* Mascot */}
            <div className="relative">
              <div className="absolute inset-0 blur-3xl opacity-30 scale-125" style={{ background: `radial-gradient(circle, ${topic.color}, transparent)` }} />
              <div className="relative w-40 h-40 rounded-full floating overflow-hidden border-4 border-purple-500/40"
                style={{ background: "rgba(124,58,237,0.15)" }}>
                <Image src="/gerardilla.png" alt="Gerardilla" fill className="object-cover" />
              </div>
            </div>

            {/* Topic badge */}
            <div>
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r ${topic.gradient} text-white font-black text-2xl mb-4`}
                style={{ boxShadow: `0 8px 32px ${topic.color}60` }}>
                {topic.icon} {topic.title}
              </div>
              <div className="glass-card p-6 max-w-lg mx-auto mt-4"
                style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(168,85,247,0.3)" }}>
                <p className="text-white text-xl font-bold">
                  ¡Hola Gerarda! 👋 Hoy estudiaremos <span className="text-yellow-400">{topic.title}</span>
                </p>
                <p className="text-purple-300 mt-3 text-base leading-relaxed">
                  {topic.description}. Responde las preguntas y yo te explicaré cada respuesta. ¡Tú puedes! 💜
                </p>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <span className="text-sm text-purple-400 font-semibold">📝 {totalQ} preguntas</span>
                  <span className="text-sm text-purple-400 font-semibold">⏱️ ~{totalQ * 2} minutos</span>
                </div>
              </div>
            </div>

            <motion.button
              onClick={() => setPhase("quiz")}
              className="px-10 py-4 rounded-2xl font-black text-xl text-white glow-pulse"
              style={{ background: `linear-gradient(135deg, ${topic.color}, #A855F7)` }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              ¡Empezar a Estudiar! 🚀
            </motion.button>
          </motion.div>
        )}

        {/* QUIZ PHASE */}
        {phase === "quiz" && q && (
          <div>
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-purple-300 font-semibold text-sm">Pregunta {currentQ + 1} de {totalQ}</span>
                <span className="text-yellow-400 font-bold">{score} correctas ⭐</span>
              </div>
              <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${topic.color}, #A855F7)` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQ) / totalQ) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35 }}
              >
                {/* Question card */}
                <div className="glass-card p-8 mb-6" style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(168,85,247,0.25)" }}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm"
                      style={{ background: `linear-gradient(135deg, ${topic.color}, #A855F7)` }}>
                      {currentQ + 1}
                    </div>
                    <p className="text-xl font-bold text-white leading-relaxed">{q.question}</p>
                  </div>
                </div>

                {/* Options */}
                <div className="grid gap-3 mb-6">
                  {q.options.map((opt, idx) => {
                    let btnClass = "choice-btn glass-card w-full p-5 text-left flex items-center gap-4 cursor-pointer border-2";
                    let borderColor = "border-white/10";
                    let textColor = "text-white";
                    let bg = "rgba(255,255,255,0.03)";
                    let prefix = String.fromCharCode(65 + idx); // A, B, C, D

                    if (selected !== null) {
                      if (idx === q.correct) {
                        borderColor = "border-emerald-500";
                        bg = "rgba(16,185,129,0.15)";
                        textColor = "text-emerald-300";
                      } else if (idx === selected && idx !== q.correct) {
                        borderColor = "border-red-500";
                        bg = "rgba(239,68,68,0.15)";
                        textColor = "text-red-300";
                      }
                    }

                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        className={`${btnClass} ${borderColor}`}
                        style={{ background: bg }}
                        whileHover={selected === null ? { scale: 1.01, x: 4 } : {}}
                        whileTap={selected === null ? { scale: 0.99 } : {}}
                      >
                        <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm"
                          style={{
                            background: selected === null ? `${topic.color}30` : idx === q.correct ? "rgba(16,185,129,0.3)" : idx === selected ? "rgba(239,68,68,0.3)" : `${topic.color}20`,
                            color: selected === null ? "#C4B5FD" : idx === q.correct ? "#10B981" : idx === selected ? "#EF4444" : "#C4B5FD"
                          }}>
                          {prefix}
                        </div>
                        <span className={`font-semibold text-base ${textColor}`}>{opt}</span>
                        {selected !== null && idx === q.correct && <span className="ml-auto text-2xl">✅</span>}
                        {selected !== null && idx === selected && idx !== q.correct && <span className="ml-auto text-2xl">❌</span>}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="glass-card p-6 mb-6 flex gap-4"
                      style={{
                        background: selected === q.correct ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                        border: `1px solid ${selected === q.correct ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)"}`,
                      }}
                    >
                      <div>
                        <p className="font-bold text-white mb-1">
                          {selected === q.correct ? "✅ ¡Correcto, Gerarda!" : "❌ ¡Casi! La respuesta correcta era otra."}
                        </p>
                        <p className="text-purple-200 text-sm leading-relaxed mb-2">{q.explanation}</p>
                        {q.tip && <p className="text-yellow-300 text-sm font-semibold">{q.tip}</p>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next button */}
                {showExplanation && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                    <motion.button
                      onClick={handleNext}
                      className="px-8 py-3 rounded-2xl font-bold text-white text-base"
                      style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {currentQ + 1 >= totalQ ? "Ver Resultados 🏆" : "Siguiente Pregunta →"}
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* RESULT PHASE */}
        {phase === "result" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center gap-8"
          >
            {/* Score card */}
            <div className="glass-card p-10 max-w-xl w-full" style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(168,85,247,0.4)" }}>
              <div className="text-7xl mb-4">{resultEmoji}</div>
              <div className="relative w-32 h-32 mx-auto mb-4 floating">
                <Image src="/gerardilla.png" alt="Gerardilla" fill className="object-cover rounded-full border-4 border-purple-500/40" />
              </div>
              <p className="text-2xl font-black text-white mb-2">{resultMsg}</p>

              {/* Score circle */}
              <div className="flex items-center justify-center gap-6 my-6">
                <div className="w-28 h-28 rounded-full flex flex-col items-center justify-center"
                  style={{ background: `conic-gradient(${topic.color} ${percentage * 3.6}deg, rgba(255,255,255,0.1) 0deg)` }}>
                  <div className="w-20 h-20 rounded-full flex flex-col items-center justify-center"
                    style={{ background: "#1A0A3E" }}>
                    <span className="text-2xl font-black text-white">{score}/{totalQ}</span>
                    <span className="text-xs text-purple-300">{percentage}%</span>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-purple-300 text-sm font-semibold">Correctas</p>
                  <p className="text-3xl font-black text-emerald-400">{score}</p>
                  <p className="text-purple-300 text-sm font-semibold mt-2">Incorrectas</p>
                  <p className="text-3xl font-black text-red-400">{totalQ - score}</p>
                </div>
              </div>

              {/* XP earned */}
              <div className="px-6 py-3 rounded-2xl inline-block font-bold text-white"
                style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}>
                +{score * 20} XP Ganados ⭐
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <motion.button
                onClick={handleRestart}
                className="px-8 py-3 rounded-2xl font-bold text-white border-2 border-purple-500/40"
                style={{ background: "rgba(124,58,237,0.2)" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                🔄 Intentar de Nuevo
              </motion.button>
              <Link href="/">
                <motion.button
                  className="px-8 py-3 rounded-2xl font-bold text-white glow-pulse"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  🏠 Elegir otro tema
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
