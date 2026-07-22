import Link from "next/link";
import Image from "next/image";
import { Users, History, Target, Heart, ArrowRight } from "lucide-react";
import { CMS_FALLBACKS } from "@/lib/cmsFallbacks";
import Timeline from "@/components/ui/Timeline";

export default function GenericCmsPage({ slug, fallbackTitle, fallbackSubtitle }) {
  const fallback = CMS_FALLBACKS[slug] || {};

  const title = fallback.title || fallbackTitle;
  const content = fallback.content || "";
  const subtitle = fallback.excerpt || fallbackSubtitle;
  const pageData = fallback.data || {};

  const sidebarLinks = [
    { href: "/institucional/nosotros", title: "Nuestro Propósito", desc: "Misión y visión institucional.", icon: Target, img: "https://futbolinclusivo.org.ar/app/uploads/2017/12/nosotros-campo4.jpg", color: "var(--color-primary-light)" },
    { href: "/institucional/historia", title: "Nuestra Historia", desc: "Hitos desde 1998.", icon: History, img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/adidas-football-for-hope-exchange@2x.jpg", color: "var(--color-primary-light)" },
    { href: "/institucional/campo", title: "Nuestro Campo", desc: "Instalaciones deportivas.", icon: Target, img: "https://futbolinclusivo.org.ar/app/uploads/2017/12/nosotros-.jpg", color: "#E67E22" },
    { href: "/institucional/comision", title: "Nuestro Equipo", desc: "Profesionales y voluntarios.", icon: Users, img: "https://futbolinclusivo.org.ar/app/uploads/2017/12/nosotros-.jpg", color: "#E67E22" },
    { href: "/institucional/aliados", title: "Aliados", desc: "Nuestras redes de apoyo.", icon: Heart, img: "https://futbolinclusivo.org.ar/app/uploads/2017/10/adidas-football-for-hope-exchange@2x.jpg", color: "#2980B9" },
    { href: "/institucional/impacto", title: "Impacto", desc: "Resultados de nuestro trabajo.", icon: Target, img: "https://futbolinclusivo.org.ar/app/uploads/2017/12/nosotros-campo4.jpg", color: "var(--color-primary-light)" },
  ];

  return (
    <div className="bg-[#030712] text-white min-h-screen">
      {/* Hero Section with Image (Legacy Style) */}
      <section className="relative pt-40 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://futbolinclusivo.org.ar/app/uploads/2017/12/nosotros-campo4.jpg"
            alt="Hero Background"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/50 to-[#030712]" />
        </div>
        
        <div className="container relative z-10 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1 bg-[#36b37e]/10 text-[#36b37e] rounded font-black text-[10px] tracking-widest uppercase mb-6">
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

      {/* Main Content with Sidebar (Legacy Style) */}
      <section className="py-20 md:py-32">
        <div className="container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 md:gap-24 items-start">
            
            {/* Left Column: Content */}
            <div className="space-y-12">
              {content ? (
                <div 
                  className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-white/60 prose-p:leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <div className="text-center py-20 bg-white/5 rounded-[40px] border border-white/10 border-dashed">
                   <p className="text-white/20 font-black uppercase tracking-widest text-xs">Contenido en preparación</p>
                </div>
              )}

              {/* Mission/Vision Cards (Only if pageData provides them or on specific slugs) */}
              {(slug === "institucional" || slug === "nosotros") && (
                <div className="grid gap-6 mt-12">
                   <div className="flex gap-6 items-start bg-white/[0.02] p-8 rounded-2xl border border-white/5 shadow-xl">
                      <div className="bg-[#E67E22]/10 p-4 rounded-xl text-[#E67E22]"><Target size={28} /></div>
                      <div>
                        <h3 className="text-xl font-black uppercase mb-2">Nuestra Misión</h3>
                        <p className="text-white/50 leading-relaxed">{pageData.mission_desc || "Promover la inclusión a través del fútbol."}</p>
                      </div>
                   </div>
                   <div className="flex gap-6 items-start bg-white/[0.02] p-8 rounded-2xl border border-white/5 shadow-xl">
                      <div className="bg-[#2980B9]/10 p-4 rounded-xl text-[#2980B9]"><Heart size={28} /></div>
                      <div>
                        <h3 className="text-xl font-black uppercase mb-2">Nuestra Visión</h3>
                        <p className="text-white/50 leading-relaxed">Una sociedad que brinde igualdad de oportunidades a todos.</p>
                      </div>
                   </div>
                </div>
              )}

              {slug === "historia" && <Timeline />}
            </div>

            {/* Right Column: Sidebar */}
            <aside className="space-y-6">
               <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#36b37e] mb-8">Otras Secciones</h3>
               <div className="grid gap-4">
                  {sidebarLinks.filter(l => !l.href.includes(slug)).map((link, idx) => (
                    <Link key={idx} href={link.href} className="group relative block overflow-hidden rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#36b37e]/30 transition-all">
                       <div className="relative h-40 w-full overflow-hidden">
                          <Image src={link.img} alt={link.title} fill className="object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
                          <div className="absolute inset-x-5 bottom-5">
                             <div className="flex items-center justify-between mb-2">
                                <link.icon size={20} className="text-[#36b37e]" />
                                <ArrowRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
                             </div>
                             <h4 className="text-lg font-black uppercase leading-none">{link.title}</h4>
                             <p className="text-[10px] text-white/40 font-bold uppercase mt-1">{link.desc}</p>
                          </div>
                       </div>
                    </Link>
                  ))}
               </div>
            </aside>

          </div>
        </div>
      </section>
    </div>
  );
}
