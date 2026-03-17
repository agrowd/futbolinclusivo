import Link from "next/link";
import { ArrowRight, BookOpen, Trophy, Globe, GraduationCap, ChevronRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Programas - Premium Experience",
  description: "Conocé todos los programas deportivos, formativos y sociales de Fútbol Inclusivo.",
};

const programs = [
  {
    title: "Escuela de Fútbol Inclusivo (EFI)",
    description: "Un espacio formativo para niños y jóvenes, centrado en el desarrollo de habilidades sociales y recreación motriz.",
    href: "/programas/escuela",
    icon: GraduationCap,
    color: "var(--color-primary-light)"
  },
  {
    title: "Liga de Fútbol Inclusiva BA",
    description: "El torneo más importante de la Provincia de Buenos Aires, con sistema de testeo de habilidades equitativo.",
    href: "/programas/liga-ba",
    icon: Trophy,
    color: "#E67E22"
  },
  {
    title: "Liga Nacional",
    description: "La réplica del modelo en diferentes provincias de Argentina, conformando una red federal única.",
    href: "/programas/liga-nacional",
    icon: Trophy,
    color: "#2980B9"
  },
  {
    title: "Festival LATAM de Fútbol 3",
    description: "Un encuentro internacional que impulsa el desarrollo juvenil utilizando la metodología del Fútbol 3.",
    href: "/programas/festival-latam",
    icon: Globe,
    color: "#8E44AD"
  }
];

export default function ProgramasPage() {
  return (
    <div style={{ background: "#000B1A", color: "#fff", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section style={{ 
        background: "linear-gradient(to bottom, #001A3D, #000B1A)", 
        padding: "180px 0 60px",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ 
            display: "inline-flex", 
            background: "rgba(0,141,77,0.1)", 
            color: "var(--color-primary-light)",
            padding: "8px 16px", 
            borderRadius: "4px", 
            marginBottom: "24px", 
            fontSize: "0.75rem", 
            fontWeight: 800, 
            letterSpacing: "2px" 
          }}>
            QUÉ HACEMOS
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px", letterSpacing: "-1.5px" }}>Nuestros Programas</h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            Desarrollamos una metodología integral de intervención social y deportiva a través de la formación, la competencia y el intercambio global.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section" style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
            {programs.map((prog, index) => {
              const Icon = prog.icon;
              return (
                <FadeIn key={index} delay={index * 0.1}>
                  <div style={{
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    transition: "all 0.3s"
                  }} className="group hover:bg-white/5 hover:border-white/10 hover:-translate-y-2 hover:shadow-2xl">
                    <div style={{ 
                      background: `linear-gradient(135deg, ${prog.color}22 0%, transparent 100%)`,
                      padding: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: prog.color,
                      borderBottom: `2px solid ${prog.color}44`
                    }}>
                      <Icon size={70} strokeWidth={1} />
                    </div>
                    <div style={{ padding: "40px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff", marginBottom: "16px", lineHeight: 1.1 }}>
                        {prog.title}
                      </h2>
                      <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6, flexGrow: 1, marginBottom: "30px", fontSize: "1.05rem" }}>
                        {prog.description}
                      </p>
                      <Link href={prog.href} style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px 24px",
                        borderRadius: "4px",
                        background: "rgba(255,255,255,0.05)",
                        color: "#fff",
                        fontWeight: 700,
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        transition: "all 0.2s"
                      }} className="hover:bg-primary-light">
                        CONOCER MÁS <ChevronRight size={18} />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section" style={{ padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ background: "rgba(0,141,77,0.05)", padding: "60px", borderRadius: "24px", border: "1px solid rgba(0,141,77,0.1)" }}>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, marginBottom: "20px", letterSpacing: "-1px" }}>
              ¿QUERÉS INSCRIBIR A TU INSTITUCIÓN?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "600px", margin: "0 auto 40px", fontSize: "1.1rem" }}>
              Registrá a tu equipo en la Liga BA o la Liga Nacional de manera 100% online a través de nuestro portal oficial.
            </p>
            <Link href="/inscripcion" className="btn btn-lg" style={{ 
              background: "var(--color-primary-light)", 
              color: "#fff",
              fontWeight: 800,
              padding: "18px 40px"
            }}>
              IR AL PORTAL DE INSCRIPCIÓN
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
