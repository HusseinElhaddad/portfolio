import { mkdir, copyFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
await mkdir("public/fonts", { recursive: true });
await mkdir("public/social", { recursive: true });
for (const [name, dest] of [
  ["inter", "inter"],
  ["space-grotesk", "space-grotesk"],
]) {
  await copyFile(
    `node_modules/@fontsource-variable/${name}/files/${name}-latin-wght-normal.woff2`,
    `public/fonts/${dest}-latin.woff2`,
  );
  await copyFile(
    `node_modules/@fontsource-variable/${name}/LICENSE`,
    `public/fonts/${dest}-LICENSE.txt`,
  );
}
const previews = [
  [
    "home",
    "From raw data to",
    "useful AI systems.",
    "AI ENGINEER / APPLIED ML · RAG · DATA SYSTEMS",
  ],
  [
    "work",
    "The data. The decisions.",
    "The work.",
    "SELECTED ENGINEERING / THREE CASE STUDIES",
  ],
  [
    "olist",
    "Trust begins before",
    "the dashboard.",
    "OLIST / PYTHON · SQL SERVER · ETL",
  ],
  [
    "fpl-intel",
    "Give the numbers",
    "their context.",
    "FPL-INTEL / RAG · APPLICATION INTEGRATION",
  ],
  [
    "sawakli-ai",
    "An insight should",
    "explain itself.",
    "SAWAKLI AI / ANALYTICAL FOUNDATIONS · IN DEVELOPMENT",
  ],
  [
    "about",
    "Build carefully.",
    "Learn together.",
    "EXPERIENCE / ENGINEERING · LEADERSHIP · MENTORING",
  ],
  [
    "contact",
    "Let’s start with",
    "a good problem.",
    "CONTACT / HUSSEIN.ELHADDAD@OUTLOOK.COM",
  ],
];
for (const [slug, l1, l2, label] of previews) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#0d1117"/><g fill="none" stroke="#2c3540"><path d="M72 112H1128M72 524H1128"/><path d="M950 200H1040L1100 270V400M880 270H1120M900 360H980L1040 300"/></g><g font-family="sans-serif"><text x="72" y="75" fill="#f5f2eb" font-size="25">h<tspan fill="#f0b44d">.</tspan>  Hussein Elhaddad</text><text x="72" y="175" fill="#b1bac4" font-size="14" letter-spacing="2">${label}</text><text x="68" y="300" fill="#f5f2eb" font-size="70" letter-spacing="-3">${l1}</text><text x="68" y="390" fill="#f0b44d" font-size="70" letter-spacing="-3">${l2}</text><text x="72" y="573" fill="#b1bac4" font-size="18">SIGNAL → SYSTEM</text><text x="1128" y="573" fill="#62d2c3" font-size="18" text-anchor="end">HUSSEIN ELHADDAD / PORTFOLIO</text></g><circle cx="1040" cy="270" r="32" fill="#151b23" stroke="#62d2c3" stroke-width="2"/><path d="M1026 270H1054M1040 256V284" stroke="#f0b44d" stroke-width="3"/></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(`public/social/${slug}.png`);
}
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><rect width="180" height="180" rx="36" fill="#0d1117"/><path d="M48 40V137M48 94C48 59 112 59 112 94V137" fill="none" stroke="#f5f2eb" stroke-width="16"/><circle cx="141" cy="133" r="10" fill="#f0b44d"/></svg>`;
await writeFile("public/favicon.svg", favicon);
await sharp(Buffer.from(favicon)).png().toFile("public/apple-touch-icon.png");
const png = await sharp(Buffer.from(favicon)).resize(32, 32).png().toBuffer();
const ico = Buffer.alloc(22);
ico.writeUInt16LE(1, 2);
ico.writeUInt16LE(1, 4);
ico[6] = 32;
ico[7] = 32;
ico.writeUInt16LE(1, 10);
ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(png.length, 14);
ico.writeUInt32LE(22, 18);
await writeFile("public/favicon.ico", Buffer.concat([ico, png]));
console.log(
  "Generated 7 social previews, 3 favicon formats, and licensed local fonts.",
);
