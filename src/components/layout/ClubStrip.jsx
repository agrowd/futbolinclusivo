"use client";
import React from "react";

// Mock data for clubs - in production this could come from a JSON or API
const clubs = [
  { name: "River Plate", logo: "/andarfc-logo.png" },
  { name: "Boca Juniors", logo: "/andarfc-logo.png" },
  { name: "Independiente", logo: "/andarfc-logo.png" },
  { name: "Racing Club", logo: "/andarfc-logo.png" },
  { name: "San Lorenzo", logo: "/andarfc-logo.png" },
  { name: "Huracán", logo: "/andarfc-logo.png" },
  { name: "Estudiantes LP", logo: "/andarfc-logo.png" },
  { name: "Gimnasia LP", logo: "/andarfc-logo.png" },
  { name: "Rosario Central", logo: "/andarfc-logo.png" },
  { name: "Newell's", logo: "/andarfc-logo.png" },
  { name: "Talleres", logo: "/andarfc-logo.png" },
  { name: "Belgrano", logo: "/andarfc-logo.png" },
  { name: "Lanús", logo: "/andarfc-logo.png" },
  { name: "Banfield", logo: "/andarfc-logo.png" },
  { name: "Vélez Sarsfield", logo: "/andarfc-logo.png" },
  { name: "Argentinos Jrs", logo: "/andarfc-logo.png" },
];

export default function ClubStrip() {
  // Duplicate array for seamless infinite loop
  const allClubs = [...clubs, ...clubs];

  return (
    <div className="w-full bg-[#081119] py-2 overflow-hidden border-b border-white/5 relative z-[200]">
      <div
        className="flex items-center gap-8 w-max animate-marquee"
        style={{ animationDuration: "40s" }}
      >
        {allClubs.map((club, index) => (
          <div
            key={index}
            className="flex-none w-8 h-8 relative flex items-center justify-center"
          >
            <img
              src={club.logo}
              alt={`Logo de ${club.name}`}
              className="max-h-full max-w-full object-contain brightness-[0.9] grayscale-[0.2] contrast-[1.1] opacity-60"
              onError={(e) => {
                e.target.src = "/logo.png";
                e.target.className = "max-h-full max-w-full object-contain opacity-20 grayscale";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
