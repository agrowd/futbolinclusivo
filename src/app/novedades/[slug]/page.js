import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { notFound } from "next/navigation";

// Base de datos local mockeada basada en extracted_content.json y los slugs
const blogPosts = {
  "apertura-2024": {
    title: "Ceremonia de Apertura 2024",
    date: "11 May 2024",
    author: "Institucional",
    category: "Eventos",
    image: "https://futbolinclusivo.org.ar/app/uploads/2024/02/WhatsApp-Image-2024-02-16-at-15.15.10-960x584.jpeg",
    content: [
      "El sábado 11 de mayo, la Asociación Civil Andar se enorgullece en presentar la Ceremonia de Apertura y Sorteo de la temporada 2024 de la Liga de Fútbol Inclusiva.",
      "Este evento reúne a todas las instituciones de la región para dar inicio a un nuevo año de deporte, compañerismo e inclusión social. La jornada contará con charlas, talleres deportivos y el esperado sorteo de grupos y zonas para las distintas etapas del campeonato de la Liga BA.",
      "A lo largo de los años este día se ha transformado en una fiesta donde las familias, técnicos y jugadores se encuentran para renovar los valores del juego limpio."
    ]
  },
  "torneo-verano-afa": {
    title: "TORNEO DE VERANO “AFA SOMOS TODXS”",
    date: "16 Feb 2024",
    author: "Prensa",
    category: "Deportivo",
    image: "https://futbolinclusivo.org.ar/app/uploads/2024/02/Argentine_Football_Association_logo.svg_-e1708534772981.png",
    content: [
      "En la mañana del viernes 16 de febrero, en el salón de conferencia de prensa del Predio Lionel Andrés Messi de la Asociación del Fútbol Argentino (AFA) en Ezeiza, se llevó a cabo el sorteo y conformación de grupos para el Torneo de Verano de la Liga de Fútbol Inclusiva.",
      "La AFA cedió sus instalaciones de primer nivel para que más de 50 equipos de jóvenes con y sin discapacidad vivan la experiencia de jugar en el mismo césped donde se forjaron los campeones del mundo.",
      "“Para nosotros es un orgullo abrir estas puertas y decir AFA Somos Todxs. La inclusión no es una palabra, es acción.” - Autoridad de AFA presenté en el evento."
    ]
  },
  "nace-andar-fc": {
    title: "Nace Andar FC",
    date: "14 Oct 2023",
    author: "Institucional",
    category: "Noticias",
    image: "https://futbolinclusivo.org.ar/app/uploads/2021/12/FUTBOL-111221-89-Copiar-960x600.jpg",
    content: [
      "El sueño del Complejo “Fútbol por la Inclusión” es realidad y lo celebramos a lo grande. Una meta que costó mucho, pero que gracias al esfuerzo de voluntarios, patrocinadores y el gobierno local pudimos poner en marcha.",
      "Se ha inaugurado un nuevo espacio institucional que será la casa oficial del Andar FC, un equipo de élite formado enteramente por jugadores y jugadoras con discapacidad que nos representarán de manera oficial en torneos provinciales y nacionales.",
      "Este modelo servirá como franquicia social y ejemplo deportivo de alto rendimiento para otros municipios."
    ]
  },
  "novedades-complejo": {
    title: "Nuevo Complejo “Fútbol por la Inclusión”",
    date: "16 Jul 2022",
    author: "Obras",
    category: "Infraestructura",
    image: "https://futbolinclusivo.org.ar/app/uploads/2022/07/MG_3241-Copiar-960x600.jpg",
    content: [
      "El sábado 16 de julio de 2022 a partir de las 12.00 hs la Asociación Civil Andar llevará adelante la Inauguración Oficial del predio deportivo propio con la primera cancha de césped sintético 100% accesible.",
      "La obra demandó varios meses de trabajo, pero logra un estándar inédito en la provincia: accesos sin escalones, vestuarios adaptados para usuarios en sillas de ruedas de alto tránsito, e iluminación LED de última generación para prácticas nocturnas.",
      "Acompáñanos en este gran hito histórico que demuestra que con trabajo colectivo los sueños se cumplen."
    ]
  },
  "finales-afa-2021": {
    title: "Finales 2021 en AFA",
    date: "11 Dic 2021",
    author: "Prensa",
    category: "Eventos",
    image: "https://futbolinclusivo.org.ar/app/uploads/2021/12/FUTBOL-111221-374-Copiar-480x360.jpg",
    content: [
      "El sábado 11 de diciembre el predio de AFA en Ezeiza abrió sus puertas para recibir el último Festival de la temporada.",
      "Cerramos un año difícil tras la pandemia, pero volviendo con todas las fuerzas. Las finales coronaron el esfuerzo de más de 30 instituciones, culminando con la ceremonia de medallas en el complejo de selecciones nacionales.",
      "Todos los equipos festejaron juntos al finalizar la jornada, dando testimonio de los acuerdos y valores trabajados a lo largo del año con la metodología de Fútbol 3."
    ]
  }
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) {
    return { title: "Post no encontrado" };
  }
  return {
    title: `${post.title} - Novedades`,
    description: post.content[0].substring(0, 150) + "...",
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#000B1A] text-white/80 overflow-x-hidden">
        <article className="container mx-auto px-8 sm:px-12 md:px-16 py-20 md:py-32 w-full overflow-hidden">
            
            <Link href="/novedades" className="inline-flex items-center text-primary font-bold hover:underline mb-8">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver a Novedades
            </Link>

            <header className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
                        {post.category}
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
                    {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-text-muted text-sm border-t border-b border-gray-100 py-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <time>{post.date}</time>
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        <span>Por {post.author}</span>
                    </div>
                </div>
            </header>

            {post.image && (
                <div className="mb-12 rounded-2xl overflow-hidden shadow-sm bg-gray-50 border border-gray-100">
                    <img src={post.image} alt={post.title} className="w-full h-auto max-h-[500px] object-cover" />
                </div>
            )}

            <div className="prose prose-lg max-w-none prose-p:leading-relaxed prose-p:text-text-muted prose-headings:text-secondary">
                {post.content.map((paragraph, i) => (
                    <p key={i} className="mb-6">{paragraph}</p>
                ))}
            </div>

            <footer className="mt-16 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-text-muted">
                        <Tag className="w-5 h-5" />
                        <span>Tags: Fútbol, Inclusión, Andar</span>
                    </div>
                </div>
            </footer>
        </article>
    </div>
  );
}
