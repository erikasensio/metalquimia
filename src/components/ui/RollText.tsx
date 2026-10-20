import type { ReactNode } from "react";

/**
 * Texto de CTA con efecto rodillo de tragaperras: al entrar y al salir el ratón del
 * `.cta` que lo contiene, el texto sube y sale por arriba mientras su copia (::after)
 * entra desde abajo. La animación la lanza <Animations>; el estilo está en globals.css.
 * Si el contenido no es texto se pinta tal cual.
 */
export function RollText({ children }: { children: ReactNode }) {
  if (typeof children !== "string" && typeof children !== "number") return <span>{children}</span>;
  return (
    <span className="cta-roll">
      <span data-roll={children}>{children}</span>
    </span>
  );
}
