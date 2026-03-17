import { Map, Trophy, Network, Star, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Liga Nacional - Premium Experience",
  description: "Una red federal que expande el modelo deportivo a todo el país.",
};

const sedesNacionales = [
  { region: "Río Negro", title: "LFI RÍO NEGRO", slug: "rio-negro", email: "deportes@cipolletti.gov.ar", desc: "Desde 2010 la Escuela Municipal de Cipolletti lidera la red en la Patagonia. Participan más de 270 jóvenes de 40 organizaciones de la provincia rionegrina." },
  { region: "Mendoza", title: "LFI MENDOZA", slug: "mendoza", email: "aledavila@hotmail.com", desc: "Coordinada desde San Rafael por el Programa Deporte Especial. Cuenta con 24 equipos y un cuerpo de 32 voluntarios activos desde el 2008." },
  { region: "Tucumán", title: "LFI TUCUMÁN", slug: "tucuman", email: "cariverosa@hotmail.com", desc: "Organizada por la Fundación Valores Especiales, articula con los principales clubes de la provincia e involucra a más de 100 voluntarios." },
  { region: "Jujuy", title: "LFI JUJUY", slug: "jujuy", email: null, desc: "Sede federal operada por la Fundación Valencia de Jujuy, llevando el fútbol inclusivo al extremo norte de nuestro país." },
];

export default function LigaNacional() {
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
            background: "rgba(41,128,185,0.1)", 
            color: "#2980B9",
            padding: "8px 16px", 
            borderRadius: "4px", 
            marginBottom: "24px", 
            fontSize: "0.75rem", 
            fontWeight: 800, 
            letterSpacing: "2px" 
          }}>
            PROYECTO FEDERAL
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px", letterSpacing: "-1.5px" }}>Liga Nacional</h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            Expandiendo una metodología de éxito a cada rincón de la Argentina a través de una red federal de cooperación.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ padding: "80px 0" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
              <h2 style={{ fontSize: "2.2rem", fontWeight: 900, marginBottom: "30px", letterSpacing: "-1px" }}>UNA RED DE TRABAJO EN CONJUNTO</h2>
              <p style={{ fontSize: "1.3rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: "850px", margin: "0 auto" }}>
                La Liga de Fútbol Inclusiva ha extendido sus fronteras y se replica en distintos puntos del país gracias al trabajo con organizaciones que promueven el deporte como herramienta de inclusión.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gap: "32px" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--color-primary-light)", letterSpacing: "2px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <Map size={24} /> SEDES NACIONALES ACTIVAS
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {sedesNacionales.map((sede, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div style={{ 
                    background: "rgba(255,255,255,0.03)", 
                    padding: "40px", 
                    borderRadius: "16px", 
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "all 0.3s"
                  }} className="hover:bg-white/10 hover:border-white/20 hover:-translate-y-1">
                    <span style={{ color: "var(--color-primary-light)", fontWeight: 800, fontSize: "0.75rem", letterSpacing: "1.5px" }}>{sede.region.toUpperCase()}</span>
                    <h4 style={{ fontSize: "1.8rem", fontWeight: 900, marginTop: "10px", marginBottom: "20px", color: "#fff" }}>{sede.title}</h4>
                    <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "30px", fontSize: "1.05rem" }}>
                      {sede.desc}
                    </p>
                    {sede.email && (
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "20px", fontSize: "0.9rem" }}>
                        <span style={{ opacity: 0.3, fontWeight: 700 }}>CONTACTO: </span>
                        <a href={`mailto:${sede.email}`} style={{ color: "var(--color-primary-light)", textDecoration: "none", fontWeight: 700 }}>{sede.email}</a>
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER ACTION */}
      <section style={{ padding: "80px 20px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ background: "rgba(41,128,185,0.05)", padding: "60px", borderRadius: "24px", border: "1px solid rgba(41,128,185,0.1)" }}>
             <Network size={40} color="#2980B9" style={{ margin: "0 auto 20px" }} />
             <h3 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "20px" }}>¿QUERÉS QUE TU CIUDAD SEA SEDE?</h3>
             <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "550px", margin: "0 auto 30px" }}>
               Buscamos organizaciones comprometidas para seguir expandiendo la Red Federal de Fútbol Inclusivo en toda la Argentina.
             </p>
             <Link href="/contacto" className="btn btn-lg" style={{ background: "#2980B9", color: "#fff", fontWeight: 800 }}>PONERSE EN CONTACTO</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
