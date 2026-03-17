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
