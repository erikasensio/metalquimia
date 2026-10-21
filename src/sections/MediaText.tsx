import type { Section, WpImage, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";
import { MediaTextLines } from "./parts/MediaTextLines";
import { Typewriter } from "@/components/motion/Typewriter";

type Props = Section & {
  theme?: "light" | "dark";
  image_position?: "left" | "right";
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  /** "m": título a 32 px para frases largas de un solo tono (Figma Engineering Mindset 325:16691). */
  title_size?: "l" | "m";
  /** La parte gris del título en su propia línea (Figma Páginas › Services 591:25140). */
  title_stacked?: boolean;
  text?: string;
  details?: string;
  button?: WpLink | null;
  image?: (WpImage & { mime?: string }) | null;
};

/** Figma Modulos › 15. Combo Text+Media: texto a un lado e imagen con esquinas recortadas al otro. */
export default function MediaText({ theme, image_position, eyebrow, title_muted, title, title_size, title_stacked, text, details, button, image }: Props) {
  const dark = theme === "dark";
  const left = image_position === "left";

  return (
    <div className={`relative overflow-hidden py-20 lg:py-[120px] ${dark ? "bg-black text-light-grey" : "bg-white text-black-grey"}`}>
      {/* Figma: el dibujo sube un poco más cuando la imagen va a la izquierda. */}
      {!dark && <MediaTextLines className={left ? undefined : "left-[calc(50%+0.12px)] top-[calc(50%-69.75px)]"} />}
      {/* Figma: dos columnas de 601 px con 16 px entre ellas (1218 px centrados) e imagen de 601 × 650. */}
      <div className="site-container relative grid items-center gap-10 lg:max-w-[calc(1218px+3rem)] lg:grid-cols-2 lg:gap-4">
        {/* En móvil la imagen va siempre primero. */}
        <Media
          image={image}
          className={`chamfer aspect-[4/3] lg:aspect-[601/650] ${left ? "" : "lg:order-last"}`}
          sizes="(min-width: 1024px) 601px, 100vw"
          parallax
        />
        {/* Antetítulo a máquina, título que se pinta y cuerpo tecleado de principio a fin, uno detrás de otro. */}
        <div className={`flex flex-col items-start gap-8 ${left ? "lg:pl-16" : ""}`} data-typewriter-group data-typewriter-sequence>
          <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} dark={dark} size={title_size === "m" ? "m" : "l"} stacked={!!title_stacked} />
          {text && (
            <div
              className={`text-body-m max-w-[497px] space-y-4 font-medium [&_a]:underline [&_a]:underline-offset-2 [&_li]:ml-5 [&_ol]:list-decimal [&_strong]:font-semibold [&_ul]:list-disc ${
                dark ? "text-grey [&_strong]:text-light-grey" : "text-dark-grey [&_strong]:text-black"
              }`}
              data-typewriter-html
              dangerouslySetInnerHTML={{ __html: text }}
            />
          )}
          {details && (
            <p className="text-body-s whitespace-pre-line text-grey">
              <Typewriter text={details} />
            </p>
          )}
          {button?.url && (
            <div data-reveal>
              <Button href={button.url} target={button.target} variant={dark ? "dark" : "solid"}>
                {button.title}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
