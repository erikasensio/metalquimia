"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { WpImage, WpLink } from "@/lib/types";
import { Media } from "@/components/ui/Media";
import { RollText } from "@/components/ui/RollText";

export type InsightItem = { image: WpImage | null; category: string; date: string; title: string; link: WpLink | null };

const PAGE = 9;

/** Filtros + rejilla con "Cargar más" de <InsightsGrid>. */
export function InsightsGridClient({ items, allLabel, loadMoreLabel }: { items: InsightItem[]; allLabel: string; loadMoreLabel: string }) {
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
    <div className="flex flex-col gap-10">
      {categories.length > 1 && (
        <div className="-mx-5 overflow-x-auto px-5 scrollbar-none lg:mx-0 lg:px-0">
          <ul className="flex w-max gap-2" role="tablist">
            {tabs.map((tab) => {
              const selected = tab.key === active;
              return (
                <li key={tab.label}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => select(tab.key)}
                    className={`border px-3 py-2 font-mono text-[0.75rem] uppercase leading-none transition-colors ${
                      selected ? "border-black bg-black text-light-grey" : "border-medium-grey text-dark-grey hover:border-dark-grey"
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

      <ul key={active ?? "all"} className="grid animate-[fade-in_0.4s_ease-out] gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
  );
}

function InsightCard({ item }: { item: InsightItem }) {
  const content = (
    <>
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
        <Media image={item.image} className="size-full" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      </div>
      <div className="relative m-4 flex max-w-[calc(100%-2rem)] flex-col gap-3 bg-black/70 p-4 backdrop-blur-md">
        {(item.category || item.date) && (
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-mono text-[0.75rem] uppercase">
            {item.category && <span className="text-red">{item.category}</span>}
            {item.date && <span className="text-grey">{item.date}</span>}
          </div>
        )}
        {item.title && <h3 className="line-clamp-3 text-title-xs text-light-grey">{item.title}</h3>}
      </div>
    </>
  );
  const cls = "group relative flex aspect-[4/5] flex-col justify-end overflow-hidden";
  return item.link ? (
    <Link href={item.link.url} target={item.link.target || undefined} className={cls}>
      {content}
    </Link>
  ) : (
    <article className={cls}>{content}</article>
  );
}
