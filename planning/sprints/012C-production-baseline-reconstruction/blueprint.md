# Sprint 012C - Production Baseline Reconstruction Blueprint

## Execution Shape

Sprint 012C is a no-deploy reconstruction sprint.

Run the work in this order:

1. Establish baseline evidence.
2. Create a temporary candidate from the current dirty workspace.
3. Identify and isolate known non-production candidate differences.
4. Verify candidate route/source parity.
5. Ensure the checkout safety fix is present.
6. Validate and smoke the candidate locally.
7. Document candidate provenance and deployment recommendation.
8. Close without deploying.

## Baseline Evidence

Builder should record:

- main workspace `git status --short`
- active branch and short revision
- current production deployment id/status/aliases from already-safe Vercel inspect paths
- route evidence for live production, especially `/admin/commerce`
- route differences found in `.release-main`
- known limitations of clean `8bf310a` and `C:\tmp\pp-012a-clean-20260714-165007`

Do not inspect secret-bearing logs or environment values.

## Candidate Creation

Create a temporary candidate directory under `C:\tmp`, for example:

- `C:\tmp\pp-012c-baseline-YYYYMMDD-HHMMSS`

Preferred starting point:

- current dirty workspace, because Sprint 012B found it closest by route shape

Builder must not delete files from the main workspace. Any removal/isolation happens only inside the temporary candidate.

## Candidate Reduction

Inside the temporary candidate, isolate obvious non-production-only content.

Examples may include:

- planning-only changes not needed for app deployment
- temporary Architect Pack files
- local-only validation artifacts
- source files known to exist only after Sprint 012 and unrelated to production parity

Do not guess away app behavior. If uncertain whether a source file is production behavior, keep it and document the uncertainty.

## Route Parity Comparison

Compare candidate generated routes to current Vercel production output as closely as possible without secret-bearing logs.

Required checks:

- `/admin/commerce` is present
- public routes used in production smoke are present
- portal, data-entry, admin, shop, checkout, webhook, health, and setup routes are present
- `.release-main` extra routes identified by Sprint 012B are absent unless evidence shows they are live
- generated route count and notable route list are recorded

Route parity does not have to be byte-for-byte proof. It must be strong enough to decide whether the candidate is a safer deploy base than clean `8bf310a` or the full dirty workspace.

## Checkout Fix

Ensure `app/api/checkout/route.ts` in the candidate contains the Sprint 012 malformed-body guard:

- parsing `request.formData()` is guarded
- malformed or unreadable form bodies redirect safely to `/shop?checkout=missing-product`
- slug validation remains unchanged
- no secrets or raw request bodies are logged

## Validation

Run validation from the temporary candidate, not by modifying the main workspace:

- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run lint" -TimeoutSeconds 60`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npx tsc --noEmit --incremental false" -TimeoutSeconds 120`
- `powershell -ExecutionPolicy Bypass -File scripts/run-validation-command.ps1 -Command "npm run build" -TimeoutSeconds 180`

If the wrapper assumes repo-root-relative paths from the candidate, use the candidate copy of the script. If restricted sandbox build fails for known sandbox reasons, request approval for the known-good outside-sandbox bounded build path and record both outcomes.

Run local smoke where feasible:

- `GET /`
- `GET /shop`
- `GET /sign-in`
- `GET /api/health`
- `GET /api/setup/status`
- `POST /api/checkout` missing slug
- `POST /api/checkout` malformed/no-content-type body
- `POST /api/stripe/webhook` unsigned request
- anonymous protected-route redirects, especially `/admin/commerce`

## Documentation Updates

At close, Builder should update:

- `docs/DEPLOYMENT.md`
- `docs/PRODUCTION_LAUNCH_READINESS.md`
- `docs/VALIDATION.md`
- `docs/ADMIN_COMMERCE_HARDENING.md` if checkout evidence changes
- `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` if durable status changes
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`

## Closeout

Final status options:

- `complete candidate ready for approval`
- `partial with documented blockers`
- `blocked`

Do not deploy in Sprint 012C even if the candidate is good. The next deployment requires explicit user approval in a separate instruction or pack.
