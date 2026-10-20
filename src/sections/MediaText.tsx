import type { Section, WpImage, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Media } from "@/components/ui/Media";
import { Button } from "@/components/ui/Button";

type Props = Section & {
  theme?: "light" | "dark";
  image_position?: "left" | "right";
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  text?: string;
  details?: string;
  button?: WpLink | null;
  image?: (WpImage & { mime?: string }) | null;
};

/** Figma Modulos › 15. Combo Text+Media: texto a un lado e imagen con esquinas recortadas al otro. */
export default function MediaText({ theme, image_position, eyebrow, title_muted, title, text, details, button, image }: Props) {
  const dark = theme === "dark";
  const left = image_position === "left";

  return (
    <div className={`py-20 lg:py-[120px] ${dark ? "bg-black text-light-grey" : "bg-white text-black-grey"}`}>
      <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-24">
        {/* En móvil la imagen va siempre primero. */}
        <Media
          image={image}
          className={`chamfer aspect-[4/3] lg:aspect-[5/4] ${left ? "" : "lg:order-last"}`}
          sizes="(min-width: 1024px) 50vw, 100vw"
          parallax
        />
        {/* Antetítulo a máquina, título que se pinta y cuerpo tecleado de principio a fin, uno detrás de otro. */}
        <div className="flex flex-col items-start gap-8" data-typewriter-group data-typewriter-sequence>
          <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} dark={dark} size="l" motion="type" />
          {text && (
            <div
              className={`text-body-l max-w-[56ch] space-y-4 [&_a]:underline [&_a]:underline-offset-2 [&_li]:ml-5 [&_ol]:list-decimal [&_strong]:font-semibold [&_ul]:list-disc ${
                dark ? "text-grey [&_strong]:text-light-grey" : "text-dark-grey [&_strong]:text-black"
              }`}
              data-typewriter-html
              dangerouslySetInnerHTML={{ __html: text }}
            />
          )}
          {details && (
            <p className="text-body-s whitespace-pre-line text-grey" data-reveal>
              {details}
            </p>
          )}
          {button?.url && (
            <Button href={button.url} target={button.target} variant={dark ? "dark" : "solid"}>
              {button.title}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
