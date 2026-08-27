'use client';

import Link from "next/link";
import Image from "next/image";
import { 
  Camera, Video, FileText, Newspaper, Download, 
  Play, Calendar, ArrowRight, Youtube, ExternalLink, Loader2,
  X, ChevronLeft, ChevronRight, Maximize2, Folder
} from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Clean, working multimedia categories with working routes and modern visual cards
const multimediaCategories = [
  {
    title: "Galería de Fotos",
    description: "Álbumes oficiales por fecha y evento de la Superliga AFA, Liga BA y competencias",
    icon: Camera,
    color: "#36b37e",
    href: "/multimedia/fotos",
    tag: "Actualizado",
  },
  {
    title: "Videos y Partidos",
    description: "Resúmenes de encuentros, transmisiones en vivo, notas y material audiovisual",
    icon: Video,
    color: "#e74c3c",
    href: "/multimedia/videos",
    tag: "Audiovisual",
  },
  {
    title: "Revista Digital",
    description: "Publicaciones digitales con historias, entrevistas y artículos destacados",
    icon: FileText,
    color: "#3498db",
    href: "/multimedia/revista",
    tag: "Editorial",
  },
  {
    title: "Prensa y Difusión",
    description: "Cobertura periodística en medios de comunicación y comunicados oficiales",
    icon: Newspaper,
    color: "#f39c12",
    href: "/multimedia/prensa",
    tag: "Medios",
  },
  {
    title: "Documentos Útiles",
    description: "Reglamentos oficiales, formularios de inscripción y planillas de salud",
    icon: Download,
    color: "#9b59b6",
    href: "/multimedia/documentos-utiles",
    tag: "Descargas",
  },
];

export default function MultimediaPage() {
  const [filter, setFilter] = React.useState('all'); 
  const [albums, setAlbums] = React.useState([]);
  const [media, setMedia] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  // Lightbox State
  const [selectedPhoto, setSelectedPhoto] = React.useState(null);

  React.useEffect(() => {
    async function loadData() {
      try {
        const [resAlbums, resMedia] = await Promise.all([
          fetch("/api/albums"),
          fetch("/api/media?limit=50"),
        ]);
        
        const albumsData = await resAlbums.json();
        const mediaData = await resMedia.json();

        if (albumsData.success) {
          setAlbums(albumsData.data || []);
        }
        if (mediaData.success) {
          setMedia(mediaData.data || []);
        }
      } catch (error) {
        console.error("Error loading multimedia data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalPhotosCount = albums.reduce((acc, curr) => acc + (curr.photos?.length || 0), 0);

  return (
    <div className="bg-[#000B1A] text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 sm:pt-48 pb-20 overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#001A3D] to-[#000B1A]">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#36b37e_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#36b37e]/15 border border-[#36b37e]/30 text-[#36b37e] text-xs font-black uppercase tracking-widest mb-6">
            <Camera size={14} />
            <span>CENTRO MULTIMEDIA OFICIAL</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
            Multimedia
          </h1>
          <p className="text-white/60 text-base sm:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            Explorá el archivo visual, álbumes de fotos de cada jornada, videos de torneos, revistas y documentos de Fútbol Inclusivo.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/multimedia/fotos"
              className="px-6 py-3.5 rounded-2xl bg-[#36b37e] hover:bg-[#2ecc71] text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#36b37e]/20"
            >
              Ver Galerías de Fotos ({albums.length} Álbumes)
            </Link>
            <Link
              href="/multimedia/videos"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider transition-all border border-white/20"
            >
              Ver Videos y Resúmenes
            </Link>
          </div>
        </div>
      </section>

      {/* Sections Cards Grid */}
      <section className="py-16 sm:py-24 container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-[#36b37e] text-xs font-black uppercase tracking-widest block mb-2">Canales de Contenido</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Secciones Multimedia
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {multimediaCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={cat.href}
                className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#36b37e]/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                      style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                    >
                      <Icon size={28} />
                    </div>
                    <span
                      className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border"
                      style={{ backgroundColor: `${cat.color}15`, color: cat.color, borderColor: `${cat.color}30` }}
                    >
                      {cat.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-black uppercase text-white tracking-tight mb-2 group-hover:text-[#36b37e] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-[#36b37e] flex items-center gap-1 group-hover:gap-2 transition-all">
                    <span>Explorar</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* RECENT EVENT ALBUMS SHOWCASE */}
      <section className="py-16 sm:py-24 border-t border-white/10 bg-gradient-to-b from-[#000814] to-[#000B1A]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[#36b37e] text-xs font-black uppercase tracking-widest block mb-2">Fotos de las Fechas</span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                Últimos Álbumes de Eventos
              </h2>
            </div>
            <Link
              href="/multimedia/fotos"
              className="text-[#36b37e] hover:text-[#2ecc71] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <span>Ver todos los álbumes ({albums.length})</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-24">
              <Loader2 className="animate-spin text-[#36b37e] mx-auto mb-3" size={40} />
              <p className="text-xs font-bold uppercase tracking-widest text-white/40">Cargando álbumes...</p>
            </div>
          ) : albums.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] border-2 border-dashed border-white/10 rounded-3xl p-6">
              <Camera size={48} className="mx-auto text-white/20 mb-3" />
              <h4 className="text-lg font-black uppercase text-white/70">No hay álbumes creados todavía</h4>
              <p className="text-xs text-white/40 mt-1 max-w-sm mx-auto">
                Próximamente estaremos publicando las fotos oficiales de los partidos y torneos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.slice(0, 6).map((album) => {
                const photoCount = album.photos?.length || 0;
                const dateStr = album.eventDate
                  ? new Date(album.eventDate).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "";

                return (
                  <Link
                    key={album._id}
                    href={`/multimedia/fotos/${album.slug}`}
                    className="group flex flex-col bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#36b37e]/50 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl hover:-translate-y-1.5"
                  >
                    <div className="relative w-full aspect-16/10 bg-black/50 overflow-hidden">
                      {album.coverImage ? (
                        <Image
                          src={album.coverImage}
                          alt={album.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-108 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20">
                          <Folder size={48} />
                        </div>
                      )}

                      <div className="absolute top-3 left-3 bg-[#00132B]/90 backdrop-blur-md text-[#36b37e] text-[10px] font-black uppercase px-3 py-1 rounded-full border border-white/15">
                        {album.category}
                      </div>

                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/15 flex items-center gap-1.5">
                        <Camera size={13} className="text-[#36b37e]" />
                        <span>{photoCount} fotos</span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {dateStr && (
                          <p className="text-[11px] text-white/50 mb-1 font-bold flex items-center gap-1.5 uppercase">
                            <Calendar size={13} className="text-[#36b37e]" />
                            <span>{dateStr}</span>
                          </p>
                        )}
                        <h3 className="text-base font-black uppercase text-white tracking-tight group-hover:text-[#36b37e] transition-colors line-clamp-2">
                          {album.title}
                        </h3>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#36b37e]">
                        <span>Ver Fotos</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 border-t border-white/10 bg-[#000814]/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-black text-[#36b37e] mb-1">{albums.length}</div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/50">Álbumes de Torneo</div>
            </div>
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-black text-[#36b37e] mb-1">{totalPhotosCount}</div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/50">Fotos Publicadas</div>
            </div>
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-black text-[#36b37e] mb-1">1998</div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/50">Año de Fundación</div>
            </div>
            <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-black text-[#36b37e] mb-1">100%</div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/50">Fútbol Inclusivo</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
