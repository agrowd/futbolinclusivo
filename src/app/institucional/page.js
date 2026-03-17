import Link from "next/link";
import { Users, History, Target, Heart, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Institucional - Premium",
  description: "Conocé la historia, misión y objetivos de la Asociación Civil Andar y la Liga de Fútbol Inclusiva.",
};

export default function InstitucionalPage() {
  return (
    <div style={{ background: "#000B1A", color: "#fff", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section style={{ 
        background: "linear-gradient(to bottom, #001A3D, #000B1A)", 
        padding: "180px 0 100px",
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
            LA ASOCIACIÓN
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px" }}>Institucional</h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            Impulsamos el desarrollo integral de las personas con discapacidad, sus familias y la comunidad, promoviendo espacios deportivos y participación ciudadana.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: "100px 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-20 items-start">
            
            <div>
              <h2 style={{ fontSize: "2.8rem", fontWeight: 900, marginBottom: "32px", lineHeight: 1.1, letterSpacing: "-1px" }}>
                MÁS DE 25 AÑOS <br/>
                <span style={{ color: "var(--color-primary-light)" }}>CONSTRUYENDO INCLUSIÓN.</span>
              </h2>
              <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "48px" }}>
                La Asociación Civil Andar nace de la convicción de que todas las personas tienen un enorme potencial. A través de la Liga de Fútbol Inclusiva, hemos logrado que miles de jóvenes encuentren en el deporte una herramienta para el desarrollo y la autonomía.
              </p>
              
              <div style={{ display: "grid", gap: "32px" }}>
                <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", background: "rgba(255,255,255,0.02)", padding: "30px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ background: "rgba(230,126,34,0.1)", color: "#E67E22", padding: "12px", borderRadius: "8px" }}>
                    <Target size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "10px" }}>Nuestra Misión</h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>Generar oportunidades innovadoras para potenciar el desarrollo creativo de personas con discapacidad, mejorando su calidad de vida.</p>
                  </div>
                </div>
                
                <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", background: "rgba(255,255,255,0.02)", padding: "30px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ background: "rgba(41,128,185,0.1)", color: "#2980B9", padding: "12px", borderRadius: "8px" }}>
                    <Heart size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "10px" }}>Nuestra Visión</h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>Una sociedad que brinde igualdad de oportunidades a todas las personas, independientemente de sus características individuales.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Nav Cards */}
            <div style={{ display: "grid", gap: "24px" }}>
              <Link href="/institucional/nosotros" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "32px",
                borderRadius: "16px",
                textDecoration: "none",
                display: "block",
                transition: "all 0.3s"
              }} className="side-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <History size={32} color="var(--color-primary-light)" />
                  <ArrowRight size={20} color="rgba(255,255,255,0.2)" />
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>Nuestra Historia</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem" }}>Recorré los hitos que marcaron el nacimiento y la expansión desde 1998.</p>
              </Link>

              <Link href="/institucional/comision" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "32px",
                borderRadius: "16px",
                textDecoration: "none",
                display: "block",
                transition: "all 0.3s"
              }} className="side-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <Users size={32} color="#E67E22" />
                  <ArrowRight size={20} color="rgba(255,255,255,0.2)" />
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>Comisión Directiva</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem" }}>Conocé al equipo humano de profesionales y voluntarios que lidera Andar.</p>
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
