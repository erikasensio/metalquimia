"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react";
import type { WpImage, WpLink } from "@/lib/types";
import { Carousel } from "@/components/ui/Carousel";
import { carouselGutter } from "@/components/ui/carouselGutter";
import { useGlassSpot } from "@/components/ui/useGlassSpot";
import { Typewriter } from "@/components/motion/Typewriter";
import { SplitWords } from "@/components/motion/SplitWords";

export type MachineItem = { image: WpImage | null; name: string; category: string; description: string; link: WpLink | null };

/** Pestañas de filtro + carrusel de máquinas de <ProductsHighlight>, o rejilla si no hay filtros. */
export function ProductsHighlightClient({ items, showFilters, allLabel, label }: { items: MachineItem[]; showFilters: boolean; allLabel: string; label: string }) {
  const [active, setActive] = useState<string | null>(null);
  const categories = useMemo(() => Array.from(new Set(items.map((item) => item.category).filter(Boolean))), [items]);
  const visible = active ? items.filter((item) => item.category === active) : items;
  const tabs: { key: string | null; label: string }[] = [{ key: null, label: allLabel }, ...categories.map((c) => ({ key: c, label: c }))];
  const tabList = useGlassSpot<HTMLUListElement>();

  return (
    <div className="flex flex-col gap-10 lg:gap-16">
      {showFilters && categories.length > 0 && (
        <div className="overflow-x-auto px-5 scrollbar-none">
          <ul ref={tabList} className="mx-auto flex w-max gap-2" role="tablist">
            {tabs.map((tab) => {
              const selected = tab.key === active;
              return (
                <li key={tab.label}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(tab.key)}
                    className={`glass flex h-12 items-center rounded-lg px-6 font-mono text-[0.875rem] uppercase leading-none transition-colors lg:h-[62px] lg:px-12 ${
                      selected ? "bg-dark-grey/50 text-light-grey" : "bg-dark-grey/30 text-dark-grey hover:text-grey"
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

      {showFilters ? (
        <div key={active ?? "all"} className="animate-[fade-in_0.4s_ease-out]" data-cards>
          <Carousel dark caret trackClassName={`gap-4 ${carouselGutter}`} label={label}>
            {visible.map((item, i) => (
              <div key={`${item.name}-${i}`} className="w-[80vw] shrink-0 snap-start sm:w-[353px]" data-card>
                <MachineCard item={item} />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        // Sin filtros (Figma División 325:10130): filas de cuatro; si faltan máquinas, la fila queda centrada.
        <ul className="site-container flex flex-wrap justify-center gap-x-4 gap-y-12 lg:gap-y-16" aria-label={label} data-cards>
          {items.map((item, i) => (
            <li key={`${item.name}-${i}`} className="w-full sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)]" data-card>
              <MachineCard item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MachineCard({ item }: { item: MachineItem }) {
  const content = (
    <>
      <div className="spotlight h-[400px] overflow-hidden rounded-lg bg-gradient-to-b from-black-grey/0 to-black-grey/70 lg:h-[450px]">
        {item.image && (
          // Caja centrada de ≈ 314 × 338 px dentro de la tarjeta de 353 × 450 px, como en el Figma.
          <div className="absolute inset-x-[5.5%] inset-y-[12.5%] transition-transform duration-500 ease-out group-hover:scale-105">
            <Image src={item.image.url} alt={item.image.alt || item.name} fill sizes="(min-width: 640px) 314px, 72vw" className="object-contain" />
          </div>
        )}
      </div>
      <div className="mt-6 flex items-center justify-between gap-3">
        <h3 className="text-title-xs text-white" data-paint>
          <SplitWords text={item.name} />
        </h3>
        {item.link && (
          <span className="flex shrink-0 items-center justify-center bg-black-grey p-[9px] text-light-grey transition-colors group-hover:bg-red" aria-hidden>
            <CaretRight size={12} />
          </span>
        )}
      </div>
      <span className="mt-6 block h-px bg-dark-grey" aria-hidden data-typewriter-line />
      {item.description && (
        <p className="mt-6 line-clamp-3 text-body-m font-medium text-grey">
          <Typewriter text={item.description} />
        </p>
      )}
    </>
  );

  return item.link ? (
    <Link href={item.link.url} target={item.link.target || undefined} className="group block">
      {content}
    </Link>
  ) : (
    <div className="group">{content}</div>
  );
}
