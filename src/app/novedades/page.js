import Link from "next/link";
import { Newspaper, Calendar, ArrowRight, Trophy } from "lucide-react";

export const metadata = {
  title: "Novedades",
  description: "Últimas noticias y novedades de la Liga de Fútbol Inclusiva y la Asociación Civil Andar.",
};

const news = [
  {
    date: "May 2024",
    title: "Ceremonia de Apertura 2024",
    excerpt: "La Liga de Fútbol Inclusiva abrió su temporada 2024 con una ceremonia que reunió a todas las instituciones participantes.",
    href: "/novedades/apertura-2024",
  },
  {
    date: "Feb 2024",
    title: "Torneo de Verano \"AFA Somos Todxs\"",
    excerpt: "En el marco de la colaboración con AFA, se realizó el sorteo y conformación de grupos para el Torneo de Verano.",
    href: "/novedades/torneo-verano-afa",
  },
  {
    date: "Oct 2023",
    title: "Nace Andar FC",
    excerpt: "El sueño del Complejo 'Fútbol por la Inclusión' es realidad y lo celebramos con la presentación de Andar FC.",
    href: "/novedades/nace-andar-fc",
  },
  {
    date: "Jul 2022",
    title: "Nuevo Complejo \"Fútbol por la Inclusión\"",
    excerpt: "Se inauguró el complejo deportivo oficial con canchas de pasto sintético y accesibilidad 100% garantizada, un hito para el proyecto.",
    href: "/novedades/novedades-complejo",
  },
  {
    date: "Dic 2021",
    title: "Finales 2021 en AFA",
    excerpt: "El predio de AFA en Ezeiza abrió sus puertas para recibir el último Festival de la temporada coronando el cierre de un gran año.",
    href: "/novedades/finales-afa-2021",
  },
];

export default function NovedadesPage() {
  return (
    <div className="bg-[#000B1A] text-white min-h-screen pt-48 pb-32">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-[#36b37e]/10 text-[#36b37e] px-4 py-1.5 rounded font-black text-[10px] tracking-widest mb-8 uppercase border border-[#36b37e]/20">
            <Newspaper size={14} />
            ACTUALIDAD
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none">
            Novedades
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-medium">
            Las últimas noticias y sucesos de la Liga de Fútbol Inclusiva y la Asociación Civil Andar.
          </p>
        </header>

        <div role="feed" className="grid gap-6">
          {news.map(({ date, title, excerpt, href }, i) => (
            <Link
              key={i}
              href={href}
              className="group relative bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-3xl transition-all hover:bg-white/[0.05] hover:border-white/10 hover:-translate-y-1 shadow-2xl overflow-hidden"
              aria-labelledby={`news-${i}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#36b37e]/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[#36b37e]/10 transition-all duration-700" />
              
              <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                <div className="w-16 h-16 shrink-0 bg-[#36b37e] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#36b37e]/20 group-hover:rotate-6 transition-transform">
                  <Trophy size={32} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar size={14} className="text-[#36b37e]" />
                    <time className="text-[10px] font-black text-[#36b37e] uppercase tracking-widest">
                      {date}
                    </time>
                  </div>
                  <h2 
                    id={`news-${i}`} 
                    className="text-2xl md:text-3xl font-black mb-4 group-hover:text-[#36b37e] transition-colors tracking-tight uppercase leading-tight"
                  >
                    {title}
                  </h2>
                  <p className="text-white/50 text-base md:text-lg leading-relaxed mb-6 font-medium">
                    {excerpt}
                  </p>
                  <div className="inline-flex items-center gap-2 text-white font-black text-xs tracking-widest uppercase border-b-2 border-white/10 pb-1 group-hover:border-[#36b37e] group-hover:text-[#36b37e] transition-all">
                    Leer más <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
