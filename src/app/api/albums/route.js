import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Album from "@/lib/schemas/Album";

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

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const photographer = searchParams.get("photographer");
    const limit = parseInt(searchParams.get("limit") || "50");
    const page = parseInt(searchParams.get("page") || "1");

    const query = {};
    if (category && category !== "all" && category !== "Todos") {
      query.category = category;
    }
    if (photographer && photographer !== "all" && photographer !== "Todos") {
      query.photographer = photographer;
    }

    const skip = (page - 1) * limit;

    const [albums, total] = await Promise.all([
      Album.find(query)
        .sort({ eventDate: -1, createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean(),
      Album.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: albums,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching albums:", error);
    return NextResponse.json(
      { success: false, message: "Error al obtener álbumes" },
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
    const { title, category, eventDate, description, coverImage, driveLink, photos, featured, photographer } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, message: "El título del álbum es obligatorio" },
        { status: 400 }
      );
    }

    let slug = slugify(title);
    let existing = await Album.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const firstPhotoUrl = Array.isArray(photos) && photos.length > 0 ? photos[0].url : "";
    const albumCover = coverImage || firstPhotoUrl;

    const album = await Album.create({
      title: title.trim(),
      slug,
      category: category || "Superliga AFA",
      photographer: photographer ? photographer.trim() : "",
      eventDate: eventDate ? new Date(eventDate) : new Date(),
      description: description || "",
      coverImage: albumCover,
      driveLink: driveLink || "",
      featured: Boolean(featured),
      photos: Array.isArray(photos) ? photos : [],
      uploadedBy: session.user.email || "admin",
    });

    return NextResponse.json(
      { success: true, data: album },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating album:", error);
    return NextResponse.json(
      { success: false, message: "Error al crear el álbum" },
      { status: 500 }
    );
  }
}
