"use client";

import { useState, useRef } from "react";
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  Download, 
  Share2, 
  Printer, 
  User, 
  Phone, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Heart, 
  PlusCircle, 
  FileText,
  AlertTriangle
} from "lucide-react";

export default function InfanciasForm() {
  const [formData, setFormData] = useState({
    childName: "",
    childDni: "",
    childAge: "",
    childBirthDate: "",
    tutorName: "",
    tutorPhone: "",
    tutorEmail: "",
    locality: "",
    clubOrSchool: "",
    medicalNotes: "",
    imageConsent: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ticket, setTicket] = useState(null);
  const ticketRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.childName.trim()) {
      setError("Por favor ingresá el nombre completo del niño o niña.");
      return;
    }

    if (!formData.tutorPhone.trim()) {
      setError("Por favor ingresá un número de teléfono / WhatsApp de contacto.");
      return;
    }

    if (!formData.imageConsent) {
      setError("Es obligatorio autorizar el uso de imagen para poder completar la inscripción.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/infancias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Ocurrió un error al enviar la inscripción.");
      }

      setTicket(data.ticket);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message || "Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    if (!ticket) return;
    const text = encodeURIComponent(
      `🎉 ¡Inscripción confirmada para el Día de las Infancias en Andar Fútbol Club!\n\n` +
      `👤 Participante: ${ticket.childName}\n` +
      `🎟️ Código de Pase: ${ticket.ticketCode}\n` +
      `📍 Lugar: Complejo Deportivo Andar (Moreno)\n\n` +
      `Presentá este código o tu QR en el acceso al predio.`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleDownloadQR = () => {
    if (!ticket?.qrDataUrl) return;
    const link = document.createElement("a");
    link.href = ticket.qrDataUrl;
    link.download = `Pase-Infancias-${ticket.ticketCode}.png`;
    link.click();
  };

  const handleReset = () => {
    setFormData({
      childName: "",
      childDni: "",
      childAge: "",
      childBirthDate: "",
      tutorName: "",
      tutorPhone: "",
      tutorEmail: "",
      locality: "",
      clubOrSchool: "",
      medicalNotes: "",
      imageConsent: false,
    });
    setTicket(null);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SUCCESS STATE: DIGITAL TICKET WITH QR
  if (ticket) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
        <div 
          ref={ticketRef}
          className="bg-[#00132B] border-2 border-[#36b37e]/40 rounded-3xl p-6 sm:p-10 text-white shadow-[0_20px_70px_rgba(0,0,0,0.6)] relative overflow-hidden"
        >
          {/* Top Decorative Banner */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#36b37e] via-[#2980B9] to-[#E67E22]" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#36b37e]/20 text-[#36b37e] text-xs font-black uppercase tracking-widest mb-4">
              <CheckCircle2 size={16} /> ¡Inscripción Confirmada!
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
              Pase de Ingreso al Predio
            </h2>
            <p className="text-white/60 text-sm sm:text-base mt-2 max-w-md mx-auto">
              Presentá este código QR en la entrada el día del evento para ingresar sin demoras.
            </p>
          </div>

          {/* Ticket Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-center">
              
              {/* QR Image Box */}
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-xl">
                {ticket.qrDataUrl ? (
                  <img 
                    src={ticket.qrDataUrl} 
                    alt={`QR Ticket ${ticket.ticketCode}`}
                    className="w-48 h-48 object-contain"
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center bg-gray-100 text-gray-400">
                    <QrCode size={48} />
                  </div>
                )}
                <span className="text-[11px] font-black text-gray-800 tracking-wider mt-2 uppercase">
                  Escanear en Entrada
                </span>
              </div>

              {/* Ticket Details */}
              <div className="space-y-4 text-left">
                <div className="border-b border-white/10 pb-3">
                  <span className="text-[11px] font-black uppercase text-[#36b37e] tracking-widest block mb-1">
                    Código de Ticket
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-wider">
                    {ticket.ticketCode}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] uppercase text-white/40 font-bold block">
                      Participante
                    </span>
                    <div className="text-base font-bold text-white">
                      {ticket.childName}
                    </div>
                  </div>

                  {ticket.childDni && (
                    <div>
                      <span className="text-[11px] uppercase text-white/40 font-bold block">
                        DNI
                      </span>
                      <div className="text-base font-semibold text-white/90">
                        {ticket.childDni}
                      </div>
                    </div>
                  )}

                  {ticket.childAge && (
                    <div>
                      <span className="text-[11px] uppercase text-white/40 font-bold block">
                        Edad
                      </span>
                      <div className="text-base font-semibold text-white/90">
                        {ticket.childAge} años
                      </div>
                    </div>
                  )}

                  {ticket.tutorName && (
                    <div>
                      <span className="text-[11px] uppercase text-white/40 font-bold block">
                        Tutor / Responsable
                      </span>
                      <div className="text-base font-semibold text-white/90">
                        {ticket.tutorName}
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="text-[11px] uppercase text-white/40 font-bold block">
                      Teléfono de Contacto
                    </span>
                    <div className="text-base font-semibold text-white/90">
                      {ticket.tutorPhone}
                    </div>
                  </div>

                  {ticket.locality && (
                    <div>
                      <span className="text-[11px] uppercase text-white/40 font-bold block">
                        Localidad
                      </span>
                      <div className="text-base font-semibold text-white/90">
                        {ticket.locality}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-[#36b37e] font-medium">
                  <ShieldCheck size={16} /> Autorización de imagen registrada
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handleDownloadQR}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-4 rounded-xl transition-all text-sm active:scale-95"
            >
              <Download size={18} />
              Descargar QR
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-black font-black py-3.5 px-4 rounded-xl transition-all text-sm active:scale-95"
            >
              <Share2 size={18} />
              Enviar a WhatsApp
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-4 rounded-xl transition-all text-sm active:scale-95"
            >
              <Printer size={18} />
              Imprimir
            </button>
          </div>

          {/* Register another child */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold transition-colors"
            >
              <PlusCircle size={16} />
              Inscribir a otro niño o niña
            </button>
          </div>
        </div>
      </div>
    );
  }

  // PUBLIC REGISTRATION FORM
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-[#00132B]/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        
        {/* Form Title & Info */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E67E22]/20 text-[#E67E22] text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles size={14} /> Formulario de Registro
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Completá los datos del participante
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-2">
            Los campos marcados con asterisco (<span className="text-[#E74C3C]">*</span>) son obligatorios.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-[#E74C3C]/15 border border-[#E74C3C]/40 text-[#ff7675] flex items-start gap-3 text-sm animate-fade-in">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <div>
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* SECTION 1: DATOS DEL NIÑO/A */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#36b37e] flex items-center gap-2">
              <User size={16} /> 1. Datos del Niño / Niña
            </h3>

            {/* Nombre Completo (OBLIGATORIO) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                Nombre y Apellido Completo <span className="text-[#E74C3C]">*</span>
              </label>
              <input
                type="text"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                required
                placeholder="Ej: Mateo Benjamín Gómez"
                className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#36b37e]/20 transition-all text-sm font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* DNI (Opcional / Ejemplo) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  DNI / Documento <span className="text-white/40 text-[10px] lowercase font-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  name="childDni"
                  value={formData.childDni}
                  onChange={handleChange}
                  placeholder="Ej: 52.418.902"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#36b37e]/20 transition-all text-sm"
                />
              </div>

              {/* Edad (Opcional / Ejemplo) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Edad <span className="text-white/40 text-[10px] lowercase font-normal">(ej: 8 años)</span>
                </label>
                <input
                  type="text"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  placeholder="Ej: 8"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#36b37e]/20 transition-all text-sm"
                />
              </div>
            </div>

            {/* Fecha de Nacimiento / Localidad */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Fecha de Nacimiento <span className="text-white/40 text-[10px] lowercase font-normal">(opcional)</span>
                </label>
                <input
                  type="date"
                  name="childBirthDate"
                  value={formData.childBirthDate}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#36b37e]/20 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Localidad / Barrio <span className="text-white/40 text-[10px] lowercase font-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  placeholder="Ej: Moreno, Paso del Rey, Trujui"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#36b37e]/20 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: DATOS DEL RESPONSABLE Y CONTACTO */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#2980B9] flex items-center gap-2">
              <Phone size={16} /> 2. Datos del Adulto Responsable & Contacto
            </h3>

            {/* Nombre del Tutor (Ejemplo) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                Nombre y Apellido del Padre / Madre / Tutor <span className="text-white/40 text-[10px] lowercase font-normal">(opcional)</span>
              </label>
              <input
                type="text"
                name="tutorName"
                value={formData.tutorName}
                onChange={handleChange}
                placeholder="Ej: Valeria Martínez"
                className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#2980B9]/20 transition-all text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Teléfono Completo (OBLIGATORIO) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Teléfono / WhatsApp Completo <span className="text-[#E74C3C]">*</span>
                </label>
                <input
                  type="tel"
                  name="tutorPhone"
                  value={formData.tutorPhone}
                  onChange={handleChange}
                  required
                  placeholder="Ej: 11 2345-6789"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#2980B9]/20 transition-all text-sm font-medium"
                />
              </div>

              {/* Email (Opcional) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Correo Electrónico <span className="text-white/40 text-[10px] lowercase font-normal">(opcional)</span>
                </label>
                <input
                  type="email"
                  name="tutorEmail"
                  value={formData.tutorEmail}
                  onChange={handleChange}
                  placeholder="Ej: familia@gmail.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#2980B9]/20 transition-all text-sm"
                />
              </div>
            </div>

            {/* Club o Escuela / Observaciones médicas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  ¿Viene de algún Club, Escuela o Comedor? <span className="text-white/40 text-[10px] lowercase font-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  name="clubOrSchool"
                  value={formData.clubOrSchool}
                  onChange={handleChange}
                  placeholder="Ej: Escuela N° 14 / Particular"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#2980B9]/20 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Observaciones médicas / Alergias <span className="text-white/40 text-[10px] lowercase font-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  name="medicalNotes"
                  value={formData.medicalNotes}
                  onChange={handleChange}
                  placeholder="Ej: Ninguna / Asma / Celiaco"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#2980B9]/20 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: AUTORIZACIÓN DE USO DE IMAGEN (OBLIGATORIA) */}
          <div className="bg-[#E67E22]/10 border-2 border-[#E67E22]/40 rounded-2xl p-5 sm:p-6 space-y-3">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="imageConsent"
                name="imageConsent"
                checked={formData.imageConsent}
                onChange={handleChange}
                required
                className="mt-1 w-5 h-5 rounded border-white/30 text-[#36b37e] focus:ring-[#36b37e] focus:ring-offset-0 bg-white/10 cursor-pointer"
              />
              <label htmlFor="imageConsent" className="text-xs sm:text-sm text-white/90 leading-relaxed cursor-pointer font-medium select-none">
                <strong className="text-white block text-sm mb-1 uppercase tracking-wide">
                  Autorización de uso de imagen <span className="text-[#E74C3C]">* (Obligatorio)</span>
                </strong>
                Autorizo expresamente a la <strong>Asociación Civil Andar / Fútbol Inclusivo</strong> al registro, uso y difusión de fotografías y videos de mi hijo/a con fines exclusivamente institucionales, educativos y comunitarios para la visibilización de las actividades.
              </label>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#36b37e] to-[#27ae60] hover:from-[#2ecc71] hover:to-[#219653] text-white font-black uppercase tracking-wider py-4 px-6 rounded-2xl shadow-[0_10px_30px_rgba(54,179,126,0.4)] hover:shadow-[0_15px_40px_rgba(54,179,126,0.6)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generando pase con QR...
              </>
            ) : (
              <>
                <QrCode size={20} />
                Completar Inscripción y Obtener Pase QR
              </>
            )}
          </button>

          <p className="text-center text-xs text-white/40">
            Al hacer clic, se generará tu comprobante digital y podrás descargarlo o enviártelo a WhatsApp al instante.
          </p>

        </form>

      </div>
    </div>
  );
}
