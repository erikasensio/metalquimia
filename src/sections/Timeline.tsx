import Image from "next/image";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Carousel } from "@/components/ui/Carousel";
import { Typewriter } from "@/components/motion/Typewriter";
import { SplitWords } from "@/components/motion/SplitWords";

const gutter = "px-5 scroll-pl-5 lg:px-[max(1.5rem,calc((100vw-1218px)/2))] lg:scroll-pl-[max(1.5rem,calc((100vw-1218px)/2))]";

type Item = { title?: string; lead?: string; text?: string; image?: WpImage | null };
type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  subtitle?: string;
  button?: WpLink | null;
  items?: Item[] | null;
};

/**
 * Figma Modulos › 12. Timeline ("Our history", About us 752:20849): cabecera centrada y, en carrusel, hitos de 300 px
 * con número, línea, año, texto (con su frase inicial en negro) e imagen cuadrada de 160 px.
 */
export default function Timeline({ eyebrow, title_muted, title, subtitle, button, items }: Props) {
  const list = (items || []).filter((i) => i?.title || i?.lead || i?.text);

  return (
    <div className="flex flex-col gap-12 bg-white py-20 lg:gap-[120px]">
      <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} subtitle={subtitle} button={button} align="center" className="site-container" />
      {list.length > 0 && (
        <div data-cards>
          {/* Figma: el carrusel y las flechas van alineados a la columna de 1218 px, como el Combo Text+Media. */}
          <Carousel caret trackClassName={`gap-6 ${gutter}`} controlsClassName="site-container lg:max-w-[calc(1218px+3rem)]" label={title || title_muted || "Línea del tiempo"}>
            {list.map((item, i) => (
              // Cada hito sube desde abajo, uno detrás de otro (data-cards); su contenido no se anima.
              <article key={i} className="flex w-[260px] shrink-0 snap-start flex-col gap-10 lg:w-[300px]" data-card>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[0.875rem] leading-[1.4] tracking-[-0.01em] text-grey">
                    <Typewriter text={`[${String(i + 1).padStart(2, "0")}]`} />
                  </span>
                  <span className="h-px bg-grey" aria-hidden data-typewriter-line />
                </div>
                {/* Las imágenes quedan alineadas abajo aunque los textos tengan largos distintos. */}
                <div className="flex flex-1 flex-col gap-6 lg:max-w-[285px]">
                  {(item.title || item.lead || item.text) && (
                    <div className="flex flex-col gap-2">
                      {item.title && (
                        <h3 className="text-title-xs text-black" data-paint>
                          <SplitWords text={item.title} />
                        </h3>
                      )}
                      {(item.lead || item.text) && (
                        <p className="text-body-m font-medium text-black/30">
                          {item.lead && (
                            <span className="text-black-grey">
                              <Typewriter text={item.text ? `${item.lead} ` : item.lead} />
                            </span>
                          )}
                          {item.text && <Typewriter text={item.text} />}
                        </p>
                      )}
                    </div>
                  )}
                  {item.image?.url && (
                    <div className="relative mt-auto size-40 shrink-0 overflow-hidden rounded-lg">
                      <Image src={item.image.url} alt={item.image.alt || ""} fill sizes="160px" className="object-cover" />
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
