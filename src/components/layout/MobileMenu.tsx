"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, CaretLeft, List, X } from "@phosphor-icons/react";
import type { MenuItem, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { useHeader } from "./HeaderShell";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { layoutOf, panelHeading, panelMore } from "./MegaMenu";

type Props = {
  items: MenuItem[];
  top: MenuItem[];
  cta?: WpLink | null;
  lang: string;
  label: string;
  backLabel: string;
  discoverLabel: string;
};

/**
 * Menú a pantalla completa para móvil y tablet (Figma 924:23446). Los elementos con hijos abren
 * una segunda pantalla con el mismo diseño que su desplegable de escritorio (tarjetas, iconos, destacados o enlaces).
 */
export function MobileMenu({ items, top, cta, lang, label, backLabel, discoverLabel }: Props) {
  const pathname = usePathname();
  const { setPanelOpen } = useHeader();
  // Se guarda la ruta en la que se abrió: al navegar a otra página el menú queda cerrado.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const [sub, setSub] = useState<number | null>(null);
  // Para que la pantalla principal entre desde la izquierda al volver de un submenú.
  const [returned, setReturned] = useState(false);
  const open = openAt === pathname;
  const current = sub !== null ? items[sub] : null;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    // Con el menú abierto la cabecera pasa a blanca, aunque esté sobre un hero oscuro.
    setPanelOpen(open);
  }, [open, setPanelOpen]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenAt(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Botón de contacto (el CTA de la cabecera): al pie de la pantalla principal y, como en el Figma, de la de tarjetas.
  const contact = (className: string) =>
    cta?.url && (
      <Button href={cta.url} target={cta.target} variant="outline" className={`${className} h-[50px] w-full shrink-0 !border-black/20 font-bold !text-dark-grey hover:!border-black/60`}>
        {cta.title}
      </Button>
    );

  const toggle = () => {
    setSub(null);
    setReturned(false);
    setOpenAt(open ? null : pathname);
  };

  return (
    <div className="xl:hidden">
      <button type="button" aria-label={label} aria-expanded={open} onClick={toggle} className="text-black-grey group-data-[theme=dark]:text-light-grey">
        {open ? <X size={32} weight="light" /> : <List size={28} />}
      </button>
      {open && (
        <nav
          aria-label={label}
          className="fixed inset-x-0 bottom-0 top-[71px] overflow-y-auto overscroll-contain bg-white animate-[fade-in_0.2s_ease-out]"
          // Un enlace a la página actual no cambia la ruta: se cierra al pulsarlo.
          onClick={(e) => (e.target as HTMLElement).closest("a[href]") && setOpenAt(null)}
          data-mobile-menu
        >
          {current ? (
            <div key={sub} className="flex min-h-full flex-col px-6 pb-[30px] pt-[30px] animate-[slide-in_0.3s_ease-out]">
              <button
                type="button"
                onClick={() => {
                  setSub(null);
                  setReturned(true);
                }}
                className="flex w-fit items-center gap-2 font-mono text-[0.75rem] uppercase leading-none tracking-[0.02em] text-black/30 transition-colors hover:text-black"
              >
                <CaretLeft size={15} aria-hidden />
                {backLabel}
              </button>
              <SubPanel item={current} discoverLabel={discoverLabel} />
              {layoutOf(current) === "cards" && cta?.url && <div className="mt-auto pt-10">{contact("")}</div>}
            </div>
          ) : (
            <div
              className={`flex min-h-full flex-col px-6 pb-[30px] pt-[58px] ${returned ? "animate-[slide-in_0.3s_ease-out]" : ""}`}
              style={{ "--slide-from": "-1.5rem" } as CSSProperties}
            >
              <ul className="flex flex-col gap-6">
                {items.map((item, i) => {
                  const className = "font-display text-[2rem] font-semibold leading-[1.2] tracking-[-0.01em] text-black transition-colors hover:text-grey";
                  return (
                    <li key={item.url + item.label}>
                      {item.children.length > 0 ? (
                        <button type="button" onClick={() => setSub(i)} className={className}>
                          {item.label}
                        </button>
                      ) : (
                        <Link href={item.url} target={item.target || undefined} className={className}>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto flex items-end justify-between gap-6 pt-12">
                <ul className="flex flex-col gap-4">
                  {top.map((item) => (
                    <li key={item.url + item.label}>
                      <Link href={item.url} target={item.target || undefined} className="text-nav text-black transition-colors hover:text-grey">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <LanguageSwitcher lang={lang} drawer className="mb-[3px]" />
              </div>
              {contact("mt-10")}
            </div>
          )}
        </nav>
      )}
    </div>
  );
}

const linkClass = "font-display text-[1.125rem] font-semibold leading-[1.3] transition-colors";

/** Segunda pantalla: antetítulo en mono y los hijos del elemento con el diseño de su desplegable. */
function SubPanel({ item, discoverLabel }: { item: MenuItem; discoverLabel: string }) {
  const layout = layoutOf(item);
  const { eyebrow, muted, title } = panelHeading(item);
  const cards = item.children.filter((c) => c.image?.url);
  const plain = item.children.filter((c) => !c.image?.url);
  const more = panelMore(item, discoverLabel);

  return (
    <>
      <p className="mt-[17px] font-mono text-[0.75rem] uppercase leading-none text-black">{eyebrow || item.label}</p>

      {layout === "cards" && (
        <>
          {(muted || title) && (
            <p className={`${linkClass} mt-6`}>
              {muted && <span className="block text-grey">{muted}</span>}
              {title && <span className="block text-black">{title}</span>}
            </p>
          )}
          <ul className="mt-6 grid grid-cols-2 gap-2">
            {cards.map((c) => (
              <li key={c.url + c.label}>
                <Link
                  href={c.url}
                  target={c.target || undefined}
                  className="group/card relative flex h-[158px] flex-col items-center justify-end overflow-hidden rounded-lg bg-light-grey px-6 pb-4 pt-6"
                >
                  <span className="absolute inset-x-[8%] bottom-[24%] top-[5%]">
                    <Image src={c.image!.url} alt="" fill sizes="160px" className="object-contain" />
                  </span>
                  <span className={`${linkClass} relative text-center text-grey group-hover/card:text-black`}>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {layout === "icons" && (
        <ul className="mt-[34px] flex flex-col gap-4">
          {item.children.map((c) => (
            <li key={c.url + c.label}>
              <Link href={c.url} target={c.target || undefined} className="group/item flex items-center gap-4">
                <span className="flex size-[50px] shrink-0 items-center justify-center rounded-[4px] bg-light-grey">
                  {c.icon?.url && <Image src={c.icon.url} alt="" width={24} height={24} className="size-6 object-contain" />}
                </span>
                <span className="flex flex-col gap-1">
                  <span className={`font-display text-[1rem] font-semibold leading-[1.3] transition-colors ${c.highlight ? "text-red" : "text-black group-hover/item:text-dark-grey"}`}>
                    {c.label}
                  </span>
                  {c.description && <span className="font-display text-[0.75rem] leading-[1.2] text-grey">{c.description}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {layout === "featured" && (
        <>
          <ul className="mt-6 flex flex-col gap-2">
            {cards.slice(0, 2).map((c) => (
              <li key={c.url + c.label}>
                <Link href={c.url} target={c.target || undefined} className="group/card flex items-center gap-4 rounded-[4px] bg-light-grey p-1">
                  <span className="relative size-[88px] shrink-0 overflow-hidden rounded-[7px]">
                    <Image src={c.image!.url} alt="" fill sizes="88px" className="object-cover" />
                  </span>
                  <span className={`${linkClass} text-black group-hover/card:text-dark-grey`}>{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <SubLinks items={[...cards.slice(2), ...plain]} className="mt-[30px] gap-6" />
        </>
      )}

      {layout === "links" && <SubLinks items={item.children} className="mt-6 gap-4" />}

      {more && (
        <Link href={more.url} target={more.target || undefined} className="mt-10 inline-flex w-fit items-center gap-3 py-1.5 text-nav text-grey transition-colors hover:text-black">
          {more.title} <ArrowRight size={14} aria-hidden />
        </Link>
      )}
    </>
  );
}

function SubLinks({ items, className }: { items: MenuItem[]; className: string }) {
  return (
    <ul className={`flex flex-col ${className}`}>
      {items.map((c) => (
        <li key={c.url + c.label}>
          <Link href={c.url} target={c.target || undefined} className={`${linkClass} ${c.highlight ? "text-red hover:text-red/70" : c.muted ? "text-grey hover:text-dark-grey" : "text-black hover:text-grey"}`}>
            {c.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
