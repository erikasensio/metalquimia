import "server-only";
import type { Global, Page } from "./types";

const WP_URL = (process.env.WP_URL ?? "http://metalquimia.local").replace(/\/$/, "");

/** Etiquetas de caché que el plugin de WordPress invalida al guardar. */
export const tags = {
  page: (lang: string, path: string) => `page:${lang}:${path || "/"}`,
  global: (lang: string) => `global:${lang}`,
  all: "wp",
};

async function wpFetch<T>(endpoint: string, params: Record<string, string>, cacheTags: string[]): Promise<T | null> {
  const url = new URL(`${WP_URL}/wp-json/mq/v1/${endpoint}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  try {
    const res = await fetch(url, { next: { tags: [tags.all, ...cacheTags], revalidate: 3600 } });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return (await res.json()) as T;
  } catch (error) {
    console.error(`[wp] ${url.toString()}:`, error);
    return null;
  }
}

export async function getPage(lang: string, path: string): Promise<Page | null> {
  if (WP_URL === "mock") return (await import("./mock")).mockPage(lang, path);
  return wpFetch<Page>("page", { lang, path }, [tags.page(lang, path)]);
}

export async function getGlobal(lang: string): Promise<Global | null> {
  if (WP_URL === "mock") return (await import("./mock")).mockGlobal(lang);
  return wpFetch<Global>("global", { lang }, [tags.global(lang)]);
}

/** Texto de la interfaz editable desde WordPress, con un valor por defecto si aún no existe. */
export function t(global: Global | null, key: string, fallback: string): string {
  return global?.strings?.[key] || fallback;
}
