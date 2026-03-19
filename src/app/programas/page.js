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
    description: "Proyecto formativo para niños y jóvenes de 6 a 18 años de comunidades vulnerables. Desarrolla habilidades sociales, hábitos saludables y autoestima a través de la metodología Fútbol 3 en instalaciones adaptadas y accesibles.",
    href: "/programas/escuela",
    icon: GraduationCap,
    color: "var(--color-primary-light)",
    stats: {
      edad: "6-18 años",
      participantes: "200+ niños",
      ubicacion: "Moreno, Buenos Aires",
      caracteristicas: ["Espacio inclusivo", "Desarrollo integral", "Comunidad vulnerable"]
    }
  },
  {
    title: "Liga de Fútbol Inclusiva BA",
    description: "El torneo más importante de la Provincia de Buenos Aires con sistema de testeo de habilidades equitativo. Más de 20 zonas de competencia incluyendo categorías masculinas y femeninas.",
    href: "/programas/liga-ba",
    icon: Trophy,
    color: "#E67E22",
    stats: {
      equipos: "100+ equipos",
      zonas: "20+ zonas",
      categorias: "Masculina/Femenina",
      caracteristicas: ["Testeo equitativo", "Finales en AFA", "Sistema integrado"]
    }
  },
  {
    title: "Liga Nacional",
    description: "Réplica del modelo en diferentes provincias de Argentina, conformando una red federal única. Expansión del metodología inclusiva a nivel nacional.",
    href: "/programas/liga-nacional",
    icon: Trophy,
    color: "#2980B9",
    stats: {
      provincias: "8+ provincias",
      crecimiento: "En expansión",
      modelo: "Replica federal",
      caracteristicas: ["Red federal", "Modelo replicable", "Impacto nacional"]
    }
  },
  {
    title: "Festival LATAM de Fútbol 3",
    description: "Encuentro internacional que impulsa el desarrollo juvenil. 140+ jóvenes de 10 países participan, con ejes en empoderamiento juvenil, igualdad de género e inclusión social.",
    href: "/programas/festival-latam",
    icon: Globe,
    color: "#8E44AD",
    stats: {
      paises: "10 países",
      participantes: "140+ jóvenes",
      organizaciones: "16 organizaciones",
      caracteristicas: ["Impacto internacional", "Empoderamiento juvenil", "Igualdad de género"]
    }
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "40px" }}>
            {programs.map((prog, index) => {
              const Icon = prog.icon;
              return (
                <FadeIn key={index} delay={index * 0.1}>
                  <div style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                    borderRadius: "24px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative"
                  }} className="group hover:bg-white/8 hover:border-white/15 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                    {/* Gradient overlay */}
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: `linear-gradient(90deg, ${prog.color}, ${prog.color}88, ${prog.color})`
                    }} />
                    
                    {/* Icon Section */}
                    <div style={{ 
                      background: `linear-gradient(135deg, ${prog.color}15 0%, transparent 100%)`,
                      padding: "50px 40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: prog.color,
                      borderBottom: `1px solid ${prog.color}20`,
                      position: "relative"
                    }}>
                      {/* Animated background pattern */}
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0.1,
                        backgroundImage: `radial-gradient(circle at 20% 20%, ${prog.color} 8%, transparent 8%), radial-gradient(circle at 80% 80%, ${prog.color} 8%, transparent 8%)`,
                        backgroundSize: "30px 30px"
                      }} />
                      <div style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "20px",
                        background: `linear-gradient(135deg, ${prog.color}20, ${prog.color}10)`,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: `2px solid ${prog.color}30`,
                        position: "relative",
                        zIndex: 1
                      }} className="group-hover:scale-110 transition-transform duration-300">
                        <Icon size={50} strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div style={{ padding: "40px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#fff", marginBottom: "16px", lineHeight: 1.2 }}>
                        {prog.title}
                      </h2>
                      <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, flexGrow: 1, marginBottom: "30px", fontSize: "1rem" }}>
                        {prog.description}
                      </p>
                      
                      {/* Stats */}
                      <div style={{ marginBottom: "30px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "20px" }}>
                          {Object.entries(prog.stats).slice(0, 4).map(([key, value]) => (
                            <div key={key} style={{
                              background: "rgba(255,255,255,0.03)",
                              padding: "12px",
                              borderRadius: "12px",
                              border: "1px solid rgba(255,255,255,0.05)"
                            }}>
                              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
                                {key === "edad" ? "EDAD" : key === "participantes" ? "PARTICIPANTES" : key === "ubicacion" ? "UBICACIÓN" : key === "equipos" ? "EQUIPOS" : key === "zonas" ? "ZONAS" : key === "categorias" ? "CATEGORÍAS" : key === "provincias" ? "PROVINCIAS" : key === "crecimiento" ? "CRECIMIENTO" : key === "modelo" ? "MODELO" : key === "paises" ? "PAÍSES" : key === "organizaciones" ? "ORGANIZACIONES" : key.toUpperCase()}
                              </div>
                              <div style={{ fontSize: "1rem", fontWeight: 700, color: prog.color }}>
                                {value}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Features */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          {prog.stats.caracteristicas.map((feature, idx) => (
                            <span key={idx} style={{
                              background: `${prog.color}15`,
                              color: prog.color,
                              padding: "6px 12px",
                              borderRadius: "20px",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              border: `1px solid ${prog.color}30`
                            }}>
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <Link href={prog.href} style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        padding: "16px 32px",
                        borderRadius: "12px",
                        background: `linear-gradient(135deg, ${prog.color}, ${prog.color}CC)`,
                        color: "#fff",
                        fontWeight: 800,
                        textDecoration: "none",
                        fontSize: "0.95rem",
                        transition: "all 0.3s",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        border: `2px solid ${prog.color}40`
                      }} className="hover:shadow-lg hover:-translate-y-1 hover:scale-105">
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
