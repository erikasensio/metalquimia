import type { Section, WpImage } from "@/lib/types";
import { Media } from "@/components/ui/Media";
import { VideoModalButton } from "./parts/VideoModalButton";

type WpFile = { url?: string; mime_type?: string; mime?: string; alt?: string } | null | false | "";

type Props = Section & {
  image?: (WpImage & { mime?: string }) | null;
  video?: WpFile;
  video_url?: string;
  button_label?: string;
};

/**
 * Figma Modulos › 19. Full Screen Media.
 * Imagen (o vídeo MP4 en bucle) a sangre con un botón centrado que abre el vídeo completo en una ventana.
 */
export default function FullScreenMedia({ image, video, video_url, button_label }: Props) {
  const file = video && typeof video === "object" && video.url ? video : null;
  const isMp4 = Boolean(file && (/^video\/mp4/.test(file.mime_type || file.mime || "") || /\.mp4($|\?)/i.test(file.url || "")));
  const background = isMp4 && file ? { url: file.url!, alt: "", width: 0, height: 0, mime: "video/mp4" } : image;
  // Sin enlace propio, el botón abre el mismo MP4 de fondo con controles y sonido.
  const playUrl = video_url?.trim() || (isMp4 ? file!.url! : "");

  return (
    <div className="relative flex h-[60vh] min-h-[420px] items-center justify-center overflow-hidden bg-black lg:h-[min(100svh,860px)]">
      <Media image={background} className="absolute inset-0" parallax sizes="100vw" />
      <div className="absolute inset-0 bg-black/30" aria-hidden />
      {playUrl && (
        <div className="relative" data-reveal>
          <VideoModalButton url={playUrl} label={button_label?.trim() || "WATCH VIDEO"} />
        </div>
      )}
    </div>
  );
}
