import type { Metadata } from "next";
import { ArrowUpRight, LinkSimple } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};

const colors = [
  ["light-grey", "Light Grey", "#F9F9F9"],
  ["medium-grey", "Medium Grey", "#E7E7E7"],
  ["grey", "Grey", "#949494"],
  ["dark-grey", "Dark Grey", "#444444"],
  ["black-grey", "Black Grey", "#1A1A1A"],
  ["black", "Black", "#010001"],
  ["red", "Red", "#FF2F00"],
] as const;

const titles = [
  ["text-title-xxl", "Title XXL", "160 / 64 · 95%"],
  ["text-title-xl", "Title XL", "72 / 40 · 110%"],
  ["text-title-l", "Title L", "48 / 32 · 110%"],
  ["text-title-m", "Title M", "32 / 24 · 120%"],
  ["text-title-s", "Title S", "24 / 18 · 120%"],
  ["text-title-xs", "Title XS", "18 / 16 · 130%"],
] as const;

const bodies = [
  ["text-body-l font-medium", "Body L Medium", "18 · 140% · -1%"],
  ["text-body-l", "Body L", "18 · 140% · -1%"],
  ["text-body-m font-medium", "Body M Medium", "16 · 140% · -1%"],
  ["text-body-m", "Body M", "16 · 140% · -1%"],
  ["text-body-s", "Body S", "14 · 140% · -1%"],
  ["text-body-xs", "Body XS", "12 · 140%"],
  ["text-button", "Button", "15 · 100% · -3%"],
  ["text-tag", "Tag", "16 · 120% · 8%"],
] as const;

/** Página de control visual de los tokens (no indexable). Compárala con el Figma. */
export default function DesignSystemPage() {
  return (
    <>
    <div className="h-[71px] bg-black lg:h-[95px]" aria-hidden />
    <div className="site-container space-y-24 py-16">
      <section>
        <h1 className="text-title-xl mb-10">Colors</h1>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {colors.map(([token, name, hex]) => (
            <div key={token} className="overflow-hidden rounded-xl ring-1 ring-medium-grey">
              <div className="h-28" style={{ background: `var(--color-${token})` }} />
              <div className="p-3 text-body-xs">
                <p className="font-medium">{name}</p>
                <p className="text-grey">{hex} · {token}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h1 className="text-title-xl mb-10">Typography</h1>
        <div className="divide-y divide-medium-grey">
          {[...titles, ...bodies].map(([cls, name, spec]) => (
            <div key={name} className="flex flex-col gap-2 py-5 lg:flex-row lg:items-baseline lg:justify-between">
              <p className={cls}>{name}</p>
              <p className="text-body-xs text-grey">{cls} · {spec}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h1 className="text-title-xl mb-10">Buttons & icons</h1>
        <div className="flex flex-wrap gap-4">
          <Button href="#" variant="pill" icon={<LinkSimple size={16} />}>Download library</Button>
          <Button href="#" variant="solid">Learn more</Button>
          <span className="bg-black p-4"><Button href="#" variant="outline" icon={<ArrowUpRight size={14} />}>Contact us</Button></span>
        </div>
      </section>
    </div>
    </>
  );
}
