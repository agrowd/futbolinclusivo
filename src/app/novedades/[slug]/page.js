import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getLegacyContent, mapLegacyImage } from "@/lib/legacy-content";

async function getPostBySlug(slug) {
  const { content, assets } = await getLegacyContent();
  const items = content?.news?.items ?? [];
  const found = items.find((n) => n.slug === slug);
  return { post: found ?? null, urlToLocal: assets?.urlToLocal ?? {} };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { post } = await getPostBySlug(slug);
  if (!post) {
    return { title: "Post no encontrado" };
  }
  return {
    title: `${post.title} - Novedades`,
    description: post.excerpt ? `${post.excerpt}` : "Novedades de Fútbol Inclusivo",
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const { post, urlToLocal } = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // En el legado, este JSON contiene listado + excerpt. El cuerpo completo se puede agregar
  // luego desde un extractor de “detalle” por URL. Por ahora mostramos excerpt ampliado.
  const paragraphs = [post.excerpt].filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen bg-[#000B1A] text-white/80 overflow-x-hidden">
        <article className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-16 md:py-28 w-full overflow-hidden max-w-4xl">
            
            <Link href="/novedades" className="inline-flex items-center text-primary font-bold hover:underline mb-8">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver a Novedades
            </Link>

            <header className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
                        {post.category || "Novedades"}
                    </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
                    {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-text-muted text-sm border-t border-b border-white/10 py-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <time>{post.date || ""}</time>
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        <span>{post.category ? `Categoría: ${post.category}` : "Fútbol Inclusivo"}</span>
                    </div>
                </div>
            </header>

            {post.image && (
                <div className="mb-12 rounded-2xl overflow-hidden shadow-sm bg-white/5 border border-white/10">
                    <div className="relative w-full h-[240px] sm:h-[320px] md:h-[420px]">
                      <Image
                        src={mapLegacyImage(urlToLocal, post.image)}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover"
                      />
                    </div>
                </div>
            )}

            <div className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed">
                {paragraphs.map((paragraph, i) => (
                    <p key={i} className="mb-6">{paragraph}</p>
                ))}
            </div>

            <footer className="mt-16 pt-8 border-t border-white/10">
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
