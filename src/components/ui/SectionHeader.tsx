import type { WpLink } from "@/lib/types";
import { Button } from "./Button";
import { SplitWords } from "@/components/motion/SplitWords";

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
  size?: "xl" | "l" | "m";
  className?: string;
};

const sizes = { xl: "text-title-xl", l: "text-title-l", m: "text-title-m" };

/** Antetítulo + título en dos tonos (gris + negro/blanco) + subtítulo + botón, como en todos los módulos del Figma. */
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
  className = "",
}: Props) {
  if (!eyebrow && !titleMuted && !title && !subtitle && !button?.url) return null;
  const center = align === "center";

  return (
    <div className={`flex flex-col gap-5 ${center ? "items-center text-center" : "items-start"} ${className}`} data-reveal>
      {eyebrow && <p className={`text-eyebrow ${eyebrowColor === "red" ? "text-red" : "text-grey"}`}>{eyebrow}</p>}
      {(titleMuted || title) && (
        <Tag className={`${sizes[size]} max-w-[22ch] tracking-[-0.01em] [font-feature-settings:'dlig'_1] ${center ? "mx-auto" : ""}`} data-split>
          {titleMuted && <SplitWords text={`${titleMuted} `} className="text-grey" />}
          {title && <SplitWords text={title} className={dark ? "text-light-grey" : "text-black"} />}
        </Tag>
      )}
      {subtitle && <p className={`text-body-l max-w-[56ch] ${dark ? "text-grey" : "text-dark-grey"}`}>{subtitle}</p>}
      {button?.url && (
        <Button href={button.url} target={button.target} variant={dark ? "dark" : "solid"} className="mt-2">
          {button.title}
        </Button>
      )}
    </div>
  );
}
