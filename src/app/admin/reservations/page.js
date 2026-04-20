"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Search, 
  Filter,
  XCircle,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const courtNames = {
  "cancha-1": "Cancha 1 (Techada)",
  "cancha-2": "Cancha 2 (Descubierta)",
  "cancha-3": "Cancha 3 (Premium)",
};

const courtColors = {
  "cancha-1": "border-blue-500/50 text-blue-400",
  "cancha-2": "border-orange-500/50 text-orange-400",
  "cancha-3": "border-[#36b37e]/50 text-[#36b37e]",
};

export default function AdminReservationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCourt, setFilterCourt] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchReservations();
    }
  }, [status]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/reservas");
      const data = await res.json();
      if (data.success) {
        setReservations(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async (id) => {
    if (!confirm("¿Estás seguro de que deseas anular esta reserva? Esta acción liberará el horario en el calendario público.")) {
      return;
    }

    try {
      const res = await fetch(`/api/reservas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });
      const data = await res.json();
      if (data.success) {
        setReservations(reservations.map(r => r._id === id ? { ...r, status: "cancelled" } : r));
      }
    } catch (err) {
      console.error("Error cancelling reservation", err);
    }
  };

  const filteredReservations = reservations.filter(res => {
    const matchesCourt = filterCourt === "all" || res.courtId === filterCourt;
    const matchesStatus = filterStatus === "all" || res.status === filterStatus;
    return matchesCourt && matchesStatus;
  });

  const stats = {
    total: reservations.length,
    today: reservations.filter(r => new Date(r.date).toDateString() === new Date().toDateString()).length,
    cancelled: reservations.filter(r => r.status === "cancelled").length,
    active: reservations.filter(r => r.status === "confirmed").length,
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#000B1A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#36b37e]"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#000B1A] text-white">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-white/70 hover:text-white transition-colors bg-white/5 p-2 rounded-lg">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                RESERVAS DE CANCHAS
                <span className="bg-[#36b37e]/10 text-[#36b37e] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#36b37e]/20">CRM</span>
              </h1>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">Gestión de alquileres y disponibilidad</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
             <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                <button 
                  onClick={() => setFilterStatus("all")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === "all" ? "bg-[#36b37e] text-white shadow-lg" : "text-white/50 hover:text-white"}`}
                >
                  TODAS
                </button>
                <button 
                  onClick={() => setFilterStatus("confirmed")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === "confirmed" ? "bg-blue-600 text-white shadow-lg" : "text-white/50 hover:text-white"}`}
                >
                  CONFIRMADAS
                </button>
                <button 
                  onClick={() => setFilterStatus("cancelled")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === "cancelled" ? "bg-red-600 text-white shadow-lg" : "text-white/50 hover:text-white"}`}
                >
                  ANULADAS
                </button>
             </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
           {[
             { label: "TOTAL RESERVAS", value: stats.total, icon: Calendar, color: "text-[#36b37e]" },
             { label: "PARA HOY", value: stats.today, icon: Clock, color: "text-blue-400" },
             { label: "ACTIVAS", value: stats.active, icon: CheckCircle2, color: "text-green-400" },
             { label: "ANULADAS", value: stats.cancelled, icon: XCircle, color: "text-red-400" },
           ].map((stat, i) => (
             <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                   <div className="text-[10px] font-black text-white/40 tracking-widest uppercase">{stat.label}</div>
                   <stat.icon size={16} className={stat.color} />
                </div>
                <div className="text-2xl font-black">{stat.value}</div>
             </div>
           ))}
        </div>

        {/* Filters & Actions Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
           <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none lg:w-64">
                 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                 <input 
                   type="text" 
                   placeholder="Buscar contacto..." 
                   className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-[#36b37e]/50 focus:ring-1 focus:ring-[#36b37e]/50 outline-none transition-all"
                 />
              </div>
              <select 
                value={filterCourt}
                onChange={(e) => setFilterCourt(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-sm focus:border-[#36b37e]/50 outline-none cursor-pointer"
              >
                <option value="all">Todas las canchas</option>
                <option value="cancha-1">{courtNames["cancha-1"]}</option>
                <option value="cancha-2">{courtNames["cancha-2"]}</option>
                <option value="cancha-3">{courtNames["cancha-3"]}</option>
              </select>
           </div>
           
           <button 
             onClick={fetchReservations}
             className="text-xs font-black tracking-widest text-[#36b37e] bg-[#36b37e]/10 border border-[#36b37e]/20 px-4 py-2 rounded-xl hover:bg-[#36b37e]/20 transition-all uppercase"
           >
             Refrescar Datos
           </button>
        </div>

        {/* Content */}
        {filteredReservations.length === 0 ? (
          <div className="bg-white/5 border border-white/10 border-dashed rounded-3xl py-20 flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={32} className="text-white/20" />
             </div>
             <p className="text-white/50 font-bold">No se encontraron reservas con los filtros aplicados</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredReservations.map((res) => (
              <div 
                key={res._id}
                className={`group bg-white/5 border rounded-2xl p-5 hover:bg-white/10 transition-all ${res.status === 'cancelled' ? 'border-red-900/20 opacity-60' : 'border-white/10'}`}
              >
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex-1 flex flex-col md:flex-row gap-6">
                    {/* Date/Time Badge */}
                    <div className="flex flex-col items-center justify-center bg-white/10 rounded-2xl p-4 min-w-[100px] border border-white/10">
                       <span className="text-[10px] font-black text-[#36b37e] uppercase mb-1">{new Date(res.date).toLocaleDateString('es-AR', { weekday: 'short' })}</span>
                       <span className="text-2xl font-black leading-none">{new Date(res.date).getDate()}</span>
                       <span className="text-[10px] font-black text-white/40 uppercase mt-1">{new Date(res.date).toLocaleDateString('es-AR', { month: 'short' })}</span>
                    </div>

                    {/* Main Info */}
                    <div className="space-y-3">
                       <div className="flex items-center gap-3">
                          <h3 className="text-lg font-black">{res.contactName}</h3>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${courtColors[res.courtId]}`}>
                            {courtNames[res.courtId]}
                          </span>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                          <div className="flex items-center gap-2 text-sm text-white/60">
                             <Clock size={14} className="text-[#36b37e]" />
                             <span className="font-bold text-white tracking-widest">{res.timeSlot}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/60">
                             <Mail size={14} />
                             <span>{res.contactEmail}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/60">
                             <Phone size={14} />
                             <span>{res.contactPhone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/60">
                             <Calendar size={14} />
                             <span>Recibida: {new Date(res.createdAt).toLocaleDateString()}</span>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col items-center justify-center gap-3 shrink-0">
                     {res.status === 'confirmed' ? (
                       <button 
                         onClick={() => handleCancelReservation(res._id)}
                         className="flex items-center gap-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white border border-red-600/30 px-5 py-2.5 rounded-xl text-xs font-black tracking-widest transition-all uppercase"
                       >
                         <XCircle size={14} />
                         ANULAR TURNO
                       </button>
                     ) : (
                       <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-2 rounded-xl border border-red-500/20 text-xs font-black tracking-widest uppercase">
                          <AlertCircle size={14} />
                          RESERVA ANULADA
                       </div>
                     )}
                     
                     {res.status === 'confirmed' && (
                       <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-xl border border-green-400/20 text-xs font-black tracking-widest uppercase">
                          <CheckCircle2 size={14} />
                          CONFIRMADA
                       </div>
                     )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer info */}
        <div className="mt-10 p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
           <p className="text-white/30 text-xs leading-relaxed max-w-2xl">
              <span className="text-[#36b37e] font-black mr-2">POLÍTICA DE CRM:</span>
              Las reservas anuladas liberan automáticamente el slot en el calendario público de clientes. 
              Para reprogramar, anule la reserva actual e indique al cliente realizar un nuevo proceso en la web 
              o realícelo manualmente desde el área de recepción.
           </p>
        </div>
      </main>
    </div>
  );
}
