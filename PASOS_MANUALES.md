# 📝 Pasos Manuales - Configuración Final

Este documento lista **TODOS los pasos que necesitas hacer manualmente** para completar la configuración del sistema.

---

## 🔴 PASO 1: Configurar MongoDB Atlas (OBLIGATORIO)

### 1.1 Crear cuenta y cluster
1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea una cuenta gratuita
3. Crea un nuevo cluster (Free tier M0 es suficiente)
4. Espera 3-5 minutos a que se cree el cluster

### 1.2 Configurar acceso
1. En "Database Access":
   - Click "Add New Database User"
   - Username: `futbolinclusivo` (o el que prefieras)
   - Password: Genera una contraseña segura (guárdala)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

2. En "Network Access":
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

### 1.3 Obtener connection string
1. En "Database" → Click "Connect" en tu cluster
2. Selecciona "Connect your application"
3. Driver: Node.js, Version: 5.5 or later
4. Copia el connection string, se verá así:
   ```
   mongodb+srv://futbolinclusivo:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Reemplaza `<password>` con tu contraseña real
6. Agrega el nombre de la base de datos después del `/`:
   ```
   mongodb+srv://futbolinclusivo:TU_PASSWORD@cluster0.xxxxx.mongodb.net/futbolinclusivo?retryWrites=true&w=majority
   ```

### 1.4 Actualizar .env
Abre el archivo `.env` y pega tu connection string:
```bash
MONGODB_URI=mongodb+srv://futbolinclusivo:TU_PASSWORD@cluster0.xxxxx.mongodb.net/futbolinclusivo?retryWrites=true&w=majority
```

---

## 🔴 PASO 2: Configurar Cloudinary (OBLIGATORIO)

### 2.1 Crear cuenta
1. Ve a https://cloudinary.com/
2. Crea una cuenta gratuita (Free tier: 25 GB storage, 25 GB bandwidth/mes)

### 2.2 Obtener credenciales
1. En el Dashboard, verás:
   - **Cloud Name**: `dxxxxxx` (copia esto)
   - **API Key**: `123456789012345` (copia esto)
   - **API Secret**: Click "Reveal" y copia

### 2.3 Actualizar .env
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret
```

---

## 🔴 PASO 3: Generar NEXTAUTH_SECRET (OBLIGATORIO)

### Opción A: Con OpenSSL (Windows/Mac/Linux)
```bash
openssl rand -base64 32
```

### Opción B: Online
1. Ve a https://generate-secret.vercel.app/32
2. Copia el secret generado

### Actualizar .env
```bash
NEXTAUTH_SECRET=el-secret-que-generaste-aqui
```

---

## 🔴 PASO 4: Instalar Dependencias y Setup Inicial

```bash
# 1. Instalar todas las dependencias
npm install

# 2. Crear usuario administrador
npm run db:create-admin

# 3. (Opcional) Importar datos legacy
npm run db:import

# 4. Iniciar servidor de desarrollo
npm run dev
```

**Credenciales de admin por defecto:**
- Email: `admin@futbolinclusivo.org.ar`
- Password: `changeme123`

⚠️ **IMPORTANTE:** Cambia la contraseña después del primer login en `/admin/login`

---

## 🟡 PASO 5: Verificar que Todo Funciona

### 5.1 Abrir el sitio
```
http://localhost:3000
```

### 5.2 Probar páginas principales
- ✅ Home: http://localhost:3000
- ✅ Novedades (legacy): http://localhost:3000/novedades
- ✅ Novedades (MongoDB): http://localhost:3000/novedades-db
- ✅ Multimedia: http://localhost:3000/multimedia
- ✅ Contacto: http://localhost:3000/contacto
- ✅ Inscripción: http://localhost:3000/inscripcion

### 5.3 Probar panel admin
1. Ve a http://localhost:3000/admin/login
2. Login con las credenciales por defecto
3. Deberías ver el dashboard
4. Prueba crear una noticia en `/admin/news/new`
5. Sube una imagen de prueba
6. Publica la noticia
7. Ve a `/novedades-db` para verla

---

## 🟢 PASO 6: Cambiar Contraseña del Admin (RECOMENDADO)

Actualmente no hay UI para cambiar contraseña. Opciones:

### Opción A: Ejecutar script nuevamente
```bash
# Edita .env y cambia ADMIN_PASSWORD
ADMIN_PASSWORD=tu-nueva-password-segura

# Ejecuta el script
npm run db:create-admin
```

### Opción B: Crear nuevo usuario admin
1. Ve a MongoDB Atlas → Collections
2. Busca la colección `users`
3. Edita el documento del admin
4. Cambia el campo `password` (debe estar hasheado con bcrypt)

---

## 🟢 PASO 7: Migrar de Novedades Legacy a MongoDB (OPCIONAL)

Actualmente tienes **DOS** páginas de novedades:

1. **`/novedades`** - Lee del JSON legacy (`public/legacy/legacy-content.json`)
2. **`/novedades-db`** - Lee de MongoDB (API `/api/news`)

### Para migrar completamente:

**Opción 1: Reemplazar la ruta**
1. Renombra `src/app/novedades/page.js` a `src/app/novedades-legacy/page.js`
2. Renombra `src/app/novedades-db/page.js` a `src/app/novedades/page.js`

**Opción 2: Importar noticias legacy a MongoDB**
El script `npm run db:import` ya importa las noticias del JSON a MongoDB.

---

## 🟢 PASO 8: Configurar Resend para Emails (OPCIONAL)

Si quieres que el formulario de contacto envíe emails reales:

### 8.1 Crear cuenta Resend
1. Ve a https://resend.com/
2. Crea una cuenta (Free tier: 100 emails/día)
3. Verifica tu dominio o usa el dominio de prueba

### 8.2 Obtener API Key
1. En Dashboard → API Keys
2. Crea una nueva API Key
3. Copia la key

### 8.3 Actualizar .env
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@futbolinclusivo.org.ar
```

### 8.4 Actualizar API de contacto
Edita `src/app/api/contacto/route.js` y agrega el código para enviar email con Resend.

---

## 🟢 PASO 9: Deploy a Vercel (CUANDO ESTÉS LISTO)

### 9.1 Preparar repositorio
```bash
# Asegúrate de que .env NO esté en Git
git status

# Si .env aparece, agrégalo a .gitignore
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Ignore .env"
```

### 9.2 Conectar a Vercel
1. Ve a https://vercel.com/
2. Importa tu repositorio
3. En "Environment Variables", agrega TODAS las variables de `.env`:
   - `MONGODB_URI`
   - `NEXTAUTH_URL` (cambia a tu URL de producción)
   - `NEXTAUTH_SECRET`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - (Opcional) `RESEND_API_KEY`, `RESEND_FROM_EMAIL`

### 9.3 Deploy
1. Click "Deploy"
2. Espera 2-3 minutos
3. Una vez deployado, ejecuta en tu terminal local:
   ```bash
   # Cambiar MONGODB_URI a tu connection string de producción
   npm run db:create-admin
   ```

---

## 🔧 Troubleshooting

### Error: "Cannot connect to MongoDB"
- Verifica que el connection string sea correcto
- Verifica que tu IP esté en Network Access
- Verifica que el usuario tenga permisos

### Error: "Cloudinary upload failed"
- Verifica las credenciales en `.env`
- Verifica que el Cloud Name sea correcto (sin espacios)

### Error: "NextAuth configuration error"
- Genera un nuevo `NEXTAUTH_SECRET`
- Verifica que `NEXTAUTH_URL` coincida con tu URL

### No puedo hacer login
- Ejecuta `npm run db:create-admin` nuevamente
- Verifica las credenciales en `.env`
- Revisa la consola del servidor para errores

### Las noticias no aparecen en /novedades-db
- Verifica que MongoDB esté conectado
- Crea una noticia de prueba en `/admin/news/new`
- Verifica que la noticia esté marcada como "Publicada"

---

## 📊 Resumen de URLs

### Frontend
- Home: `/`
- Novedades (legacy): `/novedades`
- Novedades (MongoDB): `/novedades-db`
- Multimedia: `/multimedia`
- Contacto: `/contacto`
- Inscripción: `/inscripcion`
- Canchas: `/canchas`

### Admin
- Login: `/admin/login`
- Dashboard: `/admin/dashboard`
- Noticias: `/admin/news`
- Multimedia: `/admin/media`
- Equipos: `/admin/teams`

### APIs
- `GET/POST /api/news` - Noticias
- `GET/POST /api/media` - Multimedia
- `GET/POST /api/pages` - Páginas
- `POST /api/contacto` - Contacto
- `GET/POST /api/inscripcion` - Inscripciones
- `POST /api/upload` - Upload Cloudinary

---

## ✅ Checklist Final

Antes de considerar el sistema completo, verifica:

- [ ] MongoDB Atlas configurado y conectado
- [ ] Cloudinary configurado
- [ ] NEXTAUTH_SECRET generado
- [ ] Usuario admin creado
- [ ] Puedes hacer login en `/admin/login`
- [ ] Puedes crear una noticia con imagen
- [ ] La noticia aparece en `/novedades-db`
- [ ] El formulario de contacto funciona
- [ ] El formulario de inscripción funciona
- [ ] (Opcional) Datos legacy importados
- [ ] (Opcional) Resend configurado
- [ ] (Opcional) Deployado a Vercel

---

**¿Necesitas ayuda?** Revisa los logs del servidor con `npm run dev` para ver errores detallados.
