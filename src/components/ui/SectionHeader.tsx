import type { ComponentProps } from "react";
import type { WpLink } from "@/lib/types";
import { Button } from "./Button";
import { SplitWords } from "@/components/motion/SplitWords";
import { Typewriter } from "@/components/motion/Typewriter";

type Props = {
  eyebrow?: string;
  /** Primera parte del título, en gris. */
  titleMuted?: string;
  title?: string;
  subtitle?: string;
  button?: WpLink | null;
  dark?: boolean;
  align?: "left" | "center";
  /** Color del antetítulo: rojo (por defecto) o gris. */
  eyebrowColor?: "red" | "grey";
  as?: "h1" | "h2";
  size?: "xl" | "l" | "m" | "s";
  /** Parte gris y parte negra/blanca del título cada una en su línea (cabeceras centradas del Figma de División). */
  stacked?: boolean;
  /** La parte gris va detrás (debajo si stacked): «Movistick / Meat Injectors». */
  mutedLast?: boolean;
  /** Estilo del botón; por defecto "dark" sobre fondo oscuro y "solid" sobre claro. */
  buttonVariant?: ComponentProps<typeof Button>["variant"];
  className?: string;
};

const sizes = { xl: "text-title-xl", l: "text-title-l", m: "text-title-m", s: "text-title-s" };

/**
 * Antetítulo + título en dos tonos (gris + negro/blanco) + subtítulo + botón, como en todos los módulos del Figma.
 * Al entrar en pantalla, uno detrás de otro: antetítulo y subtítulo a máquina de escribir, título (Lay Grotesk)
 * palabra a palabra con destello naranja y el botón con fundido. Dentro de otro grupo de escritura se suma a su secuencia.
 */
export function SectionHeader({
  eyebrow,
  titleMuted,
  title,
  subtitle,
  button,
  dark,
  align = "left",
  eyebrowColor = "red",
  as: Tag = "h2",
  size = "l",
  stacked,
  mutedLast,
  buttonVariant,
  className = "",
}: Props) {
  if (!eyebrow && !titleMuted && !title && !subtitle && !button?.url) return null;
  const center = align === "center";

  return (
    <div className={`flex flex-col gap-5 ${center ? "items-center text-center" : "items-start"} ${className}`} data-typewriter-group data-typewriter-sequence>
      {eyebrow && (
        <p className={`text-eyebrow ${eyebrowColor === "red" ? "text-red" : "text-grey"}`}>
          <Typewriter text={eyebrow} />
        </p>
      )}
      {(titleMuted || title) && (
        <Tag className={`${sizes[size]} ${size === "s" ? "" : stacked ? "max-w-[966px]" : size === "m" ? "max-w-[34ch]" : "max-w-[22ch]"} tracking-[-0.01em] [font-feature-settings:'dlig'_1] ${center ? "mx-auto" : ""}`} data-paint>
          {titleMuted && !mutedLast && <SplitWords text={`${titleMuted} `} className={`text-grey ${stacked ? "block" : ""}`} />}
          {title && <SplitWords text={mutedLast && titleMuted ? `${title} ` : title} className={`${dark ? "text-light-grey" : "text-black"} ${mutedLast && stacked ? "block" : ""}`} />}
          {titleMuted && mutedLast && <SplitWords text={titleMuted} className="text-grey" />}
        </Tag>
      )}
      {subtitle && (
        <p className={`text-body-l max-w-[56ch] ${dark ? "text-grey" : "text-dark-grey"}`}>
          <Typewriter text={subtitle} />
        </p>
      )}
      {button?.url && (
        <div className="mt-2" data-reveal>
          <Button href={button.url} target={button.target} variant={buttonVariant ?? (dark ? "dark" : "solid")}>
            {button.title}
          </Button>
        </div>
      )}
    </div>
  );
}
