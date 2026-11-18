"use client";
import React from "react";
import Image from "next/image";

const clubs = [
  { name: "Andar FC", type: "img", src: "/andarfc-logo.png", short: "AND" },
  { name: "AFA", type: "img", src: "/logo-afa.png", short: "AFA" },
  { name: "SAT", type: "img", src: "/satlogo.png", short: "SAT" },
  { name: "Boca Juniors", type: "badge", bg: "#002B7F", color: "#FDB913", short: "CABJ" },
  { name: "River Plate", type: "badge", bg: "#FFFFFF", color: "#EB1C24", short: "CARP" },
  { name: "San Lorenzo", type: "badge", bg: "#002A54", color: "#D81A28", short: "CASLA" },
  { name: "Racing Club", type: "badge", bg: "#6CAEDB", color: "#FFFFFF", short: "RC" },
  { name: "Independiente", type: "badge", bg: "#E21B23", color: "#FFFFFF", short: "CAI" },
  { name: "Lanús", type: "badge", bg: "#6A1A24", color: "#FFFFFF", short: "CAL" },
  { name: "Estudiantes LP", type: "badge", bg: "#E31B23", color: "#FFFFFF", short: "EDLP" },
  { name: "Vélez Sarsfield", type: "badge", bg: "#003882", color: "#FFFFFF", short: "CAVS" },
  { name: "Huracán", type: "badge", bg: "#FFFFFF", color: "#E31B23", short: "CAH" },
  { name: "Gimnasia LP", type: "badge", bg: "#002A54", color: "#FFFFFF", short: "GELP" },
  { name: "Rosario Central", type: "badge", bg: "#002B7F", color: "#FFD200", short: "CARC" },
  { name: "Newell's", type: "badge", bg: "#D81A28", color: "#000000", short: "NOB" },
  { name: "Altos de la Reja", type: "badge", bg: "#166534", color: "#FFFFFF", short: "CAR" },
  { name: "CEF 123", type: "badge", bg: "#008D4D", color: "#FFFFFF", short: "CEF" },
];

export default function ClubStrip() {
  const allClubs = [...clubs, ...clubs];

  return (
    <div className="w-full bg-[#050D18] py-2 overflow-hidden border-b border-white/10 relative z-[200]">
      <div
        className="flex items-center gap-10 w-max animate-marquee"
        style={{ animationDuration: "50s" }}
      >
        {allClubs.map((club, index) => (
          <div key={index} className="flex items-center gap-2.5 shrink-0 opacity-75 hover:opacity-100 transition-opacity">
            {club.type === "img" ? (
              <div className="w-6 h-6 relative flex items-center justify-center shrink-0">
                <Image
                  src={club.src}
                  alt={`Logo de ${club.name}`}
                  width={24}
                  height={24}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <span
                style={{ backgroundColor: club.bg, color: club.color }}
                className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-black tracking-tighter border border-white/20 shrink-0 shadow-sm"
              >
                {club.short}
              </span>
            )}
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/80">
              {club.name}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#36b37e]/40 ml-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
