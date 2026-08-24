"use client";

import { useEffect, useState } from "react";
import { 
  X, 
  QrCode, 
  Download, 
  Printer, 
  ShieldCheck, 
  Mail, 
  CheckCircle2, 
  AlertCircle,
  MessageSquare,
  Copy,
  Check
} from "lucide-react";
import QRCode from "qrcode";
import { formatWhatsAppPhone, buildWhatsAppMessage, getWhatsAppLink } from "@/lib/whatsapp";

export default function InfanciasTicketModal({ isOpen, item, onClose }) {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null); // { type: 'success'|'error', text: '' }
  const [copiedType, setCopiedType] = useState(null); // 'phone' | 'text' | null

  useEffect(() => {
    if (item) {
      setEmailStatus(null);
      setCopiedType(null);
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

  const handleCopyPhone = () => {
    const cleanPhone = formatWhatsAppPhone(item.tutorPhone);
    if (!cleanPhone) return;
    navigator.clipboard.writeText(cleanPhone);
    setCopiedType("phone");
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleCopyText = () => {
    const msg = buildWhatsAppMessage({
      tutorName: item.tutorName,
      ticketCode: item.ticketCode,
      childName: item.childName,
    });
    navigator.clipboard.writeText(msg);
    setCopiedType("text");
    setTimeout(() => setCopiedType(null), 2500);
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

  const waLink = getWhatsAppLink(item.tutorPhone, {
    tutorName: item.tutorName,
    ticketCode: item.ticketCode,
    childName: item.childName,
  });

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="bg-[#00132B] border-2 border-[#36b37e]/40 rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto text-white shadow-2xl relative cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
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
            <div className="flex justify-between items-center">
              <span>Contacto:</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{item.tutorPhone}</span>
                <button
                  onClick={handleCopyPhone}
                  className="text-[11px] text-[#2980B9] hover:underline flex items-center gap-0.5"
                  title="Copiar número en formato WhatsApp (549...)"
                >
                  {copiedType === "phone" ? (
                    <span className="text-[#36b37e] font-bold flex items-center gap-0.5">
                      <Check size={12} /> Copiado
                    </span>
                  ) : (
                    <span className="flex items-center gap-0.5">
                      <Copy size={12} /> WhatsApp Nro
                    </span>
                  )}
                </button>
              </div>
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

          {/* Quick WhatsApp Actions */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-black font-black py-2.5 px-3 rounded-xl text-xs uppercase transition-all shadow-md"
            >
              <MessageSquare size={14} /> Abrir WhatsApp
            </a>
            <button
              onClick={handleCopyText}
              className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-3 rounded-xl text-xs uppercase transition-all"
            >
              {copiedType === "text" ? (
                <>
                  <Check size={14} className="text-[#36b37e]" /> Copiado
                </>
              ) : (
                <>
                  <Copy size={14} /> Copiar Texto WA
                </>
              )}
            </button>
          </div>

          {/* Download, Email & Print */}
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
