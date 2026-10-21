import "server-only";
import { wpAuthHeaders } from "@/lib/wp";

const WP_URL = (process.env.WP_URL ?? "http://metalquimia.local").replace(/\/$/, "");

/** Solo con WP_AUTH: reenvía los medios de un WordPress protegido con contraseña. */
export async function GET(request: Request, { params }: RouteContext<"/wp-content/uploads/[...path]">) {
  if (!process.env.WP_AUTH) return new Response("Not found", { status: 404 });

  const { path } = await params;
  // Rangos de bytes: sin ellos el navegador no deja saltar a otro punto de un vídeo sin tenerlo en caché (vídeo del Hero).
  const range = request.headers.get("range");
  const res = await fetch(`${WP_URL}/wp-content/uploads/${path.map(encodeURIComponent).join("/")}`, {
    headers: { ...wpAuthHeaders, ...(range ? { Range: range } : {}) },
  });
  if (!res.ok) return new Response(null, { status: res.status });

  const headers = new Headers({
    "Content-Type": res.headers.get("Content-Type") ?? "application/octet-stream",
    "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    "Accept-Ranges": "bytes",
  });
  for (const name of ["Content-Length", "Content-Range", "ETag", "Last-Modified"]) {
    const value = res.headers.get(name);
    if (value) headers.set(name, value);
  }
  return new Response(res.body, { status: res.status, headers });
}
