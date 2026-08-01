# Architect Briefing — Sprint 035K Closeout

## Executive summary

**Business outcome:** One product-owner-designated trainer successfully signed in and completed the bounded synthetic trainer journey on the exact accepted Preview.

**Current focus:** Decide whether to promote the exact accepted Sprint 035K candidate to production and repeat human acceptance on the live domain.

**What is proven:** Preview OTP delivery and verification, authenticated session, trainer dashboard, assigned synthetic stable and horse, permitted workspace action, sign-out and second sign-in passed.

**What is not live:** The accepted candidate has not been promoted to production, production human acceptance has not run, and broader trainer rollout and public enquiry submission remain unavailable.

## Readiness signals

| Signal | Status | Evidence |
|---|---|---|
| Preview trainer journey | passed | Product-owner-designated tester completed private OTP sign-in, dashboard, synthetic horse workspace action, sign-out and second sign-in on the exact replacement Preview. |
| Exact Preview source and callback boundary | passed | Ready alias-free Preview `dpl_9ws41xCwDk1jqSKtiKJVrwLPnVtc` matches commit `76f66f5f9803e5d1f85a6dd3f71adf302b8a1810`; callback readback is production plus that Preview only. |
| Production promotion and human acceptance | attention | Production remains on the pre-035K deployment; the accepted candidate and human journey have not been promoted or repeated on the live domain. |

## Where things stand

One product-owner-designated human tester can now use the trainer journey on an exact-source Preview: receive and enter a six-digit code privately, reach the dashboard, use the bounded synthetic horse workspace, sign out and sign in again. A defect found on the first attempt was corrected narrowly and the retest passed. Production was deliberately not promoted.

## Current status

Closed `preview-trainer-access-proven-production-not-promoted-clean`. Replacement Preview `dpl_9ws41xCwDk1jqSKtiKJVrwLPnVtc` is Ready, alias-free and exact to commit `76f66f5f9803e5d1f85a6dd3f71adf302b8a1810`. The adopted pilot identity and bounded eight-record synthetic fixture are explicitly retained under the governed ledger.

## Since last sprint

Sprint 035K replaced the unexecuted 035J direction with human mailbox participation. It added truthful trainer sign-in copy, exact-identity/ownership-safe fixture tooling and deterministic cleanup/retention proof. Human Preview testing exposed and then confirmed the correction of a pre-provider OTP validation defect.

## Architecture / file map

- `app/auth/actions.ts`: input validation, provider OTP request/verification and sanitized outcomes.
- `lib/auth/otp-verification.ts`: separate input-only and provider-outcome classifiers.
- `scripts/live-trainer-access-035K-core.mjs`: exact tester/fixture ownership, verification, retention and cleanup logic.
- `scripts/Invoke-LiveTrainerAccess035K.ps1`: private interactive protected entrypoint.
- `planning/reviews/035K-live-trainer-access-and-human-acceptance.md`: canonical closeout evidence.

## Decisions

Human mailbox participation is the accepted path; Gmail/OAuth/mailbox automation remains unapplied. The tester explicitly retained the adopted pilot identity and exact bounded synthetic fixture. Preview acceptance is not production acceptance.

## Risks / watch-items

The retained pilot graph must remain synthetic, bounded and governed. Do not broaden access, add real data or treat Preview proof as full production readiness. The replacement Preview callback is temporary and must be rotated only as part of a separately authorized production or cleanup plan.

## Open questions for the Architect

Should the next sprint promote the exact accepted candidate to production and repeat human acceptance there, or deliberately retain production unchanged while another product outcome is prioritized?

## Validation / test status

**Tests:** 89 passing, 0 failing.

Focused OTP/redirect/recovery/bootstrap/dashboard tests pass. Sprint 035K passes 89 deterministic assertions with no live-provider mutation. TypeScript, zero-warning lint, production build, canonical validation, encoding, diff and private-data/secret checks pass. Preview health, truthful sign-in, anonymous `/portal` denial and private human trainer acceptance pass. Production human acceptance was not run.

## Recommended next Architect action

**Do:** Decide whether to promote the exact accepted Sprint 035K candidate to production and repeat the trainer journey on the live domain.

**Owner:** Product owner and Architect

**Decision:** Promote the accepted candidate to production, or deliberately defer production while preserving the retained governed pilot.

Choose whether to plan the separately gated production promotion and human smoke. Preserve the adopted tester/fixture, production deployment/rollback/aliases, callback boundary and no-product-wide-Done classification until that decision is made.
