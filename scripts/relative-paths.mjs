/**
 * Post-build: convierte las rutas absolutas de out/ ("/_next/...", "/icon.svg") en relativas ("./_next/...").
 *
 * Así el sitio funciona:
 *  - al abrir out/index.html directamente (doble clic, file://),
 *  - en la raíz del dominio (public_html) o dentro de una subcarpeta del hosting.
 *
 * Se ejecuta automáticamente después de `next build` (ver "build" en package.json).
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT_DIR = new URL("../out/", import.meta.url);
const ABSOLUTE_REF = /(["'])\/(_next\/|icon\.png|apple-icon\.png|og-image\.png|brand\/)/g;
// El runtime de Turbopack busca los chunks bajo "/_next/" salvo que exista esta variable global.
const CHUNK_BASE = '<script>var TURBOPACK_CHUNK_BASE_PATH="./_next/";</script>';

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "_next") yield* walk(path);
    } else if (/\.(html|txt)$/.test(entry.name)) {
      yield path;
    }
  }
}

let files = 0;
let replacements = 0;
for await (const file of walk(OUT_DIR.pathname.replace(/^\/([A-Za-z]:)/, "$1"))) {
  const original = await readFile(file, "utf8");
  let count = 0;
  let updated = original.replace(ABSOLUTE_REF, (_, quote, rest) => {
    count++;
    return `${quote}./${rest}`;
  });
  if (file.endsWith(".html") && !updated.includes("TURBOPACK_CHUNK_BASE_PATH")) {
    updated = updated.replace(/<head>/, `<head>${CHUNK_BASE}`);
  }
  if (count > 0) {
    await writeFile(file, updated);
    files++;
    replacements += count;
  }
}

console.log(`✓ Rutas relativas: ${replacements} referencias en ${files} archivos de out/`);
