import Link from "next/link";
import { Users, History, Target, Heart, ArrowRight, Shield, Award, Sparkles } from "lucide-react";
import { CMS_FALLBACKS } from "@/lib/cmsFallbacks";
import Timeline from "@/components/ui/Timeline";

export default function GenericCmsPage({ slug, fallbackTitle, fallbackSubtitle }) {
  const fallback = CMS_FALLBACKS[slug] || {};

  const title = fallback.title || fallbackTitle;
  const content = fallback.content || "";
  const subtitle = fallback.excerpt || fallbackSubtitle;
  const pageData = fallback.data || {};

  const sidebarLinks = [
    { href: "/institucional/nosotros", title: "Nuestro Propósito", desc: "Misión y visión institucional.", icon: Target, color: "#36b37e" },
    { href: "/institucional/historia", title: "Nuestra Historia", desc: "Hitos desde 1998.", icon: History, color: "#2ecc71" },
    { href: "/institucional/campo", title: "Nuestro Campo", desc: "Instalaciones deportivas.", icon: Shield, color: "#E67E22" },
    { href: "/institucional/comision", title: "Nuestro Equipo", desc: "Profesionales y voluntarios.", icon: Users, color: "#f39c12" },
    { href: "/institucional/aliados", title: "Aliados", desc: "Nuestras redes de apoyo.", icon: Heart, color: "#2980B9" },
    { href: "/institucional/impacto", title: "Impacto", desc: "Resultados de nuestro trabajo.", icon: Award, color: "#9b59b6" },
  ];

  return (
    <div className="bg-[#000B1A] text-white min-h-screen">
      {/* Hero Section with Modern Theme Background */}
      <section className="relative pt-40 pb-20 overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#001A3D] to-[#000B1A]">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#36b37e_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="container relative z-10 px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1 bg-[#36b37e]/15 text-[#36b37e] border border-[#36b37e]/30 rounded-full font-black text-[10px] tracking-widest uppercase mb-6">
              INSTITUCIONAL
            </div>
            <h1 className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-medium max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-20 md:py-32">
        <div className="container px-6 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 md:gap-20 items-start">
            
            {/* Left Column: Content */}
            <div className="space-y-12">
              {content ? (
                <div 
                  className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-white/70 prose-p:leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <div className="text-center py-20 bg-white/[0.02] rounded-[32px] border border-white/10 border-dashed">
                  <p className="text-white/30 font-black uppercase tracking-widest text-xs">Contenido en preparación</p>
                </div>
              )}

              {/* Mission/Vision Cards */}
              {(slug === "institucional" || slug === "nosotros") && (
                <div className="grid gap-6 mt-12">
                  <div className="flex gap-6 items-start bg-white/[0.02] p-8 rounded-3xl border border-white/10 shadow-xl">
                    <div className="bg-[#E67E22]/20 p-4 rounded-2xl text-[#E67E22] border border-[#E67E22]/30">
                      <Target size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase mb-2">Nuestra Misión</h3>
                      <p className="text-white/60 leading-relaxed">{pageData.mission_desc || "Promover la inclusión social y la igualdad de oportunidades a través del fútbol y el deporte adaptado."}</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start bg-white/[0.02] p-8 rounded-3xl border border-white/10 shadow-xl">
                    <div className="bg-[#36b37e]/20 p-4 rounded-2xl text-[#36b37e] border border-[#36b37e]/30">
                      <Heart size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase mb-2">Nuestra Visión</h3>
                      <p className="text-white/60 leading-relaxed">Una sociedad justa, solidaria e inclusiva donde cada persona ejerza plenamente sus derechos a través del juego.</p>
                    </div>
                  </div>
                </div>
              )}

              {slug === "historia" && <Timeline />}
            </div>

            {/* Right Column: Sidebar */}
            <aside className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#36b37e] mb-6">Otras Secciones</h3>
              <div className="grid gap-4">
                {sidebarLinks.filter(l => !l.href.includes(slug)).map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={idx}
                      href={link.href}
                      className="group relative block overflow-hidden rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#36b37e]/40 p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110 shadow-md"
                          style={{
                            backgroundColor: `${link.color}20`,
                            color: link.color,
                            borderColor: `${link.color}40`,
                          }}
                        >
                          <Icon size={22} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-base font-black uppercase text-white tracking-tight group-hover:text-[#36b37e] transition-colors truncate">
                              {link.title}
                            </h4>
                            <ArrowRight size={14} className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                          </div>
                          <p className="text-xs text-white/50 leading-relaxed">
                            {link.desc}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </aside>

          </div>
        </div>
      </section>
    </div>
  );
}
