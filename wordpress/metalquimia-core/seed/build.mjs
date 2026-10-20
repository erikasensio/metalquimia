/**
 * Genera seed/site.json a partir de content.mjs, separando cada texto L(es, en) por idioma.
 * Uso: node wordpress/metalquimia-core/seed/build.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { images, pages, options, menus } from "./content.mjs";

const languages = ["es", "en"];
const dir = path.dirname(fileURLToPath(import.meta.url));

/** Devuelve el valor en un idioma: resuelve L() y recorre listas y objetos. */
function pick(value, lang) {
  if (Array.isArray(value)) return value.map((v) => pick(v, lang));
  if (value && typeof value === "object") {
    if (value.__l) return value[lang];
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, pick(v, lang)]));
  }
  return value;
}

const byLang = (fn) => Object.fromEntries(languages.map((lang) => [lang, fn(lang)]));

const site = {
  languages,
  images,
  options: byLang((lang) => pick(options, lang)),
  menus: Object.fromEntries(Object.entries(menus).map(([loc, items]) => [loc, byLang((lang) => pick(items, lang))])),
  pages: pages.map(({ key, parent, front, sections = [], ...rest }) => ({
    key,
    ...(parent ? { parent } : {}),
    ...(front ? { front: true } : {}),
    ...byLang((lang) => ({ ...pick(rest[lang] ?? {}, lang), sections: pick(sections, lang) })),
  })),
};

// Comprobaciones: claves de página repetidas, enlaces @page a páginas que no existen y slugs duplicados.
const keys = new Set(site.pages.map((p) => p.key));
if (keys.size !== site.pages.length) throw new Error("Hay claves de página repetidas");
const missing = new Set();
JSON.stringify(site, (_k, v) => {
  if (typeof v === "string" && v.startsWith("@page:") && !keys.has(v.slice(6).split("#")[0])) missing.add(v);
  if (typeof v === "string" && v.startsWith("@img:") && !images[v.slice(5)]) missing.add(v);
  return v;
});
if (missing.size) throw new Error(`Referencias sin destino: ${[...missing].join(", ")}`);

fs.writeFileSync(path.join(dir, "site.json"), JSON.stringify(site, null, 1) + "\n");
console.log(`site.json: ${site.pages.length} páginas, ${Object.keys(images).length} imágenes, ${languages.join("/")}`);
