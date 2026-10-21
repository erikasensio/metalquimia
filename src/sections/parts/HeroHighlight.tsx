"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Cuánto scroll (en altos de pantalla) queda fijo el hero mientras se ilumina el texto. */
const LENGTH = 1.2;

/**
 * Scroll del <SecondaryHero> con scroll_highlight: el hero se queda fijo bajo la cabecera y el texto de la
 * derecha ([data-highlight]) se ilumina palabra a palabra con el scroll: gris muy tenue → destello naranja →
 * su color (gris o negro según la parte). Cuando está todo iluminado entra el botón ([data-highlight-cta]) y
 * la página sigue. Va atado al scroll: al subir se deshace.
 * El estado inicial (palabras tenues, botón oculto) está en globals.css; con "reducir movimiento" todo se ve desde el principio.
 */
export function HeroHighlight() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = ref.current?.parentElement;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // El hero va justo debajo de la cabecera fija: se fija ahí, sin meterse por debajo.
      const header = () => document.querySelector("header")?.offsetHeight ?? 0;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        // refreshPriority: el pin se calcula antes que las animaciones de más abajo.
        scrollTrigger: {
          trigger: hero,
          start: () => `top ${header()}px`,
          end: () => `+=${LENGTH * window.innerHeight}`,
          pin: true,
          scrub: 0.5,
          refreshPriority: 1,
          invalidateOnRefresh: true,
        },
      });

      // La línea de tiempo dura 1: las palabras ocupan el 80 % y el botón entra al final.
      const words = gsap.utils.toArray<HTMLElement>("[data-highlight] [data-word]", hero);
      // El color final es el de su parte (gris o negro): el CSS solo atenúa las palabras, no el span que las envuelve.
      const colors = words.map((w) => getComputedStyle(w.parentElement!).color);
      const amount = 0.64;
      tl.fromTo(words, { color: "rgba(1, 0, 1, 0.1)" }, { color: "#ff2f00", duration: 0.08, stagger: { amount } }, 0.02).to(
        words,
        { color: (i: number) => colors[i], duration: 0.08, stagger: { amount } },
        0.1,
      );

      const cta = hero.querySelector("[data-highlight-cta]");
      if (cta) tl.fromTo(cta, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.1, ease: "power2.out" }, 0.84);
      tl.set({}, {}, 1);
    }, hero);
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return <span ref={ref} hidden />;
}
