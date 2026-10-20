"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";

type Process = { label?: string; link?: WpLink | null; thumbnail?: WpImage | null };
type Category = { name?: string; image?: WpImage | null; processes?: Process[] };

type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  button?: WpLink | null;
  categories?: Category[];
};

/**
 * Bloque de soluciones por categoría (Figma "products" 160:2762).
 * Al elegir una categoría cambian la palabra de fondo, la imagen y la lista de procesos.
 */
export default function Products({ eyebrow, title_muted, title, button, categories = [] }: Props) {
  const [active, setActive] = useState(0);
  const current = categories[active];

  return (
    <div className="relative flex flex-col bg-white py-[60px]">
      <div className="site-container flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-[500px] flex-col items-start gap-[21px]">
          {eyebrow && <p className="text-eyebrow text-grey">{eyebrow}</p>}
          {(title_muted || title) && (
            <h2 className="text-title-m tracking-[-0.01em] lg:text-[2rem]">
              {title_muted && (
                <span className="bg-gradient-to-r from-black to-[#c2c2c2] bg-clip-text text-transparent">{title_muted} </span>
              )}
              {title && <span className="text-black">{title}</span>}
            </h2>
          )}
          {button?.url && (
            <Button href={button.url} target={button.target} variant="solid">
              {button.title}
            </Button>
          )}
        </div>

        {current?.processes && current.processes.length > 0 && (
          <ul key={active} className="flex flex-col gap-1 animate-[fade-in_0.4s_ease-out]">
            {current.processes.map((process, i) => {
              const content = (
                <>
                  <span className="relative hidden size-5 shrink-0 overflow-hidden rounded-[2px] bg-[#212121] opacity-0 lg:block transition-opacity group-hover:opacity-100">
                    {process.thumbnail?.url && <Image src={process.thumbnail.url} alt="" fill sizes="20px" className="object-cover" />}
                  </span>
                  <span className="font-mono text-[0.875rem] uppercase leading-none tracking-[-0.01em] text-dark-grey">{process.label}</span>
                </>
              );
              return (
                <li key={i}>
                  {process.link?.url ? (
                    <Link href={process.link.url} target={process.link.target || undefined} className="group flex items-center gap-[9px] lg:-ml-[29px]">
                      {content}
                    </Link>
                  ) : (
                    <span className="group flex items-center gap-[9px] lg:-ml-[29px]">{content}</span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {current && (
        <div className="relative h-[360px] overflow-hidden md:h-[480px] lg:h-[574px]">
          <div className="stripes-disc absolute left-1/2 top-1/2 size-[110%] max-h-[900px] max-w-[900px] -translate-x-1/2 -translate-y-1/2" aria-hidden />
          <p
            key={`word-${active}`}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[6rem] font-semibold leading-[1.1] text-medium-grey animate-[fade-in_0.5s_ease-out] md:text-[11rem] lg:text-[19.375rem] [font-feature-settings:'dlig'_1]"
            aria-hidden
          >
            {current.name}
          </p>
          {current.image?.url && (
            <Image
              key={`img-${active}`}
              src={current.image.url}
              alt={current.image.alt || current.name || ""}
              width={463}
              height={630}
              sizes="(min-width: 1024px) 463px, 60vw"
              className="absolute left-1/2 top-0 h-full w-auto -translate-x-1/2 object-contain animate-[fade-in_0.5s_ease-out] lg:top-[-46px] lg:h-[630px]"
            />
          )}
        </div>
      )}

      {categories.length > 1 && (
        <ul className="site-container flex flex-col items-start gap-[3px]" role="tablist">
          {categories.map((category, i) => (
            <li key={i}>
              <button
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`font-mono text-[0.875rem] uppercase leading-[1.4] tracking-[-0.01em] transition-colors ${
                  i === active ? "text-red" : "text-grey hover:text-dark-grey"
                }`}
              >
                [{String(i + 1).padStart(2, "0")}] {category.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
