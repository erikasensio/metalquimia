import type { Section } from "@/lib/types";
import { SplitWords } from "@/components/motion/SplitWords";

type Props = Section & {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

/** Título sencillo de página (p. ej. Careers): antetítulo, título enorme y subtítulo. */
export default function PageTitle({ eyebrow, title, subtitle }: Props) {
  if (!eyebrow && !title && !subtitle) return null;

  return (
    <div className="bg-white pb-10 pt-10 lg:pt-16">
      <div className="site-container flex flex-col items-start gap-6">
        {eyebrow && (
          <p className="text-eyebrow text-red" data-reveal>
            {eyebrow}
          </p>
        )}
        {title && (
          <h1 className="text-title-xxl break-words tracking-[-0.02em] text-black [font-feature-settings:'dlig'_1]" data-split>
            <SplitWords text={title} />
          </h1>
        )}
        {subtitle && (
          <p className="text-body-l max-w-[60ch] text-dark-grey" data-reveal>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
