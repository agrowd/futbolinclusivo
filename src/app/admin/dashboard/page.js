"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Newspaper, 
  Image as ImageIcon, 
  FileText, 
  Users, 
  Calendar,
  TrendingUp,
  LogOut
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    news: 0,
    media: 0,
    teams: 0,
    reservations: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("[DASHBOARD] Usuario no autenticado, redirigiendo a login...");
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [newsRes, mediaRes, teamsRes, reservationsRes, pagesRes] = await Promise.all([
          fetch("/api/news?limit=1"),
          fetch("/api/media?limit=1"),
          fetch("/api/inscripcion?limit=1"),
          fetch("/api/reservas?limit=1"),
          fetch("/api/admin/pages"),
        ]);

        const [news, media, teams, reservations, pagesData] = await Promise.all([
          newsRes.json(),
          mediaRes.json(),
          teamsRes.json(),
          reservationsRes.json(),
          pagesRes.json(),
        ]);

        setStats({
          news: news.pagination?.total || 0,
          media: media.pagination?.total || 0,
          teams: teams.pagination?.total || 0,
          reservations: reservations.pagination?.total || 0,
          pages: pagesData.data?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }

    if (status === "authenticated") {
      fetchStats();
    }
  }, [status]);


  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#000B1A] flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const menuItems = [
    { href: "/admin/news", label: "Noticias", icon: Newspaper, count: stats.news, color: "#36b37e" },
    { href: "/admin/media", label: "Multimedia", icon: ImageIcon, count: stats.media, color: "#2980B9" },
    { href: "/admin/teams", label: "Equipos", icon: Users, count: stats.teams, color: "#8E44AD" },
    { href: "/admin/reservations", label: "Reservas", icon: Calendar, count: stats.reservations, color: "#E74C3C" },
  ];

  return (
    <div className="min-h-screen bg-[#000B1A] text-white">
      <header className="bg-white/5 border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Panel de Administración</h1>
            <p className="text-white/50 text-sm mt-1">Bienvenido, {session.user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              Ver sitio
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-xl transition-all text-sm font-bold"
            >
              <LogOut size={16} />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-black mb-2 tracking-tight">Dashboard</h2>
          <p className="text-white/50">Gestiona todo el contenido del sitio desde aquí</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-3xl p-8 transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex items-start justify-between mb-6">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon size={28} style={{ color: item.color }} />
                </div>
                {item.count > 0 && (
                  <div className="bg-white/10 px-4 py-2 rounded-full">
                    <span className="text-sm font-black">{item.count}</span>
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-black mb-2 group-hover:text-[#36b37e] transition-colors">
                {item.label}
              </h3>
              <p className="text-white/50 text-sm">
                Gestionar {item.label.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#36b37e]/10 to-[#2da372]/5 border border-[#36b37e]/20 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#36b37e] rounded-2xl flex items-center justify-center shrink-0">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black mb-2">Actividad Reciente</h3>
              <p className="text-white/70 mb-4">
                El sistema está funcionando correctamente. Todas las APIs están operativas.
              </p>
              <div className="flex gap-4 text-sm">
                <div className="bg-white/10 px-4 py-2 rounded-xl">
                  <span className="text-white/50">Noticias: </span>
                  <span className="font-bold">{stats.news}</span>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-xl">
                  <span className="text-white/50">Multimedia: </span>
                  <span className="font-bold">{stats.media}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
