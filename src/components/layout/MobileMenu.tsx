"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import type { MenuItem, WpLink } from "@/lib/types";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Props = { items: MenuItem[]; top: MenuItem[]; cta?: WpLink | null; lang: string; label: string };

/** Menú a pantalla completa para móvil y tablet. */
export function MobileMenu({ items, top, cta, lang, label }: Props) {
  const pathname = usePathname();
  // Se guarda la ruta en la que se abrió: al navegar a otra página el menú queda cerrado.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <div className="xl:hidden">
      <button type="button" aria-label={label} aria-expanded={open} onClick={() => setOpenAt(open ? null : pathname)} className="text-black-grey group-data-[theme=dark]:text-light-grey">
        {open ? <X size={28} /> : <List size={28} />}
      </button>
      {open && (
        <div
          className="fixed inset-x-0 bottom-0 top-[71px] overflow-y-auto bg-white px-5 py-8 animate-[fade-in_0.2s_ease-out]"
          // Un enlace a la página actual no cambia la ruta: se cierra al pulsarlo.
          onClick={(e) => (e.target as HTMLElement).closest("a[href]") && setOpenAt(null)}
          data-mobile-menu
        >
          <ul className="space-y-5">
            {items.map((item) => (
              <li key={item.url + item.label}>
                <Link href={item.url} className="text-title-m text-black">
                  {item.label}
                </Link>
                {item.children.length > 0 && (
                  <ul className="mt-3 space-y-2 pl-1">
                    {item.children.map((child) => (
                      <li key={child.url + child.label}>
                        <Link href={child.url} className={`text-body-l ${child.highlight ? "text-red" : "text-dark-grey"}`}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          {cta?.url && (
            <Link href={cta.url} className="mt-10 inline-flex h-[42px] items-center bg-red px-5 font-mono text-[0.875rem] font-bold uppercase text-white">
              {cta.title}
            </Link>
          )}
          <div className="-mx-5 mt-10 flex flex-wrap items-center gap-6 bg-black px-5 py-4">
            {top.map((item) => (
              <Link key={item.url + item.label} href={item.url} className="font-display text-[0.875rem] text-white">
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher lang={lang} />
          </div>
        </div>
      )}
    </div>
  );
}
