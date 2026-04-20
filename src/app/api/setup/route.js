import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/schemas/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await dbConnect();
    
    const email = "admin@futbolinclusivo.org.ar";
    
    // Buscar si existe
    let user = await User.findOne({ email });
    
    if (user) {
      // Actualizar password porsiaca
      const hashedPassword = await bcrypt.hash("changeme123", 10);
      user.password = hashedPassword;
      user.active = true;
      user.role = "admin";
      await user.save();
      return NextResponse.json({ success: true, message: "Admin actualizado en DB!", user });
    } else {
      // Crear nuevo
      const hashedPassword = await bcrypt.hash("changeme123", 10);
      user = await User.create({
        name: "Administrador Central",
        email: email,
        password: hashedPassword,
        role: "admin",
        active: true,
      });
      return NextResponse.json({ success: true, message: "Admin CREADO en DB!", user });
    }
  } catch (error) {
    console.error("Setup Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
