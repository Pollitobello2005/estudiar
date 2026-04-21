"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const CEFTREX_IMAGES = Array.from({ length: 9 }, (_, index) => ({
  src: `/ceftrex${index + 1}.png`,
  label: `Ceftrex ${index + 1}`,
}));

export default function CeftrexPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const lightboxOverlayRef = useRef<HTMLDivElement>(null);

  const goPrevImage = useCallback(() => {
    setLightbox((index) => {
      if (index === null) return null;
      return index === 0 ? CEFTREX_IMAGES.length - 1 : index - 1;
    });
  }, []);

  const goNextImage = useCallback(() => {
    setLightbox((index) => {
      if (index === null) return null;
      return index === CEFTREX_IMAGES.length - 1 ? 0 : index + 1;
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

  useEffect(() => {
    if (lightbox === null) return;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [lightbox]);

  useEffect(() => {
    const shouldRequestFullscreen =
      lightbox !== null &&
      document.fullscreenEnabled &&
      !document.fullscreenElement &&
      (window.innerWidth <= 1024 || navigator.maxTouchPoints > 0);

    if (!shouldRequestFullscreen) return;

    lightboxOverlayRef.current?.requestFullscreen().catch(() => {
      // iOS Safari and some browsers can reject fullscreen for custom elements.
    });
  }, [lightbox]);

  const closeLightbox = async () => {
    setLightbox(null);
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => undefined);
    }
  };

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(1200px 500px at 10% -10%, #e8fbff 0%, transparent 45%), radial-gradient(900px 420px at 100% -10%, #dbeafe 0%, transparent 45%), #f8fbff",
      }}
    >
      <header
        className="sticky top-0 z-30 border-b backdrop-blur-md"
        style={{ background: "rgba(248,251,255,0.88)", borderColor: "#dbe9f4" }}
      >
        <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/estudiar/ventas"
            className="rounded-full border px-3 py-2 text-sm font-semibold"
            style={{ borderColor: "#bfdbfe", color: "#0c4a6e", background: "#ffffff" }}
          >
            Volver
          </Link>

          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl text-lg"
              style={{ background: "#ffffff", border: "1px solid #dbe9f4" }}
            >
              💉
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-extrabold" style={{ color: "#0f172a" }}>
                Ceftrex - Material de Estudio
              </p>
              <p className="text-xs font-medium" style={{ color: "#475569" }}>
                Toca una imagen para verla en pantalla completa
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-4 pb-14 pt-6 sm:px-6 sm:pt-8">
        <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div
            className="mb-5 rounded-3xl border bg-white p-5 sm:p-6"
            style={{ borderColor: "#dbe9f4", boxShadow: "0 10px 30px rgba(15,23,42,0.05)" }}
          >
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 overflow-hidden rounded-2xl border" style={{ borderColor: "#dbe9f4" }}>
                <Image src="/gerardilla.png" alt="Gerardilla" width={56} height={56} className="h-full w-full object-cover" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold sm:text-2xl" style={{ color: "#0f172a" }}>
                  Estudia Ceftrex con imágenes y audio
                </h1>
                <p className="mt-1 text-sm sm:text-base" style={{ color: "#475569" }}>
                  Revisa cada imagen y usa el audio para repasar puntos clave.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-3 text-base font-bold sm:text-lg" style={{ color: "#0f172a" }}>
              Material visual
            </h2>

            <div
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
              style={{ gridAutoRows: "1fr" }}
            >
              {CEFTREX_IMAGES.map((img, idx) => (
                <motion.button
                  key={img.src}
                  onClick={() => setLightbox(idx)}
                  className="relative w-full overflow-hidden rounded-2xl border bg-white"
                  style={{ borderColor: "#dbe9f4", aspectRatio: "1 / 1" }}
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
                    style={{ background: "rgba(255,255,255,0.88)", color: "#1e293b" }}
                  >
                    {idx + 1}/{CEFTREX_IMAGES.length}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          <div
            className="mb-8 rounded-3xl border bg-white p-5 sm:p-6"
            style={{ borderColor: "#dbe9f4", boxShadow: "0 8px 22px rgba(15,23,42,0.05)" }}
          >
            <div className="mb-3">
              <h3 className="text-base font-bold sm:text-lg" style={{ color: "#0f172a" }}>
                Reproducir audio de repaso
              </h3>
              <p className="mt-1 text-sm" style={{ color: "#475569" }}>
                Puedes escucharlo mientras revisas las imágenes.
              </p>
            </div>

            <audio controls preload="metadata" className="w-full">
              <source src="/ceftrex audio.mp3" type="audio/mpeg" />
              Tu navegador no soporta audio.
            </audio>
          </div>

          <AnimatePresence>
            {lightbox !== null && (
              <motion.div
                ref={lightboxOverlayRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50"
                style={{ background: "rgba(15,23,42,0.96)" }}
                onClick={() => {
                  void closeLightbox();
                }}
              >
                <div
                  className="relative h-[100svh] w-[100vw]"
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
                  <div className="relative h-full w-full">
                    <Image
                      src={CEFTREX_IMAGES[lightbox].src}
                      alt={CEFTREX_IMAGES[lightbox].label}
                      fill
                      className="object-contain object-center"
                      sizes="100vw"
                      priority
                    />
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      void closeLightbox();
                    }}
                    className="absolute right-3 top-3 rounded-full px-3 py-2 text-sm font-bold text-white sm:right-5 sm:top-5"
                    style={{ background: "rgba(255,255,255,0.14)" }}
                  >
                    Cerrar
                  </button>

                  <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full px-3 py-1.5 text-xs font-semibold text-white/90 sm:top-5 sm:text-sm" style={{ background: "rgba(0,0,0,0.35)" }}>
                    {lightbox + 1} / {CEFTREX_IMAGES.length}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrevImage();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-sm font-semibold text-white sm:left-5"
                    style={{ background: "rgba(255,255,255,0.14)" }}
                  >
                    ◀
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goNextImage();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-sm font-semibold text-white sm:right-5"
                    style={{ background: "rgba(255,255,255,0.14)" }}
                  >
                    ▶
                  </button>

                  <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1.5 text-xs text-white/85 sm:bottom-5 sm:text-sm" style={{ background: "rgba(0,0,0,0.35)" }}>
                    Desliza para cambiar
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </div>
    </main>
  );
}
