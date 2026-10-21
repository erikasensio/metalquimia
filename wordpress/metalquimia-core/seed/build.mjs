/**
 * Genera seed/site.json a partir de content.mjs, separando cada texto L(es, en) por idioma.
 * El catalán y el alemán salen de i18n.json: cada texto se busca por su pareja español + inglés
 * (el mismo texto en inglés puede traducirse distinto según la página). Si falta alguno, no se genera.
 * Uso: node wordpress/metalquimia-core/seed/build.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { images, pages, options, menus } from "./content.mjs";

const languages = ["en", "es", "ca", "de"];
const dir = path.dirname(fileURLToPath(import.meta.url));

const i18n = JSON.parse(fs.readFileSync(path.join(dir, "i18n.json"), "utf8"));
const pair = (es, en) => `${es}\u0000${en}`;
const dictionary = new Map(i18n.strings.map((t) => [pair(t.es, t.en), t]));
const untranslated = new Set();

/** Texto de un L() en un idioma: es y en (y a veces ca/de) vienen en content.mjs; el resto, del diccionario. */
function translate(value, lang) {
  if (lang in value) return value[lang];
  const found = dictionary.get(pair(value.es, value.en))?.[lang];
  if (found === undefined) untranslated.add(`[${lang}] ${value.en}`);
  return found ?? value.en;
}

/** Devuelve el valor en un idioma: resuelve L() y recorre listas y objetos. */
function pick(value, lang) {
  if (Array.isArray(value)) return value.map((v) => pick(v, lang));
  if (value && typeof value === "object") {
    if (value.__l) return translate(value, lang);
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, pick(v, lang)]));
  }
  return value;
}

const byLang = (fn) => Object.fromEntries(languages.map((lang) => [lang, fn(lang)]));

const site = {
  languages,
  images: Object.fromEntries(
    Object.entries(images).map(([key, image]) => [key, { ...image, alt: byLang((lang) => translate({ __l: true, ...image.alt }, lang)) }]),
  ),
  options: byLang((lang) => pick(options, lang)),
  menus: Object.fromEntries(Object.entries(menus).map(([loc, items]) => [loc, byLang((lang) => pick(items, lang))])),
  pages: pages.map(({ key, parent, front, sections = [], ...rest }) => ({
    key,
    ...(parent ? { parent } : {}),
    ...(front ? { front: true } : {}),
    ...byLang((lang) => ({ ...pick(rest[lang] ?? i18n.pages[key]?.[lang] ?? {}, lang), sections: pick(sections, lang) })),
  })),
};

if (untranslated.size) throw new Error(`Faltan traducciones en i18n.json:\n${[...untranslated].join("\n")}`);
const noMeta = site.pages.filter((p) => languages.some((lang) => !p[lang]?.title)).map((p) => p.key);
if (noMeta.length) throw new Error(`Páginas sin título en algún idioma (i18n.json › pages): ${noMeta.join(", ")}`);

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
