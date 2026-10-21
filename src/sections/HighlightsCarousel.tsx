import Link from "next/link";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Media } from "@/components/ui/Media";
import { Carousel } from "@/components/ui/Carousel";
import { carouselGutter } from "@/components/ui/carouselGutter";
import { SplitWords } from "@/components/motion/SplitWords";

type Item = { image?: (WpImage & { mime?: string }) | null; lead?: string; text?: string; link?: WpLink | null };
type Props = Section & {
  theme?: "light" | "dark";
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  subtitle?: string;
  button?: WpLink | null;
  items?: Item[] | null;
};

/** Figma Modulos › 11. Highlights Carousel (División 818:26709): cabecera centrada y tarjetas altas con imagen. */
export default function HighlightsCarousel({ theme, eyebrow, title_muted, title, subtitle, button, items }: Props) {
  const dark = theme !== "light";
  const list = (items || []).filter((i) => i?.image?.url || i?.lead || i?.text);

  return (
    <div className={`flex flex-col gap-12 py-20 lg:gap-20 lg:py-[120px] ${dark ? "bg-black text-light-grey" : "bg-white text-black-grey"}`}>
      <SectionHeader
        eyebrow={eyebrow}
        titleMuted={title_muted}
        title={title}
        subtitle={subtitle}
        button={button}
        dark={dark}
        align="center"
        stacked
        className="site-container"
      />
      {list.length > 0 && (
        <div data-cards>
          <Carousel dark={dark} trackClassName={`gap-4 ${carouselGutter}`} label={title || "Destacados"}>
            {list.map((item, i) => {
              const content = (
                <>
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                    <Media image={item.image} className="size-full" sizes="(min-width: 1024px) 480px, (min-width: 640px) 420px, 85vw" />
                  </div>
                  {(item.lead || item.text) && (
                    <>
                      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/60 to-transparent" aria-hidden />
                      <p className="text-title-xs relative max-w-[36ch] p-6 text-grey lg:p-8" data-paint>
                        {item.lead && <SplitWords text={`${item.lead} `} className="text-light-grey" />}
                        {item.text && <SplitWords text={item.text} />}
                      </p>
                    </>
                  )}
                </>
              );
              // Figma (División 818:26709): tarjetas de 477 × 540 px con esquinas de 12 px y el texto arriba.
              const cls =
                "group relative flex aspect-[477/540] w-[85vw] shrink-0 snap-start flex-col justify-start overflow-hidden rounded-xl sm:w-[420px] lg:w-[calc((min(100vw,94.5rem)-5rem)/3)]";
              return item.link?.url ? (
                <Link key={i} href={item.link.url} target={item.link.target || undefined} className={cls} aria-label={item.link.title || item.lead || undefined} data-card>
                  {content}
                </Link>
              ) : (
                <div key={i} className={cls} data-card>
                  {content}
                </div>
              );
            })}
          </Carousel>
        </div>
      )}
    </div>
  );
}
