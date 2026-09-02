import Image from "next/image";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Album from "@/lib/schemas/Album";
import { Folder, Calendar, ImageIcon, Camera, ArrowRight, ExternalLink } from "lucide-react";
import { getLegacyContent, mapLegacyImage } from "@/lib/legacy-content";

export const metadata = {
  title: "Galería de Fotos y Fechas - Fútbol Inclusivo",
  description: "Álbumes de fotos oficiales por evento, ligas y competencias de Fútbol Inclusivo.",
};

const CATEGORIES = [
  "Todos",
  "Superliga AFA",
  "Liga BA",
  "Liga Nacional",
  "Escuela",
  "Festival LATAM",
  "Eventos",
];

async function getAlbumsData(selectedCategory) {
  try {
    await dbConnect();
    const query = {};
    if (selectedCategory && selectedCategory !== "Todos") {
      query.category = selectedCategory;
    }

    const albums = await Album.find(query)
      .sort({ eventDate: -1, createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(albums));
  } catch (error) {
    console.error("Error fetching albums for gallery page:", error);
    return [];
  }
}

export default async function MultimediaFotosPage({ searchParams }) {
  const params = await searchParams;
  const currentCategory = params?.categoria || "Todos";

  const albums = await getAlbumsData(currentCategory);

  // Legacy photos fallback
  const { assets } = await getLegacyContent();
  const urlToLocal = assets?.urlToLocal ?? {};
  const legacyUrls = Object.keys(urlToLocal).filter(
    (u) =>
      !u.toLowerCase().includes("ajax-loader.gif") &&
      !u.toLowerCase().includes("favicon") &&
      !u.toLowerCase().includes("/plugins/")
  ).slice(0, 24);

  return (
    <div className="bg-[#000B1A] text-white min-h-screen pt-36 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Banner */}
        <header className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#36b37e]/10 border border-[#36b37e]/20 text-[#36b37e] text-xs font-black uppercase tracking-widest mb-4">
            <Camera size={14} />
            <span>Archivo Fotográfico Oficial</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none text-white">
            Galería de <span className="text-[#36b37e]">Fotos y Fechas</span>
          </h1>
          <p className="text-white/60 mt-4 max-w-2xl text-sm sm:text-base leading-relaxed">
            Reviví cada jornada, torneo y competencia. Buscá las fotos oficiales de tu equipo e institución organizada por fecha y torneo.
          </p>
        </header>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat;
            const href = cat === "Todos" ? "/multimedia/fotos" : `/multimedia/fotos?categoria=${encodeURIComponent(cat)}`;
            return (
              <Link
                key={cat}
                href={href}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shrink-0 border ${
                  isActive
                    ? "bg-[#36b37e] text-black border-[#36b37e] shadow-lg shadow-[#36b37e]/20"
                    : "bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* ALBUMS GRID */}
        {albums.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {albums.map((album) => {
              const photoCount = album.photos?.length || 0;
              const dateStr = album.eventDate
                ? new Date(album.eventDate).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "";

              return (
                <Link
                  key={album._id}
                  href={`/multimedia/fotos/${album.slug}`}
                  className="group relative flex flex-col bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#36b37e]/40 rounded-3xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Cover Image Container */}
                  <div className="relative w-full aspect-16/10 bg-black/40 overflow-hidden">
                    {album.coverImage ? (
                      <Image
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20">
                        <Folder size={48} />
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-[#00132B]/80 backdrop-blur-md border border-white/15 text-[#36b37e] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
                      {album.category}
                    </div>

                    {/* Photo Count Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/15">
                      <ImageIcon size={14} className="text-[#36b37e]" />
                      <span>{photoCount} fotos</span>
                    </div>
                  </div>

                  {/* Album Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {dateStr && (
                          <div className="flex items-center gap-1.5 text-xs text-white/50">
                            <Calendar size={13} className="text-[#36b37e]" />
                            <span>{dateStr}</span>
                          </div>
                        )}
                        {album.title && album.title.includes("@") && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E1306C] bg-[#E1306C]/10 px-2.5 py-0.5 rounded-full border border-[#E1306C]/20">
                            <Camera size={11} />
                            <span>{album.title.match(/@([a-zA-Z0-9_.]+)/)?.[0]}</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-white group-hover:text-[#36b37e] transition-colors uppercase tracking-tight line-clamp-2">
                        {album.title}
                      </h3>
                      {album.description && (
                        <p className="text-xs text-white/60 mt-2 line-clamp-2">
                          {album.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-black uppercase text-[#36b37e] tracking-wider">
                      <span>Ver Galería Completa</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-10 text-center mb-16">
            <Folder size={48} className="mx-auto text-white/20 mb-4" />
            <h3 className="text-xl font-bold text-white uppercase mb-2">No hay álbumes creados en esta categoría</h3>
            <p className="text-sm text-white/50 max-w-md mx-auto">
              Próximamente estaremos publicando las galerías oficiales de las fechas disputadas.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
