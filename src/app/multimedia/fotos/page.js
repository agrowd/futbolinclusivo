import Image from "next/image";
import { getLegacyContent, mapLegacyImage } from "@/lib/legacy-content";

export const metadata = {
  title: "Fotos - Multimedia",
  description: "Galería de fotos históricas de Fútbol Inclusivo.",
};

export default async function MultimediaFotosPage() {
  const { assets } = await getLegacyContent();
  const urlToLocal = assets?.urlToLocal ?? {};
  const urls = Object.keys(urlToLocal);

  // Filtrado simple para evitar iconitos/loader; si aparecen en el mapa igual, se pueden excluir acá.
  const filtered = urls.filter(
    (u) =>
      !u.toLowerCase().includes("ajax-loader.gif") &&
      !u.toLowerCase().includes("favicon") &&
      !u.toLowerCase().includes("/plugins/")
  );

  // Para performance: mostramos una cantidad razonable. Luego se puede paginar.
  const items = filtered.slice(0, 120);

  return (
    <div className="bg-[#000B1A] text-white min-h-screen pt-40 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            Fotos
          </h1>
          <p className="text-white/50 mt-4 max-w-2xl">
            Archivo visual histórico. Estas imágenes se guardan localmente para que el sitio nuevo no dependa del viejo.
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((remoteUrl) => {
            const src = mapLegacyImage(urlToLocal, remoteUrl);
            return (
              <a
                key={remoteUrl}
                href={src}
                className="group relative block rounded-2xl overflow-hidden border border-white/10 bg-white/5"
              >
                <div className="relative w-full aspect-4/3">
                  <Image
                    src={src}
                    alt="Foto de Fútbol Inclusivo"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

