"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Eye, EyeOff, Upload, Loader2 } from "lucide-react";
import RichTextEditor from "@/components/ui/RichTextEditor";

export default function EditNewsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    category: "Novedades",
    published: false,
    featured: false,
    tags: "",
  });
  const [loadingNews, setLoadingNews] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && id) {
      console.log("[LOG-NEWS-EDIT-01] Loading params ID:", id);
      fetchNewsItem();
    }
  }, [status, id]);

  const fetchNewsItem = async () => {
    try {
      console.log("[LOG-NEWS-EDIT-02] Fetching news item data for ID:", id);
      setLoadingNews(true);
      const res = await fetch(`/api/news/${id}`);
      const data = await res.json();
      
      if (data.success && data.data) {
        console.log("[LOG-NEWS-EDIT-03] News item data successfully fetched:", data.data);
        const item = data.data;
        setFormData({
          title: item.title || "",
          slug: item.slug || "",
          excerpt: item.excerpt || "",
          content: item.content || "",
          image: item.image || "",
          category: item.category || "Novedades",
          published: item.published || false,
          featured: item.featured || false,
          tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
        });
      } else {
        alert("Error al cargar la noticia: No encontrada");
        router.push("/admin/news");
      }
    } catch (error) {
      console.error("Error loading news item:", error);
      alert("Error al cargar la noticia");
      router.push("/admin/news");
    } finally {
      setLoadingNews(false);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (title) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.data.url }));
      } else {
        alert("Error al subir imagen");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Error al subir imagen");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        image: formData.image || null, // Convert empty string to null for optional URL matching
      };

      console.log("[LOG-NEWS-EDIT-04] Initializing news update request. Payload:", payload);

      const res = await fetch(`/api/news/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("[LOG-NEWS-EDIT-05] News update response received:", data);

      if (data.success) {
        router.push("/admin/news");
      } else {
        alert(data.message || "Error al actualizar noticia");
      }
    } catch (error) {
      console.error("Error saving:", error);
      alert("Error al actualizar noticia");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || (status === "authenticated" && loadingNews)) {
    return (
      <div className="min-h-screen bg-[#000B1A] flex items-center justify-center">
        <div className="text-white text-xl flex items-center gap-3">
          <Loader2 className="animate-spin" />
          Cargando noticia...
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#000B1A] text-white">
      <header className="bg-white/5 border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/news" className="text-white/70 hover:text-white transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-black tracking-tight">Editar Noticia</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-black mb-6">Información Básica</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Título *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#36b37e] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Slug (URL)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#36b37e] focus:outline-none"
                  required
                />
                <p className="text-xs text-white/40 mt-2">URL: /novedades/{formData.slug}</p>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Extracto *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#36b37e] focus:outline-none h-24"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Contenido (Editor Visual) *</label>
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-[#36b37e] transition-colors">
                  <RichTextEditor
                    value={formData.content}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#36b37e] focus:outline-none"
                >
                  <option value="Novedades">Novedades</option>
                  <option value="Liga de Buenos Aires">Liga de Buenos Aires</option>
                  <option value="Liga Nacional">Liga Nacional</option>
                  <option value="Escuela">Escuela</option>
                  <option value="Festival LATAM">Festival LATAM</option>
                  <option value="Institucional">Institucional</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Tags (separados por coma)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#36b37e] focus:outline-none"
                  placeholder="fútbol, inclusión, liga"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-black mb-6">Imagen Destacada</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Subir Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#36b37e] file:text-white file:font-bold hover:file:bg-[#2da372]"
                />
              </div>

              {formData.image && (
                <div className="relative w-full h-64 rounded-xl overflow-hidden">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-black mb-6">Opciones de Publicación</h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 rounded bg-white/5 border-white/10"
                />
                <span className="flex items-center gap-2">
                  {formData.published ? <Eye size={18} /> : <EyeOff size={18} />}
                  Publicar inmediatamente
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 rounded bg-white/5 border-white/10"
                />
                <span>Marcar como destacada</span>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex-1 bg-[#36b37e] hover:bg-[#2da372] px-8 py-4 rounded-xl font-black uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save size={20} />
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
            <Link
              href="/admin/news"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
