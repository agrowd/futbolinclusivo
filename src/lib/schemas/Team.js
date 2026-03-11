import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  institutionName: {
    type: String,
    required: [true, "El nombre de la institución es obligatorio"],
    trim: true,
  },
  contactName: {
    type: String,
    required: [true, "El nombre de contacto es obligatorio"],
    trim: true,
  },
  contactEmail: {
    type: String,
    required: [true, "El email de contacto es obligatorio"],
    trim: true,
    lowercase: true,
  },
  contactPhone: {
    type: String,
    required: [true, "El teléfono de contacto es obligatorio"],
    trim: true,
  },
  league: {
    type: String,
    enum: {
      values: ["liga-ba", "liga-nacional"],
      message: "La liga debe ser liga-ba o liga-nacional",
    },
    required: [true, "La liga es obligatoria"],
  },
  players: [
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      dni: { type: String, required: true },
      birthDate: { type: Date, required: true },
      position: { type: String, default: "" },
    },
  ],
  isMedicalClearancePending: {
    type: Boolean,
    default: true,
  },
  medicalFileUrl: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);
