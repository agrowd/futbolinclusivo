"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Mail, Phone, FileText } from "lucide-react";

export default function AdminTeamsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchTeams();
    }
  }, [status]);

  const fetchTeams = async () => {
    try {
      const res = await fetch("/api/inscripcion?limit=100");
      const data = await res.json();
      if (data.success) {
        setTeams(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (teamId, newStatus) => {
    try {
      const res = await fetch(`/api/inscripcion/${teamId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setTeams(teams.map(t => t._id === teamId ? { ...t, status: newStatus } : t));
      }
    } catch (err) {
      console.error("Error updating status", err);
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
              <h1 className="text-2xl font-black tracking-tight">Equipos Inscritos</h1>
              <p className="text-white/50 text-sm mt-1">{teams.length} equipos</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {teams.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/50 text-lg">No hay equipos inscritos</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {teams.map((team) => (
              <div
                key={team._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Users size={20} className="text-[#36b37e]" />
                      <h3 className="text-xl font-black">{team.institutionName}</h3>
                      {team.status === "approved" && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Aprobado</span>}
                      {team.status === "rejected" && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Rechazado</span>}
                      {(!team.status || team.status === "pending") && <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Pendiente</span>}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Mail size={16} />
                        {team.contactEmail}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <Phone size={16} />
                        {team.contactPhone}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-white/40">
                      <span>Liga: {team.league}</span>
                      <span>•</span>
                      <span>{team.players?.length || 0} jugadores</span>
                      <span>•</span>
                      <span>{new Date(team.createdAt).toLocaleDateString()}</span>
                      {team.medicalFileUrl && (
                        <>
                          <span>•</span>
                          <a href={team.medicalFileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                            <FileText size={12} /> Ver Fichas Médicas
                          </a>
                        </>
                      )}
                    </div>

                    {team.isMedicalClearancePending && !team.medicalFileUrl && (
                      <div className="mt-4 inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-lg text-xs font-bold">
                        <FileText size={14} />
                        Pendiente: Entrega Física
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                     <button 
                        onClick={() => handleStatusChange(team._id, "approved")}
                        className="px-4 py-2 bg-green-600/20 text-green-400 text-sm font-bold rounded-lg hover:bg-green-600/40 transition-colors"
                     >
                       Aprobar
                     </button>
                     <button 
                        onClick={() => handleStatusChange(team._id, "rejected")}
                        className="px-4 py-2 bg-red-600/20 text-red-400 text-sm font-bold rounded-lg hover:bg-red-600/40 transition-colors"
                     >
                       Rechazar
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
