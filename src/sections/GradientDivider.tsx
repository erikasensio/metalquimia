import type { Section } from "@/lib/types";
import { GradientDividerClient } from "./parts/GradientDividerClient";

type Props = Section & { direction?: "down" | "up" };

/** Transición blanco → negro ("down") o negro → blanco ("up") entre secciones, animada con el scroll. */
export default function GradientDivider({ direction = "down" }: Props) {
  return <GradientDividerClient direction={direction === "up" ? "up" : "down"} />;
}
