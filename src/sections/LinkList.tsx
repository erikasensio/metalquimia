import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Media } from "@/components/ui/Media";
import { Typewriter } from "@/components/motion/Typewriter";
import { SplitWords } from "@/components/motion/SplitWords";

type Item = { avatar?: WpImage | null; name?: string; role?: string; link?: WpLink | null };
type Props = Section & {
  align?: "left" | "center";
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  subtitle?: string;
  items?: Item[] | null;
};

/** Figma Modulos › 17. List w links: personas u ofertas de empleo, cada fila enlazada. */
export default function LinkList({ align, eyebrow, title_muted, title, subtitle, items }: Props) {
  const center = align === "center";
  const list = (items || []).filter((i) => i?.name || i?.role);

  return (
    <div className="bg-white py-20 lg:py-[120px]">
      <div className="site-container flex flex-col gap-12 lg:gap-16">
        <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} subtitle={subtitle} align={center ? "center" : "left"} />
        {list.length > 0 && (
          <ul className={`relative w-full max-w-[880px] ${center ? "mx-auto" : ""}`}>
            <span className="absolute inset-x-0 top-0 h-px bg-medium-grey" aria-hidden data-rule />
            {list.map((item, i) => {
              const content = (
                <>
                  {item.avatar?.url && <Media image={item.avatar} className="size-12 shrink-0 rounded-full" sizes="48px" />}
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    {item.name && (
                      <span className="text-title-xs text-black" data-paint>
                        <SplitWords text={item.name} />
                      </span>
                    )}
                    {item.role && (
                      <span className="text-body-s text-grey">
                        <Typewriter text={item.role} />
                      </span>
                    )}
                  </div>
                  {item.link?.url && (
                    <span className="flex size-10 shrink-0 items-center justify-center bg-medium-grey text-dark-grey transition-colors group-hover:bg-black group-hover:text-white" aria-hidden>
                      <ArrowUpRight size={16} />
                    </span>
                  )}
                </>
              );
              const cls = "group flex items-center gap-4 py-5";
              return (
                // Nombre con destello, cargo a máquina y la línea de abajo creciendo de izquierda a derecha.
                <li key={i} className="relative" data-typewriter-group data-typewriter-sequence>
                  <span className="absolute inset-x-0 bottom-0 h-px bg-medium-grey" aria-hidden data-typewriter-line />
                  {item.link?.url ? (
                    <Link
                      href={item.link.url}
                      target={item.link.target || undefined}
                      rel={item.link.target === "_blank" ? "noreferrer" : undefined}
                      className={cls}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className={cls}>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
