import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/schemas/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await dbConnect();
    
    const email = "juanchi@futbolinclusivo.org.ar";
    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    // Buscar si existe
    let user = await User.findOne({ 
      $or: [{ email }, { email: "admin@futbolinclusivo.org.ar" }, { name: "Juanchi" }] 
    });
    
    if (user) {
      user.password = hashedPassword;
      user.active = true;
      user.role = "admin";
      user.name = "Juanchi";
      user.email = email;
      await user.save();
      return NextResponse.json({ success: true, message: "Usuario juanchi actualizado en DB con clave admin123!", user });
    } else {
      user = await User.create({
        name: "Juanchi",
        email: email,
        password: hashedPassword,
        role: "admin",
        active: true,
      });
      return NextResponse.json({ success: true, message: "Usuario juanchi CREADO en DB con clave admin123!", user });
    }
  } catch (error) {
    console.error("Setup Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
