# Architect Briefing

## Executive summary

**Business outcome:** Sprint 029V closed `agent-envelope-alias-isolation-blocked-clean`; the repaired local controller is accepted, and the first incompatible full-inventory shape stopped the flight before any external mutation.

**Current focus:** Fresh Architect read-only discovery of the current complete Vercel deployment-list shape and an exact privacy-safe projection.

**What is proven:** 110/110 focused assertions, proportional retained regression evidence, all local gates, final critical inspection PASS, a clean read-only Baseline, accepted Sprint 036L routing `5/5`, zero Sprint 029V resources and zero external effects.

**What is not live:** The dashboard freeze, dedicated SMTP readiness, a 029V candidate, authenticated requests, public enquiry submission, email delivery and Sprint 029R.

## Readiness signals

| Signal | Status | Evidence |
| --- | --- | --- |
| Local controller and projection boundary | passed | 110/110 focused; PowerShell parse/SelfTest; typecheck; zero-warning lint; 28-page Production build; scan `0/19`; manifest `19/19` |
| Critical independent review | passed | Final focused plan review passed; inspection decisions 2/3 and 3/3 passed after `INSPECT-001` through `INSPECT-003` were resolved |
| Read-only Production baseline | passed | Exact project; accepted deployment Ready; accepted aliases `5/5`; wrong targets `0`; Sprint 029V deployments/resources `0`; generic SMTP `5` |
| Full deployment inventory / freeze gate | attention | The full Inventory returned sanitized `VERCEL_JSON_REFUSED`; active queue emptiness was not proven, so execution stopped before dashboard access or mutation |

## Where things stand

The exact Vercel 50.42.0 agent-envelope repair and safety controller are locally complete. The read-only Baseline proved accepted routing and zero Sprint-owned residue. The next, broader inventory shape failed closed, so the dashboard freeze and every downstream credential, deployment and request step were skipped. Public enquiry remains unavailable.

## Current status

Sprint 029V is closed blocked-clean, not ready or live. Accepted Sprint 036L remains the current Production deployment with all five stable aliases. Sprint 029R is conditional/not ready.

## Since last sprint

Sprint 029V added exact raw/enveloped deploy parsing, strict ordered guidance validation, paged inventory reconciliation, head-change restart, durable live-attempt phases/counters, exact owned-candidate cleanup rules, per-request candidate-origin binding, protected deployment-field refusals and value-free alias-isolation projection. No Product/runtime implementation changed.

## Architecture / file map

- `scripts/PreflightAuth029V.ps1` - exact CLI/version gate, projection, Baseline, inventory, ownership and cleanup controller.
- `scripts/autonomous-public-enquiry-029V.mjs` and `scripts/test-autonomous-public-enquiry-029V.mjs` - agent envelope, durable phase and origin-binding contracts.
- `scripts/provider-browser-projection-029V.mjs` and its test - identity-blind provider projection.
- `scripts/vercel-alias-isolation-projection-029V.mjs` and its test - value-free dashboard projection.
- `docs/PUBLIC_ENQUIRY_VERCEL_AGENT_ENVELOPE_AND_ALIAS_ISOLATION_029V.md` - operating boundary.
- `planning/sprints/029V-vercel-agent-envelope-and-alias-isolation-recovery/acceptance.md` - durable acceptance and terminal outcome.

## Decisions

- Close `agent-envelope-alias-isolation-blocked-clean`; do not weaken the allowlist or infer readiness from the narrower Baseline.
- Treat the current full deployment-list object shape as fresh Architect discovery work.
- Preserve the original dashboard setting because the freeze gate was never reached.
- Keep public enquiry unavailable, accepted Sprint 036L five/five and the Final Product Acceptance Matrix unchanged.

## Risks / watch-items

- The current complete Vercel deployment-list shape is not accepted by the strict projector; guessing fields would risk protected-data exposure or incorrect ownership.
- A future deployment remains prohibited until a stable empty active queue and five/five routing are jointly proven before the dashboard freeze.
- `--skip-domain` previously caused automatic alias movement; defense must remain layered and fail closed.
- Local controller proof does not establish SMTP authentication, sender acceptance, delivery or public activation.

## Open questions for the Architect

- Which exact top-level and row fields does the current complete `vercel list --format json` return, and which value-free projection proves active-queue state without exposing protected data?
- Can that projection preserve refusal of `creator`, `meta` and every unknown field while supporting stable paging and head revalidation?
- What new Pack, if any, should authorize another bounded readiness attempt after read-only discovery passes?

## Evidence

- Focused 029V suites: alias isolation 26/26; provider projection 16/16; controller/envelope 68/68; total 110/110.
- Retained historical Sprint 029U evidence remains 1004/1004; broad retained suites were rerun, and the stricter branch-current 68/68 controller suite replaced only the old branch-locked harness.
- TypeScript passed; lint passed with zero warnings/errors; Production build generated 28 pages; protected scan `0/19`; manifest `19/19`.
- Final inspection decision 3/3 passed with no unresolved finding.
- Read-only Baseline passed; the immediately following full Inventory failed closed as sanitized `VERCEL_JSON_REFUSED`.
- External effects: setting transitions `0`; deployments `0`; requests `0`; bearer exposures `0`; emails `0`; stored enquiries `0`; migrations/data changes `0`; generic SMTP changes `0`; activation rows `0`; temporary-auth residue `0`; alias commands/moves `0`.

## Plan corrections

Inspection decision 1 identified three stable issues: candidate origin was not bound per request, live-attempt phase/counters were not durable across processes, and protected deployment fields could pass the PowerShell inventory parser. All three were corrected and proved before any external mutation. The installed CLI version resolver was then corrected to accept its exact two-stream version output. The live plan stopped at the written pre-freeze fallback when full inventory shape validation failed.

## Validation / test status

**Tests:** 110 passing, 0 failing. The current-branch focused suites, PowerShell SelfTest/parse, TypeScript, zero-warning lint, 28-page Production build, static/encoding checks, protected scan `0/19`, manifest `19/19`, JSON validation and final critical inspection passed. Retained 029U evidence remains historically 1004/1004; the old 029U branch-locked harness was transparently replaced by the stricter current 029V controller proof.

## Recommended next Architect action

**Do:** Run read-only discovery of the current full Vercel deployment-list JSON contract, then create a new Pack only if an exact value-free projector can prove the active queue without weakening protected-field refusal.

**Owner:** Architect with platform/security owner review.

**Decision:** Preserve blocked-clean status, unchanged Production routing and unavailable public enquiry until that discovery and a separately approved Builder handoff exist.