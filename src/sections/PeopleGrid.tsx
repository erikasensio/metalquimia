import Link from "next/link";
import { LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Media } from "@/components/ui/Media";
import { Typewriter } from "@/components/motion/Typewriter";
import { SplitWords } from "@/components/motion/SplitWords";

type Item = { photo?: WpImage | null; name?: string; role?: string; link?: WpLink | null };
type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  subtitle?: string;
  button?: WpLink | null;
  items?: Item[] | null;
};

/**
 * Rejilla de personas (Figma Páginas › About us 752:20891, "Presidency"): tres columnas de 397 px en 1222,
 * foto de 397 × 450, nombre con LinkedIn, línea y cargo.
 */
export default function PeopleGrid({ eyebrow, title_muted, title, subtitle, button, items }: Props) {
  const list = (items || []).filter((i) => i?.name || i?.photo?.url);

  return (
    <div className="bg-white pb-20 pt-20 lg:pt-[120px]">
      <div className="site-container flex flex-col gap-12 lg:max-w-[calc(1222px+3rem)] lg:gap-20">
        <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} subtitle={subtitle} button={button} align="center" />
        {list.length > 0 && (
          <ul className="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-20" data-cards>
            {list.map((item, i) => (
              <li key={i} className="flex flex-col gap-6" data-card>
                <Media image={item.photo} className="aspect-[397/450] rounded-lg bg-light-grey" sizes="(min-width: 1024px) 397px, (min-width: 640px) 50vw, 100vw" />
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between gap-3">
                    {item.name && (
                      <h3 className="text-title-xs text-black-grey" data-paint>
                        <SplitWords text={item.name} />
                      </h3>
                    )}
                    {item.link?.url && (
                      <Link
                        href={item.link.url}
                        target={item.link.target || "_blank"}
                        rel="noreferrer"
                        aria-label={`LinkedIn de ${item.name || ""}`.trim()}
                        className="shrink-0 text-grey transition-colors hover:text-black"
                      >
                        <LinkedinLogo size={24} weight="fill" />
                      </Link>
                    )}
                  </div>
                  <span className="h-px bg-grey" aria-hidden />
                  {item.role && (
                    <p className="text-body-m font-medium text-dark-grey">
                      <Typewriter text={item.role} />
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
