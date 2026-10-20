# Metalquimia

Web de Metalquimia: WordPress headless (contenido) + Next.js (front).

```
.
├── src/                         Front Next.js
│   ├── app/[lang]/[[...slug]]   Todas las páginas de WordPress, por idioma
│   ├── app/[lang]/design-system Página de control de los tokens (no indexable)
│   ├── app/api/revalidate       WordPress avisa aquí al guardar
│   ├── sections/                Un componente por tipo de sección + registry.ts
│   └── app/globals.css          Tokens del design system (colores, tipos, radios)
└── wordpress/metalquimia-core/  Plugin de WordPress (campos, API, revalidación)
```

## Cómo funciona

- **Secciones movibles:** cada página tiene un campo flexible "Secciones". El editor añade, oculta y arrastra secciones para reordenarlas; el front las pinta en ese orden (`src/sections/Sections.tsx`).
- **Traducible:** Polylang. Cada idioma tiene su propia versión de la página con sus propias secciones. Los ajustes globales (pie, textos de la interfaz) tienen una pantalla por idioma en *Ajustes globales → ES / EN*. Menús por idioma desde *Apariencia → Menús*.
- **URLs:** el idioma por defecto va sin prefijo (`/contacto`), el resto con él (`/en/contact`). Configura Polylang igual: *Idiomas → Ajustes → URL → ocultar el idioma por defecto*.
- **Personalizable:** ningún texto vive en el código. Lo que no es de una sección va en *Ajustes globales* (los textos sueltos se leen con `t(global, "clave", "valor por defecto")`).
- **Caché:** las páginas se cachean y WordPress las regenera al guardar (`/api/revalidate`).

## Puesta en marcha

### WordPress (LocalWP)

1. Instala y activa **Secure Custom Fields** (gratis, de WordPress.org; ACF Pro también vale) y **Polylang**.
2. Enlaza el plugin del repo dentro del sitio de Local:
   ```bash
   ln -s "$(pwd)/wordpress/metalquimia-core" ~/"Local Sites/metalquimia/app/public/wp-content/plugins/metalquimia-core"
   ```
   y actívalo en *Plugins*.
3. En `wp-config.php`:
   ```php
   define( 'MQ_FRONT_URL', 'http://localhost:3000' );
   define( 'MQ_REVALIDATE_SECRET', 'el-mismo-que-en-.env.local' );
   ```
4. Polylang: crea los idiomas (es por defecto, en…), oculta el idioma por defecto en la URL y marca una página como portada en *Ajustes → Lectura*.
5. *Ajustes → Enlaces permanentes*: "Nombre de la entrada" (la API REST lo necesita).

### Front

```bash
cp .env.example .env.local   # ajusta WP_URL, NEXT_PUBLIC_LOCALES y REVALIDATE_SECRET
npm install
npm run dev                  # http://localhost:3000 y http://localhost:3000/design-system
```

### Fuentes

Copia a `public/fonts/`:

- `LayGrotesk-Semibold.woff2` (títulos, peso 600)
- `STKBureauSans-Variable.woff2` (texto, variable)
- `ABCDyatypeMono-Variable.woff2` (tags, variable)

Ahora son las versiones Trial; para producción hay que cambiarlas por las de licencia web con el mismo nombre. Sin archivos se usa la fuente del sistema.

## Añadir un módulo (sección)

1. `wordpress/metalquimia-core/sections/<nombre>.php`: devuelve el layout con sus campos (copia `rich_text.php`). Usa claves `field_mq_<nombre>_<campo>` únicas.
2. `src/sections/<Nombre>.tsx`: el componente, recibe los campos como props.
3. Regístralo en `src/sections/registry.ts` con el mismo `<nombre>`.

Las imágenes llegan como `{ url, alt, width, height }` y los enlaces internos como rutas relativas.

## API de WordPress

| Endpoint | Devuelve |
| --- | --- |
| `GET /wp-json/mq/v1/page?lang=es&path=empresa` | Página: título, SEO, secciones, traducciones |
| `GET /wp-json/mq/v1/global?lang=es` | Menús, ajustes globales y textos de la interfaz |
| `GET /wp-json/mq/v1/paths` | Todas las páginas publicadas (sitemap) |
