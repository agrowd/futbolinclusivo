import { Clock } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Nuestra Historia - Premium Experience",
  description: "La línea de tiempo de la Asociación Civil Andar y el Movimiento de Fútbol Inclusivo.",
};

const timeline = [
  {
    year: "1998",
    title: "Creación de la Liga B.A.",
    description: "Nace la Liga de Fútbol Inclusiva en la ciudad de Moreno, Buenos Aires, como un evento verdaderamente innovador para equiparar oportunidades de personas con y sin discapacidad en el ámbito deportivo."
  },
  {
    year: "2011",
    title: "Expansión Nacional",
    description: "La metodología resulta tan exitosa que se toma la decisión de extender las fronteras creando la 'Liga Nacional', transfiriendo el know-how a organizaciones sociales de otras provincias argentinas."
  },
  {
    year: "2011",
    title: "Finales en AFA",
    description: "Un hito histórico para el deporte adaptado: las finales anuales comienzan a disputarse en el predio Julio Humberto Grondona de Ezeiza, apoyadas por la Asociación del Fútbol Argentino."
  },
  {
    year: "2018",
    title: "Rusia 2018 y Alianzas Globales",
    description: "Líderes de la Liga viajan a Rusia durante el Mundial bajo el programa 'Football for Hope' de FIFA, consolidando el estatus internacional de la Asociación."
  },
  {
    year: "2019",
    title: "Festival Latinoamericano de Fútbol 3",
    description: "Buenos Aires recibe a jóvenes de más de 10 países de LATAM para debatir, jugar e intercambiar culturas durante el Festival Internacional apoyado por Streetfootballworld."
  },
  {
    year: "2024",
    title: "Nace Andar FC y Complejo Propio",
    description: "Inauguramos el nuevo Complejo 'Fútbol por la Inclusión' y lanzamos oficialmente Andar FC, un club propio dedicado 100% al desarrollo metodológico integral."
  }
];

export default function HistoriaPage() {
  return (
    <div style={{ background: "#000B1A", color: "#fff", minHeight: "100vh" }}>
      {/* Hero */}
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
            INSTITUCIONAL
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px", letterSpacing: "-1.5px" }}>Nuestra Historia</h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            Un recorrido por los hitos más importantes que marcaron el rumbo del Fútbol Inclusivo a nivel local e internacional.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ padding: "100px 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          
          <div style={{ position: "relative", paddingLeft: "50px" }}>
            {/* Central Line */}
            <div style={{ 
              position: "absolute", 
              left: "20px", 
              top: 0, 
              bottom: 0, 
              width: "2px", 
              background: "linear-gradient(to bottom, var(--color-primary-light), transparent)", 
              opacity: 0.3 
            }} />
            
            {timeline.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ position: "relative", marginBottom: "80px" }}>
                  {/* Node */}
                  <div style={{ 
                    position: "absolute", 
                    left: "-50px", 
                    top: "0", 
                    width: "40px", 
                    height: "40px", 
                    background: "var(--color-primary-light)",
                    color: "#fff",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 20px rgba(0,141,77,0.4)",
                    zIndex: 2
                  }}>
                    <span style={{ fontWeight: 900, fontSize: "0.8rem" }}>{item.year.slice(2)}</span>
                  </div>
                  
                  {/* Content (Glassmorphism) */}
                  <div style={{ 
                    background: "rgba(255,255,255,0.03)", 
                    padding: "40px", 
                    borderRadius: "12px", 
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "all 0.33s cubic-bezier(0.4, 0, 0.2, 1)" 
                  }} className="hover:bg-white/10 hover:border-white/20 hover:translate-x-3">
                    <div style={{ 
                      color: "var(--color-primary-light)", 
                      fontSize: "1rem", 
                      fontWeight: 900, 
                      letterSpacing: "3px",
                      marginBottom: "10px" 
                    }}>
                      {item.year}
                    </div>
                    <h3 style={{ fontSize: "1.8rem", color: "#fff", fontWeight: 800, marginBottom: "20px", lineHeight: 1.1 }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontSize: "1.1rem", margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
