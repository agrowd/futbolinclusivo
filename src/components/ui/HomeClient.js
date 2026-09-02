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
  MonitorPlay,
  Camera,
  Ticket,
  ArrowRight,
  Shield,
  Goal,
  Folder,
  Sparkles,
} from "lucide-react";

// Standard action buttons from legacy design
const actionButtons = [
  { label: "NOTICIAS", icon: Newspaper, href: "/novedades", color: "#008D4D", desc: "Enterate de todo" },
  { label: "RESULTADOS", icon: Goal, href: "/novedades", color: "#001A3D", desc: "Últimos partidos" },
  { label: "EQUIPOS", icon: Shield, href: "/institucional/comision", color: "#001A3D", desc: "Los protagonistas" },
  { label: "VIDEOS", icon: MonitorPlay, href: "/multimedia", color: "#001A3D", desc: "Momentos únicos" },
  { label: "FOTOS", icon: Camera, href: "/multimedia/fotos", color: "#001A3D", desc: "Galería de eventos" },
  { label: "INSCRIPCIÓN", icon: Ticket, href: "/inscripcion", color: "#E67E22", desc: "Sumate a jugar" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function HomeClient({ dynamicNews = [], dynamicAlbums = [] }) {
  // Format Date for legacy UI
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="bg-[#000B1A] text-white min-h-screen">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden py-20 md:py-0">
        <motion.div 
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.55 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-[1]"
        >
          <Image 
            src="/hero.jpg"
            alt="La Superliga Inclusiva AFA - Fútbol Inclusivo"
            fill
            className="object-cover object-[center_35%]"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000B1A] via-[#000B1A]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000B1A] via-[#000B1A]/20 to-transparent" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-[2]">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-3xl"
          >
            <motion.div variants={itemVariants} className="inline-block px-5 py-2 bg-[#36b37e] rounded-full font-black text-xs tracking-wider mb-6 shadow-[0_5px_20px_rgba(54,179,126,0.3)] border border-white/20 uppercase text-white">
              DESDE 1998
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 leading-[0.9] tracking-tighter">
              EL FÚTBOL ES <br/>
              <span className="text-[#36b37e] drop-shadow-[0_0_10px_rgba(54,179,126,0.2)]">PARA TODOS.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-base md:text-xl leading-relaxed text-white/70 mb-6 md:mb-8 max-w-xl">
              Equiparamos oportunidades y construimos una sociedad más inclusiva a través del deporte más lindo del mundo.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 md:gap-6">
              <Link 
                href="/inscripcion" 
                className="bg-white text-black font-black px-5 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl md:rounded-2xl transition-all hover:bg-[#36b37e] hover:text-white hover:scale-105 active:scale-95 shadow-2xl uppercase text-xs sm:text-sm tracking-wider border-2 border-white"
              >
                INSCRIBIR EQUIPO
              </Link>
              <Link 
                href="/institucional" 
                className="bg-white/10 text-white font-black px-5 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl md:rounded-2xl border-2 border-white/30 transition-all hover:bg-white/20 active:scale-95 backdrop-blur-xl uppercase text-xs sm:text-sm tracking-wider"
              >
                CONOCENOS
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== ACTION GRID ===== */}
      <section className="relative z-20 px-4 md:px-6 mt-6 md:mt-12 mb-10 md:mb-16">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-7xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {actionButtons.map((btn, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href={btn.href}
                  className="group block relative overflow-hidden rounded-2xl md:rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500"
                >
                  <div 
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundColor: btn.color }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center gap-2 md:gap-3 min-h-[110px] sm:min-h-[130px] md:min-h-[150px]">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-0 group-hover:scale-150 transition-transform duration-500" />
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm transition-all duration-500 group-hover:bg-white/20 group-hover:scale-110 group-hover:rotate-3">
                        <btn.icon size={22} className="text-white md:w-6 md:h-6" strokeWidth={2} />
                      </div>
                    </div>
                    <span className="text-white font-black text-[10px] sm:text-xs md:text-sm tracking-wider text-center uppercase leading-tight">
                      {btn.label}
                    </span>
                    <span className="text-white/70 text-[9px] md:text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mt-1">
                      {btn.desc}
                    </span>
                  </div>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== LIGAS PRINCIPALES ===== */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-[#000B1A] to-[#000814]">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 md:mb-8"
          >
            <span className="text-[#36b37e] font-black text-xs md:text-sm tracking-widest uppercase">Nuestras Competencias</span>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-6xl mx-auto">
            {/* LIGA INCLUSIVA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              animate={{ y: [0, -10, 0] }}
              style={{ animation: "bounce-slow 4s ease-in-out infinite" }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#001A3D] to-[#000B1A] border-4 border-[#36b37e]/40 shadow-[0_0_60px_rgba(54,179,126,0.3)] overflow-hidden group flex flex-col items-center justify-center text-center p-6"
            >
              <div className="absolute inset-0 opacity-30" style={{background: 'radial-gradient(circle at 20% 20%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 50% 10%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 80% 20%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 10% 50%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 90% 50%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 20% 80%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 50% 90%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 80% 80%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 35% 35%, transparent 6%, #000 6%, #000 10%, transparent 10%), radial-gradient(circle at 65% 35%, transparent 6%, #000 6%, #000 10%, transparent 10%), radial-gradient(circle at 35% 65%, transparent 6%, #000 6%, #000 10%, transparent 10%), radial-gradient(circle at 65% 65%, transparent 6%, #000 6%, #000 10%, transparent 10%)'}} />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-[#36b37e]/50 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(54,179,126,0.4)]">
                  <Image src="/logo.png" alt="Andar FC" width={48} height={48} className="object-contain" />
                </div>
                <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mb-1">Liga Inclusiva</h3>
                <p className="text-[#36b37e] text-xs font-bold uppercase tracking-wider mb-3">Desde 1998</p>
                <p className="text-white/70 text-xs leading-relaxed mb-4 max-w-[180px]">Fútbol inclusivo para todos</p>
                <a href="https://futbolinclusivo.mygol.es/tournaments" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#36b37e] font-black text-xs uppercase tracking-wider hover:gap-2 transition-all bg-white/10 px-4 py-2 rounded-full">VER TORNEO <ArrowRight size={14} /></a>
              </div>
            </motion.div>

            {/* SUPER LIGA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              animate={{ y: [0, -10, 0] }}
              style={{ animation: "bounce-slow 4s ease-in-out infinite", animationDelay: "2s" }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#6B1026] to-[#2B050D] border-4 border-[#75AADB]/40 shadow-[0_0_60px_rgba(117,170,219,0.3)] overflow-hidden group flex flex-col items-center justify-center text-center p-6"
            >
              <div className="absolute inset-0 opacity-30" style={{background: 'radial-gradient(circle at 20% 20%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 50% 10%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 80% 20%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 10% 50%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 90% 50%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 20% 80%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 50% 90%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 80% 80%, transparent 8%, #000 8%, #000 12%, transparent 12%), radial-gradient(circle at 35% 35%, transparent 6%, #000 6%, #000 10%, transparent 10%), radial-gradient(circle at 65% 35%, transparent 6%, #000 6%, #000 10%, transparent 10%), radial-gradient(circle at 35% 65%, transparent 6%, #000 6%, #000 10%, transparent 10%), radial-gradient(circle at 65% 65%, transparent 6%, #000 6%, #000 10%, transparent 10%)'}} />
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center">
                    <Image src="/logo-afa.png" alt="AFA" width={32} height={32} className="object-contain" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center">
                    <Image src="/satlogo.png" alt="SAT" width={32} height={32} className="object-contain" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mb-1">Super Liga</h3>
                <p className="text-[#75AADB] text-xs font-bold uppercase tracking-wider mb-3">AFA</p>
                <p className="text-white/70 text-xs leading-relaxed mb-4 max-w-[180px]">Máxima categoría del fútbol inclusivo</p>
                <a href="https://futbolinclusivo.mygol.es/tournaments" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#75AADB] font-black text-xs uppercase tracking-wider hover:gap-2 transition-all bg-white/10 px-4 py-2 rounded-full">VER TORNEO <ArrowRight size={14} /></a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== RECENT NEWS & RESULTS ===== */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 md:gap-12">
            
            {/* LATEST NEWS (DYNAMIC) */}
            <div className="space-y-8 md:space-y-12">
              <div className="flex justify-between items-end border-b border-white/5 pb-4 md:pb-8">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight uppercase">Últimas Novedades</h2>
                <Link href="/novedades" className="text-[#36b37e] font-bold text-xs flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest hidden sm:flex">
                  VER TODAS <ArrowRight size={16} />
                </Link>
              </div>

              <div className="grid gap-5 md:gap-8">
                {dynamicNews.length > 0 ? (
                  dynamicNews.map((item, idx) => {
                    const isAlbum = item.type === "album";
                    const targetHref = item.href || (isAlbum ? `/multimedia/fotos/${item.slug}` : `/novedades/${item.slug}`);
                    const itemDate = item.date || item.publishedAt || item.eventDate || item.createdAt;

                    return (
                      <motion.div 
                        key={item._id || idx}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                      >
                        <Link href={targetHref} className="group flex flex-col sm:flex-row gap-4 bg-white/[0.02] rounded-xl md:rounded-2xl overflow-hidden border border-white/5 transition-all hover:bg-white/[0.05] hover:border-white/20 shadow-lg p-3 md:p-5">
                          <div className="relative w-full sm:w-48 md:w-56 h-40 sm:h-36 md:h-40 shrink-0 overflow-hidden rounded-lg md:rounded-xl bg-black/40">
                            <Image 
                              src={item.image || item.coverImage || "https://futbolinclusivo.org.ar/app/uploads/2018/12/MG_0325.jpg"} 
                              alt={item.title} 
                              fill 
                              sizes="(max-width: 640px) 100vw, 224px"
                              className="object-cover transition-transform duration-500 group-hover:scale-110" 
                            />
                            {isAlbum && (
                              <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md text-white text-[11px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-white/15">
                                <Camera size={12} className="text-[#36b37e]" />
                                <span>{item.photoCount || 0} fotos</span>
                              </div>
                            )}
                          </div>
                          <div className="p-1 md:p-2 flex flex-col justify-center min-w-0">
                            {isAlbum ? (
                              <div className="flex items-center gap-2 mb-2 md:mb-3 flex-wrap">
                                <span className="bg-[#36b37e]/15 border border-[#36b37e]/30 text-[#36b37e] text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                                  <Camera size={11} /> ÁLBUM DE FOTOS
                                </span>
                                <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">
                                  {item.category}
                                </span>
                              </div>
                            ) : (
                              <span className="text-[#36b37e] font-black text-xs tracking-wider uppercase mb-2 md:mb-3">{item.category}</span>
                            )}
                            <h3 className="text-white text-base md:text-lg font-black leading-tight group-hover:text-[#36b37e] transition-colors line-clamp-3">{item.title}</h3>
                            <p className="text-white/50 text-xs md:text-sm mt-2 md:mt-3 font-bold flex items-center gap-2">
                              <Calendar size={16} /> {formatDate(itemDate)}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                    <p className="text-white/20 font-black uppercase tracking-widest text-xs">Cargando novedades...</p>
                  </div>
                )}
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-6 md:space-y-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#004d26] to-[#002D16] rounded-xl md:rounded-2xl p-5 md:p-8 text-center shadow-2xl relative overflow-hidden group border border-white/5"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
                <Trophy size={36} className="text-white/20 mx-auto mb-3 md:mb-5" />
                <h3 className="font-black text-lg md:text-2xl mb-1 md:mb-2 tracking-tight uppercase">Finales 2025</h3>
                <p className="text-white/60 text-xs font-black tracking-wider uppercase mb-4 md:mb-6">6 DE DICIEMBRE</p>
                <div className="flex justify-center gap-4 md:gap-6">
                  {[ {v: "00", l: "DÍAS"}, {v: "00", l: "HRS"}, {v: "00", l: "MIN"} ].map((t, i) => (
                    <div key={i} className="flex-1">
                      <div className="text-xl md:text-3xl font-black mb-1">{t.v}</div>
                      <div className="text-xs font-black opacity-40 tracking-wider uppercase">{t.l}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#001229] rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/5 shadow-xl"
              >
                <h3 className="text-xs md:text-sm font-black mb-4 md:mb-6 flex items-center gap-2 md:gap-3 tracking-wider uppercase">
                  <Calendar size={20} className="text-[#36b37e]" />
                  PARTIDOS RECIENTES
                </h3>
                
                <div className="grid gap-4 md:gap-6">
                  {[
                    { t1: "Andar A", t2: "CEF 123", s1: 2, s2: 0 },
                    { t1: "Boca", t2: "San Lorenzo", s1: 1, s2: 1 },
                    { t1: "River", t2: "Andar B", s1: 0, s2: 3 },
                  ].map((match, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 md:p-4 flex items-center justify-between text-black shadow-lg border border-black/5 gap-2 md:gap-3">
                      <div className="flex-1 text-right font-black text-xs md:text-sm uppercase tracking-tight truncate">{match.t1}</div>
                      <div className="bg-gray-100 px-4 md:px-6 py-2 md:py-3 rounded-lg font-black text-base md:text-lg flex gap-2 md:gap-3 shadow-inner shrink-0 border border-gray-200">
                        <span>{match.s1}</span>
                        <span className="opacity-30 font-light">-</span>
                        <span>{match.s2}</span>
                      </div>
                      <div className="flex-1 text-left font-black text-xs md:text-sm uppercase tracking-tight truncate">{match.t2}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PHOTO GALLERIES & EVENT ALBUMS SECTION ===== */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[#000814] via-[#001229]/60 to-[#000B1A] border-t border-white/5 relative overflow-hidden">
        {/* Glow background accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#36b37e]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 md:mb-12 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#36b37e]/15 border border-[#36b37e]/30 text-[#36b37e] text-[11px] font-black uppercase tracking-wider mb-3">
                <Camera size={14} />
                <span>Galerías de Fotos Oficiales</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                Momentos de las Jornadas
              </h2>
              <p className="text-white/50 text-xs sm:text-sm mt-1.5 max-w-xl">
                Reviví cada fecha disputada, mirá las fotos oficiales de los partidos y descargalas en alta calidad.
              </p>
            </div>

            <Link
              href="/multimedia/fotos"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#36b37e] hover:bg-[#2ecc71] text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#36b37e]/20"
            >
              <span>Ver Todas las Galerías</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* ALBUM CARDS GRID */}
          {dynamicAlbums.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dynamicAlbums.map((album, idx) => {
                const dateStr = album.eventDate
                  ? new Date(album.eventDate).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "";

                return (
                  <motion.div
                    key={album._id || idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                  >
                    <Link
                      href={`/multimedia/fotos/${album.slug}`}
                      className="group flex flex-col h-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#36b37e]/50 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1.5"
                    >
                      {/* Cover Photo */}
                      <div className="relative w-full aspect-16/10 bg-black/60 overflow-hidden">
                        {album.coverImage ? (
                          <Image
                            src={album.coverImage}
                            alt={album.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover group-hover:scale-108 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/20">
                            <Folder size={48} />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 bg-[#00132B]/90 backdrop-blur-md border border-white/15 text-[#36b37e] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
                          {album.category}
                        </div>

                        {/* Photo count badge */}
                        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/15">
                          <Camera size={13} className="text-[#36b37e]" />
                          <span>{album.photoCount || (album.photos ? album.photos.length : 0)} fotos</span>
                        </div>
                      </div>

                      {/* Info & Micro-Thumbnails */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            {dateStr && (
                              <p className="text-[11px] text-white/50 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                                <Calendar size={13} className="text-[#36b37e]" />
                                <span>{dateStr}</span>
                              </p>
                            )}
                            {album.title && album.title.includes("@") && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#E1306C] bg-[#E1306C]/10 px-2 py-0.5 rounded-full border border-[#E1306C]/20">
                                <Camera size={10} />
                                <span>{album.title.match(/@([a-zA-Z0-9_.]+)/)?.[0]}</span>
                              </span>
                            )}
                          </div>
                          <h3 className="text-base sm:text-lg font-black uppercase text-white tracking-tight group-hover:text-[#36b37e] transition-colors line-clamp-2 leading-snug">
                            {album.title}
                          </h3>
                        </div>

                        {/* Sub-thumbnails preview bar */}
                        {album.photos && album.photos.length > 1 && (
                          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                            <div className="flex items-center -space-x-2 overflow-hidden">
                              {album.photos.slice(1, 4).map((p, pIdx) => (
                                <div
                                  key={pIdx}
                                  className="w-8 h-8 rounded-full border-2 border-[#00132B] overflow-hidden bg-black/50 relative shrink-0"
                                >
                                  <img src={p.url} alt="" className="w-full h-full object-cover" />
                                </div>
                              ))}
                              {album.photoCount > 4 && (
                                <div className="w-8 h-8 rounded-full border-2 border-[#00132B] bg-[#36b37e] text-black text-[10px] font-black flex items-center justify-center shrink-0">
                                  +{album.photoCount - 4}
                                </div>
                              )}
                            </div>

                            <span className="text-xs font-bold text-[#36b37e] flex items-center gap-1 group-hover:gap-2 transition-all">
                              <span>Ver Fotos</span>
                              <ArrowRight size={14} />
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-10 text-center">
              <Camera size={48} className="mx-auto text-white/20 mb-3" />
              <p className="text-sm font-bold text-white uppercase">Próximamente estaremos publicando las galerías oficiales</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== COMPETENCIA SECTION ===== */}
      <section className="bg-[#000B1A] border-y border-white/5 relative overflow-hidden py-10 md:py-16 lg:py-20">
        <div className="absolute top-32 left-1/2 -translate-x-1/2 opacity-[0.03] select-none pointer-events-none whitespace-nowrap hidden lg:block">
          <span className="text-[240px] font-black uppercase tracking-tighter text-white">Competencia</span>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 md:mb-8 uppercase text-white">Competencia</h2>
            <div className="w-48 h-2 bg-[#36b37e] mx-auto rounded-full shadow-[0_0_30px_rgba(54,179,126,0.4)]" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="relative bg-gradient-to-br from-[#001229] to-[#000814] border border-white/10 rounded-2xl p-5 md:p-6"
            >
              <div className="flex items-center gap-3 mb-4 md:mb-5 relative z-10">
                <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-[#36b37e]/20 to-[#36b37e]/5 rounded-xl flex items-center justify-center">
                  <Calendar className="text-[#36b37e]" size={20} strokeWidth={2.5} />
                </div>
                <h3 className="text-sm md:text-lg font-black tracking-wider uppercase text-white">Fixture</h3>
              </div>
              <div className="flex-1 flex flex-col gap-2 md:gap-4 mb-3 md:mb-6">
                <p className="text-white/70 text-xs md:text-sm leading-relaxed">Los partidos más próximos de cada liga.</p>
                <div className="flex flex-col gap-2 mt-auto">
                  {[
                    { liga: "LIGA BA", dia: "Sáb 15/05 • 15:00", partido: "Andar A vs CEF 123" },
                    { liga: "LIGA NACIONAL", dia: "Dom 16/05 • 14:30", partido: "San Lorenzo vs River" },
                    { liga: "ESCUELA", dia: "Mié 19/05 • 16:00", partido: "Andar C vs San Martín" },
                  ].map((f, i) => (
                    <div key={i} className="p-3 md:p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                      <span className="text-[9px] md:text-[10px] font-black tracking-wider text-[#36b37e] block mb-1 uppercase">{f.liga}</span>
                      <p className="font-black text-sm md:text-base text-white mb-1 leading-tight">{f.partido}</p>
                      <p className="text-[10px] md:text-xs text-white/50 font-bold">{f.dia}</p>
                    </div>
                  ))}
                </div>
              </div>
              <a href="https://futbolinclusivo.mygol.es/tournaments" target="_blank" rel="noopener noreferrer" className="w-full bg-white/5 hover:bg-[#36b37e] text-white font-black py-3 md:py-4 rounded-xl text-center transition-all border border-white/10 uppercase text-xs tracking-wider">VER FIXTURE COMPLETO</a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="relative bg-gradient-to-br from-[#001229] to-[#000814] border border-white/10 rounded-2xl p-5 md:p-6"
            >
              <div className="flex items-center gap-3 mb-4 md:mb-5 relative z-10">
                <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-[#36b37e]/20 to-[#36b37e]/5 rounded-xl flex items-center justify-center">
                  <Trophy className="text-[#36b37e]" size={20} strokeWidth={2.5} />
                </div>
                <h3 className="text-sm md:text-lg font-black tracking-wider uppercase text-white">Goleadores</h3>
              </div>
              <div className="flex-1 flex flex-col gap-3 md:gap-4 mb-4 md:mb-6">
                {[
                  { name: "Juan Pérez", team: "Andar A", goals: 12, icon: "🥇" },
                  { name: "S. Gómez", team: "CEF 123", goals: 10, icon: "🥈" },
                  { name: "R. Díaz", team: "San Lorenzo", goals: 9, icon: "🥉" },
                ].map((p, i) => (
                  <div key={i} className="flex justify-between items-center p-3 md:p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{p.icon}</span>
                      <div>
                        <p className="font-black text-xs md:text-sm uppercase text-white truncate">{p.name}</p>
                        <p className="text-[10px] text-white/50 uppercase">{p.team}</p>
                      </div>
                    </div>
                    <span className="bg-[#36b37e] text-white font-black px-4 py-1.5 rounded-lg text-sm">{p.goals}</span>
                  </div>
                ))}
              </div>
              <a href="https://futbolinclusivo.mygol.es/tournaments" target="_blank" rel="noopener noreferrer" className="w-full bg-white/5 hover:bg-[#36b37e] text-white font-black py-3 md:py-4 rounded-xl text-center transition-all border border-white/10 uppercase text-xs tracking-wider">TABLA COMPLETA</a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="relative bg-gradient-to-br from-[#1a5e42] via-[#0d3d2a] to-[#000B1A] border-2 border-[#36b37e]/60 rounded-2xl p-5 md:p-6 flex flex-col group"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#36b37e]/20 rounded-full blur-[120px] -mr-48 -mt-48" />
              <div className="flex items-center gap-3 mb-4 md:mb-5 relative z-10">
                <div className="w-11 h-11 bg-[#36b37e] rounded-xl flex items-center justify-center border border-white/30">
                  <Heart className="text-white" size={22} fill="currentColor" />
                </div>
                <h3 className="text-sm md:text-lg font-black tracking-wider uppercase text-white">Participá</h3>
              </div>
              <div className="flex-1 flex flex-col gap-3 md:gap-4 mb-4 md:mb-6 relative z-10">
                <p className="text-white text-lg font-black leading-tight uppercase">Sumate a la liga más grande del país.</p>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 mt-auto">
                  <span className="text-[10px] font-black tracking-wider text-[#36b37e] block mb-2 uppercase">Próximas Entradas</span>
                  <p className="font-black text-xl text-white uppercase">Finales 2025</p>
                  <p className="text-xs text-white/60 font-bold">6 de Diciembre</p>
                </div>
              </div>
              <Link href="/inscripcion" className="relative z-10 w-full bg-[#36b37e] text-white font-black py-3 md:py-4 rounded-xl text-center hover:shadow-[0_0_40px_rgba(54,179,126,0.6)] uppercase text-sm tracking-wider">INSCRIBITE AHORA</Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
