# Deployment Baseline

Sprint 003 inspected local deployment evidence only. No production deployment was started, and no production project settings were changed.

## Canonical Target From Local Evidence

Canonical local deployment target: Vercel.

Evidence:

- `README.md` names the stack as Next.js, Supabase, Vercel, GitHub, and Stripe.
- `vercel.json` exists and declares the Next.js framework with GitHub integration enabled.
- `.vercel/project.json` exists and links this checkout to a Vercel project named `pnr-precision-performance`.
- No `railway.json`, `netlify.toml`, Dockerfile, or docker-compose deployment config was found in the root config scan.

## Current Deployment Config

`vercel.json` contains:

- Vercel schema reference
- `framework: nextjs`
- GitHub integration enabled
- GitHub silent mode disabled

## Not Verified In Sprint 003

- Whether the linked Vercel project is the intended production target for launch.
- Whether production/staging environment variables are complete or correct in Vercel.
- Whether a current deployment exists and is healthy.
- Whether DNS/custom domains are configured.
- Whether rollback, preview, and production promotion flows are ready.

## Open Confirmation

Before Sprint 007 launch work, the user or Architect should confirm that Vercel project `pnr-precision-performance` is the canonical production deployment target and identify the intended production domain.

## Rules For Future Work

- Do not deploy from a sprint unless deployment is explicitly in scope.
- Do not change Vercel project settings or production environment variables without approval.
- Keep production deployment verification in Sprint 007 unless an earlier sprint explicitly authorizes it.

---

# Sprint 007 Production Launch Readiness Update

Sprint 007 rechecked deployment readiness from local/source-backed evidence. The canonical target remains Vercel by local evidence: `vercel.json` declares the Next.js framework and `.vercel/project.json` links this checkout to project `pnr-precision-performance`.

No production deployment, production promotion, DNS change, Vercel project-setting change, or production environment edit was performed.

## Sprint 007 Findings

- Local Vercel linkage points to project `pnr-precision-performance`.
- Production project intent still needs user/operator confirmation.
- Production domain and final `NEXT_PUBLIC_SITE_URL` still need user/operator confirmation.
- Remote Vercel environment completeness was not verified because no remote project-setting access was used.
- Local route smoke passed for public, shop fallback, health/setup, sign-in, callback redirect, checkout missing slug, and webhook unsigned request behavior.
- The final launch status is no-go until the manual intervention items in `docs/PRODUCTION_LAUNCH_READINESS.md` are completed.

## Launch Runbook Summary

1. Confirm the Vercel production project and production domain.
2. Confirm production/preview environment variables by name and configured/missing status only.
3. Run local lint, TypeScript, and build validation using the bounded wrapper and project-local Node `22.14.0`.
4. Verify a preview/staging deployment before production promotion.
5. Verify `/api/health` and `/api/setup/status` in the target deployment.
6. Run public, auth, portal, data-entry, admin, shop, checkout, and webhook smoke checks.
7. Promote or deploy production only after explicit authorization.
8. If rollback is needed, promote the previous known-good Vercel deployment and restore prior environment settings by name without exposing values.

---

# Sprint 008 Deployment Update

The user confirmed Vercel project `pnr-precision-performance` is correct and confirmed these valid launch domains:

- `https://precisionperformance.com.au`
- `https://www.precisionperformance.com.au`
- `https://pnr-precision-performance.vercel.app`

Production deployment was not started or promoted in Sprint 008. Before production promotion, choose the canonical `NEXT_PUBLIC_SITE_URL`, verify Vercel production env settings, apply the Supabase launch migration through an approved remote path, and run Stripe test checkout/webhook replay.

---

# Sprint 009 Production Deployment Update

Sprint 009 created and applied Architect Pack 009 with explicit production deployment authorization.

## Deploy Result

- URL: `https://precisionperformance.com.au`
- Secondary aliases: `https://www.precisionperformance.com.au`, `https://pnr-precision-performance.vercel.app`
- Deployment URL: `https://pnr-precision-performance-7j3jqvvw7-rankin007s-projects.vercel.app`
- Vercel deployment id: `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`
- Target: production
- Status: Ready
- Local branch/revision: `develop` / `8bf310a`
- Framework: Next.js `15.3.8`

## Deployment Evidence

- Vercel CLI authenticated as `rankin007`.
- `.vercel/project.json` links this checkout to project `pnr-precision-performance`.
- `vercel env ls production` showed encrypted production entries for the required Supabase, Stripe, and site URL variable names. No values were printed.
- `vercel deploy --prod --yes` completed successfully and aliased the deployment to `https://precisionperformance.com.au`.
- `vercel inspect` reported deployment status `Ready` and aliases for all three launch domains.
- `vercel logs --since 1h --level error` found no project logs for branch `develop`.

## Production Smoke

Status-code smoke against `https://precisionperformance.com.au` passed:

| Check | Result |
|---|---|
| `GET /` | `200` |
| `GET /shop` | `200` |
| `GET /sign-in` | `200` |
| `GET /api/health` | `200` |
| `GET /api/setup/status` | `200` |
| `GET /auth/callback` without callback state | `307` to `/portal` |
| `POST /api/checkout` with empty form body | `307` to `/shop?checkout=missing-product` |
| `POST /api/stripe/webhook` unsigned | `400` |
| `GET https://www.precisionperformance.com.au` | `200` |
| `GET https://pnr-precision-performance.vercel.app` | `200` |

## Remaining Manual Items

- Remote Supabase migration application remains blocked because no `supabase` CLI or other safe remote SQL execution path was available in this Builder run.
- Authenticated Supabase/RLS/member/horse workflow smoke remains blocked until launch test users and fixtures are available.
- Stripe test checkout, signed webhook replay, and duplicate delivery verification remain blocked because no safe test-mode checkout/replay path was available without exposing secrets or mutating live payment state.

## Rollback

Use Vercel rollback or promote the previous known-good deployment from the `pnr-precision-performance` project dashboard/CLI. Do not run destructive database rollback SQL without a separate approved sprint and backup confirmation.
---

# Sprint 010 Deployment Status Update

Sprint 010 did not deploy, promote, roll back, change DNS, or change Vercel project settings.

`vercel inspect https://precisionperformance.com.au` reported deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i` as `Ready`, target `production`, with aliases for `https://precisionperformance.com.au`, `https://www.precisionperformance.com.au`, and `https://pnr-precision-performance.vercel.app`.

Status-code smoke against `https://precisionperformance.com.au` returned:

| Check | Result |
|---|---|
| `GET /` | `200` |
| `GET /shop` | `200` |
| `GET /sign-in` | `200` |
| `GET /api/health` | `200` |
| `GET /api/setup/status` | `200` |
| `GET /auth/callback` without callback state | `307` |
| `POST /api/checkout` with empty slug form | `307` |
| `POST /api/stripe/webhook` unsigned | `400` |
| Anonymous `GET /portal` | `307` |
| Anonymous `GET /data-entry` | `307` |
| Anonymous `GET /admin` | `307` |
| Anonymous `GET /admin/commerce` | `307` |

An initial malformed checkout POST with no form content type returned `500`; the intended missing-slug form smoke returned the expected safe redirect. Treat the malformed request as a future hardening candidate, not as completed checkout acceptance.

The installed Vercel CLI rejected filtered error-log flags with `The --follow flag does not support filtering`; no open-ended log follow was started.

---

# Sprint 012 Deployment Status Update

Sprint 012 did not deploy, promote, roll back, change DNS, or change Vercel project settings.

`vercel inspect https://precisionperformance.com.au` reported deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i` as `Ready`, target `production`, with launch aliases attached.

Production status-code smoke against `https://precisionperformance.com.au` returned:

| Check | Result |
|---|---|
| `GET /` | `200` |
| `GET /shop` | `200` |
| `GET /sign-in` | `200` |
| `GET /api/health` | `200` |
| `GET /api/setup/status` | `200` |
| `GET /auth/callback` without callback state | `307` |
| `POST /api/checkout` with missing slug form | `307` |
| `POST /api/checkout` malformed/no-content-type style body | `307` |
| `POST /api/stripe/webhook` unsigned | `400` |
| Anonymous `GET /portal` | `307` |
| Anonymous `GET /data-entry` | `307` |
| Anonymous `GET /admin` | `307` |
| Anonymous `GET /admin/commerce` | `307` |

The Sprint 012 source fix for malformed checkout POST handling was validated locally but not deployed in this sprint. The live deployment nevertheless returned a safe `307` for the malformed production smoke run on 2026-07-14.

---

# Sprint 012A Deployment Stop

Sprint 012A did not deploy.

Builder created a temporary clean worktree at `C:\tmp\pp-012a-clean-20260714-165007` from revision `8bf310a` and applied only the checkout malformed POST safety fix. The temp worktree diff was limited to `app/api/checkout/route.ts`.

Deployment was stopped because the clean `HEAD + checkout fix` source lacks `app/(admin)/admin/commerce`, while current production evidence expects `/admin/commerce` to exist and redirect anonymously. Deploying that clean tree would likely remove current production behavior.

No Vercel deployment, production promotion, rollback, DNS change, project-setting change, or production data mutation was performed during this stopped attempt.

---

# Sprint 012B Production Source Provenance

Sprint 012B did not deploy.

Current production deployment was confirmed by Vercel inspect:

- Deployment id: `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`
- Deployment URL: `https://pnr-precision-performance-7j3jqvvw7-rankin007s-projects.vercel.app`
- Target: production
- Status: Ready
- Aliases: `precisionperformance.com.au`, `www.precisionperformance.com.au`, `pnr-precision-performance.vercel.app`, `pnr-precision-performance-rankin007s-projects.vercel.app`, `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`

Vercel JSON output confirms deployed routes include `admin/commerce` and `admin/commerce.rsc`. The JSON metadata did not include a Git commit, branch, repository, or `gitSource` field. Build-log inspection was not used because it was rejected as potentially secret-bearing.

Source comparison:

| Candidate | Provenance finding |
|---|---|
| Current dirty workspace | Closest local match by route shape. It includes `/admin/commerce` and the deployed public/admin/portal/data-entry/shop surface, but also includes broad dirty app/source changes and later Sprint 012 edits. |
| Clean `8bf310a` | Not production-equivalent. It lacks `app/(admin)/admin/commerce`. |
| `C:\tmp\pp-012a-clean-20260714-165007` | Not production-equivalent. It is `8bf310a` plus checkout fix only and lacks `/admin/commerce`. |
| `.release-main` | Not production-equivalent. It is clean `main` at `5a70b6a` and contains `/admin/commerce`, but it also contains extra routes not in live production. |
| Vercel metadata | Confirms deployed route output and deployment identity, but not exact source snapshot. |

Conclusion: the production deployment was most likely created by a Vercel CLI local filesystem deploy from the dirty workspace during Sprint 009. A clean production baseline cannot be reconstructed from a known committed revision currently available locally.

Recommended next deployment path: do not deploy until a production-equivalent baseline is recovered or deliberately created. The safest follow-up is to create a temporary production-baseline candidate from the current dirty workspace, reduce it to route/source parity with live production, add only the checkout fix, validate, and ask for explicit approval before deployment.

---

# Sprint 012C Production Baseline Reconstruction

Sprint 012C did not deploy, promote, roll back, change DNS, change project settings, or mutate production data.

Candidate produced:

- Candidate path: `C:\tmp\pp-012c-baseline-lean-20260714-173135`
- Starting source: current dirty workspace on `develop` / `8bf310a`, selected because Sprint 012B found it closest to current production route shape.
- Isolated/excluded from candidate: `.git`, `.next`, `.release-main`, copied `node_modules`, `.env*`, `desktop.ini`, planning/reference/docs/template-only content, and OneDrive/archive material. A `node_modules` junction was used only for local validation.
- Secret handling: no local `.env*` files were copied into the candidate and no secret values were printed or stored.
- Production route evidence: Vercel inspect for `https://precisionperformance.com.au` still reports deployment `dpl_EUBAF6qjNgFHGybefFV9uKa81L9i`, target `production`, status `READY`, with 50 output paths, including `admin/commerce` and `admin/commerce.rsc`.
- Route parity: normalized production routes and candidate build routes both count 25; missing from candidate: none; extra in candidate: none.
- `/admin/commerce`: preserved in candidate.
- `.release-main` extras: absent from candidate (`/admin/setup`, `/onboarding`, `/member-experience`, `/platform-stack`, `/preview-access`).
- Checkout fix: candidate contains `readCheckoutFormData()` guarding `request.formData()` and redirecting unreadable/malformed form bodies to `/shop?checkout=missing-product`.

Validation from candidate:

| Check | Result |
|---|---|
| `npm run lint` via wrapper | `exited 0`; log stamp `20260714-173159-801` |
| `npx tsc --noEmit --incremental false` via wrapper | `exited 0`; log stamp `20260714-173200-201` |
| `npm run build` via wrapper | `exited 0`; log stamp `20260714-173240-912`; generated 23 static-page pass and 25 app routes including `/admin/commerce` |
| Local smoke on port `3124` | `/`, `/shop`, `/sign-in`, `/api/health`, `/api/setup/status` returned `200`; anonymous `/admin/commerce` returned `307`; checkout empty and malformed POST returned `307` to `/shop?checkout=missing-product` |
| Unsigned webhook smoke | Returned `503` because `.env*` files were intentionally excluded, so webhook signing config was unavailable in the candidate dev server. This was not treated as a source failure. |

Recommendation: this candidate is the safest known deployment base for a future approval sprint because it preserves current production route shape and adds/preserves the checkout malformed POST guard without the known clean-tree `/admin/commerce` regression. Do not deploy it until the user explicitly authorizes deployment in a separate instruction or pack.
---

# Sprint 012D Baseline Commit And Deployment Approval

Sprint 012D did not deploy, promote, roll back, change DNS, change Vercel project settings, mutate Supabase, run Stripe actions, push, or create a PR.

Reviewed baseline:

- Branch: codex/012d-production-baseline
- Commit: $commit
- Worktree: C:\tmp\pp-012d-production-baseline
- Source candidate: C:\tmp\pp-012c-baseline-lean-20260714-173135
- Deployment status: not deployed

Deployment recommendation: the Sprint 012D branch/commit is the durable reviewed deployment candidate. Deploy only after explicit user authorization, then re-smoke production public/setup routes, protected redirects, /admin/commerce, checkout missing/malformed POST redirects, and unsigned webhook behavior. Keep Supabase remote checks, authenticated workflow/RLS smoke, and Stripe test checkout/webhook replay as separate live acceptance gates.
