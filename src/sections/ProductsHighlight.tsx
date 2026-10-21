import type { Section, WpImage, WpLink } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductsHighlightClient, type MachineItem } from "./parts/ProductsHighlightClient";

type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  subtitle?: string;
  button?: WpLink | null;
  show_filters?: boolean;
  all_label?: string;
  items?: { image?: WpImage | null; name?: string; category?: string; description?: string; link?: WpLink | null }[] | null | false | "";
};

/**
 * Figma Modulos › 21. Products Highlight (rediseño 325:2237).
 * Cabecera centrada y máquinas sobre negro: filtros por categoría con carrusel, o rejilla de cuatro columnas sin filtros.
 */
export default function ProductsHighlight({ eyebrow, title_muted, title, subtitle, button, show_filters, all_label, items }: Props) {
  const list: MachineItem[] = (Array.isArray(items) ? items : [])
    .filter((item) => item?.name || item?.image?.url)
    .map((item) => ({
      image: item.image?.url ? item.image : null,
      name: item.name || "",
      category: (item.category || "").trim(),
      description: item.description || "",
      link: item.link?.url ? item.link : null,
    }));

  return (
    <div className="flex flex-col gap-12 bg-black py-20 text-light-grey lg:gap-16 lg:py-[120px]">
      <SectionHeader
        eyebrow={eyebrow}
        titleMuted={title_muted}
        title={title}
        subtitle={subtitle}
        button={button}
        dark
        align="center"
        stacked
        className="site-container"
      />
      {list.length > 0 && (
        // Grupo de escritura: al acabar queda data-typed y las tarjetas que aparezcan al filtrar ya se ven.
        <div data-typewriter-group>
          <ProductsHighlightClient items={list} showFilters={!!show_filters} allLabel={all_label || "ALL"} label={title || "Máquinas"} />
        </div>
      )}
    </div>
  );
}
