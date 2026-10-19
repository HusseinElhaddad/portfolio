# Observed release verification

Date: **19 October 2026**. All results below are actual executed checks of this portfolio, not historical project reports. Deployment results will be appended after publishing. Public source projects were not executed or changed.

## Environment

- Linux; Node **24.22.0** LTS; npm **11.19.1**.
- Next.js **16.4.2**, React **19.3.1**, TypeScript **5.9.3**, Motion **14.4.0**.
- ESLint **10.13.0** + TypeScript ESLint **8.72.0**. The Next lint preset pulled an unpatched transitive glob-parser advisory and React plugins with incompatible ESLint 10 peers. It was replaced with supported ESLint/TypeScript recommended checks; no advisory was suppressed and no vulnerable override forced.
- Playwright **1.64.1**, axe-core integration **4.14.0**, installed Google Chrome **155.0.8059.84** (headless).
- Lighthouse **13.5.0**, mobile defaults: simulated throttling, 412 × 823 CSS viewport, CPU slowdown 4×, 1,638.4 Kbps / 150ms simulated network. Read exact configuration from retained JSON reports for reproduction.
- Export served at `http://127.0.0.1:4173/` with gzip for text. This is a production export, not the development server. No field INP or real-user metrics are claimed.

Next's detached TypeScript process returned empty stdout inside the restrictive command sandbox. The same build completed outside that sandbox under the tool's approved escalation. This did not require disabling Next's type checks.

## Commands and results

| Check | Result | Evidence |
| --- | --- | --- |
| `npm ci` | PASS | Clean lockfile install; 242 packages added, 243 audited, zero vulnerabilities. |
| `npm run lint` | PASS | Supported flat-config ESLint invocation, no errors. |
| `npm run typecheck` | PASS | Strict `tsc --noEmit`. |
| `npm test` | PASS | Four behavioral tests: unchanged/changed history, reset purity, missing denominators/valid zero, invalid theme fallback. |
| `npm run build` | PASS | All seven required routes, robots, sitemap and real root 404 exported. No runtime server or Functions required. |
| `npm run test:e2e` with `CHROME_PATH=/usr/bin/google-chrome` | PASS | 20 tests; 25.9s in recorded expanded run. |
| Preview indexing finalization | PASS | Simulated non-main branch emits `X-Robots-Tag: noindex, nofollow`; main restores production headers. Live preview host remains a separate check. |
| Internal links, CV and social assets | PASS | Every page's root-relative links return 200; PDF starts with genuine `%PDF`; each social asset resolves. |
| Canonicals/sitemap | PASS | Every required route points to its absolute approved custom origin; generated sitemap includes all seven routes. |
| Missing path | PASS (local) | `/this-path-does-not-exist/` returns HTTP 404 and useful custom page. |
| Dependency audit | PASS | Zero vulnerabilities after patched tooling selection. |
| Diff/content safety scan | PASS | No private absolute paths, exposed credentials, placeholder copy or source archives found in publishable source/assets/docs. Historical disputed count appears only in the correction record. |

## Browser, accessibility and visual checks

PASS: automated axe scans on all seven routes, desktop and 375px mobile, both light/dark themes, with WCAG 2/2.1/2.2 A/AA tags. These scans are not a complete WCAG conformance certification.

PASS: reflow sweep of **320, 375, 768, 1024, 1440 and 1920px**, every route in both themes (84 combinations), with no horizontal page overflow. Wide tabular data uses a named keyboard-focusable scroll region rather than causing page overflow.

PASS: keyboard-generated navigation checks verify skip-link focus, menu activation, focus order into navigation, Escape dismissal/return, link navigation, browser back/forward. Native buttons/selects are used throughout. The menu is a nonmodal disclosure and does not trap focus.

PASS: diagram selection/context/anchor, product history unchanged/change/reset, retrieval disagreement/no evidence/reset, campaign zero-denominator handling/reset, email copy success/failure, real CV delivery, theme persistence, system dark preference and unavailable storage fallback. Demo pages make no external network requests. Reduced-motion mode and no-JavaScript essential content are tested.

PASS: 28 full-page screenshots captured for all routes at **375 × 812** and **1440 × 1000**, both themes. Reviewed the actual renders for type hierarchy, spacing, chart labels, long copy, footer, clipping and visual consistency. Additional focused screenshots and review sheets are retained locally. Visual review found the contact primary action stretching to its neighboring status element; `align-items: flex-start` repaired it. A transition-time contrast failure in the first axe run was repaired by removing background/text color interpolation from buttons. The corrected menu test uses a stable aria-controls selector because the accessible name intentionally changes from Menu to Close.

The corrected CV was rendered with Poppler and visually inspected after the final font correction. It remains one page; original source unchanged. Font licensing and exact content edits are documented.

NOT RUN — real assistive-technology/screen-reader session and physical touch-device testing are unavailable here. Browser keyboard events, native control semantics, accessible names/announcements and textual chart alternatives were inspected/tested. The narrow-width sweep covers reflow; no claim of a human audit at actual browser 200% zoom is made.

## Lighthouse: production export, mobile lab

Scores in order: Performance / Accessibility / Best Practices / SEO.

| URL | UTC time | Scores | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- |
| `http://127.0.0.1:4173/` | 2026-10-19 20:40:10 | **97 / 100 / 100 / 100** | **2.4s** | **0** | **90ms** |

| `http://127.0.0.1:4173/work/olist/` | 2026-10-19T20:41:14.457Z | **99 / 100 / 100 / 100** | 1.8 s | 0 | 80 ms |

Initial uncompressed Home and Olist runs scored 89 / 100 / 100 / 100 with 3.8s LCP. Meaningful changes moved static project artwork outside client boundaries, deferred Motion features, disabled eager navigation prefetch, and added representative text compression to the static preview. Lab results vary; no field performance guarantee or field INP is asserted.

Raw JSON/HTML Lighthouse reports, full browser report and screenshots remain under gitignored `qa/` and `playwright-report/` in the checkout. They are intentionally excluded from deployed website content.

## External links

- PASS: public GitHub profile, FPL `dev` branch, Sawakli team repository and So3ratk canonical repository returned HTTP 200.
- NOT RUN — LinkedIn profile contents are access-limited (HTTP 999). The owner-approved URL is retained; it is not automatically classified as broken.
- FAIL (live app availability): documented FPL Streamlit URL redirects through authentication and produced a redirect-loop result in the automated request. The site explicitly marks live functionality unverified and supplies independent prepared examples. No repair of that separate app was attempted.
- Private Olist source: intentionally not exposed as a public-source CTA.

## Production verification

NOT RUN — initial source publication and Cloudflare Pages provisioning are the next release step. Do not interpret configuration files or a local passing build as proof of DNS, TLS, Git integration, preview indexing, host redirects, active revision or production 404 behavior. Record observed outcomes here after deployment.
