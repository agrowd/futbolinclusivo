import Link from "next/link";
import { MessageCircle, Trophy, Users, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import InscriptionForm from "@/components/ui/InscriptionForm";
import { WHATSAPP_INSCRIPTION_TEAM_URL, WHATSAPP_INSCRIPTION_ESCUELA_URL } from "@/lib/whatsapp";

export const metadata = {
  title: "Inscripción - Fútbol Inclusivo & Escuelita Infantil",
  description: "Inscribí a tu equipo a las Ligas de Fútbol Inclusivo o sumate a la Escuelita de Fútbol Infantil vía WhatsApp.",
};

export default function InscripcionPage() {
  const heroTitle = "Portal de Inscripciones";
  const heroDescription = "Elegí la modalidad de inscripción y contactate de forma directa e inmediata con nuestra coordinación.";

  return (
    <div className="bg-[#000B1A] text-white min-h-screen pt-36 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#36b37e]/10 border border-[#36b37e]/30 text-[#36b37e] text-xs font-black uppercase tracking-widest mb-4">
            <Trophy size={14} />
            <span>Temporada Oficial 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
            {heroTitle}
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {heroDescription}
          </p>
        </header>

        {/* 2 MAIN WHATSAPP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          
          {/* Card 1: Inscribir Equipo */}
          <div className="relative group bg-gradient-to-b from-[#001D3D] to-[#00142A] border-2 border-[#36b37e]/40 hover:border-[#36b37e] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-2xl hover:shadow-[#36b37e]/20 hover:-translate-y-1">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#36b37e]/10 border border-[#36b37e]/30 text-[#36b37e] flex items-center justify-center mb-6">
                <Trophy size={28} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#36b37e] block mb-1">
                Clubes, Instituciones y Organizaciones
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-3">
                Inscribir Equipo
              </h2>
              <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-6">
                Para participar en la <strong className="text-white">Liga BA</strong>, la <strong className="text-white">Superliga AFA</strong> o la <strong className="text-white">Liga Nacional</strong>. La coordinación te brindará las planillas de buena fe, fixture y requisitos.
              </p>
              <ul className="space-y-2.5 mb-8 text-xs text-white/70">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#36b37e]" />
                  <span>Torneos masculinos, femeninos e inclusivos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#36b37e]" />
                  <span>Testeo de habilidades y categorización equitativa</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#36b37e]" />
                  <span>Fechas en predios oficiales de primer nivel</span>
                </li>
              </ul>
            </div>

            <a
              href={WHATSAPP_INSCRIPTION_TEAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/25 transition-all transform group-hover:scale-[1.02]"
            >
              <MessageCircle size={20} />
              <span>Inscribir Equipo por WhatsApp</span>
            </a>
          </div>

          {/* Card 2: Inscribirse en Escuelita Infantil */}
          <div className="relative group bg-gradient-to-b from-[#1C1605] to-[#120F02] border-2 border-amber-500/40 hover:border-amber-400 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-1">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-6">
                <Users size={28} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 block mb-1">
                Niños, Niñas y Jóvenes
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight mb-3">
                Escuelita Infantil
              </h2>
              <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-6">
                Formación integral, valores y fútbol formativo en el predio de <strong className="text-white">Andar FC (Moreno)</strong>. Acompañamiento docente y deportivo para chicos y chicas.
              </p>
              <ul className="space-y-2.5 mb-8 text-xs text-white/70">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-amber-400" />
                  <span>Entrenamientos semanales y formación pedagógica</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-amber-400" />
                  <span>Cuerpo de profesores y entrenadores especializados</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-amber-400" />
                  <span>Espacio recreativo, seguro y familiar</span>
                </li>
              </ul>
            </div>

            <a
              href={WHATSAPP_INSCRIPTION_ESCUELA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/25 transition-all transform group-hover:scale-[1.02]"
            >
              <MessageCircle size={20} />
              <span>Inscribirse en la Escuelita Infantil</span>
            </a>
          </div>

        </div>

        {/* Direct Contact Notice */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs text-white/60">
            ¿Tenés dudas sobre las inscripciones? También podés comunicarte directamente al WhatsApp oficial de coordinación: <a href={WHATSAPP_INSCRIPTION_TEAM_URL} target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-bold underline ml-1">+54 9 11 2507-9380</a>
          </p>
        </div>

        {/* Optional Online Team Form Accordion / Section */}
        <div className="border-t border-white/10 pt-12">
          <div className="text-center mb-8">
            <span className="text-[11px] font-black uppercase tracking-widest text-white/40">
              Formulario Web Alternativo
            </span>
            <h3 className="text-xl font-bold uppercase text-white mt-1">
              Carga Digital de Planteles para Instituciones
            </h3>
          </div>

          <InscriptionForm 
            heroTitle=""
            heroDescription=""
            formNotice=""
          />
        </div>

      </div>
    </div>
  );
}
