import { Image as ImageIcon, Video, FileText, Newspaper, FileOutput, PlayCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Multimedia - Fútbol Inclusivo",
  description: "Galería de fotos, videos, revista, prensa y documentos útiles.",
};

const multimediaSections = [
  {
    title: "Fotos y Videos",
    description: "Reviví los mejores momentos de la Liga de Fútbol Inclusiva a lo largo de los años. Galerías de todos nuestros programas.",
    icon: PlayCircle,
    href: "#",
    colorClass: "text-primary",
    bgColorClass: "bg-primary/10",
  },
  {
    title: "Revista Oficial",
    description: "Leé las ediciones digitales de nuestra revista institucional, con entrevistas y coberturas especiales.",
    icon: FileText,
    href: "#",
    colorClass: "text-accent-orange",
    bgColorClass: "bg-orange-100",
  },
  {
    title: "Prensa y Recortes",
    description: "La Asociación Civil Andar en los medios de comunicación locales y nacionales.",
    icon: Newspaper,
    href: "#",
    colorClass: "text-accent-blue",
    bgColorClass: "bg-blue-100",
  },
  {
    title: "Documentos Útiles",
    description: "Descargá reglamentos, fichas médicas, protocolos y balances de la Asociación.",
    icon: FileOutput,
    href: "#",
    colorClass: "text-secondary",
    bgColorClass: "bg-gray-200",
  },
];

export default function MultimediaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-secondary text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
            <ImageIcon className="w-16 h-16 mx-auto mb-6 text-primary" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Multimedia</h1>
            <p className="text-xl opacity-90 leading-relaxed font-light">
              Explorá nuestra historia a través de imágenes, videos y documentos.
            </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-white text-text">
        <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {multimediaSections.map((section, idx) => {
                    const Icon = section.icon;
                    return (
                        <Link 
                            href={section.href} 
                            key={idx}
                            className={`group border border-gray-200 rounded-2xl p-8 hover:shadow-md transition-all focus-within:ring-2 focus-within:ring-focus-ring bg-gray-50 focus:outline-none`}
                        >
                            <div className={`w-14 h-14 ${section.bgColorClass} rounded-xl flex items-center justify-center mb-6`}>
                                <Icon className={`w-7 h-7 ${section.colorClass}`} aria-hidden="true" />
                            </div>
                            <h2 className="text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                                {section.title}
                            </h2>
                            <p className="text-text-muted text-lg leading-relaxed">
                                {section.description}
                            </p>
                        </Link>
                    )
                })}
            </div>

            <div className="mt-16 bg-blue-50/50 p-8 rounded-2xl border border-blue-100 text-center">
                <h3 className="text-2xl font-bold text-secondary mb-4">¿Tenés material audiovisual?</h3>
                <p className="text-lg text-text-muted mb-6">
                    Si tenés fotos o videos históricos de la Liga y querés que formen parte de nuestro archivo, envianos un correo.
                </p>
                <Link href="/contacto" className="inline-flex px-6 py-3 bg-white text-accent-blue font-bold rounded-xl border border-blue-200 shadow-sm hover:bg-blue-50 transition-colors focus:ring-4 focus:ring-focus-ring">
                    Contactanos
                </Link>
            </div>

        </div>
      </section>
    </div>
  );
}
