export const locales = (process.env.NEXT_PUBLIC_LOCALES ?? "es,en")
  .split(",")
  .map((l) => l.trim())
  .filter(Boolean);

export const defaultLocale = locales[0];

export function isLocale(value: string): boolean {
  return locales.includes(value);
}

/** Ruta pública: el idioma por defecto va sin prefijo (/contacto), el resto con él (/en/contact). */
export function localizedPath(lang: string, path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  if (lang === defaultLocale) return `/${clean}`;
  return clean ? `/${lang}/${clean}` : `/${lang}`;
}
