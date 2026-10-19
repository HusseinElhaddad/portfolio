import origins from "../src/content/origins.json" with { type: "json" };
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const paths = [
  "/",
  "/work/",
  "/work/olist/",
  "/work/fpl-intel/",
  "/work/sawakli-ai/",
  "/about/",
  "/contact/",
];
for (const path of paths) {
  test(`export, metadata, links and accessibility ${path}`, async ({
    page,
    request,
  }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Hussein Elhaddad/);
    await page.locator("body").evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
      "href",
      `${origins.canonicalOrigin}${path}`,
    );
    const image = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect((await request.get(new URL(image!).pathname)).status()).toBe(200);
    for (const theme of ["light", "dark"]) {
      await page
        .getByRole("combobox", { name: "Color theme" })
        .selectOption(theme);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        result.violations,
        JSON.stringify(
          result.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
        ),
      ).toEqual([]);
    }
    const targets = await page
      .locator('a[href^="/"]')
      .evaluateAll((links) => [
        ...new Set(links.map((l) => l.getAttribute("href")!.split("#")[0])),
      ]);
    for (const url of targets)
      expect((await request.get(url)).status(), url).toBe(200);
  });
}
test("all pages reflow across specified widths and themes", async ({
  page,
}) => {
  for (const width of [320, 375, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ["light", "dark"]) {
      await page.addInitScript(
        (t) => localStorage.setItem("portfolio-theme", t),
        theme,
      );
      for (const path of paths) {
        await page.goto(path);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
          `${path} ${width} ${theme}`,
        ).toBe(true);
      }
    }
  }
});
test("history transitions and reset", async ({ page }) => {
  await page.goto("/work/olist/");
  await page.getByRole("button", { name: /Unchanged snapshot/ }).click();
  await expect(
    page.getByRole("cell", { name: "Current", exact: true }),
  ).toHaveCount(1);
  await expect(
    page.getByRole("cell", { name: "Historical", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: /Changed attributes/ }).click();
  await expect(
    page.getByRole("cell", { name: "Historical", exact: true }),
  ).toHaveCount(1);
  await expect(
    page.getByRole("cell", { name: "Office", exact: true }),
  ).toHaveCount(1);
  await page.getByRole("button", { name: "Reset example" }).click();
  await expect(
    page.getByRole("cell", { name: "Office", exact: true }),
  ).toHaveCount(0);
});
test("retrieval handles disagreement and empty evidence, then resets", async ({
  page,
}) => {
  await page.goto("/work/fpl-intel/");
  const select = page.getByLabel("Choose a question");
  await select.selectOption("1");
  await expect(
    page.getByText("The available context conflicts.", { exact: false }),
  ).toBeVisible();
  await select.selectOption("2");
  await expect(
    page.getByText("No relevant news evidence is included in this fixture."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset example" }).click();
  await expect(select).toHaveValue("0");
});
test("campaign missing data remains unavailable and resets", async ({
  page,
}) => {
  await page.goto("/work/sawakli-ai/");
  await page.getByRole("button", { name: /Day 04/ }).click();
  await expect(page.getByText("Unavailable", { exact: true })).toHaveCount(2);
  await page.getByRole("button", { name: "Reset example" }).click();
  await expect(page.getByRole("button", { name: /Day 01/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});
test("theme persists, system follows media, storage failure still renders", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  expect(
    await page
      .locator("body")
      .evaluate((e) => getComputedStyle(e).backgroundColor),
  ).toBe("rgb(13, 17, 23)");
  await page.getByLabel("Color theme").selectOption("light");
  await page.reload();
  await expect(page.getByLabel("Color theme")).toHaveValue("light");
  expect(
    await page
      .locator("body")
      .evaluate((e) => getComputedStyle(e).backgroundColor),
  ).toBe("rgb(246, 243, 236)");
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Unavailable");
      },
    });
  });
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByLabel("Color theme").selectOption("light");
  expect(
    await page
      .locator("body")
      .evaluate((e) => getComputedStyle(e).backgroundColor),
  ).toBe("rgb(246, 243, 236)");
});
test("mobile menu keyboard, Escape, navigation, back and forward", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByText("Skip to content")).toBeFocused();
  const menu = page.locator("button[aria-controls=main-navigation]");
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Work", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  await page.goBack();
  await expect(page).toHaveURL(/4173\/$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/about\/$/);
});
test("email copy failure and real CV download", async ({ page, request }) => {
  await page.goto("/contact/");
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("denied")) },
      configurable: true,
    }),
  );
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("status")).toContainText("Could not copy");
  const cv = await request.get("/Hussein_Elhaddad_AI_Engineer_CV.pdf");
  expect(cv.status()).toBe(200);
  expect((await cv.body()).subarray(0, 4).toString()).toBe("%PDF");
});
test("missing path returns an actual 404 and sitemap is canonical", async ({
  request,
}) => {
  const response = await request.get("/this-path-does-not-exist/");
  expect(response.status()).toBe(404);
  expect(await response.text()).toContain("Signal not found");
  const sitemap = await request.get("/sitemap.xml");
  for (const p of paths)
    expect(await sitemap.text()).toContain(`${origins.canonicalOrigin}${p}`);
});
test("reduced motion and no JavaScript preserve essential information", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  for (const path of paths) {
    await page.goto(`http://127.0.0.1:4173${path}`);
    await expect(page.locator("h1")).toBeVisible();
  }
  await context.close();
});

test("system selectors reveal context and link to the project chapter", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Contextual AI/ }).click();
  await expect(
    page.getByRole("button", { name: /Contextual AI/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByText(
      "Connect player statistics with retrieved evidence, and make uncertainty visible.",
    ),
  ).toBeVisible();
  await page.getByRole("link", { name: /Explore FPL-Intel/ }).click();
  await expect(page).toHaveURL(/#fpl-intel$/);
});

test("copy success announces completion", async ({ page }) => {
  await page.goto("/contact/");
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async (text: string) => {
          if (text !== "hussein.elhaddad@outlook.com")
            throw new Error("Wrong address");
        },
      },
      configurable: true,
    }),
  );
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("status")).toHaveText("Email copied.");
});

test("mobile routes remain accessible in both themes and reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of paths) {
    await page.goto(path);
    for (const theme of ["light", "dark"]) {
      await page.evaluate((t) => {
        document.documentElement.dataset.theme = t;
      }, theme);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(
        results.violations,
        `${path} ${theme}: ${JSON.stringify(results.violations.map((v) => v.id))}`,
      ).toEqual([]);
    }
  }
});

test("all demos work without external network requests", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:4173"))
      external.push(request.url());
  });
  for (const path of [
    "/work/olist/",
    "/work/fpl-intel/",
    "/work/sawakli-ai/",
  ]) {
    await page.goto(path);
    await page.getByRole("button", { name: "Reset example" }).click();
  }
  expect(external).toEqual([]);
});

test("exported pages produce no browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  for (const path of paths) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
  }
  expect(errors).toEqual([]);
});
