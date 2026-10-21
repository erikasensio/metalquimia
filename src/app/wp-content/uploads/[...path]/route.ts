import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { MEDIA_MAX, MEDIA_TTL, getMedia, mediaResponse, type MediaKV, type MediaMeta } from "@/lib/media-cache";
import { wpAuthHeaders } from "@/lib/wp";

const WP_URL = (process.env.WP_URL ?? "http://metalquimia.local").replace(/\/$/, "");

/** Solo con WP_AUTH: reenvía los medios de un WordPress protegido con contraseña y los guarda en KV. */
export async function GET(request: Request, { params }: RouteContext<"/wp-content/uploads/[...path]">) {
  if (!process.env.WP_AUTH) return new Response("Not found", { status: 404 });

  const { path } = await params;
  const key = path.join("/");
  const range = request.headers.get("range");
  const { env, ctx } = getCloudflareContext();
  const kv = (env as { MEDIA_KV?: MediaKV }).MEDIA_KV;

  // En producción worker.ts ya sirve los aciertos; aquí llegan en `next dev`.
  const cached = kv && (await getMedia(kv, key));
  if (cached) return mediaResponse(cached.body, cached.meta, range, "hit");

  const res = await fetch(`${WP_URL}/wp-content/uploads/${path.map(encodeURIComponent).join("/")}`, { headers: wpAuthHeaders });
  if (!res.ok) return new Response(null, { status: res.status });

  const meta: MediaMeta = {
    type: res.headers.get("Content-Type") ?? "application/octet-stream",
    etag: res.headers.get("ETag") ?? undefined,
    lastModified: res.headers.get("Last-Modified") ?? undefined,
  };
  const body = await res.arrayBuffer();
  if (kv && body.byteLength <= MEDIA_MAX) ctx.waitUntil(kv.put(key, body, { metadata: meta, expirationTtl: MEDIA_TTL }));
  return mediaResponse(body, meta, range, "miss");
}
