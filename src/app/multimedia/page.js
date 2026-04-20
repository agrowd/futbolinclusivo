'use client';

import Link from "next/link";
import Image from "next/image";
import { Camera, Video, FileText, Newspaper, Download, Play, Eye, Heart, Share2, Calendar, Star, ArrowRight, Youtube, ExternalLink, Loader2 } from "lucide-react";
import React from "react";

// The top categories remain static as they point to specific sections/routes
const multimediaCategories = [
  {
    title: "Fotos y Videos",
    description: "Galería completa de imágenes y videos de nuestros eventos, torneos y actividades",
    icon: Camera,
    image: "https://futbolinclusivo.org.ar/app/uploads/2022/03/multimedia-fotos-videos-480x360.jpg",
    href: "/multimedia/fotos-videos",
    featured: true,
    count: "12 Galerías"
  },
  {
    title: "Revista",
    description: "Publicaciones digitales con historias, entrevistas y artículos destacados",
    icon: FileText,
    image: "https://futbolinclusivo.org.ar/app/uploads/2022/03/nosotros-nuestro-proposito-480x360.jpg",
    href: "/multimedia/revista",
    featured: false,
    count: "8 Ediciones"
  },
  {
    title: "Prensa",
    description: "Noticias, artículos y cobertura mediática del Fútbol Inclusivo",
    icon: Newspaper,
    image: "https://futbolinclusivo.org.ar/app/uploads/2022/03/liga-ba-institucional-480x360.jpg",
    href: "/multimedia/prensa",
    featured: false,
    count: "50+ Artículos"
  },
  {
    title: "Documentos Útiles",
    description: "Formularios, reglamentos y documentos oficiales para descargar",
    icon: Download,
    image: "https://futbolinclusivo.org.ar/app/uploads/2022/03/liga-nacional-proyecto-480x360.jpg",
    href: "/multimedia/documentos-utiles",
    featured: false,
    count: "20+ Documentos"
  }
];

export default function MultimediaPage() {
  const [filter, setFilter] = React.useState('all'); // all, videos, photos
  const [media, setMedia] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState({ total: 0, photos: 0, videos: 0 });

  React.useEffect(() => {
    async function fetchMedia() {
      try {
        const res = await fetch("/api/media?limit=100");
        const data = await res.json();
        if (data.success) {
          const items = data.data;
          
          // Sort: Featured first, then by date
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

  const filteredItems = media.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'videos') return item.type === 'video';
    if (filter === 'photos') return item.type === 'image' || item.type === 'gallery';
    return true;
  });

  return (
    <div style={{ background: "#000B1A", color: "#fff", minHeight: "100vh" }}>
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

      {/* Categories Grid (Static Routes) */}
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

      {/* Filter Section */}
      <section style={{ padding: "60px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: "12px 24px",
                borderRadius: "25px",
                border: filter === 'all' ? "2px solid #36b37e" : "2px solid rgba(255,255,255,0.1)",
                background: filter === 'all' ? "#36b37e" : "transparent",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
            >
              Todo ({stats.total})
            </button>
            <button
              onClick={() => setFilter('videos')}
              style={{
                padding: "12px 24px",
                borderRadius: "25px",
                border: filter === 'videos' ? "2px solid #36b37e" : "2px solid rgba(255,255,255,0.1)",
                background: filter === 'videos' ? "#36b37e" : "transparent",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <Video size={16} /> Videos ({stats.videos})
            </button>
            <button
              onClick={() => setFilter('photos')}
              style={{
                padding: "12px 24px",
                borderRadius: "25px",
                border: filter === 'photos' ? "2px solid #36b37e" : "2px solid rgba(255,255,255,0.1)",
                background: filter === 'photos' ? "#36b37e" : "transparent",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <Camera size={16} /> Fotos ({stats.photos})
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Content Grid */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: "center", padding: "100px 0" }}>
              <Loader2 className="animate-spin text-[#36b37e] mx-auto mb-4" size={48} />
              <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Cargando Galería...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "100px 20px", color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.02)", borderRadius: "40px", border: "2px dashed rgba(255,255,255,0.05)" }}>
               <ImageIcon size={64} className="mx-auto mb-6 opacity-20" />
               <h3 className="text-xl font-black uppercase tracking-tight">No hay contenido disponible</h3>
               <p className="text-xs font-bold uppercase mt-2 opacity-50">Sube contenido desde el panel de administración</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: item.featured ? "2px solid rgba(54,179,126,0.3)" : "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "24px",
                    overflow: "hidden",
                    transition: "all 0.3s",
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.transform = "translateY(-8px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ position: "relative", height: "250px", overflow: "hidden" }}>
                    <Image
                      src={item.thumbnailUrl || item.url}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 350px"
                    />
                    
                    {item.featured && (
                      <div style={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                        background: "#36b37e",
                        color: "#fff",
                        padding: "5px 12px",
                        borderRadius: "10px",
                        fontSize: "0.7rem",
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        zIndex: 10,
                        boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
                      }}>
                        <Star size={12} fill="white" /> DESTACADO
                      </div>
                    )}

                    <div style={{
                      position: "absolute",
                      bottom: "15px",
                      left: "15px",
                      background: item.type === 'video' ? "rgba(255,0,0,0.8)" : "rgba(54,179,126,0.9)",
                      color: "#fff",
                      padding: "5px 12px",
                      borderRadius: "10px",
                      fontSize: "0.7rem",
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      backdropBlur: "sm"
                    }}>
                      {item.type === 'video' ? <Youtube size={14} /> : <Camera size={14} />}
                      {item.category.toUpperCase()}
                    </div>
                  </div>
                  
                  <div style={{ padding: "28px" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "#fff", marginBottom: "12px", lineHeight: 1.2 }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "20px", fontSize: "0.9rem", height: "3em", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {item.description}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: "#36b37e",
                          fontWeight: 800,
                          textDecoration: "none",
                          fontSize: "0.85rem",
                          letterSpacing: "0.5px"
                        }}
                      >
                        {item.type === 'video' ? "REPRODUCIR VIDEO" : "VER GALERÍA"}
                        <ExternalLink size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
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
            padding: "80px 40px", 
            borderRadius: "40px", 
            border: "1px solid rgba(54,179,126,0.2)",
            textAlign: "center"
          }}>
            <h2 style={{ fontSize: "2.25rem", fontWeight: 900, color: "#fff", marginBottom: "60px", letterSpacing: "-1px" }}>
              Galería Multimedia Dinámica
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "50px" }}>
              <div>
                <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "#36b37e", marginBottom: "12px" }}>
                  {stats.total}
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>
                  Items Totales
                </div>
              </div>
              <div>
                <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "#36b37e", marginBottom: "12px" }}>
                  {stats.videos}
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>
                  Videos
                </div>
              </div>
              <div>
                <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "#36b37e", marginBottom: "12px" }}>
                  {stats.photos}
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>
                  Fotos y Galerías
                </div>
              </div>
              <div>
                <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "#36b37e", marginBottom: "12px" }}>
                  {new Date().getFullYear()}
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>
                  Año Actual
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
