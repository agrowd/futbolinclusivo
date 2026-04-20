import dbConnect from "@/lib/mongodb";
import Page from "@/lib/schemas/Page";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.role !== "editor")) {
      return NextResponse.json({ success: false, message: "No autorizado" }, { status: 401 });
    }

    await dbConnect();
    const paramsResolved = await params;
    const { slug } = paramsResolved;
    let page = await Page.findOne({ slug }).lean();

    if (!page) {
      const { CMS_FALLBACKS } = await import("@/lib/cmsFallbacks");
      const fallbackData = CMS_FALLBACKS[slug];
      if (fallbackData) {
        return NextResponse.json({ 
          success: false, 
          message: "Página inicializada desde fallback",
          fallbackData 
        }, { status: 404 });
      }
      return NextResponse.json({ success: false, message: "Página no encontrada" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: page
    });
  } catch (error) {
    console.error("Error fetching admin page details:", error);
    return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.role !== "editor")) {
      return NextResponse.json({ success: false, message: "No autorizado" }, { status: 401 });
    }

    await dbConnect();
    const paramsResolved = await params;
    const { slug } = paramsResolved;
    const body = await request.json();

    const updated = await Page.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, message: "Página no encontrada" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Página actualizada correctamente",
      data: updated
    });
  } catch (error) {
    console.error("Error updating admin page:", error);
    return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
  }
}
