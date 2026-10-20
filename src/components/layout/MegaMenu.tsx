"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CaretDown, ArrowRight } from "@phosphor-icons/react";
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
                  className={`flex items-center gap-1.5 text-nav transition-colors ${
                    active !== null && active !== i ? "opacity-40" : ""
                  } ${current ? "underline underline-offset-8" : ""} text-black-grey group-data-[theme=dark]:text-light-grey`}
                >
                  {item.label}
                  <CaretDown size={8} weight="bold" className={`transition-transform ${active === i ? "rotate-180" : ""}`} aria-hidden />
                </button>
              ) : (
                <Link
                  href={item.url}
                  target={item.target || undefined}
                  className={`text-nav transition-colors ${active !== null ? "opacity-40" : ""} text-black-grey hover:text-grey group-data-[theme=dark]:text-light-grey`}
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
          className="absolute inset-x-0 top-full border-t border-medium-grey bg-white animate-[fade-in_0.2s_ease-out]"
          onMouseEnter={() => open(active)}
          onMouseLeave={scheduleClose}
        >
          <Panel item={items[active]} discoverLabel={discoverLabel} />
        </div>
      )}
    </nav>
  );
}

function PanelHeading({ item }: { item: MenuItem }) {
  if (!item.description) return null;
  const [eyebrow, ...rest] = item.description.split("\n");
  const title = rest.join(" ").trim();
  return (
    <div className="mb-6 flex flex-col gap-2">
      <p className="text-eyebrow text-grey">{eyebrow}</p>
      {title && <p className="max-w-[28ch] text-title-s text-black">{title}</p>}
    </div>
  );
}

function Panel({ item, discoverLabel }: { item: MenuItem; discoverLabel: string }) {
  const withImage = item.children.filter((c) => c.image?.url);
  const plain = item.children.filter((c) => !c.image?.url);
  const allCards = withImage.length > 0 && plain.length === 0;
  const described = plain.some((c) => c.description);

  return (
    <div className="site-container py-8">
      <PanelHeading item={item} />

      {allCards && (
        <ul className="grid grid-cols-6 gap-2">
          {withImage.map((c) => (
            <li key={c.url + c.label}>
              <Link href={c.url} className="group/card flex aspect-[3/4] flex-col items-center justify-between bg-light-grey p-4 transition-colors hover:bg-medium-grey">
                <span className="relative w-full flex-1">
                  <Image src={c.image!.url} alt="" fill sizes="200px" className="object-contain transition-transform duration-500 group-hover/card:-translate-y-1 group-hover/card:scale-105" />
                </span>
                <span className="mt-3 text-body-l text-dark-grey">{c.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {!allCards && withImage.length > 0 && (
        <div className="grid grid-cols-[1fr_1fr_1.2fr] gap-4">
          {withImage.slice(0, 2).map((c) => (
            <Link key={c.url + c.label} href={c.url} className="group/card relative block aspect-[4/3] overflow-hidden bg-black">
              <Image src={c.image!.url} alt="" fill sizes="400px" className="object-cover opacity-90 transition-transform duration-500 group-hover/card:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-title-xs text-white">{c.label}</span>
            </Link>
          ))}
          <ul className="flex flex-col justify-center gap-2 pl-10">
            {plain.map((c) => (
              <li key={c.url + c.label}>
                <Link href={c.url} className="text-title-s text-black hover:text-grey">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!withImage.length && described && (
        <ul className="grid grid-cols-3 gap-x-10 gap-y-6">
          {plain.map((c) => (
            <li key={c.url + c.label}>
              <Link href={c.url} className="group/item flex gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center bg-light-grey text-dark-grey group-hover/item:bg-red group-hover/item:text-white">
                  <ArrowRight size={12} />
                </span>
                <span>
                  <span className="block text-title-xs text-black">{c.label}</span>
                  {c.description && <span className="mt-1 block text-body-s text-grey">{c.description}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {!withImage.length && !described && (
        <ul className={`grid gap-x-16 gap-y-1 ${plain.length > 6 ? "w-fit grid-flow-col grid-rows-6" : "w-fit"}`}>
          {plain.map((c) => (
            <li key={c.url + c.label}>
              <Link
                href={c.url}
                target={c.target || undefined}
                className={`text-title-xs hover:text-grey ${/spare|recambio|repuesto/i.test(c.label) ? "text-red" : "text-black"}`}
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {(allCards || described) && item.url && item.url !== "#" && (
        <Link href={item.url} className="mt-6 inline-flex items-center gap-2 text-body-s text-dark-grey hover:text-black">
          {discoverLabel} <CaretDown size={8} weight="bold" className="-rotate-90" aria-hidden />
        </Link>
      )}
    </div>
  );
}
