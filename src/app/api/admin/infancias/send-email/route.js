import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import InfanciaRegistration from "@/lib/schemas/InfanciaRegistration";
import QRCode from "qrcode";
import { sendInfanciasEmail } from "@/lib/email";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const { ticketCode, familyGroupId, id } = body;

    if (!ticketCode && !familyGroupId && !id) {
      return NextResponse.json(
        { error: "Se requiere ticketCode, familyGroupId o id." },
        { status: 400 }
      );
    }

    let query = {};
    if (id) {
      query._id = id;
    } else if (ticketCode) {
      query.ticketCode = ticketCode;
    } else if (familyGroupId) {
      query.familyGroupId = familyGroupId;
    }

    const targetRegistration = await InfanciaRegistration.findOne(query);

    if (!targetRegistration) {
      return NextResponse.json(
        { error: "No se encontró la inscripción especificada." },
        { status: 404 }
      );
    }

    // Fetch all siblings/family members if familyGroupId exists
    let familyRegistrations = [targetRegistration];
    if (targetRegistration.familyGroupId) {
      familyRegistrations = await InfanciaRegistration.find({
        familyGroupId: targetRegistration.familyGroupId,
      });
    }

    const tickets = await Promise.all(
      familyRegistrations.map(async (reg) => {
        const qrPayload = JSON.stringify({
          code: reg.ticketCode,
          id: reg._id.toString(),
          name: reg.childName,
        });

        const qrDataUrl = await QRCode.toDataURL(qrPayload, {
          errorCorrectionLevel: "M",
          margin: 2,
          width: 320,
          color: { dark: "#000B1A", light: "#FFFFFF" },
        });

        return {
          id: reg._id,
          ticketCode: reg.ticketCode,
          childName: reg.childName,
          childDni: reg.childDni,
          childAge: reg.childAge,
          tutorName: reg.tutorName,
          tutorPhone: reg.tutorPhone,
          locality: reg.locality,
          medicalNotes: reg.medicalNotes,
          createdAt: reg.createdAt,
          qrDataUrl,
        };
      })
    );

    const tutorEmail = targetRegistration.tutorEmail;

    if (!tutorEmail || !tutorEmail.includes("@")) {
      return NextResponse.json(
        { error: "La inscripción no posee un email de contacto válido." },
        { status: 400 }
      );
    }

    const emailResult = await sendInfanciasEmail({
      tutorEmail: tutorEmail.trim().toLowerCase(),
      tutorName: targetRegistration.tutorName,
      tutorPhone: targetRegistration.tutorPhone,
      locality: targetRegistration.locality,
      familyGroupId: targetRegistration.familyGroupId,
      tickets: tickets,
    });

    if (emailResult.error) {
      return NextResponse.json(
        { error: `Error al enviar correo con Resend: ${emailResult.error}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Email enviado exitosamente a ${tutorEmail} con ${tickets.length} pases QR.`,
      recipient: tutorEmail,
      ticketsCount: tickets.length,
    });
  } catch (error) {
    console.error("Error in admin resend email endpoint:", error);
    return NextResponse.json(
      { error: "Error al procesar el envío de correo." },
      { status: 500 }
    );
  }
}
