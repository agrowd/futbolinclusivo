import dbConnect from "@/lib/mongodb";
import Page from "@/lib/schemas/Page";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { slug } = params;
    
    const page = await Page.findOne({ slug, published: true });

    if (!page) {
      return NextResponse.json({ success: false, message: "Página no encontrada" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: page
    });
  } catch (error) {
    console.error("Error fetching public page:", error);
    return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
  }
}
