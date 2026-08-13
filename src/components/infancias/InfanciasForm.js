"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  Plus, 
  Trash2, 
  Users, 
  ChevronRight, 
  AlertTriangle,
  FileCheck
} from "lucide-react";

export default function InfanciasForm() {
  // Tutor & General Info
  const [tutorData, setTutorData] = useState({
    tutorName: "",
    tutorPhone: "",
    tutorEmail: "",
    locality: "",
    clubOrSchool: "",
    imageConsent: false,
  });

  // Multi-children array
  const [children, setChildren] = useState([
    {
      id: "child-1",
      childName: "",
      childDni: "",
      childAge: "",
      childBirthDate: "",
      medicalNotes: "",
      duplicateWarning: null,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ticketResult, setTicketResult] = useState(null); // { familyGroupId, tickets: [...] }
  const [selectedTicketIndex, setSelectedTicketIndex] = useState(0);

  // Debounce timers for duplicate check
  const debounceTimers = useRef({});

  const handleTutorChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTutorData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  // Real-time check duplicate function
  const checkDuplicate = useCallback(async (childIndex, dni, name, phone) => {
    if (!dni && (!name || !phone)) return;

    try {
      const res = await fetch("/api/infancias/check-duplicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dni, name, phone }),
      });
      const data = await res.json();

      setChildren((prev) => {
        const next = [...prev];
        if (next[childIndex]) {
          next[childIndex] = {
            ...next[childIndex],
            duplicateWarning: data.isDuplicate ? data.message : null,
          };
        }
        return next;
      });
    } catch (err) {
      console.warn("Error checking duplicate:", err);
    }
  }, []);

  const handleChildChange = (index, field, value) => {
    setChildren((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });

    if (error) setError("");

    // Trigger debounced duplicate check
    if (field === "childDni" || field === "childName") {
      const timerKey = `child-${index}`;
      if (debounceTimers.current[timerKey]) {
        clearTimeout(debounceTimers.current[timerKey]);
      }

      debounceTimers.current[timerKey] = setTimeout(() => {
        const currentChild = children[index];
        const updatedChild = { ...currentChild, [field]: value };
        checkDuplicate(
          index,
          updatedChild.childDni,
          updatedChild.childName,
          tutorData.tutorPhone
        );
      }, 500);
    }
  };

  // Add another child
  const handleAddChild = () => {
    setChildren((prev) => [
      ...prev,
      {
        id: `child-${Date.now()}`,
        childName: "",
        childDni: "",
        childAge: "",
        childBirthDate: "",
        medicalNotes: "",
        duplicateWarning: null,
      },
    ]);
  };

  // Remove a child (if more than 1)
  const handleRemoveChild = (index) => {
    if (children.length <= 1) return;
    setChildren((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!tutorData.tutorPhone.trim()) {
      setError("Por favor ingresá un número de teléfono / WhatsApp de contacto.");
      return;
    }

    if (!tutorData.imageConsent) {
      setError("Es obligatorio autorizar el uso de imagen para poder completar la inscripción.");
      return;
    }

    // Validate each child
    for (let i = 0; i < children.length; i++) {
      if (!children[i].childName.trim()) {
        setError(`Por favor ingresá el nombre completo del participante #${i + 1}.`);
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        ...tutorData,
        children: children.map((c) => ({
          childName: c.childName.trim(),
          childDni: c.childDni ? c.childDni.trim() : "",
          childAge: c.childAge ? String(c.childAge).trim() : "",
          childBirthDate: c.childBirthDate ? String(c.childBirthDate).trim() : "",
          medicalNotes: c.medicalNotes ? c.medicalNotes.trim() : "",
        })),
      };

      const res = await fetch("/api/infancias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Ocurrió un error al enviar la inscripción.");
      }

      setTicketResult({
        familyGroupId: data.familyGroupId,
        tickets: data.tickets || [data.ticket],
      });
      setSelectedTicketIndex(0);
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

  const handleShareWhatsAppAll = () => {
    if (!ticketResult || !ticketResult.tickets.length) return;
    
    let text = `🎉 *¡Inscripción Confirmada - Día de las Infancias en Andar FC!*\n\n`;
    text += `📍 *Lugar:* Complejo Deportivo Andar (Moreno)\n`;
    text += `👨‍👩‍👧 *Familia:* ${tutorData.tutorName || "Inscriptos"}\n\n`;
    text += `🎟️ *PASES Y CÓDIGOS DE INGRESO:*\n`;

    ticketResult.tickets.forEach((t, idx) => {
      text += `\n${idx + 1}. *${t.childName}* (Ticket: *${t.ticketCode}*)`;
      if (t.childDni) text += ` - DNI: ${t.childDni}`;
    });

    text += `\n\n_Presentá los códigos o imágenes QR en el acceso al predio._`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleDownloadSelectedQR = () => {
    const ticket = ticketResult?.tickets[selectedTicketIndex];
    if (!ticket?.qrDataUrl) return;
    const link = document.createElement("a");
    link.href = ticket.qrDataUrl;
    link.download = `Pase-QR-${ticket.ticketCode}-${ticket.childName}.png`;
    link.click();
  };

  const handleReset = () => {
    setTutorData({
      tutorName: "",
      tutorPhone: "",
      tutorEmail: "",
      locality: "",
      clubOrSchool: "",
      imageConsent: false,
    });
    setChildren([
      {
        id: "child-1",
        childName: "",
        childDni: "",
        childAge: "",
        childBirthDate: "",
        medicalNotes: "",
        duplicateWarning: null,
      },
    ]);
    setTicketResult(null);
    setSelectedTicketIndex(0);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SUCCESS STATE: DIGITAL FAMILY TICKETS WITH QR
  if (ticketResult && ticketResult.tickets.length > 0) {
    const currentTicket = ticketResult.tickets[selectedTicketIndex] || ticketResult.tickets[0];

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
        <div className="bg-[#00132B] border-2 border-[#36b37e]/40 rounded-3xl p-6 sm:p-10 text-white shadow-[0_20px_70px_rgba(0,0,0,0.6)] relative overflow-hidden">
          
          {/* Top Banner */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#36b37e] via-[#2980B9] to-[#E67E22]" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#36b37e]/20 text-[#36b37e] text-xs font-black uppercase tracking-widest mb-4">
              <CheckCircle2 size={16} /> ¡Inscripción Confirmada!
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
              {ticketResult.tickets.length === 1 ? "Pase de Ingreso al Predio" : `Pases Familiares (${ticketResult.tickets.length} Niños/as)`}
            </h2>
            <p className="text-white/60 text-sm sm:text-base mt-2 max-w-lg mx-auto">
              Presentá estos códigos QR en la entrada el día del evento. Cada niño/a tiene su pase individual con su código.
            </p>
          </div>

          {/* If multi-children, show tabs selector */}
          {ticketResult.tickets.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-white/5 p-2 rounded-2xl border border-white/10">
              {ticketResult.tickets.map((t, idx) => (
                <button
                  key={t.id || idx}
                  onClick={() => setSelectedTicketIndex(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    selectedTicketIndex === idx
                      ? "bg-[#36b37e] text-white shadow-lg shadow-[#36b37e]/30 scale-105"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <QrCode size={16} />
                  <span>{t.childName.split(" ")[0]}</span>
                  <span className="text-[11px] opacity-75 font-mono">({t.ticketCode})</span>
                </button>
              ))}
            </div>
          )}

          {/* Active Ticket Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-center">
              
              {/* QR Image Box */}
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-2xl">
                {currentTicket.qrDataUrl ? (
                  <img 
                    src={currentTicket.qrDataUrl} 
                    alt={`QR Ticket ${currentTicket.ticketCode}`}
                    className="w-52 h-52 object-contain"
                  />
                ) : (
                  <div className="w-52 h-52 flex items-center justify-center bg-gray-100 text-gray-400">
                    <QrCode size={56} />
                  </div>
                )}
                <span className="text-[11px] font-black text-gray-800 tracking-wider mt-2 uppercase">
                  Pase Individual • Puerta
                </span>
              </div>

              {/* Ticket Details */}
              <div className="space-y-4 text-left">
                <div className="border-b border-white/10 pb-3 flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-black uppercase text-[#36b37e] tracking-widest block mb-1">
                      Código de Ticket
                    </span>
                    <div className="text-2xl sm:text-4xl font-black text-white font-mono tracking-wider">
                      {currentTicket.ticketCode}
                    </div>
                  </div>
                  {ticketResult.tickets.length > 1 && (
                    <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-white/80">
                      Pase {selectedTicketIndex + 1} de {ticketResult.tickets.length}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] uppercase text-white/40 font-bold block">
                      Participante
                    </span>
                    <div className="text-lg font-bold text-white">
                      {currentTicket.childName}
                    </div>
                  </div>

                  {currentTicket.childDni && (
                    <div>
                      <span className="text-[11px] uppercase text-white/40 font-bold block">
                        DNI
                      </span>
                      <div className="text-base font-semibold text-white/90">
                        {currentTicket.childDni}
                      </div>
                    </div>
                  )}

                  {currentTicket.childAge && (
                    <div>
                      <span className="text-[11px] uppercase text-white/40 font-bold block">
                        Edad
                      </span>
                      <div className="text-base font-semibold text-white/90">
                        {currentTicket.childAge} años
                      </div>
                    </div>
                  )}

                  {currentTicket.tutorName && (
                    <div>
                      <span className="text-[11px] uppercase text-white/40 font-bold block">
                        Tutor / Responsable
                      </span>
                      <div className="text-base font-semibold text-white/90">
                        {currentTicket.tutorName}
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="text-[11px] uppercase text-white/40 font-bold block">
                      Teléfono de Contacto
                    </span>
                    <div className="text-base font-semibold text-white/90">
                      {currentTicket.tutorPhone}
                    </div>
                  </div>

                  {currentTicket.locality && (
                    <div>
                      <span className="text-[11px] uppercase text-white/40 font-bold block">
                        Localidad
                      </span>
                      <div className="text-base font-semibold text-white/90">
                        {currentTicket.locality}
                      </div>
                    </div>
                  )}
                </div>

                {currentTicket.medicalNotes && (
                  <div className="p-3 rounded-xl bg-[#E74C3C]/15 border border-[#E74C3C]/30 text-xs text-[#ff7675]">
                    ⚠️ <strong>Atención médica / Alergias:</strong> {currentTicket.medicalNotes}
                  </div>
                )}

                <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs text-[#36b37e] font-medium">
                  <ShieldCheck size={16} /> Autorización de imagen registrada
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handleDownloadSelectedQR}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-4 rounded-xl transition-all text-sm active:scale-95"
            >
              <Download size={18} />
              Descargar este QR
            </button>
            <button
              onClick={handleShareWhatsAppAll}
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-black font-black py-3.5 px-4 rounded-xl transition-all text-sm active:scale-95 shadow-lg"
            >
              <Share2 size={18} />
              Enviar Todos a WhatsApp
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-4 rounded-xl transition-all text-sm active:scale-95"
            >
              <Printer size={18} />
              Imprimir Comprobantes
            </button>
          </div>

          {/* Register another family */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold transition-colors"
            >
              <FileCheck size={16} />
              Realizar una nueva inscripción
            </button>
          </div>
        </div>
      </div>
    );
  }

  // PUBLIC REGISTRATION FORM (MULTI-CHILD)
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-[#00132B]/95 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        
        {/* Form Title & Info */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E67E22]/20 text-[#E67E22] text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles size={14} /> Formulario Familiar
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
            Inscripción para el Día de las Infancias
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-2">
            Podés inscribir a uno o varios hermanos/as en el mismo formulario sin tener que cargar los datos de contacto de nuevo.
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

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: DATOS DEL ADULTO RESPONSABLE */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#2980B9] flex items-center gap-2">
                <Phone size={16} /> 1. Datos del Adulto Responsable & Contacto
              </h3>
              <span className="text-[11px] text-white/40">Se completa una sola vez</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Nombre y Apellido del Padre / Madre / Tutor <span className="text-white/40 text-[10px] lowercase font-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  name="tutorName"
                  value={tutorData.tutorName}
                  onChange={handleTutorChange}
                  placeholder="Ej: Valeria Martínez"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#2980B9]/20 transition-all text-sm"
                />
              </div>

              {/* Teléfono Completo (OBLIGATORIO) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Teléfono / WhatsApp de Contacto <span className="text-[#E74C3C]">*</span>
                </label>
                <input
                  type="tel"
                  name="tutorPhone"
                  value={tutorData.tutorPhone}
                  onChange={handleTutorChange}
                  required
                  placeholder="Ej: 11 2345-6789"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#2980B9]/20 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Localidad / Barrio <span className="text-white/40 text-[10px] lowercase font-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  name="locality"
                  value={tutorData.locality}
                  onChange={handleTutorChange}
                  placeholder="Ej: Moreno, Paso del Rey"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Email <span className="text-white/40 text-[10px] lowercase font-normal">(opcional)</span>
                </label>
                <input
                  type="email"
                  name="tutorEmail"
                  value={tutorData.tutorEmail}
                  onChange={handleTutorChange}
                  placeholder="Ej: familia@gmail.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Club o Institución <span className="text-white/40 text-[10px] lowercase font-normal">(opcional)</span>
                </label>
                <input
                  type="text"
                  name="clubOrSchool"
                  value={tutorData.clubOrSchool}
                  onChange={handleTutorChange}
                  placeholder="Ej: Particular / Escuela N° 12"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: LISTA DE CHICOS (MULTI-CHILD) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#36b37e] flex items-center gap-2">
                <Users size={16} /> 2. Participantes a Inscribir ({children.length})
              </h3>
              <button
                type="button"
                onClick={handleAddChild}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#36b37e]/20 hover:bg-[#36b37e]/30 text-[#36b37e] text-xs font-bold transition-all"
              >
                <Plus size={14} /> Agregar otro hermano/a
              </button>
            </div>

            {children.map((child, index) => (
              <div
                key={child.id}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 relative transition-all"
              >
                {/* Header per child */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#36b37e] text-black font-black text-xs flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Datos del Niño / Niña #{index + 1}
                    </span>
                  </div>

                  {children.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveChild(index)}
                      className="text-white/40 hover:text-[#E74C3C] p-1.5 rounded-lg transition-colors text-xs flex items-center gap-1"
                      title="Eliminar este niño de la lista"
                    >
                      <Trash2 size={14} />
                      <span className="hidden sm:inline">Quitar</span>
                    </button>
                  )}
                </div>

                {/* Real-time duplicate alert banner */}
                {child.duplicateWarning && (
                  <div className="p-3.5 rounded-xl bg-[#E67E22]/15 border border-[#E67E22]/40 text-[#f39c12] text-xs flex items-start gap-2.5 animate-fade-in">
                    <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                    <div>{child.duplicateWarning}</div>
                  </div>
                )}

                {/* Nombre Completo (OBLIGATORIO) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                    Nombre y Apellido Completo <span className="text-[#E74C3C]">*</span>
                  </label>
                  <input
                    type="text"
                    value={child.childName}
                    onChange={(e) => handleChildChange(index, "childName", e.target.value)}
                    required
                    placeholder="Ej: Mateo Benjamín Gómez"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#36b37e]/20 transition-all text-sm font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* DNI */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                      DNI <span className="text-white/40 text-[10px] lowercase font-normal">(opcional)</span>
                    </label>
                    <input
                      type="text"
                      value={child.childDni}
                      onChange={(e) => handleChildChange(index, "childDni", e.target.value)}
                      placeholder="Ej: 52.418.902"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none text-sm"
                    />
                  </div>

                  {/* Edad */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                      Edad <span className="text-white/40 text-[10px] lowercase font-normal">(ej: 8 años)</span>
                    </label>
                    <input
                      type="text"
                      value={child.childAge}
                      onChange={(e) => handleChildChange(index, "childAge", e.target.value)}
                      placeholder="Ej: 8"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none text-sm"
                    />
                  </div>

                  {/* Fecha Nacimiento */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                      Fecha Nacimiento <span className="text-white/40 text-[10px] lowercase font-normal">(opcional)</span>
                    </label>
                    <input
                      type="date"
                      value={child.childBirthDate}
                      onChange={(e) => handleChildChange(index, "childBirthDate", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-4 py-2 text-white placeholder-white/30 focus:outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Observaciones Médicas */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                    Observaciones médicas o alergias <span className="text-white/40 text-[10px] lowercase font-normal">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    value={child.medicalNotes}
                    onChange={(e) => handleChildChange(index, "medicalNotes", e.target.value)}
                    placeholder="Ej: Ninguna / Asma / Celiaco / Toma medicación"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none text-sm"
                  />
                </div>

              </div>
            ))}

            {/* Big button to add another child */}
            <button
              type="button"
              onClick={handleAddChild}
              className="w-full py-4 border-2 border-dashed border-white/20 hover:border-[#36b37e] rounded-2xl text-white/70 hover:text-white transition-all flex items-center justify-center gap-2 text-sm font-bold bg-white/[0.01] hover:bg-[#36b37e]/10 active:scale-[0.99]"
            >
              <Plus size={18} className="text-[#36b37e]" />
              ¿Querés inscribir a otro hermano/a o familiar? Hacé clic acá
            </button>
          </div>

          {/* SECTION 3: AUTORIZACIÓN DE USO DE IMAGEN (OBLIGATORIA) */}
          <div className="bg-[#E67E22]/10 border-2 border-[#E67E22]/40 rounded-2xl p-5 sm:p-6 space-y-3">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="imageConsent"
                name="imageConsent"
                checked={tutorData.imageConsent}
                onChange={handleTutorChange}
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
            className="w-full bg-gradient-to-r from-[#36b37e] to-[#27ae60] hover:from-[#2ecc71] hover:to-[#219653] text-white font-black uppercase tracking-wider py-4 sm:py-5 px-6 rounded-2xl shadow-[0_10px_30px_rgba(54,179,126,0.4)] hover:shadow-[0_15px_40px_rgba(54,179,126,0.6)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base sm:text-lg"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generando pases con QR...
              </>
            ) : (
              <>
                <QrCode size={22} />
                Completar Inscripción ({children.length} {children.length === 1 ? "Pase QR" : "Pases QR"})
              </>
            )}
          </button>

          <p className="text-center text-xs text-white/40">
            Al hacer clic se generarán los códigos QR para cada uno de los chicos y podrás compartirlos o descargarlos al instante.
          </p>

        </form>

      </div>
    </div>
  );
}
