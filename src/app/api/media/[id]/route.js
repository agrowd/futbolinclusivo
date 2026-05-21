import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Media from "@/lib/schemas/Media";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !["admin", "editor"].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 401 }
      );
    }

    await dbConnect();
    const { id } = await params;

    const media = await Media.findById(id);

    if (!media) {
      return NextResponse.json(
        { success: false, message: "Multimedia no encontrada" },
        { status: 404 }
      );
    }

    // Delete from Cloudinary if publicId exists
    if (media.publicId) {
      try {
        await cloudinary.uploader.destroy(media.publicId);
      } catch (cloudError) {
        console.error("Error deleting from Cloudinary:", cloudError);
        // We continue even if Cloudinary fails, to avoid orphaned DB records
        // Alternatively, we could fail here if we want strict sync.
      }
    }

    await Media.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Multimedia eliminada correctamente" });
  } catch (error) {
    console.error("Error deleting media:", error);
    return NextResponse.json(
      { success: false, message: "Error al eliminar multimedia" },
      { status: 500 }
    );
  }
}

