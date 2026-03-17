import { Users, UserCircle } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Comisión Directiva - Premium Experience",
  description: "Conocé al equipo humano que lidera la Asociación Civil Andar.",
};

const boardMembers = [
  { name: "Juan Ramón Fiasche", role: "Presidente" },
  { name: "Martín Petrelli", role: "Vicepresidente" },
  { name: "Raúl Lucero", role: "Secretario" },
];

export default function Comision() {
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
            LIDERAZGO
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px" }}>Comisión Directiva</h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            El equipo humano que lidera la Asociación Civil Andar con compromiso y profesionalismo.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ padding: "80px 0" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          
          <div style={{ 
             fontSize: "1.2rem", 
             color: "rgba(255,255,255,0.5)", 
             lineHeight: 1.7,
             textAlign: "center",
             marginBottom: "80px",
             maxWidth: "800px",
             margin: "0 auto 80px"
          }}>
             <p>Nuestro equipo está compuesto por profesionales, familias, y voluntarios comprometidos con los derechos de las personas con discapacidad. Creemos firmemente en el poder transformador de la comunidad trabajando por un objetivo común: <strong>Una sociedad para todos.</strong></p>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: "32px" 
          }}>
            {boardMembers.map((member, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div style={{ 
                  background: "rgba(255,255,255,0.03)", 
                  padding: "40px", 
                  borderRadius: "20px", 
                  textAlign: "center", 
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.3s"
                }} className="hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl">
                    <div style={{ 
                      width: "100px", 
                      height: "100px", 
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px"
                    }}>
                      <UserCircle size={60} color="var(--color-primary-light)" opacity={0.5} />
                    </div>
                    <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>{member.name}</h3>
                    <span style={{ 
                      display: "inline-block", 
                      padding: "6px 16px", 
                      background: "rgba(0,141,77,0.1)", 
                      color: "var(--color-primary-light)", 
                      fontWeight: 800, 
                      borderRadius: "100px", 
                      fontSize: "0.75rem",
                      letterSpacing: "1px"
                    }}>
                      {member.role}
                    </span>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
