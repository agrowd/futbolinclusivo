import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  courtId: {
    type: String,
    enum: {
      values: ["cancha-1", "cancha-2", "cancha-3"],
      message: "La cancha debe ser cancha-1, cancha-2 o cancha-3",
    },
    required: [true, "La cancha es obligatoria"],
  },
  date: {
    type: Date,
    required: [true, "La fecha es obligatoria"],
  },
  timeSlot: {
    type: String,
    required: [true, "El horario es obligatorio"],
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
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Índice único compuesto para evitar overbooking
ReservationSchema.index(
  { courtId: 1, date: 1, timeSlot: 1 },
  { unique: true }
);

export default mongoose.models.Reservation ||
  mongoose.model("Reservation", ReservationSchema);
