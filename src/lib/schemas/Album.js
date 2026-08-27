import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título del álbum es obligatorio"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "El slug es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Superliga AFA",
        "Liga BA",
        "Liga Nacional",
        "Escuela",
        "Festival LATAM",
        "Institucional",
        "Eventos",
        "Otros",
      ],
      default: "Superliga AFA",
    },
    eventDate: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    driveLink: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    photos: [
      {
        url: { type: String, required: true },
        publicId: { type: String, default: null },
        caption: { type: String, default: "" },
        width: Number,
        height: Number,
        size: Number,
      },
    ],
    uploadedBy: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

albumSchema.index({ slug: 1 });
albumSchema.index({ category: 1, eventDate: -1 });

export default mongoose.models.Album || mongoose.model("Album", albumSchema);
