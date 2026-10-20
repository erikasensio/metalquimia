"use client";

import { useState, type FormEvent } from "react";
import { Play } from "@phosphor-icons/react";

type Props = { lang: string; label: string; placeholder: string; termsHtml: string; success: string; submitLabel: string };

/** Alta a la newsletter del pie: email + aceptación. Se envía a /api/newsletter. */
export function NewsletterForm({ lang, label, placeholder, termsHtml, success, submitLabel }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, email: data.get("email"), website: data.get("website") }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") return <p className="text-body-s text-light-grey" role="status">{success}</p>;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3" data-newsletter>
      <label htmlFor="newsletter-email" className="font-mono text-[0.75rem] uppercase text-grey">
        {label}
      </label>
      <div className="flex h-10 w-full max-w-[300px] items-center bg-black-grey pl-3 pr-1">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-body-s text-white placeholder:text-grey focus:outline-none"
        />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <button
          type="submit"
          aria-label={submitLabel}
          disabled={state === "sending"}
          className="flex size-8 items-center justify-center bg-white text-black transition-colors hover:bg-red hover:text-white disabled:opacity-50"
        >
          <Play size={12} weight="fill" />
        </button>
      </div>
      {termsHtml && (
        <label className="flex items-start gap-2 text-body-xs text-grey">
          <input type="checkbox" required className="mt-0.5 accent-red" />
          <span className="[&_a]:underline" dangerouslySetInnerHTML={{ __html: termsHtml.replace(/<\/?p>/g, "") }} />
        </label>
      )}
      {state === "error" && <p className="text-body-xs text-red">Error</p>}
    </form>
  );
}
