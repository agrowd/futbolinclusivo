import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import News from "@/lib/schemas/News";
import { newsSchema } from "@/lib/validations";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const news = await News.findById(id).lean();

    if (!news) {
      return NextResponse.json(
        { success: false, message: "Noticia no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { success: false, message: "Error al obtener noticia" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
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

    const body = await request.json();
    const validated = newsSchema.partial().parse(body);

    if (validated.published && !validated.publishedAt) {
      validated.publishedAt = new Date();
    }

    const news = await News.findByIdAndUpdate(
      id,
      validated,
      { new: true, runValidators: true }
    );

    if (!news) {
      return NextResponse.json(
        { success: false, message: "Noticia no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    console.error("Error updating news:", error);
    
    if (error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Datos inválidos", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Error al actualizar noticia" },
      { status: 500 }
    );
  }
}

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

    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return NextResponse.json(
        { success: false, message: "Noticia no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Noticia eliminada" });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { success: false, message: "Error al eliminar noticia" },
      { status: 500 }
    );
  }
}
