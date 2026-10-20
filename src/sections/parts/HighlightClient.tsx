"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "@phosphor-icons/react";
import type { WpImage, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";

type Overlay = { title: string; text: string; image: WpImage | null; button: WpLink | null };

// Posiciones de las etiquetas sobre el escenario 1512 × 1000 de Figma (se reparten en ciclo).
const SPOTS: React.CSSProperties[] = [
  { top: "27.8%", left: "21%" },
  { top: "49.9%", left: "65.1%" },
  { top: "66.3%", left: "12.4%" },
  { top: "16%", left: "68%" },
  { top: "40%", left: "4%" },
  { top: "70%", left: "72%" },
];

/** Etiquetas flotantes de <Highlight> y tarjeta que se abre al pulsarlas. */
export function HighlightTags({ tags, overlay }: { tags: string[]; overlay: Overlay | null }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Figma: fondo #444 al 50 %, esquinas de 8 px, cuadrado de 12 px y texto mono de 14 px.
  const pill = "flex items-center gap-4 whitespace-nowrap rounded-[8px] border border-transparent bg-dark-grey/50 px-8 py-6 font-mono text-[0.875rem] uppercase leading-none tracking-[0.02em] text-light-grey backdrop-blur";

  return (
    <>
      <style>{`@keyframes mq-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
      {tags.map((label, i) => (
        <div
          key={i}
          className="absolute z-10 motion-safe:animate-[mq-float_6s_ease-in-out_infinite]"
          style={{ ...SPOTS[i % SPOTS.length], animationDelay: `${i * -1.3}s` }}
        >
          {overlay ? (
            <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className={`${pill} transition-colors hover:border-red`}>
              <span className="size-3 bg-light-grey" aria-hidden />
              {label}
            </button>
          ) : (
            <span className={pill}>
              <span className="size-3 bg-light-grey" aria-hidden />
              {label}
            </span>
          )}
        </div>
      ))}

      {overlay && open && (
        <div className="absolute inset-0 z-20 flex animate-[fade-in_0.3s_ease-out] items-center justify-center" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={overlay.title || undefined}
            onClick={(e) => e.stopPropagation()}
            className="relative grid w-[min(92vw,520px)] bg-white text-black-grey sm:grid-cols-[42%_1fr]"
          >
            {overlay.image && (
              <div className="relative aspect-[4/3] sm:aspect-auto">
                <Image src={overlay.image.url} alt={overlay.image.alt || ""} fill sizes="240px" className="object-cover" />
              </div>
            )}
            <div className={`flex flex-col items-start gap-3 p-5 pr-12 ${overlay.image ? "" : "sm:col-span-2"}`}>
              {overlay.title && <h3 className="text-title-xs text-black">{overlay.title}</h3>}
              {overlay.text && <p className="text-body-s text-dark-grey">{overlay.text}</p>}
              {overlay.button && (
                <Button href={overlay.button.url} target={overlay.button.target} variant="red" className="mt-2">
                  {overlay.button.title}
                </Button>
              )}
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute right-2 top-2 flex size-8 items-center justify-center bg-white text-black transition-colors hover:bg-medium-grey"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
