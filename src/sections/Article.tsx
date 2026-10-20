import type { Section, WpImage } from "@/lib/types";
import { Media } from "@/components/ui/Media";

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
  date?: string;
  title?: string;
  intro?: string;
  author?: string;
  image?: WpImage | null;
  author_label?: string;
  date_label?: string;
  blocks?: Block[] | null | false | "";
};

/**
 * Detalle de caso de éxito / insight (Figma "Case Study" e "Insight").
 * Cabecera en dos columnas (texto + imagen recortada) y cuerpo de 760px hecho con bloques.
 */
export default function Article({ category, date, title, intro, author, image, author_label, date_label, blocks }: Props) {
  const list = (Array.isArray(blocks) ? blocks : []).filter(Boolean);
  const mono = "font-mono text-[0.75rem] uppercase";

  return (
    <article className="bg-white py-20 lg:py-[120px]">
      <div className="site-container flex flex-col gap-16 lg:gap-24">
        <header className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col items-start gap-6" data-reveal>
            {(category || date) && (
              <p className={mono}>
                {category && <span className="text-red">{category}</span>}
                {category && date && <span className="text-grey"> · </span>}
                {date && <span className="text-grey">{date}</span>}
              </p>
            )}
            {title && <h1 className="text-title-l text-black [font-feature-settings:'dlig'_1]">{title}</h1>}
            {intro && <p className="text-body-l text-dark-grey">{intro}</p>}
            {(author || date) && (
              <dl className="mt-2 flex flex-wrap gap-x-12 gap-y-4 border-t border-medium-grey pt-6">
                {author && (
                  <div className="flex flex-col gap-1">
                    <dt className={`${mono} text-grey`}>{author_label || "Author"}</dt>
                    <dd className="text-body-m text-black">{author}</dd>
                  </div>
                )}
                {date && (
                  <div className="flex flex-col gap-1">
                    <dt className={`${mono} text-grey`}>{date_label || "Published"}</dt>
                    <dd className="text-body-m text-black">{date}</dd>
                  </div>
                )}
              </dl>
            )}
          </div>
          {image?.url && <Media image={image} className="chamfer aspect-[4/3]" sizes="(min-width: 1024px) 50vw, 100vw" priority />}
        </header>

        {list.length > 0 && (
          <div className="mx-auto flex w-full max-w-[760px] flex-col gap-10">
            {list.map((block, i) => (
              <ArticleBlock key={i} block={block} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function ArticleBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      if (!block.title) return null;
      return (
        <div className="flex flex-col gap-2 pt-4" data-reveal>
          <h2 className="text-title-m text-black">{block.title}</h2>
          {block.subtitle && <p className="text-body-l text-grey">{block.subtitle}</p>}
        </div>
      );
    case "image":
      if (!block.image?.url) return null;
      return (
        <figure className="flex flex-col gap-3" data-reveal>
          <Media image={block.image} className="aspect-[16/9]" sizes="(min-width: 800px) 760px, 100vw" />
          {block.caption && <figcaption className="font-mono text-[0.75rem] uppercase text-grey">{block.caption}</figcaption>}
        </figure>
      );
    case "quote":
      if (!block.quote) return null;
      return (
        <figure className="flex flex-col gap-4 bg-light-grey p-8" data-reveal>
          <blockquote className="text-quote text-black">{block.quote}</blockquote>
          {block.caption && <figcaption className="font-mono text-[0.75rem] uppercase text-grey">{block.caption}</figcaption>}
        </figure>
      );
    default:
      if (!block.text) return null;
      return (
        <div
          className="text-body-l text-dark-grey [&_a]:text-black [&_a]:underline [&_a]:underline-offset-2 [&_h3]:text-title-xs [&_h3]:text-black [&_li]:mt-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_strong]:font-medium [&_strong]:text-black [&_ul]:list-disc [&_ul]:pl-6 [&>*+*]:mt-5"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );
  }
}
