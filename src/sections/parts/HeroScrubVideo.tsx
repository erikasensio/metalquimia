"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Cuánto scroll (en altos de pantalla) dura el vídeo mientras el hero queda fijo. */
const LENGTH = 3;

/**
 * Vídeo de fondo del <Hero> que avanza y retrocede con el scroll. El hero se queda fijo
 * hasta que el vídeo termina y, mientras tanto, sus frases ([data-hero-line]) se relevan:
 * cada una se entinta palabra a palabra (transparente → destello naranja → blanco). Al final
 * la última sube y entra el botón ([data-hero-cta]). Todo va atado al scroll: al subir se deshace.
 * Para que el vídeo vaya fino, el MP4 necesita keyframes muy seguidos
 * (ffmpeg … -g 3 -keyint_min 3 -an -movflags +faststart).
 * Además se descarga entero y se reproduce desde memoria: sin caché (p. ej. en incógnito) el navegador
 * solo tiene lo ya bajado y los saltos a trozos sin descargar se quedan congelados.
 * Con "reducir movimiento" no hay nada de esto: primer fotograma, última frase y botón visibles (globals.css).
 */
export function HeroScrubVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const hero = video?.parentElement;
    if (!video || !hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: gsap.Context | undefined;
    let timeline: gsap.core.Timeline | undefined;
    const setup = () => {
      if (ctx) return;
      ctx = gsap.context(() => {
        const tl = (timeline = gsap.timeline({
          defaults: { ease: "none" },
          // refreshPriority: el pin se calcula antes que las animaciones de más abajo, que se crean antes.
          scrollTrigger: { trigger: hero, start: "top top", end: `+=${LENGTH * 100}%`, pin: true, scrub: 0.5, refreshPriority: 1, invalidateOnRefresh: true },
        }));
        // La línea de tiempo dura 1: el vídeo la ocupa entera y cada frase su tramo.
        if (video.duration) tl.fromTo(video, { currentTime: 0 }, { currentTime: video.duration, duration: 1 }, 0);
        else tl.set({}, {}, 1);

        // Tramos: las frases se reparten el 70 % del scroll; luego la última sube y entra el botón.
        const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]", hero);
        const seg = 0.7 / Math.max(lines.length, 1);
        lines.forEach((line, i) => {
          // La primera empieza con un mínimo de scroll; las demás, al relevar a la anterior.
          const start = i === 0 ? 0.02 : i * seg;
          if (i > 0) tl.to(lines[i - 1], { autoAlpha: 0, y: -24, duration: 0.04 }, start - 0.04);
          const words = line.querySelectorAll("[data-word]");
          const amount = seg * 0.45;
          tl.fromTo(words, { color: "rgba(249, 249, 249, 0)" }, { color: "#ff2f00", duration: seg * 0.2, stagger: { amount } }, start).to(
            words,
            { color: "#f9f9f9", duration: seg * 0.2, stagger: { amount } },
            start + seg * 0.15,
          );
        });

        // Hasta que sale el botón, el título baja lo que ocupa el botón para quedar abajo del todo.
        const cta = hero.querySelector<HTMLElement>("[data-hero-cta]");
        const title = hero.querySelector("h1");
        if (cta) {
          const gap = () => parseFloat(getComputedStyle(cta.parentElement!).rowGap) || 0;
          if (title) tl.fromTo(title, { y: () => cta.offsetHeight + gap() }, { y: 0, duration: 0.08, ease: "power2.inOut" }, 0.74);
          tl.fromTo(cta, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.78);
        }
      }, hero);
      ScrollTrigger.refresh();
    };
    if (video.readyState >= 1) setup();
    else {
      video.addEventListener("loadedmetadata", setup, { once: true });
      // Si el vídeo no carga, las frases y el botón se animan igual con el scroll.
      video.addEventListener("error", setup, { once: true });
    }

    // Copia completa en memoria; al cambiar de fuente se vuelve al fotograma que toca según el scroll.
    // Si falla (p. ej. CORS de otro dominio), se queda el vídeo normal.
    let blobUrl: string | undefined;
    const abort = new AbortController();
    fetch(src, { signal: abort.signal })
      .then((res) => (res.ok ? res.blob() : Promise.reject(res.status)))
      .then((blob) => {
        blobUrl = URL.createObjectURL(blob);
        video.addEventListener(
          "loadedmetadata",
          () => {
            if (timeline) video.currentTime = timeline.progress() * video.duration;
          },
          { once: true },
        );
        video.src = blobUrl;
      })
      .catch(() => {});

    // iOS no pinta los saltos de un vídeo que nunca se ha reproducido: se "desbloquea" con el primer toque.
    const unlock = () => video.play().then(() => video.pause()).catch(() => {});
    window.addEventListener("touchstart", unlock, { once: true, passive: true });

    return () => {
      video.removeEventListener("loadedmetadata", setup);
      video.removeEventListener("error", setup);
      window.removeEventListener("touchstart", unlock);
      ctx?.revert();
      abort.abort();
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [src]);

  return <video ref={ref} src={src} poster={poster} muted playsInline preload="auto" className="absolute inset-0 size-full object-cover" aria-hidden />;
}
