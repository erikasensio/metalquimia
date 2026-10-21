import Link from "next/link";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { carouselGutter } from "@/components/ui/carouselGutter";
import { Typewriter } from "@/components/motion/Typewriter";
import { SplitWords } from "@/components/motion/SplitWords";

type Item = {
  image?: (WpImage & { mime?: string }) | null;
  category?: string;
  date?: string;
  title?: string;
  link?: WpLink | null;
};
type Props = Section & { title?: string; button?: WpLink | null; items?: Item[] | null };

/** Figma Modulos › 14. Insights Carousel ("Latest Insights", "Latest Resources", "Acknowledgments"). */
export default function InsightsCarousel({ title, button, items }: Props) {
  const list = (items || []).filter((i) => i?.title || i?.image?.url);

  return (
    <div className="bg-white py-20 lg:py-[120px]">
      {(title || button?.url) && (
        <div className="site-container">
          <div className="relative mb-10 flex flex-wrap items-end justify-between gap-6 pb-6">
            {title && (
              <h2 className="min-w-0 break-words text-title-l text-black [font-feature-settings:'dlig'_1]" data-paint>
                <SplitWords text={title} />
              </h2>
            )}
            {button?.url && (
              <div className="shrink-0" data-reveal>
                <Button href={button.url} target={button.target} variant="solid">
                  {button.title}
                </Button>
              </div>
            )}
            <span className="absolute inset-x-0 bottom-0 h-px bg-medium-grey" aria-hidden data-rule />
          </div>
        </div>
      )}
      {list.length > 0 && (
        <div data-cards>
          <Carousel trackClassName={`gap-4 ${carouselGutter}`} label={title || "Noticias"}>
            {list.map((item, i) => {
              const content = (
                <>
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                    <Media image={item.image} className="size-full" sizes="(min-width: 1024px) 440px, (min-width: 640px) 360px, 80vw" />
                  </div>
                  <div className="relative m-4 flex max-w-[calc(100%-2rem)] flex-col gap-3 bg-black/70 p-4 backdrop-blur-md">
                    {(item.category || item.date) && (
                      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-mono text-[0.75rem] uppercase">
                        {item.category && (
                          <span className="text-red">
                            <Typewriter text={item.category} />
                          </span>
                        )}
                        {item.date && (
                          <span className="text-grey">
                            <Typewriter text={item.date} />
                          </span>
                        )}
                      </div>
                    )}
                    {item.title && (
                      <h3 className="text-title-xs line-clamp-3 text-light-grey" data-paint>
                        <SplitWords text={item.title} />
                      </h3>
                    )}
                  </div>
                </>
              );
              const cls = "group relative flex aspect-[4/5] w-[80vw] shrink-0 snap-start flex-col justify-end overflow-hidden sm:w-[360px] lg:w-[440px]";
              return item.link?.url ? (
                <Link key={i} href={item.link.url} target={item.link.target || undefined} className={cls} data-card>
                  {content}
                </Link>
              ) : (
                <article key={i} className={cls} data-card>
                  {content}
                </article>
              );
            })}
          </Carousel>
        </div>
      )}
    </div>
  );
}
