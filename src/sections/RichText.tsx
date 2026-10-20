import type { Section } from "@/lib/types";

type Props = Section & { title?: string; content?: string };

/** Sección de ejemplo "Texto": título + texto enriquecido. Sirve para probar el flujo WordPress → front. */
export default function RichText({ title, content }: Props) {
  return (
    <div className="site-container py-16 lg:py-24">
      {title && <h2 className="text-title-l mb-6">{title}</h2>}
      {content && (
        <div className="text-body-l max-w-3xl space-y-4" dangerouslySetInnerHTML={{ __html: content }} />
      )}
    </div>
  );
}
