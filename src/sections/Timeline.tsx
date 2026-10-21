import Image from "next/image";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Carousel } from "@/components/ui/Carousel";
import { carouselGutter } from "@/components/ui/carouselGutter";
import { Typewriter } from "@/components/motion/Typewriter";
import { SplitWords } from "@/components/motion/SplitWords";

type Item = { title?: string; text?: string; image?: WpImage | null };
type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  subtitle?: string;
  button?: WpLink | null;
  items?: Item[] | null;
};

/** Figma Modulos › 12. Timeline ("Our history"): hitos en carrusel unidos por una línea continua. */
export default function Timeline({ eyebrow, title_muted, title, subtitle, button, items }: Props) {
  const list = (items || []).filter((i) => i?.title || i?.text);

  return (
    <div className="flex flex-col gap-12 bg-white py-20 lg:gap-16 lg:py-[120px]">
      <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} subtitle={subtitle} button={button} className="site-container" />
      {list.length > 0 && (
        <div>
          {/* Sin hueco entre elementos para que la línea no se corte; el aire lo pone el padding derecho. */}
          <Carousel trackClassName={`gap-0 ${carouselGutter}`} label={title || "Línea del tiempo"}>
            {list.map((item, i) => (
              // Cada hito: la línea crece de izquierda a derecha y luego número, título (destello) y texto (a máquina).
              <article
                key={i}
                className="group flex w-[280px] shrink-0 snap-start flex-col gap-5 lg:w-[340px]"
                data-typewriter-group
                data-typewriter-sequence
                data-typewriter-delay={i * 0.15}
              >
                <span className="pr-6 font-mono text-[0.875rem] text-grey transition-colors group-hover:text-red">
                  <Typewriter text={`[${String(i + 1).padStart(2, "0")}]`} />
                </span>
                <div className="relative h-px" aria-hidden>
                  <span className="absolute inset-0 bg-medium-grey" data-typewriter-line />
                  <span className="absolute left-0 top-1/2 size-2 -translate-y-1/2 bg-black transition-colors group-hover:bg-red" />
                </div>
                <div className="flex flex-1 flex-col gap-3 pr-6 lg:pr-10">
                  {item.title && (
                    <h3 className="text-title-s text-black" data-paint>
                      <SplitWords text={item.title} />
                    </h3>
                  )}
                  {item.text && (
                    <p className="text-body-s text-dark-grey">
                      <Typewriter text={item.text} />
                    </p>
                  )}
                  {item.image?.url && (
                    <div className="relative mt-auto size-24 shrink-0 overflow-hidden">
                      <Image src={item.image.url} alt={item.image.alt || ""} fill sizes="96px" className="object-cover" />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}
