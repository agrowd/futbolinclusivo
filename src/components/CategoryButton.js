'use client';

import Link from "next/link";

export default function CategoryButton({ children, isActive, onClick, href }) {
  const buttonStyle = {
    padding: "12px 24px",
    borderRadius: "25px",
    border: isActive ? "2px solid var(--color-primary-light)" : "2px solid rgba(255,255,255,0.1)",
    background: isActive ? "var(--color-primary-light)" : "transparent",
    color: "#fff",
    fontWeight: 700,
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "all 0.3s",
    display: "inline-block",
    textDecoration: "none"
  };

  const handleMouseEnter = (e) => {
    if (!isActive) {
      e.target.style.background = "rgba(255,255,255,0.05)";
      e.target.style.borderColor = "rgba(255,255,255,0.2)";
    }
  };

  const handleMouseLeave = (e) => {
    if (!isActive) {
      e.target.style.background = "transparent";
      e.target.style.borderColor = "rgba(255,255,255,0.1)";
    }
  };

  if (href) {
    return (
      <Link
        href={href}
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        scroll={false}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
