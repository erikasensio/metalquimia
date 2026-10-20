"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Logo } from "@/components/layout/Logo";

/**
 * Pantalla de carga (Figma "LOADER": Loader 6 → Loader 7). Se ve una vez por visita:
 * logo centrado → "Meat. The next." → la cortina negra sube y deja ver la página.
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

    document.documentElement.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          // Se marca como visto al terminar: si se marcara al empezar, el doble efecto de StrictMode lo ocultaría.
          onComplete: () => {
            try {
              sessionStorage.setItem("mq-loader", "1");
            } catch {}
            document.documentElement.style.overflow = "";
            setVisible(false);
          },
        })
        .from("[data-loader-logo]", { opacity: 0, y: 12, duration: 0.6, ease: "power2.out" })
        .to("[data-loader-logo]", { opacity: 0, y: -12, duration: 0.4, ease: "power2.in" }, "+=0.5")
        .from("[data-loader-word]", { opacity: 0, yPercent: 60, duration: 0.6, ease: "power3.out", stagger: 0.15 })
        .to(root.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "+=0.6");
    }, root);
    return () => {
      document.documentElement.style.overflow = "";
      ctx.revert();
    };
  }, []);

  if (!visible) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] flex items-center justify-center bg-black" aria-hidden data-loader>
      <div data-loader-logo className="absolute">
        <Logo className="h-6 w-auto text-white" />
      </div>
      <p className="flex gap-2 font-sans text-body-l opacity-100">
        <span data-loader-word className="inline-block text-grey">
          {textMuted}
        </span>
        <span data-loader-word className="inline-block text-white">
          {text}
        </span>
      </p>
    </div>
  );
}
