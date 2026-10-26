import Link from "next/link";
import Image from "next/image";
import type { Global, WpImage, WpLink } from "@/lib/types";
import { localizedPath } from "@/lib/i18n";
import { t } from "@/lib/wp";
import { Button } from "@/components/ui/Button";
import { HeaderShell } from "./HeaderShell";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";

/** Cabecera (Figma "Menús"): barra superior negra + barra principal con desplegables. */
export function Header({ global, lang }: { global: Global | null; lang: string }) {
  const primary = global?.menus?.primary ?? [];
  const top = global?.menus?.top ?? [];
  const logo = global?.options?.logo as WpImage | null | undefined;
  const logoDark = global?.options?.logo_dark as WpImage | null | undefined;
  const cta = global?.options?.header_cta as WpLink | null | undefined;
  const home = localizedPath(lang, "");

  return (
    <HeaderShell>
      <div className="hidden h-6 items-center justify-end gap-6 bg-black px-10 transition-colors duration-300 group-data-[theme=dark]:bg-transparent xl:flex">
        {top.map((item) => (
          <Link
            key={item.url + item.label}
            href={item.url}
            target={item.target || undefined}
            className="font-display text-[0.75rem] leading-[1.1] text-white hover:text-grey"
          >
            {item.label}
          </Link>
        ))}
        <LanguageSwitcher lang={lang} />
      </div>

      <div className="relative flex h-[71px] items-center justify-between px-6">
        <Link href={home} aria-label="Metalquimia" className="shrink-0">
          {logo?.url ? (
            <>
              <Image src={logo.url} alt={logo.alt || "Metalquimia"} width={173} height={26} className="hidden h-[26px] w-auto group-data-[theme=dark]:block" priority />
              <Image
                src={(logoDark ?? logo).url}
                alt={logo.alt || "Metalquimia"}
                width={173}
                height={26}
                className={`h-[26px] w-auto group-data-[theme=dark]:hidden ${logoDark?.url ? "" : "invert"}`}
                priority
              />
            </>
          ) : (
            <Logo className="h-[26px] w-auto text-black group-data-[theme=dark]:text-light-grey" />
          )}
        </Link>

        <div className="flex items-center gap-2">
          <MegaMenu items={primary} discoverLabel={t(global, "discover_all", "Discover all")} label={t(global, "nav_label", "Principal")} />
          {cta?.url && (
            <Button
              href={cta.url}
              target={cta.target}
              variant="outline"
              size="sm"
              className="max-xl:!hidden border-black/20 !text-black-grey hover:border-black/60 group-data-[theme=dark]:border-white/20 group-data-[theme=dark]:!text-light-grey xl:inline-flex"
            >
              {cta.title}
            </Button>
          )}
        </div>

        <MobileMenu
          items={primary}
          top={top}
          cta={cta}
          lang={lang}
          label={t(global, "menu", "Menú")}
          backLabel={t(global, "back", "Back")}
          discoverLabel={t(global, "discover_all", "Discover all")}
        />
      </div>
    </HeaderShell>
  );
}
