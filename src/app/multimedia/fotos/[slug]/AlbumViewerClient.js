"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Download, Share2, Check, ZoomIn, Camera } from "lucide-react";

export default function AlbumViewerClient({ album }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [copied, setCopied] = useState(false);

  const photos = album.photos || [];
  const photographer = album.photographer || (album.title ? album.title.match(/@([a-zA-Z0-9_.]+)/)?.[0] : null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, photos.length]);

  const handleShareWhatsApp = () => {
    const albumUrl = window.location.href;
    const text = `📸 *Mirá las fotos oficiales de ${album.title}* en la web de Fútbol Inclusivo ⚽\n👉 ${albumUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPhoto = async (photoUrl, photoName) => {
    try {
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${photoName || "Foto-Futbol-Inclusivo"}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(photoUrl, "_blank");
    }
  };

  if (photos.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center text-white/50">
        No hay fotos cargadas aún en este álbum.
      </div>
    );
  }

  const activePhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  return (
    <>
      {/* Top Action Bar */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-black uppercase tracking-wider text-[#36b37e]">
          Mostrando {photos.length} imágenes
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 text-xs font-bold transition-all border border-white/10"
          >
            {copied ? <Check size={14} className="text-[#36b37e]" /> : <Share2 size={14} />}
            <span>{copied ? "Link Copiado" : "Copiar Link"}</span>
          </button>
          <button
            onClick={handleShareWhatsApp}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-xs font-bold transition-all border border-[#25D366]/40"
          >
            <Share2 size={14} />
            <span>Compartir WhatsApp</span>
          </button>
        </div>
      </div>

      {/* PHOTOS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {photos.map((photo, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className="group relative aspect-4/3 rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#36b37e]/50 cursor-pointer shadow-lg transition-all hover:scale-[1.02]"
          >
            <Image
              src={photo.url}
              alt={photo.caption || `${album.title} - Foto #${idx + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center shadow-lg">
                <ZoomIn size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX FULLSCREEN MODAL */}
      {selectedIndex !== null && activePhoto && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-fade-in cursor-pointer"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between z-10 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-white">
              <span className="text-xs font-black uppercase text-[#36b37e] tracking-widest block">
                {album.title}
              </span>
              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                <span className="text-xs text-white/50">
                  Foto {selectedIndex + 1} de {photos.length}
                </span>
                {photographer && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-black text-pink-300 bg-pink-500/20 px-2 py-0.5 rounded-full border border-pink-500/30">
                    <Camera size={11} />
                    <span>{photographer}</span>
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  handleDownloadPhoto(
                    activePhoto.url,
                    `${album.slug}-foto-${selectedIndex + 1}`
                  )
                }
                className="px-4 py-2 rounded-xl bg-[#36b37e] hover:bg-[#2da372] text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-[#36b37e]/20"
              >
                <Download size={16} />
                <span className="hidden sm:inline">Descargar Foto</span>
              </button>
              <button
                onClick={() => setSelectedIndex(null)}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Main Image Container */}
          <div
            className="relative flex-1 my-4 flex items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              onClick={() =>
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1))
              }
              className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all shadow-2xl hover:scale-110"
              title="Foto anterior"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Photo Image */}
            <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
              <img
                src={activePhoto.url}
                alt={activePhoto.caption || "Foto de Fútbol Inclusivo"}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev < photos.length - 1 ? prev + 1 : 0
                )
              }
              className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white transition-all shadow-2xl hover:scale-110"
              title="Foto siguiente"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Bar / Caption */}
          <div
            className="text-center z-10 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs sm:text-sm text-white/70 font-medium">
              {activePhoto.caption || `${album.title} — Foto #${selectedIndex + 1}`}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
