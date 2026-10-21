import Link from "next/link";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { Typewriter } from "@/components/motion/Typewriter";
import { SplitWords } from "@/components/motion/SplitWords";

type Item = { image?: (WpImage & { mime?: string }) | null; title?: string; text?: string; link?: WpLink | null };
type Props = Section & {
  columns?: "3" | "4" | 3 | 4;
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  subtitle?: string;
  button?: WpLink | null;
  items?: Item[] | null;
};

/** Figma Modulos › 22. Cards Info: rejilla de tarjetas con imagen, título y texto. */
export default function CardsInfo({ columns, eyebrow, title_muted, title, subtitle, button, items }: Props) {
  const four = String(columns) === "4";
  const list = (items || []).filter((i) => i?.title || i?.text || i?.image?.url);

  return (
    <div className="bg-white py-20 lg:py-[120px]">
      <div className="site-container flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} subtitle={subtitle} />
          {button?.url && (
            <div className="shrink-0" data-reveal>
              <Button href={button.url} target={button.target} variant="solid">
                {button.title}
              </Button>
            </div>
          )}
        </div>
        {list.length > 0 && (
          <ul className={`grid gap-x-4 gap-y-10 md:grid-cols-2 ${four ? "lg:grid-cols-4" : "lg:grid-cols-3"}`} data-stagger>
            {list.map((item, i) => {
              const content = (
                <>
                  <div className="overflow-hidden">
                    <Media
                      image={item.image}
                      className="aspect-[4/3] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes={four ? "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    {item.title && (
                      <h3 className="text-title-s text-black" data-paint>
                        <SplitWords text={item.title} />
                      </h3>
                    )}
                    {item.text && (
                      <p className="text-body-m text-grey">
                        <Typewriter text={item.text} />
                      </p>
                    )}
                  </div>
                </>
              );
              return (
                // La tarjeta entra escalonada (data-stagger) y su título y texto se escriben detrás.
                <li key={i} data-typewriter-group data-typewriter-sequence data-typewriter-delay={(i % (four ? 4 : 3)) * 0.1}>
                  {item.link?.url ? (
                    <Link href={item.link.url} target={item.link.target || undefined} className="group flex flex-col gap-5">
                      {content}
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-5">{content}</div>
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
