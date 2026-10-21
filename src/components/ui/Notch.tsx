type Props = {
  /** Esquina de la sección donde va la pestaña. */
  corner: "top-right" | "bottom-left";
  /** Color de la sección vecina (p. ej. "bg-white"). */
  colorClass?: string;
  /** Ancho, alto (+2 px que sobresalen) y tamaño del chaflán (--notch-cut; a 45° es igual al alto visible). */
  sizeClass?: string;
  /** Marca la pestaña del pie, que cambia de color según la última sección (globals.css). */
  "data-footer-notch"?: boolean;
};

/**
 * Pestaña con chaflán que "muerde" el borde de una sección a sangre (banner, pie…) con el color de la vecina.
 * Sobresale 2 px fuera de la sección (1 px más que la foto) y se pinta encima de la vecina: cuando el borde cae en medio píxel
 * (alturas con decimales, zoom, pantallas retina) tapa la fila mezclada y no aparece la línea gris.
 * La sección que la usa no debe recortar en vertical (overflow-x-clip en vez de overflow-hidden).
 */
export function Notch({ corner, colorClass = "bg-white", sizeClass = "h-[calc(1.5rem+2px)] w-[38%] [--notch-cut:1.5rem] lg:h-[calc(3rem+2px)] lg:[--notch-cut:3rem]", ...rest }: Props) {
  const top = corner === "top-right";
  return (
    <div
      className={`pointer-events-none absolute z-10 ${top ? "-top-[2px] right-0" : "-bottom-[2px] left-0"} ${colorClass} ${sizeClass}`}
      style={{
        clipPath: top
          ? "polygon(0 0, 100% 0, 100% 100%, var(--notch-cut) 100%)"
          : "polygon(0 0, calc(100% - var(--notch-cut)) 0, 100% 100%, 0 100%)",
      }}
      aria-hidden
      data-footer-notch={rest["data-footer-notch"] || undefined}
    />
  );
}
