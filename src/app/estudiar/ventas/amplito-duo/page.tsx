import Image from "next/image";
import Link from "next/link";

const KEY_POINTS = [
  "Inicia con una pregunta corta para identificar necesidad del paciente.",
  "Explica el beneficio principal en lenguaje claro y directo.",
  "Confirma forma de uso y cierra con recomendacion segura.",
];

const PRACTICE = [
  {
    question: "Como abririas la conversacion para recomendar Amplito Duo?",
    answer: "Con una pregunta de contexto: que molestia tiene y desde cuando.",
  },
  {
    question: "Que argumento comercial debe quedar claro en la explicacion?",
    answer: "El beneficio principal para su necesidad y la confianza en la recomendacion.",
  },
  {
    question: "Como responder si el cliente duda antes de comprar?",
    answer: "Reforzar utilidad, uso correcto y resolver su duda puntual sin presionarlo.",
  },
];

const AMPLITO_DUO_IMAGES = Array.from({ length: 5 }, (_, index) => ({
  src: `/amplito-duo${index + 1}.png`,
  label: `Amplito Duo ${index + 1}`,
}));

export default function AmplitoDuoPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(980px 460px at 0% -10%, #dbeafe 0%, transparent 45%), radial-gradient(820px 420px at 100% -10%, #cffafe 0%, transparent 45%), #f8fbff",
      }}
    >
      <header
        className="sticky top-0 z-20 border-b backdrop-blur-md"
        style={{ background: "rgba(248,251,255,0.9)", borderColor: "#bfdbfe" }}
      >
        <div className="mx-auto flex w-full max-w-4xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/estudiar/ventas"
            className="rounded-full border px-3 py-2 text-sm font-semibold"
            style={{ borderColor: "#93c5fd", color: "#1e3a8a", background: "#ffffff" }}
          >
            Volver
          </Link>

          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl text-lg"
              style={{ background: "#ffffff", border: "1px solid #bfdbfe" }}
            >
              🧪
            </div>
            <div>
              <p className="text-base font-extrabold" style={{ color: "#1e3a8a" }}>
                Amplito Duo - Tecnicas de Venta
              </p>
              <p className="text-xs font-medium" style={{ color: "#1d4ed8" }}>
                Guia breve para practica comercial
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl px-4 pb-12 pt-6 sm:px-6 sm:pt-8">
        <section
          className="mb-6 rounded-3xl border bg-white p-5 sm:p-6"
          style={{ borderColor: "#bfdbfe", boxShadow: "0 10px 28px rgba(29,78,216,0.08)" }}
        >
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 overflow-hidden rounded-2xl border" style={{ borderColor: "#bfdbfe" }}>
              <Image src="/gerardilla.png" alt="Gerardilla" width={56} height={56} className="h-full w-full object-cover" />
            </div>

            <div>
              <h1 className="text-xl font-extrabold sm:text-2xl" style={{ color: "#1e3a8a" }}>
                Guia practica de Amplito Duo
              </h1>
              <p className="mt-1 text-sm sm:text-base" style={{ color: "#1d4ed8" }}>
                Refuerza tu explicacion para recomendar el producto con seguridad.
              </p>
            </div>
          </div>
        </section>

        <section
          className="mb-6 rounded-3xl border bg-white p-5 sm:p-6"
          style={{ borderColor: "#bfdbfe", boxShadow: "0 8px 22px rgba(29,78,216,0.07)" }}
        >
          <h2 className="mb-3 text-base font-bold sm:text-lg" style={{ color: "#1e3a8a" }}>
            Imagenes de apoyo
          </h2>
          <p className="mb-4 text-sm sm:text-base" style={{ color: "#1d4ed8" }}>
            Revisa estas imagenes para reforzar tu discurso de venta de Amplito Duo.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {AMPLITO_DUO_IMAGES.map((img, idx) => (
              <div key={img.src} className="relative overflow-hidden rounded-2xl border bg-white" style={{ borderColor: "#dbeafe", aspectRatio: "1 / 1" }}>
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <span className="absolute bottom-2 left-2 rounded-full px-2 py-1 text-xs font-semibold" style={{ background: "rgba(255,255,255,0.88)", color: "#1e3a8a" }}>
                  {idx + 1}/{AMPLITO_DUO_IMAGES.length}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          className="mb-6 rounded-3xl border bg-white p-5 sm:p-6"
          style={{ borderColor: "#bfdbfe", boxShadow: "0 8px 22px rgba(29,78,216,0.07)" }}
        >
          <h2 className="mb-3 text-base font-bold sm:text-lg" style={{ color: "#1e3a8a" }}>
            Puntos clave de venta
          </h2>

          <ul className="space-y-2">
            {KEY_POINTS.map((point) => (
              <li key={point} className="rounded-2xl border px-4 py-3 text-sm sm:text-base" style={{ borderColor: "#dbeafe", color: "#1d4ed8", background: "#eff6ff" }}>
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section
          className="mb-6 rounded-3xl border bg-white p-5 sm:p-6"
          style={{ borderColor: "#bfdbfe", boxShadow: "0 8px 22px rgba(29,78,216,0.07)" }}
        >
          <h2 className="mb-3 text-base font-bold sm:text-lg" style={{ color: "#1e3a8a" }}>
            Audio de repaso
          </h2>
          <p className="mb-3 text-sm sm:text-base" style={{ color: "#1d4ed8" }}>
            Reproduce este audio para reforzar el guion comercial de Amplito Duo.
          </p>

          <audio controls preload="metadata" className="w-full">
            <source src="/amplironduo.mp3" type="audio/mpeg" />
            Tu navegador no soporta audio.
          </audio>
        </section>

        <section
          className="rounded-3xl border bg-white p-5 sm:p-6"
          style={{ borderColor: "#bfdbfe", boxShadow: "0 8px 22px rgba(29,78,216,0.07)" }}
        >
          <h2 className="mb-3 text-base font-bold sm:text-lg" style={{ color: "#1e3a8a" }}>
            Preguntas de practica
          </h2>

          <div className="space-y-3">
            {PRACTICE.map((item) => (
              <details key={item.question} className="rounded-2xl border px-4 py-3" style={{ borderColor: "#dbeafe", background: "#eff6ff" }}>
                <summary className="cursor-pointer text-sm font-semibold sm:text-base" style={{ color: "#1e3a8a" }}>
                  {item.question}
                </summary>
                <p className="mt-2 text-sm sm:text-base" style={{ color: "#1d4ed8" }}>
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
