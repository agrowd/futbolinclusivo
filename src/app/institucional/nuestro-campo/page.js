import { getLegacyContent } from "@/lib/legacy-content";

export const metadata = {
  title: "Nuestro campo - Institucional",
  description: "Información institucional: Nuestro campo.",
};

export default async function NuestroCampoPage() {
  const { content } = await getLegacyContent();
  const pages = content?.institutionalExtract?.pages ?? {};
  const legacyKey = "Nosotros\\\\nuestro_campo\\\\nuestro_campo_source.txt";
  const data = pages[legacyKey];

  const paragraphs = (data?.text ?? []).filter(
    (t) =>
      t &&
      ![
        "Nosotros",
        "Nuestro propósito",
        "Nuestra historia",
        "Nuestro campo",
        "Nuestro equipo",
        "Nuestros aliados",
        "Nuestro impacto",
      ].includes(t)
  );

  return (
    <div className="bg-[#000B1A] text-white min-h-screen pt-40 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
          Nuestro campo
        </h1>
        <div className="mt-10 space-y-6 text-white/70 leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {!paragraphs.length && (
            <p className="text-white/50">
              Contenido no disponible todavía en el snapshot local.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

