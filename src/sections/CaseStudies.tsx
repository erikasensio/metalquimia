import Link from "next/link";
import type { Section, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Typewriter } from "@/components/motion/Typewriter";
import { SplitWords } from "@/components/motion/SplitWords";

type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  subtitle?: string;
  button?: WpLink | null;
  read_label?: string;
  items?: { category?: string; title?: string; link?: WpLink | null }[] | null | false | "";
};

/**
 * Figma Modulos › 25. Case Studies.
 * Cabecera centrada y casos en tres columnas separadas por líneas; al pasar el ratón la tarjeta se vuelve negra.
 */
export default function CaseStudies({ eyebrow, title_muted, title, subtitle, button, read_label, items }: Props) {
  const list = (Array.isArray(items) ? items : []).filter((item) => item?.title);

  return (
    <div className="bg-white py-20 lg:py-[120px]">
      <div className="site-container flex flex-col gap-12 lg:gap-16">
        <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} subtitle={subtitle} button={button} align="center" />

        {list.length > 0 && (
          <ul className="grid md:grid-cols-3" data-cards>
            {list.map((item, i) => {
              const content = (
                <>
                  <div className="flex flex-col gap-4">
                    {item.category && (
                      <p className="font-mono text-[0.75rem] uppercase text-red">
                        <Typewriter text={item.category} />
                      </p>
                    )}
                    {item.title && (
                      <h3 className="text-title-s text-black transition-colors duration-300 group-hover:text-light-grey" data-paint>
                        <SplitWords text={item.title} />
                      </h3>
                    )}
                  </div>
                  <span className="self-start bg-medium-grey px-3 py-2 font-mono text-[0.75rem] font-bold uppercase leading-none text-dark-grey transition-colors duration-300 group-hover:bg-dark-grey group-hover:text-light-grey">
                    {read_label || "READ CASE"}
                  </span>
                </>
              );
              const card = "group flex h-full min-h-[320px] flex-col justify-between gap-8 p-6 transition-colors duration-300 hover:bg-black";
              return (
                <li key={i} className="border-l border-medium-grey" data-card>
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
