import InfanciasForm from "@/components/infancias/InfanciasForm";
import { Sparkles, Calendar, MapPin, Heart, ShieldCheck, Trophy, Gift, Music } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Inscripción — Gran Día de las Infancias | Fútbol Inclusivo",
  description:
    "Completá el formulario de inscripción para la gran jornada del Día de las Infancias en el Complejo Deportivo de Andar Fútbol Club. ¡Descargá tu pase con código QR!",
};

export default function DiaDeLasInfanciasPage() {
  return (
    <div className="min-h-screen bg-[#000B1A] text-white">
      {/* HERO SECTION */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 overflow-hidden border-b border-white/5">
        {/* Background Image / Glow */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://futbolinclusivo.org.ar/app/uploads/2017/12/nosotros-campo4.jpg"
            alt="Día de las Infancias - Fútbol Inclusivo"
            fill
            className="object-cover opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000B1A]/80 via-[#000B1A]/95 to-[#000B1A]" />
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#36b37e]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#E67E22]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          {/* Festival Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E67E22]/20 via-[#36b37e]/20 to-[#2980B9]/20 border border-white/10 text-white text-xs font-black uppercase tracking-widest mb-6 shadow-lg">
            <Sparkles size={14} className="text-[#E67E22]" />
            Gran Jornada Recreativa & Deportiva
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight mb-6 leading-none">
            Día de las <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#36b37e] via-[#2980B9] to-[#E67E22]">
              Infancias
            </span>
          </h1>

          <p className="text-base sm:text-xl text-white/70 font-medium max-w-2xl mx-auto leading-relaxed mb-8">
            Vení a compartir una tarde única llena de fútbol inclusivo, juegos, inflables, merienda y sorpresas en el Complejo Deportivo de Andar.
          </p>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-bold text-white/80">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
              <MapPin size={16} className="text-[#36b37e]" />
              Complejo "Fútbol por la Inclusión" (Moreno)
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
              <Heart size={16} className="text-[#E67E22]" />
              Actividad Gratuita y Abierta
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
              <ShieldCheck size={16} className="text-[#2980B9]" />
              Pase Digital con QR Obligatorio
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS STRIP */}
      <section className="py-8 bg-white/[0.02] border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <Trophy size={24} className="mx-auto text-[#36b37e] mb-2" />
              <div className="font-black text-sm uppercase">Fútbol y Juegos</div>
              <div className="text-[11px] text-white/50">Canchas y postas</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <Gift size={24} className="mx-auto text-[#E67E22] mb-2" />
              <div className="font-black text-sm uppercase">Merienda y Regalos</div>
              <div className="text-[11px] text-white/50">Para todos los chicos</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <Music size={24} className="mx-auto text-[#2980B9] mb-2" />
              <div className="font-black text-sm uppercase">Shows y Música</div>
              <div className="text-[11px] text-white/50">Animación en vivo</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <Heart size={24} className="mx-auto text-[#e84393] mb-2" />
              <div className="font-black text-sm uppercase">100% Inclusivo</div>
              <div className="text-[11px] text-white/50">Espacio seguro y libre</div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <InfanciasForm />
        </div>
      </section>
    </div>
  );
}
