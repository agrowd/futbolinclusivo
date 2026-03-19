'use client';

import Link from "next/link";
import Image from "next/image";
import { Camera, Video, FileText, Newspaper, Download, Play, Eye, Heart, Share2, Calendar, Star, ArrowRight, Youtube, ExternalLink } from "lucide-react";
import React from "react";

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

const featuredGalleries = [
  {
    title: "Inauguración Complejo Fútbol por la Inclusión",
    description: "La inauguración oficial del primer espacio deportivo inclusivo y accesible con 4 canchas de primer nivel en Moreno.",
    image: "https://img.youtube.com/vi/HSo1Fo3tRZ0/hqdefault.jpg",
    date: "2022",
    category: "Video",
    href: "https://www.youtube.com/watch?v=HSo1Fo3tRZ0",
    featured: true,
    type: "video",
    videoId: "HSo1Fo3tRZ0"
  },
  {
    title: "Complejo \"Fútbol por la Inclusión\" – ESPN F360",
    description: "Coverage especial de ESPN sobre el nuevo complejo inclusivo y su impacto en la comunidad.",
    image: "https://img.youtube.com/vi/NRPpf0zAUko/hqdefault.jpg",
    date: "2022",
    category: "Video",
    href: "https://www.youtube.com/watch?v=NRPpf0zAUko",
    featured: false,
    type: "video",
    videoId: "NRPpf0zAUko"
  },
  {
    title: "Finales 2021 por CLA",
    description: "Los momentos más emocionantes de las finales de la Liga de Fútbol Inclusiva 2021.",
    image: "https://futbolinclusivo.org.ar/app/uploads/2021/12/FUTBOL-111221-371-Copiar-480x360.jpg",
    date: "2021",
    category: "Fotos",
    href: "/multimedia/fotos-videos/finales-2021-cla",
    featured: false,
    type: "gallery"
  },
  {
    title: "1° Festival Inclusivo de Fútbol 3",
    description: "El primer festival inclusivo de fútbol 3 organizado por la Asociación Civil Andar.",
    image: "https://img.youtube.com/vi/e8RCwlkekDo/hqdefault.jpg",
    date: "2021",
    category: "Video",
    href: "https://www.youtube.com/watch?v=e8RCwlkekDo",
    featured: false,
    type: "video",
    videoId: "e8RCwlkekDo"
  },
  {
    title: "Finales 2020",
    description: "La cobertura completa de las finales 2020 de la Liga de Fútbol Inclusiva.",
    image: "https://img.youtube.com/vi/1gEyBw8u-nI/hqdefault.jpg",
    date: "2020",
    category: "Video",
    href: "https://www.youtube.com/watch?v=1gEyBw8u-nI",
    featured: false,
    type: "video",
    videoId: "1gEyBw8u-nI"
  },
  {
    title: "Complejo Fútbol por la Inclusión – Lorena Callegaris",
    description: "Galería fotográfica profesional del complejo por la fotógrafa Lorena Callegaris.",
    image: "https://futbolinclusivo.org.ar/app/uploads/2022/07/MG_2412-Copiar-480x360.jpg",
    date: "2022",
    category: "Fotos",
    href: "/multimedia/fotos-videos/lorena-callegaris",
    featured: false,
    type: "gallery"
  }
];

const allGalleries = [
  {
    title: "Finales 2021 por Paola Galvan",
    description: "Cobertura fotográfica de las finales 2021 por Paola Galvan.",
    image: "https://futbolinclusivo.org.ar/app/uploads/2021/12/CUA_5685-480x360.jpg",
    date: "2021",
    category: "Fotos",
    type: "gallery"
  },
  {
    title: "Festival CFR por CLA",
    description: "Festival CFR capturado por CLA Photography.",
    image: "https://futbolinclusivo.org.ar/app/uploads/2021/12/CFR-131121-164-480x360.jpg",
    date: "2021",
    category: "Fotos",
    type: "gallery"
  },
  {
    title: "Festival FI Infancias por Paola Galvan",
    description: "Festival de Fútbol Inclusivo Infancias por Paola Galvan.",
    image: "https://futbolinclusivo.org.ar/app/uploads/2021/12/CUA_7258-480x360.jpg",
    date: "2021",
    category: "Fotos",
    type: "gallery"
  },
  {
    title: "Finales 2020 por Lorena Callegaris",
    description: "Finales 2020 documentadas por Lorena Callegaris.",
    image: "https://futbolinclusivo.org.ar/app/uploads/2019/11/FINAL-LFI-2019-1-Copiar-480x360.jpg",
    date: "2020",
    category: "Fotos",
    type: "gallery"
  },
  {
    title: "Finales 2020 por Paola Galvan",
    description: "Perspectiva única de las finales 2020 por Paola Galvan.",
    image: "https://futbolinclusivo.org.ar/app/uploads/2019/11/ANC_9708-480x360.jpg",
    date: "2020",
    category: "Fotos",
    type: "gallery"
  },
  {
    title: "Finales 2020 por Sebastian Gil Miranda",
    description: "Cobertura artística de las finales 2020 por Sebastian Gil Miranda.",
    image: "https://futbolinclusivo.org.ar/app/uploads/2019/11/IMG_20191110_143354-480x360.jpg",
    date: "2020",
    category: "Fotos",
    type: "gallery"
  }
];

export default function MultimediaPage() {
  const [selectedCategory, setSelectedCategory] = React.useState(0);
  const [filter, setFilter] = React.useState('all'); // all, videos, photos

  const filteredGalleries = [...featuredGalleries, ...allGalleries].filter(gallery => {
    if (filter === 'all') return true;
    if (filter === 'videos') return gallery.type === 'video';
    if (filter === 'photos') return gallery.type === 'gallery';
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
        {/* Background Pattern */}
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
            color: "var(--color-primary-light)",
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
            Descubre los momentos más destacados del Fútbol Inclusivo a través de nuestras galerías de fotos, videos, publicaciones y documentos.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#fff", marginBottom: "50px", textAlign: "center" }}>
            Archivos Multimedia
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
                  <div style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    background: "rgba(0,141,77,0.9)",
                    color: "#fff",
                    padding: "5px 12px",
                    borderRadius: "15px",
                    fontSize: "0.8rem",
                    fontWeight: 700
                  }}>
                    {category.count}
                  </div>
                  {category.featured && (
                    <div style={{
                      position: "absolute",
                      top: "15px",
                      left: "15px",
                      background: "#E67E22",
                      color: "#fff",
                      padding: "5px 12px",
                      borderRadius: "15px",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"
                    }}>
                      <Star size={14} />
                      Destacado
                    </div>
                  )}
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
                      <category.icon size={24} color="var(--color-primary-light)" />
                    </div>
                    <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#fff", margin: 0 }}>
                      {category.title}
                    </h3>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "20px" }}>
                    {category.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-primary-light)", fontWeight: 700 }}>
                    Explorar <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: "12px 24px",
                borderRadius: "25px",
                border: filter === 'all' ? "2px solid var(--color-primary-light)" : "2px solid rgba(255,255,255,0.1)",
                background: filter === 'all' ? "var(--color-primary-light)" : "transparent",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
            >
              Todo (12)
            </button>
            <button
              onClick={() => setFilter('videos')}
              style={{
                padding: "12px 24px",
                borderRadius: "25px",
                border: filter === 'videos' ? "2px solid var(--color-primary-light)" : "2px solid rgba(255,255,255,0.1)",
                background: filter === 'videos' ? "var(--color-primary-light)" : "transparent",
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
              <Video size={16} /> Videos (5)
            </button>
            <button
              onClick={() => setFilter('photos')}
              style={{
                padding: "12px 24px",
                borderRadius: "25px",
                border: filter === 'photos' ? "2px solid var(--color-primary-light)" : "2px solid rgba(255,255,255,0.1)",
                background: filter === 'photos' ? "var(--color-primary-light)" : "transparent",
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
              <Camera size={16} /> Fotos (7)
            </button>
          </div>
        </div>
      </section>

      {/* All Galleries Grid */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", marginBottom: "50px", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#fff", margin: 0 }}>
              Galerías {filter === 'all' ? 'Completas' : filter === 'videos' ? 'de Videos' : 'de Fotos'}
            </h2>
            <div style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)" }}>
              {filteredGalleries.length} elementos encontrados
            </div>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "30px" }}>
            {filteredGalleries.map((gallery, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "20px",
                  overflow: "hidden",
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
                <div style={{ position: "relative", height: "250px", overflow: "hidden" }}>
                  <Image
                    src={gallery.image}
                    alt={gallery.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                  <div style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    background: "rgba(0,0,0,0.7)",
                    color: "#fff",
                    padding: "5px 12px",
                    borderRadius: "15px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "5px"
                  }}>
                    <Calendar size={14} />
                    {gallery.date}
                  </div>
                  {gallery.featured && (
                    <div style={{
                      position: "absolute",
                      top: "15px",
                      left: "15px",
                      background: "#E67E22",
                      color: "#fff",
                      padding: "5px 12px",
                      borderRadius: "15px",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: "5px"
                    }}>
                      <Heart size={14} />
                      Destacado
                    </div>
                  )}
                  <div style={{
                    position: "absolute",
                    bottom: "15px",
                    left: "15px",
                    background: gallery.type === 'video' ? "rgba(255,0,0,0.8)" : "rgba(0,141,77,0.9)",
                    color: "#fff",
                    padding: "5px 12px",
                    borderRadius: "15px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "5px"
                  }}>
                    {gallery.type === 'video' ? <Youtube size={14} /> : <Camera size={14} />}
                    {gallery.category}
                  </div>
                  {gallery.type === 'video' && (
                    <div style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.9)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--color-primary-light)";
                      e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.9)";
                      e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)";
                    }}
                  >
                    <Play size={24} color="#000" />
                  </div>
                  )}
                </div>
                
                <div style={{ padding: "25px" }}>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 900, color: "#fff", marginBottom: "15px" }}>
                    {gallery.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "20px" }}>
                    {gallery.description}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <a
                      href={gallery.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "var(--color-primary-light)",
                        fontWeight: 700,
                        textDecoration: "none",
                        transition: "all 0.3s"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--color-primary-light)";
                      }}
                    >
                      {gallery.type === 'video' ? (
                        <>
                          <Youtube size={16} />
                          Ver video
                        </>
                      ) : (
                        <>
                          <Eye size={16} />
                          Ver galería
                        </>
                      )}
                      <ExternalLink size={14} />
                    </a>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "rgba(255,255,255,0.4)" }}>
                        <Heart size={14} />
                        <span style={{ fontSize: "0.9rem" }}>2.3k</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "rgba(255,255,255,0.4)" }}>
                        <Share2 size={14} />
                        <span style={{ fontSize: "0.9rem" }}>89</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ 
            background: "linear-gradient(135deg, rgba(0,141,77,0.1) 0%, rgba(0,141,77,0.05) 100%)",
            padding: "60px 40px", 
            borderRadius: "30px", 
            border: "1px solid rgba(0,141,77,0.2)",
            textAlign: "center"
          }}>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: "#fff", marginBottom: "50px" }}>
              Nuestro Contenido en Números
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px" }}>
              <div>
                <div style={{ fontSize: "3rem", fontWeight: 900, color: "var(--color-primary-light)", marginBottom: "10px" }}>
                  12
                </div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem" }}>
                  Galerías Totales
                </div>
              </div>
              <div>
                <div style={{ fontSize: "3rem", fontWeight: 900, color: "var(--color-primary-light)", marginBottom: "10px" }}>
                  5
                </div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem" }}>
                  Videos YouTube
                </div>
              </div>
              <div>
                <div style={{ fontSize: "3rem", fontWeight: 900, color: "var(--color-primary-light)", marginBottom: "10px" }}>
                  7
                </div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem" }}>
                  Galerías de Fotos
                </div>
              </div>
              <div>
                <div style={{ fontSize: "3rem", fontWeight: 900, color: "var(--color-primary-light)", marginBottom: "10px" }}>
                  2020-2022
                </div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem" }}>
                  Años de Cobertura
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
