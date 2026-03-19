import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request) {
  try {
    const body = await request.json();
    const validated = contactSchema.parse(body);

    console.log("Mensaje de contacto recibido:", validated);

    return NextResponse.json(
      {
        success: true,
        message: "Mensaje enviado correctamente. Te contactaremos pronto.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en contacto:", error);
    
    if (error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Datos inválidos", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Error al enviar mensaje" },
      { status: 500 }
    );
  }
}
