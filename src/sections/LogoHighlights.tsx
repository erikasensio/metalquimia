import Image from "next/image";
import type { Section, WpImage } from "@/lib/types";
import { SplitWords } from "@/components/motion/SplitWords";

type Logo = { image?: WpImage | null; name?: string; url?: string };
type Props = Section & { title?: string; logos?: Logo[] };

function LogoItem({ logo, hidden }: { logo: Logo; hidden: boolean }) {
  // Logo en blanco y negro, centrado en la celda entre separadores.
  const content = logo.image?.url ? (
    <Image
      src={logo.image.url}
      alt={logo.image.alt || logo.name || ""}
      width={140}
      height={67}
      className="h-auto max-h-[67px] w-auto max-w-[140px] object-contain grayscale"
    />
  ) : (
    <span className="text-body-s text-grey">{logo.name}</span>
  );

  const cell = "flex h-full w-full items-center justify-center px-4";

  return (
    <li className="h-[106px] w-[175px] shrink-0 border-l border-medium-grey">
      {logo.url ? (
        <a
          href={logo.url}
          target="_blank"
          rel="noreferrer"
          tabIndex={hidden ? -1 : undefined}
          aria-label={logo.name || logo.image?.alt || undefined}
          className={`${cell} transition-opacity hover:opacity-70`}
        >
          {content}
        </a>
      ) : (
        <div className={cell}>{content}</div>
      )}
    </li>
  );
}

/** Logos de clientes en carrusel infinito (Figma "logo-highlights" 325:1706). */
export default function LogoHighlights({ title, logos = [] }: Props) {
  const logosWithContent = logos.filter((l) => l.image?.url || l.name);
  // Con pocos logos una copia no llenaría pantallas anchas: se repiten hasta ~2400px por copia.
  const repeat = logosWithContent.length ? Math.ceil(14 / logosWithContent.length) : 0;
  const items = Array.from({ length: repeat }, () => logosWithContent).flat();

  return (
    <div className="flex flex-col gap-10 overflow-hidden bg-white py-20">
      {title && (
        <h2 className="site-container text-title-s text-black sm:whitespace-nowrap" data-paint>
          <SplitWords text={title} />
        </h2>
      )}
      {items.length > 0 && (
        <div className="group relative flex pl-5 lg:pl-6">
          {/* La lista se duplica para que el desplazamiento sea continuo; se pausa con hover o foco. */}
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none"
            >
              {items.map((logo, i) => (
                <LogoItem key={i} logo={logo} hidden={copy === 1} />
              ))}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}
