import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseArgs(argv) {
  const args = {
    legacyDir: "futbolinclusivo_recorrido",
    outFile: "public/legacy/legacy-content.json",
    appDir: "src/app",
    limitNews: 500,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--legacy-dir") args.legacyDir = argv[++i];
    else if (a === "--out") args.outFile = argv[++i];
    else if (a === "--app-dir") args.appDir = argv[++i];
    else if (a === "--limit-news") args.limitNews = Number(argv[++i] ?? args.limitNews);
    else if (a === "--help" || a === "-h") {
      console.log(
        [
          "Extrae contenido del sitio viejo (noticias, multimedia) a JSON.",
          "",
          "Uso:",
          "  node scripts/extract-legacy-content.mjs",
          "",
          "Opciones:",
          "  --legacy-dir <dir>   Carpeta con HTML (default: futbolinclusivo_recorrido)",
          "  --out <file>         Archivo destino (default: public/legacy/legacy-content.json)",
          "  --app-dir <dir>      Carpeta App Router (default: src/app)",
          "  --limit-news <n>     Máximo de noticias a exportar (default: 500)",
        ].join("\n")
      );
      process.exit(0);
    }
  }
  if (!Number.isFinite(args.limitNews) || args.limitNews < 1) args.limitNews = 500;
  return args;
}

async function listFilesRecursively(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await listFilesRecursively(p)));
    else out.push(p);
  }
  return out;
}

function normText(s) {
  return String(s ?? "")
    .replace(/\s+/g, " ")
    .replace(/\u00a0/g, " ")
    .trim();
}

function uniqBy(arr, keyFn) {
  const seen = new Set();
  const out = [];
  for (const item of arr) {
    const k = keyFn(item);
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(item);
  }
  return out;
}

function isVideoUrl(u) {
  const s = String(u ?? "").toLowerCase();
  return (
    s.includes("youtube.com/") ||
    s.includes("youtu.be/") ||
    s.includes("vimeo.com/") ||
    s.includes("facebook.com/plugins/video") ||
    s.includes("player.vimeo.com/")
  );
}

function extractVideoUrlsFromHtml(html) {
  const $ = load(html);
  const urls = new Set();

  $("iframe").each((_, el) => {
    const src = $(el).attr("src");
    if (src && isVideoUrl(src)) urls.add(src);
  });

  $("video source, video").each((_, el) => {
    const src = $(el).attr("src");
    if (src) urls.add(src);
  });

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (href && isVideoUrl(href)) urls.add(href);
  });

  return [...urls].map((u) => u.trim()).filter(Boolean);
}

function extractNewsListFromHtml(html, sourceFileRel) {
  const $ = load(html);
  const news = [];

  $("article.news-inner").each((_, el) => {
    const $el = $(el);
    const link = $el.find("h3.entry-title a").attr("href") || "";
    const title = normText($el.find("h3.entry-title a").text());
    const excerpt = normText($el.find(".entry-summary p").text());
    const date = normText($el.find(".post-date").text().replace(/^\s*[\s\S]*?(\d)/, "$1"));
    const category = normText($el.find(".post-category a").first().text());
    const categoryUrl = $el.find(".post-category a").first().attr("href") || "";
    const image =
      $el.find(".news-img img").attr("src") ||
      $el.find("img.wp-post-image").attr("src") ||
      "";

    if (!title && !link) return;
    news.push({
      title,
      link,
      excerpt,
      date,
      category,
      categoryUrl,
      image,
      source: sourceFileRel,
    });
  });

  return news;
}

async function readMaybe(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

function deriveLegacySlugFromLink(link) {
  try {
    const u = new URL(link);
    const p = u.pathname.replace(/\/+$/, "");
    const last = p.split("/").filter(Boolean).pop();
    return last || null;
  } catch {
    return null;
  }
}

async function extractInstitutionalTextFromExtractedJson(jsonPath, prefix) {
  const raw = await readMaybe(jsonPath);
  if (!raw) return null;
  const data = JSON.parse(raw);

  const pages = {};
  for (const [k, v] of Object.entries(data)) {
    if (!k.startsWith(prefix)) continue;
    const textNodes = Array.isArray(v?.textNodes) ? v.textNodes : [];
    const images = Array.isArray(v?.images) ? v.images : [];
    const text = textNodes.map((n) => normText(n?.text)).filter(Boolean);
    pages[k] = { text, images };
  }
  return pages;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const repoRoot = path.resolve(__dirname, "..");

  const legacyDirAbs = path.resolve(repoRoot, args.legacyDir);
  const outAbs = path.resolve(repoRoot, args.outFile);
  const appDirAbs = path.resolve(repoRoot, args.appDir);

  const legacyFiles = (await listFilesRecursively(legacyDirAbs)).filter((p) => p.toLowerCase().endsWith(".txt"));
  const legacyRelFiles = legacyFiles.map((f) => path.relative(repoRoot, f).replaceAll("\\", "/"));

  // Noticias (listado)
  const newsSourceAbs = path.join(legacyDirAbs, "Novedades", "novedades_source.txt");
  const newsHtml = await readMaybe(newsSourceAbs);
  let news = [];
  if (newsHtml) {
    const rel = path.relative(repoRoot, newsSourceAbs).replaceAll("\\", "/");
    news = extractNewsListFromHtml(newsHtml, rel).slice(0, args.limitNews);
    news = uniqBy(news, (n) => n.link || `${n.title}|${n.date}`);
    // agrega slug deducido
    news = news.map((n) => ({ ...n, slug: deriveLegacySlugFromLink(n.link) }));
  }

  // Multimedia / videos (escaneo global)
  const videos = [];
  for (const f of legacyFiles) {
    const html = await fs.readFile(f, "utf8");
    const rel = path.relative(repoRoot, f).replaceAll("\\", "/");
    const urls = extractVideoUrlsFromHtml(html);
    for (const u of urls) videos.push({ url: u, source: rel });
  }
  const videosUniq = uniqBy(videos, (v) => v.url);

  // Cobertura institucional: qué existe en legado vs qué rutas tiene Next
  const legacyTopSections = new Set(
    legacyRelFiles
      .map((p) => p.split("/")[1]) // futbolinclusivo_recorrido/<section>/...
      .filter(Boolean)
  );

  const appPages = (await listFilesRecursively(appDirAbs))
    .filter((p) => p.endsWith(`${path.sep}page.js`))
    .map((p) => path.relative(appDirAbs, p).replaceAll("\\", "/"));

  const appTopRoutes = new Set(appPages.map((p) => p.split("/")[0]).filter(Boolean));

  // Mapeo simple: legado → ruta actual esperada
  const expectedRouteForLegacy = {
    Inicio: "",
    Novedades: "novedades",
    Multimedia: "multimedia",
    Contacto: "contacto",
    Nosotros: "institucional",
    "Liga-BA": "programas",
    "Liga-Nacional": "programas",
    Escuela: "programas",
    "Festival LATAM": "programas",
    Sumate: "sumate",
  };

  const legacyCoverage = [];
  for (const s of [...legacyTopSections].sort()) {
    const expected = expectedRouteForLegacy[s] ?? null;
    const exists =
      expected === "" ? appPages.includes("page.js") : expected ? appTopRoutes.has(expected) : false;
    legacyCoverage.push({ legacySection: s, expectedTopRoute: expected, presentInApp: exists });
  }

  // Detalle “Nosotros” subpáginas (legado) vs app actual
  const nosotrosLegacy = legacyRelFiles.filter((p) => p.startsWith("futbolinclusivo_recorrido/Nosotros/"));
  const nosotrosLegacySlugs = new Set(
    nosotrosLegacy
      .map((p) => p.split("/").slice(2, -1).join("/"))
      .filter(Boolean)
  );
  const institucionalApp = appPages.filter((p) => p.startsWith("institucional/"));
  const institucionalSlugs = new Set(
    institucionalApp
      .map((p) => p.replace(/\/page\.js$/, ""))
      .filter(Boolean)
  );

  const missingInstitucional = [...nosotrosLegacySlugs]
    .filter((s) => !institucionalSlugs.has(`institucional/${s}`))
    .sort();

  // Opcional: texto institucional ya “extraído” (no tablas), desde synapse JSON
  const extractedJsonPath = path.join(repoRoot, ".synapse", "extracted_content.json");
  const institutionalExtract = await extractInstitutionalTextFromExtractedJson(
    extractedJsonPath,
    "Nosotros\\"
  );

  const payload = {
    generatedAt: new Date().toISOString(),
    legacy: {
      dir: path.relative(repoRoot, legacyDirAbs).replaceAll("\\", "/"),
      files: legacyRelFiles.length,
      sections: [...legacyTopSections].sort(),
    },
    app: {
      dir: path.relative(repoRoot, appDirAbs).replaceAll("\\", "/"),
      pages: appPages.length,
      topRoutes: [...appTopRoutes].sort(),
    },
    news: {
      source: newsHtml
        ? path.relative(repoRoot, newsSourceAbs).replaceAll("\\", "/")
        : null,
      count: news.length,
      items: news,
    },
    multimedia: {
      videos: {
        count: videosUniq.length,
        items: videosUniq,
      },
    },
    coverage: {
      legacySections: legacyCoverage,
      missingInstitucionalFromLegacy: missingInstitucional,
    },
    institutionalExtract: institutionalExtract ? { pages: institutionalExtract } : null,
  };

  await fs.mkdir(path.dirname(outAbs), { recursive: true });
  await fs.writeFile(outAbs, JSON.stringify(payload, null, 2), "utf8");

  console.log(`Noticias: ${news.length}`);
  console.log(`Videos detectados (URLs únicas): ${videosUniq.length}`);
  console.log(`Reporte generado en: ${path.relative(repoRoot, outAbs)}`);
  if (missingInstitucional.length) {
    console.log(`Faltan subpáginas institucionales (según legado): ${missingInstitucional.length}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

