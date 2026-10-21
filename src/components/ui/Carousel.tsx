"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";

type Props = {
  children: ReactNode;
  dark?: boolean;
  /** Flechas en forma de chevron (Products Highlight) en lugar de flechas. */
  caret?: boolean;
  /** Clases de la pista (gap, padding). Cada hijo define su propio ancho. */
  trackClassName?: string;
  label?: string;
};

/** Carrusel horizontal con desplazamiento táctil y flechas (anterior / siguiente) abajo a la derecha. */
export function Carousel({ children, dark, caret, trackClassName = "gap-4", label = "Carrusel" }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function go(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const item = el.firstElementChild as HTMLElement | null;
    const step = item ? item.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  const btn = `flex ${caret ? "size-9" : "size-8"} items-center justify-center transition-colors disabled:opacity-30 ${
    dark ? "bg-black-grey text-light-grey hover:bg-dark-grey" : "bg-medium-grey text-dark-grey hover:bg-grey hover:text-white"
  }`;

  return (
    <div className="flex flex-col gap-6" role="region" aria-roledescription="carousel" aria-label={label}>
      {/* relative: el recorte también alcanza a lo posicionado de dentro (p. ej. el texto sr-only de <Typewriter>), si no ensancha la página. */}
      <div ref={track} className={`relative flex snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-none ${trackClassName}`}>
        {children}
      </div>
      <div className="site-container flex justify-end gap-1">
        <button type="button" className={btn} onClick={() => go(-1)} disabled={edges.start} aria-label="Anterior" data-carousel-prev>
          {caret ? <CaretLeft size={14} /> : <ArrowLeft size={14} />}
        </button>
        <button type="button" className={btn} onClick={() => go(1)} disabled={edges.end} aria-label="Siguiente" data-carousel-next>
          {caret ? <CaretRight size={14} /> : <ArrowRight size={14} />}
        </button>
      </div>
    </div>
  );
}
