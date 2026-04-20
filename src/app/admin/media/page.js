"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Image as ImageIcon, 
  Video, 
  Upload, 
  X as XIcon, 
  Filter, 
  Grid, 
  MoreVertical,
  Edit2,
  Check,
  AlertCircle,
  Loader2
} from "lucide-react";

const CATEGORIES = [
  "Liga BA",
  "Liga Nacional",
  "Escuela",
  "Festival LATAM",
  "Institucional",
  "Eventos",
  "Otros",
];

export default function AdminMediaPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: "",
    category: "Otros",
    file: null,
    preview: null,
    isExternal: false,
    externalUrl: "",
    externalType: "image",
    featured: false,
    description: ""
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchMedia();
    }
  }, [status, filter]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const url = filter === "all" ? "/api/media?limit=100" : `/api/media?type=${filter}&limit=100`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setMedia(data.data);
      }
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadData({
          ...uploadData,
          file,
          title: file.name.split('.')[0],
          preview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExternalAdd = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: uploadData.title,
          type: uploadData.externalType,
          url: uploadData.externalUrl,
          thumbnailUrl: uploadData.externalType === 'video' 
            ? `https://img.youtube.com/vi/${extractYoutubeId(uploadData.externalUrl)}/hqdefault.jpg`
            : uploadData.preview, // If they uploaded a preview but assigned an external URL
          category: uploadData.category,
          featured: uploadData.featured,
          description: uploadData.description
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Media externo registrado correctamente" });
        setIsUploadModalOpen(false);
        resetForm();
        fetchMedia();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setUploading(false);
    }
  };

  const extractYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const resetForm = () => {
    setUploadData({ 
      title: "", 
      category: "Otros", 
      file: null, 
      preview: null, 
      isExternal: false, 
      externalUrl: "", 
      externalType: "image",
      featured: false,
      description: ""
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (uploadData.isExternal) return handleExternalAdd(e);
    if (!uploadData.file) return;

    setUploading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData();
    formData.append("file", uploadData.file);

    try {
      // Step 1: Upload to Cloudinary
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadResult = await uploadRes.json();
      if (!uploadResult.success) {
        throw new Error(uploadResult.message || "Error al subir archivo");
      }

      // Step 2: Save to DB
      const mediaRes = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: uploadData.title,
          type: uploadData.file.type.startsWith("image/") ? "image" : "video",
          url: uploadResult.data.url,
          publicId: uploadResult.data.publicId,
          category: uploadData.category,
          featured: uploadData.featured,
          description: uploadData.description,
          width: uploadResult.data.width,
          height: uploadResult.data.height,
          size: uploadResult.data.size,
          format: uploadResult.data.format,
        }),
      });

      const dbData = await mediaRes.json();
      if (dbData.success) {
        setMessage({ type: "success", text: "Archivo subido correctamente" });
        setIsUploadModalOpen(false);
        resetForm();
        fetchMedia();
      } else {
        throw new Error(dbData.message || "Error al registrar en DB");
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este archivo? Esto también lo borrará de Cloudinary.")) return;

    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMedia(media.filter((m) => m._id !== id));
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  if (status === "loading" || (loading && media.length === 0)) {
    return (
      <div className="min-h-screen bg-[#000B1A] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#36b37e]" size={48} />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#000B1A] text-white">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-white/70 hover:text-white transition-colors bg-white/5 p-2 rounded-lg">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-black tracking-tight flex items-center gap-2 uppercase">
                MULTIMEDIA
                <span className="bg-[#2980B9]/10 text-[#2980B9] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#2980B9]/20">CLOUDINARY</span>
              </h1>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">Gestión de Galería, Prensa y Documentos</p>
            </div>
          </div>

          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 bg-[#36b37e] hover:bg-[#2da372] text-white px-8 py-3 rounded-xl text-sm font-black tracking-widest transition-all uppercase shadow-lg shadow-[#36b37e]/20"
          >
            <Upload size={18} />
            Subir Archivo
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Filters and Stats */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
           <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-2xl border border-white/10">
              <button 
                onClick={() => setFilter("all")}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-[#36b37e] text-white' : 'text-white/40 hover:text-white'}`}
              >
                Todos
              </button>
              <button 
                onClick={() => setFilter("image")}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'image' ? 'bg-[#36b37e] text-white' : 'text-white/40 hover:text-white'}`}
              >
                Fotos
              </button>
              <button 
                onClick={() => setFilter("video")}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === 'video' ? 'bg-[#36b37e] text-white' : 'text-white/40 hover:text-white'}`}
              >
                Videos
              </button>
           </div>
           
           <div className="text-right">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Archivos Encontrados</p>
              <p className="text-3xl font-black text-[#36b37e]">
                 {media.length} <span className="text-white/20 text-sm font-bold uppercase">Items</span>
              </p>
           </div>
        </div>

        {/* Media Grid */}
        {media.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white/2 border-2 border-dashed border-white/5 rounded-[40px]">
             <ImageIcon size={64} className="text-white/10 mb-6" />
             <h3 className="text-xl font-black text-white/40 uppercase tracking-tight">No se encontraron archivos</h3>
             <p className="text-white/20 text-sm font-bold uppercase mt-2">Prueba cambiando el filtro o sube uno nuevo</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {media.map((item) => (
              <div 
                key={item._id} 
                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all hover:scale-[1.02] hover:shadow-2xl shadow-black/50"
              >
                <div className="relative aspect-square overflow-hidden bg-black/40">
                  {item.type === "image" ? (
                    <Image 
                      src={item.url} 
                      alt={item.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 50vw, 20vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-500/10 to-red-900/20">
                      <Video size={48} className="text-red-500/40" />
                    </div>
                  )}
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                     <button 
                       onClick={() => handleDelete(item._id)}
                       className="p-3 bg-red-500 hover:bg-red-400 text-white rounded-xl transition-all hover:rotate-6 scale-90 group-hover:scale-100"
                       title="Eliminar permanentemente"
                     >
                        <Trash2 size={20} />
                     </button>
                     <Link 
                       href={item.url} 
                       target="_blank"
                       className="text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-white"
                     >
                        Ver Original
                     </Link>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                     <span className="bg-black/50 backdrop-blur-md text-white/70 text-[9px] font-black px-2 py-0.5 rounded leading-none uppercase border border-white/10">
                        {item.category}
                     </span>
                     {item.type === "video" && (
                       <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded leading-none uppercase inline-flex items-center gap-1">
                          <Video size={8} /> VIDEO
                       </span>
                     )}
                  </div>
                </div>
                
                <div className="p-4 bg-white/5 border-t border-white/5">
                   <h3 className="text-xs font-black truncate text-white/80 group-hover:text-[#36b37e] transition-colors">{item.title}</h3>
                   <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-1">
                      {item.format?.toUpperCase() || "WEBP"} • {item.size ? (item.size / 1024).toFixed(0) + " KB" : "CLOUD"}
                   </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#000B1A]/80 backdrop-blur-xl transition-all">
           <div className="bg-white/5 border border-white/10 w-full max-w-xl rounded-[40px] overflow-hidden shadow-2xl relative">
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors"
              >
                 <XIcon size={24} />
              </button>

              <form onSubmit={handleUpload} className="p-10 space-y-8">
                 <div className="text-center">
                    <h2 className="text-2xl font-black uppercase tracking-tight">Cargar Multimedia</h2>
                    <p className="text-white/40 text-xs font-medium uppercase mt-1 tracking-widest">Sincronizado con Cloudinary CDN</p>
                    
                    {/* Toggle External/Upload */}
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 mt-6">
                      <button
                        type="button"
                        onClick={() => setUploadData({ ...uploadData, isExternal: false })}
                        className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${!uploadData.isExternal ? 'bg-[#36b37e] text-white' : 'text-white/40'}`}
                      >
                        Subir Archivo
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadData({ ...uploadData, isExternal: true })}
                        className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${uploadData.isExternal ? 'bg-[#36b37e] text-white' : 'text-white/40'}`}
                      >
                        Link Externo (YouTube/URL)
                      </button>
                    </div>

                    {/* Dropzone / File Select */}
                    {!uploadData.isExternal ? (
                      !uploadData.file ? (
                        <label className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-white/10 rounded-3xl hover:border-[#36b37e]/50 hover:bg-[#36b37e]/5 transition-all cursor-pointer group mt-6">
                           <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                              <Plus size={32} className="text-white/20 group-hover:text-[#36b37e]" />
                           </div>
                           <span className="text-sm font-black uppercase tracking-tight">Seleccionar Archivo</span>
                           <span className="text-[10px] font-medium text-white/20 uppercase mt-2">Imagen o Video (Máx 100MB)</span>
                           <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileSelect} />
                        </label>
                      ) : (
                        <div className="flex flex-col items-center gap-6 mt-6">
                           <div className="relative w-40 h-40 rounded-3xl overflow-hidden border-2 border-[#36b37e] shadow-2xl shadow-[#36b37e]/10">
                              {uploadData.file.type.startsWith("image/") ? (
                                <img src={uploadData.preview} alt="Preview" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-black/40">
                                   <Video size={48} className="text-[#36b37e]" />
                                </div>
                              )}
                              <button 
                                type="button"
                                onClick={() => setUploadData({ ...uploadData, file: null, preview: null })}
                                className="absolute top-2 right-2 p-1 bg-black/60 rounded-lg hover:bg-black text-white transition-colors"
                              >
                                 <XIcon size={14} />
                              </button>
                           </div>
                        </div>
                      )
                    ) : (
                      <div className="space-y-6 mt-6 text-left">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-2">Tipo de Medio Externo</label>
                            <div className="flex gap-4">
                               {['image', 'video', 'gallery'].map(t => (
                                 <button
                                   key={t}
                                   type="button"
                                   onClick={() => setUploadData({ ...uploadData, externalType: t })}
                                   className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase border transition-all ${uploadData.externalType === t ? 'bg-white/10 border-[#36b37e] text-[#36b37e]' : 'border-white/5 text-white/40'}`}
                                 >
                                   {t}
                                 </button>
                               ))}
                            </div>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-2">URL del Recurso (YouTube, Imgur, etc.)</label>
                            <input 
                              type="text" 
                              required
                              placeholder="https://..."
                              value={uploadData.externalUrl}
                              onChange={(e) => setUploadData({ ...uploadData, externalUrl: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:border-[#36b37e]/50 outline-none transition-all"
                            />
                         </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                       <div className="space-y-2 text-left">
                          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-2">Título del Medio</label>
                          <input 
                            type="text" 
                            required
                            value={uploadData.title}
                            onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:border-[#36b37e]/50 outline-none transition-all"
                          />
                       </div>
                       <div className="space-y-2 text-left">
                          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-2">Categoría</label>
                          <select 
                            value={uploadData.category}
                            onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:border-[#36b37e]/50 outline-none transition-all"
                          >
                             {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                          </select>
                       </div>
                    </div>

                    <div className="space-y-2 text-left mt-4">
                       <label className="text-[10px] font-black text-white/40 uppercase tracking-widest px-2">Descripción (Opcional)</label>
                       <textarea 
                         value={uploadData.description}
                         onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                         className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:border-[#36b37e]/50 outline-none transition-all h-20"
                       />
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 mt-4">
                       <input 
                          type="checkbox"
                          checked={uploadData.featured}
                          onChange={(e) => setUploadData({ ...uploadData, featured: e.target.checked })}
                          className="w-5 h-5 rounded border-white/10 bg-white/5 accent-[#36b37e]"
                       />
                       <div className="flex items-center gap-2">
                          <Star size={16} className={uploadData.featured ? "text-[#36b37e]" : "text-white/20"} />
                          <span className="text-xs font-black uppercase tracking-widest text-white/70">Marcar como contenido destacado</span>
                       </div>
                    </div>
                 </div>

                 {message.text && (
                    <div className={`p-4 rounded-2xl flex items-center gap-3 border ${message.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}>
                       {message.type === 'error' ? <AlertCircle size={20} /> : <Check size={20} />}
                       <span className="text-xs font-bold uppercase">{message.text}</span>
                    </div>
                 )}

                 <button 
                   disabled={!uploadData.file || uploading}
                   className="w-full bg-[#36b37e] hover:bg-[#2da372] disabled:opacity-50 disabled:grayscale text-white py-4 rounded-2xl text-sm font-black tracking-widest transition-all uppercase shadow-xl shadow-[#36b37e]/20"
                 >
                    {uploading ? (
                      <span className="flex items-center justify-center gap-3">
                         <Loader2 size={18} className="animate-spin" /> PROCESANDO...
                      </span>
                    ) : "Confirmar Subida"}
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
