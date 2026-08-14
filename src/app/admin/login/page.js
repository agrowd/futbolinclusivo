"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, AlertCircle, LogIn, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email.trim(),
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Usuario o contraseña incorrectos. Por favor verificá los datos.");
        setIsLoading(false);
      } else {
        // Full window navigation ensures cookies are attached and SessionProvider syncs cleanly
        window.location.href = "/admin/dashboard";
      }
    } catch (err) {
      setError("Error al conectar con el servidor de autenticación");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000B1A] via-[#001229] to-[#000814] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <Image 
                src="/andarfc-logo.png" 
                alt="Logo Andar FC" 
                width={80} 
                height={80} 
                className="drop-shadow-2xl object-contain" 
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight uppercase">
              Panel de Control
            </h1>
            <p className="text-white/60 text-sm font-medium">
              Fútbol Inclusivo • Asociación Civil Andar
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 animate-fade-in">
              <AlertCircle size={20} className="text-red-400 shrink-0" />
              <p className="text-red-400 text-xs sm:text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-2">
                Usuario o Correo
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#36b37e] focus:ring-2 focus:ring-[#36b37e]/20 transition-all font-medium"
                  placeholder="juanchi o admin@futbolinclusivo.org.ar"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#36b37e] focus:ring-2 focus:ring-[#36b37e]/20 transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#36b37e] hover:bg-[#2ecc71] text-black font-black py-4 rounded-2xl transition-all hover:shadow-xl hover:shadow-[#36b37e]/30 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm tracking-wider flex items-center justify-center gap-2 mt-4 active:scale-95"
            >
              {isLoading ? (
                <span>Ingresando al sistema...</span>
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <Link
              href="/"
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              ← Volver al sitio principal
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
