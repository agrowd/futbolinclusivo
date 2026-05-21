## ERR-03: Home Page Runtime Crash (2024-03-14)
**Síntoma:** Error 500 / Runtime Overlay al cargar la home.
**Root Cause:** Host `images.weserv.nl` no estaba autorizado en `next.config.js`.
**Solución:** Configurar `remotePatterns` para incluir el proxy de imágenes.
**Estado:** ✅ FIXED

## ERR-04: Logos Rotos (ORB Block) (2024-03-14)
**Síntoma:** Los logos de clubes y partners no se visualizan (broken icon).
**Root Cause:** Opaque Response Blocking (ORB) del navegador bloquea SVGs de S3/Wikimedia sin CORS.
**Solución:** Proxy vía `images.weserv.nl` para inyectar headers correctos.
**Estado:** ✅ FIXED

## ERR-05: Crash en Novedades por imagen subida (2026-04-08)
**Síntoma:** Unhandled Runtime Error al entrar a `/novedades` tras crear una noticia. En terminal lanza errores raros de Turbopack como `Can't resolve tailwindcss`.
**Root Cause:** La imagen subida pertenece a Cloudinary pero el dominio `res.cloudinary.com` no estaba autorizado en `remotePatterns` de `next.config.mjs`, causando que el componente `<Image>` tire un error catastrófico.
**Solución:** Agregar `res.cloudinary.com` a `next.config.mjs` y reiniciar el servidor.
**Estado:** ✅ FIXED

## ERR-06: ReferenceError: dbConnect is not defined (2026-04-13)
**Síntoma:** Error 500 al intentar acceder a rutas dinámicas institucionales (/nosotros, /historia, /escuela).
**Root Cause:** Se eliminó accidentalmente el bloque de importaciones de base de datos durante el refactoring de `GenericCmsPage.js`.
**Solución:** Restaurar las importaciones de `dbConnect`, `Page` y `CMS_FALLBACKS`.
**Estado:** ✅ FIXED

## ERR-07: Botón de Editar Noticias Roto / 404 (2026-05-21)
**Síntoma:** Los usuarios no pueden editar las noticias desde la sección `/admin/news` (redirección a `/admin/news/edit/[id]` que daba 404).
**Root Cause:** Falta la ruta e implementación del archivo de frontend `/admin/news/edit/[id]/page.js` a pesar de que el backend y el botón en el listado de administración ya estaban configurados.
**Solución:** Crear e implementar el componente `EditNewsPage` en `src/app/admin/news/edit/[id]/page.js` reutilizando el diseño y las validaciones de creación.
**Estado:** ✅ FIXED

## ERR-08: Dynamic Route Handlers Failing / "Error al eliminar" (2026-05-21)
**Síntoma:** Al intentar eliminar una noticia (o realizar operaciones en rutas dinámicas API), el servidor falla de manera silenciosa o retorna 404, haciendo que el cliente muestre la alerta genérica de "Error al eliminar".
**Root Cause:** En Next.js 16/15, el objeto `params` en los Route Handlers es ahora una promesa asíncrona. Acceder a `params.id` o desestructurarlo de manera síncrona (`const { id } = params;`) causaba que la variable fuera `undefined`, lo que hacía que `News.findByIdAndDelete(undefined)` retornara `null` y fallara la consulta en base de datos en producción.
**Solución:** Await el objeto `params` en todos los API dynamic routes (`const { id } = await params;` y `const { slug } = await params;`) antes de interactuar con MongoDB.
**Estado:** ✅ FIXED
