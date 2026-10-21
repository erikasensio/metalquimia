// Entrada del Worker: envuelve la de OpenNext para servir los medios de WordPress desde KV sin arrancar Next
// y optimizar con Cloudflare Images las imágenes que /_next/image pide de /wp-content/uploads.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- .open-next solo existe tras `opennextjs-cloudflare build`
// @ts-ignore
import { default as openNext } from "./.open-next/worker.js";
import { MEDIA_PREFIX, MEDIA_TTL, getMedia, mediaResponse, type MediaKV } from "./src/lib/media-cache";

type ImagesBinding = {
  input(stream: ReadableStream): {
    transform(options: { width: number }): { output(options: { format: "image/webp"; quality: number }): Promise<{ response(): Response }> };
  };
};
type Env = { MEDIA_KV?: MediaKV; IMAGES?: ImagesBinding };
type Ctx = { waitUntil(promise: Promise<unknown>): void };

// Anchos y calidades por defecto de next/image: limitan las transformaciones únicas (el plan gratuito incluye 5.000/mes).
const WIDTHS = new Set([16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840]);
const QUALITIES = new Set([75]);
const RESIZABLE = new Set(["image/jpeg", "image/png", "image/webp"]);

async function optimizedMedia(url: URL, src: string, env: Required<Env>, ctx: Ctx) {
  const width = Number(url.searchParams.get("w"));
  const quality = Number(url.searchParams.get("q") ?? 75);
  if (!WIDTHS.has(width) || !QUALITIES.has(quality)) return new Response("Invalid image parameters", { status: 400 });

  const path = decodeURIComponent(src.slice(MEDIA_PREFIX.length));
  const key = `_image/${width}/${quality}/${path}`;
  const cached = await getMedia(env.MEDIA_KV, key);
  if (cached) return mediaResponse(cached.body, cached.meta, null, "hit");

  // El original sale de KV o, si aún no está, del route de uploads (que lo descarga de WordPress y lo guarda).
  const original =
    (await getMedia(env.MEDIA_KV, path)) ??
    (await openNext.fetch(new Request(new URL(src, url)), env, ctx).then(async (res: Response) =>
      res.ok ? { body: await res.arrayBuffer(), meta: { type: res.headers.get("Content-Type") ?? "application/octet-stream" } } : null,
    ));
  if (!original) return new Response(null, { status: 404 });
  if (!RESIZABLE.has(original.meta.type)) return mediaResponse(original.body, original.meta, null, "miss");

  try {
    const result = await env.IMAGES.input(new Blob([original.body]).stream())
      .transform({ width })
      .output({ format: "image/webp", quality });
    const body = await result.response().arrayBuffer();
    const meta = { type: "image/webp" };
    ctx.waitUntil(env.MEDIA_KV.put(key, body, { metadata: meta, expirationTtl: MEDIA_TTL }));
    return mediaResponse(body, meta, null, "miss");
  } catch (error) {
    // Sin cuota de transformaciones o formato no admitido: se sirve el original.
    console.warn(`No se pudo optimizar ${src}`, error);
    return mediaResponse(original.body, original.meta, null, "miss");
  }
}

const worker = {
  async fetch(request: Request, env: Env, ctx: Ctx) {
    const url = new URL(request.url);
    if (env.MEDIA_KV && request.method === "GET") {
      if (url.pathname.startsWith(MEDIA_PREFIX)) {
        const cached = await getMedia(env.MEDIA_KV, decodeURIComponent(url.pathname.slice(MEDIA_PREFIX.length)));
        if (cached) return mediaResponse(cached.body, cached.meta, request.headers.get("range"), "hit");
      }
      const src = url.pathname === "/_next/image" ? url.searchParams.get("url") : null;
      if (src?.startsWith(MEDIA_PREFIX) && env.IMAGES) return optimizedMedia(url, src, env as Required<Env>, ctx);
    }
    return openNext.fetch(request, env, ctx);
  },
};

export default worker;
