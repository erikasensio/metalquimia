import type { Section, WpImage, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Notch } from "@/components/ui/Notch";
import { BannerReveal } from "./parts/BannerReveal";

type Props = Section & {
  image?: (WpImage & { mime?: string }) | null;
  lines?: { text?: string }[] | null | false | "";
  button?: WpLink | null;
  corner_color?: "white" | "black" | "";
};

/**
 * Figma Modulos › 4. Banner Full Screen.
 * Foto a sangre con parallax, esquinas recortadas del color de las secciones vecinas y
 * titular en varias líneas arriba a la izquierda (Figma 325:3368). Con el scroll el banner se queda fijo y las frases aparecen
 * una a una con un desvanecido de izquierda a derecha hasta quedar en blanco; después, el botón (ver <BannerReveal>).
 */
export default function BannerFullScreen({ image, lines, button, corner_color }: Props) {
  const texts = (Array.isArray(lines) ? lines : []).map((line) => line?.text?.trim()).filter(Boolean) as string[];
  const corner = corner_color === "black" ? "bg-black" : "bg-white";

  return (
    // overflow-x-clip (no hidden): la foto y las pestañas sobresalen 1 px arriba y abajo para tapar la fila de
    // medio píxel con las secciones vecinas; z-[1] las pinta por encima de ellas.
    <div className="relative z-[1] flex min-h-[640px] items-start overflow-x-clip bg-black lg:h-[min(100svh,900px)]">
      <Media image={image} className="absolute inset-x-0 -inset-y-px" parallax sizes="100vw" />
      {/* Figma: velo negro al 50 % desde la izquierda que se apaga al 41 % del ancho, detrás del texto. */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(0_0_0/0.5)_0%,transparent_41%)]" aria-hidden />

      {/* Esquinas recortadas: arriba a la derecha y abajo a la izquierda. */}
      <Notch corner="top-right" colorClass={corner} />
      <Notch
        corner="bottom-left"
        colorClass={corner}
        sizeClass="h-[calc(1.5rem+2px)] w-[30%] [--notch-cut:1.5rem] lg:h-[calc(3rem+2px)] lg:[--notch-cut:3rem]"
      />

      {/* Arriba a la izquierda; el padding superior deja sitio a la cabecera fija (el banner se queda fijo arriba). */}
      <div className="site-container relative z-10 flex flex-col items-start gap-8 pb-16 pt-28 lg:gap-10 lg:pt-[120px]">
        {texts.length > 0 && (
          <h2 className="text-title-l [font-feature-settings:'dlig'_1]">
            {texts.map((text, i) => (
              <span key={i} className="sweep-text block pb-[0.1em]" data-sweep-line>
                {text}
              </span>
            ))}
          </h2>
        )}
        {button?.url && (
          <div data-sweep-cta>
            <Button href={button.url} target={button.target} variant="solid">
              {button.title}
            </Button>
          </div>
        )}
      </div>
      <BannerReveal />
    </div>
  );
}
