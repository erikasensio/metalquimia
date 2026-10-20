import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

/**
 * WordPress (plugin metalquimia-core) llama aquí al guardar una página o los ajustes globales:
 * POST /api/revalidate  { "secret": "...", "tags": ["page:es:contacto", "global:es"] }
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as { secret?: string; tags?: string[] };

  if (!process.env.REVALIDATE_SECRET || body.secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ ok: false, error: "invalid secret" }, { status: 401 });
  }

  const tags = Array.isArray(body.tags) && body.tags.length ? body.tags : ["wp"];
  for (const tag of tags) revalidateTag(tag, { expire: 0 });

  return Response.json({ ok: true, tags });
}
