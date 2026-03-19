"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, AlertCircle, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciales inválidas");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000B1A] via-[#001229] to-[#000814] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image src="/logo.png" alt="Logo" width={80} height={80} className="drop-shadow-2xl" />
            </div>
            <h1 className="text-3xl font-black text-white mb-3 tracking-tight">Panel de Administración</h1>
            <p className="text-white/60 text-base font-medium">Fútbol Inclusivo</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3">
              <AlertCircle size={20} className="text-red-400 shrink-0" />
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block text-white/80 text-sm font-bold uppercase tracking-wider mb-4">
                Email
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl pl-14 pr-5 py-5 text-white text-base placeholder:text-white/40 focus:outline-none focus:border-[#36b37e] focus:ring-2 focus:ring-[#36b37e]/30 transition-all"
                  placeholder="admin@futbolinclusivo.org.ar"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-bold uppercase tracking-wider mb-4">
                Contraseña
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl pl-14 pr-5 py-5 text-white text-base placeholder:text-white/40 focus:outline-none focus:border-[#36b37e] focus:ring-2 focus:ring-[#36b37e]/30 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#36b37e] hover:bg-[#2da372] text-white font-black py-5 rounded-2xl transition-all hover:shadow-2xl hover:shadow-[#36b37e]/20 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-base tracking-widest flex items-center justify-center gap-3 mt-8"
            >
              {isLoading ? (
                <span>Iniciando sesión...</span>
              ) : (
                <>
                  <LogIn size={20} />
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-white/5 text-center">
            <p className="text-white/50 text-sm">
              ¿Olvidaste tu contraseña? Contacta al administrador del sistema.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="text-white/60 hover:text-white text-base font-medium transition-colors">
            ← Volver al sitio
          </Link>
        </div>
      </div>
    </div>
  );
}
