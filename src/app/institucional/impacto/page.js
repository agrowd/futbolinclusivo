import Link from "next/link";
import { Target, Users, Award } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Nuestro Impacto - Fútbol Inclusivo",
  description: "Conocé los números y resultados de nuestro trabajo transformador en la comunidad.",
};

export default function ImpactoPage() {
  const stats = [
    {
      number: "25+",
      label: "Años de trayectoria",
      description: "Construyendo inclusión desde 1998",
      color: "var(--color-primary-light)"
    },
    {
      number: "1000+",
      label: "Participantes anuales",
      description: "Niños, jóvenes y adultos en nuestros programas",
      color: "#E67E22"
    },
    {
      number: "20+",
      label: "Zonas de competencia",
      description: "Cobertura en toda la provincia de Buenos Aires",
      color: "#2980B9"
    },
    {
      number: "6",
      label: "Provincias en la red nacional",
      description: "Expansión federal del modelo inclusivo",
      color: "#8E44AD"
    },
    {
      number: "10",
      label: "Países en Festival LATAM",
      description: "Impacto internacional y desarrollo juvenil",
      color: "#E74C3C"
    },
    {
      number: "200+",
      label: "Equipos participantes",
      description: "En todas nuestras categorías y ligas",
      color: "#16A085"
    }
  ];

  const achievements = [
    {
      title: "Desarrollo Integral",
      description: "Promoción de habilidades sociales, deportivas y personales en personas con discapacidad.",
      icon: Users,
      color: "#E67E22"
    },
    {
      title: "Igualdad de Género",
      description: "Categorías masculinas y femeninas con igualdad de oportunidades y reconocimiento.",
      icon: Target,
      color: "#E74C3C"
    },
    {
      title: "Reconocimiento Institucional",
      description: "Apoyo de AFA, FIFA, clubes de primera división y organizaciones internacionales.",
      icon: Award,
      color: "#2980B9"
    }
  ];

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
            src="https://futbolinclusivo.org.ar/app/uploads/2017/12/nuestro-impacto-.jpg"
            alt="Nuestro impacto - Fútbol Inclusivo"
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
            NUESTRO IMPACTO
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px" }}>
            TRANSFORMANDO VIDAS A TRAVÉS DEL FÚTBOL
          </h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            Más de dos décadas construyendo una sociedad más inclusiva con resultados concretos y medibles.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gap: "80px" }}>
            
            {/* Stats Grid */}
            <div>
              <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#fff", marginBottom: "50px", textAlign: "center" }}>
                NUESTROS NÚMEROS
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
                {stats.map((stat, index) => (
                  <div key={index} style={{
                    background: "rgba(255,255,255,0.03)",
                    padding: "40px 30px",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    textAlign: "center",
                    transition: "all 0.3s"
                  }} className="hover:bg-white/8 hover:border-white/15">
                    <div style={{
                      fontSize: "3rem",
                      fontWeight: 900,
                      color: stat.color,
                      marginBottom: "15px",
                      lineHeight: 1
                    }}>
                      {stat.number}
                    </div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>
                      {stat.label}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.5 }}>
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Section */}
            <div>
              <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#fff", marginBottom: "50px", textAlign: "center" }}>
                LOGROS ALCANZADOS
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                      padding: "40px",
                      borderRadius: "20px",
                      border: "1px solid rgba(255,255,255,0.05)",
                      transition: "all 0.3s"
                    }} className="hover:bg-white/8 hover:border-white/15">
                      <div style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        background: `${achievement.color}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 25px",
                        color: achievement.color
                      }}>
                        <Icon size={30} />
                      </div>
                      <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", marginBottom: "15px", textAlign: "center" }}>
                        {achievement.title}
                      </h3>
                      <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6, textAlign: "center" }}>
                        {achievement.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Impact Areas */}
            <div style={{ 
              background: "linear-gradient(135deg, rgba(0,141,77,0.1) 0%, rgba(0,141,77,0.05) 100%)",
              padding: "60px 40px", 
              borderRadius: "25px", 
              border: "1px solid rgba(0,141,77,0.2)"
            }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", marginBottom: "40px", textAlign: "center" }}>
                ÁREAS DE IMPACTO
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px", textAlign: "center" }}>
                <div style={{ padding: "30px 20px" }}>
                  <h3 style={{ color: "var(--color-primary-light)", fontWeight: 800, marginBottom: "15px", fontSize: "1.2rem" }}>
                    Desarrollo Social
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                    Integración comunitaria y construcción de redes sociales inclusivas
                  </p>
                </div>
                <div style={{ padding: "30px 20px" }}>
                  <h3 style={{ color: "var(--color-primary-light)", fontWeight: 800, marginBottom: "15px", fontSize: "1.2rem" }}>
                    Salud y Bienestar
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                    Promoción de estilos de vida activos y saludables
                  </p>
                </div>
                <div style={{ padding: "30px 20px" }}>
                  <h3 style={{ color: "var(--color-primary-light)", fontWeight: 800, marginBottom: "15px", fontSize: "1.2rem" }}>
                    Educación y Habilidades
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                    Desarrollo de competencias deportivas y sociales
                  </p>
                </div>
                <div style={{ padding: "30px 20px" }}>
                  <h3 style={{ color: "var(--color-primary-light)", fontWeight: 800, marginBottom: "15px", fontSize: "1.2rem" }}>
                    Derechos Humanos
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                    Visibilidad y defensa de los derechos de las personas con discapacidad
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", marginBottom: "30px" }}>
                Sumate a nuestro impacto
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }}>
                Tu apoyo nos permite seguir transformando vidas y construyendo una sociedad más inclusiva a través del fútbol.
              </p>
              <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link 
                  href="/sumate" 
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
                  Sumate como Voluntario
                </Link>
                <Link 
                  href="/sumate#donar" 
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "16px 32px",
                    borderRadius: "12px",
                    background: "transparent",
                    color: "#fff",
                    fontWeight: 800,
                    textDecoration: "none",
                    fontSize: "1rem",
                    border: "2px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s"
                  }}
                >
                  Realizar una Donación
                </Link>
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
                  background: "rgba(255,255,255,0.1)",
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
