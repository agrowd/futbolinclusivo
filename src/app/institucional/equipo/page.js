import Link from "next/link";
import { Users, Heart, Target } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Nuestro Equipo - Fútbol Inclusivo",
  description: "Conocé al equipo humano de profesionales y voluntarios que lidera la Asociación Civil Andar.",
};

export default function EquipoPage() {
  const teamMembers = [
    {
      name: "Equipo Profesional",
      description: "Profesionales dedicados al desarrollo de programas inclusivos y la gestión administrativa de la organización.",
      role: "Coordinación y Gestión",
      color: "#E67E22"
    },
    {
      name: "Voluntarios",
      description: "Personas comprometidas que dedican su tiempo y energía para hacer posible cada una de nuestras actividades.",
      role: "Apoyo y Operación",
      color: "#2980B9"
    },
    {
      name: "Colaboradores Técnicos",
      description: "Entrenadores y especialistas en fútbol adaptado que desarrollan nuestras metodologías inclusivas.",
      role: "Desarrollo Deportivo",
      color: "#8E44AD"
    },
    {
      name: "Equipo de Apoyo",
      description: "Personal administrativo y de logística que asegura el funcionamiento eficiente de todas nuestras operaciones.",
      role: "Soporte Integral",
      color: "#16A085"
    }
  ];

  const values = [
    {
      title: "Compromiso",
      description: "Dedicación total a la misión de inclusión social a través del deporte.",
      icon: Heart,
      color: "#E74C3C"
    },
    {
      title: "Profesionalismo",
      description: "Excelencia en la gestión y desarrollo de nuestros programas.",
      icon: Target,
      color: "#3498DB"
    },
    {
      title: "Trabajo en Equipo",
      description: "Colaboración sinérgica para maximizar nuestro impacto comunitario.",
      icon: Users,
      color: "#2ECC71"
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
            src="https://futbolinclusivo.org.ar/app/uploads/2017/12/nosotros-.jpg"
            alt="Nuestro equipo - Fútbol Inclusivo"
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
            NUESTRO EQUIPO
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px" }}>
            EL CORAZÓN DE ANDAR
          </h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            Conocé al equipo humano de profesionales y voluntarios que lidera la Asociación Civil Andar y la Liga de Fútbol Inclusiva.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gap: "80px" }}>
            
            {/* Team Members Grid */}
            <div>
              <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#fff", marginBottom: "50px", textAlign: "center" }}>
                QUIENES SOMOS
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
                {teamMembers.map((member, index) => (
                  <div key={index} style={{
                    background: "rgba(255,255,255,0.03)",
                    padding: "40px",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    textAlign: "center",
                    transition: "all 0.3s"
                  }} className="hover:bg-white/8 hover:border-white/15">
                    <div style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      background: `${member.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 25px",
                      color: member.color
                    }}>
                      <Users size={40} />
                    </div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>
                      {member.name}
                    </h3>
                    <div style={{
                      display: "inline-block",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      background: `${member.color}15`,
                      color: member.color,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      marginBottom: "20px"
                    }}>
                      {member.role}
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                      {member.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Values Section */}
            <div>
              <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#fff", marginBottom: "50px", textAlign: "center" }}>
                NUESTROS VALORES
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div key={index} style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                      padding: "40px",
                      borderRadius: "20px",
                      border: "1px solid rgba(255,255,255,0.05)",
                      textAlign: "center",
                      transition: "all 0.3s"
                    }} className="hover:bg-white/8 hover:border-white/15">
                      <div style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        background: `${value.color}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 25px",
                        color: value.color
                      }}>
                        <Icon size={30} />
                      </div>
                      <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", marginBottom: "15px" }}>
                        {value.title}
                      </h3>
                      <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Team Philosophy */}
            <div style={{ 
              background: "linear-gradient(135deg, rgba(0,141,77,0.1) 0%, rgba(0,141,77,0.05) 100%)",
              padding: "60px 40px", 
              borderRadius: "25px", 
              border: "1px solid rgba(0,141,77,0.2)"
            }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", marginBottom: "30px", textAlign: "center" }}>
                FILOSOFÍA DE EQUIPO
              </h2>
              <div style={{ 
                maxWidth: "800px", 
                margin: "0 auto", 
                textAlign: "center",
                lineHeight: 1.8,
                fontSize: "1.15rem",
                color: "rgba(255,255,255,0.7)"
              }}>
                <p style={{ marginBottom: "25px" }}>
                  En la Asociación Civil Andar creemos que el trabajo en equipo es fundamental para lograr una verdadera transformación social. Nuestro equipo está conformado por personas apasionadas que comparten la visión de construir una sociedad más inclusiva.
                </p>
                <p style={{ marginBottom: "25px" }}>
                  Cada miembro aporta sus habilidades únicas y experiencias, creando un ambiente colaborativo donde la diversidad enriquece nuestro trabajo y nos permite desarrollar soluciones innovadoras para los desafíos que enfrentamos.
                </p>
                <p>
                  El compromiso, la empatía y la profesionalidad son los pilares que guían nuestras acciones diarias, permitiéndonos generar un impacto positivo y duradero en la comunidad.
                </p>
              </div>
            </div>

            {/* Join Team Section */}
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", marginBottom: "30px" }}>
                ¿Queres sumarte a nuestro equipo?
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }}>
              Buscamos personas comprometidas que quieran aportar su talento y energía para transformar vidas a través del fútbol inclusivo.
              </p>
              <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link 
                  href="/sumate#voluntarios" 
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
                  href="/contacto" 
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
                  Contactanos
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
