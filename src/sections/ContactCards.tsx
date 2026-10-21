import Link from "next/link";
import { Envelope, MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import type { Section, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Typewriter } from "@/components/motion/Typewriter";
import { SplitWords } from "@/components/motion/SplitWords";

type Icon = "phone" | "email" | "whatsapp" | "location";

type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  highlight_title?: string;
  highlight_text?: string;
  highlight_button?: WpLink | null;
  items?: { icon?: Icon; label?: string; value?: string; link?: WpLink | null }[] | null | false | "";
};

const ICONS = { phone: Phone, email: Envelope, whatsapp: WhatsappLogo, location: MapPin };

/** Enlace de la tarjeta: el del campo o, si es teléfono/email, tel:/mailto: con el dato. */
function hrefFor(icon: Icon | undefined, value: string, link?: WpLink | null) {
  if (link?.url) return { url: link.url, target: link.target };
  if (icon === "phone" && value) return { url: `tel:${value.replace(/[^\d+]/g, "")}`, target: "" };
  if (icon === "email" && value) return { url: `mailto:${value.trim()}`, target: "" };
  return null;
}

/**
 * Página Contacto (Figma "Contact", bloque superior).
 * Cabecera centrada, tarjeta negra destacada con botón al formulario y tarjetas grises de contacto.
 */
export default function ContactCards({ eyebrow, title_muted, title, highlight_title, highlight_text, highlight_button, items }: Props) {
  const list = (Array.isArray(items) ? items : []).filter((item) => item?.label || item?.value);
  const hasHighlight = !!(highlight_title || highlight_text || highlight_button?.url);

  return (
    <div className="bg-white py-20 lg:py-[120px]">
      <div className="site-container flex flex-col gap-12 lg:gap-16">
        <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} align="center" />

        <ul className="grid gap-4 md:grid-cols-3" data-stagger>
          {hasHighlight && (
            <li className="flex min-h-[220px] flex-col items-start justify-between gap-6 bg-black p-6" data-typewriter-group data-typewriter-sequence>
              <div className="flex flex-col gap-3">
                {highlight_title && (
                  <h3 className="text-title-xs text-light-grey" data-paint>
                    <SplitWords text={highlight_title} />
                  </h3>
                )}
                {highlight_text && (
                  <p className="text-body-s text-grey">
                    <Typewriter text={highlight_text} />
                  </p>
                )}
              </div>
              {highlight_button?.url && (
                <div data-reveal>
                  <Button href={highlight_button.url} target={highlight_button.target} variant="dark">
                    {highlight_button.title}
                  </Button>
                </div>
              )}
            </li>
          )}
          {list.map((item, i) => {
            const Icon = ICONS[item.icon as Icon] ?? Phone;
            const href = hrefFor(item.icon, item.value || "", item.link);
            const card = "group flex h-full min-h-[220px] flex-col justify-between gap-6 bg-light-grey p-6";
            const content = (
              <>
                <Icon size={28} className="text-black transition-colors group-hover:text-red" aria-hidden />
                <div className="flex flex-col gap-1">
                  {item.label && (
                    <p className="text-body-s text-black">
                      <Typewriter text={item.label} />
                    </p>
                  )}
                  {item.value && (
                    <p className="break-words text-body-s text-grey">
                      <Typewriter text={item.value} />
                    </p>
                  )}
                </div>
              </>
            );
            return (
              <li key={i} data-typewriter-group data-typewriter-sequence data-typewriter-delay={((i + (hasHighlight ? 1 : 0)) % 3) * 0.1}>
                {href ? (
                  <Link href={href.url} target={href.target || undefined} className={`${card} transition-colors hover:bg-medium-grey`}>
                    {content}
                  </Link>
                ) : (
                  <div className={card}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
