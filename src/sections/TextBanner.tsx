import type { Section } from "@/lib/types";
import { SplitWords } from "@/components/motion/SplitWords";
import { Typewriter } from "@/components/motion/Typewriter";

type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
};

/**
 * Figma Modulos › 5. Text Banner.
 * Fondo negro con el disco de franjas detrás y una frase grande centrada en dos tonos.
 */
export default function TextBanner({ eyebrow, title_muted, title }: Props) {
  if (!eyebrow && !title_muted && !title) return null;

  return (
    <div className="relative overflow-hidden bg-black py-[160px] lg:py-[220px]">
      <div
        className="stripes-disc-dark absolute left-1/2 top-1/2 size-[min(140vw,1100px)] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />
      <div className="site-container relative flex flex-col items-center gap-6 text-center" data-typewriter-group data-typewriter-sequence>
        {eyebrow && (
          <p className="text-eyebrow text-red">
            <Typewriter text={eyebrow} />
          </p>
        )}
        {(title_muted || title) && (
          <h2 className="text-title-l mx-auto max-w-[24ch] tracking-[-0.01em] [font-feature-settings:'dlig'_1]" data-paint>
            {title_muted && <SplitWords text={`${title_muted} `} className="text-grey" />}
            {title && <SplitWords text={title} className="text-light-grey" />}
          </h2>
        )}
      </div>
    </div>
  );
}
