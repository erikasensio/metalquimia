import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/wp";
import { localizedPath } from "@/lib/i18n";
import { Sections } from "@/sections/Sections";

async function load(params: PageProps<"/[lang]/[[...slug]]">["params"]) {
  const { lang, slug } = await params;
  const path = (slug ?? []).join("/");
  return { lang, path, page: await getPage(lang, path) };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[[...slug]]">): Promise<Metadata> {
  const { path, page } = await load(params);
  if (!page) return {};
  const title = page.seo.title || page.title;
  return {
    // En la portada el título va tal cual, sin añadir " · Metalquimia" detrás.
    title: path === "" ? { absolute: page.seo.title || "Metalquimia" } : title,
    description: page.seo.description || undefined,
    openGraph: page.seo.image ? { images: [page.seo.image.url] } : undefined,
    alternates: {
      languages: Object.fromEntries(page.translations.map((t) => [t.lang, localizedPath(t.lang, t.path)])),
    },
  };
}

export default async function Page({ params }: PageProps<"/[lang]/[[...slug]]">) {
  const { lang, path, page } = await load(params);
  if (!page) {
    if (process.env.NODE_ENV === "development") {
      return (
        <div className="site-container pb-20 pt-40 text-body-m">
          <p className="text-title-s mb-4">WordPress no devuelve esta página</p>
          <p>
            Petición: <code>{process.env.WP_URL ?? "http://metalquimia.local"}/wp-json/mq/v1/page?lang={lang}&amp;path={path}</code>
          </p>
          <p className="mt-2 text-grey">
            Comprueba que el sitio de Local está arrancado, que Metalquimia Core, Secure Custom Fields y Polylang están activos,
            y que la página existe y está publicada en ese idioma (la portada se elige en Ajustes → Lectura).
          </p>
        </div>
      );
    }
    notFound();
  }

  return <Sections items={page.sections} />;
}
