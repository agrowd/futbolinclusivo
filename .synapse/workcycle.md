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

## 2026-07-24 — Sesión 18: Actualización de Textos de Propósito y Misión Institucional

### Qué se hizo:
1. **Actualización de Título y Cuerpo en Propósito (`/institucional/propósito`)**:
   - Título: `"EL FÚTBOL COMO HERRAMIENTA DE EDUCACIÓN E INCLUSIÓN SOCIAL"`
   - Subtítulo & Párrafo 1: `"El fútbol tiene un arraigo particular en la cultura argentina, y por eso constituye una herramienta privilegiada de desarrollo social y educativo. Su poder convocante nos permite generar un espacio de participación colectiva donde el eje no es la competencia, sino la de acompañar trayectorias educativas a través del juego, el aprendizaje de valores y la construcción de ciudadanía."`
   - Párrafo 2: `"La programación deportiva de Andar Fútbol Club no se circunscribe exclusivamente al abordaje de personas con discapacidad: la Academia de Fútbol cuenta con categorías infantiles mixtas desde los 4 a 13 años de edad, categorías inclusivas para personas mayores de 14 años de edad, articulando una propuesta integral centrada en las infancias y el fútbol inclusivo. En todos los casos, garantizando espacios seguros y libres de discriminación donde cada persona pueda desarrollarse plenamente."`
   - Párrafo 3: `"El deporte, desde nuestra visión, es una plataforma para la inclusión, la educación y el ejercicio pleno de derechos."`
2. **Actualización de Misión**:
   - `"Nuestra Misión"`: Se actualizó la definición a `"Promover la inclusión a través del fútbol."` (eliminando la palabra `"social"` del final para coincidir exactamente con la nueva redacción oficial).
3. **Sincronización en Fallbacks**: Se actualizaron las entradas de `proposito` en `src/lib/cmsFallbacks.js` para mantener coherencia estática global.
4. **Validación**: Compilación `npm run build` 100% limpia (51/51 páginas).
5. **Despliegue**: Cambios subidos a GitHub.

## 2026-08-13 — Sesión 19: Formulario Día de las Infancias, Pases QR y Panel de Acreditación

### Qué se hizo:
1. **Página Pública `/dia-de-las-infancias`**:
   - Hero dinámico y llamativo del evento Día de las Infancias en Andar Fútbol Club.
   - Formulario de inscripción (`InfanciasForm.js`) con validación de campos obligatorios:
     - Nombre completo del niño/a (Obligatorio).
     - Teléfono/WhatsApp de contacto (Obligatorio).
     - Checkbox de Autorización de Uso de Imagen (Obligatorio e ineludible).
     - Campos de ejemplo complementarios: DNI, Edad, Fecha de Nacimiento, Localidad, Institución/Club/Comedor y Observaciones Médicas.
2. **Generación Instantánea de Pase con QR**:
   - Al enviar el formulario se genera un código de ticket único `INF-XXXXX` y un código QR con `qrcode`.
   - Comprobante digital interactivo con opciones de: Descargar QR, Compartir a WhatsApp, Imprimir o inscribir a otro participante.
3. **Módulo de Administración y Escáner (`/admin/infancias`)**:
   - Métricas y KPIs en vivo: Total Inscriptos, Total Acreditados (Ingresados), Pendientes de Ingreso y % de Asistencia.
   - **Escáner QR de Puerta (`InfanciasScannerModal.js`)**: Lectura con cámara en vivo (`html5-qrcode`), pitidos de feedback sonoro (Web Audio API), advertencia si un pase ya fue ingresado previamente (con hora exacta) y búsqueda/acreditación manual instantánea por DNI/Código.
   - **Tabla de Gestión**: Buscador en tiempo real, filtros por estado (Todos/Acreditados/Pendientes), toggle de acreditación en 1 clic, editor de datos (`InfanciasEditModal.js`), visualizador de pase (`InfanciasTicketModal.js`) y eliminación de registros.
   - **Exportación**: Descarga completa a Excel / CSV con un solo clic.
4. **Integración con Dashboard y Subdominios**:
   - Añadida tarjeta "Día de las Infancias" al dashboard de administración (`/admin/dashboard`).
   - Mapeo y reescritura de subdominios `admin.futbolinclusivo.org.ar` y `admin.futbolinclusivo.com.ar` en `next.config.mjs`.
5. **Validación**: Compilación `npm run build` 100% exitosa (56/56 rutas compiladas).
6. **Despliegue**: Cambios pusheados a GitHub `main`.

## 2026-08-13 — Sesión 21: Formulario Familiar Multi-Chico, Verificación Anti-Duplicados en Tiempo Real y Escáner Móvil Rápido

### Qué se hizo:
1. **Inscripción Multi-Chico Familiar (`InfanciasForm.js`)**:
   - Permite que los padres completen sus datos de contacto y tutor una sola vez y agreguen múltiples hijos/as con el botón `+ Agregar otro hermano/a`.
   - Genera los códigos de tickets y códigos QR individuales para cada chico bajo un mismo `familyGroupId`.
   - Pantalla de confirmación con vista de todos los pases QR familiares y botón para compartir todos los pases juntos por WhatsApp o descargar los QR.
2. **Verificación Anti-Duplicados en Tiempo Real (`/api/infancias/check-duplicate`)**:
   - A medida que el padre escribe el DNI o el Nombre + Teléfono, el sistema verifica contra MongoDB con debounce y alerta en vivo si el chico ya fue inscripto para evitar duplicados o errores.
3. **Escáner de Puerta Didáctico y Móvil (`InfanciasScannerModal.js`)**:
   - Vistas a pantalla completa adaptativas con feedback sonoro (Web Audio API) y banners gigantes de colores:
     - 🟢 **PANTALLA VERDE GIGANTE (OK)**: Nombre grande, edad, DNI, ticket y alertas médicas.
     - 🟡 **PANTALLA AMARILLA (ATENCIÓN)**: Alerta si el pase ya ingresó a una hora específica.
     - 🔴 **PANTALLA ROJA (ERROR)**: Código no encontrado.
   - Cambio de cámara trasera/frontal con un toque y soporte de búsqueda manual por DNI.
   - Contador en vivo de chicos ingresados en la barra superior.
4. **Optimización Mobile del Panel Admin (`/admin/infancias`)**:
   - Rediseño mobile-first con tarjetas táctiles, botones grandes de acreditación en 1 clic y botón flotante FAB para abrir el escáner de cámara con una mano.
5. **Validación y Despliegue**: Compilación exitosa (57/57 rutas) y push a GitHub.

## 2026-08-13 — Sesión 22: Logos de Footer y Favicon de Andar FC

### Qué se hizo:
1. **Restauración de Logos en el Footer (`Footer.jsx`)**:
   - Se reemplazaron las URLs remotas caídas por los recursos estáticos locales optimizados:
     - Logo oficial de **Andar FC**: `/andarfc-logo.png`
     - Logo oficial de la **Asociación Civil Andar**: `/logo.png`
   - Se actualizó también el logotipo de la columna principal de marca para usar `/andarfc-logo.png`.
2. **Configuración de Favicon para todo el sitio**:
   - Se copió el logo de Andar FC a `src/app/icon.png` y `src/app/apple-icon.png` (generados automáticamente por Next.js).
   - Se incluyeron las etiquetas `<link rel="icon" ...>` y `<link rel="apple-touch-icon" ...>` en `<head>` de `src/app/layout.js`.
3. **Validación y Despliegue**: Compilación `npm run build` exitosa (59/59 rutas estáticas/dinámicas) y push a GitHub `main`.

## 2026-08-13 — Sesión 23: Persistencia en LocalStorage de Pases Familiares, Instrucciones de WhatsApp y Cache-Busting de Favicon

### Qué se hizo:
1. **Persistencia de Pases en LocalStorage (`InfanciasForm.js`)**:
   - Guarda los pases generados y los datos del tutor en `localStorage` (`infancias_saved_tickets` e `infancias_saved_tutor`).
   - Al ingresar a `/dia-de-las-infancias`, si ya existen pases guardados, se muestra un banner destacado con:
     - Botón **"Ver mis Pases"** (abre la visualización directa con los códigos QR).
     - Botón **"Inscribir a otro hijo/a (mantener mis datos)"** (precarga los datos del tutor para sumar otro chico).
     - Botón **"Empezar de cero para otra persona/familia"** (limpia el formulario y el almacenamiento).
2. **Mensaje de WhatsApp Enriquecido con Instrucciones Paso a Paso**:
   - Redacta un mensaje detallado con el nombre de cada hijo/a, su código de ticket, DNI y una guía paso a paso de lo que deben hacer el día del evento (guardar el mensaje y mostrar el QR en la mesa de entrada).
   - En la pantalla de confirmación se agregó una tarjeta informativa explicando los pasos para el ingreso.
3. **Invalidación Forzada de Caché para Favicon**:
   - Se agregaron parámetros de versión `?v=3` en `<head>` de `layout.js` y se sobreescribieron todos los archivos `public/favicon.ico`, `public/favicon.png`, `public/icon.png` y `src/app/favicon.ico` con el logo oficial de Andar FC.
4. **Validación y Despliegue**: Compilación `npm run build` exitosa (59/59 rutas) y push a GitHub `main`.

## 2026-08-13 — Sesión 24: Campos Obligatorios en Formulario Día de las Infancias

### Qué se hizo:
1. **Validación Estricta de Campos Obligatorios**:
   - Se configuraron como obligatorios (`required` tanto en Frontend como en Backend `/api/infancias`):
     - **Adulto / Tutor**: Nombre y Apellido (`tutorName`), Teléfono / WhatsApp (`tutorPhone`), Localidad / Barrio (`locality`), Email (`tutorEmail`), Autorización de Imagen (`imageConsent`).
     - **Niño / Niña**: Nombre y Apellido (`childName`), DNI (`childDni`), Edad (`childAge`), Fecha de Nacimiento (`childBirthDate`), Observaciones Médicas / Alergias (`medicalNotes`).
   - El único campo opcional es **Club o Institución** (`clubOrSchool`).
2. **Validación y Despliegue**: Compilación `npm run build` exitosa (59/59 rutas) y push a GitHub `main`.

## 2026-08-13 — Sesión 25: Alta Manual de Adulto y Grupo de Niños desde el Panel de Administración

### Qué se hizo:
1. **Modal de Creación Manual (`InfanciasCreateModal.js`)**:
   - Creado componente modal para dar de alta inscripciones individuales o familiares directamente desde `/admin/infancias`.
   - Soporte para datos del tutor + array dinámico de niños/as con botón `+ Agregar otro niño/a`.
   - Comprobación anti-duplicados en tiempo real mientras se escribe el DNI o nombre.
   - Opción `[x] Acreditar / Marcar como ingresado en puerta directamente ahora` para acreditaciones rápidas in situ.
   - Visualizador de pases QR generados, descarga de imagen y botón para compartir por WhatsApp.
2. **Integración en Panel Admin (`/admin/infancias/page.js`)**:
   - Botón `➕ Nueva Inscripción` / `Inscribir` en la barra superior.
   - Actualización inmediata del listado y contadores KPI sin recargar la página.
3. **Validación y Despliegue**: Compilación `npm run build` exitosa (59/59 rutas) y push a GitHub `main`.

## 2026-08-14 — Sesión 26: Corrección de Persistencia de Sesión y Sincronización de Usuarios Admin

### Qué se hizo:
1. **Resolución de la Condición de Carrera en Login**:
   - `src/app/admin/login/page.js`: Se reemplazó el `router.push` por `window.location.href = "/admin/dashboard"` para forzar una sincronización limpia de cookies de sesión en el navegador, evitando que el dashboard detecte erróneamente un estado `unauthenticated` temporal y expulse al usuario.
2. **Robustez de Middleware y NextAuth**:
   - `src/middleware.js` y `src/app/api/auth/[...nextauth]/route.js`: Se definió el `secret` explícito de respaldo para el descifrado seguro de tokens JWT en Edge/Node runtime.
   - Manejo automático de recuperación y verificación de contraseñas para los usuarios `juanchi@futbolinclusivo.org.ar` y `admin@futbolinclusivo.org.ar` con clave `admin123`.
3. **Sincronización en Base de Datos MongoDB Atlas**:
   - Se ejecutó el script de inicialización conectando a MongoDB Atlas y garantizando que tanto `juanchi` como `admin` queden activos con rol `admin` y contraseña `admin123`.
4. **Validación y Despliegue**: Compilación `npm run build` 100% exitosa (59/59 rutas) y push a GitHub `main`.

## 2026-08-20 — Sesión 27: Envío Automático y Reenvío de Pases QR por Email con Resend

### Qué se hizo:
1. **Módulo de Servicio de Email (`src/lib/email.js`)**:
   - Creada función `sendInfanciasEmail` utilizando la librería oficial de `Resend`.
   - Generación de plantilla HTML personalizada de alta calidad con branding oscuro/verde de Fútbol Inclusivo & Andar FC.
   - Adjuntos de imágenes de códigos QR en línea mediante CIDs (`cid:qr-INF-XXXXX-X`) para visualizar los códigos QR directamente dentro de cualquier cliente de correo (Gmail, Outlook, Apple Mail).
2. **Envío Automático en Registro (`/api/infancias/route.js`)**:
   - Disparo asíncrono no bloqueante al finalizar cada inscripción individual o familiar desde la web o el panel.
3. **Endpoint de Reenvío en Admin (`/api/admin/infancias/send-email/route.js`)**:
   - Permite a los administradores reenviar el correo de confirmación con los pases QR a cualquier tutor con un solo clic.
4. **Integración UI**:
   - Agregado botón `✉️ Email` en `InfanciasTicketModal.js` con indicador de estado (enviando/éxito/error).
   - Agregado aviso informativo en la vista de confirmación pública de `InfanciasForm.js`.
5. **Validación y Despliegue**: Compilación `npm run build` 100% exitosa (60/60 rutas) y push a GitHub `main`.

## 2026-08-20 — Sesión 28: Soporte para Cuentas de Google / Gmail (Nodemailer SMTP)

### Qué se hizo:
1. **Instalación e Integración de Nodemailer**:
   - Se añadió la dependencia `nodemailer` para enviar correos directamente utilizando cualquier cuenta de Gmail o Google Workspace (`GMAIL_USER` + `GMAIL_APP_PASSWORD`).
2. **Soporte Híbrido en `src/lib/email.js`**:
   - Detecta automáticamente las credenciales de entorno: si hay configuradas credenciales de Google/Gmail (`GMAIL_USER` y `GMAIL_APP_PASSWORD`), utiliza Nodemailer vía SMTP (`smtp.gmail.com:465`). De lo contrario, utiliza la API de `Resend`.
3. **Validación y Despliegue**: Compilación `npm run build` 100% exitosa (60/60 rutas) y push a GitHub `main`.

## 2026-08-20 — Sesión 29: Corrección de Generación y Renderizado de QR en Frontend y API

### Qué se hizo:
1. **Restauración de `qrDataUrl` en la Respuesta de la API (`/api/infancias/route.js`)**:
   - Se añadió el atributo `qrDataUrl` al objeto devuelto en `createdTickets.push({...})` que había sido omitido por error en el envío de respuesta.
2. **Generador Dinámico de Respaldo en Cliente (`InfanciasForm.js`)**:
   - Se integró `QRCode` en el cliente con un estado `generatedQrs` y un `useEffect` reactivo que detecta si a algún ticket (guardado en `localStorage` o recibido de la API) le falta el Data URL del QR, generándolo al instante en el navegador.
3. **Validación y Despliegue**: Compilación `npm run build` 100% exitosa (60/60 rutas) y push a GitHub `main`.

## 2026-08-21 — Sesión 30: Configuración y Validación Exitosa de Gmail SMTP (`diadelasinfancias.andar@gmail.com`)

### Qué se hizo:
1. **Configuración de Credenciales de Aplicación Google**:
   - Configurado `GMAIL_USER=diadelasinfancias.andar@gmail.com` y `GMAIL_APP_PASSWORD=zoryurprpsvemgzm` en `.env` local.
   - En `src/lib/email.js` se agregó limpieza automática de espacios en blanco en la clave (`rawSmtpPass.replace(/\s+/g, "")`) y lectura dinámica de variables de entorno para prevenir errores de formato.
2. **Verificación de Envío Real**:
   - Probado exitosamente el envío SMTP mediante Nodemailer recibiendo confirmación directa de Google Gmail (`<bfca7ed4-41e4-b075-2b1f-5b14d58ea7b4@gmail.com>`).
3. **Validación y Despliegue**: Compilación `npm run build` 100% exitosa (60/60 rutas) y push a GitHub `main`.

## 2026-08-21 — Sesión 31: Validación Estricta de Formato de Email Obligatorio

### Qué se hizo:
1. **Validación Estricta de Email en Cliente y Backend**:
   - `src/components/infancias/InfanciasForm.js`, `src/app/api/infancias/route.js` y `src/components/admin/InfanciasCreateModal.js`: Se actualizó la regla de validaciones para exigir obligatoriamente que `tutorEmail` esté presente y posea un formato válido (contenga `@` y `.`).
2. **Despliegue y Re-despliegue en Vercel**:
   - Realizado commit y push a GitHub `main` para forzar la actualización automática en vivo (re-deploy) en Vercel.
3. **Validación y Despliegue**: Compilación `npm run build` 100% exitosa (60/60 rutas) y push a GitHub `main`.

## 2026-08-21 — Sesión 32: Sistema de Envío Masivo de Pases QR para Inscriptos Previos (`/admin/infancias`)

### Qué se hizo:
1. **Endpoint de Envío Masivo por Grupos Familiares (`/api/admin/infancias/batch-email/route.js`)**:
   - Agrupa automáticamente las inscripciones por `familyGroupId` o `tutorEmail` para enviar **1 solo correo por familia** con todos sus pases QR adjuntos.
   - Opción para procesar solo a familias pendientes (`onlyPending: true`) o a la totalidad de inscriptos.
   - Marca automáticamente `emailSent: true` y `emailSentAt: new Date()` en la base de datos al enviar con éxito.
2. **Modal de Envío Masivo (`InfanciasBatchEmailModal.js`)**:
   - Creado modal administrativo interactivo con conteo en vivo de familias, inscriptos y registrados sin email.
   - Muestra el registro de progreso con resultados detallados por familia.
3. **Integración UI en Tabla y Barra Superior (`/admin/infancias/page.js`)**:
   - Botón `✉️ Enviar Mails` en la barra superior.
   - Indicador de estado por fila (`✉️ Mail enviado` / `✉️ Mail pendiente` / `Sin mail`).
4. **Validación y Despliegue**: Compilación `npm run build` 100% exitosa (61/61 rutas) y push a GitHub `main`.

## 2026-08-24 — Sesión 33: Integración de Acciones WhatsApp y Generador de Plantilla de Mensajes (`/admin/infancias`)

### Qué se hizo:
1. **Utilidades de WhatsApp (`src/lib/whatsapp.js`)**:
   - `formatWhatsAppPhone`: Formatea cualquier número argentino/internacional al estándar internacional de WhatsApp (`549XXXXXXXXXX`).
   - `buildWhatsAppMessage`: Genera el mensaje de texto de bienvenida y pase de ingreso con códigos QR y recomendaciones.
   - `getWhatsAppLink`: Construye el enlace directo `https://wa.me/...` con el mensaje precargado.
2. **Acciones Directas en Tabla y Modal de Ticket (`InfanciasTicketModal.js` y `page.js`)**:
   - Botón directo `💬 WhatsApp` para abrir el chat con el tutor.
   - Botón `📋 Copiar Nro` para copiar el teléfono limpio en formato WhatsApp.
   - Botón `📝 Copiar Texto WA` para copiar la plantilla de mensaje personalizada lista para enviar.
3. **Validación y Despliegue**: Compilación `npm run build` 100% exitosa (61/61 rutas) y push a GitHub `main`.

## 2026-08-24 — Sesión 34: Bot de WhatsApp Local, Generador de Imágenes QR y Modal de Vista Previa para "Andar FC"

### Qué se hizo:
1. **Actualización de Ubicación Oficial**:
   - Actualizada la plantilla de texto en `src/lib/whatsapp.js` y `src/lib/email.js` a **"Andar FC (Moreno)"**.
2. **Bot de WhatsApp Local (`scripts/whatsapp-bot.mjs`)**:
   - Conecta a MongoDB, agrupa a los inscriptos por familia y genera los archivos PNG individuales de los pases QR (`output_qrs/QR-INF-XXXXX.png`).
   - Construye el informe de vista previa interactivo `output_qrs/preview.html` para revisar los mensajes y pases familiares.
   - Script ejecutable mediante `npm run bot:whatsapp`.
3. **Modal de Vista Previa de WhatsApp en Panel Admin (`InfanciasWhatsAppModal.js`)**:
   - Permite explorar familia por familia con sus 1, 2 o 3 imágenes de código QR generadas y el texto del mensaje listo para enviar o copiar.
4. **Validación y Despliegue**: Compilación `npm run build` 100% exitosa (61/61 rutas) y push a GitHub `main`.

## 2026-08-24 — Sesión 35: Filtro de Inicio ("Rivero clara agustina"), Delay Aleatorio Anti-Spam e Envíos Automáticos con Baileys

### Qué se hizo:
1. **Filtro Estricto de Inicio de Envío**:
   - `scripts/whatsapp-bot.mjs` y `InfanciasWhatsAppModal.js`: Se implementó el filtrado dinámico para iniciar los envíos a partir de **"Rivero clara agustina"** hacia abajo (19 familias, 24 participantes), omitiendo automáticamente las 7 familias anteriores que ya fueron notificadas manualmente.
2. **Delay Aleatorio Anti-Spam (10s a 22s)**:
   - Se añadió una pausa con delay aleatorio de 10 a 22 segundos entre cada envío familiar en `scripts/whatsapp-bot.mjs` para evitar el bloqueo o tasa límite por parte de WhatsApp.
3. **Automatización con Baileys WhatsApp Socket**:
   - Integrado `@whiskeysockets/baileys` en `scripts/whatsapp-bot.mjs` para escaneo de QR y envío automático directo de texto + imágenes adjuntas PNG del pase QR a cada número de WhatsApp.
4. **Validación y Despliegue**: Compilación `npm run build` 100% exitosa (61/61 rutas) y push a GitHub `main`.

## 2026-08-24 — Sesión 36: Marcado Masivo de Registros como Enviados (`emailSent: true`) en Base de Datos y Visualización en Frontend

### Qué se hizo:
1. **Actualización Masiva en Base de Datos MongoDB Atlas**:
   - Ejecutado script de actualización en MongoDB Atlas marcando los 36 registros inscriptos activos con `emailSent: true` y `emailSentAt: new Date()`.
2. **Visualización en Frontend / Panel Admin (`/admin/infancias`)**:
   - Añadida la 5ta tarjeta métrica KPI `Mails / QRs (36 - 100%)` en el encabezado del panel de administración para reflejar visualmente el 100% de pases enviados.
   - Verificado que cada fila de la tabla y tarjeta móvil muestre la etiqueta verde `✉️ Mail enviado`.
3. **Validación y Despliegue**: Compilación `npm run build` 100% exitosa (61/61 rutas) y push a GitHub `main`.

## 2026-08-24 — Sesión 37: Optimización de Modales (Cierre por Clic Exterior y Ajuste Adaptativo a Pantalla)

### Qué se hizo:
1. **Cierre Automático por Clic en Fondo (Backdrop)**:
   - Se actualizó el contenedor exterior de todos los modales (`InfanciasCreateModal`, `InfanciasEditModal`, `InfanciasTicketModal`, `InfanciasScannerModal`, `InfanciasBatchEmailModal`, `InfanciasWhatsAppModal` y `Media Upload Modal`) agregando `onClick={onClose}` en el backdrop y `onClick={(e) => e.stopPropagation()}` en la tarjeta interior.
2. **Ajuste y Scroll Adaptativo (`max-h-[90vh]` / `max-h-[92vh]`)**:
   - Se aplicó límite de altura `max-h-[90vh]` y scroll vertical con `overflow-y-auto` a todos los contenidos de modales para evitar que sobresalgan de la pantalla en dispositivos móviles y de escritorio.
3. **Validación y Despliegue**: Compilación `npm run build` 100% exitosa (61/61 rutas) y push a GitHub `main`.

## 2026-08-27 — Sesión 38: Galería de Fotos por Evento / Fecha & Carga Masiva (Drag & Drop)

### Qué se hizo:
1. **Modelo de Álbumes (`src/lib/schemas/Album.js`)**:
   - Mongoose Schema para álbumes con `title`, `slug`, `category` (Superliga AFA, Liga BA, Liga Nacional, Escuela, etc.), `eventDate`, `description`, `coverImage`, `driveLink` y array de `photos`.
2. **Endpoints de API (`/api/albums`, `/api/albums/[slug]`, `/api/upload/batch`)**:
   - `GET /api/albums`: Lista álbumes filtrados por categoría.
   - `POST /api/upload/batch`: Endpoint de procesamiento masivo en lote para decenas de imágenes simultáneas (Cloudinary + fallback local).
3. **Carga Masiva Drag & Drop en Panel Admin (`AlbumCreateModal.js` & `/admin/media`)**:
   - Modal interactivo para arrastrar y soltar múltiples fotos juntas, con barra de progreso y vista previa de thumbnails.
4. **Galería Pública Responsiva y Visor Lightbox (`/multimedia/fotos` & `/multimedia/fotos/[slug]`)**:
   - Tarjetas de álbumes por evento con filtros por categoría.
   - Visor pantalla completa (Lightbox) con navegación por teclado/flechas, botón `📥 Descargar Foto` y botón `💬 Compartir por WhatsApp`.
5. **Validación y Despliegue**: Compilación `npm run build` 100% exitosa (63/63 rutas) y push a GitHub `main`.

## 2026-08-27 — Sesión 39: Corrección de Carga de Archivos Múltiples (Superando Límite de Payload Vercel con Chunking Concurrente)

### Qué se hizo:
1. **Problema Detectado**:
   - Al intentar subir 36 fotos (51.1 MB) en una sola petición HTTP (`/api/upload/batch`), Vercel o el servidor rechazaba la petición por exceder el límite de payload (4.5 MB máximo por request), congelando la barra en 30%.
2. **Solución con Pool Concurrente de Subida Individual**:
   - `AlbumCreateModal.js`: Se actualizó el mecanismo para enviar las imágenes de forma individual mediante `POST /api/upload` con un pool de concurrencia de 3 peticiones paralelas.
   - Cada petición pesa 1-2 MB (muy por debajo del límite), evitando errores 413.
   - Se actualizó la barra de progreso en tiempo real con mensaje detallado: *"Subiendo foto X de 36... (X%)"*.
3. **Endpoint `/api/upload` con Fallback Híbrido**:
   - Maneja subidas tanto a Cloudinary como a almacenamiento local seguro.
4. **Validación y Despliegue**: Compilación `npm run build` 100% exitosa (63/63 rutas) y push a GitHub `main`.
