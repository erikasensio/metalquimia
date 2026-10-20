import type { Section, WpImage, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Notch } from "@/components/ui/Notch";

type Props = Section & {
  image?: (WpImage & { mime?: string }) | null;
  lines?: { text?: string }[] | null | false | "";
  button?: WpLink | null;
  corner_color?: "white" | "black" | "";
};

/**
 * Figma Modulos › 4. Banner Full Screen.
 * Foto a sangre con parallax, esquinas recortadas del color de las secciones vecinas y
 * titular en varias líneas abajo a la izquierda (la última se desvanece).
 */
export default function BannerFullScreen({ image, lines, button, corner_color }: Props) {
  const texts = (Array.isArray(lines) ? lines : []).map((line) => line?.text?.trim()).filter(Boolean) as string[];
  const corner = corner_color === "black" ? "bg-black" : "bg-white";

  return (
    // overflow-x-clip (no hidden): la foto y las pestañas sobresalen 1 px arriba y abajo para tapar la fila de
    // medio píxel con las secciones vecinas; z-[1] las pinta por encima de ellas.
    <div className="relative z-[1] flex min-h-[640px] items-end overflow-x-clip bg-black lg:h-[min(100svh,900px)]">
      <Media image={image} className="absolute inset-x-0 -inset-y-px" parallax sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden />

      {/* Esquinas recortadas: arriba a la derecha y abajo a la izquierda. */}
      <Notch corner="top-right" colorClass={corner} />
      <Notch
        corner="bottom-left"
        colorClass={corner}
        sizeClass="h-[calc(1.5rem+2px)] w-[30%] [--notch-cut:1.5rem] lg:h-[calc(3rem+2px)] lg:[--notch-cut:3rem]"
      />

      <div className="site-container relative z-10 flex flex-col items-start gap-8 pb-16 pt-32 lg:pb-24">
        {texts.length > 0 && (
          <h2 className="text-title-xl tracking-[-0.02em] [font-feature-settings:'dlig'_1]" data-stagger>
            {texts.map((text, i) => (
              <span
                key={i}
                className={`block ${
                  i === texts.length - 1 && texts.length > 1
                    ? "bg-gradient-to-r from-white from-10% to-white/0 to-90% bg-clip-text pb-[0.1em] text-transparent"
                    : "text-white"
                }`}
              >
                {text}
              </span>
            ))}
          </h2>
        )}
        {button?.url && (
          <div data-reveal>
            <Button href={button.url} target={button.target} variant="light">
              {button.title}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
