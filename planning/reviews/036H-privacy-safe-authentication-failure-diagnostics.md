# Sprint 036H Review

## Outcome

Closed `privacy-safe-authentication-diagnostic-ready-local-clean` on 2026-08-05 AEST. Sprint 036H proves a prospective local five-category authentication-request diagnostic contract with zero live or external activity. It does not identify the historical Sprint 036G cause or authorize another request.

## Authority and baseline

- Current directory and normalized Git top-level both equal the permanent canonical repository.
- Branch is exactly `codex/036H-privacy-safe-authentication-failure-diagnostics` at starting SHA `831d0465b4e71562d3c062bf3f55d6f0080e3173` with one registered worktree.
- The Pack dry run reported exactly four creates; application created exactly the four strict Sprint 036H files.
- Pre-edit hashes matched requirements for `lib/auth/otp-request.ts`, `app/auth/actions.ts`, `components/auth/sign-in-form.tsx` and retained `scripts/test-email-otp-035D.mjs`.
- The only pre-implementation changes were the Architect Pack, status marker and four applied sprint files. No unexplained user work was overwritten.

## Exact implementation

- `lib/auth/otp-request.ts` adds the exact five-value `OtpRequestDiagnostic` union and a separate classifier. The existing `OtpRequestDisposition` and `classifyOtpRequestError` behavior remain unchanged.
- Exact known code wins before fallback. Only unknown-code status `429` maps to `cooldown`; unknown `>=500` maps to `provider-unavailable`; all other inputs return no diagnostic.
- `app/auth/actions.ts` adds only the allowlisted `requestDiagnostic` field to the existing `retry-later` result. It adds no Auth call and returns no raw error, code, status, message, email, redirect or identifier.
- `components/auth/sign-in-form.tsx` preserves both visible request messages exactly. The category exists only in ephemeral state and one hidden `data-auth-request-diagnostic` marker while retry-later is active, with explicit clearing before each request/verification and on email/reset/recovery transitions.
- `scripts/test-auth-request-diagnostics-036H.mjs` supplies the approved 70 assertions: 27 taxonomy/precedence, 13 retained-disposition parity, 12 server-action and 18 form/privacy/clearing checks.

## Validation

- New Sprint 036H test passed exactly 70 assertions.
- Retained Sprint 035K test passed exactly 99 assertions. Counted total: `70 + 99 = 169` passing, zero failing.
- Retained Sprint 035D email OTP, 035C passwordless redirect and 035F recovery scripts passed; they remain separate pass-contract scripts and are not added to the counted arithmetic.
- `npm run typecheck` passed.
- `npm run lint -- --max-warnings=0` passed with zero warnings.
- `npm run build` passed, compiled successfully and generated 29 pages/routes.
- Exact source scope passed four/four. Package, lockfile, configuration, migration, schema and RLS scope remained unchanged.
- `git diff --check`, status JSON, strict UTF-8/no-BOM/final-newline, trailing-whitespace, secret-like material, email/private-data, diagnostic-persistence, raw-provider-output and generated-residue checks passed.

## Implementation hashes

- `lib/auth/otp-request.ts`: `B7502F1A066B52CA281C5CF6220276750EE42E311728604D67A6102F05A9FC44`
- `app/auth/actions.ts`: `9AD3B90E2CF843C5A7EEEC98375561074CE76430F7C7AEA73959397212CCF0EC`
- `components/auth/sign-in-form.tsx`: `B086A5CC07EC0FBD22B60D61BAD7DACC9A5E9DA0546AF78319143D492106CA33`
- `scripts/test-auth-request-diagnostics-036H.mjs`: `D56D9909199C4309509E8C5CDC8617903854504C3D39563A89243244C8DA9D47`

## External-action ledger

- OTP requests and verifications: `0/0`.
- Mailbox, provider-log, Auth-user and browser-authentication operations: `0`.
- Credentials created, entered, read, changed or stored: `0`.
- Provider/Auth/SMTP/template/callback/rate-limit setting changes: `0`.
- Deployments, staging, promotion, rollback, alias, DNS and environment actions: `0`.
- Schema, migration, RLS, role, permission, identity, fixture, application-data and Storage mutations: `0`.
- Git commits, pushes, merges, PRs and history rewrites: `0`.

## Plan correction

The first new-test run found a deterministic harness slice anchored to an earlier effect cleanup `return` rather than the component render. The test-only anchor was narrowed to search after `verifyCode`; the same 70-assertion target then passed. Product behavior and scope did not change.

## Current live boundary

Sprint 036G's historical `retry-later` category remains unrecoverable because raw provider detail was intentionally not retained. All five Production aliases remain on exact Ready rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`; candidate `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf` remains unaccepted. Sprint 036H grants no retry or Production authority, and Sprint 029N remains gated.
