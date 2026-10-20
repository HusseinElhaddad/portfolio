import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  workers: 2,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.BASE_URL || "http://127.0.0.1:4173",
    browserName: "chromium",
    headless: true,
    launchOptions: process.env.CHROME_PATH
      ? { executablePath: process.env.CHROME_PATH, args: ["--no-sandbox"] }
      : {},
  },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npm run preview",
        url: "http://127.0.0.1:4173",
        reuseExistingServer: !process.env.CI,
      },
});
