import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/futbolinclusivo";

const newsSchema = new mongoose.Schema({
  title: String,
  slug: String,
  excerpt: String,
  content: String,
  image: String,
  category: String,
  author: { type: String, default: "Asociación Civil Andar" },
  published: { type: Boolean, default: true },
  publishedAt: Date,
  featured: Boolean,
  tags: [String],
  views: { type: Number, default: 0 },
}, { timestamps: true });

const mediaSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  url: String,
  publicId: String,
  thumbnailUrl: String,
  category: String,
  tags: [String],
  uploadedBy: { type: String, default: "admin" },
}, { timestamps: true });

const News = mongoose.models.News || mongoose.model("News", newsSchema);
const Media = mongoose.models.Media || mongoose.model("Media", mediaSchema);

async function importLegacyData() {
  try {
    console.log("🔌 Conectando a MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Conectado a MongoDB");

    const legacyContentPath = path.join(__dirname, "../public/legacy/legacy-content.json");
    const legacyAssetsPath = path.join(__dirname, "../public/legacy/legacy-assets-map.json");

    console.log("\n📖 Leyendo archivos legacy...");
    const contentData = JSON.parse(await fs.readFile(legacyContentPath, "utf8"));
    const assetsData = JSON.parse(await fs.readFile(legacyAssetsPath, "utf8"));

    console.log("\n📰 Importando noticias...");
    const newsItems = contentData.news?.items || [];
    let newsImported = 0;

    for (const item of newsItems) {
      const existing = await News.findOne({ slug: item.slug });
      
      if (!existing) {
        await News.create({
          title: item.title,
          slug: item.slug,
          excerpt: item.excerpt || "",
          content: item.excerpt || "",
          image: item.image,
          category: item.category || "Novedades",
          published: true,
          publishedAt: new Date(item.date),
          featured: false,
          tags: [],
        });
        newsImported++;
      }
    }

    console.log(`✅ ${newsImported} noticias importadas (${newsItems.length - newsImported} ya existían)`);

    console.log("\n🎬 Importando videos...");
    const videoItems = contentData.multimedia?.videos?.items || [];
    let videosImported = 0;

    for (const item of videoItems) {
      const existing = await Media.findOne({ url: item.url });
      
      if (!existing) {
        await Media.create({
          title: `Video - ${item.source}`,
          description: "",
          type: "video",
          url: item.url,
          category: "Otros",
          tags: [],
        });
        videosImported++;
      }
    }

    console.log(`✅ ${videosImported} videos importados (${videoItems.length - videosImported} ya existían)`);

    console.log("\n🖼️  Importando imágenes...");
    const imageUrls = Object.keys(assetsData.urlToLocal || {});
    const filteredImages = imageUrls.filter(
      (url) =>
        !url.toLowerCase().includes("ajax-loader.gif") &&
        !url.toLowerCase().includes("favicon") &&
        !url.toLowerCase().includes("/plugins/")
    ).slice(0, 100);

    let imagesImported = 0;

    for (const url of filteredImages) {
      const existing = await Media.findOne({ url });
      
      if (!existing) {
        await Media.create({
          title: path.basename(url),
          description: "",
          type: "image",
          url: assetsData.urlToLocal[url],
          category: "Otros",
          tags: [],
        });
        imagesImported++;
      }
    }

    console.log(`✅ ${imagesImported} imágenes importadas (${filteredImages.length - imagesImported} ya existían)`);

    console.log("\n✨ Importación completada exitosamente!");
    console.log(`\n📊 Resumen:`);
    console.log(`   - Noticias: ${newsImported} nuevas`);
    console.log(`   - Videos: ${videosImported} nuevos`);
    console.log(`   - Imágenes: ${imagesImported} nuevas`);

  } catch (error) {
    console.error("❌ Error durante la importación:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Desconectado de MongoDB");
  }
}

importLegacyData();
