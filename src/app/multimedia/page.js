'use client';

import Link from "next/link";
import Image from "next/image";
import { 
  Camera, Video, FileText, Newspaper, Download, 
  Play, Eye, Heart, Share2, Calendar, Star, 
  ArrowRight, Youtube, ExternalLink, Loader2,
  X, ChevronLeft, ChevronRight, Maximize2
} from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// The top categories remain static
const multimediaCategories = [
  {
    title: "Fotos y Videos",
    description: "Galería completa de imágenes y videos de nuestros eventos, torneos y actividades",
    icon: Camera,
    image: "https://futbolinclusivo.org.ar/app/uploads/2022/03/multimedia-fotos-videos-480x360.jpg",
    href: "/multimedia/fotos-videos",
    featured: true,
  },
  {
    title: "Revista",
    description: "Publicaciones digitales con historias, entrevistas y artículos destacados",
    icon: FileText,
    image: "https://futbolinclusivo.org.ar/app/uploads/2022/03/nosotros-nuestro-proposito-480x360.jpg",
    href: "/multimedia/revista",
    featured: false,
  },
  {
    title: "Prensa",
    description: "Noticias, artículos y cobertura mediática del Fútbol Inclusivo",
    icon: Newspaper,
    image: "https://futbolinclusivo.org.ar/app/uploads/2022/03/liga-ba-institucional-480x360.jpg",
    href: "/multimedia/prensa",
    featured: false,
  },
  {
    title: "Documentos Útiles",
    description: "Formularios, reglamentos y documentos oficiales para descargar",
    icon: Download,
    image: "https://futbolinclusivo.org.ar/app/uploads/2022/03/liga-nacional-proyecto-480x360.jpg",
    href: "/multimedia/documentos-utiles",
    featured: false,
  }
];

export default function MultimediaPage() {
  const [filter, setFilter] = React.useState('all'); 
  const [media, setMedia] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState({ total: 0, photos: 0, videos: 0 });
  
  // Lightbox State
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  React.useEffect(() => {
    async function fetchMedia() {
      try {
        const res = await fetch("/api/media?limit=100");
        const data = await res.json();
        if (data.success) {
          const items = data.data;
          const sortedItems = [...items].sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setMedia(sortedItems);
          setStats({
            total: items.length,
            photos: items.filter(m => m.type === 'image' || m.type === 'gallery').length,
            videos: items.filter(m => m.type === 'video').length,
          });
        }
      } catch (error) {
        console.error("Error fetching media:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMedia();
  }, []);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedItem) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, selectedIndex]);

  const filteredItems = media.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'videos') return item.type === 'video';
    if (filter === 'photos') return item.type === 'image' || item.type === 'gallery';
    return true;
  });

  const openLightbox = (item, index) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    setSelectedIndex(-1);
    document.body.style.overflow = "auto";
  };

  const handleNext = () => {
    if (selectedIndex < filteredItems.length - 1) {
      const nextIndex = selectedIndex + 1;
      setSelectedIndex(nextIndex);
      setSelectedItem(filteredItems[nextIndex]);
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      const prevIndex = selectedIndex - 1;
      setSelectedIndex(prevIndex);
      setSelectedItem(filteredItems[prevIndex]);
    }
  };

  const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div style={{ background: "#000B1A", color: "#fff", minHeight: "100vh" }}>
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(0,11,26,0.95)",
              backdropFilter: "blur(15px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button 
              onClick={closeLightbox}
              style={{
                position: "absolute",
                top: "30px",
                right: "30px",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
                zIndex: 10
              }}
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            <div style={{
              position: "absolute",
              inset: "0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 20px",
              pointerEvents: "none"
            }}>
              <button 
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                disabled={selectedIndex === 0}
                style={{
                  pointerEvents: "auto",
                  background: "rgba(255,255,255,0.05)",
                  border: "none",
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#fff",
                  opacity: selectedIndex === 0 ? 0.2 : 1,
                  transition: "all 0.3s"
                }}
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                disabled={selectedIndex === filteredItems.length - 1}
                style={{
                  pointerEvents: "auto",
                  background: "rgba(255,255,255,0.05)",
                  border: "none",
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#fff",
                  opacity: selectedIndex === filteredItems.length - 1 ? 0.2 : 1,
                  transition: "all 0.3s"
                }}
              >
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Content Container */}
            <motion.div 
              layoutId={selectedItem._id}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              style={{
                width: "100%",
                maxWidth: "1200px",
                maxHeight: "85vh",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "20px"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === 'video' ? (
                <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", borderRadius: "20px", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
                   <iframe
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                      src={`https://www.youtube.com/embed/${getYoutubeId(selectedItem.url)}?autoplay=1`}
                      title={selectedItem.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                   ></iframe>
                </div>
              ) : (
                <div style={{ position: "relative", width: "100%", height: "80vh", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
                  <Image 
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    fill
                    style={{ objectFit: "contain", borderRadius: "20px" }}
                  />
                </div>
              )}

              {/* Info Overlay */}
              <div style={{ textAlign: "center", paddingBottom: "20px" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 900, marginBottom: "8px" }}>{selectedItem.title}</h2>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", maxWidth: "800px", margin: "0 auto" }}>{selectedItem.description}</p>
                {selectedItem.type === 'gallery' && (
                  <Link 
                    href={selectedItem.url} 
                    target="_blank"
                    style={{ 
                      marginTop: "20px", 
                      display: "inline-flex", 
                      alignItems: "center", 
                      gap: "10px", 
                      background: "#36b37e", 
                      color: "#fff", 
                      padding: "12px 24px", 
                      borderRadius: "12px", 
                      fontWeight: 800, 
                      textDecoration: "none" 
                    }}
                  >
                    ABRIR ÁLBUM COMPLETO <ExternalLink size={16} />
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section style={{ 
        background: "linear-gradient(to bottom, #001A3D, #000B1A)", 
        padding: "180px 0 100px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        position: "relative"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(0,141,77,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(230,126,34,0.1) 0%, transparent 50%)",
          zIndex: 0
        }} />
        
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ 
            display: "inline-flex", 
            background: "rgba(0,141,77,0.1)", 
            color: "#36b37e",
            padding: "8px 16px", 
            borderRadius: "4px", 
            marginBottom: "24px", 
            fontSize: "0.75rem", 
            fontWeight: 800, 
            letterSpacing: "2px" 
          }}>
            <Camera size={14} style={{ marginRight: "8px" }} />
            MULTIMEDIA
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px", letterSpacing: "-1.5px" }}>
            Multimedia
          </h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            Explora la historia y el presente del Fútbol Inclusivo. Todo el contenido es gestionado dinámicamente desde nuestro panel de administración.
          </p>
        </div>
      </section>

      {/* Sections Grid */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#fff", marginBottom: "50px", textAlign: "center" }}>
            Secciones
          </h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
            {multimediaCategories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                style={{
                  display: "block",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
                
                <div style={{ padding: "25px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
                    <div style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "rgba(0,141,77,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <category.icon size={24} color="#36b37e" />
                    </div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#fff", margin: 0 }}>
                      {category.title}
                    </h3>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "20px" }}>
                    {category.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#36b37e", fontWeight: 700 }}>
                    Explorar <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: "60px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            {['all', 'videos', 'photos'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: f === 'all' ? "12px 24px" : "12px 28px",
                  borderRadius: "25px",
                  border: filter === f ? "2px solid #36b37e" : "2px solid rgba(255,255,255,0.1)",
                  background: filter === f ? "#36b37e" : "transparent",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                {f === 'videos' && <Video size={16} />}
                {f === 'photos' && <Camera size={16} />}
                {f === 'all' ? `TODOS (${stats.total})` : f === 'videos' ? `VIDEOS (${stats.videos})` : `FOTOS (${stats.photos})`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Grid */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: "center", padding: "100px 0" }}>
              <Loader2 className="animate-spin text-[#36b37e] mx-auto mb-4" size={48} />
              <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Cargando Galería Interactiva...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "100px 20px", color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.02)", borderRadius: "40px", border: "2px dashed rgba(255,255,255,0.05)" }}>
               <Camera size={64} className="mx-auto mb-6 opacity-20" />
               <h3 className="text-xl font-black uppercase tracking-tight">No hay contenido disponible</h3>
               <p className="text-xs font-bold uppercase mt-2 opacity-50">Sube contenido desde el panel de administración</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
              {filteredItems.map((item, index) => (
                <motion.div
                  layoutId={item._id}
                  key={item._id}
                  onClick={() => openLightbox(item, index)}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: item.featured ? "2px solid rgba(54,179,126,0.3)" : "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "24px",
                    overflow: "hidden",
                    transition: "all 0.3s",
                    position: "relative",
                    cursor: "pointer"
                  }}
                  whileHover={{ y: -8, background: "rgba(255,255,255,0.05)" }}
                >
                  <div style={{ position: "relative", height: "250px", overflow: "hidden" }}>
                    <Image
                      src={item.thumbnailUrl || item.url}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 350px"
                    />
                    
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                      opacity: 0,
                      transition: "opacity 0.3s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }} className="hover-overlay">
                       <Maximize2 size={40} className="text-white opacity-50" />
                    </div>

                    <style jsx>{`.hover-overlay:hover { opacity: 1; }`}</style>

                    {item.featured && (
                      <div style={{
                        position: "absolute", top: "15px", left: "15px",
                        background: "#36b37e", color: "#fff",
                        padding: "5px 12px", borderRadius: "10px",
                        fontSize: "0.7rem", fontWeight: 900,
                        display: "flex", alignItems: "center", gap: "5px", zIndex: 10
                      }}>
                        <Star size={12} fill="white" /> DESTACADO
                      </div>
                    )}

                    <div style={{
                      position: "absolute", bottom: "15px", left: "15px",
                      background: item.type === 'video' ? "rgba(255,0,0,0.8)" : "rgba(54,179,126,0.9)",
                      color: "#fff", padding: "5px 12px", borderRadius: "10px",
                      fontSize: "0.7rem", fontWeight: 900,
                      display: "flex", alignItems: "center", gap: "5px"
                    }}>
                      {item.type === 'video' ? <Youtube size={14} /> : <Camera size={14} />}
                      {item.category.toUpperCase()}
                    </div>
                  </div>
                  
                  <div style={{ padding: "28px" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#fff", marginBottom: "12px", lineHeight: 1.2 }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6, fontSize: "0.9rem", height: "3em", overflow: "hidden" }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "100px 0", background: "rgba(255,255,255,0.01)" }}>
        <div className="container">
          <div style={{ 
            background: "linear-gradient(135deg, rgba(54,179,126,0.1) 0%, rgba(54,179,126,0.05) 100%)",
            padding: "80px 40px", borderRadius: "40px", border: "1px solid rgba(54,179,126,0.2)", textAlign: "center"
          }}>
            <h2 style={{ fontSize: "2.25rem", fontWeight: 900, color: "#fff", marginBottom: "60px" }}>
              Nuestra Historia Visual
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "50px" }}>
              <div>
                <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "#36b37e", marginBottom: "12px" }}>{stats.total}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", fontWeight: 800, textTransform: "uppercase" }}>Items Totales</div>
              </div>
              <div>
                <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "#36b37e", marginBottom: "12px" }}>{stats.videos}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", fontWeight: 800, textTransform: "uppercase" }}>Videos</div>
              </div>
              <div>
                <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "#36b37e", marginBottom: "12px" }}>{stats.photos}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", fontWeight: 800, textTransform: "uppercase" }}>Fotos</div>
              </div>
              <div>
                <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "#36b37e", marginBottom: "12px" }}>{new Date().getFullYear()}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", fontWeight: 800, textTransform: "uppercase" }}>Año Actual</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
