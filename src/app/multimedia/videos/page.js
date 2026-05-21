import Link from "next/link";
import { getLegacyContent } from "@/lib/legacy-content";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Videos - Multimedia",
  description: "Videos y embeds históricos de Fútbol Inclusivo.",
};

function normalizeEmbed(url) {
  // Forzamos https y dejamos el embed listo para iframe.
  try {
    const u = new URL(url);
    u.protocol = "https:";
    return u.toString();
  } catch {
    return url;
  }
}

export default async function MultimediaVideosPage() {
  const { content } = await getLegacyContent();
  const videos = content?.multimedia?.videos?.items ?? [];

  return (
    <div className="bg-[#000B1A] text-white min-h-screen pt-40 pb-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            Videos
          </h1>
          <p className="text-white/50 mt-4 max-w-2xl">
            Este listado se genera desde el contenido rescatado del sitio viejo. Si el embed deja de existir,
            el link de origen queda documentado.
          </p>
          <div className="mt-6">
            <Link href="/multimedia" className="text-[#36b37e] font-black text-xs tracking-widest uppercase underline underline-offset-4">
              Volver a Multimedia
            </Link>
          </div>
        </header>

        <div className="grid gap-8">
          {videos.map((v) => (
            <section key={v.url} className="rounded-3xl border border-white/10 bg-white/3 overflow-hidden">
              <div className="p-5 flex items-start justify-between gap-4">
                <div>
                  <div className="text-white/60 text-xs tracking-widest uppercase font-black">Origen</div>
                  <div className="text-white/80 text-sm break-all">{v.source}</div>
                </div>
                <a
                  href={v.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[#36b37e] font-black text-xs tracking-widest uppercase"
                >
                  Abrir <ExternalLink size={16} />
                </a>
              </div>
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={normalizeEmbed(v.url)}
                  title="Video"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </section>
          ))}

          {!videos.length && (
            <div className="text-white/60">
              Todavía no se detectaron videos en los archivos rescatados.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

