import Link from "next/link";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Media } from "@/components/ui/Media";
import { Carousel } from "@/components/ui/Carousel";
import { carouselGutter } from "@/components/ui/carouselGutter";

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

/** Figma Modulos › 11. Highlights Carousel: tarjetas altas con imagen y texto sobre degradado. */
export default function HighlightsCarousel({ theme, eyebrow, title_muted, title, subtitle, button, items }: Props) {
  const dark = theme !== "light";
  const list = (items || []).filter((i) => i?.image?.url || i?.lead || i?.text);

  return (
    <div className={`flex flex-col gap-12 py-20 lg:gap-16 lg:py-[120px] ${dark ? "bg-black text-light-grey" : "bg-white text-black-grey"}`}>
      <SectionHeader
        eyebrow={eyebrow}
        titleMuted={title_muted}
        title={title}
        subtitle={subtitle}
        button={button}
        dark={dark}
        className="site-container"
      />
      {list.length > 0 && (
        <div data-reveal>
          <Carousel dark={dark} trackClassName={`gap-4 ${carouselGutter}`} label={title || "Destacados"}>
            {list.map((item, i) => {
              const content = (
                <>
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                    <Media image={item.image} className="size-full" sizes="(min-width: 640px) 420px, 85vw" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent" aria-hidden />
                  {(item.lead || item.text) && (
                    <p className="text-body-m relative max-w-[36ch] p-6 text-grey lg:p-8">
                      {item.lead && <strong className="font-semibold text-light-grey">{item.lead} </strong>}
                      {item.text}
                    </p>
                  )}
                </>
              );
              const cls = "group relative flex aspect-[3/4] w-[85vw] shrink-0 snap-start flex-col justify-end overflow-hidden sm:w-[420px]";
              return item.link?.url ? (
                <Link key={i} href={item.link.url} target={item.link.target || undefined} className={cls} aria-label={item.link.title || item.lead || undefined}>
                  {content}
                </Link>
              ) : (
                <div key={i} className={cls}>
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
