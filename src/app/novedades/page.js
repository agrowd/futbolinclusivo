import Link from "next/link";
import { Newspaper, Calendar, ArrowRight, Trophy } from "lucide-react";

export const metadata = {
  title: "Novedades",
  description: "Últimas noticias y novedades de la Liga de Fútbol Inclusiva y la Asociación Civil Andar.",
};

const news = [
  {
    date: "May 2024",
    title: "Ceremonia de Apertura 2024",
    excerpt: "La Liga de Fútbol Inclusiva abrió su temporada 2024 con una ceremonia que reunió a todas las instituciones participantes.",
    href: "/novedades/apertura-2024",
  },
  {
    date: "Feb 2024",
    title: "Torneo de Verano \"AFA Somos Todxs\"",
    excerpt: "En el marco de la colaboración con AFA, se realizó el sorteo y conformación de grupos para el Torneo de Verano.",
    href: "/novedades/torneo-verano-afa",
  },
  {
    date: "Oct 2023",
    title: "Nace Andar FC",
    excerpt: "El sueño del Complejo 'Fútbol por la Inclusión' es realidad y lo celebramos con la presentación de Andar FC.",
    href: "/novedades/nace-andar-fc",
  },
  {
    date: "Jul 2022",
    title: "Nuevo Complejo \"Fútbol por la Inclusión\"",
    excerpt: "Se inauguró el complejo deportivo oficial con canchas de pasto sintético y accesibilidad 100% garantizada, un hito para el proyecto.",
    href: "/novedades/novedades-complejo",
  },
  {
    date: "Dic 2021",
    title: "Finales 2021 en AFA",
    excerpt: "El predio de AFA en Ezeiza abrió sus puertas para recibir el último Festival de la temporada coronando el cierre de un gran año.",
    href: "/novedades/finales-afa-2021",
  },
];

export default function NovedadesPage() {
  return (
    <div className="section" style={{ minHeight: "80vh" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 className="section-title" style={{ textAlign: "center" }}>
            <Newspaper size={28} aria-hidden="true" style={{ verticalAlign: "middle", marginRight: "8px", color: "var(--color-primary)" }} />
            Novedades
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Las últimas noticias de la Liga de Fútbol Inclusiva y la Asociación Civil Andar.
          </p>
        </div>

        <div role="feed" aria-label="Novedades recientes" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {news.map(({ date, title, excerpt, href }, i) => (
            <Link
              key={i}
              href={href}
              className="card card-elevated"
              style={{
                padding: "24px 28px",
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                textDecoration: "none"
              }}
              aria-labelledby={`news-${i}`}
            >
              <div
                style={{
                  padding: "12px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--color-field-green)",
                  color: "var(--color-primary)",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                <Trophy size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <time
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-primary)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {date}
                </time>
                <h2 id={`news-${i}`} style={{ fontSize: "1.15rem", fontWeight: 700, margin: "6px 0 8px", color: "var(--color-secondary)" }}>
                  {title}
                </h2>
                <p style={{ color: "var(--color-text-muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  {excerpt}
                </p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--color-primary)", fontWeight: 700, fontSize: "0.9rem", marginTop: "12px" }}>
                   Leer artículo completo <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
