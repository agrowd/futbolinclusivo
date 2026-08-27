import { Map, Trophy, Network, MessageSquare, Flame, Globe2, Award, Users } from "lucide-react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Festival LATAM - Fútbol Inclusivo",
  description: "Encuentro internacional de organizaciones promovido por la Asociación Civil Andar.",
};

const orgLatam = [
  {
    country: "Brasil",
    color: "#27AE60",
    orgs: [
      { n: "Fundação Eprocad", p: "Formación integral de niños y adolescentes a través del deporte." },
      { n: "I. Fazer Acontecer", p: "Actividades educativas orientadas al desarrollo social y deportivo." },
      { n: "Instituto Formação", p: "Desarrollo comunitario y oportunidades para jóvenes." },
    ],
  },
  {
    country: "Chile",
    color: "#C0392B",
    orgs: [
      { n: "Fundación Educere", p: "Programas educativos y liderazgo juvenil en comunidades vulnerables." },
      { n: "Fútbol Más", p: "Promoción de resiliencia, bienestar y felicidad en la infancia." },
    ],
  },
  {
    country: "Colombia",
    color: "#F1C40F",
    orgs: [
      { n: "F. Tiempo De Juego", p: "Habilidades para la vida y resolución pacífica de conflictos mediante el fútbol." },
      { n: "Fútbol Con Corazón", p: "Promoviendo el respeto, la solidaridad y la igualdad de género." },
    ],
  },
  {
    country: "Perú & Uruguay",
    color: "#2980B9",
    orgs: [
      { n: "Los Pioneros", p: "Generando cambios positivos y liderazgo juvenil en Lima." },
      { n: "Gurises Unidos", p: "Protección y promoción integral de los derechos de la niñez." },
    ],
  },
];

export default function FestivalLatam() {
  return (
    <div className="bg-[#000B1A] text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#001A3D] to-[#000B1A]">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#E67E22_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E67E22]/15 border border-[#E67E22]/30 text-[#E67E22] text-xs font-black uppercase tracking-widest mb-6">
            <Globe2 size={14} />
            <span>EVENTO INTERNACIONAL</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white mb-6">
            Festival Latinoamericano <br />
            <span className="text-[#E67E22]">de Fútbol 3</span>
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Empoderamiento juvenil, igualdad de género e inclusión social en toda la región latinoamericana.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 container mx-auto px-6 max-w-5xl">
        <div className="space-y-16">
          <FadeIn>
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-xl">
              <div className="flex items-center gap-3 text-[#E67E22] mb-4">
                <Flame size={28} />
                <h2 className="text-2xl font-black uppercase tracking-tight">
                  Resumen del Festival
                </h2>
              </div>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                Más de 140 jóvenes líderes de 16 organizaciones y 10 países se reunieron en Buenos Aires para demostrar el poder transformador del fútbol como herramienta de inclusión social, convivencia y equidad comunitaria. Un hito regional impulsado por la Asociación Civil Andar y la red streetfootballworld.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#2980B9]/20 text-[#2980B9] flex items-center justify-center mb-6 border border-[#2980B9]/30">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="text-xl font-black uppercase text-white mb-3">Foro Juvenil</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Jóvenes de toda la región compartieron experiencias de vida y proyectos comunitarios, debatiendo cómo el deporte permite superar barreras y generar oportunidades reales.
                  </p>
                </div>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E67E22]/20 text-[#E67E22] flex items-center justify-center mb-6 border border-[#E67E22]/30">
                    <Trophy size={24} />
                  </div>
                  <h3 className="text-xl font-black uppercase text-white mb-3">Torneo en AFA</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    El Predio Lionel Andrés Messi de la AFA en Ezeiza fue la sede central de los partidos, donde el juego limpio, el diálogo y el respeto mutuo guiaron cada encuentro.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Organizations Grid */}
          <FadeIn delay={0.2}>
            <div>
              <div className="text-center mb-12">
                <span className="text-[#E67E22] text-xs font-black uppercase tracking-widest block mb-2">Red Latinoamericana</span>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
                  Organizaciones Participantes
                </h2>
              </div>

              <div className="space-y-12">
                {orgLatam.map((group, idx) => (
                  <div key={idx}>
                    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: group.color }} />
                      <h3 className="text-sm font-black uppercase tracking-widest text-white">
                        {group.country}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {group.orgs.map((org, oidx) => (
                        <div
                          key={oidx}
                          className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg group"
                        >
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black mb-4 border transition-transform group-hover:scale-110"
                            style={{
                              backgroundColor: `${group.color}20`,
                              color: group.color,
                              borderColor: `${group.color}40`,
                            }}
                          >
                            <Users size={22} />
                          </div>
                          <h4 className="text-base font-black uppercase text-white mb-2 group-hover:text-[#36b37e] transition-colors">
                            {org.n}
                          </h4>
                          <p className="text-xs text-white/50 leading-relaxed">
                            {org.p}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
