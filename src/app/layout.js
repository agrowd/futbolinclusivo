import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipLink from "@/components/layout/SkipLink";

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Fútbol Inclusivo — Liga de Fútbol para personas con y sin discapacidad",
    template: "%s | Fútbol Inclusivo",
  },
  description:
    "La Liga de Fútbol Inclusiva es un evento sistemático de fútbol para personas con y sin discapacidad creado por la Asociación Civil Andar. Desde 1998, creando valores a través del deporte.",
  keywords: [
    "fútbol inclusivo",
    "discapacidad",
    "inclusión",
    "deporte adaptado",
    "asociación civil andar",
    "liga de fútbol",
    "argentina",
  ],
  openGraph: {
    title: "Fútbol Inclusivo — Asociación Civil Andar",
    description:
      "Creando valores a través del deporte. Liga de Fútbol para personas con y sin discapacidad.",
    url: "https://futbolinclusivo.org.ar",
    siteName: "Fútbol Inclusivo",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${atkinson.variable}`} style={{ fontFamily: "var(--font-atkinson), system-ui, sans-serif" }}>
        <SkipLink />
        <Header />
        <main id="main-content" role="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
