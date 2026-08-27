import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import dbConnect from "../src/lib/mongodb.js";
import Album from "../src/lib/schemas/Album.js";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

async function run() {
  const folderPath = "C:\\Users\\Try Hard\\Desktop\\Fecha 2 - Sede CASLA - Superliga 2026";
  const title = "Superliga Inclusiva en AFA - Sábado 01/08 - San Lorenzo de Almagro - Fotografa Karo Nuñez";
  const category = "Superliga AFA";
  const eventDate = new Date("2026-08-01T12:00:00.000Z");
  const description = "Registro fotográfico oficial de la Fecha 2 en Sede San Lorenzo de Almagro (CASLA) por la Superliga Inclusiva en AFA. Cobertura fotográfica por Karo Nuñez.";

  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  await dbConnect();
  console.log("Conectado a MongoDB Atlas.");

  const files = fs.readdirSync(folderPath).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
  });

  console.log(`Encontradas ${files.length} fotos para subir en "${folderPath}"...`);

  const uploadedPhotos = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fullPath = path.join(folderPath, file);
    console.log(`[${i + 1}/${files.length}] Procesando y subiendo ${file}...`);

    // Optimize image with sharp
    const optimizedBuffer = await sharp(fullPath)
      .rotate()
      .resize({ width: 2200, height: 2200, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 86, progressive: true })
      .toBuffer();

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "futbolinclusivo/galeria/casla-2026-08-01",
          resource_type: "image",
        },
        (error, res) => {
          if (error) reject(error);
          else resolve(res);
        }
      );
      uploadStream.end(optimizedBuffer);
    });

    console.log(` -> OK! (${result.secure_url})`);

    uploadedPhotos.push({
      url: result.secure_url,
      publicId: result.public_id,
      caption: `${title} - Foto #${i + 1}`,
      width: result.width,
      height: result.height,
      size: result.bytes,
    });
  }

  let slug = slugify(title);
  const existing = await Album.findOne({ slug });
  if (existing) {
    slug = `${slug}-${Date.now().toString().slice(-4)}`;
  }

  console.log(`Guardando álbum "${title}" en MongoDB Atlas con ${uploadedPhotos.length} fotos...`);

  const album = await Album.create({
    title,
    slug,
    category,
    eventDate,
    description,
    driveLink: "",
    coverImage: uploadedPhotos.length > 0 ? uploadedPhotos[0].url : "",
    photos: uploadedPhotos,
    featured: false,
  });

  console.log("==========================================");
  console.log("🎉 ¡ÁLBUM CREADO EXITOSAMENTE EN BASE DE DATOS!");
  console.log("ID:", album._id.toString());
  console.log("Título:", album.title);
  console.log("Slug:", album.slug);
  console.log("Total fotos:", album.photos.length);
  console.log("Portada:", album.coverImage);
  console.log("==========================================");

  process.exit(0);
}

run().catch((err) => {
  console.error("Error al procesar el álbum:", err);
  process.exit(1);
});
