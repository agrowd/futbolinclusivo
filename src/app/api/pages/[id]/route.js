import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Page from "@/lib/schemas/Page";
import { pageSchema } from "@/lib/validations";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const page = await Page.findById(params.id).lean();

    if (!page) {
      return NextResponse.json(
        { success: false, message: "Página no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { success: false, message: "Error al obtener página" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession();
    
    if (!session || !["admin", "editor"].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const validated = pageSchema.partial().parse(body);

    const page = await Page.findByIdAndUpdate(
      params.id,
      validated,
      { new: true, runValidators: true }
    );

    if (!page) {
      return NextResponse.json(
        { success: false, message: "Página no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    console.error("Error updating page:", error);
    
    if (error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Datos inválidos", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Error al actualizar página" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession();
    
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 401 }
      );
    }

    await dbConnect();

    const page = await Page.findByIdAndDelete(params.id);

    if (!page) {
      return NextResponse.json(
        { success: false, message: "Página no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Página eliminada" });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { success: false, message: "Error al eliminar página" },
      { status: 500 }
    );
  }
}
