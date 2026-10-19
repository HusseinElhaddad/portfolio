# Approved implementation checklist

Specification snapshot: 19 October 2026. Owner: Hussein Elhaddad. Concept: Signal → System.

- [x] Inspect repository: public, empty main; dedicated checkout; no portfolio-specific AGENTS.md.
- [x] Read approved profile and historical technical evidence; source projects remain read-only.
- [x] Establish Next.js App Router static export, Node LTS, lockfile, checks and CI.
- [x] Complete Home, Work, Olist, FPL-Intel, Sawakli, About, Contact and 404.
- [x] Self-host licensed fonts; publish a real, reconciled CV and social previews.
- [x] Implement accessible synthetic/local demos, system/light/dark, menu and reduced motion.
- [x] Inspect screenshots at all specified widths/themes; repair issues.
- [x] Clean install, lint, types, logic/browser tests, export, accessibility, links and Lighthouse.
- [x] Commit and push validated portfolio source.
- [ ] Cloudflare Pages Git integration, verified actual free hostname, subsequent Git deployment.
- [ ] Custom domain/DNS/HTTPS/redirects, preview indexing and real host 404 checks.
- [ ] Editing, deployment/rollback, QA, content evidence and 2027 transition handover.

## Access observations

GitHub CLI saved authentication was invalid at initial inspection. No CUA browser session was available. Requested official GitHub login and authorized Cloudflare browser access; continue independent implementation.

## Invariants

No paid infrastructure, APIs, analytics, source project mutations, private Olist code, participant data or credentials. Public metrics remain contextual historical evidence. All three demos use authored synthetic fixtures. Optional unverified claims are omitted.

## Verified local release

Clean install/audit, lint, strict types, four logic tests, 20 Chromium browser checks and production export pass. Mobile Lighthouse: Home 97/100/100/100; representative Olist case recorded in QA. All route/theme/width sweeps pass. CV reconciled, rendered and reviewed. Live infrastructure checks remain separate.

## Infrastructure progress

Initial release pushed: `b37ed116bdd66790e29b80f7f802b961510a3bba`. GitHub Actions run `39321605155` passed every step. Wrangler OAuth/account and existing Free zone verified. Git-connected Pages creation returned Cloudflare error `8000011` (Git installation issue); owner authorization/repair requested. No Pages project was created by the failed request and no free hostname is claimed.

Owner saved the assigned Cloudflare nameservers at Name.com. Public DNS now returns both correct nameservers; Cloudflare zone activation is still pending at the latest check. Apex A still resolves to an existing parking address; do not replace unknown records blindly. DNS access remains owner-operated because the Wrangler session lacks record permissions.
