import { Handshake, Building2, Landmark, GraduationCap, Map, Users, Globe, Building } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Alianzas Estratégicas - Fútbol Inclusivo",
  description: "Sumá a tu institución, empresa o fundación al movimiento social.",
};

const partnerTypes = [
  {
    title: "Empresas y Compañías",
    icon: Building2,
    desc: "Añadir una dimensión social a su entorno laboral y destacarse como un líder socialmente responsable.",
  },
  {
    title: "Gobiernos e Instituciones",
    icon: Landmark,
    desc: "Aprovechar nuestra red nacional para fortalecer políticas públicas deportivas y de inclusión social.",
  },
  {
    title: "Fundaciones",
    icon: Handshake,
    desc: "Aunar esfuerzos y recursos para maximizar el impacto social en las comunidades vulnerables.",
  },
  {
    title: "Universidades",
    icon: GraduationCap,
    desc: "Promover la investigación académica, prácticas profesionales y voluntariado estudiantil.",
  },
  {
    title: "Clubes y Asociaciones de Fútbol",
    icon: Map,
    desc: "Aprovechar nuestra red para añadir una dimensión inclusiva al juego en sus divisiones.",
  },
  {
    title: "Organizaciones Sociales",
    icon: Users,
    desc: "Conectar con redes internacionales como streetfootballworld y FIFA Foundation.",
  },
];

export default function Alianzas() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
            <Handshake className="w-16 h-16 mx-auto mb-6 text-white" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Alianzas Estratégicas</h1>
            <p className="text-xl opacity-90 leading-relaxed font-light">
              Juntos multiplicamos el impacto del fútbol como herramienta social.
            </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-white text-text">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="prose max-w-none text-lg text-text-muted leading-relaxed mb-12">
             <p className="text-xl font-medium text-secondary mb-8">
                Andar articula con instituciones de fútbol de todos diferentes tamaños, desde clubes locales hasta asociaciones de fútbol a nivel nacional. En cada caso, nuestras articulaciones están enfocadas por una pasión compartida por el fútbol y el deseo conjunto de construir una sociedad con oportunidades para todos.
             </p>

              <h2 className="text-3xl font-bold text-secondary border-l-4 border-primary pl-4 flex items-center gap-3">
                 Motivos para ser parte
              </h2>
              <ul className="space-y-4 list-none pl-0 mt-6">
                  <li className="flex gap-4 items-start bg-gray-50 border border-gray-100 p-4 rounded-lg">
                      <Globe className="w-6 h-6 text-primary flex-shrink-0 mt-1" aria-hidden="true"/>
                      <span className="text-text-muted">Aprovechar nuestra red nacional para atraer a nuevos seguidores de todo el país.</span>
                  </li>
                  <li className="flex gap-4 items-start bg-gray-50 border border-gray-100 p-4 rounded-lg">
                      <Heart className="w-6 h-6 text-accent-orange flex-shrink-0 mt-1" aria-hidden="true"/>
                      <span className="text-text-muted">Añadir una dimensión social al juego y ayudar a cambiar las vidas de los jóvenes con discapacidad.</span>
                  </li>
                  <li className="flex gap-4 items-start bg-gray-50 border border-gray-100 p-4 rounded-lg">
                      <Building className="w-6 h-6 text-accent-blue flex-shrink-0 mt-1" aria-hidden="true"/>
                      <span className="text-text-muted">Destacarse entre la multitud como un líder socialmente responsable en el campo del deporte y la inclusión social.</span>
                  </li>
              </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerTypes.map((type, idx) => {
              const Icon = type.icon;
              return (
                <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-focus-ring" tabIndex={0}>
                   <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                   </div>
                   <h3 className="text-xl font-bold text-secondary mb-2">{type.title}</h3>
                   <p className="text-text-muted text-sm">{type.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100 text-center mt-12">
            <h2 className="text-2xl font-bold text-secondary mb-4">¿Te interesa?</h2>
            <p className="text-lg text-text-muted mb-8">
              Ponete en contacto para ser parte de un movimiento que promueve al fútbol como herramienta de inclusión social.
            </p>
            <Link 
                href="/contacto" 
                className="inline-flex items-center justify-center px-8 py-4 bg-accent-blue text-white rounded-xl hover:bg-blue-700 transition-colors font-bold text-lg focus:ring-4 focus:ring-focus-ring outline-none"
              >
                Contactar a la Dirección
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}

// Inline fallback for missing lucide icon
function Heart({ className, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}
