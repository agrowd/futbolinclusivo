import Link from "next/link";
import Image from "next/image";
import { Newspaper, Calendar, ArrowRight, Trophy, MapPin, Users, Award, Heart } from "lucide-react";
import CategoryButton from "@/components/CategoryButton";
import NewsletterForm from "@/components/NewsletterForm";
import dbConnect from "@/lib/mongodb";
import News from "@/lib/schemas/News";

export const dynamic = "force-dynamic"; // Opcional, pero ideal para reflejar cambios del CMS en tiempo real

export default async function NovedadesPage(props) {
  const searchParams = await props.searchParams;
  const selectedCategoryQuery = searchParams?.category || "Todas";

  await dbConnect();

  // Traer todas las noticias publicadas
  const allNewsRaw = await News.find({ published: true }).sort({ publishedAt: -1, createdAt: -1 }).lean();
  
  // Parseo para solucionar obj ids de mongo
  const allNewsResponse = JSON.parse(JSON.stringify(allNewsRaw));

  // Mapa de categorías y cuentas
  const categoriesMap = { "Todas": allNewsResponse.length };
  allNewsResponse.forEach(news => {
    const cat = news.category || "Novedades";
    categoriesMap[cat] = (categoriesMap[cat] || 0) + 1;
  });

  const categories = Object.keys(categoriesMap).map(name => ({
    name,
    count: categoriesMap[name]
  })).sort((a,b) => b.count - a.count); // Ordenar por cantidad

  // Filtrado final
  const newsItems = selectedCategoryQuery === "Todas" 
    ? allNewsResponse 
    : allNewsResponse.filter(n => (n.category || "Novedades") === selectedCategoryQuery);

  const featuredNews = allNewsResponse.filter(n => n.featured).slice(0, 1);


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
                isActive={category.name === selectedCategoryQuery}
                href={category.name === "Todas" ? "/novedades" : `/novedades?category=${encodeURIComponent(category.name)}`}
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
            
            {featuredNews.map((news, index) => (
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
                      {new Date(news.publishedAt || news.createdAt).toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" })}
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
                    src={news.image || "https://futbolinclusivo.org.ar/app/uploads/2018/12/MG_0325.jpg"}
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
                className="hover:bg-white/5 hover:border-white/10 hover:-translate-y-1"
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
                      {new Date(news.publishedAt || news.createdAt).toLocaleDateString("es-AR", { month: "short" }).toUpperCase()}
                    </div>
                    <div style={{ fontSize: "1.1rem", color: "#fff", fontWeight: 900 }}>
                      {new Date(news.publishedAt || news.createdAt).getDate()}
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
                    src={news.image || "https://futbolinclusivo.org.ar/app/uploads/2018/12/MG_0325.jpg"}
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
