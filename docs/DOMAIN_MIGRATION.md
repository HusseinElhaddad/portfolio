# Move the canonical origin to the free Pages address

Owner-supplied custom-domain expiry: **19 October 2027**. Begin on **20 August 2027**, 60 days before expiry. No reminder or recurring automation has been configured.

Permanent free production origin: **https://husseinelhaddad.pages.dev**. Cloudflare assigned this hostname to the Git-connected `husseinelhaddad` Pages project. It is recorded centrally in `src/content/origins.json`; live verification is recorded in `docs/QA.md`.

- [ ] Confirm the actual free hostname serves every route and asset over valid HTTPS, including direct case-study navigation, CV, sitemap and 404. It must not redirect to the custom domain.
- [ ] Set `canonicalOrigin` in `src/content/origins.json` and production `NEXT_PUBLIC_SITE_ORIGIN` to that verified free origin. Rebuild canonical tags, sitemap, robots, Person/WebSite data and social metadata. Update `NEXT_PUBLIC_FREE_ORIGIN` consistently.
- [ ] Confirm the free production host is indexable and self-canonical. Preserve noindex restrictions on branch/hash preview hosts.
- [ ] Owner: update GitHub, LinkedIn, CV, email signatures and replaceable public links. These future actions do not authorize editing those profiles now. Prefer the stable free address for long-lived QR codes and difficult-to-replace references.
- [ ] While the custom domain is controlled and its HTTPS certificate remains valid, add host-specific redirects from apex and www to matching free-host paths, preserving queries. Test that the free host never redirects back. Remove the old www-to-apex rule to avoid an unnecessary extra hop.
- [ ] Use available search-engine migration tools where appropriate. No preservation of rankings or backlinks is guaranteed.
- [ ] At the actual registrar (Name.com was verified in October 2026), review **My Domains → domain → renewal/auto-renew settings** and any bundled products. Ensure settings match the owner's intent to stop paying. Do not change billing/security settings silently; owner account access may be required.
- [ ] Before expiry, review Cloudflare custom-domain associations, certificates and DNS cleanup. Keep useful redirects for the remaining controlled registration period; removing associations early can cut that period short. Remove abandoned dependencies at an appropriate time.
- [ ] Verify the final production revision and all links after the transition. Record the new primary origin in the README and deployment guide.

After registration expires, ownership and old-domain redirects cannot be guaranteed. Retaining the address requires paid registration. A registrar transfer does not eliminate annual fees. Hosting can remain on the same Pages project, subject to its current free plan; no host migration is necessary, and no free plan is a promise of free service forever.
