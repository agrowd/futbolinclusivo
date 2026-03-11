import dbConnect from "@/lib/mongodb";
import Reservation from "@/lib/schemas/Reservation";
import { NextResponse } from "next/server";

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
