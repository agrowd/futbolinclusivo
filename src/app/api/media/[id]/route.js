import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Media from "@/lib/schemas/Media";

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession();
    
    if (!session || !["admin", "editor"].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 401 }
      );
    }

    await dbConnect();

    const media = await Media.findByIdAndDelete(params.id);

    if (!media) {
      return NextResponse.json(
        { success: false, message: "Multimedia no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Multimedia eliminada" });
  } catch (error) {
    console.error("Error deleting media:", error);
    return NextResponse.json(
      { success: false, message: "Error al eliminar multimedia" },
      { status: 500 }
    );
  }
}
