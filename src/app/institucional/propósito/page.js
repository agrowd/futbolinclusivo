import Link from "next/link";
import { Target, Heart, Users } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Nuestro Propósito - Fútbol Inclusivo",
  description: "El fútbol como herramienta de inclusión social. Equiparando oportunidades y derribando mitos.",
};

export default function PropositoPage() {
  return (
    <div style={{ background: "#000B1A", color: "#fff", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section style={{ 
        background: "linear-gradient(to bottom, #001A3D, #000B1A)", 
        padding: "180px 0 100px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        position: "relative"
      }}>
        {/* Background Image */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 0
        }}>
          <Image 
            src="https://futbolinclusivo.org.ar/app/uploads/2017/12/nosotros-campo4.jpg"
            alt="Nuestro propósito - Fútbol Inclusivo"
            fill
            style={{ objectFit: "cover", opacity: 0.3 }}
            sizes="100vw"
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,26,61,0.4) 0%, rgba(0,11,26,0.6) 100%)"
          }} />
        </div>
        
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
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
            NUESTRO PROPÓSITO
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px" }}>
            EL FÚTBOL COMO HERRAMIENTA DE INCLUSIÓN SOCIAL
          </h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            El fútbol tiene un arraigo particular en la cultura argentina. Su poder es ampliamente movilizador y nos permite generar un espacio masivo de participación colectiva.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: "100px 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ display: "grid", gap: "60px" }}>
            
            <div style={{ 
              background: "rgba(255,255,255,0.03)", 
              padding: "50px", 
              borderRadius: "20px", 
              border: "1px solid rgba(255,255,255,0.05)",
              lineHeight: 1.8,
              fontSize: "1.15rem",
              color: "rgba(255,255,255,0.7)"
            }}>
              <p style={{ marginBottom: "30px" }}>
                El fútbol tiene un arraigo particular en la cultura argentina. Su poder es ampliamente movilizador y nos permite generar un espacio masivo de participación colectiva donde el eje no es la competencia si no la equiparación de oportunidades, brindando la posibilidad que todos y todas puedan jugar en igualdad de condiciones, independientemente de sus limitaciones.
              </p>
              
              <p style={{ marginBottom: "30px" }}>
                El fútbol, en este caso, nos permite demostrar a la comunidad, a través de una estrategia incluyente, que las personas con discapacidad, cuando se respetan sus particularidades y se potencia sus virtudes, tienen mucho para aportar a sus comunidades.
              </p>
              
              <p style={{ marginBottom: "30px" }}>
                Buscamos a través de la revalorización colectiva y personal darle visibilidad a un colectivo que ve vulnerado sus derechos permanentemente en nuestro país. La situación de discapacidad que atraviesa una persona le impone prejuicios y limitaciones que no son propios de esas personas, si no el resultado de una sociedad que no toma en cuenta sus necesidades y peculiaridades, generando un círculo vicioso de estigmatización y exclusión.
              </p>
              
              <p>
                Nuestro objetivo es claro: derribar mitos y aportar a una inclusión plena de todas las personas, más allá de la condición que puedan tener o atravesar.
              </p>
            </div>

            {/* Mission Vision Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
              <div style={{ 
                background: "linear-gradient(135deg, rgba(230,126,34,0.1) 0%, rgba(230,126,34,0.05) 100%)",
                padding: "40px", 
                borderRadius: "20px", 
                border: "1px solid rgba(230,126,34,0.2)",
                textAlign: "center"
              }}>
                <div style={{ 
                  width: "60px", 
                  height: "60px", 
                  borderRadius: "50%", 
                  background: "rgba(230,126,34,0.2)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  color: "#E67E22"
                }}>
                  <Target size={30} />
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: "15px" }}>Nuestra Misión</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                  Generar oportunidades innovadoras para potenciar el desarrollo creativo de personas con discapacidad, mejorando su calidad de vida.
                </p>
              </div>

              <div style={{ 
                background: "linear-gradient(135deg, rgba(41,128,185,0.1) 0%, rgba(41,128,185,0.05) 100%)",
                padding: "40px", 
                borderRadius: "20px", 
                border: "1px solid rgba(41,128,185,0.2)",
                textAlign: "center"
              }}>
                <div style={{ 
                  width: "60px", 
                  height: "60px", 
                  borderRadius: "50%", 
                  background: "rgba(41,128,185,0.2)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  color: "#2980B9"
                }}>
                  <Heart size={30} />
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: "15px" }}>Nuestra Visión</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                  Una sociedad que brinde igualdad de oportunidades a todas las personas, independientemente de sus características individuales.
                </p>
              </div>

              <div style={{ 
                background: "linear-gradient(135deg, rgba(0,141,77,0.1) 0%, rgba(0,141,77,0.05) 100%)",
                padding: "40px", 
                borderRadius: "20px", 
                border: "1px solid rgba(0,141,77,0.2)",
                textAlign: "center"
              }}>
                <div style={{ 
                  width: "60px", 
                  height: "60px", 
                  borderRadius: "50%", 
                  background: "rgba(0,141,77,0.2)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  color: "var(--color-primary-light)"
                }}>
                  <Users size={30} />
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: "15px" }}>Nuestro Objetivo</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                  Derribar mitos y aportar a una inclusión plena de todas las personas, más allá de la condición que puedan tener o atravesar.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div style={{ textAlign: "center", paddingTop: "40px" }}>
              <Link 
                href="/institucional" 
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  background: "var(--color-primary-light)",
                  color: "#fff",
                  fontWeight: 800,
                  textDecoration: "none",
                  fontSize: "1rem",
                  transition: "all 0.3s"
                }}
              >
                ← Volver a Institucional
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
