import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Load ENV
try {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    const lines = envContent.split(/\r?\n/);
    for (const line of lines) {
      const index = line.indexOf('=');
      if (index !== -1) {
        const key = line.substring(0, index).trim();
        const value = line.substring(index + 1).trim();
        if (key === "MONGODB_URI") {
          process.env.MONGODB_URI = value;
          break;
        }
      }
    }
  }
} catch (e) {
  console.error("Error reading .env:", e);
}

const MONGODB_URI = process.env.MONGODB_URI;

// Define Minimal Schema
const mediaSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  url: String,
  thumbnailUrl: String,
  category: String,
  featured: Boolean,
  tags: [String],
  createdAt: Date
}, { timestamps: true });

const Media = mongoose.models.Media || mongoose.model("Media", mediaSchema);

const featuredGalleries = [
  {
    title: "Inauguración Complejo Fútbol por la Inclusión",
    description: "La inauguración oficial del primer espacio deportivo inclusivo y accesible con 4 canchas de primer nivel en Moreno.",
    url: "https://www.youtube.com/watch?v=HSo1Fo3tRZ0",
    thumbnailUrl: "https://img.youtube.com/vi/HSo1Fo3tRZ0/hqdefault.jpg",
    category: "Video",
    featured: true,
    type: "video",
  },
  {
    title: "Complejo \"Fútbol por la Inclusión\" – ESPN F360",
    description: "Coverage especial de ESPN sobre el nuevo complejo inclusivo y su impacto en la comunidad.",
    url: "https://www.youtube.com/watch?v=NRPpf0zAUko",
    thumbnailUrl: "https://img.youtube.com/vi/NRPpf0zAUko/hqdefault.jpg",
    category: "Video",
    featured: false,
    type: "video",
  },
  {
    title: "Finales 2021 por CLA",
    description: "Los momentos más emocionantes de las finales de la Liga de Fútbol Inclusiva 2021.",
    url: "/multimedia/fotos-videos/finales-2021-cla",
    thumbnailUrl: "https://futbolinclusivo.org.ar/app/uploads/2021/12/FUTBOL-111221-371-Copiar-480x360.jpg",
    category: "Fotos",
    featured: false,
    type: "gallery"
  },
  {
    title: "1° Festival Inclusivo de Fútbol 3",
    description: "El primer festival inclusivo de fútbol 3 organizado por la Asociación Civil Andar.",
    url: "https://www.youtube.com/watch?v=e8RCwlkekDo",
    thumbnailUrl: "https://img.youtube.com/vi/e8RCwlkekDo/hqdefault.jpg",
    category: "Video",
    featured: false,
    type: "video",
  },
  {
    title: "Finales 2020",
    description: "La cobertura completa de las finales 2020 de la Liga de Fútbol Inclusiva.",
    url: "https://www.youtube.com/watch?v=1gEyBw8u-nI",
    thumbnailUrl: "https://img.youtube.com/vi/1gEyBw8u-nI/hqdefault.jpg",
    category: "Video",
    featured: false,
    type: "video",
  },
  {
    title: "Complejo Fútbol por la Inclusión – Lorena Callegaris",
    description: "Galería fotográfica profesional del complejo por la fotógrafa Lorena Callegaris.",
    url: "/multimedia/fotos-videos/lorena-callegaris",
    thumbnailUrl: "https://futbolinclusivo.org.ar/app/uploads/2022/07/MG_2412-Copiar-480x360.jpg",
    category: "Fotos",
    featured: false,
    type: "gallery"
  }
];

const allGalleries = [
  {
    title: "Finales 2021 por Paola Galvan",
    description: "Cobertura fotográfica de las finales 2021 por Paola Galvan.",
    url: "https://futbolinclusivo.org.ar/app/uploads/2021/12/CUA_5685-480x360.jpg",
    thumbnailUrl: "https://futbolinclusivo.org.ar/app/uploads/2021/12/CUA_5685-480x360.jpg",
    category: "Fotos",
    type: "gallery",
    featured: false
  },
  {
    title: "Festival CFR por CLA",
    description: "Festival CFR capturado por CLA Photography.",
    url: "https://futbolinclusivo.org.ar/app/uploads/2021/12/CFR-131121-164-480x360.jpg",
    thumbnailUrl: "https://futbolinclusivo.org.ar/app/uploads/2021/12/CFR-131121-164-480x360.jpg",
    category: "Fotos",
    type: "gallery",
    featured: false
  },
  {
    title: "Festival FI Infancias por Paola Galvan",
    description: "Festival de Fútbol Inclusivo Infancias por Paola Galvan.",
    url: "https://futbolinclusivo.org.ar/app/uploads/2021/12/CUA_7258-480x360.jpg",
    thumbnailUrl: "https://futbolinclusivo.org.ar/app/uploads/2021/12/CUA_7258-480x360.jpg",
    category: "Fotos",
    type: "gallery",
    featured: false
  },
  {
    title: "Finales 2020 por Lorena Callegaris",
    description: "Finales 2020 documentadas por Lorena Callegaris.",
    url: "https://futbolinclusivo.org.ar/app/uploads/2019/11/FINAL-LFI-2019-1-Copiar-480x360.jpg",
    thumbnailUrl: "https://futbolinclusivo.org.ar/app/uploads/2019/11/FINAL-LFI-2019-1-Copiar-480x360.jpg",
    category: "Fotos",
    type: "gallery",
    featured: false
  },
  {
    title: "Finales 2020 por Paola Galvan",
    description: "Perspectiva única de las finales 2020 por Paola Galvan.",
    url: "https://futbolinclusivo.org.ar/app/uploads/2019/11/ANC_9708-480x360.jpg",
    thumbnailUrl: "https://futbolinclusivo.org.ar/app/uploads/2019/11/ANC_9708-480x360.jpg",
    category: "Fotos",
    type: "gallery",
    featured: false
  },
  {
    title: "Finales 2020 por Sebastian Gil Miranda",
    description: "Cobertura artística de las finales 2020 por Sebastian Gil Miranda.",
    url: "https://futbolinclusivo.org.ar/app/uploads/2019/11/IMG_20191110_143354-480x360.jpg",
    thumbnailUrl: "https://futbolinclusivo.org.ar/app/uploads/2019/11/IMG_20191110_143354-480x360.jpg",
    category: "Fotos",
    type: "gallery",
    featured: false
  }
];

async function migrate() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined");
    process.exit(1);
  }

  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected");

    const allItems = [...featuredGalleries, ...allGalleries];
    console.log(`🚀 Migrating ${allItems.length} items...`);

    let count = 0;
    for (const item of allItems) {
      // Avoid duplicates
      const exists = await Media.findOne({ title: item.title });
      if (!exists) {
        await Media.create(item);
        count++;
      }
    }

    console.log(`✅ Migration complete! ${count} new items added.`);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected");
  }
}

migrate();
