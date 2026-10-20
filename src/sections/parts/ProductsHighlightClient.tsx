"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { WpImage, WpLink } from "@/lib/types";

export type MachineItem = { image: WpImage | null; name: string; category: string; description: string; link: WpLink | null };

/** Pestañas de filtro + rejilla de máquinas de <ProductsHighlight>. */
export function ProductsHighlightClient({ items, showFilters, allLabel }: { items: MachineItem[]; showFilters: boolean; allLabel: string }) {
  const [active, setActive] = useState<string | null>(null);
  const categories = useMemo(() => Array.from(new Set(items.map((item) => item.category).filter(Boolean))), [items]);
  const visible = active ? items.filter((item) => item.category === active) : items;
  const tabs: { key: string | null; label: string }[] = [{ key: null, label: allLabel }, ...categories.map((c) => ({ key: c, label: c }))];

  return (
    <div className="flex flex-col gap-8">
      {showFilters && categories.length > 0 && (
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
                    onClick={() => setActive(tab.key)}
                    className={`border px-3 py-2 font-mono text-[0.75rem] uppercase leading-none transition-colors ${
                      selected ? "border-light-grey bg-light-grey text-black" : "border-white/20 text-light-grey hover:border-white/60"
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

      <ul key={active ?? "all"} className="grid animate-[fade-in_0.4s_ease-out] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((item, i) => (
          <li key={`${item.name}-${i}`}>
            <MachineCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MachineCard({ item }: { item: MachineItem }) {
  const content = (
    <>
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-black-grey to-black">
        {item.image && (
          <Image
            src={item.image.url}
            alt={item.image.alt || item.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <h3 className="text-title-xs text-light-grey">{item.name}</h3>
        {item.link && (
          <span className="flex size-8 shrink-0 items-center justify-center bg-black-grey text-light-grey transition-colors group-hover:bg-red" aria-hidden>
            <ArrowUpRight size={16} />
          </span>
        )}
      </div>
      {item.description && <p className="mt-2 line-clamp-3 text-body-s text-grey">{item.description}</p>}
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
