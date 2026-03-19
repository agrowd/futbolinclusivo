import Link from "next/link";
import { Users, History, Target, Heart, ArrowRight } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Institucional - Premium",
  description: "Conocé la historia, misión y objetivos de la Asociación Civil Andar y la Liga de Fútbol Inclusiva.",
};

export default function InstitucionalPage() {
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
            LA ASOCIACIÓN
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px" }}>Institucional</h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            EL FÚTBOL COMO HERRAMIENTA DE INCLUSIÓN SOCIAL. El fútbol tiene un arraigo particular en la cultura argentina. Su poder es ampliamente movilizador y nos permite generar un espacio masivo de participación colectiva donde el eje no es la competencia si no la equiparación de oportunidades.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: "100px 0" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-20 items-start">
            
            <div>
              <h2 style={{ fontSize: "2.8rem", fontWeight: 900, marginBottom: "32px", lineHeight: 1.1, letterSpacing: "-1px" }}>
                MÁS DE 25 AÑOS <br/>
                <span style={{ color: "var(--color-primary-light)" }}>CONSTRUYENDO INCLUSIÓN.</span>
              </h2>
              <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "48px" }}>
                La Asociación Civil Andar nace de la convicción de que todas las personas tienen un enorme potencial. A través de la Liga de Fútbol Inclusiva, hemos logrado que miles de jóvenes encuentren en el deporte una herramienta para el desarrollo y la autonomía.
              </p>
              
              <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "48px" }}>
                Buscamos a través de la revalorización colectiva y personal darle visibilidad a un colectivo que ve vulnerado sus derechos permanentemente en nuestro país. La situación de discapacidad que atraviesa una persona le impone prejuicios y limitaciones que no son propios de esas personas, si no el resultado de una sociedad que no toma en cuenta sus necesidades y peculiaridades.
              </p>
              
              <div style={{ display: "grid", gap: "32px" }}>
                <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", background: "rgba(255,255,255,0.02)", padding: "30px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ background: "rgba(230,126,34,0.1)", color: "#E67E22", padding: "12px", borderRadius: "8px" }}>
                    <Target size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "10px" }}>Nuestra Misión</h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>Promover la inclusión a través del fútbol</p>
                  </div>
                </div>
                
                <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", background: "rgba(255,255,255,0.02)", padding: "30px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ background: "rgba(41,128,185,0.1)", color: "#2980B9", padding: "12px", borderRadius: "8px" }}>
                    <Heart size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "10px" }}>Nuestra Visión</h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>Una sociedad que brinde igualdad de oportunidades a todas las personas, independientemente de sus características individuales.</p>
                  </div>
                </div>
                
                <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", background: "rgba(0,141,77,0.1)", padding: "30px", borderRadius: "12px", border: "1px solid rgba(0,141,77,0.2)" }}>
                  <div style={{ background: "rgba(0,141,77,0.2)", color: "var(--color-primary-light)", padding: "12px", borderRadius: "8px" }}>
                    <Users size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "10px" }}>Nuestro Objetivo</h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>Derribar mitos y aportar a una inclusión plena de todas las personas, más allá de la condición que puedan tener o atravesar.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Cards */}
            <div style={{ display: "grid", gap: "24px" }}>
              <Link href="/institucional/propósito" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "0",
                borderRadius: "16px",
                textDecoration: "none",
                display: "block",
                transition: "all 0.3s",
                overflow: "hidden"
              }} className="side-card">
                <div style={{ 
                  position: "relative", 
                  width: "100%", 
                  height: "180px", 
                  overflow: "hidden"
                }}>
                  <Image 
                    src="https://futbolinclusivo.org.ar/app/uploads/2017/12/nosotros-campo4.jpg"
                    alt="Nuestro propósito"
                    fill
                    style={{ objectFit: "cover", opacity: 0.8 }}
                    sizes="400px"
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 0%, rgba(0,11,26,0.8) 100%)"
                  }} />
                  <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                      <Target size={24} color="var(--color-primary-light)" />
                      <ArrowRight size={16} color="rgba(255,255,255,0.4)" />
                    </div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: "5px" }}>Nuestro Propósito</h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Conocé nuestra misión y visión como herramienta de inclusión social.</p>
                  </div>
                </div>
              </Link>

              <Link href="/institucional/historia" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "0",
                borderRadius: "16px",
                textDecoration: "none",
                display: "block",
                transition: "all 0.3s",
                overflow: "hidden"
              }} className="side-card">
                <div style={{ 
                  position: "relative", 
                  width: "100%", 
                  height: "180px", 
                  overflow: "hidden"
                }}>
                  <Image 
                    src="https://futbolinclusivo.org.ar/app/uploads/2017/10/adidas-football-for-hope-exchange@2x.jpg"
                    alt="Nuestra historia"
                    fill
                    style={{ objectFit: "cover", opacity: 0.8 }}
                    sizes="400px"
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 0%, rgba(0,11,26,0.8) 100%)"
                  }} />
                  <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                      <History size={24} color="var(--color-primary-light)" />
                      <ArrowRight size={16} color="rgba(255,255,255,0.4)" />
                    </div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: "5px" }}>Nuestra Historia</h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Recorré los hitos que marcaron el nacimiento y la expansión desde 1998.</p>
                  </div>
                </div>
              </Link>

              <Link href="/institucional/campo" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "0",
                borderRadius: "16px",
                textDecoration: "none",
                display: "block",
                transition: "all 0.3s",
                overflow: "hidden"
              }} className="side-card">
                <div style={{ 
                  position: "relative", 
                  width: "100%", 
                  height: "180px", 
                  overflow: "hidden"
                }}>
                  <Image 
                    src="https://futbolinclusivo.org.ar/app/uploads/2017/12/nosotros-.jpg"
                    alt="Nuestro campo"
                    fill
                    style={{ objectFit: "cover", opacity: 0.8 }}
                    sizes="400px"
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 0%, rgba(0,11,26,0.8) 100%)"
                  }} />
                  <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                      <Target size={24} color="#E67E22" />
                      <ArrowRight size={16} color="rgba(255,255,255,0.4)" />
                    </div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: "5px" }}>Nuestro Campo</h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Conocé nuestras instalaciones y espacios deportivos adaptados.</p>
                  </div>
                </div>
              </Link>

              <Link href="/institucional/equipo" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "0",
                borderRadius: "16px",
                textDecoration: "none",
                display: "block",
                transition: "all 0.3s",
                overflow: "hidden"
              }} className="side-card">
                <div style={{ 
                  position: "relative", 
                  width: "100%", 
                  height: "180px", 
                  overflow: "hidden"
                }}>
                  <Image 
                    src="https://futbolinclusivo.org.ar/app/uploads/2017/12/nosotros-.jpg"
                    alt="Nuestro equipo"
                    fill
                    style={{ objectFit: "cover", opacity: 0.8 }}
                    sizes="400px"
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 0%, rgba(0,11,26,0.8) 100%)"
                  }} />
                  <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                      <Users size={24} color="#E67E22" />
                      <ArrowRight size={16} color="rgba(255,255,255,0.4)" />
                    </div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: "5px" }}>Nuestro Equipo</h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Conocé al equipo humano de profesionales y voluntarios que lidera Andar.</p>
                  </div>
                </div>
              </Link>

              <Link href="/institucional/aliados" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "0",
                borderRadius: "16px",
                textDecoration: "none",
                display: "block",
                transition: "all 0.3s",
                overflow: "hidden"
              }} className="side-card">
                <div style={{ 
                  position: "relative", 
                  width: "100%", 
                  height: "180px", 
                  overflow: "hidden"
                }}>
                  <Image 
                    src="https://futbolinclusivo.org.ar/app/uploads/2017/10/adidas-football-for-hope-exchange@2x.jpg"
                    alt="Nuestros aliados"
                    fill
                    style={{ objectFit: "cover", opacity: 0.8 }}
                    sizes="400px"
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 0%, rgba(0,11,26,0.8) 100%)"
                  }} />
                  <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                      <Heart size={24} color="#2980B9" />
                      <ArrowRight size={16} color="rgba(255,255,255,0.4)" />
                    </div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: "5px" }}>Nuestros Aliados</h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Conocé las organizaciones que confían en nuestro proyecto.</p>
                  </div>
                </div>
              </Link>

              <Link href="/institucional/impacto" style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "0",
                borderRadius: "16px",
                textDecoration: "none",
                display: "block",
                transition: "all 0.3s",
                overflow: "hidden"
              }} className="side-card">
                <div style={{ 
                  position: "relative", 
                  width: "100%", 
                  height: "180px", 
                  overflow: "hidden"
                }}>
                  <Image 
                    src="https://futbolinclusivo.org.ar/app/uploads/2017/12/nosotros-campo4.jpg"
                    alt="Nuestro impacto"
                    fill
                    style={{ objectFit: "cover", opacity: 0.8 }}
                    sizes="400px"
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 0%, rgba(0,11,26,0.8) 100%)"
                  }} />
                  <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                      <Target size={24} color="var(--color-primary-light)" />
                      <ArrowRight size={16} color="rgba(255,255,255,0.4)" />
                    </div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: "5px" }}>Nuestro Impacto</h3>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Conocé los números y resultados de nuestro trabajo.</p>
                  </div>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
