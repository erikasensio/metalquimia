"use client";

import { useState, type FormEvent } from "react";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { useStrings } from "@/components/ui/Strings";

type Props = { lang: string; label: string; placeholder: string; termsHtml: string; success: string; submitLabel: string };

/** Alta a la newsletter del pie: email + aceptación. Se envía a /api/newsletter. */
export function NewsletterForm({ lang, label, placeholder, termsHtml, success, submitLabel }: Props) {
  const { t } = useStrings();
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
      <label htmlFor="newsletter-email" className="font-mono text-[0.875rem] uppercase leading-none tracking-[0.02em] text-grey">
        {label}
      </label>
      {/* Figma: caja de cristal #444 al 50 % con esquinas de 8 px y botón blanco cuadrado de 40 px. */}
      <div className="glass flex w-full max-w-[370px] items-center gap-2 rounded-lg bg-dark-grey/50 py-1 pl-4 pr-1">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder={placeholder}
          className="text-title-xs min-w-0 flex-1 bg-transparent text-light-grey placeholder:text-grey focus:outline-none"
        />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <button
          type="submit"
          aria-label={submitLabel}
          disabled={state === "sending"}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-white text-black transition-colors hover:bg-red hover:text-white disabled:opacity-50"
        >
          <PaperPlaneRight size={16} weight="fill" />
        </button>
      </div>
      {termsHtml && (
        <label className="flex items-center gap-1.5 text-body-xs text-grey">
          <input
            type="checkbox"
            required
            className="size-4 shrink-0 cursor-pointer appearance-none rounded-[3px] border-[1.5px] border-grey transition-colors checked:border-red checked:bg-red"
          />
          <span className="[&_a]:underline" dangerouslySetInnerHTML={{ __html: termsHtml.replace(/<\/?p>/g, "") }} />
        </label>
      )}
      {state === "error" && <p className="text-body-xs text-red" role="alert">{t("newsletter_error", "It could not be sent. Please try again.")}</p>}
    </form>
  );
}
