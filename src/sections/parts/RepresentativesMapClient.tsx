"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import type { MapLocation } from "./InteractiveMapClient";

const unique = (values: string[]) => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));

/**
 * Mapa de la página de Representantes (Figma 307:15479): panel a la izquierda con los desplegables de continente y país
 * y la ficha del representante; los puntos del mapa a la derecha. El SVG del mapa llega como children.
 */
export function RepresentativesMapClient({
  locations,
  ratio,
  continentLabel,
  countryLabel,
  allLabel,
  mapLinkLabel,
  children,
}: {
  locations: MapLocation[];
  /** Proporción del mapa (ancho / alto del viewBox). */
  ratio: string;
  continentLabel: string;
  countryLabel: string;
  allLabel: string;
  mapLinkLabel: string;
  children: ReactNode;
}) {
  const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
  const [selected, setSelected] = useState<number | null>(null);

  const continents = useMemo(() => unique(locations.map((loc) => loc.continent)), [locations]);
  const countries = useMemo(
    () => unique(locations.filter((loc) => !continent || loc.continent === continent).map((loc) => loc.country)),
    [locations, continent],
  );
  const matching = locations.filter((loc) => (!continent || loc.continent === continent) && (!country || loc.country === country));
  const current = locations.find((loc) => loc.id === selected);
  // Un punto pulsado manda; si no, todos los del país elegido o, sin país, el primero de la lista.
  const cards = current ? [current] : country ? matching : matching.slice(0, 1);

  const pickContinent = (value: string) => {
    setContinent(value);
    if (value && !locations.some((loc) => loc.continent === value && loc.country === country)) setCountry("");
    setSelected(null);
  };
  const pickCountry = (value: string) => {
    setCountry(value);
    setSelected(null);
  };
  const pickPoint = (loc: MapLocation) => {
    if (loc.id === selected) return setSelected(null);
    setContinent(loc.continent);
    setCountry(loc.country);
    setSelected(loc.id);
  };

  return (
    <div className="flex flex-col gap-6 lg:grid" data-cards>
      <div className="relative w-full lg:[grid-area:1/1] lg:ml-[15%] lg:mt-10 lg:w-[85%]" style={{ aspectRatio: ratio }}>
        {children}
        {locations.map((loc) => {
          if (loc.x === null || loc.y === null) return null;
          const active = loc.id === selected;
          const dim = !matching.includes(loc);
          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => pickPoint(loc)}
              aria-label={[loc.name, loc.country].filter(Boolean).join(" · ")}
              aria-pressed={active}
              className={`group absolute flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-opacity ${active ? "z-20" : "z-10"} ${dim ? "opacity-25" : ""}`}
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            >
              {/* Figma: círculo al 30 % y punto macizo de algo más de la mitad del diámetro. */}
              <span
                className={`absolute rounded-full bg-[#ff3f3f]/30 transition-transform ${active ? "size-[18px]" : "size-[13px] group-hover:scale-125"}`}
                aria-hidden
              />
              <span
                className={`relative rounded-full bg-[#ff3f3f] transition-transform ${active ? "size-2.5" : "size-[7px] group-hover:scale-125"}`}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      <div
        className="relative z-30 order-first flex flex-col gap-10 self-start rounded-xl lg:order-none bg-light-grey px-4 py-[22px] lg:[grid-area:1/1] lg:ml-5 lg:mt-[52px] lg:w-[37.3%] lg:max-w-[546px]"
        data-card
      >
        <Filter label={continentLabel} allLabel={allLabel} value={continent} options={continents} onChange={pickContinent} />
        <Filter label={countryLabel} allLabel={allLabel} value={country} options={countries} onChange={pickCountry} />
        {cards.length > 0 && (
          <ul className="flex flex-col gap-3 lg:max-h-[560px] lg:overflow-y-auto" aria-live="polite">
            {cards.map((loc) => (
              <li key={loc.id}>
                <RepresentativeCard loc={loc} mapLinkLabel={mapLinkLabel} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Filter({
  label,
  allLabel,
  value,
  options,
  onChange,
}: {
  label: string;
  allLabel: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-3">
      {label && <span className="font-mono text-[14px] uppercase leading-none tracking-[0.02em] text-grey">{label}</span>}
      <span className="relative block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full cursor-pointer appearance-none truncate rounded-lg bg-dark-grey/50 pl-4 pr-14 font-display text-[18px] font-semibold leading-[1.3] text-light-grey transition-colors hover:bg-dark-grey/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-grey"
        >
          <option value="" className="text-black">
            {allLabel}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-black">
              {option}
            </option>
          ))}
        </select>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/select-chevron.svg" alt="" width={40} height={40} className="pointer-events-none absolute right-1 top-1" />
      </span>
    </label>
  );
}

function RepresentativeCard({ loc, mapLinkLabel }: { loc: MapLocation; mapLinkLabel: string }) {
  const link = "underline decoration-from-font underline-offset-2 transition-colors hover:text-black";
  const contacts = [
    loc.phone && { href: `tel:${loc.phone.replace(/[^\d+]/g, "")}`, text: loc.phone },
    loc.fax && { href: `fax:${loc.fax.replace(/[^\d+]/g, "")}`, text: loc.fax },
    loc.email && { href: `mailto:${loc.email}`, text: loc.email },
    loc.website && { href: loc.website.startsWith("http") ? loc.website : `https://${loc.website}`, text: loc.website.replace(/^https?:\/\//, "").replace(/\/$/, ""), external: true },
  ].filter((item): item is { href: string; text: string; external?: boolean } => !!item);

  return (
    <div className="flex gap-4 rounded-xl border-b border-white/10 bg-[#efefef] p-6 font-display text-[18px] font-semibold leading-[1.4] tracking-[-0.01em] text-grey">
      {loc.image && (
        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
          <Image src={loc.image.url} alt={loc.image.alt || loc.name} fill sizes="64px" className="object-cover" />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-[1.4em] pb-2 [overflow-wrap:anywhere]">
        <div>
          <p className="text-black">{loc.name}</p>
          {loc.subtitle && <p>{loc.subtitle}</p>}
          {loc.address && <p className="whitespace-pre-line">{loc.address}</p>}
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`}
          target="_blank"
          rel="noreferrer"
          className="self-start text-black underline decoration-from-font underline-offset-2 transition-colors hover:text-red"
        >
          {mapLinkLabel}
        </a>
        {contacts.length > 0 && (
          <ul>
            {contacts.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={link} {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}>
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
