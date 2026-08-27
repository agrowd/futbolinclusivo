import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
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
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, message: "No se proporcionó archivo válido" },
        { status: 400 }
      );
    }

    const rawBytes = await file.arrayBuffer();
    const rawBuffer = Buffer.from(rawBytes);

    // Optimize image with sharp to guarantee fast upload (< 3MB) and prevent Cloudinary 10MB limits
    let buffer = rawBuffer;
    try {
      buffer = await sharp(rawBuffer)
        .rotate() // auto-orient from EXIF
        .resize({ width: 2200, height: 2200, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 86, progressive: true })
        .toBuffer();
    } catch (sharpError) {
      console.warn("Sharp optimization skipped/failed, using raw buffer:", sharpError.message);
      buffer = rawBuffer;
    }

    if (isCloudinaryConfigured) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "futbolinclusivo/galeria",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        uploadStream.end(buffer);
      });

      return NextResponse.json({
        success: true,
        data: {
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
          size: result.bytes,
        },
      });
    } else {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "galeria");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filename = `img-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.jpg`;
      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, buffer);
      const publicUrl = `/uploads/galeria/${filename}`;

      return NextResponse.json({
        success: true,
        data: {
          url: publicUrl,
          publicId: filename,
          width: 1920,
          height: 1080,
          format: "jpg",
          size: buffer.length,
        },
      });
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Error al subir archivo" },
      { status: 500 }
    );
  }
}
