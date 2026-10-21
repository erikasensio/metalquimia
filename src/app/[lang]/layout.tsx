import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getGlobal } from "@/lib/wp";
import { isLocale, locales } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Animations } from "@/components/motion/Animations";
import { Loader } from "@/components/motion/Loader";
import { StringsProvider } from "@/components/ui/Strings";
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
    <html lang={lang} data-scroll-behavior="smooth" suppressHydrationWarning>
      {/* data-scroll-behavior: el scroll suave es solo para anclas; al cambiar de página Next salta sin animar. */}
      {/* suppressHydrationWarning: el script de abajo añade clases a <html> y las extensiones del navegador (p. ej. ColorZilla) atributos al body. */}
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        {/* Si la pantalla de carga ya se vio en esta visita, se oculta antes de pintar (sin parpadeo).
            js-motion también va aquí y no solo en <Animations>: así los textos que se teclean no se ven enteros antes de escribirse. */}
        {/* next/script (beforeInteractive) y no <script> a pelo: React avisa de los <script> renderizados dentro de componentes. */}
        <Script id="mq-loader-seen" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js-motion');try{sessionStorage.getItem('mq-loader')&&document.documentElement.classList.add('mq-loader-seen')}catch(e){}"}
        </Script>
        <StringsProvider lang={lang} strings={global?.strings ?? {}}>
        {loaderOn && <Loader textMuted={String(options.loader_text_muted || "Meat.")} text={String(options.loader_text || "The next.")} />}
        <Header global={global} lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer global={global} lang={lang} />
        </StringsProvider>
        <Animations />
        {/* Filtro de la utilidad word-outline: contorno de la silueta del texto (sin las líneas internas donde se solapan
            los trazos de una letra) y relleno blanco al 35 % por dentro, que se nota sobre las imágenes. */}
        <svg width="0" height="0" className="absolute" aria-hidden>
          <filter id="word-outline">
            <feMorphology in="SourceGraphic" operator="dilate" radius="1.5" result="grown" />
            <feComposite in="grown" in2="SourceAlpha" operator="out" result="stroke" />
            <feFlood floodColor="#fff" floodOpacity="0.35" />
            <feComposite in2="SourceAlpha" operator="in" result="fill" />
            <feMerge>
              <feMergeNode in="fill" />
              <feMergeNode in="stroke" />
            </feMerge>
          </filter>
        </svg>
      </body>
    </html>
  );
}
