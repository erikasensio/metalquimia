import fs from "node:fs/promises";
import path from "node:path";

const types: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".mp4": "video/mp4" };

/** Solo en modo sin WordPress (WP_URL=mock): sirve las imágenes del contenido inicial. */
export async function GET(req: Request, { params }: { params: Promise<{ file: string }> }) {
  if (process.env.WP_URL !== "mock") return new Response(null, { status: 404 });
  const { file } = await params;
  const safe = path.basename(file);
  try {
    const data = await fs.readFile(path.join(process.cwd(), "wordpress/metalquimia-core/seed/images", safe));
    const type = types[path.extname(safe).toLowerCase()] ?? "application/octet-stream";
    // Rangos de bytes: sin ellos el navegador no deja saltar a otro punto de un vídeo (vídeo del Hero).
    const range = req.headers.get("range")?.match(/bytes=(\d*)-(\d*)/);
    if (range) {
      const start = range[1] ? Number(range[1]) : Math.max(0, data.length - Number(range[2]));
      const end = range[1] && range[2] ? Math.min(Number(range[2]), data.length - 1) : data.length - 1;
      return new Response(new Uint8Array(data.subarray(start, end + 1)), {
        status: 206,
        headers: { "Content-Type": type, "Accept-Ranges": "bytes", "Content-Range": `bytes ${start}-${end}/${data.length}`, "Content-Length": String(end - start + 1) },
      });
    }
    return new Response(new Uint8Array(data), { headers: { "Content-Type": type, "Accept-Ranges": "bytes" } });
  } catch {
    return new Response(null, { status: 404 });
  }
}
