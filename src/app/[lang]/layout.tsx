import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGlobal } from "@/lib/wp";
import { isLocale, locales } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Animations } from "@/components/motion/Animations";
import { Loader } from "@/components/motion/Loader";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: { default: "Metalquimia", template: "%s · Metalquimia" },
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const global = await getGlobal(lang);

  const options = (global?.options ?? {}) as Record<string, unknown>;
  const loaderOn = options.loader_enabled !== false && options.loader_enabled !== 0;

  return (
    <html lang={lang} suppressHydrationWarning>
      {/* suppressHydrationWarning: el script de abajo añade clases a <html> y las extensiones del navegador (p. ej. ColorZilla) atributos al body. */}
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        {/* Si la pantalla de carga ya se vio en esta visita, se oculta antes de pintar (sin parpadeo). */}
        <script dangerouslySetInnerHTML={{ __html: "try{sessionStorage.getItem('mq-loader')&&document.documentElement.classList.add('mq-loader-seen')}catch(e){}" }} />
        {loaderOn && <Loader textMuted={String(options.loader_text_muted || "Meat.")} text={String(options.loader_text || "The next.")} />}
        <Header global={global} lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer global={global} lang={lang} />
        <Animations />
      </body>
    </html>
  );
}
