import Image from "next/image";
import Link from "next/link";

const KEY_POINTS = [
  "Detecta rapidamente la necesidad para orientar mejor la recomendacion.",
  "Presenta Ulkro con foco en beneficio practico para el cliente.",
  "Cierra confirmando entendimiento y forma de uso adecuada.",
];

const PRACTICE = [
  {
    question: "Que debes confirmar antes de ofrecer Ulkro?",
    answer: "Que la recomendacion coincide con la necesidad expresada por el cliente.",
  },
  {
    question: "Como explicar Ulkro de manera simple?",
    answer: "Enfocando su utilidad principal y la forma correcta de uso.",
  },
  {
    question: "Que hacer si el cliente tiene dudas finales?",
    answer: "Escuchar, responder puntual y reafirmar el valor de la recomendacion.",
  },
];

const ULKRO_IMAGES = Array.from({ length: 12 }, (_, index) => ({
  src: `/ulkro${index + 1}.png`,
  label: `Ulkro ${index + 1}`,
}));

export default function UlkroPage() {
  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(980px 460px at 0% -10%, #fef3c7 0%, transparent 45%), radial-gradient(820px 420px at 100% -10%, #fde68a 0%, transparent 45%), #fffbeb",
      }}
    >
      <header
        className="sticky top-0 z-20 border-b backdrop-blur-md"
        style={{ background: "rgba(255,251,235,0.9)", borderColor: "#fcd34d" }}
      >
        <div className="mx-auto flex w-full max-w-4xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/estudiar/ventas"
            className="rounded-full border px-3 py-2 text-sm font-semibold"
            style={{ borderColor: "#fbbf24", color: "#92400e", background: "#ffffff" }}
          >
            Volver
          </Link>

          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl text-lg"
              style={{ background: "#ffffff", border: "1px solid #fcd34d" }}
            >
              💠
            </div>
            <div>
              <p className="text-base font-extrabold" style={{ color: "#92400e" }}>
                Ulkro - Tecnicas de Venta
              </p>
              <p className="text-xs font-medium" style={{ color: "#b45309" }}>
                Entrenamiento rapido de atencion y cierre
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-4xl px-4 pb-12 pt-6 sm:px-6 sm:pt-8">
        <section
          className="mb-6 rounded-3xl border bg-white p-5 sm:p-6"
          style={{ borderColor: "#fcd34d", boxShadow: "0 10px 28px rgba(180,83,9,0.08)" }}
        >
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 overflow-hidden rounded-2xl border" style={{ borderColor: "#fcd34d" }}>
              <Image src="/gerardilla.png" alt="Gerardilla" width={56} height={56} className="h-full w-full object-cover" />
            </div>

            <div>
              <h1 className="text-xl font-extrabold sm:text-2xl" style={{ color: "#92400e" }}>
                Guia practica de Ulkro
              </h1>
              <p className="mt-1 text-sm sm:text-base" style={{ color: "#b45309" }}>
                Mejora tu recomendacion con mensajes claros y seguros para el cliente.
              </p>
            </div>
          </div>
        </section>

        <section
          className="mb-6 rounded-3xl border bg-white p-5 sm:p-6"
          style={{ borderColor: "#fcd34d", boxShadow: "0 8px 22px rgba(180,83,9,0.07)" }}
        >
          <h2 className="mb-3 text-base font-bold sm:text-lg" style={{ color: "#92400e" }}>
            Imagenes de apoyo
          </h2>
          <p className="mb-4 text-sm sm:text-base" style={{ color: "#b45309" }}>
            Material visual para practicar como presentar Ulkro con seguridad.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {ULKRO_IMAGES.map((img, idx) => (
              <div key={img.src} className="relative overflow-hidden rounded-2xl border bg-white" style={{ borderColor: "#fde68a", aspectRatio: "1 / 1" }}>
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <span className="absolute bottom-2 left-2 rounded-full px-2 py-1 text-xs font-semibold" style={{ background: "rgba(255,255,255,0.88)", color: "#92400e" }}>
                  {idx + 1}/{ULKRO_IMAGES.length}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          className="mb-6 rounded-3xl border bg-white p-5 sm:p-6"
          style={{ borderColor: "#fcd34d", boxShadow: "0 8px 22px rgba(180,83,9,0.07)" }}
        >
          <h2 className="mb-3 text-base font-bold sm:text-lg" style={{ color: "#92400e" }}>
            Puntos clave de venta
          </h2>

          <ul className="space-y-2">
            {KEY_POINTS.map((point) => (
              <li key={point} className="rounded-2xl border px-4 py-3 text-sm sm:text-base" style={{ borderColor: "#fde68a", color: "#b45309", background: "#fffbeb" }}>
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section
          className="mb-6 rounded-3xl border bg-white p-5 sm:p-6"
          style={{ borderColor: "#fcd34d", boxShadow: "0 8px 22px rgba(180,83,9,0.07)" }}
        >
          <h2 className="mb-3 text-base font-bold sm:text-lg" style={{ color: "#92400e" }}>
            Audio de repaso
          </h2>
          <p className="mb-3 text-sm sm:text-base" style={{ color: "#b45309" }}>
            Escucha este audio mientras repasas el material visual de Ulkro.
          </p>

          <audio controls preload="metadata" className="w-full">
            <source src="/ulkro.mp3" type="audio/mpeg" />
            Tu navegador no soporta audio.
          </audio>
        </section>

        <section
          className="rounded-3xl border bg-white p-5 sm:p-6"
          style={{ borderColor: "#fcd34d", boxShadow: "0 8px 22px rgba(180,83,9,0.07)" }}
        >
          <h2 className="mb-3 text-base font-bold sm:text-lg" style={{ color: "#92400e" }}>
            Preguntas de practica
          </h2>

          <div className="space-y-3">
            {PRACTICE.map((item) => (
              <details key={item.question} className="rounded-2xl border px-4 py-3" style={{ borderColor: "#fde68a", background: "#fffbeb" }}>
                <summary className="cursor-pointer text-sm font-semibold sm:text-base" style={{ color: "#92400e" }}>
                  {item.question}
                </summary>
                <p className="mt-2 text-sm sm:text-base" style={{ color: "#b45309" }}>
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
