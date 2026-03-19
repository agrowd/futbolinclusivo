import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseArgs(argv) {
  const args = {
    input: "futbolinclusivo_recorrido",
    out: "public/legacy",
    concurrency: 6,
    timeoutMs: 25000,
    retries: 2,
    includeJson: true,
    dryRun: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--input") args.input = argv[++i];
    else if (a === "--out") args.out = argv[++i];
    else if (a === "--concurrency") args.concurrency = Number(argv[++i] ?? args.concurrency);
    else if (a === "--timeout") args.timeoutMs = Number(argv[++i] ?? args.timeoutMs);
    else if (a === "--retries") args.retries = Number(argv[++i] ?? args.retries);
    else if (a === "--no-json") args.includeJson = false;
    else if (a === "--dry-run") args.dryRun = true;
    else if (a === "--help" || a === "-h") {
      console.log(
        [
          "Descarga imágenes del sitio viejo y genera un mapa URL→archivo local.",
          "",
          "Uso:",
          "  node scripts/download-legacy-assets.mjs --input futbolinclusivo_recorrido --out public/legacy",
          "",
          "Opciones:",
          "  --input <dir>        Directorio con HTML del sitio viejo (default: futbolinclusivo_recorrido)",
          "  --out <dir>          Directorio destino (default: public/legacy)",
          "  --concurrency <n>    Descargas paralelas (default: 6)",
          "  --timeout <ms>       Timeout por request (default: 25000)",
          "  --retries <n>        Reintentos por URL (default: 2)",
          "  --no-json            No lee /.synapse/extracted_content.json",
          "  --dry-run            No descarga, solo lista y genera mapa",
        ].join("\n")
      );
      process.exit(0);
    }
  }

  if (!Number.isFinite(args.concurrency) || args.concurrency < 1) args.concurrency = 6;
  if (!Number.isFinite(args.timeoutMs) || args.timeoutMs < 1000) args.timeoutMs = 25000;
  if (!Number.isFinite(args.retries) || args.retries < 0) args.retries = 2;

  return args;
}

function isHttpUrl(u) {
  try {
    const url = new URL(u);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function sha1(s) {
  return crypto.createHash("sha1").update(s).digest("hex");
}

function extFromUrl(u) {
  try {
    const url = new URL(u);
    const p = url.pathname.toLowerCase();
    const ext = path.extname(p);
    if (ext && ext.length <= 5) return ext;
  } catch {
    // ignore
  }
  return "";
}

function normalizeUrl(u) {
  // elimina tracking de weserv o similares si aparecen, pero conserva la URL como clave original
  return u.trim();
}

function shouldSkipUrl(u) {
  const s = u.toLowerCase();
  if (!isHttpUrl(u)) return true;
  if (s.includes("accesspress-social-pro/images/share/ajax-loader.gif")) return true;
  return false;
}

async function listFilesRecursively(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await listFilesRecursively(p)));
    } else {
      out.push(p);
    }
  }
  return out;
}

function extractImageUrlsFromHtml(html) {
  const $ = load(html);
  const urls = new Set();

  $("img").each((_, el) => {
    const src = $(el).attr("src");
    const srcset = $(el).attr("srcset");
    if (src) urls.add(src);
    if (srcset) {
      // srcset: "url1 960w, url2 480w"
      for (const part of srcset.split(",")) {
        const token = part.trim().split(/\s+/)[0];
        if (token) urls.add(token);
      }
    }
  });

  // también aparecen como og:image, twitter:image
  const metaProps = ["og:image", "twitter:image", "twitter:image:src"];
  for (const p of metaProps) {
    const v = $(`meta[property="${p}"], meta[name="${p}"]`).attr("content");
    if (v) urls.add(v);
  }

  return [...urls].map(normalizeUrl).filter((u) => !shouldSkipUrl(u));
}

async function extractFromExtractedContentJson(jsonPath) {
  const raw = await fs.readFile(jsonPath, "utf8");
  const data = JSON.parse(raw);
  const urls = new Set();
  for (const k of Object.keys(data)) {
    const images = data[k]?.images;
    if (Array.isArray(images)) {
      for (const u of images) {
        if (typeof u === "string") urls.add(normalizeUrl(u));
      }
    }
  }
  return [...urls].filter((u) => !shouldSkipUrl(u));
}

function buildLocalPathForUrl(outDir, url) {
  const ext = extFromUrl(url) || ".bin";
  const basename = `${sha1(url)}${ext}`;
  return path.join(outDir, "images", basename);
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "user-agent": "futbolinclusivo-legacy-downloader/1.0",
      },
    });
    return res;
  } finally {
    clearTimeout(t);
  }
}

async function downloadOne({ url, destPath, timeoutMs, retries }) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetchWithTimeout(url, timeoutMs);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const ab = await res.arrayBuffer();
      const buf = Buffer.from(ab);
      await ensureDir(path.dirname(destPath));
      await fs.writeFile(destPath, buf);
      return { ok: true };
    } catch (e) {
      if (attempt === retries) return { ok: false, error: String(e?.message ?? e) };
      await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
    }
  }
  return { ok: false, error: "unknown" };
}

async function runPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let idx = 0;

  async function next() {
    while (true) {
      const myIdx = idx++;
      if (myIdx >= items.length) return;
      results[myIdx] = await worker(items[myIdx], myIdx);
    }
  }

  const runners = Array.from({ length: concurrency }, () => next());
  await Promise.all(runners);
  return results;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const repoRoot = path.resolve(__dirname, "..");

  const inputDir = path.resolve(repoRoot, args.input);
  const outDir = path.resolve(repoRoot, args.out);
  const mapPath = path.join(outDir, "legacy-assets-map.json");

  const allUrls = new Set();
  const sources = {};

  // HTML del recorrido
  const files = (await listFilesRecursively(inputDir)).filter((p) => p.toLowerCase().endsWith(".txt"));
  for (const f of files) {
    const html = await fs.readFile(f, "utf8");
    const urls = extractImageUrlsFromHtml(html);
    if (urls.length) {
      const rel = path.relative(repoRoot, f).replaceAll("\\", "/");
      sources[rel] = urls;
      for (const u of urls) allUrls.add(u);
    }
  }

  // JSON extraído (opcional)
  if (args.includeJson) {
    const jsonPath = path.resolve(repoRoot, ".synapse", "extracted_content.json");
    try {
      const urls = await extractFromExtractedContentJson(jsonPath);
      sources[".synapse/extracted_content.json"] = urls;
      for (const u of urls) allUrls.add(u);
    } catch {
      // si no existe o está corrupto, seguimos solo con HTML
    }
  }

  const urls = [...allUrls];
  urls.sort();

  await ensureDir(outDir);

  const urlToLocal = {};
  const failures = [];

  for (const u of urls) {
    const localAbs = buildLocalPathForUrl(outDir, u);
    const localRel = path.relative(path.resolve(repoRoot, "public"), localAbs).replaceAll("\\", "/");
    urlToLocal[u] = `/${localRel}`;
  }

  if (!args.dryRun) {
    await runPool(
      urls,
      args.concurrency,
      async (u) => {
        const destAbs = buildLocalPathForUrl(outDir, u);
        try {
          // evita re-descargar si ya existe
          await fs.access(destAbs);
          return { url: u, skipped: true };
        } catch {
          const r = await downloadOne({
            url: u,
            destPath: destAbs,
            timeoutMs: args.timeoutMs,
            retries: args.retries,
          });
          if (!r.ok) failures.push({ url: u, error: r.error });
          return { url: u, ok: r.ok };
        }
      }
    );
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    input: path.relative(repoRoot, inputDir).replaceAll("\\", "/"),
    out: path.relative(repoRoot, outDir).replaceAll("\\", "/"),
    counts: {
      urls: urls.length,
      failures: failures.length,
      sources: Object.keys(sources).length,
    },
    urlToLocal,
    failures,
    sources,
  };

  await fs.writeFile(mapPath, JSON.stringify(payload, null, 2), "utf8");

  console.log(`Encontradas ${urls.length} URLs de imágenes.`);
  console.log(`Mapa generado en: ${path.relative(repoRoot, mapPath)}`);
  if (failures.length) {
    console.log(`Fallaron ${failures.length} descargas (ver failures en el JSON).`);
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

