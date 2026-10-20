"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Cuánto scroll (en altos de pantalla) queda fijo el banner mientras aparecen las frases y el botón. */
const LENGTH = 1.5;

/**
 * Scroll de <BannerFullScreen>: el banner se queda fijo y sus frases ([data-sweep-line]) aparecen una
 * detrás de otra con un barrido de izquierda a derecha: un desvanecido de transparente a blanco que avanza
 * hasta dejar la frase en blanco puro.
 * Al final entra el botón ([data-sweep-cta]). Va atado al scroll: al subir se deshace.
 * Las variables --a / --b (paradas del degradado) y el estado inicial están en globals.css.
 * Con "reducir movimiento" no hay nada de esto: todo visible desde el principio.
 */
export function BannerReveal() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const banner = ref.current?.parentElement;
    if (!banner || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        // refreshPriority: el pin se calcula antes que las animaciones de más abajo.
        scrollTrigger: { trigger: banner, start: "top top", end: `+=${LENGTH * 100}%`, pin: true, scrub: 0.5, refreshPriority: 1 },
      });

      // La línea de tiempo dura 1: las frases se reparten el 80 % (se solapan un poco) y el botón el final.
      const lines = gsap.utils.toArray<HTMLElement>("[data-sweep-line]", banner);
      const seg = 0.8 / Math.max(lines.length, 1);
      lines.forEach((line, i) => {
        tl.fromTo(line, { "--a": "-60%", "--b": "0%" }, { "--a": "100%", "--b": "160%", duration: seg * 1.3 }, i * seg);
      });

      const cta = banner.querySelector("[data-sweep-cta]");
      if (cta) tl.fromTo(cta, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.12, ease: "power2.out" }, 0.86);
      tl.set({}, {}, 1);
    }, banner);
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return <span ref={ref} hidden />;
}
