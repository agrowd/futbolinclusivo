import dbConnect from "@/lib/mongodb";
import News from "@/lib/schemas/News";
import Album from "@/lib/schemas/Album";
import HomeClient from "@/components/ui/HomeClient";

export default async function HomePage() {
  await dbConnect();

  // Fetch the 3 most recent published news
  let dynamicNews = [];
  try {
    dynamicNews = await News.find({ published: true })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(3)
      .lean();
    
    // Serialize MongoDB objects for Client Component
    dynamicNews = dynamicNews.map(news => ({
      ...news,
      _id: news._id.toString(),
      createdAt: news.createdAt?.toISOString(),
      updatedAt: news.updatedAt?.toISOString(),
      publishedAt: news.publishedAt?.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching news for home page:", error);
  }

  // Fetch the 4 most recent photo albums
  let dynamicAlbums = [];
  try {
    dynamicAlbums = await Album.find({})
      .sort({ eventDate: -1, createdAt: -1 })
      .limit(4)
      .lean();

    dynamicAlbums = dynamicAlbums.map(album => ({
      ...album,
      _id: album._id.toString(),
      createdAt: album.createdAt?.toISOString(),
      updatedAt: album.updatedAt?.toISOString(),
      eventDate: album.eventDate ? (album.eventDate.toISOString ? album.eventDate.toISOString() : String(album.eventDate)) : null,
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

  return <HomeClient dynamicNews={dynamicNews} dynamicAlbums={dynamicAlbums} />;
}
