"use client";

import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { Check } from "@phosphor-icons/react";
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

// Campos obligatorios (llevan *): en el Figma, todos.
const REQUIRED: readonly Field[] = FIELDS;

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
      <p role="status" className="mx-auto w-full max-w-[724px] animate-[fade-in_0.4s_ease-out] rounded-[12px] bg-dark-grey p-6 text-center text-title-xs text-light-grey">
        {texts.success_message}
      </p>
    );
  }

  const input =
    "h-10 w-full rounded-[8px] border border-medium-grey bg-light-grey pl-4 pr-1 text-title-xs text-black placeholder:text-grey outline-none focus-visible:ring-2 focus-visible:ring-red";

  const field = (f: Field, control: React.ReactNode, className = "") => (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={`cf-${f}`} className="text-title-xs text-light-grey">
        {texts[`label_${f}`]}
        {REQUIRED.includes(f) && <span aria-hidden>*</span>}
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
    <form noValidate onSubmit={onSubmit} className="mx-auto flex w-full max-w-[724px] flex-col gap-6" data-reveal>
      {text("name", "text", "name")}
      {text("company", "text", "organization")}
      {text("address", "text", "street-address")}
      {text("home_address", "text", "address-level2")}
      {text("postal_code", "text", "postal-code")}
      {countries.length > 0
        ? field(
            "country",
            <div className="relative">
              <select {...common("country")} autoComplete="country-name" className={`${input} appearance-none pr-10 ${values.country ? "" : "text-grey"}`}>
                <option value="">{texts.ph_country}</option>
                {countries.map((c) => (
                  <option key={c} value={c} className="text-black">
                    {c}
                  </option>
                ))}
              </select>
              <img src="/brand/form-caret.svg" alt="" width={18} height={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
            </div>,
          )
        : text("country", "text", "country-name")}
      {text("phone", "tel", "tel")}
      {text("email", "email", "email")}
      {field("message", <textarea {...common("message")} placeholder={texts.ph_message} className={`${input} h-[120px] resize-y pt-4`} />)}

      {/* Trampa para bots: invisible para personas. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="flex cursor-pointer items-start gap-1.5 text-body-m font-medium text-grey">
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
              className="peer sr-only"
            />
            <Box />
            <span
              className="[&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-light-grey"
              dangerouslySetInnerHTML={{ __html: inline(texts.terms_label).includes("*") ? inline(texts.terms_label) : `${inline(texts.terms_label)}*` }}
            />
          </label>
          {errors.terms && <p className="pl-[22px] text-body-xs text-red">{errors.terms}</p>}
        </div>
        {texts.marketing_label && (
          <label className="flex cursor-pointer items-start gap-1.5 text-body-m font-medium text-grey">
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="peer sr-only" />
            <Box />
            <span>{texts.marketing_label}</span>
          </label>
        )}
      </div>

      {texts.legal_text && (
        <div
          className="rounded-[12px] bg-dark-grey p-6 text-body-xs leading-[1.2] text-light-grey [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: texts.legal_text }}
        />
      )}

      {status === "error" && (
        <p role="alert" className="text-body-s text-red">
          {texts.error_message}
        </p>
      )}

      <div className={status === "sending" ? "pointer-events-none opacity-60" : ""}>
        <Button type="submit" variant="red">
          {texts.submit_label}
        </Button>
      </div>
    </form>
  );
}

/** Casilla del Figma (cuadrado gris); al marcarla, el check encima. Va detrás del <input class="peer">. */
function Box() {
  return (
    <span className="relative mt-[3px] size-4 shrink-0 rounded-[2px] peer-checked:[&>svg]:block peer-focus-visible:ring-2 peer-focus-visible:ring-red">
      <img src="/brand/form-checkbox.svg" alt="" width={16} height={16} />
      <Check size={10} weight="bold" className="absolute left-[3px] top-[3px] hidden text-light-grey" aria-hidden />
    </span>
  );
}

/** Quita los <p> del editor para que el texto quepa dentro de la etiqueta de la casilla. */
function inline(html: string) {
  return html.replace(/<\/?p[^>]*>/gi, " ").trim();
}
