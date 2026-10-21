import type { Section, WpImage, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { carouselGutter } from "@/components/ui/carouselGutter";
import { Typewriter } from "@/components/motion/Typewriter";
import { SplitWords } from "@/components/motion/SplitWords";

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

/** Figma Modulos › 13. Steps Carousel (División 325:9451): cabecera centrada y pasos numerados con imagen. */
export default function StepsCarousel({ theme, eyebrow, title_muted, title, subtitle, button, items }: Props) {
  const dark = theme === "dark";
  const list = (items || []).filter((i) => i?.image?.url || i?.lead || i?.text);

  return (
    <div className={`flex flex-col gap-12 py-20 lg:gap-20 lg:pb-20 lg:pt-[120px] ${dark ? "bg-black text-light-grey" : "bg-white text-black-grey"}`}>
      <div className="site-container flex flex-col items-center gap-6">
        <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} subtitle={subtitle} dark={dark} align="center" stacked />
        {button?.url && (
          <div className="shrink-0" data-reveal>
            <Button href={button.url} target={button.target} variant={dark ? "dark" : "solid"}>
              {button.title}
            </Button>
          </div>
        )}
      </div>
      {list.length > 0 && (
        <div>
          <Carousel dark={dark} trackClassName={`gap-4 ${carouselGutter}`} label={title || "Pasos"}>
            {list.map((item, i) => (
              // Figma: tres columnas de 477 px en 1464; número, línea, imagen de 320 px de alto y texto de 18 px.
              // La línea crece de izquierda a derecha, se teclea el número y el texto (Lay Grotesk) aparece con destello.
              <article
                key={i}
                className="flex w-[80vw] shrink-0 snap-start flex-col gap-3.5 sm:w-[400px] lg:w-[calc((min(100vw,94.5rem)-5rem)/3)]"
                data-typewriter-group
                data-typewriter-sequence
                data-typewriter-delay={i * 0.15}
              >
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[0.875rem] leading-[1.4] tracking-[-0.01em] text-grey">
                    <Typewriter text={`[${String(i + 1).padStart(2, "0")}]`} />
                  </span>
                  <span className={`h-px ${dark ? "bg-dark-grey" : "bg-medium-grey"}`} aria-hidden data-typewriter-line />
                </div>
                <Media image={item.image} className="aspect-[477/320] rounded-lg" sizes="(min-width: 1024px) 480px, (min-width: 640px) 400px, 80vw" />
                {(item.lead || item.text) && (
                  <p className="text-title-xs text-grey" data-paint>
                    {item.lead && <SplitWords text={`${item.lead} `} className={dark ? "text-light-grey" : "text-black"} />}
                    {item.text && <SplitWords text={item.text} />}
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
