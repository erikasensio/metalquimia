import { geoNaturalEarth1, geoPath, type GeoProjection } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection } from "geojson";
import world from "world-atlas/countries-110m.json";
import type { Section, WpImage } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { InteractiveMapClient, type MapLocation } from "./parts/InteractiveMapClient";

type Location = {
  name?: string;
  subtitle?: string;
  lat?: number | string;
  lng?: number | string;
  address?: string;
  phone?: string;
  email?: string;
  image?: WpImage | null;
  hours?: string;
};

type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  subtitle?: string;
  focus?: "world" | "europe" | "";
  show_list?: boolean;
  search_placeholder?: string;
  locations?: Location[] | null | false | "";
};

const W = 1440;
const H = 720;

type Focus = "world" | "europe";
const cache = new Map<Focus, { projection: GeoProjection; d: string }>();

/** Proyección + silueta de los países, calculadas una vez por zona (en el servidor). */
function getMap(focus: Focus) {
  const hit = cache.get(focus);
  if (hit) return hit;

  const countries = feature(world as unknown as Topology, (world as unknown as Topology).objects.countries as GeometryCollection) as FeatureCollection;
  // Sin la Antártida: ocupa mucho y no aporta.
  const land: FeatureCollection = { ...countries, features: countries.features.filter((f) => f.id !== "010") };

  const projection =
    focus === "europe"
      ? geoNaturalEarth1()
          .rotate([-10, 0])
          .fitSize([W, H], { type: "MultiPoint", coordinates: [[-14, 27], [36, 27], [36, 68], [-14, 68]] })
      : geoNaturalEarth1().fitExtent([[10, 10], [W - 10, H - 10]], land);
  projection.clipExtent([[0, 0], [W, H]]);

  const d = geoPath(projection).digits(1)(land) || "";
  const result = { projection, d };
  cache.set(focus, result);
  return result;
}

/**
 * Los puntos muy juntos (p. ej. varias sedes en Girona) se reparten en un pequeño círculo alrededor de su centro,
 * para que todos se puedan pulsar también en el móvil.
 */
function spreadOverlapping(points: MapLocation[], minDist = 60) {
  const visible = points.filter((p) => p.x !== null && p.y !== null);
  const px = (p: MapLocation) => [(p.x! / 100) * W, (p.y! / 100) * H];
  const groups: MapLocation[][] = [];
  for (const p of visible) {
    const [x, y] = px(p);
    const group = groups.find((g) => g.some((q) => Math.hypot(px(q)[0] - x, px(q)[1] - y) < minDist));
    if (group) group.push(p);
    else groups.push([p]);
  }
  for (const group of groups) {
    if (group.length < 2) continue;
    const cx = group.reduce((sum, p) => sum + px(p)[0], 0) / group.length;
    const cy = group.reduce((sum, p) => sum + px(p)[1], 0) / group.length;
    const r = Math.max(minDist / 2, (minDist * group.length) / (2 * Math.PI));
    group.forEach((p, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / group.length;
      p.x = (Math.min(W, Math.max(0, cx + r * Math.cos(a))) / W) * 100;
      p.y = (Math.min(H, Math.max(0, cy + r * Math.sin(a))) / H) * 100;
    });
  }
}

/**
 * Figma Modulos › 20. Interactive Map (también "Our offices" en Contacto/Instalaciones y el mapa de representantes).
 * El mapa se dibuja en el servidor con d3-geo; los puntos, la ficha emergente y el buscador van en el cliente.
 */
export default function InteractiveMap({ eyebrow, title_muted, title, subtitle, focus, show_list, search_placeholder, locations }: Props) {
  const { projection, d } = getMap(focus === "europe" ? "europe" : "world");

  const points: MapLocation[] = (Array.isArray(locations) ? locations : []).flatMap((loc, i) => {
    const lat = Number(loc?.lat);
    const lng = Number(loc?.lng);
    if (!loc?.name || !Number.isFinite(lat) || !Number.isFinite(lng) || loc.lat === "" || loc.lng === "") return [];
    const xy = projection([lng, lat]);
    const visible = !!xy && xy[0] >= 0 && xy[0] <= W && xy[1] >= 0 && xy[1] <= H;
    return [
      {
        id: i,
        name: loc.name,
        subtitle: loc.subtitle || "",
        address: loc.address || "",
        phone: loc.phone || "",
        email: loc.email || "",
        hours: loc.hours || "",
        image: loc.image?.url ? loc.image : null,
        x: visible ? (xy![0] / W) * 100 : null,
        y: visible ? (xy![1] / H) * 100 : null,
      },
    ];
  });

  spreadOverlapping(points);

  return (
    <div className="bg-white py-20 lg:py-[120px]">
      <div className="site-container flex flex-col gap-10 lg:gap-16">
        <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} subtitle={subtitle} align="center" />

        <InteractiveMapClient locations={points} showList={!!show_list} searchPlaceholder={search_placeholder || "Search"}>
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
            <path d={d} fill="#e7e7e7" stroke="#ffffff" strokeWidth={0.5} strokeLinejoin="round" />
          </svg>
        </InteractiveMapClient>
      </div>
    </div>
  );
}
