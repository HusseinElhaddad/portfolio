# Deployment and release operations

## Observed state

GitHub: `https://github.com/HusseinElhaddad/portfolio`, public, `main`. The repository was empty at initial inspection. No repository rulesets were returned; the owner authorized a validated initial main release for this case. GitHub CLI login and Wrangler OAuth were verified. No credential is stored in this repository.

Cloudflare: Git-connected Pages project **`husseinelhaddad`**, assigned free production origin **https://husseinelhaddad.pages.dev**. Owner repaired the GitHub integration after the initial `8000011` error. Both production and preview build environments use the pinned Node version and actual free origin. No runtime Functions or paid resources were configured.

The domain has an **active Free Website** zone. Name.com delegation now uses the assigned Cloudflare nameservers. Both associated Pages domains serve the portfolio over valid HTTPS. The owner configured proxied apex/www CNAMEs, Always Use HTTPS and a hostname-specific www-to-apex Single Redirect. Path/query preservation and continued access to the free production host were verified on 20 October 2026.

[PR #1](https://github.com/HusseinElhaddad/portfolio/pull/1) merged the tested release as `ffebac9162604a03ed31f5374358562459db998c`. [Main CI run 39433577130](https://github.com/HusseinElhaddad/portfolio/actions/runs/39433577130) passed. Cloudflare production deployment `42538ff0-f2f2-4161-b65d-491aef725d91` completed from **github:push** at 13:49:55 UTC on 20 October 2026, without Functions. Both production hosts' `/build-info.json` matched that exact revision. This proves automatic Git deployment, beyond the initial API-triggered deployment. Subsequent handover/cache-header releases preserve the tested application components and content; compare their build revision with the current Git head.

An automatic branch preview and its provider alias were also verified: both returned matching build information and `X-Robots-Tag: noindex, nofollow`. See [QA](QA.md) for measured results and limitations.

## Pages Git configuration

Configured as a **Pages** Git-integrated project:

- Repository: only `HusseinElhaddad/portfolio` where selectable.
- Project name: `husseinelhaddad`.
- Production branch: `main`.
- Build command: `npm run build`.
- Output directory: `out`; root: repository root.
- Node: `24.22.0`; `NODE_VERSION=24.22.0`.
- `NEXT_PUBLIC_SITE_ORIGIN=https://husseinelhaddad.dev`.
- `NEXT_PUBLIC_FREE_ORIGIN=https://husseinelhaddad.pages.dev`.
- Preview branch deployments enabled. `CF_PAGES_BRANCH` drives the build's noindex header on non-main builds; Cloudflare also supplies preview indexing restrictions.
- No Functions, bindings, paid services, Web Analytics or Zaraz. Pages analytics fields are empty; zone/account automatic Web Analytics must also remain disabled.

The GitHub integration can require an owner-operated installation/authorization. Wrangler login alone is not evidence that Cloudflare can read the repository. If required, open Cloudflare **Workers & Pages → Create application → Pages → Import an existing Git repository**. Authorize the Cloudflare GitHub app for **only the portfolio repository**, then select it. Do not paste a token into an issue, config file or chat.

GitHub Actions runs independent quality checks. The Pages build command exports the site; it does not replace the CI checks. No enforced merge gate is claimed.

## Domain, DNS and TLS

Already obtained: `husseinelhaddad.dev`. Owner-supplied expiry: **19 October 2027**. Do not register or purchase it again.

Observed Cloudflare-assigned nameservers:

- `rommy.ns.cloudflare.com`
- `susan.ns.cloudflare.com`

The owner subsequently saved the assigned nameservers at Name.com. Public DNS now returns both Cloudflare nameservers and Cloudflare reports the zone active. The owner subsequently replaced the website records with the real Pages target. Both hosts now serve this portfolio over valid HTTPS.

Original public nameservers observed before migration:

- `ns1bqx.name.com`
- `ns2dfg.name.com`
- `ns3cfp.name.com`
- `ns4gvx.name.com`

The current Wrangler OAuth session can read the zone but DNS-record and DNSSEC endpoints return HTTP 403. Existing records therefore cannot be safely reconciled by that session. The owner was instructed to inspect existing DNS and copy/preserve all email and unrelated service records before delegation. That private record inventory was not independently available through this session. No records were guessed, overwritten or removed. Public DNS showed no DS record at the initial check; still review the registrar's DNSSEC setting before a transition.

After the real free Pages address works:

1. In the Pages project's **Custom domains**, add `husseinelhaddad.dev` and `www.husseinelhaddad.dev`.
2. Use the same-account Cloudflare Free zone for the apex. Follow Pages' generated DNS instructions using its actual assigned hostname; do not create a standalone CNAME without the Pages domain association.
3. At Name.com: **My Domains → husseinelhaddad.dev → Nameservers**. After preserving records, replace delegation with the two Cloudflare nameservers above. Follow the current DNSSEC migration guidance if any DS/DNSSEC state differs from the observed no-DS state.
4. Review the Pages-created apex/www CNAME records. Preserve MX/TXT and unrelated records. Cloudflare handles apex flattening.
5. Keep hosting TLS free. Do not buy/install a registrar SSL certificate. Verify both hosts have valid HTTPS.
6. Enable the zone's **Always Use HTTPS** where needed, then verify HTTP requests redirect without loops.
7. Configure a **zone Single Redirect** for `http.host eq "www.husseinelhaddad.dev"`: dynamic target `concat("https://husseinelhaddad.dev", http.request.uri.path)`, status 301, preserve query string. Pages `_redirects` does **not** support domain-level sources. The incorrect initial file was removed after live testing showed it ignored. Safe intended rule configuration is in `docs/CLOUDFLARE_RULES.json`; preserve any unrelated zone rules.
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

## Provider-injected analytics

Cloudflare Web Analytics automatic setup is separate from the Pages analytics setting. Production browser checks initially found an injected `static.cloudflareinsights.com` beacon blocked by the site's CSP. The owner disabled automatic setup/RUM in **Web Analytics → husseinelhaddad.dev → Manage site → Disable**. After propagation, the two affected checks passed: demos made no external requests and every required page loaded without browser errors. No CSP exception, analytics code or test suppression was added. Keep this setting disabled after future provider changes; see [official setup controls](https://developers.cloudflare.com/web-analytics/get-started/).

## Verified host behavior

On 20 October 2026, both Pages domain associations report active. Standard certificate-chain and hostname checks succeeded for apex, www and the free origin using TLS 1.3. HTTP apex and HTTP www, plus HTTPS www, return 301 to HTTPS apex with the tested path and encoded query preserved. HTTPS free production case-study URLs remain directly accessible (200). Missing pages return genuine 404s. These checks used normal TLS validation.

The owner deployed the Single Redirect above because the current OAuth session has no Rulesets write access. Its observed behavior is verified; the repository JSON records the intended rule rather than pretending to manage the whole account. Never replace a complete existing ruleset with that one-rule example.
