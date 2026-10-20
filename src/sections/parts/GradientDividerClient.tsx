"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINES = 16;
// Escala de las líneas "cerradas": algo más de 1 para que se solapen y no quede una raya de subpíxel entre ellas.
const CLOSED = 1.1;

/**
 * Transición por persianas basada en el componente "mask" de bpp.ag: una banda con líneas negras que se escalan
 * en vertical desde su centro según el scroll (sin suavizado), escalonadas empezando por la de abajo.
 * La banda ocupa su propio hueco entre secciones (fondo blanco) y no pisa el contenido de ninguna.
 * "down" (inicio de la sección negra): las líneas crecen de 0 a cerradas, hasta que el blanco queda tapado.
 * "up" (final de la sección negra): las líneas, cerradas al principio (continúan el negro), se van abriendo.
 */
export function GradientDividerClient({ direction }: { direction: "down" | "up" }) {
  const root = useRef<HTMLDivElement>(null);
  const down = direction === "down";

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lines = el.querySelectorAll<HTMLElement>("[data-line]");

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "none" },
          // Recorrido largo (desde que asoma por abajo hasta que llega al 30% superior) con una banda baja: la
          // transición se ve durante más scroll sin dejar mucho hueco entre secciones.
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom 30%", scrub: true },
        })
        .fromTo(
          lines,
          { scaleY: down ? 0 : CLOSED },
          { scaleY: down ? CLOSED : 0, duration: 1, stagger: { from: "end", each: 0.05 } },
        );
    }, el);
    return () => ctx.revert();
  }, [down]);

  return (
    <div
      ref={root}
      className="pointer-events-none relative flex h-[30vh] flex-col bg-white"
      aria-hidden
    >
      {Array.from({ length: LINES }, (_, i) => (
        <div
          key={i}
          className="flex-1 bg-[#010101] will-change-transform"
          // Estado sin JS / movimiento reducido: el final de la transición.
          style={{ transform: `scaleY(${down ? CLOSED : 0})` }}
          data-line
        />
      ))}
    </div>
  );
}
