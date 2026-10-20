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
 * Figma Modulos › 23. Highlight ("Meat. / The Next.", Home 325:1863).
 * Escritorio: escenario a sangre con el producto en el centro; las dos palabras gigantes van encima en gris
 * oscuro con mezcla "difference", así sobre el fondo negro se leen grises y sobre la máquina quedan casi
 * fundidas, como si estuvieran detrás. Etiquetas que flotan (abren una tarjeta si hay ventana emergente) y,
 * debajo, características numeradas en dos columnas.
 * Móvil (Figma 609:80536): solo texto; antetítulo y las dos palabras en una línea, sin imagen ni etiquetas.
 */
export default function Highlight(props: Props) {
  const { eyebrow, word_top, word_bottom, image, tags, items, overlay_title, overlay_text, overlay_image, overlay_button } = props;
  const tagList = (Array.isArray(tags) ? tags : []).map((t) => t?.label || "").filter(Boolean);
  const features = (Array.isArray(items) ? items : []).filter((item) => item?.title || item?.text);
  const hasOverlay = !!(overlay_title || overlay_text || overlay_image?.url || overlay_button?.url);
  // Figma: 140 px sobre 1512 de ancho, degradado #1c1c1c → #4d4d4d recortado al texto y mezcla difference.
  const word =
    "absolute left-1/2 w-max -translate-x-1/2 whitespace-nowrap bg-[linear-gradient(96deg,#1c1c1c_15%,#4d4d4d_99%)] bg-clip-text text-center font-display text-[min(9.26vw,140px)] font-semibold leading-[0.95] text-transparent mix-blend-difference [font-feature-settings:'dlig'_1] [text-box:trim-both_cap_alphabetic]";

  return (
    <div className="overflow-hidden bg-black text-light-grey">
      {/* Móvil */}
      <div className="flex flex-col gap-3 px-6 pt-20 lg:hidden">
        {eyebrow && <p className="font-display text-[0.75rem] font-semibold uppercase leading-[1.2] tracking-[0.02em] text-red">{eyebrow}</p>}
        {(word_top || word_bottom) && (
          <h2 className="font-display text-[2.25rem] font-semibold leading-[1.1] text-light-grey [font-feature-settings:'dlig'_1]">
            {[word_top, word_bottom].filter(Boolean).join(" ")}
          </h2>
        )}
      </div>

      {/* Escritorio: escenario 1512 × 1000 de Figma, escalado al ancho. */}
      <div className="relative mx-auto hidden aspect-[1512/1000] w-full max-w-[1512px] lg:block">
        {image?.url && (
          <div className="pointer-events-none absolute left-[7.2%] top-[5%] h-[92.4%] w-[85.57%]">
            <div className="relative size-full" data-parallax="0.12">
              <Image src={image.url} alt={image.alt || ""} fill sizes="(min-width: 1512px) 1294px, 86vw" className="object-contain" />
            </div>
          </div>
        )}

        {eyebrow && (
          <p className="absolute inset-x-0 top-[9.3%] text-center font-mono text-[0.875rem] uppercase leading-none tracking-[0.02em] text-red" data-reveal>
            {eyebrow}
          </p>
        )}
        {word_top && (
          <p className={`${word} top-[15.47%]`} aria-hidden={!!word_bottom}>
            {word_top}
          </p>
        )}
        {word_bottom && <p className={`${word} top-[75.1%]`}>{word_bottom}</p>}
        {(word_top || word_bottom) && <h2 className="sr-only">{[word_top, word_bottom].filter(Boolean).join(" ")}</h2>}

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
        <ol
          className="mx-auto mt-12 grid w-full max-w-[1512px] gap-10 px-6 pb-20 lg:mt-0 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-0 lg:px-[9.72%] lg:pb-6 lg:pt-6"
          data-stagger
        >
          {features.map((item, i) => (
            <li key={i} className="grid grid-cols-[36px_1fr] gap-x-4 border-t border-white/20 pt-4 lg:grid-cols-[107px_1fr] lg:pb-16">
              <span className="font-mono text-[0.875rem] uppercase leading-none tracking-[0.02em] text-grey">[{String(i + 1).padStart(2, "0")}]</span>
              <div className="flex max-w-[477px] flex-col gap-2 lg:gap-4">
                {item.title && <h3 className="font-display text-[1.125rem] font-semibold leading-[1.2] text-light-grey [font-feature-settings:'dlig'_1] lg:text-[1.5rem]">{item.title}</h3>}
                {item.text && <p className="font-display text-[0.875rem] font-medium leading-[1.4] tracking-[-0.01em] text-grey lg:text-[1rem]">{item.text}</p>}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
