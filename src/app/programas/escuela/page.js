import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  Trophy, 
  Heart, 
  MapPin, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles, 
  Shield, 
  ArrowRight,
  Calendar,
  Award
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { WHATSAPP_INSCRIPTION_ESCUELA_URL, WHATSAPP_INSCRIPTION_TEAM_URL } from "@/lib/whatsapp";

export const metadata = {
  title: "Escuela de Fútbol Inclusivo & Infantil | Andar FC",
  description: "Inscripción a la Escuelita Infantil de Fútbol Inclusivo en Moreno. Formación deportiva y en valores para niños, niñas y jóvenes. Contacto directo por WhatsApp.",
};

const staffMembers = [
  {
    name: "Roberto Salazar",
    role: "Coordinador de Fútbol Infantil",
    image: "/staff/roberto-salazar.jpg",
    description: "Coordinación pedagógica, seguimiento personalizado y contención de las categorías infantiles."
  },
  {
    name: "Santiago Conde",
    role: "Entrenador de Fútbol Infantil",
    image: "/staff/santiago-conde.jpg",
    description: "Desarrollo de habilidades motoras, fundamentos del fútbol y dinámicas de grupo."
  },
  {
    name: "Sebastián Subirá",
    role: "Entrenador de Fútbol Infantil",
    image: "/staff/sebastian-subira.jpg",
    description: "Entrenamientos técnicos, juego limpio y fomento del compañerismo formativo."
  }
];

const pillars = [
  {
    step: "01",
    title: "Primer Tiempo: Los Acuerdos",
    desc: "Antes de rodar la pelota, ambos equipos se reúnen para consensuar las reglas de convivencia y juego limpio que regirán el encuentro.",
    icon: Shield,
    color: "#36b37e"
  },
  {
    step: "02",
    title: "Segundo Tiempo: El Partido",
    desc: "Se juega el partido bajo las normas acordadas. No existe referí tradicional: un mediador o facilitador acompaña la resolución pacífica de situaciones.",
    icon: Trophy,
    color: "#f59e0b"
  },
  {
    step: "03",
    title: "Tercer Tiempo: La Reflexión",
    desc: "Al finalizar el juego, los jugadores analizan el cumplimiento de los acuerdos pactados y se otorgan los puntos por valores deportivos.",
    icon: Heart,
    color: "#38bdf8"
  }
];

const quickHighlights = [
  {
    icon: Users,
    label: "Edades",
    value: "5 a 17 años",
    sub: "Categorías formativas mixtas",
    color: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400"
  },
  {
    icon: MapPin,
    label: "Sede Oficial",
    value: "Predio Andar FC",
    sub: "Moreno, Buenos Aires",
    color: "from-blue-500/20 to-indigo-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400"
  },
  {
    icon: Calendar,
    label: "Frecuencia",
    value: "Entrenamientos Semanales",
    sub: "Tardes y fines de semana",
    color: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400"
  },
  {
    icon: Award,
    label: "Enfoque",
    value: "Deporte y Valores",
    sub: "Metodología Fútbol 3 Tiempos",
    color: "from-purple-500/20 to-pink-500/10",
    border: "border-purple-500/30",
    text: "text-purple-400"
  }
];

export default function EscuelaPage() {
  return (
    <div className="bg-[#000B1A] text-white min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative pt-36 pb-20 overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#001A3D] via-[#00142A] to-[#000B1A]">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#36b37e_1px,transparent_1px)] [background-size:28px_28px]" />
        
        <div className="container relative z-10 px-4 mx-auto max-w-6xl text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            <span>Escuelita Infantil & Fútbol Inclusivo • Andar FC</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6">
            Escuela de Fútbol <span className="text-[#36b37e]">Infantil & Inclusivo</span>
          </h1>

          <p className="text-white/70 max-w-3xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed mb-10 font-normal">
            Un espacio donde cada chico y chica aprende, juega y se divierte a través del deporte, 
            promoviendo la empatía, el compañerismo y el respeto mutuo en el predio de <strong className="text-white">Andar FC (Moreno)</strong>.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={WHATSAPP_INSCRIPTION_ESCUELA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl shadow-[#25D366]/30 transition-all transform hover:scale-105 active:scale-95"
            >
              <MessageCircle size={22} />
              <span>Inscribirse en la Escuelita Infantil</span>
            </a>

            <Link
              href="/institucional/campo"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 backdrop-blur-md transition-all"
            >
              <MapPin size={18} />
              <span>Conocé Nuestro Predio</span>
            </Link>
          </div>

          <p className="text-xs text-white/50 flex items-center justify-center gap-1.5">
            <span>Atención e inscripciones directas por WhatsApp:</span>
            <a 
              href={WHATSAPP_INSCRIPTION_ESCUELA_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#25D366] font-bold underline"
            >
              +54 9 11 2507-9380
            </a>
          </p>

        </div>
      </section>

      {/* QUICK HIGHLIGHTS GRID */}
      <section className="py-12 border-b border-white/5 bg-[#001026]/50">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} border ${item.border} backdrop-blur-sm`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center ${item.text} mb-4`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-white/50 block">
                    {item.label}
                  </span>
                  <p className="text-xl font-black uppercase text-white mt-1">
                    {item.value}
                  </p>
                  <p className="text-xs text-white/65 mt-1 font-medium">
                    {item.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* METODOLOGÍA: FÚTBOL 3 TIEMPOS */}
      <section className="py-20 border-b border-white/5">
        <div className="container px-4 mx-auto max-w-6xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#36b37e] block mb-2">
              Propuesta Pedagógica
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Metodología Fútbol 3 Tiempos
            </h2>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              En nuestra escuelita el resultado numérico no es lo más importante: aprendemos a jugar en equipo,
              a escucharnos y a resolver los desacuerdos mediante la palabra y el respeto mutuo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-xl"
                >
                  <div className="text-5xl font-black text-white/5 absolute top-6 right-6">
                    {pillar.step}
                  </div>
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: `${pillar.color}20`, color: pillar.color, border: `1px solid ${pillar.color}40` }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-black uppercase text-white mb-3 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-[#36b37e]/10 border border-[#36b37e]/25 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#36b37e]/20 text-[#36b37e] flex items-center justify-center shrink-0">
                <Shield size={24} />
              </div>
              <div>
                <h4 className="text-base font-black uppercase text-white">Espacio Seguro y Formativo</h4>
                <p className="text-xs text-white/70">Acompañamiento profesional y pedagógico para el desarrollo físico y emocional.</p>
              </div>
            </div>
            <a
              href={WHATSAPP_INSCRIPTION_ESCUELA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2"
            >
              <MessageCircle size={16} />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>

        </div>
      </section>

      {/* STAFF DE FÚTBOL INFANTIL */}
      <section className="py-20 border-b border-white/5 bg-[#001026]/30">
        <div className="container px-4 mx-auto max-w-6xl">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 block mb-2">
              Profesores y Coordinación
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Staff de Fútbol Infantil
            </h2>
            <p className="text-white/60 text-sm sm:text-base">
              Profesionales con amplia trayectoria en formación deportiva infantil, recreación y educación física inclusiva.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {staffMembers.map((staff, idx) => (
              <div 
                key={idx}
                className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 text-center flex flex-col items-center hover:border-amber-500/40 transition-all duration-300 shadow-xl"
              >
                <div className="relative w-28 h-28 rounded-full overflow-hidden mb-6 border-2 border-amber-500/50 shadow-lg shadow-amber-500/10">
                  <Image
                    src={staff.image}
                    alt={staff.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <h3 className="text-xl font-black uppercase text-white tracking-tight mb-1">
                  {staff.name}
                </h3>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-4">
                  {staff.role}
                </span>
                <p className="text-xs text-white/60 leading-relaxed">
                  {staff.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SEDE: PREDIO ANDAR FC */}
      <section className="py-20 border-b border-white/5">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-[#001D3D] to-[#00142A] border border-white/10 rounded-3xl p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#36b37e] block mb-2">
                  Instalaciones Deportivas
                </span>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-4">
                  Entrenamientos en Andar FC (Moreno)
                </h2>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                  Nuestra sede central cuenta con canchas de fútbol reglamentarias de césped natural y sintético, 
                  vestuarios completamente equipados, buffet y áreas de esparcimiento para que las familias disfruten de cada jornada deportiva.
                </p>
                <ul className="space-y-3 mb-8 text-sm text-white/80">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#36b37e]" />
                    <span>Canchas de césped natural y sintético iluminadas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#36b37e]" />
                    <span>Estacionamiento interno y seguridad</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#36b37e]" />
                    <span>Ubicación accesible en Moreno, Provincia de Buenos Aires</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={WHATSAPP_INSCRIPTION_ESCUELA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2"
                  >
                    <MessageCircle size={18} />
                    <span>Inscribirme Ahora</span>
                  </a>
                  <a
                    href="https://canchas.futbolinclusivo.org.ar/disponibilidad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 border border-white/20"
                  >
                    <span>Alquiler de Canchas</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 p-6 flex flex-col justify-between min-h-[300px]">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-white">
                    <MapPin size={14} className="text-[#36b37e]" />
                    <span>Moreno, Buenos Aires</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase text-white">
                    Vení a participar de una clase de prueba
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Comunicate directamente con la coordinación para conocer los horarios por categoría e iniciar las actividades de tu hijo o hija.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <span className="text-[11px] font-black uppercase tracking-wider text-white/40 block mb-1">
                    WhatsApp Oficial de Coordinación
                  </span>
                  <a
                    href={WHATSAPP_INSCRIPTION_ESCUELA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-black text-[#25D366] flex items-center gap-2 hover:underline"
                  >
                    <MessageCircle size={20} />
                    <span>+54 9 11 2507-9380</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL WHATSAPP CALL TO ACTION */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#000B1A] to-[#00060F]">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          
          <div className="w-16 h-16 rounded-3xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#25D366]/30">
            <MessageCircle size={32} />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Sumá a tu hijo/a a la Escuelita Infantil
          </h2>

          <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-8">
            Escribinos por WhatsApp al <strong className="text-white">+54 9 11 2507-9380</strong>. Te brindaremos toda la información de días, categorías, cuotas sociales y requisitos de inscripción.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href={WHATSAPP_INSCRIPTION_ESCUELA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl shadow-[#25D366]/30 transition-all transform hover:scale-105"
            >
              <MessageCircle size={22} />
              <span>Inscribirse vía WhatsApp (+54 9 11 2507-9380)</span>
            </a>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-white/50">
            <span>¿Sos representante de una institución o club?</span>
            <a
              href={WHATSAPP_INSCRIPTION_TEAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#36b37e] hover:underline font-bold uppercase tracking-wider flex items-center gap-1"
            >
              <span>Inscribir Equipo a Ligas</span>
              <ArrowRight size={13} />
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
