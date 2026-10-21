import type { Section, WpImage, WpLink } from "@/lib/types";
import { InsightsGridClient, type InsightItem } from "./parts/InsightsGridClient";
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
 * Página Resources › Latest Insights.
 * Cabecera negra con disco de franjas y título grande; debajo, filtros por categoría y rejilla
 * de tarjetas (mismo estilo que Insights Carousel) que se amplía de 9 en 9.
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

  return (
    <>
      <div className="relative overflow-hidden bg-black pb-20 pt-[160px] lg:pb-[120px] lg:pt-[220px]">
        <div className="stripes-disc-dark absolute left-1/2 top-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2 lg:size-[1100px]" aria-hidden />
        <div className="site-container relative flex flex-col items-center gap-6 text-center" data-typewriter-group data-typewriter-sequence>
          {title && (
            <h1 className="text-title-xl text-light-grey [font-feature-settings:'dlig'_1]" data-paint>
              <SplitWords text={title} />
            </h1>
          )}
          {subtitle && (
            <p className="max-w-[56ch] text-body-l text-grey">
              <Typewriter text={subtitle} />
            </p>
          )}
        </div>
      </div>

      {list.length > 0 && (
        <div className="bg-white py-20 lg:py-[120px]">
          {/* Grupo de escritura: al acabar queda data-typed y lo que aparezca al filtrar o cargar más ya se ve. */}
          <div className="site-container" data-typewriter-group>
            <InsightsGridClient items={list} allLabel={all_label || "ALL"} loadMoreLabel={load_more_label || "LOAD MORE"} />
          </div>
        </div>
      )}
    </>
  );
}
