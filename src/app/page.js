import dbConnect from "@/lib/mongodb";
import News from "@/lib/schemas/News";
import Album from "@/lib/schemas/Album";
import HomeClient from "@/components/ui/HomeClient";

export default async function HomePage() {
  await dbConnect();

  // 1. Fetch the most recent published news
  let dynamicNews = [];
  try {
    const rawNews = await News.find({ published: true })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(6)
      .lean();
    
    dynamicNews = rawNews.map(news => ({
      _id: news._id.toString(),
      type: "news",
      title: news.title,
      slug: news.slug,
      href: `/novedades/${news.slug}`,
      category: news.category || "Novedad",
      image: news.image || "/andarfc-logo.png",
      date: news.publishedAt?.toISOString() || news.createdAt?.toISOString(),
      createdAt: news.createdAt?.toISOString(),
      updatedAt: news.updatedAt?.toISOString(),
      publishedAt: news.publishedAt?.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching news for home page:", error);
  }

  // 2. Fetch the most recent photo albums
  let dynamicAlbums = [];
  try {
    const rawAlbums = await Album.find({})
      .sort({ eventDate: -1, createdAt: -1 })
      .limit(6)
      .lean();

    dynamicAlbums = rawAlbums.map(album => ({
      _id: album._id.toString(),
      type: "album",
      title: album.title,
      slug: album.slug,
      href: `/multimedia/fotos/${album.slug}`,
      category: album.category || "Galería",
      coverImage: album.coverImage || album.photos?.[0]?.url || "/andarfc-logo.png",
      image: album.coverImage || album.photos?.[0]?.url || "/andarfc-logo.png",
      date: album.eventDate ? (album.eventDate.toISOString ? album.eventDate.toISOString() : String(album.eventDate)) : album.createdAt?.toISOString(),
      eventDate: album.eventDate ? (album.eventDate.toISOString ? album.eventDate.toISOString() : String(album.eventDate)) : null,
      createdAt: album.createdAt?.toISOString(),
      updatedAt: album.updatedAt?.toISOString(),
      photos: (album.photos || []).slice(0, 4).map(p => ({
        url: p.url,
        publicId: p.publicId,
        caption: p.caption,
      })),
      photoCount: album.photos?.length || 0,
    }));
  } catch (error) {
    console.error("Error fetching albums for home page:", error);
  }

  // 3. Combined latest feed for "Últimas Novedades" (News + Albums)
  const combinedFeed = [...dynamicNews, ...dynamicAlbums]
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 5);

  return (
    <HomeClient
      dynamicNews={combinedFeed}
      dynamicAlbums={dynamicAlbums.slice(0, 4)}
    />
  );
}
