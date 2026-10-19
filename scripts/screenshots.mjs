import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  args: ["--no-sandbox"],
});
for (const [label, width] of [
  ["mobile", 375],
  ["desktop", 1440],
]) {
  for (const theme of ["light", "dark"]) {
    const context = await browser.newContext({
      viewport: { width, height: label === "mobile" ? 812 : 1000 },
      deviceScaleFactor: 1,
    });
    await context.addInitScript(
      (t) => localStorage.setItem("portfolio-theme", t),
      theme,
    );
    for (const [name, path] of [
      ["home", "/"],
      ["work", "/work/"],
      ["olist", "/work/olist/"],
      ["fpl-intel", "/work/fpl-intel/"],
      ["sawakli-ai", "/work/sawakli-ai/"],
      ["about", "/about/"],
      ["contact", "/contact/"],
    ]) {
      const page = await context.newPage();
      await page.goto(`http://127.0.0.1:4173${path}`);
      await page.evaluate(() => document.fonts.ready);
      await mkdir("qa/screenshots", { recursive: true });
      await page.screenshot({
        path: `qa/screenshots/${name}-${label}-${theme}.png`,
        fullPage: true,
      });
      await page.close();
    }
    await context.close();
  }
}
await browser.close();
console.log(
  "Saved 28 full-page screenshots: every route, desktop/mobile, both themes.",
);
