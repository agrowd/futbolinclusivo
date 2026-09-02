import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  Shield, 
  Trophy, 
  Laptop, 
  FileText, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  UserCheck
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Staff Andar FC - Estructura y Equipo Humano",
  description: "Conocé al equipo interdisciplinario que lidera el desarrollo deportivo, formativo, social y tecnológico de Andar Fútbol Club.",
};

// Director
const director = {
  name: "Prof. Juan Rivas",
  role: "Director",
  area: "Dirección General",
  image: "/staff/juan-rivas.jpg",
  badge: "Liderazgo Institucional",
  desc: "Conducción estratégica y pedagógica de Andar Fútbol Club.",
};

// Coordinaciones de Área
const coordinaciones = [
  {
    id: "mel",
    area: "Monitoreo, Evaluación y Aprendizaje (MEL)",
    icon: Award,
    color: "#818cf8",
    bgGradient: "from-indigo-500/10 via-purple-500/5 to-transparent",
    borderColor: "border-indigo-500/30",
    leader: {
      name: "Pablo Lucero",
      role: "Coordinador de Monitoreo, Evaluación y Aprendizaje (MEL)",
      image: "/staff/pablo-lucero.jpg",
    },
    team: []
  },
  {
    id: "futbol-inclusivo",
    area: "Fútbol Inclusivo",
    icon: Trophy,
    color: "#36b37e",
    bgGradient: "from-[#36b37e]/15 via-emerald-500/5 to-transparent",
    borderColor: "border-[#36b37e]/40",
    leader: {
      name: "Rocío Di Nicola",
      role: "Coordinadora de Fútbol Inclusivo",
      image: "/staff/rocio-di-nicola.jpg",
    },
    team: [
      {
        name: "Luciano Filippini",
        role: "Entrenador Fútbol Inclusivo",
        image: "/staff/luciano-filippini.jpg",
      }
    ]
  },
  {
    id: "futbol-infantil",
    area: "Fútbol Infantil",
    icon: Shield,
    color: "#f59e0b",
    bgGradient: "from-amber-500/15 via-orange-500/5 to-transparent",
    borderColor: "border-amber-500/30",
    leader: {
      name: "Roberto Salazar",
      role: "Coordinador de Fútbol Infantil",
      image: "/staff/roberto-salazar.jpg",
    },
    team: [
      {
        name: "Santiago Conde",
        role: "Entrenador Fútbol Infantil",
        image: "/staff/santiago-conde.jpg",
      },
      {
        name: "Sebastián Subirá",
        role: "Entrenador Fútbol Infantil",
        image: "/staff/sebastian-subira.jpg",
      }
    ]
  },
  {
    id: "administracion",
    area: "Administración",
    icon: FileText,
    color: "#10b981",
    bgGradient: "from-emerald-500/15 via-teal-500/5 to-transparent",
    borderColor: "border-emerald-500/30",
    leader: {
      name: "Guido Oliva",
      role: "Coordinador Administrativo",
      image: "/staff/guido-oliva.jpg",
    },
    team: []
  },
  {
    id: "sistemas",
    area: "Sistemas e Innovación Digital",
    icon: Laptop,
    color: "#38bdf8",
    bgGradient: "from-sky-500/15 via-blue-500/5 to-transparent",
    borderColor: "border-sky-500/30",
    leader: {
      name: "Federico Romero",
      role: "Coordinador de Sistemas e Innovación Digital",
      image: "/staff/federico-romero.jpg",
    },
    team: []
  }
];

// Ligas y Competencias
const ligasCompetencias = {
  leader: {
    name: "Pablo Lucero",
    role: "Coordinador de Ligas y Competencias",
    image: "/staff/pablo-lucero.jpg",
    badge: "Coordinación General",
  },
  dedicacionExclusiva: [
    {
      name: "Yuliana Servián",
      role: "Equipo Técnico de Ligas",
      tag: "Dedicación Exclusiva",
      image: "/staff/yuliana-servian.jpg",
    },
    {
      name: "Marcos López",
      role: "Equipo Técnico de Ligas",
      tag: "Dedicación Exclusiva",
      image: "/staff/marcos-lopez.jpg",
    }
  ],
  equipoFuncional: [
    "Cuerpo de Árbitros y Jueces de Mesa Oficiales",
    "Comisión Evaluadora y Testeadores de Habilidades",
    "Equipo de Planillaje y Carga Digital en Vivo",
    "Logística de Campo, Asistencia Médica y Veedores"
  ]
};

export default function StaffPage() {
  return (
    <div className="bg-[#000B1A] text-white min-h-screen pt-32 sm:pt-36 pb-24">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#36b37e]/10 rounded-full blur-[140px]" />
        <div className="absolute top-2/3 right-10 w-[500px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Header Section */}
        <header className="mb-14 sm:mb-20 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#36b37e]/10 border border-[#36b37e]/30 text-[#36b37e] text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-[#36b37e]/10">
              <Users size={15} />
              <span>Andar FC • Estructura Organizacional</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
              Staff <span className="text-[#36b37e]">Andar FC</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              El equipo humano, profesional e interdisciplinario que impulsa día a día la formación deportiva, la gestión inclusiva, la innovación y la alta competencia en Andar Fútbol Club.
            </p>
          </FadeIn>
        </header>

        {/* 1. NIVEL 1 — DIRECCIÓN GENERAL */}
        <section className="mb-16 sm:mb-24">
          <FadeIn delay={0.1}>
            <div className="text-center mb-6">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#36b37e] bg-[#36b37e]/10 px-3 py-1 rounded-full border border-[#36b37e]/20">
                Nivel Directivo
              </span>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="relative group bg-gradient-to-b from-[#001D3D] to-[#00142A] border-2 border-[#36b37e]/50 hover:border-[#36b37e] rounded-3xl p-6 sm:p-8 text-center transition-all duration-300 shadow-2xl hover:shadow-[#36b37e]/20 hover:-translate-y-1">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#36b37e] text-black text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full shadow">
                  Director General
                </div>

                <div className="relative w-32 h-32 mx-auto mb-5 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-black/40 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={director.image}
                    alt={director.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-1">
                  {director.name}
                </h3>
                <p className="text-[#36b37e] font-black text-sm uppercase tracking-wider mb-3">
                  {director.role} • Andar FC
                </p>
                <p className="text-white/60 text-xs leading-relaxed max-w-xs mx-auto">
                  {director.desc}
                </p>
              </div>
            </div>

            {/* Visual connector line downward */}
            <div className="w-0.5 h-10 bg-gradient-to-b from-[#36b37e] to-white/20 mx-auto my-2 hidden sm:block" />
          </FadeIn>
        </section>

        {/* 2. NIVEL 2 — COORDINACIONES Y ÁREAS */}
        <section className="mb-20 sm:mb-28">
          <FadeIn delay={0.2}>
            <div className="text-center mb-10">
              <span className="text-[11px] font-black uppercase tracking-widest text-white/60 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                Coordinaciones de Área & Responsables
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-2">
                Áreas Operativas y Formativas
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coordinaciones.map((coord, idx) => {
                const Icon = coord.icon;
                return (
                  <div
                    key={coord.id}
                    className={`bg-gradient-to-b ${coord.bgGradient} bg-white/[0.02] border ${coord.borderColor} rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                  >
                    <div>
                      {/* Area Header */}
                      <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-white/10">
                        <div 
                          className="w-8 h-8 rounded-xl flex items-center justify-center border"
                          style={{ borderColor: `${coord.color}40`, background: `${coord.color}15`, color: coord.color }}
                        >
                          <Icon size={16} />
                        </div>
                        <h4 className="font-black text-xs uppercase tracking-wider text-white/90 line-clamp-1">
                          {coord.area}
                        </h4>
                      </div>

                      {/* Coordinator Card */}
                      <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">
                        <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border border-white/20 bg-black/40">
                          <Image
                            src={coord.leader.image}
                            alt={coord.leader.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider block" style={{ color: coord.color }}>
                            Coordinación
                          </span>
                          <h5 className="text-base font-black uppercase text-white tracking-tight leading-snug">
                            {coord.leader.name}
                          </h5>
                          <p className="text-white/50 text-[11px] font-medium leading-tight mt-0.5">
                            {coord.leader.role}
                          </p>
                        </div>
                      </div>

                      {/* Sub-team / Entrenadores if any */}
                      {coord.team && coord.team.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <span className="text-[10px] font-black uppercase tracking-wider text-white/40 mb-2.5 block flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#36b37e]" />
                            <span>Cuerpo Técnico / Entrenadores</span>
                          </span>
                          <div className="space-y-2.5">
                            {coord.team.map((member) => (
                              <div
                                key={member.name}
                                className="flex items-center gap-3 bg-black/20 border border-white/5 rounded-xl p-2.5"
                              >
                                <div className="relative w-11 h-11 shrink-0 rounded-lg overflow-hidden border border-white/10 bg-black/30">
                                  <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                    sizes="44px"
                                  />
                                </div>
                                <div>
                                  <h6 className="text-xs font-black uppercase text-white tracking-tight">
                                    {member.name}
                                  </h6>
                                  <p className="text-white/50 text-[10px] font-medium">
                                    {member.role}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </section>

        {/* 3. NIVEL 3 — SECCIÓN DEDICADA: STAFF DE LIGAS Y COMPETENCIAS */}
        <section className="mb-16">
          <FadeIn delay={0.3}>
            <div className="bg-gradient-to-b from-[#001D3D] via-[#00142A] to-[#000E1F] border-2 border-indigo-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase tracking-widest mb-3">
                  <Trophy size={14} />
                  <span>Área Oficial de Competiciones</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
                  Staff de <span className="text-indigo-400">Ligas y Competencias</span>
                </h2>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  Equipo especializado a cargo de la planificación, logística reglamentaria, testeo de habilidades y ejecución de la Superliga AFA, Liga BA y torneos nacionales.
                </p>
              </div>

              {/* Coordinator */}
              <div className="max-w-md mx-auto mb-10">
                <div className="bg-white/5 border border-indigo-500/40 rounded-2xl p-5 flex items-center gap-4 text-left shadow-lg">
                  <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 border-indigo-400/40 bg-black/40">
                    <Image
                      src={ligasCompetencias.leader.image}
                      alt={ligasCompetencias.leader.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                      Coordinación General de Ligas
                    </span>
                    <h4 className="text-xl font-black uppercase text-white mt-1">
                      {ligasCompetencias.leader.name}
                    </h4>
                    <p className="text-white/60 text-xs mt-0.5">
                      {ligasCompetencias.leader.role}
                    </p>
                  </div>
                </div>

                {/* Connector */}
                <div className="w-0.5 h-8 bg-indigo-500/40 mx-auto my-1" />
              </div>

              {/* Dedicación Exclusiva */}
              <div className="max-w-2xl mx-auto mb-10">
                <div className="text-center mb-4">
                  <span className="text-[11px] font-black uppercase tracking-widest text-indigo-300/80">
                    Equipo Técnico de Ligas (Dedicación Exclusiva)
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ligasCompetencias.dedicacionExclusiva.map((member) => (
                    <div
                      key={member.name}
                      className="bg-white/5 hover:bg-white/8 border border-white/10 hover:border-indigo-500/40 rounded-2xl p-4 flex items-center gap-3.5 transition-all"
                    >
                      <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-white/20 bg-black/40">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-wider text-indigo-300 bg-indigo-500/15 px-2 py-0.5 rounded-full">
                          {member.tag}
                        </span>
                        <h5 className="text-base font-black uppercase text-white mt-1 leading-snug">
                          {member.name}
                        </h5>
                        <p className="text-white/50 text-[11px]">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Connector */}
                <div className="w-0.5 h-8 bg-indigo-500/40 mx-auto my-1" />
              </div>

              {/* Equipo Funcional de Ligas */}
              <div className="max-w-3xl mx-auto bg-black/30 border border-white/10 rounded-2xl p-6 sm:p-8 text-center">
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#36b37e] mb-3">
                  <UserCheck size={16} />
                  <span>Equipo Funcional de Ligas</span>
                </div>
                <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto mb-6">
                  Cuerpo operativo interdisciplinario integrado por árbitros, planilleros, testeadores y veedores que garantizan el correcto desarrollo en cada fecha disputada.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  {ligasCompetencias.equipoFuncional.map((item, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2.5 bg-white/5 border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white/80 font-medium"
                    >
                      <CheckCircle2 size={14} className="text-[#36b37e] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </FadeIn>
        </section>

        {/* Footer Link to Institutional */}
        <div className="text-center pt-8 border-t border-white/10">
          <Link
            href="/institucional"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white/60 hover:text-[#36b37e] transition-colors bg-white/5 hover:bg-white/10 px-5 py-3 rounded-2xl border border-white/10"
          >
            <span>Volver a La Asociación</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}
