import Image from "next/image";
import type { WpImage } from "@/lib/types";

type Props = {
  image?: (WpImage & { mime?: string }) | null;
  /** Clases del contenedor: define tamaño y forma (p. ej. "aspect-[4/3] rounded-xl chamfer"). */
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Texto del hueco cuando aún no hay imagen subida (solo se ve si falta la imagen). */
  label?: string;
  parallax?: boolean;
};

/**
 * Imagen o vídeo que rellena su contenedor. Si en WordPress aún no hay archivo,
 * deja un hueco gris del mismo tamaño para que la maqueta no se descoloque.
 */
export function Media({ image, className = "", imgClassName = "object-cover", sizes = "100vw", priority, label, parallax }: Props) {
  const inner = !image?.url ? (
    <div className="absolute inset-0 flex items-end bg-gradient-to-br from-medium-grey to-grey/60 p-3">
      {label && <span className="font-mono text-[0.625rem] uppercase text-dark-grey/70">{label}</span>}
    </div>
  ) : image.mime?.startsWith("video/") ? (
    <video src={image.url} className={`absolute inset-0 size-full ${imgClassName}`} autoPlay muted loop playsInline />
  ) : (
    <Image src={image.url} alt={image.alt || ""} fill sizes={sizes} priority={priority} className={imgClassName} />
  );

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {parallax ? (
        <div className="absolute inset-x-0 -inset-y-[8%]" data-parallax="0.12">
          {inner}
        </div>
      ) : (
        inner
      )}
    </div>
  );
}
