"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Heart,
  Home,
} from "lucide-react";

const mainNav = [
  { href: "/institucional", label: "LA ASOCIACIÓN" },
  { href: "/programas", label: "PROGRAMAS" },
  { href: "/contacto", label: "CONTACTO" },
  { href: "/novedades", label: "NOVEDADES" },
  { href: "/sumate", label: "¡SUMATE!" },
];

const programNav = [
  { href: "/programas/liga-ba", label: "LIGA BA" },
  { href: "/programas/liga-nacional", label: "LIGA NACIONAL" },
  { href: "/programas/escuela", label: "ESCUELA" },
  { href: "/programas/festival-latam", label: "FESTIVAL LATAM" },
];

const socialLinks = [
  {
    href: "/",
    label: "Inicio",
    Icon: Home,
  },
  {
    href: "https://www.facebook.com/ligadefutbolinclusiva",
    label: "Facebook",
    Icon: Facebook,
  },
  {
    href: "https://twitter.com/futbolinclusivo",
    label: "Twitter",
    Icon: Twitter,
  },
  {
    href: "https://www.instagram.com/futbolinclusivo_ok",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "mailto:info@granjaandar.org.ar",
    label: "Email",
    Icon: Mail,
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fontSizeIndex, setFontSizeIndex] = useState(0); // 0: normal, 1: large, 2: largest

  const fontSizes = ["100%", "110%", "120%"];

  useEffect(() => {
    const savedSize = localStorage.getItem("accessibility_font_size");
    if (savedSize !== null) {
      const index = parseInt(savedSize, 10);
      setFontSizeIndex(index);
      document.documentElement.style.fontSize = fontSizes[index];
    }
  }, []);

  const changeFontSize = (index) => {
    setFontSizeIndex(index);
    document.documentElement.style.fontSize = fontSizes[index];
    localStorage.setItem("accessibility_font_size", index.toString());
  };

  return (
    <header
      role="banner"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--color-secondary)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* Top bar with social links and accessibility tools */}
      <div
        style={{
          background: "var(--color-surface-dark)",
          padding: "6px 0",
          fontSize: "0.8rem",
        }}
      >
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") || href === "/" ? undefined : "_blank"}
                rel={href.startsWith("mailto") || href === "/" ? undefined : "noopener noreferrer"}
                aria-label={label}
                style={{ color: "rgba(255,255,255,0.6)", transition: "color var(--transition-fast)", display: "flex" }}
                onMouseEnter={(e) => (e.target.style.color = "#fff")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.6)")}
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            ))}
            <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.2)", margin: "0 4px" }} aria-hidden="true" />
            
            {/* Font Size Switcher */}
            <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
              <button
                onClick={() => changeFontSize(0)}
                aria-label="Tamaño de texto normal"
                style={{
                  background: "none",
                  border: "none",
                  padding: "0 4px",
                  color: fontSizeIndex === 0 ? "#fff" : "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 700,
                  fontFamily: "var(--font-primary)",
                  transition: "color var(--transition-fast)"
                }}
              >
                A
              </button>
              <button
                onClick={() => changeFontSize(1)}
                aria-label="Tamaño de texto grande"
                style={{
                  background: "none",
                  border: "none",
                  padding: "0 4px",
                  color: fontSizeIndex === 1 ? "#fff" : "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: 700,
                  fontFamily: "var(--font-primary)",
                  transition: "color var(--transition-fast)"
                }}
              >
                A
              </button>
              <button
                onClick={() => changeFontSize(2)}
                aria-label="Tamaño de texto muy grande"
                style={{
                  background: "none",
                  border: "none",
                  padding: "0 4px",
                  color: fontSizeIndex === 2 ? "#fff" : "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: 700,
                  fontFamily: "var(--font-primary)",
                  transition: "color var(--transition-fast)"
                }}
              >
                A
              </button>
            </div>
          </div>
          <a
            href="https://donaronline.org/asociacion-civil-andar/suma-tu-apoyo-al-futbol-inclusivo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm"
            style={{
              background: "var(--color-primary-light)",
              color: "#fff",
              padding: "4px 14px",
              fontSize: "0.8rem",
              borderRadius: "100px",
              fontWeight: 700
            }}
          >
            <Heart size={14} aria-hidden="true" />
            ¡DONAR AHORA!
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "var(--header-height)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Fútbol Inclusivo - Ir al inicio"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                background: "#fff",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                padding: "4px"
              }}
            >
              <Image 
                src="/logo.png"
                alt="Logo Andar FC"
                width={50}
                height={50}
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <div style={{ lineHeight: 1.2 }}>
              <div
                style={{
                  color: "#fff",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                }}
              >
                Fútbol Inclusivo
              </div>
              <div
                style={{
                  color: "var(--color-primary-light)",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                }}
              >
                Asociación Civil Andar
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Navegación principal"
            style={{ display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap", justifyContent: "flex-end" }}
            className="desktop-nav"
          >
            {mainNav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  color: href === "/sumate" ? "var(--color-accent-orange)" : "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  padding: "8px 12px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  transition: "all var(--transition-fast)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#fff";
                  e.target.style.background = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = href === "/sumate" ? "var(--color-accent-orange)" : "rgba(255,255,255,0.85)";
                  e.target.style.background = "transparent";
                }}
              >
                {label}
              </Link>
            ))}
            <span style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.2)", margin: "0 4px" }} aria-hidden="true" />
            {programNav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  color: "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  padding: "8px 12px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  transition: "all var(--transition-fast)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#fff";
                  e.target.style.background = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "rgba(255,255,255,0.85)";
                  e.target.style.background = "transparent";
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="mobile-menu-btn"
            style={{
              display: "none",
              background: "transparent",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Menú móvil"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--color-secondary)",
            padding: "16px 24px 24px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "var(--shadow-lg)",
            maxHeight: "80vh",
            overflowY: "auto"
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[...mainNav, ...programNav].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "14px 0",
                    color: href === "/sumate" ? "var(--color-accent-orange)" : "rgba(255,255,255,0.9)",
                    textDecoration: "none",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <style jsx>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
