"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import type { WpImage, WpLink } from "@/lib/types";
import { Media } from "@/components/ui/Media";
import { RollText } from "@/components/ui/RollText";
import { Typewriter } from "@/components/motion/Typewriter";
import { SplitWords } from "@/components/motion/SplitWords";
import { GradientDividerClient } from "./GradientDividerClient";

export type InsightItem = { image: WpImage | null; category: string; date: string; title: string; link: WpLink | null };

const PAGE = 12;

/** Etiqueta "General/TAG" del Figma: Dyatype Mono 14 px, interlineado 1, +2 % de tracking. */
const tag = "font-mono text-[0.875rem] uppercase leading-none tracking-[0.02em] text-grey";

/**
 * Cabecera con filtros + rejilla con "Cargar más" de <InsightsGrid>.
 * Los filtros van en el borde inferior de la cabecera negra y la rejilla en la sección blanca, así que el estado
 * vive aquí y la cabecera (título, bola de franjas) llega ya pintada desde el servidor.
 */
export function InsightsGridClient({
  header,
  items,
  allLabel,
  loadMoreLabel,
}: {
  header: ReactNode;
  items: InsightItem[];
  allLabel: string;
  loadMoreLabel: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [count, setCount] = useState(PAGE);
  const categories = useMemo(() => Array.from(new Set(items.map((item) => item.category).filter(Boolean))), [items]);
  const filtered = active ? items.filter((item) => item.category === active) : items;
  const visible = filtered.slice(0, count);
  const tabs: { key: string | null; label: string }[] = [{ key: null, label: allLabel }, ...categories.map((c) => ({ key: c, label: c }))];

  const select = (key: string | null) => {
    setActive(key);
    setCount(PAGE);
  };

  return (
    <>
      <div className="relative flex min-h-[560px] flex-col justify-center overflow-hidden bg-black pb-[120px] pt-[140px] lg:h-[776px] lg:pt-[120px]">
        {header}

        {categories.length > 1 && (
          <div className="absolute inset-x-0 bottom-0 overflow-x-auto overflow-y-hidden overscroll-x-contain scrollbar-none">
            <ul className="mx-auto flex w-max gap-2 px-5 lg:px-6" role="tablist">
              {tabs.map((tab) => {
                const selected = tab.key === active;
                return (
                  <li key={tab.label}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => select(tab.key)}
                      className={`flex h-12 items-center rounded-lg px-6 font-mono text-[0.875rem] uppercase leading-none transition-colors lg:h-[62px] lg:px-12 ${
                        selected ? "bg-dark-grey/50 text-light-grey" : "bg-dark-grey/30 text-dark-grey hover:bg-dark-grey/40 hover:text-grey"
                      }`}
                    >
                      {tab.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <GradientDividerClient direction="up" />

      {visible.length > 0 && (
        <div className="bg-white pb-20 pt-10 lg:pt-20">
          {/* Grupo de escritura: al acabar queda data-typed y lo que aparezca al filtrar o cargar más ya se ve. */}
          <div className="site-container flex flex-col gap-12" data-typewriter-group>
            <ul key={active ?? "all"} className="grid animate-[fade-in_0.4s_ease-out] gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-12">
              {visible.map((item, i) => (
                <li key={`${item.title}-${i}`} className={i >= PAGE ? "animate-[fade-in_0.5s_ease-out]" : undefined}>
                  <InsightCard item={item} />
                </li>
              ))}
            </ul>

            {filtered.length > count && (
              <div className="flex justify-center">
                {/* Mismo aspecto que <Button variant="solid">, que no admite onClick. */}
                <button
                  type="button"
                  onClick={() => setCount((c) => c + PAGE)}
                  className="cta inline-flex items-center justify-center bg-medium-grey px-5 py-[11px] font-mono text-[0.875rem] font-bold uppercase leading-none text-dark-grey hover:bg-grey hover:text-white"
                >
                  <RollText>{loadMoreLabel}</RollText>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/** Tarjeta "insight-card" del Figma: 476 × 700, foto a sangre y caja oscura de 340 × 220 abajo a la izquierda. */
function InsightCard({ item }: { item: InsightItem }) {
  const content = (
    <>
      <div className="absolute inset-0 bg-[#d2d1c1] transition-transform duration-700 ease-out group-hover:scale-[1.04]">
        <Media image={item.image} className="size-full" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </div>
      <div className="relative flex min-h-[180px] w-[340px] max-w-full flex-col justify-between gap-6 rounded-[4px] bg-[rgba(18,18,18,0.8)] p-5 lg:h-[220px]">
        {item.category ? (
          <div className="flex items-center gap-2">
            <span className="size-3 shrink-0 bg-light-grey" aria-hidden />
            <span className={tag}>
              <Typewriter text={item.category} />
            </span>
          </div>
        ) : (
          <span />
        )}
        <div className="flex flex-col gap-[14px]">
          {item.date && (
            <span className={tag}>
              <Typewriter text={item.date} />
            </span>
          )}
          {item.title && (
            <h3 className="line-clamp-3 text-title-xs text-light-grey" data-paint>
              <SplitWords text={item.title} />
            </h3>
          )}
        </div>
      </div>
    </>
  );
  const cls = "group relative flex aspect-[476/700] flex-col justify-end overflow-hidden rounded-[4px] p-4";
  return item.link ? (
    <Link href={item.link.url} target={item.link.target || undefined} className={cls}>
      {content}
    </Link>
  ) : (
    <article className={cls}>{content}</article>
  );
}
