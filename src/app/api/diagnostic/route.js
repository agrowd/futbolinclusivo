import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/schemas/User";
import bcrypt from "bcryptjs";

export async function GET(request) {
  try {
    await dbConnect();
    const user = await User.findOne({ email: "admin@futbolinclusivo.org.ar" }).select("+password");
    
    if (!user) {
      return NextResponse.json({ success: false, error: "Usuario no encontrado en la DB de Atlas" });
    }

    const isValid = await bcrypt.compare("changeme123", user.password);

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        active: user.active
      },
      passwordMatch: isValid,
      nextauth_url: process.env.NEXTAUTH_URL || "MISSING",
      nextauth_secret: process.env.NEXTAUTH_SECRET ? "PRESENT" : "MISSING",
      mongodb_uri: process.env.MONGODB_URI.split("@")[1] || "LOCAL"
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
