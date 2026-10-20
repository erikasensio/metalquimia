"use client";

import { useEffect, useRef } from "react";

/** Distancia (px) a la que una pastilla .glass empieza a iluminarse al acercar el cursor. */
const SPOT_RANGE = 60;

/**
 * Foco de luz de las pastillas .glass dentro del contenedor: cada una recibe la posición del cursor
 * relativa a sí misma (--mx / --my, aunque esté fuera) y una intensidad --glass-spot que crece al acercarse.
 */
export function useGlassSpot<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !matchMedia("(hover: hover)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      frame = 0;
      root.querySelectorAll<HTMLElement>(".glass").forEach((el) => {
        const r = el.getBoundingClientRect();
        const dist = Math.hypot(Math.max(r.left - x, 0, x - r.right), Math.max(r.top - y, 0, y - r.bottom));
        el.style.setProperty("--mx", `${x - r.left}px`);
        el.style.setProperty("--my", `${y - r.top}px`);
        el.style.setProperty("--glass-spot", String(Math.max(0, 1 - dist / SPOT_RANGE)));
      });
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    // Al salir de la ventana el cursor "se aleja" y el foco se apaga.
    const onLeave = () => {
      x = y = -1e4;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
