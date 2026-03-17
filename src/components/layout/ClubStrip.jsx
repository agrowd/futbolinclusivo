"use client";
import React from "react";
import Image from "next/image";

// Mock data for clubs - in production this could come from a JSON or API
const clubs = [
  { name: "River Plate", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/a/ac/Escudo_del_C_A_River_Plate.svg" },
  { name: "Boca Juniors", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/b/b8/Escudo_del_Club_Atl%C3%A9tico_Boca_Juniors.svg" },
  { name: "Independiente", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/4/41/Escudo_del_Club_Atl%C3%A9tico_Independiente.svg" },
  { name: "Racing Club", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/5/5f/Escudo_del_Racing_Club_de_Avellaneda.svg" },
  { name: "San Lorenzo", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/2/2c/Escudo_del_Club_Atl%C3%A9tico_San_Lorenzo_de_Almagro.svg" },
  { name: "Huracán", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/e/e0/Escudo_del_Club_Atl%C3%A9tico_Hurac%C3%A1n.svg" },
  { name: "Estudiantes LP", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/4/4c/Escudo_del_Club_Estudiantes_de_La_Plata.svg" },
  { name: "Gimnasia LP", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/d/df/Escudo_del_Club_de_Gimnasia_y_Esgrima_La_Plata.svg" },
  { name: "Rosario Central", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/3/3b/Escudo_del_Club_Atl%C3%A9tico_Rosario_Central.svg" },
  { name: "Newell's", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/b/b3/Escudo_del_Club_Atl%C3%A9tico_Newell%27s_Old_Boys.svg" },
  { name: "Talleres", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/c/c5/Escudo_del_Club_Atl%C3%A9tico_Talleres.svg" },
  { name: "Belgrano", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/2/22/Escudo_del_Club_Atl%C3%A9tico_Belgrano.svg" },
  { name: "Lanús", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/f/f2/Escudo_del_Club_Atl%C3%A9tico_Lan%C3%BAs.svg" },
  { name: "Banfield", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/c/cc/Escudo_del_Club_Atl%C3%A9tico_Banfield.svg" },
  { name: "Vélez Sarsfield", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/f/f6/Escudo_del_Club_Atl%C3%A9tico_V%C3%A9lez_Sarsfield.svg" },
  { name: "Argentinos Jrs", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/0/0d/Escudo_del_Asociaci%C3%B3n_Atl%C3%A9tica_Argentinos_Juniors.svg" },
  { name: "Atl. Tucumán", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/a/a2/Escudo_del_Club_Atl%C3%A9tico_Tuc_um%C3%A1n.svg" },
  { name: "Godoy Cruz", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/4/4b/Escudo_del_Club_Deportivo_Godoy_Cruz_Antonio_Tomba.svg" },
  { name: "Unión", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/b/b9/Escudo_del_Club_Atl%C3%A9tico_Uni%C3%B3n_de_Santa_Fe.svg" },
  { name: "Instituto", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/4/43/Escudo_del_Instituto_Atl%C3%A9tico_Central_C%C3%B3rdoba.svg" },
  { name: "Platense", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/2/29/Escudo_del_Club_Atl%C3%A9tico_Platense.svg" },
  { name: "Tigre", logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/b/b3/Escudo_del_Club_Atl%C3%A9tico_Tigre.svg" },
];

export default function ClubStrip() {
  return (
    <div 
      className="w-full bg-[#081119] py-4 overflow-hidden border-b border-white/5 relative z-[200]"
    >
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 relative">
        <div 
          className="flex items-center gap-10 overflow-x-auto snap-x scrollbar-hide md:justify-center justify-start [&::-webkit-scrollbar]:hidden"
          style={{ 
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {clubs.map((club, index) => (
            <div 
              key={index} 
              className="flex-none w-10 h-10 relative flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:brightness-100 snap-center"
            >
              <img 
                src={club.logo} 
                alt={`Logo de ${club.name}`}
                className="max-h-full max-w-full object-contain brightness-[0.9] grayscale-[0.2] contrast-[1.1]"
                onError={(e) => {
                  e.target.src = "/logo.png";
                  e.target.className = "max-h-full max-w-full object-contain opacity-20 grayscale";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
