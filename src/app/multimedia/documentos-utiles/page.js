import Link from "next/link";
import { Download, FileCheck, FileText, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Documentos Útiles - Fútbol Inclusivo",
  description: "Descarga de reglamentos oficiales, formularios de inscripción, planillas médicas y guías de torneos.",
};

const documents = [
  {
    category: "Reglamentos",
    title: "Reglamento Oficial de Torneos — Fútbol Inclusivo",
    format: "PDF",
    size: "1.4 MB",
    description: "Normativa oficial de juego, categorías, sistema de arbitraje adaptado y código de convivencia.",
  },
  {
    category: "Formularios",
    title: "Planilla de Apto Médico y Ficha de Salud",
    format: "PDF",
    size: "450 KB",
    description: "Documento obligatorio para la participación de jugadoras y jugadores en todas las ligas.",
  },
  {
    category: "Institucional",
    title: "Manual de Convivencia y Fair Play",
    format: "PDF",
    size: "820 KB",
    description: "Principios de inclusión, respeto mutuo, derechos y pautas de conducta comunitaria.",
  },
  {
    category: "Inscripción",
    title: "Guía de Inscripción Institucional para Clubes y Escuelas",
    format: "PDF",
    size: "600 KB",
    description: "Paso a paso para sumar a tu organización deportiva o educativa a los torneos oficiales.",
  },
];

export default function DocumentosUtilesPage() {
  return (
    <div className="bg-[#000B1A] text-white min-h-screen pt-36 sm:pt-44 pb-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#36b37e]/15 border border-[#36b37e]/30 text-[#36b37e] text-xs font-black uppercase tracking-wider mb-4">
            <Download size={14} />
            <span>Descargas y Documentación</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight">
            Documentos Útiles
          </h1>
          <p className="text-white/60 text-sm sm:text-base mt-3 max-w-2xl">
            Accedé y descargá los reglamentos oficiales, formularios de inscripción y planillas requeridas para las competencias.
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

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white/[0.03] border border-white/10 hover:border-[#36b37e]/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#36b37e]/20 text-[#36b37e] border border-[#36b37e]/30">
                    {doc.category}
                  </span>
                  <span className="text-xs text-white/40 font-bold">
                    {doc.format} • {doc.size}
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#36b37e] shrink-0 group-hover:scale-110 group-hover:bg-[#36b37e]/20 transition-all">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white mb-2 leading-snug group-hover:text-[#36b37e] transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-white/40 font-bold uppercase tracking-wider">Documento Oficial</span>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-[#36b37e] text-white hover:text-black font-black text-xs uppercase tracking-wider transition-all border border-white/10"
                >
                  <Download size={14} />
                  <span>Descargar</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Assistance Help Banner */}
        <div className="bg-[#001A3D]/60 border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#36b37e]/20 text-[#36b37e] flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase text-white">¿Necesitás asistencia con algún formulario?</h3>
              <p className="text-white/60 text-xs sm:text-sm mt-0.5">
                Nuestro equipo de coordinación deportiva y administrativa está a disposición para ayudarte.
              </p>
            </div>
          </div>
          <Link
            href="/contacto"
            className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap border border-white/20"
          >
            Consultar Equipo
          </Link>
        </div>
      </div>
    </div>
  );
}
