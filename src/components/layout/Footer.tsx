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
  const footerImage = o.footer_image as WpImage | null | undefined;
  const socials = (Array.isArray(o.socials) ? o.socials : []) as { network?: keyof typeof socialIcons; url?: string }[];
  const hasPrefooter = str("prefooter_title_muted") || str("prefooter_title");

  // Figma Home › footer (459:21251).
  const heading = "font-mono text-[0.875rem] uppercase leading-none tracking-[0.02em] text-grey";
  const item = "font-mono text-[0.875rem] font-bold uppercase leading-none transition-colors hover:text-grey";

  return (
    <footer className="relative z-[1] overflow-x-clip bg-black text-light-grey" data-footer>
      {/* Fondo: foto del pliegue de luz con un velo negro al 75 % encima. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image src={footerImage?.url || "/brand/footer-bg.jpg"} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/75" />
      </div>
      {/* Blanca por defecto; negra si la última sección de la página acaba en negro (data-footer-notch en globals.css). */}
      <Notch corner="top-right" sizeClass="h-[calc(1.5rem+2px)] w-[38%] [--notch-cut:24px] lg:h-[calc(2.5rem+2px)]" data-footer-notch />

      <div className="site-container relative">
        {hasPrefooter && (
          // Título que se pinta palabra a palabra, como los títulos con efecto de escritura de los módulos.
          <div className="flex flex-col items-center gap-8 pb-24 pt-32 text-center lg:gap-12 lg:pb-[164px] lg:pt-[204px]" data-typewriter-group data-typewriter-sequence>
            <p className="text-title-xl max-w-[928px] lg:max-w-[1100px] [font-feature-settings:'dlig'_1]" data-paint>
              {str("prefooter_title_muted") && <SplitWords text={`${str("prefooter_title_muted")} `} className="block text-grey" />}
              {str("prefooter_title") && <SplitWords text={str("prefooter_title")} className="text-light-grey" />}
            </p>
            {button?.url && (
              <div data-reveal>
                <Button href={button.url} target={button.target} variant="red">
                  {button.title}
                </Button>
              </div>
            )}
          </div>
        )}

        <div className={`flex flex-col pb-6 lg:min-h-[900px] lg:pt-[79px] ${hasPrefooter ? "" : "pt-24"}`}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="flex flex-col gap-6 lg:col-span-7">
              {str("footer_claim") && <p className="text-title-m max-w-[520px] tracking-[-0.01em] text-light-grey">{str("footer_claim")}</p>}
              {str("newsletter_label") && (
                <NewsletterForm
                  lang={lang}
                  label={str("newsletter_label")}
                  placeholder={str("newsletter_placeholder") || "johndoe@mail.com"}
                  termsHtml={str("newsletter_terms")}
                  success={str("newsletter_success") || "Thank you!"}
                  submitLabel={t(global, "newsletter_submit", "Subscribe")}
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:flex lg:col-span-5">
              {columns.map((col, i) => (
                <div key={col.label} className={`flex flex-col gap-6 ${i === 0 ? "sm:flex-1" : "sm:shrink-0"}`}>
                  <p className={heading}>{col.label}</p>
                  <ul className="flex flex-col gap-4">
                    {col.children.map((link) => (
                      <li key={link.url + link.label}>
                        <Link href={link.url} target={link.target || undefined} className={`${item} text-medium-grey`}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {(str("phone") || str("email")) && (
                <div className="col-span-2 flex flex-col gap-4 sm:flex-1">
                  <p className={heading}>{str("contact_title") || "Contact us"}</p>
                  {str("phone") && (
                    <a href={`tel:${str("phone").replace(/\s+/g, "")}`} className={`${item} text-light-grey`}>
                      {str("phone")}
                    </a>
                  )}
                  {str("email") && (
                    <a href={`mailto:${str("email")}`} className={`${item} text-light-grey`}>
                      {str("email")}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-20 flex flex-col gap-[30px] lg:mt-auto">
            <div data-reveal>
              {logo?.url ? (
                <Image src={logo.url} alt={logo.alt || "Metalquimia"} width={1440} height={216} className="h-auto w-full" />
              ) : (
                <Logo className="h-auto w-full text-white" />
              )}
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {legal.map((link) => (
                  <li key={link.url + link.label}>
                    <Link href={link.url} className="block text-body-xs text-grey transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
                {str("footer_text") && <li className="text-body-xs text-grey">{str("footer_text")}</li>}
              </ul>
              {socials.length > 0 && (
                <ul className="flex gap-1.5">
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
                          className="glass flex size-10 items-center justify-center rounded-lg bg-dark-grey/50 text-light-grey transition-colors hover:bg-red"
                        >
                          <Icon size={16} weight="fill" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
