"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  Plus, 
  Search, 
  Eye, 
  Edit3, 
  Globe, 
  Layout, 
  Clock, 
  ChevronRight,
  Shield,
  LayoutDashboard,
  Settings,
  MoreVertical,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function AdminPagesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchPages();
    }
  }, [status]);

  const fetchPages = async () => {
    try {
      const res = await fetch("/api/admin/pages");
      const data = await res.json();
      if (data.success) {
        setPages(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setLoading(false);
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
      <header className="bg-white/5 border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#E67E22]/20 rounded-2xl flex items-center justify-center">
              <Layout className="text-[#E67E22]" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight uppercase">Gestión de <span className="text-[#E67E22]">Páginas</span></h1>
              <p className="text-white/40 text-[10px] font-black tracking-widest uppercase mt-1">CMS Dinámico - Control de Contenidos</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar página..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:border-[#E67E22]/50 outline-none transition-all placeholder:text-white/20 font-bold"
                />
             </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Info Box */}
        <div className="mb-12 p-8 bg-white/5 border border-white/10 rounded-[32px] flex flex-col md:flex-row items-center gap-8">
           <div className="w-20 h-20 bg-[#36b37e]/20 rounded-full flex items-center justify-center shrink-0">
             <Shield className="text-[#36b37e]" size={32} />
           </div>
           <div>
             <h3 className="text-xl font-black uppercase text-white mb-2">Sistema de Fallbacks (Shadow CMS)</h3>
             <p className="text-white/50 text-sm leading-relaxed max-w-3xl">
               Las páginas listadas aquí representan la estructura completa del sitio. Al "Inicializar" una página, solo se actualiza el contenido textual, manteniendo siempre el diseño premium (Hero, Animaciones, Layout) intacto. Si una página no ha sido editada, el sitio mostrará automáticamente el contenido original de respaldo.
             </p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {(() => {
             const ALL_SITE_PAGES = [
               { slug: "home", name: "Página de Inicio", group: "Principal", path: "/" },
               // Institucional
               { slug: "nosotros", name: "Nosotros", group: "Institucional", path: "/institucional/nosotros" },
               { slug: "historia", name: "Nuestra Historia", group: "Institucional", path: "/institucional/historia" },
               { slug: "comision", name: "Comisión Directiva", group: "Institucional", path: "/institucional/comision" },
               { slug: "equipo", name: "Nuestro Equipo", group: "Institucional", path: "/institucional/equipo" },
               { slug: "aliados", name: "Aliados e Instituciones", group: "Institucional", path: "/institucional/aliados" },
               { slug: "impacto", name: "Impacto Social", group: "Institucional", path: "/institucional/impacto" },
               { slug: "proposito", name: "Propósito", group: "Institucional", path: "/institucional/propósito" },
               { slug: "campo", name: "Nuestro Campo", group: "Institucional", path: "/institucional/campo" },
               { slug: "institucional", name: "Hub Institucional (Resumen)", group: "Institucional", path: "/institucional" },
               // Programas
               { slug: "programas", name: "Programas (Hub)", group: "Programas", path: "/programas" },
               { slug: "escuela", name: "Escuela de Valores", group: "Programas", path: "/programas/escuela" },
               { slug: "festival-latam", name: "Festival LATAM", group: "Programas", path: "/programas/festival-latam" },
               { slug: "liga-ba", name: "Liga Buenos Aires", group: "Programas", path: "/programas/liga-ba" },
               { slug: "liga-nacional", name: "Liga Nacional", group: "Programas", path: "/programas/liga-nacional" },
               { slug: "ligas", name: "Todas las Ligas", group: "Programas", path: "/programas/ligas" },
               // Súmate
               { slug: "sumate", name: "Súmate (Hub)", group: "Súmate", path: "/sumate" },
               { slug: "voluntariado", name: "Voluntariado", group: "Súmate", path: "/sumate/voluntariado" },
               { slug: "alianzas", name: "Alianzas", group: "Súmate", path: "/sumate/alianzas" },
               { slug: "donar", name: "Donaciones", group: "Súmate", path: "/sumate/donar" },
               // Navegación principal / Servicios
               { slug: "contacto", name: "Contacto", group: "Navegación", path: "/contacto" },
               { slug: "canchas", name: "Alquiler de Canchas", group: "Servicios", path: "/canchas" },
               { slug: "inscripcion", name: "Inscripciones a Ligas", group: "Servicios", path: "/inscripcion" },
               // Multimedia
               { slug: "multimedia", name: "Multimedia (Hub)", group: "Multimedia", path: "/multimedia" },
               { slug: "multimedia-fotos", name: "Galería de Fotos", group: "Multimedia", path: "/multimedia/fotos" },
               { slug: "multimedia-videos", name: "Galería de Videos", group: "Multimedia", path: "/multimedia/videos" },
               // Novedades
               { slug: "novedades", name: "Novedades / Prensa", group: "Novedades", path: "/novedades" }
             ];

             const filtered = ALL_SITE_PAGES.filter(p => 
               p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
               p.slug.toLowerCase().includes(searchTerm.toLowerCase())
             );

             return filtered.map((sitePage) => {
               const dbPage = pages.find(p => p.slug === sitePage.slug);
               const isInitialized = !!dbPage;

               return (
                 <div key={sitePage.slug} className={`group bg-[#001A3D]/50 border rounded-3xl p-6 transition-all ${isInitialized ? 'border-white/10 hover:bg-[#001A3D]' : 'border-dashed border-white/5 opacity-80 hover:opacity-100 hover:bg-white/5'}`}>
                    <div className="flex justify-between items-start mb-6">
                       <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-black text-[#E67E22] uppercase tracking-widest">{sitePage.group}</span>
                          <h4 className="text-xl font-black uppercase text-white tracking-tighter">{sitePage.name}</h4>
                          <code className="text-[10px] text-white/30 font-mono tracking-tighter">/{sitePage.slug}</code>
                       </div>
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isInitialized ? 'bg-[#36b37e]/20' : 'bg-white/5'}`}>
                          {isInitialized ? <CheckCircle size={20} className="text-[#36b37e]" /> : <AlertCircle size={20} className="text-white/20" />}
                       </div>
                    </div>

                    <div className="flex flex-col gap-3">
                       <Link 
                         href={`/admin/pages/${sitePage.slug}`}
                         className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isInitialized ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-[#E67E22] hover:bg-[#D35400] text-white shadow-lg shadow-[#E67E22]/20'}`}
                       >
                          <Edit3 size={14} />
                          {isInitialized ? 'Editar Contenido' : 'Inicializar Página'}
                       </Link>
                       <Link 
                         href={sitePage.path}
                         target="_blank"
                         className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest text-white/40 hover:text-white bg-white/0 hover:bg-white/5 transition-all"
                       >
                          <Eye size={14} />
                          Ver en el Sitio
                       </Link>
                    </div>
                 </div>
               );
             });
           })()}
        </div>
      </main>
    </div>
  );
}
