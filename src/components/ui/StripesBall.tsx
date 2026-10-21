/**
 * Bola de franjas del Figma (1250 × 1250 px): una caja girada 46,84° recorta las dos mitades, que se vuelven
 * a girar para quedar rectas (una de ellas del revés). Va a tamaño real (la sección recorta lo que sobra).
 * Dos versiones del Figma, las dos sobre negro: la de Characteristics (media luna gris) y la de la cabecera
 * de Resources (media luna blanca al 10 % con franjas perfiladas). La posición (centro de la bola) la da className.
 */
export function StripesBall({ variant = "characteristics", className = "" }: { variant?: "characteristics" | "insights"; className?: string }) {
  const src = `/brand/${variant}-stripes`;
  return (
    <div className={`pointer-events-none absolute size-[1250px] -translate-x-1/2 -translate-y-1/2 items-center justify-center ${className}`} aria-hidden>
      <div className="relative h-[881.5px] w-[887.7px] shrink-0 rotate-[46.84deg] overflow-clip">
        <div className="absolute left-[206.81px] top-[41.04px] flex h-[763.35px] w-[768.22px] items-center justify-center">
          <div className="relative h-[595.42px] w-[488.12px] shrink-0 -rotate-[46.84deg]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${src}-a.svg`} alt="" width={488.121} height={608.371} className="absolute inset-x-0 -top-[0.77%] block h-[102.18%] w-full max-w-none" />
          </div>
        </div>
        <div className="absolute left-[53.99px] top-[238.55px] flex h-[734.34px] w-[740.99px] items-center justify-center">
          <div className="relative h-[595.11px] w-[448.64px] shrink-0 rotate-[133.16deg]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${src}-b.svg`} alt="" width={448.644} height={608.371} className="absolute inset-x-0 -top-[0.82%] block h-[102.23%] w-full max-w-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
