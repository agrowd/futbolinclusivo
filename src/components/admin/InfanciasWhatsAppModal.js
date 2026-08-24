"use client";

import { useState, useEffect } from "react";
import { 
  X, 
  MessageSquare, 
  Copy, 
  Check, 
  ExternalLink, 
  QrCode, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  Download
} from "lucide-react";
import QRCode from "qrcode";
import { formatWhatsAppPhone, buildWhatsAppMessage, getWhatsAppLink } from "@/lib/whatsapp";

export default function InfanciasWhatsAppModal({ isOpen, onClose, items = [] }) {
  const [familyGroups, setFamilyGroups] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  const [qrImagesMap, setQrImagesMap] = useState({});

  useEffect(() => {
    if (isOpen && items && items.length > 0) {
      // Group items by familyGroupId or tutorPhone or _id
      const map = new Map();
      items.forEach((item) => {
        const key = item.familyGroupId || item.tutorPhone || item._id;
        if (!map.has(key)) {
          map.set(key, []);
        }
        map.get(key).push(item);
      });

      const groups = Array.from(map.values()).map((members) => {
        const first = members[0];
        const text = buildWhatsAppMessage({
          tutorName: first.tutorName,
          ticketsCount: members.length,
          tickets: members.map((m) => ({ childName: m.childName, ticketCode: m.ticketCode })),
        });
        const cleanPhone = formatWhatsAppPhone(first.tutorPhone);
        const waLink = getWhatsAppLink(first.tutorPhone, {
          tutorName: first.tutorName,
          ticketsCount: members.length,
          tickets: members.map((m) => ({ childName: m.childName, ticketCode: m.ticketCode })),
        });

        return {
          id: first.familyGroupId || first._id,
          tutorName: first.tutorName || "Familia",
          tutorPhone: first.tutorPhone,
          cleanPhone,
          locality: first.locality,
          members,
          text,
          waLink,
        };
      });

      setFamilyGroups(groups);
      const riveroIndex = groups.findIndex(
        (g) =>
          (g.tutorName || "").toLowerCase().includes("rivero clara") ||
          g.members.some((m) => (m.childName || "").toLowerCase().includes("caceres santino"))
      );
      setSelectedIndex(riveroIndex !== -1 ? riveroIndex : 0);

      // Generate Base64 QRs for all tickets
      const qrsObj = {};
      Promise.all(
        items.map(async (item) => {
          const qrPayload = JSON.stringify({
            code: item.ticketCode,
            id: item._id,
            name: item.childName,
          });
          const url = await QRCode.toDataURL(qrPayload, {
            errorCorrectionLevel: "M",
            margin: 2,
            width: 320,
            color: { dark: "#000B1A", light: "#FFFFFF" },
          });
          qrsObj[item.ticketCode] = url;
        })
      ).then(() => {
        setQrImagesMap(qrsObj);
      });
    }
  }, [isOpen, items]);

  if (!isOpen) return null;

  const currentFamily = familyGroups[selectedIndex];

  const handleCopyText = () => {
    if (!currentFamily) return;
    navigator.clipboard.writeText(currentFamily.text);
    setCopiedId(`text-${currentFamily.id}`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopyPhone = () => {
    if (!currentFamily) return;
    navigator.clipboard.writeText(currentFamily.cleanPhone);
    setCopiedId(`phone-${currentFamily.id}`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadFamilyQRs = () => {
    if (!currentFamily) return;
    currentFamily.members.forEach((m) => {
      const qrUrl = qrImagesMap[m.ticketCode];
      if (qrUrl) {
        const a = document.createElement("a");
        a.href = qrUrl;
        a.download = `QR-${m.ticketCode}-${m.childName}.png`;
        a.click();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-[#00132B] border border-[#25D366]/40 rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto text-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="sticky top-0 bg-[#00132B]/95 border-b border-white/10 p-5 sm:p-6 flex items-center justify-between z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center font-bold">
              <MessageSquare size={22} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#25D366] block">
                Envío por WhatsApp • Andar FC
              </span>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight">
                Vista Previa de Pases y Mensajes
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
        {familyGroups.length === 0 ? (
          <div className="p-12 text-center text-white/40">
            Cargando listado de familias...
          </div>
        ) : (
          <div className="p-5 sm:p-8 space-y-6">

            {/* Pagination & Family Switcher */}
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-3">
              <button
                onClick={() => setSelectedIndex((prev) => Math.max(0, prev - 1))}
                disabled={selectedIndex === 0}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="text-center">
                <span className="text-xs font-bold text-white/60 uppercase block">
                  Familia {selectedIndex + 1} de {familyGroups.length}
                </span>
                <strong className="text-base font-black text-[#25D366]">
                  {currentFamily.tutorName}
                </strong>
                <span className="text-xs text-white/50 block font-mono">
                  {currentFamily.cleanPhone} ({currentFamily.members.length} {currentFamily.members.length === 1 ? "pase" : "pases"})
                </span>
              </div>

              <button
                onClick={() => setSelectedIndex((prev) => Math.min(familyGroups.length - 1, prev + 1))}
                disabled={selectedIndex === familyGroups.length - 1}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* WhatsApp Bubble Preview */}
            <div className="bg-[#0b141a] border border-[#222d34] rounded-2xl p-4 sm:p-5 relative shadow-inner">
              <div className="flex items-center justify-between mb-3 text-xs border-b border-[#222d34] pb-2">
                <span className="text-[#00a884] font-bold flex items-center gap-1.5">
                  💬 Mensaje a Enviar por WhatsApp:
                </span>
                <button
                  onClick={handleCopyText}
                  className="text-white/70 hover:text-white flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg transition-colors"
                >
                  {copiedId === `text-${currentFamily.id}` ? (
                    <span className="text-[#36b37e] font-bold flex items-center gap-1">
                      <Check size={12} /> Copiado
                    </span>
                  ) : (
                    <>
                      <Copy size={12} /> Copiar Texto
                    </>
                  )}
                </button>
              </div>

              <pre className="text-xs text-[#e9edef] font-sans whitespace-pre-wrap leading-relaxed bg-[#005c4b]/30 p-4 rounded-xl border-l-4 border-[#00a884]">
                {currentFamily.text}
              </pre>
            </div>

            {/* QR Passes Images (1, 2, 3 children QRs) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#36b37e] flex items-center gap-1.5">
                  <QrCode size={16} /> Pases QR Generados para esta familia ({currentFamily.members.length}):
                </span>
                <button
                  onClick={handleDownloadFamilyQRs}
                  className="text-xs font-bold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Download size={14} className="text-[#36b37e]" /> Descargar QR(s)
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentFamily.members.map((m) => (
                  <div key={m._id} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <div className="bg-white p-3 rounded-xl inline-block mb-3 shadow-lg">
                      {qrImagesMap[m.ticketCode] ? (
                        <img 
                          src={qrImagesMap[m.ticketCode]} 
                          alt={m.ticketCode} 
                          className="w-36 h-36 object-contain mx-auto"
                        />
                      ) : (
                        <div className="w-36 h-36 flex items-center justify-center bg-gray-100 text-gray-400">
                          <QrCode size={36} />
                        </div>
                      )}
                    </div>
                    <div className="font-mono font-black text-sm text-[#36b37e] tracking-wider">
                      {m.ticketCode}
                    </div>
                    <div className="font-bold text-white text-xs mt-0.5">
                      {m.childName}
                    </div>
                    <div className="text-[11px] text-white/50">
                      {m.childDni ? `DNI: ${m.childDni}` : ""} {m.childAge ? `(${m.childAge} años)` : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
              <button
                onClick={handleCopyPhone}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                {copiedId === `phone-${currentFamily.id}` ? (
                  <span className="text-[#36b37e] font-bold flex items-center gap-1">
                    <Check size={14} /> Nro Copiado ({currentFamily.cleanPhone})
                  </span>
                ) : (
                  <>
                    <Copy size={14} /> Copiar Nro ({currentFamily.cleanPhone})
                  </>
                )}
              </button>

              <a
                href={currentFamily.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-gradient-to-r from-[#25D366] to-[#20ba5a] hover:from-[#20ba5a] hover:to-[#25D366] text-black font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
              >
                <MessageSquare size={18} />
                <span>Abrir Chat de WhatsApp con Mensaje</span>
                <ExternalLink size={14} />
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
