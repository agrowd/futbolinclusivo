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
    "liga ba",
    "Liga Nacional de Fútbol Inclusivo",
  ],
  authors: [{ name: "Asociación Civil Andar" }],
  creator: "Asociación Civil Andar",
  openGraph: {
    title: "Fútbol Inclusivo — Asociación Civil Andar",
    description:
      "Creando valores a través del deporte. Liga de Fútbol para personas con y sin discapacidad.",
    url: "https://futbolinclusivo.org.ar",
    siteName: "Fútbol Inclusivo",
    images: [
      {
        url: "https://futbolinclusivo.org.ar/app/uploads/2018/12/MG_0325.jpg",
        width: 1200,
        height: 630,
        alt: "Fútbol Inclusivo - Asociación Civil Andar",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fútbol Inclusivo — Asociación Civil Andar",
    description: "La liga de fútbol para personas con y sin discapacidad más grande del país.",
    images: ["https://futbolinclusivo.org.ar/app/uploads/2018/12/MG_0325.jpg"],
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
