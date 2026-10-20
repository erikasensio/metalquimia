import Image from "next/image";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { HighlightTags } from "./parts/HighlightClient";

type Props = Section & {
  eyebrow?: string;
  word_top?: string;
  word_bottom?: string;
  image?: WpImage | null;
  tags?: { label?: string }[] | null | false | "";
  items?: { title?: string; text?: string }[] | null | false | "";
  overlay_title?: string;
  overlay_text?: string;
  overlay_image?: WpImage | null;
  overlay_button?: WpLink | null;
};

/**
 * Figma Modulos › 23. Highlight ("Meat. / The Next.").
 * Producto entre dos palabras gigantes, etiquetas que flotan alrededor (abren una tarjeta si hay
 * contenido de ventana emergente) y, debajo, características numeradas en dos columnas.
 */
export default function Highlight(props: Props) {
  const { eyebrow, word_top, word_bottom, image, tags, items, overlay_title, overlay_text, overlay_image, overlay_button } = props;
  const tagList = (Array.isArray(tags) ? tags : []).map((t) => t?.label || "").filter(Boolean);
  const features = (Array.isArray(items) ? items : []).filter((item) => item?.title || item?.text);
  const hasOverlay = !!(overlay_title || overlay_text || overlay_image?.url || overlay_button?.url);
  const word = "absolute inset-x-0 whitespace-nowrap text-center font-display text-[clamp(3rem,17vw,4.5rem)] font-semibold leading-none tracking-[-0.02em] md:text-[8rem] lg:text-[11rem] [font-feature-settings:'dlig'_1]";

  return (
    <div className="overflow-hidden bg-black py-20 text-light-grey lg:py-[120px]">
      <div className="site-container flex flex-col gap-10 lg:gap-16">
        {eyebrow && (
          <p className="text-center text-eyebrow text-red" data-reveal>
            {eyebrow}
          </p>
        )}

        <div className="relative h-[520px] lg:h-[760px]">
          {word_top && <p className={`${word} top-0 text-grey`}>{word_top}</p>}
          {word_bottom && <p className={`${word} bottom-0 text-light-grey`}>{word_bottom}</p>}

          {image?.url && (
            <div className="pointer-events-none absolute inset-x-0 top-[15%] h-[70%]">
              <div className="relative size-full" data-parallax="0.2">
                <Image src={image.url} alt={image.alt || ""} fill sizes="(min-width: 1024px) 760px, 90vw" className="object-contain" />
              </div>
            </div>
          )}

          {tagList.length > 0 && (
            <HighlightTags
              tags={tagList}
              overlay={
                hasOverlay
                  ? {
                      title: overlay_title || "",
                      text: overlay_text || "",
                      image: overlay_image?.url ? overlay_image : null,
                      button: overlay_button?.url ? overlay_button : null,
                    }
                  : null
              }
            />
          )}
        </div>

        {features.length > 0 && (
          <ol className="grid gap-x-16 lg:grid-cols-2" data-stagger>
            {features.map((item, i) => (
              <li key={i} className="flex flex-col gap-3 border-t border-white/10 pb-10 pt-6 lg:flex-row lg:gap-8">
                <span className="font-mono text-[0.875rem] text-grey">[{String(i + 1).padStart(2, "0")}]</span>
                <div className="flex flex-col gap-3">
                  {item.title && <h3 className="text-title-s text-light-grey">{item.title}</h3>}
                  {item.text && <p className="text-body-m text-grey">{item.text}</p>}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
