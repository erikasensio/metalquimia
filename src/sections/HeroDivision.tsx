import Image from "next/image";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { SplitWords } from "@/components/motion/SplitWords";
import { Typewriter } from "@/components/motion/Typewriter";

type Props = Section & {
  word?: string;
  images?: { image?: WpImage | null }[] | null | false | "";
  title_muted?: string;
  title?: string;
  text?: string;
  button?: WpLink | null;
};

// Ritmo del vaivén de cada producto, para que no floten todos a la vez.
const FLOAT = [
  { duration: "6s", delay: "0s" },
  { duration: "7.5s", delay: "-2.4s" },
  { duration: "6.8s", delay: "-4.1s" },
  { duration: "8s", delay: "-1.2s" },
  { duration: "7s", delay: "-5.3s" },
];

// Palabra gigante de fondo (y su contorno, que va encima de los productos), como en el bloque de soluciones de la home.
// Figma: 310 px sobre 1512, centrada en vertical respecto a la fila de productos.
const WORD =
  "pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center font-display text-[24vw] font-semibold leading-none lg:text-[min(20.5vw,19.375rem)] [font-feature-settings:'dlig'_1]";

/**
 * Figma Páginas › División (177:735) › hero-division (páginas de solución: Cooked, Marinated, Cured…).
 * Palabra gigante de fondo con contorno encima, carrusel infinito de productos recortados que flotan y,
 * debajo, título en dos tonos + texto + botón centrados.
 */
export default function HeroDivision({ word, images, title_muted, title, text, button }: Props) {
  const items = (Array.isArray(images) ? images : []).filter((item) => item?.image?.url);
  // Con pocos productos una copia no llenaría pantallas anchas: se repiten hasta tener al menos 7 por copia.
  const loop = items.length ? Array.from({ length: Math.ceil(7 / items.length) }, () => items).flat() : [];

  return (
    <div className="overflow-hidden bg-white pb-20 pt-10 lg:pb-[120px] lg:pt-[100px]">
      <div className="relative">
        {word && (
          <p className={`${WORD} ${items.length > 0 ? "word-under-outline" : "text-medium-grey"}`} aria-hidden>
            {word}
          </p>
        )}

        {loop.length > 0 ? (
          // La lista se duplica para que el desplazamiento sea continuo; cada producto tiene su propio vaivén.
          <div className="relative flex">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 animate-[marquee_var(--marquee)_linear_infinite] motion-reduce:animate-none"
                style={{ "--marquee": `${loop.length * 5}s` } as React.CSSProperties}
              >
                {loop.map((item, i) => (
                  // Figma: huecos de 320 × 440 separados 80 px sobre 1512 de ancho.
                  <li key={i} className="w-[56vw] shrink-0 pr-[10vw] md:w-[30vw] md:pr-[6vw] lg:w-[min(26.45vw,400px)] lg:pr-[min(5.29vw,80px)]">
                    <div
                      className="relative aspect-[320/440] animate-[float_var(--float-duration)_ease-in-out_infinite] motion-reduce:animate-none"
                      style={{ "--float-duration": FLOAT[i % FLOAT.length].duration, animationDelay: FLOAT[i % FLOAT.length].delay } as React.CSSProperties}
                    >
                      <Image
                        src={item.image!.url}
                        alt={copy === 1 ? "" : item.image!.alt || ""}
                        fill
                        priority={copy === 0 && i < 4}
                        sizes="(min-width: 1024px) 320px, (min-width: 768px) 24vw, 46vw"
                        className="object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.12)]"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ) : (
          // Sin productos: deja aire para que se lea la palabra de fondo.
          word && <div className="h-[160px] lg:h-[420px]" aria-hidden />
        )}

        {/* La misma palabra encima de los productos, solo con el contorno. */}
        {word && items.length > 0 && (
          <p className={`${WORD} word-outline z-[3]`} aria-hidden>
            {word}
          </p>
        )}
      </div>

      {(title_muted || title || text || button?.url) && (
        // Título (Lay Grotesk) que aparece con destello naranja y, detrás, el texto a máquina de escribir.
        <div className="site-container mt-10 flex flex-col items-center gap-8 text-center lg:mt-4" data-typewriter-group data-typewriter-sequence>
          {(title_muted || title) && (
            <h1 className="text-title-l mx-auto max-w-[758px] tracking-[-0.01em] [font-feature-settings:'dlig'_1]" data-paint>
              {title_muted && <SplitWords text={`${title_muted} `} className="text-grey" />}
              {title && <SplitWords text={title} className="text-black" />}
            </h1>
          )}
          {text && (
            <p className="text-body-m max-w-[692px] text-black/30">
              <Typewriter text={text} />
            </p>
          )}
          {button?.url && (
            <div data-reveal>
              <Button href={button.url} target={button.target} variant="solid">
                {button.title}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
