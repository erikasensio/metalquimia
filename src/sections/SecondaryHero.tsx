import type { Section, WpImage, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { SplitWords } from "@/components/motion/SplitWords";
import { Typewriter } from "@/components/motion/Typewriter";
import { HeroHighlight } from "./parts/HeroHighlight";
import { MediaTextLines } from "./parts/MediaTextLines";

type Props = Section & {
  title?: string;
  subtitle_muted?: string;
  subtitle?: string;
  subtitle_end?: string;
  scroll_highlight?: boolean;
  lines?: boolean;
  button?: WpLink | null;
  image?: (WpImage & { mime?: string }) | null;
  image_fit?: "contain" | "cover" | "";
};

/**
 * Figma Modulos › 2. Secondary Hero.
 * Título enorme a la izquierda, texto en dos tonos + botón a la derecha y, opcionalmente,
 * una imagen a lo ancho del contenedor sobre un degradado gris. Va bajo la cabecera (fondo blanco).
 * Con scroll_highlight (Figma Páginas › Meat injection 443:17486) ocupa la pantalla y se queda fijo mientras el
 * scroll ilumina el texto de la derecha, más grande (Title M); al final entra el botón (ver <HeroHighlight>).
 * Con lines, el dibujo de líneas del Combo Text+Media detrás del título.
 */
export default function SecondaryHero({ title, subtitle_muted, subtitle, subtitle_end, scroll_highlight, lines, button, image, image_fit }: Props) {
  const long = (title?.length ?? 0) > 30;
  const cover = image_fit === "cover";
  // Las palabras muy largas ("Representantes") reducen el cuerpo para no salirse de la pantalla.
  const longestWord = Math.max(0, ...(title ?? "").split(/\s+/).map((w) => w.length));
  const fit = !long && longestWord > 8 ? { fontSize: `min(var(--hero-max), calc(var(--hero-space) / ${(longestWord * 0.6).toFixed(2)}))` } : undefined;

  const highlight = !!scroll_highlight && !image?.url;
  // Partes del texto de la derecha: gris, negro y, opcionalmente, otra vez gris.
  const parts = [
    { text: subtitle_muted, className: "text-grey" },
    { text: subtitle, className: "text-black" },
    { text: subtitle_end, className: "text-grey" },
  ].filter((part) => part.text);

  return (
    <div
      className={`relative bg-white ${
        highlight
          ? "flex min-h-[560px] flex-col justify-center overflow-hidden py-10 h-[calc(100svh-71px)] xl:h-[calc(100svh-95px)]"
          : `pt-10 lg:pt-16 ${image?.url ? "" : "pb-20 lg:pb-[120px]"}`
      } ${lines && !highlight ? "overflow-hidden" : ""}`}
    >
      {/* Figma: el dibujo es el del Combo Text+Media × 1,4796, centrado a la izquierda y 8 px por debajo del texto. */}
      {lines && <MediaTextLines className="left-[calc(20.83%-3.1px)] top-[calc(50%+8px)] scale-[1.4796]" />}
      {highlight && <HeroHighlight />}
      <div
        className={`site-container relative flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-16 ${highlight ? "lg:items-start" : "lg:items-end"}`}
        data-typewriter-group
        data-typewriter-sequence
      >
        {title && (
          <h1
            className={`min-w-0 whitespace-pre-line tracking-[-0.02em] text-black [font-feature-settings:'dlig'_1] [--hero-max:4rem] [--hero-space:calc(100vw-40px)] lg:[--hero-max:10rem] lg:[--hero-space:calc(min(100vw,94.5rem)-48px-424px)] ${long ? "text-title-l max-w-[24ch]" : "text-title-xxl"}`}
            style={fit}
            data-paint
          >
            <SplitWords text={title} />
          </h1>
        )}

        {(parts.length > 0 || button?.url) && (
          <div
            className={`flex w-full shrink-0 flex-col items-start gap-6 ${highlight ? "max-w-[500px] lg:px-6 lg:py-4" : "max-w-[360px] lg:pb-3"}`}
          >
            {parts.length > 0 &&
              (highlight ? (
                // Se ilumina con el scroll palabra a palabra (HeroHighlight); cada parte acaba en su color.
                <p className="text-title-m tracking-[-0.01em] [font-feature-settings:'dlig'_1]" data-highlight>
                  {parts.map((part, i) => (
                    <SplitWords key={i} text={i < parts.length - 1 ? `${part.text} ` : part.text!} className={part.className} />
                  ))}
                </p>
              ) : (
                <p className="text-body-l font-medium">
                  {parts.map((part, i) => (
                    <span key={i} className={part.className}>
                      <Typewriter text={i < parts.length - 1 ? `${part.text} ` : part.text!} />
                    </span>
                  ))}
                </p>
              ))}
            {button?.url && (
              <div {...(highlight ? { "data-highlight-cta": "" } : { "data-reveal": "" })}>
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
