"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Trash2, 
  Globe, 
  Layout, 
  Info,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Settings,
  PlusCircle,
  XCircle
} from "lucide-react";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { CMS_PAGE_CONFIGS } from "@/config/cmsPages";
import * as Icons from "lucide-react";

export default function AdminPageEditor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  const [formData, setFormData] = useState({
    title: "",
    slug: slug || "",
    content: "",
    section: "institucional",
    published: true,
    metadata: {
      metaTitle: "",
      metaDescription: ""
    },
    data: {}
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchPageData();
    }
  }, [status, slug]);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/pages/${slug}`);
      const data = await res.json();
      
      if (data.success) {
        setFormData({
          ...data.data,
          data: data.data.data || {}
        });
        setIsNew(false);
      } else {
        if (data.fallbackData) {
          setFormData(prev => ({
            ...prev,
            title: data.fallbackData.title || slug.charAt(0).toUpperCase() + slug.slice(1),
            slug: slug,
            content: data.fallbackData.content || "",
            excerpt: data.fallbackData.excerpt || "",
            section: data.fallbackData.section || "institucional",
            data: data.fallbackData.data || {}
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            title: slug.charAt(0).toUpperCase() + slug.slice(1),
            slug: slug,
            data: {}
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching page data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (publishedStatus) => {
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const url = isNew ? "/api/admin/pages" : `/api/admin/pages/${slug}`;
      const method = isNew ? "POST" : "PATCH";

      const payload = { ...formData, published: publishedStatus };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setFormData(payload);
        setMessage({ type: "success", text: publishedStatus ? "Página publicada exitosamente" : "Borrador guardado exitosamente" });
        if (isNew) setIsNew(false);
      } else {
        setMessage({ type: "error", text: data.message || "Error al guardar" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error de conexión con el servidor" });
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#000B1A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E67E22]"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#000B1A] text-white">
      <form onSubmit={(e) => e.preventDefault()}>
        <header className="bg-white/5 border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Link href="/admin/pages" className="text-white/70 hover:text-white transition-colors bg-white/5 p-2 rounded-lg">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-2xl font-black tracking-tight uppercase">
                  {isNew ? "Inicializando: " : "Editando: "} <span className="text-[#E67E22]">{slug}</span>
                </h1>
                <p className="text-white/40 text-[10px] font-black tracking-widest mt-1">Ruta Pública: /{formData.section}/{slug}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
                <button 
                  type="button"
                  onClick={async () => {
                    const { CMS_FALLBACKS } = await import("@/lib/cmsFallbacks");
                    const fb = CMS_FALLBACKS[slug];
                    if (fb && confirm("¿Estás seguro de que quieres restaurar los campos originales de esta página? Se perderán los cambios no guardados.")) {
                      setFormData(prev => ({
                        ...prev,
                        title: fb.title || prev.title,
                        content: fb.content || prev.content,
                        excerpt: fb.excerpt || prev.excerpt,
                        data: { ...prev.data, ...fb.data }
                      }));
                    }
                  }}
                  className="flex items-center gap-2 bg-white/5 hover:bg-[#E67E22]/20 text-white/70 hover:text-[#E67E22] px-5 py-3 rounded-xl text-xs font-black tracking-widest transition-all uppercase border border-white/5 hover:border-[#E67E22]/30"
                >
                  <Icons.RotateCcw size={18} />
                  Restaurar Original
                </button>
                <Link
                  href={`/${formData.section}/${slug}`}
                  target="_blank"
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-5 py-3 rounded-xl text-sm font-black tracking-widest transition-all uppercase"
                >
                  <ExternalLink size={18} />
                  Previsualizar
                </Link>
               <button 
                 type="button"
                 onClick={() => handleSave(false)}
                 disabled={saving}
                 className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl text-sm font-black tracking-widest transition-all uppercase disabled:opacity-50"
               >
                 <Save size={18} />
                 {saving ? "..." : "Guardar Borrador"}
               </button>
               <button 
                 type="button"
                 onClick={() => handleSave(true)}
                 disabled={saving}
                 className="flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white px-8 py-3 rounded-xl text-sm font-black tracking-widest transition-all uppercase shadow-lg shadow-[#10b981]/20 disabled:opacity-50"
               >
                 <Globe size={18} />
                 {saving ? "..." : "Publicar"}
               </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-start gap-4">
            <Info size={24} className="text-blue-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-1">Editor de Contenido Interactivo</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                Selecciona en el recuadro inferior y utiliza la barra de herramientas superior (lapicito, negritas, links) para formatear tu texto. 
                Los cambios reemplazarán el código original al hacer clic en <strong>Publicar</strong>. Si quieres ver cómo quedará, haz clic en <strong className="text-white">Previsualizar</strong> arriba a la derecha.
              </p>
            </div>
          </div>
          {message.text && (
            <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
               {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
               <span className="text-sm font-bold">{message.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10">
            {/* Main Content Area */}
            <div className="space-y-8">
               <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Título de la Página (Hero)</label>
                    <input 
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-xl font-black focus:border-[#E67E22]/50 outline-none transition-all placeholder:text-white/10"
                      placeholder="Ej: Nuestra Historia"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Slug (URL)</label>
                    <input 
                      type="text"
                      value={formData.slug}
                      disabled
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-6 text-sm font-mono text-white/30 cursor-not-allowed uppercase"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                       <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Contenido Principal (Editor Visual)</label>
                       <span className="text-[10px] font-bold text-[#36b37e] bg-[#36b37e]/10 px-2 py-0.5 rounded">WYSIWYG Activo</span>
                    </div>
                    <RichTextEditor 
                      value={formData.content}
                      onChange={(value) => setFormData({ ...formData, content: value })}
                    />
                  </div>
               </div>

               {/* Secciones Personalizadas (Estructura Avanzada) */}
               {CMS_PAGE_CONFIGS[slug] && (
                 <div className="bg-[#001A3D]/40 border border-[#36b37e]/30 rounded-3xl p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3">
                       <div className="w-12 h-12 bg-[#36b37e]/20 rounded-2xl flex items-center justify-center">
                          <Settings size={22} className="text-[#36b37e]" />
                       </div>
                       <div>
                          <h3 className="text-xl font-black uppercase text-white tracking-tight">Estructura Avanzada</h3>
                          <p className="text-[10px] font-black text-[#36b37e] uppercase tracking-widest leading-none mt-1">Campos específicos de esta página</p>
                       </div>
                    </div>

                    <div className="grid gap-6">
                       {CMS_PAGE_CONFIGS[slug].fields.map((field) => (
                         <div key={field.id} className="p-6 bg-white/2 border border-white/5 rounded-2xl">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3 block">{field.label}</label>
                            
                            {field.type === "text" && (
                              <input 
                                type="text"
                                value={formData.data?.[field.id] || ""}
                                onChange={(e) => setFormData({
                                  ...formData,
                                  data: { ...formData.data, [field.id]: e.target.value }
                                })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-[#36b37e]/50 outline-none transition-all placeholder:text-white/10"
                                placeholder={field.placeholder}
                              />
                            )}

                            {field.type === "textarea" && (
                              <textarea 
                                value={formData.data?.[field.id] || ""}
                                onChange={(e) => setFormData({
                                  ...formData,
                                  data: { ...formData.data, [field.id]: e.target.value }
                                })}
                                rows={3}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-[#36b37e]/50 outline-none resize-none transition-all placeholder:text-white/10"
                                placeholder={field.placeholder}
                              />
                            )}

                            {field.type === "array" && (
                              <div className="space-y-4">
                                {(formData.data?.[field.id] || []).map((item, idx) => (
                                  <div key={idx} className="relative p-6 bg-white/5 border border-white/10 rounded-2xl group/item">
                                    <button 
                                      type="button"
                                      onClick={() => {
                                        const newArr = [...(formData.data[field.id] || [])];
                                        newArr.splice(idx, 1);
                                        setFormData({ ...formData, data: { ...formData.data, [field.id]: newArr } });
                                      }}
                                      className="absolute -top-3 -right-3 text-red-500 hover:text-red-400 opacity-0 group-hover/item:opacity-100 transition-opacity bg-[#000B1A] border border-white/10 rounded-full p-1 z-10"
                                    >
                                      <Icons.XCircle size={20} />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {field.itemFields.map(sub => (
                                        <div key={sub.id}>
                                          <label className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1 block">{sub.label}</label>
                                          <input 
                                            type="text"
                                            value={item[sub.id] || ""}
                                            onChange={(e) => {
                                              const newArr = [...(formData.data[field.id] || [])];
                                              newArr[idx] = { ...item, [sub.id]: e.target.value };
                                              setFormData({ ...formData, data: { ...formData.data, [field.id]: newArr } });
                                            }}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-[11px] focus:border-[#36b37e]/50 outline-none transition-all placeholder:text-white/5"
                                            placeholder={sub.placeholder}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                                <button 
                                  type="button"
                                  onClick={() => {
                                    const newArr = [...(formData.data?.[field.id] || []), {}];
                                    setFormData({ ...formData, data: { ...formData.data, [field.id]: newArr } });
                                  }}
                                  className="flex items-center justify-center gap-2 w-full bg-[#36b37e]/5 hover:bg-[#36b37e]/10 border border-dashed border-[#36b37e]/30 text-[10px] font-black uppercase tracking-widest text-[#36b37e] transition-all py-4 rounded-xl"
                                >
                                  <PlusCircle size={16} /> Añadir Item
                                </button>
                              </div>
                            )}
                         </div>
                       ))}
                    </div>
                 </div>
               )}
            </div>

            {/* Sidebar Settings */}
            <div className="space-y-6">
               <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                  <h3 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                     <Layout size={14} className="text-[#E67E22]" /> Estado y Sección
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Sección</label>
                      <select 
                        value={formData.section}
                        onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-[#E67E22]/50 outline-none"
                      >
                        <option value="institucional">Institucional</option>
                        <option value="programas">Programas</option>
                        <option value="sumate">Súmate</option>
                        <option value="navegacion">Navegación</option>
                        <option value="servicios">Servicios</option>
                        <option value="multimedia">Multimedia</option>
                        <option value="otros">Otros</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                       <div>
                          <p className="text-xs font-black uppercase tracking-tight">Estado Actual</p>
                          <p className="text-[10px] text-white/40">{formData.published ? 'Visible en el sitio web' : 'Oculto (Borrador)'}</p>
                       </div>
                       <div className={`px-3 py-1 rounded-full text-xs font-black uppercase ${formData.published ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-white/10 text-white/50'}`}>
                          {formData.published ? 'Publicado' : 'Borrador'}
                       </div>
                    </div>
                  </div>
               </div>

               <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                  <h3 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                     <Globe size={14} className="text-[#E67E22]" /> Optimización SEO
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Meta Title</label>
                      <input 
                        type="text"
                        value={formData.metadata?.metaTitle || ""}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          metadata: { ...formData.metadata, metaTitle: e.target.value } 
                        })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:border-[#E67E22]/50 outline-none"
                        placeholder="Título para buscadores..."
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Meta Description</label>
                      <textarea 
                        value={formData.metadata?.metaDescription || ""}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          metadata: { ...formData.metadata, metaDescription: e.target.value } 
                        })}
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:border-[#E67E22]/50 outline-none resize-none"
                        placeholder="Descripción corta para buscadores..."
                      />
                    </div>
                  </div>
               </div>

               <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl flex gap-3">
                  <Info size={20} className="text-blue-400 shrink-0" />
                  <p className="text-[10px] text-blue-400/80 leading-relaxed font-bold uppercase tracking-tight">
                    El contenido que guardes aquí se renderizará dinámicamente. 
                    Si es la primera vez que inicializas esta página, asegúrate de copiar 
                    el contenido original si deseas mantenerlo como base.
                  </p>
               </div>
            </div>
          </div>
        </main>
      </form>
    </div>
  );
}
