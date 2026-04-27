import Image from "next/image";
import Link from "next/link";

const KEY_POINTS = [
  "Identifica el síntoma principal antes de sugerir el producto.",
  "Explica en lenguaje simple para qué sirve y cómo usarlo.",
  "Confirma dudas del paciente y refuerza el uso responsable.",
];

const PRACTICE = [
  {
    question: "¿Qué debes hacer primero antes de recomendar Mistan?",
    answer: "Hacer una breve validación de necesidad para entender el motivo de consulta.",
  },
  {
    question: "¿Cómo presentarías Mistan al cliente en menos de 20 segundos?",
    answer: "Con una explicación clara de beneficio principal, forma de uso y cuándo esperar alivio.",
  },
  {
    question: "Si el cliente compara precios, ¿qué enfoque de venta conviene?",
    answer: "Resaltar valor: utilidad, confianza y correcta orientación, en lugar de solo costo.",
  },
];

export default function MistanPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(950px 440px at 0% -10%, #dcfce7 0%, transparent 45%), radial-gradient(800px 420px at 100% -5%, #ccfbf1 0%, transparent 45%), #f8fffb",
      }}
    >
      <header
        className="sticky top-0 z-20 border-b backdrop-blur-md"
        style={{ background: "rgba(248,255,251,0.9)", borderColor: "#bbf7d0" }}
      >
        <div className="mx-auto flex w-full max-w-4xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/estudiar/ventas"
            className="rounded-full border px-3 py-2 text-sm font-semibold"
            style={{ borderColor: "#86efac", color: "#166534", background: "#ffffff" }}
          >
            Volver
          </Link>

          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl text-lg"
              style={{ background: "#ffffff", border: "1px solid #bbf7d0" }}
            >
              🧴
            </div>
            <div>
              <p className="text-base font-extrabold" style={{ color: "#14532d" }}>
                Mistan - Técnicas de Venta
              </p>
              <p className="text-xs font-medium" style={{ color: "#166534" }}>
                Material rápido para repaso diario
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl px-4 pb-12 pt-6 sm:px-6 sm:pt-8">
        <section
          className="mb-6 rounded-3xl border bg-white p-5 sm:p-6"
          style={{ borderColor: "#bbf7d0", boxShadow: "0 10px 28px rgba(21,128,61,0.08)" }}
        >
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 overflow-hidden rounded-2xl border" style={{ borderColor: "#bbf7d0" }}>
              <Image src="/gerardilla.png" alt="Gerardilla" width={56} height={56} className="h-full w-full object-cover" />
            </div>

            <div>
              <h1 className="text-xl font-extrabold sm:text-2xl" style={{ color: "#14532d" }}>
                Guía práctica de Mistan
              </h1>
              <p className="mt-1 text-sm sm:text-base" style={{ color: "#166534" }}>
                Usa esta ficha para reforzar argumentos de venta y dar una recomendación clara al cliente.
              </p>
            </div>
          </div>
        </section>

        <section
          className="mb-6 rounded-3xl border bg-white p-5 sm:p-6"
          style={{ borderColor: "#bbf7d0", boxShadow: "0 8px 22px rgba(21,128,61,0.07)" }}
        >
          <h2 className="mb-3 text-base font-bold sm:text-lg" style={{ color: "#14532d" }}>
            Puntos clave de venta
          </h2>

          <ul className="space-y-2">
            {KEY_POINTS.map((point) => (
              <li key={point} className="rounded-2xl border px-4 py-3 text-sm sm:text-base" style={{ borderColor: "#dcfce7", color: "#166534", background: "#f7fee7" }}>
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section
          className="rounded-3xl border bg-white p-5 sm:p-6"
          style={{ borderColor: "#bbf7d0", boxShadow: "0 8px 22px rgba(21,128,61,0.07)" }}
        >
          <h2 className="mb-3 text-base font-bold sm:text-lg" style={{ color: "#14532d" }}>
            Preguntas de práctica
          </h2>

          <div className="space-y-3">
            {PRACTICE.map((item) => (
              <details key={item.question} className="rounded-2xl border px-4 py-3" style={{ borderColor: "#dcfce7", background: "#f0fdf4" }}>
                <summary className="cursor-pointer text-sm font-semibold sm:text-base" style={{ color: "#14532d" }}>
                  {item.question}
                </summary>
                <p className="mt-2 text-sm sm:text-base" style={{ color: "#166534" }}>
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section
          className="mt-6 rounded-3xl border bg-white p-5 sm:p-6"
          style={{ borderColor: "#bbf7d0", boxShadow: "0 8px 22px rgba(21,128,61,0.07)" }}
        >
          <h2 className="mb-3 text-base font-bold sm:text-lg" style={{ color: "#14532d" }}>
            Audio de repaso
          </h2>
          <p className="mb-3 text-sm sm:text-base" style={{ color: "#166534" }}>
            Reproduce este audio mientras repasas los puntos clave de venta de mistan.
          </p>

          <audio controls preload="metadata" className="w-full">
            <source src="/audiomistan.mp3" type="audio/mpeg" />
            Tu navegador no soporta audio.
          </audio>
        </section>
      </div>
    </main>
  );
}
