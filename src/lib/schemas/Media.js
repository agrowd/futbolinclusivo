import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    url: {
      type: String,
      required: [true, "La URL es obligatoria"],
    },
    publicId: {
      type: String,
      default: null,
    },
    thumbnailUrl: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      enum: [
        "Liga BA",
        "Liga Nacional",
        "Escuela",
        "Festival LATAM",
        "Institucional",
        "Eventos",
        "Otros",
      ],
      default: "Otros",
    },
    tags: [String],
    width: Number,
    height: Number,
    size: Number,
    format: String,
    uploadedBy: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

mediaSchema.index({ type: 1, category: 1 });
mediaSchema.index({ createdAt: -1 });

export default mongoose.models.Media || mongoose.model("Media", mediaSchema);
