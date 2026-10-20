import fs from "node:fs/promises";
import path from "node:path";

const types: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".mp4": "video/mp4" };

/** Solo en modo sin WordPress (WP_URL=mock): sirve las imágenes del contenido inicial. */
export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  if (process.env.WP_URL !== "mock") return new Response(null, { status: 404 });
  const { file } = await params;
  const safe = path.basename(file);
  try {
    const data = await fs.readFile(path.join(process.cwd(), "wordpress/metalquimia-core/seed/images", safe));
    return new Response(new Uint8Array(data), { headers: { "Content-Type": types[path.extname(safe).toLowerCase()] ?? "application/octet-stream" } });
  } catch {
    return new Response(null, { status: 404 });
  }
}
