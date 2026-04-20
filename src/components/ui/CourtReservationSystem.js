"use client";

import { useState, useMemo, useRef } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  User,
  Mail,
  Phone,
} from "lucide-react";

const TIME_SLOTS = [
  "08:00 - 09:30",
  "10:00 - 11:30",
  "12:00 - 13:30",
  "14:00 - 15:30",
  "16:00 - 17:30",
  "18:00 - 19:30",
  "20:00 - 21:30",
];

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function CourtReservationSystem({ courts }) {
  const today = new Date();
  const [selectedCourt, setSelectedCourt] = useState(courts[0]?.id || "");
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const liveRegionRef = useRef(null);

  const [formData, setFormData] = useState({ contactName: "", contactEmail: "", contactPhone: "" });
  const [errors, setErrors] = useState({});

  const announce = (msg) => { if (liveRegionRef.current) liveRegionRef.current.textContent = msg; };

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [viewYear, viewMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else { setViewMonth((m) => m - 1); }
    setSelectedDate(null); setSelectedSlot(null); setShowForm(false);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else { setViewMonth((m) => m + 1); }
    setSelectedDate(null); setSelectedSlot(null); setShowForm(false);
  };

  const isDatePast = (day) => {
    const date = new Date(viewYear, viewMonth, day);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return date < t;
  };

  const handleDateSelect = async (day) => {
    if (isDatePast(day)) return;
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateStr); setSelectedSlot(null); setShowForm(false); setSubmitResult(null);
    announce(`Fecha seleccionada: ${day} de ${MONTHS[viewMonth]}`);
    setIsLoadingSlots(true);
    try {
      const res = await fetch(`/api/reservas/disponibilidad?courtId=${selectedCourt}&date=${dateStr}`);
      const data = await res.json();
      if (data.success) setBookedSlots(data.reservations.map((r) => r.timeSlot));
    } catch { setBookedSlots([]); } finally { setIsLoadingSlots(false); }
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot); setShowForm(true); setSubmitResult(null);
    announce(`Horario seleccionado: ${slot}. Completá tus datos para confirmar.`);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.contactName.trim()) newErrors.contactName = "El nombre es obligatorio";
    if (!formData.contactEmail.trim()) newErrors.contactEmail = "El email es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) newErrors.contactEmail = "Email no válido";
    if (!formData.contactPhone.trim()) newErrors.contactPhone = "El teléfono es obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReservation = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courtId: selectedCourt, date: selectedDate, timeSlot: selectedSlot, ...formData }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitResult({ type: "success", message: data.message });
        setBookedSlots((prev) => [...prev, selectedSlot]);
        setShowForm(false); setSelectedSlot(null);
        announce("Reserva confirmada exitosamente.");
      } else {
        setSubmitResult({ type: "error", message: data.message });
        announce("Error: " + data.message);
      }
    } catch {
      setSubmitResult({ type: "error", message: "Error de conexión. Intentá nuevamente." });
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="section" style={{ padding: "40px 0" }}>
      <div className="container" style={{ maxWidth: "960px" }}>
        <div ref={liveRegionRef} aria-live="polite" aria-atomic="true" className="sr-only" role="status" />

        {submitResult && (
          <div role="alert" style={{
            padding: "16px 20px", borderRadius: "var(--radius-md)", marginBottom: "24px",
            background: submitResult.type === "success" ? "var(--color-success-bg)" : "var(--color-error-bg)",
            border: `2px solid ${submitResult.type === "success" ? "var(--color-success)" : "var(--color-error)"}`,
            display: "flex", alignItems: "center", gap: "12px",
          }}>
            {submitResult.type === "success" ? <CheckCircle2 size={20} style={{ color: "var(--color-success)" }} /> : <AlertCircle size={20} style={{ color: "var(--color-error)" }} />}
            <p style={{ fontWeight: 600, color: submitResult.type === "success" ? "var(--color-success)" : "var(--color-error)" }}>{submitResult.message}</p>
          </div>
        )}

        <div className="card" style={{ marginBottom: "24px", padding: "20px" }}>
          <label htmlFor="court-select" className="form-label" style={{ marginBottom: "8px", display: "block" }}>
            <MapPin size={16} style={{ verticalAlign: "middle", marginRight: "6px" }} /> Seleccioná una cancha
          </label>
          <select id="court-select" className="form-input form-select" value={selectedCourt} onChange={(e) => { setSelectedCourt(e.target.value); setSelectedDate(null); setSelectedSlot(null); setShowForm(false); }}>
            {courts.map((c) => <option key={c.id} value={c.id}>{c.name} — {c.capacity}</option>)}
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="responsive-grid">
          <div className="card card-elevated" style={{ padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <button onClick={prevMonth} className="btn btn-outline btn-sm"><ChevronLeft size={18} /></button>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
                <CalendarIcon size={20} style={{ color: "var(--color-primary)" }} /> {MONTHS[viewMonth]} {viewYear}
              </h2>
              <button onClick={nextMonth} className="btn btn-outline btn-sm"><ChevronRight size={18} /></button>
            </div>
            <div className="calendar-grid" style={{ marginBottom: "4px" }}>
              {DAYS.map((d) => <div key={d} style={{ textAlign: "center", fontWeight: 700, fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{d}</div>)}
            </div>
            <div className="calendar-grid">
              {calendarDays.map((day, i) => {
                if (day === null) return <div key={`empty-${i}`} />;
                const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isSelected = dateStr === selectedDate;
                const isPast = isDatePast(day);
                return (
                  <button key={day} type="button" disabled={isPast} onClick={() => handleDateSelect(day)} className={`calendar-day ${isSelected ? "calendar-day-selected" : ""}`}>
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="card card-elevated" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Clock size={20} style={{ color: "var(--color-primary)" }} /> Horarios disponibles
              </h3>
              {!selectedDate ? <p style={{ color: "var(--color-text-muted)", textAlign: "center", padding: "32px 0" }}>Seleccioná una fecha para continuar.</p> :
               isLoadingSlots ? <p style={{ color: "var(--color-text-muted)", textAlign: "center", padding: "32px 0" }}>Consultando...</p> :
               <div style={{ display: "grid", gap: "8px" }}>
                 {TIME_SLOTS.map((slot) => {
                   const isBooked = bookedSlots.includes(slot);
                   return (
                     <button key={slot} disabled={isBooked} onClick={() => handleSlotSelect(slot)} className={`time-slot ${slot === selectedSlot ? "time-slot-selected" : ""}`}>
                       {slot} {isBooked && <span style={{ fontSize: "0.8rem", color: "var(--color-error)", marginLeft: "8px" }}>Reservado</span>}
                     </button>
                   );
                 })}
               </div>}
            </div>

            {showForm && (
              <div className="card card-elevated" style={{ marginTop: "16px", padding: "24px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px" }}>Datos de contacto</h3>
                <div className="form-group">
                  <label className="form-label form-label-required"><User size={14} style={{ marginRight: "4px" }} /> Nombre</label>
                  <input type="text" className="form-input" value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} placeholder="Nombre y apellido" />
                </div>
                <div className="form-group">
                  <label className="form-label form-label-required"><Mail size={14} style={{ marginRight: "4px" }} /> Email</label>
                  <input type="email" className="form-input" value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} placeholder="email@ejemplo.com" />
                </div>
                <div className="form-group">
                  <label className="form-label form-label-required"><Phone size={14} style={{ marginRight: "4px" }} /> Teléfono</label>
                  <input type="tel" className="form-input" value={formData.contactPhone} onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })} placeholder="11-1234-5678" />
                </div>
                <button type="button" onClick={handleReservation} disabled={isSubmitting} className="btn btn-primary" style={{ width: "100%" }}>
                  {isSubmitting ? "Confirmando..." : "Confirmar reserva"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .responsive-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 768px) { .responsive-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
