# Conversación y Solución — Gestión de Noticias y Rutas Dinámicas (Next.js 16)

## ⚽ Sesión 11: Unificación de Redirecciones a MyGol en Ligas e Inicio

### 📌 Contexto
El usuario solicitó que:
1. El botón de la **Liga de Fútbol Inclusiva BA** en la página de ligas también redirija al portal externo: `https://futbolinclusivo.mygol.es/tournaments`.
2. Las dos tarjetas interactivas de la Home Page (**Liga Inclusiva** y **Super Liga**) también lleven a ese mismo portal externo a través de sus respectivos botones.

### 🛠️ Acciones Realizadas
1. **Página de Ligas**: Se editó `src/app/programas/ligas/page.js` para modificar la propiedad `href` de la Liga BA, asignándole el valor `"https://futbolinclusivo.mygol.es/tournaments"`. Gracias a la lógica condicional que creamos en la sesión anterior, el botón para esta liga cambió automáticamente a un enlace externo `<a>` nativo con `target="_blank"`, `rel="noopener noreferrer"` y con el texto de acción `"VER FIXTURE Y TABLAS"`.
2. **Página de Inicio (Home)**: Se editó `src/components/ui/HomeClient.js` para reemplazar los enlaces `<Link>` de las tarjetas circulares interactivas por enlaces externos nativos `<a>` con `target="_blank"` y `rel="noopener noreferrer"` apuntando a `https://futbolinclusivo.mygol.es/tournaments`. Ambos botones pasaron a tener el texto `"VER TORNEO"` para mayor coherencia visual y UX.
3. **Validación de Compilación**: Se ejecutó `npm run build` localmente para constatar que todo compila exitosamente sin anomalías.
4. **Git Sync & Despliegue**: Se stagearon, commitearon y pushearon todos los cambios a la rama principal (`main`) de GitHub.

---

## ⚽ Sesión 10: Redirección de Botón Super Liga AFA en Ligas

### 📌 Contexto
El usuario solicitó que el botón de la Super Liga AFA en la página de ligas (`/programas/ligas`) redirija al portal externo de torneos: `https://futbolinclusivo.mygol.es/tournaments`.

### 🛠️ Acciones Realizadas
1. **Actualización de Enlaces en el Componente**: Se editó `src/app/programas/ligas/page.js` para modificar la propiedad `href` de la Super Liga AFA, asignándole el valor `"https://futbolinclusivo.mygol.es/tournaments"`.
2. **Navegación Externa Segura**: Se incorporó un condicional de renderizado en el bucle que dibuja las tarjetas de programas de liga. Si la propiedad `href` comienza con `"http"`, se genera una etiqueta `<a>` nativa con los atributos de seguridad recomendados (`target="_blank" rel="noopener noreferrer"`) y se actualiza el texto de acción a `"VER FIXTURE Y TABLAS"`. Para enlaces internos se mantiene la etiqueta `<Link>` de Next.js y el texto `"CONOCER MÁS"`.
3. **Validación de Compilación**: Se ejecutó `npm run build` localmente para constatar que todo compila exitosamente sin anomalías.
4. **Git Sync & Despliegue**: Se stagearon, commitearon y pushearon todos los cambios a la rama principal (`main`) de GitHub.

---

## ⚽ Sesión 9: Sincronización del Nuevo Logotipo Oficial de la AFA

### 📌 Contexto
El usuario actualizó el logotipo `logo-afa.png` en la raíz del proyecto y solicitó validar que sea este nuevo archivo el que se sirva e implemente en la plataforma web, procediendo a redesplegar en GitHub.

### 🛠️ Acciones Realizadas
1. **Identificación de Exclusiones**: Se detectó que las imágenes en la raíz del proyecto están excluidas por `.gitignore` (`/*.png`), lo que prevenía que los cambios realizados por el usuario en `logo-afa.png` fueran detectados por Git.
2. **Copia de Asset Estático**: Se copió de forma forzada el nuevo archivo `logo-afa.png` desde la raíz a `public/logo-afa.png` para sobreescribir el recurso estático servido por Next.js.
3. **Validación de Compilación**: Se ejecutó `npm run build` localmente para garantizar la correcta optimización de la imagen y la estabilidad del build de producción.
4. **Git Sync & Despliegue**: Se stageó `public/logo-afa.png`, `.synapse/workcycle.md`, `.synapse/changelog.md` y `chat.md` y se subieron a GitHub para disparar el despliegue automático de Vercel.

---

## 📌 Contexto
El usuario reportó que el borrado de noticias de prueba ("Prueba") en el dashboard de producción (`https://futbolinclusivo.vercel.app/admin/news`) seguía fallando con el aviso de alerta "Error al eliminar" (el cual era un alert estático en el frontend anterior).

## 🕵️ Causa Raíz
1. **Incompatibilidad con Next.js 16/15**: En Next.js 16 (la versión utilizada por la plataforma, `16.1.6`), el argumento `params` que reciben los Route Handlers dinámicos (métodos GET, PUT, DELETE) es una **Promesa asíncrona**.
2. Al acceder a `params.id` o `params.slug` de forma síncrona en producción, estas variables se evaluaban como `undefined`.
3. Esto causaba que consultas de Mongoose como `News.findByIdAndDelete(undefined)` fallaran silenciosamente o retornaran un error (404/500), haciendo que el frontend entrara en el bloque fallback e invocara la alerta `"Error al eliminar"`.

## 🛠️ Acciones Realizadas
1. **Estandarización Asíncrona (await params)**:
   - Se modificó `src/app/api/news/[id]/route.js` para usar `await params` en los controladores de `GET`, `PUT` y `DELETE`.
   - Se modificó `src/app/api/media/[id]/route.js` para usar `await params` en el controlador de `DELETE`.
   - Se modificó `src/app/api/pages/[slug]/route.js` para usar `await params` en el controlador de `GET`.
2. **Mejora Diagnóstica en el Frontend**:
   - Se actualizó `src/app/admin/news/page.js` para capturar e imprimir en pantalla el mensaje de error exacto enviado por el backend (por ejemplo: `"Noticia no encontrada"`, `"No autorizado"`, etc.) en lugar del alert genérico.
3. **Validación de Compilación**:
   - Se ejecutó `npm run build` de manera exitosa a nivel local para asegurar que la compilación con Turbopack no posee warnings o crashes asociados a los parámetros de rutas dinámicas.
4. **Git Sync**:
   - Se realizó commit (`6a205d5`) y push exitoso a GitHub en la rama `main`, activando la compilación automática en Vercel.

## 📈 Próximos Pasos
- Esperar de 2 a 3 minutos a que Vercel complete el despliegue automático del commit `6a205d5` ("fix: make dynamic route params asynchronous to support Next.js 16 requirements and improve error handling").
- Una vez desplegado, el usuario podrá eliminar la noticia "Prueba" sin inconvenientes. En caso de fallas imprevistas, ahora la alerta mostrará el diagnóstico exacto de la base de datos o autenticación.

---

## ⚽ Sesión: Ajuste de Ligas — Énfasis en Super Liga AFA y Remoción de Festival LATAM

### 📌 Contexto
El usuario solicitó:
1. Remover de la página de ligas (`/programas/ligas`) la liga "Festival LATAM de Fútbol 3".
2. Agregar la liga **Super Liga AFA** y darle mayor énfasis visual colocando los logotipos oficiales (AFA dorado y SAT), tal como aparece en las tarjetas circulares interactivas de la página de inicio (Home).

### 🛠️ Acciones Realizadas
1. **Limpieza e Incorporación del Modelo de Datos**:
   - Se removió el objeto de "Festival LATAM" del array `programs` en `src/app/programas/ligas/page.js`.
   - Se agregó el objeto para la **Super Liga AFA** con el flag `isAfa: true`, con sede en el Predio de Ezeiza, el nivel competitivo de élite y su alianza AFA/SAT.
   - Se actualizó el metadato `metadata.description` para que apunte a las ligas vigentes: `"Liga BA, Super Liga AFA y Liga Nacional."`
2. **Inyección de Identidad Visual Premium (Estilo Home)**:
   - Se modificó la estructura del renderizador de tarjetas para inyectar una combinación de logotipos solapados cuando `isAfa` sea verdadero. Se colocaron el logo oficial de la AFA (SVG dorado) y el logo del SAT (`/satlogo.png`) en círculos superpuestos de alta definición con sombras (`drop-shadow`) y bordes claros, imitando perfectamente la visual premium del Home.
   - Se aplicó una paleta de color personalizada para AFA: Fondo gradiente de borravino `#6B1026` a `#2B050D`, un borde celeste AFA `#75AADB`/40 y sombra brillante celeste `rgba(117,170,219,0.2)`.
   - Se configuraron animaciones personalizadas de hover con mayor resplandor y escalabilidad (`hover:shadow-[0_25px_70px_rgba(117,170,219,0.35)]`).
3. **Robustez en la Visualización de Stats**:
   - Se corrigieron los mapeos de claves del panel de estadísticas de la tarjeta (por ejemplo: `sede` a `"SEDE PRINCIPAL"`, `coordinacion` a `"COORDINACIÓN"`).
   - Se previno la visualización concatenada de arreglos en el panel de stats (como `caracteristicas`) formateándolos mediante un `.join(", ")` seguro para evitar colisiones visuales de strings.
4. **Validación de Compilación**:
   - Se ejecutó `npm run build` con éxito total, verificando que la página estática `/programas/ligas` y todas las demás rutas compilan perfectamente con Turbopack sin errores.

---

## ⚽ Sesión 5: Redirección al Portal de Tournaments (MyGol)

### 📌 Contexto
El usuario solicitó:
1. Que en la sección de competencia del inicio, tanto la opción de "Fixture" (botón **VER FIXTURE COMPLETO**) como la opción de "Goleadores" (botón **TABLA COMPLETA**) redirijan al portal de información de torneos externo: `https://futbolinclusivo.mygol.es/tournaments`.

### 🛠️ Acciones Realizadas
1. **Redirecciones Precisas en HomeClient**:
   - Se modificó `src/components/ui/HomeClient.js` en los dos botones de navegación.
   - Se reemplazaron las etiquetas `<Link>` de Next.js por etiquetas `<a>` HTML estándar. Esto es ideal para enlaces externos de dominios distintos (`mygol.es`), evitando advertencias de prefetch o problemas en la carga por parte del router de Next.js.
   - Se incorporó `target="_blank"` y `rel="noopener noreferrer"` para asegurar que los enlaces abran en una nueva pestaña sin penalizar la seguridad ni el rendimiento de la aplicación principal.
2. **Validación de Compilación en Next.js**:
   - Se ejecutó el comando `npm run build` localmente.
   - El compilador Next.js/Turbopack compiló exitosamente todas las rutas estáticas y dinámicas en 32.8 segundos sin errores ni advertencias en las páginas de frontend modificadas.
3. **Persistencia e Historial**:
   - Se actualizaron los archivos del motor Ariadne (`.synapse/changelog.md` y `.synapse/workcycle.md`) registrando la versión `v1.4.1` con la solución a este requerimiento.

---

## ⚽ Sesión 6: Actualización del Logo del Navbar Principal

### 📌 Contexto
El usuario solicitó:
1. Cambiar el logo principal del navbar del sitio para que corresponda a **Andar FC** en lugar del logotipo de la Liga de Fútbol Inclusiva.

### 🛠️ Acciones Realizadas
1. **Reemplazo en Header.jsx**:
   - Se modificó el archivo `src/components/layout/Header.jsx` en los dos componentes de cabecera principales: el navbar de escritorio y la cabecera del menú lateral (mobile sidebar).
   - Se cambió la ruta del asset de `/logo.png` (que contiene el logo de la Liga Inclusiva) a `/andarfc-logo.png` (que contiene el logo oficial de Andar FC).
2. **Validación de Compilación en Next.js**:
   - Se ejecutó `npm run build` localmente.
   - El compilador compiló con éxito total todas las páginas, incluyendo los componentes de navegación.
3. **Persistencia e Historial**:
   - Se actualizaron los archivos del motor Ariadne (`.synapse/changelog.md` y `.synapse/workcycle.md`) registrando la versión `v1.4.2` con la solución a este requerimiento.

---

## ⚽ Sesión 7: Reemplazo de Logo SAT por Logo AFA en Página de Ligas

### 📌 Contexto
El usuario solicitó:
1. Reemplazar la imagen del logo de SAT (`/satlogo.png`) por la del logo oficial de la AFA (`logo-afa.png`) en el bloque de la Super Liga AFA en la página de ligas.

### 🛠️ Acciones Realizadas
1. **Disponibilización del Recurso Estático**:
   - Ubiqué el archivo `logo-afa.png` en la raíz del proyecto.
   - Lo copié al directorio `public/` (`public/logo-afa.png`) para que Next.js pueda servirlo estáticamente.
2. **Actualización de la Tarjeta en `page.js`**:
   - Modifiqué `src/app/programas/ligas/page.js` dentro del condicional `prog.isAfa`.
   - Cambié el elemento `<Image src="/satlogo.png" alt="SAT" ... />` por `<Image src="/logo-afa.png" alt="AFA" ... />`.
3. **Validación de Compilación en Next.js**:
   - Se ejecutó `npm run build` localmente con un resultado exitoso.
4. **Persistencia e Historial**:
   - Se actualizaron los archivos del motor Ariadne (`.synapse/changelog.md` y `.synapse/workcycle.md`) registrando la versión `v1.4.3` con la solución a este requerimiento.

---

## ⚽ Sesión 8: Reemplazo de Logo SAT por Logo AFA en el Inicio

### 📌 Contexto
El usuario solicitó:
1. Reemplazar la imagen del logo de SAT (`/satlogo.png`) por la del logo oficial de la AFA (`/logo-afa.png`) en el inicio (Home) de la web bajo el bloque de la Super Liga AFA, y realizar nuevamente el despliegue.

### 🛠️ Acciones Realizadas
1. **Actualización del Logo en Inicio (HomeClient)**:
   - Modifiqué `src/components/ui/HomeClient.js` en la tarjeta de la **Super Liga** (sección Competencia).
   - Reemplacé el elemento `<Image src="/satlogo.png" alt="SAT" ... />` por `<Image src="/logo-afa.png" alt="AFA" ... />`.
2. **Validación de Compilación en Next.js**:
   - Se ejecutó `npm run build` localmente con un resultado exitoso de compilación y optimización.
3. **Persistencia e Historial**:
   - Se actualizaron los archivos del motor Ariadne (`.synapse/changelog.md` y `.synapse/workcycle.md`) registrando la versión `v1.4.4` con la solución a este requerimiento.


