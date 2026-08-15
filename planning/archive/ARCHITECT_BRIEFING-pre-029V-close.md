# Architect Briefing

## Executive summary

**Business outcome:** Sprint 029U closed `operator-isolated-readiness-blocked-clean`; the guarded public-enquiry kill switch is implemented, all Sprint-owned external residue is removed, and accepted Sprint 036L routing is restored five/five.

**Current focus:** Architect discovery for a separately authorized corrective readiness follow-up, expected to be 029V if created.

**What is proven:** 1004/1004 local assertions, complete critical review budgets ending PASS, operator-isolated transfer, exact compensation, Resend key deletion confirmation, zero 029U resource residue, and final five-alias accepted routing.

**What is not live:** Public enquiry submission, dedicated SMTP configuration, a 029U candidate, authenticated no-send readiness, email delivery and Sprint 029R.

## Readiness signals

| Signal | Status | Evidence |
| --- | --- | --- |
| Local gate and controller boundary | passed | 72/72 new plus 932/932 retained = 1004/1004; typecheck, zero-warning lint, 28-page Production build, scan `0/20`, manifest `20/20` |
| Critical independent review | passed | Plan decisions 3/3 PASS; inspection decisions 3/3 PASS; `PLAN-001` and `INSPECT-001` through `INSPECT-003` resolved; no open blocker/advisory |
| Compensation and live routing | passed | Dedicated `0`, temporary `0`, activation `0`, generic `5`, credential absent, 029U deployments `0`, accepted aliases `5/5`, wrong targets `0` |
| SMTP readiness and candidate contract | attention | Vercel JSON drift refused candidate adoption; automatic alias movement occurred despite `--skip-domain`; public/no-send/expiry checks were not run |

## Where things stand

The kill switch and safety controller are locally complete. One bounded provider/Vercel attempt reached deployment creation, then stopped at exact CLI-shape refusal without retry. Compensation removed the candidate and all Sprint-owned resources; after fresh user approval, only the three displaced aliases were restored. Public enquiry remains unavailable.

## Current status

Sprint 029U is closed blocked-clean. Accepted Sprint 036L remains the live Production deployment with all five stable aliases. Sprint 029R is conditional/not ready.

## Since last sprint

Sprint 029U added exact server-side public-submission gating, operator-isolated key transfer, Sensitive dedicated SMTP/auth projections, complete cleanup recovery, failure-injection coverage, and stricter all-target Vercel environment/alias/deployment checks. The attempted candidate exposed current Vercel CLI schema drift and an unexpected automatic three-alias reassignment despite `--skip-domain`.

## Architecture / file map

- `.env.example` - documents the disabled-by-default server gate and dedicated SMTP names.
- `lib/enquiries/env.ts` - exact activation and dedicated transport availability.
- `app/api/enquiries/route.ts` - first-instruction sanitized 503 gate.
- `scripts/PreflightAuth029U.ps1` - guarded controller, provider/Vercel projections, cleanup and Baseline.
- `scripts/*029U*.` - focused public-gate, controller and provider-projection helpers/tests.
- `planning/sprints/029U-operator-isolated-guarded-smtp-readiness-recovery/acceptance.md` - durable acceptance and incident record.

## Decisions

- Close blocked-clean; do not claim SMTP readiness, zero alias mutation or public activation.
- Treat current Vercel deployment/list JSON as drift requiring new Architect work, not a parser weakening or blind retry.
- Record automatic alias reassignment as a real external incident even though final routing was restored.
- Preserve the kill switch implementation and clean local proof; grant no further external authority.
- Keep the Final Product Acceptance Matrix unchanged.

## Risks / watch-items

- A future `--skip-domain` deployment may still move stable aliases; a new plan must prevent or transactionally contain that side effect.
- Current controller deployment mappers do not accept the installed CLI's changed list/inspect shape; weakening exact validation would reintroduce silent-adoption risk.
- Local gate proof does not establish SMTP authentication, sender acceptance or delivery.
- The retained 029S Preview remains historical inert evidence and must not be promoted, invoked, aliased or deleted by inference.

## Open questions for the Architect

- What exact 029V contract can establish candidate identity/readiness against current Vercel JSON without weakening fail-closed projection?
- What pre-deploy or transactional control can guarantee stable aliases remain on accepted 036L during a future `--skip-domain` attempt?
- Should the retained inert 029S Preview remain as evidence or receive a separately authorized deletion decision?

## Evidence

- Final local proof: 1004 passing, 0 failing.
- TypeScript passed; lint passed with zero warnings/errors; Production build generated 28 pages.
- Protected scan passed `0/20`; manifest passed `20/20`; static/encoding checks passed.
- Plan decision 3/3 and inspection decision 3/3 passed with all stable findings resolved.
- One deployment was created and removed; no retry or public/no-send/expiry request occurred.
- The operator confirmed deletion of the exact target Resend key.
- Final alias inventory: 46 total, 5/5 stable aliases on accepted Sprint 036L, 0 wrong stable targets.
- Final controller Baseline passed with zero Sprint-owned configuration, credential and deployment residue.

## Plan corrections

The Pack was corrected to require Sensitive structural rows. Inspection corrections made cleanup all-attempting and residue-proven, projected all environment targets, derived retained candidate counts from exact inspections, covered deletion failures, and handled empty deployment arrays. During live execution, changed Vercel JSON and automatic alias reassignment forced the written blocked-clean fallback plus a separately approved three-alias rollback; no readiness retry was added.

## Validation / test status

**Tests:** 1004 passing, 0 failing. The final verification set also passed typecheck, zero-warning lint, 28-page Production build, static/encoding checks, protected scan `0/20`, manifest `20/20`, full alias inventory and clean controller Baseline.

## Recommended next Architect action

**Do:** Run fresh read-only discovery for a corrective readiness follow-up, expected to be Sprint 029V if a Pack is later created.

**Owner:** Architect with platform/security and provider account owners.

**Decision:** Keep public enquiry unavailable and 029R conditional/not ready. Do not deploy, create credentials, configure SMTP, send, submit, activate or move aliases without a new Pack and human `go`.
