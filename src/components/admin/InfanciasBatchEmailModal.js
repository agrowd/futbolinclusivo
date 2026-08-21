"use client";

import { useState, useEffect } from "react";
import { 
  X, 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  RefreshCw, 
  Users,
  Clock,
  Sparkles
} from "lucide-react";

export default function InfanciasBatchEmailModal({ isOpen, onClose, onCompleted, items = [] }) {
  const [onlyPending, setOnlyPending] = useState(true);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setOnlyPending(true);
      setSending(false);
      setResult(null);
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Calculate statistics from items list
  const totalTickets = items.length;
  const uniqueFamiliesCount = new Set(items.map((i) => i.familyGroupId || i.tutorEmail || i._id)).size;
  const pendingEmailCount = items.filter((i) => !i.emailSent && i.tutorEmail).length;
  const noEmailCount = items.filter((i) => !i.tutorEmail).length;
  const alreadySentCount = items.filter((i) => i.emailSent).length;

  const handleStartBatchSend = async () => {
    setSending(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/admin/infancias/batch-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onlyPending }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Ocurrió un error al enviar los correos.");
      }

      setResult(data);
      if (onCompleted) {
        onCompleted();
      }
    } catch (err) {
      setError(err.message || "Error al conectar con el servidor.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-[#00132B] border border-white/15 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto text-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="sticky top-0 bg-[#00132B]/95 border-b border-white/10 p-5 sm:p-6 flex items-center justify-between z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2980B9]/20 text-[#2980B9] flex items-center justify-center font-bold">
              <Mail size={22} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#36b37e] block">
                Envío Masivo de Pases QR
              </span>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight">
                Notificar por Correo a los Inscriptos
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

        {/* Content */}
        <div className="p-5 sm:p-8 space-y-6">

          {/* Stats Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center">
              <span className="text-[10px] uppercase font-bold text-white/50 block">Inscriptos</span>
              <span className="text-xl font-black text-white">{totalTickets}</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-center">
              <span className="text-[10px] uppercase font-bold text-white/50 block">Familias</span>
              <span className="text-xl font-black text-[#2980B9]">{uniqueFamiliesCount}</span>
            </div>
            <div className="bg-[#E67E22]/10 border border-[#E67E22]/30 rounded-2xl p-3.5 text-center">
              <span className="text-[10px] uppercase font-bold text-[#E67E22] block">Pendientes Mail</span>
              <span className="text-xl font-black text-[#E67E22]">{pendingEmailCount}</span>
            </div>
            <div className="bg-[#36b37e]/10 border border-[#36b37e]/30 rounded-2xl p-3.5 text-center">
              <span className="text-[10px] uppercase font-bold text-[#36b37e] block">Mails Enviados</span>
              <span className="text-xl font-black text-[#36b37e]">{alreadySentCount}</span>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-[#E74C3C]/15 border border-[#E74C3C]/40 text-[#ff7675] flex items-start gap-3 text-xs">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <div><strong>Error:</strong> {error}</div>
            </div>
          )}

          {/* Result view */}
          {result ? (
            <div className="space-y-5 animate-fade-in">
              <div className="p-5 rounded-2xl bg-[#36b37e]/20 border border-[#36b37e]/40 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#36b37e] text-black font-black flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="text-xl font-black uppercase text-white">
                  ¡Envío de Correos Finalizado!
                </h4>
                <p className="text-xs sm:text-sm text-white/80">
                  Se enviaron <strong className="text-[#36b37e]">{result.emailsSent}</strong> correos familiares con pases QR.
                </p>
              </div>

              {/* Logs list */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 max-h-56 overflow-y-auto space-y-2 text-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-white/40 block mb-2">
                  Registro de envíos realizados:
                </span>
                {result.logs?.map((log, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      {log.status === "success" && <CheckCircle2 size={14} className="text-[#36b37e]" />}
                      {log.status === "skipped_already_sent" && <Clock size={14} className="text-white/40" />}
                      {log.status === "skipped_no_email" && <AlertTriangle size={14} className="text-[#E67E22]" />}
                      {log.status === "error" && <AlertCircle size={14} className="text-red-400" />}
                      <span className="font-bold text-white">{log.family}</span>
                      {log.email && <span className="text-white/40 text-[11px]">({log.email})</span>}
                    </div>
                    <span className="text-[11px] text-white/70">{log.message}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-white/10">
                <button
                  onClick={onClose}
                  className="bg-[#36b37e] text-black font-black px-6 py-2.5 rounded-xl text-xs uppercase"
                >
                  Entendido y Cerrar
                </button>
              </div>
            </div>
          ) : (
            /* Mode Selection & Dispatch Action */
            <div className="space-y-5">
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3">
                <h4 className="text-xs font-black uppercase text-white tracking-wider">
                  Modo de Envío:
                </h4>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="onlyPending"
                    checked={onlyPending === true}
                    onChange={() => setOnlyPending(true)}
                    className="mt-0.5 w-4 h-4 text-[#36b37e] focus:ring-0 cursor-pointer"
                  />
                  <div className="text-xs">
                    <strong className="text-white block font-bold">
                      Enviar ÚNICAMENTE a las familias que AÚN NO recibieron correo (Recomendado)
                    </strong>
                    <span className="text-white/60 block mt-0.5">
                      Evita duplicar mails enviando únicamente a quienes se inscribieron antes de configurar el servicio.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="onlyPending"
                    checked={onlyPending === false}
                    onChange={() => setOnlyPending(false)}
                    className="mt-0.5 w-4 h-4 text-[#36b37e] focus:ring-0 cursor-pointer"
                  />
                  <div className="text-xs">
                    <strong className="text-white block font-bold">
                      Reenviar a TODAS las familias registradas
                    </strong>
                    <span className="text-white/60 block mt-0.5">
                      Vuelve a enviar una copia de los pases QR a todas las familias de la base de datos que tengan mail.
                    </span>
                  </div>
                </label>
              </div>

              {noEmailCount > 0 && (
                <div className="p-3.5 rounded-2xl bg-[#E67E22]/15 border border-[#E67E22]/30 text-[#f39c12] text-xs flex items-start gap-2.5">
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                  <div>
                    Hay <strong>{noEmailCount} inscriptos</strong> que no poseen correo registrado. Podés editar sus datos en la tabla para ingresar su email y enviarles el pase.
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={sending}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs font-bold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleStartBatchSend}
                  disabled={sending}
                  className="bg-gradient-to-r from-[#2980B9] to-[#3498db] hover:from-[#3498db] hover:to-[#2980B9] text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {sending ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Enviando correos...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Iniciar Envío Masivo</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
