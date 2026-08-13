"use client";

import { useEffect, useRef, useState } from "react";
import { 
  X, 
  QrCode, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Volume2, 
  Camera, 
  UserCheck, 
  Phone, 
  MapPin, 
  FileText,
  Clock,
  RefreshCw
} from "lucide-react";

export default function InfanciasScannerModal({ isOpen, onClose, onCheckInSuccess }) {
  const [scanResult, setScanResult] = useState(null);
  const [manualCode, setManualCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [isScannerRunning, setIsScannerRunning] = useState(false);
  const scannerRef = useRef(null);

  // Play sound using Web Audio API
  const playSound = (type = "success") => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === "success") {
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.3);
      } else if (type === "warning") {
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.setValueAtTime(349.23, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.35);
      } else {
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.4);
      }
    } catch (e) {
      console.warn("Audio playback not supported:", e);
    }
  };

  const processCode = async (rawCode) => {
    if (!rawCode || loading) return;
    setLoading(true);
    setScanResult(null);

    try {
      const res = await fetch("/api/admin/infancias/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: rawCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        playSound("error");
        setScanResult({
          type: "error",
          message: data.error || "No se encontró ninguna inscripción con este código.",
        });
      } else if (data.alreadyAttended) {
        playSound("warning");
        setScanResult({
          type: "warning",
          message: data.message,
          attendedAt: data.attendedAt,
          data: data.data,
        });
        if (onCheckInSuccess) onCheckInSuccess();
      } else {
        playSound("success");
        setScanResult({
          type: "success",
          message: data.message,
          attendedAt: data.attendedAt,
          data: data.data,
        });
        if (onCheckInSuccess) onCheckInSuccess();
      }
    } catch (err) {
      playSound("error");
      setScanResult({
        type: "error",
        message: "Error al comunicarse con el servidor.",
      });
    } finally {
      setLoading(false);
      setManualCode("");
    }
  };

  // Initialize Html5QrcodeScanner when modal opens
  useEffect(() => {
    let html5QrCode = null;

    if (isOpen) {
      setScanResult(null);
      setCameraError("");

      import("html5-qrcode")
        .then(({ Html5Qrcode }) => {
          const qrCodeRegionId = "qr-reader-container";
          const element = document.getElementById(qrCodeRegionId);
          if (!element) return;

          html5QrCode = new Html5Qrcode(qrCodeRegionId);
          scannerRef.current = html5QrCode;

          const config = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          };

          html5QrCode
            .start(
              { facingMode: "environment" },
              config,
              (decodedText) => {
                // Detected a QR!
                processCode(decodedText);
              },
              (errorMessage) => {
                // scanning frame error (ignore)
              }
            )
            .then(() => {
              setIsScannerRunning(true);
            })
            .catch((err) => {
              console.warn("Camera start error:", err);
              setCameraError(
                "No se pudo acceder a la cámara. Asegurate de dar permisos o usá la búsqueda manual por código o DNI."
              );
            });
        })
        .catch((err) => {
          console.error("Failed to load html5-qrcode:", err);
        });
    }

    return () => {
      if (scannerRef.current) {
        try {
          scannerRef.current
            .stop()
            .then(() => scannerRef.current.clear())
            .catch((e) => console.warn("Error stopping scanner:", e));
        } catch (e) {
          // ignore
        }
      }
      setIsScannerRunning(false);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#00132B] border border-white/10 rounded-3xl w-full max-w-2xl text-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#36b37e]/20 text-[#36b37e] flex items-center justify-center">
              <Camera size={20} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight">
                Escáner de Acreditación (Puerta)
              </h3>
              <p className="text-white/50 text-xs">
                Escaneá el código QR del pase o ingresá el DNI/Código manualmente
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Scanner Viewport */}
          <div className="relative rounded-2xl overflow-hidden bg-black/60 border-2 border-dashed border-white/20 min-h-[260px] flex flex-col items-center justify-center">
            <div id="qr-reader-container" className="w-full max-w-[320px] rounded-xl overflow-hidden" />
            
            {cameraError && (
              <div className="p-4 text-center max-w-md text-sm text-[#ff7675]">
                <AlertTriangle size={32} className="mx-auto mb-2 opacity-80" />
                <p>{cameraError}</p>
              </div>
            )}

            {loading && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-20">
                <div className="w-8 h-8 border-3 border-[#36b37e] border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-bold text-white">Validando inscripción...</span>
              </div>
            )}
          </div>

          {/* Manual Input Fallback */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              processCode(manualCode);
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Ingresar DNI, Código (ej: INF-XXXXX) o Nombre..."
                className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={!manualCode.trim() || loading}
              className="bg-[#36b37e] hover:bg-[#2ecc71] disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl transition-all text-sm uppercase flex items-center gap-2"
            >
              <UserCheck size={16} /> Acreditar
            </button>
          </form>

          {/* Scan Result Feedback Card */}
          {scanResult && (
            <div className="animate-fade-in">
              {scanResult.type === "success" && (
                <div className="bg-[#36b37e]/15 border-2 border-[#36b37e] rounded-2xl p-5 text-white shadow-xl">
                  <div className="flex items-center gap-3 text-[#36b37e] font-black text-base uppercase mb-3">
                    <CheckCircle2 size={24} /> {scanResult.message}
                  </div>

                  {scanResult.data && (
                    <div className="bg-black/30 rounded-xl p-4 space-y-2 text-sm">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-white/60">Participante:</span>
                        <strong className="text-white text-base">{scanResult.data.childName}</strong>
                      </div>
                      {scanResult.data.childDni && (
                        <div className="flex justify-between">
                          <span className="text-white/60">DNI:</span>
                          <span className="font-mono font-bold text-white">{scanResult.data.childDni}</span>
                        </div>
                      )}
                      {scanResult.data.childAge && (
                        <div className="flex justify-between">
                          <span className="text-white/60">Edad:</span>
                          <span className="font-bold text-white">{scanResult.data.childAge} años</span>
                        </div>
                      )}
                      {scanResult.data.tutorName && (
                        <div className="flex justify-between">
                          <span className="text-white/60">Tutor:</span>
                          <span className="text-white">{scanResult.data.tutorName}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-white/60">Teléfono:</span>
                        <span className="text-white">{scanResult.data.tutorPhone}</span>
                      </div>
                      {scanResult.data.medicalNotes && (
                        <div className="p-2.5 rounded-lg bg-[#E74C3C]/20 border border-[#E74C3C]/40 text-[#ff7675] text-xs">
                          ⚠️ <strong>Atención médica:</strong> {scanResult.data.medicalNotes}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {scanResult.type === "warning" && (
                <div className="bg-[#E67E22]/15 border-2 border-[#E67E22] rounded-2xl p-5 text-white shadow-xl">
                  <div className="flex items-center gap-3 text-[#E67E22] font-black text-base uppercase mb-3">
                    <AlertTriangle size={24} /> {scanResult.message}
                  </div>

                  {scanResult.data && (
                    <div className="bg-black/30 rounded-xl p-4 space-y-2 text-sm">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-white/60">Participante:</span>
                        <strong className="text-white text-base">{scanResult.data.childName}</strong>
                      </div>
                      <div className="flex justify-between text-xs text-[#E67E22] font-bold">
                        <span className="flex items-center gap-1"><Clock size={14} /> Ingresó a las:</span>
                        <span>{new Date(scanResult.attendedAt || scanResult.data.attendedAt).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })} hs</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {scanResult.type === "error" && (
                <div className="bg-[#E74C3C]/15 border-2 border-[#E74C3C] rounded-2xl p-5 text-white shadow-xl">
                  <div className="flex items-center gap-3 text-[#ff7675] font-black text-base uppercase">
                    <XCircle size={24} /> {scanResult.message}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-white/[0.02] border-t border-white/10 flex justify-end gap-3">
          <button
            onClick={() => setScanResult(null)}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <RefreshCw size={14} /> Limpiar resultado
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
