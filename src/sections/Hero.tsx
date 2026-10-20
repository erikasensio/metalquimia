import Image from "next/image";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { SplitWords } from "@/components/motion/SplitWords";
import { HeroScrubVideo } from "./parts/HeroScrubVideo";

type Props = Section & {
  image?: WpImage | null;
  image_mobile?: WpImage | null;
  video?: WpImage | null;
  title?: string;
  button?: WpLink | null;
};

/**
 * Hero a pantalla completa (Figma "hero-full-screen" 418:20919). La cabecera queda superpuesta.
 * Con vídeo, el hero se queda fijo mientras el scroll mueve el vídeo y cada línea del título
 * es una frase que entra con destello naranja; el botón aparece con la última (ver HeroScrubVideo).
 */
export default function Hero({ image, image_mobile, video, title, button }: Props) {
  const lines = video?.url ? (title ?? "").split("\n").filter((l) => l.trim()) : [];
  const cta = button?.url && (
    <Button href={button.url} target={button.target} variant="outline">
      {button.title}
    </Button>
  );

  if (video?.url) {
    return (
      <div className="relative flex h-svh min-h-[600px] items-end justify-center overflow-hidden bg-black px-5 pb-20 pt-40 lg:px-[145px]" data-hero-scrub>
        <HeroScrubVideo src={video.url} poster={image?.url} />
        {/* El vídeo se aclara al avanzar: degradado para que el título se lea siempre. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" aria-hidden />

        <div className="relative flex max-w-[970px] flex-col items-center gap-[34px] text-center">
          {lines.length > 0 && (
            // Las frases van una encima de otra (misma celda de la rejilla) y se relevan con el scroll.
            <h1 className="text-hero grid max-w-[10em] text-light-grey [font-feature-settings:'dlig'_1]">
              {lines.map((line, i) => (
                <span key={i} className="[grid-area:1/1] self-end text-balance" data-hero-line>
                  <SplitWords text={line} />
                </span>
              ))}
            </h1>
          )}
          {cta && <div data-hero-cta>{cta}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[600px] items-end justify-center overflow-hidden bg-black px-5 pb-20 pt-40 lg:h-[943px] lg:max-h-svh lg:min-h-[720px] lg:px-[145px]">
      {image?.url && (
        <Image
          src={image.url}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className={`object-cover object-bottom ${image_mobile?.url ? "hidden md:block" : ""}`}
        />
      )}
      {image_mobile?.url && (
        <Image src={image_mobile.url} alt={image_mobile.alt} fill priority sizes="100vw" className="object-cover object-bottom md:hidden" />
      )}

      <div className="relative flex max-w-[970px] flex-col items-center gap-[34px] text-center">
        {title && <h1 className="text-hero whitespace-pre-line text-light-grey [font-feature-settings:'dlig'_1]">{title}</h1>}
        {cta}
      </div>
    </div>
  );
}
