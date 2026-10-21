// Copia en KV de /wp-content/uploads mientras WordPress va por Live Link: el túnel llega hasta el portátil y tarda segundos por archivo.
// La usan worker.ts (aciertos, sin arrancar Next) y el route de uploads (fallos: descarga de WordPress y guarda).

export const MEDIA_PREFIX = "/wp-content/uploads/";
export const MEDIA_TTL = 60 * 60 * 24 * 30;
// Límite de valor de KV (25 MiB); lo que pase de ahí se reenvía sin guardar.
export const MEDIA_MAX = 25 * 1024 * 1024;

export type MediaMeta = { type: string; etag?: string; lastModified?: string };
export type MediaKV = {
  getWithMetadata<M>(key: string, options: { type: "arrayBuffer"; cacheTtl?: number }): Promise<{ value: ArrayBuffer | null; metadata: M | null }>;
  put(key: string, value: ArrayBuffer, options: { metadata: MediaMeta; expirationTtl: number }): Promise<void>;
};

export async function getMedia(kv: MediaKV, key: string) {
  const { value, metadata } = await kv.getWithMetadata<MediaMeta>(key, { type: "arrayBuffer", cacheTtl: 86400 });
  return value && metadata ? { body: value, meta: metadata } : null;
}

/** Respuesta con soporte de rangos: sin ellos el navegador no deja saltar a otro punto del vídeo del Hero. */
export function mediaResponse(body: ArrayBuffer, meta: MediaMeta, range: string | null, cache: "hit" | "miss") {
  const headers = new Headers({
    "X-Media-Cache": cache,
    "Content-Type": meta.type,
    "Cache-Control": "public, max-age=604800, stale-while-revalidate=2592000",
    "Accept-Ranges": "bytes",
  });
  if (meta.etag) headers.set("ETag", meta.etag);
  if (meta.lastModified) headers.set("Last-Modified", meta.lastModified);

  const size = body.byteLength;
  const match = range && /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  if (match && (match[1] || match[2])) {
    // "bytes=-N" pide los últimos N bytes.
    const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
    const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
    if (start > end || start >= size) {
      return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
    }
    headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
    headers.set("Content-Length", String(end - start + 1));
    return new Response(body.slice(start, end + 1), { status: 206, headers });
  }
  headers.set("Content-Length", String(size));
  return new Response(body, { headers });
}
