# Architect Briefing - Sprint 036D Revocation Blocked

## Executive summary

**Business outcome:** Sprint 036D delivered the corrected protected-lifecycle tooling, but the live Management lifecycle failed its protected-output and same-token invalidation gates. The sprint is closed blocked, not clean.

**Current focus:** Define whether a narrow Sprint 036E should correct the beginner-facing prompt order before any separately authorized live retry.

**What is proven:** Exact three-file non-runtime scope; 295 Sprint 036D assertions, five core checks and two wrapper checks; 531 total counted assertions; inherited hashes; focused validation; TypeScript; zero-warning lint; static checks; and a 29-page Production build. The exact created credential was manually revoked and its row was confirmed absent.

**What is not live:** Same-token 401/403 invalidation, provider projection, retained-pilot Verify, Vercel baseline, a fresh candidate, alias transition, OTP requests and human Production acceptance were not completed or begun.

## Readiness signals

| Signal | Status | Evidence |
|---|---|---|
| Corrected protected-lifecycle implementation | passed | 295 Sprint 036D assertions and seven self-tests passed; transcript, compensation and minimal child-environment controls are executable |
| Unchanged application behavior | passed | Inherited 036C/035K/032 proof, focused validation, TypeScript, zero-warning lint, static checks and 29-page build passed; runtime diffs/imports are zero |
| Live Management credential lifecycle | blocked | One credential was manually revoked and confirmed absent, but it was entered at the wrong prompt and required same-token invalidation is unproven |
| Retained-pilot and Production acceptance | not started | The blocked Management gate stopped all provider API, retained-pilot, Vercel, release, alias, OTP and human Production work |

## Where things stand

The repository has a deterministic protected lifecycle that fails closed and compensates after credential creation. The only live attempt exposed a human-factors flaw before hidden input: a beginner treated the ordinary acknowledgement as the credential prompt. Immediate surfaces were removed and the exact credential was manually revoked/list-absent, but the missing same-token invalidation proof prevents a clean result.

## Current status

Sprint 036D is closed `production-management-access-revocation-blocked`. Deliberate non-promotion remains in force. Sprint 029N remains gated, and no retry or replacement credential is authorized.

## Since last sprint

Builder applied the 036D Pack, added the three approved operations files and completed two accepted in-sprint security corrections: guaranteed compensation/transcript refusal and protected-child environment isolation. Complete deterministic and unchanged-application validation passed. During the first live Management attempt, the prompt-order incident triggered the required stop, followed by manual exact-token revocation and list-absence confirmation; all downstream work remained zero.

## Architecture / file map

- `scripts/protected-management-lifecycle-036D-core.mjs` - monotonic lifecycle, fixed provider projection, bounded requests and body-blind invalidation semantics.
- `scripts/Invoke-ProtectedManagementLifecycle036D.ps1` - private ConsoleHost wrapper, hidden input, transcript guard, compensation, child-environment isolation, memory clearing and human-only create/revoke boundaries.
- `scripts/test-protected-management-lifecycle-036D.mjs` - deterministic request, compensation, transcription, sanitization and protected-child isolation proof.
- `planning/sprints/036D-single-use-management-access-and-live-trainer-acceptance/` - applied strict execution authority and acceptance truth.
- `planning/reviews/036D-single-use-management-access-and-live-trainer-acceptance.md` - implementation, deterministic proof, live incident and blocked closeout evidence.

## Decisions

- Close at the exact permitted blocked outcome; do not describe manual revocation/list absence as accepted same-token invalidation.
- Do not retry, create a replacement credential or enter any downstream release phase in Sprint 036D.
- Preserve the implementation files unchanged at closeout.
- Recommend only an Architect-scoped narrow 036E human-factors correction; the recommendation grants no implementation or external authority.

## Risks / watch-items

- A protected value was visible in the private console and an authorized diagnostic image. Both surfaces were terminated/deleted, repository and temporary-residue scans are clean, and the exact credential was manually revoked/list-absent; nevertheless the protected-output boundary failed.
- Same-token invalidation is unproven because the wrapper never received or retained the credential. A clean lifecycle cannot be inferred.
- The ordinary acknowledgement appears before the hidden credential prompt and is not beginner-safe.
- Production remains unchanged on the historically proven Ready rollback; any later release requires fresh, separately authorized evidence.

## Open questions for the Architect

- What narrow 036E interaction contract makes non-secret acknowledgements unmistakable and credential entry safely isolated for a first-time operator?
- Should token creation be deferred until immediately before an unmistakable hidden prompt, and what executable novice-flow proof is required without weakening current security controls?

## Evidence

- Canonical root and Git top-level exact after Windows path normalization; one worktree; 036D starting SHA `9a2af97550ff90924f3c2f0286c67f03ddb20828`.
- Pack dry-run/application/post-dry-run: exactly four Sprint 036D files.
- New deterministic suite: 295 assertions passed; core self-test: five checks; wrapper self-test: two checks.
- Inherited counted suites: 135 Sprint 036C + 89 Sprint 035K + 12 Sprint 032; total counted proof 531 passing.
- Focused auth/dashboard/OTP/redirect/bootstrap/recovery/session/permission validation, JSON, roles, Supabase-self, static, TypeScript, zero-warning lint and 29-page Production build passed.
- Frozen implementation SHA-256 values: wrapper `29BEB27F5652985E92F02830196A3F8E2AC7FCDDBB7DDB7245DE559183726028`; core `98DD491B136018AA98F1486D645EBB0AEDACFE8294D622D638B91250D598CCE1`; test `2B2C72475B50D9C2AADB9504851230C987660075A52075DCBC6F5C257FB6F3F6`.
- Live result: one human-created credential; sanitized preflight refusal before protected helper/request; manual exact-token revocation and row-absence confirmation; same-token invalidation unproven.
- External result: no provider API, retained-pilot, Vercel, deployment, alias, Production authentication, schema, Auth, data, Storage, DNS or session action.

## Plan corrections

The Pack assumed that fixed acknowledgement prompts before hidden credential input would be sufficiently self-explanatory. In the first-time operator flow, the plain `Read-Host` acknowledgement was interpreted as the place to paste the credential. That prompt-order assumption was wrong and caused a protected value to become visible before the hidden prompt.

A narrow 036E should define the human interaction, not broaden the release outcome: provide beginner-readable steps before credential creation, make every non-secret acknowledgement unmistakable, and isolate credential entry at the exact hidden-input moment. It must retain transcript detection, absolute executable validation, minimal child environments, compensation, request ceilings, sanitization, memory clearing and private human-only creation/revocation. No Pack or implementation is created by this recommendation.

## Validation / test status

**Tests:** 531 passing, 0 failing in the counted Sprint 036D, 036C, 035K and 032 suites. Five core and two wrapper self-test checks also passed. Focused validation, static checks, TypeScript, zero-warning lint and the 29-page Production build passed. The live protected gate is separately blocked and is not represented as a passing test.

## Recommended next Architect action

**Do:** Scope a narrow Sprint 036E for beginner-safe protected prompt ordering and executable novice-flow proof. Keep deliberate non-promotion and do not authorize a live credential retry until that correction is separately applied and reviewed.

**Owner:** Architect for the interaction contract and Pack; Builder only after a future Pack handoff; authorized provider operator only under later explicit live authority.

**Decision:** Sprint 036D closes blocked with immediate credential revocation/list absence but without same-token invalidation. Do not begin Sprint 029N or any Production work.
