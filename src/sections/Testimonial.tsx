import type { Section } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TestimonialAccordion, type TestimonialItem } from "./parts/TestimonialAccordion";

type Props = Section & { title_muted?: string; title?: string; label?: string; items?: TestimonialItem[] | null };

/** Figma Modulos › 10. Testimonial: título a la izquierda y acordeón de testimonios por cliente. */
export default function Testimonial({ title_muted, title, label, items }: Props) {
  const list = (items || []).filter((i) => i?.quote || i?.logo?.url || i?.name);

  return (
    <div className="bg-black bg-[radial-gradient(ellipse_at_top_left,#1a1a1a_0%,#010001_65%)] py-20 text-light-grey lg:py-[120px]">
      <div className="site-container grid gap-12 lg:grid-cols-2 lg:gap-24">
        <SectionHeader titleMuted={title_muted} title={title} dark className="lg:sticky lg:top-32 lg:self-start" />
        {list.length > 0 && (
          <div className="flex flex-col gap-6" data-reveal>
            {label && <p className="font-mono text-[0.75rem] uppercase text-grey">{label}</p>}
            <TestimonialAccordion items={list} />
          </div>
        )}
      </div>
    </div>
  );
}
