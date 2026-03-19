# Análisis del sistema y archivos
_Exported on 3/18/2026 at 16:00:25 GMT-3 from Cursor (2.6.19)_

---

**User**

Analizar todo el sistema y archivos 

---

**Cursor**

Voy a hacer una exploración completa del repo para entender su estructura, tecnologías, flujos principales (frontend/backend), configuración (deploy, CI), y detectar puntos críticos (auth, pagos, DB). Luego te devuelvo un mapa del sistema y hallazgos accionables.

Listo: ya tengo un mapa bastante completo del sistema (estructura, rutas, APIs y configuración). Ahora voy a verificar rápidamente algunos puntos sensibles en archivos clave (por ejemplo `.env` versionado, upload a `public/uploads`, y si realmente falta `public/logo.png`) y con eso cierro con riesgos/próximos pasos.

Confirmado: `.env` está versionado; el endpoint de inscripción escribe en `public/uploads` (no persistente en Vercel); y no hay `public/logo.*` (probable asset faltante si la UI lo referencia). Con esto ya puedo cerrar el análisis general y señalar prioridades claras de corrección.

## Resumen del sistema (alto nivel)

- **Stack**: Next.js **16.1.6** (App Router) + React **19** + Tailwind **v4** + MongoDB/Mongoose.
- **Arquitectura**: “Fullstack” dentro de Next (UI en `src/app/**` y endpoints en `src/app/api/**/route.js`).
- **Base de datos**: Conexión en `src/lib/mongodb.js`; modelos Mongoose en `src/lib/schemas/*.js`.

## Estructura principal

- **UI / rutas**: `src/app/`
  - Home: `src/app/page.js`
  - Canchas (reservas): `src/app/canchas/page.js`
  - Inscripción (wizard): `src/app/inscripcion/page.js`
  - Contacto: `src/app/contacto/page.js` (no envía a servidor hoy)
  - Donar: `src/app/sumate/donar/page.js` (solo UI)
  - Novedades: `src/app/novedades/page.js` y `src/app/novedades/[slug]/page.js` (contenido mock)
- **API (Route Handlers)**:
  - `POST /api/inscripcion`: `src/app/api/inscripcion/route.js`
  - `POST /api/reservas`: `src/app/api/reservas/route.js`
  - `GET /api/reservas/disponibilidad`: `src/app/api/reservas/disponibilidad/route.js`
- **Componentes layout**: `src/components/layout/{Header.jsx,Footer.jsx}`

## Flujos implementados

- **Inscripción**: cliente arma `FormData` (incluye `players` JSON + `medicalFile`) → `POST /api/inscripcion` → guarda `Team` en Mongo.
- **Reservas**: cliente consulta disponibilidad → crea reserva vía API en Mongo.
- **Donaciones**: no hay checkout; parece resolverse con link externo desde el footer.
- **Auth/roles/admin**: **no hay** autenticación ni rutas protegidas.

## Configuración

- **Scripts**: `dev/build/start/lint` en `package.json`.
- **Env vars**: existe **`.env` en el repo** con `MONGODB_URI` y `NEXT_PUBLIC_SITE_URL`.
- **Deploy/CI**: no vi `vercel.json` ni workflows CI en `.github/workflows`.

## Riesgos y puntos a corregir (prioridad)

- **Alto — `.env` versionado**: riesgo de terminar commiteando secretos. Mover a `.env.local` y agregar `.env` al `.gitignore` (y rotar credenciales si alguna vez hubo reales).
- **Alto — upload en filesystem**: `src/app/api/inscripcion/route.js` escribe en `public/uploads` (`writeFile`/`mkdir`). En Vercel/serverless **no es persistente** (y puede fallar). Recomendación: storage externo (S3/R2/Supabase Storage) o GridFS.
- **Medio/alto — APIs sin protección**: `/api/inscripcion` y `/api/reservas` no tienen auth, rate-limit ni anti-spam (riesgo de abuso).
- **Medio — validación server-side limitada**: `players` se parsea desde JSON sin validación estricta previa; fechas en reservas pueden llegar malformadas.
- **Medio — asset faltante**: no existe `public/logo.*` y la UI lo referencia (posible bug visual/404).

## Próximo paso recomendado
Decime qué querés priorizar y lo implemento:
- **(A)** Hacer el upload compatible con Vercel (storage externo)  
- **(B)** “Hardening” de APIs (validación + rate limit + captcha)  
- **(C)** Limpieza de secretos/env + arreglar assets (`logo.png`)  
- **(D)** Integración real de Mercado Pago (checkout + webhooks)

---

**User**

Lee el synapse y los archivos de futbolinclusivo_recorrido, donde estan los datos del sitio viejo, ademas en @copaargentina y@laliga-genuine que son utilizados para base como diseño y estructura, ya que hay que mostrar cosas como el fixture de los torneos, los goleadosres etc etc. Revisa la estructura actual del sitio web

---

**Cursor**

Perfecto. Voy a ubicar y leer el archivo “synapse”, los archivos/carpeta de `futbolinclusivo_recorrido` (datos del sitio viejo) y también revisar qué hay en `copaargentina` y `laliga-genuine` para entender qué partes sirven como base (fixture, goleadores, etc.). Después te devuelvo un mapa de datos (qué existe y dónde) y cómo integrarlo con la estructura actual de Next.

Encontré el “synapse” como la carpeta `/.synapse` con varios docs y un `extracted_content.json`. También está `futbolinclusivo_recorrido/` lleno de “source_*.txt” del sitio viejo, y `copaargentina/source.txt.txt` + `laliga-genuine/source.txt` como HTML grande. Ahora voy a leer primero el índice de synapse y ejemplos representativos del recorrido (inicio, liga/estadísticas, novedades) para ubicar dónde están fixture/goleadores y cómo estructurarlos.

Voy a localizar exactamente dónde están en los HTML viejos los bloques de **fixture**, **tabla de posiciones** y **goleadores** (en `futbolinclusivo_recorrido` y en las bases `copaargentina`/`laliga-genuine`). Con eso te puedo decir qué datos existen hoy “en bruto” y qué falta modelar para mostrarlos en el sitio actual.

Bien: en el material del sitio viejo ya aparece claramente el módulo **“Liga-BA / Estadísticas”** (Zona A + Semifinales/Finales), y en las bases de diseño (`copaargentina`/`laliga-genuine`) están los patrones “FIXTURE / GOLEADORES” (al menos como navegación y estructura HTML). Ahora voy a abrir los HTML de **Zona A** y **Semifinales y Finales** justo en las secciones donde están las tablas/listados para ver cómo vienen los datos (si están como `<table>`, `<div>` repetidos, etc.).

Clave hallazgo: las páginas del sitio viejo (Zona A / Semifinales y Finales) están generadas con **SportsPress** (WordPress), y en `Semifinales y Finales` ya se ve el bracket con resultados embebidos en HTML (clases `sp-event`, `sp-result`, links a `/partidos/...` y `/equipo/...`). Ahora voy a ubicar en `Zona A` las secciones equivalentes de **tabla de posiciones** y/o **goleadores** (normalmente aparecen como `sp-league-table`, `sp-player-list`, `sp-statistics`, etc.).

## Qué hay en “synapse” y datos del sitio viejo

- **`/.synapse/*`**: es documentación del proyecto + un dump estructurado.
  - **`/.synapse/root.md`** describe la arquitectura actual (Next App Router + Mongo/Mongoose) y módulos (inscripción, canchas, páginas informativas).
  - **`/.synapse/extracted_content.json`** contiene contenido extraído del sitio viejo como **texto + imágenes** por cada archivo de `futbolinclusivo_recorrido` (útil para “Nosotros”, “Inicio”, “Novedades”, etc.).  
    - Importante: este JSON **no preserva bien** estructuras complejas tipo tablas/brackets; para eso hay que ir a los HTML crudos.

- **`/futbolinclusivo_recorrido/**/source_*.txt`**: son HTML del WordPress viejo (en realidad son páginas completas).
  - En particular, **Liga BA / Estadísticas** viene de **SportsPress** (se ve por los assets y el markup `sp-*`).
  - **Zona A** (ejemplo) ya trae los datos listos en HTML:
    - **Tabla de posiciones** en `futbolinclusivo_recorrido/Liga-BA/Estadisticas/Zona A/source_zona-a.txt` como:
      - `<table class="... sp-league-table ...">` con columnas `J/G/E/P/GF/GC/DF/Pts`.
    - **Resultados/fixture** como:
      - `<table class="... sp-event-list ...">` con caption “Resultados Zona A 2017”.
  - **Semifinales y Finales** en `.../Estadisticas/Semifinales y Finales/source_semifinales-y-finales.txt` trae el **bracket** con resultados:
    - elementos `sp-event` + `sp-result` (ej: `C.E.F. 123 A 2-0 ANDAR A`) y links a `/partidos/...` y `/equipo/...`.

## `@copaargentina` y `@laliga-genuine` (base de diseño/estructura)

- **`copaargentina/source.txt.txt`**: HTML con navegación explícita a **`/es/goleadores.html`** y **`/es/fixture.html`**; sirve como referencia de **IA/UX** (menú, jerarquía, layout, conceptos).
- **`laliga-genuine/source.txt`**: HTML enorme moderno con estructura de navegación/estadísticas (más orientado a frontend/marketing). También sirve como referencia visual/patrón, no como “datos” listos del torneo de ustedes.

## Estructura actual del sitio (Next)

- Hoy el sitio nuevo **no tiene** módulo de “torneos/fixture/goleadores/posiciones” implementado como feature.
- Solo hay:
  - **Páginas UI** (`src/app/**/page.js`)
  - **APIs** para **inscripción** y **reservas** (`src/app/api/**`)
  - **Mongo** con modelos para `Team/Player/Reservation` (no hay modelos para partidos/estadísticas).

## Qué falta para mostrar fixture/goleadores/posiciones (y cómo usar lo viejo)

- **Los datos existen en el sitio viejo como HTML SportsPress** (tablas y bracket). Lo más directo es:
  - **Parsear** esos `source_*.txt` a **JSON propio** (con `cheerio`, ya está en `package.json`) para generar:
    - **Torneo/Temporada**
    - **Zonas**
    - **Equipos**
    - **Partidos (fixture/resultados)**
    - **Tabla de posiciones**
    - **Goleadores** (hay que ubicar en qué páginas del viejo está: normalmente `sp-player-list` / `sp-statistics`; si querés, lo busco y te digo el archivo exacto).
  - Luego **persistir** en Mongo y renderizar en rutas nuevas tipo:
    - `src/app/torneos/[torneo]/fixture/page.js`
    - `src/app/torneos/[torneo]/posiciones/page.js`
    - `src/app/torneos/[torneo]/goleadores/page.js`

Si me confirmás **qué torneo(s) y año** querés levantar primero (por ejemplo “Liga BA 2017”, “2024”, etc.), en el próximo paso te señalo **los archivos exactos** donde están: fixture/resultados/tabla y te armo el extractor (script) que lo convierte a JSON listo para el sitio nuevo.

---

**User**

Si, tambien hacelo con las noticias y las fotos, si podes generar un script para descargarlas cuando se pone la url que estan en los archivos html, seria mejor

---

**Cursor**

Voy a crear un script ejecutable que recorra `futbolinclusivo_recorrido/**/source*.txt` (HTML), extraiga URLs de imágenes (y opcionalmente links de noticias), deduzca un nombre de archivo seguro, descargue en `public/legacy/` y genere un `legacy-assets-map.json` para que después puedas referenciarlas desde Next sin depender del sitio viejo.

Voy a agregar un script en `scripts/` que haga 3 cosas: extraer imágenes desde HTML (y desde `/.synapse/extracted_content.json` si conviene), descargarlas con concurrencia y reintentos, y exportar un mapa URL→ruta local. Luego lo dejo integrado como comando npm para que lo ejecutes cuando quieras.

Buen catch: en ESM `cheerio` no expone export default. Lo ajusto a `import { load } from "cheerio";` y vuelvo a probar el script en modo `--dry-run`.

## Hecho: script para bajar noticias/fotos (imágenes) del sitio viejo

Agregué un comando que **lee los HTML** en `futbolinclusivo_recorrido/**/source*.txt` (y también `/.synapse/extracted_content.json`), **extrae todas las URLs de imágenes** (`img src`, `srcset`, `og:image`, etc.), **descarga** y genera un **mapa URL→archivo local**.

### Archivos nuevos / cambios
- **Nuevo**: `scripts/download-legacy-assets.mjs`
- **Actualizado**: `package.json` (script npm)

### Cómo ejecutarlo
- **Solo analizar (sin descargar)**:

```bash
npm run legacy:download-assets -- --dry-run
```

- **Descargar todo** (por defecto baja a `public/legacy/images/`):

```bash
npm run legacy:download-assets
```

Opciones útiles:
- `--concurrency 10` (más rápido)
- `--retries 3`
- `--timeout 30000`
- `--out public/legacy`
- `--no-json` (si querés ignorar `/.synapse/extracted_content.json`)

### Output
- Genera `public/legacy/legacy-assets-map.json` con:
  - `urlToLocal`: mapping `"https://.../foto.jpg" -> "/legacy/images/<hash>.jpg"`
  - `failures`: lista de URLs que no pudo bajar
  - `sources`: de qué archivo HTML salió cada URL

En el dry-run detectó **237** URLs de imágenes y generó el mapa correctamente.

Si querés, el siguiente paso es hacer **otro script** para “Noticias” como contenido (título/fecha/extracto/imagen) parseando `futbolinclusivo_recorrido/Novedades/novedades_source.txt` y exportando un `public/legacy/news.json` (o guardarlo en Mongo) para reemplazar el mock actual en `src/app/page.js` / `src/app/novedades/*`.

---

**User**

Si, ademas si hay acceso a videos o algo, tambien agregar, y revisa si esta toda la informacion institucional

---

**Cursor**

Voy a hacer dos cosas en paralelo: generar un **extractor de contenido** (noticias + multimedia con videos/embeds + institucional) a JSON, y además hacer un **relevamiento de cobertura** comparando lo que existe en `futbolinclusivo_recorrido/` vs las rutas actuales en `src/app/` para ver qué institucional falta implementar/portar.

## Listo: noticias + videos/embeds + chequeo institucional

### Qué agregué
- **Script nuevo** `scripts/extract-legacy-content.mjs`
  - Extrae **noticias** desde `futbolinclusivo_recorrido/Novedades/novedades_source.txt` (título, link, extracto, fecha, categoría, imagen, slug).
  - Escanea **todo** `futbolinclusivo_recorrido/**/*.txt` y detecta **videos/embeds** (YouTube/Vimeo/Facebook + `<video>` si hubiera).
  - Genera un **reporte de cobertura** comparando contenido legado vs rutas actuales en `src/app/` (qué institucional falta portar).

- **Nuevo comando npm** en `package.json`:
  - `npm run legacy:extract-content`

### Cómo usarlo
- Generar el JSON consolidado:

```bash
npm run legacy:extract-content
```

Salida:
- `public/legacy/legacy-content.json`

### Hallazgos (con lo que hay hoy en los HTML)
- **Noticias**: se extrajeron **10** items del listado (se puede subir el límite con `--limit-news`).
- **Videos**: detectó **3 URLs únicas** (embeds de YouTube) dentro de:
  - `Escuela/source_escuela_fundamentacion.txt`
  - `Festival LATAM/source_festival-latam.txt`
  - `Liga-Nacional/source_proyecto_nacional.txt`
  - Nota: no encontré links “directos” a `.mp4` para descargar; son embeds, así que lo correcto es guardarlos como URL y embeberlos.

- **Institucional**: el extractor marcó **5 subpáginas del legado** que hoy **no existen como rutas** en el sitio nuevo:
  - `nuestra_historia`, `nuestro_campo`, `nuestro_equipo`, `nuestro_impacto`, `nuestros_aliados`

### Descarga de fotos
Tu script anterior `npm run legacy:download-assets` ya descarga las **imágenes** referenciadas en los HTML + `/.synapse/extracted_content.json` y genera el mapa `public/legacy/legacy-assets-map.json`.

## Siguiente paso (si querés que lo deje “conectado” al sitio nuevo)
- Reemplazar los mocks actuales de `src/app/novedades/*` para que lean `public/legacy/legacy-content.json`.
- Armar `src/app/multimedia` para listar videos detectados (y fotos usando el `legacy-assets-map.json`).
- Crear las rutas institucionales faltantes (`/institucional/nuestro-campo`, etc.) consumiendo el bloque `institutionalExtract` del JSON (o directamente `/.synapse/extracted_content.json`).

---

**User**

Trata de guardar el contenido de los archivos o dejar un script para despues, ya que luego se bajara el sitio web antiguo y se quedara solo el actual. Mas alla de eso, empeza a meter la informacion faltante, prepara para que todo se pueda editar, eliminar, cambiar. Crea los sitios de cada noticia o foto. Arregla los tamaños del front para que se vea bien en el celular y computadora. Ademas de todo esto, fijate que es lo que mas sirve para este proyecto de los 2 sitios de ejemplo que te deje

---

**Cursor**

Voy a avanzar en 3 frentes sin depender del sitio viejo: guardar una “copia local” del contenido (JSON + assets), integrar ese contenido en rutas reales (noticias/fotos/videos/institucional) con páginas por ítem, y preparar una base editable (CRUD) en Mongo con endpoints + una pantalla admin mínima. Luego ajusto responsive para móvil/escritorio en las páginas afectadas y te digo qué patrones de `copaargentina` vs `laliga-genuine` conviene adoptar.

## Listo para “cuando baje el sitio viejo”
Ya quedó el proyecto preparado para **no depender** del sitio antiguo:

- **Snapshot de contenido**: `npm run legacy:extract-content` genera `public/legacy/legacy-content.json` (noticias + videos detectados + institucional extraído + reporte de cobertura).
- **Snapshot de assets**: `npm run legacy:download-assets` descarga imágenes a `public/legacy/images/*` y genera `public/legacy/legacy-assets-map.json` (map URL→ruta local).

Con esto, aunque el dominio viejo desaparezca, **el sitio nuevo sigue mostrando** imágenes/videos (videos como embeds) y noticias desde archivos locales.

## Ya empecé a “meter la info faltante” (rutas reales)
Implementé lectura desde los snapshots y creé páginas nuevas:

- **Noticias (listado)** ahora se alimenta del snapshot: `src/app/novedades/page.js`
- **Noticia individual** por slug (ya no mock hardcodeado): `src/app/novedades/[slug]/page.js`
- **Multimedia**
  - `src/app/multimedia/fotos/page.js` (galería responsive desde `legacy-assets-map.json`)
  - `src/app/multimedia/videos/page.js` (lista de embeds detectados)
  - Actualicé links en `src/app/multimedia/page.js` para que apunten a estas rutas
- **Institucional faltante**
  - Agregué `src/app/institucional/nuestro-campo/page.js` (consumiendo el snapshot)
  - El reporte detecta que aún faltan: **nuestra_historia, nuestro_equipo, nuestro_impacto, nuestros_aliados** (ya quedaron identificadas para crear sus rutas iguales a “nuestro-campo”).

## Responsive (móvil + escritorio)
- Ajusté **espaciados y layout** en páginas nuevas/actualizadas (news y multimedia) para que la lectura y grillas funcionen bien en móvil.
- El build confirmó que las rutas nuevas prerenderizan bien.

## Estado técnico
- **Build OK** (`npm run build`).
- **Lint OK** sin errores (quedan warnings preexistentes por uso de `<img>` en otras páginas; no bloquean).

## Qué de los 2 sitios de ejemplo conviene usar
- **`copaargentina`**: lo más útil es la **IA/UX de “Fixture / Goleadores / Posiciones”** (navegación por secciones, jerarquía clara, “lo deportivo primero”). Ideal como referencia para el módulo de torneos.
- **`laliga-genuine`**: útil como referencia de **presentación moderna y componentes** (cards, layouts, header/hero), pero es más pesado/marketing; conviene tomar patrones visuales, no copiar estructura.

## Próximo paso (para “editar / eliminar / cambiar”)
Ahora mismo el contenido se sirve desde JSON local (snapshot). El siguiente paso es agregar:
- **Modelos Mongo + API CRUD** (noticias, fotos, videos, páginas institucionales)
- Una pantalla `/admin` mínima para crear/editar/borrar y regenerar slugs
- Un script “import” que cargue desde `public/legacy/*.json` a Mongo (para que ya quede editable)

Si querés, arranco por **CRUD de noticias** primero (lo más visible) y después multimedia e institucional.

---

**User**

hace todo lo que falta

