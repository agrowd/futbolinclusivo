import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

try {
  const envContent = fs.readFileSync(path.resolve(process.cwd(), ".env"), "utf8");
  envContent.split("\n").forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match && match[1] === "MONGODB_URI") process.env.MONGODB_URI = match[2].trim();
  });
} catch (e) {
  // Ignorar si no hay .env
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/futbolinclusivo";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@futbolinclusivo.org.ar";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme123";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  active: Boolean,
  lastLogin: Date,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function createAdminUser() {
  try {
    console.log("🔌 Conectando a MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Conectado a MongoDB");

    const existing = await User.findOne({ email: ADMIN_EMAIL });

    if (existing) {
      console.log(`⚠️  El usuario admin ya existe: ${ADMIN_EMAIL}`);
      
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await User.findByIdAndUpdate(existing._id, { password: hashedPassword });
      console.log("✅ Contraseña actualizada");
    } else {
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

      await User.create({
        name: "Administrador",
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
        active: true,
      });

      console.log("✅ Usuario admin creado exitosamente");
    }

    console.log(`\n📧 Email: ${ADMIN_EMAIL}`);
    console.log(`🔑 Password: ${ADMIN_PASSWORD}`);
    console.log("\n⚠️  IMPORTANTE: Cambia la contraseña después del primer login!");

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Desconectado de MongoDB");
  }
}

createAdminUser();
