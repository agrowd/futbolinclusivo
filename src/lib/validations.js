import { z } from "zod";

export const newsSchema = z.object({
  title: z.string().min(1, "El título es obligatorio").max(200),
  slug: z.string().min(1).toLowerCase().trim(),
  excerpt: z.string().min(1, "El extracto es obligatorio").max(500),
  content: z.string().min(1, "El contenido es obligatorio"),
  image: z.string().url().optional().nullable(),
  category: z.enum([
    "Liga de Buenos Aires",
    "Liga Nacional",
    "Escuela",
    "Festival LATAM",
    "Institucional",
    "Novedades",
  ]).default("Novedades"),
  author: z.string().default("Asociación Civil Andar"),
  published: z.boolean().default(false),
  publishedAt: z.string().datetime().optional().nullable(),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export const mediaSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().optional().default(""),
  type: z.enum(["image", "video"]),
  url: z.string().url("URL inválida"),
  publicId: z.string().optional().nullable(),
  thumbnailUrl: z.string().url().optional().nullable(),
  category: z.enum([
    "Liga BA",
    "Liga Nacional",
    "Escuela",
    "Festival LATAM",
    "Institucional",
    "Eventos",
    "Otros",
  ]).default("Otros"),
  tags: z.array(z.string()).default([]),
});

export const pageSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  slug: z.string().min(1).toLowerCase().trim(),
  content: z.string().min(1, "El contenido es obligatorio"),
  excerpt: z.string().optional().default(""),
  section: z.enum(["institucional", "programas", "sumate", "otros"]).default("otros"),
  published: z.boolean().default(true),
  order: z.number().default(0),
  metadata: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "El teléfono es obligatorio"),
  subject: z.string().min(1, "El asunto es obligatorio"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export const reservationSchema = z.object({
  courtId: z.string().min(1),
  date: z.string().datetime(),
  timeSlot: z.string().min(1),
  contactName: z.string().min(1, "El nombre es obligatorio"),
  contactEmail: z.string().email("Email inválido"),
  contactPhone: z.string().min(1, "El teléfono es obligatorio"),
});
