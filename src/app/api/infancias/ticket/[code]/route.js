import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import InfanciaRegistration from "@/lib/schemas/InfanciaRegistration";
import QRCode from "qrcode";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const code = resolvedParams?.code?.toUpperCase();

    if (!code) {
      return NextResponse.json({ error: "Código inválido" }, { status: 400 });
    }

    const registration = await InfanciaRegistration.findOne({
      $or: [{ ticketCode: code }, { _id: code.length === 24 ? code : null }],
      status: "active",
    }).lean();

    if (!registration) {
      return NextResponse.json(
        { error: "Pase de inscripción no encontrado" },
        { status: 404 }
      );
    }

    const qrPayload = JSON.stringify({
      code: registration.ticketCode,
      id: registration._id.toString(),
      name: registration.childName,
    });

    const qrDataUrl = await QRCode.toDataURL(qrPayload, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: 320,
      color: {
        dark: "#000B1A",
        light: "#FFFFFF",
      },
    });

    return NextResponse.json({
      success: true,
      ticket: {
        ...registration,
        qrDataUrl,
      },
    });
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return NextResponse.json(
      { error: "Error al consultar el ticket" },
      { status: 500 }
    );
  }
}
