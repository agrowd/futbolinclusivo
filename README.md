# Fútbol Inclusivo - Sitio Web Oficial

Sitio web de la Asociación Civil Andar - Liga de Fútbol Inclusiva. Plataforma completa con sistema de gestión de contenido, inscripciones, reservas de canchas y más.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 16.1.6 (App Router)
- **React**: 19.2.3
- **Estilos**: Tailwind CSS v4
- **Animaciones**: Framer Motion
- **Base de datos**: MongoDB Atlas + Mongoose
- **Autenticación**: NextAuth.js
- **Upload**: Cloudinary
- **Emails**: Resend (configurar)
- **Iconos**: Lucide React
- **Fuente**: Atkinson Hyperlegible

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta de MongoDB Atlas
- Cuenta de Cloudinary (para uploads)

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd futbolinclusivo-org
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Copia `.env.example` a `.env` y completa los valores:

```bash
cp .env.example .env
```

Variables requeridas:
- `MONGODB_URI`: Connection string de MongoDB Atlas
- `NEXTAUTH_SECRET`: Generar con `openssl rand -base64 32`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Tu cloud name de Cloudinary
- `CLOUDINARY_API_KEY`: API key de Cloudinary
- `CLOUDINARY_API_SECRET`: API secret de Cloudinary

4. **Crear usuario administrador**
```bash
npm run db:create-admin
```

5. **Importar datos legacy (opcional)**
```bash
npm run db:import
```

6. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
futbolinclusivo-org/
├── src/
│   ├── app/                    # App Router (páginas y API)
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # NextAuth
│   │   │   ├── news/          # CRUD Noticias
│   │   │   ├── media/         # CRUD Multimedia
│   │   │   ├── pages/         # CRUD Páginas
│   │   │   ├── contacto/      # Formulario contacto
│   │   │   ├── inscripcion/   # Inscripción equipos
│   │   │   ├── reservas/      # Reservas canchas
│   │   │   └── upload/        # Upload Cloudinary
│   │   ├── admin/             # Panel administración
│   │   ├── novedades/         # Blog/Noticias
│   │   ├── multimedia/        # Fotos y videos
│   │   ├── institucional/     # Páginas institucionales
│   │   └── ...
│   ├── components/            # Componentes reutilizables
│   │   ├── layout/           # Header, Footer, etc.
│   │   └── ui/               # Componentes UI
│   └── lib/                   # Utilidades y configuración
│       ├── mongodb.js        # Conexión MongoDB
│       ├── validations.js    # Schemas Zod
│       ├── legacy-content.js # Helper contenido legacy
│       └── schemas/          # Modelos Mongoose
│           ├── News.js
│           ├── Media.js
│           ├── Page.js
│           ├── User.js
│           ├── Team.js
│           ├── Player.js
│           └── Reservation.js
├── public/
│   ├── legacy/               # Contenido migrado
│   │   ├── legacy-content.json
│   │   ├── legacy-assets-map.json
│   │   └── images/
│   └── logo.png
├── scripts/                   # Scripts de utilidad
│   ├── download-legacy-assets.mjs
│   ├── extract-legacy-content.mjs
│   ├── import-legacy-to-db.mjs
│   └── create-admin-user.mjs
└── ...
```

## 🔐 Panel de Administración

Accede a `/admin/login` con las credenciales configuradas en `.env`:

**Funcionalidades:**
- ✅ Gestión de noticias (crear, editar, eliminar)
- ✅ Gestión de multimedia (fotos y videos)
- ✅ Gestión de páginas institucionales
- ✅ Ver inscripciones de equipos
- ✅ Ver reservas de canchas
- 🔄 Gestión de torneos (próximamente)

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor desarrollo

# Producción
npm run build            # Build para producción
npm run start            # Servidor producción

# Base de datos
npm run db:create-admin  # Crear usuario admin
npm run db:import        # Importar datos legacy

# Legacy
npm run legacy:download-assets   # Descargar imágenes sitio viejo
npm run legacy:extract-content   # Extraer contenido sitio viejo

# Linting
npm run lint             # Ejecutar ESLint
```

## 🗄️ Modelos de Base de Datos

### News (Noticias)
- title, slug, excerpt, content
- image, category, author
- published, publishedAt, featured
- tags, views

### Media (Multimedia)
- title, description, type (image/video)
- url, publicId, thumbnailUrl
- category, tags

### Page (Páginas)
- title, slug, content, excerpt
- section, published, order
- metadata (SEO)

### User (Usuarios)
- name, email, password
- role (admin/editor/user)
- active, lastLogin

### Team (Equipos)
- institutionName, contactName/Email/Phone
- league, players[]
- medicalFileUrl, isMedicalClearancePending

### Reservation (Reservas)
- courtId, date, timeSlot
- contactName/Email/Phone
- status

## 🎨 Características del Frontend

- ✅ Diseño responsive (mobile-first)
- ✅ Accesibilidad WCAG AA
- ✅ Animaciones con Framer Motion
- ✅ Dark theme
- ✅ Fuente optimizada para legibilidad
- ✅ SEO optimizado
- ✅ Imágenes optimizadas (Next/Image)

## 🔒 Seguridad

- ✅ Autenticación con NextAuth.js
- ✅ Roles y permisos (admin/editor)
- ✅ Validación con Zod
- ✅ Middleware de protección de rutas
- ✅ Passwords hasheados con bcrypt
- ⚠️ Configurar rate limiting (recomendado)
- ⚠️ Configurar CAPTCHA en formularios (recomendado)

## 🚀 Deploy en Vercel

1. **Conectar repositorio a Vercel**

2. **Configurar variables de entorno** en Vercel Dashboard:
   - Todas las variables de `.env`
   - `NEXTAUTH_URL`: URL de producción

3. **Deploy**
```bash
npm run build  # Verificar build local
```

4. **Post-deploy**:
   - Ejecutar `npm run db:create-admin` en producción
   - Verificar conexión a MongoDB Atlas

## ⚠️ Problemas Conocidos

### Upload de archivos en Vercel
El endpoint `/api/inscripcion` usa Cloudinary para uploads. Asegúrate de configurar las credenciales correctamente.

### Variables de entorno
Nunca commitear `.env` al repositorio. Usar `.env.local` para desarrollo.

## 📚 Próximas Funcionalidades

- [ ] Módulo de torneos (fixture, posiciones, goleadores)
- [ ] Integración Mercado Pago
- [ ] Emails transaccionales (Resend)
- [ ] Panel admin completo (CRUD visual)
- [ ] Rate limiting
- [ ] Analytics
- [ ] Tests E2E

## 🤝 Contribuir

Este es un proyecto de la Asociación Civil Andar. Para contribuir, contacta al equipo de desarrollo.

## 📄 Licencia

© 2024 Asociación Civil Andar - Fútbol Inclusivo

---

**Desarrollado con ❤️ para hacer el fútbol más inclusivo**
