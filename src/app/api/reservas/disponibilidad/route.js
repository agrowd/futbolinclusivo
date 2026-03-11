import dbConnect from "@/lib/mongodb";
import Reservation from "@/lib/schemas/Reservation";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const courtId = searchParams.get("courtId");
    const month = searchParams.get("month"); // Format: YYYY-MM
    const date = searchParams.get("date"); // Format: YYYY-MM-DD

    const query = { status: "confirmed" };

    if (courtId) {
      query.courtId = courtId;
    }

    if (date) {
      // Get bookings for specific date
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.date = { $gte: startOfDay, $lte: endOfDay };
    } else if (month) {
      // Get bookings for entire month
      const [year, mon] = month.split("-").map(Number);
      const startOfMonth = new Date(year, mon - 1, 1);
      const endOfMonth = new Date(year, mon, 0, 23, 59, 59, 999);
      query.date = { $gte: startOfMonth, $lte: endOfMonth };
    }

    const reservations = await Reservation.find(query)
      .select("courtId date timeSlot")
      .lean();

    return NextResponse.json({
      success: true,
      reservations,
    });
  } catch (error) {
    console.error("Error al consultar disponibilidad:", error);
    return NextResponse.json(
      { success: false, message: "Error al consultar disponibilidad" },
      { status: 500 }
    );
  }
}
