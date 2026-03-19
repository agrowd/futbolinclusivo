'use client';

import Link from "next/link";
import Image from "next/image";
import { Newspaper, Calendar, ArrowRight, Trophy, MapPin, Users, Award, Heart } from "lucide-react";
import CategoryButton from "@/components/CategoryButton";
import NewsletterForm from "@/components/NewsletterForm";
import React from "react";

const newsItems = [
  {
    title: "Ceremonia de Apertura 2024",
    date: "11 de Mayo de 2024",
    excerpt: "La Asociación Civil Andar presenta la 27ª Edición de la Liga de Fútbol Inclusiva con 106 equipos y 964 deportistas de toda la provincia.",
    category: "Liga de Buenos Aires",
    image: "https://futbolinclusivo.org.ar/app/uploads/2021/12/FUTBOL-111221-89-Copiar-480x360.jpg",
    slug: "ceremonia-apertura-2024",
    featured: true
  },
  {
    title: "TORNEO DE VERANO \"AFA SOMOS TODXS\"",
    date: "16 de Febrero de 2024",
    excerpt: "En el Predio Lionel Messi se desarrolló el torneo que promueve la inclusión y el respeto a través del fútbol.",
    category: "TORNEO AFA",
    image: "https://futbolinclusivo.org.ar/app/uploads/2024/02/WhatsApp-Image-2024-02-16-at-15.15.10-480x360.jpeg",
    slug: "torneo-de-verano-afa-somos-todxs",
    featured: true
  },
  {
    title: "Nace Andar FC",
    date: "16 de Julio de 2022",
    excerpt: "El sueño del Complejo \"Fútbol por la Inclusión\" es realidad. Una fiesta con shows, arte y fútbol dio inicio oficial al nuevo complejo.",
    category: "Escuela inclusiva",
    image: "https://futbolinclusivo.org.ar/app/uploads/2022/07/MG_3241-Copiar-480x360.jpg",
    slug: "nace-andar-fc",
    featured: true
  },
  {
    title: "Nuevo Complejo \"Fútbol por la Inclusión\"",
    date: "16 de Julio de 2022",
    excerpt: "Inauguración del primer espacio deportivo inclusivo y accesible con 4 canchas de primer nivel en Moreno.",
    category: "Escuela inclusiva",
    image: "https://futbolinclusivo.org.ar/app/uploads/2022/07/MG_3241-Copiar-480x360.jpg",
    slug: "complejo-futbol-por-la-inclusion",
    featured: false
  },
  {
    title: "Finales 2021 en AFA",
    date: "11 de Diciembre de 2021",
    excerpt: "El predio de AFA en Ezeiza abrió sus puertas para recibir el último evento más importante del año de la Liga.",
    category: "Liga de Buenos Aires",
    image: "https://futbolinclusivo.org.ar/app/uploads/2021/12/FUTBOL-111221-374-Copiar-480x360.jpg",
    slug: "finales-2021-en-afa",
    featured: false
  },
  {
    title: "VOLVEMOS A LOS ENCUENTROS PRESENCIALES CUIDADOS",
    date: "2021",
    excerpt: "Desde el equipo de Fútbol Inclusivo estamos muy contentos en anunciar la vuelta a la presencialidad cuidada.",
    category: "Escuela inclusiva",
    image: "https://futbolinclusivo.org.ar/app/uploads/2019/11/FINAL-LFI-2019-163-Copiar-480x360.jpg",
    slug: "volvemos-a-los-encuentros-presenciales-cuidados",
    featured: false
  },
  {
    title: "EL FÚTBOL QUE QUEREMOS: E1 Pablo Aimar",
    date: "Mayo de 2020",
    excerpt: "Lanzamos un ciclo de charlas en vivo que llamaremos \"El Fútbol que Queremos\" con figuras destacadas del fútbol argentino.",
    category: "Comunicación",
    image: "https://futbolinclusivo.org.ar/app/uploads/2020/09/WhatsApp-Image-2020-09-02-at-14.05.32-480x360.jpeg",
    slug: "el-futbol-que-queremos-e1-pablo-aimar",
    featured: false
  },
  {
    title: "Charla en Vivo con el Chiqui Tapia",
    date: "4 de Junio de 2020",
    excerpt: "El presidente de la Asociación del Fútbol Argentino compartió una charla exclusiva sobre inclusión en el fútbol.",
    category: "Escuela inclusiva",
    image: "https://futbolinclusivo.org.ar/app/uploads/2020/05/CHARLA-CHIQUI-TAPIA-480x360.jpeg",
    slug: "charla-en-vivo-con-el-chiqui-tapia",
    featured: false
  },
  {
    title: "VIVO con Charla Iacono",
    date: "28 de Mayo de 2020",
    excerpt: "Realizamos nuestro segundo vivo a través de Instagram y Facebook Live con contenido exclusivo sobre inclusión.",
    category: "Institucional",
    image: "https://futbolinclusivo.org.ar/app/uploads/2020/05/charly-iacono-480x360.jpeg",
    slug: "vivo-con-charla-iacono",
    featured: false
  }
];

const categories = [
  { name: "Todas", count: newsItems.length },
  { name: "Liga de Buenos Aires", count: newsItems.filter(n => n.category === "Liga de Buenos Aires").length },
  { name: "Escuela inclusiva", count: newsItems.filter(n => n.category === "Escuela inclusiva").length },
  { name: "TORNEO AFA", count: newsItems.filter(n => n.category === "TORNEO AFA").length },
  { name: "Comunicación", count: newsItems.filter(n => n.category === "Comunicación").length },
  { name: "Institucional", count: newsItems.filter(n => n.category === "Institucional").length }
];

export default function NovedadesPage() {
  const [selectedCategory, setSelectedCategory] = React.useState(0);

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
            <Newspaper size={14} style={{ marginRight: "8px" }} />
            ACTUALIDAD
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, marginBottom: "24px", letterSpacing: "-1.5px" }}>
            Novedades
          </h1>
          <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.6)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
            Las últimas noticias y sucesos de la Liga de Fútbol Inclusiva y la Asociación Civil Andar.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <div style={{ 
            display: "flex", 
            gap: "15px", 
            justifyContent: "center", 
            flexWrap: "wrap",
            marginBottom: "60px"
          }}>
            {categories.map((category, index) => (
              <CategoryButton
                key={index}
                isActive={index === selectedCategory}
                onClick={() => setSelectedCategory(index)}
              >
                {category.name} ({category.count})
              </CategoryButton>
            ))}
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section style={{ padding: "0 0 80px" }}>
        <div className="container">
          <div style={{ 
            background: "linear-gradient(135deg, rgba(0,141,77,0.1) 0%, rgba(0,141,77,0.05) 100%)",
            padding: "60px",
            borderRadius: "30px", 
            border: "1px solid rgba(0,141,77,0.2)",
            marginBottom: "60px"
          }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "rgba(0,141,77,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "20px"
              }}>
                <Trophy size={30} color="var(--color-primary-light)" />
              </div>
              <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "#fff" }}>
                Destacado
              </h2>
            </div>
            
            {newsItems.filter(n => n.featured).slice(0, 1).map((news, index) => (
              <div key={index} style={{ 
                display: "grid", 
                gridTemplateColumns: "1fr 1fr", 
                gap: "50px", 
                alignItems: "center"
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                    <Calendar size={16} color="var(--color-primary-light)" />
                    <span style={{ color: "var(--color-primary-light)", fontSize: "0.9rem", fontWeight: 700 }}>
                      {news.date}
                    </span>
                    <span style={{ 
                      background: "rgba(0,141,77,0.2)", 
                      color: "var(--color-primary-light)", 
                      padding: "4px 12px", 
                      borderRadius: "15px", 
                      fontSize: "0.8rem", 
                      fontWeight: 700 
                    }}>
                      {news.category}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", marginBottom: "20px", lineHeight: 1.2 }}>
                    {news.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "30px", fontSize: "1.1rem" }}>
                    {news.excerpt}
                  </p>
                  <Link 
                    href={`/novedades/${news.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "16px 32px",
                      borderRadius: "12px",
                      background: "var(--color-primary-light)",
                      color: "#fff",
                      fontWeight: 800,
                      textDecoration: "none",
                      fontSize: "1rem",
                      transition: "all 0.3s"
                    }}
                  >
                    Leer nota completa
                    <ArrowRight size={20} />
                  </Link>
                </div>
                <div style={{ 
                  position: "relative", 
                  height: "400px", 
                  borderRadius: "20px", 
                  overflow: "hidden",
                  border: "2px solid rgba(255,255,255,0.1)"
                }}>
                  <Image 
                    src={news.image}
                    alt={news.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All News Grid */}
      <section style={{ padding: "0 0 100px" }}>
        <div className="container">
          <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#fff", marginBottom: "50px", textAlign: "center" }}>
            Todas las Novedades
          </h2>
          
          <div style={{ display: "grid", gap: "30px" }}>
            {newsItems.map((news, index) => (
              <Link
                key={index}
                href={`/novedades/${news.slug}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: "30px",
                  alignItems: "center",
                  padding: "40px",
                  borderRadius: "25px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(255,255,255,0.02)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Date */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <Calendar size={20} color="var(--color-primary-light)" />
                    <div style={{ fontSize: "0.9rem", color: "var(--color-primary-light)", fontWeight: 700 }}>
                      {news.date.split(' de ')[0]}
                    </div>
                    <div style={{ fontSize: "1.1rem", color: "#fff", fontWeight: 900 }}>
                      {news.date.split(' de ')[1]} {news.date.split(' de ')[2]}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
                    <span style={{ 
                      background: "rgba(0,141,77,0.2)", 
                      color: "var(--color-primary-light)", 
                      padding: "4px 12px", 
                      borderRadius: "15px", 
                      fontSize: "0.8rem", 
                      fontWeight: 700 
                    }}>
                      {news.category}
                    </span>
                    {news.featured && (
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#E67E22" }}>
                        <Trophy size={16} />
                        <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>Destacado</span>
                      </div>
                    )}
                  </div>
                  <h3 style={{ 
                    fontSize: "1.5rem", 
                    fontWeight: 900, 
                    color: "#fff", 
                    marginBottom: "15px", 
                    lineHeight: 1.2 
                  }}>
                    {news.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "20px" }}>
                    {news.excerpt}
                  </p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--color-primary-light)", fontWeight: 700 }}>
                    Leer más <ArrowRight size={16} />
                  </div>
                </div>

                {/* Image */}
                <div style={{ 
                  position: "relative", 
                  width: "200px", 
                  height: "120px", 
                  borderRadius: "15px", 
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                  flexShrink: 0
                }}>
                  <Image 
                    src={news.image}
                    alt={news.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="200px"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <NewsletterForm />
        </div>
      </section>

    </div>
  );
}
