"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Trophy,
  Users,
  Calendar,
  Heart,
  Newspaper,
  Zap,
  Star,
  PlayCircle,
  Image as ImageIcon,
  UserPlus,
  ArrowRight,
  ChevronRight,
} from "lucide-react";


const actionButtons = [
  { label: "NOTICIAS", icon: Newspaper, href: "/novedades", color: "#008D4D" },
  { label: "ÚLTIMO", icon: Zap, href: "/novedades", color: "#001A3D" },
  { label: "FIGURAS", icon: Star, href: "/institucional/comision", color: "#001A3D" },
  { label: "VIDEOS", icon: PlayCircle, href: "/multimedia", color: "#001A3D" },
  { label: "FOTOS", icon: ImageIcon, href: "/multimedia", color: "#001A3D" },
  { label: "INSCRIPCIÓN", icon: UserPlus, href: "/inscripcion", color: "#E67E22" },
];

const recentNews = [
  {
    title: "Nace Andar FC: Un nuevo horizonte para el fútbol inclusivo",
    date: "29 Jun 2022",
    image: "https://futbolinclusivo.org.ar/app/uploads/2022/07/MG_3241-Copiar-960x600.jpg",
    category: "INSTITUCIONAL"
  },
  {
    title: "Ceremonia de Apertura 2024: Más de 1000 sueños en marcha",
    date: "10 Mar 2024",
    image: "https://futbolinclusivo.org.ar/app/uploads/2021/12/FUTBOL-111221-89-Copiar-960x600.jpg",
    category: "LIGA BA"
  },
  {
    title: "AFA SOMOS TODXS: El torneo de verano que rompe barreras",
    date: "16 Feb 2024",
    image: "https://futbolinclusivo.org.ar/app/uploads/2024/02/WhatsApp-Image-2024-02-16-at-15.15.10-960x584.jpeg",
    category: "LIGA NACIONAL"
  }
];

const aliados = [
  { name: "FIFA Foundation", logo: "https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/a/aa/FIFA_logo_without_slogan.svg&n=-1" },
  { name: "Common Goal", logo: "https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/8/84/Logo_Common_Goal.svg&n=-1" },
  { name: "UEFA Foundation", logo: "https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/e/ef/Uefa_logo.svg&n=-1" },
  { name: "AFA", logo: "https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/c/c4/Afa_gold_logo24.svg&n=-1" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function HomePage() {
  return (
    <div className="bg-[#000B1A] text-white min-h-screen">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-[1]"
        >
          <Image 
            src="https://futbolinclusivo.org.ar/app/uploads/2018/12/MG_0325.jpg"
            alt="Fútbol Inclusivo Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000B1A] via-[#000B1A]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000B1A] to-transparent" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-[2]">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-3xl"
          >
            <motion.div variants={itemVariants} className="inline-block px-6 py-2 bg-[#36b37e] rounded-full font-black text-[10px] tracking-[2px] mb-8 shadow-[0_5px_20px_rgba(54,179,126,0.3)] border border-white/20 uppercase">
              DESDE 1998
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[0.9] tracking-tighter">
              EL FÚTBOL ES <br/>
              <span className="text-[#36b37e] drop-shadow-[0_0_10px_rgba(54,179,126,0.2)]">PARA TODOS.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl leading-relaxed text-white/70 mb-16 max-w-xl px-2 sm:px-0">
              Equiparamos oportunidades y construimos una sociedad más inclusiva a través del deporte más lindo del mundo.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
              <Link 
                href="/inscripcion" 
                className="bg-white text-black font-black px-10 md:px-14 py-5 md:py-6 rounded-2xl transition-all hover:bg-[#36b37e] hover:text-white hover:scale-105 active:scale-95 shadow-2xl uppercase text-[11px] md:text-[12px] tracking-[3px] md:tracking-[4px] border-4 border-white"
              >
                INSCRIBIR EQUIPO
              </Link>
              <Link 
                href="/institucional" 
                className="bg-white/10 text-white font-black px-10 md:px-14 py-5 md:py-6 rounded-2xl border-4 border-white/20 transition-all hover:bg-white/20 active:scale-95 backdrop-blur-xl uppercase text-[11px] md:text-[12px] tracking-[3px] md:tracking-[4px]"
              >
                CONOCENOS
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== ACTION GRID ===== */}
      <section className="-mt-[40px] md:-mt-[55px] relative z-20 px-6 mb-32 md:mb-48">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-7xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/10 border-2 border-white/10 rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
            {actionButtons.map((btn, idx) => (
              <Link 
                key={idx} 
                href={btn.href}
                style={{ backgroundColor: btn.color }}
                className="group p-10 md:p-16 flex flex-col items-center justify-center gap-4 md:gap-6 transition-all hover:bg-white/[0.03] active:scale-95"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/10 rounded-full transition-transform group-hover:scale-110">
                  <btn.icon size={20} className="text-white" />
                </div>
                <span className="text-white font-extrabold text-[9px] md:text-[10px] tracking-widest text-center">{btn.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== RECENT NEWS & RESULTS ===== */}
      <section className="py-24 md:py-48">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16 md:gap-24">
            
            {/* LATEST NEWS */}
            <div className="space-y-10">
              <div className="flex justify-between items-end border-b border-white/5 pb-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter">ÚLTIMAS NOVEDADES</h2>
                <Link href="/novedades" className="text-[#36b37e] font-bold text-xs flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest hidden sm:flex">
                  VER TODAS <ArrowRight size={16} />
                </Link>
              </div>

              <div className="grid gap-12 md:gap-16">
                {recentNews.map((news, idx) => (
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    key={idx}
                  >
                    <Link href="/novedades" className="group flex flex-col md:flex-row gap-8 bg-white/[0.02] rounded-3xl overflow-hidden border border-white/5 transition-all hover:bg-white/[0.05] hover:border-white/20 shadow-lg p-3 md:p-4">
                      <div className="relative w-full md:w-80 h-56 md:h-64 shrink-0 overflow-hidden rounded-2xl">
                        <Image 
                          src={news.image} 
                          alt={news.title} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      </div>
                      <div className="p-6 md:p-12 flex flex-col justify-center">
                        <span className="text-[#36b37e] font-black text-[11px] md:text-[12px] tracking-[4px] md:tracking-[5px] uppercase mb-4 md:mb-6">{news.category}</span>
                        <h3 className="text-white text-xl md:text-3xl lg:text-4xl font-black leading-tight group-hover:text-[#36b37e] transition-colors">{news.title}</h3>
                        <p className="text-white/40 text-sm md:text-base mt-6 md:mt-8 font-bold flex items-center gap-3">
                          <Calendar size={16} /> {news.date}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-16">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#004d26] to-[#002D16] rounded-3xl p-10 md:p-12 text-center shadow-2xl relative overflow-hidden group border border-white/5"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
                <Trophy size={56} className="text-white/20 mx-auto mb-6" />
                <h3 className="font-black text-2xl md:text-3xl mb-2 tracking-tight">FINALES 2025</h3>
                <p className="text-white/60 text-[10px] md:text-[11px] font-black tracking-[4px] uppercase mb-8">6 DE DICIEMBRE</p>
                <div className="flex justify-center gap-4 md:gap-6">
                  {[ {v: "00", l: "DÍAS"}, {v: "00", l: "HRS"}, {v: "00", l: "MIN"} ].map((t, i) => (
                    <div key={i} className="flex-1">
                      <div className="text-3xl md:text-4xl font-black mb-1">{t.v}</div>
                      <div className="text-[9px] md:text-[10px] font-black opacity-40 tracking-[2px] uppercase">{t.l}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#001229] rounded-3xl p-8 md:p-10 border border-white/5 shadow-xl"
              >
                <h3 className="text-[10px] md:text-sm font-black mb-8 flex items-center gap-4 tracking-[4px] uppercase">
                  <Calendar size={20} className="text-[#36b37e]" />
                  PARTIDOS RECIENTES
                </h3>
                
                <div className="grid gap-6">
                  {[
                    { t1: "Andar A", t2: "CEF 123", s1: 2, s2: 0 },
                    { t1: "Boca", t2: "San Lorenzo", s1: 1, s2: 1 },
                  ].map((match, i) => (
                    <div key={i} className="bg-white rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between text-black shadow-2xl border border-black/5 hover:scale-[1.02] transition-transform gap-4 md:gap-6">
                      <div className="flex-1 text-center sm:text-right font-black text-[12px] md:text-[14px] uppercase tracking-tight w-full">{match.t1}</div>
                      <div className="bg-gray-100 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-xl md:text-2xl flex gap-4 md:gap-6 shadow-inner shrink-0">
                        <span>{match.s1}</span>
                        <span className="opacity-20 font-light">-</span>
                        <span>{match.s2}</span>
                      </div>
                      <div className="flex-1 text-center sm:text-left font-black text-[12px] md:text-[14px] uppercase tracking-tight w-full">{match.t2}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== COMPETENCIA SECTION ===== */}
      <section className="bg-[#000B1A] border-y border-white/5 relative overflow-hidden py-32 md:py-48">
        {/* Subtle Decorative Background */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 opacity-[0.03] select-none pointer-events-none whitespace-nowrap hidden lg:block">
          <span className="text-[180px] font-black uppercase tracking-tighter text-white">Competencia</span>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 uppercase text-white">Competencia</h2>
            <div className="w-32 h-1.5 bg-[#36b37e] mx-auto rounded-full shadow-[0_0_20px_rgba(54,179,126,0.3)]" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* FIXTURE */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#001229] border border-white/10 rounded-[40px] shadow-2xl flex flex-col group hover:border-[#36b37e]/30 transition-all duration-500 overflow-hidden p-8 md:p-14 lg:p-16"
            >
              <div className="flex items-center gap-6 mb-8 md:mb-12">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#36b37e]/10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                  <Calendar className="text-[#36b37e]" size={28} />
                </div>
                <h3 className="text-xl md:text-2xl font-black tracking-widest uppercase text-white">Fixture</h3>
              </div>
              
              <div className="flex-1 flex flex-col gap-6 md:gap-10 mb-10 md:mb-12">
                <p className="text-white/60 text-base md:text-lg leading-relaxed">Consulta todos los partidos, horarios y sedes de la próxima fecha en todas las categorías.</p>
                <div className="p-8 md:p-10 bg-white/5 rounded-3xl border border-white/10 text-center shadow-inner mt-auto">
                  <span className="text-[10px] md:text-[12px] font-black tracking-[3px] md:tracking-[4px] text-[#36b37e] block mb-4 md:mb-6 uppercase">Próxima Fecha</span>
                  <p className="font-black text-2xl md:text-3xl text-white mb-2 leading-tight">Fecha 12 - Liga BA</p>
                  <p className="text-sm md:text-base text-white/40 font-bold uppercase tracking-wider">Sábado 15 de Mayo</p>
                </div>
              </div>

              <Link href="/canchas" className="w-full bg-white/5 hover:bg-[#36b37e] text-white font-black py-6 md:py-7 rounded-2xl text-center transition-all border border-white/10 uppercase text-[11px] md:text-[12px] tracking-[3px] md:tracking-[4px] hover:shadow-2xl hover:-translate-y-1">
                VER FIXTURE COMPLETO
              </Link>
            </motion.div>

            {/* GOLEADORES */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#001229] border border-white/10 rounded-[40px] shadow-2xl flex flex-col group hover:border-[#36b37e]/30 transition-all duration-500 overflow-hidden p-8 md:p-14 lg:p-16"
            >
              <div className="flex items-center gap-6 mb-8 md:mb-12">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#36b37e]/10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                  <Trophy className="text-[#36b37e]" size={28} />
                </div>
                <h3 className="text-xl md:text-2xl font-black tracking-widest uppercase text-white">Goleadores</h3>
              </div>

              <div className="flex-1 flex flex-col gap-4 md:gap-6 mb-10 md:mb-12">
                {[
                  { name: "Juan Pérez", team: "Andar A", goals: 12 },
                  { name: "S. Gómez", team: "CEF 123", goals: 10 },
                  { name: "R. Díaz", team: "San Lorenzo", goals: 9 },
                ].map((p, i) => (
                  <div key={i} className="flex justify-between items-center p-6 md:p-8 bg-white/[0.03] rounded-3xl border border-white/5 hover:bg-white/[0.06] transition-all duration-500">
                    <div className="flex items-center gap-6 md:gap-8">
                      <span className="text-[#36b37e] text-2xl md:text-3xl font-black italic opacity-50">{i+1}</span>
                      <div>
                        <p className="font-black text-lg md:text-xl uppercase leading-tight text-white mb-2">{p.name}</p>
                        <p className="text-[10px] md:text-[11px] text-white/40 font-bold uppercase tracking-widest">{p.team}</p>
                      </div>
                    </div>
                    <span className="bg-[#36b37e] text-white font-black px-8 md:px-10 py-3 md:py-4 rounded-2xl text-lg md:text-xl shadow-[0_10px_20px_rgba(54,179,126,0.3)] shrink-0">{p.goals}</span>
                  </div>
                ))}
              </div>

              <Link href="/novedades" className="w-full bg-white/5 hover:bg-[#36b37e] text-white font-black py-6 md:py-7 rounded-2xl text-center transition-all border border-white/10 uppercase text-[11px] md:text-[12px] tracking-[3px] md:tracking-[4px] hover:shadow-2xl hover:-translate-y-1">
                TABLA COMPLETA
              </Link>
            </motion.div>

            {/* PARTICIPÁ (Highlight Card) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#1a5e42] to-[#000B1A] border-4 border-[#36b37e]/50 rounded-[40px] shadow-2xl flex flex-col relative overflow-hidden group p-8 md:p-14 lg:p-16"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#36b37e]/10 blur-[100px] -mr-32 -mt-32" />
              
              <div className="flex items-center gap-6 mb-8 md:mb-12 relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#36b37e] rounded-2xl flex items-center justify-center shadow-lg">
                  <Star className="text-white" size={28} />
                </div>
                <h3 className="text-xl md:text-2xl font-black tracking-widest uppercase text-white">Participá</h3>
              </div>

              <div className="flex-1 flex flex-col gap-6 md:gap-10 mb-10 md:mb-12 relative z-10">
                <p className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tighter">Sumate a la liga más grande del país.</p>
                <p className="text-white/60 text-lg font-bold">Inscribí a tu equipo o vení a disfrutar de las finales en familia.</p>
                <div className="bg-white/5 p-8 md:p-10 rounded-[35px] backdrop-blur-sm border border-white/10 mt-auto">
                  <span className="text-[10px] md:text-[12px] font-black tracking-[3px] md:tracking-[4px] text-[#36b37e] block mb-4 md:mb-6 uppercase">Entradas</span>
                  <p className="font-black text-3xl md:text-4xl text-white mb-2">Finales 2025</p>
                  <p className="text-sm md:text-base text-white/40 font-bold uppercase tracking-widest">Próximamente disponible</p>
                </div>
              </div>

              <Link href="/inscripcion" className="w-full bg-[#36b37e] text-white font-black py-7 md:py-9 rounded-2xl text-center transition-all hover:bg-[#2da372] hover:shadow-2xl uppercase text-[12px] md:text-[14px] tracking-[5px] md:tracking-[8px] relative z-10 active:scale-95 hover:-translate-y-1">
                INSCRIBITE AHORA
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== ALIADOS SECTION ===== */}
      <section className="py-24 md:py-48 border-t border-white/5 bg-[#000814]">
        <div className="container mx-auto px-6">
          <h2 className="text-[10px] md:text-[12px] text-white/40 font-black tracking-[4px] md:tracking-[6px] uppercase text-center mb-16 md:mb-20">PARTNERS GLOBALES</h2>
          <div className="flex justify-center gap-16 md:gap-32 lg:gap-48 flex-wrap items-center">
            {aliados.map((a, i) => (
              <motion.div 
                whileHover={{ scale: 1.15 }}
                key={i} 
                className="relative w-24 md:w-40 h-12 md:h-16 group cursor-pointer"
              >
                <Image 
                  src={a.logo} 
                  alt={a.name} 
                  fill 
                  className="object-contain opacity-40 grayscale brightness-0 invert group-hover:opacity-100 group-hover:grayscale-0 group-hover:brightness-100 group-hover:invert-0 transition-all duration-500" 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
