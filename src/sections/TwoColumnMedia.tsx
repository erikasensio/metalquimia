import type { Section, WpImage } from "@/lib/types";
import { Media } from "@/components/ui/Media";

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
    <div className={`py-20 lg:py-[120px] ${dark ? "bg-black" : "bg-white"}`}>
      <div className={`site-container grid gap-4 ${list.length > 1 ? "lg:grid-cols-2" : ""}`} data-stagger>
        {list.map((item, i) => (
          <figure key={i} className="flex flex-col gap-3">
            <Media
              image={item.image}
              className="aspect-[4/3] rounded-xl lg:aspect-[16/11]"
              sizes={list.length > 1 ? "(min-width: 1024px) 50vw, 100vw" : "100vw"}
            />
            {item.caption && <figcaption className="text-body-s text-grey">{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}
