"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { Logo } from "@/components/layout/Logo";

/*
 * Brillo en bucle (Figma "LOADER", nodos 307-7529 y 307-7555): la capa blanca se ve a través de una máscara
 * con forma de cometa centrada en --shine. Por delante queda el gris de la capa de abajo, en la cabeza
 * el blanco y por detrás una cola que se apaga poco a poco. --shine va de -10% a 150% para que la cola
 * salga del todo y cada pasada empiece y acabe en gris.
 */
const cometMask =
  "linear-gradient(90deg, transparent calc(var(--shine) - 45%), rgba(0,0,0,0.3) calc(var(--shine) - 20%), #000 var(--shine), transparent calc(var(--shine) + 12%))";
const glintMask = "linear-gradient(90deg, transparent calc(var(--shine) - 8%), #000 var(--shine), transparent calc(var(--shine) + 8%))";
const masked = (mask: string): CSSProperties => ({ maskImage: mask, WebkitMaskImage: mask });

const PASS = 1.35; // segundos por pasada
const PASSES = 2; // pasadas por pantalla
const MAX_TIME = 6000; // ms: aunque la página no esté lista, a los 6 s se abre

/** Pantalla con el contenido en gris y encima la misma en blanco, enmascarada por el brillo. */
function Shine({ children, screen, glint = false }: { children: ReactNode; screen: "logo" | "phrase"; glint?: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-5 opacity-0" data-loader-screen={screen}>
      <div className="relative" style={{ "--shine": "-10%" } as CSSProperties} data-shine>
        <div style={{ color: "#555" }}>{children}</div>
        <div className="absolute inset-0" style={{ color: "#f9f9f9", ...masked(cometMask) }}>
          {children}
        </div>
        {/* Destello sutil, también sobre el símbolo rojo del logo. */}
        {glint && (
          <div className="absolute inset-0 opacity-35 brightness-0 invert" style={masked(glintMask)}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Pantalla de carga. Se ve una vez por visita: sobre negro, primero el logo y después "Meat. The next.™",
 * cada uno con un brillo que lo recorre en bucle; luego la cortina negra sube y deja ver la página.
 * Si la página aún no ha terminado de cargar, el brillo sigue hasta que esté lista (máximo 6 s).
 */
export function Loader({ textMuted, text }: { textMuted: string; text: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("mq-loader") === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce || !root.current) {
      setVisible(false);
      return;
    }

    const start = performance.now();
    let fontsReady = document.fonts?.status === "loaded";
    document.fonts?.ready.then(() => (fontsReady = true));
    const pageReady = () => document.readyState === "complete" && fontsReady;

    document.documentElement.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      const [logoShine, phraseShine] = gsap.utils.toArray<HTMLElement>("[data-shine]");
      const sweep = (el: HTMLElement) =>
        gsap.fromTo(el, { "--shine": "-10%" }, { "--shine": "150%", duration: PASS, ease: "power1.inOut", repeat: -1, paused: true });
      const logoSweep = sweep(logoShine);
      const phraseSweep = sweep(phraseShine);

      const exit = () => {
        phraseSweep.pause();
        gsap.to(root.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          // Se marca como visto al terminar: si se marcara al empezar, el doble efecto de StrictMode lo ocultaría.
          onComplete: () => {
            try {
              sessionStorage.setItem("mq-loader", "1");
            } catch {}
            document.documentElement.style.overflow = "";
            setVisible(false);
          },
        });
      };

      // Al final de cada pasada de la frase: si ya van las previstas y la página está lista (o se agotó el tiempo), sale.
      let phrasePasses = 0;
      phraseSweep.eventCallback("onRepeat", () => {
        phrasePasses++;
        if (phrasePasses >= PASSES && (pageReady() || performance.now() - start > MAX_TIME)) exit();
      });

      gsap
        .timeline()
        .to("[data-loader-screen=logo]", { opacity: 1, duration: 0.4, ease: "power1.out", onStart: () => void logoSweep.play() })
        .to("[data-loader-screen=logo]", { opacity: 0, duration: 0.5, ease: "power1.inOut" }, 0.2 + PASS * PASSES)
        .to("[data-loader-screen=phrase]", { opacity: 1, duration: 0.5, ease: "power1.inOut", onStart: () => void phraseSweep.play() }, "<")
        .call(() => void logoSweep.pause());
    }, root);
    return () => {
      document.documentElement.style.overflow = "";
      ctx.revert();
    };
  }, []);

  if (!visible) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] bg-black" aria-hidden data-loader>
      <Shine screen="logo" glint>
        <Logo className="h-[26px] w-auto lg:h-[35px]" />
      </Shine>
      <Shine screen="phrase">
        <p className="whitespace-nowrap font-display text-[1.5rem] font-semibold leading-[0.97] lg:text-[2.107rem]" style={{ fontFeatureSettings: '"dlig" 1' }}>
          {textMuted} {text}
          <span className="relative -top-[0.95em] ml-[0.08em] text-[0.256em]">TM</span>
        </p>
      </Shine>
    </div>
  );
}
