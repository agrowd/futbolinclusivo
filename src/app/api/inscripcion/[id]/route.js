import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Team from "@/lib/schemas/Team";

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    // Proteger ruta para admins
    if (!session || !["admin", "editor"].includes(session.user?.role)) {
      return NextResponse.json({ success: false, message: "No autorizado" }, { status: 401 });
    }

    await dbConnect();
    
    const { id } = await params;
    const body = await request.json();
    
    // Sólo permitimos actualizar el status
    if (!["pending", "approved", "rejected"].includes(body.status)) {
      return NextResponse.json({ success: false, message: "Estado inválido" }, { status: 400 });
    }

    const team = await Team.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true, runValidators: true }
    );

    if (!team) {
      return NextResponse.json({ success: false, message: "Equipo no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: team });
  } catch (error) {
    console.error("Error updating team status:", error);
    return NextResponse.json(
      { success: false, message: "Error al actualizar inscripción" },
      { status: 500 }
    );
  }
}
