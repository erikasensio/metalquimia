import Image from "next/image";
import Link from "next/link";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  subtitle?: string;
  button?: WpLink | null;
  items?: { image?: WpImage | null; name?: string; text?: string; link?: WpLink | null }[] | null | false | "";
};

/**
 * Página Soluciones (mismo estilo que las tarjetas del megamenú).
 * Rejilla de categorías con el producto recortado, que sube un poco al pasar el ratón.
 */
export default function SolutionsGrid({ eyebrow, title_muted, title, subtitle, button, items }: Props) {
  const list = (Array.isArray(items) ? items : []).filter((item) => item?.name);

  return (
    <div className="bg-white py-20 lg:py-[120px]">
      <div className="site-container flex flex-col gap-12 lg:gap-16">
        <SectionHeader eyebrow={eyebrow} eyebrowColor="grey" titleMuted={title_muted} title={title} subtitle={subtitle} button={button} />

        {list.length > 0 && (
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3" data-stagger>
            {list.map((item, i) => {
              const content = (
                <>
                  <div className="relative aspect-square">
                    {item.image?.url && (
                      <Image
                        src={item.image.url}
                        alt={item.image.alt || item.name || ""}
                        fill
                        sizes="(min-width: 1024px) 30vw, 45vw"
                        className="object-contain transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 text-center lg:text-left">
                    <h3 className="text-title-s text-black">{item.name}</h3>
                    {item.text && <p className="hidden text-body-s text-grey lg:block">{item.text}</p>}
                  </div>
                </>
              );
              const card = "group flex h-full flex-col gap-4 bg-light-grey p-4 lg:p-6";
              return (
                <li key={i}>
                  {item.link?.url ? (
                    <Link href={item.link.url} target={item.link.target || undefined} className={`${card} transition-colors hover:bg-medium-grey`}>
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
