import { Trophy, Calendar, CheckSquare, FileText, Medal, Info, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Liga BA - Premium Experience",
  description: "El torneo más grande de la Provincia de Buenos Aires para personas con y sin discapacidad.",
};

const statsZones = [
  { name: "Zona A", winner: "C.E.F. 123 A", runnerUp: "CEDIMA", semifinalists: ["ANDAR A", "P.D.I. LOS PIBES DEL DEFE"] },
  { name: "Zona B", winner: "NOSOTROS TAMBIÉN B", runnerUp: "QUILMES B", semifinalists: ["CEDIMA LOS PUMAS", "MERLO B"] },
  { name: "Zona C", winner: "P.D.I. HALCONES", runnerUp: "P.D.I. EL CHAPE", semifinalists: ["ANDAR C", "SORIANI C"] },
  { name: "Zona D", winner: "EL FUTURO", runnerUp: "SANTA CLARA", semifinalists: ["GRAL. RODRIGUEZ", "ACOMPAÑANDO"] },
  { name: "Zona E", winner: "PERTENECER E2", runnerUp: "CILSA E1", semifinalists: ["4 FANTASTICOS", "DRAGONES E1"] },
  { name: "Zona F", winner: "SORIANI F2", runnerUp: "VARELA F1", semifinalists: ["HALCONES", "AMIGOS F2"] },
];

export default function LigaBA() {
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
            LIGA BUENOS AIRES
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px", letterSpacing: "-1.5px" }}>Liga de Fútbol Inclusiva BA</h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            Creando valores a través del deporte sistemático. El torneo más grande de la provincia.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ padding: "80px 0" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          
          <div style={{ display: "grid", gap: "60px" }}>
            
            <FadeIn>
              <div style={{ background: "rgba(255,255,255,0.02)", padding: "40px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--color-primary-light)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "15px" }}>
                  <Info size={24} /> INSTITUCIONAL E HISTORIA
                </h2>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", lineHeight: 1.7, display: "grid", gap: "20px" }}>
                  <p>La Liga de Fútbol Inclusiva es un evento sistemático de fútbol para personas con y sin discapacidad creado por la Asociación Civil Andar.</p>
                  <p>Desde 1998, en la ciudad de Moreno, trabajamos valores y equiparamos oportunidades, construyendo una sociedad más inclusiva a través del deporte más popular.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "20px", letterSpacing: "-0.5px" }}>EL MÉTODO DEL TESTEO</h2>
                  <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontSize: "1.05rem" }}>
                    Evaluamos capacidades técnicas, tácticas y estratégicas para garantizar la equidad competitiva. Cada equipo juega con pares de habilidades similares, brindando oportunidades reales a todos.
                  </p>
                  <div style={{ marginTop: "30px", background: "rgba(41,128,185,0.1)", border: "1px solid rgba(41,128,185,0.2)", padding: "20px", borderRadius: "12px", color: "#2980B9", fontWeight: 700, fontSize: "0.95rem" }}>
                     Cabe señalar que la inclusión con equipos integrados por personas con y sin discapacidad es un eje central de este movimiento.
                  </div>
                </div>
                <div style={{ position: "relative", height: "300px", borderRadius: "16px", overflow: "hidden" }}>
                  <Image src="https://futbolinclusivo.org.ar/app/uploads/2018/12/MG_0325.jpg" alt="Testeo" fill style={{ objectFit: "cover", opacity: 0.8 }} />
                </div>
              </div>
            </FadeIn>

            {/* Stats Zones (Premium Cards) */}
            <FadeIn delay={0.2}>
              <div>
                <h2 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "40px", textAlign: "center", letterSpacing: "-1px" }}>ESTADÍSTICAS FINALES</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                  {statsZones.map((zone, idx) => (
                    <div key={idx} style={{ 
                      background: "rgba(255,255,255,0.03)", 
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: "16px",
                      padding: "30px",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s"
                    }} className="hover:bg-white/10 hover:border-white/20 hover:-translate-y-1">
                      <Trophy size={80} color="rgba(255,255,255,0.03)" style={{ position: "absolute", right: "-10px", top: "-10px" }} />
                      <h3 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "20px", color: "var(--color-primary-light)" }}>{zone.name}</h3>
                      <div style={{ display: "grid", gap: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <Medal size={20} color="#FFD700" />
                          <span style={{ fontWeight: 800 }}>{zone.winner}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <Medal size={20} color="#C0C0C0" />
                          <span style={{ color: "rgba(255,255,255,0.5)" }}>{zone.runnerUp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Action Bar */}
      <section style={{ padding: "80px 0", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "20px" }}>¿QUERÉS SER PARTE?</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "40px", fontSize: "1.1rem" }}>Inscribí a tu institución ahora mismo or descargá el Listado de Buena Fe.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            <Link href="/inscripcion" className="btn btn-lg" style={{ background: "var(--color-primary-light)", color: "#fff", fontWeight: 800 }}>
              INSCRIBIR EQUIPO
            </Link>
            <a href="#" className="btn btn-lg" style={{ background: "rgba(255,255,255,0.05)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}>
              LISTADO DE BUENA FE
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
