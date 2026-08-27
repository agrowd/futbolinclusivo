import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Album from "@/lib/schemas/Album";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    await dbConnect();

    const album = await Album.findOne({ slug }).lean();

    if (!album) {
      return NextResponse.json(
        { success: false, message: "Álbum no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: album,
    });
  } catch (error) {
    console.error("Error fetching album:", error);
    return NextResponse.json(
      { success: false, message: "Error al obtener el álbum" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { slug } = await params;
    const session = await getServerSession(authOptions);

    if (!session || !["admin", "editor"].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const album = await Album.findOne({ slug });

    if (!album) {
      return NextResponse.json(
        { success: false, message: "Álbum no encontrado" },
        { status: 404 }
      );
    }

    if (body.title) album.title = body.title.trim();
    if (body.category) album.category = body.category;
    if (body.eventDate) album.eventDate = new Date(body.eventDate);
    if (body.description !== undefined) album.description = body.description;
    if (body.coverImage !== undefined) album.coverImage = body.coverImage;
    if (body.driveLink !== undefined) album.driveLink = body.driveLink;
    if (body.featured !== undefined) album.featured = Boolean(body.featured);
    if (Array.isArray(body.photos)) album.photos = body.photos;

    await album.save();

    return NextResponse.json({
      success: true,
      data: album,
    });
  } catch (error) {
    console.error("Error updating album:", error);
    return NextResponse.json(
      { success: false, message: "Error al actualizar el álbum" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;
    const session = await getServerSession(authOptions);

    if (!session || !["admin", "editor"].includes(session.user.role)) {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 401 }
      );
    }

    await dbConnect();

    const album = await Album.findOneAndDelete({ slug });

    if (!album) {
      return NextResponse.json(
        { success: false, message: "Álbum no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Álbum eliminado correctamente",
    });
  } catch (error) {
    console.error("Error deleting album:", error);
    return NextResponse.json(
      { success: false, message: "Error al eliminar el álbum" },
      { status: 500 }
    );
  }
}
