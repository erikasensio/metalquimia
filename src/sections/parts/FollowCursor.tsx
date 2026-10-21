"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

/**
 * El contenido se desplaza un poco hacia el cursor mientras está sobre la tarjeta (`.group` más cercano)
 * y vuelve al centro al salir. `strength`: desplazamiento máximo en px desde el centro.
 */
export function FollowCursor({ children, strength = 14, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const card = el?.closest<HTMLElement>(".group") ?? el?.parentElement;
    if (!el || !card || !matchMedia("(hover: hover)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const toX = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
    const toY = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      toX(((e.clientX - r.left) / r.width - 0.5) * 2 * strength);
      toY(((e.clientY - r.top) / r.height - 0.5) * 2 * strength);
    };
    const onLeave = () => {
      toX(0);
      toY(0);
    };
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
