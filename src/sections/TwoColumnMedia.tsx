import type { Section, WpImage } from "@/lib/types";
import { Media } from "@/components/ui/Media";
import { Typewriter } from "@/components/motion/Typewriter";

type Props = Section & {
  theme?: "light" | "dark" | "";
  items?: { image?: (WpImage & { mime?: string }) | null; caption?: string }[] | null | false | "";
};

/**
 * Figma Modulos › 18. Two Column Media.
 * Dos imágenes redondeadas una al lado de la otra (apiladas en móvil), con pie de foto opcional.
 */
export default function TwoColumnMedia({ theme, items }: Props) {
  const dark = theme !== "light";
  const list = (Array.isArray(items) ? items : []).slice(0, 2);
  if (!list.length) return null;

  return (
    // Figma two-column-img (Instalaciones 326:24614): 40 px arriba y abajo, fotos de 732 × 780.
    <div className={`py-10 ${dark ? "bg-black" : "bg-white"}`}>
      <div className={`site-container grid gap-4 ${list.length > 1 ? "lg:grid-cols-2" : ""}`} data-stagger>
        {list.map((item, i) => (
          <figure key={i} className="flex flex-col gap-3">
            <Media
              image={item.image}
              className={`aspect-[4/3] rounded-xl ${list.length > 1 ? "lg:aspect-[732/780]" : "lg:aspect-[1464/780]"}`}
              sizes={list.length > 1 ? "(min-width: 1024px) 50vw, 100vw" : "100vw"}
            />
            {item.caption && (
              <figcaption className="text-body-s text-grey">
                <Typewriter text={item.caption} />
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
