"use client";

import { SessionProvider } from "next-auth/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipLink from "@/components/layout/SkipLink";
import FloatingButtons from "@/components/layout/FloatingButtons";
import FloatingAdminTools from "@/components/admin/FloatingAdminTools";
import { Analytics } from "@vercel/analytics/next";

export default function ClientProviders({ children }) {
  return (
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
  );
}
