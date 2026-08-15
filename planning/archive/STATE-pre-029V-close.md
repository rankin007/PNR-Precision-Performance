# Project State

Updated: 2026-08-07

## Current position

Sprint 029U is closed `operator-isolated-readiness-blocked-clean`. The local server-side public-enquiry kill switch and guarded readiness tooling are implemented and fully proven, but SMTP readiness was not established and public enquiry remains unavailable.

Current Production truth remains accepted Sprint 036L deployment `dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf` with all five stable aliases. Sprint 029R remains conditional/not ready. No later readiness, activation or release action is authorized by this closeout.

## Sprint 029U outcome

The critical flight used the permanent canonical workspace, branch `codex/029U-operator-isolated-guarded-smtp-readiness-recovery` and unchanged starting HEAD `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`. Staged count remained zero. The generated four-file sprint and committed Sprint 029O closeout were reread before the no-edit Builder plan.

Local proof passed 1004/1004 assertions: retained 932/932 plus 72/72 new Sprint 029U assertions. TypeScript, zero-warning lint, Production build (28 pages), protected scan `0/20`, manifest `20/20`, static/encoding checks and the final focused rerun passed. Critical plan review consumed 3/3 decisions and ended PASS. Critical inspection consumed 3/3 decisions and ended PASS. Stable `PLAN-001` and `INSPECT-001` through `INSPECT-003` are resolved with no open blocker or advisory.

The operator-private transfer created exactly one restricted sending key and one Sensitive Production-only password row without agent observation of the raw key. Three Sensitive structural rows and three Sensitive temporary-auth rows were then established. The public activation row was never created.

The one authorized deploy command created `dpl_DDvEvguz8Ur5yJgnbWG9XdwAssdK`, but changed Vercel deployment JSON caused the exact controller to refuse adoption before candidate, public-gate, no-send or expiry proof. No retry occurred. Vercel unexpectedly reassigned three stable aliases despite `--skip-domain`. Builder removed all seven Sprint-owned environment rows and the fixed Windows credential, removed the 029U deployment, stopped for fresh authority, then restored only the three displaced aliases after the user explicitly approved rollback. The operator deleted the exact Resend key and confirmed `key-deleted`.

Final full-inventory and controller Baseline proof passed: 46 aliases inventoried; accepted aliases `5/5`; wrong stable targets `0`; dedicated rows `0`; temporary rows `0`; activation rows `0`; generic rows `5`; fixed credential absent; 029U deployments `0`; accepted deployment Ready; prior candidates and retained Preview inert/unaliased. No email was sent, no enquiry was submitted or stored, and no Supabase, data or migration change occurred.

## Current implementation boundary

- `.env.example`, `lib/enquiries/env.ts` and `app/api/enquiries/route.ts` define the exact fail-closed public-submission gate.
- Missing, blank, modified or non-exact activation values keep the route unavailable.
- The public route checks the gate before content type, origin, length, body read, parsing, validation, persistence, network or submission work.
- Sprint 029U never created `PUBLIC_ENQUIRY_SUBMISSION_ENABLED` in Vercel.
- `scripts/PreflightAuth029U.ps1` and the 029U helper/test files retain the sanitized controller and provider-projection evidence.
- Existing generic SMTP rows remain untouched and cannot be used as authority for dedicated public-enquiry delivery.

## Acceptance truth

A001-A024, A030-A031, A033 and A035 passed. A025-A029, A032, A034 and A036 did not pass: exact-source zero-alias candidate acceptance and public/no-send/expiry checks were not completed, success resources were not retained, and automatic alias movement plus the approved rollback means zero-alias-mutation/no-alias-movement claims would be false.

Final Product Acceptance Matrix IDs changed: none. Product-wide Done remains false.

## Next Architect boundary

A future Architect may discover and propose a new corrective follow-up, expected to use suffix 029V if created. It must address current Vercel deployment/list JSON, prove how `--skip-domain` alias side effects are prevented or transactionally contained, and preserve operator-isolated secret handling. This recommendation creates no Pack and grants no key, credential, configuration, deployment, request, email, enquiry, alias or activation authority.

## Durable references

- `planning/sprints/029U-operator-isolated-guarded-smtp-readiness-recovery/acceptance.md`
- `planning/archive/STATE-pre-029U-close.md`
- `planning/archive/ARCHITECT_BRIEFING-pre-029U-close.md`
- `planning/ROADMAP.md`
- `delivery_road_map.md`
- `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`
- `planning/SPRINT_LIFECYCLE_LEDGER.md`

Pre-029U boot-file history is preserved verbatim in the two exact archive files above. Earlier sprint artifacts remain durable history; the lifecycle ledger and current acceptance records govern their present meaning.
