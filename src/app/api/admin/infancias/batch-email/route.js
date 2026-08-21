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
    const body = await req.json().catch(() => ({}));
    const onlyPending = body.onlyPending !== false; // Default: true

    const allRegistrations = await InfanciaRegistration.find({ status: "active" }).sort({ createdAt: -1 });

    if (!allRegistrations || allRegistrations.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No hay inscripciones registradas en la base de datos.",
        processedFamilies: 0,
        emailsSent: 0,
        skippedNoEmail: 0,
      });
    }

    // Group registrations by familyGroupId or tutorEmail
    const familyGroupsMap = new Map();

    allRegistrations.forEach((reg) => {
      const groupKey = reg.familyGroupId || reg.tutorEmail || reg._id.toString();
      if (!familyGroupsMap.has(groupKey)) {
        familyGroupsMap.set(groupKey, []);
      }
      familyGroupsMap.get(groupKey).push(reg);
    });

    let emailsSent = 0;
    let skippedNoEmail = 0;
    let skippedAlreadySent = 0;
    const errorsList = [];
    const logsList = [];

    for (const [groupKey, familyMembers] of familyGroupsMap.entries()) {
      const firstMember = familyMembers[0];
      const tutorEmail = firstMember.tutorEmail ? firstMember.tutorEmail.trim().toLowerCase() : "";

      if (!tutorEmail || !tutorEmail.includes("@") || !tutorEmail.includes(".")) {
        skippedNoEmail += familyMembers.length;
        logsList.push({
          family: firstMember.tutorName || "Sin Nombre",
          status: "skipped_no_email",
          count: familyMembers.length,
          message: "Sin email de contacto válido",
        });
        continue;
      }

      // Check if already sent
      const isAlreadySent = familyMembers.every((m) => m.emailSent === true);
      if (onlyPending && isAlreadySent) {
        skippedAlreadySent += familyMembers.length;
        logsList.push({
          family: firstMember.tutorName,
          status: "skipped_already_sent",
          count: familyMembers.length,
          email: tutorEmail,
          message: "Ya se le había enviado correo previamente",
        });
        continue;
      }

      // Generate QR codes for all family tickets
      const tickets = await Promise.all(
        familyMembers.map(async (reg) => {
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

      const emailResult = await sendInfanciasEmail({
        tutorEmail,
        tutorName: firstMember.tutorName,
        tutorPhone: firstMember.tutorPhone,
        locality: firstMember.locality,
        familyGroupId: firstMember.familyGroupId,
        tickets,
      });

      if (emailResult.success) {
        emailsSent++;
        const idsToUpdate = familyMembers.map((m) => m._id);
        await InfanciaRegistration.updateMany(
          { _id: { $in: idsToUpdate } },
          { $set: { emailSent: true, emailSentAt: new Date() } }
        );
        logsList.push({
          family: firstMember.tutorName,
          status: "success",
          count: familyMembers.length,
          email: tutorEmail,
          message: `Enviado con éxito (${tickets.length} pases QR)`,
        });
      } else {
        errorsList.push({
          family: firstMember.tutorName,
          email: tutorEmail,
          error: emailResult.error || "Fallo en envío",
        });
        logsList.push({
          family: firstMember.tutorName,
          status: "error",
          email: tutorEmail,
          message: `Error: ${emailResult.error || "Fallo de conexión"}`,
        });
      }
    }

    return NextResponse.json({
      success: true,
      totalRegistrations: allRegistrations.length,
      totalFamilies: familyGroupsMap.size,
      emailsSent,
      skippedNoEmail,
      skippedAlreadySent,
      errorsCount: errorsList.length,
      errors: errorsList,
      logs: logsList,
    });
  } catch (error) {
    console.error("Error in batch email API:", error);
    return NextResponse.json({ error: "Error al procesar el envío masivo." }, { status: 500 });
  }
}
