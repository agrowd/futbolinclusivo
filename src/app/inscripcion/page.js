"use client";

import { useState, useRef } from "react";
import {
  Building2,
  Users,
  FileHeart,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Upload,
  CheckCircle2,
  AlertCircle,
  ClipboardList,
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Datos del equipo", icon: Building2 },
  { id: 2, label: "Listado de buena fe", icon: Users },
  { id: 3, label: "Ficha médica", icon: FileHeart },
];

const emptyPlayer = { firstName: "", lastName: "", dni: "", birthDate: "", position: "" };

export default function InscripcionPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const liveRegionRef = useRef(null);

  // Step 1: Team Data
  const [teamData, setTeamData] = useState({
    institutionName: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    league: "",
  });

  // Step 2: Players
  const [players, setPlayers] = useState([{ ...emptyPlayer }]);

  // Step 3: Medical clearance
  const [medicalFile, setMedicalFile] = useState(null);
  const [medicalDelivery, setMedicalDelivery] = useState(""); // "digital" or "presencial"

  // Validation errors
  const [errors, setErrors] = useState({});

  const announce = (message) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = message;
    }
  };

  // ---- STEP 1 VALIDATION ----
  const validateStep1 = () => {
    const newErrors = {};
    if (!teamData.institutionName.trim()) newErrors.institutionName = "El nombre de la institución es obligatorio";
    if (!teamData.contactName.trim()) newErrors.contactName = "El nombre de contacto es obligatorio";
    if (!teamData.contactEmail.trim()) newErrors.contactEmail = "El email es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(teamData.contactEmail)) newErrors.contactEmail = "El email no es válido";
    if (!teamData.contactPhone.trim()) newErrors.contactPhone = "El teléfono es obligatorio";
    if (!teamData.league) newErrors.league = "Seleccioná una liga";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---- STEP 2 VALIDATION ----
  const validateStep2 = () => {
    const newErrors = {};
    if (players.length === 0) {
      newErrors.players = "Debés agregar al menos un jugador";
    }
    players.forEach((player, i) => {
      if (!player.firstName.trim()) newErrors[`player_${i}_firstName`] = "Nombre obligatorio";
      if (!player.lastName.trim()) newErrors[`player_${i}_lastName`] = "Apellido obligatorio";
      if (!player.dni.trim()) newErrors[`player_${i}_dni`] = "DNI obligatorio";
      if (!player.birthDate) newErrors[`player_${i}_birthDate`] = "Fecha obligatoria";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---- STEP 3 VALIDATION ----
  const validateStep3 = () => {
    const newErrors = {};
    if (!medicalDelivery) {
      newErrors.medical = "Seleccioná cómo entregarás la ficha médica";
    }
    if (medicalDelivery === "digital" && !medicalFile) {
      newErrors.medicalFile = "Subí el archivo de la ficha médica";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    let valid = false;
    if (currentStep === 1) valid = validateStep1();
    if (currentStep === 2) valid = validateStep2();
    if (valid) {
      setCurrentStep((s) => s + 1);
      announce(`Paso ${currentStep + 1} de 3: ${STEPS[currentStep].label}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setCurrentStep((s) => s - 1);
    setErrors({});
    announce(`Paso ${currentStep - 1} de 3: ${STEPS[currentStep - 2].label}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addPlayer = () => {
    setPlayers((prev) => [...prev, { ...emptyPlayer }]);
    announce(`Jugador agregado. Total: ${players.length + 1} jugadores en el listado.`);
  };

  const removePlayer = (index) => {
    const name = players[index].firstName || `Jugador ${index + 1}`;
    setPlayers((prev) => prev.filter((_, i) => i !== index));
    announce(`${name} eliminado del listado. Total: ${players.length - 1} jugadores.`);
  };

  const updatePlayer = (index, field, value) => {
    setPlayers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const formData = new FormData();
      formData.append("institutionName", teamData.institutionName);
      formData.append("contactName", teamData.contactName);
      formData.append("contactEmail", teamData.contactEmail);
      formData.append("contactPhone", teamData.contactPhone);
      formData.append("league", teamData.league);
      formData.append("players", JSON.stringify(players));
      formData.append("medicalDelivery", medicalDelivery);

      if (medicalFile) {
        formData.append("medicalFile", medicalFile);
      }

      const res = await fetch("/api/inscripcion", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSubmitResult({ type: "success", message: data.message });
        announce("Inscripción enviada exitosamente.");
      } else {
        setSubmitResult({ type: "error", message: data.message || "Error al enviar la inscripción" });
        announce("Error al enviar la inscripción.");
      }
    } catch {
      setSubmitResult({ type: "error", message: "No se pudo conectar con el servidor. Intentá nuevamente." });
      announce("Error de conexión al enviar la inscripción.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section" style={{ minHeight: "80vh" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Page Title */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div className="hero-badge" style={{ justifyContent: "center", margin: "0 auto 16px" }}>
            <ClipboardList size={16} aria-hidden="true" />
            Inscripción para personas con discapacidad
          </div>
          <h1 className="section-title" style={{ textAlign: "center" }}>
            Inscripción a Torneos de Ligas
          </h1>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Completá el formulario paso a paso para inscribir a tu equipo en la
            Liga de Fútbol Inclusiva.
          </p>
        </div>

        {/* aria-live region for screen readers */}
        <div
          ref={liveRegionRef}
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          role="status"
        />

        {/* Step Indicator */}
        <div className="step-indicator" role="tablist" aria-label="Progreso del formulario">
          {STEPS.map((step, i) => (
            <div key={step.id} style={{ display: "flex", alignItems: "center" }}>
              <div className="step-item">
                <div
                  className={`step-circle ${
                    currentStep === step.id
                      ? "step-circle-active"
                      : currentStep > step.id
                      ? "step-circle-completed"
                      : ""
                  }`}
                  role="tab"
                  aria-selected={currentStep === step.id}
                  aria-current={currentStep === step.id ? "step" : undefined}
                  aria-label={`Paso ${step.id}: ${step.label}${currentStep > step.id ? " (completado)" : ""}`}
                  tabIndex={currentStep === step.id ? 0 : -1}
                >
                  {currentStep > step.id ? (
                    <CheckCircle2 size={20} aria-hidden="true" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={`step-label ${
                    currentStep === step.id ? "step-label-active" : ""
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`step-connector ${
                    currentStep > step.id ? "step-connector-active" : ""
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

        {/* Success/Error Result */}
        {submitResult && (
          <div
            role="alert"
            style={{
              padding: "20px",
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
              <CheckCircle2 size={24} style={{ color: "var(--color-success)" }} aria-hidden="true" />
            ) : (
              <AlertCircle size={24} style={{ color: "var(--color-error)" }} aria-hidden="true" />
            )}
            <p style={{ fontWeight: 600, color: submitResult.type === "success" ? "var(--color-success)" : "var(--color-error)" }}>
              {submitResult.message}
            </p>
          </div>
        )}

        {/* Form Card */}
        <div className="card card-elevated" style={{ padding: "32px" }}>
          {/* ===== STEP 1: Team Data ===== */}
          {currentStep === 1 && (
            <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
              <legend className="sr-only">Paso 1: Datos del equipo</legend>

              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Building2 size={24} aria-hidden="true" style={{ color: "var(--color-primary)" }} />
                Datos del equipo o institución
              </h2>

              <div className="form-group">
                <label htmlFor="institutionName" className="form-label form-label-required">
                  Nombre de la institución
                </label>
                <input
                  id="institutionName"
                  type="text"
                  className={`form-input ${errors.institutionName ? "form-input-error" : ""}`}
                  value={teamData.institutionName}
                  onChange={(e) => setTeamData({ ...teamData, institutionName: e.target.value })}
                  aria-describedby={errors.institutionName ? "err-inst" : undefined}
                  aria-invalid={!!errors.institutionName}
                  placeholder="Ej: Club Social y Deportivo Moreno"
                />
                {errors.institutionName && (
                  <span id="err-inst" className="form-error" role="alert">{errors.institutionName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contactName" className="form-label form-label-required">
                  Nombre de la persona de contacto
                </label>
                <input
                  id="contactName"
                  type="text"
                  className={`form-input ${errors.contactName ? "form-input-error" : ""}`}
                  value={teamData.contactName}
                  onChange={(e) => setTeamData({ ...teamData, contactName: e.target.value })}
                  aria-describedby={errors.contactName ? "err-contact" : undefined}
                  aria-invalid={!!errors.contactName}
                  placeholder="Nombre y apellido"
                />
                {errors.contactName && (
                  <span id="err-contact" className="form-error" role="alert">{errors.contactName}</span>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label htmlFor="contactEmail" className="form-label form-label-required">
                    Email de contacto
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    className={`form-input ${errors.contactEmail ? "form-input-error" : ""}`}
                    value={teamData.contactEmail}
                    onChange={(e) => setTeamData({ ...teamData, contactEmail: e.target.value })}
                    aria-describedby={errors.contactEmail ? "err-email" : undefined}
                    aria-invalid={!!errors.contactEmail}
                    placeholder="email@ejemplo.com"
                  />
                  {errors.contactEmail && (
                    <span id="err-email" className="form-error" role="alert">{errors.contactEmail}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contactPhone" className="form-label form-label-required">
                    Teléfono de contacto
                  </label>
                  <input
                    id="contactPhone"
                    type="tel"
                    className={`form-input ${errors.contactPhone ? "form-input-error" : ""}`}
                    value={teamData.contactPhone}
                    onChange={(e) => setTeamData({ ...teamData, contactPhone: e.target.value })}
                    aria-describedby={errors.contactPhone ? "err-phone" : undefined}
                    aria-invalid={!!errors.contactPhone}
                    placeholder="11-1234-5678"
                  />
                  {errors.contactPhone && (
                    <span id="err-phone" className="form-error" role="alert">{errors.contactPhone}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="league" className="form-label form-label-required">
                  Liga
                </label>
                <select
                  id="league"
                  className={`form-input form-select ${errors.league ? "form-input-error" : ""}`}
                  value={teamData.league}
                  onChange={(e) => setTeamData({ ...teamData, league: e.target.value })}
                  aria-describedby={errors.league ? "err-league" : undefined}
                  aria-invalid={!!errors.league}
                >
                  <option value="">Seleccioná una liga</option>
                  <option value="liga-ba">Liga Buenos Aires</option>
                  <option value="liga-nacional">Liga Nacional</option>
                </select>
                {errors.league && (
                  <span id="err-league" className="form-error" role="alert">{errors.league}</span>
                )}
              </div>
            </fieldset>
          )}

          {/* ===== STEP 2: Player Roster (Listado de buena fe) ===== */}
          {currentStep === 2 && (
            <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
              <legend className="sr-only">Paso 2: Listado de buena fe</legend>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
                  <Users size={24} aria-hidden="true" style={{ color: "var(--color-primary)" }} />
                  Listado de buena fe
                </h2>
                <button
                  type="button"
                  onClick={addPlayer}
                  className="btn btn-primary btn-sm"
                >
                  <Plus size={16} aria-hidden="true" />
                  Agregar jugador
                </button>
              </div>

              <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", marginBottom: "20px" }}>
                Agregá a cada jugador del equipo. Mínimo 1 jugador para continuar.
              </p>

              {errors.players && (
                <div role="alert" className="form-error" style={{ marginBottom: "16px" }}>
                  {errors.players}
                </div>
              )}

              <div aria-label="Listado de jugadores" role="list">
                {players.map((player, index) => (
                  <div
                    key={index}
                    className="player-row"
                    role="listitem"
                    aria-label={`Jugador ${index + 1}: ${player.firstName || "Sin nombre"} ${player.lastName || ""}`}
                  >
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor={`player-fn-${index}`} className="form-label form-label-required" style={{ fontSize: "0.8rem" }}>
                        Nombre
                      </label>
                      <input
                        id={`player-fn-${index}`}
                        type="text"
                        className={`form-input ${errors[`player_${index}_firstName`] ? "form-input-error" : ""}`}
                        value={player.firstName}
                        onChange={(e) => updatePlayer(index, "firstName", e.target.value)}
                        aria-invalid={!!errors[`player_${index}_firstName`]}
                        placeholder="Nombre"
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor={`player-ln-${index}`} className="form-label form-label-required" style={{ fontSize: "0.8rem" }}>
                        Apellido
                      </label>
                      <input
                        id={`player-ln-${index}`}
                        type="text"
                        className={`form-input ${errors[`player_${index}_lastName`] ? "form-input-error" : ""}`}
                        value={player.lastName}
                        onChange={(e) => updatePlayer(index, "lastName", e.target.value)}
                        aria-invalid={!!errors[`player_${index}_lastName`]}
                        placeholder="Apellido"
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor={`player-dni-${index}`} className="form-label form-label-required" style={{ fontSize: "0.8rem" }}>
                        DNI
                      </label>
                      <input
                        id={`player-dni-${index}`}
                        type="text"
                        className={`form-input ${errors[`player_${index}_dni`] ? "form-input-error" : ""}`}
                        value={player.dni}
                        onChange={(e) => updatePlayer(index, "dni", e.target.value)}
                        aria-invalid={!!errors[`player_${index}_dni`]}
                        placeholder="12345678"
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label htmlFor={`player-bd-${index}`} className="form-label form-label-required" style={{ fontSize: "0.8rem" }}>
                        Fecha nac.
                      </label>
                      <input
                        id={`player-bd-${index}`}
                        type="date"
                        className={`form-input ${errors[`player_${index}_birthDate`] ? "form-input-error" : ""}`}
                        value={player.birthDate}
                        onChange={(e) => updatePlayer(index, "birthDate", e.target.value)}
                        aria-invalid={!!errors[`player_${index}_birthDate`]}
                      />
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: "2px" }}>
                      <button
                        type="button"
                        onClick={() => removePlayer(index)}
                        className="btn btn-danger btn-sm"
                        aria-label={`Eliminar jugador ${player.firstName || index + 1} del listado`}
                        disabled={players.length === 1}
                        style={{ opacity: players.length === 1 ? 0.4 : 1 }}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                        <span className="sr-only">Eliminar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <p
                style={{
                  textAlign: "center",
                  marginTop: "16px",
                  color: "var(--color-text-muted)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
                aria-live="polite"
              >
                Total: {players.length} {players.length === 1 ? "jugador" : "jugadores"} en el listado
              </p>
            </fieldset>
          )}

          {/* ===== STEP 3: Medical Clearance ===== */}
          {currentStep === 3 && (
            <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
              <legend className="sr-only">Paso 3: Ficha médica</legend>

              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
                <FileHeart size={24} aria-hidden="true" style={{ color: "var(--color-primary)" }} />
                Ficha médica
              </h2>

              <p style={{ color: "var(--color-text-muted)", marginBottom: "24px", lineHeight: 1.7 }}>
                La ficha médica es un requisito obligatorio para la inscripción.
                Podés subirla de forma digital o comprometerte a entregarla presencialmente en la institución.
              </p>

              {errors.medical && (
                <div role="alert" className="form-error" style={{ marginBottom: "16px" }}>
                  {errors.medical}
                </div>
              )}

              {/* Option 1: Digital upload */}
              <div
                style={{
                  padding: "24px",
                  border: `2px solid ${medicalDelivery === "digital" ? "var(--color-primary)" : "var(--color-border)"}`,
                  borderRadius: "var(--radius-md)",
                  marginBottom: "16px",
                  background: medicalDelivery === "digital" ? "var(--color-field-green)" : "transparent",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)",
                }}
                onClick={() => { setMedicalDelivery("digital"); setErrors({}); }}
              >
                <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="medicalDelivery"
                    value="digital"
                    checked={medicalDelivery === "digital"}
                    onChange={() => { setMedicalDelivery("digital"); setErrors({}); }}
                    style={{ marginTop: "4px", width: "20px", height: "20px", accentColor: "var(--color-primary)" }}
                  />
                  <div>
                    <span style={{ fontWeight: 700, fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "8px" }}>
                      <Upload size={18} aria-hidden="true" />
                      Subir ficha médica digital
                    </span>
                    <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", display: "block", marginTop: "4px" }}>
                      Formatos aceptados: PDF, JPG, PNG (máximo 10MB)
                    </span>
                  </div>
                </label>

                {medicalDelivery === "digital" && (
                  <div style={{ marginTop: "16px", paddingLeft: "32px" }}>
                    <input
                      type="file"
                      id="medicalFile"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        setMedicalFile(e.target.files[0]);
                        setErrors({});
                      }}
                      className="form-input"
                      style={{ padding: "8px" }}
                      aria-describedby={errors.medicalFile ? "err-med-file" : "med-file-desc"}
                    />
                    <p id="med-file-desc" style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
                      Subí la ficha médica en formato PDF, JPG o PNG.
                    </p>
                    {errors.medicalFile && (
                      <span id="err-med-file" className="form-error" role="alert">{errors.medicalFile}</span>
                    )}
                    {medicalFile && (
                      <p style={{ color: "var(--color-success)", marginTop: "8px", fontWeight: 600, fontSize: "0.9rem" }}>
                        <CheckCircle2 size={16} style={{ verticalAlign: "middle" }} aria-hidden="true" /> Archivo seleccionado: {medicalFile.name}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Option 2: In-person delivery */}
              <div
                style={{
                  padding: "24px",
                  border: `2px solid ${medicalDelivery === "presencial" ? "var(--color-primary)" : "var(--color-border)"}`,
                  borderRadius: "var(--radius-md)",
                  background: medicalDelivery === "presencial" ? "var(--color-field-green)" : "transparent",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)",
                }}
                onClick={() => { setMedicalDelivery("presencial"); setMedicalFile(null); setErrors({}); }}
              >
                <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="medicalDelivery"
                    value="presencial"
                    checked={medicalDelivery === "presencial"}
                    onChange={() => { setMedicalDelivery("presencial"); setMedicalFile(null); setErrors({}); }}
                    style={{ marginTop: "4px", width: "20px", height: "20px", accentColor: "var(--color-primary)" }}
                  />
                  <div>
                    <span style={{ fontWeight: 700, fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "8px" }}>
                      <Building2 size={18} aria-hidden="true" />
                      Entregar presencialmente en la institución
                    </span>
                    <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", display: "block", marginTop: "4px" }}>
                      La ficha médica quedará registrada como pendiente de entrega (isMedicalClearancePending).
                      Deberá ser entregada antes del inicio del torneo.
                    </span>
                  </div>
                </label>
              </div>
            </fieldset>
          )}

          {/* ===== NAVIGATION BUTTONS ===== */}
          <div
            style={{
              display: "flex",
              justifyContent: currentStep === 1 ? "flex-end" : "space-between",
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: "1px solid var(--color-border)",
            }}
          >
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn btn-outline">
                <ChevronLeft size={18} aria-hidden="true" />
                Paso anterior
              </button>
            )}

            {currentStep < 3 ? (
              <button type="button" onClick={nextStep} className="btn btn-primary">
                Siguiente paso
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn btn-primary btn-lg"
                style={{ opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? "Enviando inscripción..." : "Enviar inscripción"}
                {!isSubmitting && <CheckCircle2 size={18} aria-hidden="true" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
