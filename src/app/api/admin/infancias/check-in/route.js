import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import InfanciaRegistration from "@/lib/schemas/InfanciaRegistration";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    let { code } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Código no proporcionado" }, { status: 400 });
    }

    code = code.trim();

    // Check if code is a JSON string from QR payload
    let targetCode = code;
    let targetId = null;

    if (code.startsWith("{") && code.endsWith("}")) {
      try {
        const parsed = JSON.parse(code);
        if (parsed.code) targetCode = parsed.code;
        if (parsed.id) targetId = parsed.id;
      } catch {
        // Not valid json, treat as raw code
      }
    }

    // Clean search filters
    const queryConditions = [
      { ticketCode: targetCode.toUpperCase() },
      { childDni: targetCode },
    ];

    if (targetId && targetId.length === 24) {
      queryConditions.push({ _id: targetId });
    } else if (code.length === 24) {
      queryConditions.push({ _id: code });
    }

    const registration = await InfanciaRegistration.findOne({
      $or: queryConditions,
      status: "active",
    });

    if (!registration) {
      return NextResponse.json(
        {
          success: false,
          error: "Código o inscripción no encontrada. Verificá que el ticket sea válido.",
        },
        { status: 404 }
      );
    }

    // If already checked in
    if (registration.attended) {
      return NextResponse.json({
        success: true,
        alreadyAttended: true,
        message: "⚠️ Este pase ya fue acreditado previamente.",
        attendedAt: registration.attendedAt,
        data: registration,
      });
    }

    // Mark as checked in
    registration.attended = true;
    registration.attendedAt = new Date();
    await registration.save();

    return NextResponse.json({
      success: true,
      alreadyAttended: false,
      message: "✅ ¡Acreditación exitosa! Ingreso permitido.",
      attendedAt: registration.attendedAt,
      data: registration,
    });
  } catch (error) {
    console.error("Error checking in infancia ticket:", error);
    return NextResponse.json(
      { error: "Error al procesar la acreditación" },
      { status: 500 }
    );
  }
}
