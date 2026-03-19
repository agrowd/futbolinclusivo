const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { JSDOM } = require('jsdom');

class LegacySiteExtractor {
  constructor() {
    this.baseUrl = 'https://futbolinclusivo.org.ar';
    this.outputDir = './extracted_content';
    this.visitedUrls = new Set();
    this.extractedData = {
      pages: {},
      images: {},
      galleries: {},
      metadata: {}
    };
  }

  // Función para hacer HTTP request
  async fetchUrl(url) {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;
      
      protocol.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', reject);
    });
  }

  // Extraer imágenes del HTML
  extractImages(html, pageUrl) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const images = [];
    
    // Extraer todas las imágenes
    const imgElements = document.querySelectorAll('img');
    imgElements.forEach(img => {
      const src = img.getAttribute('src');
      if (src) {
        const fullUrl = src.startsWith('http') ? src : new URL(src, this.baseUrl).href;
        images.push({
          src: fullUrl,
          alt: img.getAttribute('alt') || '',
          width: img.getAttribute('width') || '',
          height: img.getAttribute('height') || '',
          class: img.getAttribute('class') || '',
          pageUrl: pageUrl
        });
      }
    });

    // Extraer imágenes de meta tags (OG images)
    const metaImages = document.querySelectorAll('meta[property="og:image"]');
    metaImages.forEach(meta => {
      const content = meta.getAttribute('content');
      if (content) {
        images.push({
          src: content,
          alt: 'OG Image',
          type: 'og:image',
          pageUrl: pageUrl
        });
      }
    });

    return images;
  }

  // Extraer texto y contenido estructurado
  extractContent(html, pageUrl) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Extraer título
    const title = document.querySelector('title')?.textContent || '';
    
    // Extraer meta description
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    
    // Extraer headings
    const headings = [];
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
      headings.push({
        tag: heading.tagName.toLowerCase(),
        text: heading.textContent.trim(),
        id: heading.getAttribute('id') || ''
      });
    });

    // Extraer enlaces
    const links = [];
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      const text = link.textContent.trim();
      if (href && text) {
        const fullUrl = href.startsWith('http') ? href : new URL(href, this.baseUrl).href;
        links.push({
          href: fullUrl,
          text: text,
          title: link.getAttribute('title') || ''
        });
      }
    });

    // Extraer contenido principal
    const mainContent = document.querySelector('main, .main, #main, .content, article')?.innerHTML || 
                        document.querySelector('body')?.innerHTML || '';

    return {
      title,
      metaDescription,
      headings,
      links,
      mainContent,
      fullHtml: html
    };
  }

  // Extraer galerías específicas
  extractGalleries(html, pageUrl) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const galleries = [];

    // Buscar galerías de imágenes
    const galleryElements = document.querySelectorAll('.gallery, .wp-gallery, .gallery-item, .photo-gallery');
    galleryElements.forEach((gallery, index) => {
      const images = gallery.querySelectorAll('img');
      const galleryImages = [];
      
      images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
          const fullUrl = src.startsWith('http') ? src : new URL(src, this.baseUrl).href;
          galleryImages.push({
            src: fullUrl,
            alt: img.getAttribute('alt') || '',
            title: img.getAttribute('title') || ''
          });
        }
      });

      if (galleryImages.length > 0) {
        galleries.push({
          id: `gallery-${index}`,
          title: gallery.querySelector('.gallery-title, h3, h4')?.textContent || `Galería ${index + 1}`,
          images: galleryImages,
          pageUrl: pageUrl
        });
      }
    });

    return galleries;
  }

  // Extraer metadata de la página
  extractMetadata(html, pageUrl) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const metadata = {};

    // Meta tags básicos
    document.querySelectorAll('meta').forEach(meta => {
      const name = meta.getAttribute('name') || meta.getAttribute('property');
      const content = meta.getAttribute('content');
      if (name && content) {
        metadata[name] = content;
      }
    });

    // Links canónicos
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      metadata.canonical = canonical.getAttribute('href');
    }

    // CSS y JS
    const stylesheets = [];
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      stylesheets.push(link.getAttribute('href'));
    });
    metadata.stylesheets = stylesheets;

    const scripts = [];
    document.querySelectorAll('script[src]').forEach(script => {
      scripts.push(script.getAttribute('src'));
    });
    metadata.scripts = scripts;

    return metadata;
  }

  // Procesar una página completa
  async processPage(url) {
    if (this.visitedUrls.has(url)) {
      return;
    }

    console.log(`Procesando: ${url}`);
    this.visitedUrls.add(url);

    try {
      const html = await this.fetchUrl(url);
      
      // Extraer todo el contenido
      const content = this.extractContent(html, url);
      const images = this.extractImages(html, url);
      const galleries = this.extractGalleries(html, url);
      const metadata = this.extractMetadata(html, url);

      // Guardar datos extraídos
      this.extractedData.pages[url] = content;
      this.extractedData.images[url] = images;
      this.extractedData.galleries[url] = galleries;
      this.extractedData.metadata[url] = metadata;

      // Encontrar enlaces internos para procesar recursivamente
      const internalLinks = content.links
        .filter(link => link.href.includes(this.baseUrl))
        .map(link => link.href);

      // Procesar enlaces internos (limitar para evitar bucles infinitos)
      for (const link of internalLinks.slice(0, 10)) {
        if (!this.visitedUrls.has(link)) {
          await this.processPage(link);
        }
      }

    } catch (error) {
      console.error(`Error procesando ${url}:`, error.message);
    }
  }

  // Guardar todo el contenido extraído
  async saveExtractedContent() {
    // Crear directorios
    const dirs = ['pages', 'images', 'galleries', 'metadata'];
    dirs.forEach(dir => {
      const fullPath = path.join(this.outputDir, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    });

    // Guardar páginas
    for (const [url, content] of Object.entries(this.extractedData.pages)) {
      const filename = this.sanitizeFilename(url);
      const filepath = path.join(this.outputDir, 'pages', `${filename}.json`);
      fs.writeFileSync(filepath, JSON.stringify(content, null, 2));
    }

    // Guardar imágenes
    for (const [url, images] of Object.entries(this.extractedData.images)) {
      const filename = this.sanitizeFilename(url);
      const filepath = path.join(this.outputDir, 'images', `${filename}.json`);
      fs.writeFileSync(filepath, JSON.stringify(images, null, 2));
    }

    // Guardar galerías
    for (const [url, galleries] of Object.entries(this.extractedData.galleries)) {
      const filename = this.sanitizeFilename(url);
      const filepath = path.join(this.outputDir, 'galleries', `${filename}.json`);
      fs.writeFileSync(filepath, JSON.stringify(galleries, null, 2));
    }

    // Guardar metadata
    for (const [url, metadata] of Object.entries(this.extractedData.metadata)) {
      const filename = this.sanitizeFilename(url);
      const filepath = path.join(this.outputDir, 'metadata', `${filename}.json`);
      fs.writeFileSync(filepath, JSON.stringify(metadata, null, 2));
    }

    // Guardar índice general
    const indexPath = path.join(this.outputDir, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify({
      totalPages: Object.keys(this.extractedData.pages).length,
      totalImages: Object.values(this.extractedData.images).reduce((acc, imgs) => acc + imgs.length, 0),
      totalGalleries: Object.values(this.extractedData.galleries).reduce((acc, gals) => acc + gals.length, 0),
      pages: Object.keys(this.extractedData.pages),
      extractedAt: new Date().toISOString()
    }, null, 2));

    console.log(`Contenido guardado en: ${this.outputDir}`);
  }

  // Limpiar filename para guardar
  sanitizeFilename(url) {
    return url
      .replace(this.baseUrl, '')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '') || 'index';
  }

  // Ejecutar extracción completa
  async run() {
    console.log('Iniciando extracción del sitio legacy...');
    
    // URLs principales para comenzar
    const startUrls = [
      `${this.baseUrl}/`,
      `${this.baseUrl}/multimedia/`,
      `${this.baseUrl}/multimedia/fotos-videos/`,
      `${this.baseUrl}/novedades/`,
      `${this.baseUrl}/escuela/`,
      `${this.baseUrl}/nosotros/`
    ];

    // Procesar cada URL inicial
    for (const url of startUrls) {
      await this.processPage(url);
    }

    // Guardar todo el contenido
    await this.saveExtractedContent();
    
    console.log('¡Extracción completada!');
    console.log(`Páginas procesadas: ${Object.keys(this.extractedData.pages).length}`);
    console.log(`Imágenes encontradas: ${Object.values(this.extractedData.images).reduce((acc, imgs) => acc + imgs.length, 0)}`);
    console.log(`Galerías encontradas: ${Object.values(this.extractedData.galleries).reduce((acc, gals) => acc + gals.length, 0)}`);
  }
}

// Función para generar reporte HTML
function generateHtmlReport(extractedData) {
  const reportHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de Extracción - Fútbol Inclusivo</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: #000B1A; color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
        .section { background: white; margin: 20px 0; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .page-item { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 5px; }
        .image-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
        .image-item { border: 1px solid #ddd; padding: 10px; text-align: center; }
        .image-item img { max-width: 100%; height: auto; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .stat-card { background: #36b37e; color: white; padding: 20px; border-radius: 10px; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Reporte de Extracción - Fútbol Inclusivo Legacy</h1>
            <p>Contenido extraído del sitio: https://futbolinclusivo.org.ar</p>
        </div>

        <div class="section">
            <h2>📈 Estadísticas</h2>
            <div class="stats">
                <div class="stat-card">
                    <h3>${Object.keys(extractedData.pages).length}</h3>
                    <p>Páginas Procesadas</p>
                </div>
                <div class="stat-card">
                    <h3>${Object.values(extractedData.images).reduce((acc, imgs) => acc + imgs.length, 0)}</h3>
                    <p>Imágenes Encontradas</p>
                </div>
                <div class="stat-card">
                    <h3>${Object.values(extractedData.galleries).reduce((acc, gals) => acc + gals.length, 0)}</h3>
                    <p>Galerías Encontradas</p>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>📄 Páginas Extraídas</h2>
            ${Object.entries(extractedData.pages).map(([url, content]) => `
                <div class="page-item">
                    <h3><a href="${url}" target="_blank">${content.title}</a></h3>
                    <p><strong>URL:</strong> ${url}</p>
                    <p><strong>Descripción:</strong> ${content.metaDescription}</p>
                    <p><strong>Imágenes:</strong> ${extractedData.images[url]?.length || 0}</p>
                    <p><strong>Enlaces:</strong> ${content.links.length}</p>
                </div>
            `).join('')}
        </div>

        <div class="section">
            <h2>🖼️ Todas las Imágenes</h2>
            <div class="image-grid">
                ${Object.values(extractedData.images).flat().map(img => `
                    <div class="image-item">
                        <img src="${img.src}" alt="${img.alt}" loading="lazy">
                        <p><small>${img.alt}</small></p>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
</body>
</html>`;

  fs.writeFileSync(path.join('./extracted_content', 'report.html'), reportHtml);
}

// Ejecutar el extractor
async function main() {
  const extractor = new LegacySiteExtractor();
  await extractor.run();
  
  // Generar reporte HTML
  generateHtmlReport(extractor.extractedData);
  
  console.log('📄 Reporte HTML generado en: ./extracted_content/report.html');
}

// Exportar para uso como módulo
module.exports = { LegacySiteExtractor, generateHtmlReport };

// Ejecutar si se llama directamente
if (require.main === module) {
  main().catch(console.error);
}
