import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EstudiaGerardilla 🐿️ | Tu compañera de estudio",
  description: "Plataforma de estudio personalizada para Gerarda. Aprende técnicas de venta, certificaciones y más con Gerardilla tu ardilla guía.",
  keywords: ["estudio", "certificaciones", "técnicas de venta", "aprendizaje"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
