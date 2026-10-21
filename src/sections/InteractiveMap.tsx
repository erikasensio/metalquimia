import { geoMercator, geoNaturalEarth1, geoPath, type GeoProjection } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection } from "geojson";
import world from "world-atlas/countries-110m.json";
import type { Section, WpImage } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Typewriter } from "@/components/motion/Typewriter";
import { InteractiveMapClient, type MapLocation } from "./parts/InteractiveMapClient";
import { RepresentativesMapClient } from "./parts/RepresentativesMapClient";

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
  continent?: string;
  country?: string;
  fax?: string;
  website?: string;
};

type Props = Section & {
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  subtitle?: string;
  focus?: "world" | "europe" | "";
  show_list?: boolean;
  search_placeholder?: string;
  show_filters?: boolean;
  continent_label?: string;
  country_label?: string;
  all_label?: string;
  map_link_label?: string;
  locations?: Location[] | null | false | "";
};

const W = 1440;

// "reps": el mapa de Representantes del Figma (307:15479), en Mercator de 56° S a 83° N.
type Focus = "world" | "europe" | "reps";
type MapData = { projection: GeoProjection; d: string; H: number };
const cache = new Map<Focus, MapData>();

const mercatorY = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));

/** Proyección + silueta de los países, calculadas una vez por zona (en el servidor). */
function getMap(focus: Focus): MapData {
  const hit = cache.get(focus);
  if (hit) return hit;

  const countries = feature(world as unknown as Topology, (world as unknown as Topology).objects.countries as GeometryCollection) as FeatureCollection;
  // Sin la Antártida: ocupa mucho y no aporta.
  const land: FeatureCollection = { ...countries, features: countries.features.filter((f) => f.id !== "010") };

  const scale = W / (2 * Math.PI);
  // "europe": el mapa de "Our offices" del Figma (Instalaciones 757:21208), 1512 × 902 en Mercator con Girona en (1010, 370).
  const H = focus === "reps" ? Math.round(scale * (mercatorY(83) - mercatorY(-56))) : focus === "europe" ? Math.round((W * 902) / 1512) : 720;
  const projection =
    focus === "reps"
      ? geoMercator().scale(scale).translate([W / 2, scale * mercatorY(83)])
      : focus === "europe"
      ? geoMercator()
          .scale((1175 * W) / 1512)
          .center([2.82, 41.98])
          .translate([(1010 * W) / 1512, (370 * W) / 1512])
      : geoNaturalEarth1().fitExtent([[10, 10], [W - 10, H - 10]], land);
  projection.clipExtent([[0, 0], [W, H]]);

  const d = geoPath(projection).digits(1)(land) || "";
  const result = { projection, d, H };
  cache.set(focus, result);
  return result;
}

/**
 * Los puntos muy juntos (p. ej. varias sedes en Girona) se reparten en un pequeño círculo alrededor de su centro,
 * para que todos se puedan pulsar también en el móvil.
 */
function spreadOverlapping(points: MapLocation[], H: number, minDist = 60) {
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
export default function InteractiveMap(props: Props) {
  const { eyebrow, title_muted, title, subtitle, focus, show_list, search_placeholder, show_filters, locations } = props;
  const { projection, d, H } = getMap(show_filters ? "reps" : focus === "europe" ? "europe" : "world");

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
        continent: loc.continent?.trim() || "",
        country: loc.country?.trim() || "",
        fax: loc.fax || "",
        website: loc.website || "",
        lat,
        lng,
        x: visible ? (xy![0] / W) * 100 : null,
        y: visible ? (xy![1] / H) * 100 : null,
      },
    ];
  });

  const offices = !show_filters && focus === "europe";
  spreadOverlapping(points, H, show_filters ? 24 : offices ? 28 : 60);

  if (show_filters) {
    return (
      <div className="bg-white pb-20 lg:pb-[120px]">
        <div className="site-container flex flex-col gap-12 lg:gap-20">
          {/* Figma 411:19458: el texto empieza en la segunda columna. */}
          {subtitle && (
            <p className="text-body-m max-w-[497px] whitespace-pre-line font-medium text-dark-grey lg:ml-[8.4%]" data-typewriter-group>
              <Typewriter text={subtitle} />
            </p>
          )}
          <RepresentativesMapClient
            locations={points}
            ratio={`${W} / ${H}`}
            continentLabel={props.continent_label || ""}
            countryLabel={props.country_label || ""}
            allLabel={props.all_label || "View All"}
            mapLinkLabel={props.map_link_label || "View on the map"}
          >
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full mix-blend-multiply" aria-hidden>
              <path d={d} fill="#f0f0f0" stroke="#ffffff" strokeWidth={0.8} strokeLinejoin="round" />
            </svg>
          </RepresentativesMapClient>
        </div>
      </div>
    );
  }

  // Figma Instalaciones 757:21207 + 757:21208: cabecera sobre gris medio y, debajo, el mapa a sangre con el listado encima.
  if (offices) {
    return (
      <div>
        {(eyebrow || title_muted || title || subtitle) && (
          <div className="bg-medium-grey pb-20 pt-20 lg:pt-[120px]">
            <SectionHeader eyebrow={eyebrow} titleMuted={title_muted} title={title} subtitle={subtitle} align="center" className="site-container" />
          </div>
        )}
        <div className="bg-light-grey">
          <InteractiveMapClient locations={points} showList={!!show_list} searchPlaceholder={search_placeholder || "Search"} ratio={`${W} / ${H}`} bleed>
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden>
              <path d={d} fill="#e7e7e7" stroke="#f9f9f9" strokeWidth={1} strokeLinejoin="round" />
            </svg>
          </InteractiveMapClient>
        </div>
      </div>
    );
  }

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
