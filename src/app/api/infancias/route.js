import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import InfanciaRegistration from "@/lib/schemas/InfanciaRegistration";
import QRCode from "qrcode";

function generateTicketCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `INF-${random}`;
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const {
      childName,
      childDni,
      childAge,
      childBirthDate,
      tutorName,
      tutorPhone,
      tutorEmail,
      locality,
      clubOrSchool,
      medicalNotes,
      imageConsent,
    } = body;

    // Strict validations
    if (!childName || !childName.trim()) {
      return NextResponse.json(
        { error: "El nombre completo del niño/a es obligatorio." },
        { status: 400 }
      );
    }

    if (!tutorPhone || !tutorPhone.trim()) {
      return NextResponse.json(
        { error: "El teléfono completo de contacto es obligatorio." },
        { status: 400 }
      );
    }

    if (imageConsent !== true && imageConsent !== "true") {
      return NextResponse.json(
        { error: "La autorización para el uso de imagen es obligatoria." },
        { status: 400 }
      );
    }

    // Generate a unique ticket code
    let ticketCode = generateTicketCode();
    let exists = await InfanciaRegistration.findOne({ ticketCode });
    let attempts = 0;
    while (exists && attempts < 10) {
      ticketCode = generateTicketCode();
      exists = await InfanciaRegistration.findOne({ ticketCode });
      attempts++;
    }

    const registration = await InfanciaRegistration.create({
      ticketCode,
      childName: childName.trim(),
      childDni: childDni ? childDni.trim() : "",
      childAge: childAge ? String(childAge).trim() : "",
      childBirthDate: childBirthDate ? String(childBirthDate).trim() : "",
      tutorName: tutorName ? tutorName.trim() : "",
      tutorPhone: tutorPhone.trim(),
      tutorEmail: tutorEmail ? tutorEmail.trim().toLowerCase() : "",
      locality: locality ? locality.trim() : "",
      clubOrSchool: clubOrSchool ? clubOrSchool.trim() : "",
      medicalNotes: medicalNotes ? medicalNotes.trim() : "",
      imageConsent: true,
      attended: false,
      status: "active",
    });

    // Generate QR Code data URL
    const qrPayload = JSON.stringify({
      code: ticketCode,
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

    return NextResponse.json(
      {
        success: true,
        message: "Inscripción registrada con éxito",
        ticket: {
          id: registration._id,
          ticketCode: registration.ticketCode,
          childName: registration.childName,
          childDni: registration.childDni,
          childAge: registration.childAge,
          tutorName: registration.tutorName,
          tutorPhone: registration.tutorPhone,
          locality: registration.locality,
          createdAt: registration.createdAt,
          qrDataUrl,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Infancias registration:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al procesar la inscripción. Por favor intentá nuevamente." },
      { status: 500 }
    );
  }
}
