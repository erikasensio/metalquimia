export type WpImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
  mime?: string;
};

export type WpLink = {
  title: string;
  url: string;
  target: string;
};

/** Sección de la página tal como la devuelve /wp-json/mq/v1/page (un layout del flexible content). */
export type Section = {
  /** Nombre del layout en WordPress, p. ej. "rich_text". */
  type: string;
  /** Ancla opcional para enlazar a la sección (#id). */
  anchor?: string;
  [field: string]: unknown;
};

export type Translation = { lang: string; path: string };

export type Page = {
  id: number;
  lang: string;
  title: string;
  path: string;
  seo: { title: string; description: string; image?: WpImage | null };
  sections: Section[];
  translations: Translation[];
};

export type MenuItem = {
  label: string;
  url: string;
  target?: string;
  /** "Descripción" del elemento en WordPress (texto bajo el título en el menú desplegable). */
  description?: string;
  image?: WpImage | null;
  /** Icono de la lista con iconos (PNG cuadrado, se ve a 24 px). */
  icon?: WpImage | null;
  /** Se pinta en rojo (p. ej. "Pedir recambios"). */
  highlight?: boolean;
  /** Se pinta en gris (p. ej. "Empleo"). */
  muted?: boolean;
  /** Campos del panel (solo en los elementos de primer nivel). "" = automático según el contenido. */
  layout?: "" | "icons" | "cards" | "featured" | "links";
  eyebrow?: string;
  title_muted?: string;
  title?: string;
  link?: WpLink | null;
  children: MenuItem[];
};

export type Global = {
  lang: string;
  menus: Record<string, MenuItem[]>;
  /** Campos del panel "Ajustes globales" de ese idioma (cabecera, pie, textos sueltos…). */
  options: Record<string, unknown>;
  /** Textos sueltos de la interfaz (clave → texto) editables desde el panel. */
  strings: Record<string, string>;
};

/** Enlace de ACF ya normalizado por el plugin (URL interna relativa). */
export type Cta = WpLink | null | undefined | "";
