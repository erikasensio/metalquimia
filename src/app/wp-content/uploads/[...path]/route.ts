import "server-only";
import { wpAuthHeaders } from "@/lib/wp";

const WP_URL = (process.env.WP_URL ?? "http://metalquimia.local").replace(/\/$/, "");

/** Solo con WP_AUTH: reenvía los medios de un WordPress protegido con contraseña. */
export async function GET(_request: Request, { params }: RouteContext<"/wp-content/uploads/[...path]">) {
  if (!process.env.WP_AUTH) return new Response("Not found", { status: 404 });

  const { path } = await params;
  const res = await fetch(`${WP_URL}/wp-content/uploads/${path.map(encodeURIComponent).join("/")}`, { headers: wpAuthHeaders });
  if (!res.ok) return new Response(null, { status: res.status });

  return new Response(res.body, {
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "application/octet-stream",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
