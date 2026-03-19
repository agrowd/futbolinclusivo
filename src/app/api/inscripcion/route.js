import dbConnect from "@/lib/mongodb";
import Team from "@/lib/schemas/Team";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    const [teams, total] = await Promise.all([
      Team.find().sort({ createdAt: -1 }).limit(limit).skip(skip).lean(),
      Team.countDocuments(),
    ]);

    return NextResponse.json({
      success: true,
      data: teams,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { success: false, message: "Error al obtener equipos" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();

    const formData = await request.formData();

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

    const medicalFile = formData.get("medicalFile");
    if (medicalFile && medicalFile.size > 0) {
      const bytes = await medicalFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "futbolinclusivo/medical",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      teamData.medicalFileUrl = result.secure_url;
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
