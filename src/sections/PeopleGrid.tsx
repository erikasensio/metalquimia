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

/** Rejilla de personas (página About, "Presidency"): foto, nombre, cargo y LinkedIn. */
export default function PeopleGrid({ eyebrow, title_muted, title, subtitle, button, items }: Props) {
  const list = (items || []).filter((i) => i?.name || i?.photo?.url);

  return (
    <div className="bg-white py-20 lg:py-[120px]">
      <div className="site-container flex flex-col gap-12 lg:gap-16">
        <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} subtitle={subtitle} button={button} align="center" />
        {list.length > 0 && (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4" data-cards>
            {list.map((item, i) => (
              <li key={i} className="flex flex-col gap-4" data-card>
                <Media image={item.photo} className="aspect-[4/5] bg-light-grey" sizes="(min-width: 1024px) 25vw, 50vw" />
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-col gap-1">
                    {item.name && (
                      <h3 className="text-title-xs text-black" data-paint>
                        <SplitWords text={item.name} />
                      </h3>
                    )}
                    {item.role && (
                      <p className="text-body-s text-grey">
                        <Typewriter text={item.role} />
                      </p>
                    )}
                  </div>
                  {item.link?.url && (
                    <Link
                      href={item.link.url}
                      target={item.link.target || "_blank"}
                      rel="noreferrer"
                      aria-label={`LinkedIn de ${item.name || ""}`.trim()}
                      className="flex size-8 shrink-0 items-center justify-center bg-medium-grey text-dark-grey transition-colors hover:bg-black hover:text-white"
                    >
                      <LinkedinLogo size={16} weight="fill" />
                    </Link>
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
