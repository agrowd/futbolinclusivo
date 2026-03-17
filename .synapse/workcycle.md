# Workcycle Log

## 2026-03-11 — Sesión 1: Diseño y Desarrollo Inicial

### Qué se hizo:
1. Auditoría completa del sitio actual (futbolinclusivo.org.ar)
2. Diseño del sistema de diseño accesible (tokens, colores, tipografía)
3. Scaffolding de Next.js con App Router + Tailwind v4
4. Creación de todos los componentes de layout (Header, Footer, SkipLink)
5. Implementación de 5 páginas: Home, Nosotros, Contacto, Novedades, Inscripción, Canchas
6. 3 API routes: inscription, reservas, disponibilidad
7. 3 Mongoose schemas: Team, Player, Reservation
8. Inicialización completa de `.synapse/`
9. **Desarrollo del control de tamaño de fuente (`localStorage`) en el Header (A A A).**
10. **Importación del logo oficial (`ANDAR-AFC-ESCUDO-logo.png`) al Header.**
11. **Recreación del Homepage original con Novedades, Cuenta regresiva (Finales 2025) y Aliados.**
12. **Extracción automatizada de contenido textual desde archivos `.txt` (script NodeJS).**
13. **Análisis de layouts originales mediante galería visual y agente navegador.**
14. **Implementación de nueva Arquitectura (Hubs: Institucional, Programas, Sumate) y sub-páginas.**
20. **Refactorización de Event Handlers JS a CSS puro para preservar Next.js Server Components.**

### FASE 11 - Integración de Contenido Completo y Multimedia (En progreso)
- [x] Lectura profunda del `extracted_content.json` para recuperar el texto crudo.
- [x] Creación del reporte comparativo (`comparativa_sitios.md`).
- [x] Inyección de texto sin resumir e imágenes con URLs originales en Hubs y subpáginas.

### FASE 13 - Funcionalidades Legacy & Pulido Visual
- [x] Crear Hub de `/multimedia`
- [x] Blog real para las `/novedades/[slug]`
- [x] Mejorar legibilidad con Framer Motion / animaciones CSS en textos largos y grillas.
- [x] Actualizar Footer y Contacto con redes/correos verdaderos.

### Decisiones tomadas:
- Green primario oscurecido para cumplir WCAG 4.5:1
- Players embebidos en Team schema (no referencia)
- File upload local para MVP

### FASE 17 - Auditoría y Pulido Final (2026-03-14)
- [x] Fix: Await `params` in `Novedades` (Next 16 support)
- [x] Fix: Alineación milimétrica de calendario en `Canchas`
- [x] Fix: Contraste de slots de tiempo y títulos globales
- [x] Fix: Links rotos en `Footer` y `Multimedia`
- [x] Mejora: Filtro dinámico en `ClubStrip` para integración estética

### Decisiones tomadas:
- Await for dynamic params in App Router (Next 15+ convention)
- Aspect-ratio unificado en grillas de reserva para evitar jitter

### FASE 18 - Refinamiento de Navegación y Activos de Marca (2026-03-14)
- [x] Fix: Home Page Runtime Crash (`next.config.mjs` unauthorized hosts)
- [x] Fix: Logos Rotos en `ClubStrip` (Proxy `images.weserv.nl` + Wikimedia SVGs)
- [x] Fix: Visibilidad de Logos `Aliados` (Filter `brightness-0 invert` + Opacity 0.6)
- [x] Mejora: Menú Hamburger oculto en Desktop (`lg:hidden` en Header)
- [x] Mejora: Espaciado Hero Expansivo (180px top padding) en todas las subpáginas

### Decisiones tomadas:
- Proxy centralizado vía `weserv.nl` para assets externos.
- Padding expansivo (180px) estandarizado en Hubs.

### Próximo paso:
- Validación final con el usuario.
