"use client";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipLink from "@/components/layout/SkipLink";
import FloatingButtons from "@/components/layout/FloatingButtons";
import FloatingAdminTools from "@/components/admin/FloatingAdminTools";
import { Analytics } from "@vercel/analytics/next";

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${atkinson.variable} overflow-x-hidden`} style={{ fontFamily: "var(--font-atkinson), system-ui, sans-serif" }}>
        <SessionProvider>
          <SkipLink />
          <Header />
            <main id="main-content" role="main" tabIndex={-1}>
              {children}
            </main>
          <Footer />
          <FloatingButtons />
          <FloatingAdminTools />
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
