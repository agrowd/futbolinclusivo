import fs from "fs";
import path from "path";
import QRCode from "qrcode";
import { formatWhatsAppPhone, buildWhatsAppMessage } from "../src/lib/whatsapp.js";

// Load environment variables from .env
try {
  const envContent = fs.readFileSync(path.resolve(process.cwd(), ".env"), "utf8");
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match && !process.env[match[1].trim()]) {
      process.env[match[1].trim()] = match[2].trim();
    }
  }
} catch (e) {}

import mongoose from "mongoose";

const InfanciaRegistrationSchema = new mongoose.Schema(
  {
    ticketCode: String,
    familyGroupId: String,
    childName: String,
    childDni: String,
    childAge: String,
    childBirthDate: String,
    tutorName: String,
    tutorPhone: String,
    tutorEmail: String,
    locality: String,
    clubOrSchool: String,
    medicalNotes: String,
    imageConsent: Boolean,
    attended: Boolean,
    status: String,
    emailSent: Boolean,
  },
  { timestamps: true }
);

const InfanciaRegistration =
  mongoose.models.InfanciaRegistration ||
  mongoose.model("InfanciaRegistration", InfanciaRegistrationSchema);

async function runWhatsAppBot() {
  console.log("=================================================================");
  console.log("🤖 BOT DE WHATSAPP — DÍA DE LAS INFANCIAS (ANDAR FC)");
  console.log("=================================================================\n");

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("❌ Error: No se encontró MONGODB_URI en el archivo .env");
    process.exit(1);
  }

  console.log("📡 Conectando a la base de datos de MongoDB Atlas...");
  await mongoose.connect(mongoUri);
  console.log("✅ Conexión exitosa.\n");

  const allRegistrations = await InfanciaRegistration.find({ status: "active" }).sort({ createdAt: -1 });
  console.log(`📊 Total de inscriptos individuales en base de datos: ${allRegistrations.length}`);

  // Group by family
  const familyMap = new Map();
  allRegistrations.forEach((reg) => {
    const key = reg.familyGroupId || reg.tutorPhone || reg._id.toString();
    if (!familyMap.has(key)) {
      familyMap.set(key, []);
    }
    familyMap.get(key).push(reg);
  });

  console.log(`👨‍👩‍👧 Total de grupos familiares detectados: ${familyMap.size}\n`);

  // Create output directory for QR images & previews
  const outputDir = path.resolve(process.cwd(), "output_qrs");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const familiesData = [];

  for (const [familyKey, members] of familyMap.entries()) {
    const tutor = members[0];
    const cleanPhone = formatWhatsAppPhone(tutor.tutorPhone);

    const familyTickets = [];
    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      const filename = `QR-${m.ticketCode}-${m.childName.replace(/[^a-zA-Z0-9]/g, "_")}.png`;
      const filePath = path.join(outputDir, filename);

      const qrPayload = JSON.stringify({
        code: m.ticketCode,
        id: m._id.toString(),
        name: m.childName,
      });

      // Generate PNG file
      await QRCode.toFile(filePath, qrPayload, {
        errorCorrectionLevel: "M",
        margin: 2,
        width: 400,
        color: { dark: "#000B1A", light: "#FFFFFF" },
      });

      // Also get base64 data for HTML preview
      const base64Qr = await QRCode.toDataURL(qrPayload, {
        errorCorrectionLevel: "M",
        margin: 2,
        width: 320,
        color: { dark: "#000B1A", light: "#FFFFFF" },
      });

      familyTickets.push({
        code: m.ticketCode,
        childName: m.childName,
        childDni: m.childDni,
        childAge: m.childAge,
        filePath,
        filename,
        base64Qr,
      });
    }

    const messageText = buildWhatsAppMessage({
      tutorName: tutor.tutorName,
      ticketsCount: members.length,
      tickets: members.map((m) => ({ childName: m.childName, ticketCode: m.ticketCode })),
    });

    familiesData.push({
      familyKey,
      tutorName: tutor.tutorName || "Familia",
      tutorPhone: tutor.tutorPhone,
      cleanPhone,
      ticketsCount: members.length,
      tickets: familyTickets,
      messageText,
    });
  }

  // Generate HTML Live Preview File
  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VISTA PREVIA — Bot WhatsApp Día de las Infancias</title>
  <style>
    body { background-color: #0b141a; color: #e9edef; font-family: 'Segoe UI', Helvetica, Arial, sans-serif; margin: 0; padding: 20px; }
    .header { text-align: center; margin-bottom: 30px; border-b: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; }
    .header h1 { color: #00a884; margin: 0 0 10px 0; font-size: 28px; }
    .badge { background: #00a884; color: #111b21; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 13px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 24px; max-width: 1400px; margin: 0 auto; }
    .card { background: #111b21; border: 1px solid #222d34; border-radius: 16px; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .card-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #222d34; padding-bottom: 12px; margin-bottom: 15px; }
    .tutor { font-size: 18px; font-weight: bold; color: #ffffff; }
    .phone { color: #00a884; font-family: monospace; font-size: 14px; text-decoration: none; }
    .wa-bubble { background: #005c4b; color: #e9edef; padding: 15px; border-radius: 12px; font-size: 13px; line-height: 1.6; white-space: pre-wrap; margin-bottom: 15px; border-left: 4px solid #00a884; }
    .qrs-container { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
    .qr-item { background: #ffffff; padding: 10px; border-radius: 12px; text-align: center; color: #111b21; width: 140px; }
    .qr-item img { width: 120px; height: 120px; display: block; margin: 0 auto; }
    .qr-code { font-family: monospace; font-weight: bold; font-size: 12px; margin-top: 6px; color: #005c4b; }
    .qr-child { font-size: 11px; font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .btn-wa { display: inline-block; background: #00a884; color: #111b21; text-decoration: none; font-weight: bold; padding: 10px 18px; border-radius: 8px; font-size: 13px; text-transform: uppercase; margin-top: 15px; width: 100%; text-align: center; box-sizing: border-box; }
  </style>
</head>
<body>
  <div class="header">
    <h1>📱 BOT DE WHATSAPP — VISTA PREVIA DE ENVÍO</h1>
    <p>Se generaron <strong>${familiesData.length} mensajes familiares</strong> con sus respectivos códigos QR para <strong>Andar FC</strong>.</p>
    <span class="badge">Total de Pases QR Generados: ${allRegistrations.length}</span>
  </div>

  <div class="grid">
    ${familiesData
      .map(
        (f, idx) => `
      <div class="card">
        <div class="card-header">
          <div>
            <div class="tutor">#${idx + 1} — ${f.tutorName}</div>
            <a href="https://wa.me/${f.cleanPhone}" target="_blank" class="phone">📱 ${f.cleanPhone || f.tutorPhone}</a>
          </div>
          <span class="badge">${f.ticketsCount} ${f.ticketsCount === 1 ? "pase" : "pases"}</span>
        </div>

        <div class="wa-bubble">${f.messageText}</div>

        <div style="font-size: 12px; color: #8696a0; margin-bottom: 8px; font-weight: bold;">🖼️ IMÁGENES DE ADJUNTAS (${f.tickets.length}):</div>
        <div class="qrs-container">
          ${f.tickets
            .map(
              (t) => `
            <div class="qr-item">
              <img src="${t.base64Qr}" alt="${t.code}" />
              <div class="qr-code">${t.code}</div>
              <div class="qr-child">${t.childName}</div>
            </div>
          `
            )
            .join("")}
        </div>

        <a href="https://wa.me/${f.cleanPhone}?text=${encodeURIComponent(f.messageText)}" target="_blank" class="btn-wa">
          💬 Abrir Chat de WhatsApp con Mensaje Pre-cargado
        </a>
      </div>
    `
      )
      .join("")}
  </div>
</body>
</html>
  `;

  const previewPath = path.join(outputDir, "preview.html");
  fs.writeFileSync(previewPath, htmlContent, "utf8");

  console.log(`🎉 ¡PROCESO COMPLETADO EXITOSAMENTE!`);
  console.log(`-----------------------------------------------------------------`);
  console.log(`📁 Imágenes de códigos QR generadas en:`);
  console.log(`   ${outputDir}`);
  console.log(`🌐 Vista previa interactiva de mensajes generada en:`);
  console.log(`   ${previewPath}\n`);

  console.log(`💡 PUNTOS CLAVE DE LA VISTA PREVIA:`);
  console.log(`1. Se asignó la ubicación oficial: "Andar FC (Moreno)"`);
  console.log(`2. Cada familia con 1, 2 o 3 niños recibe SUS 3 CÓDIGOS QR correspondientes.`);
  console.log(`3. El archivo preview.html se puede abrir en tu navegador para revisar todos los mensajes.\n`);

  await mongoose.disconnect();
}

runWhatsAppBot().catch((err) => {
  console.error("❌ Error en la ejecución del bot:", err);
  process.exit(1);
});
