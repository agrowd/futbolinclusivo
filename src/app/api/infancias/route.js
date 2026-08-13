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

function generateFamilyGroupId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `FAM-${random}`;
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const {
      tutorName,
      tutorPhone,
      tutorEmail,
      locality,
      clubOrSchool,
      imageConsent,
      children, // Array of children: [{ childName, childDni, childAge, childBirthDate, medicalNotes }]
      childName, // Fallback for single child
      childDni,
      childAge,
      childBirthDate,
      medicalNotes,
    } = body;

    // Common tutor validations
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

    // Normalize children list
    let childrenList = [];
    if (Array.isArray(children) && children.length > 0) {
      childrenList = children.filter((c) => c.childName && c.childName.trim());
    } else if (childName && childName.trim()) {
      childrenList = [
        {
          childName,
          childDni: childDni || "",
          childAge: childAge || "",
          childBirthDate: childBirthDate || "",
          medicalNotes: medicalNotes || "",
        },
      ];
    }

    if (childrenList.length === 0) {
      return NextResponse.json(
        { error: "Debes ingresar los datos de al menos un niño o niña." },
        { status: 400 }
      );
    }

    const familyGroupId = generateFamilyGroupId();
    const createdTickets = [];

    for (const child of childrenList) {
      if (!child.childName || !child.childName.trim()) continue;

      // Generate unique ticket code
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
        familyGroupId,
        childName: child.childName.trim(),
        childDni: child.childDni ? child.childDni.trim() : "",
        childAge: child.childAge ? String(child.childAge).trim() : "",
        childBirthDate: child.childBirthDate ? String(child.childBirthDate).trim() : "",
        tutorName: tutorName ? tutorName.trim() : "",
        tutorPhone: tutorPhone.trim(),
        tutorEmail: tutorEmail ? tutorEmail.trim().toLowerCase() : "",
        locality: locality ? locality.trim() : "",
        clubOrSchool: clubOrSchool ? clubOrSchool.trim() : "",
        medicalNotes: child.medicalNotes ? child.medicalNotes.trim() : "",
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

      createdTickets.push({
        id: registration._id,
        ticketCode: registration.ticketCode,
        childName: registration.childName,
        childDni: registration.childDni,
        childAge: registration.childAge,
        tutorName: registration.tutorName,
        tutorPhone: registration.tutorPhone,
        locality: registration.locality,
        medicalNotes: registration.medicalNotes,
        createdAt: registration.createdAt,
        qrDataUrl,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message:
          createdTickets.length === 1
            ? "Inscripción registrada con éxito"
            : `¡Se registraron con éxito las ${createdTickets.length} inscripciones familiares!`,
        familyGroupId,
        ticket: createdTickets[0], // For single compatibility
        tickets: createdTickets, // For multi-child family view
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
