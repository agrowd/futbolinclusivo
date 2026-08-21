"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import QRCode from "qrcode";
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
  FileCheck,
  RotateCcw,
  Eye,
  Info,
  HelpCircle
} from "lucide-react";

const STORAGE_KEY_TICKETS = "infancias_saved_tickets";
const STORAGE_KEY_TUTOR = "infancias_saved_tutor";

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
  const [savedLocalData, setSavedLocalData] = useState(null);

  // Debounce timers for duplicate check
  const debounceTimers = useRef({});

  // Load saved passes from LocalStorage on mount
  useEffect(() => {
    try {
      const savedTicketsRaw = localStorage.getItem(STORAGE_KEY_TICKETS);
      const savedTutorRaw = localStorage.getItem(STORAGE_KEY_TUTOR);

      if (savedTicketsRaw) {
        const parsedTickets = JSON.parse(savedTicketsRaw);
        const parsedTutor = savedTutorRaw ? JSON.parse(savedTutorRaw) : {};

        if (Array.isArray(parsedTickets) && parsedTickets.length > 0) {
          setSavedLocalData({
            tickets: parsedTickets,
            tutor: parsedTutor,
          });
        }
      }
    } catch (e) {
      console.warn("Error reading localStorage:", e);
    }
  }, []);

  // On-the-fly QR code fallback generator for any tickets missing qrDataUrl
  const [generatedQrs, setGeneratedQrs] = useState({});

  useEffect(() => {
    const list = ticketResult?.tickets || savedLocalData?.tickets || [];
    list.forEach((t) => {
      if (t && t.ticketCode && !t.qrDataUrl && !generatedQrs[t.ticketCode]) {
        const qrPayload = JSON.stringify({
          code: t.ticketCode,
          id: t.id || t._id,
          name: t.childName,
        });

        QRCode.toDataURL(qrPayload, {
          errorCorrectionLevel: "M",
          margin: 2,
          width: 320,
          color: { dark: "#000B1A", light: "#FFFFFF" },
        })
          .then((url) => {
            setGeneratedQrs((prev) => ({ ...prev, [t.ticketCode]: url }));
          })
          .catch((err) => console.error("Error generating client QR:", err));
      }
    });
  }, [ticketResult, savedLocalData, generatedQrs]);

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

    if (!tutorData.tutorName.trim()) {
      setError("Por favor ingresá el nombre y apellido del adulto responsable / tutor.");
      return;
    }

    if (!tutorData.tutorPhone.trim()) {
      setError("Por favor ingresá un número de teléfono / WhatsApp de contacto.");
      return;
    }

    if (!tutorData.tutorEmail.trim() || !tutorData.tutorEmail.includes("@") || !tutorData.tutorEmail.includes(".")) {
      setError("Por favor ingresá un correo electrónico válido (ejemplo: usuario@gmail.com) para poder enviarte los pases QR.");
      return;
    }

    if (!tutorData.locality.trim()) {
      setError("Por favor ingresá la localidad o barrio.");
      return;
    }

    if (!tutorData.imageConsent) {
      setError("Es obligatorio autorizar el uso de imagen para poder completar la inscripción.");
      return;
    }

    // Validate each child mandatory fields
    for (let i = 0; i < children.length; i++) {
      const c = children[i];
      const childNum = i + 1;

      if (!c.childName.trim()) {
        setError(`Por favor ingresá el nombre completo del participante #${childNum}.`);
        return;
      }

      if (!c.childDni.trim()) {
        setError(`Por favor ingresá el DNI de ${c.childName || `participante #${childNum}`}.`);
        return;
      }

      if (!String(c.childAge).trim()) {
        setError(`Por favor ingresá la edad de ${c.childName || `participante #${childNum}`}.`);
        return;
      }

      if (!String(c.childBirthDate).trim()) {
        setError(`Por favor seleccioná la fecha de nacimiento de ${c.childName || `participante #${childNum}`}.`);
        return;
      }

      if (!c.medicalNotes.trim()) {
        setError(`Por favor completá las observaciones médicas o alergias de ${c.childName || `participante #${childNum}`} (si no posee ninguna, escribí "Ninguna").`);
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

      const newTickets = data.tickets || [data.ticket];

      // Merge with previous tickets in localStorage if same tutor
      let combinedTickets = newTickets;
      try {
        const existingRaw = localStorage.getItem(STORAGE_KEY_TICKETS);
        if (existingRaw) {
          const parsed = JSON.parse(existingRaw);
          if (Array.isArray(parsed)) {
            // Keep unique by ticketCode
            const existingCodes = new Set(newTickets.map((t) => t.ticketCode));
            const filteredOld = parsed.filter((t) => !existingCodes.has(t.ticketCode));
            combinedTickets = [...filteredOld, ...newTickets];
          }
        }
        localStorage.setItem(STORAGE_KEY_TICKETS, JSON.stringify(combinedTickets));
        localStorage.setItem(STORAGE_KEY_TUTOR, JSON.stringify(tutorData));
      } catch (e) {
        console.warn("Failed to write to localStorage:", e);
      }

      setTicketResult({
        familyGroupId: data.familyGroupId,
        tickets: combinedTickets,
      });
      setSelectedTicketIndex(combinedTickets.length - newTickets.length); // focus on newly added
      setSavedLocalData({
        tickets: combinedTickets,
        tutor: tutorData,
      });

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

  // WhatsApp sharing message with clear instructions
  const handleShareWhatsAppAll = () => {
    const tickets = ticketResult?.tickets || savedLocalData?.tickets || [];
    if (!tickets.length) return;
    
    const tutor = tutorData.tutorName || savedLocalData?.tutor?.tutorName || "Inscriptos";

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
    text += `1️⃣ *Guardá este mensaje* o las capturas de pantalla de los códigos QR.\n`;
    text += `2️⃣ Al llegar al predio, *mostrá este mensaje o el QR* en la mesa de entrada / acreditación.\n`;
    text += `3️⃣ El personal escaneará tu pase y podrán ingresar directamente a disfrutar de los juegos, canchas de fútbol, merienda y sorpresas.\n\n`;
    text += `¡Los esperamos para compartir una tarde inolvidable! ⚽🎈🎉`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleDownloadSelectedQR = () => {
    const tickets = ticketResult?.tickets || savedLocalData?.tickets || [];
    const ticket = tickets[selectedTicketIndex];
    const qrUrl = ticket?.qrDataUrl || generatedQrs[ticket?.ticketCode];
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `Pase-QR-${ticket.ticketCode}-${ticket.childName}.png`;
    link.click();
  };

  // View Saved Tickets from localStorage
  const handleViewSavedTickets = () => {
    if (!savedLocalData) return;
    setTicketResult({
      familyGroupId: "LOCAL",
      tickets: savedLocalData.tickets,
    });
    if (savedLocalData.tutor) {
      setTutorData((prev) => ({ ...prev, ...savedLocalData.tutor }));
    }
    setSelectedTicketIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add more children keeping saved tutor data
  const handleAddMoreChildrenKeepTutor = () => {
    if (savedLocalData?.tutor) {
      setTutorData((prev) => ({
        ...prev,
        ...savedLocalData.tutor,
        imageConsent: true,
      }));
    }
    setChildren([
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
    setTicketResult(null);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset from scratch for another adult/family
  const handleStartFromScratch = () => {
    if (confirm("¿Querés comenzar una inscripción desde cero para otra persona o familia?")) {
      try {
        localStorage.removeItem(STORAGE_KEY_TICKETS);
        localStorage.removeItem(STORAGE_KEY_TUTOR);
      } catch {}
      setSavedLocalData(null);
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
    }
  };

  // SUCCESS STATE: DIGITAL FAMILY TICKETS WITH QR
  if (ticketResult && ticketResult.tickets.length > 0) {
    const currentTicket = ticketResult.tickets[selectedTicketIndex] || ticketResult.tickets[0];

    return (
      <div className="max-w-4xl mx-auto px-4 py-6 animate-fade-in">
        <div className="bg-[#00132B] border-2 border-[#36b37e]/40 rounded-3xl p-6 sm:p-10 text-white shadow-[0_20px_70px_rgba(0,0,0,0.6)] relative overflow-hidden">
          
          {/* Top Banner */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#36b37e] via-[#2980B9] to-[#E67E22]" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#36b37e]/20 text-[#36b37e] text-xs font-black uppercase tracking-widest mb-4">
              <CheckCircle2 size={16} /> ¡Pases Guardados en tu Celular!
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
              {ticketResult.tickets.length === 1 ? "Pase de Ingreso al Predio" : `Pases Familiares (${ticketResult.tickets.length} Inscriptos)`}
            </h2>
            <p className="text-white/60 text-sm sm:text-base mt-2 max-w-lg mx-auto">
              Presentá estos códigos QR en la entrada el día del evento. Cada participante tiene su código único.
            </p>
          </div>

          {/* Instructions Box */}
          <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-[#2980B9]/20 to-[#36b37e]/20 border border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#36b37e] text-black font-black flex items-center justify-center shrink-0">
              <HelpCircle size={22} />
            </div>
            <div className="text-xs sm:text-sm text-white/90 space-y-1">
              <strong className="text-white text-base block mb-1 uppercase tracking-wide">
                📌 ¿Qué tenés que hacer el día del evento?
              </strong>
              <p>
                1. <strong>Guardá tus pases:</strong> Descargá la imagen o hacé clic en <strong>"Enviar Todos a WhatsApp"</strong> para tenerlos a mano.
              </p>
              <p>
                2. <strong>En la entrada:</strong> Mostrás el código QR desde tu celular al personal de recepción para ingresar sin demoras.
              </p>
              <p>
                3. 📧 <strong>Revisá tu correo:</strong> Enviamos una copia de respaldo con todos los pases y códigos QR adjuntos a tu email.
              </p>
            </div>
          </div>

          {/* If multi-children, show tabs selector */}
          {ticketResult.tickets.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-white/5 p-2 rounded-2xl border border-white/10">
              {ticketResult.tickets.map((t, idx) => (
                <button
                  key={t.id || t.ticketCode || idx}
                  onClick={() => setSelectedTicketIndex(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    selectedTicketIndex === idx
                      ? "bg-[#36b37e] text-black font-black shadow-lg shadow-[#36b37e]/30 scale-105"
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
                {currentTicket.qrDataUrl || generatedQrs[currentTicket.ticketCode] ? (
                  <img 
                    src={currentTicket.qrDataUrl || generatedQrs[currentTicket.ticketCode]} 
                    alt={`QR Ticket ${currentTicket.ticketCode}`}
                    className="w-52 h-52 object-contain"
                  />
                ) : (
                  <div className="w-52 h-52 flex items-center justify-center bg-gray-100 text-gray-400 animate-pulse">
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

          {/* Bottom Options: Add more or start from scratch */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
            <button
              onClick={handleAddMoreChildrenKeepTutor}
              className="inline-flex items-center gap-2 text-[#36b37e] hover:underline font-bold transition-colors"
            >
              <Plus size={16} />
              Inscribir a otro hijo/a (mantener mis datos)
            </button>

            <button
              onClick={handleStartFromScratch}
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#E74C3C] transition-colors"
            >
              <RotateCcw size={14} />
              Empezar de cero para otra persona/familia
            </button>
          </div>

        </div>
      </div>
    );
  }

  // PUBLIC REGISTRATION FORM (MULTI-CHILD)
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      
      {/* SAVED PASSES BANNER (If exists in LocalStorage) */}
      {savedLocalData && savedLocalData.tickets && savedLocalData.tickets.length > 0 && (
        <div className="mb-6 p-5 rounded-3xl bg-gradient-to-r from-[#2980B9]/20 via-[#36b37e]/20 to-[#E67E22]/20 border-2 border-[#36b37e]/50 text-white shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#36b37e] text-black font-black flex items-center justify-center shrink-0 shadow-lg">
              <QrCode size={24} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#36b37e] block">
                ¡Pases ya guardados en tu celular!
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Tenés {savedLocalData.tickets.length} {savedLocalData.tickets.length === 1 ? "inscripto" : "inscriptos"}:{" "}
                <span className="text-white/80 font-normal">
                  {savedLocalData.tickets.map((t) => t.childName.split(" ")[0]).join(", ")}
                </span>
              </h4>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              onClick={handleViewSavedTickets}
              className="flex-1 sm:flex-initial bg-[#36b37e] hover:bg-[#2ecc71] text-black font-black text-xs uppercase px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Eye size={16} /> Ver mis Pases
            </button>
            <button
              onClick={handleStartFromScratch}
              className="bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-xs font-semibold px-3 py-2.5 rounded-xl transition-colors"
              title="Empezar de cero para otra persona"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      )}

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
            Completá tus datos de contacto una sola vez y sumá a todos tus hijos/as para obtener sus pases de acceso con código QR.
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
                  Nombre y Apellido del Adulto / Tutor <span className="text-[#E74C3C]">* (Obligatorio)</span>
                </label>
                <input
                  type="text"
                  name="tutorName"
                  value={tutorData.tutorName}
                  onChange={handleTutorChange}
                  required
                  placeholder="Ej: Valeria Martínez"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#2980B9]/20 transition-all text-sm font-medium"
                />
              </div>

              {/* Teléfono Completo (OBLIGATORIO) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Teléfono / WhatsApp de Contacto <span className="text-[#E74C3C]">* (Obligatorio)</span>
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
                  Localidad / Barrio <span className="text-[#E74C3C]">* (Obligatorio)</span>
                </label>
                <input
                  type="text"
                  name="locality"
                  value={tutorData.locality}
                  onChange={handleTutorChange}
                  required
                  placeholder="Ej: Moreno, Paso del Rey"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2">
                  Email de Contacto <span className="text-[#E74C3C]">* (Obligatorio)</span>
                </label>
                <input
                  type="email"
                  name="tutorEmail"
                  value={tutorData.tutorEmail}
                  onChange={handleTutorChange}
                  required
                  placeholder="Ej: familia@gmail.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none text-sm font-medium"
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
                    Nombre y Apellido Completo <span className="text-[#E74C3C]">* (Obligatorio)</span>
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
                      DNI <span className="text-[#E74C3C]">* (Obligatorio)</span>
                    </label>
                    <input
                      type="text"
                      value={child.childDni}
                      onChange={(e) => handleChildChange(index, "childDni", e.target.value)}
                      required
                      placeholder="Ej: 52.418.902"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none text-sm font-medium"
                    />
                  </div>

                  {/* Edad */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                      Edad <span className="text-[#E74C3C]">* (Obligatorio)</span>
                    </label>
                    <input
                      type="text"
                      value={child.childAge}
                      onChange={(e) => handleChildChange(index, "childAge", e.target.value)}
                      required
                      placeholder="Ej: 8 años"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none text-sm font-medium"
                    />
                  </div>

                  {/* Fecha Nacimiento */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                      Fecha Nacimiento <span className="text-[#E74C3C]">* (Obligatorio)</span>
                    </label>
                    <input
                      type="date"
                      value={child.childBirthDate}
                      onChange={(e) => handleChildChange(index, "childBirthDate", e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-4 py-2 text-white placeholder-white/30 focus:outline-none text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Observaciones Médicas */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5">
                    Observaciones médicas o alergias <span className="text-[#E74C3C]">* (Obligatorio - Si no posee, escribir "Ninguna")</span>
                  </label>
                  <input
                    type="text"
                    value={child.medicalNotes}
                    onChange={(e) => handleChildChange(index, "medicalNotes", e.target.value)}
                    required
                    placeholder="Ej: Ninguna / Asma / Celíaco / Toma medicación"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none text-sm font-medium"
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
            className="w-full bg-gradient-to-r from-[#36b37e] to-[#27ae60] hover:from-[#2ecc71] hover:to-[#219653] text-black font-black uppercase tracking-wider py-4 sm:py-5 px-6 rounded-2xl shadow-[0_10px_30px_rgba(54,179,126,0.4)] hover:shadow-[0_15px_40px_rgba(54,179,126,0.6)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base sm:text-lg"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
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
            Al hacer clic se guardarán los pases en tu dispositivo y podrás descargarlos o compartírtelos por WhatsApp al instante.
          </p>

        </form>

      </div>
    </div>
  );
}
