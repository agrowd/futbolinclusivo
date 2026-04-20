"use client";
import { motion } from "framer-motion";

const milestones = [
  { year: "1998", title: "Nace un Sueño", desc: "Se funda la Liga de Fútbol Inclusiva en Moreno con 8 equipos pioneros." },
  { year: "2005", title: "Primeras Ligas", desc: "Expansión regional y consolidación de la metodología sistemática." },
  { year: "2011", title: "Expansión Nacional", desc: "La metodología se extiende a nivel federal, alcanzando múltiples provincias." },
  { year: "2018", title: "Hito FIFA - Rusia", desc: "Reconocimiento internacional participando en eventos vinculados al Mundial." },
  { year: "2019", title: "Festival Latinoamericano", desc: "Organización del primer gran encuentro regional de fútbol por la inclusión." }
];

export default function Timeline() {
  return (
    <section className="py-24 border-t border-white/5 bg-[#030712]">
      <div className="container px-6">
        <h2 className="text-4xl font-black uppercase text-center mb-20 tracking-tighter">Nuestra <span className="text-[#36b37e]">Trayectoria</span></h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line on the Left */}
          <div className="absolute left-[20px] md:left-[45px] top-0 bottom-0 w-1 bg-[#36b37e]/30" />

          {milestones.map((item, idx) => (
            <div key={idx} className="relative mb-20 pl-16 md:pl-32 flex flex-col group">
              {/* Marker Circle */}
              <div className="absolute left-[7px] md:left-[32px] top-0 w-[26px] h-[26px] md:w-[32px] md:h-[32px] bg-[#030712] border-4 border-[#36b37e] rounded-full z-10 flex items-center justify-center">
                 <div className="w-2 h-2 bg-[#36b37e] rounded-full" />
              </div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#0f172a] p-8 rounded-[32px] border border-white/5 hover:border-[#36b37e]/30 transition-all shadow-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-black text-[#36b37e] opacity-80">{item.year}</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <h4 className="text-xl font-bold uppercase mb-3 text-white">{item.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

