"use client";

import { useState, useRef } from "react";
import { X, Upload, Image as ImageIcon, Sparkles, CheckCircle2, AlertCircle, Trash2, FolderPlus, Link as LinkIcon } from "lucide-react";

const CATEGORIES = [
  "Superliga AFA",
  "Liga BA",
  "Liga Nacional",
  "Escuela",
  "Festival LATAM",
  "Institucional",
  "Eventos",
  "Otros",
];

export default function AlbumCreateModal({ isOpen, onClose, onCreated }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Superliga AFA");
  const [eventDate, setEventDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [featured, setFeatured] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFilesAdded = (filesList) => {
    const validFiles = Array.from(filesList).filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length === 0) return;

    setSelectedFiles((prev) => [...prev, ...validFiles]);

    // Generate thumbnails
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, { name: file.name, src: reader.result }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFilesAdded(e.dataTransfer.files);
    }
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Por favor ingresá un título para el álbum.");
      return;
    }

    if (selectedFiles.length === 0 && !driveLink.trim()) {
      setError("Seleccioná al menos 1 foto para el álbum o pegá un enlace de Google Drive.");
      return;
    }

    try {
      setUploading(true);
      let uploadedPhotos = [];

      // If files selected, upload in batch
      if (selectedFiles.length > 0) {
        setUploadProgress(10);
        const formData = new FormData();
        selectedFiles.forEach((file) => {
          formData.append("files", file);
        });

        setUploadProgress(30);
        const uploadRes = await fetch("/api/upload/batch", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.message || "Error al subir lote de fotos");
        }

        setUploadProgress(80);
        uploadedPhotos = uploadData.data.map((item, idx) => ({
          url: item.url,
          publicId: item.publicId,
          caption: `${title} - Foto #${idx + 1}`,
          width: item.width,
          height: item.height,
          size: item.size,
        }));
      }

      // Create Album document
      const albumPayload = {
        title: title.trim(),
        category,
        eventDate,
        description: description.trim(),
        driveLink: driveLink.trim(),
        featured,
        photos: uploadedPhotos,
        coverImage: uploadedPhotos.length > 0 ? uploadedPhotos[0].url : "",
      };

      const res = await fetch("/api/albums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(albumPayload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error al guardar el álbum");
      }

      setUploadProgress(100);
      if (onCreated) onCreated(data.data);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || "Ocurrió un error inesperado.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-[#00132B] border border-white/15 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto text-white shadow-2xl flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#00132B]/95 border-b border-white/10 p-5 sm:p-6 flex items-center justify-between z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#36b37e]/20 text-[#36b37e] flex items-center justify-center font-bold">
              <FolderPlus size={22} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#36b37e] block">
                Galería Multimedia
              </span>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight">
                Crear Nuevo Álbum de Evento
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
          {error && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
              <AlertCircle size={20} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-black uppercase text-white/60 tracking-wider mb-2">
                Título del Evento / Álbum *
              </label>
              <input
                type="text"
                placeholder="Ej: Superliga Inclusiva en AFA - Sábado 23/08"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#36b37e] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-white/60 tracking-wider mb-2">
                Categoría / Torneo
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#001D3D] border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#36b37e] transition-colors"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-white/60 tracking-wider mb-2">
                Fecha del Evento
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#36b37e] transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-black uppercase text-white/60 tracking-wider mb-2">
                Link de Google Drive (Opcional)
              </label>
              <div className="relative">
                <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="url"
                  placeholder="https://drive.google.com/drive/folders/..."
                  value={driveLink}
                  onChange={(e) => setDriveLink(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#36b37e] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* DRAG & DROP BATCH UPLOAD AREA */}
          <div>
            <label className="block text-xs font-black uppercase text-white/60 tracking-wider mb-2">
              Subida Masiva de Fotos (Arrastrá múltiples archivos)
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                isDragging
                  ? "border-[#36b37e] bg-[#36b37e]/10 scale-[1.01]"
                  : "border-white/15 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFilesAdded(e.target.files)}
                className="hidden"
              />
              <div className="w-14 h-14 rounded-2xl bg-[#36b37e]/20 text-[#36b37e] flex items-center justify-center shadow-lg">
                <Upload size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Hacé clic acá o arrastrá las fotos del evento (múltiples archivos)
                </p>
                <p className="text-xs text-white/40 mt-1">
                  Soporta JPG, PNG, WEBP. Podés seleccionar decenas de fotos juntas.
                </p>
              </div>
            </div>
          </div>

          {/* PREVIEW THUMBNAILS GRID */}
          {previews.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-[#36b37e]">
                  Fotos seleccionadas ({previews.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFiles([]);
                    setPreviews([]);
                  }}
                  className="text-xs text-red-400 hover:text-red-300 font-bold"
                >
                  Vaciar selección
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 max-h-48 overflow-y-auto p-2 bg-black/20 rounded-2xl border border-white/10">
                {previews.map((prev, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10">
                    <img src={prev.src} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(idx);
                      }}
                      className="absolute top-1 right-1 p-1 rounded-lg bg-black/70 text-white/80 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* UPLOAD PROGRESS BAR */}
          {uploading && (
            <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#36b37e]">Procesando y creando álbum...</span>
                <span className="text-white">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#36b37e] to-[#2980B9] h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Footer Submit Button */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#36b37e] to-[#27ae60] hover:from-[#2ecc71] hover:to-[#219653] text-black font-black text-sm uppercase tracking-wider transition-all shadow-lg shadow-[#36b37e]/20 disabled:opacity-50 flex items-center gap-2"
            >
              {uploading ? (
                <>Subiendo álbum...</>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  <span>Publicar Álbum</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
