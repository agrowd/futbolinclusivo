"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const footerLinks = [
  {
    title: "Programas",
    links: [
      { href: "/inscripcion", label: "Inscripción a Torneos" },
      { href: "/canchas", label: "Alquiler de Canchas" },
      { href: "/novedades", label: "Novedades" },
    ],
  },
  {
    title: "Institución",
    links: [
      { href: "/nosotros", label: "Nosotros" },
      { href: "/contacto", label: "Contacto" },
      {
        href: "https://donaronline.org/asociacion-civil-andar/suma-tu-apoyo-al-futbol-inclusivo",
        label: "¡Donar ahora!",
        external: true,
      },
    ],
  },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/ligadefutbolinclusiva",
    label: "Facebook de Fútbol Inclusivo",
    Icon: Facebook,
  },
  {
    href: "https://twitter.com/futbolinclusivo",
    label: "Twitter de Fútbol Inclusivo",
    Icon: Twitter,
  },
  {
    href: "https://www.instagram.com/futbolinclusivo_ok",
    label: "Instagram de Fútbol Inclusivo",
    Icon: Instagram,
  },
  {
    href: "mailto:info@granjaandar.org.ar",
    label: "Enviar email a Fútbol Inclusivo",
    Icon: Mail,
  },
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      style={{
        background: "var(--color-secondary)",
        color: "var(--color-text-inverse)",
        padding: "64px 0 24px",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "var(--color-primary)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                }}
              >
                FI
              </div>
              <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                Fútbol Inclusivo
              </span>
            </div>
            <p
              style={{
                fontSize: "0.9rem",
                opacity: 0.7,
                lineHeight: 1.7,
                maxWidth: "280px",
              }}
            >
              La Liga de Fútbol Inclusiva es un proyecto de la Asociación Civil
              Andar. Creando valores a través del deporte desde 1998.
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "20px",
              }}
            >
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="p-2 bg-secondary text-white rounded-full hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent-orange transition-colors"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ title, links }) => (
            <div key={title}>
              <h3
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "16px",
                  opacity: 0.5,
                }}
              >
                {title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {links.map(({ href, label, external }) => (
                  <li key={href} style={{ marginBottom: "10px" }}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "rgba(255,255,255,0.7)",
                          textDecoration: "none",
                          fontSize: "0.95rem",
                          transition: "color var(--transition-fast)",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#fff")}
                        onMouseLeave={(e) =>
                          (e.target.style.color = "rgba(255,255,255,0.7)")
                        }
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        style={{
                          color: "rgba(255,255,255,0.7)",
                          textDecoration: "none",
                          fontSize: "0.95rem",
                          transition: "color var(--transition-fast)",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#fff")}
                        onMouseLeave={(e) =>
                          (e.target.style.color = "rgba(255,255,255,0.7)")
                        }
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Accessibility note */}
          <div>
            <h3
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "16px",
                opacity: 0.5,
              }}
            >
              Accesibilidad
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                opacity: 0.7,
                lineHeight: 1.7,
              }}
            >
              Este sitio fue diseñado siguiendo los estándares WCAG de
              accesibilidad web. Navegable 100% con teclado y compatible con
              lectores de pantalla.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "0.85rem",
            opacity: 0.5,
          }}
        >
          <p>
            © {new Date().getFullYear()} Asociación Civil Andar. Todos los
            derechos reservados.
          </p>
          <p>Un proyecto de Fútbol Inclusivo</p>
        </div>
      </div>
    </footer>
  );
}
