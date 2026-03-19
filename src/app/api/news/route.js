import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/mongodb";
import News from "@/lib/schemas/News";
import { newsSchema } from "@/lib/validations";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");

    const query = {};
    
    if (published === "true") {
      query.published = true;
    }
    
    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;

    const [news, total] = await Promise.all([
      News.find(query)
        .sort({ publishedAt: -1, createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean(),
      News.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: news,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { success: false, message: "Error al obtener noticias" },
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
    const validated = newsSchema.parse(body);

    if (validated.published && !validated.publishedAt) {
      validated.publishedAt = new Date();
    }

    const news = await News.create(validated);

    return NextResponse.json(
      { success: true, data: news },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating news:", error);
    
    if (error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Datos inválidos", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Error al crear noticia" },
      { status: 500 }
    );
  }
}
