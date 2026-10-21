"use client";

import { Button } from "@/components/ui/Button";
import { useStrings } from "@/components/ui/Strings";
import { localizedPath } from "@/lib/i18n";

/** Página 404. Los textos salen de Ajustes globales › Textos de la interfaz (not-found no recibe el idioma por props). */
export default function NotFound() {
  const { lang, t } = useStrings();

  return (
    <div className="site-container flex min-h-[70vh] flex-col items-start justify-center gap-6 pb-20 pt-[calc(71px+5rem)] xl:pt-[calc(95px+5rem)]">
      <p className="font-mono text-[0.875rem] uppercase leading-none tracking-[0.02em] text-red">404</p>
      <h1 className="text-title-l max-w-[20ch]">{t("not_found_title", "Page not found")}</h1>
      <p className="text-title-xs max-w-[48ch] text-grey">{t("not_found_text", "The page you are looking for does not exist or has moved.")}</p>
      <Button href={localizedPath(lang, "")} variant="red">
        {t("not_found_button", "Back to home")}
      </Button>
    </div>
  );
}
