import dbConnect from "@/lib/mongodb";
import News from "@/lib/schemas/News";
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

  return <HomeClient dynamicNews={dynamicNews} />;
}
