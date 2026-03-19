import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import Page from "@/lib/schemas/Page";
import { pageSchema } from "@/lib/validations";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");
    const published = searchParams.get("published");

    const query = {};
    
    if (section) {
      query.section = section;
    }
    
    if (published === "true") {
      query.published = true;
    }

    const pages = await Page.find(query).sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: pages });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { success: false, message: "Error al obtener páginas" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
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
    const validated = pageSchema.parse(body);

    const page = await Page.create(validated);

    return NextResponse.json(
      { success: true, data: page },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating page:", error);
    
    if (error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Datos inválidos", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Error al crear página" },
      { status: 500 }
    );
  }
}
