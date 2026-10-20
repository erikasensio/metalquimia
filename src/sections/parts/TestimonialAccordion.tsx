"use client";

import { useId, useState } from "react";
import Image from "next/image";
import type { WpImage } from "@/lib/types";

export type TestimonialItem = { logo?: WpImage | null; name?: string; quote?: string; author?: string; role?: string };

/** Acordeón de testimonios: solo uno abierto (el primero al cargar), altura animada con grid-rows. */
export function TestimonialAccordion({ items }: { items: TestimonialItem[] }) {
  const [active, setActive] = useState(0);
  const id = useId();

  return (
    <ul className="flex flex-col gap-1">
      {items.map((item, i) => {
        const open = i === active;
        const panelId = `${id}-panel-${i}`;
        return (
          <li key={i} className={`transition-colors duration-500 ${open ? "bg-white" : "bg-black-grey hover:bg-dark-grey"}`}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={item.name || item.logo?.alt || `Testimonio ${i + 1}`}
              onClick={() => setActive(i)}
              className={`flex w-full items-center px-8 transition-[height] duration-500 ${open ? "h-24" : "h-16"}`}
            >
              {item.logo?.url ? (
                <Image
                  src={item.logo.url}
                  alt={item.logo.alt || item.name || ""}
                  width={160}
                  height={40}
                  className={`h-7 w-auto max-w-[160px] object-contain object-left transition-[filter,opacity] duration-500 ${
                    open ? "" : "opacity-60 brightness-0 invert"
                  }`}
                />
              ) : (
                <span className={`font-mono text-[0.75rem] uppercase ${open ? "text-black" : "text-grey"}`}>{item.name}</span>
              )}
            </button>
            <div
              id={panelId}
              role="region"
              aria-hidden={!open}
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden" inert={!open}>
                <figure className="flex flex-col gap-8 px-8 pb-8">
                  {item.quote && <blockquote className="text-quote text-black">“{item.quote}”</blockquote>}
                  {(item.author || item.role) && (
                    <figcaption className="flex flex-col gap-1">
                      {item.author && <span className="font-mono text-[0.75rem] uppercase text-dark-grey">{item.author}</span>}
                      {item.role && <span className="text-body-s text-grey">{item.role}</span>}
                    </figcaption>
                  )}
                </figure>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
