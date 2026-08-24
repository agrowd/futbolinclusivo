import fs from "fs";
import path from "path";
import QRCode from "qrcode";
import qrcodeTerminal from "qrcode-terminal";
import mongoose from "mongoose";
import { formatWhatsAppPhone, buildWhatsAppMessage } from "../src/lib/whatsapp.js";
import { makeWASocket, useMultiFileAuthState, DisconnectReason } from "@whiskeysockets/baileys";
import pino from "pino";

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

const InfanciaRegistrationSchema = new mongoose.Schema(
  {
    ticketCode: String,
    familyGroupId: String,
    childName: String,
    childDni: String,
    childAge: String,
    tutorName: String,
    tutorPhone: String,
    tutorEmail: String,
    locality: String,
    medicalNotes: String,
    status: String,
  },
  { timestamps: true }
);

const InfanciaRegistration =
  mongoose.models.InfanciaRegistration ||
  mongoose.model("InfanciaRegistration", InfanciaRegistrationSchema);

// Helper for random delay (ms)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getRandomDelayMs = (minSec = 10, maxSec = 22) => {
  return Math.floor(Math.random() * (maxSec - minSec + 1) + minSec) * 1000;
};

async function main() {
  const args = process.argv.slice(2);
  const isSendMode = args.includes("--send");
  const isDryRun = !isSendMode;

  console.log("=================================================================");
  console.log("🤖 BOT AUTOMATIZADO DE WHATSAPP — DÍA DE LAS INFANCIAS (ANDAR FC)");
  console.log("=================================================================\n");

  if (isDryRun) {
    console.log("⚠️ MODO SIMULACIÓN / VISTA PREVIA ACTIVO.");
    console.log("👉 Para realizar los envíos reales por WhatsApp ejecutá: npm run bot:whatsapp -- --send\n");
  } else {
    console.log("🚀 MODO ENVÍO REAL ACTIVADO VÍA WHATSAPP WEB SOCKET.\n");
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("❌ Error: MONGODB_URI no encontrada en .env");
    process.exit(1);
  }

  await mongoose.connect(mongoUri);

  // Fetch active registrations ordered by creation (newest first)
  const allRegistrations = await InfanciaRegistration.find({ status: "active" }).sort({ createdAt: -1 });

  // Group registrations by family
  const familyMap = new Map();
  allRegistrations.forEach((reg) => {
    const key = reg.familyGroupId || reg.tutorPhone || reg._id.toString();
    if (!familyMap.has(key)) {
      familyMap.set(key, []);
    }
    familyMap.get(key).push(reg);
  });

  const allFamiliesList = Array.from(familyMap.values());

  // Locate index for "Rivero clara agustina"
  const startFilterTerm = "rivero clara agustina";
  let startIndex = allFamiliesList.findIndex((members) => {
    const tutor = (members[0].tutorName || "").toLowerCase();
    const child = members.some((m) => (m.childName || "").toLowerCase().includes("caceres santino") || (m.childName || "").toLowerCase().includes("bautista barreto"));
    return tutor.includes(startFilterTerm) || child;
  });

  if (startIndex === -1) {
    console.log(`⚠️ No se encontró la familia con nombre "${startFilterTerm}". Se procesarán todos los registros.`);
    startIndex = 0;
  } else {
    console.log(`🎯 Filtro activado: Se omiten las primeras ${startIndex} familias (ya enviadas a mano).`);
    console.log(`📌 Punto de inicio encontrado: Familia de "${allFamiliesList[startIndex][0].tutorName}" (Inscriptos: ${allFamiliesList[startIndex].map(m => m.childName).join(", ")})\n`);
  }

  const targetFamilies = allFamiliesList.slice(startIndex);

  console.log(`📋 Total de familias a enviar en este lote: ${targetFamilies.length} familias.`);

  // Create local output folder for QR files
  const outputDir = path.resolve(process.cwd(), "output_qrs");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Pre-generate QR image files for target families
  const preparedFamilies = [];
  for (const members of targetFamilies) {
    const first = members[0];
    const cleanPhone = formatWhatsAppPhone(first.tutorPhone);

    const ticketsData = [];
    for (const m of members) {
      const filename = `QR-${m.ticketCode}-${(m.childName || "niño").replace(/[^a-zA-Z0-9]/g, "_")}.png`;
      const filePath = path.join(outputDir, filename);

      const qrPayload = JSON.stringify({
        code: m.ticketCode,
        id: m._id.toString(),
        name: m.childName,
      });

      await QRCode.toFile(filePath, qrPayload, {
        errorCorrectionLevel: "M",
        margin: 2,
        width: 450,
        color: { dark: "#000B1A", light: "#FFFFFF" },
      });

      ticketsData.push({
        code: m.ticketCode,
        childName: m.childName,
        filePath,
      });
    }

    const messageText = buildWhatsAppMessage({
      tutorName: first.tutorName,
      ticketsCount: members.length,
      tickets: members.map((m) => ({ childName: m.childName, ticketCode: m.ticketCode })),
    });

    preparedFamilies.push({
      tutorName: first.tutorName || "Familia",
      rawPhone: first.tutorPhone,
      cleanPhone,
      jid: `${cleanPhone}@s.whatsapp.net`,
      tickets: ticketsData,
      messageText,
    });
  }

  if (isDryRun) {
    console.log("\n=================================================================");
    console.log("📝 RESUMEN DE LOTE DE ENVÍO (DRY-RUN):");
    console.log("=================================================================");
    preparedFamilies.forEach((f, idx) => {
      console.log(`\n#${idx + 1} | Tutor: ${f.tutorName} | Teléfono WA: ${f.cleanPhone || f.rawPhone} | Pases QR: ${f.tickets.length}`);
      f.tickets.forEach((t) => {
        console.log(`    - [${t.code}] ${t.childName} (Archivo QR: ${t.filePath})`);
      });
    });

    console.log("\n=================================================================");
    console.log("👉 Para iniciar el envío automático real vía WhatsApp Web:");
    console.log("   Ejecutá: npm run bot:whatsapp -- --send");
    console.log("=================================================================\n");
    await mongoose.disconnect();
    return;
  }

  // SEND MODE: Initialize Baileys WhatsApp Socket
  console.log("📱 Inicializando cliente de WhatsApp Web (Baileys)...");
  const authFolder = path.resolve(process.cwd(), ".baileys_auth");
  const { state, saveCreds } = await useMultiFileAuthState(authFolder);

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" }),
    printQRInTerminal: true,
  });

  sock.ev.on("creds.update", saveCreds);

  await new Promise((resolve) => {
    sock.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect, qr } = update;
      if (qr) {
        console.log("\n📲 ESCANEA ESTE CÓDIGO QR CON TU WHATSAPP (Dispositivos Vinculados):\n");
        qrcodeTerminal.generate(qr, { small: true });
      }

      if (connection === "close") {
        const shouldReconnect =
          lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
        console.log("🔌 Conexión cerrada. ¿Reconectar?:", shouldReconnect);
        if (!shouldReconnect) {
          process.exit(1);
        }
      } else if (connection === "open") {
        console.log("\n✅ Conexión con WhatsApp establecida exitosamente con el teléfono.\n");
        resolve();
      }
    });
  });

  console.log("🚀 Iniciando envío masivo con delay aleatorio entre 10s y 22s por familia...\n");

  let countSuccess = 0;
  let countError = 0;

  for (let i = 0; i < preparedFamilies.length; i++) {
    const f = preparedFamilies[i];
    console.log(`-----------------------------------------------------------------`);
    console.log(`[${i + 1}/${preparedFamilies.length}] Enviando a: ${f.tutorName} (${f.cleanPhone})...`);

    if (!f.cleanPhone) {
      console.log(`⚠️ Omitido: Número de teléfono no válido (${f.rawPhone})`);
      countError++;
      continue;
    }

    try {
      // 1. Send main text message
      await sock.sendMessage(f.jid, { text: f.messageText });
      console.log(`  ✅ Texto enviado.`);

      // 2. Send each child's QR image ticket attachment
      for (const t of f.tickets) {
        const imageBuffer = fs.readFileSync(t.filePath);
        await sock.sendMessage(f.jid, {
          image: imageBuffer,
          caption: `🎟️ *Pase QR*: ${t.code}\n👤 *Participante*: ${t.childName}\n📍 *Lugar*: Andar FC`,
        });
        console.log(`  🖼️ Imagen QR enviada: [${t.code}] ${t.childName}`);
        await sleep(1500); // 1.5s delay between multiple images of same family
      }

      countSuccess++;

      // 3. Apply randomized delay before next family send (if not the last family)
      if (i < preparedFamilies.length - 1) {
        const delayMs = getRandomDelayMs(10, 22);
        console.log(`  ⏳ Delay aleatorio anti-spam: esperando ${(delayMs / 1000).toFixed(1)}s antes del próximo envío...`);
        await sleep(delayMs);
      }
    } catch (err) {
      console.error(`  ❌ Error al enviar a ${f.tutorName} (${f.cleanPhone}):`, err.message || err);
      countError++;
    }
  }

  console.log("\n=================================================================");
  console.log("🎉 PROCESO DE ENVÍO DE BOT FINALIZADO");
  console.log(`✅ Familias notificadas con éxito: ${countSuccess}`);
  console.log(`❌ Familias con error/sin número: ${countError}`);
  console.log("=================================================================\n");

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("❌ Error fatal en bot:", err);
  process.exit(1);
});
