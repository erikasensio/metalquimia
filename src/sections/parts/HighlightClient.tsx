"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useStrings } from "@/components/ui/Strings";
import { Square, X } from "@phosphor-icons/react";
import type { WpImage, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { useGlassSpot } from "@/components/ui/useGlassSpot";

export type HighlightOverlay = { title: string; text: string; image: WpImage | null; button: WpLink | null };
export type HighlightTag = { label: string; overlay: HighlightOverlay | null };

// Posiciones de las etiquetas sobre el escenario 1512 × 1000 de Figma (se reparten en ciclo).
const SPOTS: React.CSSProperties[] = [
  { top: "27.8%", left: "21%" },
  { top: "49.9%", left: "65.1%" },
  { top: "66.3%", left: "12.4%" },
  { top: "16%", left: "68%" },
  { top: "40%", left: "4%" },
  { top: "70%", left: "72%" },
];

// Curva y duración del zoom con el que la ventana sale de la etiqueta y vuelve a ella.
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const ZOOM_MS = 550;

/** Etiquetas flotantes de cristal de <Highlight>; cada una abre su propia ventana (si tiene contenido). */
export function HighlightTags({ tags }: { tags: HighlightTag[] }) {
  // Etiqueta abierta y el botón pulsado (la ventana sale de él y vuelve a él).
  const [open, setOpen] = useState<{ index: number; origin: HTMLElement } | null>(null);
  const spot = useGlassSpot<HTMLDivElement>();

  // Figma: fondo #444 al 50 %, esquinas de 8 px, icono Square (Phosphor, relleno) de 12 px y texto mono de 14 px.
  const pill = "glass flex items-center gap-4 whitespace-nowrap rounded-[8px] bg-dark-grey/50 px-8 py-6 font-mono text-[0.875rem] uppercase leading-none tracking-[0.02em] text-light-grey";

  return (
    <div ref={spot} className="contents">
      <style>{`@keyframes mq-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
      {tags.map((tag, i) => (
        <div
          key={i}
          className="absolute z-10 motion-safe:animate-[mq-float_6s_ease-in-out_infinite]"
          style={{ ...SPOTS[i % SPOTS.length], animationDelay: `${i * -1.3}s` }}
        >
          {tag.overlay ? (
            <button
              type="button"
              onClick={(e) => setOpen({ index: i, origin: e.currentTarget })}
              aria-haspopup="dialog"
              aria-expanded={open?.index === i}
              // La etiqueta se convierte en la ventana: no se ve mientras está abierta (al cerrar vuelve con un fundido, ver HighlightModal).
              className={`${pill} cursor-pointer ${open?.index === i ? "opacity-0" : ""}`}
            >
              <Square size={12} weight="fill" className="shrink-0" aria-hidden />
              {tag.label}
            </button>
          ) : (
            <span className={pill}>
              <Square size={12} weight="fill" className="shrink-0" aria-hidden />
              {tag.label}
            </span>
          )}
        </div>
      ))}

      {open && tags[open.index]?.overlay && (
        <HighlightModal key={open.index} overlay={tags[open.index].overlay!} origin={open.origin} onClose={() => setOpen(null)} />
      )}
    </div>
  );
}

/**
 * Ventana de cristal (Figma 446:35255) sobre un velo muy suave en toda la página.
 * Entra creciendo desde la etiqueta pulsada (FLIP: se coloca encima de la etiqueta, a su tamaño, y vuelve
 * a su sitio) y al cerrarse hace el camino inverso antes de desmontarse.
 */
function HighlightModal({ overlay, origin, onClose }: { overlay: HighlightOverlay; origin: HTMLElement; onClose: () => void }) {
  const { t } = useStrings();
  const panel = useRef<HTMLDivElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const reveal = useRef<Animation | null>(null);

  // Transformación que lleva la ventana (en su sitio final) a la posición y el tamaño de la etiqueta.
  const fromOrigin = () => {
    const el = panel.current;
    if (!el) return "scale(0.9)";
    const a = origin.getBoundingClientRect();
    // Caja de la ventana sin transformaciones (offset* las ignoran): si ya hay una animación en marcha
    // (StrictMode monta dos veces en desarrollo, o se cierra a medio abrir) getBoundingClientRect mediría
    // la ventana ya encogida y el zoom saldría nulo.
    const p = (el.offsetParent as HTMLElement | null)?.getBoundingClientRect() ?? { left: 0, top: 0 };
    const b = { left: p.left + el.offsetLeft, top: p.top + el.offsetTop, width: el.offsetWidth, height: el.offsetHeight };
    const dx = a.left + a.width / 2 - (b.left + b.width / 2);
    const dy = a.top + a.height / 2 - (b.top + b.height / 2);
    return `translate(${dx}px, ${dy}px) scale(${a.width / b.width}, ${a.height / b.height})`;
  };
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  useLayoutEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (reduced()) {
      el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
    } else {
      el.animate(
        [
          // Visible casi desde el primer fotograma para que se vea salir de la etiqueta (como al cerrar).
          { transform: fromOrigin(), opacity: 0, borderRadius: "8px" },
          { opacity: 1, offset: 0.08 },
          { transform: "none", opacity: 1, borderRadius: "12px" },
        ],
        { duration: ZOOM_MS + 100, easing: "cubic-bezier(0.32, 0.72, 0, 1)" },
      );
    }
    veil.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: "ease-out" });
    // Al desmontar (en el mismo render que vuelve a mostrar la etiqueta) se quita su fundido de vuelta.
    return () => reveal.current?.cancel();
    // fromOrigin y reduced solo leen el DOM en el momento de abrir.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function close() {
    const el = panel.current;
    if (!el || closing.current) return;
    closing.current = true;
    const fast = reduced();
    const duration = fast ? 200 : ZOOM_MS * 0.8;
    // La etiqueta reaparece mientras la ventana se funde sobre ella (desde el 65 % del cierre).
    reveal.current = origin.animate([{ opacity: 0 }, { opacity: 1 }], {
      delay: fast ? 0 : duration * 0.65,
      duration: fast ? duration : duration * 0.35,
      easing: "ease-out",
      fill: "forwards",
    });
    const anim = el.animate(
      fast
        ? [{ opacity: 1 }, { opacity: 0 }]
        : [
            // Desde donde esté ahora (por si se cierra antes de terminar de abrirse).
            { transform: getComputedStyle(el).transform, opacity: Number(getComputedStyle(el).opacity) },
            { opacity: 1, offset: 0.65 },
            { transform: fromOrigin(), opacity: 0 },
          ],
      { duration, easing: EASE, fill: "forwards" },
    );
    veil.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350, easing: "ease-in", fill: "forwards" });
    anim.onfinish = () => {
      onClose();
      origin.focus();
    };
  }

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = prev;
    };
    // close solo usa refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={close}>
      <div ref={veil} className="absolute inset-0 bg-black/25" aria-hidden />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={overlay.title || undefined}
        onClick={(e) => e.stopPropagation()}
        // Con imagen, alto fijo de Figma (la imagen va abajo); sin ella, lo que ocupe el texto, centrada.
        className={`glass flex max-h-full ${overlay.image ? "min-h-[min(770px,100%)]" : ""} w-[468px] max-w-full flex-col gap-6 overflow-y-auto rounded-[12px] bg-dark-grey/50 p-6 text-light-grey scrollbar-none`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col items-start gap-6">
            {overlay.title && <h3 className="text-title-m tracking-[-0.01em]">{overlay.title}</h3>}
            {overlay.text && <p className="text-body-m whitespace-pre-line font-medium text-grey">{overlay.text}</p>}
            {overlay.button && (
              <Button href={overlay.button.url} target={overlay.button.target} variant="black">
                {overlay.button.title}
              </Button>
            )}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={t("close", "Close")}
            className="flex shrink-0 cursor-pointer items-center justify-center bg-black-grey p-[11px] text-light-grey backdrop-blur-[20px] transition-colors hover:bg-black"
          >
            <X size={14} />
          </button>
        </div>
        {overlay.image && (
          <div className="relative mt-auto aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[4px]">
            <Image src={overlay.image.url} alt={overlay.image.alt || ""} fill sizes="420px" className="object-cover" />
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
