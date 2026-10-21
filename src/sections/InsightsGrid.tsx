import type { Section, WpImage, WpLink } from "@/lib/types";
import { InsightsGridClient, type InsightItem } from "./parts/InsightsGridClient";
import { StripesBall } from "@/components/ui/StripesBall";
import { Typewriter } from "@/components/motion/Typewriter";
import { SplitWords } from "@/components/motion/SplitWords";

type Props = Section & {
  title?: string;
  subtitle?: string;
  all_label?: string;
  load_more_label?: string;
  items?: { image?: WpImage | null; category?: string; date?: string; title?: string; link?: WpLink | null }[] | null | false | "";
};

/**
 * Figma Páginas › Casos de éxito / Recursos (459:27939).
 * Cabecera negra de 776 px con la bola de franjas y el título gigante en gris; los filtros por categoría
 * van pegados a su borde inferior. Debajo, la transición negro → blanco y la rejilla de tarjetas
 * en tres columnas que se amplía de 12 en 12.
 */
export default function InsightsGrid({ title, subtitle, all_label, load_more_label, items }: Props) {
  const list: InsightItem[] = (Array.isArray(items) ? items : [])
    .filter((item) => item?.title || item?.image?.url)
    .map((item) => ({
      image: item.image?.url ? item.image : null,
      category: (item.category || "").trim(),
      date: item.date || "",
      title: item.title || "",
      link: item.link?.url ? item.link : null,
    }));

  const header = (
    <>
      {/* En el Figma el centro de la bola queda 96 px por encima del centro de la cabecera. */}
      <StripesBall variant="insights" className="left-1/2 top-[calc(50%-96px)] flex scale-[0.6] lg:scale-100" />
      <div className="site-container relative flex flex-col items-center gap-6 text-center" data-typewriter-group data-typewriter-sequence>
        {title && (
          <h1 className="text-title-xxl text-grey [font-feature-settings:'dlig'_1]" data-paint>
            <SplitWords text={title} />
          </h1>
        )}
        {subtitle && (
          <p className="max-w-[56ch] text-body-l text-grey">
            <Typewriter text={subtitle} />
          </p>
        )}
      </div>
    </>
  );

  return <InsightsGridClient header={header} items={list} allLabel={all_label || "ALL"} loadMoreLabel={load_more_label || "LOAD MORE"} />;
}
