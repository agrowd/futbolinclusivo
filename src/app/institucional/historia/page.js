import { Clock } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Nuestra Historia - Fútbol Inclusivo",
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
    year: "2017",
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
    <div className="page-container">
      {/* Hero */}
      <section style={{ background: "var(--color-primary-dark)", color: "#fff", padding: "64px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.1)", padding: "8px 16px", borderRadius: "100px", marginBottom: "16px", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "1px" }}>
            LA ASOCIACIÓN
          </div>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "24px" }}>Nuestra Historia</h1>
          <p style={{ fontSize: "1.2rem", opacity: 0.9, maxWidth: "800px", margin: "0 auto" }}>
            Un recorrido por los hitos más importantes que marcaron el rumbo del Fútbol Inclusivo a nivel local e internacional.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ padding: "80px 0", background: "#f8f9fa" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          
          <div style={{ position: "relative", paddingLeft: "40px" }}>
            {/* Central Line */}
            <div style={{ position: "absolute", left: "16px", top: 0, bottom: 0, width: "4px", background: "var(--color-primary)", borderRadius: "4px", opacity: 0.2 }} />
            
            {timeline.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ position: "relative", marginBottom: i === timeline.length - 1 ? 0 : "48px" }}>
                  {/* Node */}
                  <div style={{ 
                    position: "absolute", 
                    left: "-40px", 
                    top: "0", 
                    width: "36px", 
                    height: "36px", 
                    background: "var(--color-primary)",
                    color: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 0 4px #f8f9fa, var(--shadow-sm)",
                    zIndex: 2
                  }}>
                    <Clock size={16} />
                  </div>
                  
                  {/* Content */}
                  <div style={{ background: "#fff", padding: "32px", borderRadius: "16px", boxShadow: "var(--shadow-sm)", border: "1px solid #eee" }} className="hover:-translate-y-1 transition-transform">
                    <div style={{ color: "var(--color-accent-orange)", fontSize: "1.2rem", fontWeight: 800, marginBottom: "8px" }}>
                      {item.year}
                    </div>
                    <h3 style={{ fontSize: "1.5rem", color: "var(--color-primary-dark)", marginBottom: "16px" }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "#666", lineHeight: 1.6, fontSize: "1.05rem", margin: 0 }}>
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
