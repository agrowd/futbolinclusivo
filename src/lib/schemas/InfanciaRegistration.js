import mongoose from "mongoose";

const InfanciaRegistrationSchema = new mongoose.Schema(
  {
    ticketCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      uppercase: true,
    },
    childName: {
      type: String,
      required: [true, "El nombre del niño/a es obligatorio"],
      trim: true,
    },
    childDni: {
      type: String,
      trim: true,
      default: "",
    },
    childAge: {
      type: String,
      trim: true,
      default: "",
    },
    childBirthDate: {
      type: String,
      trim: true,
      default: "",
    },
    tutorName: {
      type: String,
      trim: true,
      default: "",
    },
    tutorPhone: {
      type: String,
      required: [true, "El teléfono de contacto es obligatorio"],
      trim: true,
    },
    tutorEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    locality: {
      type: String,
      trim: true,
      default: "",
    },
    clubOrSchool: {
      type: String,
      trim: true,
      default: "",
    },
    medicalNotes: {
      type: String,
      trim: true,
      default: "",
    },
    imageConsent: {
      type: Boolean,
      required: [true, "La autorización de uso de imagen es obligatoria"],
      default: true,
    },
    attended: {
      type: Boolean,
      default: false,
      index: true,
    },
    attendedAt: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "cancelled"],
      default: "active",
      index: true,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation in development
export default mongoose.models.InfanciaRegistration ||
  mongoose.model("InfanciaRegistration", InfanciaRegistrationSchema);
