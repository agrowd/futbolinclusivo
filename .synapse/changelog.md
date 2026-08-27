# Changelog

## v1.10.9 — 2026-08-27
- feat: Añadido el álbum 'Superliga Inclusiva en AFA - Sábado 01/08 - San Lorenzo de Almagro - Fotografa Karo Nuñez' con 44 fotos en alta resolución e integrado Sharp en api/upload para auto-optimizar fotos mayores a 10MB.

## v1.10.8 — 2026-08-27
- perf: Optimizada la subida masiva de fotos con URL.createObjectURL para evitar sobrecarga de RAM en el navegador y añadido sistema de auto-reintentos resiliente por foto en AlbumCreateModal.

## v1.10.7 — 2026-08-27
- feat: Actualizada la imagen principal del Hero con la foto oficial del equipo y bandera conmemorativa (public/hero.jpg).

## v1.10.6 — 2026-08-27
- feat: Redirección y enlaces de "Alquiler de Canchas" vinculados a https://canchas.futbolinclusivo.org.ar/disponibilidad.
- fix: Eliminadas todas las imágenes estáticas y enlaces caídos de WordPress, reemplazándolos por fondos vectoriales con gradientes y tarjetas de íconos temáticos.

## v1.10.5 — 2026-08-27
- fix: Solucionados errores 404 en todas las secciones multimedia (/multimedia/fotos-videos, /multimedia/revista, /multimedia/prensa, /multimedia/documentos-utiles) y eliminadas imágenes rotas en el hub central (/multimedia).

## v1.10.4 — 2026-08-27
- feat: Integrados los Álbumes de Fotos en el listado de "Últimas Novedades" de la Portada (/), con badge de Álbum, conteo de fotos y enlace directo a la galería.

## v1.10.3 — 2026-08-27
- feat: Añadida la sección destacada de Álbumes y Galerías de Fotos en la página principal (/), con tarjetas interactivas, conteo de fotos, previsualización de thumbnails y acceso directo al visor completo.

## v1.10.2 — 2026-08-27
- feat: Integrada la vista de gestión de Álbumes de Eventos en el panel de administración (/admin/media) con selector de pestañas, previsualización de portadas, conteo de fotos, botón de ver en web y eliminación de álbumes.

## v1.10.1 — 2026-08-27
- fix: Optimizado el proceso de subida masiva de fotos con pool concurrente de peticiones individuales (/api/upload), evitando el límite de tamaño de petición de Vercel (4.5MB) y mostrando progreso en vivo foto por foto.

## v1.10.0 — 2026-08-27
- feat: Creado sistema de Galería de Fotos por Evento y Fecha (/multimedia/fotos), con gestor de carga masiva drag & drop en el panel admin (/admin/media), visor lightbox interactivo pantalla completa, descarga individual de fotos y botones de compartir por WhatsApp.

## v1.9.6 — 2026-08-24
- feat: Mejorados todos los modales del sistema con cierre automático por clic exterior en backdrop y ajuste adaptativo max-h-[90vh] con scroll vertical fluido.

## v1.9.5 — 2026-08-24
- feat: Actualizada la base de datos marcando las 36 inscripciones activas con emailSent: true y agregada la 5ta tarjeta de métrica KPI (Mails/QRs 100%) en el panel de administración (/admin/infancias).

## v1.9.4 — 2026-08-24
- feat: Configurado el filtro de envío en el bot de WhatsApp para iniciar desde "Rivero clara agustina" hacia abajo con delay aleatorio anti-spam (10s-22s) y soporte de transmisión automática de mensajes e imágenes de pases QR.

## v1.9.3 — 2026-08-24
- feat: Creado bot local de WhatsApp (scripts/whatsapp-bot.mjs), generador de archivos PNG de pases QR e informe de vista previa HTML, modal interactivo de exploración familiar (/admin/infancias) y actualización de ubicación oficial a Andar FC.

## v1.9.2 — 2026-08-24
- feat: Agregada integración directa de WhatsApp en el panel de administración (/admin/infancias) con formateador de números al estándar 549, botones de apertura directa de chat y copiado rápido de plantilla de mensaje para envío manual de pases QR.

## v1.9.1 — 2026-08-21
- feat: Implementado el sistema de envío masivo de pases QR por correo electrónico para inscripciones anteriores en el panel de administración (/admin/infancias) con agrupación familiar y seguimiento de estado de envío.

## v1.9.0 — 2026-08-21
- feat: Reforzada la validación obligatoria y estricta de formato de correo electrónico tanto en cliente como en backend API y modal de creación manual admin.

## v1.8.9 — 2026-08-21
- feat: Configurado el envío directo de correos electrónicos desde la cuenta diadelasinfancias.andar@gmail.com mediante Nodemailer y contraseña de aplicación SMTP verificada.

## v1.8.8 — 2026-08-20
- fix: Resuelto el problema de visualización de imagen del código QR mediante la inclusión del atributo qrDataUrl en la respuesta de la API y un generador dinámico de respaldo en el navegador (InfanciasForm.js).

## v1.8.7 — 2026-08-20
- feat: Añadido soporte para envío de correos con cuentas de Gmail / Google Workspace mediante Nodemailer y contraseñas de aplicación SMTP.

## v1.8.6 — 2026-08-20
- feat: Implementado el envío automático de correos de confirmación con pases QR adjuntos e incrustados utilizando Resend, así como un endpoint y botón de reenvío manual desde el panel de administración (/admin/infancias).

## v1.8.5 — 2026-08-14
- fix: Resuelto el problema de cierre de sesión involuntario post-login mediante sincronización completa de sesión en cookies de navegador, inclusión de secret explícito en middleware y auto-sincronización de credenciales de juanchi y admin en MongoDB Atlas.

## v1.8.4 — 2026-08-13
- feat: Añadida funcionalidad de alta manual desde el panel de administración (/admin/infancias) con el componente InfanciasCreateModal para registrar adultos y grupos de niños con generación instantánea de tickets QR y opción de auto-acreditación en puerta.

## v1.8.3 — 2026-08-13
- feat: Establecidos todos los campos del formulario del Día de las Infancias como estrictamente obligatorios tanto en cliente como en backend (/api/infancias), dejando únicamente "Club o Institución" como campo opcional.

## v1.8.2 — 2026-08-13
- feat: Persistencia de pases familiares en localStorage para que los adultos responsables puedan consultar sus QRs en cualquier momento sin volver a rellenar el formulario.
- feat: Opciones para añadir más hijos/as manteniendo los datos del tutor o reiniciar la inscripción para otra familia.
- feat: Redacción completa con instrucciones detalladas para el día del evento en el mensaje compartido por WhatsApp y en la vista de confirmación.
- fix: Invalidación forzada de caché (cache-busting ?v=3) y sustitución de todos los archivos de favicon con el logo oficial de Andar FC.

## v1.8.1 — 2026-08-13
- fix: Reparadas las imágenes del footer en la sección del Complejo Deportivo y la columna de marca vinculando los recursos locales optimizados de Andar FC (/andarfc-logo.png) y Asociación Civil Andar (/logo.png).
- feat: Implementado el logo de Andar FC como favicon oficial para todo el sitio (/icon.png, /apple-icon.png y etiquetas en layout.js).

## v1.8.0 — 2026-08-13
- feat: Soporte para inscripción multi-niño en el formulario del Día de las Infancias con carga de datos de contacto una sola vez y generación agrupada de pases QR familiares.
- feat: Verificación en tiempo real contra la base de datos para prevenir duplicados por DNI o Nombre + Teléfono con alertas directas en los inputs.
- feat: Rediseño del escáner de control de acceso de puerta con modo pantalla completa, feedback sonoro alegre y de advertencia, cambio de cámara frontal/trasera y contador en vivo.
- feat: Optimización mobile del panel de administración (/admin/infancias) con vista en tarjetas táctiles, tipografías amplias y botón flotante de escaneo rápido.

## v1.7.1 — 2026-08-13
- feat: Configuración de credenciales de acceso para el usuario `juanchi` con contraseña `admin123` en NextAuth y auto-sembrado en base de datos.
- edit: Actualizado el formulario de login administrativo (/admin/login) para aceptar nombres de usuario o correos con placeholder de `juanchi`.

## v1.7.0 — 2026-08-13
- feat: Formulario de inscripción para el evento Día de las Infancias (/dia-de-las-infancias) con validación de campos obligatorios (nombre completo, teléfono/WhatsApp, autorización obligatoria de uso de imagen) y emisión instantánea de pases de acceso con código QR descargable e imprimible.
- feat: Módulo de administración (/admin/infancias) con métricas en tiempo real, escáner de QR por cámara en vivo con feedback sonoro (Web Audio API) y detección de pases duplicados, buscador rápido por DNI/Código, edición completa, toggle de acreditación y exportación de inscriptos a formato CSV/Excel.
- feat: Configuración de enrutamiento y reescritura de subdominios para admin.futbolinclusivo.org.ar y admin.futbolinclusivo.com.ar en next.config.mjs.

## v1.6.2 — 2026-07-24
- edit: Actualización de los contenidos de la página de Propósito (/institucional/propósito), Misión y cmsFallbacks.js según nuevo texto oficial provisto por el usuario: "EL FÚTBOL COMO HERRAMIENTA DE EDUCACIÓN E INCLUSIÓN SOCIAL" y Misión "Promover la inclusión a través del fútbol." (removiendo "social" del final).

## v1.6.1 — 2026-07-22
- edit: Actualizar el título y subtítulo de la cabecera Hero en la página /institucional/nosotros a "Nosotros" y "Promovemos la educación y la inclusión social a través del fútbol".

## v1.6.0 — 2026-07-22
- feat: Convertir todas las páginas informativas e institucionales del sitio en componentes 100% estáticos desvinculando la colección Page de MongoDB. Se mantienen totalmente dinámicas las secciones de Noticias, Novedades, Blogs, Multimedia, Reservas y Equipos.

## v1.5.0 — 2026-07-22
- fix: Forzar el filtrado y reemplazo de valores legados de la base de datos en la cabecera Hero de Institucional (/institucional) garantizando el renderizado de "Institucional" (Etiqueta), "Andar Fútbol Club" (Título) y "Promoviendo la Inclusión a través del fútbol" (Descripción).

## v1.4.9 — 2026-07-03
- edit: Actualizar títulos, etiquetas, misión y textos descriptivos de la sección Institucional y Nosotros con los nuevos contenidos provistos por el usuario en PDF.

## v1.4.8 — 2026-07-03
- feat: Integración de `@vercel/analytics` en el root layout para recopilación de datos de analíticas y rendimiento web en tiempo real.

## v1.4.7 — 2026-05-21
- feat: Unificar redirecciones en toda la web apuntando a https://futbolinclusivo.mygol.es/tournaments para la Liga BA en la página de ligas y para las tarjetas circulares interactivas (Liga Inclusiva y Super Liga AFA) en la Home Page, adaptando los botones de manera nativa para enlaces externos de pestaña nueva y textos uniformes "VER TORNEO".

## v1.4.6 — 2026-05-21
- feat: Redirección del botón de la Super Liga AFA en la página de ligas al portal oficial de torneos externo (https://futbolinclusivo.mygol.es/tournaments) con visualización y comportamiento nativo adaptado para enlaces externos.

## v1.4.5 — 2026-05-21
- fix: Sincronizar el nuevo logotipo oficial de la AFA (`logo-afa.png`) provisto por el usuario en la raíz del proyecto hacia `public/logo-afa.png` para que sea servido estática y correctamente por Next.js en el inicio y en la página de ligas.

## v1.4.4 — 2026-05-21
- fix: Reemplazar el logo de SAT (`/satlogo.png`) por el de AFA (`/logo-afa.png`) en el inicio (Home) de la web bajo el bloque de la Super Liga AFA.

## v1.4.3 — 2026-05-21
- fix: Reemplazar el logo de SAT (`/satlogo.png`) por el logo de AFA (`/logo-afa.png`) en la sección premium de la Super Liga AFA en la página de ligas.

## v1.4.2 — 2026-05-21
- fix: Cambiar el logo del navbar principal (desktop y mobile sidebar) para que use el logo de Andar FC (`/andarfc-logo.png`) en lugar del de la Liga Inclusiva (`/logo.png`).

## v1.4.1 — 2026-05-21
- feat: Redirección del botón de Fixture y Tabla Completa en la página de inicio al portal oficial externo (https://futbolinclusivo.mygol.es/tournaments).

## v1.4.0 — 2026-05-21
- feat: Remoción de la liga "Festival LATAM de Fútbol 3" de la página de ligas.
- feat: Incorporación y énfasis premium de la "Super Liga AFA" en la página de ligas con renderizado de logotipos oficiales solapados (AFA dorado + SAT).
- style: Aplicación de paleta de colores personalizada (gradiente de borravino AFA `#6B1026` a `#2B050D`, borde celeste `#75AADB`/40 y sombras brillantes) en el card de la Super Liga AFA.
- refactor: Corrección del mapeo de etiquetas de estadísticas (Sede Principal, Coordinación) y visualización limpia de arreglos de características.

## v1.3.0 — 2026-05-21
- feat: Implementación de la página de edición de noticias (`src/app/admin/news/edit/[id]/page.js`) para habilitar edición dinámica de posts.
- fix: Corrección de permisos de eliminación de noticias para habilitar a usuarios con rol `"editor"`.
- fix: Corrección crítica de compatibilidad con Next.js 16 haciendo que `params` sea correctamente asíncrono (await) en todas las rutas API dinámicas.
- feat: Mensajes de diagnóstico de error explícitos en el cliente de administración de noticias.

## v1.2.0 — 2026-04-13
- feat: Paridad visual 100% con sitio de producción (Home, Nosotros, Escuela, Historia).
- feat: Sistema de inyección dinámica de componentes premium en `GenericCmsPage` basado en slug.
- feat: Nuevos componentes: `MissionVisionCards`, `Timeline`, `MethodologySteps`, `ImpactMetrics`.
- feat: Inclusión de la "Página de Inicio" en el dashboard de administración del CMS.
- fix: Reparado `ReferenceError: dbConnect` en el componente `GenericCmsPage`.

## v1.1.0 — 2026-03-11
- feat: Accesibilidad: Selector de tamaño de fuente persistente en el Header (`A A A`).
- feat: Integración del logo oficial de Andar FC.
- feat: Recreación del diseño original de Novedades, Aliados y Cuenta Regresiva en la página de Inicio.
- config: Habilitada carga remota de imágenes estáticas desde `futbolinclusivo.org.ar` en `next.config.mjs`.

## v1.0.0 — 2026-03-11
- feat: Initial platform redesign with Next.js App Router
- feat: Multi-step tournament registration form (3 steps)
- feat: Court rental module with interactive calendar
- feat: Overbooking prevention with compound unique index
- feat: Full WCAG accessibility (ARIA, keyboard nav, screen reader support)
- feat: Atkinson Hyperlegible typography
- feat: High contrast mode support
- feat: Informational pages (Home, Nosotros, Contacto, Novedades)
- feat: MongoDB schemas (Team, Player, Reservation)
- docs: Ariadne Engine initialized
