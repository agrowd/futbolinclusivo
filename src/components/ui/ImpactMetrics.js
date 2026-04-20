"use client";
import { motion } from "framer-motion";
import { Users, Globe, Award, Calendar } from "lucide-react";

const stats = [
  { 
    label: "Años de Trayectoria", 
    value: "25+", 
    icon: Calendar,
    color: "#36b37e",
    desc: "Desde 1998 ininterrumpidamente"
  },
  { 
    label: "Participantes Anuales", 
    value: "1000+", 
    icon: Users,
    color: "#E67E22",
    desc: "Jóvenes y adultos en red"
  },
  { 
    label: "Provincias Alcanzadas", 
    value: "06", 
    icon: Globe,
    color: "#36a3f7",
    desc: "Red federal en expansión"
  },
  { 
    label: "Equipos Formados", 
    value: "200+", 
    icon: Award,
    color: "#f8285a",
    desc: "En todas las categorías"
  }
];

export default function ImpactMetrics() {
  return (
    <section className="py-24 bg-[#000D21] border-t border-white/5">
      <div className="container px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center group"
            >
              <div 
                className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform"
                style={{ color: stat.color }}
              >
                <stat.icon size={32} />
              </div>
              <div 
                className="text-4xl md:text-6xl font-black mb-2 tracking-tighter"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-white font-bold uppercase text-xs tracking-widest mb-2 opacity-80">
                {stat.label}
              </div>
              <div className="text-white/30 text-[10px] uppercase font-black tracking-tighter">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
