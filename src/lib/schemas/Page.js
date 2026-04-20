import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "El contenido es obligatorio"],
    },
    excerpt: {
      type: String,
      default: "",
    },
    section: {
      type: String,
      enum: ["institucional", "programas", "sumate", "navegacion", "servicios", "multimedia", "otros"],
      default: "otros",
    },
    data: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
    published: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    metadata: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
  }
);

pageSchema.index({ slug: 1 });
pageSchema.index({ section: 1, order: 1 });

export default mongoose.models.Page || mongoose.model("Page", pageSchema);
