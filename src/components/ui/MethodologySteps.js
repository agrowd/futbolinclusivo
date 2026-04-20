"use client";
import { motion } from "framer-motion";
import { Users, Goal, MessageSquare } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Los Acuerdos",
    desc: "Buscamos el consenso inicial. Los participantes definen las reglas de convivencia y comportamiento que regirán el encuentro.",
    icon: Users,
    color: "#36b37e"
  },
  {
    step: "02",
    title: "El Partido",
    desc: "La acción deportiva. Se juega aplicando los acuerdos previos, priorizando el fair play sobre el resultado competitivo.",
    icon: Goal,
    color: "#E67E22"
  },
  {
    step: "03",
    title: "La Reflexión",
    desc: "Evaluación compartida. Al finalizar, el grupo analiza si se cumplieron los acuerdos y se otorgan puntos por valores.",
    icon: MessageSquare,
    color: "#36a3f7"
  }
];

export default function MethodologySteps() {
  return (
    <section className="py-24 bg-white/3 rounded-[60px] border border-white/5 my-16 overflow-hidden">
      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-6 tracking-tighter">Metodología de <span className="text-[#36b37e]">Tres Tiempos</span></h2>
          <p className="text-white/50 text-lg">Un modelo de aprendizaje basado en la convivencia y el fútbol inclusivo.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector line for desktop */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/5 hidden md:block -translate-y-1/2 z-0" />
          
          {steps.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="relative mb-10">
                <div 
                  className="w-24 h-24 rounded-full flex items-center justify-center border-4 border-[#000B1A] shadow-2xl transition-all group-hover:scale-110"
                  style={{ background: item.color }}
                >
                  <item.icon size={40} className="text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-black text-xs shadow-xl">
                   {item.step}
                </div>
              </div>

              <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                 {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
