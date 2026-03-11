import Link from "next/link";
import { ArrowRight, BookOpen, Trophy, Globe, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Programas - Fútbol Inclusivo",
  description: "Conocé todos los programas deportivos, formativos y sociales de Fútbol Inclusivo.",
};

const programs = [
  {
    title: "Escuela de Fútbol Inclusivo (EFI)",
    description: "Un espacio formativo para niños y jóvenes con y sin discapacidad, centrado en el desarrollo de habilidades sociales, valores y la recreación motriz a través del fútbol.",
    href: "/programas/escuela",
    icon: GraduationCap,
    color: "#007A3D"
  },
  {
    title: "Liga de Fútbol Inclusiva BA",
    description: "El torneo más importante de la Provincia de Buenos Aires, con sistema de testeo de habilidades para garantizar la equidad competitiva en diferentes zonas.",
    href: "/programas/liga-ba",
    icon: Trophy,
    color: "#1E3A8A"
  },
  {
    title: "Liga Nacional",
    description: "La réplica del modelo en diferentes provincias de Argentina, conformando una red federal que culmina en encuentros nacionales e intercambios culturales.",
    href: "/programas/liga-nacional",
    icon: Trophy,
    color: "#0284C7"
  },
  {
    title: "Festival LATAM de Fútbol 3",
    description: "Un encuentro internacional de organizaciones sociales que impulsan el desarrollo infanto-juvenil utilizando la metodología transformadora del Fútbol 3.",
    href: "/programas/festival-latam",
    icon: Globe,
    color: "#EA580C"
  }
];

export default function ProgramasPage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section style={{ background: "var(--color-primary)", color: "#fff", padding: "64px 0" }}>
        <div className="container">
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "16px" }}>Nuestros Programas</h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.9, maxWidth: "700px" }}>
            Desarrollamos una metodología integral de intervención social y deportiva, articulando una escuela formativa, ligas competitivas equitativas y festivales de intercambio global.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section" style={{ padding: "64px 0", background: "#f8f9fa" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
            {programs.map((prog, index) => {
              const Icon = prog.icon;
              return (
                <div key={index} style={{
                  background: "#fff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-md)",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <div style={{ 
                    background: prog.color,
                    padding: "32px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff"
                  }}>
                    <Icon size={64} strokeWidth={1.5} />
                  </div>
                  <div style={{ padding: "32px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <h2 style={{ fontSize: "1.5rem", color: "var(--color-primary-dark)", marginBottom: "16px" }}>
                      {prog.title}
                    </h2>
                    <p style={{ color: "#555", lineHeight: 1.6, flexGrow: 1, marginBottom: "24px" }}>
                      {prog.description}
                    </p>
                    <Link href={prog.href} className="program-link" style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 24px",
                      borderRadius: "100px",
                      color: "var(--color-primary-dark)",
                      fontWeight: 700,
                      textDecoration: "none",
                      alignSelf: "flex-start"
                    }}>
                      Explorar programa <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-Promo Inscription */}
      <section className="section" style={{ padding: "64px 0", textAlign: "center" }}>
        <div className="container">
          <BookOpen size={48} style={{ color: "var(--color-primary)", margin: "0 auto 24px" }} />
          <h2 style={{ fontSize: "2rem", color: "var(--color-primary-dark)", marginBottom: "16px" }}>
            ¿Querés inscribir a tu institución?
          </h2>
          <p style={{ color: "#666", maxWidth: "600px", margin: "0 auto 32px" }}>
            El proceso de inscripción para la Liga BA y la Liga Nacional se encuentra abierto. Podés registrar a tu institución y equipos de manera 100% online.
          </p>
          <Link href="/inscripcion" className="btn btn-primary btn-lg" style={{ display: "inline-flex" }}>
            Ir al Portal de Inscripción
          </Link>
        </div>
      </section>
    </div>
  );
}
