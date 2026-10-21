import type { Section } from "@/lib/types";
import { ContactFormClient, type ContactTexts } from "./parts/ContactFormClient";
import { SplitWords } from "@/components/motion/SplitWords";

type Props = Section & { title?: string; countries?: string } & Partial<Record<keyof ContactTexts, string>>;

// Textos por defecto (inglés) si el campo de WordPress está vacío.
const DEFAULTS: ContactTexts = {
  label_name: "Name",
  label_company: "Company",
  label_address: "Address",
  label_home_address: "Home address",
  label_postal_code: "Postal code",
  label_country: "Country",
  label_phone: "Phone",
  label_email: "Email",
  label_message: "Message",
  ph_name: "Your name",
  ph_company: "Company name",
  ph_address: "Company address",
  ph_home_address: "City",
  ph_postal_code: "00000",
  ph_country: "Select a country",
  ph_phone: "+34 000 000 000",
  ph_email: "name@company.com",
  ph_message: "How can we help you?",
  terms_label: "I have read and accept the privacy policy",
  marketing_label: "",
  legal_text: "",
  submit_label: "SEND",
  error_required: "This field is required",
  success_message: "Thank you! We have received your message and will get back to you soon.",
  error_message: "Something went wrong. Please try again later.",
};

/**
 * Página Contacto › formulario "Send an inquiry".
 * Fondo negro con disco de franjas; el envío pasa por /api/contact y WordPress manda el email.
 * Si la sección no tiene ancla propia, se puede enlazar con #form.
 */
export default function ContactForm(props: Props) {
  const texts = Object.fromEntries(
    Object.entries(DEFAULTS).map(([key, value]) => {
      const v = props[key as keyof ContactTexts];
      return [key, typeof v === "string" && v.trim() ? v : value];
    }),
  ) as ContactTexts;
  const countries = (props.countries || "")
    .split(/\r?\n/)
    .map((c) => c.trim())
    .filter(Boolean);

  return (
    <div id={props.anchor ? undefined : "form"} className="relative scroll-mt-24 overflow-hidden bg-black py-20 text-light-grey lg:py-[120px]">
      <div className="stripes-disc-dark absolute left-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 lg:size-[1300px]" aria-hidden />
      <div className="site-container relative flex flex-col gap-10 lg:gap-14">
        {props.title && (
          <h2 className="text-center text-title-l text-light-grey [font-feature-settings:'dlig'_1]" data-paint>
            <SplitWords text={props.title} />
          </h2>
        )}
        <ContactFormClient texts={texts} countries={countries} />
      </div>
    </div>
  );
}
