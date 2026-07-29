# Sprint 032 Public Relaunch And Production Deployment

Date: 2026-07-29

Outcome: `public-relaunch-production-deployed-with-accepted-limitations-clean`.

## Release identity and mutations

- Candidate: `C:\tmp\pnr-027b-completed-product-lineage-reconciliation`, branch `codex/032-public-relaunch-production`.
- Exact release commit and verified remote SHA: `f7242ee0785ae9b87022394206c89ebdd5c9f6ad`.
- GitHub destination: `rankin007/PNR-Precision-Performance`; HTTPS was the safe substitute after SSH authentication failed before transmission.
- Existing Vercel project: `pnr-precision-performance`.
- New Ready Production deployment: `dpl_fPWqinnfL4YZJq41MQPaXhhuh7hi` at `https://pnr-precision-performance-khx3yoqq4-rankin007s-projects.vercel.app`.
- Apex, `www` and `pnr-precision-performance.vercel.app` all inspect to the exact new deployment.
- No PR, `develop` merge/push, force push, DNS change, environment-value or project-setting change, Supabase/Stripe mutation, payment, real enquiry or production-data mutation occurred.

## Public truth and validation

The release reconciles completed Sprints 028, 030 and 031/031B/031C. Commerce remains disabled-safe; online enquiry transmission, clinical thresholds/recommendations and application audio/transcription remain unavailable. Public metadata uses the canonical apex, approved public routes are indexable, robots excludes protected/private paths, and sitemap lists only `/`, `/pricing` and `/disclaimer`.

- Focused Sprint 032 controls passed 12/12; maintained 029M checks passed 11/11; Australian-English, commerce-disabled, stable-workspace and 031C controls passed.
- JSON, domain, roles, Supabase self-tests, static/encoding, TypeScript, cache-independent ESLint and diff checks passed.
- Restricted-sandbox builds stopped at the documented Next startup limitation. The authoritative equivalent build outside the sandbox completed in 19.3 seconds, compiled in 10 seconds and generated 28/28 pages. Vercel independently compiled in 10 seconds and generated the same 28 pages.
- Local and live 390 px phone, 768 px tablet and 1440 px desktop rendering passed without horizontal overflow. Assets loaded, keyboard focus was visibly outlined, canonical/robots metadata rendered correctly, and browser console warning/error checks were empty.
- All three live aliases passed public page, metadata, asset, sign-in, health and setup checks. Anonymous protected routes returned `307` to sign-in. Checkout returned `303` to `commercial-authority-incomplete`; unsigned webhook returned `503`.
- Secret-shaped scans found no Stripe keys, JWT-like tokens, service-role assignments or private keys in public/source/build targets. No source maps, stale public preview/noindex/under-construction marker, debug marker or confidential data was found. Framework-generated 404-only `noindex` remains appropriate.

## Monitoring and rollback

The new deployment remained Ready through repeated inspection and cache-busted HTTP/rendered smoke several minutes after release. Filtered Vercel logs were unavailable because this CLI combines logs with follow mode and rejects filters; repeated Ready inspection, three-domain runtime smoke, negative API checks and empty browser-console evidence supplied equivalent safe proof.

Previous known-good deployment `dpl_6F1TMjNRECmTCyMbyWXA6ohG8Q2R` remains Ready. `vercel rollback <deploymentId>` is available, so it can be restored without database rollback. No rollback was required.

## Accepted limitations

Transactional commerce, online enquiry transmission/storage/email, clinical thresholds/recommendations, application audio/transcription and any broader product-Done claim remain unavailable. These are presented accurately and did not weaken publication, protection, integrity or recovery boundaries.
