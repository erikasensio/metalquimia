import type { Section, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CountUp } from "./parts/CountUp";
import { Typewriter } from "@/components/motion/Typewriter";

type Item = { value?: string; description?: string };
type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  subtitle?: string;
  button?: WpLink | null;
  items?: Item[] | null;
};

/** Figma Modulos › 8. Data Highlights: título pequeño en una línea y cifras que cuentan hacia arriba al aparecer. */
export default function DataHighlights({ eyebrow, title_muted, title, subtitle, button, items }: Props) {
  const list = (items || []).filter((i) => i?.value || i?.description);

  return (
    <div className="bg-white pb-20 pt-6 lg:pb-[120px] lg:pt-10">
      <div className="site-container flex flex-col gap-10 lg:gap-12">
        <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} subtitle={subtitle} button={button} size="s" />
        {list.length > 0 && (
          <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6" data-stagger>
            {list.map((item, i) => (
              <li key={i} className="flex flex-col gap-3 border-l border-medium-grey pl-6" data-typewriter-group data-typewriter-delay={(i % 4) * 0.1}>
                {item.value && <CountUp value={item.value} className="text-title-l text-black" />}
                {item.description && (
                  <p className="text-body-m max-w-[30ch] text-grey">
                    <Typewriter text={item.description} />
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
