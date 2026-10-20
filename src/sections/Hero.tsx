import Image from "next/image";
import type { Section, WpImage, WpLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";

type Props = Section & {
  image?: WpImage | null;
  image_mobile?: WpImage | null;
  title?: string;
  button?: WpLink | null;
};

/** Hero a pantalla completa (Figma "hero-full-screen" 418:20919). La cabecera queda superpuesta. */
export default function Hero({ image, image_mobile, title, button }: Props) {
  return (
    <div className="relative flex min-h-[600px] items-end justify-center overflow-hidden bg-black px-5 pb-20 pt-40 lg:h-[943px] lg:max-h-svh lg:min-h-[720px] lg:px-[145px]">
      {image?.url && (
        <Image
          src={image.url}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className={`object-cover object-bottom ${image_mobile?.url ? "hidden md:block" : ""}`}
        />
      )}
      {image_mobile?.url && (
        <Image src={image_mobile.url} alt={image_mobile.alt} fill priority sizes="100vw" className="object-cover object-bottom md:hidden" />
      )}

      <div className="relative flex max-w-[970px] flex-col items-center gap-[34px] text-center">
        {title && <h1 className="text-hero whitespace-pre-line text-light-grey [font-feature-settings:'dlig'_1]">{title}</h1>}
        {button?.url && (
          <Button href={button.url} target={button.target} variant="outline">
            {button.title}
          </Button>
        )}
      </div>
    </div>
  );
}
