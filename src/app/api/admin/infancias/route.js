import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import InfanciaRegistration from "@/lib/schemas/InfanciaRegistration";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("q") || "";
    const status = searchParams.get("status") || "";
    const attended = searchParams.get("attended");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const skip = (page - 1) * limit;

    const filter = {};

    if (status) {
      filter.status = status;
    } else {
      filter.status = { $ne: "cancelled" };
    }

    if (attended !== null && attended !== undefined && attended !== "") {
      filter.attended = attended === "true";
    }

    if (query.trim()) {
      const regex = new RegExp(query.trim(), "i");
      filter.$or = [
        { ticketCode: regex },
        { childName: regex },
        { childDni: regex },
        { tutorName: regex },
        { tutorPhone: regex },
        { locality: regex },
        { clubOrSchool: regex },
      ];
    }

    const [items, total, totalAll, totalAttended] = await Promise.all([
      InfanciaRegistration.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      InfanciaRegistration.countDocuments(filter),
      InfanciaRegistration.countDocuments({ status: { $ne: "cancelled" } }),
      InfanciaRegistration.countDocuments({
        status: { $ne: "cancelled" },
        attended: true,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: items,
      stats: {
        total: totalAll,
        attended: totalAttended,
        pending: totalAll - totalAttended,
      },
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching admin infancias:", error);
    return NextResponse.json(
      { error: "Error al obtener las inscripciones" },
      { status: 500 }
    );
  }
}
