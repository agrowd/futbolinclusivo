"use client";
import React from "react";
import Image from "next/image";

const clubs = [
  { name: "Andar FC", src: "/andarfc-logo.png" },
  { name: "AFA", src: "/logo-afa.png" },
  { name: "SAT", src: "/satlogo.png" },
];

// Duplicado simétrico para loop infinito fluido sin cortes
const halfMarquee = Array(8).fill(clubs).flat();
const allClubs = [...halfMarquee, ...halfMarquee];

export default function ClubStrip() {
  return (
    <div className="w-full bg-[#050D18] py-2 overflow-hidden border-b border-white/10 relative z-[200]">
      <div
        className="flex items-center gap-10 w-max animate-marquee"
        style={{ animationDuration: "35s" }}
      >
        {allClubs.map((club, index) => (
          <div
            key={index}
            className="flex items-center gap-2.5 shrink-0 opacity-80 hover:opacity-100 transition-opacity"
          >
            <div className="w-6 h-6 relative flex items-center justify-center shrink-0">
              <Image
                src={club.src}
                alt={`Logo de ${club.name}`}
                width={24}
                height={24}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/90">
              {club.name}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#36b37e]/40 ml-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
