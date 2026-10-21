"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animaciones de scroll de toda la web (referencias del Figma: voltlites.com, victorfuruya.com/about).
 * Los módulos solo marcan elementos con atributos:
 *   data-reveal        → aparece subiendo y con fundido al entrar en pantalla.
 *   data-split         → el título se revela palabra a palabra (las palabras las parte <SplitWords>).
 *   data-parallax="n"  → se desplaza más lento que el scroll (n = intensidad, 0.1–0.3).
 *   data-stagger       → sus hijos directos aparecen uno detrás de otro.
 *   data-ink           → el texto se entinta con el scroll palabra a palabra: gris tenue → destello naranja → negro.
 *   data-typewriter-group → sus textos <Typewriter> se escriben letra a letra, en orden, al entrar en pantalla.
 *     + data-typewriter-sequence (uno detrás de otro), data-typewriter-delay="s" y un hijo data-typewriter-line
 *       (línea que crece de izquierda a derecha antes del texto). Dentro también valen data-typewriter-html
 *       (HTML que se teclea) y data-paint (título <SplitWords> que se pinta de gris clarito a su color).
 * Además, el texto <RollText> de los .cta gira como un rodillo de tragaperras al entrar y salir el ratón.
 */
export function Animations() {
  const pathname = usePathname();

  // Rodillo de los CTA: siempre hacia arriba, al entrar y al salir. Baja un poco antes de
  // salir disparado (referencia: botón "BUILD W/ ICOMAT" de icomat.co.uk).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    function roll(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      const cta = (e.target as Element).closest?.(".cta");
      if (!cta || cta.contains(e.relatedTarget as Node | null)) return;
      const text = cta.querySelector<HTMLElement>(".cta-roll > span");
      if (!text) return;
      text.getAnimations().forEach((a) => a.cancel());
      text.animate(
        [
          { transform: "translateY(0)", filter: "blur(0)", easing: "cubic-bezier(0.3, 0, 0.7, 1)" },
          { transform: "translateY(0.15em)", filter: "blur(0)", offset: 0.3, easing: "cubic-bezier(0.6, 0, 1, 1)" },
          { transform: "translateY(calc(-50% - 0.15em))", filter: "blur(1.5px)", offset: 0.55, easing: "cubic-bezier(0, 0, 0.2, 1)" },
          { transform: "translateY(calc(-100% - 0.3em))", filter: "blur(0)" },
        ],
        { duration: 450 },
      );
    }
    document.addEventListener("pointerover", roll);
    document.addEventListener("pointerout", roll);
    return () => {
      document.removeEventListener("pointerover", roll);
      document.removeEventListener("pointerout", roll);
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("js-motion");
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        gsap.from(el.querySelectorAll("[data-word]"), {
          yPercent: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        gsap.from(el.children, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // Tinta con el scroll: palabra a palabra, de principio a fin del texto, cada una pasa de gris tenue
      // a un destello naranja y luego a negro (el naranja va por delante del negro como una ola).
      gsap.utils.toArray<HTMLElement>("[data-ink]").forEach((el) => {
        const words = el.querySelectorAll<HTMLElement>("[data-word]");
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top 85%", end: "top 30%", scrub: true } })
          .fromTo(words, { color: "rgba(33, 33, 33, 0.2)" }, { color: "#ff2f00", duration: 0.3, stagger: 0.1, ease: "none" }, 0)
          .to(words, { color: "#010001", duration: 0.3, stagger: 0.1, ease: "none" }, 0.3);
      });

      // Las letras empiezan ocultas por CSS; al acabar se marca data-typed para que lo que se pinte después se vea ya.
      gsap.utils.toArray<HTMLElement>("[data-typewriter-group]").forEach((el) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
          onComplete: () => el.setAttribute("data-typed", ""),
        });
        let at = parseFloat(el.dataset.typewriterDelay || "0");
        // data-typewriter-line: la línea crece de izquierda a derecha antes de que empiece a escribirse.
        const line = el.querySelector("[data-typewriter-line]");
        if (line) {
          tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "none" }, at);
          at += 0.2;
        }
        // data-typewriter-html: HTML del editor (párrafos, negritas…) que se parte aquí en letras, una sola vez.
        el.querySelectorAll<HTMLElement>("[data-typewriter-html]:not([data-typewriter])").forEach(splitChars);
        el.querySelectorAll<HTMLElement>("[data-typewriter], [data-paint]").forEach((text, i) => {
          // data-paint: el título se pinta palabra a palabra, de gris muy clarito a su color,
          // con un destello naranja en la palabra recién escrita.
          if (text.hasAttribute("data-paint")) {
            const words = gsap.utils.toArray<HTMLElement>(text.querySelectorAll("[data-word]"));
            const colors = words.map((w) => getComputedStyle(w).color);
            tl.to(words, { opacity: 1, duration: 0.35, stagger: 0.06, ease: "none" }, at);
            tl.fromTo(
              words,
              { color: "#ff2f00" },
              { color: (i: number) => colors[i], duration: 0.6, stagger: 0.06, ease: "power1.in", immediateRender: false, clearProps: "color" },
              at,
            );
            at += words.length * 0.06;
            return;
          }
          const chars = text.querySelectorAll("[data-char]");
          if (el.hasAttribute("data-typewriter-sequence")) {
            // En secuencia: cada texto empieza al acabar el anterior; los largos se teclean más rápido
            // (máximo ~1,2 s por texto) para que un párrafo no se eternice.
            const stagger = Math.min(0.03, 1.2 / Math.max(chars.length, 1));
            tl.to(chars, { opacity: 1, duration: 0.01, stagger }, at);
            at += chars.length * stagger;
          } else {
            // Cada texto se escribe a la vez que los demás, con un pequeño desfase entre uno y el siguiente.
            tl.to(chars, { opacity: 1, duration: 0.01, stagger: 0.03 }, at + i * 0.08);
          }
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || "0.15") * 100;
        gsap.fromTo(
          el,
          { yPercent: -amount / 2 },
          { yPercent: amount / 2, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    });

    // Las imágenes cambian la altura de la página al cargar: recalcula posiciones.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}

/** Envuelve cada letra de los textos de `el` en un span data-char (respeta etiquetas) y lo marca como data-typewriter. */
function splitChars(el: HTMLElement) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    const frag = document.createDocumentFragment();
    Array.from(node.data).forEach((char) => {
      const span = document.createElement("span");
      span.setAttribute("data-char", "");
      span.textContent = char;
      frag.appendChild(span);
    });
    node.replaceWith(frag);
  });
  el.setAttribute("data-typewriter", "");
}
