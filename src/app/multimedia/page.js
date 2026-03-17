import { Image as ImageIcon, Video, FileText, Newspaper, FileOutput, PlayCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Multimedia - Fútbol Inclusivo",
  description: "Galería de fotos, videos, revista, prensa y documentos útiles.",
};

const multimediaSections = [
  {
    title: "Fotos y Videos",
    description: "Reviví los mejores momentos de la Liga de Fútbol Inclusiva a lo largo de los años. Galerías de todos nuestros programas.",
    icon: PlayCircle,
    href: "/novedades",
    colorClass: "text-primary",
    bgColorClass: "bg-primary/10",
  },
  {
    title: "Revista Oficial",
    description: "Leé las ediciones digitales de nuestra revista institucional, con entrevistas y coberturas especiales.",
    icon: FileText,
    href: "/institucional/nosotros",
    colorClass: "text-accent-orange",
    bgColorClass: "bg-orange-100",
  },
  {
    title: "Prensa y Recortes",
    description: "La Asociación Civil Andar en los medios de comunicación locales y nacionales.",
    icon: Newspaper,
    href: "/novedades",
    colorClass: "text-accent-blue",
    bgColorClass: "bg-blue-100",
  },
  {
    title: "Documentos Útiles",
    description: "Descargá reglamentos, fichas médicas, protocolos y balances de la Asociación.",
    icon: FileOutput,
    href: "/contacto",
    colorClass: "text-secondary",
    bgColorClass: "bg-gray-200",
  },
];

export default function MultimediaPage() {
  return (
    <div className="bg-[#000B1A] text-white min-h-screen pt-48 pb-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-[#36b37e]/10 text-[#36b37e] px-4 py-1.5 rounded font-black text-[10px] tracking-widest mb-8 uppercase border border-[#36b37e]/20">
            <PlayCircle size={14} />
            CONTENIDO
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none text-white">
            Multimedia
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-medium">
            Reviví los momentos que definen nuestra historia a través de imágenes, videos y documentos oficiales.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {multimediaSections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <Link 
                href={section.href} 
                key={idx}
                className="group relative bg-white/[0.02] border border-white/5 p-10 rounded-[40px] transition-all hover:bg-white/[0.05] hover:border-white/10 hover:-translate-y-2 shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#36b37e]/5 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-[#36b37e]/10 transition-all duration-700" />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-[#36b37e] rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-[#36b37e]/20 group-hover:rotate-6 transition-transform`}>
                    <Icon size={32} aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-[#36b37e] transition-colors tracking-tight uppercase leading-tight">
                    {section.title}
                  </h2>
                  <p className="text-white/50 text-base md:text-lg leading-relaxed mb-8 font-medium">
                    {section.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-[#36b37e] font-black text-xs tracking-widest uppercase pb-1 border-b-2 border-transparent group-hover:border-[#36b37e] transition-all">
                    Explorar <ChevronRight size={18} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-20 bg-gradient-to-br from-[#001A3D] to-[#000B1A] p-12 rounded-[40px] border border-white/5 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#36b37e]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter relative z-10">¿Tenés material audiovisual?</h3>
          <p className="text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
            Si tenés fotos o videos históricos de la Liga y querés que formen parte de nuestro archivo compartido, nos encantaría recibirlos.
          </p>
          <Link href="/contacto" className="relative z-10 inline-flex px-10 py-5 bg-[#36b37e] text-white font-black rounded-2xl shadow-[0_0_30px_rgba(54,179,126,0.3)] hover:bg-[#2da372] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs">
            ENVIAR MATERIAL
          </Link>
        </div>
      </div>
    </div>
  );
}
