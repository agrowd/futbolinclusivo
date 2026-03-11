import { Map, Trophy, Network, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Liga Nacional de Fútbol Inclusivo",
  description: "Una red federal que expande el modelo deportivo a todo el país.",
};

const sedesNacionales = [
  { region: "Tucumán", org: "Liga Tucumana (Fundación Valores Especiales)", slug: "tucuman", email: "cariverosa@hotmail.com" },
  { region: "Mendoza", org: "Liga Mendocina (Programa Deporte Especial, San Rafael)", slug: "mendoza", email: "aledavila@hotmail.com" },
  { region: "Río Negro", org: "Liga del Alto Valle (Esc. Mun. Deportiva Cipolletti)", slug: "rio-negro", email: "deportes@cipolletti.gov.ar" },
  { region: "Jujuy", org: "Liga Jujeña (Fundación Valencia de Jujuy)", slug: "jujuy", email: null },
  { region: "Santa Fe", org: "Liga de Santa Fe (CEF N° 49 de Rosario)", slug: "santa-fe", email: null },
  { region: "Buenos Aires", org: "LFI Quilmes (Municipalidad de Quilmes)", slug: "quilmes", email: null },
];

export default function LigaNacional() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-[var(--color-secondary)] text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
            <Network className="w-16 h-16 mx-auto mb-6 text-primary" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Liga Nacional</h1>
            <p className="text-xl opacity-90 leading-relaxed font-light">
              Proyecto Federal de Fútbol Inclusivo
            </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-[var(--color-surface)] text-[var(--color-text)]">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <FadeIn>
            <div className="prose max-w-none text-lg text-text-muted leading-relaxed mb-12">
               <p className="text-xl font-medium text-secondary mb-8">
                  La Liga de Fútbol Inclusiva ha extendido sus fronteras y se replica en distintos puntos del país gracias al trabajo en conjunto con organizaciones y entidades que promueven el desarrollo del fútbol como herramienta de inclusión social.
               </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-8">
                <h2 className="text-3xl font-bold text-secondary border-l-4 border-primary pl-4 flex items-center gap-3">
                   <Map className="w-8 h-8 text-primary" aria-hidden="true" />
                   Sedes Nacionales
                </h2>
                
                <div className="space-y-12">

                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:-translate-y-1 transition-transform">
                        <h3 className="text-2xl font-bold text-secondary mb-4">LFI Río Negro</h3>
                        <div className="prose text-lg text-text-muted">
                            <p>Desde el año 2010 la Escuela Municipal Deportiva Inclusiva de Cipolletti, lleva adelante la Liga de Fútbol Inclusiva en Río Negro. Esta propuesta involucra la participación de más de 274 niños, jóvenes y adultos con discapacidad que integran 40 organizaciones de Río Negro. Asimismo acompañan el desarrollo de la Liga 10 voluntarios.</p>
                            <p>La propuesta esta abierta a Escuelas Especiales, Talleres Protegidos, Centros de Día y demás organizaciones. La sede cuenta con 4 zonas de fútbol masculina y 1 zona de fútbol femenino. Su Ceremonia Inaugural será en el mes de Abril y tendrá sus respectivas fechas de juego de Mayo a Octubre, inclusive.</p>
                            <p className="mt-4"><strong className="text-secondary">Contacto:</strong> deportes@cipolletti.gov.ar</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:-translate-y-1 transition-transform">
                        <h3 className="text-2xl font-bold text-secondary mb-4">LFI Mendoza</h3>
                        <div className="prose text-lg text-text-muted">
                            <p>Desde el año 2008 la Coordinación Integral de Personas con Discapacidad de San Rafael, lleva adelante la Liga de Fútbol Inclusiva Mendocina. Esta propuesta involucra la participación de más de 252 niños, jóvenes y adultos con discapacidad que integran los 24 equipos de 15 organizaciones de San Rafael, Mendoza. Asimismo acompañan el desarrollo de la Liga 32 voluntarios.</p>
                            <p>La propuesta esta abierta a Escuelas Especiales, Talleres Protegidos, Centros de Día y CEBJAs. Su Ceremonia Inaugural será en el mes de Abril y tendrá sus respectivas fechas de juego de Mayo a Octubre, inclusive.</p>
                            <p className="mt-4"><strong className="text-secondary">Contacto:</strong> aledavila@hotmail.com</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:-translate-y-1 transition-transform">
                        <h3 className="text-2xl font-bold text-secondary mb-4">LFI Tucumán</h3>
                        <div className="prose text-lg text-text-muted">
                            <p>Desde el año 2010 la provincia de Tucumán es sede de la Liga de Fútbol Inclusiva bajo la organización de la Fundación Valores Especiales.</p>
                            <p>La sede tucumana articula e involucra a la Liga Tucumana de Fútbol y a los principales clubes de la Provincia. Esto permite la participación de más de 150 jóvenes y adultos con discapacidad que representan a 7 clubes, 2 talleres protegidos y 1 centro de Día. Asimismo acompañan el desarrollo anual de la Liga más de 100 voluntarios pertenecientes a los profesorados de educación física.</p>
                            <p>La Liga en Tucumán cuenta con 4 zonas, 3 masculinas y 1 femenina. Su Ceremonia Inaugural será en el mes de Mayo y tendrá 10 fechas de juego de Mayo a Octubre, inclusive.</p>
                            <p className="mt-4"><strong className="text-secondary">Contacto:</strong> cariverosa@hotmail.com</p>
                        </div>
                    </div>

                     <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:-translate-y-1 transition-transform">
                        <h3 className="text-2xl font-bold text-secondary mb-4">LFI Jujuy</h3>
                        <div className="prose text-lg text-text-muted">
                            <p>La Liga Jujeña organizada por la Fundación Valencia de Jujuy.</p>
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
