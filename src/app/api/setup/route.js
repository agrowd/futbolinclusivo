import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/schemas/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await dbConnect();
    
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const usersToEnsure = [
      { name: "Juanchi", email: "juanchi@futbolinclusivo.org.ar" },
      { name: "Administrador", email: "admin@futbolinclusivo.org.ar" },
    ];

    const results = [];

    for (const u of usersToEnsure) {
      let user = await User.findOne({
        $or: [
          { email: u.email },
          { name: new RegExp(`^${u.name}$`, "i") }
        ]
      });

      if (user) {
        user.password = hashedPassword;
        user.active = true;
        user.role = "admin";
        user.name = u.name;
        user.email = u.email;
        await user.save();
        results.push({ action: "updated", email: u.email });
      } else {
        await User.create({
          name: u.name,
          email: u.email,
          password: hashedPassword,
          role: "admin",
          active: true,
        });
        results.push({ action: "created", email: u.email });
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Usuarios juanchi@futbolinclusivo.org.ar y admin@futbolinclusivo.org.ar configurados con clave admin123!", 
      results 
    });
  } catch (error) {
    console.error("Setup Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
