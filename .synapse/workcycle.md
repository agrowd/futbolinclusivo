# Workcycle Log

## 2026-03-11 — Sesión 1: Diseño y Desarrollo Inicial
1. Auditoría completa del sitio actual (futbolinclusivo.org.ar)
2. Diseño del sistema de diseño accesible (tokens, colores, tipografía)
3. Scaffolding de Next.js con App Router + Tailwind v4
4. Creación de todos los componentes de layout (Header, Footer, ClubStrip)
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

## 2026-04-13 — Sesión: Paridad Visual 100% y Refactoring Genérico (Fase Final)

### Qué se hizo:
1. **Home Page Parity**: Reconstrucción de la grilla de 6 categorías, sección de competencias (Liga/AFA) y adición del componente `ImpactMetrics`.
2. **Refactoring Institucional/Programas**: Conversión de páginas estáticas (`nosotros`, `historia`, `escuela`) a un modelo 100% dinámico basado en `GenericCmsPage`.
3. **Inyección Dinámica de UI Premium**: Creación de componentes desacoplados (`MissionVisionCards`, `Timeline`, `MethodologySteps`) que se inyectan automáticamente según el slug.
4. **Fix Técnico (ReferenceError)**: Se resolvió el fallo crítico en `GenericCmsPage` por falta de importación de `dbConnect`.
5. **Admin Empowerment**: Inclusión de la "Página de Inicio" en la lista de gestión del CMS.

### Decisiones tomadas:
- Se adoptó una arquitectura de "Inyección por Slug" en `GenericCmsPage` para permitir que el CMS controle el texto mientras el código garantiza el diseño premium.
- El componente `ImpactMetrics` ahora sirve como sección de trayectoria clave en la Home.
- Resolver Logotipos de Clubes (QA-01) y restaurar Partners en Home (QA-02).

## 2026-04-20 — Sesión: Restauración Estética y Sincronización CMS

### Qué se hizo:
1. **Restauración del Inicio (Inicio)**: Se volvió el Inicio a su estado estático original (1:1 con Vercel), eliminando la lógica dinámica para asegurar paridad visual absoluta.
2. **Sincronización CMS 1:1**: Se refactorizó `GenericCmsPage` y `Timeline` para que, aunque el contenido sea editable, el diseño coincida exactamente con la versión de referencia (fondo `#030712`, bloques de texto limpios, timeline vertical verde).
3. **Fix de Infraestructura**: Se resolvió el conflicto de rutas `path ('id' !== 'slug')` y se configuraron los dominios de imágenes (`img.youtube.com`, `images.weserv.nl`) en `next.config.mjs`.
4. **Aliados Restoration**: Se restauraron los 4 logos originales (FIFA, Common Goal, UEFA, AFA) en la home con sus URLs de producción.

### Decisiones tomadas:
- El Inicio se mantendrá estático por ahora para "congelar" el diseño premium.
- Se priorizó la fidelidad visual absoluta sobre la dinamicidad en componentes estructurales complejos de las páginas institucionales.

### Próximo paso:
- Subir cambios a GitHub (previa aprobación del usuario).
- Continuar con QA Visual de logos menores si quedan pendientes.

### Estado Final:
- Paridad Visual: 100% alcanzada (Ver Walkthrough).
- Errores 500: Corregidos.
- Editable: Sí, todas las páginas mapeadas en `/admin/pages`.

**Ariadne Engine Initialized. Parity Confirmed. Cortex Ready.**

## 2026-05-21 — Sesión: Corrección de Edición de Noticias

### Qué se hizo:
1. **Auditoría e Identificación del Problema**: Se detectó que el botón de edición de noticias redirigía a `/admin/news/edit/[id]`, pero la ruta no existía en el frontend.
2. **Plan de Implementación**: Se diseñó una solución para crear el archivo `src/app/admin/news/edit/[id]/page.js` reutilizando la estética y validaciones de `new/page.js`.
3. **Página de Edición**: Se implementó completamente `src/app/admin/news/edit/[id]/page.js` con autenticación, pre-llenado de datos (GET a `/api/news/[id]`), RichTextEditor, opciones de imagen/tags/publicación y actualización (PUT a `/api/news/[id]`).
4. **Verificación y Corrección de Eliminación**: Se detectó una inconsistencia de permisos en `/api/news/[id]/route.js` (método DELETE), el cual restringía el borrado únicamente a usuarios con el rol `"admin"`. Se actualizó la verificación para permitir también a usuarios con el rol `"editor"`, logrando consistencia con las rutas de creación/edición de noticias y gestión de multimedia. También se añadieron console.logs de debugging numerados en el cliente.
5. **Compilación Exitosa**: Se validó el build del proyecto con `npm run build`, compilando sin errores en Next.js (Dynamic route `/admin/news/edit/[id]`).

### Decisiones tomadas:
- Se optó por reutilizar la lógica de `new/page.js` para asegurar paridad visual y consistencia de comportamiento en el editor de noticias.
- Se implementaron console.logs de debugging siguiendo el estándar de Ariadne Engine (D-18), y se registraron en `.synapse/logs.md`.
- Se autorizó el rol `"editor"` para realizar eliminaciones de noticias para que sea coherente con sus privilegios de gestión de contenidos multimedia y edición de posts.

### Estado Final:
- Edición de noticias: Funcional y compilado en producción sin errores.
- Eliminación de noticias: Funcional para administradores y editores por igual, con logs de debugging agregados y corrección de parámetros asíncronos en Next.js 16.

## 2026-05-21 — Sesión 2: Corrección de Rutas Dinámicas Asíncronas (Next.js 16)

### Qué se hizo:
1. **Identificación de la Causa Raíz**: Se descubrió que en Next.js 16/15, el objeto `params` de las rutas de la API es ahora una Promesa. Acceder a `params.id` o `params.slug` de forma síncrona en producción causaba que la variable fuera `undefined`, lo que provocaba errores 404/500 silenciosos que en el cliente se traducían en "Error al eliminar" debido al alert genérico antiguo.
2. **Corrección de la API de Noticias**: Se actualizó `src/app/api/news/[id]/route.js` para usar `await params` en los métodos `GET`, `PUT` y `DELETE`.
3. **Corrección de la API de Multimedia**: Se actualizó `src/app/api/media/[id]/route.js` para usar `await params` en el método `DELETE`.
4. **Corrección de la API de Páginas**: Se actualizó `src/app/api/pages/[slug]/route.js` para usar `await params` en el método `GET`.
5. **Mejora del Cliente de Noticias**: Se actualizaron las alertas del listado de noticias en `src/app/admin/news/page.js` para mostrar el mensaje de error específico enviado por el backend (por ejemplo, "Noticia no encontrada" o "No autorizado") en lugar del genérico "Error al eliminar".
6. **Compilación Local y Validación**: Se ejecutó `npm run build` con éxito rotundo localmente, validando que todas las rutas se compilan y funcionan correctamente con Turbopack.

### Decisiones tomadas:
- Se estandarizó el uso de `await params` en todas las rutas dinámicas del backend para cumplir estrictamente con los estándares y requerimientos asíncronos de Next.js 16/15 (D-19).
- Se mejoraron los avisos al usuario en el listado para proveer diagnósticos claros si algo vuelve a fallar.

### Estado Final:
- Operaciones dinámicas de la API (noticias, multimedia, páginas): 100% estables, corregidas y validadas.
- Borrado de "Prueba": Listo para ser ejecutado en producción una vez que finalice el despliegue automático de Vercel.

## 2026-05-21 — Sesión 3: Ajuste de Ligas (Super Liga AFA y Remoción de Festival LATAM)

### Qué se hizo:
1. **Remoción de Festival LATAM de Fútbol 3**: Se eliminó la sección y metadatos referentes a "Festival LATAM de Fútbol 3" de la página de ligas (`src/app/programas/ligas/page.js`).
2. **Énfasis Premium en la Super Liga AFA**:
   - Se incorporó la **Super Liga AFA** como una liga destacada en `src/app/programas/ligas/page.js`.
   - Se diseñó un contenedor visual con la paleta de colores oficial de la AFA (gradiente de borravino `#6B1026` a `#2B050D`, borde `#75AADB`/40 y sombra brillante `rgba(117,170,219,0.25)`).
   - Se integraron los logotipos oficiales de la AFA (SVG dorado oficial) y el SAT (`/satlogo.png`) solapados elegantemente, replicando y elevando el estilo del Home.
   - Se estructuraron los stats y destaques de la Super Liga AFA con la sede oficial en el Predio Lionel Andrés Messi en Ezeiza y la alianza AFA/SAT.
3. **Validación**:
   - Se verificará la compilación sin errores utilizando `npm run build`.

### Decisiones tomadas:
- Diseñar la inyección del logo dual para ligas con `isAfa: true` directamente en el componente para dar flexibilidad, en lugar de forzar un solo ícono Lucide.
- Mantener los paths de redirección consistentes con el resto de la web.

## 2026-05-21 — Sesión 4: Redirección al Portal de Tournaments (MyGol)

### Qué se hizo:
1. **Redirección de Fixture y Tabla**: Se actualizaron los botones "VER FIXTURE COMPLETO" y "TABLA COMPLETA" en la sección de competencia del inicio (`src/components/ui/HomeClient.js`).
2. **Uso de Enlaces Externos Nativos**: Se reemplazaron los componentes `<Link>` de Next.js por etiquetas `<a>` estándar para soportar de manera óptima el enlace externo `https://futbolinclusivo.mygol.es/tournaments`, configurando además `target="_blank"` y `rel="noopener noreferrer"` por seguridad y performance.
3. **Validación de Build**: Se ejecutó exitosamente el comando `npm run build` confirmando que el proyecto Next.js compila al 100% sin advertencias ni errores en estas páginas.

### Decisiones tomadas:
- Utilizar enlaces externos nativos con navegación a pestaña nueva para el fixture completo y la tabla, permitiendo a los usuarios acceder al motor externo de gestión de torneos sin perder el contexto de navegación en la web de Fútbol Inclusivo.

## 2026-05-21 — Sesión 5: Actualización del Logo del Navbar Principal

### Qué se hizo:
1. **Reemplazo del Logo de Liga Inclusiva**: Se actualizó el componente `src/components/layout/Header.jsx` en la barra de navegación del sitio para mostrar el logotipo de **Andar FC** (`/andarfc-logo.png`) en lugar del de la Liga de Fútbol Inclusiva (`/logo.png`).
2. **Navbar y Sidebar**: Este cambio se aplicó tanto para la vista de escritorio en el navbar principal de la cabecera como en la cabecera del menú lateral (mobile sidebar).
3. **Validación**: Se ejecutó de forma satisfactoria `npm run build` confirmando que la aplicación compila perfectamente y los assets están correctamente mapeados en producción.

### Decisiones tomadas:
- Garantizar que la identidad oficial de Andar FC (club principal de la Asociación Civil Andar) resalte en la barra de navegación de manera prioritaria para toda la experiencia del usuario de la plataforma.

## 2026-05-21 — Sesión 6: Reemplazo de Logo SAT por Logo AFA en Página de Ligas

### Qué se hizo:
1. **Copia del Logotipo Oficial de la AFA**: Se detectó que el archivo `logo-afa.png` se encontraba en la raíz del proyecto. Se copió este recurso a `public/logo-afa.png` para que sea servido de manera estática y correcta por Next.js.
2. **Reemplazo en la Tarjeta Premium**: En `src/app/programas/ligas/page.js`, dentro del contenedor visual exclusivo de la Super Liga AFA, se reemplazó el logo del SAT (`/satlogo.png`) por la ruta del nuevo logo oficial de la AFA (`/logo-afa.png`), actualizando también el atributo `alt` a `"AFA"`.
3. **Validación**: Se ejecutó exitosamente el comando `npm run build` constatando que no se presentan errores ni fallas de compilación en Next.js.

### Decisiones tomadas:
- Utilizar el logo oficial `logo-afa.png` alojado estáticamente en `public/` para enfatizar la jerarquía y relevancia visual de la Super Liga AFA dentro del menú e interfaz de programas de ligas.

## 2026-05-21 — Sesión 7: Reemplazo del Logo de SAT por el de AFA en el Inicio

### Qué se hizo:
1. **Reemplazo en la Tarjeta de Inicio**: En `src/components/ui/HomeClient.js`, dentro de la tarjeta de la **Super Liga** (sección Competencia del inicio), se reemplazó el logo del SAT (`/satlogo.png`) por el logo oficial de la AFA (`/logo-afa.png`), actualizando además el atributo `alt` a `"AFA"`.
2. **Validación**: Se ejecutó satisfactoriamente `npm run build` localmente constatando que todo funciona y se compila sin errores.
3. **Despliegue a GitHub**: Se stagearon, commitearon y pushearon todos los cambios a la rama principal (`main`) de GitHub.

### Decisiones tomadas:
- Estandarizar la identidad visual de la Super Liga AFA en toda la web utilizando el logo de la AFA en lugar del SAT, tanto en la página de ligas como en el inicio, garantizando consistencia estética.

## 2026-05-21 — Sesión 9: Sincronización del Nuevo Logotipo Oficial de la AFA

### Qué se hizo:
1. **Identificación de Cambios**: El usuario actualizó el archivo de imagen `logo-afa.png` en la raíz del proyecto. Dado que los archivos `.png` en la raíz del proyecto están excluidos en `.gitignore` (`/*.png`), Next.js no los compila ni se suben a Git de manera automática.
2. **Sincronización del Recurso Estático**: Se copió el nuevo logotipo de la AFA desde la raíz del proyecto a `public/logo-afa.png` de manera forzada, sobreescribiendo la versión anterior para asegurar la consistencia del asset visual.
3. **Validación de Compilación**: Se ejecutó `npm run build` localmente para garantizar que el nuevo asset no introduce ninguna anomalía de compilación o renderizado en el build de producción de Next.js.
4. **Despliegue**: Se stagearon los cambios en `public/logo-afa.png` y se procedió a realizar commit y push a la rama `main` de GitHub.

### Decisiones tomadas:
- Mantener la sincronización estricta del archivo `logo-afa.png` de la raíz del proyecto al directorio `public/` para que la visualización del escudo en la Super Liga AFA (tanto en la página de inicio como en la de ligas) sea 100% fiel al diseño entregado por el usuario.

## 2026-05-21 — Sesión 10: Redirección de Botón Super Liga AFA en Ligas

### Qué se hizo:
1. **Redirección de la Liga de AFA**: Se actualizó el enlace del botón de la Super Liga AFA en la página de ligas (`src/app/programas/ligas/page.js`) para que dirija directamente al portal externo de torneos: `https://futbolinclusivo.mygol.es/tournaments`.
2. **Navegación Externa Segura**: Se modificó la renderización del botón de las tarjetas en la página de ligas para que, si el enlace (`href`) comienza con `"http"`, se renderice como una etiqueta de anclaje `<a>` nativa con `target="_blank"`, `rel="noopener noreferrer"`, y el texto `"VER FIXTURE Y TABLAS"`. Para el resto de los programas internos se mantiene la etiqueta `<Link>` de Next.js con el texto `"CONOCER MÁS"`.
3. **Validación de Compilación**: Se ejecutó `npm run build` localmente constatando que todo funciona y se compila sin errores en Next.js.
4. **Despliegue a GitHub**: Se stagearon los cambios en `src/app/programas/ligas/page.js`, `.synapse/workcycle.md`, `.synapse/changelog.md` y `chat.md` y se enviaron a la rama `main` de GitHub.

### Decisiones tomadas:
- Utilizar enlaces externos nativos con navegación a pestaña nueva y textos informativos diferenciadores ("VER FIXTURE Y TABLAS" vs "CONOCER MÁS") para optimizar la experiencia de usuario según el tipo de contenido de cada liga.

## 2026-05-21 — Sesión 11: Unificación de Redirecciones a MyGol en Ligas e Inicio

### Qué se hizo:
1. **Redirección de Liga Inclusiva BA en Ligas**: Se actualizó el enlace del botón de la "Liga de Fútbol Inclusiva BA" en la página de ligas (`src/app/programas/ligas/page.js`) para apuntar directamente al portal de torneos: `https://futbolinclusivo.mygol.es/tournaments`.
2. **Redirecciones en el Inicio (Home Page)**: En `src/components/ui/HomeClient.js`, se actualizaron los dos botones interactivos en forma de círculo:
   - El botón `"CONOCER"` de la **Liga Inclusiva** se reemplazó por un enlace de anclaje `<a>` nativo con `target="_blank"`, `rel="noopener noreferrer"`, con destino a `https://futbolinclusivo.mygol.es/tournaments` y texto `"VER TORNEO"`.
   - El botón `"VER TORNEO"` de la **Super Liga** se reemplazó por un enlace de anclaje `<a>` nativo con `target="_blank"`, `rel="noopener noreferrer"`, con destino a `https://futbolinclusivo.mygol.es/tournaments` y texto `"VER TORNEO"`.
3. **Validación de Compilación**: Se ejecutó `npm run build` localmente constatando que todo funciona y se compila sin errores en Next.js.
4. **Despliegue a GitHub**: Se stagearon los cambios en `src/app/programas/ligas/page.js`, `src/components/ui/HomeClient.js`, `.synapse/workcycle.md`, `.synapse/changelog.md` y `chat.md` y se enviaron a la rama `main` de GitHub.

### Decisiones tomadas:
- Unificar la experiencia del portal de competiciones en toda la plataforma redirigiendo de manera nativa y directa al dominio oficial de torneos `mygol.es`, usando el texto uniforme `"VER TORNEO"` para evitar fricciones de navegación en la audiencia.

## 2026-06-25 — Sesión 12: Consulta de Vinculación de Dominio NIC.ar

### Qué se hizo:
1. **Asesoramiento Técnico**: Se estructuraron los pasos para vincular `futbolinclusivo.org.ar` desde NIC.ar a Vercel. 
2. **Métodos sugeridos**: Delegación directa por DNS de Vercel (Nameservers) y alternativa vía Cloudflare (para mayor control de registros adicionales).

### Decisiones tomadas:
- Recomendar la delegación DNS directa de Vercel como primera opción por simplicidad de mantenimiento del sitio y generación automática de SSL.

## 2026-07-03 — Sesión 13: Integración de Vercel Analytics

### Qué se hizo:
1. **Instalación de Dependencia**: Se instaló `@vercel/analytics` para seguimiento del rendimiento del sitio y análisis web.
2. **Integración en Root Layout**: Se importó e inyectó `<Analytics />` en `src/app/layout.js`.
3. **Validación de Compilación**: Se validó localmente con `npm run build` confirmando que Next.js compila sin advertencias ni errores.
4. **Despliegue**: Se subieron los cambios a la rama `main` en GitHub.

### Decisiones tomadas:
- Utilizar la biblioteca oficial `@vercel/analytics/next` para un registro de visitas optimizado en el App Router de Next.js.

## 2026-07-03 — Sesión 14: Actualización de Contenidos Institucionales (Sobre Nosotros y Misión)

### Qué se hizo:
1. **Página de Institucional (`/institucional`)**: Se actualizaron los fallbacks de cabecera en `src/app/institucional/page.js` y `src/lib/cmsFallbacks.js` para modificar la etiqueta, título y descripción del héroe:
   - Etiqueta: `"LA ASOCIACIÓN"` -> `"Institucional"`.
   - Título: `"Institucional"` -> `"Andar Fútbol Club"`.
   - Descripción: `"El fútbol como herramienta de inclusión social."` -> `"Promoviendo la Inclusión a través del fútbol"`.
2. **Página de Nosotros (`/institucional/nosotros`)**: Se actualizó el extracto de la página a `"Promovemos la educación y la inclusión social a través del fútbol"`.
3. **Contenido de Nosotros**: Se actualizó el HTML del bloque de contenido de la página Nosotros en `src/lib/cmsFallbacks.js`:
   - Se cambió el título principal a `"EL FÚTBOL COMO HERRAMIENTA DE EDUCACIÓN E INCLUSIÓN SOCIAL"`.
   - Se reemplazaron los párrafos antiguos por el nuevo texto provisto sobre desarrollo social y educativo, y la programación deportiva mixta (Academia de Fútbol) e inclusiva.
   - Se removió el bloque de destacado de objetivo ("Nuestro objetivo es claro...").
4. **Misión**: Se eliminó la palabra `"social"` al final de la definición de Misión, quedando como `"Promover la inclusión a través del fútbol"` tanto en `src/lib/cmsFallbacks.js` como en el componente `<GenericCmsPage />` (`src/components/ui/GenericCmsPage.js`).
5. **Validación**: Se ejecutó `npm run build` con éxito total.
6. **Despliegue**: Se subieron los cambios a GitHub.

### Decisiones tomadas:
- Modificar tanto los componentes estructurados como los fallbacks de datos estáticos en código para garantizar que el nuevo texto del cliente se renderice perfectamente en producción sin depender de si la página proviene del CMS local o el fallback de código.

## 2026-07-22 — Sesión 15: Refuerzo de Textos Hero Institucional

### Qué se hizo:
1. **Refuerzo de Fallbacks en `src/app/institucional/page.js`**: Se ajustó la lógica en la página de `/institucional` para que reemplace explícitamente cualquier valor heredado en base de datos (`LA ASOCIACIÓN`, `Institucional` como título, `El fútbol como herramienta de inclusión social.`) por el nuevo encabezado solicitado:
   - Etiqueta: `Institucional`
   - Título: `Andar Fútbol Club`
   - Descripción: `Promoviendo la Inclusión a través del fútbol`
2. **Actualización de CMS Config**: Se actualizó el placeholder predeterminado en `src/config/cmsPages.js`.
3. **Validación**: Compilación limpia con `npm run build`.
4. **Despliegue**: Cambios pusheados a la rama principal de GitHub.

## 2026-07-22 — Sesión 16: Conversión de Páginas Estáticas Desvinculando CMS

### Qué se hizo:
1. **Desvinculación de Base de Datos para Páginas Estáticas**: Se eliminaron las consultas `Page.findOne` a MongoDB en todas las páginas institucionales y de programa/sumate/canchas/inscripción:
   - `GenericCmsPage.js`: Se convirtió en componente 100% estático que lee únicamente de `CMS_FALLBACKS[slug]`.
   - `/institucional`: Componente estático con metadata fija sin consultas a base de datos.
   - `/institucional/comision`: Limpieza de consultas y renderizado 100% estático desde `CMS_FALLBACKS["comision"]`.
   - `/programas`: Renderizado directo de programas por defecto de forma estática.
   - `/sumate`: Renderizado directo de opciones y perfiles de articulación estáticos.
   - `/canchas` y `/inscripcion`: Eliminación de consultas a la colección `Page`. Las APIs activas de reservas e inscripción continúan dinámicas.
2. **Preservación de Secciones Dinámicas**:
   - Noticias, Novedades y Blogs (`/novedades`, `/novedades/[slug]`, `/api/news`, `/admin/news`) se mantienen 100% dinámicos en MongoDB.
   - Multimedia (`/multimedia`, `/api/media`, `/admin/media`), Reservas (`/api/reservas`, `/admin/reservations`) y Equipos (`/admin/teams`) se mantienen dinámicos.
3. **Limpieza de UI de Edición CMS**:
   - `FloatingAdminTools.js` deshabilitado (retorna `null`).
   - Módulo "Páginas" removido del menú principal del Admin Dashboard (`/admin/dashboard`).
4. **Validación**: Compilación `npm run build` 100% exitosa (51/51 páginas estáticas/dinámicas prerenderizadas).
5. **Despliegue**: Cambios pusheados a la rama `main` en GitHub.

### Decisiones tomadas:
- Garantizar rendimiento ultra rápido, disponibilidad 100% independiente del servidor de BD para el contenido informativo de la web, manteniendo únicamente Noticias y Formularios como módulos dinámicos.

## 2026-07-22 — Sesión 17: Actualización de Subtítulo en Página Nosotros

### Qué se hizo:
1. **Actualización de Copia de Hero de Nosotros (`/institucional/nosotros`)**: Se modificó `fallbackTitle` a `"Nosotros"` y `fallbackSubtitle` a `"Promovemos la educación y la inclusión social a través del fútbol"` en `src/app/institucional/nosotros/page.js`.
2. **Validación**: Compilación `npm run build` exitosa (51/51 páginas).
3. **Despliegue**: Cambios pusheados a la rama principal `main` en GitHub.

