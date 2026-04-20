import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import dbConnect from "@/lib/mongodb";
import Page from "@/lib/schemas/Page";
import DynamicIcon from "@/components/ui/DynamicIcon";

// Fallbacks nativos si no hay datos en CMS
const DEFAULT_PROGRAMS = [
  {
    title: "Escuela de Fútbol Inclusivo (EFI)",
    description: "Proyecto formativo para niños y jóvenes de 6 a 18 años de comunidades vulnerables.",
    href: "/programas/escuela",
    icon: "GraduationCap",
    color: "var(--color-primary-light)",
    stat_1_label: "EDAD",
    stat_1_value: "6-18 años",
    stat_2_label: "PARTICIPANTES",
    stat_2_value: "200+ niños",
    caracteristicas: ["Espacio inclusivo", "Desarrollo integral"]
  },
  {
    title: "Liga de Fútbol Inclusiva BA",
    description: "El torneo más importante de la Provincia de Buenos Aires.",
    href: "/programas/liga-ba",
    icon: "Trophy",
    color: "#E67E22",
    stat_1_label: "EQUIPOS",
    stat_1_value: "100+ equipos",
    stat_2_label: "ZONAS",
    stat_2_value: "20+ zonas",
    caracteristicas: ["Testeo equitativo", "Finales en AFA"]
  }
];

export async function generateMetadata() {
  await dbConnect();
  const pageData = await Page.findOne({ slug: "programas", published: true }).lean();
  return {
    title: pageData?.metadata?.metaTitle || "Nuestros Programas - Fútbol Inclusivo",
    description: pageData?.metadata?.metaDescription || "Conocé todos los programas deportivos y sociales.",
  };
}

export default async function ProgramasPage() {
  await dbConnect();
  const cmsPage = await Page.findOne({ slug: "programas", published: true }).lean();
  
  const heroLabel = cmsPage?.data?.hero_label || "QUÉ HACEMOS";
  const heroTitle = cmsPage?.data?.hero_title || "Nuestros Programas";
  const heroDescription = cmsPage?.data?.hero_description || "Desarrollamos una metodología integral de intervención social y deportiva.";
  
  const programs = cmsPage?.data?.programs_list?.length > 0 
    ? cmsPage.data.programs_list 
    : DEFAULT_PROGRAMS;

  const ctaTitle = cmsPage?.data?.cta_title || "¿QUERÉS INSCRIBIR A TU INSTITUCIÓN?";
  const ctaDescription = cmsPage?.data?.cta_description || "Registrá a tu equipo en la Liga BA o la Liga Nacional de manera 100% online.";

  return (
    <div style={{ background: "#000B1A", color: "#fff", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section style={{ 
        background: "linear-gradient(to bottom, #001A3D, #000B1A)", 
        padding: "180px 0 60px",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ 
            display: "inline-flex", 
            background: "rgba(0,141,77,0.1)", 
            color: "#36b37e",
            padding: "8px 16px", 
            borderRadius: "4px", 
            marginBottom: "24px", 
            fontSize: "0.75rem", 
            fontWeight: 800, 
            letterSpacing: "2px" 
          }}>
            {heroLabel}
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px", letterSpacing: "-1.5px" }}>{heroTitle}</h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            {heroDescription}
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section" style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "40px" }}>
            {programs.map((prog, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                    borderRadius: "24px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    transition: "all 0.4s ease",
                    position: "relative"
                  }} className="group hover:bg-white/5">
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: prog.color || "#36b37e"
                    }} />
                    
                    <div style={{ padding: "40px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <div className="mb-6 flex items-center justify-between">
                         <div style={{ 
                           width: "60px", height: "60px", borderRadius: "16px", 
                           background: `${prog.color || "#36b37e"}15`, 
                           display: "flex", alignItems: "center", justifyContent: "center",
                           color: prog.color || "#36b37e" 
                         }}>
                           <DynamicIcon name={prog.icon || "BookOpen"} size={32} />
                         </div>
                      </div>

                      <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#fff", marginBottom: "16px", lineHeight: 1.2 }}>
                        {prog.title}
                      </h2>
                      <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, flexGrow: 1, marginBottom: "30px" }}>
                        {prog.description}
                      </p>
                      
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "30px" }}>
                         <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                            <p className="text-[10px] text-white/30 uppercase font-black">{prog.stat_1_label}</p>
                            <p className="text-sm font-bold text-white">{prog.stat_1_value}</p>
                         </div>
                         <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                            <p className="text-[10px] text-white/30 uppercase font-black">{prog.stat_2_label}</p>
                            <p className="text-sm font-bold text-white">{prog.stat_2_value}</p>
                         </div>
                      </div>
                      
                      <Link href={prog.href || "#"} style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        padding: "16px 32px",
                        borderRadius: "12px",
                        background: prog.color || "#36b37e",
                        color: "#fff",
                        fontWeight: 800,
                        textDecoration: "none",
                        fontSize: "0.95rem",
                        transition: "all 0.3s",
                        textTransform: "uppercase"
                      }}>
                        CONOCER MÁS <ChevronRight size={18} />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section" style={{ padding: "100px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ background: "rgba(0,141,77,0.05)", padding: "60px", borderRadius: "24px", border: "1px solid rgba(0,141,77,0.1)" }}>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, marginBottom: "20px", letterSpacing: "-1.5px" }}>
              {ctaTitle}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "600px", margin: "0 auto 40px", fontSize: "1.1rem" }}>
              {ctaDescription}
            </p>
            <Link href="/inscripcion" className="btn btn-lg" style={{ 
              background: "#36b37e", 
              color: "#fff",
              fontWeight: 800,
              padding: "18px 40px"
            }}>
              IR AL PORTAL DE INSCRIPCIÓN
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
