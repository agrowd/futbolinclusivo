import { Map, Trophy, Network, MessageSquare, Flame } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Festival LATAM - Premium Experience",
  description: "Encuentro internacional de organizaciones promovido por la Asociación Civil Andar.",
};

const orgLatam = [
  { country: "Brasil", color: "#27AE60", orgs: [{ n: "Fundação Eprocad", p: "Formación integral de niños y adolescentes.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/02-logo-eprocad.jpg" }, { n: "I. Fazer Acontecer", p: "Actividades educativas orientadas al deporte.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/03-logo-fazer-acontecer.jpg" }, { n: "Instituto Formação", p: "Desarrollo sostenible regional.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/04-logo-formacao.jpg" }] },
  { country: "Chile", color: "#C0392B", orgs: [{ n: "Fundacion Educere", p: "Programas educativos y liderazgo juvenil.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/05-logo-educere.jpg" }, { n: "Futbol Más", p: "Resiliencia y felicidad en la infancia.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/06-logo-futbol-mas.jpg" }] },
  { country: "Colombia", color: "#F1C40F", orgs: [{ n: "F. Tiempo De Juego", p: "Habilidades para la vida mediante el deporte.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/07-logo-tiempo-de-juego.jpg" }, { n: "Futbol Con Corazón", p: "Promoviendo respeto y solidaridad.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/08-logo-futbol-con-corazon.jpg" }] },
  { country: "Perú / Uruguay", color: "#2980B9", orgs: [{ n: "Los Pioneros", p: "Cambios positivos usando el fútbol.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/13-logo-los-pioneros.jpg" }, { n: "Gurises Unidos", p: "Protección de derechos infantiles.", img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/16-logo-gurises-unidos.jpg" }] },
];

export default function FestivalLatam() {
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
            background: "rgba(230,126,34,0.1)", 
            color: "#E67E22",
            padding: "8px 16px", 
            borderRadius: "4px", 
            marginBottom: "24px", 
            fontSize: "0.75rem", 
            fontWeight: 800, 
            letterSpacing: "2px" 
          }}>
            EVENTO INTERNACIONAL
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px", letterSpacing: "-1.5px" }}>Festival Latinoamericano <br/> de Fútbol 3</h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            Empoderamiento juvenil, igualdad de género e inclusión social en toda la región.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ padding: "80px 0" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          
          <div style={{ display: "grid", gap: "60px" }}>
            
            <FadeIn>
              <div style={{ background: "rgba(255,255,255,0.02)", padding: "40px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#E67E22", marginBottom: "24px", display: "flex", alignItems: "center", gap: "15px" }}>
                  <Flame size={24} /> RESUMEN DEL FESTIVAL
                </h2>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.15rem", lineHeight: 1.7 }}>
                  Más de 140 jóvenes de 16 organizaciones y 10 países se reunieron en Buenos Aires para demostrar el poder del fútbol como herramienta de transformación social. Un hito regional impulsado por Andar y streetfootballworld.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div style={{ background: "rgba(41,128,185,0.03)", padding: "40px", borderRadius: "16px", border: "1px solid rgba(41,128,185,0.1)" }}>
                  <MessageSquare size={32} color="#2980B9" style={{ marginBottom: "20px" }} />
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 900, marginBottom: "15px" }}>FORO JUVENIL</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>Líderes de toda la región compartieron experiencias de vida en el Hotel Sheraton, debatiendo sobre cómo el fútbol permite vencer situaciones de vulnerabilidad.</p>
                </div>
                <div style={{ background: "rgba(230,126,34,0.03)", padding: "40px", borderRadius: "16px", border: "1px solid rgba(230,126,34,0.1)" }}>
                  <Trophy size={32} color="#E67E22" style={{ marginBottom: "20px" }} />
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 900, marginBottom: "15px" }}>TORNEO AFA</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>El Predio Julio H. Grondona de Ezeiza albergó el torneo central, donde los valores y el respeto fueron tan importantes como los goles.</p>
                </div>
              </div>
            </FadeIn>

            {/* Organizations */}
            <FadeIn delay={0.2}>
              <div>
                <h2 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "50px", textAlign: "center", letterSpacing: "-1px" }}>ORGANIZACIONES PARTICIPANTES</h2>
                <div style={{ display: "grid", gap: "60px" }}>
                  {orgLatam.map((group, idx) => (
                    <div key={idx}>
                      <h3 style={{ 
                        fontSize: "0.8rem", 
                        fontWeight: 900, 
                        color: group.color, 
                        letterSpacing: "3px", 
                        marginBottom: "30px", 
                        borderLeft: `4px solid ${group.color}`,
                        paddingLeft: "15px" 
                      }}>{group.country.toUpperCase()}</h3>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                        {group.orgs.map((org, oidx) => (
                          <div key={oidx} style={{
                            background: "rgba(255,255,255,0.03)",
                            padding: "30px",
                            borderRadius: "12px",
                            border: "1px solid rgba(255,255,255,0.05)",
                            textAlign: "center",
                            transition: "all 0.3s"
                          }} className="hover:bg-white/10 hover:border-white/20 hover:-translate-y-1">
                            <div style={{ 
                              width: "80px", 
                              height: "80px", 
                              background: "#fff",
                              borderRadius: "8px",
                              padding: "10px",
                              margin: "0 auto 20px"
                            }}>
                              <img src={org.img} alt={org.n} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                            </div>
                            <h4 style={{ fontWeight: 800, marginBottom: "10px", color: "#fff" }}>{org.n}</h4>
                            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", lineHeight: 1.5 }}>{org.p}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

    </div>
  );
}
