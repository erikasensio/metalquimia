import Image from "next/image";
import type { Section } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TestimonialAccordion, type TestimonialItem } from "./parts/TestimonialAccordion";
import { Typewriter } from "@/components/motion/Typewriter";

type Props = Section & { title_muted?: string; title?: string; label?: string; items?: TestimonialItem[] | null };

/**
 * Figma Modulos › 10. Testimonial (Industry 326:24802): título a la izquierda, centrado en alto, y acordeón de
 * testimonios por cliente en una columna de 550 px. Fondo: foto de acero oscurecida (74 %) que se funde a negro
 * arriba y abajo. Un salto de línea en el título se respeta.
 */
export default function Testimonial({ title_muted, title, label, items }: Props) {
  const list = (items || []).filter((i) => i?.quote || i?.logo?.url || i?.name);

  return (
    <div className="relative overflow-hidden bg-black py-20 text-light-grey lg:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image src="/brand/testimonial-bg.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_44.4%,#000_100%),linear-gradient(180deg,transparent_50%,#000_102%),linear-gradient(rgba(0,0,0,0.74),rgba(0,0,0,0.74))]" />
      </div>
      <div className="site-container relative flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <SectionHeader titleMuted={title_muted} title={title} dark className="[&_h2]:whitespace-pre-line" />
        {list.length > 0 && (
          <div className="flex w-full flex-col gap-10 lg:max-w-[550px] lg:shrink-0">
            {label && (
              <p className="text-eyebrow tracking-[0.02em] text-medium-grey">
                <Typewriter text={label} />
              </p>
            )}
            <div data-reveal>
              <TestimonialAccordion items={list} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
