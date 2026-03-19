import { Building2, Heart, Award, ArrowRight, ShieldCheck, Globe } from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Nosotros - La Asociación (Premium)",
  description: "Propósito, equipo, historia, campo, aliados e impacto de la Asociación Civil Andar.",
};

export default function Nosotros() {
  return (
    <div className="bg-[#000B1A] text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#001A3D] to-[#000B1A]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex bg-[#36b37e]/10 text-[#36b37e] px-6 py-2.5 rounded-full font-black text-sm tracking-wider mb-8 uppercase border-2 border-[#36b37e]/30">
            QUIÉNES SOMOS
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">Nosotros</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            El fútbol como herramienta de inclusión social y transformación colectiva.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <FadeIn>
            <div className="bg-white/[0.02] p-10 md:p-16 rounded-3xl border border-white/5 mb-24 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#36b37e]/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-[#36b37e]/10 transition-all duration-700" />
              <h2 className="text-3xl md:text-4xl font-black text-[#36b37e] mb-10 uppercase tracking-tighter leading-none">
                EL FÚTBOL COMO HERRAMIENTA <br/> DE INCLUSIÓN SOCIAL
              </h2>
              <div className="space-y-8 text-lg leading-relaxed text-white/70">
                <p>
                  El fútbol tiene un arraigo particular en la cultura argentina. Su poder es ampliamente movilizador y nos permite generar un espacio masivo de participación colectiva donde el eje no es la competencia sino la equiparación de oportunidades.
                </p>
                <p>
                  Buscamos a través de la revalorización colectiva y personal darle visibilidad a un colectivo que ve vulnerado sus derechos permanentemente. La situación de discapacidad es muchas veces el resultado de una sociedad que no toma en cuenta necesidades peculiares.
                </p>
                <div className="border-l-4 border-[#36b37e] pl-8 py-4 bg-white/2 rounded-r-xl">
                  <p className="text-white font-black text-xl italic leading-snug">
                    Nuestro objetivo es claro: derribar mitos y aportar a una inclusión plena de todas las personas, más allá de la condición que puedan tener.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mb-24">
              <h2 className="text-4xl font-black mb-16 text-center tracking-tighter uppercase">NUESTROS ALIADOS ESTRATÉGICOS</h2>
              <div className="grid gap-8">
                
                {/* Adidas */}
                <div className="group flex flex-col md:flex-row gap-8 items-center bg-white/[0.03] p-10 rounded-2xl border border-white/5 transition-all hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1">
                  <div className="w-40 shrink-0 brightness-[5] transition-all group-hover:scale-110">
                    <img src="https://futbolinclusivo.org.ar/app/uploads/2017/10/1-logo-addas.png" alt="Adidas" className="w-full h-auto" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-black mb-3 text-[#36b37e] uppercase tracking-tight">ADIDAS ARGENTINA</h3>
                    <p className="text-white/50 leading-relaxed font-medium">
                      Acompañan a la Asociación desde el año 2007. La &quot;Magia que Adidas Argentina le puso a nuestro Potrero&quot; fue el punto de partida para mejorar el impacto de la Liga cada año.
                    </p>
                  </div>
                </div>

                {/* FIFA */}
                <div className="group flex flex-col md:flex-row gap-8 items-center bg-white/[0.03] p-10 rounded-2xl border border-white/5 transition-all hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1">
                  <div className="w-40 shrink-0 flex justify-center text-[#36b37e] transition-all group-hover:scale-110 group-hover:rotate-6">
                    <ShieldCheck size={80} />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-black mb-3 text-[#36b37e] uppercase tracking-tight">FIFA FOOTBALL FOR HOPE</h3>
                    <p className="text-white/50 leading-relaxed font-medium">
                      La FIFA seleccionó a la Asociación Civil Andar para otorgar apoyo económico por el desarrollo de la Liga de Fútbol Inclusiva, reconociendo el poder transformador de nuestro proyecto.
                    </p>
                  </div>
                </div>

                {/* AFA */}
                <div className="group flex flex-col md:flex-row gap-8 items-center bg-white/[0.03] p-10 rounded-2xl border border-white/5 transition-all hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1">
                  <div className="w-40 shrink-0 brightness-[5] transition-all group-hover:scale-110">
                    <img src="https://futbolinclusivo.org.ar/app/uploads/2024/02/Argentine_Football_Association_logo.svg_-e1708534772981.png" alt="AFA" className="w-full h-auto" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-black mb-3 text-[#36b37e] uppercase tracking-tight">ASOCIACIÓN DEL FÚTBOL ARGENTINO</h3>
                    <p className="text-white/50 leading-relaxed font-medium">
                      Cedieron las instalaciones del Predio &quot;Julio Humberto Grondona&quot; en Ezeiza para el desarrollo de las Finales Anuales y el Festival Latinoamericano de Fútbol 3.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </FadeIn>

        </div>
      </section>

    </div>
  );
}
