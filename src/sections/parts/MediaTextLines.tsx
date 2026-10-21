import Image from "next/image";

/**
 * Fondo decorativo del Combo Text+Media (Figma Modulos › 15): líneas blancas sobre medio círculo gris
 * (public/brand/media-text-lines.svg) dentro de un marco girado 46,84° que las recorta en diagonal,
 * centrado en la sección y un poco por encima de su mitad.
 * Medidas tal cual del Figma; solo en escritorio.
 */
export function MediaTextLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-[calc(50%+0.12px)] top-[calc(50%-98.75px)] hidden h-[1250.496px] w-[1250.216px] -translate-x-1/2 -translate-y-1/2 items-center justify-center lg:flex"
    >
      <div className="rotate-[46.84deg]">
        <div className="relative h-[881.498px] w-[887.682px] overflow-clip">
          <div className="absolute left-[206.81px] top-[41.04px] flex h-[763.353px] w-[768.221px] items-center justify-center">
            {/* Hueco del grupo derecho del Figma; el SVG trae los dos grupos juntos y el derecho empieza en x = 227,6. */}
            <div className="relative h-[595.423px] w-[488.121px] rotate-[-46.84deg]">
              <Image src="/brand/media-text-lines.svg" alt="" width={716} height={609} unoptimized className="absolute left-[-227.602px] top-[-4.585px] max-w-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
