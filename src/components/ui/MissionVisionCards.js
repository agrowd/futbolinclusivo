"use client";
import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";

const cards = [
  {
    title: "Misión",
    icon: Target,
    color: "#36b37e",
    text: "Promover la participación deportiva de personas con discapacidad, equiparando oportunidades y construyendo una sociedad más justa e inclusiva a través del fútbol."
  },
  {
    title: "Visión",
    icon: Eye,
    color: "#E67E22",
    text: "Ser la organización referente en el desarrollo del fútbol inclusivo a nivel nacional e internacional, impulsando políticas públicas de integración y autonomía."
  },
  {
    title: "Valores",
    icon: Heart,
    color: "#f8285a",
    text: "Respeto, Compañerismo, Diversidad, Transparencia y el Fair Play como pilares fundamentales de cada una de nuestras acciones."
  }
];

export default function MissionVisionCards() {
  return (
    <section className="py-20">
      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="group relative bg-[#001A3D]/40 border border-white/10 p-8 rounded-[40px] hover:bg-white/5 transition-all overflow-hidden"
          >
            <div 
              className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full"
              style={{ background: card.color }}
            />
            
            <div 
              className="w-16 h-16 flex items-center justify-center rounded-2xl mb-8 group-hover:scale-110 transition-transform"
              style={{ background: `${card.color}20`, color: card.color }}
            >
              <card.icon size={32} />
            </div>

            <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">{card.title}</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              {card.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
