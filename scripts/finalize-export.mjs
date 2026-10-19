import { writeFile, readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
const origins = JSON.parse(
  await readFile(
    new URL("../src/content/origins.json", import.meta.url),
    "utf8",
  ),
);
const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || origins.canonicalOrigin;
if (new URL(origin).protocol !== "https:" || new URL(origin).pathname !== "/")
  throw new Error("Canonical origin must be an HTTPS origin without a path.");
const preview =
  !!process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== "main";
await writeFile(
  "out/_headers",
  (await readFile("public/_headers", "utf8")) +
    (preview ? "\n/*\n  X-Robots-Tag: noindex, nofollow\n" : ""),
);
let revision = process.env.CF_PAGES_COMMIT_SHA || null;
if (!revision) {
  try {
    revision = execFileSync(
      "git",
      ["-c", `safe.directory=${process.cwd()}`, "rev-parse", "HEAD"],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
  } catch {
    /* An initial export can predate the first commit. */
  }
}
await writeFile(
  "out/build-info.json",
  JSON.stringify({
    revision,
    canonicalOrigin: origin,
    freeOrigin: process.env.NEXT_PUBLIC_FREE_ORIGIN || origins.freeOrigin,
    preview,
  }) + "\n",
);
await readFile("out/404.html");
console.log(
  `Static export finalized. ${preview ? "Preview: noindex." : "Production: indexable."}`,
);
