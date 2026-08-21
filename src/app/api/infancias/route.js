import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import InfanciaRegistration from "@/lib/schemas/InfanciaRegistration";
import QRCode from "qrcode";
import { sendInfanciasEmail } from "@/lib/email";

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

    // Mandatory tutor validations (all required except clubOrSchool)
    if (!tutorName || !tutorName.trim()) {
      return NextResponse.json(
        { error: "El nombre y apellido del adulto responsable es obligatorio." },
        { status: 400 }
      );
    }

    if (!tutorPhone || !tutorPhone.trim()) {
      return NextResponse.json(
        { error: "El teléfono completo de contacto es obligatorio." },
        { status: 400 }
      );
    }

    if (!tutorEmail || !tutorEmail.trim() || !tutorEmail.includes("@") || !tutorEmail.includes(".")) {
      return NextResponse.json(
        { error: "El correo electrónico es obligatorio y debe tener un formato válido (ejemplo: usuario@gmail.com)." },
        { status: 400 }
      );
    }

    if (!locality || !locality.trim()) {
      return NextResponse.json(
        { error: "La localidad / barrio es obligatoria." },
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
      childrenList = children;
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

    // Validate every child mandatory fields
    for (let i = 0; i < childrenList.length; i++) {
      const c = childrenList[i];
      if (!c.childName || !c.childName.trim()) {
        return NextResponse.json(
          { error: `El nombre y apellido del participante #${i + 1} es obligatorio.` },
          { status: 400 }
        );
      }
      if (!c.childDni || !c.childDni.trim()) {
        return NextResponse.json(
          { error: `El DNI de ${c.childName || `participante #${i + 1}`} es obligatorio.` },
          { status: 400 }
        );
      }
      if (!c.childAge || !String(c.childAge).trim()) {
        return NextResponse.json(
          { error: `La edad de ${c.childName || `participante #${i + 1}`} es obligatoria.` },
          { status: 400 }
        );
      }
      if (!c.childBirthDate || !String(c.childBirthDate).trim()) {
        return NextResponse.json(
          { error: `La fecha de nacimiento de ${c.childName || `participante #${i + 1}`} es obligatoria.` },
          { status: 400 }
        );
      }
      if (!c.medicalNotes || !c.medicalNotes.trim()) {
        return NextResponse.json(
          { error: `Las observaciones médicas de ${c.childName || `participante #${i + 1}`} son obligatorias (si no posee, indicar "Ninguna").` },
          { status: 400 }
        );
      }
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

    // Trigger async email dispatch (non-blocking)
    if (tutorEmail && tutorEmail.trim()) {
      sendInfanciasEmail({
        tutorEmail: tutorEmail.trim().toLowerCase(),
        tutorName: tutorName ? tutorName.trim() : "",
        tutorPhone: tutorPhone ? tutorPhone.trim() : "",
        locality: locality ? locality.trim() : "",
        familyGroupId,
        tickets: createdTickets,
      }).catch((emailErr) => {
        console.error("[EMAIL] Error sending async email:", emailErr);
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
