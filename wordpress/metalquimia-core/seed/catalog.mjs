/**
 * Catálogo de soluciones y máquinas (Excel «Estructura web nova», hoja MÀQUINES) y páginas corporativas que faltaban (hoja APARTATS).
 * Los textos salen de metalquimia.com en ES/EN/CA/DE (catalog.json, generado fuera del repo); cada texto ya lleva sus cuatro idiomas.
 * Marcadores que resuelve este archivo con las plantillas de content.mjs:
 *   "@engineering" → bloque del método de ingeniería · "@partnership" → texto + imagen de Partnership · "@productIntro" → imagen genérica de presentación.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const data = JSON.parse(fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "catalog.json"), "utf8"));

/** Imágenes de las máquinas (seed/images/catalog), con el texto alternativo en los cuatro idiomas. */
export const catalogImages = data.images;

/** Páginas del catálogo, con los marcadores sustituidos por las plantillas de content.mjs. */
export const catalogPages = ({ engineering, partnership, productIntro }) => {
  // Mismo texto y botón que en Inyección de carne, con los cuatro idiomas.
  const creativation = () => ({
    ...partnership(),
    text: {
      __l: true,
      es: "<p>La Creativación es el enfoque de Metalquimia para la I+D: un proceso en el que el conocimiento profundo del proceso, la ciencia de los alimentos y la ingeniería mecánica convergen para crear soluciones que antes no existían.</p>",
      en: "<p>Creativation is Metalquimia's approach to R&amp;D: a process where deep process knowledge, food science, and mechanical engineering converge to create solutions that didn't exist before.</p>",
      ca: "<p>La Creativació és l'enfocament de Metalquimia per a la R+D: un procés en què el coneixement profund del procés, la ciència dels aliments i l'enginyeria mecànica convergeixen per crear solucions que abans no existien.</p>",
      de: "<p>Creativation ist der F&amp;E-Ansatz von Metalquimia: ein Prozess, in dem tiefes Prozesswissen, Lebensmittelwissenschaft und Maschinenbau zusammenfließen, um Lösungen zu schaffen, die es vorher nicht gab.</p>",
    },
    button: { title: { __l: true, es: "DESCUBRE NUESTRO MODELO", en: "DISCOVER OUR MODEL", ca: "DESCOBREIX EL NOSTRE MODEL", de: "UNSER MODELL ENTDECKEN" }, url: "@page:partnership", target: "" },
  });
  const resolve = (v) => (v === "@engineering" ? engineering() : v === "@partnership" ? creativation() : v === "@productIntro" ? productIntro : v);
  return data.pages.map(({ placeholder, sections, ...page }) => ({ ...page, sections: sections.map((s) => (typeof s === "string" ? resolve(s) : Object.fromEntries(Object.entries(s).map(([k, v]) => [k, resolve(v)])))) }));
};
