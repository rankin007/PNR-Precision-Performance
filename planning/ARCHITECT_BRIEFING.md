# Architect Briefing — Sprint 035Q Closeout

## Where things stand

Sprint 035Q corrected the hosted proof so it checks the specific validation summary instead of counting every alert on the page. The local proof is clean, but the rendered Preview showed that the summary does not receive the intended focus. Two bounded attempts ended cleanly, no trainer participated, and Sprint 035 remains incomplete.

## Executive summary

**Business outcome:** The prior false page-wide alert assumption is removed, and the remaining accessibility boundary is now precisely identified.

**Current focus:** Obtain product/accessibility authority for the intended validation-summary focus behavior before repeating hosted or human acceptance.

**What is proven:** `108/108` local checks pass; the provider callback lifecycle restored exactly; both hosted attempts cleaned Auth/application/Storage to `0/0/0`; production and product source are unchanged.

**What is not live:** The 14 rendered checks, designated-trainer journey, Sprint 035 outcome, and Core Product Done decision remain incomplete.

## Readiness signals

| Signal | Status | Evidence |
|---|---|---|
| Specific error-summary harness contract | passed | 10/10 focused assertions target ID, alert role, guidance, visibility, focus, and unrelated-alert coexistence |
| Local and regression validation | passed | 108/108 local target checks plus 021AH, 022/022B, canonical gates and production build |
| Hosted rendered acceptance | attention | Both attempts stopped at 6/14 because intended summary focus was not established |
| Human trainer acceptance | attention | Correctly not started because 14/14 rendered proof did not pass |

## Current status

Closed `accessibility-contract-expansion-required-clean` on branch `codex/035Q-specific-error-summary-contract-and-trainer-acceptance` from baseline `1f03578a4e53d9edd17614376dc5c4b7ffa21eee`. Final Sprint-owned Auth/application/Storage state is `0/0/0`; final provider state is the unchanged production Site URL plus exactly the production callback.

## Since last sprint

- Added a 035Q harness and fixed 10-assertion specific-summary contract.
- Removed the unsupported page-wide alert cardinality assumption.
- Ran two bounded hosted attempts and isolated the remaining failure to intended focus.
- Restored all temporary provider and synthetic state exactly.

## Architecture / file map

- `scripts/protected-preview-035Q.mjs`: specific-summary rendered proof and exact hosted cleanup.
- `scripts/test-protected-preview-035Q.mjs`: fixed 10-assertion contract.
- `planning/reviews/035Q-specific-error-summary-contract-and-trainer-acceptance.md`: governing execution and closeout evidence.

## Decisions

- Do not change product source under Sprint 035Q authority.
- Stop after the second focus failure and do not involve a trainer.
- Keep Sprint 035 at attention and Core Product Done false.

## Risks / watch-items

The remaining failure requires explicit product/accessibility authority because resolving focus behavior would change product source. Do not repeat a third unchanged hosted attempt or infer human acceptance from local validation.

## Evidence

- Focused 035Q: `10/10`.
- Maintained local arithmetic: `58 + 18 + 10 + 12 + 10 = 108`, all passing.
- Rendered: `6/14` on each of two attempts; failure was intended summary focus.
- Cleanup: Auth/application/Storage `0/0/0` after each attempt; provider restored to production-only.
- Canonical JSON, domain, roles, Supabase self-tests, static, TypeScript, lint, 021AH, 022/022B, and production build passed. Direct local binaries substituted for sandbox-blocked `npm exec` cache access.

## Validation / test status

**Tests:** 108 local passing, 0 local failing; rendered proof incomplete at 6/14 after two attempts.

Complete automated target remains `108 + 14 = 122`; only 114 checks are proven (`108 local + 6 rendered`) in either hosted attempt. Human attempts are zero.

## Plan corrections

The 035Q plan correctly removed page-wide alert cardinality, but the inherited assumption that intended focus already worked was false in the governing Preview. A separate product/accessibility change is required before reproof.

## Recommended next Architect action

**Do:** Create the narrowest follow-up Pack that authorizes the intended validation-summary focus behavior and its regression proof, then returns to bounded rendered and trainer acceptance.

**Owner:** Architect with product owner and accessibility contract authority.

**Decision:** Keep Sprint 035 incomplete and Core Product Done false until `14/14` rendered proof and the one-trainer eight-step journey pass with exact cleanup.
