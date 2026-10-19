# Deployment and release operations

## Observed state

GitHub: `https://github.com/HusseinElhaddad/portfolio`, public, `main`. The repository was empty at initial inspection. No repository rulesets were returned; the owner authorized a validated initial main release for this case. GitHub CLI login and Wrangler OAuth were verified. No credential is stored in this repository.

Cloudflare: existing owner account verified by Wrangler. The domain has a **Free Website** zone. At initial inspection it was pending, with public delegation still on Name.com. The registrar was independently confirmed as **Name.com, Inc.** through public RDAP. Initial source revision: `b37ed116bdd66790e29b80f7f802b961510a3bba`; [GitHub Actions run 39321605155](https://github.com/HusseinElhaddad/portfolio/actions/runs/39321605155) passed. Git-integrated Pages creation returned HTTP 401 / Cloudflare code `8000011`: an internal issue with the Git installation. The request created no project. Owner-operated app authorization/repair is pending; no Pages hostname is claimed.

## Intended Pages Git configuration

Create a **Pages** Git-integrated project, not a runtime Worker or a direct-upload-only project:

- Repository: only `HusseinElhaddad/portfolio` where selectable.
- Project name: prefer `husseinelhaddad`, subject to actual availability.
- Production branch: `main`.
- Build command: `npm run build`.
- Output directory: `out`; root: repository root.
- Node: `24.22.0`; `NODE_VERSION=24.22.0`.
- `NEXT_PUBLIC_SITE_ORIGIN=https://husseinelhaddad.dev`.
- Set `NEXT_PUBLIC_FREE_ORIGIN` to the actual assigned `https://…pages.dev` origin after verification.
- Preview branch deployments enabled. `CF_PAGES_BRANCH` drives the build's noindex header on non-main builds; Cloudflare also supplies preview indexing restrictions.
- No Functions, bindings, paid services, Web Analytics or Zaraz.

The GitHub integration can require an owner-operated installation/authorization. Wrangler login alone is not evidence that Cloudflare can read the repository. If required, open Cloudflare **Workers & Pages → Create application → Pages → Import an existing Git repository**. Authorize the Cloudflare GitHub app for **only the portfolio repository**, then select it. Do not paste a token into an issue, config file or chat.

GitHub Actions runs independent quality checks. The Pages build command exports the site; it does not replace the CI checks. No enforced merge gate is claimed.

## Domain, DNS and TLS

Already obtained: `husseinelhaddad.dev`. Owner-supplied expiry: **19 October 2027**. Do not register or purchase it again.

Observed Cloudflare-assigned nameservers:

- `rommy.ns.cloudflare.com`
- `susan.ns.cloudflare.com`

The owner subsequently saved the assigned nameservers at Name.com. Public DNS now returns both Cloudflare nameservers, while Cloudflare still reports the zone pending at the latest check. The apex A record still returns an existing parking address, not this portfolio. This is not a deployment success.

Original public nameservers observed before migration:

- `ns1bqx.name.com`
- `ns2dfg.name.com`
- `ns3cfp.name.com`
- `ns4gvx.name.com`

The current Wrangler OAuth session can read the zone but DNS-record and DNSSEC endpoints return HTTP 403. Existing records therefore cannot be safely reconciled by that session. **Before delegation changes, the owner must inspect existing DNS and copy/preserve all email and unrelated service records in the Cloudflare zone.** No records were guessed, overwritten or removed. Public DNS showed no DS record at the initial check; still review the registrar's DNSSEC setting before a transition.

After the real free Pages address works:

1. In the Pages project's **Custom domains**, add `husseinelhaddad.dev` and `www.husseinelhaddad.dev`.
2. Use the same-account Cloudflare Free zone for the apex. Follow Pages' generated DNS instructions using its actual assigned hostname; do not create a standalone CNAME without the Pages domain association.
3. At Name.com: **My Domains → husseinelhaddad.dev → Nameservers**. After preserving records, replace delegation with the two Cloudflare nameservers above. Follow the current DNSSEC migration guidance if any DS/DNSSEC state differs from the observed no-DS state.
4. Review the Pages-created apex/www CNAME records. Preserve MX/TXT and unrelated records. Cloudflare handles apex flattening.
5. Keep hosting TLS free. Do not buy/install a registrar SSL certificate. Verify both hosts have valid HTTPS.
6. Enable the zone's **Always Use HTTPS** where needed, then verify HTTP requests redirect without loops.
7. `public/_redirects` is host-specific: `www` → apex with the matching path. Pages should preserve query strings; verify on the real host.
8. The production `pages.dev` host must stay accessible. Never apply a global free-host-to-custom-domain redirect.

Configuration files are not proof of live behavior. Release QA must explicitly check resolution, TLS, path/query redirects, direct nested routes, CV/fonts/media, sitemap, robots, canonical tags and actual missing-path status.

## Security and caching

`public/_headers` supplies MIME sniffing protection, frame restrictions, a conservative referrer policy, a restrictive permissions policy and CSP. Static Next.js needs inline bootstrap scripts; `script-src` permits inline scripts but not eval or remote scripts. Styles permit inline values used by the synthetic chart/Motion. There are no external connections in the browser. A nonce-based policy would require a different hosting/runtime design.

Changing HTML is revalidated. Hashed Next assets use immutable caching; self-hosted fonts use a bounded cache. Hosting must be checked to confirm actual returned headers. Do not add a catch-all SPA rewrite; root `404.html` ensures Pages returns a genuine missing-page status.

## Release the next change

1. Create a branch, edit the appropriate content/components, and update evidence if claims change.
2. Run `npm ci`, lint, typecheck, logic tests, build, and affected browser/visual checks.
3. Push the branch and inspect its Pages preview; confirm `X-Robots-Tag: noindex, nofollow`.
4. Review and merge according to repository rules. Main pushes should trigger Pages production builds.
5. Compare the deployed `/build-info.json` revision and Cloudflare deployment trigger SHA with the intended tested commit. Check GitHub Actions conclusion, homepage, a case study, CV, 404, metadata, and any changed interaction.

The initial release is allowed on main because the repository was empty and unrestricted. Use previews for subsequent feature work.

## Rollback

Cloudflare Pages → project → **Deployments** → choose a previously successful production deployment → **Rollback to this deployment**. Check production again and record the active revision. Then revert the offending source commit in Git and push a validated correction so the next automatic deploy does not reintroduce it. Do not force-push or silently rewrite shared history.

## Free limits and costs

Official Pages limits rechecked 19 October 2026: 500 builds/month, one concurrent build, 20,000 files, 25 MiB per file. This small static export fits these limits. Static asset requests are free under current terms; no inference, paid API, Worker, Function or R2 dependency exists. Student benefits are unnecessary. Review current terms before future architectural changes; free service is not guaranteed forever.

Official references: [static Next.js](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/), [Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/), [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/), [preview indexing](https://developers.cloudflare.com/pages/configuration/preview-deployments/), [limits](https://developers.cloudflare.com/pages/platform/limits/), [pricing](https://developers.cloudflare.com/pages/functions/pricing/), [rollback](https://developers.cloudflare.com/pages/configuration/rollbacks/).
