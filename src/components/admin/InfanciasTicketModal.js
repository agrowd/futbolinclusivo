"use client";

import { useEffect, useState } from "react";
import { X, QrCode, Download, Printer, ShieldCheck } from "lucide-react";
import QRCode from "qrcode";

export default function InfanciasTicketModal({ isOpen, item, onClose }) {
  const [qrDataUrl, setQrDataUrl] = useState("");

  useEffect(() => {
    if (item) {
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

          <div className="bg-white/5 rounded-xl p-3 text-xs text-white/70 space-y-1.5 text-left mb-6">
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
            <div className="flex justify-between">
              <span>Acreditado:</span>
              <span className={`font-bold ${item.attended ? "text-[#36b37e]" : "text-[#E67E22]"}`}>
                {item.attended ? "SÍ (Ingresó)" : "NO (Pendiente)"}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDownloadQR}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase transition-all"
            >
              <Download size={14} /> Descargar QR
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 bg-[#36b37e] hover:bg-[#2ecc71] text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase transition-all"
            >
              <Printer size={14} /> Imprimir
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
