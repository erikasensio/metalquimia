import type { Section, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CountUp } from "./parts/CountUp";

type Item = { value?: string; description?: string };
type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  subtitle?: string;
  button?: WpLink | null;
  items?: Item[] | null;
};

/** Figma Modulos › 8. Data Highlights: cifras que cuentan hacia arriba al aparecer. */
export default function DataHighlights({ eyebrow, title_muted, title, subtitle, button, items }: Props) {
  const list = (items || []).filter((i) => i?.value || i?.description);

  return (
    <div className="bg-white py-20 lg:py-[120px]">
      <div className="site-container flex flex-col gap-12 lg:gap-20">
        <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} subtitle={subtitle} button={button} />
        {list.length > 0 && (
          <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6" data-stagger>
            {list.map((item, i) => (
              <li key={i} className="flex flex-col gap-3 border-l border-medium-grey pl-4">
                {item.value && <CountUp value={item.value} className="text-title-xl text-black" />}
                {item.description && <p className="text-body-m max-w-[28ch] text-grey">{item.description}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
