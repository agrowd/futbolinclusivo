# Guía de Configuración Rápida

## 1️⃣ MongoDB Atlas

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un nuevo cluster (Free tier es suficiente para desarrollo)
3. En "Database Access", crea un usuario con permisos de lectura/escritura
4. En "Network Access", agrega tu IP (o `0.0.0.0/0` para desarrollo)
5. Copia el connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/futbolinclusivo?retryWrites=true&w=majority
   ```

## 2️⃣ Cloudinary

1. Crea una cuenta en [Cloudinary](https://cloudinary.com/)
2. En el Dashboard, copia:
   - Cloud Name
   - API Key
   - API Secret

## 3️⃣ Variables de Entorno

Edita el archivo `.env` con tus credenciales:

```bash
# MongoDB Atlas
MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/futbolinclusivo?retryWrites=true&w=majority

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# NextAuth - Generar secret con: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-generado-aqui

# Admin (cambiar después del primer login)
ADMIN_EMAIL=admin@futbolinclusivo.org.ar
ADMIN_PASSWORD=changeme123

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret
```

## 4️⃣ Instalación

```bash
# Instalar dependencias
npm install

# Crear usuario admin
npm run db:create-admin

# (Opcional) Importar datos del sitio viejo
npm run db:import

# Iniciar desarrollo
npm run dev
```

## 5️⃣ Acceder al Panel Admin

1. Abre http://localhost:3000/admin/login
2. Usa las credenciales de `.env`:
   - Email: `admin@futbolinclusivo.org.ar`
   - Password: `changeme123`
3. **¡IMPORTANTE!** Cambia la contraseña después del primer login

## 6️⃣ Verificar que todo funciona

- ✅ Home: http://localhost:3000
- ✅ Admin: http://localhost:3000/admin/dashboard
- ✅ Noticias: http://localhost:3000/novedades
- ✅ Multimedia: http://localhost:3000/multimedia
- ✅ Inscripción: http://localhost:3000/inscripcion
- ✅ Canchas: http://localhost:3000/canchas

## 🔧 Troubleshooting

### Error de conexión a MongoDB
- Verifica que el connection string sea correcto
- Revisa que tu IP esté en Network Access
- Confirma que el usuario tenga permisos

### Error de Cloudinary
- Verifica las credenciales en el Dashboard
- Asegúrate de usar el Cloud Name correcto (sin espacios)

### NextAuth error
- Genera un nuevo secret: `openssl rand -base64 32`
- Verifica que `NEXTAUTH_URL` coincida con tu URL local

### No puedo hacer login
- Ejecuta `npm run db:create-admin` nuevamente
- Verifica las credenciales en `.env`
- Revisa la consola del servidor para errores

## 📝 Próximos Pasos

1. Cambiar contraseña del admin
2. Crear contenido de prueba en el panel
3. Configurar Resend para emails (opcional)
4. Configurar Mercado Pago para donaciones (opcional)
5. Deploy a Vercel

## 🚀 Deploy a Producción

Ver instrucciones completas en `README.md`
