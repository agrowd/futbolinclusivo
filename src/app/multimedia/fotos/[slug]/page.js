import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Album from "@/lib/schemas/Album";
import AlbumViewerClient from "./AlbumViewerClient";
import { ArrowLeft, Calendar, Folder, ExternalLink, Share2, Camera } from "lucide-react";

async function getAlbumBySlug(slug) {
  try {
    await dbConnect();
    // 1. Direct match by slug
    let album = await Album.findOne({ slug }).lean();
    if (album) return JSON.parse(JSON.stringify(album));

    // 2. Legacy alias fallback
    const legacyAliases = {
      "superliga-inclusiva-en-afa-sabado-2208-fotografo-sebastian": "superliga-inclusiva-en-afa-sabado-2208-sebastianacevedo-ar",
      "superliga-inclusiva-en-afa-sabado-0108-san-lorenzo-de-almagro-fotografa-karo-nunez": "superliga-inclusiva-en-afa-sabado-0108-san-lorenzo-de-almagro-karoniniez-ph",
    };

    if (legacyAliases[slug]) {
      album = await Album.findOne({ slug: legacyAliases[slug] }).lean();
    }

    if (!album) return null;
    return JSON.parse(JSON.stringify(album));
  } catch (error) {
    console.error("Error fetching album by slug:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);
  if (!album) {
    return { title: "Álbum no encontrado - Fútbol Inclusivo" };
  }

  return {
    title: `${album.title} - Fotos Fútbol Inclusivo`,
    description: album.description || `Galería de fotos oficial de ${album.title}.`,
    openGraph: {
      title: album.title,
      description: album.description || `Galería de fotos oficial de ${album.title}.`,
      images: album.coverImage ? [album.coverImage] : [],
    },
  };
}

export default async function AlbumDetailPage({ params }) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);

  if (!album) {
    notFound();
  }

  const dateStr = album.eventDate
    ? new Date(album.eventDate).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  const photographer = album.photographer || (album.title ? album.title.match(/@([a-zA-Z0-9_.]+)/)?.[0] : null);
  const isInstagram = photographer && photographer.startsWith("@");
  const instagramUsername = isInstagram ? photographer.replace("@", "") : null;

  return (
    <div className="bg-[#000B1A] text-white min-h-screen pt-36 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/multimedia/fotos"
            className="inline-flex items-center gap-2 text-xs font-black uppercase text-white/60 hover:text-[#36b37e] transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10"
          >
            <ArrowLeft size={16} />
            <span>Volver a Álbumes</span>
          </Link>
        </div>

        {/* Header */}
        <header className="mb-10 bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-[#36b37e]/20 text-[#36b37e] text-xs font-black uppercase px-3 py-1 rounded-full border border-[#36b37e]/30">
              {album.category}
            </span>
            {dateStr && (
              <span className="flex items-center gap-1.5 text-xs text-white/60 font-bold bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <Calendar size={14} className="text-[#36b37e]" />
                {dateStr}
              </span>
            )}
            <span className="text-xs text-white/50 font-bold bg-white/5 px-3 py-1 rounded-full border border-white/10">
              📸 {album.photos?.length || 0} fotos cargadas
            </span>
            {photographer && (
              isInstagram ? (
                <a
                  href={`https://instagram.com/${instagramUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-white font-black bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 px-3.5 py-1 rounded-full border border-white/20 shadow-md shadow-pink-500/20 hover:scale-105 transition-all"
                  title={`Ver perfil de ${photographer} en Instagram`}
                >
                  <Camera size={13} className="text-white" />
                  <span>Cobertura Fotográfica: {photographer}</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs text-[#36b37e] font-black bg-[#36b37e]/15 px-3.5 py-1 rounded-full border border-[#36b37e]/30">
                  <Camera size={13} />
                  <span>Cobertura: {photographer}</span>
                </span>
              )
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            {album.title}
          </h1>

          {album.description && (
            <p className="text-white/70 mt-3 text-sm sm:text-base max-w-3xl leading-relaxed">
              {album.description}
            </p>
          )}

          {/* External Drive Link If present */}
          {album.driveLink && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <a
                href={album.driveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#2980B9]/20 hover:bg-[#2980B9]/30 text-[#2980B9] font-bold text-xs sm:text-sm uppercase px-5 py-2.5 rounded-2xl border border-[#2980B9]/40 transition-colors"
              >
                <ExternalLink size={16} />
                <span>Ver Carpeta Completa en Google Drive</span>
              </a>
            </div>
          )}
        </header>

        {/* CLIENT VIEWER LIGHTBOX SLIDESHOW */}
        <AlbumViewerClient album={album} />

      </div>
    </div>
  );
}
