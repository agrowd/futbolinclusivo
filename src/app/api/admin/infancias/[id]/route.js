import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import InfanciaRegistration from "@/lib/schemas/InfanciaRegistration";
import QRCode from "qrcode";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await dbConnect();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const item = await InfanciaRegistration.findById(id).lean();
    if (!item) {
      return NextResponse.json({ error: "Registro no encontrado" }, { status: 404 });
    }

    const qrPayload = JSON.stringify({
      code: item.ticketCode,
      id: item._id.toString(),
      name: item.childName,
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

    return NextResponse.json({ success: true, data: { ...item, qrDataUrl } });
  } catch (error) {
    console.error("Error fetching single infancia:", error);
    return NextResponse.json({ error: "Error al consultar registro" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await dbConnect();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await req.json();

    const allowedFields = [
      "childName",
      "childDni",
      "childAge",
      "childBirthDate",
      "tutorName",
      "tutorPhone",
      "tutorEmail",
      "locality",
      "clubOrSchool",
      "medicalNotes",
      "attended",
      "attendedAt",
      "status",
      "notes",
    ];

    const updateData = {};
    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        updateData[key] = body[key];
      }
    }

    // Handle attended timestamp
    if (body.attended === true && !body.attendedAt) {
      updateData.attendedAt = new Date();
    } else if (body.attended === false) {
      updateData.attendedAt = null;
    }

    const updated = await InfanciaRegistration.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: "Registro no encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Registro actualizado exitosamente",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating infancia registration:", error);
    return NextResponse.json(
      { error: error.message || "Error al actualizar" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await dbConnect();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const deleted = await InfanciaRegistration.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Registro no encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Inscripción eliminada con éxito",
    });
  } catch (error) {
    console.error("Error deleting infancia registration:", error);
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}
