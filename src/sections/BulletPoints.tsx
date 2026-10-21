import Image from "next/image";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Typewriter } from "@/components/motion/Typewriter";
import { SplitWords } from "@/components/motion/SplitWords";

type Item = { icon?: WpImage | null; title?: string; text?: string };
type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  subtitle?: string;
  highlight_title?: string;
  highlight_text?: string;
  highlight_button?: WpLink | null;
  items?: Item[] | null;
};

const card = "flex min-h-[280px] flex-col justify-between gap-10 p-8";

/** Figma Modulos › 16. Bullet Points: tarjetas con icono y, opcionalmente, una tarjeta negra destacada al principio. */
export default function BulletPoints({ eyebrow, title_muted, title, subtitle, highlight_title, highlight_text, highlight_button, items }: Props) {
  const list = (items || []).filter((i) => i?.title || i?.text);
  const highlight = highlight_title || highlight_text;

  return (
    <div className="bg-white py-20 lg:py-[120px]">
      <div className="site-container flex flex-col gap-12 lg:gap-16">
        <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} subtitle={subtitle} />
        {(highlight || list.length > 0) && (
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-stagger>
            {highlight && (
              <li className={`${card} bg-black text-light-grey`} data-typewriter-group data-typewriter-sequence>
                {highlight_title && (
                  <h3 className="text-title-s max-w-[20ch]" data-paint>
                    <SplitWords text={highlight_title} />
                  </h3>
                )}
                <div className="flex flex-col items-start gap-6">
                  {highlight_text && (
                    <p className="text-body-m text-grey">
                      <Typewriter text={highlight_text} />
                    </p>
                  )}
                  {highlight_button?.url && (
                    <div data-reveal>
                      <Button href={highlight_button.url} target={highlight_button.target} variant="red">
                        {highlight_button.title}
                      </Button>
                    </div>
                  )}
                </div>
              </li>
            )}
            {list.map((item, i) => (
              <li key={i} className={`${card} bg-light-grey`} data-typewriter-group data-typewriter-sequence data-typewriter-delay={((i + (highlight ? 1 : 0)) % 3) * 0.1}>
                {item.icon?.url ? (
                  <Image src={item.icon.url} alt={item.icon.alt || ""} width={40} height={40} className="size-10 object-contain" />
                ) : (
                  <span aria-hidden />
                )}
                <div className="flex flex-col gap-3">
                  {item.title && (
                    <h3 className="text-title-s text-black" data-paint>
                      <SplitWords text={item.title} />
                    </h3>
                  )}
                  {item.text && (
                    <p className="text-body-m text-grey">
                      <Typewriter text={item.text} />
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
