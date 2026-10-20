import type { Section, WpImage, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { carouselGutter } from "@/components/ui/carouselGutter";

type Item = { image?: (WpImage & { mime?: string }) | null; lead?: string; text?: string };
type Props = Section & {
  theme?: "light" | "dark";
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  subtitle?: string;
  button?: WpLink | null;
  items?: Item[] | null;
};

/** Figma Modulos › 13. Steps Carousel: pasos numerados con imagen; el botón va a la derecha en escritorio. */
export default function StepsCarousel({ theme, eyebrow, title_muted, title, subtitle, button, items }: Props) {
  const dark = theme === "dark";
  const list = (items || []).filter((i) => i?.image?.url || i?.lead || i?.text);

  return (
    <div className={`flex flex-col gap-12 py-20 lg:gap-16 lg:py-[120px] ${dark ? "bg-black text-light-grey" : "bg-white text-black-grey"}`}>
      <div className="site-container flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} subtitle={subtitle} dark={dark} />
        {button?.url && (
          <Button href={button.url} target={button.target} variant={dark ? "dark" : "solid"} className="shrink-0">
            {button.title}
          </Button>
        )}
      </div>
      {list.length > 0 && (
        <div data-reveal>
          <Carousel dark={dark} trackClassName={`gap-4 ${carouselGutter}`} label={title || "Pasos"}>
            {list.map((item, i) => (
              <article key={i} className="flex w-[80vw] shrink-0 snap-start flex-col gap-4 sm:w-[400px] lg:w-[440px]">
                <span className="font-mono text-[0.875rem] text-grey">[{String(i + 1).padStart(2, "0")}]</span>
                <Media image={item.image} className="aspect-[4/3]" sizes="(min-width: 1024px) 440px, (min-width: 640px) 400px, 80vw" />
                {(item.lead || item.text) && (
                  <p className="text-body-m max-w-[40ch] text-grey">
                    {item.lead && <strong className={`font-semibold ${dark ? "text-light-grey" : "text-black"}`}>{item.lead} </strong>}
                    {item.text}
                  </p>
                )}
              </article>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}
