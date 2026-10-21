import Image from "next/image";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Typewriter } from "@/components/motion/Typewriter";
import { SplitWords } from "@/components/motion/SplitWords";

type Props = Section & {
  image?: WpImage | null;
  title?: string;
  /** Campos antiguos (nombre partido en dos): se unen si no hay `title`. */
  title_top?: string;
  title_bottom?: string;
  subtitle?: string;
  card_image?: WpImage | null;
  card_text?: string;
  card_button?: WpLink | null;
};

/**
 * Figma Páginas › Página de máquina (193:4073) › product-hero. La cabecera fija queda superpuesta.
 * Fondo gris oscuro que se funde a negro, la máquina recortada centrada y, abajo, nombre + frase a la
 * izquierda y tarjeta gris de contacto a la derecha.
 * Escritorio (1512 × 920 en el Figma): la máquina ocupa el alto que dejan la cabecera y la fila de abajo.
 */
export default function ProductHero({ image, title, title_top, title_bottom, subtitle, card_image, card_text, card_button }: Props) {
  const name = title || [title_top, title_bottom].filter(Boolean).join(" ");
  const thumb = card_image?.url ? card_image : image?.url ? image : null;
  const showCard = Boolean(card_button?.url || card_text);

  return (
    <div className="flex flex-col bg-[#323232] bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(180deg,rgba(93,93,93,0)_0%,#000_100%)] pb-6 pt-24 lg:h-[min(100svh,920px)] lg:min-h-[720px] lg:pb-10 lg:pt-[126px]">
      {/* Máquina: 836 × 624 px centrada en el Figma (55 % del ancho). */}
      <div className="relative mx-auto aspect-[1200/896] w-[calc(100%-2.5rem)] max-w-[836px] lg:aspect-auto lg:min-h-0 lg:flex-1">
        {image?.url && (
          <Image src={image.url} alt={image.alt || name} fill priority sizes="(min-width: 1024px) 836px, 100vw" className="object-contain" />
        )}
      </div>

      <div className="site-container mt-8 flex shrink-0 flex-col gap-8 lg:flex-row lg:items-end lg:justify-between" data-typewriter-group data-typewriter-sequence>
        {(name || subtitle) && (
          <div className="flex max-w-[601px] flex-col gap-4 text-medium-grey">
            {name && (
              <h1 className="text-title-m tracking-[-0.01em] [font-feature-settings:'dlig'_1]" data-paint>
                <SplitWords text={name} />
              </h1>
            )}
            {subtitle && (
              <p className="text-body-m">
                <Typewriter text={subtitle} />
              </p>
            )}
          </div>
        )}

        {showCard && (
          <div className="flex flex-col gap-4 rounded-[12px] bg-medium-grey p-1 sm:flex-row sm:items-center sm:gap-6 sm:pr-3 lg:shrink-0" data-reveal>
            <div className="flex items-center gap-3">
              {thumb && (
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-white">
                  <Image src={thumb.url} alt="" fill sizes="64px" className="object-contain" />
                </div>
              )}
              {card_text && (
                <p className="text-title-xs max-w-[176px] text-black" data-paint>
                  <SplitWords text={card_text} />
                </p>
              )}
            </div>
            {card_button?.url && (
              <Button href={card_button.url} target={card_button.target} variant="red" className="rounded-[3px] backdrop-blur-[20px]">
                {card_button.title}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
