# Script de Extracción de Contenido Legacy

## 🚀 Descripción

Este script automatizado extrae TODO el contenido del sitio legacy de Fútbol Inclusivo:

- **HTML completo** de cada página
- **Todas las imágenes** con URLs y metadata
- **Galerías multimedia** con sus imágenes
- **Textos estructurados** (títulos, contenidos, enlaces)
- **Metadata** (meta tags, CSS, JS)
- **Reporte HTML** visual para revisión

## 📋 Instalación

```bash
# Entrar al directorio de scripts
cd scripts

# Instalar dependencias
npm install

# O instalar manualmente
npm install jsdom
```

## 🎯 Uso

### Ejecutar extracción completa:

```bash
# Ejecutar el script principal
node extract-legacy-content.js

# O usando npm
npm run extract
```

### Qué extrae el script:

1. **Páginas principales:**
   - Homepage
   - Multimedia y subpáginas
   - Novedades
   - Escuela
   - Nosotros

2. **Contenido de cada página:**
   - HTML completo
   - Títulos y estructura
   - Textos y descripciones
   - Enlaces internos

3. **Imágenes:**
   - Todas las etiquetas `<img>`
   - Open Graph images
   - URLs completas y metadata

4. **Galerías:**
   - Galerías de WordPress
   - Imágenes de galerías
   - Títulos y descripciones

5. **Metadata:**
   - Meta tags
   - CSS y JS files
   - URLs canónicas

## 📁 Estructura de salida

```
extracted_content/
├── pages/           # JSON con contenido de cada página
├── images/          # JSON con URLs de imágenes por página
├── galleries/       # JSON con galerías encontradas
├── metadata/        # JSON con metadata de cada página
├── index.json       # Índice general con estadísticas
└── report.html      # Reporte visual HTML
```

## 📊 Reporte HTML

El script genera un `report.html` con:

- **Estadísticas generales:** páginas, imágenes, galerías
- **Listado de páginas** con títulos y descripciones
- **Galería de imágenes** con vista previa
- **Navegación interactiva** para revisar contenido

## 🔧 Características técnicas

- **Web scraping** con Node.js nativo
- **DOM parsing** con JSDOM
- **Extracción recursiva** de enlaces internos
- **Manejo de errores** robusto
- **JSON estructurado** para fácil consumo
- **Reporte visual** HTML para revisión

## 🎨 Ejemplo de salida JSON

```json
{
  "pages": {
    "https://futbolinclusivo.org.ar/": {
      "title": "Fútbol Inclusivo",
      "metaDescription": "...",
      "headings": [...],
      "links": [...],
      "mainContent": "..."
    }
  },
  "images": {
    "https://futbolinclusivo.org.ar/": [
      {
        "src": "https://futbolinclusivo.org.ar/app/uploads/...",
        "alt": "...",
        "width": "480",
        "height": "360"
      }
    ]
  }
}
```

## 🚨 Notas importantes

- **Respeta robots.txt** (solo extrae contenido público)
- **Límite de páginas** para evitar sobrecarga
- **Manejo de errores** para páginas inaccesibles
- **Guardado automático** en formato estructurado

## 🔄 Uso programático

```javascript
const { LegacySiteExtractor } = require('./extract-legacy-content.js');

const extractor = new LegacySiteExtractor();
await extractor.run();
```

## 📈 Estadísticas esperadas

- **~50 páginas** procesadas
- **~200+ imágenes** extraídas
- **~15 galerías** encontradas
- **Metadata completa** de cada página

---

**Resultado:** Tendrás ABSOLUTAMENTE TODO el contenido del sitio legacy estructurado y listo para usar en tu nuevo sitio Next.js.
