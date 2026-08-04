# Sprint 036H - Privacy-Safe Authentication Failure Diagnostics

## Outcome

Replace the current undifferentiated OTP-request operational failure with a bounded, privacy-safe diagnostic contract that can distinguish cooldown, delivery-policy, provider-configuration, transport-timeout and provider-unavailable conditions without exposing provider payloads, identity facts or protected values.

Sprint 036H is local source, deterministic validation and documentation work only. It sends no authentication request, inspects no mailbox or provider log, changes no hosted setting, deploys nothing and moves no Production alias. It cannot reconstruct which category caused Sprint 036G's historical `retry-later` result, so the 036G root cause remains unresolved and all five aliases remain on the exact Ready rollback.

Target outcome: `privacy-safe-authentication-diagnostic-ready-local-clean`.

The resulting local contract prepares a genuinely distinct later acceptance approach. It does not grant another OTP attempt, candidate cutover, deployment, provider read or Production action. Sprint 029N remains gated.

## Workflow profile

Use `strict`. The source change touches an unauthenticated Production authentication surface and operational provider-error handling, where identity enumeration, raw provider output, personal data, secrets and misleading success claims require explicit protection.

Strict controls attach to the exact error taxonomy, public non-enumeration behavior, allowlisted diagnostic output, ephemeral browser state, source/test file scope and proof that no live or external action occurred. Strict does not require a browser, provider log, mailbox or network call when deterministic local proof establishes the approved boundary.

## Canonical starting authority

Start only from:

`C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`

Before any action, resolve the current directory and `git rev-parse --show-toplevel`; both must equal that path after normalizing Windows separators. Expected closed Sprint 036G authority is local SHA `831d0465b4e71562d3c062bf3f55d6f0080e3173` on `codex/036G-immediate-trainer-access-recovery-and-minimal-production-cutover` with a clean worktree before the Architect handoff. The repository currently has no local remote-tracking ref for the 036G branch; that fact does not permit a fetch, push, merge, rewrite or alternate starting point in this sprint.

The only expected Architect handoff changes are this Pack and `planning/STATUS.json`. Any other uncommitted path, changed starting SHA, extra worktree or ambiguous repository target is a material baseline mismatch until reconciled.

Dry-run and apply this Pack, verify exactly four generated sprint files, and create only `codex/036H-privacy-safe-authentication-failure-diagnostics` from the exact starting SHA while preserving the Architect handoff. Do not use a legacy OneDrive clone, `C:\tmp` checkout/worktree, deployment directory, alternate history or Sprint 035Q.

## Source authority

Use, in descending order:

1. `AGENTS.md`, including the canonical-workspace guard, Architect/Builder separation, Evidence-Proportional Execution Standard and Manual Intervention Rule.
2. This Sprint 036H Pack after Builder applies it and verifies exactly four generated files.
3. The closed Sprint 036G briefing, state, decisions, risks, acceptance and review for the consumed retry, generic `retry-later`, exact rollback and no-further-attempt boundary.
4. Current `lib/auth/otp-request.ts`, `app/auth/actions.ts`, `components/auth/sign-in-form.tsx` and the retained Sprint 035C/035D/035F/035K authentication tests.
5. `docs/AUTH_RLS_PORTAL_ACCESS.md`, `docs/OPERATIONS_HANDOFF.md`, `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md`, `docs/WORKFLOW_PROFILE.md` and `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`.
6. Current official Supabase Auth error-code and rate-limit documentation at `https://supabase.com/docs/guides/auth/debugging/error-codes` and `https://supabase.com/docs/guides/auth/rate-limits`, plus the official troubleshooting boundary at `https://supabase.com/docs/guides/troubleshooting/not-receiving-auth-emails-from-the-supabase-project-OFSNzw`.

Official documentation is mechanism authority only. It supports code-first error classification and rate-limit interpretation; it does not prove the historical 036G category, current provider configuration, message delivery, live compatibility or permission for any external action.

## Task contract

**objective:** Create and prove a local privacy-safe OTP-request diagnostic contract that distinguishes five operational failure categories while preserving the existing generic public response, non-enumeration behavior and zero live/external activity.

**owns:** Exact canonical and starting-SHA reconciliation; code-first classification of the existing operational retry-later errors into an allowlisted five-category type; safe server-action propagation only on the existing retry-later branch; one ephemeral non-visible DOM marker for controlled future evidence; deterministic no-network tests; focused authentication regressions; TypeScript, zero-warning lint and Production build; proportional authentication/operations documentation and sprint closeout records.

**must_not:** Send or retry an OTP; call `signInWithOtp`, `verifyOtp` or any hosted Auth endpoint during validation; inspect or automate a mailbox; inspect provider logs, user lists, identities or raw provider responses; include an email, OTP, token, session, cookie, request identifier, provider message, raw code or raw status in diagnostic output; change visible sign-in wording; distinguish missing, retained or unauthorized application identities; persist diagnostics in logs, analytics, URLs, query strings, local/session storage, cookies, files or external systems; change Supabase/Vercel/Auth/SMTP/template/callback/rate-limit settings; create or use credentials; deploy, stage, promote, roll back or move aliases; change schema, RLS, roles, permissions, identity, fixture, data, Storage, dependencies, lockfiles, runtime configuration or unrelated Product behavior; implement Sprint 029N; commit, push, merge, open a PR, force-push or rewrite history.

**acceptance:** The existing public disposition remains exactly `indeterminate | retry-later`; accepted/missing-identity behavior remains indistinguishable; a separate allowlisted diagnostic classifier uses normalized provider code before narrow status fallback; the five categories and exact mappings are deterministic; only retry-later responses carry a request diagnostic; the sign-in form retains the exact generic visible failure copy and exposes the category only through one ephemeral non-visible `data-auth-request-diagnostic` marker; the marker clears on every new flow transition; raw provider detail and protected values cannot enter output or persistence; existing focused authentication tests, the new 036H test, TypeScript, zero-warning lint and Production build pass; and evidence proves zero network/provider/mailbox/credential/deployment/alias/data activity.

**verification:** Run Pack dry-run/four-target proof; canonical path/status/SHA/single-worktree checks; exact starting-file hashes; the new deterministic 036H classifier/action/form contract test; retained Sprint 035D OTP, 035C redirect, 035F recovery and 035K live-access source-contract tests; TypeScript, zero-warning lint and Production build; exact file-scope, diff, JSON, whitespace, encoding, secret/private-data, forbidden-output and generated-residue checks; and final status/closeout reconciliation with one permitted outcome.

## Deliberate 036H decisions

### No retroactive root-cause claim

Sprint 036G returned only `retry-later`; the raw provider code/status/message was intentionally not retained. Sprint 036H must state that the historical category cannot be recovered from repository evidence. Do not infer cooldown merely because a retry occurred, infer delivery failure because no code arrived, or infer provider misconfiguration from an operationally generic response.

The new contract is prospective local observability for a separately planned future attempt. No future attempt is part of 036H.

### Code-first allowlisted taxonomy

Preserve `classifyOtpRequestError` and its existing public dispositions. Add a separate exported request-diagnostic type and classifier whose output is one of exactly:

- `cooldown`
- `delivery-policy`
- `provider-configuration`
- `transport-timeout`
- `provider-unavailable`

Classification must normalize a string code to lowercase and choose an exact known code before any status fallback:

| Diagnostic | Exact provider codes |
|---|---|
| `cooldown` | `over_email_send_rate_limit`, `over_request_rate_limit` |
| `delivery-policy` | `email_address_not_authorized` |
| `provider-configuration` | `email_provider_disabled`, `otp_disabled` |
| `transport-timeout` | `hook_timeout`, `hook_timeout_after_retry`, `request_timeout` |
| `provider-unavailable` | `unexpected_failure` |

Only when no exact known code matches may status `429` map to `cooldown` and status `500` or greater map to `provider-unavailable`. Every other input, including no error, an unknown 4xx code/status and identity-related responses, returns no diagnostic.

Do not inspect or match `error.message`, stack, cause, headers, response body, email or any other provider field. A known code wins even if a synthetic test supplies a conflicting status; this proves the official code-first contract.

### Server-action and browser boundary

`requestEmailOtpAction` retains its existing request behavior and generic `reason: "retry-later"`. On that branch only, it may add `requestDiagnostic` from the allowlisted classifier. It must never return the raw error, code, status, message, email, redirect target, provider response or identifier. Successful/indeterminate, configuration, invalid, unavailable and OTP-verification results must not gain a request diagnostic.

The sign-in form retains the exact visible message `Sign-in is temporarily unavailable. Wait before requesting another code.` It may keep the allowlisted category only in ephemeral React state while that retry-later notice is active and expose it through exactly one non-visible `data-auth-request-diagnostic` marker. Do not render category text, change an ARIA label, add a visible reference code or claim a code was sent.

Clear the marker before every new request and whenever the flow changes through a different email, existing-code recovery, successful request, verification, cancellation/reset or another non-retry-later result. Do not use `console`, telemetry, analytics, local/session storage, cookies, URL/search parameters or durable evidence for the category.

### Public non-enumeration and privacy

Missing identities and other intentionally indeterminate responses continue to share the same existing accepted response. The new diagnostic is derived only from the already rejected operational branch; it must not add a lookup, identity test, admin call or new provider request.

The allowlisted values contain no personal data or secret. Tests must prove no raw provider code/status/message, email, OTP, token, session, cookie or request identifier can be emitted through the new field/marker. User-visible copy remains truthful and generic.

## Starting file hashes

- `lib/auth/otp-request.ts`: `96694B7AF0C1D691B4B76E14AE86E2E960F1CE4C5386894185B7FD84F2F59ADA`
- `app/auth/actions.ts`: `5214A21E3D49BEA8C5C7E093193A92EEA26EBACE67F1E5F7983D4D8607450DF3`
- `components/auth/sign-in-form.tsx`: `6DDEB84FE17141873F9024464F40E99952548C0920882A4E698A975075B1F04D`
- retained `scripts/test-email-otp-035D.mjs`: `A8D5467A4EDBAD4AEDFF0EE6C5A7474AD17EAFFDA79CA33B0A9F62DACA7A0367`

Builder must reconcile these before source editing. A mismatch requires diagnosis against the exact starting SHA; do not overwrite unexplained work.

## Approved files and actions

Builder may change only:

- the four generated Sprint 036H files;
- `lib/auth/otp-request.ts`;
- `app/auth/actions.ts`;
- `components/auth/sign-in-form.tsx`;
- new `scripts/test-auth-request-diagnostics-036H.mjs`;
- `docs/AUTH_RLS_PORTAL_ACCESS.md` and `docs/OPERATIONS_HANDOFF.md` for proven local diagnostic and no-live-action boundaries;
- new `planning/reviews/036H-privacy-safe-authentication-failure-diagnostics.md`;
- proportional current updates to `planning/STATE.md`, `planning/STATUS.json`, `planning/ROADMAP.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/SPRINT_SCHEDULE.md`, `planning/EVIDENCE_INDEX.md`, `planning/ARCHITECT_BRIEFING.md`, `planning/DECISIONS.md`, `planning/RISKS.md` and `planning/QUESTIONS.md` only where final authority changes.

No change to `components/ui/notice.tsx`, an existing historical test, `package.json`, a lockfile, environment/configuration, migration, schema, RLS, role, permission or provider/runtime integration is approved.

Approved actions are local file edits and local deterministic validation only. Read-only local Git inspection and official-documentation reading are allowed. Network/provider/browser/mailbox/credential/authentication/deployment/alias/data actions and Git commit/push/PR/merge actions are outside Sprint 036H.

## Evidence-proportional execution and manual intervention

Stop only for a material canonical/starting-SHA mismatch, unexpected source ownership conflict, protected-data/output risk, non-enumeration regression, unauthorized file/scope expansion, dependency/configuration need, live/external action, integrity failure or cleanup that cannot be proven safe.

Use equivalent or stronger safe local proof when an optional supporting tool is unavailable. Keep deterministic test-harness, reporter, formatting, encoding and validator corrections inside 036H when they preserve this contract. Do not create another follow-up solely because a browser, renderer, network, provider log, mailbox adapter or optional CLI path is unavailable; none is required for this local outcome.

No manual intervention is expected. If a requirement remains materially blocked after safe local alternatives are exhausted, record what is blocked, evidence already checked, the exact secret-free human action needed, step-by-step instructions, and what Builder will verify afterward. Never ask a human to send an OTP, open a mailbox, disclose a protected value, inspect provider data, change configuration or perform a Production action under 036H.
