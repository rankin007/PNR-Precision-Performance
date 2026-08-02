# Architect Briefing — Sprint 035P Closeout

## Where things stand

Sprint 035P safely resolved the obsolete callback and proved the exact temporary Preview callback lifecycle, including complete rollback. Local validation is clean, but the rendered trainer proof stopped after two attempts because the harness used an unsupported page-wide alert-count assumption. No trainer participated, no temporary state remains, and Sprint 035 is still incomplete.

## Executive summary

**Business outcome:** Callback ownership and lifecycle are resolved without production impact; trainer acceptance remains unproven.

**Current focus:** Plan future proof against the specific form error summary, actionable guidance, and intended focus behavior without assuming one global page alert.

**What is proven:** `98/98` maintained/focused local checks, exact obsolete removal, exact temporary addition, exact provider rollback, Ready healthy Preview, canonical validation/build, and final Auth/application/Storage `0/0/0`.

**What is not live:** The full `14/14` rendered boundary and eight-step human trainer journey did not complete. Core Product Done is false.

## Readiness signals

| Signal | Status | Meaning |
|---|---|---|
| Provider disposition and rollback | passed | Only the authorised obsolete entry was removed; production configuration was preserved and final rollback is exact |
| Local validation | passed | `58 + 18 + 10 + 12 = 98` local checks pass with canonical regressions and build |
| Rendered authenticated proof | attention | Both permitted attempts stopped at 6/14 because the harness asserted unsupported page-wide alert cardinality |
| Human trainer acceptance | attention | Zero human attempts; the rendered prerequisite did not pass |

## Current status

Closed `trainer-access-validation-blocked-clean` on branch `codex/035P-authorised-callback-disposition-and-trainer-acceptance` from baseline `63d72c4ab5352ae4dd4bbd623e34e56dfb9e450b`. Final Sprint-owned Auth/application/Storage state is `0/0/0`; final provider state is the unchanged production Site URL plus exactly the production callback.

## Since last sprint

The authorised project owner supplied `removed as obsolete`. Builder added 12 focused lifecycle assertions, removed the exact obsolete non-production callback, established production-only rollback authority, temporarily added the governing Preview callback, ran two bounded synthetic rendered attempts, and restored all temporary state.

## Architecture / file map

- `scripts/protected-preview-035P.mjs`: sanitized disposition, provider lifecycle, hosted rendered proof, and exact cleanup harness.
- `scripts/test-protected-preview-035P.mjs`: fixed 12-assertion local contract.
- `planning/reviews/035P-authorised-callback-disposition-and-trainer-acceptance.md`: governing execution and closeout evidence.

## Decisions

- Preserve the production Site URL and production callback unchanged.
- Treat the production-only post-disposition state as rollback authority.
- Stop after the second hosted failure; do not involve a trainer or make a third unchanged attempt.
- Keep Sprint 035 attention and Core Product Done false.

## Risks / watch-items

The rendered failure is not authority for a one-alert global page contract. Future proof should locate `#biochemistry-error-summary`, require `role="alert"`, verify actionable guidance, and verify intended focus behavior. Do not broaden this into redesign, auth/RLS, schema, or production scope.

## Open questions for the Architect

Does future planning require only an assertion correction against the specific error-summary contract, or does separate product authority identify a genuine accessibility behavior change?

## Validation / test status

**Tests:** 98 local passing, 0 local failing; rendered proof incomplete at 6/14 after two attempts.

Maintained 035M `58/58`, 035N `18/18`, 035O `10/10`, focused 035P `12/12`, maintained 021AH and 022/022B, JSON, domain, roles, Supabase self-tests, static, TypeScript and lint passed. Production build passed with approved `.next` filesystem access after sandbox denial. Both hosted attempts cleaned Auth/application/Storage to `0/0/0`; final provider rollback is exact.

## Plan corrections

The Pack anticipated deterministic harness correction, but the second attempt exhausted the ceiling before the assertion was scoped to the specific error summary. A third attempt is prohibited; future work must start from a new applied Pack.

## Recommended next Architect action

**Do:** Plan the smallest valid 035 follow-up around the specific error-summary alert, actionable guidance, and focus contract; require separate product authority for any source change.

**Owner:** Architect / product owner with accessibility contract authority.

**Decision:** Keep Sprint 035 incomplete and Core Product Done false until `14/14` rendered proof and the one-trainer eight-step journey pass with exact cleanup.
