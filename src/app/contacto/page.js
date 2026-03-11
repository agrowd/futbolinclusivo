"use client";

import { useState, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitResult, setSubmitResult] = useState(null);
  const liveRegionRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!formData.email.trim()) newErrors.email = "El email es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email no válido";
    if (!formData.subject.trim()) newErrors.subject = "El asunto es obligatorio";
    if (!formData.message.trim()) newErrors.message = "El mensaje es obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // For MVP, show success (in production, send to API)
    setSubmitResult({ type: "success", message: "Mensaje enviado exitosamente. Te responderemos a la brevedad." });
    setFormData({ name: "", email: "", subject: "", message: "" });
    if (liveRegionRef.current) liveRegionRef.current.textContent = "Mensaje enviado exitosamente.";
  };

  return (
    <div className="section" style={{ minHeight: "80vh" }}>
      <div className="container" style={{ maxWidth: "960px" }}>
        <div ref={liveRegionRef} aria-live="polite" className="sr-only" role="status" />

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 className="section-title" style={{ textAlign: "center" }}>Contacto</h1>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            ¿Tenés alguna consulta? Escribinos y te responderemos a la brevedad.
          </p>
        </div>

        {submitResult && (
          <div
            role="alert"
            style={{
              padding: "16px 20px",
              borderRadius: "var(--radius-md)",
              marginBottom: "24px",
              background: "var(--color-success-bg)",
              border: "2px solid var(--color-success)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <CheckCircle2 size={20} style={{ color: "var(--color-success)" }} aria-hidden="true" />
            <p style={{ fontWeight: 600, color: "var(--color-success)" }}>{submitResult.message}</p>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          {/* Contact Form */}
          <div className="card card-elevated" style={{ padding: "32px" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Send size={20} aria-hidden="true" style={{ color: "var(--color-primary)" }} />
              Envianos un mensaje
            </h2>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label form-label-required">Nombre</label>
                <input
                  id="contact-name"
                  type="text"
                  className={`form-input ${errors.name ? "form-input-error" : ""}`}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "err-c-name" : undefined}
                  placeholder="Tu nombre"
                />
                {errors.name && <span id="err-c-name" className="form-error" role="alert">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label form-label-required">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  className={`form-input ${errors.email ? "form-input-error" : ""}`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "err-c-email" : undefined}
                  placeholder="tu@email.com"
                />
                {errors.email && <span id="err-c-email" className="form-error" role="alert">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject" className="form-label form-label-required">Asunto</label>
                <input
                  id="contact-subject"
                  type="text"
                  className={`form-input ${errors.subject ? "form-input-error" : ""}`}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "err-c-subject" : undefined}
                  placeholder="Asunto de tu mensaje"
                />
                {errors.subject && <span id="err-c-subject" className="form-error" role="alert">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label form-label-required">Mensaje</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  className={`form-input ${errors.message ? "form-input-error" : ""}`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "err-c-msg" : undefined}
                  placeholder="Escribí tu consulta..."
                  style={{ resize: "vertical" }}
                />
                {errors.message && <span id="err-c-msg" className="form-error" role="alert">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                <Send size={18} aria-hidden="true" />
                Enviar mensaje
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="card card-elevated" style={{ padding: "32px", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "24px" }}>
                Información de contacto
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ padding: "10px", borderRadius: "var(--radius-sm)", background: "var(--color-field-green)", color: "var(--color-primary)" }}>
                    <Mail size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: "2px" }}>Email</p>
                    <a href="mailto:info@granjaandar.org.ar" style={{ color: "var(--color-primary)", textDecoration: "none" }}>
                      info@granjaandar.org.ar
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ padding: "10px", borderRadius: "var(--radius-sm)", background: "var(--color-field-green)", color: "var(--color-primary)" }}>
                    <MapPin size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, marginBottom: "2px" }}>Ubicación</p>
                    <p style={{ color: "var(--color-text-muted)" }}>Moreno, Buenos Aires, Argentina</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-elevated" style={{ padding: "32px" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "16px" }}>
                Redes sociales
              </h2>
              <div style={{ display: "flex", gap: "12px" }}>
                {[
                  { href: "https://www.facebook.com/ligadefutbolinclusiva", Icon: Facebook, label: "Facebook" },
                  { href: "https://twitter.com/futbolinclusivo", Icon: Twitter, label: "Twitter" },
                  { href: "https://www.instagram.com/futbolinclusivo_ok", Icon: Instagram, label: "Instagram" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} de Fútbol Inclusivo`}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "var(--color-field-green)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-primary)",
                      transition: "all var(--transition-fast)",
                    }}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            div[style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
