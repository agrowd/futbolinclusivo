"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { 
  X, 
  QrCode, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Camera, 
  UserCheck, 
  Phone, 
  MapPin, 
  Clock, 
  RefreshCw, 
  Sparkles,
  SwitchCamera,
  Volume2,
  VolumeX,
  Play
} from "lucide-react";

export default function InfanciasScannerModal({ isOpen, onClose, onCheckInSuccess, stats }) {
  const [scanResult, setScanResult] = useState(null);
  const [manualCode, setManualCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [facingMode, setFacingMode] = useState("environment"); // 'environment' | 'user'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoResumeTime, setAutoResumeTime] = useState(null);

  const scannerRef = useRef(null);
  const isProcessingRef = useRef(false);

  // Synthesize crystal-clear audio feedback with Web Audio API
  const playFeedbackSound = useCallback((type = "success") => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (type === "success") {
        // High-pitched cheerful two-tone chime (G5 -> C6)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(783.99, ctx.currentTime); // G5
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.12); // C6

        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(ctx.currentTime);
        osc1.stop(ctx.currentTime + 0.12);
        osc2.start(ctx.currentTime + 0.12);
        osc2.stop(ctx.currentTime + 0.45);
      } else if (type === "warning") {
        // Warning double-buzz (A4 -> F4)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(349.23, ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      } else {
        // Error low buzz (150Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(160, ctx.currentTime);

        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (e) {
      console.warn("Sound playback error:", e);
    }
  }, [soundEnabled]);

  const processCode = useCallback(async (rawCode) => {
    if (!rawCode || isProcessingRef.current) return;
    isProcessingRef.current = true;
    setLoading(true);

    try {
      const res = await fetch("/api/admin/infancias/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: rawCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        playFeedbackSound("error");
        setScanResult({
          type: "error",
          message: data.error || "No se encontró ninguna inscripción con este código.",
        });
      } else if (data.alreadyAttended) {
        playFeedbackSound("warning");
        setScanResult({
          type: "warning",
          message: data.message,
          attendedAt: data.attendedAt,
          data: data.data,
        });
        if (onCheckInSuccess) onCheckInSuccess();
      } else {
        playFeedbackSound("success");
        setScanResult({
          type: "success",
          message: data.message,
          attendedAt: data.attendedAt,
          data: data.data,
        });
        if (onCheckInSuccess) onCheckInSuccess();
      }
    } catch (err) {
      playFeedbackSound("error");
      setScanResult({
        type: "error",
        message: "Error al comunicarse con el servidor.",
      });
    } finally {
      setLoading(false);
      setManualCode("");
      
      // Allow new scans after 2.5 seconds
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 2500);
    }
  }, [playFeedbackSound, onCheckInSuccess]);

  // Restart scanner with desired camera facing mode
  const startScanner = useCallback(() => {
    import("html5-qrcode")
      .then(({ Html5Qrcode }) => {
        const qrCodeRegionId = "qr-gate-camera-viewport";
        const element = document.getElementById(qrCodeRegionId);
        if (!element) return;

        if (scannerRef.current) {
          try {
            scannerRef.current
              .stop()
              .then(() => scannerRef.current.clear())
              .catch(() => {});
          } catch {}
        }

        const html5QrCode = new Html5Qrcode(qrCodeRegionId);
        scannerRef.current = html5QrCode;

        const config = {
          fps: 12,
          qrbox: (viewfinderWidth, viewfinderHeight) => {
            const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
            const edge = Math.floor(minEdge * 0.75);
            return { width: edge, height: edge };
          },
          aspectRatio: 1.0,
        };

        html5QrCode
          .start(
            { facingMode: facingMode },
            config,
            (decodedText) => {
              processCode(decodedText);
            },
            () => {}
          )
          .catch((err) => {
            console.warn("Camera start error:", err);
            setCameraError("No se pudo iniciar la cámara. Usá la búsqueda manual por DNI o Código.");
          });
      })
      .catch((err) => {
        console.error("Failed to load html5-qrcode:", err);
      });
  }, [facingMode, processCode]);

  useEffect(() => {
    if (isOpen) {
      setScanResult(null);
      setCameraError("");
      isProcessingRef.current = false;
      startScanner();
    }

    return () => {
      if (scannerRef.current) {
        try {
          scannerRef.current
            .stop()
            .then(() => scannerRef.current.clear())
            .catch(() => {});
        } catch {}
      }
    };
  }, [isOpen, startScanner]);

  const toggleCameraFacing = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-lg animate-fade-in">
      <div className="bg-[#000E21] border border-white/15 rounded-3xl w-full max-w-2xl text-white shadow-2xl overflow-hidden flex flex-col max-h-[96vh] h-full sm:h-auto">
        
        {/* Header - Mobile friendly with live counter */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#36b37e]/20 text-[#36b37e] flex items-center justify-center shadow-lg">
              <Camera size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight">
                  Control de Acceso (Puerta)
                </h3>
              </div>
              {stats && (
                <p className="text-xs text-[#36b37e] font-bold">
                  Ingresaron: <span className="text-white font-mono font-black">{stats.attended}</span> / {stats.total} chicos
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              title={soundEnabled ? "Silenciar sonido" : "Activar sonido"}
            >
              {soundEnabled ? <Volume2 size={18} className="text-[#36b37e]" /> : <VolumeX size={18} />}
            </button>
            <button
              onClick={toggleCameraFacing}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              title="Cambiar cámara"
            >
              <SwitchCamera size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-[#E74C3C]/80 text-white transition-colors"
              title="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 flex flex-col justify-between">
          
          {/* Camera Viewport or Full Screen Result Card */}
          {scanResult ? (
            <div className="animate-scale-in flex-1 flex flex-col justify-center">
              {/* SUCCESS (GREEN) */}
              {scanResult.type === "success" && (
                <div className="bg-gradient-to-b from-[#36b37e]/30 to-[#27ae60]/10 border-3 border-[#36b37e] rounded-3xl p-6 sm:p-8 text-center text-white shadow-[0_10px_50px_rgba(54,179,126,0.35)] relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-[#36b37e] text-black mx-auto flex items-center justify-center mb-4 shadow-xl animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#36b37e] text-black text-xs font-black uppercase tracking-widest inline-block mb-2">
                    ¡INGRESO AUTORIZADO!
                  </span>

                  <h4 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight mb-2">
                    {scanResult.data?.childName}
                  </h4>

                  <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-white/90 font-medium mb-4">
                    {scanResult.data?.childAge && (
                      <span className="bg-black/30 px-3 py-1 rounded-lg">
                        {scanResult.data.childAge} años
                      </span>
                    )}
                    {scanResult.data?.childDni && (
                      <span className="bg-black/30 px-3 py-1 rounded-lg font-mono">
                        DNI: {scanResult.data.childDni}
                      </span>
                    )}
                    <span className="bg-black/30 px-3 py-1 rounded-lg font-mono text-[#36b37e]">
                      #{scanResult.data?.ticketCode}
                    </span>
                  </div>

                  {scanResult.data?.medicalNotes && (
                    <div className="p-3 rounded-2xl bg-[#E74C3C]/25 border border-[#E74C3C] text-white text-xs font-bold mb-4 flex items-center justify-center gap-2">
                      ⚠️ ATENCIÓN MÉDICA: {scanResult.data.medicalNotes}
                    </div>
                  )}

                  <button
                    onClick={() => setScanResult(null)}
                    className="w-full py-4 bg-[#36b37e] hover:bg-[#2ecc71] text-black font-black uppercase tracking-wider rounded-2xl shadow-xl text-base transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Play size={18} /> Continuar Escaneando
                  </button>
                </div>
              )}

              {/* WARNING - ALREADY ATTENDED (YELLOW) */}
              {scanResult.type === "warning" && (
                <div className="bg-gradient-to-b from-[#E67E22]/30 to-[#d35400]/10 border-3 border-[#E67E22] rounded-3xl p-6 sm:p-8 text-center text-white shadow-[0_10px_50px_rgba(230,126,34,0.35)]">
                  <div className="w-16 h-16 rounded-full bg-[#E67E22] text-black mx-auto flex items-center justify-center mb-4 shadow-xl">
                    <AlertTriangle size={36} />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#E67E22] text-black text-xs font-black uppercase tracking-widest inline-block mb-2">
                    PASE YA UTILIZADO
                  </span>

                  <h4 className="text-2xl sm:text-3xl font-black uppercase text-white mb-2">
                    {scanResult.data?.childName}
                  </h4>

                  <p className="text-base text-[#f39c12] font-bold mb-4">
                    Este pase ya ingresó a las{" "}
                    {new Date(scanResult.attendedAt || scanResult.data?.attendedAt).toLocaleTimeString("es-AR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    hs.
                  </p>

                  <button
                    onClick={() => setScanResult(null)}
                    className="w-full py-4 bg-[#E67E22] hover:bg-[#f39c12] text-black font-black uppercase tracking-wider rounded-2xl shadow-xl text-base transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Play size={18} /> Escanear Siguiente
                  </button>
                </div>
              )}

              {/* ERROR (RED) */}
              {scanResult.type === "error" && (
                <div className="bg-gradient-to-b from-[#E74C3C]/30 to-[#c0392b]/10 border-3 border-[#E74C3C] rounded-3xl p-6 sm:p-8 text-center text-white shadow-[0_10px_50px_rgba(231,76,60,0.35)]">
                  <div className="w-16 h-16 rounded-full bg-[#E74C3C] text-white mx-auto flex items-center justify-center mb-4 shadow-xl">
                    <XCircle size={36} />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#E74C3C] text-white text-xs font-black uppercase tracking-widest inline-block mb-2">
                    NO ENCONTRADO
                  </span>

                  <p className="text-lg font-bold text-white mb-6">
                    {scanResult.message}
                  </p>

                  <button
                    onClick={() => setScanResult(null)}
                    className="w-full py-4 bg-white/20 hover:bg-white/30 text-white font-black uppercase tracking-wider rounded-2xl text-base transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={18} /> Reintentar Escaneo
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center">
              {/* Camera Scanner Viewport */}
              <div className="relative rounded-3xl overflow-hidden bg-black border-2 border-white/20 min-h-[280px] sm:min-h-[320px] flex flex-col items-center justify-center shadow-2xl">
                <div id="qr-gate-camera-viewport" className="w-full max-w-[340px] rounded-2xl overflow-hidden" />

                {/* Laser animation line */}
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 bg-[#36b37e] shadow-[0_0_15px_#36b37e] pointer-events-none opacity-80" />

                {cameraError && (
                  <div className="p-6 text-center max-w-sm text-sm text-[#ff7675]">
                    <AlertTriangle size={36} className="mx-auto mb-2 opacity-80" />
                    <p>{cameraError}</p>
                  </div>
                )}

                {loading && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-30">
                    <div className="w-10 h-10 border-4 border-[#36b37e] border-t-transparent rounded-full animate-spin" />
                    <span className="text-base font-bold text-white">Verificando en base de datos...</span>
                  </div>
                )}
              </div>
              <p className="text-center text-xs text-white/50 mt-2">
                Apuntá la cámara al código QR del pase del chico/a.
              </p>
            </div>
          )}

          {/* Manual Input Fallback */}
          <div className="pt-2">
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
                  placeholder="Buscar por DNI, Código (INF-...) o Nombre..."
                  className="w-full bg-white/5 border border-white/15 focus:border-[#36b37e] rounded-2xl pl-10 pr-4 py-3.5 text-white placeholder-white/40 text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={!manualCode.trim() || loading}
                className="bg-[#36b37e] hover:bg-[#2ecc71] disabled:opacity-50 text-black font-black px-5 py-3.5 rounded-2xl transition-all text-sm uppercase flex items-center gap-1.5 active:scale-95 shadow-lg"
              >
                <UserCheck size={18} />
                <span className="hidden sm:inline">Acreditar</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
