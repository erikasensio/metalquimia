import Image from "next/image";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { SplitWords } from "@/components/motion/SplitWords";

type Props = Section & {
  word?: string;
  images?: { image?: WpImage | null }[] | null | false | "";
  title_muted?: string;
  title?: string;
  text?: string;
  button?: WpLink | null;
};

// Velocidad de parallax y desplazamiento vertical de cada producto, para que "floten" a ritmos distintos.
const SPEEDS = [0.08, 0.18, 0.12, 0.22, 0.1];
const OFFSETS = ["lg:mt-16", "lg:-mt-6", "lg:mt-24", "lg:mt-0", "lg:mt-12"];

/**
 * Figma Modulos › 3. Hero Division Carousel (páginas de solución: Cooked, Marinated, Cured…).
 * Palabra gigante de fondo, fila de productos recortados que flotan con parallax y,
 * debajo, título en dos tonos + texto + botón centrados.
 */
export default function HeroDivision({ word, images, title_muted, title, text, button }: Props) {
  const items = (Array.isArray(images) ? images : []).filter((item) => item?.image?.url).slice(0, 5);

  return (
    <div className="overflow-hidden bg-white pb-20 pt-10 lg:pb-[120px] lg:pt-16">
      <div className="relative">
        {word && (
          <p
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[6rem] font-semibold leading-none text-medium-grey md:text-[11rem] lg:text-[19.375rem] [font-feature-settings:'dlig'_1]"
            aria-hidden
          >
            {word}
          </p>
        )}

        {items.length > 0 ? (
          <ul className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 scrollbar-none md:justify-center md:overflow-visible lg:gap-0 lg:px-6">
            {items.map((item, i) => (
              <li
                key={i}
                className={`relative w-[62vw] shrink-0 snap-center md:w-[24%] lg:w-[22%] lg:max-w-[340px] ${i > 0 ? "lg:-ml-[3%]" : ""} ${OFFSETS[i]}`}
                style={{ zIndex: i % 2 ? 2 : 1 }}
              >
                <div className="relative aspect-square" data-parallax={SPEEDS[i]}>
                  <Image
                    src={item.image!.url}
                    alt={item.image!.alt || ""}
                    fill
                    priority={i < 3}
                    sizes="(min-width: 1024px) 340px, (min-width: 768px) 24vw, 62vw"
                    className="object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.12)]"
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          // Sin productos: deja aire para que se lea la palabra de fondo.
          word && <div className="h-[160px] lg:h-[420px]" aria-hidden />
        )}
      </div>

      {(title_muted || title || text || button?.url) && (
        <div className="site-container mt-12 flex flex-col items-center gap-6 text-center lg:mt-20">
          {(title_muted || title) && (
            <h1 className="text-title-l mx-auto max-w-[22ch] tracking-[-0.01em] [font-feature-settings:'dlig'_1]" data-split>
              {title_muted && <SplitWords text={`${title_muted} `} className="text-grey" />}
              {title && <SplitWords text={title} className="text-black" />}
            </h1>
          )}
          {text && (
            <p className="text-body-l max-w-[60ch] text-grey" data-reveal>
              {text}
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
