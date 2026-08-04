# Architect Briefing - Sprint 036F Closed Blocked

## Executive summary

**Business outcome:** Sprint 036F safely exercised the corrected protected wrapper once, completed exact private token cleanup, and stopped before any downstream Production change when revocation/invalidation proof did not complete.

**Current focus:** Make an explicit deliberate non-promotion decision. Do not treat the blocked lifecycle as authority for another credential or retry.

**What is proven:** Exact two-file activation; fine-grained-only wrapper binding; unchanged core/runtime; 360 corrected plus 135 inherited assertions; proportional validation and 29-page Production build; one sanitized exit-code-3 lifecycle; exact token-row absence; no other token change; no replacement token; and zero local protected residue.

**What is not live:** Successful provider projection, same-token 401/403 invalidation, retained-pilot Verify, Vercel baseline, candidate staging, alias transition, OTP, mailbox/session journey and Production trainer acceptance are unproven or unstarted.

## Readiness signals

| Signal | Status | Evidence |
|---|---|---|
| Corrected wrapper and inherited controls | passed | 360 corrected plus 135 inherited assertions, core/wrapper self-tests and exact core/runtime equality passed |
| Credential cleanup and local residue | passed | Operator confirmed exact 036F row absent, no other token changed and no replacement token; process-environment and temporary residue are zero |
| Management revocation/invalidation boundary | attention | The only lifecycle exited code 3; same-token 401/403 invalidation cannot be claimed from the terminated process |
| Production trainer access | attention | No retained-pilot, Vercel, deployment, alias, OTP or Production journey began |

## Where things stand

The corrected beginner-safe interaction was activated exactly once in a private non-transcribed ConsoleHost. The process ended at its defined revocation-blocked boundary. The operator then completed the only permitted manual cleanup and returned the three sanitized facts required to prove the exact token row absent without exposing protected data.

The result is safe but blocked. Cleanup is complete, yet row absence does not recreate same-token invalidation evidence. Builder therefore stopped every downstream operation and closed at the Pack's exact permitted blocked outcome.

## Current status

Sprint 036F is closed `production-management-access-revocation-blocked`. Production remains deliberately unpromoted on the historically proven Ready rollback. Stable live trainer access, product-wide Done and the Sprint 029N gate remain incomplete.

## Since last sprint

Builder applied the exact 036F Pack from closed 036E SHA `6c632262438d84ef64931a1c360cc453621762ec`, created the scoped branch and passed the approved two-file code gate. The wrapper now binds the exact 036F branch and token stem, accepts only `fine-grained-auth-config-read`, and removes classic-PAT continuation. The deterministic suite preserves exactly 360 assertions and inherited 036C preserves 135.

One private lifecycle ran. It returned sanitized code `3`; no second lifecycle or replacement credential followed. The operator confirmed exact-token cleanup, and Builder performed no retained-pilot, Vercel, deployment, alias, OTP, mailbox, session or Production continuation.

## Architecture / file map

- `scripts/Invoke-ProtectedManagementLifecycle036D.ps1` - current 036F-bound beginner-safe wrapper and private lifecycle entrypoint.
- `scripts/protected-management-lifecycle-036D-core.mjs` - unchanged fixed provider/invalidation core at the approved SHA-256.
- `scripts/test-protected-management-lifecycle-036D.mjs` - 360-assertion 036F deterministic suite.
- `planning/sprints/036F-corrected-wrapper-live-lifecycle-retry/` - applied strict source of truth and acceptance boundaries.
- `planning/reviews/036F-corrected-wrapper-live-lifecycle-retry.md` - implementation, validation, live stop, private cleanup and external-action ledger.
- `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md` - protected interaction and 036F no-retry boundary.
- `docs/OPERATIONS_HANDOFF.md` - current operational deliberate non-promotion boundary.

## Decisions

- Close at `production-management-access-revocation-blocked`; do not convert exact-row absence into same-token invalidation proof.
- Treat the single private lifecycle as consumed. Do not create a replacement token or run a second attempt from 036F.
- Preserve the unchanged core, Product/runtime/package bytes and historically proven five-alias rollback.
- Require a separate Architect Pack and explicit authority for any genuinely new credential, provider, release or Production approach.

## Risks / watch-items

- A provider token can be absent while the required in-process same-token invalidation assertion remains unproven; these facts must not be conflated.
- Repeating the lifecycle would exceed the exact single-attempt authority and introduce a new credential boundary.
- No fresh provider projection, retained-pilot state or five-alias routing evidence was collected because the required stop preceded them.
- Production trainer acceptance, Sprint 029N and product-wide Done remain gated.

## Open questions for the Architect

- Should Production remain deliberately on the compatible rollback with no further live lifecycle attempt?
- If a genuinely new approach is desired later, what distinct revocation/invalidation mechanism and exact authority would avoid repeating the consumed 036F lifecycle?
- Should Sprint 029N remain behind Production trainer acceptance, or should the owner make a separate explicit roadmap decision?

## Evidence

- Canonical root and Git top-level exact; one worktree; scoped branch `codex/036F-corrected-wrapper-live-lifecycle-retry`; starting SHA `6c632262438d84ef64931a1c360cc453621762ec`.
- Pack SHA-256 `36AC029CC69FFE4A2397D7459A72657455035AF6D1FECC5E71AAF4FE5197D912`; dry-run/application/post-dry-run named exactly four Sprint 036F files.
- Starting hashes: wrapper `5DF552844AF0AAEDF9FFFDDBD0E63EE539238CA5D65BE4486CBB21F12042BB4D`; core `98DD491B136018AA98F1486D645EBB0AEDACFE8294D622D638B91250D598CCE1`; test `04D78E23AB3DFC897C8084CD3CE25228AB4A9E400618AF1EEF07B8187006C27F`.
- Final hashes: wrapper `653E4F57D87000724AD19F0900B6FE0B753550BB4506E3C362D27F82A3F0541B`; core unchanged `98DD491B136018AA98F1486D645EBB0AEDACFE8294D622D638B91250D598CCE1`; test `D6F7EBA42CF811BD04C2BF281636F11E72984B841A90CEF45CBE7935567E4A10`.
- Corrected suite passed 360; inherited 036C passed 135; counted total is 495 passing and zero failing. Five core plus two wrapper self-tests passed with `protectedValuesEmitted=false` and `remoteMutation=none`.
- Static validation passed 1,023 maintained files; JSON passed eight self-tests and seven files. Roles, Supabase-self, focused auth/dashboard/OTP/redirect/bootstrap/recovery/public controls, TypeScript, zero-warning lint and the 29-page Production build passed.
- Aggregate domain validation reached the known optional missing `playwright-core` dependency after preceding components passed; Pack-approved direct 031C execution passed as equivalent focused proof.
- One private non-transcribed lifecycle exited sanitized code `3`. Operator confirmed exact row absent, no other token changed and no replacement token; protected process-environment and `pp036d-*` residue are zero.
- Product/runtime diff and protected runtime imports are zero. No provider configuration, retained-pilot, Vercel, deployment, alias, OTP, mailbox, session or Production continuation occurred.

## Plan corrections

The local activation and validation plan held. The live revocation/invalidation boundary did not complete, so the plan stopped at its defined blocked outcome. Private exact-token cleanup closed the safety obligation but did not substitute for same-token invalidation. No corrective retry was introduced inside the consumed sprint authority.

## Validation / test status

**Tests:** 495 passing, 0 failing.

The corrected Sprint 036F suite passed exactly 360 assertions and inherited Sprint 036C passed 135. Core five-check and wrapper two-check self-tests passed. Static, JSON, roles, Supabase-self, focused controls, PowerShell parsing, TypeScript, zero-warning lint, the 29-page Production build, whitespace, exact scope, runtime equality, protected-data scans and environment/temp cleanup passed. The optional aggregate transport dependency was covered by the passing direct 031C substitute without weakening a security or product boundary.

## Recommended next Architect action

**Do:** Record deliberate non-promotion as the immediate direction and decide whether any genuinely different future revocation/invalidation approach is worth planning. Do not issue a retry Pack that merely repeats the consumed 036F lifecycle.

**Owner:** Architect for roadmap and any future Pack; authorized provider operator only under separate explicit live authority.

**Decision:** Sprint 036F is safely closed but revocation-blocked. Exact token cleanup is complete, same-token invalidation and Production trainer acceptance are unproven, no downstream action occurred, and Sprint 029N remains gated.
