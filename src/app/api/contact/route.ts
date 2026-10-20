import type { NextRequest } from "next/server";

const FIELDS = ["name", "company", "address", "home_address", "postal_code", "country", "phone", "email", "message"] as const;

/**
 * Formulario de contacto (<ContactForm>): valida y reenvía a WordPress, que manda el email.
 * POST /api/contact  { lang, name, email, message, terms, marketing, website, … }
 */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") return Response.json({ ok: false, error: "invalid" }, { status: 400 });

  const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const data: Record<string, string | boolean> = { lang: str(body.lang, 10), website: str(body.website), terms: body.terms === true, marketing: body.marketing === true };
  for (const key of FIELDS) data[key] = str(body[key], key === "message" ? 5000 : 500);

  // Bots: el campo oculto llega relleno → se responde ok sin enviar nada.
  if (data.website) return Response.json({ ok: true });

  const email = data.email as string;
  if (!data.name || !data.message || !data.terms || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const wpUrl = (process.env.WP_URL ?? "http://metalquimia.local").replace(/\/$/, "");
  if (wpUrl === "mock") return Response.json({ ok: true });

  try {
    const res = await fetch(`${wpUrl}/wp-json/mq/v1/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
    if (!res.ok || !json.ok) return Response.json({ ok: false, error: "upstream" }, { status: 502 });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact]", error);
    return Response.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
