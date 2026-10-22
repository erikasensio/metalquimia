"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { SplitWords } from "@/components/motion/SplitWords";
import { Typewriter } from "@/components/motion/Typewriter";
import { useStrings } from "@/components/ui/Strings";

gsap.registerPlugin(ScrollTrigger);

type Process = { label?: string; link?: WpLink | null; thumbnail?: WpImage | null };
type Category = { name?: string; image?: WpImage | null; frames?: WpImage[] | false | null; processes?: Process[] };

type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  button?: WpLink | null;
  word_outline?: boolean | null;
  categories?: Category[];
};

// Palabra gigante de fondo (y, si se elige, su contorno encima de la imagen).
const WORD =
  "absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[6rem] font-semibold leading-[1.1] md:text-[11rem] lg:text-[min(19.375rem,32svh)] [font-feature-settings:'dlig'_1]";

// Flechas negras como las de los carruseles oscuros (Figma "Buttons" con CaretLeft / CaretRight).
const ARROW = "pointer-events-auto flex size-9 items-center justify-center bg-black-grey text-white transition-colors hover:bg-dark-grey";

/**
 * Bloque de soluciones por categoría (Figma "products" 160:2762), en forma de slider.
 * Se pasa de categoría con las flechas, deslizando en táctil o con su nombre en la lista de abajo; cambian
 * la palabra de fondo, la imagen y la lista de procesos. La nueva entra desde el lado y frena de golpe.
 * La imagen se mueve con el scroll (parallax) y, si la categoría tiene fotogramas, el scroll pasa de uno a otro.
 */
export default function Products({ eyebrow, title_muted, title, button, word_outline, categories = [] }: Props) {
  // Contenido anterior al campo: sin valor guardado se mantiene el contorno.
  const outline = word_outline !== false;
  const [active, setActive] = useState(0);
  const current = categories[active];
  // Sin los huecos vacíos (p. ej. imágenes que faltan en modo mock).
  const validFrames = Array.isArray(current?.frames) ? current.frames.filter((frame) => frame?.url) : [];
  const frames = validFrames.length > 1 ? validFrames : null;
  const visual = useRef<HTMLDivElement>(null);
  const { t } = useStrings();
  // Lado por el que entra la siguiente categoría: 1 desde la derecha, -1 desde la izquierda, 0 sin animación (al cargar).
  const direction = useRef(0);

  function go(index: number, dir: 1 | -1) {
    const next = (index + categories.length) % categories.length;
    if (next === active) return;
    direction.current = dir;
    setActive(next);
  }

  // Procesos (arriba a la derecha): al cambiar de categoría se borran los de antes, letra a letra desde el final,
  // y luego se escriben los nuevos. `listed` es la categoría cuyos procesos se ven en cada momento.
  const [listed, setListed] = useState(0);
  const list = useRef<HTMLUListElement>(null);
  const typing = useRef<gsap.core.Tween | null>(null);
  const typeIn = useRef(false);
  const shown = categories[listed]?.processes ?? [];

  useEffect(() => {
    if (listed === active) return;
    typing.current?.kill();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    typeIn.current = !reduced;
    const chars = list.current?.querySelectorAll("[data-char]");
    if (!chars?.length || reduced) {
      setListed(active);
      return;
    }
    typing.current = gsap.to(chars, {
      opacity: 0,
      duration: 0.01,
      stagger: { each: Math.min(0.012, 0.5 / chars.length), from: "end" },
      onComplete: () => setListed(active),
    });
  }, [active, listed]);

  // Antes de pintar: los nuevos empiezan ocultos y se teclean.
  useLayoutEffect(() => {
    const chars = list.current?.querySelectorAll("[data-char]");
    if (!typeIn.current || !chars?.length) return;
    typeIn.current = false;
    typing.current = gsap.fromTo(chars, { opacity: 0 }, { opacity: 1, duration: 0.01, stagger: Math.min(0.02, 0.8 / chars.length) });
  }, [listed]);

  useEffect(() => () => void typing.current?.kill(), []);

  // Deslizar en táctil sobre la imagen (en vertical sigue haciendo scroll la página).
  const swipe = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = visual.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const images = el.querySelectorAll<HTMLElement>("[data-frame]");
    const dir = direction.current;
    direction.current = 0;
    const ctx = gsap.context(() => {
      if (dir) {
        // Llega rápida desde el borde de la pantalla (justo fuera de ella) y frena en seco; la palabra recorre menos.
        gsap.from("[data-products-image]", {
          x: (_: number, target: HTMLElement) => {
            const box = target.getBoundingClientRect();
            return dir > 0 ? window.innerWidth - box.left : -box.right;
          },
          duration: 1.1,
          ease: "expo.out",
        });
        gsap.from("[data-products-word]", { x: dir * window.innerWidth * 0.35, duration: 1.1, ease: "expo.out" });
      }
      gsap.fromTo(
        "[data-products-image]",
        { y: 24 },
        {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      if (images.length < 2) return;
      // Fotogramas: se estira desde que asoma la imagen por abajo hasta que queda en el centro de la pantalla
      // y, al seguir bajando, se vuelve a cerrar (la secuencia al revés) hasta que sale por arriba.
      // Con inercia (scrub) y fundido entre el fotograma actual y el siguiente para que no vaya a saltos.
      const state = { frame: 0 };
      const last = images.length - 1;
      gsap
        .timeline({
          scrollTrigger: { trigger: el.querySelector("[data-products-image]"), start: "top bottom", end: "bottom top", scrub: 0.6 },
          onUpdate: () => {
            const index = Math.floor(state.frame);
            const blend = state.frame - index;
            images.forEach((img, i) => (img.style.opacity = i === index ? "1" : i === index + 1 ? String(blend) : "0"));
          },
        })
        .to(state, { frame: last, ease: "none", duration: 1 })
        // Un momento estirada del todo, con la imagen centrada.
        .to(state, { frame: last, duration: 0.15 })
        .to(state, { frame: 0, ease: "none", duration: 1 });
    }, el);
    return () => ctx.revert();
  }, [active]);

  return (
    // En escritorio ocupa una pantalla bajo la cabecera (71px; 95px con la barra superior en xl) y la imagen se centra
    // en todo el bloque, por detrás de los textos, con margen arriba y abajo para que no se corte.
    <div
      className="relative flex flex-col overflow-x-clip bg-white py-[60px] lg:h-[calc(100svh-71px)] lg:min-h-[640px] lg:justify-between xl:h-[calc(100svh-95px)]"
      data-typewriter-group
    >
      <div className="site-container relative z-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-[500px] flex-col items-start gap-[21px]">
          {eyebrow && (
            <p className="text-eyebrow text-grey">
              <Typewriter text={eyebrow} />
            </p>
          )}
          {(title_muted || title) && (
            // Empieza en gris tenue y el scroll lo pasa a negro, palabra a palabra con un destello naranja antes (data-ink en Animations).
            <h2 className="text-title-m tracking-[-0.01em] lg:text-[2rem]" data-ink>
              <SplitWords text={[title_muted, title].filter(Boolean).join(" ")} />
            </h2>
          )}
          {button?.url && (
            <Button href={button.url} target={button.target} variant="solid">
              {button.title}
            </Button>
          )}
        </div>

        {shown.length > 0 && (
          <ul key={listed} ref={list} className="flex flex-col gap-1">
            {shown.map((process, i) => {
              const content = (
                <>
                  <span className="relative hidden size-5 shrink-0 overflow-hidden rounded-[2px] bg-[#212121] opacity-0 lg:block transition-opacity group-hover:opacity-100">
                    {process.thumbnail?.url && <Image src={process.thumbnail.url} alt="" fill sizes="20px" className="object-cover" />}
                  </span>
                  <span className="font-mono text-[0.875rem] uppercase leading-none tracking-[-0.01em] text-dark-grey">
                    <Typewriter text={process.label ?? ""} />
                  </span>
                </>
              );
              return (
                <li key={i}>
                  {process.link?.url ? (
                    <Link href={process.link.url} target={process.link.target || undefined} className="group flex items-center gap-[9px] lg:-ml-[29px]">
                      {content}
                    </Link>
                  ) : (
                    <span className="group flex items-center gap-[9px] lg:-ml-[29px]">{content}</span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {current && (
        <div
          ref={visual}
          className="relative my-10 h-[420px] touch-pan-y md:h-[560px] lg:absolute lg:inset-0 lg:my-0 lg:h-auto"
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse") swipe.current = { x: e.clientX, y: e.clientY };
          }}
          onPointerUp={(e) => {
            const start = swipe.current;
            swipe.current = null;
            if (!start) return;
            const dx = e.clientX - start.x;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - start.y)) go(active + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
          }}
          onPointerCancel={() => (swipe.current = null)}
        >
          <div className="absolute inset-0 overflow-hidden" aria-hidden>
            <div className="stripes-disc absolute left-1/2 top-1/2 aspect-square h-full max-h-[900px] -translate-x-1/2 -translate-y-1/2 lg:h-[110%]" />
          </div>
          <p key={`word-${active}`} className={`${WORD} ${outline ? "word-under-outline" : "text-medium-grey"}`} aria-hidden data-products-word>
            {current.name}
          </p>
          {(frames || current.image?.url) && (
            // Centrada y siempre dentro del bloque (463 × 630; los fotogramas, 3 × 4), con margen arriba y abajo.
            <div
              key={`img-${active}`}
              // Con fotogramas se ve más grande para que se aprecie el movimiento.
              className={`absolute left-1/2 top-1/2 max-w-[calc(100vw-128px)] -translate-x-1/2 -translate-y-1/2 ${
                frames ? "aspect-[3/4] h-full lg:h-[86%]" : "aspect-[463/630] h-[90%] lg:h-[72%]"
              }`}
              data-products-image
            >
              {frames ? (
                frames.map((frame, i) => (
                  <Image
                    key={i}
                    src={frame.url}
                    alt={i === 0 ? frame.alt || current.name || "" : ""}
                    fill
                    loading="eager"
                    sizes="(min-width: 1024px) 603px, 75vw"
                    className={`object-contain ${i === 0 ? "" : "opacity-0"}`}
                    data-frame
                  />
                ))
              ) : (
                <Image
                  src={current.image!.url}
                  alt={current.image!.alt || current.name || ""}
                  fill
                  sizes="(min-width: 1024px) 463px, 60vw"
                  className="object-contain"
                />
              )}
            </div>
          )}
          {/* La misma palabra encima de la imagen, solo con el contorno. */}
          {outline && (
            <p key={`outline-${active}`} className={`${WORD} word-outline pointer-events-none`} aria-hidden data-products-word>
              {current.name}
            </p>
          )}
          {categories.length > 1 && (
            // Flechas en los dos bordes, a la altura del centro de la imagen.
            <div className="site-container pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-between">
              <button type="button" className={ARROW} onClick={() => go(active - 1, -1)} aria-label={t("prev", "Previous")}>
                <CaretLeft size={14} />
              </button>
              <button type="button" className={ARROW} onClick={() => go(active + 1, 1)} aria-label={t("next", "Next")}>
                <CaretRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {categories.length > 1 && (
        <div className="site-container relative z-10">
          <ul className="flex flex-col items-start gap-[3px]" role="tablist">
            {categories.map((category, i) => (
              <li key={i}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => go(i, i > active ? 1 : -1)}
                  className={`font-mono text-[0.875rem] uppercase leading-[1.4] tracking-[-0.01em] transition-colors ${
                    i === active ? "text-red" : "text-grey hover:text-dark-grey"
                  }`}
                >
                  <Typewriter text={`[${String(i + 1).padStart(2, "0")}] ${category.name ?? ""}`} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
