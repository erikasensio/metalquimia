import Link from "next/link";
import type { ReactNode } from "react";
import { RollText } from "./RollText";

type Variant = "outline" | "solid" | "pill" | "red" | "light" | "dark" | "black";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  /** Borde blanco 20 % sobre fondo oscuro (header, hero). */
  outline:
    "h-[42px] min-w-[135px] justify-center border border-white/20 px-5 font-mono uppercase leading-none text-light-grey hover:border-white/60",
  /** Fondo gris medio, mono bold (bloque de productos). */
  solid:
    "justify-center bg-medium-grey px-5 py-[11px] font-mono text-[0.875rem] font-bold uppercase leading-none text-dark-grey backdrop-blur-[20px] hover:bg-grey hover:text-white",
  /** Píldora del design system ("Download library"). */
  pill: "gap-2 rounded-full bg-black-grey px-4 py-3 text-button text-white hover:bg-dark-grey",
  /** Rojo de llamada a la acción ("TALK TO AN EXPERT", "REQUEST INFORMATION", "SEND"). */
  red: "justify-center bg-red px-5 py-[11px] font-mono text-[0.875rem] font-bold uppercase leading-none text-white hover:bg-black",
  /** Claro sobre fotos o fondos oscuros ("LEARN MORE" del banner). */
  light:
    "justify-center bg-white/90 px-5 py-[11px] font-mono text-[0.875rem] font-bold uppercase leading-none text-black backdrop-blur-[20px] hover:bg-white",
  /** Gris oscuro sobre fondo negro ("GO TO FORM", botones de tarjetas negras). */
  dark: "justify-center bg-dark-grey px-5 py-[11px] font-mono text-[0.875rem] font-bold uppercase leading-none text-light-grey hover:bg-grey",
  /** Casi negro sobre cristal gris ("DISCOVER OUR MODEL" de la ventana de Highlight). */
  black:
    "justify-center bg-black-grey px-5 py-[11px] font-mono text-[0.875rem] font-bold uppercase leading-none text-light-grey backdrop-blur-[20px] hover:bg-black",
};

const sizes: Record<Size, string> = { sm: "text-[0.75rem]", md: "text-[0.875rem]" };

type Props = {
  href?: string;
  target?: string;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Button({ href, target, variant = "outline", size = "md", icon, children, className = "", type = "button" }: Props & { type?: "button" | "submit" }) {
  const classes = `cta inline-flex items-center gap-1.5 ${variants[variant]} ${variant === "outline" ? sizes[size] : ""} ${className}`;
  const content = (
    <>
      <RollText>{children}</RollText>
      {icon}
    </>
  );

  if (!href) {
    return (
      <button type={type} className={classes}>
        {content}
      </button>
    );
  }
  return (
    <Link href={href} target={target || undefined} className={classes}>
      {content}
    </Link>
  );
}
