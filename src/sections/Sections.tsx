import type { Section } from "@/lib/types";
import { overlayHeaderSections, sections } from "./registry";

/** Pinta las secciones en el orden en que se han colocado en WordPress. */
export function Sections({ items }: { items: Section[] }) {
  const needsSpacer = !overlayHeaderSections.has(items[0]?.type);

  return (
    <>
      {/* Si la página no empieza con un hero, se reserva el alto de la cabecera fija. */}
      {needsSpacer && <div className="h-[71px] bg-white xl:h-[95px]" aria-hidden />}
      {items.map((section, index) => {
        const Component = sections[section.type];
        if (!Component) {
          if (process.env.NODE_ENV !== "production") {
            return (
              <div key={index} className="site-container py-8">
                <p className="rounded-xl border border-dashed border-red p-6 text-body-s text-red">
                  Sección «{section.type}» sin componente en src/sections/registry.ts
                </p>
              </div>
            );
          }
          return null;
        }
        return (
          <section
            key={index}
            id={section.anchor || undefined}
            data-section={section.type}
            data-header-overlay={index === 0 && !needsSpacer ? "" : undefined}
          >
            <Component {...section} />
          </section>
        );
      })}
    </>
  );
}
