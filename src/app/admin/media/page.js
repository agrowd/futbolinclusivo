"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Trash2, ArrowLeft, Image as ImageIcon, Video } from "lucide-react";

export default function AdminMediaPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [uploading, setUploading] = useState(false);

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

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadData.success) {
        alert("Error al subir archivo");
        return;
      }

      const mediaRes = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: file.name,
          type: file.type.startsWith("image/") ? "image" : "video",
          url: uploadData.data.url,
          publicId: uploadData.data.publicId,
          category: "Otros",
        }),
      });

      const mediaData = await mediaRes.json();
      if (mediaData.success) {
        fetchMedia();
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Error al subir archivo");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este archivo?")) return;

    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMedia(media.filter((m) => m._id !== id));
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#000B1A] flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#000B1A] text-white">
      <header className="bg-white/5 border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-white/70 hover:text-white transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Gestión de Multimedia</h1>
              <p className="text-white/50 text-sm mt-1">{media.length} archivos</p>
            </div>
          </div>
          <label className="flex items-center gap-2 bg-[#36b37e] hover:bg-[#2da372] px-6 py-3 rounded-xl transition-all text-sm font-bold cursor-pointer">
            <Plus size={20} />
            {uploading ? "Subiendo..." : "Subir Archivo"}
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              filter === "all" ? "bg-[#36b37e] text-white" : "bg-white/5 hover:bg-white/10"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter("image")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              filter === "image" ? "bg-[#36b37e] text-white" : "bg-white/5 hover:bg-white/10"
            }`}
          >
            Imágenes
          </button>
          <button
            onClick={() => setFilter("video")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              filter === "video" ? "bg-[#36b37e] text-white" : "bg-white/5 hover:bg-white/10"
            }`}
          >
            Videos
          </button>
        </div>

        {media.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/50 text-lg">No hay archivos multimedia</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {media.map((item) => (
              <div
                key={item._id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all group"
              >
                <div className="relative aspect-square bg-white/5">
                  {item.type === "image" ? (
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video size={48} className="text-white/30" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm font-bold truncate">{item.title}</p>
                  <p className="text-xs text-white/40 mt-1">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
