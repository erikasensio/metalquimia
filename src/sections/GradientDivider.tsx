import type { Section } from "@/lib/types";

type Props = Section & { direction?: "down" | "up" };

// Franjas blancas sobre el degradado, de más gruesas a más finas (Figma "gradient" 325:9695).
const stripes = [
  { top: 1.32, height: 15.982 },
  { top: 20.5, height: 15.982 },
  { top: 41.28, height: 12.786 },
  { top: 60.45, height: 11.188 },
  { top: 78.03, height: 12.786 },
  { top: 102.01, height: 6.393 },
  { top: 121.19, height: 4.795 },
  { top: 140.37, height: 3.196 },
  { top: 161.14, height: 1.598 },
];

/** Transición decorativa blanco → negro (o al revés) entre secciones. */
export default function GradientDivider({ direction = "down" }: Props) {
  return (
    <div className={`relative h-[120px] overflow-hidden bg-[#010101] lg:h-[182px] ${direction === "up" ? "rotate-180" : ""}`} aria-hidden>
      <div
        className="absolute inset-x-0 top-[-8px] h-[383px]"
        style={{ backgroundImage: "linear-gradient(180.15deg, #fff 0.5%, #292929 22.7%, #010101 49.9%)" }}
      >
        {stripes.map((s) => (
          <div key={s.top} className="absolute inset-x-0 bg-white" style={{ top: s.top, height: s.height }} />
        ))}
      </div>
    </div>
  );
}
