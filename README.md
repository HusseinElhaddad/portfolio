# Hussein Elhaddad — Signal → System

A static AI engineering portfolio built around reliable data, contextual AI, and explainable analytics. Seven pages, three interactive local demonstrations, a reconciled downloadable CV, and system/light/dark themes.

Next.js App Router + React + TypeScript + CSS Modules + a small Motion for React interaction. All essential copy is exported HTML. There is no runtime server, database, contact backend, analytics, inference API, or third-party browser script.

## Local development

Use Node **24.22.0** (LTS), with npm **11.19.1** as bundled with that runtime. `.nvmrc`, `.node-version`, `engines` and the lockfile record the runtime/package choices.

```sh
nvm install
nvm use
npm ci
npm run dev
```

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

The exported preview is at `http://127.0.0.1:4173`. It serves `out/`, redirects directory paths to their slash form, and returns real 404s; it does not use `next start`. Set `PORT` to change the port.

```sh
npx playwright install chromium
npm run test:e2e
```

To use an installed Chrome for tests, set `CHROME_PATH=/path/to/google-chrome`. Tests start the exported preview automatically. Build before local browser checks. Set `BASE_URL=https://husseinelhaddad.pages.dev` (or the custom origin) to run the same suite against a deployed host without starting a local server. Full-page screenshots can be produced while the preview is running with `node scripts/screenshots.mjs`; generated QA artifacts remain gitignored.

## Structure and editing

| Location                    | Edit here                                                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `src/content/site.ts`       | Name, profiles, public email, CV URL, metadata helper; canonical/free defaults are in `src/content/origins.json` |
| `src/content/projects.ts`   | Featured `projects` and compact `moreProjects`: summaries, status, role, team stack and verified repository links |
| `src/app/page.tsx`          | Homepage narrative, experience preview and Person/WebSite data                                                   |
| `src/app/work/*/page.tsx`   | Full case study decisions, contributions, evaluation and boundaries                                              |
| `src/app/about/page.tsx`    | Skills in context, experience, separate leadership roles, education, credentials and languages                   |
| `src/app/contact/page.tsx`  | Visible address, mail link, profiles; copy behavior is in `CopyEmail.tsx`                                        |
| `src/content/demo-logic.ts` | Synthetic fixture provenance, history transitions, rates and theme validation                                    |
| `src/components/demos/`     | Three browser-only demonstrations and their text/table equivalents                                               |
| `src/components/projects/`  | Authored SVG visuals and reusable case study layout                                                              |
| `src/styles/globals.css`    | Semantic light/dark tokens, local fonts, global typography, focus and reduced motion                             |
| `public/`                   | Public CV, social previews, icons, fonts/licenses and Pages headers; the host redirect is a Cloudflare zone rule |
| `scripts/`                  | Static preview, media generation and export finalization                                                         |
| `tests/`                    | Stateful logic and production-export browser/a11y/reflow checks                                                  |
| `docs/`                     | Content evidence, implementation checklist, QA, hosting and domain transition                                    |

Keep project roles and team architecture separate. When changing status, verify current evidence; do not imply completed end-to-end integration from implemented modules alone. Update `docs/CONTENT_EVIDENCE.md` when introducing claims. Avoid time-sensitive availability statements without checking them.

Replace the CV at `public/Hussein_Elhaddad_AI_Engineer_CV.pdf` with a genuinely public-ready, reconciled PDF. Preserve the private original outside this repository. Render and inspect every new version. Do not publish original project source archives, datasets, model weights or private participant material.

Visual assets are original semantic SVG/HTML. `npm run media` regenerates route-specific PNG social previews and favicons, and copies the Latin variable WOFF2 fonts plus licenses from the pinned Fontsource packages. Review output after editing media copy. Fontsource Inter and Space Grotesk use SIL Open Font License 1.1; retained licenses are in `public/fonts/`. UI marks use authored SVG/text, with no third-party icon set. The corrected PDF uses Liberation Serif on changed lines, under SIL OFL; see `docs/LICENSES.md`.

## Deployment and cost

Target: Cloudflare **Pages Free**, Git-connected to this repository, production branch `main`, `npm run build`, output `out`. See [deployment guide](docs/DEPLOYMENT.md) for observed state, exact configuration, preview indexing, DNS, HTTPS, release verification and rollback. GitHub Actions runs a clean install, lint, types, tests, export and browser suite on public runners. A workflow is not an enforced merge gate unless separately configured.

The canonical origin defaults to `https://husseinelhaddad.dev`; the assigned free production origin is `https://husseinelhaddad.pages.dev` (live verification status is recorded in the deployment guide). Environment variables can override `NEXT_PUBLIC_SITE_ORIGIN` and `NEXT_PUBLIC_FREE_ORIGIN`. Git branch previews receive `X-Robots-Tag: noindex, nofollow`; production remains indexable. No broad redirect sends the free production hostname to the custom domain.

Required current hosting/API spending is **$0 within the selected free terms**. There are no paid APIs, Workers/Functions, R2, analytics, or expiring student benefits. A free plan is not a perpetual pricing guarantee. Keeping the custom domain after its registration expires requires paid renewal; transferring registrars does not remove that annual cost.

The owner-supplied domain expiry is **19 October 2027**. Begin the documented [free-address transition](docs/DOMAIN_MIGRATION.md) on **20 August 2027**. No reminder or recurring automation has been created.

## Evidence and verification

- [Content evidence and exact public CV corrections](docs/CONTENT_EVIDENCE.md)
- [Observed quality checks and limitations](docs/QA.md)
- [Implementation checklist](docs/IMPLEMENTATION_CHECKLIST.md)
- [Hosting, releases and rollback](docs/DEPLOYMENT.md)
- [Domain transition](docs/DOMAIN_MIGRATION.md)

Official implementation references: [Next static export](https://nextjs.org/docs/app/guides/static-exports), [Cloudflare static Next.js](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/), [Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/), [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/), [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/), [Motion accessibility](https://motion.dev/docs/react-accessibility).
