import { Users, BookOpen, Wrench, CalendarCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Voluntariado - Fútbol Inclusivo",
  description: "Sumá tu tiempo y conocimientos al movimiento de Fútbol Inclusivo.",
};

export default function VoluntariadoPage() {
  return (
    <div className="page-container">
      <section style={{ background: "var(--color-primary-dark)", color: "#fff", padding: "64px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.1)", padding: "8px 16px", borderRadius: "100px", marginBottom: "16px", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "1px" }}>
            SUMATE
          </div>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "24px" }}>Voluntariado y Pasantías</h1>
          <p style={{ fontSize: "1.2rem", opacity: 0.9, maxWidth: "800px", margin: "0 auto" }}>
            Un espacio donde podés aportar tu tiempo, habilidades y energía para construir una sociedad más justa e inclusiva.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: "80px 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          
          <div>
            <h2 style={{ fontSize: "2.5rem", color: "var(--color-primary-dark)", marginBottom: "24px" }}>
              Perfiles de Voluntariado
            </h2>
            <p style={{ color: "#555", lineHeight: 1.6, marginBottom: "32px", fontSize: "1.1rem" }}>
              No hace falta ser experto en fútbol ni en discapacidad. ¡Hacen falta ganas de comprometerse! Tenemos distintas áreas donde tu participación hará una gran diferencia.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ background: "rgba(0,122,61,0.1)", color: "var(--color-primary)", padding: "12px", borderRadius: "12px" }}>
                  <CalendarCheck size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", color: "var(--color-primary-dark)", marginBottom: "8px" }}>Eventos y Logística</h3>
                  <p style={{ color: "#666", lineHeight: 1.5 }}>Acompañamiento en las fechas de la Liga BA, asistencia en la organización, hidratación, recepción de delegaciones y mediación en la cancha.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ background: "rgba(2,132,199,0.1)", color: "var(--color-accent-blue)", padding: "12px", borderRadius: "12px" }}>
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", color: "var(--color-primary-dark)", marginBottom: "8px" }}>Apoyo Educativo</h3>
                  <p style={{ color: "#666", lineHeight: 1.5 }}>Acompañar a los jugadores en los talleres extra-curriculares y escuela deportiva semanal.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ background: "rgba(234,88,12,0.1)", color: "var(--color-accent-orange)", padding: "12px", borderRadius: "12px" }}>
                  <Wrench size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", color: "var(--color-primary-dark)", marginBottom: "8px" }}>Voluntariado Profesional</h3>
                  <p style={{ color: "#666", lineHeight: 1.5 }}>Aporte desde tu campo de especialización: diseño, comunicación, fotografía, administración, medicina, psicología, etc.</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: "#f8f9fa", padding: "40px", borderRadius: "16px", border: "1px solid #eee", boxShadow: "var(--shadow-lg)" }}>
            <h3 style={{ fontSize: "1.8rem", color: "var(--color-primary-dark)", marginBottom: "24px", textAlign: "center" }}>Postulate ahora</h3>
            <form className="form-group" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label className="form-label form-label-required">Nombre y Apellido</label>
                <input type="text" className="form-input" required />
              </div>
              <div>
                <label className="form-label form-label-required">Correo Electrónico</label>
                <input type="email" className="form-input" required />
              </div>
              <div>
                <label className="form-label form-label-required">Área de Interés</label>
                <select className="form-input" required>
                  <option value="">Seleccioná una opción...</option>
                  <option value="logistica">Logística y Eventos</option>
                  <option value="educativo">Apoyo Educativo / Cancha</option>
                  <option value="profesional">Habilidades Profesionales</option>
                </select>
              </div>
              <div>
                <label className="form-label">Contanos por qué querés sumarte</label>
                <textarea className="form-input" rows="4"></textarea>
              </div>
              <button type="button" className="btn btn-primary btn-lg" style={{ marginTop: "16px", width: "100%", justifyContent: "center" }}>
                Enviar Postulación
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
