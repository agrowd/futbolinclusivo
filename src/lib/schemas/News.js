import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      maxlength: [200, "El título no puede exceder 200 caracteres"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, "El extracto es obligatorio"],
      maxlength: [500, "El extracto no puede exceder 500 caracteres"],
    },
    content: {
      type: String,
      required: [true, "El contenido es obligatorio"],
    },
    image: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      enum: [
        "Liga de Buenos Aires",
        "Liga Nacional",
        "Escuela",
        "Festival LATAM",
        "Institucional",
        "Novedades",
      ],
      default: "Novedades",
    },
    author: {
      type: String,
      default: "Asociación Civil Andar",
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

newsSchema.index({ slug: 1 });
newsSchema.index({ published: 1, publishedAt: -1 });
newsSchema.index({ category: 1 });

export default mongoose.models.News || mongoose.model("News", newsSchema);
