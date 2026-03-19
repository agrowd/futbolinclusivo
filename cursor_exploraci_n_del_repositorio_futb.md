# Exploración del repositorio futbolinclusivo-org
_Exported on 3/18/2026 at 15:05:30 GMT-3 from Cursor (2.5.20)_

---

**User**

Explora el repositorio en c:/Users/Try Hard/Desktop/Nexte/futbolinclusivo-org para entender todo el sistema. Devuelve: 1) árbol de alto nivel (carpetas principales y propósito), 2) tecnologías (Next/React/etc, backend si existe, ORM/DB, auth, Mercado Pago, Vercel), 3) rutas/entrypoints importantes (pages/app, api routes, server actions), 4) configuración (package.json scripts, env vars esperadas, vercel.json, CI), 5) flujos clave (login/roles, pagos/checkout, formularios/contacto, admin), 6) riesgos/olores (secretos en repo, validación, SSR/CSR, dependencias), 7) archivos más importantes con rutas exactas para lectura posterior. Sé 'medium' de exhaustividad: suficiente para cubrirlo todo sin listar cada archivo.

---

**Cursor**

Voy a hacer un barrido del repo para identificar estructura (carpetas), stack (Next/React, backend, auth, pagos), entrypoints/rutas y configuración (scripts, env, Vercel/CI). Luego leeré los archivos clave (package.json, next config, rutas API/app) para reconstruir los flujos principales y señalar riesgos.

Ya encontré que el proyecto usa **Next.js con App Router** (`src/app/.../page.js`) y que hay un `.env` en el repo (potencial riesgo de secretos). Ahora voy a leer `package.json`, `next.config.mjs`, `.env` y las rutas clave (home, donar, contacto, inscripción) para mapear stack, entrypoints y flujos.

Perfecto: ya tenemos **Next 16.1.6 + React 19**, Tailwind v4, y además aparece **MongoDB/Mongoose** (hay `MONGODB_URI` y `mongoose` + esquemas). Ahora voy a leer `src/app/layout.js`, los handlers de `src/app/api/**/route.js`, la conexión Mongo y las páginas de formularios/donación para reconstruir flujos (reservas, inscripción, contacto, donaciones) y detectar riesgos (secrets, validación, SSR/CSR).

### 1) Árbol de alto nivel (carpetas principales y propósito)

- **`c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\app\`**: UI principal con **App Router** (rutas públicas) y **API Routes** bajo `src/app/api/**/route.js`.
- **`c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\components\`**: componentes de layout/UI (Header/Footer, etc.).
- **`c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\lib\`**: infraestructura de backend “ligero” (MongoDB) y **modelos Mongoose**.
- **`c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\public\`**: assets estáticos (svg + `gallery.html`). Se referencia `logo.png` desde UI, pero no lo vi en `public/` (posible faltante).
- **`c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\copaargentina\`** y **`...\laliga-genuine\`**: archivos `source.txt*` enormes con HTML (parecen “fuentes” scrapeadas / material de referencia, no integración directa).

---

### 2) Tecnologías detectadas (frontend/backend/DB/auth/pagos/Vercel)

- **Framework**: **Next.js 16.1.6** (App Router). Ver `package.json`.
- **UI**: **React 19.2.3**, `framer-motion`, `lucide-react`.
- **CSS**: **Tailwind v4** vía PostCSS (sin `tailwind.config.*`).
  - PostCSS: `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\postcss.config.mjs`
  - Global CSS: `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\app\globals.css` (usa `@import "tailwindcss";` y tokens con `@theme inline`).
- **Backend**: no hay backend separado; hay **API routes** dentro de Next (`src/app/api/...`).
- **DB/ORM**: **MongoDB + Mongoose**.
  - Conexión: `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\lib\mongodb.js`
  - Modelos: `src/lib/schemas/{Team,Reservation,Player}.js`
- **Auth / Roles**: **no encontré NextAuth ni middleware**; no hay roles/admin implementados en el código revisado.
- **Mercado Pago**: no hay SDK ni endpoints de pago; solo mención en UI en `src/app/sumate/donar/page.js` (y en el footer la donación real parece ir a un link externo).
- **Vercel**: no vi `vercel.json` ni workflows de CI; el README es el template estándar.

---

### 3) Rutas / entrypoints importantes (App Router, API Routes, server actions)

**App Router (páginas):** bajo `src/app/**/page.js`, por ejemplo:
- Home: `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\app\page.js`
- Layout raíz: `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\app\layout.js`
- Contacto (form client-only): `...\src\app\contacto\page.js`
- Inscripción (wizard + upload): `...\src\app\inscripcion\page.js`
- Canchas / reservas: `...\src\app\canchas\page.js`
- Donar: `...\src\app\sumate\donar\page.js`
- Novedades listado: `...\src\app\novedades\page.js`
- Novedades detalle: `...\src\app\novedades\[slug]\page.js` (usa `notFound()` y contenido mock local)

**API Routes (Route Handlers):**
- Inscripción (POST multipart/form-data):  
  `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\app\api\inscripcion\route.js`
- Reservas (POST JSON):  
  `...\src\app\api\reservas\route.js`
- Disponibilidad de reservas (GET con query params):  
  `...\src\app\api\reservas\disponibilidad\route.js`

**Server Actions:** no encontré señales de `"use server"` / actions.

---

### 4) Configuración (scripts, env vars esperadas, Vercel/CI)

**Scripts (`package.json`):**
- `dev`: `next dev`
- `build`: `next build`
- `start`: `next start`
- `lint`: `eslint`

**Env vars (vistas en repo):**
- Hay un **`.env` en el repo**: `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\.env`
  - `MONGODB_URI=mongodb://localhost:27017/futbolinclusivo`
  - `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- El código de DB además sugiere `MONGODB_URI` en “`.env.local`” (mensaje de error), pero el repo tiene `.env`.

**Next config:**
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\next.config.mjs` solo configura `images.remotePatterns`.

**Vercel/CI:**
- No vi `vercel.json`.
- No vi `.github/workflows/*`.

---

### 5) Flujos clave (login/roles, pagos/checkout, formularios/contacto, admin)

- **Login / roles / admin**
  - **No implementado** en lo encontrado: sin auth middleware, sin rutas protegidas, sin panel admin.

- **Pagos / checkout**
  - `src/app/sumate/donar/page.js` es **UI** (botones de monto) pero **no hace checkout** ni llama a API.
  - El footer tiene un link externo de donación (DonarOnline), sugiriendo que el “pago real” hoy se resuelve fuera del sitio: `src/components/layout/Footer.jsx`.

- **Formulario “Contacto”**
  - `src/app/contacto/page.js` valida en cliente y muestra “éxito”, pero explícitamente dice que en producción debería enviarse a una API (**no envía nada al servidor** actualmente).

- **Inscripción**
  - UI (cliente): `src/app/inscripcion/page.js` arma un `FormData` con `players` + `medicalFile`, y postea a `/api/inscripcion`.
  - API (servidor): `src/app/api/inscripcion/route.js`:
    - Conecta a Mongo.
    - Parsea `formData`, crea un `Team` en Mongo.
    - Si hay archivo médico, intenta guardarlo en `public/uploads` y persistir URL `/uploads/...`.

- **Reservas de canchas**
  - UI (cliente): `src/app/canchas/page.js`:
    - Consulta disponibilidad a `/api/reservas/disponibilidad?courtId=...&date=...`
    - Confirma reserva POST a `/api/reservas`.
  - API: `src/app/api/reservas/route.js` crea `Reservation` y previene overbooking con índice único (y check previo).
  - API disponibilidad: `src/app/api/reservas/disponibilidad/route.js` filtra reservas confirmadas por fecha o mes.

---

### 6) Riesgos / olores (secrets, validación, SSR/CSR, dependencias, despliegue)

- **Secretos en repo (alto)**: hay **`.\.env`** versionado. Aunque hoy tenga valores locales, es una mala práctica y suele terminar con secretos reales.
- **Incompatibilidad con Vercel (alto)**: `api/inscripcion` intenta `writeFile` a `public/uploads` en runtime. En despliegues tipo **serverless (Vercel)** el filesystem es **efímero/solo lectura** o no persistente → las subidas se perderían o fallarían. Esto debería ir a storage externo (S3/R2/Supabase Storage, etc.) o a Mongo GridFS.
- **APIs sin auth / sin rate-limit (medio-alto)**: cualquiera puede POSTear reservas/inscripciones; no hay captcha, throttle, ni protección anti-spam.
- **Validación server-side limitada (medio)**:
  - Inscripción: `players` se parsea desde JSON sin validación estricta (más allá de Mongoose). Riesgo de payload grande o formatos raros.
  - Reservas: confía en `new Date(date)`; si el cliente manda strings inválidas, pueden colarse valores “Invalid Date” o inconsistencias.
- **Mercado Pago “solo UI” (medio)**: la UI promete “pago seguro” pero no hay integración técnica; riesgo de expectativa/UX.
- **Contenido mock (bajo-medio)**: `novedades/[slug]` tiene una “DB local mockeada”; no hay CMS ni fetch real.
- **Assets faltantes (medio)**: `Header/Footer` referencian `"/logo.png"`; no lo vi en `public/` (podría romper en runtime si realmente no está).

---

### 7) Archivos más importantes (rutas exactas para leer después)

**Core app / layout**
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\app\layout.js`
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\app\globals.css`

**Rutas UI clave**
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\app\page.js`
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\app\canchas\page.js`
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\app\inscripcion\page.js`
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\app\contacto\page.js`
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\app\sumate\donar\page.js`
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\app\novedades\page.js`
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\app\novedades\[slug]\page.js`

**API / backend**
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\app\api\inscripcion\route.js`
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\app\api\reservas\route.js`
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\app\api\reservas\disponibilidad\route.js`
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\lib\mongodb.js`
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\lib\schemas\Team.js`
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\lib\schemas\Reservation.js`
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\lib\schemas\Player.js`

**Layout components**
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\components\layout\Header.jsx`
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\src\components\layout\Footer.jsx`

**Config**
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\package.json`
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\next.config.mjs`
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\postcss.config.mjs`
- `c:\Users\Try Hard\Desktop\Nexte\futbolinclusivo-org\.env` (ojo: riesgo)

Si querés, en el próximo paso te armo un “mapa de endpoints” (request/response esperado) para `inscripcion` y `reservas`, y un checklist de cambios mínimos para que funcione bien en Vercel (especialmente el upload de ficha médica).

