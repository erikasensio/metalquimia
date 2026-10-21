"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CaretDown, ArrowRight } from "@phosphor-icons/react";
import type { CSSProperties } from "react";
import type { MenuItem } from "@/lib/types";
import { useHeader } from "./HeaderShell";

type Props = { items: MenuItem[]; discoverLabel: string; label: string };

/** Menú principal de escritorio con desplegables a todo el ancho (Figma "Menús"). */
export function MegaMenu({ items, discoverLabel, label }: Props) {
  const pathname = usePathname();
  const { setPanelOpen } = useHeader();
  const [active, setActive] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setActive(null);
  }
  useEffect(() => setPanelOpen(active !== null), [active, setPanelOpen]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = (i: number | null) => {
    clearTimeout(closeTimer.current);
    setActive(i);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), 150);
  };

  return (
    <nav aria-label={label} className="hidden xl:block" onMouseLeave={scheduleClose}>
      <ul className="flex items-center gap-8 px-4">
        {items.map((item, i) => {
          const hasPanel = item.children.length > 0;
          const current = pathname === item.url || item.children.some((c) => c.url === pathname);
          return (
            <li key={item.url + item.label} onMouseEnter={() => open(hasPanel ? i : null)}>
              {hasPanel ? (
                <button
                  type="button"
                  aria-expanded={active === i}
                  onClick={() => open(active === i ? null : i)}
                  className={`flex items-center gap-1.5 text-nav transition-[color,opacity] ${
                    active !== null && active !== i ? "opacity-20" : ""
                  } ${current ? "underline underline-offset-8" : ""} text-black-grey group-data-[theme=dark]:text-light-grey`}
                >
                  {item.label}
                  <CaretDown size={8} weight="bold" className={`transition-transform ${active === i ? "rotate-180" : ""}`} aria-hidden />
                </button>
              ) : (
                <Link
                  href={item.url}
                  target={item.target || undefined}
                  className={`text-nav transition-[color,opacity] ${active !== null ? "opacity-20" : ""} text-black-grey hover:text-grey group-data-[theme=dark]:text-light-grey`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      {active !== null && items[active] && (
        <div
          className="absolute inset-x-0 top-full rounded-b-[4px] bg-white shadow-[0_4px_54px_rgba(0,0,0,0.05)] animate-[fade-in_0.2s_ease-out]"
          onMouseEnter={() => open(active)}
          onMouseLeave={scheduleClose}
        >
          <Panel item={items[active]} discoverLabel={discoverLabel} />
        </div>
      )}
    </nav>
  );
}

type Layout = NonNullable<MenuItem["layout"]>;

/** Diseño del panel: el elegido en WordPress o, si es automático, el que encaja con lo que tienen los elementos. */
function layoutOf(item: MenuItem): Exclude<Layout, ""> {
  if (item.layout) return item.layout;
  const withImage = item.children.filter((c) => c.image?.url).length;
  if (withImage && withImage === item.children.length) return "cards";
  if (withImage) return "featured";
  if (item.children.some((c) => c.icon?.url || c.description)) return "icons";
  return "links";
}

/** Paneles del Figma "Menús" (305:5989): Productos (cards), Soluciones (icons), Nuestro método (featured), Servicio y Empresa (links). */
function Panel({ item, discoverLabel }: { item: MenuItem; discoverLabel: string }) {
  const layout = layoutOf(item);
  const cards = item.children.filter((c) => c.image?.url);
  const plain = item.children.filter((c) => !c.image?.url);
  // Enlace al pie: el del panel o, en menús sin configurar, "Ver todas" hacia la página del elemento.
  const more =
    item.link?.url
      ? item.link
      : !item.layout && (layout === "cards" || layout === "icons") && item.url && item.url !== "#"
        ? { title: discoverLabel, url: item.url, target: "" }
        : null;

  return (
    <div className={`site-container ${layout === "icons" ? "pt-[26px]" : "pt-8"} ${layout === "links" ? "pb-[52px]" : "pb-10"}`}>
      <PanelHeading item={item} />

      {layout === "icons" && (
        // Tres columnas que se llenan de arriba abajo (en el Figma, cuatro procesos por columna).
        <ul
          className="mt-11 grid grid-flow-col grid-cols-3 gap-x-4 gap-y-6"
          style={{ gridTemplateRows: `repeat(${Math.ceil(item.children.length / 3)}, auto)` } as CSSProperties}
        >
          {item.children.map((c) => (
            <li key={c.url + c.label}>
              <Link href={c.url} target={c.target || undefined} className="group/item flex w-fit items-center gap-4">
                <span className="flex size-[50px] shrink-0 items-center justify-center rounded-[4px] bg-light-grey transition-colors group-hover/item:bg-medium-grey">
                  {c.icon?.url && <Image src={c.icon.url} alt="" width={24} height={24} className="size-6 object-contain" />}
                </span>
                <span className="flex max-w-[23rem] flex-col gap-1">
                  <span className={`text-title-xs transition-colors ${c.highlight ? "text-red" : "text-black group-hover/item:text-dark-grey"}`}>{c.label}</span>
                  {c.description && <span className="font-display text-[0.75rem] leading-[1.2] text-grey">{c.description}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {layout === "cards" && (
        <ul className="mt-6 grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.max(cards.length, 1)}, minmax(0, 1fr))` } as CSSProperties}>
          {cards.map((c) => (
            <li key={c.url + c.label}>
              <Link
                href={c.url}
                target={c.target || undefined}
                className="group/card relative flex h-[336px] flex-col items-center justify-end overflow-hidden rounded-lg bg-light-grey px-6 pb-8 pt-6"
              >
                <span className="absolute inset-x-[8%] bottom-[22%] top-[7%]">
                  <Image src={c.image!.url} alt="" fill sizes="240px" className="object-contain transition-transform duration-500 group-hover/card:-translate-y-1 group-hover/card:scale-105" />
                </span>
                <span className="relative text-center text-title-s text-grey transition-colors [font-feature-settings:'dlig'_1] [text-box:trim-both_cap_alphabetic] group-hover/card:text-black">
                  {c.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {layout === "featured" && (
        // Rejilla de 12 columnas: cada tarjeta ocupa tres (354 px en 1464) y la lista empieza a 958 px.
        <div className="mt-7 grid grid-cols-12 gap-4">
          {cards.slice(0, 2).map((c) => (
            <Link
              key={c.url + c.label}
              href={c.url}
              target={c.target || undefined}
              className="group/card relative col-span-3 flex h-[439px] items-end justify-center overflow-hidden rounded-[6px] bg-black/5 p-[35px]"
            >
              <Image src={c.image!.url} alt="" fill sizes="360px" className="object-cover transition-transform duration-700 group-hover/card:scale-105" />
              <span className="relative text-center text-title-s text-light-grey [font-feature-settings:'dlig'_1] [text-box:trim-both_cap_alphabetic]">{c.label}</span>
            </Link>
          ))}
          <LinkList items={[...cards.slice(2), ...plain]} className="col-span-5 col-start-8 self-start pl-24" />
        </div>
      )}

      {layout === "links" && <LinkList items={item.children} columns className="mt-[34px]" />}

      {more && (
        <Link
          href={more.url}
          target={more.target || undefined}
          className={`${layout === "icons" ? "mt-[47px]" : "mt-8"} inline-flex items-center gap-3 py-1.5 text-nav text-grey transition-colors hover:text-black`}
        >
          {more.title} <ArrowRight size={14} aria-hidden />
        </Link>
      )}
    </div>
  );
}

/** Antetítulo en mono y, si lo hay, título en dos líneas (gris + negro), como "Procesado con precisión y / control total…". */
function PanelHeading({ item }: { item: MenuItem }) {
  // Compatibilidad: antes el antetítulo y el título iban en la descripción del elemento (primera línea = antetítulo).
  const [legacyEyebrow, ...legacyTitle] = item.layout || item.eyebrow ? [] : (item.description ?? "").split("\n");
  const eyebrow = item.eyebrow || legacyEyebrow;
  const muted = item.title_muted;
  const title = item.title || legacyTitle.join(" ").trim();
  if (!eyebrow && !muted && !title) return null;
  return (
    <div className="flex flex-col gap-6">
      {eyebrow && <p className="font-mono text-[0.75rem] uppercase leading-none text-black">{eyebrow}</p>}
      {(muted || title) && (
        <p className="text-title-s [font-feature-settings:'dlig'_1] [text-box:trim-both_cap_alphabetic]">
          {muted && <span className="block text-grey">{muted}</span>}
          {title && <span className="block text-black">{title}</span>}
        </p>
      )}
    </div>
  );
}

/** Enlaces grandes con una flecha que asoma al pasar el ratón; con `columns`, de seis en seis por columna. */
function LinkList({ items, columns, className = "" }: { items: MenuItem[]; columns?: boolean; className?: string }) {
  return (
    <ul
      className={`flex flex-col gap-4 ${columns ? "grid auto-cols-[354px] grid-flow-col gap-x-4" : ""} ${className}`}
      style={columns ? ({ display: "grid", gridTemplateRows: `repeat(${Math.min(items.length, 6)}, auto)` } as CSSProperties) : undefined}
    >
      {items.map((c) => (
        <li key={c.url + c.label}>
          <Link
            href={c.url}
            target={c.target || undefined}
            className={`group/link flex w-fit items-center text-title-s transition-colors [font-feature-settings:'dlig'_1] [text-box:trim-both_cap_alphabetic] ${
              c.highlight ? "text-red hover:text-red/70" : "text-[#2e2e2e] hover:text-grey"
            }`}
          >
            <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover/link:w-7 group-hover/link:opacity-100" aria-hidden>
              <ArrowRight size={20} />
            </span>
            {c.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
