import type { Section, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";

type Props = Section & {
  eyebrow?: string;
  title?: string;
  items?: { text?: string }[] | null | false | "";
  button?: WpLink | null;
  file?: { url?: string; filename?: string } | null | false | "";
  button_label?: string;
};

/**
 * Ficha de máquina › "Main characteristics".
 * Lista de características con viñeta roja en dos columnas y botones de contacto / descarga.
 */
export default function Characteristics({ eyebrow, title, items, button, file, button_label }: Props) {
  const list = (Array.isArray(items) ? items : []).map((item) => item?.text || "").filter(Boolean);
  const fileUrl = file && typeof file === "object" ? file.url : "";

  return (
    <div className="bg-black py-20 text-light-grey lg:py-[120px]">
      <div className="site-container flex flex-col gap-10 lg:gap-14">
        {(eyebrow || title) && (
          <div className="flex flex-col gap-5" data-reveal>
            {eyebrow && <p className="text-eyebrow text-red">{eyebrow}</p>}
            {title && <h2 className="text-title-l text-light-grey [font-feature-settings:'dlig'_1]">{title}</h2>}
          </div>
        )}

        {list.length > 0 && (
          <ul className="gap-16 lg:columns-2" data-reveal>
            {list.map((text, i) => (
              <li key={i} className="flex break-inside-avoid items-start gap-4 border-b border-white/10 py-3 text-body-m text-light-grey">
                <span className="mt-[0.55em] size-1.5 shrink-0 bg-red" aria-hidden />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        )}

        {(button?.url || fileUrl) && (
          <div className="flex flex-wrap gap-3">
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
  );
}
