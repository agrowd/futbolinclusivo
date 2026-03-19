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

const COURTS = [
  { id: "cancha-1", name: "Cancha 1 — Pasto sintético", capacity: "Fútbol 7" },
  { id: "cancha-2", name: "Cancha 2 — Pasto natural", capacity: "Fútbol 11" },
  { id: "cancha-3", name: "Cancha 3 — Multiuso", capacity: "Fútbol 5 / Multideporte" },
];

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

export default function CanchasPage() {
  const today = new Date();
  const [selectedCourt, setSelectedCourt] = useState(COURTS[0].id);
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

  const [formData, setFormData] = useState({
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [errors, setErrors] = useState({});

  const announce = (msg) => {
    if (liveRegionRef.current) liveRegionRef.current.textContent = msg;
  };

  // Calendar grid
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const days = [];


    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }

    return days;
  }, [viewYear, viewMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
    setSelectedDate(null);
    setSelectedSlot(null);
    setShowForm(false);
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
    setSelectedDate(null);
    setSelectedSlot(null);
    setShowForm(false);
  };

  const isDatePast = (day) => {
    const date = new Date(viewYear, viewMonth, day);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return date < t;
  };

  const handleDateSelect = async (day) => {
    if (isDatePast(day)) return;
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateStr);
    setSelectedSlot(null);
    setShowForm(false);
    setSubmitResult(null);
    announce(`Fecha seleccionada: ${day} de ${MONTHS[viewMonth]}`);

    // Fetch booked slots for this date + court
    setIsLoadingSlots(true);
    try {
      const res = await fetch(`/api/reservas/disponibilidad?courtId=${selectedCourt}&date=${dateStr}`);
      const data = await res.json();
      if (data.success) {
        setBookedSlots(data.reservations.map((r) => r.timeSlot));
      }
    } catch {
      setBookedSlots([]);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setShowForm(true);
    setSubmitResult(null);
    announce(`Horario seleccionado: ${slot}. Completá tus datos para confirmar.`);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.contactName.trim()) newErrors.contactName = "El nombre es obligatorio";
    if (!formData.contactEmail.trim()) newErrors.contactEmail = "El email es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail))
      newErrors.contactEmail = "Email no válido";
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
        body: JSON.stringify({
          courtId: selectedCourt,
          date: selectedDate,
          timeSlot: selectedSlot,
          ...formData,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitResult({ type: "success", message: data.message });
        setBookedSlots((prev) => [...prev, selectedSlot]);
        setShowForm(false);
        setSelectedSlot(null);
        announce("Reserva confirmada exitosamente.");
      } else {
        setSubmitResult({ type: "error", message: data.message });
        announce("Error: " + data.message);
      }
    } catch {
      setSubmitResult({ type: "error", message: "Error de conexión. Intentá nuevamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section" style={{ minHeight: "80vh" }}>
      <div className="container" style={{ maxWidth: "960px" }}>
        {/* aria-live region */}
        <div ref={liveRegionRef} aria-live="polite" aria-atomic="true" className="sr-only" role="status" />

        {/* Page Title */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div className="hero-badge" style={{ justifyContent: "center", margin: "0 auto 16px" }}>
            <MapPin size={16} aria-hidden="true" />
            Complejo &quot;Fútbol por la Inclusión&quot;
          </div>
          <h1 className="section-title" style={{ textAlign: "center" }}>
            Alquiler de Canchas
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Reservá tu cancha con disponibilidad en tiempo real.
            Este servicio es abierto a todas las personas.
          </p>
        </div>

        {/* Result message */}
        {submitResult && (
          <div
            role="alert"
            style={{
              padding: "16px 20px",
              borderRadius: "var(--radius-md)",
              marginBottom: "24px",
              background: submitResult.type === "success" ? "var(--color-success-bg)" : "var(--color-error-bg)",
              border: `2px solid ${submitResult.type === "success" ? "var(--color-success)" : "var(--color-error)"}`,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {submitResult.type === "success" ? (
              <CheckCircle2 size={20} style={{ color: "var(--color-success)", flexShrink: 0 }} aria-hidden="true" />
            ) : (
              <AlertCircle size={20} style={{ color: "var(--color-error)", flexShrink: 0 }} aria-hidden="true" />
            )}
            <p style={{ fontWeight: 600, color: submitResult.type === "success" ? "var(--color-success)" : "var(--color-error)" }}>
              {submitResult.message}
            </p>
          </div>
        )}

        {/* Court selector */}
        <div className="card" style={{ marginBottom: "24px", padding: "20px" }}>
          <label htmlFor="court-select" className="form-label" style={{ marginBottom: "8px", display: "block" }}>
            <MapPin size={16} aria-hidden="true" style={{ verticalAlign: "middle", marginRight: "6px" }} />
            Seleccioná una cancha
          </label>
          <select
            id="court-select"
            className="form-input form-select"
            value={selectedCourt}
            onChange={(e) => {
              setSelectedCourt(e.target.value);
              setSelectedDate(null);
              setSelectedSlot(null);
              setShowForm(false);
            }}
          >
            {COURTS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} — {c.capacity}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Calendar */}
          <div className="card card-elevated" style={{ padding: "24px" }}>
            {/* Month navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <button
                type="button"
                onClick={prevMonth}
                className="btn btn-outline btn-sm"
                aria-label="Mes anterior"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
                <CalendarIcon size={20} aria-hidden="true" style={{ color: "var(--color-primary)" }} />
                {MONTHS[viewMonth]} {viewYear}
              </h2>
              <button
                type="button"
                onClick={nextMonth}
                className="btn btn-outline btn-sm"
                aria-label="Mes siguiente"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Day headers */}
            <div className="calendar-grid" style={{ marginBottom: "4px" }}>
              {DAYS.map((d) => (
                <div
                  key={d}
                  style={{
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    color: "var(--color-text-muted)",
                    padding: "8px 0",
                    aspectRatio: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  aria-hidden="true"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="calendar-grid" role="grid" aria-label={`Calendario ${MONTHS[viewMonth]} ${viewYear}`}>
              {calendarDays.map((day, i) => {
                if (day === null) {
                  return <div key={`empty-${i}`} aria-hidden="true" />;
                }
                const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isToday =
                  day === today.getDate() &&
                  viewMonth === today.getMonth() &&
                  viewYear === today.getFullYear();
                const isSelected = dateStr === selectedDate;
                const isPast = isDatePast(day);

                return (
                  <button
                    key={day}
                    type="button"
                    disabled={isPast}
                    onClick={() => handleDateSelect(day)}
                    className={`calendar-day ${isToday ? "calendar-day-today" : ""} ${isSelected ? "calendar-day-selected" : ""}`}
                    aria-label={`${day} de ${MONTHS[viewMonth]}${isToday ? ", hoy" : ""}${isSelected ? ", seleccionado" : ""}${isPast ? ", no disponible" : ""}`}
                    aria-pressed={isSelected}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          <div>
            <div className="card card-elevated" style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Clock size={20} aria-hidden="true" style={{ color: "var(--color-primary)" }} />
                Horarios disponibles
              </h3>

              {!selectedDate ? (
                <p style={{ color: "var(--color-text-muted)", textAlign: "center", padding: "32px 0" }}>
                  Seleccioná una fecha del calendario para ver los horarios disponibles.
                </p>
              ) : isLoadingSlots ? (
                <p style={{ color: "var(--color-text-muted)", textAlign: "center", padding: "32px 0" }}>
                  Consultando disponibilidad...
                </p>
              ) : (
                <div style={{ display: "grid", gap: "8px" }} role="listbox" aria-label="Horarios disponibles">
                  {TIME_SLOTS.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSlotSelected = slot === selectedSlot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isBooked}
                        onClick={() => handleSlotSelect(slot)}
                        className={`time-slot ${isSlotSelected ? "time-slot-selected" : ""}`}
                        role="option"
                        aria-selected={isSlotSelected}
                        aria-label={`${slot}${isBooked ? " — Reservado" : ""}${isSlotSelected ? " — Seleccionado" : ""}`}
                      >
                        {slot}
                        {isBooked && (
                          <span style={{ fontSize: "0.8rem", color: "var(--color-error)", marginLeft: "8px" }}>
                            Reservado
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Contact form */}
            {showForm && (
              <div className="card card-elevated" style={{ marginTop: "16px", padding: "24px" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px" }}>
                  Datos de contacto
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "16px" }}>
                  Reserva para el <strong>{selectedDate}</strong> de <strong>{selectedSlot}</strong>
                </p>

                <div className="form-group">
                  <label htmlFor="res-name" className="form-label form-label-required">
                    <User size={14} aria-hidden="true" style={{ verticalAlign: "middle", marginRight: "4px" }} />
                    Nombre completo
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    className={`form-input ${errors.contactName ? "form-input-error" : ""}`}
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    aria-invalid={!!errors.contactName}
                    aria-describedby={errors.contactName ? "err-res-name" : undefined}
                    placeholder="Nombre y apellido"
                  />
                  {errors.contactName && <span id="err-res-name" className="form-error" role="alert">{errors.contactName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="res-email" className="form-label form-label-required">
                    <Mail size={14} aria-hidden="true" style={{ verticalAlign: "middle", marginRight: "4px" }} />
                    Email
                  </label>
                  <input
                    id="res-email"
                    type="email"
                    className={`form-input ${errors.contactEmail ? "form-input-error" : ""}`}
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    aria-invalid={!!errors.contactEmail}
                    aria-describedby={errors.contactEmail ? "err-res-email" : undefined}
                    placeholder="email@ejemplo.com"
                  />
                  {errors.contactEmail && <span id="err-res-email" className="form-error" role="alert">{errors.contactEmail}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="res-phone" className="form-label form-label-required">
                    <Phone size={14} aria-hidden="true" style={{ verticalAlign: "middle", marginRight: "4px" }} />
                    Teléfono
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    className={`form-input ${errors.contactPhone ? "form-input-error" : ""}`}
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    aria-invalid={!!errors.contactPhone}
                    aria-describedby={errors.contactPhone ? "err-res-phone" : undefined}
                    placeholder="11-1234-5678"
                  />
                  {errors.contactPhone && <span id="err-res-phone" className="form-error" role="alert">{errors.contactPhone}</span>}
                </div>

                <button
                  type="button"
                  onClick={handleReservation}
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: "100%", opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? "Confirmando reserva..." : "Confirmar reserva"}
                  {!isSubmitting && <CheckCircle2 size={18} aria-hidden="true" />}
                </button>
              </div>
            )}
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
