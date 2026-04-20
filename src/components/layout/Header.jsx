"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X as XIcon,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Heart,
  ChevronRight,
  Trophy,
  Users,
  Calendar,
  Newspaper,
  LayoutGrid,
  MapPin,
} from "lucide-react";
import ClubStrip from "./ClubStrip";

const mainNav = [
  { href: "/institucional", label: "LA ASOCIACIÓN", icon: Users },
  { href: "/programas/ligas", label: "LIGAS", icon: Trophy, highlight: true },
  { href: "/programas/escuela", label: "ESCUELA", icon: Users, highlight: true },
  { href: "/novedades", label: "NOVEDADES", icon: Newspaper },
  { href: "/inscripcion", label: "INSCRIPCIÓN", icon: Trophy, special: true },
  { href: "/canchas", label: "ALQUILER DE CANCHAS", icon: MapPin },
  { href: "/sumate", label: "¡SUMATE!", icon: Heart },
];

const programNav = [
  { href: "/programas/liga-ba", label: "LIGA BA" },
  { href: "/programas/liga-nacional", label: "LIGA NACIONAL" },
  { href: "/programas/escuela", label: "ESCUELA" },
  { href: "/programas/festival-latam", label: "FESTIVAL LATAM" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/ligadefutbolinclusiva",
    label: "Facebook",
    Icon: Facebook,
  },
  {
    href: "https://twitter.com/futbolinclusivo",
    label: "Twitter",
    Icon: Twitter,
  },
  {
    href: "https://www.instagram.com/futbolinclusivo_ok",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "mailto:info@granjaandar.org.ar",
    label: "Email",
    Icon: Mail,
  },
];

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <ClubStrip />
      
      <header
        role="banner"
        className="sticky top-0 z-100 bg-[#000B1A]/95 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between min-h-[60px] md:min-h-[72px] py-2">
          {/* Logo & Desktop Nav Left */}
          <div className="flex items-center gap-6 lg:gap-12 min-w-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 no-underline transition-all duration-300 hover:scale-105 active:scale-95 group shrink-0">
              <div className="relative">
                <div className="absolute -inset-2 bg-[#36b37e]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Image 
                  src="/logo.png" 
                  alt="Logo Andar FC" 
                  width={40} 
                  height={40} 
                  className="relative object-contain drop-shadow-[0_0_12px_rgba(54,179,126,0.3)] transition-transform group-hover:rotate-6 md:w-[50px] md:h-[50px]"
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-white font-black text-lg md:text-2xl block leading-none tracking-tighter">ANDAR FC</span>
                <span className="text-[#36b37e] font-bold text-[10px] md:text-xs uppercase tracking-wider mt-0.5 block">Fútbol Inclusivo</span>
              </div>
            </Link>
 
            {/* Desktop Navigation Menu - Visible from LG (1024px) */}
            <nav className="hidden lg:flex items-center gap-10">
              {mainNav.slice(0, 6).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative py-2 font-black text-sm tracking-wider uppercase no-underline transition-all ${
                    item.highlight 
                      ? "text-[#36b37e] hover:text-white" 
                      : item.special
                      ? "text-white hover:text-[#36b37e]"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {item.highlight && (
                    <span className="absolute -inset-1 bg-[#36b37e]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                  {item.special ? (
                    <>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#36b37e] to-transparent opacity-60" style={{ animation: "energy-pulse 2s ease-in-out infinite" }} />
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#36b37e] to-transparent opacity-30" style={{ animation: "energy-pulse 2s ease-in-out infinite 0.5s" }} />
                    </>
                  ) : (
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      item.highlight ? "bg-[#36b37e]" : "bg-[#36b37e]"
                    }`} />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Actions Right */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            <Link 
              href="/sumate/donar" 
              className="hidden lg:flex bg-[#36b37e] text-white rounded-full px-5 py-2 font-black text-xs tracking-wider transition-all hover:bg-[#2da372] hover:shadow-[0_0_20px_rgba(54,179,126,0.4)] hover:-translate-y-px active:scale-95 active:translate-y-0 uppercase border border-white/20"
            >
              DONAR
            </Link>
            
            <button
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Abrir menú de navegación"
              className="flex lg:hidden items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-lg cursor-pointer transition-all hover:bg-white/10 hover:border-white/20 active:scale-95 group"
            >
              <div className="flex flex-col gap-1 w-5">
                <span className="h-0.5 w-full bg-white transition-all group-hover:w-3" />
                <span className="h-0.5 w-full bg-[#36b37e]" />
                <span className="h-0.5 w-full bg-white transition-all group-hover:w-4" />
              </div>
              <span className="font-black text-xs tracking-wider uppercase hidden sm:block">Menú</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-1000"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        id="main-sidebar"
        className={`fixed top-0 left-0 bottom-0 w-[min(420px,95vw)] bg-[#000B1A] z-1100 shadow-[20px_0_50px_rgba(0,0,0,0.5)] flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] ${
          isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="p-8 border-b border-white/5 flex justify-between items-center group">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="transition-transform group-hover:rotate-12" />
            <div className="flex flex-col">
              <span className="text-white font-black text-xs leading-none">ANDAR FC</span>
              <span className="text-[#36b37e] font-bold text-[8px] uppercase tracking-wider">Premium</span>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 text-white rounded-full cursor-pointer transition-all hover:bg-white/10 hover:rotate-90 active:scale-90"
          >
            <XIcon size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="list-none p-0">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center justify-between px-8 py-5 text-white no-underline font-black text-base md:text-lg transition-all hover:bg-white/5 hover:pl-10 group border-b border-white/2"
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={22} className="text-[#36b37e] transition-transform group-hover:scale-110" />
                    <span className="tracking-tighter uppercase">{item.label}</span>
                  </div>
                  <ChevronRight size={18} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 px-8">
            <span className="text-white/30 text-xs font-extrabold tracking-wider uppercase">Programas</span>
            <ul className="list-none py-4 space-y-2">
              {programNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className="block py-2 text-white/70 no-underline text-sm font-semibold transition-colors hover:text-[#36b37e]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Social in Sidebar Footer */}
        <div className="p-8 border-t border-white/5 space-y-8 bg-black/20">
          <div className="flex justify-center gap-6">
            {socialLinks.map(({ href, label, Icon }) => (
              <a 
                key={label} 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/40 transition-all hover:text-white hover:scale-110"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </aside>

    </>
  );
}
