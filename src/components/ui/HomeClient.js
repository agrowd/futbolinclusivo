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
  ChevronRight,
  Shield,
  Goal,
} from "lucide-react";
import DynamicIcon from "@/components/ui/DynamicIcon";
import ImpactMetrics from "@/components/ui/ImpactMetrics";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function HomeClient({ data, recentNews }) {
  // Fallbacks
  const heroBadge = data?.hero_badge || "DESDE 1998";
  const heroTitle = data?.hero_title || "EL FÚTBOL ES PARA TODOS.";
  const heroSubtitle = data?.hero_subtitle || "Equiparamos oportunidades y construimos una sociedad más inclusiva a través del deporte más lindo del mundo.";
  const heroImage = data?.hero_image || "https://futbolinclusivo.org.ar/app/uploads/2018/12/MG_0325.jpg";
  
  const buttons = data?.action_buttons?.length > 0 ? data.action_buttons : [
    { label: "NOTICIAS", icon: "Newspaper", href: "/novedades", color: "#000B1A", desc: "Crónicas y actualidad" },
    { label: "RESULTADOS", icon: "Trophy", href: "#", color: "#36b37e", desc: "Tablas y posiciones" },
    { label: "EQUIPOS", icon: "Users", href: "#", color: "#E67E22", desc: "Nuestra red federal" },
    { label: "VIDEOS", icon: "MonitorPlay", href: "/multimedia/videos", color: "#36a3f7", desc: "Reviví los partidos" },
    { label: "FOTOS", icon: "Camera", href: "/multimedia/fotos", color: "#7239ea", desc: "Galería oficial" },
    { label: "INSCRIPCIÓN", icon: "Ticket", href: "/inscripcion", color: "#f8285a", desc: "Pase a la liga" },
  ];

  return (
    <div className="bg-[#000B1A] text-white min-h-screen">
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden py-16 md:py-0">
        <div className="absolute inset-0 z-[1] opacity-50">
          <Image src={heroImage} alt="Hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000B1A] via-[#000B1A]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000B1A] to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-[2]">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-3xl">
            <motion.div variants={itemVariants} className="inline-block px-5 py-2 bg-[#36b37e] rounded-full font-black text-xs mb-6 uppercase">
              {heroBadge}
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tighter">
               {heroTitle}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/70 mb-8 max-w-xl">
              {heroSubtitle}
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
               <Link href="/inscripcion" className="bg-white text-black font-black px-8 py-4 rounded-2xl hover:bg-[#36b37e] hover:text-white transition-all uppercase text-sm">Inscribir Equipo</Link>
               <Link href="/institucional" className="bg-white/10 text-white font-black px-8 py-4 rounded-2xl border border-white/30 backdrop-blur-xl uppercase text-sm">Conocenos</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Grid de Categorías */}
      <section className="relative z-20 px-6 -mt-12 mb-24">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {buttons.map((btn, idx) => (
              <motion.div key={idx} whileHover={{ y: -8 }} whileTap={{ scale: 0.95 }}>
                <Link href={btn.href} className="group block relative overflow-hidden rounded-[32px] shadow-2xl p-6 min-h-[160px] flex flex-col items-center justify-center gap-3 transition-all border border-white/10 hover:border-white/20" style={{ backgroundColor: btn.color }}>
                  <div className="relative w-14 h-14 flex items-center justify-center bg-white/10 rounded-2xl border border-white/20 group-hover:scale-110 transition-transform">
                     <DynamicIcon name={btn.icon} size={24} />
                  </div>
                  <span className="font-black text-[11px] tracking-wider uppercase text-center">{btn.label}</span>
                  <span className="text-white/60 text-[10px] text-center opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-4 px-4 line-clamp-1">{btn.desc}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Métricas de Impacto */}
      <ImpactMetrics />

      {/* Sección de Competencias */}
      <section className="py-24 border-t border-white/5 relative bg-[#000D21]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Nuestras Competencias</h2>
            <p className="text-white/50 text-lg">Impulsando el desarrollo deportivo a todos los niveles.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="p-8 md:p-12 bg-white/5 rounded-[40px] border border-white/10 flex flex-col items-center text-center group hover:bg-[#36b37e]/10 transition-all">
              <div className="w-24 h-24 mb-8 relative opacity-80 group-hover:opacity-100 transition-opacity">
                 <Shield size={96} strokeWidth={1} className="text-[#36b37e]" />
              </div>
              <h3 className="text-2xl font-black uppercase mb-4">Liga de Fútbol Inclusiva</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                El evento sistemático más grande de la provincia, promoviendo la competencia sana y la integración comunitaria.
              </p>
              <Link href="/programas/liga-ba" className="font-black text-xs uppercase tracking-widest text-[#36b37e] flex items-center gap-2">Explorar Liga <ChevronRight size={16} /></Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="p-8 md:p-12 bg-white/5 rounded-[40px] border border-white/10 flex flex-col items-center text-center group hover:bg-[#E67E22]/10 transition-all">
              <div className="w-24 h-24 mb-8 relative opacity-80 group-hover:opacity-100 transition-opacity">
                 <Trophy size={96} strokeWidth={1} className="text-[#E67E22]" />
              </div>
              <h3 className="text-2xl font-black uppercase mb-4">Super Liga AFA</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                Competición de élite con el respaldo oficial, elevando el fútbol inclusivo a las instituciones más grandes del país.
              </p>
              <Link href="#" className="font-black text-xs uppercase tracking-widest text-[#E67E22] flex items-center gap-2">Ver Detalles <ChevronRight size={16} /></Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recientes Novedades */}
      {recentNews?.length > 0 && (
        <section className="py-24 bg-[#000B1A]">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 text-[#36b37e]">Últimas Novedades</h2>
                <p className="text-white/50 text-lg">Crónicas y actualidad de la Liga de Fútbol Inclusiva.</p>
              </div>
              <Link href="/novedades" className="hidden md:flex items-center gap-2 bg-white/5 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all">
                Ver Crónicas <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {recentNews.map((news, idx) => (
                <Link key={idx} href={`/novedades/${news.slug}`} className="group bg-white/5 rounded-[32px] overflow-hidden border border-white/10 hover:border-[#36b37e]/50 transition-all">
                  <div className="relative aspect-video">
                    {news.image && <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />}
                    <div className="absolute top-4 left-4 px-4 py-1.5 bg-[#36b37e] rounded-full text-[10px] font-black uppercase">{news.category}</div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-xl font-bold mb-4 line-clamp-2">{news.title}</h4>
                    <p className="text-white/50 text-sm mb-6 line-clamp-2">{news.excerpt}</p>
                    <span className="text-[#36b37e] font-black text-xs uppercase tracking-widest flex items-center gap-2">Leer más <ChevronRight size={16} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Aliados / Partners Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-black/30 font-black uppercase tracking-[0.2em] text-sm">Aliados Estratégicos</h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all">
            <Image src="https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/a/aa/FIFA_logo_without_slogan.svg&n=-1" alt="FIFA Foundation" width={180} height={60} className="h-12 w-auto object-contain" />
            <Image src="https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/8/84/Logo_Common_Goal.svg&n=-1" alt="Common Goal" width={180} height={60} className="h-12 w-auto object-contain" />
            <Image src="https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/e/ef/Uefa_logo.svg&n=-1" alt="UEFA Foundation" width={180} height={60} className="h-12 w-auto object-contain" />
            <Image src="https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/c/c4/Afa_gold_logo24.svg&n=-1" alt="AFA" width={120} height={60} className="h-16 w-auto object-contain" />
          </div>
        </div>
      </section>
    </div>
  );
}
