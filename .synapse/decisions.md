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
| D-09 | **Migración a Cloudinary (Multimedia)** | Optimización de LCP, gestión automática de assets y prevención de "orphan files" en el servidor | 🔒 LOCKED |
| D-10 | **Rediseño Híbrido Premium (LaLiga/Copa)** | Estética premium con paleta profunda (#000B1A) y navegación híbrida | 🔒 LOCKED |
| D-11 | **Eliminación Total de `styled-jsx`** | Refactorización a Tailwind pureza para evitar crashes en build de App Router | 🔒 LOCKED |
| D-12 | **Uso de `images.weserv.nl` como Proxy** | Bypass de bloqueos ORB/CORS del navegador para logos externos y S3 | 🔒 LOCKED |
| D-13 | **Espaciado Hero Expansivo (180px)** | Estandarización de `padding-top` en subpáginas para estética Premium | 🔒 LOCKED |
| D-14 | **Arquitectura de Sincronización** | "Single Source of Truth" para evitar drift de código entre CMS y producción | 🔒 LOCKED |
| D-15 | **Shadow CMS y Drafts** | Uso de mapa de fallbacks (HTML local) extraído mediante auditoría de producción (Vercel) para pre-llenar el editor y garantizar persistencia visual | 🔒 LOCKED |
| D-16 | **Inyección Dinámica de UI Premium** | Uso de wrapper genérico (`GenericCmsPage`) con inyección de componentes específicos por slug (`Timeline`, `MissionVisionCards`, etc.) para garantizar paridad visual total en el CMS. | 🔒 LOCKED |
| D-17 | **Centralización de Métricas de Impacto** | Implementación de `ImpactMetrics.js` como estándar de validación social en la Home Page para asegurar consistencia de marca. | 🔒 LOCKED |
| D-18 | **Permitir eliminación a editores** | Inconsistencia de seguridad que limitaba el DELETE a `admin` mientras que `editor` ya podía crear/editar noticias y eliminar multimedia. Ahora los editores también eliminan noticias para mejorar consistencia operativa. | 🔒 LOCKED |
