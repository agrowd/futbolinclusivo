import Link from "next/link";
import { FileText, Download, ExternalLink, ArrowRight, Calendar, BookOpen } from "lucide-react";

export const metadata = {
  title: "Revista Digital - Fútbol Inclusivo",
  description: "Publicaciones digitales, historias de vida, artículos e informes de Fútbol Inclusivo y Andar FC.",
};

const editions = [
  {
    title: "Revista Fútbol Inclusivo — Edición Especial 25 Años",
    edition: "N° 12 — Aniversario",
    date: "Diciembre 2024",
    description: "Recorrido histórico por el impacto social y deportivo del Fútbol Inclusivo desde 1998 hasta hoy.",
    pages: "48 páginas",
    badge: "Especial",
  },
  {
    title: "Superliga Inclusiva en AFA — El Sueño de Todos",
    edition: "N° 11",
    date: "Junio 2024",
    description: "Cobertura completa del torneo en el predio Lionel Andrés Messi de Ezeiza y testimonios de los planteles.",
    pages: "36 páginas",
    badge: "Destacado",
  },
  {
    title: "Historias de Cancha — Protagonistas del Deporte Social",
    edition: "N° 10",
    date: "Noviembre 2023",
    description: "Entrevistas en profundidad con jugadoras, jugadores, familias y directores técnicos de la Liga BA y Liga Nacional.",
    pages: "32 páginas",
    badge: "Archivo",
  },
];

export default function RevistaPage() {
  return (
    <div className="bg-[#000B1A] text-white min-h-screen pt-36 sm:pt-44 pb-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#36b37e]/15 border border-[#36b37e]/30 text-[#36b37e] text-xs font-black uppercase tracking-wider mb-4">
            <BookOpen size={14} />
            <span>Publicaciones Digitales</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight">
            Revista Fútbol Inclusivo
          </h1>
          <p className="text-white/60 text-sm sm:text-base mt-3 max-w-2xl">
            Ediciones digitales con historias, entrevistas, coberturas de torneos y artículos sobre inclusión y deporte social.
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

        {/* Editions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {editions.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/[0.03] border border-white/10 hover:border-[#36b37e]/40 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#36b37e]/20 text-[#36b37e] border border-[#36b37e]/30">
                    {item.badge}
                  </span>
                  <span className="text-xs text-white/40 font-bold flex items-center gap-1">
                    <Calendar size={13} /> {item.date}
                  </span>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#36b37e] mb-4 group-hover:scale-110 group-hover:bg-[#36b37e]/20 transition-all">
                  <FileText size={28} />
                </div>

                <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2 leading-snug group-hover:text-[#36b37e] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-white/40 font-bold">{item.pages}</span>
                <Link
                  href="/novedades"
                  className="text-[#36b37e] font-black uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all"
                >
                  <span>Leer Online</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
