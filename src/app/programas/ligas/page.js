import Link from "next/link";
import { ArrowRight, BookOpen, Trophy, Globe, GraduationCap, ChevronRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Image from "next/image";

export const metadata = {
  title: "Ligas - Premium Experience",
  description: "Conocé todas las ligas y torneos de Fútbol Inclusivo: Liga BA, Super Liga AFA y Liga Nacional.",
};

const programs = [
  {
    title: "Liga de Fútbol Inclusiva BA",
    description: "El torneo más importante de la Provincia de Buenos Aires con sistema de testeo de habilidades equitativo. Más de 20 zonas de competencia incluyendo categorías masculinas y femeninas. Desde 1998, en la ciudad de Moreno, trabajamos valores y equiparamos oportunidades, construyendo una sociedad más inclusiva a través del deporte.",
    href: "/programas/liga-ba",
    icon: Trophy,
    color: "#E67E22",
    image: "https://futbolinclusivo.org.ar/app/uploads/2017/12/Liga-d-1.jpg",
    stats: {
      equipos: "100+ equipos",
      zonas: "20+ zonas",
      categorias: "Masculina/Femenina",
      caracteristicas: ["Testeo equitativo", "Finales en AFA", "Sistema integrado", "Desde 1998"]
    },
    highlights: [
      "Finales en instalaciones de AFA",
      "Sistema de testeo único",
      "Categorías masculina y femenina",
      "Más de 20 zonas de competencia"
    ]
  },
  {
    title: "Super Liga AFA",
    description: "La máxima categoría de competición de fútbol inclusivo en Argentina. Organizada en alianza de cooperación con la Asociación del Fútbol Argentino (AFA) y el Sindicato Argentino de Televisión (SAT). Reúne a los planteles más destacados y competitivos del país, quienes disputan cada fecha en las canchas de césped natural de primer nivel dentro del mítico Predio Lionel Andrés Messi en Ezeiza.",
    href: "/programas/liga-nacional",
    icon: Trophy,
    color: "#6B1026",
    isAfa: true,
    image: "https://futbolinclusivo.org.ar/app/uploads/2018/12/MG_0325.jpg",
    stats: {
      sede: "Predio AFA Ezeiza",
      coordinacion: "AFA / SAT",
      categorias: "Nivel de Élite",
      caracteristicas: ["Predio AFA Ezeiza", "Competencia Élite", "Alianza AFA/SAT", "Desde 2015"]
    },
    highlights: [
      "Predio Lionel Andrés Messi",
      "Organización conjunta AFA y SAT",
      "Categoría competitiva de élite",
      "Césped natural profesional"
    ]
  },
  {
    title: "Liga Nacional",
    description: "Réplica del modelo en diferentes provincias de Argentina, conformando una red federal única. La Liga de Fútbol Inclusiva ha extendido sus fronteras y se replica en distintos puntos del país gracias al trabajo en conjunto con organizaciones y entidades que promueven el desarrollo del fútbol como herramienta de inclusión social.",
    href: "/programas/liga-nacional",
    icon: Trophy,
    color: "#2980B9",
    image: "https://futbolinclusivo.org.ar/app/uploads/2018/03/liga-nacional-b.jpg",
    stats: {
      provincias: "6 sedes activas",
      crecimiento: "En expansión",
      modelo: "Replica federal",
      caracteristicas: ["Red federal", "Modelo replicable", "Impacto nacional", "Organizaciones locales"]
    },
    highlights: [
      "Liga Tucumana - Fundación Valores Especiales",
      "Liga Mendocina - Municipalidad San Rafael",
      "Liga del Alto Valle - Escuela Cipolletti",
      "Liga Jujeña - Fundación Valencia",
      "Liga de Santa Fe - CEF N°49 Rosario",
      "Liga Quilmes - Municipalidad Quilmes"
    ]
  }
];

export default function LigasPage() {
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
            COMPETENCIAS
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px", letterSpacing: "-1.5px" }}>Nuestras Ligas</h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            Desarrollamos torneos sistemáticos que promueven la inclusión y el desarrollo a través de la competencia equitativa y el intercambio global.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section" style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "50px" }}>
            {programs.map((prog, index) => {
              const Icon = prog.icon;
              const cardBg = prog.isAfa 
                ? "linear-gradient(135deg, rgba(107, 16, 38, 0.18) 0%, rgba(43, 5, 13, 0.18) 100%)" 
                : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)";
              const cardBorder = prog.isAfa 
                ? "2px solid rgba(117, 170, 219, 0.4)" 
                : "1px solid rgba(255,255,255,0.10)";
              const cardShadow = prog.isAfa
                ? "0 0 50px rgba(117, 170, 219, 0.2)"
                : "none";

              return (
                <FadeIn key={index} delay={index * 0.1}>
                  <div style={{
                    background: cardBg,
                    borderRadius: "28px",
                    overflow: "hidden",
                    border: cardBorder,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    boxShadow: cardShadow
                  }} className={
                    prog.isAfa 
                      ? "group hover:bg-gradient-to-br hover:from-[#6B1026]/30 hover:to-[#2B050D]/30 hover:border-[#75AADB]/60 hover:-translate-y-4 hover:shadow-[0_25px_70px_rgba(117,170,219,0.35)]"
                      : "group hover:bg-white/8 hover:border-white/20 hover:-translate-y-4 hover:shadow-[0_25px_70px_rgba(0,0,0,0.4)]"
                  }>
                    {/* Gradient overlay */}
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "5px",
                      background: `linear-gradient(90deg, ${prog.color}, ${prog.color}88, ${prog.color})`
                    }} />
                    
                    {/* Icon Section */}
                    <div style={{ 
                      background: `linear-gradient(135deg, ${prog.color}20 0%, transparent 100%)`,
                      padding: "60px 40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: prog.color,
                      borderBottom: `1px solid ${prog.color}25`,
                      position: "relative"
                    }}>
                      {/* Animated background pattern */}
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0.15,
                        backgroundImage: `radial-gradient(circle at 25% 25%, ${prog.color} 10%, transparent 10%), radial-gradient(circle at 75% 75%, ${prog.color} 10%, transparent 10%), radial-gradient(circle at 50% 10%, ${prog.color} 6%, transparent 6%)`,
                        backgroundSize: "40px 40px"
                      }} />
                      {prog.isAfa ? (
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          position: "relative",
                          zIndex: 1,
                        }} className="group-hover:scale-110 transition-transform duration-400">
                          <div style={{
                            width: "75px",
                            height: "75px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.08)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "2px solid rgba(255,255,255,0.2)",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                          }}>
                            <Image src="/logo-afa.png" alt="AFA" width={56} height={56} style={{ objectFit: "contain" }} />
                          </div>
                          <div style={{
                            width: "85px",
                            height: "85px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.4))"
                          }}>
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Afa_gold_logo24.svg" alt="AFA" width={75} height={75} style={{ objectFit: "contain" }} />
                          </div>
                        </div>
                      ) : (
                        <div style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "24px",
                          background: `linear-gradient(135deg, ${prog.color}25, ${prog.color}15)`,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: `3px solid ${prog.color}40`,
                          position: "relative",
                          zIndex: 1,
                          boxShadow: `0 10px 30px ${prog.color}30`
                        }} className="group-hover:scale-110 transition-transform duration-400">
                          <Icon size={60} strokeWidth={1.5} />
                        </div>
                      )}
                    </div>
                    
                    {/* Content Section */}
                    <div style={{ padding: "45px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      {/* Image Section */}
                      <div style={{ 
                        position: "relative", 
                        width: "100%", 
                        height: "200px", 
                        borderRadius: "16px", 
                        overflow: "hidden", 
                        marginBottom: "30px",
                        border: `1px solid ${prog.color}30`
                      }}>
                        <Image 
                          src={prog.image} 
                          alt={prog.title}
                          fill
                          style={{ objectFit: "cover", opacity: 0.9 }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div style={{
                          position: "absolute",
                          inset: 0,
                          background: `linear-gradient(to bottom, transparent 0%, ${prog.color}20 100%)`
                        }} />
                      </div>
                      
                      <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", marginBottom: "20px", lineHeight: 1.2 }}>
                        {prog.title}
                      </h2>
                      <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, flexGrow: 1, marginBottom: "35px", fontSize: "1.05rem" }}>
                        {prog.description}
                      </p>
                      
                      {/* Stats */}
                      <div style={{ marginBottom: "35px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px", marginBottom: "25px" }}>
                          {Object.entries(prog.stats).slice(0, 4).map(([key, value]) => (
                            <div key={key} style={{
                              background: "rgba(255,255,255,0.04)",
                              padding: "15px",
                              borderRadius: "16px",
                              border: "1px solid rgba(255,255,255,0.08)",
                              transition: "all 0.3s"
                            }} className="hover:bg-white/8 hover:border-white/15">
                              <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "6px", fontWeight: 700 }}>
                                {key === "equipos" ? "EQUIPOS" : key === "zonas" ? "ZONAS" : key === "categorias" ? "CATEGORÍAS" : key === "provincias" ? "SEDES" : key === "crecimiento" ? "CRECIMIENTO" : key === "modelo" ? "MODELO" : key === "paises" ? "PAÍSES" : key === "organizaciones" ? "ORGANIZACIONES" : key === "sede" ? "SEDE PRINCIPAL" : key === "coordinacion" ? "COORDINACIÓN" : key.toUpperCase()}
                              </div>
                              <div style={{ fontSize: "1.1rem", fontWeight: 800, color: prog.color }}>
                                {Array.isArray(value) ? value.join(", ") : value}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Features */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "25px" }}>
                          {prog.stats.caracteristicas.map((feature, idx) => (
                            <span key={idx} style={{
                              background: `${prog.color}20`,
                              color: prog.color,
                              padding: "8px 16px",
                              borderRadius: "25px",
                              fontSize: "0.8rem",
                              fontWeight: 700,
                              border: `1px solid ${prog.color}40`,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px"
                            }}>
                              {feature}
                            </span>
                          ))}
                        </div>
                        
                        {/* Highlights */}
                        {prog.highlights && (
                          <div style={{
                            background: "rgba(255,255,255,0.02)",
                            padding: "20px",
                            borderRadius: "16px",
                            border: "1px solid rgba(255,255,255,0.05)"
                          }}>
                            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "12px", fontWeight: 700 }}>
                              DESTACADOS
                            </div>
                            <div style={{ display: "grid", gap: "10px" }}>
                              {prog.highlights.slice(0, 3).map((highlight, idx) => (
                                <div key={idx} style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  color: "rgba(255,255,255,0.7)",
                                  fontSize: "0.9rem"
                                }}>
                                  <div style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: prog.color,
                                    flexShrink: 0
                                  }} />
                                  {highlight}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Link href={prog.href} style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                        padding: "18px 36px",
                        borderRadius: "16px",
                        background: `linear-gradient(135deg, ${prog.color}, ${prog.color}CC)`,
                        color: "#fff",
                        fontWeight: 800,
                        textDecoration: "none",
                        fontSize: "1rem",
                        transition: "all 0.3s",
                        textTransform: "uppercase",
                        letterSpacing: "0.8px",
                        border: `2px solid ${prog.color}50`,
                        boxShadow: `0 8px 25px ${prog.color}40`
                      }} className="hover:shadow-xl hover:-translate-y-2 hover:scale-105">
                        CONOCER MÁS <ChevronRight size={20} />
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
