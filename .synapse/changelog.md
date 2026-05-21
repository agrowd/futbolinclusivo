# Changelog

## v1.4.1 — 2026-05-21
- feat: Redirección del botón de Fixture y Tabla Completa en la página de inicio al portal oficial externo (https://futbolinclusivo.mygol.es/tournaments).

## v1.4.0 — 2026-05-21
- feat: Remoción de la liga "Festival LATAM de Fútbol 3" de la página de ligas.
- feat: Incorporación y énfasis premium de la "Super Liga AFA" en la página de ligas con renderizado de logotipos oficiales solapados (AFA dorado + SAT).
- style: Aplicación de paleta de colores personalizada (gradiente de borravino AFA `#6B1026` a `#2B050D`, borde celeste `#75AADB`/40 y sombras brillantes) en el card de la Super Liga AFA.
- refactor: Corrección del mapeo de etiquetas de estadísticas (Sede Principal, Coordinación) y visualización limpia de arreglos de características.

## v1.3.0 — 2026-05-21
- feat: Implementación de la página de edición de noticias (`src/app/admin/news/edit/[id]/page.js`) para habilitar edición dinámica de posts.
- fix: Corrección de permisos de eliminación de noticias para habilitar a usuarios con rol `"editor"`.
- fix: Corrección crítica de compatibilidad con Next.js 16 haciendo que `params` sea correctamente asíncrono (await) en todas las rutas API dinámicas.
- feat: Mensajes de diagnóstico de error explícitos en el cliente de administración de noticias.

## v1.2.0 — 2026-04-13
- feat: Paridad visual 100% con sitio de producción (Home, Nosotros, Escuela, Historia).
- feat: Sistema de inyección dinámica de componentes premium en `GenericCmsPage` basado en slug.
- feat: Nuevos componentes: `MissionVisionCards`, `Timeline`, `MethodologySteps`, `ImpactMetrics`.
- feat: Inclusión de la "Página de Inicio" en el dashboard de administración del CMS.
- fix: Reparado `ReferenceError: dbConnect` en el componente `GenericCmsPage`.

## v1.1.0 — 2026-03-11
- feat: Accesibilidad: Selector de tamaño de fuente persistente en el Header (`A A A`).
- feat: Integración del logo oficial de Andar FC.
- feat: Recreación del diseño original de Novedades, Aliados y Cuenta Regresiva en la página de Inicio.
- config: Habilitada carga remota de imágenes estáticas desde `futbolinclusivo.org.ar` en `next.config.mjs`.

## v1.0.0 — 2026-03-11
- feat: Initial platform redesign with Next.js App Router
- feat: Multi-step tournament registration form (3 steps)
- feat: Court rental module with interactive calendar
- feat: Overbooking prevention with compound unique index
- feat: Full WCAG accessibility (ARIA, keyboard nav, screen reader support)
- feat: Atkinson Hyperlegible typography
- feat: High contrast mode support
- feat: Informational pages (Home, Nosotros, Contacto, Novedades)
- feat: MongoDB schemas (Team, Player, Reservation)
- docs: Ariadne Engine initialized
