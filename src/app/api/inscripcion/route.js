import dbConnect from "@/lib/mongodb";
import Team from "@/lib/schemas/Team";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    await dbConnect();

    const formData = await request.formData();

    // Extract team data
    const teamData = {
      institutionName: formData.get("institutionName"),
      contactName: formData.get("contactName"),
      contactEmail: formData.get("contactEmail"),
      contactPhone: formData.get("contactPhone"),
      league: formData.get("league"),
      players: JSON.parse(formData.get("players") || "[]"),
      isMedicalClearancePending: formData.get("medicalDelivery") === "presencial",
      medicalFileUrl: null,
    };

    // Handle medical file upload
    const medicalFile = formData.get("medicalFile");
    if (medicalFile && medicalFile.size > 0) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });

      const bytes = await medicalFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `medical_${Date.now()}_${medicalFile.name}`;
      const filepath = path.join(uploadsDir, filename);

      await writeFile(filepath, buffer);
      teamData.medicalFileUrl = `/uploads/${filename}`;
      teamData.isMedicalClearancePending = false;
    }

    const team = await Team.create(teamData);

    return NextResponse.json(
      {
        success: true,
        message: "Inscripción registrada exitosamente",
        teamId: team._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en inscripción:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, message: "Error de validación", errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
