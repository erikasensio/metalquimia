"use client";

import { useEffect, useRef } from "react";

/**
 * Cifra que cuenta desde 0 al entrar en pantalla ("50+", "+100", "1.500", "2,5x").
 * Se pinta ya con el valor final (sin JS o con movimiento reducido se queda así)
 * y solo se reescribe el texto del nodo durante la animación.
 */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\D*?)(\d[\d.,]*\d|\d)([\s\S]*)$/);
    if (!el || !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, raw, suffix] = match;
    // Un separador seguido de exactamente 3 cifras es de miles; si no, es decimal.
    const sep = raw.match(/[.,]/g) ?? [];
    const last = raw.search(/[.,]\d+$/);
    const isDecimal = sep.length > 0 && last >= 0 && raw.length - last - 1 !== 3;
    const decSep = isDecimal ? raw[last] : "";
    const groupSep = sep.find((s) => s !== decSep) ?? "";
    const decimals = isDecimal ? raw.length - last - 1 : 0;
    const target = parseFloat(raw.split(groupSep || "\u0000").join("").replace(decSep || "\u0000", "."));
    if (!isFinite(target)) return;

    const format = (n: number) => {
      const [int, dec] = n.toFixed(decimals).split(".");
      const grouped = groupSep ? int.replace(/\B(?=(\d{3})+(?!\d))/g, groupSep) : int;
      return `${prefix}${grouped}${dec ? decSep + dec : ""}${suffix}`;
    };

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          el.textContent = format(target * (1 - Math.pow(1 - t, 3)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    // Solo se pone a 0 si aún no se ha visto (si ya está en pantalla arranca enseguida).
    el.textContent = format(0);
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
    </span>
  );
}
