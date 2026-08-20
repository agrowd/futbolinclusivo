"use client";

import { useEffect, useState } from "react";
import { X, QrCode, Download, Printer, ShieldCheck, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import QRCode from "qrcode";

export default function InfanciasTicketModal({ isOpen, item, onClose }) {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null); // { type: 'success'|'error', text: '' }

  useEffect(() => {
    if (item) {
      setEmailStatus(null);
      const qrPayload = JSON.stringify({
        code: item.ticketCode,
        id: item._id,
        name: item.childName,
      });

      QRCode.toDataURL(qrPayload, {
        errorCorrectionLevel: "M",
        margin: 2,
        width: 300,
        color: { dark: "#000B1A", light: "#FFFFFF" },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error("Error generating QR:", err));
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `QR-${item.ticketCode}-${item.childName}.png`;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = async () => {
    setSendingEmail(true);
    setEmailStatus(null);
    try {
      const res = await fetch("/api/admin/infancias/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketCode: item.ticketCode }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEmailStatus({
          type: "success",
          text: `Email enviado a ${data.recipient || "tutor"}.`,
        });
      } else {
        setEmailStatus({
          type: "error",
          text: data.error || "No se pudo enviar el correo.",
        });
      }
    } catch (err) {
      setEmailStatus({
        type: "error",
        text: "Error al comunicar con el servidor.",
      });
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#00132B] border-2 border-[#36b37e]/40 rounded-3xl w-full max-w-md text-white shadow-2xl overflow-hidden relative">
        
        {/* Top Banner */}
        <div className="h-2 bg-gradient-to-r from-[#36b37e] via-[#2980B9] to-[#E67E22]" />

        <div className="p-6 text-center">
          <div className="flex justify-between items-center mb-4">
            <span className="px-3 py-1 rounded-full bg-[#36b37e]/20 text-[#36b37e] text-xs font-black uppercase tracking-wider">
              Pase Día de las Infancias
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-xl inline-block mx-auto mb-4">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt={`QR ${item.ticketCode}`} className="w-56 h-56 object-contain" />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center bg-gray-100 text-gray-400">
                <QrCode size={48} />
              </div>
            )}
          </div>

          <div className="font-mono text-2xl font-black text-white tracking-widest mb-1">
            {item.ticketCode}
          </div>
          <div className="text-xl font-bold text-white mb-4">
            {item.childName}
          </div>

          <div className="bg-white/5 rounded-xl p-3 text-xs text-white/70 space-y-1.5 text-left mb-4">
            {item.childDni && (
              <div className="flex justify-between">
                <span>DNI:</span>
                <span className="font-bold text-white">{item.childDni}</span>
              </div>
            )}
            {item.childAge && (
              <div className="flex justify-between">
                <span>Edad:</span>
                <span className="font-bold text-white">{item.childAge} años</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Contacto:</span>
              <span className="font-bold text-white">{item.tutorPhone}</span>
            </div>
            {item.tutorEmail && (
              <div className="flex justify-between">
                <span>Email:</span>
                <span className="font-bold text-white">{item.tutorEmail}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Acreditado:</span>
              <span className={`font-bold ${item.attended ? "text-[#36b37e]" : "text-[#E67E22]"}`}>
                {item.attended ? "SÍ (Ingresó)" : "NO (Pendiente)"}
              </span>
            </div>
          </div>

          {emailStatus && (
            <div
              className={`mb-4 p-2.5 rounded-xl text-xs flex items-center justify-center gap-2 ${
                emailStatus.type === "success"
                  ? "bg-[#36b37e]/20 border border-[#36b37e]/40 text-[#36b37e]"
                  : "bg-red-500/20 border border-red-500/40 text-red-400"
              }`}
            >
              {emailStatus.type === "success" ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              <span>{emailStatus.text}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleDownloadQR}
              className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-2 rounded-xl text-[11px] uppercase transition-all"
            >
              <Download size={13} /> QR
            </button>
            <button
              onClick={handleSendEmail}
              disabled={sendingEmail || !item.tutorEmail}
              className="flex items-center justify-center gap-1.5 bg-[#2980B9] hover:bg-[#3498db] text-white font-bold py-2.5 px-2 rounded-xl text-[11px] uppercase transition-all disabled:opacity-50"
              title="Reenviar comprobante por correo electrónico"
            >
              <Mail size={13} /> {sendingEmail ? "Enviando..." : "Email"}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-1.5 bg-[#36b37e] hover:bg-[#2ecc71] text-black font-black py-2.5 px-2 rounded-xl text-[11px] uppercase transition-all"
            >
              <Printer size={13} /> Imprimir
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
