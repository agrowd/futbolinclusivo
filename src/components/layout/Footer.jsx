"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const aliados = [
  { name: "FIFA Foundation", logo: "https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/a/aa/FIFA_logo_without_slogan.svg&n=-1" },
  { name: "Common Goal", logo: "https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/8/84/Logo_Common_Goal.svg&n=-1" },
  { name: "UEFA Foundation", logo: "https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/e/ef/Uefa_logo.svg&n=-1" },
  { name: "AFA", logo: "https://images.weserv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/c/c4/Afa_gold_logo24.svg&n=-1" }
];

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
      { href: "/admin", label: "Administrador" },
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
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "40px",
            marginBottom: "60px",
          }}
        >
          {/* Brand column */}
          <div>
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
                fontSize: "clamp(0.875rem, 2vw, 1rem)",
                opacity: 0.6,
                lineHeight: 1.6,
                marginBottom: "30px",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                hyphens: "auto",
                maxWidth: "400px"
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

        {/* Inauguration Complex Section */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "40px",
            paddingBottom: "40px",
            textAlign: "center"
          }}
        >
          <h3
            style={{
              fontSize: "0.75rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "24px",
              color: "rgba(255,255,255,0.5)"
            }}
          >
            Inauguración Complejo Fútbol por la Inclusión
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              flexWrap: "wrap",
              alignItems: "center"
            }}
          >
            <div
              style={{
                position: "relative",
                width: "clamp(80px, 15vw, 120px)",
                height: "clamp(80px, 15vw, 120px)",
                cursor: "pointer",
                transition: "all 0.3s",
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <Image
                src="https://futbolinclusivo.org.ar/app/uploads/2024/02/ANDAR-AFC-ESCUDO-2-e1708535283345.png"
                alt="ANDAR AFC ESCUDO"
                fill
                style={{
                  objectFit: "contain",
                  transition: "all 0.3s"
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                width: "clamp(60px, 12vw, 80px)",
                height: "clamp(48px, 10vw, 64px)",
                cursor: "pointer",
                transition: "all 0.3s",
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <Image
                src="https://futbolinclusivo.org.ar/app/uploads/2017/10/andar@2x.png"
                alt="Andar Logo"
                fill
                style={{
                  objectFit: "contain",
                  transition: "all 0.3s"
                }}
              />
            </div>
          </div>
          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.4)",
              marginTop: "24px",
              maxWidth: "600px",
              margin: "24px auto 0",
              lineHeight: 1.6
            }}
          >
            El primer espacio deportivo inclusivo y accesible con 4 canchas de primer nivel en Moreno
          </p>
        </div>

        {/* Global Partners Section */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "40px",
            paddingBottom: "40px",
            textAlign: "center"
          }}
        >
          <h3
            style={{
              fontSize: "0.75rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "24px",
              color: "rgba(255,255,255,0.5)"
            }}
          >
            Partners Globales
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(16px, 4vw, 32px)",
              flexWrap: "wrap",
              alignItems: "center"
            }}
          >
            {aliados.map((a, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  width: "clamp(60px, 8vw, 80px)",
                  height: "clamp(24px, 3vw, 32px)",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Image
                  src={a.logo}
                  alt={a.name}
                  fill
                  style={{
                    objectFit: "contain",
                    filter: "grayscale(100%) brightness(0) invert(1)",
                    opacity: 0.4,
                    transition: "all 0.5s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.filter = "grayscale(0%) brightness(1) invert(0)";
                    e.target.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.filter = "grayscale(100%) brightness(0) invert(1)";
                    e.target.style.opacity = "0.4";
                  }}
                />
              </div>
            ))}
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
            flexDirection: "row"
          }}
        >
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", flexDirection: "row", alignItems: "center" }}>
            <p>© {new Date().getFullYear()} Asociación Civil Andar.</p>
            <p>Moreno, Buenos Aires, Argentina.</p>
          </div>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", flexDirection: "row", alignItems: "center" }}>
            <Link href="/contacto" style={{ color: "inherit", textDecoration: "none" }}>Contacto</Link>
            <Link href="/sumate" style={{ color: "var(--color-primary-light)", textDecoration: "none", fontWeight: 700 }}>¡Sumate!</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
