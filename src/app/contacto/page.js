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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: formData.email,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitResult({ type: "success", message: data.message });
        setFormData({ name: "", email: "", subject: "", message: "" });
        if (liveRegionRef.current) liveRegionRef.current.textContent = "Mensaje enviado exitosamente.";
      } else {
        setSubmitResult({ type: "error", message: data.message || "Error al enviar mensaje" });
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitResult({ type: "error", message: "Error al enviar mensaje. Intenta nuevamente." });
    }
  };

  return (
    <div className="bg-[#000B1A] text-white min-h-screen pt-48 pb-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <div ref={liveRegionRef} aria-live="polite" className="sr-only" role="status" />

        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-[#36b37e]/10 text-[#36b37e] px-6 py-2.5 rounded-full font-black text-sm tracking-wider mb-8 uppercase border-2 border-[#36b37e]/30">
            <Mail size={14} />
            HABLEMOS
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none text-white">
            Contacto
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-medium">
            ¿Tenés alguna consulta o querés sumarte a la Liga? Escribinos y transformemos juntos realidades.
          </p>
        </header>

        {submitResult && (
          <div
            role="alert"
            className="flex items-center gap-4 bg-[#36b37e]/10 border-2 border-[#36b37e] text-[#36b37e] p-6 rounded-2xl mb-12 shadow-[0_0_30px_rgba(54,179,126,0.2)]"
          >
            <CheckCircle2 size={24} aria-hidden="true" />
            <p className="font-extrabold text-lg">{submitResult.message}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white/[0.02] border border-white/5 p-10 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#36b37e]/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-[#36b37e]/10 transition-all duration-700" />
            
            <h2 className="text-2xl font-black mb-10 flex items-center gap-4 text-white uppercase tracking-tighter relative z-10">
              <div className="w-10 h-10 bg-[#36b37e] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#36b37e]/30">
                <Send size={20} aria-hidden="true" />
              </div>
              Envianos un mensaje
            </h2>

            <form onSubmit={handleSubmit} noValidate className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 ml-1">Nombre</label>
                  <input
                    id="contact-name"
                    type="text"
                    className={`w-full bg-white/[0.05] border-2 ${errors.name ? "border-red-500" : "border-white/5"} rounded-2xl p-4 text-white font-bold focus:border-[#36b37e] focus:bg-white/[0.08] transition-all outline-none`}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    aria-invalid={!!errors.name}
                    placeholder="Tu nombre completo"
                  />
                  {errors.name && <span className="text-[10px] text-red-400 font-black mt-2 block ml-1 uppercase">{errors.name}</span>}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 ml-1">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    className={`w-full bg-white/[0.05] border-2 ${errors.email ? "border-red-500" : "border-white/5"} rounded-2xl p-4 text-white font-bold focus:border-[#36b37e] focus:bg-white/[0.08] transition-all outline-none`}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    aria-invalid={!!errors.email}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <span className="text-[10px] text-red-400 font-black mt-2 block ml-1 uppercase">{errors.email}</span>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 ml-1">Asunto</label>
                <input
                  id="contact-subject"
                  type="text"
                  className={`w-full bg-white/[0.05] border-2 ${errors.subject ? "border-red-500" : "border-white/5"} rounded-2xl p-4 text-white font-bold focus:border-[#36b37e] focus:bg-white/[0.08] transition-all outline-none`}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  aria-invalid={!!errors.subject}
                  placeholder="¿Sobre qué querés consultarnos?"
                />
                {errors.subject && <span className="text-[10px] text-red-400 font-black mt-2 block ml-1 uppercase">{errors.subject}</span>}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 ml-1">Mensaje</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  className={`w-full bg-white/[0.05] border-2 ${errors.message ? "border-red-500" : "border-white/5"} rounded-2xl p-4 text-white font-bold focus:border-[#36b37e] focus:bg-white/[0.08] transition-all outline-none resize-none`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  aria-invalid={!!errors.message}
                  placeholder="Escribí tu mensaje aquí..."
                />
                {errors.message && <span className="text-[10px] text-red-400 font-black mt-2 block ml-1 uppercase">{errors.message}</span>}
              </div>

              <button 
                type="submit" 
                className="w-full bg-white text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-[#36b37e] hover:text-white hover:shadow-[0_0_30px_rgba(54,179,126,0.3)] hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-xs"
              >
                <Send size={18} />
                Enviar mensaje
              </button>
            </form>
          </div>

          {/* Contact Info Side */}
          <div className="space-y-8">
            <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[40px] shadow-xl">
              <h2 className="text-2xl font-black mb-8 text-white uppercase tracking-tighter">
                Información de contacto
              </h2>

              <div className="space-y-8">
                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#36b37e] transition-all group-hover:bg-[#36b37e] group-hover:text-white">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Email Oficial</p>
                    <a href="mailto:info@granjaandar.org.ar" className="text-xl font-bold text-white hover:text-[#36b37e] transition-colors leading-none">
                      info@granjaandar.org.ar
                    </a>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#36b37e] transition-all group-hover:bg-[#36b37e] group-hover:text-white">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Ubicación</p>
                    <p className="text-xl font-bold text-white leading-tight">Moreno, Buenos Aires, Argentina</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#001A3D] to-[#000B1A] border border-white/5 p-10 rounded-[40px] shadow-xl relative overflow-hidden group">
              <h2 className="text-2xl font-black mb-8 text-white uppercase tracking-tighter relative z-10">
                Redes sociales
              </h2>
              <div className="flex gap-4 relative z-10">
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
                    className="w-16 h-16 bg-white/[0.05] border border-white/10 rounded-2xl flex items-center justify-center text-white transition-all hover:bg-[#36b37e] hover:border-[#36b37e] hover:scale-110 active:scale-90"
                  >
                    <Icon size={28} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
