# Architect Briefing - Sprint 036H Closed Local Diagnostic Ready

## Executive summary

**Business outcome:** Precision Performance now has a bounded local way to distinguish five operational OTP-request failure classes without changing what users see or exposing provider, identity or protected detail.

**Current focus:** Decide whether Production should remain deliberately on rollback or whether a separate future Pack should authorize one tightly bounded acceptance attempt that can consume the new ephemeral category.

**What is proven:** Exact four-file implementation; code-first five-category taxonomy; unchanged public/non-enumerating behavior; retry-later-only propagation; one hidden ephemeral marker with clearing; 169 counted passing assertions; three retained auth regression scripts; TypeScript; zero-warning lint; 29-page Production build; and all scope/privacy/residue checks.

**What is not live:** Sprint 036G's historical category is unknown. No new OTP request, session, delivery, provider compatibility, candidate acceptance or Production trainer access was proven, and Sprint 029N remains gated.

## Readiness signals

| Signal | Status | Evidence |
|---|---|---|
| Local diagnostic contract | passed | All nine exact codes, code precedence, narrow status fallback and no-diagnostic cases passed the 70-assertion Sprint 036H test |
| Retained application behavior | passed | 99 retained counted assertions plus 035D, 035C and 035F scripts, TypeScript, zero-warning lint and 29-page build passed |
| Privacy and scope | passed | Generic copy/non-enumeration retained; exact four-file source scope, raw-output, persistence, secret/private-data and residue checks passed |
| Live trainer authentication | attention | No live attempt occurred; five/five rollback remains live and the candidate remains unaccepted |

## Where things stand

The application can now classify a future operational sign-in rejection without telling the user anything new or retaining provider detail. This is local readiness only: Production is still safely on the known rollback, and the failed historical attempt cannot be reclassified after the fact. Any new attempt needs a separate decision and Pack.

## Current status

Sprint 036H is closed `privacy-safe-authentication-diagnostic-ready-local-clean`. The implementation and local validation are complete; no live, external, commit or push action occurred.

## Since last sprint

Sprint 036G ended with a generic `retry-later`, no session and an exact all-five rollback. Sprint 036H added a separate prospective classifier, safe retry-later-only action propagation, one hidden ephemeral form marker and deterministic no-network proof while leaving visible wording, request behavior and live state unchanged.

## Architecture / file map

- `lib/auth/otp-request.ts` - unchanged public disposition plus separate five-category code-first classifier.
- `app/auth/actions.ts` - allowlisted request diagnostic only on the existing retry-later result.
- `components/auth/sign-in-form.tsx` - exact visible copy and hidden ephemeral marker with explicit clearing.
- `scripts/test-auth-request-diagnostics-036H.mjs` - 70 taxonomy, parity, propagation, clearing and privacy assertions.
- `planning/reviews/036H-privacy-safe-authentication-failure-diagnostics.md` - exact validation, hashes and zero-external-action ledger.
- `docs/AUTH_RLS_PORTAL_ACCESS.md` and `docs/OPERATIONS_HANDOFF.md` - local diagnostic and no-retry operating boundary.

## Decisions

- Keep the public disposition exactly `indeterminate | retry-later`; missing identities remain indistinguishable.
- Use exact normalized code before narrow `429`/`>=500` fallback; never inspect messages or provider payload fields.
- Keep the category non-visible and ephemeral with no logging, storage, analytics, cookies, URLs or accessible naming.
- Treat diagnostic readiness as prospective local evidence only, not historical root cause or retry authority.

## Risks / watch-items

- The historical 036G cause remains unknown and must not be inferred from the new taxonomy.
- Exposing or persisting the marker in a future change would cross the accepted privacy boundary.
- A local category alone does not prove delivery, provider compatibility, session establishment or safe Production promotion.
- Sprint 029N and product-wide Done remain gated.

## Open questions for the Architect

- Should deliberate rollback remain the chosen direction?
- If one future attempt is justified, what exact request ceiling, cooldown timing, private human coordination and all-five rollback trigger should govern it?
- Should Sprint 029N remain behind live trainer acceptance, or should the owner make a separate roadmap decision?

## Evidence

- Canonical root/Git top-level, exact 036H branch, starting SHA `831d0465b4e71562d3c062bf3f55d6f0080e3173`, one worktree and all four starting hashes passed.
- Pack dry run reported four creates; application created exactly four strict sprint files.
- `node --experimental-strip-types scripts/test-auth-request-diagnostics-036H.mjs` passed 70 assertions.
- Retained 035D, 035C and 035F scripts passed; `scripts/test-live-trainer-access-035K.mjs` passed 99 assertions.
- `npm run typecheck`, `npm run lint -- --max-warnings=0` and `npm run build` passed; build generated 29 pages/routes.
- `git diff --check`, exact source scope, status JSON, UTF-8/no-BOM/final-newline, whitespace, secret/private-data, persistence, raw-provider-output and generated-residue checks passed.
- OTP/verification, mailbox/provider/browser, credential, hosted configuration, deployment/alias/DNS, data and Git publication counts were all zero.

## Plan corrections

The first new-test run found a deterministic harness slice anchored to an earlier effect cleanup `return`. The test-only anchor was narrowed to search after `verifyCode`; the same 70-assertion target then passed. Product behavior and scope did not change.

## Validation / test status

**Tests:** 169 passing, 0 failing.

The counted total is 70 Sprint 036H assertions plus 99 retained Sprint 035K assertions. The retained 035D, 035C and 035F pass-contract scripts also passed but are not added to the assertion arithmetic. TypeScript, zero-warning lint, the 29-page Production build and all local safety checks passed.

## Recommended next Architect action

**Do:** Review whether deliberate rollback should remain, or define a separate tightly bounded acceptance Pack that may consume the new ephemeral diagnostic without exposing or persisting it.

**Owner:** Architect and product owner for roadmap/acceptance direction; an authorized operator only under a later exact live-action Pack.

**Decision:** Sprint 036H is locally complete. Five/five rollback remains live, the candidate is unaccepted, no retry is authorized and Sprint 029N remains gated.
