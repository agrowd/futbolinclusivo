import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

let mongoUri = "mongodb://localhost:27017/futbolinclusivo";

try {
  const envContent = fs.readFileSync(path.resolve(process.cwd(), ".env"), "utf8");
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.startsWith("MONGODB_URI=")) {
      mongoUri = trimmed.replace("MONGODB_URI=", "").trim();
      break;
    }
  }
} catch (e) {
  // Ignorar
}

console.log("URI encontrada:", mongoUri ? "Configurada (MongoDB Atlas)" : "No configurada");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  active: Boolean,
  lastLogin: Date,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function createAdminUsers() {
  try {
    console.log("🔌 Conectando a MongoDB Atlas...");
    await mongoose.connect(mongoUri);
    console.log("✅ Conectado exitosamente a MongoDB Atlas");

    const usersToCreate = [
      { name: "Juanchi", email: "juanchi@futbolinclusivo.org.ar", password: "admin123" },
      { name: "Administrador", email: "admin@futbolinclusivo.org.ar", password: "admin123" },
    ];

    for (const u of usersToCreate) {
      const existing = await User.findOne({ 
        $or: [{ email: u.email }, { name: new RegExp(`^${u.name}$`, "i") }] 
      });

      const hashedPassword = await bcrypt.hash(u.password, 10);

      if (existing) {
        await User.findByIdAndUpdate(existing._id, { 
          name: u.name,
          email: u.email,
          password: hashedPassword,
          role: "admin",
          active: true
        });
        console.log(`✅ Usuario ${u.email} ACTUALIZADO en MongoDB con clave '${u.password}'`);
      } else {
        await User.create({
          name: u.name,
          email: u.email,
          password: hashedPassword,
          role: "admin",
          active: true,
        });
        console.log(`✅ Usuario ${u.email} CREADO en MongoDB con clave '${u.password}'`);
      }
    }

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Desconectado de MongoDB Atlas");
  }
}

createAdminUsers();
