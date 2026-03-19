import fs from "node:fs/promises";
import path from "node:path";

let cached = null;

async function readJson(relPath) {
  const abs = path.join(process.cwd(), relPath);
  const raw = await fs.readFile(abs, "utf8");
  return JSON.parse(raw);
}

export async function getLegacyContent() {
  if (cached) return cached;

  const [content, assets] = await Promise.all([
    readJson("public/legacy/legacy-content.json"),
    readJson("public/legacy/legacy-assets-map.json"),
  ]);

  cached = { content, assets };
  return cached;
}

export function mapLegacyImage(urlToLocal, remoteUrl) {
  if (!remoteUrl) return null;
  return urlToLocal?.[remoteUrl] ?? remoteUrl;
}

