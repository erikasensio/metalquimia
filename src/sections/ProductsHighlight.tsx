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
 * Figma Modulos › 21. Products Highlight.
 * Rejilla de máquinas sobre negro con filtros opcionales por categoría.
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
    <div className="bg-black py-20 text-light-grey lg:py-[120px]">
      <div className="site-container flex flex-col gap-10 lg:gap-16">
        <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} subtitle={subtitle} button={button} dark />
        {list.length > 0 && <ProductsHighlightClient items={list} showFilters={!!show_filters} allLabel={all_label || "ALL"} />}
      </div>
    </div>
  );
}
