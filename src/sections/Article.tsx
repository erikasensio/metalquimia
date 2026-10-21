import { Minus } from "@phosphor-icons/react/dist/ssr";
import type { Section, WpImage } from "@/lib/types";
import { Media } from "@/components/ui/Media";
import { Typewriter } from "@/components/motion/Typewriter";
import { SplitWords } from "@/components/motion/SplitWords";

type Block = {
  type?: "heading" | "text" | "image" | "quote";
  title?: string;
  subtitle?: string;
  text?: string;
  image?: WpImage | null;
  quote?: string;
  caption?: string;
};

type Props = Section & {
  category?: string;
  reading_time?: string;
  date?: string;
  title?: string;
  intro?: string;
  author?: string;
  image?: WpImage | null;
  author_label?: string;
  date_label?: string;
  blocks?: Block[] | null | false | "";
};

const mono = "font-mono text-[0.875rem] uppercase leading-none tracking-[0.02em]";

/**
 * Detalle de caso de éxito / insight (Figma "Detalle de casos de éxito / Insight", 459:24823).
 * Cabecera en dos columnas (texto + foto a toda la altura) y cuerpo de 696px hecho con bloques.
 */
export default function Article({ category, reading_time, date, title, intro, author, image, author_label, date_label, blocks }: Props) {
  const list = (Array.isArray(blocks) ? blocks : []).filter(Boolean);

  return (
    <article className="bg-white">
      <div className="site-container pt-6 lg:px-12">
        <header className="grid gap-10 lg:h-[800px] lg:grid-cols-2 lg:gap-0">
          <div className="flex flex-col justify-center gap-10 lg:gap-16 lg:px-[120px] lg:py-10" data-typewriter-group data-typewriter-sequence>
            <div className="flex flex-col items-start gap-6">
              {(category || reading_time) && (
                <p className={`flex items-center gap-2 text-red ${mono}`}>
                  {category && <Typewriter text={category} />}
                  {category && reading_time && <Minus size={12} aria-hidden />}
                  {reading_time && <Typewriter text={reading_time} />}
                </p>
              )}
              {title && (
                <h1 className="text-title-l text-black [font-feature-settings:'dlig'_1]" data-paint>
                  <SplitWords text={title} />
                </h1>
              )}
              {intro && (
                <p className="text-body-m text-grey">
                  <Typewriter text={intro} />
                </p>
              )}
            </div>
            {(author || date) && (
              <dl className="flex flex-col gap-8">
                {author && (
                  <div className="flex flex-col gap-2">
                    <dt className={`${mono} text-grey`}>
                      <Typewriter text={author_label || "Written by"} />
                    </dt>
                    <dd className="text-body-m text-black">
                      <Typewriter text={author} />
                    </dd>
                  </div>
                )}
                {date && (
                  <div className="flex flex-col gap-2">
                    <dt className={`${mono} text-grey`}>
                      <Typewriter text={date_label || "Published on"} />
                    </dt>
                    <dd className="text-body-m text-black">
                      <Typewriter text={date} />
                    </dd>
                  </div>
                )}
              </dl>
            )}
          </div>
          {image?.url && (
            <Media image={image} className="aspect-[4/3] rounded-[0.75rem] lg:aspect-auto lg:h-full" sizes="(min-width: 1024px) 50vw, 100vw" priority />
          )}
        </header>
      </div>

      {list.length > 0 && (
        <div className="relative py-16 lg:py-20">
          {/* Rombos grises en las esquinas del cuerpo. */}
          {["left-[44px] top-0", "right-[44px] top-0", "bottom-0 left-[44px]", "bottom-0 right-[44px]"].map((pos) => (
            <span key={pos} className={`absolute hidden size-[5px] rotate-45 bg-medium-grey lg:block ${pos} ${pos.includes("top") ? "-translate-y-1/2" : "translate-y-1/2"}`} aria-hidden />
          ))}
          <div className="site-container">
            <div className="mx-auto flex w-full max-w-[696px] flex-col gap-10">
              {list.map((block, i) => (
                <ArticleBlock key={i} block={block} />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function ArticleBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      if (!block.title) return null;
      return (
        <div className="flex flex-col gap-6" data-typewriter-group data-typewriter-sequence>
          <h2 className="text-title-l text-black [font-feature-settings:'dlig'_1]" data-paint>
            <SplitWords text={block.title} />
          </h2>
          {block.subtitle && (
            <p className="text-title-s text-black-grey [font-feature-settings:'dlig'_1]">
              <Typewriter text={block.subtitle} />
            </p>
          )}
        </div>
      );
    case "image":
      if (!block.image?.url) return null;
      return (
        <figure className="flex flex-col gap-3" data-typewriter-group>
          <div data-reveal>
            <Media image={block.image} className="aspect-[696/366] rounded-[0.75rem]" sizes="(min-width: 760px) 696px, 100vw" />
          </div>
          {block.caption && (
            <figcaption className={`${mono} text-grey`}>
              <Typewriter text={block.caption} />
            </figcaption>
          )}
        </figure>
      );
    case "quote":
      if (!block.quote) return null;
      return (
        <figure className="flex flex-col gap-4 rounded-[0.75rem] bg-light-grey p-6" data-typewriter-group data-typewriter-sequence>
          <blockquote className="text-title-s text-black-grey [font-feature-settings:'dlig'_1]">
            <Typewriter text={block.quote} />
          </blockquote>
          {block.caption && (
            <figcaption className={`${mono} text-grey`}>
              <Typewriter text={block.caption} />
            </figcaption>
          )}
        </figure>
      );
    default:
      if (!block.text) return null;
      return (
        <div
          className="text-body-m text-[#6e6e6e] [&_a]:text-black [&_a]:underline [&_a]:underline-offset-2 [&_h3]:text-title-xs [&_h3]:text-black [&_li]:mt-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_strong]:font-medium [&_strong]:text-black [&_ul]:list-disc [&_ul]:pl-6 [&>*+*]:mt-[1.4em]"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );
  }
}
