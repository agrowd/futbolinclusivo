"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Calendar, 
  BarChart3, 
  ShieldCheck, 
  Users,
  MessageCircle,
  Clock
} from "lucide-react";
import { WHATSAPP_INSCRIPTION_TEAM_URL, WHATSAPP_INSCRIPTION_ESCUELA_URL } from "@/lib/whatsapp";

const MYGOL_URL = "https://futbolinclusivo.mygol.es/tournaments";

const quickFeatures = [
  {
    icon: Calendar,
    title: "Fixtures y Fechas",
    desc: "Consultá días, horarios y sedes de cada partido de la jornada en vivo.",
    color: "#36b37e",
    border: "border-[#36b37e]/30",
    bg: "from-[#36b37e]/15 to-transparent",
  },
  {
    icon: BarChart3,
    title: "Tablas de Posiciones",
    desc: "Puntos, partidos jugados, diferencia de gol y posiciones por zona.",
    color: "#75AADB",
    border: "border-[#75AADB]/30",
    bg: "from-[#75AADB]/15 to-transparent",
  },
  {
    icon: ShieldCheck,
    title: "Resultados Oficiales",
    desc: "Planillas validadas, goleadores, valla menos vencida y juego limpio.",
    color: "#f59e0b",
    border: "border-amber-500/30",
    bg: "from-amber-500/15 to-transparent",
  },
];

export default function TorneosClient() {
  return (
    <div className="bg-[#000B1A] text-white min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative pt-36 pb-16 overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#001A3D] via-[#00142A] to-[#000B1A]">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#36b37e_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="container relative z-10 px-4 mx-auto max-w-5xl text-center">
          
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#36b37e]/15 border border-[#36b37e]/30 text-[#36b37e] text-xs font-black uppercase tracking-widest mb-6 shadow-lg shadow-[#36b37e]/10"
          >
            <Sparkles size={14} />
            <span>Plataforma Oficial de Competiciones • MyGol</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6"
          >
            Torneos y <span className="text-[#36b37e]">Competencias</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-8 font-medium"
          >
            Seguí en tiempo real el fixture, las tablas de posiciones, resultados y estadísticas de la <strong className="text-white">Liga Inclusiva</strong> y la <strong className="text-white">Super Liga AFA</strong> en la plataforma oficial de MyGol.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#36b37e]"
          >
            <Clock size={15} />
            <span>Hacé clic en cualquiera de las pelotas para ingresar</span>
          </motion.div>

        </div>
      </section>

      {/* ===== LAS 2 PELOTAS INTERACTIVAS (CENTRAL SECTION) ===== */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-20">
            
            {/* PELOTA 1: LIGA INCLUSIVA */}
            <motion.a
              href={MYGOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
              transition={{ 
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
              }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-[#001A3D] to-[#000B1A] border-4 border-[#36b37e]/50 hover:border-[#36b37e] shadow-[0_0_60px_rgba(54,179,126,0.35)] hover:shadow-[0_0_90px_rgba(54,179,126,0.6)] overflow-hidden group flex flex-col items-center justify-center text-center p-6 sm:p-8 cursor-pointer transition-all duration-500 hover:scale-105 active:scale-95"
            >
              {/* Soccer Ball Pattern Overlay */}
              <div 
                className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" 
                style={{
                  background: 'radial-gradient(circle at 20% 20%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 50% 10%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 80% 20%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 10% 50%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 90% 50%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 20% 80%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 50% 90%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 80% 80%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 35% 35%, transparent 6%, #000 6%, #000 10%, transparent 10%), radial-gradient(circle at 65% 35%, transparent 6%, #000 6%, #000 10%, transparent 10%), radial-gradient(circle at 35% 65%, transparent 6%, #000 6%, #000 10%, transparent 10%), radial-gradient(circle at 65% 65%, transparent 6%, #000 6%, #000 10%, transparent 10%)'
                }} 
              />

              {/* Inner Content */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 border-2 border-[#36b37e]/50 flex items-center justify-center mb-3 sm:mb-4 shadow-[0_0_25px_rgba(54,179,126,0.5)] group-hover:scale-110 group-hover:border-[#36b37e] transition-transform duration-300">
                  <Image src="/logo.png" alt="Andar FC" width={56} height={56} className="object-contain" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1 uppercase">
                  Liga Inclusiva
                </h3>
                
                <p className="text-[#36b37e] text-xs sm:text-sm font-black uppercase tracking-wider mb-2">
                  Desde 1998
                </p>
                
                <p className="text-white/75 text-xs sm:text-sm leading-relaxed mb-4 max-w-[200px]">
                  Fútbol inclusivo para todos
                </p>

                <span className="inline-flex items-center gap-2 text-white font-black text-xs sm:text-sm uppercase tracking-wider bg-[#36b37e] hover:bg-[#20ba59] px-5 py-2.5 rounded-full shadow-lg shadow-[#36b37e]/30 group-hover:gap-3 transition-all duration-300">
                  <span>VER TORNEO</span>
                  <ExternalLink size={15} />
                </span>
              </div>
            </motion.a>

            {/* PELOTA 2: SUPER LIGA AFA */}
            <motion.a
              href={MYGOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
              transition={{ 
                opacity: { duration: 0.5, delay: 0.15 },
                scale: { duration: 0.5, delay: 0.15 },
                y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }
              }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-[#6B1026] to-[#2B050D] border-4 border-[#75AADB]/50 hover:border-[#75AADB] shadow-[0_0_60px_rgba(117,170,219,0.35)] hover:shadow-[0_0_90px_rgba(117,170,219,0.6)] overflow-hidden group flex flex-col items-center justify-center text-center p-6 sm:p-8 cursor-pointer transition-all duration-500 hover:scale-105 active:scale-95"
            >
              {/* Soccer Ball Pattern Overlay */}
              <div 
                className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" 
                style={{
                  background: 'radial-gradient(circle at 20% 20%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 50% 10%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 80% 20%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 10% 50%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 90% 50%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 20% 80%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 50% 90%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 80% 80%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 35% 35%, transparent 6%, #000 6%, #000 10%, transparent 10%), radial-gradient(circle at 65% 35%, transparent 6%, #000 6%, #000 10%, transparent 10%), radial-gradient(circle at 35% 65%, transparent 6%, #000 6%, #000 10%, transparent 10%), radial-gradient(circle at 65% 65%, transparent 6%, #000 6%, #000 10%, transparent 10%)'
                }} 
              />

              {/* Inner Content */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-2.5 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center shadow-md">
                    <Image src="/logo-afa.png" alt="AFA" width={38} height={38} className="object-contain" />
                  </div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center shadow-md">
                    <Image src="/satlogo.png" alt="SAT" width={38} height={38} className="object-contain" />
                  </div>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1 uppercase">
                  Super Liga
                </h3>
                
                <p className="text-[#75AADB] text-xs sm:text-sm font-black uppercase tracking-wider mb-2">
                  AFA & SAT
                </p>
                
                <p className="text-white/75 text-xs sm:text-sm leading-relaxed mb-4 max-w-[200px]">
                  Máxima categoría del fútbol inclusivo
                </p>

                <span className="inline-flex items-center gap-2 text-white font-black text-xs sm:text-sm uppercase tracking-wider bg-[#75AADB] hover:bg-[#5b95cb] px-5 py-2.5 rounded-full shadow-lg shadow-[#75AADB]/30 group-hover:gap-3 transition-all duration-300">
                  <span>VER TORNEO</span>
                  <ExternalLink size={15} />
                </span>
              </div>
            </motion.a>

          </div>

          {/* CENTRAL DIRECT ACTION LINK */}
          <div className="mt-14 text-center">
            <a
              href={MYGOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-black text-sm uppercase tracking-wider backdrop-blur-md shadow-2xl transition-all hover:scale-105"
            >
              <Trophy size={20} className="text-[#36b37e]" />
              <span>Acceder al Portal Completo en MyGol</span>
              <ExternalLink size={16} className="text-white/60" />
            </a>
          </div>

        </div>
      </section>

      {/* QUICK FEATURES / WHAT YOU'LL FIND IN MYGOL */}
      <section className="py-16 border-t border-b border-white/5 bg-[#001026]/40">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#36b37e] block mb-2">
              Información en Tiempo Real
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Todo lo que encontrás en MyGol
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${feat.bg} border ${feat.border} backdrop-blur-sm flex flex-col justify-between`}
                >
                  <div>
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: `${feat.color}20`, color: feat.color, border: `1px solid ${feat.color}40` }}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-black uppercase text-white mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-white/65 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                  
                  <a
                    href={MYGOL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider mt-6 transition-colors"
                    style={{ color: feat.color }}
                  >
                    <span>Ir a MyGol</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FOOTER CTA / INSCRIBIR EQUIPO */}
      <section className="py-20 bg-gradient-to-b from-[#000B1A] to-[#00060F]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          
          <div className="w-14 h-14 rounded-2xl bg-[#36b37e]/15 border border-[#36b37e]/30 text-[#36b37e] flex items-center justify-center mx-auto mb-6">
            <Trophy size={26} />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-4">
            ¿Querés participar en los torneos oficiales?
          </h2>

          <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-8">
            Inscribí a tu club, institución u organización a la Liga BA, Superliga AFA o sumate a la Escuelita Infantil directamente por WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_INSCRIPTION_TEAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-[#25D366]/25 transition-all transform hover:scale-105"
            >
              <MessageCircle size={18} />
              <span>Inscribir Equipo vía WhatsApp</span>
            </a>

            <a
              href={WHATSAPP_INSCRIPTION_ESCUELA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-all"
            >
              <Users size={18} />
              <span>Escuelita Infantil</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
