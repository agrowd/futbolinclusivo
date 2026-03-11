import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  Users,
  Calendar,
  Heart,
  Globe,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Fútbol Inclusivo — Liga de Fútbol para personas con y sin discapacidad",
};

const recentNews = [
  {
    title: "Nace Andar FC",
    date: "29 Jun 2022",
    image: "https://futbolinclusivo.org.ar/app/uploads/2022/07/MG_3241-Copiar-960x600.jpg",
    link: "/novedades"
  },
  {
    title: "Ceremonia de Apertura 2024",
    date: "10 Mar 2024",
    image: "https://futbolinclusivo.org.ar/app/uploads/2021/12/FUTBOL-111221-89-Copiar-960x600.jpg",
    link: "/novedades"
  },
  {
    title: "TORNEO DE VERANO “AFA SOMOS TODXS”",
    date: "16 Feb 2024",
    image: "https://futbolinclusivo.org.ar/app/uploads/2024/02/WhatsApp-Image-2024-02-16-at-15.15.10-960x584.jpeg",
    link: "/novedades"
  },
  {
    title: "Nuevo Complejo “Fútbol por la Inclusión”",
    date: "16 Jul 2022",
    image: "https://futbolinclusivo.org.ar/app/uploads/2022/06/WhatsApp-Image-2022-06-29-at-7.08.44-PM-480x360.jpeg",
    link: "/novedades"
  }
];

const aliados = [
  {
    name: "FIFA Foundation",
    logo: "https://futbolinclusivo.org.ar/app/uploads/2020/12/LOGO-FIFA-FOUNDATION-A-VERSUS-1-e1708534832778.png"
  },
  {
    name: "Common Goal",
    logo: "https://futbolinclusivo.org.ar/app/uploads/2018/04/COMMON-GOAL-IMAGEN2.png"
  },
  {
    name: "UEFA Foundation for Children",
    logo: "https://futbolinclusivo.org.ar/app/uploads/2018/06/logo-uefa-foundation2.png"
  },
  {
    name: "AFA",
    logo: "https://futbolinclusivo.org.ar/app/uploads/2024/02/Argentine_Football_Association_logo.svg_-e1708534772981.png"
  }
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="hero" aria-labelledby="hero-heading" style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('https://futbolinclusivo.org.ar/app/uploads/2018/12/MG_0325.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "120px 0",
        color: "#fff"
      }}>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="hero-content" style={{ maxWidth: "800px" }}>
            <h1 id="hero-heading" style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "24px" }}>
              Creando valores a través del <span>deporte...</span>
            </h1>
            <p style={{ fontSize: "1.2rem", lineHeight: 1.6, marginBottom: "32px", color: "rgba(255,255,255,0.9)" }}>
              La Liga de Fútbol Inclusiva es un evento sistemático de fútbol para personas con y sin discapacidad creado por la Asociación Civil Andar.
              <br/><br/>
              El mismo se desarrolla desde el año 1998, en la ciudad de Moreno (Argentina) y se replica en diferentes puntos del país y de Latinoamérica. A través del fútbol se trabajan valores, se equiparan oportunidades y se construye una sociedad más inclusiva.
            </p>
            <div className="hero-actions" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/inscripcion" className="btn btn-lg" style={{ background: "#fff", color: "var(--color-primary-dark)", fontWeight: 700 }}>
                CAMINO A LYON
              </Link>
              <a href="https://donaronline.org/asociacion-civil-andar/suma-tu-apoyo-al-futbol-inclusivo" target="_blank" rel="noopener noreferrer" className="btn btn-lg" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)" }}>
                SUMÁ TU APOYO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTENT SECTION ===== */}
      <section className="section" style={{ padding: "64px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
            
            {/* LATEST NEWS */}
            <div style={{ gridColumn: "span 2" }}>
              <h2 style={{ marginBottom: "24px", color: "var(--color-primary-dark)", fontSize: "2rem" }}>Novedades</h2>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px"
              }}>
                {recentNews.map((news, index) => (
                  <div key={index} style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-md)",
                    background: "#fff",
                    transition: "transform 0.3s ease",
                    ":hover": { transform: "translateY(-5px)" }
                  }}>
                    <div style={{ position: "relative", height: "200px" }}>
                      <Image 
                        src={news.image} 
                        alt={news.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "40px 16px 16px",
                        background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                        color: "#fff"
                      }}>
                        <h3 style={{ fontSize: "1.1rem", margin: 0, lineHeight: 1.3 }}>{news.title}</h3>
                      </div>
                    </div>
                    <div style={{ padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #eee" }}>
                      <span style={{ fontSize: "0.9rem", color: "#666", display: "flex", alignItems: "center", gap: "6px" }}>
                        <Calendar size={14} /> {news.date}
                      </span>
                      <Link href={news.link} style={{
                        background: "var(--color-primary)",
                        color: "#fff",
                        padding: "6px 16px",
                        borderRadius: "4px",
                        fontSize: "0.85rem",
                        textDecoration: "none",
                        fontWeight: "bold"
                      }}>
                        LEER NOTA
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COUNTDOWN & FINALS */}
            <div>
              <div style={{
                background: "var(--color-primary-dark)",
                color: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "var(--shadow-md)",
                marginBottom: "32px"
              }}>
                <div style={{ background: "var(--color-primary)", padding: "16px", textAlign: "center" }}>
                  <h3 style={{ margin: 0, fontSize: "1.2rem" }}>FINALES Y PREMIACION 2025</h3>
                  <p style={{ margin: "4px 0 0", color: "var(--color-primary-light)", fontSize: "0.9rem" }}>6 Dic 2025</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "24px 16px", background: "#fff", color: "var(--color-text)" }}>
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1 }}>00</div>
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#666", marginTop: "8px" }}>Días</div>
                  </div>
                  <div style={{ width: "1px", background: "#eee" }}></div>
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1 }}>00</div>
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#666", marginTop: "8px" }}>Horas</div>
                  </div>
                  <div style={{ width: "1px", background: "#eee" }}></div>
                  <div style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1 }}>00</div>
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#666", marginTop: "8px" }}>Minutos</div>
                  </div>
                </div>
              </div>

              {/* PAST RESULTS */}
              <div style={{
                background: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "var(--shadow-md)",
                border: "1px solid #eee"
              }}>
                <div style={{ background: "var(--color-primary)", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff" }}>
                  <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Finales 2017</h3>
                  <span style={{ fontSize: "0.9rem", background: "rgba(255,255,255,0.2)", padding: "4px 12px", borderRadius: "100px" }}>Zona A</span>
                </div>
                
                <div style={{ padding: "0" }}>
                  <div style={{ background: "#f8f9fa", padding: "8px 16px", fontSize: "0.85rem", fontWeight: "bold", color: "#555", borderBottom: "1px solid #eee" }}>Partido Final</div>
                  <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee" }}>
                    <span>C.E.F. 123 A</span>
                    <strong>2</strong>
                  </div>
                  <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee" }}>
                    <span>CEDIMA</span>
                    <strong>0</strong>
                  </div>

                  <div style={{ background: "#f8f9fa", padding: "8px 16px", fontSize: "0.85rem", fontWeight: "bold", color: "#555", borderBottom: "1px solid #eee", borderTop: "1px solid #eee" }}>Partido 3er Puesto</div>
                  <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee" }}>
                    <span>Andar A</span>
                    <strong>2</strong>
                  </div>
                  <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between" }}>
                    <span>P.D.I. Los Pibes del Defe</span>
                    <strong>1</strong>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ===== ALIADOS SECTION ===== */}
      <section style={{ padding: "64px 0", background: "#f8f9fa" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "1.2rem", color: "#666", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "40px" }}>Aliados</h2>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            gap: "48px",
            flexWrap: "wrap"
          }}>
            {aliados.map((aliado, index) => (
              <div key={index} style={{ position: "relative", width: "150px", height: "80px" }}>
                <Image 
                  src={aliado.logo} 
                  alt={`Logo ${aliado.name}`}
                  fill
                  className="aliado-logo"
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="section" aria-labelledby="cta-heading" style={{ background: "var(--color-primary-dark)", color: "#fff", padding: "80px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 id="cta-heading" className="section-title" style={{ textAlign: "center", color: "#fff", marginBottom: "16px" }}>
            ¿Querés ser parte?
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto 40px", color: "rgba(255,255,255,0.9)", maxWidth: "600px" }}>
            Sumate como voluntario, inscribí a tu equipo en la liga, o apoyá con
            una donación. Cada aporte construye una sociedad más inclusiva.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/inscripcion" className="btn btn-lg" style={{ background: "var(--color-accent-orange)", color: "#fff" }}>
              <Users size={20} aria-hidden="true" />
              Inscribir equipo
            </Link>
            <a
              href="https://donaronline.org/asociacion-civil-andar/suma-tu-apoyo-al-futbol-inclusivo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg"
              style={{ background: "#fff", color: "var(--color-primary-dark)" }}
            >
              <Heart size={20} aria-hidden="true" />
              Donar ahora
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
