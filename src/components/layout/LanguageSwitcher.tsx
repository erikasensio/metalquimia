"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { CaretDown, GlobeSimple } from "@phosphor-icons/react";
import { locales, localizedPath } from "@/lib/i18n";

/**
 * Selector de idioma. Usa los <link rel="alternate" hreflang> que pinta cada página
 * para llevar a la traducción de la página actual; si no existe, a la portada de ese idioma.
 */
export function LanguageSwitcher({ lang, className = "" }: { lang: string; className?: string }) {
  const pathname = usePathname();
  // Se guarda la ruta en la que se abrió: al navegar a otra página el desplegable queda cerrado.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const [targets, setTargets] = useState<Record<string, string>>({});
  const open = openAt === pathname;

  function toggle() {
    if (open) return setOpenAt(null);
    const found: Record<string, string> = {};
    document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]').forEach((link) => {
      found[link.hreflang] = new URL(link.href).pathname;
    });
    setTargets(found);
    setOpenAt(pathname);
  }

  if (locales.length < 2) return null;

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex items-center gap-1.5 font-display text-[0.75rem] uppercase leading-[1.1] text-white"
      >
        <GlobeSimple size={16} aria-hidden />
        {lang}
        <CaretDown size={8} weight="bold" aria-hidden />
      </button>
      {open && (
        <ul className="absolute right-0 top-full z-10 mt-2 min-w-16 bg-black py-1">
          {locales
            .filter((l) => l !== lang)
            .map((l) => (
              <li key={l}>
                <a
                  href={targets[l] ?? localizedPath(l, "")}
                  hrefLang={l}
                  className="block px-3 py-1.5 font-display text-[0.75rem] uppercase text-white hover:text-grey"
                >
                  {l}
                </a>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
