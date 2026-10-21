"use client";

import { useId, useState } from "react";
import Image from "next/image";
import type { WpImage } from "@/lib/types";

export type TestimonialItem = { logo?: WpImage | null; name?: string; quote?: string; author?: string; role?: string };

/**
 * Acordeón de testimonios: solo uno abierto (el primero al cargar), altura animada con grid-rows.
 * Figma (review-card 325:10888): tarjetas de 8 px de radio separadas 8 px; la abierta, gris muy claro con el logo
 * en color, cita de 18 px y autor en mono; las cerradas, #161616 con el logo en blanco al 40 %.
 */
export function TestimonialAccordion({ items }: { items: TestimonialItem[] }) {
  const [active, setActive] = useState(0);
  const id = useId();

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => {
        const open = i === active;
        const panelId = `${id}-panel-${i}`;
        return (
          <li key={i} className={`overflow-hidden rounded-lg transition-colors duration-500 ${open ? "bg-light-grey" : "spotlight bg-[#161616] hover:bg-black-grey"}`}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={item.name || item.logo?.alt || `Testimonio ${i + 1}`}
              onClick={() => setActive(i)}
              className={`flex w-full items-center px-6 transition-[height] duration-500 ${open ? "h-[82px]" : "h-[66px]"}`}
            >
              {item.logo?.url ? (
                <Image
                  src={item.logo.url}
                  alt={item.logo.alt || item.name || ""}
                  width={120}
                  height={50}
                  className={`h-[50px] w-auto max-w-[120px] object-contain object-left transition-[filter,opacity] duration-500 ${
                    open ? "" : "opacity-40 brightness-0 invert"
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
                <figure className="flex flex-col gap-4 px-6 pb-4 pt-10">
                  {item.quote && <blockquote className="text-title-xs text-black">“{item.quote}”</blockquote>}
                  {(item.author || item.role) && (
                    <figcaption className="text-eyebrow tracking-[0.02em] text-grey">{[item.author, item.role].filter(Boolean).join(", ")}</figcaption>
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
