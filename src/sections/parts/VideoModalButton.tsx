"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Square, X } from "@phosphor-icons/react";
import { useStrings } from "@/components/ui/Strings";
import { RollText } from "@/components/ui/RollText";

/** Convierte un enlace de YouTube o Vimeo en la URL del reproductor embebido (con autoplay). */
function embedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0&playsinline=1`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1${vimeo[2] ? `&h=${vimeo[2]}` : ""}`;
  return null;
}

type Props = { url: string; label: string };

/** Botón "WATCH VIDEO" (Figma full-screen-video 325:12801: cristal gris, cuadrado y texto mono) que abre el vídeo en una ventana modal (Esc o clic fuera para cerrar). */
export function VideoModalButton({ url, label }: Props) {
  const { t } = useStrings();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const embed = embedUrl(url);

  useEffect(() => {
    if (!open) return;
    const opener = trigger.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      // Trampa de foco mínima: el tabulador no sale de la ventana.
      if (e.key === "Tab" && dialog.current) {
        const items = dialog.current.querySelectorAll<HTMLElement>("button, iframe, video, [href], [tabindex]:not([tabindex='-1'])");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="cta inline-flex items-center gap-4 rounded-lg bg-dark-grey/50 px-8 py-6 font-mono text-[0.875rem] uppercase leading-none text-light-grey backdrop-blur-[20px] hover:bg-dark-grey/80"
      >
        <Square size={12} weight="fill" aria-hidden />
        <RollText>{label}</RollText>
      </button>

      {open &&
        createPortal(
          <div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5 animate-[fade-in_0.3s_ease-out] lg:p-16"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <button
              ref={close}
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("close_video", "Close video")}
              className="absolute right-4 top-4 flex size-10 items-center justify-center bg-black-grey text-light-grey transition-colors hover:bg-dark-grey"
            >
              <X size={18} />
            </button>
            <div className="relative aspect-video w-full max-w-[1400px] bg-black">
              {embed ? (
                <iframe
                  src={embed}
                  title={label}
                  className="absolute inset-0 size-full"
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <video src={url} className="absolute inset-0 size-full" controls autoPlay playsInline />
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
