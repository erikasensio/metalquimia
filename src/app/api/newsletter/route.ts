import { NextResponse } from "next/server";

const WP_URL = (process.env.WP_URL ?? "http://metalquimia.local").replace(/\/$/, "");

/** Alta a la newsletter del pie: valida y la reenvía a WordPress (mq/v1/newsletter), que avisa por email. */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { email?: string; lang?: string; website?: string } | null;
  const email = String(body?.email ?? "").trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ ok: false }, { status: 400 });
  // Campo trampa para bots: si viene relleno se responde bien sin hacer nada.
  if (body?.website) return NextResponse.json({ ok: true });
  if (WP_URL === "mock") return NextResponse.json({ ok: true });

  const res = await fetch(`${WP_URL}/wp-json/mq/v1/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, lang: body?.lang ?? "" }),
  }).catch(() => null);
  return NextResponse.json({ ok: Boolean(res?.ok) }, { status: res?.ok ? 200 : 502 });
}
