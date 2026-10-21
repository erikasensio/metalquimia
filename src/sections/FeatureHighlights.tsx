import Image from "next/image";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Media } from "@/components/ui/Media";
import { Typewriter } from "@/components/motion/Typewriter";

type Item = { icon?: WpImage | null; lead?: string; text?: string };
type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  subtitle?: string;
  button?: WpLink | null;
  image?: (WpImage & { mime?: string }) | null;
  items?: Item[] | null;
};

/** Figma Modulos › 9. Feature Highlights: cabecera centrada, imagen y lista de ventajas sobre negro. */
export default function FeatureHighlights({ eyebrow, title_muted, title, subtitle, button, image, items }: Props) {
  const list = (items || []).filter((i) => i?.lead || i?.text);

  return (
    <div className="bg-black py-20 text-light-grey lg:py-[120px]">
      <div className="site-container flex flex-col gap-12 lg:gap-20">
        <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} subtitle={subtitle} button={button} align="center" dark />
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Media image={image} className="aspect-[4/5] rounded-xl md:aspect-square" sizes="(min-width: 1024px) 50vw, 100vw" parallax />
          {list.length > 0 && (
            <ul className="flex flex-col">
              {/* Cada fila: la línea de arriba crece de izquierda a derecha y el texto se teclea. */}
              {list.map((item, i) => (
                <li key={i} className="relative flex flex-col gap-6 py-8 lg:py-10" data-typewriter-group data-typewriter-sequence>
                  <span className="absolute inset-x-0 top-0 h-px bg-white/10" aria-hidden data-typewriter-line />
                  {item.icon?.url && (
                    <Image src={item.icon.url} alt={item.icon.alt || ""} width={32} height={32} className="size-8 object-contain" />
                  )}
                  <p className="text-body-l max-w-[44ch] text-grey">
                    {item.lead && (
                      <strong className="font-semibold text-light-grey">
                        <Typewriter text={`${item.lead} `} />
                      </strong>
                    )}
                    {item.text && <Typewriter text={item.text} />}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
