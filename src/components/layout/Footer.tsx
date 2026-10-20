import Link from "next/link";
import { Notch } from "@/components/ui/Notch";
import Image from "next/image";
import { LinkedinLogo, XLogo, InstagramLogo, YoutubeLogo, FacebookLogo } from "@phosphor-icons/react/dist/ssr";
import type { Global, WpImage, WpLink } from "@/lib/types";
import { t } from "@/lib/wp";
import { Button } from "@/components/ui/Button";
import { SplitWords } from "@/components/motion/SplitWords";
import { NewsletterForm } from "./NewsletterForm";
import { Logo } from "./Logo";

const socialIcons = { linkedin: LinkedinLogo, x: XLogo, instagram: InstagramLogo, youtube: YoutubeLogo, facebook: FacebookLogo };

/** Llamada final + pie (Figma Modulos › 26. Pre-Footer y 27. Footer). Todo sale de Ajustes globales y de los menús del pie. */
export function Footer({ global, lang }: { global: Global | null; lang: string }) {
  const o = (global?.options ?? {}) as Record<string, unknown>;
  const str = (k: string) => (typeof o[k] === "string" ? (o[k] as string) : "");
  const columns = global?.menus?.footer ?? [];
  const legal = global?.menus?.legal ?? [];
  const button = o.prefooter_button as WpLink | null | undefined;
  const logo = o.logo as WpImage | null | undefined;
  const socials = (Array.isArray(o.socials) ? o.socials : []) as { network?: keyof typeof socialIcons; url?: string }[];
  const hasPrefooter = str("prefooter_title_muted") || str("prefooter_title");

  return (
    <footer className="relative z-[1] overflow-x-clip bg-black text-light-grey" data-footer>
      {/* Brillo diagonal del fondo y recorte blanco de la esquina superior derecha. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.10) 48%, transparent 62%)" }}
        aria-hidden
      />
      <Notch corner="top-right" sizeClass="h-[calc(1.5rem+2px)] w-[38%] [--notch-cut:24px] lg:h-[calc(2.5rem+2px)]" />

      <div className="site-container relative">
        {hasPrefooter && (
          <div className="flex flex-col items-center gap-8 pb-24 pt-32 text-center lg:pb-40 lg:pt-48" data-reveal>
            <p className="text-title-xl max-w-[18ch] [font-feature-settings:'dlig'_1]" data-split>
              {str("prefooter_title_muted") && <SplitWords text={`${str("prefooter_title_muted")} `} className="block text-grey" />}
              {str("prefooter_title") && <SplitWords text={str("prefooter_title")} className="text-light-grey" />}
            </p>
            {button?.url && (
              <Button href={button.url} target={button.target} variant="red">
                {button.title}
              </Button>
            )}
          </div>
        )}

        <div className={`grid gap-12 lg:grid-cols-[1fr_auto] ${hasPrefooter ? "" : "pt-24"}`}>
          <div className="flex max-w-[420px] flex-col gap-6">
            {str("footer_claim") && <p className="text-title-s text-white">{str("footer_claim")}</p>}
            {str("newsletter_label") && (
              <NewsletterForm
                lang={lang}
                label={str("newsletter_label")}
                placeholder={str("newsletter_placeholder") || "johndoe@mail.com"}
                termsHtml={str("newsletter_terms")}
                success={str("newsletter_success") || t(global, "newsletter_thanks", "Thank you!")}
                submitLabel={t(global, "newsletter_submit", "Subscribe")}
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-16">
            {columns.map((col) => (
              <div key={col.label} className="flex flex-col gap-3">
                <p className="font-mono text-[0.75rem] uppercase text-grey">{col.label}</p>
                <ul className="flex flex-col gap-2">
                  {col.children.map((item) => (
                    <li key={item.url + item.label}>
                      <Link href={item.url} target={item.target || undefined} className="font-mono text-[0.75rem] uppercase text-white hover:text-grey">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {(str("phone") || str("email")) && (
              <div className="flex flex-col gap-3">
                <p className="font-mono text-[0.75rem] uppercase text-grey">{str("contact_title") || "Contact us"}</p>
                {str("phone") && (
                  <a href={`tel:${str("phone").replace(/\s+/g, "")}`} className="font-mono text-[0.75rem] uppercase text-white hover:text-grey">
                    {str("phone")}
                  </a>
                )}
                {str("email") && (
                  <a href={`mailto:${str("email")}`} className="font-mono text-[0.75rem] uppercase text-white hover:text-grey">
                    {str("email")}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 lg:mt-28" data-reveal>
          {logo?.url ? (
            <Image src={logo.url} alt={logo.alt || "Metalquimia"} width={1440} height={216} className="h-auto w-full" />
          ) : (
            <Logo className="h-auto w-full text-white" />
          )}
        </div>

        <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((item) => (
              <li key={item.url + item.label}>
                <Link href={item.url} className="text-body-xs text-grey hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            {str("footer_text") && <li className="text-body-xs text-grey">{str("footer_text")}</li>}
          </ul>
          {socials.length > 0 && (
            <ul className="flex gap-1">
              {socials.map((s, i) => {
                const Icon = s.network ? socialIcons[s.network] : null;
                if (!Icon || !s.url) return null;
                return (
                  <li key={i}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.network}
                      className="flex size-8 items-center justify-center bg-black-grey text-light-grey transition-colors hover:bg-red"
                    >
                      <Icon size={14} />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
