"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Edit2, Eye } from "lucide-react";
import Link from "next/link";

export default function FloatingAdminTools() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // No mostrar en la propia área de admin o si no está autenticado
  if (!session || pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return null;
  }

  // Determinar el slug de la página actual
  const slug = pathname === "/" ? "home" : pathname.split("/").filter(Boolean).pop();

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-4">
      {/* Botón de Editar */}
      <Link
        href={`/admin/pages/${slug}`}
        className="flex items-center gap-2 bg-primary dark:bg-[#36b37e] text-white px-6 py-3 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95 transition-all font-black text-sm uppercase tracking-wider group"
      >
        <Edit2 size={18} className="group-hover:rotate-12 transition-transform" />
        Modo Edición
      </Link>
      
      {/* Tooltip de Instrucciones (Opcional, se puede mejorar) */}
      <div className="bg-black/80 backdrop-blur-md text-white text-[10px] p-3 rounded-xl max-w-[200px] border border-white/10 shadow-2xl animate-fade-in">
        <p className="font-bold mb-1">💡 Tip de Administrador</p>
        Hacé clic en el lápiz para editar el contenido de <strong>{slug}</strong> directamente.
      </div>
    </div>
  );
}
