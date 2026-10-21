"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useStrings } from "./Strings";

type Props = {
  children: ReactNode;
  dark?: boolean;
  /** Flechas en forma de chevron (Products Highlight) en lugar de flechas. */
  caret?: boolean;
  /** Clases de la pista (gap, padding). Cada hijo define su propio ancho. */
  trackClassName?: string;
  /** Contenedor de las flechas; por defecto el de la web (alineadas a su borde derecho). */
  controlsClassName?: string;
  label?: string;
};

/**
 * Carrusel horizontal con desplazamiento táctil, arrastre con el ratón y flechas (anterior / siguiente) abajo a la derecha.
 * Si todo cabe a la vez (p. ej. 3 tarjetas en escritorio) no hay nada que pasar y las flechas no se muestran.
 */
export function Carousel({ children, dark, caret, trackClassName = "gap-4", controlsClassName = "site-container", label }: Props) {
  const { t } = useStrings();
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    // Cambios de ancho de la pista o de sus tarjetas (ventana, imágenes que cargan…).
    const resize = new ResizeObserver(update);
    resize.observe(el);
    Array.from(el.children).forEach((child) => resize.observe(child));
    return () => {
      el.removeEventListener("scroll", update);
      resize.disconnect();
    };
  }, []);

  // Arrastre con el ratón (en táctil ya desliza el navegador). Mientras se arrastra no hay snap ni scroll suave;
  // al soltar va con suavidad a la tarjeta más cercana y vuelve el snap. Si ha habido arrastre, el clic de
  // después no abre el enlace de la tarjeta.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let pointer = -1;
    let startX = 0;
    let startLeft = 0;
    let dragged = false;

    function down(e: PointerEvent) {
      if (e.pointerType !== "mouse" || e.button !== 0 || el!.scrollWidth <= el!.clientWidth) return;
      pointer = e.pointerId;
      startX = e.clientX;
      startLeft = el!.scrollLeft;
      dragged = false;
    }
    function move(e: PointerEvent) {
      if (e.pointerId !== pointer) return;
      const dx = e.clientX - startX;
      if (!dragged) {
        if (Math.abs(dx) < 5) return;
        dragged = true;
        el!.setPointerCapture(pointer);
        el!.style.scrollSnapType = "none";
        el!.style.scrollBehavior = "auto";
        el!.dataset.dragging = "";
      }
      window.getSelection()?.removeAllRanges();
      el!.scrollLeft = startLeft - dx;
    }
    function up(e: PointerEvent) {
      if (e.pointerId !== pointer) return;
      pointer = -1;
      if (!dragged) return;
      delete el!.dataset.dragging;
      // Tarjeta más cercana al borde de inicio (scroll-padding-left incluido).
      const pad = parseFloat(getComputedStyle(el!).scrollPaddingLeft) || 0;
      const origin = el!.getBoundingClientRect().left + pad;
      const offsets = Array.from(el!.children).map((child) => child.getBoundingClientRect().left - origin);
      const delta = offsets.reduce((best, o) => (Math.abs(o) < Math.abs(best) ? o : best), Infinity);
      const restore = () => {
        el!.style.scrollSnapType = "";
        el!.style.scrollBehavior = "";
      };
      if (!Number.isFinite(delta) || Math.abs(delta) < 1) return restore();
      el!.scrollBy({ left: delta, behavior: "smooth" });
      // scrollend no existe en todos los navegadores: el temporizador hace de respaldo.
      const timer = window.setTimeout(restore, 700);
      el!.addEventListener("scrollend", () => (window.clearTimeout(timer), restore()), { once: true });
    }
    function click(e: MouseEvent) {
      if (!dragged) return;
      dragged = false;
      e.preventDefault();
      e.stopPropagation();
    }

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("click", click, true);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("click", click, true);
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
    <div className="flex flex-col gap-6" role="region" aria-roledescription="carousel" aria-label={label || t("carousel", "Carrusel")}>
      {/* relative: el recorte también alcanza a lo posicionado de dentro (p. ej. el texto sr-only de <Typewriter>), si no ensancha la página. */}
      <div ref={track} className={`relative flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth scrollbar-none select-none ${
          edges.start && edges.end ? "" : "cursor-grab data-[dragging]:cursor-grabbing"
        } ${trackClassName}`}>
        {children}
      </div>
      <div className={`${controlsClassName} flex justify-end gap-1 ${edges.start && edges.end ? "hidden" : ""}`}>
        <button type="button" className={btn} onClick={() => go(-1)} disabled={edges.start} aria-label={t("prev", "Anterior")} data-carousel-prev>
          {caret ? <CaretLeft size={14} /> : <ArrowLeft size={14} />}
        </button>
        <button type="button" className={btn} onClick={() => go(1)} disabled={edges.end} aria-label={t("next", "Siguiente")} data-carousel-next>
          {caret ? <CaretRight size={14} /> : <ArrowRight size={14} />}
        </button>
      </div>
    </div>
  );
}
