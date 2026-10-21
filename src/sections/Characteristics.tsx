import type { Section, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { StripesBall } from "@/components/ui/StripesBall";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { Typewriter } from "@/components/motion/Typewriter";
import { SplitWords } from "@/components/motion/SplitWords";

type Props = Section & {
  eyebrow?: string;
  title?: string;
  items?: { text?: string }[] | null | false | "";
  button?: WpLink | null;
  file?: { url?: string; filename?: string } | null | false | "";
  button_label?: string;
};

/**
 * Figma Páginas › Página de máquina (193:4073) › media-text "Main characteristics".
 * Antetítulo rojo, título, lista con viñetas en gris y botón, en una columna de 601 px a la izquierda;
 * detrás, la bola de franjas (dos mitades de SVG giradas) centrada en la sección. Fondo negro.
 */
export default function Characteristics({ eyebrow, title, items, button, file, button_label }: Props) {
  const list = (Array.isArray(items) ? items : []).map((item) => item?.text || "").filter(Boolean);
  const fileUrl = file && typeof file === "object" ? file.url : "";

  return (
    <div className="relative overflow-hidden bg-[#020202] pb-20 pt-20 text-light-grey lg:pt-[120px]">
      {/* Centrada 70 px por encima del centro de la sección. Solo escritorio: en móvil tapaba la lista. */}
      <StripesBall className="left-[calc(50%+0.12px)] top-[calc(50%-69.75px)] hidden lg:flex" />
      <div className="site-container relative">
        {/* La lista es larga: se escribe más rápido que el resto para no hacer esperar al botón. */}
        <div className="flex max-w-[601px] flex-col items-start gap-10" data-typewriter-group data-typewriter-sequence data-typewriter-speed={3}>
          {eyebrow && (
            <p className="text-eyebrow text-red">
              <Typewriter text={eyebrow} />
            </p>
          )}
          {(title || list.length > 0) && (
            <div className="flex w-full flex-col gap-8">
              {title && (
                <h2 className="text-title-l text-medium-grey [font-feature-settings:'dlig'_1]" data-paint>
                  <SplitWords text={title} />
                </h2>
              )}
              {list.length > 0 && (
                <ul className="max-w-[497px] list-disc text-body-m text-grey">
                  {list.map((text, i) => (
                    <li key={i} className="ms-6">
                      <Typewriter text={text} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {(button?.url || fileUrl) && (
            <div className="flex flex-wrap gap-3" data-reveal>
              {button?.url && (
                <Button href={button.url} target={button.target} variant="solid">
                  {button.title}
                </Button>
              )}
              {fileUrl && (
                <a
                  href={fileUrl}
                  download
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center gap-2 bg-dark-grey px-5 py-[11px] font-mono text-[0.875rem] font-bold uppercase leading-none text-light-grey transition-colors hover:bg-grey"
                >
                  <span>{button_label || "Download datasheet"}</span>
                  <DownloadSimple size={16} aria-hidden />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
