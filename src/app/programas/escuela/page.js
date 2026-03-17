import { GraduationCap, MapPin, Users, Target, BookOpen, ChevronRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "EFI - Premium Experience",
  description: "Propuesta deportiva formativa de la Asociación Civil Andar para niños y jóvenes.",
};

export default function Escuela() {
  return (
    <div style={{ background: "#000B1A", color: "#fff", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section style={{ 
        background: "linear-gradient(to bottom, #001A3D, #000B1A)", 
        padding: "100px 0 60px",
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
            FORMACIÓN INTEGRAL
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px", letterSpacing: "-1.5px" }}>Escuela de Fútbol Inclusivo</h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            Formando valores a través de la metodología Fútbol 3 y Fútbol Inclusivo para niños y jóvenes.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ padding: "80px 0" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          
          <div style={{ display: "grid", gap: "80px" }}>
            
            <FadeIn>
              <div style={{ background: "rgba(255,255,255,0.02)", padding: "50px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--color-primary-light)", marginBottom: "30px", textTransform: "uppercase", letterSpacing: "-1px" }}>
                  <BookOpen size={28} style={{ display: "inline-block", marginRight: "10px", verticalAlign: "middle" }} /> FUNDAMENTACIÓN
                </h2>
                <div style={{ display: "grid", gap: "24px", fontSize: "1.1rem", lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}>
                  <p>Involucramos a la comunidad en la habilitación de espacios acordes a prácticas deportivas de calidad, enfrentando la falta de oportunidades para el desarrollo inclusivo.</p>
                  <p>Trabajamos con niños y niñas provenientes de comunidades vulnerables de Moreno, utilizando lenguaje de señas y adaptaciones pedagógicas para garantizar que todos comprendan y disfruten del juego.</p>
                  <div style={{ background: "rgba(255,255,255,0.03)", padding: "30px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h4 style={{ color: "#fff", fontWeight: 800, marginBottom: "15px" }}>OBJETIVOS CENTRALES</h4>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "10px" }}>
                      <li style={{ display: "flex", gap: "12px" }}>
                        <Target size={20} color="var(--color-primary-light)" />
                        <span>Potenciar los talentos de personas con y sin discapacidad entre 6 y 18 años.</span>
                      </li>
                      <li style={{ display: "flex", gap: "12px" }}>
                        <Target size={20} color="var(--color-primary-light)" />
                        <span>Respetar la diversidad como potencial humano en cada entrenamiento.</span>
                      </li>
                      <li style={{ display: "flex", gap: "12px" }}>
                        <Target size={20} color="var(--color-primary-light)" />
                        <span>Generar espacios abiertos con los apoyos necesarios para una inclusión real.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div>
                <h2 style={{ fontSize: "2.2rem", fontWeight: 900, marginBottom: "40px", textAlign: "center", textTransform: "uppercase" }}>LA METODOLOGÍA DEL JUEGO</h2>
                <div style={{ display: "grid", gap: "24px" }}>
                  <div style={{ background: "rgba(41,128,185,0.05)", border: "1px solid rgba(41,128,185,0.1)", padding: "40px", borderRadius: "16px" }}>
                    <h3 style={{ color: "#2980B9", fontSize: "1.5rem", fontWeight: 900, marginBottom: "15px" }}>LOS ACUERDOS</h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>Promovemos la autodeterminación y la construcción de relaciones sociales positivas. Es el momento de escuchar y empatizar antes de entrar a la cancha.</p>
                  </div>
                  <div style={{ background: "rgba(230,126,34,0.05)", border: "1px solid rgba(230,126,34,0.1)", padding: "40px", borderRadius: "16px" }}>
                    <h3 style={{ color: "#E67E22", fontSize: "1.5rem", fontWeight: 900, marginBottom: "15px" }}>EL PARTIDO</h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>Ponemos a prueba habilidades y liberamos endorfinas. Desafiamos la mejora diaria en lo deportivo y en hábitos saludables de vida.</p>
                  </div>
                  <div style={{ background: "rgba(0,141,77,0.05)", border: "1px solid rgba(0,141,77,0.1)", padding: "40px", borderRadius: "16px" }}>
                    <h3 style={{ color: "var(--color-primary-light)", fontSize: "1.5rem", fontWeight: 900, marginBottom: "15px" }}>LA REFLEXIÓN</h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>Transformamos experiencias en aprendizaje. Un espacio donde todos son iguales y cada opinión es escuchada y respetada.</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: 900, marginBottom: "24px", color: "var(--color-primary-light)" }}>DATOS DE INTERÉS</h3>
                  <div style={{ display: "grid", gap: "20px", color: "rgba(255,255,255,0.5)" }}>
                    <div>
                      <strong style={{ color: "#fff", display: "block", marginBottom: "5px" }}>UBICACIÓN:</strong>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <MapPin size={18} color="var(--color-primary-light)" />
                        <span>Las Leñas Club, Bartolomé Mitre y Remedios de Escalada, Moreno.</span>
                      </div>
                    </div>
                    <div>
                      <strong style={{ color: "#fff", display: "block", marginBottom: "5px" }}>HORARIOS:</strong>
                      <span>Martes y Jueves (Turnos Mañana y Tarde).</span>
                    </div>
                    <div>
                      <strong style={{ color: "#fff", display: "block", marginBottom: "5px" }}>PARTICIPACIÓN:</strong>
                      <span>Niños/as de 6 a 18 años con y sin discapacidad.</span>
                    </div>
                  </div>
                </div>
                <div>
                   <h3 style={{ fontSize: "1.6rem", fontWeight: 900, marginBottom: "24px", color: "#E67E22" }}>ESCUELAS QUE PARTICIPAN</h3>
                   <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                     {["Escuela 501", "Escuela 502", "Escuela 503", "Escuela 504", "Escuela 506", "C.F.L. N°1"].map(esc => (
                       <li key={esc} style={{ display: "flex", gap: "10px", alignItems: "center", color: "rgba(255,255,255,0.6)" }}>
                         <div style={{ width: "6px", height: "6px", background: "#E67E22", borderRadius: "50%" }}></div>
                         {esc}
                       </li>
                     ))}
                   </ul>
                </div>
              </div>
            </FadeIn>

          </div>

        </div>
      </section>

    </div>
  );
}
