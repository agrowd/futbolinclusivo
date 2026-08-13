"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { 
  X, 
  Plus, 
  Trash2, 
  QrCode, 
  Users, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Printer, 
  Download, 
  Share2,
  Sparkles,
  UserCheck
} from "lucide-react";

export default function InfanciasCreateModal({ isOpen, onClose, onCreated }) {
  const [tutorData, setTutorData] = useState({
    tutorName: "",
    tutorPhone: "",
    tutorEmail: "",
    locality: "",
    clubOrSchool: "",
    imageConsent: true,
  });

  const [markAsAttended, setMarkAsAttended] = useState(false);

  const [children, setChildren] = useState([
    {
      id: "admin-child-1",
      childName: "",
      childDni: "",
      childAge: "",
      childBirthDate: "",
      medicalNotes: "Ninguna",
      duplicateWarning: null,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdResult, setCreatedResult] = useState(null); // { tickets: [...] }
  const [selectedTicketIdx, setSelectedTicketIdx] = useState(0);

  const debounceTimers = useRef({});

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setTutorData({
        tutorName: "",
        tutorPhone: "",
        tutorEmail: "",
        locality: "",
        clubOrSchool: "",
        imageConsent: true,
      });
      setMarkAsAttended(false);
      setChildren([
        {
          id: `admin-child-${Date.now()}`,
          childName: "",
          childDni: "",
          childAge: "",
          childBirthDate: "",
          medicalNotes: "Ninguna",
          duplicateWarning: null,
        },
      ]);
      setError("");
      setCreatedResult(null);
      setSelectedTicketIdx(0);
    }
  }, [isOpen]);

  const handleTutorChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTutorData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

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
      console.warn("Duplicate check failed:", err);
    }
  }, []);

  const handleChildChange = (index, field, value) => {
    setChildren((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });

    if (error) setError("");

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

  const handleAddChild = () => {
    setChildren((prev) => [
      ...prev,
      {
        id: `admin-child-${Date.now()}`,
        childName: "",
        childDni: "",
        childAge: "",
        childBirthDate: "",
        medicalNotes: "Ninguna",
        duplicateWarning: null,
      },
    ]);
  };

  const handleRemoveChild = (index) => {
    if (children.length <= 1) return;
    setChildren((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!tutorData.tutorName.trim()) {
      setError("El nombre y apellido del adulto responsable es obligatorio.");
      return;
    }
    if (!tutorData.tutorPhone.trim()) {
      setError("El teléfono / WhatsApp de contacto es obligatorio.");
      return;
    }
    if (!tutorData.tutorEmail.trim()) {
      setError("El correo electrónico es obligatorio.");
      return;
    }
    if (!tutorData.locality.trim()) {
      setError("La localidad / barrio es obligatoria.");
      return;
    }

    for (let i = 0; i < children.length; i++) {
      const c = children[i];
      const num = i + 1;
      if (!c.childName.trim()) {
        setError(`El nombre completo del participante #${num} es obligatorio.`);
        return;
      }
      if (!c.childDni.trim()) {
        setError(`El DNI de ${c.childName || `participante #${num}`} es obligatorio.`);
        return;
      }
      if (!String(c.childAge).trim()) {
        setError(`La edad de ${c.childName || `participante #${num}`} es obligatoria.`);
        return;
      }
      if (!String(c.childBirthDate).trim()) {
        setError(`La fecha de nacimiento de ${c.childName || `participante #${num}`} es obligatoria.`);
        return;
      }
      if (!c.medicalNotes.trim()) {
        setError(`Las observaciones médicas de ${c.childName || `participante #${num}`} son obligatorias (si no posee, escribir "Ninguna").`);
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        ...tutorData,
        children: children.map((c) => ({
          childName: c.childName.trim(),
          childDni: c.childDni.trim(),
          childAge: String(c.childAge).trim(),
          childBirthDate: String(c.childBirthDate).trim(),
          medicalNotes: c.medicalNotes.trim(),
        })),
      };

      const res = await fetch("/api/infancias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Ocurrió un error al registrar la inscripción.");
      }

      const newTickets = data.tickets || [data.ticket];

      // If markAsAttended was checked, immediately update their attendance status in the database
      if (markAsAttended && Array.isArray(newTickets)) {
        for (const t of newTickets) {
          if (t.id) {
            await fetch(`/api/admin/infancias/${t.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ attended: true }),
            });
            t.attended = true;
          }
        }
      }

      setCreatedResult({
        familyGroupId: data.familyGroupId,
        tickets: newTickets,
      });

      if (onCreated) {
        onCreated();
      }
    } catch (err) {
      setError(err.message || "Error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  const handleShareWhatsApp = () => {
    const tickets = createdResult?.tickets || [];
    if (!tickets.length) return;
    const tutor = tutorData.tutorName || "Inscriptos";

    let text = `🎉 *¡Inscripción Confirmada para el Gran Día de las Infancias en Andar Fútbol Club!*\n\n`;
    text += `📅 *Evento:* Gran Jornada Recreativa y Deportiva\n`;
    text += `📍 *Lugar:* Complejo Deportivo "Fútbol por la Inclusión" - Asociación Civil Andar (Moreno)\n`;
    text += `👨‍👩‍👧 *Familia:* ${tutor}\n\n`;
    text += `🎟️ *PASES Y CÓDIGOS DE INGRESO:*\n`;

    tickets.forEach((t, idx) => {
      text += `\n${idx + 1}. *${t.childName}* (Ticket: *${t.ticketCode}*)`;
      if (t.childDni) text += ` - DNI: ${t.childDni}`;
      if (t.childAge) text += ` - ${t.childAge} años`;
    });

    text += `\n\n📌 *¿QUÉ TENÉS QUE HACER EL DÍA DEL EVENTO?*\n`;
    text += `1️⃣ Guardá este mensaje o las capturas de pantalla de los códigos QR.\n`;
    text += `2️⃣ Al llegar al predio, mostrá este mensaje o el QR en la mesa de entrada / acreditación.\n`;
    text += `3️⃣ El personal escaneará tu pase y podrán ingresar directamente.\n\n`;
    text += `¡Los esperamos! ⚽🎈🎉`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleDownloadQR = () => {
    const tickets = createdResult?.tickets || [];
    const t = tickets[selectedTicketIdx];
    if (!t?.qrDataUrl) return;
    const link = document.createElement("a");
    link.href = t.qrDataUrl;
    link.download = `Pase-QR-${t.ticketCode}-${t.childName}.png`;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-[#00132B] border border-white/15 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto text-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#00132B]/95 border-b border-white/10 p-5 sm:p-6 flex items-center justify-between z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#36b37e]/20 text-[#36b37e] flex items-center justify-center font-bold">
              <Plus size={22} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#36b37e] block">
                Panel de Administración
              </span>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight">
                Alta de Inscripción Individual o Familiar
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 space-y-6">

          {/* If Result exists -> Display Generated Tickets */}
          {createdResult ? (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 rounded-2xl bg-[#36b37e]/20 border border-[#36b37e]/40 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#36b37e] text-black font-black flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="text-xl font-black uppercase text-white">
                  ¡Inscripción Creada con Éxito!
                </h4>
                <p className="text-xs sm:text-sm text-white/80">
                  Se generaron {createdResult.tickets.length} {createdResult.tickets.length === 1 ? "pase con QR" : "pases individuales con QR"}.
                </p>
              </div>

              {/* Multi-ticket tabs */}
              {createdResult.tickets.length > 1 && (
                <div className="flex flex-wrap gap-2 justify-center bg-white/5 p-2 rounded-2xl border border-white/10">
                  {createdResult.tickets.map((t, idx) => (
                    <button
                      key={t.id || t.ticketCode}
                      onClick={() => setSelectedTicketIdx(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedTicketIdx === idx
                          ? "bg-[#36b37e] text-black font-black"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {t.childName.split(" ")[0]} ({t.ticketCode})
                    </button>
                  ))}
                </div>
              )}

              {/* Active Ticket Card Preview */}
              {createdResult.tickets[selectedTicketIdx] && (
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-6 items-center">
                  <div className="bg-white p-3 rounded-2xl flex flex-col items-center justify-center shadow-lg">
                    <img 
                      src={createdResult.tickets[selectedTicketIdx].qrDataUrl} 
                      alt="QR" 
                      className="w-40 h-40 object-contain"
                    />
                    <span className="text-[10px] font-black text-black font-mono mt-1">
                      {createdResult.tickets[selectedTicketIdx].ticketCode}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-left">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#36b37e] block">Participante</span>
                      <strong className="text-lg text-white block">
                        {createdResult.tickets[selectedTicketIdx].childName}
                      </strong>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-white/70">
                      <div>DNI: <strong className="text-white">{createdResult.tickets[selectedTicketIdx].childDni}</strong></div>
                      <div>Edad: <strong className="text-white">{createdResult.tickets[selectedTicketIdx].childAge} años</strong></div>
                      <div>Tutor: <strong className="text-white">{createdResult.tickets[selectedTicketIdx].tutorName}</strong></div>
                      <div>Contacto: <strong className="text-white">{createdResult.tickets[selectedTicketIdx].tutorPhone}</strong></div>
                    </div>
                    {createdResult.tickets[selectedTicketIdx].medicalNotes && (
                      <div className="text-xs text-[#ff7675]">
                        ⚠️ {createdResult.tickets[selectedTicketIdx].medicalNotes}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleDownloadQR}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase transition-all"
                >
                  <Download size={16} /> Descargar este QR
                </button>
                <button
                  onClick={handleShareWhatsApp}
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-black font-black py-3 px-4 rounded-xl text-xs uppercase transition-all shadow-lg"
                >
                  <Share2 size={16} /> Enviar a WhatsApp
                </button>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={onClose}
                  className="bg-[#36b37e] text-black font-black px-6 py-2.5 rounded-xl text-xs uppercase"
                >
                  Cerrar y Volver al Listado
                </button>
              </div>
            </div>
          ) : (
            /* Creation Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {error && (
                <div className="p-4 rounded-2xl bg-[#E74C3C]/15 border border-[#E74C3C]/40 text-[#ff7675] flex items-start gap-2.5 text-xs">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <div><strong>Error:</strong> {error}</div>
                </div>
              )}

              {/* Adult / Tutor Section */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#2980B9] flex items-center gap-2">
                    <Phone size={14} /> 1. Adulto Responsable & Contacto
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-white/80 mb-1">
                      Nombre y Apellido del Adulto <span className="text-[#E74C3C]">*</span>
                    </label>
                    <input
                      type="text"
                      name="tutorName"
                      value={tutorData.tutorName}
                      onChange={handleTutorChange}
                      required
                      placeholder="Ej: Laura Benítez"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-white/80 mb-1">
                      Teléfono / WhatsApp <span className="text-[#E74C3C]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="tutorPhone"
                      value={tutorData.tutorPhone}
                      onChange={handleTutorChange}
                      required
                      placeholder="Ej: 11 4455-6677"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-white/80 mb-1">
                      Email de Contacto <span className="text-[#E74C3C]">*</span>
                    </label>
                    <input
                      type="email"
                      name="tutorEmail"
                      value={tutorData.tutorEmail}
                      onChange={handleTutorChange}
                      required
                      placeholder="Ej: laura@gmail.com"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-white/80 mb-1">
                      Localidad / Barrio <span className="text-[#E74C3C]">*</span>
                    </label>
                    <input
                      type="text"
                      name="locality"
                      value={tutorData.locality}
                      onChange={handleTutorChange}
                      required
                      placeholder="Ej: Moreno Centro"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase text-white/80 mb-1">
                      Club o Institución <span className="text-white/40 font-normal lowercase">(opcional)</span>
                    </label>
                    <input
                      type="text"
                      name="clubOrSchool"
                      value={tutorData.clubOrSchool}
                      onChange={handleTutorChange}
                      placeholder="Ej: Club Defensores / Particular"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Children List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#36b37e] flex items-center gap-2">
                    <Users size={14} /> 2. Participantes a Inscribir ({children.length})
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddChild}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#36b37e]/20 hover:bg-[#36b37e]/30 text-[#36b37e] text-xs font-bold transition-colors"
                  >
                    <Plus size={14} /> Agregar otro niño/a
                  </button>
                </div>

                {children.map((child, index) => (
                  <div
                    key={child.id}
                    className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 space-y-3 relative"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#36b37e] text-black font-black text-[11px] flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-xs font-bold text-white uppercase">
                          Niño / Niña #{index + 1}
                        </span>
                      </div>
                      {children.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveChild(index)}
                          className="text-white/40 hover:text-[#E74C3C] p-1 rounded transition-colors text-xs flex items-center gap-1"
                        >
                          <Trash2 size={12} /> Quitar
                        </button>
                      )}
                    </div>

                    {child.duplicateWarning && (
                      <div className="p-2.5 rounded-xl bg-[#E67E22]/15 border border-[#E67E22]/40 text-[#f39c12] text-xs flex items-start gap-2">
                        <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                        <div>{child.duplicateWarning}</div>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-white/80 mb-1">
                        Nombre Completo <span className="text-[#E74C3C]">*</span>
                      </label>
                      <input
                        type="text"
                        value={child.childName}
                        onChange={(e) => handleChildChange(index, "childName", e.target.value)}
                        required
                        placeholder="Ej: Bautista Gómez"
                        className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-white/80 mb-1">
                          DNI <span className="text-[#E74C3C]">*</span>
                        </label>
                        <input
                          type="text"
                          value={child.childDni}
                          onChange={(e) => handleChildChange(index, "childDni", e.target.value)}
                          required
                          placeholder="Ej: 53.123.456"
                          className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-white/80 mb-1">
                          Edad <span className="text-[#E74C3C]">*</span>
                        </label>
                        <input
                          type="text"
                          value={child.childAge}
                          onChange={(e) => handleChildChange(index, "childAge", e.target.value)}
                          required
                          placeholder="Ej: 9 años"
                          className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-white/80 mb-1">
                          Fecha Nacimiento <span className="text-[#E74C3C]">*</span>
                        </label>
                        <input
                          type="date"
                          value={child.childBirthDate}
                          onChange={(e) => handleChildChange(index, "childBirthDate", e.target.value)}
                          required
                          className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-white/80 mb-1">
                        Observaciones médicas o alergias <span className="text-[#E74C3C]">*</span>
                      </label>
                      <input
                        type="text"
                        value={child.medicalNotes}
                        onChange={(e) => handleChildChange(index, "medicalNotes", e.target.value)}
                        required
                        placeholder="Ej: Ninguna / Asma / Toma medicación"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct Check-in Option */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="markAsAttended"
                    checked={markAsAttended}
                    onChange={(e) => setMarkAsAttended(e.target.checked)}
                    className="w-5 h-5 rounded text-[#36b37e] bg-white/10 focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="markAsAttended" className="text-xs text-white/90 font-bold cursor-pointer">
                    Acreditar / Marcar como ingresado en puerta directamente ahora
                  </label>
                </div>
                <UserCheck size={18} className={markAsAttended ? "text-[#36b37e]" : "text-white/40"} />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs font-bold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-[#36b37e] to-[#27ae60] hover:from-[#2ecc71] hover:to-[#219653] text-black font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {loading ? "Creando inscripción..." : `Registrar ${children.length} Participante(s)`}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
