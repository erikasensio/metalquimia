"use client";

import { createContext, useContext, type ReactNode } from "react";

/** Textos de la interfaz (Ajustes globales › Textos de la interfaz) para los componentes de cliente. */
const StringsContext = createContext<{ lang: string; strings: Record<string, string> }>({ lang: "", strings: {} });

export function StringsProvider({ lang, strings, children }: { lang: string; strings: Record<string, string>; children: ReactNode }) {
  return <StringsContext.Provider value={{ lang, strings }}>{children}</StringsContext.Provider>;
}

/** t("prev", "Anterior"): el texto de WordPress o, si está vacío, el de por defecto. */
export function useStrings() {
  const { lang, strings } = useContext(StringsContext);
  return { lang, t: (key: string, fallback: string) => strings[key] || fallback };
}
