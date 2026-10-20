"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

type HeaderState = { panelOpen: boolean; setPanelOpen: (open: boolean) => void };
const HeaderContext = createContext<HeaderState>({ panelOpen: false, setPanelOpen: () => {} });
export const useHeader = () => useContext(HeaderContext);

/**
 * Cabecera fija. Sobre un hero oscuro (sección marcada con data-header-overlay) va transparente con
 * texto claro; al hacer scroll, al abrir un desplegable o en páginas sin hero, pasa a blanca.
 * Los hijos se adaptan con las variantes group-data-[theme=dark]:…
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Al cambiar de página se cierra cualquier desplegable.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setPanelOpen(false);
  }

  useEffect(() => {
    const onScroll = () => {
      // Si el hero se queda fijo con el scroll (Hero con vídeo), la cabecera sigue transparente hasta que se suelta.
      const spacer = document.querySelector("[data-hero-scrub]")?.parentElement;
      const hold = spacer?.classList.contains("pin-spacer") ? spacer.offsetHeight - (spacer.firstElementChild as HTMLElement).offsetHeight : 0;
      setScrolled(window.scrollY > hold + 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setOverlay(Boolean(document.querySelector("main [data-header-overlay]"))));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  const theme = overlay && !scrolled && !panelOpen ? "dark" : "light";

  return (
    <HeaderContext.Provider value={{ panelOpen, setPanelOpen }}>
      <header
        data-theme={theme}
        className={`group fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          theme === "dark" ? "bg-transparent" : "bg-white shadow-[0_4px_27px_rgba(0,0,0,0.05)]"
        }`}
      >
        {children}
      </header>
    </HeaderContext.Provider>
  );
}
