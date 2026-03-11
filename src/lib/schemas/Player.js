import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "El apellido es obligatorio"],
    trim: true,
  },
  dni: {
    type: String,
    required: [true, "El DNI es obligatorio"],
    trim: true,
  },
  birthDate: {
    type: Date,
    required: [true, "La fecha de nacimiento es obligatoria"],
  },
  position: {
    type: String,
    trim: true,
    default: "",
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Player || mongoose.model("Player", PlayerSchema);
