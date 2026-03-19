import { GraduationCap, MapPin, Users, Target, BookOpen, ChevronRight, Clock, Calendar, FileText, Heart, Award, Handshake } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Escuela de Fútbol Inclusivo - EFI",
  description: "Formación integral para niños y jóvenes con y sin discapacidad. Metodología Fútbol 3, Fútbol Inclusivo y Fútbol Base.",
};

export default function Escuela() {
  return (
    <div style={{ background: "#000B1A", color: "#fff", minHeight: "100vh" }}>
      {/* Hero Section with Image */}
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
            src="https://futbolinclusivo.org.ar/app/uploads/2017/12/Escuela-Fundamentacion.png"
            alt="Escuela de Fútbol Inclusivo - EFI"
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
            ESCUELA DE FÚTBOL INCLUSIVO
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px", letterSpacing: "-1.5px" }}>
            FORMACIÓN INTEGRAL PARA TODOS
          </h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            Una iniciativa innovadora que permite la participación activa de niños y niñas con y sin discapacidad, familias, docentes y comunidad en el juego del fútbol.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ padding: "100px 0" }}>
        <div className="container" style={{ maxWidth: "1200px" }}>
          
          <div style={{ display: "grid", gap: "80px" }}>
            
            {/* Fundamentación Section */}
            <FadeIn>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "60px", borderRadius: "25px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--color-primary-light)", marginBottom: "40px", textTransform: "uppercase", letterSpacing: "-1px" }}>
                  <BookOpen size={36} style={{ display: "inline-block", marginRight: "15px", verticalAlign: "middle" }} /> FUNDAMENTACIÓN
                </h2>
                <div style={{ display: "grid", gap: "30px", fontSize: "1.15rem", lineHeight: 1.8, color: "rgba(255,255,255,0.7)" }}>
                  <p>
                    El proyecto de Escuela de Fútbol Inclusivo (EFI) se propone enfrentar principalmente la falta de oportunidades para el desarrollo de prácticas deportivas inclusivas, para el desarrollo de la misma se cuenta con el involucramiento de la comunidad en la habilitación de espacios acordes a prácticas deportivas en espacios de calidad.
                  </p>
                  <p>
                    Los participantes que asisten a la (EFI) provienen de comunidades vulnerables, de escuelas especiales y comunes de los barrios de la localidad de Moreno, siendo este distrito uno de los más pobres del conurbano Bonaerense. Muchos de estos niños y niñas requieren de asistencia para la interpretación de los entrenamientos para el Juego en sus tres componentes (acuerdos – partido – reflexión) a través del lenguaje de señas, muchos de los niños y niñas requieren de la adaptación de los contenidos de los componentes del juego a través de lenguaje sencillo.
                  </p>
                  <p>
                    El uso de instalaciones adaptadas, accesibles y de calidad, permite a los niños y niñas desarrollar habilidades de la vida diaria tales como los hábitos saludables de higiene, participar en un entorno amigable y la utilización de los elementos para el entrenamiento y para las prácticas del fútbol.
                  </p>
                  <p>
                    Con estímulos semanales que mejoran su condición física y el acceso a las relaciones sociales e interpersonales promoviendo el fortalecimiento de su autoestima, capacidad de tomar decisiones, capacidad de escucha y ser parte de un equipo y compartirlo con amigos.
                  </p>
                </div>
                
                {/* Objetivos Centrales */}
                <div style={{ 
                  background: "linear-gradient(135deg, rgba(0,141,77,0.1) 0%, rgba(0,141,77,0.05) 100%)",
                  padding: "40px", 
                  borderRadius: "20px", 
                  border: "1px solid rgba(0,141,77,0.2)",
                  marginTop: "40px"
                }}>
                  <h3 style={{ color: "#fff", fontWeight: 900, marginBottom: "25px", fontSize: "1.4rem" }}>OBJETIVOS CENTRALES DE LA EFI</h3>
                  <div style={{ display: "grid", gap: "20px" }}>
                    <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                      <Target size={24} color="var(--color-primary-light)" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <div>
                        <strong style={{ color: "#fff", display: "block", marginBottom: "5px" }}>Acercar a la población</strong>
                        <span style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                          Personas con y sin discapacidad de entre 6 y 18 años la metodología del fútbol inclusivo como un espacio de inclusión y encuentro a través del deporte para desarrollar y potenciar sus talentos.
                        </span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                      <Target size={24} color="var(--color-primary-light)" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <div>
                        <strong style={{ color: "#fff", display: "block", marginBottom: "5px" }}>Desarrollar sistemáticamente</strong>
                        <span style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                          Una preparación adecuada física y en valores, que respeta la diversidad como potencial humano.
                        </span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "15px", alignItems: "flex-start" }}>
                      <Target size={24} color="var(--color-primary-light)" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <div>
                        <strong style={{ color: "#fff", display: "block", marginBottom: "5px" }}>Concientizar</strong>
                        <span style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                          Acerca de la importancia de la generación de espacios comunitarias abiertos e inclusivos, donde se encuentren y compartan actividades personas con y sin discapacidad, con los apoyos y ajustes razonables necesarios para una verdadera inclusión.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Metodología Section */}
            <FadeIn delay={0.1}>
              <div>
                <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "50px", textAlign: "center", textTransform: "uppercase" }}>
                  <Award size={36} style={{ display: "inline-block", marginRight: "15px", verticalAlign: "middle" }} /> METODOLOGÍA DEL JUEGO
                </h2>
                <div style={{ 
                  background: "rgba(255,255,255,0.02)", 
                  padding: "50px", 
                  borderRadius: "25px", 
                  border: "1px solid rgba(255,255,255,0.05)"
                }}>
                  <p style={{ 
                    fontSize: "1.2rem", 
                    color: "rgba(255,255,255,0.6)", 
                    lineHeight: 1.7, 
                    marginBottom: "50px",
                    textAlign: "center",
                    maxWidth: "800px",
                    margin: "0 auto 50px"
                  }}>
                    La Escuela de Fútbol Inclusivo promueve el desarrollo y la unificación de tres metodologías: Fútbol 3, Fútbol Inclusivo y Fútbol Base.
                  </p>
                  
                  <div style={{ display: "grid", gap: "30px" }}>
                    <div style={{ 
                      background: "linear-gradient(135deg, rgba(41,128,185,0.1) 0%, rgba(41,128,185,0.05) 100%)",
                      border: "1px solid rgba(41,128,185,0.2)", 
                      padding: "45px", 
                      borderRadius: "20px"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                        <div style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          background: "rgba(41,128,185,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "20px"
                        }}>
                          <Handshake size={30} color="#2980B9" />
                        </div>
                        <h3 style={{ color: "#2980B9", fontSize: "1.8rem", fontWeight: 900 }}>LOS ACUERDOS</h3>
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontSize: "1.1rem" }}>
                        Es el espacio en el que se promueve la autodeterminación en la toma de decisiones, el desarrollo de las relaciones interpersonales en la construcción de relaciones sociales positivas, la capacidad de escucha y empatía.
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: "linear-gradient(135deg, rgba(230,126,34,0.1) 0%, rgba(230,126,34,0.05) 100%)",
                      border: "1px solid rgba(230,126,34,0.2)", 
                      padding: "45px", 
                      borderRadius: "20px"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                        <div style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          background: "rgba(230,126,34,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "20px"
                        }}>
                          <Heart size={30} color="#E67E22" />
                        </div>
                        <h3 style={{ color: "#E67E22", fontSize: "1.8rem", fontWeight: 900 }}>EL PARTIDO</h3>
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontSize: "1.1rem" }}>
                        Permite poner en evidencia su bienestar físico y poniendo a prueba sus habilidades, liberar endorfinas experimentando sentimientos de bienestar, canalizando sentimientos negativos y stress, desafiando su mejora día a día tanto en lo deportivo como en el desarrollo de hábitos saludables de la vida diaria.
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: "linear-gradient(135deg, rgba(0,141,77,0.1) 0%, rgba(0,141,77,0.05) 100%)",
                      border: "1px solid rgba(0,141,77,0.2)", 
                      padding: "45px", 
                      borderRadius: "20px"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                        <div style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          background: "rgba(0,141,77,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "20px"
                        }}>
                          <Users size={30} color="var(--color-primary-light)" />
                        </div>
                        <h3 style={{ color: "var(--color-primary-light)", fontSize: "1.8rem", fontWeight: 900 }}>LA REFLEXIÓN</h3>
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontSize: "1.1rem" }}>
                        Es la herramienta facilitadora de los procesos de autoconocimiento, respeto por la opinión de los demás, capacidad de resiliencia transformando experiencias negativas en positivas. Este es el espacio en el cual los derechos y los procesos de Inclusión le permiten a todos ser escuchados, considerados iguales y de esta forma sentirse miembro y parte.
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: "rgba(255,255,255,0.03)", 
                    padding: "40px", 
                    borderRadius: "20px", 
                    border: "1px solid rgba(255,255,255,0.05)",
                    marginTop: "40px"
                  }}>
                    <h4 style={{ color: "#fff", fontWeight: 800, marginBottom: "20px", fontSize: "1.2rem" }}>COMPLEMENTACIÓN METODOLÓGICA</h4>
                    <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                      Esta metodología se complementa con la metodología de Futbol Inclusivo, impulsada por Andar que ha desarrollado incorporando, a la metodología de Futbol 3, las herramientas de "testeo de habilidades individuales y colectivas" la interpretación en lenguaje de señas y la metodología de enseñanza a niños de 6 a 12 años desarrollada por la FIFA el fútbol base adaptándolo a lenguaje sencillo.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Información Práctica */}
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Desarrollo */}
                <div style={{ background: "rgba(255,255,255,0.03)", padding: "50px", borderRadius: "25px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <h3 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "30px", color: "var(--color-primary-light)" }}>
                    <MapPin size={28} style={{ display: "inline-block", marginRight: "10px", verticalAlign: "middle" }} /> INFORMACIÓN PRÁCTICA
                  </h3>
                  <div style={{ display: "grid", gap: "25px" }}>
                    <div>
                      <strong style={{ color: "#fff", display: "block", marginBottom: "8px", fontSize: "1.1rem" }}>¿DÓNDE SE DESARROLLAN LAS ACTIVIDADES?</strong>
                      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <MapPin size={20} color="var(--color-primary-light)" style={{ flexShrink: 0, marginTop: "2px" }} />
                        <span style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                          Complejo deportivo Las Leñas Club, ubicado en Bartolomé Mitre esquina Remedios de Escalada, Moreno.
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <strong style={{ color: "#fff", display: "block", marginBottom: "8px", fontSize: "1.1rem" }}>¿HORARIOS?</strong>
                      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <Clock size={20} color="var(--color-primary-light)" style={{ flexShrink: 0, marginTop: "2px" }} />
                        <div style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                          <p style={{ marginBottom: "10px" }}>La EFI comienza en marzo</p>
                          <p style={{ marginBottom: "5px" }}><strong>Martes y jueves en doble turno:</strong></p>
                          <p style={{ marginLeft: "10px" }}>• Mañana: de 10:00hs a 12:00hs</p>
                          <p style={{ marginLeft: "10px" }}>• Tarde: de 14:00hs a 16:00hs</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <strong style={{ color: "#fff", display: "block", marginBottom: "8px", fontSize: "1.1rem" }}>¿QUIÉNES PUEDEN PARTICIPAR?</strong>
                      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        <Users size={20} color="var(--color-primary-light)" style={{ flexShrink: 0, marginTop: "2px" }} />
                        <span style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                          Todos los niños y niñas con y sin discapacidad entre los 6 y 18 años de edad de nuestra localidad de Moreno.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inscripción */}
                <div style={{ 
                  background: "linear-gradient(135deg, rgba(0,141,77,0.1) 0%, rgba(0,141,77,0.05) 100%)",
                  padding: "50px", 
                  borderRadius: "25px", 
                  border: "1px solid rgba(0,141,77,0.2)"
                }}>
                  <h3 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "30px", color: "var(--color-primary-light)" }}>
                    <FileText size={28} style={{ display: "inline-block", marginRight: "10px", verticalAlign: "middle" }} /> INSCRIPCIÓN
                  </h3>
                  <div style={{ display: "grid", gap: "25px" }}>
                    <div>
                      <strong style={{ color: "#fff", display: "block", marginBottom: "8px", fontSize: "1.1rem" }}>¿HAY PLANILLAS DE INSCRIPCIÓN?</strong>
                      <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "20px" }}>
                        Para sumarse a la EFI pueden descargar la planilla de inscripción que consta de información del participante y un segmento de aptitud física.
                      </p>
                    </div>
                    
                    <div style={{ 
                      background: "rgba(255,255,255,0.05)", 
                      padding: "25px", 
                      borderRadius: "15px", 
                      border: "1px solid rgba(255,255,255,0.1)"
                    }}>
                      <h4 style={{ color: "#fff", fontWeight: 800, marginBottom: "15px" }}>REQUISITOS DE INSCRIPCIÓN:</h4>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "12px" }}>
                        <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                          <div style={{ 
                            width: "8px", 
                            height: "8px", 
                            background: "var(--color-primary-light)", 
                            borderRadius: "50%", 
                            flexShrink: 0, 
                            marginTop: "6px" 
                          }}></div>
                          <span style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                            Completar planilla de inscripción con datos personales
                          </span>
                        </li>
                        <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                          <div style={{ 
                            width: "8px", 
                            height: "8px", 
                            background: "var(--color-primary-light)", 
                            borderRadius: "50%", 
                            flexShrink: 0, 
                            marginTop: "6px" 
                          }}></div>
                          <span style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                            Certificado médico de aptitud física
                          </span>
                        </li>
                        <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                          <div style={{ 
                            width: "8px", 
                            height: "8px", 
                            background: "var(--color-primary-light)", 
                            borderRadius: "50%", 
                            flexShrink: 0, 
                            marginTop: "6px" 
                          }}></div>
                          <span style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                            Autorización de padres/tutores
                          </span>
                        </li>
                        <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                          <div style={{ 
                            width: "8px", 
                            height: "8px", 
                            background: "var(--color-primary-light)", 
                            borderRadius: "50%", 
                            flexShrink: 0, 
                            marginTop: "6px" 
                          }}></div>
                          <span style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                            Foto del participante
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div style={{ textAlign: "center", marginTop: "30px" }}>
                      <Link 
                        href="/inscripcion"
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
                        <FileText size={20} />
                        INSCRIBIRSE AHORA
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Organizaciones Participantes */}
            <FadeIn delay={0.3}>
              <div style={{ background: "rgba(255,255,255,0.03)", padding: "50px", borderRadius: "25px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <h3 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "30px", color: "#E67E22" }}>
                  <GraduationCap size={28} style={{ display: "inline-block", marginRight: "10px", verticalAlign: "middle" }} /> ORGANIZACIONES PARTICIPANTES
                </h3>
                <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "30px" }}>
                  Participan las escuelas especiales de Moreno:
                </p>
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                  gap: "20px"
                }}>
                  {["Escuela 501", "Escuela 502", "Escuela 503", "Escuela 504", "Escuela 506", "C.F.L. N°1"].map(escuela => (
                    <div key={escuela} style={{
                      background: "rgba(230,126,34,0.1)",
                      border: "1px solid rgba(230,126,34,0.2)",
                      padding: "25px",
                      borderRadius: "15px",
                      textAlign: "center",
                      transition: "all 0.3s"
                    }} className="hover:bg-orange-500/20">
                      <div style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: "rgba(230,126,34,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 15px",
                        color: "#E67E22",
                        fontWeight: "bold",
                        fontSize: "1.2rem"
                      }}>
                        {escuela.match(/\d+/) ? escuela.match(/\d+/)[0] : escuela}
                      </div>
                      <h4 style={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}>{escuela}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Call to Action */}
            <FadeIn delay={0.4}>
              <div style={{ textAlign: "center" }}>
                <div style={{ 
                  background: "linear-gradient(135deg, rgba(0,141,77,0.1) 0%, rgba(0,141,77,0.05) 100%)",
                  padding: "60px 40px", 
                  borderRadius: "30px", 
                  border: "1px solid rgba(0,141,77,0.2)"
                }}>
                  <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "#fff", marginBottom: "20px" }}>
                    ¿Listo para ser parte de la EFI?
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.2rem", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px" }}>
                    Únete a nuestra escuela y descubre el poder del fútbol inclusivo para transformar vidas.
                  </p>
                  <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link 
                      href="/inscripcion"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "18px 36px",
                        borderRadius: "12px",
                        background: "var(--color-primary-light)",
                        color: "#fff",
                        fontWeight: 800,
                        textDecoration: "none",
                        fontSize: "1.1rem",
                        transition: "all 0.3s"
                      }}
                    >
                      <FileText size={24} />
                      INSCRIBIRSE
                    </Link>
                    <Link 
                      href="/contacto"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "18px 36px",
                        borderRadius: "12px",
                        background: "transparent",
                        color: "#fff",
                        fontWeight: 800,
                        textDecoration: "none",
                        fontSize: "1.1rem",
                        border: "2px solid rgba(255,255,255,0.2)",
                        transition: "all 0.3s"
                      }}
                    >
                      MÁS INFORMACIÓN
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>

        </div>
      </section>

    </div>
  );
}
