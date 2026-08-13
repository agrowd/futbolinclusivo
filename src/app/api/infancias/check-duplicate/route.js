import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import InfanciaRegistration from "@/lib/schemas/InfanciaRegistration";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { dni, name, phone } = body;

    const cleanDni = dni ? dni.replace(/[^0-9]/g, "").trim() : "";
    const cleanName = name ? name.trim() : "";
    const cleanPhone = phone ? phone.replace(/[^0-9]/g, "").trim() : "";

    // 1. Check by DNI if provided and >= 6 digits
    if (cleanDni && cleanDni.length >= 6) {
      // Find matching DNI (either exact or with dots stripped)
      const existingByDni = await InfanciaRegistration.find({
        status: "active",
      }).select("childName childDni ticketCode attended createdAt tutorPhone");

      const match = existingByDni.find(
        (r) => r.childDni && r.childDni.replace(/[^0-9]/g, "").trim() === cleanDni
      );

      if (match) {
        return NextResponse.json({
          isDuplicate: true,
          type: "dni",
          message: `⚠️ Ya existe un niño/a inscripto con el DNI ${match.childDni}: "${match.childName}" (Ticket #${match.ticketCode}).`,
          existing: {
            childName: match.childName,
            childDni: match.childDni,
            ticketCode: match.ticketCode,
            attended: match.attended,
          },
        });
      }
    }

    // 2. Check by Name + Phone if both are provided
    if (cleanName.length >= 3 && cleanPhone.length >= 6) {
      const regex = new RegExp(`^${cleanName}$`, "i");
      const existingByName = await InfanciaRegistration.find({
        childName: regex,
        status: "active",
      }).select("childName childDni ticketCode attended tutorPhone");

      const match = existingByName.find(
        (r) => r.tutorPhone && r.tutorPhone.replace(/[^0-9]/g, "").trim() === cleanPhone
      );

      if (match) {
        return NextResponse.json({
          isDuplicate: true,
          type: "name_phone",
          message: `⚠️ Ya registraste a "${match.childName}" con este número de contacto (Ticket #${match.ticketCode}).`,
          existing: {
            childName: match.childName,
            ticketCode: match.ticketCode,
          },
        });
      }
    }

    return NextResponse.json({ isDuplicate: false });
  } catch (error) {
    console.error("Error checking duplicate:", error);
    return NextResponse.json({ isDuplicate: false, error: "Error de verificación" });
  }
}
