// Tests de comportamiento de la web Metalquimia (modo mock). Uso: node behaviour.mjs [filtro]
import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs";

const BASE = "http://localhost:3100";
const ONLY = process.argv[2];
const urls = fs.readFileSync(new URL("./urls.txt", import.meta.url), "utf8").trim().split("\n").map((l) => l.split(" "));
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
const results = [];

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };

async function newPage(viewport, { loader = false } = {}) {
  const ctx = await browser.newContext({ viewport });
  if (!loader) await ctx.addInitScript(() => sessionStorage.setItem("mq-loader", "1"));
  const page = await ctx.newPage();
  page.errors = [];
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    const t = m.text();
    if (/Failed to load resource/.test(t) && /404/.test(t)) return; // fuentes
    if (/woff2?|font/i.test(t)) return;
    page.errors.push(t.slice(0, 300));
  });
  page.on("pageerror", (e) => page.errors.push("pageerror: " + e.message.slice(0, 300)));
  return page;
}

async function test(name, fn) {
  if (ONLY && !name.includes(ONLY)) return;
  const pages = [];
  const open = async (vp, o) => {
    const p = await newPage(vp, o);
    pages.push(p);
    return p;
  };
  try {
    await fn(open);
    results.push([name, "PASS"]);
    console.log("PASS", name);
  } catch (e) {
    results.push([name, "FAIL", e.message.split("\n").slice(0, 4).join(" ")]);
    console.log("FAIL", name, "\n   ", e.message.split("\n").slice(0, 6).join("\n    "));
  } finally {
    for (const p of pages) await p.context().close();
  }
}

const go = (p, path) => p.goto(BASE + path, { waitUntil: "networkidle" });
const until = async (fn, msg, timeout = 4000) => {
  const t0 = Date.now();
  let last;
  while (Date.now() - t0 < timeout) {
    try {
      last = await fn();
      if (last) return last;
    } catch (e) {
      last = e;
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error(`timeout: ${msg} (${last instanceof Error ? last.message : JSON.stringify(last)})`);
};

// 1. Cabecera y mega menú ----------------------------------------------------------
await test("1a mega menu: abre cada panel (hover y click), Escape cierra", async (open) => {
  const p = await open(DESKTOP);
  await go(p, "/");
  const nav = p.locator("header nav").first();
  const buttons = nav.locator("button[aria-expanded]");
  const n = await buttons.count();
  assert.ok(n > 0, "no hay items con desplegable");
  for (let i = 0; i < n; i++) {
    const b = buttons.nth(i);
    // hover
    await b.hover();
    await until(async () => (await b.getAttribute("aria-expanded")) === "true", `hover abre item ${i}`);
    assert.ok(await nav.locator("> div a").count() > 0, `panel ${i} sin enlaces`);
    await p.keyboard.press("Escape");
    await until(async () => (await nav.locator("> div").count()) === 0, `Escape cierra item ${i}`);
    // click (con el ratón fuera, para no depender del hover)
    await p.mouse.move(700, 600);
    await p.waitForTimeout(250);
    await b.focus();
    await b.press("Enter");
    await until(async () => (await b.getAttribute("aria-expanded")) === "true", `click abre item ${i}`);
    await p.keyboard.press("Escape");
    await until(async () => (await nav.locator("> div").count()) === 0, `Escape cierra item ${i} (click)`);
  }
});

await test("1b mega menu: los enlaces del panel navegan y el panel se cierra", async (open) => {
  const p = await open(DESKTOP);
  await go(p, "/");
  const nav = p.locator("header nav").first();
  const buttons = nav.locator("button[aria-expanded]");
  const n = await buttons.count();
  for (let i = 0; i < n; i++) {
    await go(p, "/");
    await buttons.nth(i).click();
    await until(async () => (await nav.locator("> div a").count()) > 0, `panel ${i} (${await buttons.nth(i).textContent()}) abierto tras click`);
    const link = nav.locator("> div a").first();
    const href = await link.getAttribute("href");
    await link.click();
    await until(() => new URL(p.url()).pathname === href, `navega a ${href}`, 10000);
    await until(async () => (await nav.locator("> div").count()) === 0, "panel cerrado tras navegar");
  }
});

await test("1c cabecera: oscura/transparente sobre el hero de home y blanca tras scroll", async (open) => {
  const p = await open(DESKTOP);
  await go(p, "/");
  const header = p.locator("header");
  await until(async () => (await header.getAttribute("data-theme")) === "dark", "tema oscuro sobre el hero");
  await until(async () => /rgba\(\d+, \d+, \d+, 0\)|transparent/.test(await header.evaluate((h) => getComputedStyle(h).backgroundColor)), "fondo transparente");
  await p.mouse.wheel(0, 600);
  await until(async () => (await header.getAttribute("data-theme")) === "light", "pasa a claro tras scroll");
  await until(async () => (await header.evaluate((h) => getComputedStyle(h).backgroundColor)) === "rgb(255, 255, 255)", "fondo blanco tras scroll");
  await p.evaluate(() => window.scrollTo(0, 0));
  await until(async () => (await header.getAttribute("data-theme")) === "dark", "vuelve a oscuro arriba");
  // página sin hero → blanca desde el principio
  await go(p, "/contacto");
  await p.waitForTimeout(200);
  assert.equal(await header.getAttribute("data-theme"), "light");
});

// 2. Menú móvil --------------------------------------------------------------------
await test("2 menú móvil: abre, muestra items, cierra; un enlace navega y cierra", async (open) => {
  const p = await open(MOBILE);
  await go(p, "/");
  const toggle = p.locator("header div.xl\\:hidden > button");
  assert.equal(await p.locator("header nav").first().isVisible(), false, "el nav de escritorio no debería verse");
  await toggle.click();
  const menu = p.locator("[data-mobile-menu]");
  await menu.waitFor();
  assert.ok((await menu.locator("a").count()) > 5, "pocos enlaces en el menú");
  assert.equal(await p.evaluate(() => document.body.style.overflow), "hidden");
  await toggle.click();
  await until(async () => (await menu.count()) === 0, "cierra");
  assert.equal(await p.evaluate(() => document.body.style.overflow), "");
  await toggle.click();
  const link = menu.locator("ul a").nth(1);
  const href = await link.getAttribute("href");
  await link.click();
  await until(() => new URL(p.url()).pathname === href, `navega a ${href}`, 10000);
  await until(async () => (await menu.count()) === 0, "menú cerrado tras navegar");
  assert.equal(await p.evaluate(() => document.body.style.overflow), "", "scroll bloqueado tras navegar");
  // Enlace a la página actual: también debe cerrar
  await toggle.click();
  await menu.waitFor();
  await menu.locator(`a[href="${href}"]`).first().click();
  await until(async () => (await menu.count()) === 0, "menú cerrado tras pulsar enlace de la página actual");
});

// 3. Cambio de idioma --------------------------------------------------------------
await test("3 cambio de idioma es↔en mantiene la página traducida", async (open) => {
  const p = await open(DESKTOP);
  const byKey = {};
  for (const [k, l, u] of urls) (byKey[k] ??= {})[l] = u;
  for (const k of ["cooked", "home", "contact", "insight", "machine"]) {
    for (const [from, to] of [["es", "en"], ["en", "es"]]) {
      await go(p, byKey[k][from]);
      await p.locator("header button", { hasText: new RegExp(`^${from}$`, "i") }).first().click();
      await p.locator(`header a[hreflang="${to}"]`).first().click();
      await until(() => new URL(p.url()).pathname === byKey[k][to], `${k} ${from}→${to} (url ${p.url()})`, 10000);
    }
  }
  // en móvil, dentro del menú
  const m = await open(MOBILE);
  await go(m, "/soluciones/cocidos");
  await m.locator("header button[aria-expanded]").last().click();
  await m.locator("[data-mobile-menu] button", { hasText: /^es$/i }).click();
  await m.locator('[data-mobile-menu] a[hreflang="en"]').click();
  await until(() => new URL(m.url()).pathname === "/en/solutions/cooked", "móvil es→en", 10000);
});

// 4. Carruseles ----------------------------------------------------------------------
for (const vp of [DESKTOP, MOBILE]) {
  await test(`4 carruseles @${vp.width}: next/prev, prev deshabilitado al inicio, alineación`, async (open) => {
    const p = await open(vp);
    let checked = 0;
    for (const path of ["/", "/soluciones/cocidos", "/sobre-metalquimia"]) {
      await go(p, path);
      const carousels = p.locator('[aria-roledescription="carousel"]');
      const n = await carousels.count();
      for (let i = 0; i < n; i++) {
        const c = carousels.nth(i);
        await c.scrollIntoViewIfNeeded();
        const track = c.locator("> div").first();
        const prev = c.locator("[data-carousel-prev]");
        const next = c.locator("[data-carousel-next]");
        const info = await track.evaluate((t) => ({ sw: t.scrollWidth, cw: t.clientWidth }));
        const where = `${path} carrusel ${i}`;
        assert.equal(await prev.isDisabled(), true, `${where}: prev habilitado al inicio`);
        // alineación con el padding del contenedor
        const container = await p.evaluate(() => {
          const el = document.querySelector("main .site-container");
          const r = el.getBoundingClientRect();
          return r.left + parseFloat(getComputedStyle(el).paddingLeft);
        });
        const firstX = await track.locator("> *").first().evaluate((e) => e.getBoundingClientRect().left);
        assert.ok(firstX > 1, `${where}: primera tarjeta pegada a x=0`);
        assert.ok(Math.abs(firstX - container) <= 2, `${where}: primera tarjeta x=${firstX}, contenedor x=${container}`);
        if (info.sw <= info.cw + 4) {
          assert.equal(await next.isDisabled(), true, `${where}: next habilitado sin overflow`);
          continue;
        }
        await next.click();
        await until(async () => (await track.evaluate((t) => t.scrollLeft)) > 10, `${where}: next desplaza`);
        await until(async () => !(await prev.isDisabled()), `${where}: prev se habilita`);
        await p.waitForTimeout(700);
        const after = await track.evaluate((t) => t.scrollLeft);
        await prev.click();
        await until(async () => (await track.evaluate((t) => t.scrollLeft)) < after - 10, `${where}: prev desplaza`);
        await until(async () => await prev.isDisabled(), `${where}: prev deshabilitado al volver al inicio`);
        // tras volver, la primera tarjeta sigue alineada
        const back = await track.locator("> *").first().evaluate((e) => e.getBoundingClientRect().left);
        assert.ok(Math.abs(back - container) <= 2, `${where}: tras prev, primera tarjeta x=${back}, contenedor x=${container}`);
        // ir hasta el final: next se deshabilita
        for (let k = 0; k < 30 && !(await next.isDisabled()); k++) {
          await next.click();
          await p.waitForTimeout(450);
        }
        assert.equal(await next.isDisabled(), true, `${where}: next no se deshabilita al final`);
        checked++;
      }
    }
    assert.ok(checked > 0, "ningún carrusel con overflow");
  });
}

// 5. Testimonios ---------------------------------------------------------------------
await test("5 acordeón de testimonios (home, /partnership)", async (open) => {
  for (const vp of [DESKTOP, MOBILE]) {
    const p = await open(vp);
    for (const path of ["/", "/partnership"]) {
      await go(p, path);
      const btns = p.locator('[data-section="testimonial"] button[aria-expanded]');
      const n = await btns.count();
      assert.ok(n > 1, `${path}: menos de 2 testimonios`);
      assert.equal(await btns.nth(0).getAttribute("aria-expanded"), "true");
      for (let i = 1; i < n; i++) {
        await btns.nth(i).click();
        assert.equal(await btns.nth(i).getAttribute("aria-expanded"), "true");
        assert.equal(await btns.nth(i - 1).getAttribute("aria-expanded"), "false");
        const panel = p.locator("#" + (await btns.nth(i).getAttribute("aria-controls")).replace(/:/g, "\\:"));
        await until(async () => (await panel.boundingBox()).height > 40, `${path}: panel ${i} se expande`);
        const prevPanel = p.locator("#" + (await btns.nth(i - 1).getAttribute("aria-controls")).replace(/:/g, "\\:"));
        await until(async () => (await prevPanel.boundingBox()).height < 2, `${path}: panel ${i - 1} se pliega`);
      }
    }
  }
});

// 6. Products (home) ----------------------------------------------------------------
await test("6 products en home: la categoría cambia la palabra y los procesos", async (open) => {
  for (const vp of [DESKTOP, MOBILE]) {
    const p = await open(vp);
    await go(p, "/");
    const sec = p.locator('[data-section="products"]');
    const tabs = sec.locator('[role="tab"]');
    const n = await tabs.count();
    assert.ok(n > 1);
    const word = () => sec.locator("p[aria-hidden]").last().textContent();
    // En el seed todas las categorías tienen los mismos procesos: se comprueba que la lista se vuelve a pintar.
    const procs = () => sec.locator("ul").first().evaluate((u) => (u.dataset.mark ? "old" : ((u.dataset.mark = "1"), "new")));
    let w0 = await word();
    await procs();
    for (let i = 1; i < n; i++) {
      await tabs.nth(i).click();
      assert.equal(await tabs.nth(i).getAttribute("aria-selected"), "true");
      const w = await word();
      assert.notEqual(w, w0, `palabra no cambia en ${i}`);
      assert.ok(tabs.nth(i), "");
      assert.ok((await tabs.nth(i).textContent()).includes(w.trim()), `la palabra «${w}» no es la categoría`);
      assert.equal(await procs(), "new", `lista de procesos no se actualiza en ${i}`);
      w0 = w;
    }
  }
});

// 7. Filtros products_highlight ---------------------------------------------------
await test("7 products_highlight: filtro reduce tarjetas, ALL las restaura", async (open) => {
  for (const vp of [DESKTOP, MOBILE]) {
    const p = await open(vp);
    await go(p, "/soluciones/cocidos");
    const sec = p.locator('[data-section="products_highlight"]').first();
    const tabs = sec.locator('[role="tab"]');
    assert.ok((await tabs.count()) > 1, "sin filtros");
    const cards = sec.locator("ul.grid > li");
    const all = await cards.count();
    for (let i = 1; i < (await tabs.count()); i++) {
      await tabs.nth(i).click();
      const k = await cards.count();
      assert.ok(k > 0 && k < all, `filtro ${i}: ${k} de ${all}`);
      assert.ok(await cards.first().isVisible());
    }
    await tabs.nth(0).click();
    assert.equal(await cards.count(), all);
    assert.equal(await tabs.nth(0).getAttribute("aria-selected"), "true");
  }
});

// 8. Highlight ------------------------------------------------------------------------
await test("8 highlight: pills y overlay", async (open) => {
  let overlays = 0;
  for (const vp of [DESKTOP, MOBILE]) {
    const p = await open(vp);
    for (const path of ["/", "/soluciones/cocidos", "/partnership", "/servicios", "/inyeccion-de-carne/movistick-tinder"]) {
      await go(p, path);
      const sec = p.locator('[data-section="highlight"]').first();
      if (!(await sec.count())) continue;
      await sec.scrollIntoViewIfNeeded();
      const pills = sec.locator("div.absolute.z-10 > *");
      const n = await pills.count();
      assert.ok(n > 0, `${path}: sin pills`);
      // las pills quedan dentro de la sección
      const sb = await sec.boundingBox();
      for (let i = 0; i < n; i++) {
        const b = await pills.nth(i).boundingBox();
        assert.ok(b.x >= sb.x - 1 && b.x + b.width <= sb.x + sb.width + 1, `${path}@${vp.width}: pill ${i} fuera de la sección (${Math.round(b.x)}..${Math.round(b.x + b.width)})`);
      }
      const btn = sec.locator("button[aria-haspopup=dialog]");
      if (!(await btn.count())) continue;
      overlays++;
      await btn.first().evaluate((e) => e.scrollIntoView({ block: "center" }));
      await btn.first().click({ force: true });
      const dialog = sec.locator('[role="dialog"]');
      await dialog.waitFor();
      const db = await dialog.boundingBox();
      assert.ok(db.x >= 0 && db.x + db.width <= vp.width + 1, `${path}@${vp.width}: overlay fuera de pantalla`);
      await p.keyboard.press("Escape");
      await until(async () => (await dialog.count()) === 0, "Escape cierra overlay");
      await btn.first().evaluate((e) => e.scrollIntoView({ block: "center" }));
      await btn.first().click({ force: true });
      await dialog.locator('button[aria-label="Cerrar"]').click();
      await until(async () => (await dialog.count()) === 0, "botón cierra overlay");
      await btn.first().evaluate((e) => e.scrollIntoView({ block: "center" }));
      await btn.first().click({ force: true });
      await dialog.waitFor();
      // clic fuera
      await dialog.evaluate((e) => e.scrollIntoView({ block: "center" }));
      const pt = await dialog.evaluate((d) => {
        const r = d.getBoundingClientRect(), o = d.parentElement.getBoundingClientRect();
        return { x: o.left + 6, y: Math.min(r.bottom + 20, o.bottom - 4, innerHeight - 4) };
      });
      await p.mouse.click(pt.x, pt.y);
      await until(async () => (await dialog.count()) === 0, "clic fuera cierra overlay");
    }
  }
  console.log("    (overlays probados:", overlays, ")");
});

// 9. Mapa interactivo ------------------------------------------------------------
for (const vp of [DESKTOP, MOBILE]) {
  await test(`9 mapa interactivo @${vp.width}: pin, lista, búsqueda, cerrar`, async (open) => {
    const p = await open(vp);
    for (const path of ["/contacto", "/red-de-representantes", "/instalaciones"]) {
      await go(p, path);
      const sec = p.locator('[data-section="interactive_map"]');
      await sec.scrollIntoViewIfNeeded();
      const pins = sec.locator("button[aria-pressed]");
      const dialog = sec.locator('[role="dialog"]');
      const np = await pins.count();
      if (np) {
        // pins tapados por otro pin (misma ubicación): no se pueden pulsar
        const covered = await pins.evaluateAll((bs) =>
          bs.filter((b) => { const r = b.getBoundingClientRect(); return !b.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)); }).map((b) => b.getAttribute("aria-label")),
        );
        if (covered.length) console.log(`    ${path}@${vp.width}: pins tapados por otro pin: ${covered.join(", ")}`);
        const freeIdx = [];
        for (let i = 0; i < np; i++) if (!covered.includes(await pins.nth(i).getAttribute("aria-label"))) freeIdx.push(i);
        assert.ok(freeIdx.length > 0, `${path}: ningún pin pulsable`);
        const name = await pins.nth(freeIdx[0]).getAttribute("aria-label");
        await pins.nth(freeIdx[0]).click();
        await dialog.waitFor();
        assert.equal(await dialog.getAttribute("aria-label"), name);
        const db = await dialog.boundingBox();
        assert.ok(db.x >= -1 && db.x + db.width <= vp.width + 1, `${path}: popup fuera de pantalla x=${db.x} w=${db.width}`);
        assert.ok(await dialog.locator('button[aria-label="Cerrar"]').isVisible(), `${path}: botón cerrar no visible`);
        await dialog.locator('button[aria-label="Cerrar"]').click();
        await until(async () => (await dialog.count()) === 0, `${path}: cerrar`);
        // todos los pins abren su popup y quedan en pantalla
        for (const i of freeIdx) {
          await pins.nth(i).click();
          await dialog.waitFor();
          const b = await dialog.boundingBox();
          const mb = await sec.boundingBox();
          assert.ok(b.x >= mb.x - 1 && b.x + b.width <= mb.x + mb.width + 1 && b.x + b.width <= vp.width + 1, `${path}: popup del pin ${i} (${await pins.nth(i).getAttribute("aria-label")}) sale del mapa x=${Math.round(b.x)}..${Math.round(b.x + b.width)}`);
          await p.keyboard.press("Escape");
          await until(async () => (await dialog.count()) === 0, `${path}: Escape cierra`);
        }
      }
      const search = sec.locator('input[type="search"]');
      if (await search.count()) {
        const items = sec.locator('ul [role="button"]');
        const all = await items.count();
        assert.ok(all > 0, `${path}: lista vacía`);
        const firstName = (await items.first().locator("p").first().textContent()).trim();
        await items.first().click();
        await dialog.waitFor();
        assert.equal(await dialog.getAttribute("aria-label"), firstName);
        await dialog.locator('button[aria-label="Cerrar"]').click();
        await until(async () => (await dialog.count()) === 0, `${path}: cerrar desde lista`);
        if (all > 1) {
          const lastName = (await items.last().locator("p").first().textContent()).trim();
          await search.fill(lastName);
          await until(async () => (await items.count()) < all && (await items.count()) > 0, `${path}: búsqueda filtra (${lastName})`);
          await search.fill("zzzzqqq");
          await until(async () => (await items.count()) === 0, `${path}: búsqueda sin resultados`);
          await search.fill("");
          await until(async () => (await items.count()) === all, `${path}: búsqueda vacía restaura`);
        }
      } else if (!np) throw new Error(`${path}: ni pins ni lista`);
    }
  });
}

// 10. Formulario de contacto ---------------------------------------------------
await test("10 formulario de contacto: errores, envío ok, botón a #form", async (open) => {
  for (const vp of [DESKTOP, MOBILE]) {
    const p = await open(vp);
    await go(p, "/contacto");
    const btn = p.locator('a[href="#form"]').first();
    await btn.click();
    await until(async () => {
      const top = await p.locator("#form").evaluate((e) => e.getBoundingClientRect().top);
      return top >= -2 && top < 150;
    }, "scroll a #form");
    // el inicio del formulario no queda tapado por la cabecera fija
    const headerH = await p.locator("header").evaluate((h) => h.getBoundingClientRect().bottom);
    const formTop = await p.locator("#form form").evaluate((e) => e.getBoundingClientRect().top);
    assert.ok(formTop >= headerH, `formulario tapado por la cabecera (${formTop} < ${headerH})`);

    const form = p.locator("#form form");
    await form.locator('button[type="submit"]').click();
    const errs = await form.locator("p.text-red").count();
    assert.ok(errs >= 7, `errores mostrados: ${errs}`);
    assert.equal(await p.evaluate(() => document.activeElement?.id), "cf-name");

    await p.fill("#cf-name", "Test");
    await p.fill("#cf-company", "ACME");
    const sel = p.locator("#cf-country");
    if ((await sel.evaluate((e) => e.tagName)) === "SELECT") await sel.selectOption({ index: 1 });
    else await sel.fill("España");
    await p.fill("#cf-phone", "600000000");
    await p.fill("#cf-email", "bad@");
    await p.fill("#cf-message", "Hola");
    await p.check("#cf-terms");
    await form.locator('button[type="submit"]').click();
    assert.ok(await p.locator("#cf-email-error").isVisible(), "email inválido aceptado");
    await p.fill("#cf-email", "test@example.com");
    const [req] = await Promise.all([
      p.waitForRequest((r) => r.url().endsWith("/api/contact") && r.method() === "POST"),
      form.locator('button[type="submit"]').click(),
    ]);
    const body = JSON.parse(req.postData());
    assert.equal(body.email, "test@example.com");
    assert.equal(body.terms, true);
    await p.locator('#form [role="status"]').waitFor();
  }
});

// 11. Newsletter --------------------------------------------------------------------
await test("11 newsletter del pie: email inválido rechazado, válido + términos → éxito", async (open) => {
  for (const vp of [DESKTOP, MOBILE]) {
    const p = await open(vp);
    await go(p, "/en");
    const form = p.locator("form[data-newsletter]");
    await form.scrollIntoViewIfNeeded();
    let posted = 0;
    p.on("request", (r) => r.url().endsWith("/api/newsletter") && posted++);
    await form.locator("input[type=email]").fill("not-an-email");
    await form.locator("input[type=checkbox]").check();
    await form.locator("button[type=submit]").click();
    await p.waitForTimeout(300);
    assert.equal(posted, 0, "se envió un email inválido");
    assert.equal(await form.locator("input[type=email]").evaluate((e) => e.validity.valid), false);
    // válido sin términos
    await form.locator("input[type=email]").fill("a@b.co");
    await form.locator("input[type=checkbox]").uncheck();
    await form.locator("button[type=submit]").click();
    await p.waitForTimeout(300);
    assert.equal(posted, 0, "se envió sin aceptar términos");
    await form.locator("input[type=checkbox]").check();
    await form.locator("button[type=submit]").click();
    await p.locator('footer [role="status"]').waitFor();
    assert.equal(posted, 1);
  }
});

// 12. Vídeo modal ---------------------------------------------------------------------
await test("12 botón de vídeo modal: abre, cierra, Escape", async (open) => {
  let found = 0;
  for (const vp of [DESKTOP, MOBILE]) {
    const p = await open(vp);
    for (const path of ["/mq-innovation-center", "/proteinas-alternativas"]) {
      await go(p, path);
      const btn = p.locator('[data-section="full_screen_media"] button[aria-haspopup="dialog"]');
      if (!(await btn.count())) continue;
      found++;
      await btn.scrollIntoViewIfNeeded();
      await btn.click();
      const dialog = p.locator('body > [role="dialog"]');
      await dialog.waitFor();
      assert.equal(await p.evaluate(() => document.body.style.overflow), "hidden");
      assert.equal(await p.evaluate(() => document.activeElement?.getAttribute("aria-label")), "Cerrar vídeo");
      await dialog.locator('button[aria-label="Cerrar vídeo"]').click();
      await until(async () => (await dialog.count()) === 0, "botón cierra");
      assert.equal(await p.evaluate(() => document.body.style.overflow), "");
      await btn.click();
      await dialog.waitFor();
      await p.keyboard.press("Escape");
      await until(async () => (await dialog.count()) === 0, "Escape cierra");
      await btn.click();
      await dialog.waitFor();
      await p.mouse.click(5, vp.height - 5);
      await until(async () => (await dialog.count()) === 0, "clic fuera cierra");
      assert.equal(await p.evaluate(() => document.body.style.overflow), "");
    }
  }
  assert.ok(found > 0, "no hay botón de vídeo");
});

// 13. Loader --------------------------------------------------------------------------
await test("13 loader: primera visita sí, segunda navegación y recarga no", async (open) => {
  const p = await open(DESKTOP, { loader: true });
  await p.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(600);
  assert.ok(await p.locator("[data-loader]").isVisible(), "el loader no aparece en la primera visita");
  await until(async () => (await p.locator("[data-loader]").count()) === 0, "el loader termina", 8000);
  assert.equal(await p.evaluate(() => document.documentElement.style.overflow), "");
  // navegación cliente
  await p.locator("footer a[href^='/']").first().click();
  await p.waitForLoadState("networkidle");
  assert.equal(await p.locator("[data-loader]").count(), 0, "loader tras navegar");
  // navegación completa
  await go(p, "/contacto");
  await p.waitForTimeout(400);
  assert.equal(await p.locator("[data-loader]").count(), 0, "loader en la segunda carga");
  await p.reload({ waitUntil: "networkidle" });
  await p.waitForTimeout(400);
  assert.equal(await p.locator("[data-loader]").count(), 0, "loader tras recargar");
});

// 14. Rejilla de recursos -------------------------------------------------------------
await test("14 insights grid: filtro por categoría y cargar más", async (open) => {
  for (const vp of [DESKTOP, MOBILE]) {
    const p = await open(vp);
    await go(p, "/recursos");
    const sec = p.locator('[data-section="insights_grid"]');
    const cards = sec.locator("ul.grid > li");
    const tabs = sec.locator('[role="tab"]');
    const initial = await cards.count();
    const more = sec.locator("ul.grid ~ div button");
    assert.ok(await more.count(), "no hay botón cargar más");
    assert.equal(initial, 9);
    await more.click();
    await until(async () => (await cards.count()) > initial, "cargar más añade tarjetas");
    const total = await cards.count();
    assert.ok(tabs.count() , "");
    assert.ok((await tabs.count()) > 1, "sin filtros");
    for (let i = 1; i < (await tabs.count()); i++) {
      await tabs.nth(i).click();
      const label = (await tabs.nth(i).textContent()).trim();
      const k = await cards.count();
      assert.ok(k > 0 && k < Math.max(total, 10), `filtro ${label}: ${k}`);
      const cats = await cards.locator("span.text-red").allTextContents();
      assert.ok(cats.every((c) => c.trim() === label), `filtro ${label} muestra otras categorías: ${cats}`);
    }
    await tabs.nth(0).click();
    assert.equal(await cards.count(), 9, "ALL vuelve a 9");
  }
});

// 15. Errores de consola y overflow horizontal ---------------------------------------
for (const vp of [MOBILE, DESKTOP]) {
  await test(`15 sin errores de consola ni overflow horizontal @${vp.width}`, async (open) => {
    const p = await open(vp);
    const problems = [];
    for (const [, , path] of urls) {
      p.errors.length = 0;
      await go(p, path);
      await p.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
        window.scrollTo(0, 0);
      });
      await p.waitForTimeout(300);
      const ov = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
      if (ov.sw > ov.cw) problems.push(`${path}: overflow ${ov.sw} > ${ov.cw}`);
      if (p.errors.length) problems.push(`${path}: ${[...new Set(p.errors)].join(" | ")}`);
    }
    assert.equal(problems.length, 0, problems.join("\n"));
  });
}

await browser.close();
console.log("\n==== Resumen");
for (const [n, s, m] of results) console.log(s.padEnd(5), n, m ? "— " + m : "");
