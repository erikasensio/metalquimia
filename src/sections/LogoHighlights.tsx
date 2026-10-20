import Image from "next/image";
import type { Section, WpImage } from "@/lib/types";

type Logo = { image?: WpImage | null; name?: string; url?: string };
type Props = Section & { title?: string; logos?: Logo[] };

function LogoItem({ logo }: { logo: Logo }) {
  const img = logo.image?.url ? (
    <Image src={logo.image.url} alt={logo.image.alt || logo.name || ""} width={140} height={67} className="h-[67px] w-auto max-w-[140px] object-contain object-bottom" />
  ) : (
    <span className="text-body-s text-grey">{logo.name}</span>
  );

  return (
    <li className="flex w-[175px] shrink-0 items-end gap-2">
      <span className="h-[106px] w-px shrink-0 bg-medium-grey" aria-hidden />
      {logo.url ? (
        <a href={logo.url} target="_blank" rel="noreferrer">
          {img}
        </a>
      ) : (
        img
      )}
    </li>
  );
}

/** Logos de clientes en fila continua (Figma "logo-highlights" 325:1706). */
export default function LogoHighlights({ title, logos = [] }: Props) {
  const items = logos.filter((l) => l.image?.url || l.name);

  return (
    <div className="flex flex-col gap-10 overflow-hidden bg-white py-20">
      {title && <h2 className="site-container text-title-s text-black">{title}</h2>}
      {items.length > 0 && (
        <div className="group relative flex pl-5 lg:pl-6">
          {/* La lista se duplica para que el desplazamiento sea continuo. */}
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
            >
              {items.map((logo, i) => (
                <LogoItem key={i} logo={logo} />
              ))}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}
