"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Search, 
  RefreshCw, 
  Download, 
  Camera, 
  QrCode, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Users, 
  UserCheck, 
  UserX, 
  Sparkles,
  Phone,
  ShieldCheck,
  AlertTriangle,
  FileSpreadsheet,
  Plus
} from "lucide-react";
import InfanciasScannerModal from "@/components/admin/InfanciasScannerModal";
import InfanciasEditModal from "@/components/admin/InfanciasEditModal";
import InfanciasTicketModal from "@/components/admin/InfanciasTicketModal";
import InfanciasCreateModal from "@/components/admin/InfanciasCreateModal";

export default function AdminInfanciasPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ total: 0, attended: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAttended, setFilterAttended] = useState("all"); // 'all', 'attended', 'pending'

  // Modals state
  const [createOpen, setCreateOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewingTicket, setViewingTicket] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/infancias?limit=500");
      const data = await res.json();
      if (res.ok && data.success) {
        setItems(data.data || []);
        setStats(data.stats || { total: 0, attended: 0, pending: 0 });
      }
    } catch (err) {
      console.error("Error loading infancias:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  // Toggle Attendance with instant state update
  const handleToggleAttended = async (item) => {
    const newAttended = !item.attended;
    try {
      const res = await fetch(`/api/admin/infancias/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attended: newAttended }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((i) =>
            i._id === item._id
              ? { ...i, attended: newAttended, attendedAt: newAttended ? new Date() : null }
              : i
          )
        );
        setStats((prev) => ({
          ...prev,
          attended: newAttended ? prev.attended + 1 : prev.attended - 1,
          pending: newAttended ? prev.pending - 1 : prev.pending + 1,
        }));
      }
    } catch (err) {
      console.error("Error toggling attendance:", err);
    }
  };

  // Delete Item
  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta inscripción?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/infancias/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i._id !== id));
        fetchData();
      }
    } catch (err) {
      console.error("Error deleting:", err);
    } finally {
      setDeletingId(null);
    }
  };

  // Export to CSV / Excel
  const handleExportCSV = () => {
    if (items.length === 0) return;

    const headers = [
      "Código Ticket",
      "Grupo Familiar",
      "Nombre Niño/a",
      "DNI",
      "Edad",
      "Fecha Nacimiento",
      "Nombre Tutor",
      "Teléfono",
      "Email",
      "Localidad",
      "Institución/Club",
      "Observaciones Médicas",
      "Autorización Imagen",
      "Acreditado/Ingresó",
      "Fecha Acreditación",
      "Fecha Registro",
    ];

    const rows = items.map((i) => [
      `"${i.ticketCode}"`,
      `"${i.familyGroupId || ""}"`,
      `"${i.childName || ""}"`,
      `"${i.childDni || ""}"`,
      `"${i.childAge || ""}"`,
      `"${i.childBirthDate || ""}"`,
      `"${i.tutorName || ""}"`,
      `"${i.tutorPhone || ""}"`,
      `"${i.tutorEmail || ""}"`,
      `"${i.locality || ""}"`,
      `"${i.clubOrSchool || ""}"`,
      `"${i.medicalNotes || ""}"`,
      `"${i.imageConsent ? "SÍ" : "NO"}"`,
      `"${i.attended ? "SÍ" : "NO"}"`,
      `"${i.attendedAt ? new Date(i.attendedAt).toLocaleString("es-AR") : ""}"`,
      `"${new Date(i.createdAt).toLocaleString("es-AR")}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Inscriptos-Dia-de-las-Infancias-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  // Filtered List
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Filter by attendance status
      if (filterAttended === "attended" && !item.attended) return false;
      if (filterAttended === "pending" && item.attended) return false;

      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCode = item.ticketCode?.toLowerCase().includes(q);
        const matchName = item.childName?.toLowerCase().includes(q);
        const matchDni = item.childDni?.toLowerCase().includes(q);
        const matchTutor = item.tutorName?.toLowerCase().includes(q);
        const matchPhone = item.tutorPhone?.toLowerCase().includes(q);
        const matchLocality = item.locality?.toLowerCase().includes(q);
        const matchClub = item.clubOrSchool?.toLowerCase().includes(q);
        return matchCode || matchName || matchDni || matchTutor || matchPhone || matchLocality || matchClub;
      }

      return true;
    });
  }, [items, searchQuery, filterAttended]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#000B1A] flex items-center justify-center text-white">
        Cargando panel...
      </div>
    );
  }

  if (!session) return null;

  const attendanceRate = stats.total > 0 ? Math.round((stats.attended / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#000B1A] text-white pb-24 sm:pb-12">
      
      {/* Top Header */}
      <header className="bg-white/5 border-b border-white/10 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-wrap justify-between items-center gap-3">
          
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              title="Volver al Dashboard"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E67E22]/20 text-[#E67E22] text-[10px] font-black uppercase tracking-wider">
                  Día de las Infancias
                </span>
              </div>
              <h1 className="text-lg sm:text-2xl font-black tracking-tight uppercase">
                Panel de Inscripciones
              </h1>
            </div>
          </div>

          {/* Quick Action Buttons on Desktop */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setCreateOpen(true)}
              className="bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold px-3.5 sm:px-5 py-3 rounded-2xl transition-all flex items-center gap-2 text-xs sm:text-sm uppercase active:scale-95 shadow-lg"
              title="Dar de alta una nueva inscripción"
            >
              <Plus size={18} className="text-[#36b37e]" />
              <span className="hidden sm:inline">Nueva Inscripción</span>
              <span className="sm:hidden">Inscribir</span>
            </button>
            <button
              onClick={() => setScannerOpen(true)}
              className="bg-gradient-to-r from-[#36b37e] to-[#27ae60] hover:from-[#2ecc71] hover:to-[#219653] text-black font-black px-4 sm:px-6 py-3 rounded-2xl shadow-[0_10px_30px_rgba(54,179,126,0.35)] transition-all flex items-center gap-2 text-xs sm:text-sm uppercase active:scale-95"
            >
              <Camera size={18} />
              <span>Escanear QR</span>
            </button>
            <button
              onClick={handleExportCSV}
              disabled={items.length === 0}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-3.5 py-3 rounded-2xl transition-colors flex items-center gap-2 text-sm font-bold disabled:opacity-50"
              title="Exportar a Excel"
            >
              <FileSpreadsheet size={18} className="text-[#36b37e]" />
              <span className="hidden md:inline">Excel</span>
            </button>
            <button
              onClick={fetchData}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              title="Actualizar listado"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-6">
        
        {/* KPI Metrics Cards - Large & Touch Friendly */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-black tracking-wider text-white/50">
                Inscriptos
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#2980B9]/20 text-[#2980B9] flex items-center justify-center">
                <Users size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-4xl font-black text-white">{stats.total}</div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-black tracking-wider text-[#36b37e]">
                Ingresaron
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#36b37e]/20 text-[#36b37e] flex items-center justify-center">
                <UserCheck size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-4xl font-black text-[#36b37e]">{stats.attended}</div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-black tracking-wider text-[#E67E22]">
                Pendientes
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#E67E22]/20 text-[#E67E22] flex items-center justify-center">
                <UserX size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-4xl font-black text-[#E67E22]">{stats.pending}</div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase font-black tracking-wider text-white/50">
                Asistencia
              </span>
              <div className="w-8 h-8 rounded-xl bg-white/10 text-white/80 flex items-center justify-center">
                <Sparkles size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-4xl font-black text-white">{attendanceRate}%</div>
          </div>

        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-3xl p-3 sm:p-4 mb-6 space-y-3">
          
          {/* Search Box */}
          <div className="relative w-full">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por Nombre, DNI, Teléfono, Ticket (#INF)..."
              className="w-full bg-white/5 border border-white/10 focus:border-[#36b37e] rounded-2xl pl-12 pr-4 py-3 text-sm sm:text-base text-white placeholder-white/40 focus:outline-none"
            />
          </div>

          {/* Status Tabs */}
          <div className="grid grid-cols-3 gap-2 bg-white/5 p-1 rounded-2xl border border-white/10 text-xs sm:text-sm font-bold text-center">
            <button
              onClick={() => setFilterAttended("all")}
              className={`py-2 rounded-xl transition-all ${
                filterAttended === "all" ? "bg-[#36b37e] text-black font-black" : "text-white/60 hover:text-white"
              }`}
            >
              Todos ({items.length})
            </button>
            <button
              onClick={() => setFilterAttended("attended")}
              className={`py-2 rounded-xl transition-all ${
                filterAttended === "attended" ? "bg-[#36b37e] text-black font-black" : "text-white/60 hover:text-white"
              }`}
            >
              Acreditados ({stats.attended})
            </button>
            <button
              onClick={() => setFilterAttended("pending")}
              className={`py-2 rounded-xl transition-all ${
                filterAttended === "pending" ? "bg-[#E67E22] text-black font-black" : "text-white/60 hover:text-white"
              }`}
            >
              Pendientes ({stats.pending})
            </button>
          </div>

        </div>

        {/* MOBILE CARD VIEW (Visible on small screens) */}
        <div className="block lg:hidden space-y-3">
          {loading ? (
            <div className="text-center py-12 text-white/40">Cargando inscriptos...</div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12 text-white/40">
              {searchQuery ? "No se encontraron resultados para la búsqueda." : "No hay inscripciones registradas aún."}
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 space-y-3 shadow-lg"
              >
                {/* Header row */}
                <div className="flex justify-between items-start">
                  <div>
                    <button
                      onClick={() => setViewingTicket(item)}
                      className="font-mono text-xs font-bold text-[#36b37e] flex items-center gap-1 mb-1"
                    >
                      <QrCode size={14} /> #{item.ticketCode}
                    </button>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {item.childName}
                    </h3>
                  </div>

                  {/* Attendance Toggle Button */}
                  <button
                    onClick={() => handleToggleAttended(item)}
                    className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all active:scale-95 ${
                      item.attended
                        ? "bg-[#36b37e] text-black shadow-lg shadow-[#36b37e]/30"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {item.attended ? (
                      <>
                        <CheckCircle2 size={16} /> Ingresó
                      </>
                    ) : (
                      <>
                        <Clock size={16} /> Marcar Ingreso
                      </>
                    )}
                  </button>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-2 text-xs text-white/70 bg-black/20 p-3 rounded-xl">
                  {item.childDni && <div>DNI: <strong className="text-white font-mono">{item.childDni}</strong></div>}
                  {item.childAge && <div>Edad: <strong className="text-white">{item.childAge} años</strong></div>}
                  {item.tutorPhone && (
                    <div className="col-span-2 flex items-center gap-1 text-[#2980B9]">
                      <Phone size={12} /> Contacto: <a href={`tel:${item.tutorPhone}`} className="underline font-bold text-white">{item.tutorPhone}</a>
                    </div>
                  )}
                  {item.locality && <div className="col-span-2">Localidad: <span className="text-white">{item.locality}</span></div>}
                </div>

                {item.medicalNotes && (
                  <div className="p-2.5 rounded-xl bg-[#E74C3C]/20 border border-[#E74C3C]/40 text-[#ff7675] text-xs font-bold">
                    ⚠️ {item.medicalNotes}
                  </div>
                )}

                {/* Actions row */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                  <span className="text-white/40 text-[11px]">
                    {new Date(item.createdAt).toLocaleDateString("es-AR")}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewingTicket(item)}
                      className="p-2 rounded-xl bg-white/5 text-white/80"
                      title="Ver Pase QR"
                    >
                      <QrCode size={16} />
                    </button>
                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-2 rounded-xl bg-white/5 text-[#36b37e]"
                      title="Editar"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 rounded-xl bg-white/5 text-[#E74C3C]"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* DESKTOP TABLE VIEW (Visible on larger screens) */}
        <div className="hidden lg:block bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-white/50">
                <tr>
                  <th className="px-6 py-4">Ticket</th>
                  <th className="px-6 py-4">Participante</th>
                  <th className="px-6 py-4">Contacto / Tutor</th>
                  <th className="px-6 py-4">Localidad / Club</th>
                  <th className="px-6 py-4">Acreditación</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-white/40">
                      Cargando inscriptos...
                    </td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-white/40">
                      {searchQuery
                        ? "No se encontraron inscripciones que coincidan con la búsqueda."
                        : "Todavía no hay inscripciones registradas."}
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item._id} className="hover:bg-white/[0.02] transition-colors">
                      
                      {/* Ticket Code */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setViewingTicket(item)}
                          className="font-mono font-bold text-[#36b37e] hover:underline flex items-center gap-1.5"
                          title="Ver QR del ticket"
                        >
                          <QrCode size={16} />
                          {item.ticketCode}
                        </button>
                        <span className="text-[10px] text-white/40 block mt-0.5">
                          {new Date(item.createdAt).toLocaleDateString("es-AR")}
                        </span>
                      </td>

                      {/* Child Name & Details */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-white text-base">
                          {item.childName}
                        </div>
                        <div className="text-xs text-white/50 flex items-center gap-2 mt-0.5">
                          {item.childDni && <span>DNI: {item.childDni}</span>}
                          {item.childAge && <span>• {item.childAge} años</span>}
                        </div>
                        {item.medicalNotes && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-[#E74C3C]/20 border border-[#E74C3C]/40 text-[#ff7675] text-[10px] font-bold">
                            ⚠️ {item.medicalNotes}
                          </span>
                        )}
                      </td>

                      {/* Tutor & Phone */}
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white/90 text-sm">
                          {item.tutorName || "—"}
                        </div>
                        <a
                          href={`tel:${item.tutorPhone}`}
                          className="text-xs text-[#2980B9] hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <Phone size={12} /> {item.tutorPhone}
                        </a>
                      </td>

                      {/* Locality & Club */}
                      <td className="px-6 py-4 text-xs text-white/70">
                        <div>{item.locality || "—"}</div>
                        {item.clubOrSchool && (
                          <div className="text-white/40 mt-0.5">{item.clubOrSchool}</div>
                        )}
                      </td>

                      {/* Attendance Toggle */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleAttended(item)}
                          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                            item.attended
                              ? "bg-[#36b37e] text-black shadow-lg shadow-[#36b37e]/20 hover:bg-[#2ecc71]"
                              : "bg-white/10 text-white/70 hover:bg-white/20"
                          }`}
                          title="Hacé clic para cambiar estado"
                        >
                          {item.attended ? (
                            <>
                              <CheckCircle2 size={16} /> Ingresó
                            </>
                          ) : (
                            <>
                              <Clock size={16} /> Pendiente
                            </>
                          )}
                        </button>
                        {item.attendedAt && (
                          <span className="text-[10px] text-white/40 block mt-1 font-mono">
                            {new Date(item.attendedAt).toLocaleTimeString("es-AR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            hs
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setViewingTicket(item)}
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                            title="Ver pase con QR"
                          >
                            <QrCode size={18} />
                          </button>
                          <button
                            onClick={() => setEditingItem(item)}
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#36b37e] hover:bg-[#36b37e]/20 transition-colors"
                            title="Editar"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            disabled={deletingId === item._id}
                            className="p-2.5 rounded-xl bg-white/5 hover:bg-[#E74C3C]/20 text-[#E74C3C] transition-colors disabled:opacity-50"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* MOBILE FLOATING ACTION BUTTON (FAB) FOR SCANNER */}
      <div className="fixed bottom-5 right-5 z-50 block sm:hidden">
        <button
          onClick={() => setScannerOpen(true)}
          className="w-16 h-16 rounded-full bg-[#36b37e] text-black shadow-[0_10px_35px_rgba(54,179,126,0.6)] flex items-center justify-center active:scale-90 transition-transform"
          title="Abrir Escáner QR"
        >
          <Camera size={28} />
        </button>
      </div>

      {/* MODALS */}
      <InfanciasCreateModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={fetchData}
      />

      <InfanciasScannerModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onCheckInSuccess={fetchData}
        stats={stats}
      />

      <InfanciasEditModal
        isOpen={!!editingItem}
        item={editingItem}
        onClose={() => setEditingItem(null)}
        onUpdated={(updated) => {
          setItems((prev) => prev.map((i) => (i._id === updated._id ? updated : i)));
          fetchData();
        }}
      />

      <InfanciasTicketModal
        isOpen={!!viewingTicket}
        item={viewingTicket}
        onClose={() => setViewingTicket(null)}
      />

    </div>
  );
}
