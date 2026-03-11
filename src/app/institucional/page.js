import Link from "next/link";
import { Users, History, Target, Heart, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Institucional - Fútbol Inclusivo",
  description: "Conocé la historia, misión y objetivos de la Asociación Civil Andar y la Liga de Fútbol Inclusiva.",
};

export default function InstitucionalPage() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section style={{ background: "var(--color-primary-dark)", color: "#fff", padding: "64px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "24px" }}>La Asociación</h1>
          <p style={{ fontSize: "1.2rem", opacity: 0.9, maxWidth: "800px", margin: "0 auto" }}>
            Impulsamos el desarrollo integral de las personas con discapacidad, sus familias y la comunidad, promoviendo espacios deportivos, formativos de trabajo y participación ciudadana.
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="section" style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "2.5rem", color: "var(--color-primary-dark)", marginBottom: "24px", lineHeight: 1.2 }}>
                Más de 25 años construyendo inclusión
              </h2>
              <p style={{ fontSize: "1.1rem", color: "#555", lineHeight: 1.6, marginBottom: "32px" }}>
                La Asociación Civil Andar nace de la convicción de que todas las personas tienen un enorme potencial. A través de la Liga de Fútbol Inclusiva, hemos logrado que miles de jóvenes encuentren en el deporte una herramienta para el desarrollo, la autonomía y la inserción social.
              </p>
              
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                <li style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ background: "var(--color-accent-orange)", color: "#fff", padding: "8px", borderRadius: "50%" }}>
                    <Target size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: "8px", color: "var(--color-primary-dark)" }}>Misión</h3>
                    <p style={{ color: "#666", lineHeight: 1.5 }}>Generar oportunidades innovadoras para potenciar el desarrollo creativo de personas con discapacidad, mejorando su calidad de vida y afianzando sus vínculos.</p>
                  </div>
                </li>
                <li style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ background: "var(--color-accent-blue)", color: "#fff", padding: "8px", borderRadius: "50%" }}>
                    <Heart size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: "8px", color: "var(--color-primary-dark)" }}>Visión</h3>
                    <p style={{ color: "#666", lineHeight: 1.5 }}>Una sociedad que brinde igualdad de oportunidades a todas las personas, independientemente de sus características individuales.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div style={{ display: "grid", gap: "24px" }}>
              <Link href="/institucional/nosotros" className="institucional-card" style={{
                background: "#f8f9fa",
                border: "1px solid #eee",
                padding: "32px",
                borderRadius: "16px",
                textDecoration: "none",
                color: "inherit",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <History size={32} style={{ color: "var(--color-primary)" }} />
                  <ArrowRight size={24} style={{ color: "#aaa" }} />
                </div>
                <h3 style={{ fontSize: "1.5rem", color: "var(--color-primary-dark)", marginBottom: "8px" }}>Nuestra Historia</h3>
                <p style={{ color: "#666" }}>Recorré los hitos que marcaron el nacimiento y la expansión del Fútbol Inclusivo desde 1998.</p>
              </Link>

              <Link href="/institucional/comision" className="institucional-card" style={{
                background: "#f8f9fa",
                border: "1px solid #eee",
                padding: "32px",
                borderRadius: "16px",
                textDecoration: "none",
                color: "inherit",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <Users size={32} style={{ color: "var(--color-accent-orange)" }} />
                  <ArrowRight size={24} style={{ color: "#aaa" }} />
                </div>
                <h3 style={{ fontSize: "1.5rem", color: "var(--color-primary-dark)", marginBottom: "8px" }}>Comisión Directiva</h3>
                <p style={{ color: "#666" }}>Conocé al equipo humano de profesionales y voluntarios que lidera la Asociación Civil Andar.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
