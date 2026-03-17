"use client";

import Link from "next/link";
import Image from "next/image";
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
      { href: "/institucional/nosotros", label: "Nosotros" },
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
        background: "#000814",
        color: "rgba(255,255,255,0.8)",
        padding: "80px 0 40px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "60px",
            marginBottom: "60px",
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: "span 2" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "24px",
              }}
            >
              <Image src="/logo.png" alt="Logo Andar FC" width={50} height={50} />
              <div>
                <span style={{ fontWeight: 900, fontSize: "1.4rem", color: "#fff", display: "block", letterSpacing: "-0.5px" }}>
                  Fútbol Inclusivo
                </span>
                <span style={{ color: "var(--color-primary-light)", fontWeight: 700, fontSize: "0.75rem", textTransform: "uppercase" }}>
                  Asociación Civil Andar
                </span>
              </div>
            </div>
            <p
              style={{
                fontSize: "1rem",
                opacity: 0.6,
                lineHeight: 1.7,
                maxWidth: "400px",
                marginBottom: "30px"
              }}
            >
              Desde 1998, equiparando oportunidades y construyendo una sociedad más inclusiva a través del deporte sistemático. Un orgullo morenense con proyección latinoamericana.
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
              }}
            >
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ 
                    color: "rgba(255,255,255,0.4)",
                    background: "rgba(255,255,255,0.05)",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-primary-light)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={20} aria-hidden="true" />
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
                fontSize: "0.75rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "24px",
                color: "#fff",
              }}
            >
              ACCESIBILIDAD
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                opacity: 0.5,
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
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          <div style={{ display: "flex", gap: "24px" }}>
            <p>© {new Date().getFullYear()} Asociación Civil Andar.</p>
            <p>Moreno, Buenos Aires, Argentina.</p>
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link href="/contacto" style={{ color: "inherit", textDecoration: "none" }}>Contacto</Link>
            <Link href="/sumate" style={{ color: "var(--color-primary-light)", textDecoration: "none", fontWeight: 700 }}>¡Sumate!</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
