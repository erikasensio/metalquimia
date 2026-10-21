import Image from "next/image";
import Link from "next/link";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FollowCursor } from "./parts/FollowCursor";
import { Typewriter } from "@/components/motion/Typewriter";
import { SplitWords } from "@/components/motion/SplitWords";

type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  subtitle?: string;
  button?: WpLink | null;
  items?: { image?: WpImage | null; name?: string; text?: string; link?: WpLink | null }[] | null | false | "";
};

/**
 * Figma Páginas › Soluciones: cabecera centrada y rejilla de categorías.
 * Cada tarjeta lleva el producto recortado sobre fondo gris claro (sube un poco al pasar el ratón) y debajo título y texto.
 */
export default function SolutionsGrid({ eyebrow, title_muted, title, subtitle, button, items }: Props) {
  const list = (Array.isArray(items) ? items : []).filter((item) => item?.name);

  return (
    <div className="bg-white pt-12 pb-20 lg:pt-16">
      <div className="site-container flex flex-col gap-12 lg:gap-20">
        {/* Antetítulo a máquina y título que se pinta, uno detrás de otro. */}
        <div data-typewriter-group data-typewriter-sequence>
          <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} subtitle={subtitle} button={button} align="center" />
        </div>

        {list.length > 0 && (
          <ul className="mx-auto grid w-full max-w-[1222px] gap-x-4 gap-y-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-[72px]" data-stagger>
            {list.map((item, i) => {
              const content = (
                <>
                  <div className="relative aspect-[397/450] overflow-hidden rounded-lg bg-light-grey transition-colors duration-500 group-hover:bg-medium-grey">
                    {item.image?.url && (
                      <FollowCursor className="absolute inset-0">
                        <Image
                          src={item.image.url}
                          alt={item.image.alt || item.name || ""}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                          className="object-contain p-[6%] transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </FollowCursor>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-title-xs text-black-grey" data-paint>
                      <SplitWords text={item.name!} />
                    </h3>
                    {item.text && (
                      <p className="text-body-m text-dark-grey">
                        <Typewriter text={item.text} />
                      </p>
                    )}
                  </div>
                </>
              );
              const card = "group flex h-full flex-col gap-6";
              return (
                <li key={i} data-typewriter-group data-typewriter-sequence data-typewriter-delay={(i % 3) * 0.1}>
                  {item.link?.url ? (
                    <Link href={item.link.url} target={item.link.target || undefined} className={card}>
                      {content}
                    </Link>
                  ) : (
                    <div className={card}>{content}</div>
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
