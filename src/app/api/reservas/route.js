import dbConnect from "@/lib/mongodb";
import Reservation from "@/lib/schemas/Reservation";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.role !== "editor")) {
      return NextResponse.json({ success: false, message: "No autorizado" }, { status: 401 });
    }

    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");
    const courtParam = searchParams.get("courtId");

    let query = {};
    if (dateParam) query.date = new Date(dateParam);
    if (courtParam) query.courtId = courtParam;

    const reservations = await Reservation.find(query).sort({ date: -1, timeSlot: 1 });
    const count = await Reservation.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: reservations,
      pagination: { total: count, page: 1, limit: 100, pages: 1 }
    });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json({ success: false, message: "Error al obtener reservas" }, { status: 500 });
  }
}


export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { courtId, date, timeSlot, contactName, contactEmail, contactPhone } = body;

    // Check if slot is already booked
    const existing = await Reservation.findOne({
      courtId,
      date: new Date(date),
      timeSlot,
      status: "confirmed",
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Este horario ya se encuentra reservado. Por favor, elegí otro horario.",
        },
        { status: 409 }
      );
    }

    const reservation = await Reservation.create({
      courtId,
      date: new Date(date),
      timeSlot,
      contactName,
      contactEmail,
      contactPhone,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Reserva confirmada exitosamente",
        reservationId: reservation._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en reserva:", error);

    // Handle duplicate key error (overbooking prevention)
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Este horario acaba de ser reservado por otra persona. Por favor, elegí otro.",
        },
        { status: 409 }
      );
    }

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
