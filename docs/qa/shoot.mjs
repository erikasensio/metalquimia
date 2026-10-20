import { chromium } from "playwright";
import fs from "node:fs";
const [,, widthsArg = "1440,390", langs = "es", only = ""] = process.argv;
const widths = widthsArg.split(",").map(Number);
const urls = fs.readFileSync("urls.txt", "utf8").trim().split("\n").map((l) => l.split(" ")).filter(([k, l]) => langs.split(",").includes(l) && (!only || only.split(",").includes(k)));
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
const report = [];
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 800 ? 844 : 900 } });
  await ctx.addInitScript(() => { try { sessionStorage.setItem("mq-loader", "1"); } catch {} });
  const page = await ctx.newPage();
  let errs = [];
  page.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 300)));
  page.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 300)));
  for (const [key, lang, url] of urls) {
    errs = [];
    await page.goto("http://localhost:3100" + url, { waitUntil: "networkidle" });
    // recorre la página para disparar las animaciones de scroll
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 600) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(60); }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(700);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    await page.screenshot({ path: `shots/${key}-${lang}-${w}.png`, fullPage: true });
    report.push({ key, lang, w, overflow, errs: [...new Set(errs)] });
  }
  await ctx.close();
}
await browser.close();
for (const r of report) if (r.overflow > 0 || r.errs.length) console.log(JSON.stringify(r));
console.log("done", report.length);
