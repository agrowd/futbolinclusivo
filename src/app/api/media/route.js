import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Media from "@/lib/schemas/Media";
import { mediaSchema } from "@/lib/validations";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "50");
    const page = parseInt(searchParams.get("page") || "1");

    const query = {};
    
    if (type) {
      query.type = type;
    }
    
    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;

    const [media, total] = await Promise.all([
      Media.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean(),
      Media.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: media,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { success: false, message: "Error al obtener multimedia" },
      { status: 500 }
    );
  }
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

    await dbConnect();

    const body = await request.json();
    const validated = mediaSchema.parse(body);

    validated.uploadedBy = session.user.email;

    const media = await Media.create(validated);

    return NextResponse.json(
      { success: true, data: media },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating media:", error);
    
    if (error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Datos inválidos", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Error al crear multimedia" },
      { status: 500 }
    );
  }
}
