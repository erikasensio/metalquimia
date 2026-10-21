import type { Section, WpImage, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { SplitWords } from "@/components/motion/SplitWords";
import { Typewriter } from "@/components/motion/Typewriter";

type Props = Section & {
  title?: string;
  subtitle_muted?: string;
  subtitle?: string;
  button?: WpLink | null;
  image?: (WpImage & { mime?: string }) | null;
  image_fit?: "contain" | "cover" | "";
};

/**
 * Figma Modulos › 2. Secondary Hero.
 * Título enorme a la izquierda, texto en dos tonos + botón a la derecha y, opcionalmente,
 * una imagen a lo ancho del contenedor sobre un degradado gris. Va bajo la cabecera (fondo blanco).
 */
export default function SecondaryHero({ title, subtitle_muted, subtitle, button, image, image_fit }: Props) {
  const long = (title?.length ?? 0) > 30;
  const cover = image_fit === "cover";
  // Las palabras muy largas ("Representantes") reducen el cuerpo para no salirse de la pantalla.
  const longestWord = Math.max(0, ...(title ?? "").split(/\s+/).map((w) => w.length));
  const fit = !long && longestWord > 8 ? { fontSize: `min(var(--hero-max), calc(var(--hero-space) / ${(longestWord * 0.6).toFixed(2)}))` } : undefined;

  return (
    <div className={`bg-white pt-10 lg:pt-16 ${image?.url ? "" : "pb-20 lg:pb-[120px]"}`}>
      <div className="site-container flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16" data-typewriter-group data-typewriter-sequence>
        {title && (
          <h1
            className={`min-w-0 whitespace-pre-line tracking-[-0.02em] text-black [font-feature-settings:'dlig'_1] [--hero-max:4rem] [--hero-space:calc(100vw-40px)] lg:[--hero-max:10rem] lg:[--hero-space:calc(min(100vw,94.5rem)-48px-424px)] ${long ? "text-title-l max-w-[24ch]" : "text-title-xxl"}`}
            style={fit}
            data-paint
          >
            <SplitWords text={title} />
          </h1>
        )}

        {(subtitle_muted || subtitle || button?.url) && (
          <div className="flex w-full max-w-[360px] shrink-0 flex-col items-start gap-6 lg:pb-3">
            {(subtitle_muted || subtitle) && (
              <p className="text-body-l font-medium">
                {subtitle_muted && (
                  <span className="text-grey">
                    <Typewriter text={`${subtitle_muted} `} />
                  </span>
                )}
                {subtitle && (
                  <span className="text-black">
                    <Typewriter text={subtitle} />
                  </span>
                )}
              </p>
            )}
            {button?.url && (
              <div data-reveal>
                <Button href={button.url} target={button.target} variant="solid">
                  {button.title}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {image?.url && (
        <div className="site-container mt-10 lg:mt-16">
          <div className="relative h-[360px] overflow-hidden bg-gradient-to-b from-white to-medium-grey lg:h-[640px]" data-reveal>
            <Media
              image={image}
              className="absolute inset-0"
              imgClassName={cover ? "object-cover" : "object-contain object-bottom p-6 lg:p-12"}
              sizes="(min-width: 1512px) 1464px, 100vw"
              priority
              parallax={cover}
            />
          </div>
        </div>
      )}
    </div>
  );
}
