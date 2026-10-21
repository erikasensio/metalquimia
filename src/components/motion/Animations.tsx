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
 *   data-cards         → sus tarjetas [data-card] suben desde abajo una detrás de otra. Lo de dentro de una tarjeta
 *                        (textos, líneas, botones) no se anima por su cuenta: llega con la tarjeta.
 *   data-rule          → línea divisoria que crece de izquierda a derecha al entrar en pantalla.
 *   data-ink           → el titular se entinta con el scroll palabra a palabra: gris tenue → destello naranja → negro.
 *   data-typewriter-group → sus textos (<Typewriter>, data-paint, data-typewriter-html) se animan, en orden, al entrar
 *     en pantalla. + data-typewriter-sequence (uno detrás de otro), data-typewriter-delay="s",
 *     data-typewriter-speed="n" (multiplica la velocidad) y un hijo data-typewriter-line (línea que crece de izquierda
 *     a derecha antes del texto). Un grupo dentro de otro se funde con el de fuera, y un texto suelto fuera de
 *     cualquier grupo es su propio grupo.
 * Cómo se anima cada texto lo decide su tipografía (ver textMode), no el módulo:
 *   - ABC Dyatype Mono (eyebrows, etiquetas, números) → se escribe a máquina, letra a letra.
 *   - Titulares en Lay Grotesk (h1/h2 o de gran tamaño) → aparecen palabra a palabra con destello naranja.
 *   - El resto (títulos pequeños en Lay Grotesk y cuerpos) → se descubren línea a línea con una cortinilla hacia abajo.
 * data-reveal es para lo que no es texto (botones, imágenes, formularios).
 * .spotlight: el punto de luz sigue al cursor dentro de la tarjeta (--sx / --sy; el aspecto, en globals.css).
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

  // Ni las imágenes ni los enlaces se arrastran (fantasma del navegador al hacer drag). En Chrome y Safari ya lo
  // impide -webkit-user-drag en globals.css; esto lo cubre en Firefox.
  useEffect(() => {
    function block(e: DragEvent) {
      if ((e.target as Element).closest?.("img, video, a")) e.preventDefault();
    }
    document.addEventListener("dragstart", block);
    return () => document.removeEventListener("dragstart", block);
  }, []);

  // Punto de luz de las tarjetas .spotlight: posición del cursor relativa a la tarjeta que tiene debajo.
  useEffect(() => {
    if (!matchMedia("(hover: hover)").matches) return;
    function move(e: PointerEvent) {
      const card = (e.target as Element).closest?.<HTMLElement>(".spotlight");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--sx", `${e.clientX - r.left}px`);
      card.style.setProperty("--sy", `${e.clientY - r.top}px`);
    }
    document.addEventListener("pointermove", move, { passive: true });
    return () => document.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("js-motion");
    if (reduce) return;

    // Sin once: true a propósito. Un trigger "once" que ya ha pasado se destruye al refrescarse y, si eso ocurre
    // mientras ScrollTrigger recorre los anteriores para crear uno nuevo, revienta ("reading 'end'"). El
    // toggleActions por defecto ("play none none none") hace lo mismo: se reproduce al entrar y ya no vuelve.
    // Lo que ya se ve al cargar (p. ej. el botón al pie de un hero) se anima directamente, sin esperar a que el scroll
    // lo suba hasta su punto de disparo; el resto entra al llegar a `start`.
    const startAt = (el: Element, start: string) => (el.getBoundingClientRect().top < window.innerHeight ? "top bottom" : start);

    // Las líneas se miden con la tipografía ya cargada.
    let ctx: gsap.Context | undefined;
    let dead = false;
    document.fonts.ready.then(() => {
      if (dead) return;
      ctx = gsap.context(setup);
      ScrollTrigger.refresh();
    });

    function setup() {
      // Tarjetas: suben desde abajo, una detrás de otra. Lo de dentro llega con ellas (no se anima aparte).
      gsap.utils.toArray<HTMLElement>("[data-cards]").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll("[data-card]"),
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: el, start: startAt(el, "top 85%") } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        gsap.from(el.querySelectorAll("[data-word]"), {
          yPercent: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.04,
          scrollTrigger: { trigger: el, start: startAt(el, "top 88%") },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").filter((el) => !el.closest("[data-card]")).forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: startAt(el, "top 90%") } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "power2.inOut", scrollTrigger: { trigger: el, start: startAt(el, "top 92%") } });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        gsap.from(el.children, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: startAt(el, "top 88%") },
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

      // Textos sueltos (fuera de cualquier grupo): cada uno es su propio grupo. Los de las tarjetas no se animan.
      const inGroup = (el: Element) => el.parentElement?.closest("[data-typewriter-group]");
      document.querySelectorAll<HTMLElement>("[data-typewriter], [data-typewriter-html], [data-paint]").forEach((el) => {
        if (!inGroup(el) && !el.hasAttribute("data-typewriter-group") && !el.closest("[data-card]")) el.setAttribute("data-typewriter-group", "");
      });
      // Las letras empiezan ocultas por CSS; al acabar se marca data-typed para que lo que se pinte después se vea ya.
      // Solo los grupos de fuera: los de dentro se animan con ellos, en el orden en que aparecen.
      gsap.utils.toArray<HTMLElement>("[data-typewriter-group]").filter((el) => !inGroup(el) && !el.closest("[data-card]")).forEach((el) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: startAt(el, "top 80%") },
          onComplete: () => el.setAttribute("data-typed", ""),
        });
        let at = parseFloat(el.dataset.typewriterDelay || "0");
        const speed = parseFloat(el.dataset.typewriterSpeed || "1");
        const sequence = el.hasAttribute("data-typewriter-sequence");
        // data-typewriter-line: las líneas crecen de izquierda a derecha antes de que empiece el texto.
        const lines = el.querySelectorAll("[data-typewriter-line]");
        if (lines.length) {
          tl.fromTo(lines, { scaleX: 0 }, { scaleX: 1, duration: 0.6 / speed, ease: "none" }, at);
          at += 0.2 / speed;
        }
        const texts = el.matches("[data-typewriter], [data-typewriter-html], [data-paint]")
          ? [el]
          : el.querySelectorAll<HTMLElement>("[data-typewriter], [data-typewriter-html], [data-paint]");
        texts.forEach((text, i) => {
          const start = sequence ? at : at + i * 0.08;
          const mode = textMode(text);
          // data-typewriter-html: HTML del editor (párrafos, negritas…). Solo se parte en letras si se escribe a máquina.
          if (text.matches("[data-typewriter-html]:not([data-typewriter])")) {
            if (mode === "type") splitChars(text);
            else text.style.visibility = "visible";
          }
          const units = gsap.utils.toArray<HTMLElement>(text.querySelectorAll("[data-word], [data-char]"));

          if (mode === "paint") {
            // Titular: palabra a palabra (o letra a letra), de tenue a su color con un destello naranja.
            const colors = units.map((w) => getComputedStyle(w).color);
            const stagger = (units[0]?.hasAttribute("data-char") ? 0.015 : 0.06) / speed;
            tl.to(units, { opacity: 1, duration: 0.35 / speed, stagger, ease: "none" }, start);
            tl.fromTo(
              units,
              { color: "#ff2f00" },
              { color: (i: number) => colors[i], duration: 0.6 / speed, stagger, ease: "power1.in", immediateRender: false, clearProps: "color" },
              start,
            );
            // Lo que va detrás (subtítulo, texto) no espera a que acabe de pintarse: aparece a la vez.
            if (sequence) at += 0.15 / speed;
            return;
          }

          if (mode === "type") {
            if (sequence) {
              // Cada texto empieza al acabar el anterior; los largos se teclean más rápido (máximo ~1,2 s por texto).
              const stagger = Math.min(0.03, 1.2 / Math.max(units.length, 1)) / speed;
              tl.to(units, { opacity: 1, duration: 0.01, stagger }, start);
              at += units.length * stagger;
            } else {
              tl.to(units, { opacity: 1, duration: 0.01, stagger: 0.03 / speed }, start);
            }
            return;
          }

          // Cortinilla línea a línea: las líneas se miden al dispararse, con el ancho de ese momento.
          gsap.set(units.length ? units : text.children.length ? text.children : text, { opacity: 0 });
          const count = Math.max(1, Math.round(text.getBoundingClientRect().height / (parseFloat(getComputedStyle(text).lineHeight) || 20)));
          const duration = (0.6 + (count - 1) * 0.06) / speed;
          tl.call(() => riseText(text, speed), undefined, start);
          tl.to({}, { duration }, start);
          if (sequence) at += (0.1 + count * 0.05) / speed;
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
    }

    // Las imágenes cambian la altura de la página al cargar: recalcula posiciones.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      dead = true;
      window.removeEventListener("load", refresh);
      ctx?.revert();
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

/**
 * Cómo se anima un texto según su tipografía: Dyatype Mono a máquina; titulares en Lay Grotesk (h1/h2 o grandes)
 * con destello; el resto (títulos pequeños y cuerpos) se descubre línea a línea.
 */
function textMode(el: HTMLElement): "type" | "paint" | "rise" {
  const style = getComputedStyle(el);
  if (/Dyatype/i.test(style.fontFamily)) return "type";
  const size = parseFloat(style.fontSize);
  if (/Lay Grotesk/i.test(style.fontFamily) && (size >= 30 || (size >= 24 && el.closest("h1, h2")))) return "paint";
  return "rise";
}

/**
 * Descubre un texto línea a línea con una cortinilla de arriba abajo (casi sin moverlo). No toca el DOM ni el layout:
 * cada palabra o letra tiene un clip-path que se abre hacia abajo y se asienta unos pocos píxeles con `top`
 * (posición relativa), así el texto ya está en su tamaño y sitio desde el principio.
 */
function riseText(text: HTMLElement, speed: number) {
  const units = gsap.utils.toArray<HTMLElement>(text.querySelectorAll("[data-word], [data-char]"));
  if (!units.length) {
    // HTML del editor: bloque a bloque, con un fundido corto.
    const blocks = text.children.length ? Array.from(text.children) : [text];
    gsap.fromTo(blocks, { opacity: 0 }, { opacity: 1, duration: 0.6 / speed, ease: "power2.out", stagger: 0.06 / speed });
    return;
  }
  // Líneas: las palabras o letras que caen a la misma altura.
  const lines: HTMLElement[][] = [];
  let top = -Infinity;
  units.forEach((unit) => {
    const y = unit.getBoundingClientRect().top;
    if (y > top + 2) {
      lines.push([]);
      top = y;
    }
    lines[lines.length - 1].push(unit);
  });
  gsap.set(units, { opacity: 1, position: "relative" });
  lines.forEach((line, i) =>
    gsap.fromTo(
      line,
      // Empieza recortada entera (el borde inferior del recorte arriba del todo) y se abre hacia abajo; los márgenes
      // negativos del final dejan ver ascendentes, acentos y descendentes.
      { top: "0.3em", clipPath: "inset(0em -0.2em 1.4em -0.2em)" },
      {
        top: "0em",
        clipPath: "inset(-0.5em -0.2em -0.3em -0.2em)",
        duration: 0.6 / speed,
        ease: "power2.out",
        delay: (i * 0.06) / speed,
        clearProps: "top,clipPath,position",
      },
    ),
  );
}
