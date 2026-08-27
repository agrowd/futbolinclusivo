import Link from "next/link";
import { Newspaper, ExternalLink, ArrowRight, Calendar, Radio, Share2 } from "lucide-react";

export const metadata = {
  title: "Prensa y Cobertura - Fútbol Inclusivo",
  description: "Noticias, coberturas en medios de comunicación, notas de prensa y comunicados oficiales.",
};

const pressArticles = [
  {
    media: "AFA Oficial",
    title: "La Superliga Inclusiva celebró una jornada histórica en el Predio Lionel Andrés Messi",
    date: "Agosto 2024",
    summary: "Más de 30 instituciones y cientos de deportistas participaron de los encuentros organizados por Andar y AFA.",
    url: "https://www.afa.com.ar",
  },
  {
    media: "DeporTV",
    title: "El poder del deporte para transformar realidades: Fútbol Inclusivo Andar",
    date: "Mayo 2024",
    summary: "Informe especial sobre las ligas inclusivas de Buenos Aires y el interior del país.",
    url: "https://deportv.gob.ar",
  },
  {
    media: "Diario Clarín",
    title: "Más de dos décadas equiparando oportunidades a través de la pelota",
    date: "Diciembre 2023",
    summary: "Nota sobre la historia de Fútbol Inclusivo y su expansión como modelo para Latinoamérica.",
    url: "https://www.clarin.com",
  },
];

export default function PrensaPage() {
  return (
    <div className="bg-[#000B1A] text-white min-h-screen pt-36 sm:pt-44 pb-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#36b37e]/15 border border-[#36b37e]/30 text-[#36b37e] text-xs font-black uppercase tracking-wider mb-4">
            <Radio size={14} />
            <span>Prensa y Difusión</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight">
            Prensa y Cobertura Mediática
          </h1>
          <p className="text-white/60 text-sm sm:text-base mt-3 max-w-2xl">
            Apariciones en medios de comunicación, notas periodísticas, comunicados de prensa y kits de prensa oficiales.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Link
              href="/multimedia"
              className="text-[#36b37e] hover:text-[#2ecc71] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              ← Volver a Multimedia
            </Link>
          </div>
        </header>

        {/* Press Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pressArticles.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/[0.03] border border-white/10 hover:border-[#36b37e]/40 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white border border-white/15">
                    {item.media}
                  </span>
                  <span className="text-xs text-white/40 font-bold flex items-center gap-1">
                    <Calendar size={13} /> {item.date}
                  </span>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#36b37e] mb-4 group-hover:scale-110 group-hover:bg-[#36b37e]/20 transition-all">
                  <Newspaper size={28} />
                </div>

                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2 leading-snug group-hover:text-[#36b37e] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed mb-4">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-white/40 font-bold">Nota en Medios</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#36b37e] font-black uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all"
                >
                  <span>Ver Cobertura</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Press Contact Banner */}
        <div className="bg-gradient-to-r from-[#001A3D] to-[#001229] border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black uppercase text-white">¿Sos periodista o medio de comunicación?</h3>
            <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-xl">
              Podés solicitar acreditaciones de prensa para nuestras jornadas, entrevistas y material gráfico en alta resolución.
            </p>
          </div>
          <Link
            href="/contacto"
            className="px-6 py-3.5 rounded-2xl bg-[#36b37e] hover:bg-[#2ecc71] text-black font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-lg shadow-[#36b37e]/20"
          >
            Contacto de Prensa
          </Link>
        </div>
      </div>
    </div>
  );
}
