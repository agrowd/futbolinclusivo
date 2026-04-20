import dbConnect from "@/lib/mongodb";
import Reservation from "@/lib/schemas/Reservation";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.role !== "editor")) {
      return NextResponse.json({ success: false, message: "No autorizado" }, { status: 401 });
    }

    await dbConnect();
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!["confirmed", "cancelled"].includes(status)) {
      return NextResponse.json({ success: false, message: "Estado no válido" }, { status: 400 });
    }

    const updated = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, message: "Reserva no encontrada" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Reserva actualizada correctamente",
      data: updated
    });
  } catch (error) {
    console.error("Error updating reservation:", error);
    return NextResponse.json({ success: false, message: "Error interno del servidor" }, { status: 500 });
  }
}
