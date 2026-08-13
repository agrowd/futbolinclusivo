"use client";

import { useState, useEffect } from "react";
import { X, Save, User, Phone, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";

export default function InfanciasEditModal({ isOpen, item, onClose, onUpdated }) {
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
    notes: "",
    attended: false,
    status: "active",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (item) {
      setFormData({
        childName: item.childName || "",
        childDni: item.childDni || "",
        childAge: item.childAge || "",
        childBirthDate: item.childBirthDate || "",
        tutorName: item.tutorName || "",
        tutorPhone: item.tutorPhone || "",
        tutorEmail: item.tutorEmail || "",
        locality: item.locality || "",
        clubOrSchool: item.clubOrSchool || "",
        medicalNotes: item.medicalNotes || "",
        notes: item.notes || "",
        attended: !!item.attended,
        status: item.status || "active",
      });
      setError("");
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/infancias/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al actualizar la inscripción");
      }

      if (onUpdated) onUpdated(data.data);
      onClose();
    } catch (err) {
      setError(err.message || "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#00132B] border border-white/10 rounded-3xl w-full max-w-2xl text-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div>
            <span className="text-[11px] font-black uppercase text-[#36b37e] tracking-widest block">
              Ticket #{item.ticketCode}
            </span>
            <h3 className="text-xl font-black uppercase tracking-tight">
              Editar Inscripción
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {error && (
            <div className="p-4 rounded-xl bg-[#E74C3C]/15 border border-[#E74C3C]/40 text-[#ff7675] text-xs flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {/* Child Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#36b37e]">
              Datos del Niño / Niña
            </h4>

            <div>
              <label className="block text-xs font-bold text-white/70 uppercase mb-1.5">
                Nombre Completo *
              </label>
              <input
                type="text"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-white/70 uppercase mb-1.5">
                  DNI
                </label>
                <input
                  type="text"
                  name="childDni"
                  value={formData.childDni}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/70 uppercase mb-1.5">
                  Edad
                </label>
                <input
                  type="text"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/70 uppercase mb-1.5">
                  Localidad
                </label>
                <input
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Tutor Info */}
          <div className="space-y-4 pt-2 border-t border-white/5">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#2980B9]">
              Datos del Tutor & Contacto
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-white/70 uppercase mb-1.5">
                  Nombre Tutor
                </label>
                <input
                  type="text"
                  name="tutorName"
                  value={formData.tutorName}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/70 uppercase mb-1.5">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="text"
                  name="tutorPhone"
                  value={formData.tutorPhone}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-white/70 uppercase mb-1.5">
                Club / Escuela / Comedor
              </label>
              <input
                type="text"
                name="clubOrSchool"
                value={formData.clubOrSchool}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 focus:border-[#2980B9] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Medical Notes & Admin Notes */}
          <div className="space-y-4 pt-2 border-t border-white/5">
            <div>
              <label className="block text-xs font-bold text-white/70 uppercase mb-1.5">
                Observaciones Médicas / Alergias
              </label>
              <input
                type="text"
                name="medicalNotes"
                value={formData.medicalNotes}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/70 uppercase mb-1.5">
                Notas Internas de Administración
              </label>
              <textarea
                name="notes"
                rows={2}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Observaciones de ingreso, acompañantes, etc..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Attendance Checkbox */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-white block">
                Estado de Acreditación (Ingreso al Predio)
              </span>
              <span className="text-xs text-white/50">
                {formData.attended ? "Marcado como INGRESADO" : "Pendiente de ingreso"}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="attended"
                checked={formData.attended}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#36b37e]"></div>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-sm font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-[#36b37e] hover:bg-[#2ecc71] text-white text-sm font-black uppercase transition-all flex items-center gap-2"
            >
              <Save size={16} />
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
