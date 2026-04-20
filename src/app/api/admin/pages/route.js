import dbConnect from "@/lib/mongodb";
import Page from "@/lib/schemas/Page";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.role !== "editor")) {
      return NextResponse.json({ success: false, message: "No autorizado" }, { status: 401 });
    }

    await dbConnect();
    const pages = await Page.find({}).sort({ section: 1, title: 1 });

    return NextResponse.json({
      success: true,
      data: pages
    });
  } catch (error) {
    console.error("Error fetching admin pages:", error);
    return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.role !== "editor")) {
      return NextResponse.json({ success: false, message: "No autorizado" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { title, slug, content, section, published } = body;

    const page = await Page.create({ title, slug, content, section, published });

    return NextResponse.json({
      success: true,
      message: "Página creada correctamente",
      data: page
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating page:", error);
    if (error.code === 11000) {
      return NextResponse.json({ success: false, message: "El slug ya existe" }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
  }
}
