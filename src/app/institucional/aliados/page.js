import Link from "next/link";
import { Users, Heart, Target } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Nuestros Aliados - Fútbol Inclusivo",
  description: "Formando equipos de equipos. Conocé las organizaciones que confían en nuestro proyecto.",
};

export default function AliadosPage() {
  const allies = [
    {
      name: "ADIDAS",
      description: "ADIDAS Argentina y su Fundación acompañan a la Asociación Civil Andar desde el año 2007, la 'Magia que ADIDAS Argentina le puso a nuestro Potrero', fue el punto de partida.",
      website: "http://www.adidas.com.ar",
      logo: "https://futbolinclusivo.org.ar/app/uploads/2017/10/1-logo-addas.png",
      color: "#000000"
    },
    {
      name: "streetfootballworld",
      description: "Respalda a una red mundial de organizaciones que utilizan el fútbol como una herramienta para empoderar a los jóvenes. La Asociación Civil Andar forma parte de esta Red Mundial.",
      website: "http://www.streetfootballworld.org",
      logo: "https://futbolinclusivo.org.ar/app/uploads/2017/10/2-street.png",
      color: "#FF6B35"
    },
    {
      name: "FIFA Football for Hope",
      description: "La FIFA cree que el fútbol es más que un juego. A través de un riguroso proceso de selección la FIFA seleccionó a la Asociación Civil Andar y otorgó un apoyo económico.",
      website: "http://www.es.fifa.com",
      logo: "https://futbolinclusivo.org.ar/app/uploads/2017/10/fifa-logo.png",
      color: "#00529F"
    },
    {
      name: "Secretaría de Deportes de la Nación",
      description: "Ha brindado su apoyo a la Asociación Civil Andar para expandir su desarrollo a través de la Liga Nacional de Fútbol Inclusiva.",
      website: "http://educacion.gob.ar/secretaria-de-deporte-educacion-fisica-y-recreacion",
      logo: "https://futbolinclusivo.org.ar/app/uploads/2017/10/logo-secretaria-deporte-2017.png",
      color: "#00A651"
    },
    {
      name: "Fundación Laureus",
      description: "A través de la articulación con la Fundación Laureus, la Asociación Civil Andar lleva adelante desde el año 2015 el proyecto de Escuelas de Fútbol Inclusivas.",
      website: "http://www.fundacionlaureus.org.ar/",
      logo: "https://futbolinclusivo.org.ar/app/uploads/2017/10/4-laureus.png",
      color: "#FFD700"
    },
    {
      name: "Club Estudiantes de la Plata",
      description: "El Fútbol Inclusivo celebró este año la alianza entre la Fundación Estudiantes de la Plata y la Asociación Civil Andar.",
      website: "http://www.estudiantesdelaplata.com",
      logo: "https://futbolinclusivo.org.ar/app/uploads/2017/12/edelp.jpg",
      color: "#FF0000"
    },
    {
      name: "Club Atlético San Lorenzo de Almagro",
      description: "Alianza estratégica para el desarrollo de acciones conjuntas y el Partido 'Fútbol por la Inclusión' en el marco del Festival Latinoamericano.",
      website: "http://www.sanlorenzo.com.ar",
      logo: "https://futbolinclusivo.org.ar/app/uploads/2017/12/casla.jpg",
      color: "#0047AB"
    },
    {
      name: "Club Atlético River Plate",
      description: "Ha acompañado el desarrollo de la Liga de Fútbol Inclusiva desde el año 2003, siendo sede de las Finales y Ceremonia de Premiación.",
      website: "http://www.cariverplate.com.ar",
      logo: "https://futbolinclusivo.org.ar/app/uploads/2017/12/river.jpg",
      color: "#FF0000"
    },
    {
      name: "AFA",
      description: "La Asociación del Fútbol Argentino y su presidente Claudio 'Chiqui' Tapia brindaron su apoyo a la Liga de Fútbol Inclusiva y cedieron las instalaciones del Predio 'Julio Humberto Grandono'.",
      website: "#",
      logo: "",
      color: "#00A651"
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
            src="https://futbolinclusivo.org.ar/app/uploads/2017/12/nosotros-campo5.jpg"
            alt="Nuestros aliados - Fútbol Inclusivo"
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
            NUESTROS ALIADOS
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px" }}>
            FORMANDO EQUIPOS DE EQUIPOS
          </h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            Desde la Liga de Fútbol Inclusiva creemos en relaciones a largo plazo y apostamos a alianzas estratégicas que potencien nuestro impacto.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gap: "40px" }}>
            
            {/* Allies Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
              {allies.map((ally, index) => (
                <div key={index} style={{
                  background: "rgba(255,255,255,0.03)",
                  padding: "40px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.3s"
                }} className="hover:bg-white/8 hover:border-white/15">
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    marginBottom: "20px",
                    gap: "20px"
                  }}>
                    {/* Logo Container */}
                    <div style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px",
                      flexShrink: 0
                    }}>
                      {ally.logo ? (
                        <Image 
                          src={ally.logo}
                          alt={`${ally.name} logo`}
                          width={60}
                          height={60}
                          style={{ 
                            objectFit: "contain",
                            maxWidth: "100%",
                            maxHeight: "100%"
                          }}
                        />
                      ) : (
                        <div style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "8px",
                          background: `${ally.color}20`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: ally.color,
                          fontWeight: "bold",
                          fontSize: "0.8rem",
                          textAlign: "center"
                        }}>
                          {ally.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: "5px" }}>
                        {ally.name}
                      </h3>
                      {ally.website !== "#" && (
                        <a 
                          href={ally.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "rgba(255,255,255,0.5)",
                            fontSize: "0.85rem",
                            textDecoration: "none"
                          }}
                          className="hover:text-white"
                        >
                          {ally.website.replace("http://www.", "").replace("http://", "").replace("https://www.", "").replace("https://", "").split("/")[0]}
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p style={{ 
                    color: "rgba(255,255,255,0.6)", 
                    lineHeight: 1.6,
                    fontSize: "0.95rem"
                  }}>
                    {ally.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Partnership Philosophy */}
            <div style={{ 
              background: "linear-gradient(135deg, rgba(0,141,77,0.1) 0%, rgba(0,141,77,0.05) 100%)",
              padding: "50px", 
              borderRadius: "20px", 
              border: "1px solid rgba(0,141,77,0.2)",
              textAlign: "center"
            }}>
              <div style={{ 
                width: "80px", 
                height: "80px", 
                borderRadius: "50%", 
                background: "rgba(0,141,77,0.2)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                margin: "0 auto 30px",
                color: "var(--color-primary-light)"
              }}>
                <Heart size={40} />
              </div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", marginBottom: "20px" }}>
                Alianzas que Transforman
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "700px", margin: "0 auto" }}>
                Cada aliado estratégico nos permite amplificar nuestro impacto y llegar a más personas. Juntos construimos una sociedad más inclusiva a través del deporte.
              </p>
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
