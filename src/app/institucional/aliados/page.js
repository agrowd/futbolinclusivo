import Link from "next/link";
import { Users, Heart, Target, ExternalLink, ShieldCheck, Handshake } from "lucide-react";

export const metadata = {
  title: "Nuestros Aliados - Fútbol Inclusivo",
  description: "Formando equipos de equipos. Conocé las organizaciones que confían en nuestro proyecto.",
};

const allies = [
  {
    name: "AFA",
    description: "La Asociación del Fútbol Argentino acompaña a la Liga de Fútbol Inclusiva cediendo las instalaciones del Predio Lionel Andrés Messi en Ezeiza.",
    website: "https://www.afa.com.ar",
    color: "#00A651",
    tag: "Institucional",
  },
  {
    name: "ADIDAS",
    description: "ADIDAS Argentina y su Fundación acompañan a la Asociación Civil Andar desde 2007 fortaleciendo el deporte social en cada comunidad.",
    website: "https://www.adidas.com.ar",
    color: "#ffffff",
    tag: "Deportivo",
  },
  {
    name: "streetfootballworld",
    description: "Red mundial de organizaciones que utilizan el fútbol como herramienta para empoderar a los jóvenes en todo el mundo.",
    website: "https://www.streetfootballworld.org",
    color: "#FF6B35",
    tag: "Red Global",
  },
  {
    name: "FIFA Foundation",
    description: "Apoyo institucional a través de programas globales que potencian el desarrollo integral de las comunidades vulnerables.",
    website: "https://www.fifa.com",
    color: "#00529F",
    tag: "Internacional",
  },
  {
    name: "Secretaría de Deportes de la Nación",
    description: "Acompañamiento a la Asociación Civil Andar para expandir el alcance de la Liga Nacional de Fútbol Inclusiva en todo el país.",
    website: "https://www.argentina.gob.ar/turismoydeportes",
    color: "#00A651",
    tag: "Público",
  },
  {
    name: "Fundación Laureus",
    description: "Articulación constante desde el año 2015 para el desarrollo del proyecto de Escuelas de Fútbol Inclusivas.",
    website: "https://www.laureus.com",
    color: "#FFD700",
    tag: "Fundación",
  },
  {
    name: "Club Estudiantes de la Plata",
    description: "Alianza estratégica entre la Fundación Estudiantes de La Plata y Andar para el desarrollo de fechas y torneos.",
    website: "https://www.estudiantesdelaplata.com",
    color: "#E74C3C",
    tag: "Club",
  },
  {
    name: "Club Atlético San Lorenzo de Almagro",
    description: "Acciones conjuntas y celebración del Partido 'Fútbol por la Inclusión' en el marco de torneos y festivales.",
    website: "https://sanlorenzo.com.ar",
    color: "#2980B9",
    tag: "Club",
  },
  {
    name: "Club Atlético River Plate",
    description: "Histórico acompañamiento a la Liga de Fútbol Inclusiva siendo anfitrión de ceremonias y finales deportivas.",
    website: "https://www.cariverplate.com.ar",
    color: "#E74C3C",
    tag: "Club",
  },
];

export default function AliadosPage() {
  return (
    <div className="bg-[#000B1A] text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#001A3D] to-[#000B1A]">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#36b37e_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#36b37e]/15 border border-[#36b37e]/30 text-[#36b37e] text-xs font-black uppercase tracking-widest mb-6">
            <Handshake size={14} />
            <span>RED DE APOYO INSTITUCIONAL</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white mb-6 leading-none">
            Formando Equipos <br />
            <span className="text-[#36b37e]">de Equipos</span>
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Desde la Liga de Fútbol Inclusiva creemos en relaciones a largo plazo y apostamos a alianzas estratégicas que potencien el impacto en cada comunidad.
          </p>
        </div>
      </section>

      {/* Allies Grid */}
      <section className="py-20 container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allies.map((ally, index) => (
            <div
              key={index}
              className="bg-white/[0.03] border border-white/10 hover:border-[#36b37e]/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg border transition-transform group-hover:scale-110 shadow-lg"
                    style={{
                      backgroundColor: `${ally.color}15`,
                      color: ally.color,
                      borderColor: `${ally.color}30`,
                    }}
                  >
                    {ally.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                    {ally.tag}
                  </span>
                </div>

                <h3 className="text-xl font-black uppercase text-white tracking-tight mb-3 group-hover:text-[#36b37e] transition-colors">
                  {ally.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                  {ally.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-white/40">Alianza Estratégica</span>
                {ally.website && ally.website !== "#" && (
                  <a
                    href={ally.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#36b37e] font-black text-xs uppercase tracking-wider flex items-center gap-1 hover:gap-1.5 transition-all"
                  >
                    <span>Sitio Web</span>
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
