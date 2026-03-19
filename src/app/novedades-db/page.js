import Link from "next/link";
import Image from "next/image";
import { Newspaper, Calendar, ArrowRight, Trophy } from "lucide-react";

export const metadata = {
  title: "Novedades",
  description: "Últimas noticias y novedades de la Liga de Fútbol Inclusiva y la Asociación Civil Andar.",
};

async function getNews() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/news?published=true&limit=20`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      console.error("Error fetching news:", res.status);
      return [];
    }
    
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export default async function NovedadesDBPage() {
  const news = await getNews();

  return (
    <div className="bg-[#000B1A] text-white min-h-screen pt-48 pb-32">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-[#36b37e]/10 text-[#36b37e] px-6 py-2.5 rounded-full font-black text-sm tracking-wider mb-8 uppercase border-2 border-[#36b37e]/30">
            <Newspaper size={14} />
            ACTUALIDAD
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-none">
            Novedades
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-medium">
            Las últimas noticias y sucesos de la Liga de Fútbol Inclusiva y la Asociación Civil Andar.
          </p>
        </header>

        {news.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/50 text-lg">No hay noticias publicadas</p>
          </div>
        ) : (
          <div role="feed" className="grid gap-6">
            {news.map((n) => (
              <Link
                key={n._id}
                href={`/novedades/${n.slug}`}
                className="group relative bg-white/2 border border-white/5 p-8 md:p-10 rounded-3xl transition-all hover:bg-white/5 hover:border-white/10 hover:-translate-y-1 shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#36b37e]/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[#36b37e]/10 transition-all duration-700" />
                
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                  <div className="w-16 h-16 shrink-0 bg-[#36b37e] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#36b37e]/20 group-hover:rotate-6 transition-transform">
                    <Trophy size={32} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar size={14} className="text-[#36b37e]" />
                      <time className="text-xs font-black text-[#36b37e] uppercase tracking-wider">
                        {new Date(n.publishedAt || n.createdAt).toLocaleDateString()}
                      </time>
                      {n.featured && (
                        <span className="text-xs font-black bg-yellow-500/20 text-yellow-400 px-3 py-1.5 rounded-full uppercase">
                          Destacada
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black mb-4 group-hover:text-[#36b37e] transition-colors tracking-tight uppercase leading-tight">
                      {n.title}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-5 items-start">
                      <p className="text-white/50 text-base md:text-lg leading-relaxed mb-0 font-medium">
                        {n.excerpt}
                      </p>
                      {n.image && (
                        <div className="relative w-full h-28 sm:h-24 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                          <Image
                            src={n.image}
                            alt={n.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 160px"
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <div className="inline-flex items-center gap-2 text-white font-black text-xs tracking-widest uppercase border-b-2 border-white/10 pb-1 group-hover:border-[#36b37e] group-hover:text-[#36b37e] transition-all mt-4">
                      Leer más <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
