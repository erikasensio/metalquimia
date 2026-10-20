import Image from "next/image";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";

type Props = Section & {
  image?: WpImage | null;
  image_mobile?: WpImage | null;
  title_top?: string;
  title_bottom?: string;
  subtitle?: string;
  card_image?: WpImage | null;
  card_text?: string;
  card_button?: WpLink | null;
};

/**
 * Figma Modulos › 6. Product Hero (página de máquina). La cabecera fija queda superpuesta.
 * Foto oscura a sangre, nombre partido en dos (arriba y abajo a la izquierda) y
 * tarjeta blanca de contacto abajo a la derecha.
 */
export default function ProductHero({ image, image_mobile, title_top, title_bottom, subtitle, card_image, card_text, card_button }: Props) {
  const showCard = Boolean(card_button?.url || card_text);

  return (
    <div className="relative flex min-h-[720px] flex-col overflow-hidden bg-black lg:h-[min(100svh,960px)]">
      {image?.url && (
        <Image
          src={image.url}
          alt={image.alt || ""}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${image_mobile?.url ? "hidden md:block" : ""}`}
        />
      )}
      {image_mobile?.url && (
        <Image src={image_mobile.url} alt={image_mobile.alt || ""} fill priority sizes="100vw" className="object-cover md:hidden" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" aria-hidden />

      <div className="site-container relative flex flex-1 flex-col justify-between gap-16 pb-6 pt-[120px] lg:pt-[140px]">
        {title_top && (
          <h1 className="text-title-xxl break-words tracking-[-0.02em] text-white [font-feature-settings:'dlig'_1]" data-reveal>
            {title_top}
            {/* El nombre completo se lee junto para los lectores de pantalla. */}
            {title_bottom && <span className="sr-only"> {title_bottom}</span>}
          </h1>
        )}

        <div className="flex flex-col gap-8 lg:pr-[460px]">
          {(title_bottom || subtitle) && (
            <div className="flex flex-col gap-4" data-reveal>
              {title_bottom && (
                <p
                  className="text-title-xxl break-words tracking-[-0.02em] text-white [font-feature-settings:'dlig'_1]"
                  aria-hidden={title_top ? true : undefined}
                >
                  {title_bottom}
                </p>
              )}
              {subtitle && <p className="text-body-l max-w-[48ch] text-grey">{subtitle}</p>}
            </div>
          )}

          {showCard && (
            <div
              className="flex w-full flex-col gap-4 bg-white p-4 lg:absolute lg:bottom-6 lg:right-6 lg:w-[420px]"
              data-reveal
            >
              <div className="flex items-center gap-4">
                {card_image?.url && (
                  <div className="relative h-[72px] w-24 shrink-0 overflow-hidden">
                    <Image src={card_image.url} alt={card_image.alt || ""} fill sizes="96px" className="object-cover" />
                  </div>
                )}
                {card_text && <p className="text-title-xs text-black">{card_text}</p>}
              </div>
              {card_button?.url && (
                <Button href={card_button.url} target={card_button.target} variant="red" className="w-full">
                  {card_button.title}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
