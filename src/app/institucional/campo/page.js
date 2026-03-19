import Link from "next/link";
import { MapPin, Users, Target } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Nuestro Campo - Fútbol Inclusivo",
  description: "Una sociedad plenamente inclusiva. Espacios adaptados para el desarrollo deportivo y social.",
};

export default function CampoPage() {
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
            src="https://futbolinclusivo.org.ar/app/uploads/2017/12/nosotros-campo3.jpg"
            alt="Nuestro campo - Fútbol Inclusivo"
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
            NUESTRO CAMPO
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px" }}>
            UNA SOCIEDAD PLENAMENTE INCLUSIVA
          </h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            Espacios adaptados para el desarrollo deportivo, promoción de la salud y generación de oportunidades.
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
                La Liga de Fútbol Inclusiva convoca a niños, niñas, jóvenes y adultos, con y sin discapacidad pertenecientes a Instituciones educativas, talleres protegidos, centros de dia, hogares, instituciones estatales y Organizaciones Sociales.
              </p>
              
              <p style={{ marginBottom: "30px" }}>
                Nuestro eje es la plena inclusión social, es por ello que a través de nuestros diferentes programas brindamos valor a la diversidad, a través del desarrollo deportivo, promoción de la salud, iniciativas para la generación de oportunidades, desarrollo para la igualdad de género.
              </p>
              
              <p style={{ marginBottom: "30px" }}>
                Asimismo promovemos los derechos de los niños, niñas, jóvenes y adultos con discapacidad, teniendo en cuenta la protección del medio ambiente y la lucha contra todo tipo de discriminación.
              </p>
              
              <p>
                Para los niños y niñas, jóvenes y adultos con discapacidad la Liga de Fútbol Inclusiva es la oportunidad de aprender, jugar, competir y compartir espacios comunitarios para la práctica y desarrollo del fútbol incluyente.
              </p>
            </div>

            {/* Features Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px" }}>
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
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: "15px" }}>Inclusión Plena</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                  Espacios para personas con y sin discapacidad en igualdad de condiciones
                </p>
              </div>

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
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: "15px" }}>Desarrollo Integral</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                  Desarrollo deportivo, promoción de la salud y generación de oportunidades
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
                  <MapPin size={30} />
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: "15px" }}>Espacios Adaptados</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                  Instalaciones accesibles y adaptadas para prácticas deportivas inclusivas
                </p>
              </div>
            </div>

            {/* Participants Info */}
            <div style={{ 
              background: "rgba(255,255,255,0.02)", 
              padding: "40px", 
              borderRadius: "20px", 
              border: "1px solid rgba(255,255,255,0.05)"
            }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-primary-light)", marginBottom: "20px", textAlign: "center" }}>
                ¿QUIÉNES PARTICIPAN?
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", textAlign: "center" }}>
                <div style={{ padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: "12px" }}>
                  <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: "10px" }}>Instituciones Educativas</h4>
                </div>
                <div style={{ padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: "12px" }}>
                  <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: "10px" }}>Talleres Protegidos</h4>
                </div>
                <div style={{ padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: "12px" }}>
                  <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: "10px" }}>Centros de Día</h4>
                </div>
                <div style={{ padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: "12px" }}>
                  <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: "10px" }}>Hogares</h4>
                </div>
                <div style={{ padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: "12px" }}>
                  <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: "10px" }}>Instituciones Estatales</h4>
                </div>
                <div style={{ padding: "20px", background: "rgba(255,255,255,0.03)", borderRadius: "12px" }}>
                  <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: "10px" }}>Organizaciones Sociales</h4>
                </div>
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
