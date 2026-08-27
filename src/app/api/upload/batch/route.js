import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

const isCloudinaryConfigured =
  Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) &&
  Boolean(process.env.CLOUDINARY_API_KEY) &&
  Boolean(process.env.CLOUDINARY_API_SECRET);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !["admin", "editor"].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: "No se proporcionaron archivos" },
        { status: 400 }
      );
    }

    const uploadedResults = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (typeof file === "string") continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      if (isCloudinaryConfigured) {
        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "futbolinclusivo/galeria",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(buffer);
        });

        uploadedResults.push({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
          size: result.bytes,
        });
      } else {
        // Local upload fallback
        const uploadDir = path.join(process.cwd(), "public", "uploads", "galeria");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const ext = path.extname(file.name) || ".jpg";
        const filename = `img-${Date.now()}-${i}${ext}`;
        const filePath = path.join(uploadDir, filename);

        fs.writeFileSync(filePath, buffer);
        const publicUrl = `/uploads/galeria/${filename}`;

        uploadedResults.push({
          url: publicUrl,
          publicId: filename,
          width: 1200,
          height: 800,
          format: ext.replace(".", ""),
          size: buffer.length,
        });
      }
    }

    return NextResponse.json({
      success: true,
      count: uploadedResults.length,
      data: uploadedResults,
    });
  } catch (error) {
    console.error("Error in batch upload:", error);
    return NextResponse.json(
      { success: false, message: "Error al procesar lote de imágenes" },
      { status: 500 }
    );
  }
}
