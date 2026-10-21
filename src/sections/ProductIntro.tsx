import Image from "next/image";
import type { Section, WpImage } from "@/lib/types";
import { Media } from "@/components/ui/Media";
import { SplitWords } from "@/components/motion/SplitWords";

type Props = Section & {
  image?: (WpImage & { mime?: string }) | null;
  text?: string;
};

/**
 * Figma Páginas › Página de máquina (193:4073) › feature-highlight.
 * Foto grande con esquinas redondeadas a la izquierda y, a la derecha, el icono de destello y la presentación
 * de la máquina en Lay Grotesk. Fondo negro. Al entrar en pantalla el texto se descubre línea a línea.
 * Escritorio: columnas de 861 y 369 px sobre 1464 (huecos de 125 y 109).
 */
export default function ProductIntro({ image, text }: Props) {
  // Una línea en blanco separa párrafos.
  const paragraphs = (text || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="bg-black pb-20 pt-20 lg:pt-[120px]">
      <div className="site-container grid gap-10 lg:grid-cols-[minmax(0,861fr)_minmax(0,125fr)_minmax(0,369fr)_minmax(0,109fr)] lg:gap-0">
        <Media image={image} className="aspect-[861/682] rounded-[12px]" sizes="(min-width: 1024px) 57vw, 100vw" parallax />
        {paragraphs.length > 0 && (
          <div className="flex flex-col gap-6 lg:col-start-3 lg:pt-5" data-typewriter-group data-typewriter-sequence>
            <Image src="/brand/burst.svg" alt="" width={50} height={50} className="size-[50px]" data-reveal />
            <div className="text-title-xs space-y-[1.3em] text-light-grey">
              {paragraphs.map((p, i) => (
                <p key={i} data-paint>
                  <SplitWords text={p} />
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
