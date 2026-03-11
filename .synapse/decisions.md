# Decisiones Técnicas

| ID | Decisión Técnica | La Razón (The Why) | Estado |
|:---|:---|:---|:---|
| D-01 | **Next.js App Router (no Pages Router)** | Soporte nativo para Server Components, layouts anidados, y mejor SEO | 🔒 LOCKED |
| D-02 | **Atkinson Hyperlegible como tipografía** | Diseñada para máxima legibilidad, cumple con requisitos de accesibilidad. Sans-serif cuadrada | 🔒 LOCKED |
| D-03 | **Tailwind CSS v4 (@import "tailwindcss")** | Scaffoldeado por create-next-app, configuración inline | 🔒 LOCKED |
| D-04 | **Terminología: "persona con discapacidad" únicamente** | Modelo social de discapacidad. Prohibido lenguaje asistencialista | 🔒 LOCKED |
| D-05 | **Mongoose con schemas embebidos para players** | Players embebidos en Team (no referencia) para simplicidad de queries | 🟢 ACTIVE |
| D-06 | **Compound unique index en Reservation** | Prevención de overbooking a nivel DB (courtId + date + timeSlot) | 🔒 LOCKED |
| D-07 | **aria-live="polite" para lista dinámica** | Screen readers anuncian cambios sin recargar la web | 🔒 LOCKED |
| D-08 | **Green primario oscurecido a #007A3D** | Original #008d4d no cumplía ratio 4.5:1 en fondo blanco | 🔒 LOCKED |
| D-09 | **File upload local (no Cloudinary/S3)** | MVP simplificado. Producción requiere servicio externo | 🟢 ACTIVE |
