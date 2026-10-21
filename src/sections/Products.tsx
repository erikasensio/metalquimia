"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { SplitWords } from "@/components/motion/SplitWords";
import { Typewriter } from "@/components/motion/Typewriter";

gsap.registerPlugin(ScrollTrigger);

type Process = { label?: string; link?: WpLink | null; thumbnail?: WpImage | null };
type Category = { name?: string; image?: WpImage | null; frames?: WpImage[] | false | null; processes?: Process[] };

type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  button?: WpLink | null;
  categories?: Category[];
};

// Palabra gigante de fondo (y su contorno, que va encima de la imagen).
const WORD =
  "absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[6rem] font-semibold leading-[1.1] animate-[fade-in_0.5s_ease-out] md:text-[11rem] lg:text-[min(19.375rem,32svh)] [font-feature-settings:'dlig'_1]";

/**
 * Bloque de soluciones por categoría (Figma "products" 160:2762).
 * Al elegir una categoría cambian la palabra de fondo, la imagen y la lista de procesos.
 * La imagen se mueve con el scroll (parallax) y, si la categoría tiene fotogramas, el scroll pasa de uno a otro.
 */
export default function Products({ eyebrow, title_muted, title, button, categories = [] }: Props) {
  const [active, setActive] = useState(0);
  const current = categories[active];
  // Sin los huecos vacíos (p. ej. imágenes que faltan en modo mock).
  const validFrames = Array.isArray(current?.frames) ? current.frames.filter((frame) => frame?.url) : [];
  const frames = validFrames.length > 1 ? validFrames : null;
  const visual = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = visual.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const images = el.querySelectorAll<HTMLElement>("[data-frame]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-products-image]",
        { y: 40 },
        {
          y: -40,
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
      // Fotogramas: toda la secuencia ocurre con el bloque en el centro de la pantalla, con inercia (scrub)
      // y fundido entre el fotograma actual y el siguiente para que no vaya a saltos.
      // power1.out acelera el principio, donde el vídeo apenas se mueve, para que la separación se note antes.
      const state = { frame: 0 };
      gsap.to(state, {
        frame: images.length - 1,
        ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 35%", scrub: 0.8 },
        onUpdate: () => {
          const index = Math.floor(state.frame);
          const blend = state.frame - index;
          images.forEach((img, i) => (img.style.opacity = i === index ? "1" : i === index + 1 ? String(blend) : "0"));
        },
      });
    }, el);
    return () => ctx.revert();
  }, [active]);

  return (
    // En escritorio cabe en una pantalla bajo la cabecera (71px; 95px con la barra superior en xl): la imagen central encoge lo que haga falta.
    <div className="relative flex flex-col overflow-x-clip bg-white py-[60px] lg:max-h-[calc(100svh-71px)] xl:max-h-[calc(100svh-95px)]" data-typewriter-group>
      <div className="site-container flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
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

        {current?.processes && current.processes.length > 0 && (
          <ul key={active} className="flex flex-col gap-1 animate-[fade-in_0.4s_ease-out]">
            {current.processes.map((process, i) => {
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
        <div ref={visual} className="relative h-[360px] md:h-[480px] lg:h-auto lg:min-h-0 lg:flex-[0_1_574px]">
          <div className="absolute inset-0 overflow-hidden" aria-hidden>
            <div className="stripes-disc absolute left-1/2 top-1/2 size-[110%] max-h-[900px] max-w-[900px] -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p key={`word-${active}`} className={`${WORD} word-under-outline`} aria-hidden>
            {current.name}
          </p>
          {(frames || current.image?.url) && (
            // Sin recorte: la imagen entera (463 × 630) puede sobresalir del bloque.
            <div
              key={`img-${active}`}
              // Con fotogramas se ve más grande para que se aprecie el movimiento.
              className={`absolute left-1/2 aspect-[463/630] -translate-x-1/2 animate-[fade-in_0.5s_ease-out] ${
                frames ? "top-[-10%] h-[120%] lg:top-[-24%] lg:h-[143%]" : "top-0 h-full lg:top-[-8%] lg:h-[110%]"
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
          <p key={`outline-${active}`} className={`${WORD} word-outline pointer-events-none`} aria-hidden>
            {current.name}
          </p>
        </div>
      )}

      {categories.length > 1 && (
        <ul className="site-container flex flex-col items-start gap-[3px]" role="tablist">
          {categories.map((category, i) => (
            <li key={i}>
              <button
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`font-mono text-[0.875rem] uppercase leading-[1.4] tracking-[-0.01em] transition-colors ${
                  i === active ? "text-red" : "text-grey hover:text-dark-grey"
                }`}
              >
                <Typewriter text={`[${String(i + 1).padStart(2, "0")}] ${category.name ?? ""}`} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
