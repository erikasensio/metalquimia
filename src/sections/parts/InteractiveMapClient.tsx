"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Envelope, MagnifyingGlass, Phone, X } from "@phosphor-icons/react";
import type { WpImage } from "@/lib/types";

export type MapLocation = {
  id: number;
  name: string;
  subtitle: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  image: WpImage | null;
  /** Posición en % sobre el mapa (null si queda fuera de la zona visible). */
  x: number | null;
  y: number | null;
};

const normalize = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Puntos, ficha emergente y listado con buscador de <InteractiveMap>. El SVG del mapa llega como children. */
export function InteractiveMapClient({
  locations,
  showList,
  searchPlaceholder,
  children,
}: {
  locations: MapLocation[];
  showList: boolean;
  searchPlaceholder: string;
  children: ReactNode;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);
  const current = locations.find((loc) => loc.id === selected) ?? null;

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return locations;
    return locations.filter((loc) => normalize(`${loc.name} ${loc.subtitle} ${loc.address}`).includes(q));
  }, [locations, query]);

  useEffect(() => {
    if (selected === null) return;
    popupRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  // Posición de la ficha junto al punto (desde md); en móvil va debajo del mapa.
  const popupPlace = (loc: MapLocation) => {
    if (loc.x === null || loc.y === null) return "md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2";
    const x = loc.x > 55 ? "md:-translate-x-[calc(100%+20px)]" : "md:translate-x-5";
    const y = loc.y < 30 ? "md:-translate-y-6" : loc.y > 65 ? "md:-translate-y-[calc(100%-24px)]" : "md:-translate-y-1/2";
    return `md:left-[var(--x)] md:top-[var(--y)] ${x} ${y}`;
  };

  return (
    <div className="relative flex flex-col gap-6 lg:block">
      <div className="relative">
        <div className="relative aspect-[2/1] w-full">
        {children}
        {locations.map((loc) =>
          loc.x === null || loc.y === null ? null : (
            <button
              key={loc.id}
              type="button"
              onClick={() => setSelected(loc.id === selected ? null : loc.id)}
              aria-label={loc.name}
              aria-pressed={loc.id === selected}
              className="group absolute z-10 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            >
              <span className="absolute size-2.5 rounded-full bg-red/40 motion-safe:animate-ping" aria-hidden />
              <span
                className={`relative rounded-full bg-red transition-transform ${loc.id === selected ? "size-3.5 ring-4 ring-red/25" : "size-2.5 group-hover:scale-125"}`}
                aria-hidden
              />
            </button>
          ),
        )}
        </div>

        {current && (
          <div
            ref={popupRef}
            role="dialog"
            aria-label={current.name}
            className={`relative z-20 mt-4 w-full animate-[fade-in_0.25s_ease-out] bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] md:absolute md:mt-0 md:w-[320px] ${popupPlace(current)}`}
            style={{ "--x": `${current.x ?? 50}%`, "--y": `${current.y ?? 50}%` } as React.CSSProperties}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Cerrar"
              className="absolute right-2 top-2 flex size-8 items-center justify-center text-black transition-colors hover:bg-light-grey"
            >
              <X size={16} />
            </button>
            {current.image && (
              <div className="relative -mx-5 -mt-5 mb-4 aspect-[16/9]">
                <Image src={current.image.url} alt={current.image.alt || current.name} fill sizes="320px" className="object-cover" />
              </div>
            )}
            <LocationInfo loc={current} big />
            {current.hours && <p className="mt-3 whitespace-pre-line border-t border-medium-grey pt-3 text-body-xs text-dark-grey">{current.hours}</p>}
          </div>
        )}
      </div>

      {showList && (
        <div className="flex flex-col gap-3 bg-white/95 lg:absolute lg:left-6 lg:top-6 lg:z-10 lg:max-h-[calc(100%-48px)] lg:w-[360px] lg:p-4 lg:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
          <label className="relative block">
            <span className="sr-only">{searchPlaceholder}</span>
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-grey" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-10 w-full border border-medium-grey bg-white pl-9 pr-3 text-body-s text-black placeholder:text-grey focus:border-dark-grey focus:outline-none"
            />
          </label>
          <ul className="flex max-h-[420px] flex-col gap-2 overflow-y-auto lg:max-h-none lg:min-h-0 lg:flex-1">
            {filtered.map((loc) => (
              <li key={loc.id}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelected(loc.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(loc.id);
                    }
                  }}
                  aria-pressed={loc.id === selected}
                  className={`cursor-pointer border-l-2 bg-light-grey p-4 transition-colors hover:bg-medium-grey ${loc.id === selected ? "border-red" : "border-transparent"}`}
                >
                  <LocationInfo loc={loc} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function LocationInfo({ loc, big }: { loc: MapLocation; big?: boolean }) {
  const icon = "flex size-9 items-center justify-center bg-medium-grey text-black transition-colors hover:bg-red hover:text-white";
  return (
    <div className="flex flex-col gap-1 pr-8">
      <p className={big ? "text-title-xs text-black" : "text-body-m font-medium text-black"}>{loc.name}</p>
      {loc.subtitle && <p className="text-body-s text-grey">{loc.subtitle}</p>}
      {loc.address && <p className="mt-1 whitespace-pre-line text-body-xs text-dark-grey">{loc.address}</p>}
      {(loc.phone || loc.email) && (
        <div className="mt-3 flex gap-2">
          {loc.phone && (
            <a href={`tel:${loc.phone.replace(/[^\d+]/g, "")}`} aria-label={loc.phone} title={loc.phone} className={icon} onClick={(e) => e.stopPropagation()}>
              <Phone size={18} />
            </a>
          )}
          {loc.email && (
            <a href={`mailto:${loc.email}`} aria-label={loc.email} title={loc.email} className={icon} onClick={(e) => e.stopPropagation()}>
              <Envelope size={18} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
