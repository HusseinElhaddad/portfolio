# Observed release verification

Verified **19–20 October 2026**. These are executed portfolio checks, independent of historical evidence from the featured projects. Original source projects remained read-only and were not executed.

## Release and environment

The tested application is main revision `ffebac9162604a03ed31f5374358562459db998c`, merged through [PR #1](https://github.com/HusseinElhaddad/portfolio/pull/1). [GitHub Actions run 39433577130](https://github.com/HusseinElhaddad/portfolio/actions/runs/39433577130) passed. Cloudflare production deployment `42538ff0-f2f2-4161-b65d-491aef725d91` succeeded from **github:push** at 13:49:55 UTC on 20 October. Both production hosts' build information matched the revision and reported `preview: false`. The final handover release changes documentation and non-overlapping cache rules; application components, CSS and content remain identical to the measured release.

- Linux; Node **24.22.0 LTS**, npm **11.19.1**.
- Next.js **16.4.2**, React **19.3.1**, TypeScript **5.9.3**, Motion **14.4.0**.
- ESLint **10.13.0**, TypeScript ESLint **8.72.0**. Supported flat configuration; no security advisory suppressed.
- Playwright **1.64.1**, axe-core **4.14.0**, Google Chrome **155.0.8059.84**, headless.
- Lighthouse **13.5.0**, mobile defaults: simulated throttling, 412 × 823 CSS pixels, CPU slowdown 4×, 1,638.4 Kbps and 150ms simulated network. Runs were sequential, separate from browser-suite execution.
- Local production export: `http://127.0.0.1:4173/`, gzip text compression. No development-server scores or field INP claims.

## Executed release checks

| Check | Result | Observed evidence |
| --- | --- | --- |
| `npm ci` and audit | PASS | Clean lockfile install, 242 packages added / 243 audited; zero vulnerabilities. |
| `npm run lint` | PASS | Supported ESLint invocation, no errors. |
| `npm run typecheck` | PASS | Strict TypeScript. |
| `npm test` | PASS | Four behavioral tests: history unchanged/change, reset purity, missing denominator/valid zero, theme fallback. |
| `npm run build` | PASS | Seven required HTML routes, metadata files and root 404; no runtime server/Functions. |
| Actual preview browser suite | PASS | All 21 tests passed, 42.6s; deployed branch preview, not localhost. |
| Actual free production browser suite | PASS | All 21 tests passed, 48.2s on `https://husseinelhaddad.pages.dev`. |
| Actual custom production browser suite | PASS after repair | Full run: 19 pass, 2 fail due provider analytics injection. After owner disabled automatic RUM, both affected tests passed in 4.2s. The affected checks cover all seven pages for console errors and all three demos for external network requests. |
| Live HTTP routes/assets/status/redirects | PASS | 38 checks at 2026-10-20T13:51:11.825Z across both production origins; all seven routes, CV, fonts, previews, icons, sitemap/robots, build info, genuine missing-path 404 and encoded-query redirects. |
| Metadata and internal links | PASS | Every route has a descriptive owner-inclusive title, absolute canonical and working internal targets; sitemap includes all seven pages. |
| Preview indexing | PASS | Actual hash preview and branch alias return `X-Robots-Tag: noindex, nofollow`, exact build revision and `preview: true`. Production has no noindex restriction. |
| Git deployment | PASS | Automatic branch preview and subsequent main production deployments both use `github:push`; deployed revision matches tested source. |
| DNS/TLS/redirects | PASS | Active Free zone and both Pages associations; standard chain/hostname validation on apex, www and free host, TLS 1.3. HTTP apex/HTTP www/HTTPS www return 301 to HTTPS apex preserving `/work/olist/?a=1&b=two%20words`. Free HTTPS host remains 200. |
| Security/cache headers | PASS with final repair | CSP, nosniff, frame, referrer and permissions headers observed. HTML revalidates; hashed assets are immutable. Free-host font responses initially combined global and asset max-age directives; final rules restrict HTML revalidation to page/metadata paths to eliminate overlap. Live final-release verification checks the resulting headers. |
| Content/safety scan | PASS | No private source paths, credentials, source archives, placeholder copy or unsupported metrics in publishable content. Disputed original test count appears only in the correction record. |

Next's build type-check subprocess did not return normal stdout inside the command sandbox; the same build passed using the approved tool escalation. Type checks were not disabled.

## Browser, accessibility and visual review

PASS — axe scans on every route at desktop and 375px mobile in both themes, using WCAG 2/2.1/2.2 A/AA tags. This is not a complete WCAG conformance certification.

PASS — **84 route/width/theme combinations**: all seven pages, light/dark, widths **320, 375, 768, 1024, 1440, 1920px**. No horizontal page overflow. Wide data tables have named, keyboard-focusable scroll regions.

PASS — keyboard-generated checks cover skip navigation, mobile disclosure menu focus order, Escape/return focus, ordinary route navigation and back/forward. Native buttons/selects and explicit names are used. Diagram selection/anchors, all demo changes/resets, contradictory/empty retrieval, missing-data/zero-denominator handling, email-copy success/failure, PDF download, theme persistence/system/storage failure, no-JavaScript essential content and reduced motion all pass. Demo examples require no external network or inference.

PASS — **28 full-page screenshots** captured and visually reviewed: every route at 375 × 812 and 1440 × 1000 in both themes. Additional 768px renders and focused review sheets were inspected. Repairs included contact-action stretching, a tablet word-space omission and transition-time contrast. The corrected one-page CV was rendered with Poppler and inspected; the original was preserved.

PASS — six additional zoom-equivalent renders of Home/Olist/Contact in both themes: 640 CSS-pixel viewport at deviceScaleFactor 2, representing 1280 physical pixels. Text remained readable and document width remained 640. This is reflow emulation, not a native browser-toolbar zoom interaction.

NOT RUN — an actual screen-reader session, physical-device touch audit and native toolbar 200% zoom inspection were unavailable. Automated keyboard events, semantic review, screenshots and reflow emulation provide partial coverage. No field metrics or real-user INP measured; analytics is disabled.

## Lighthouse mobile lab measurements

Scores: **Performance / Accessibility / Best Practices / SEO**. Times below are report fetch times in UTC.

| URL | UTC fetch time | Scores | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- |
| Local Home: `http://127.0.0.1:4173/` | 2026-10-19T20:40:10.674Z | **97 / 100 / 100 / 100** | 2.4 s | 0 | 90 ms |
| Local Olist: `http://127.0.0.1:4173/work/olist/` | 2026-10-19T20:41:14.457Z | **99 / 100 / 100 / 100** | 1.8 s | 0 | 80 ms |
| Production free Home: `https://husseinelhaddad.pages.dev/` | 2026-10-20T13:57:52.907Z | **90 / 100 / 100 / 100** | 3.2 s | 0 | 90 ms |
| Production custom Home: `https://husseinelhaddad.dev/` | 2026-10-20T14:01:40.887Z | **89 / 100 / 100 / 100** | 3.3 s | 0 | 80 ms |
| Production custom Olist: `https://husseinelhaddad.dev/work/olist/` | 2026-10-20T14:02:42.798Z | **96 / 100 / 100 / 100** | 2.3 s | 0 | 80 ms |

PASS — all measured accessibility, best-practices and SEO category scores are 100. Olist production performance is 96 with 2.3s LCP; CLS is zero throughout.

FAIL (target, not functionality) — custom Home performance **89** misses the ≥90 aim; its **3.3s** LCP and free Home **3.2s** LCP exceed the ≤2.5s aim. Free Home performance is 90. These are actual cold-load mobile simulations; do not substitute the faster local result for production.

Investigation: homepage LCP is the static H1. Lighthouse identifies approximately 290ms potential savings from two render-blocking CSS files (about 8.4KB transferred together); server response was about 130ms and total page transfer about 282KiB. Static artwork was already moved outside client boundaries, Motion features deferred, eager link prefetch disabled and fonts self-hosted/preloaded with `font-display: swap`. These changes improved the original local 89 score to 97. No essential content waits for animation. Next's [CSS inlining option](https://nextjs.org/docs/app/api-reference/config/next-config-js/inlineCss) remains experimental and is explicitly not recommended for production, so it was not enabled solely to chase a lab threshold. External styles retain cross-page caching. Further production tuning can target CSS delivery/font and JavaScript budgets without weakening accessibility or adding a runtime dependency. Lab results vary; no field performance guarantee is made.

Raw JSON/HTML Lighthouse reports, browser reports, HTTP results and screenshots are retained locally in gitignored `qa/` (plus `playwright-report/`). They are not deployed to ordinary visitors. Use `BASE_URL` with the browser suite to reproduce checks on a deployed host.

## External evidence links and resolved issues

- PASS — public GitHub profile, FPL default `dev` branch, Sawakli team repository and canonical So3ratk repository returned 200.
- NOT RUN — LinkedIn content is access-limited (HTTP 999); the approved link is retained and not classified as broken.
- FAIL (external app availability) — the documented FPL Streamlit address redirected through authentication and produced a redirect-loop result. The case study labels live functionality unverified and provides independent illustrative examples. No source-project repair was attempted.
- Private Olist source is intentionally not offered as a public-source CTA.

Resolved: the initial Cloudflare Git installation error was repaired by the owner; DNS activation/CNAME setup resolved initial origin TLS failures. An unsupported domain-level Pages `_redirects` entry was removed and replaced with the verified zone Single Redirect. Separate account/zone Web Analytics injection was disabled by the owner; final network/console checks pass without loosening CSP or tests. No outstanding owner authentication/DNS action is required for the verified launch.

## Work collection expansion — 20 October 2026

Scope: only Work layout/content, shared typed project content, README editing guidance and evidence notes. The three featured case-study URLs, navigation and demos are preserved. The new supporting collection expands So3ratk and adds Trip Planner, credited only for owner-confirmed documentation/NetBeans compatibility. No filters, client dependencies, source-project changes or private-source publication.

| Check | Result | Evidence |
| --- | --- | --- |
| Lint / types / existing logic checks | PASS | `npm run lint`, `npm run typecheck`, `npm test`, unchanged dependencies. |
| Production static export | PASS | `npm run build`; all seven pages and real root 404 exported. |
| Existing browser suite | PASS | **21 passed in 25.9s** against the export, Chrome 155 / Playwright 1.64.1. Includes all-route links/metadata, both-theme axe checks, six-width reflow, keyboard menu/back-forward, demos and browser-error checks. |
| Focused collection review | PASS | **12 width/theme combinations** at 320/375/768/1024/1440/1920, light/dark. Screenshots captured; actual desktop, mobile and tablet renders inspected. No page overflow; repository links have visible keyboard focus and correct forward/reverse tab order. Both cards exist without JavaScript. |
| Public repository links | PASS | Unauthenticated normal-TLS HTTP 200 for So3ratk and Trip Planner, plus GitHub API verification that both are public and canonical. No unverified demo link added. |
| Content attribution | PASS | Trip Planner UI ownership explicitly omitted after owner clarification. Team stack and personal role are separate; uncertain candidates remain unpublished. |
| Lighthouse remeasurement | NOT RUN | No performance claim added for this small static collection change. Prior release measurements above retain their original URL/revision/date context. |

Focused screenshots, keyboard observations, link responses and build/browser logs are retained locally under gitignored `qa/work-collection*`. Long element captures can include an offscreen fixed skip-link artifact; actual viewport rendering was separately inspected and its unfocused bounding box confirmed entirely above the viewport. No site issue or hidden test failure was suppressed. Exact-head CI, Pages preview and production checks are recorded in the expansion PR and release handover.

### Titanic follow-up — 20 October 2026

Owner confirmed full implementation, resolving the contribution question. Added an educational Titanic card, a verified public repository link and per-entry repository labels; preserved explicit team labels on So3ratk and Trip Planner. No original model job, source-project change or unverified hosted-demo claim.

- PASS — lint, strict types and production static export.
- PASS — **five affected existing browser checks, 15.8s**: Work metadata/links/both-theme accessibility, all-route six-width reflow, mobile/reduced-motion accessibility, no-JavaScript essential content and browser errors.
- PASS — **12 focused width/theme combinations**: card screenshots, no horizontal overflow, forward/reverse tab order into the Titanic repository link and visible focus. Actual desktop/mobile renders were inspected.
- PASS — public repository HTTP 200 and GitHub API verification. Current public training-source blob matches the inspected snapshot; the known evaluation limits still apply.
- NOT RUN — source-project training/evaluation, inference/deployment checks, new Lighthouse or assistive-device audit. No new result claims depend on them. Existing CI runs the full suite before merge; deployed release evidence is recorded in the follow-up PR.

Local artifacts: gitignored `qa/titanic-*`. ArabiQ, Football ETL and TechStore remain unpublished; subsequent contribution statements require matching the correct project/source before publication.
