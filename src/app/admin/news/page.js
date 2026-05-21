"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function AdminNewsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchNews();
    }
  }, [status]);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news?limit=100");
      const data = await res.json();
      if (data.success) {
        setNews(data.data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta noticia?")) return;

    setDeleting(id);
    try {
      console.log("[LOG-NEWS-DELETE-01] Requesting deletion for news ID:", id);
      const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
      if (res.ok) {
        console.log("[LOG-NEWS-DELETE-02] News item successfully deleted:", id);
        setNews(news.filter((n) => n._id !== id));
      } else {
        alert("Error al eliminar");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Error al eliminar");
    } finally {
      setDeleting(null);
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
              <h1 className="text-2xl font-black tracking-tight">Gestión de Noticias</h1>
              <p className="text-white/50 text-sm mt-1">{news.length} noticias</p>
            </div>
          </div>
          <Link
            href="/admin/news/new"
            className="flex items-center gap-2 bg-[#36b37e] hover:bg-[#2da372] px-6 py-3 rounded-xl transition-all text-sm font-bold"
          >
            <Plus size={20} />
            Nueva Noticia
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {news.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/50 text-lg mb-6">No hay noticias creadas</p>
            <Link
              href="/admin/news/new"
              className="inline-flex items-center gap-2 bg-[#36b37e] hover:bg-[#2da372] px-8 py-4 rounded-xl transition-all font-bold"
            >
              <Plus size={20} />
              Crear Primera Noticia
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {news.map((item) => (
              <div
                key={item._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-black text-[#36b37e] uppercase tracking-wider">
                        {item.category}
                      </span>
                      {item.published ? (
                        <span className="flex items-center gap-1 text-xs text-green-400">
                          <Eye size={14} />
                          Publicada
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-white/40">
                          <EyeOff size={14} />
                          Borrador
                        </span>
                      )}
                      {item.featured && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                          Destacada
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-black mb-2">{item.title}</h3>
                    <p className="text-white/50 text-sm mb-3 line-clamp-2">{item.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{item.views || 0} vistas</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/news/edit/${item._id}`}
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                      title="Editar"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={deleting === item._id}
                      className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all disabled:opacity-50"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
