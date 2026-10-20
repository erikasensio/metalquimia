"use client";

import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";

const FIELDS = ["name", "company", "address", "home_address", "postal_code", "country", "phone", "email", "message"] as const;
type Field = (typeof FIELDS)[number];

export type ContactTexts = Record<`label_${Field}` | `ph_${Field}`, string> & {
  terms_label: string;
  marketing_label: string;
  legal_text: string;
  submit_label: string;
  error_required: string;
  success_message: string;
  error_message: string;
};

// Campos obligatorios (llevan *).
const REQUIRED: Field[] = ["name", "company", "country", "phone", "email", "message"];

/** Formulario de <ContactForm>: validación en el navegador y envío a /api/contact. */
export function ContactFormClient({ texts, countries }: { texts: ContactTexts; countries: string[] }) {
  const pathname = usePathname();
  const first = pathname.split("/")[1] || "";
  const lang = isLocale(first) ? first : defaultLocale;

  const [values, setValues] = useState<Record<Field, string>>(() => Object.fromEntries(FIELDS.map((f) => [f, ""])) as Record<Field, string>);
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Partial<Record<Field | "terms", string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const validate = () => {
    const next: Partial<Record<Field | "terms", string>> = {};
    for (const f of REQUIRED) if (!values[f].trim()) next[f] = texts.error_required;
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = texts.error_required;
    if (!terms) next.terms = texts.error_required;
    return next;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      const firstError = Object.keys(next)[0];
      document.getElementById(`cf-${firstError}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, terms, marketing, website, lang }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
      setStatus(res.ok && json.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const set = (f: Field) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [f]: e.target.value }));
    if (errors[f]) setErrors((err) => ({ ...err, [f]: undefined }));
  };

  if (status === "success") {
    return (
      <p role="status" className="mx-auto w-full max-w-[520px] animate-[fade-in_0.4s_ease-out] border border-white/10 bg-black-grey p-6 text-center text-body-l text-light-grey">
        {texts.success_message}
      </p>
    );
  }

  const input = "h-10 w-full bg-white px-3 text-body-s text-black placeholder:text-grey outline-none focus-visible:ring-2 focus-visible:ring-red";

  const field = (f: Field, control: React.ReactNode, className = "") => (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={`cf-${f}`} className="text-body-s text-light-grey">
        {texts[`label_${f}`]}
        {REQUIRED.includes(f) && <span aria-hidden> *</span>}
      </label>
      {control}
      {errors[f] && (
        <p id={`cf-${f}-error`} className="text-body-xs text-red">
          {errors[f]}
        </p>
      )}
    </div>
  );

  const common = (f: Field) => ({
    id: `cf-${f}`,
    name: f,
    value: values[f],
    onChange: set(f),
    required: REQUIRED.includes(f),
    "aria-invalid": !!errors[f] || undefined,
    "aria-describedby": errors[f] ? `cf-${f}-error` : undefined,
  });

  const text = (f: Field, type = "text", autoComplete?: string) =>
    field(f, <input {...common(f)} type={type} autoComplete={autoComplete} placeholder={texts[`ph_${f}`]} className={input} />);

  return (
    <form noValidate onSubmit={onSubmit} className="mx-auto flex w-full max-w-[520px] flex-col gap-5" data-reveal>
      {text("name", "text", "name")}
      {text("company", "text", "organization")}
      {text("address", "text", "street-address")}
      {text("home_address", "text", "address-level2")}
      <div className="grid gap-5 sm:grid-cols-2">
        {text("postal_code", "text", "postal-code")}
        {countries.length > 0
          ? field(
              "country",
              <select {...common("country")} autoComplete="country-name" className={`${input} ${values.country ? "" : "text-grey"}`}>
                <option value="">{texts.ph_country}</option>
                {countries.map((c) => (
                  <option key={c} value={c} className="text-black">
                    {c}
                  </option>
                ))}
              </select>,
            )
          : text("country", "text", "country-name")}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {text("phone", "tel", "tel")}
        {text("email", "email", "email")}
      </div>
      {field("message", <textarea {...common("message")} placeholder={texts.ph_message} className={`${input} h-32 resize-y py-2`} />)}

      {/* Trampa para bots: invisible para personas. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
      </div>

      <div className="flex flex-col gap-3 pt-1">
        <div className="flex flex-col gap-1">
          <label className="flex cursor-pointer items-start gap-3 text-body-s text-light-grey">
            <input
              id="cf-terms"
              type="checkbox"
              checked={terms}
              onChange={(e) => {
                setTerms(e.target.checked);
                if (errors.terms) setErrors((err) => ({ ...err, terms: undefined }));
              }}
              required
              aria-invalid={!!errors.terms || undefined}
              className="mt-0.5 size-4 shrink-0 accent-red"
            />
            <span className="[&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-white" dangerouslySetInnerHTML={{ __html: `${inline(texts.terms_label)} *` }} />
          </label>
          {errors.terms && <p className="pl-7 text-body-xs text-red">{errors.terms}</p>}
        </div>
        {texts.marketing_label && (
          <label className="flex cursor-pointer items-start gap-3 text-body-s text-light-grey">
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-0.5 size-4 shrink-0 accent-red" />
            <span>{texts.marketing_label}</span>
          </label>
        )}
      </div>

      {texts.legal_text && (
        <div
          className="bg-dark-grey p-4 text-body-xs text-grey [&_a]:underline [&_p+p]:mt-2 [&_strong]:text-light-grey"
          dangerouslySetInnerHTML={{ __html: texts.legal_text }}
        />
      )}

      {status === "error" && (
        <p role="alert" className="text-body-s text-red">
          {texts.error_message}
        </p>
      )}

      <div className={status === "sending" ? "pointer-events-none opacity-60" : ""}>
        <Button type="submit" variant="red" className="w-full sm:w-auto">
          {texts.submit_label}
        </Button>
      </div>
    </form>
  );
}

/** Quita los <p> del editor para que el texto quepa dentro de la etiqueta de la casilla. */
function inline(html: string) {
  return html.replace(/<\/?p[^>]*>/gi, " ").trim();
}
