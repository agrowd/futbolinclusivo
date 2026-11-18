import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/providers/ClientProviders";

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://futbolinclusivo.org.ar"),
  title: {
    default: "Fútbol Inclusivo | Asociación Civil Andar - El Fútbol es para Todxs",
    template: "%s | Fútbol Inclusivo - Andar FC",
  },
  description:
    "Desde 1998, equiparamos oportunidades y construimos una sociedad más inclusiva a través del deporte sistemático. Liga de Fútbol Inclusiva de la Asociación Civil Andar.",
  keywords: [
    "fútbol inclusivo",
    "asociación civil andar",
    "andar fc",
    "liga de fútbol inclusiva",
    "deporte adaptado",
    "superliga inclusiva afa",
    "moreno",
    "el fútbol es para todxs",
  ],
  authors: [{ name: "Asociación Civil Andar", url: "https://futbolinclusivo.org.ar" }],
  creator: "Asociación Civil Andar",
  publisher: "Asociación Civil Andar",
  icons: {
    icon: "/andarfc-logo.png?v=3",
    shortcut: "/andarfc-logo.png?v=3",
    apple: "/andarfc-logo.png?v=3",
  },
  openGraph: {
    title: "Fútbol Inclusivo | Asociación Civil Andar - El Fútbol es para Todxs",
    description:
      "Equiparamos oportunidades y construimos una sociedad más inclusiva a través del deporte más lindo del mundo.",
    url: "https://futbolinclusivo.org.ar",
    siteName: "Fútbol Inclusivo",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Fútbol Inclusivo - Asociación Civil Andar y Andar FC",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fútbol Inclusivo | Asociación Civil Andar",
    description:
      "Equiparamos oportunidades y construimos una sociedad más inclusiva a través del deporte más lindo del mundo.",
    images: ["/hero.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/andarfc-logo.png?v=3" type="image/png" />
        <link rel="shortcut icon" href="/andarfc-logo.png?v=3" type="image/png" />
        <link rel="apple-touch-icon" href="/andarfc-logo.png?v=3" />
      </head>
      <body
        className={`${atkinson.variable} overflow-x-hidden`}
        style={{ fontFamily: "var(--font-atkinson), system-ui, sans-serif" }}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
