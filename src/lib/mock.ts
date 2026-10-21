import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Global, MenuItem, Page } from "./types";
import { defaultLocale, localizedPath } from "./i18n";

/**
 * Modo sin WordPress (WP_URL=mock): sirve las páginas desde el mismo contenido inicial que
 * importa el plugin (wordpress/metalquimia-core/seed/site.json). Útil para maquetar y para las pruebas.
 */
type Lang = string;
type SeedPage = { key: string; parent?: string; front?: boolean } & Record<Lang, { title: string; slug?: string; sections?: Record<string, unknown>[]; seo_title?: string; seo_description?: string }>;
type SeedImage = { file: string; alt?: Record<Lang, string> };
type SeedMenuItem = Omit<MenuItem, "url" | "image" | "icon" | "children"> & { url?: string; image?: string; icon?: string; children?: SeedMenuItem[] };
type Site = {
  languages: Lang[];
  images: Record<string, SeedImage>;
  options: Record<Lang, Record<string, unknown>>;
  menus: Record<string, Record<Lang, SeedMenuItem[]>>;
  pages: SeedPage[];
};

const seedDir = path.join(process.cwd(), "wordpress/metalquimia-core/seed");

function site(): Site {
  return JSON.parse(fs.readFileSync(path.join(seedDir, "site.json"), "utf8")) as Site;
}

function pagePath(s: Site, key: string, lang: Lang): string {
  const page = s.pages.find((p) => p.key === key);
  if (!page || page.front) return "";
  const own = page[lang]?.slug ?? key;
  return page.parent ? `${pagePath(s, page.parent, lang)}/${own}`.replace(/^\//, "") : own;
}

function resolve(s: Site, value: unknown, lang: Lang): unknown {
  if (typeof value === "string") {
    if (value.startsWith("@img:")) {
      const img = s.images[value.slice(5)];
      if (!img || !fs.existsSync(path.join(seedDir, "images", img.file))) return null;
      return { url: `/api/seed-image/${img.file}`, alt: img.alt?.[lang] ?? "", width: 1600, height: 1200, ...(img.file.endsWith(".mp4") ? { mime: "video/mp4" } : {}) };
    }
    if (value.startsWith("@page:")) {
      const [key, hash] = value.slice(6).split("#");
      return localizedPath(lang, pagePath(s, key, lang)) + (hash ? `#${hash}` : "");
    }
    return value;
  }
  if (Array.isArray(value)) return value.map((v) => resolve(s, v, lang));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolve(s, v, lang)]));
  }
  return value;
}

export function mockPage(lang: Lang, wanted: string): Page | null {
  const s = site();
  const page = s.pages.find((p) => p[lang] && pagePath(s, p.key, lang) === wanted);
  if (!page) return null;
  const data = page[lang];
  return {
    id: s.pages.indexOf(page) + 1,
    lang,
    title: data.title,
    path: wanted,
    seo: { title: data.seo_title ?? "", description: data.seo_description ?? "", image: null },
    sections: (data.sections ?? []).map((section) => resolve(s, section, lang) as Page["sections"][number]),
    translations: s.languages.filter((l) => page[l]).map((l) => ({ lang: l, path: pagePath(s, page.key, l) })),
  };
}

export function mockGlobal(lang: Lang): Global {
  const s = site();
  const menu = (items: SeedMenuItem[] = []): MenuItem[] =>
    items.map((item) => ({
      label: item.label,
      url: String(resolve(s, item.url ?? "#", lang)),
      target: "",
      description: item.description ?? "",
      image: (item.image ? resolve(s, item.image, lang) : null) as MenuItem["image"],
      icon: (item.icon ? resolve(s, item.icon, lang) : null) as MenuItem["icon"],
      highlight: Boolean(item.highlight),
      layout: item.layout ?? "",
      eyebrow: item.eyebrow ?? "",
      title_muted: item.title_muted ?? "",
      title: item.title ?? "",
      link: (item.link ? resolve(s, item.link, lang) : null) as MenuItem["link"],
      children: menu(item.children),
    }));
  const options = (resolve(s, s.options[lang] ?? s.options[defaultLocale] ?? {}, lang) ?? {}) as Record<string, unknown>;
  const strings = Object.fromEntries(((options.strings as { key: string; value: string }[]) ?? []).map((r) => [r.key, r.value]));
  delete options.strings;
  return {
    lang,
    menus: Object.fromEntries(Object.entries(s.menus).map(([loc, byLang]) => [loc, menu(byLang[lang])])),
    options,
    strings,
  };
}

export function mockPaths() {
  const s = site();
  return s.pages.flatMap((p) => s.languages.filter((l) => p[l]).map((lang) => ({ lang, path: pagePath(s, p.key, lang) })));
}
