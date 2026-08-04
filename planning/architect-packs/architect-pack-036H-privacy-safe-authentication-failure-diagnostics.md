============================================================
FILE: planning/sprints/036H-privacy-safe-authentication-failure-diagnostics/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/036H-privacy-safe-authentication-failure-diagnostics/blueprint.md
============================================================

# Sprint 036H Blueprint

## Delivery sequence

1. Verify canonical path, exact closed 036G SHA, single worktree and expected two-file Architect handoff.
2. Dry-run and apply the Pack; prove exactly four generated 036H files; create the exact 036H branch from the exact starting SHA.
3. Read all four generated files and the named 036G/authentication authorities.
4. Reconcile the four starting hashes and current behavior without editing source.
5. Stop at the Builder code gate with the exact four source/test paths, intended per-file changes, scope guards and acceptance checks.
6. After the code gate is satisfied, implement the smallest code-first diagnostic classifier, safe server-action propagation, ephemeral non-visible marker and deterministic test.
7. Run focused tests and full proportional validation without any network, hosted Auth, browser, mailbox, credential or provider action.
8. Inspect the exact diff and forbidden-output scans; update only proportional docs/planning records; close with one permitted outcome and stop.

No step sends an OTP, uses a provider credential, opens a mailbox, queries a provider, deploys, changes an alias or commits/pushes Git state.

## Gate A - canonical and baseline

Require:

- current directory and Git top-level equal the permanent canonical path;
- `HEAD` equals `831d0465b4e71562d3c062bf3f55d6f0080e3173` before branch creation;
- starting branch is closed 036G;
- exactly one worktree is registered;
- only this Pack and `planning/STATUS.json` are changed before application;
- Pack dry-run reports exactly the four expected new targets;
- Pack application creates exactly those four files; and
- the four starting hashes in requirements match.

The absent local remote-tracking ref for 036G is recorded starting context, not permission to fetch, push or replace the local closed authority. Any different SHA, unexplained file or extra worktree is reconciled before source work.

## Code gate content

Before changing any source or test file, Builder reports this exact intended set:

| File | Intended change |
|---|---|
| `lib/auth/otp-request.ts` | Add the five-value request-diagnostic type and code-first allowlisted classifier without changing the existing public disposition contract. |
| `app/auth/actions.ts` | Return only the allowlisted request diagnostic on the existing retry-later branch; return no raw provider detail. |
| `components/auth/sign-in-form.tsx` | Preserve visible copy; keep the category ephemerally and expose exactly one non-visible marker only while retry-later is active. |
| `scripts/test-auth-request-diagnostics-036H.mjs` | Add deterministic no-network taxonomy, precedence, propagation, marker, clearing, privacy and regression assertions. |

Builder also states that `components/ui/notice.tsx`, existing historical tests, packages, lockfiles, configuration, migrations and every external system remain unchanged.

## Gate B - diagnostic classifier

In `lib/auth/otp-request.ts`:

1. Preserve `OtpRequestDisposition` and `classifyOtpRequestError` behavior.
2. Add an exported exact union for the five diagnostic strings.
3. Add an exported classifier returning that union or no diagnostic.
4. Normalize only a string `error.code`; do not read a message or body.
5. Apply the exact code mapping from requirements in table order.
6. Use status fallback only when no known code matched: `429` to `cooldown`, `>=500` to `provider-unavailable`, otherwise no diagnostic.
7. Prove code precedence with conflicting synthetic statuses.

Do not broaden the existing retry-later error set. If an official code not named by this Pack appears relevant, record it for Architect review rather than inventing a sixth value or silently changing behavior.

## Gate C - safe propagation and ephemeral marker

In `app/auth/actions.ts`:

- type retry-later results so they carry exactly `requestDiagnostic` from the new classifier;
- call the classifier only on the existing operational rejection path;
- retain `reason: "retry-later"` and all successful/indeterminate semantics;
- never return the raw error, code, status, message, email, redirect target or identifier; and
- do not add logging, analytics, headers, cookies or URL state.

In `components/auth/sign-in-form.tsx`:

- keep the exact current visible retry-later and request-may-arrive messages;
- do not display category text or a reference code;
- retain the category only in component state while the retry-later notice is active;
- expose exactly one `data-auth-request-diagnostic` attribute associated with that notice;
- clear diagnostic state before a request and on every flow transition or non-retry-later result; and
- add no storage, query-string, cookie, telemetry or console path.

The DOM marker is allowed because its values are closed, operational, non-personal and non-secret. It must never contain a provider code/status/message or identity-dependent fact.

## Gate D - deterministic verification

The new test must use synthetic objects and source-contract checks only. It must not import a Supabase client, read environment values or make a network request.

At minimum prove:

- all nine exact known codes map to the five approved values;
- string codes normalize safely;
- known code wins over conflicting synthetic status;
- unknown code with `429` maps to `cooldown`;
- unknown code with `500` and `503` maps to `provider-unavailable`;
- no error and unknown non-429/non-5xx inputs return no diagnostic;
- the existing `classifyOtpRequestError` results remain unchanged for its retained cases;
- action source adds only allowlisted `requestDiagnostic` to retry-later;
- form source preserves exact generic copy and one non-visible marker;
- diagnostic state has explicit clearing paths;
- no raw error/message/status/email/OTP/token/session/request identifier is propagated or persisted; and
- no console, analytics, local/session storage, cookie or URL/search-parameter diagnostic path exists.

Run from the repository root:

`node --experimental-strip-types scripts/test-auth-request-diagnostics-036H.mjs`

`node --experimental-strip-types scripts/test-email-otp-035D.mjs`

`node --experimental-strip-types scripts/test-passwordless-redirect-035C.mjs`

`node --experimental-strip-types scripts/test-otp-recovery-path-035F.mjs`

`node --experimental-strip-types scripts/test-live-trainer-access-035K.mjs`

`npm run typecheck`

`npm run lint -- --max-warnings=0`

`npm run build`

If a supporting aggregate command is unavailable, use the exact focused commands above plus an equivalent-or-stronger local proof. Do not substitute a live request or external system for a local validation limitation.

## Gate E - safety and closeout

Before closeout:

1. require `git diff --check` to pass;
2. require the changed-file set to stay within the approved list;
3. parse `planning/STATUS.json` and any changed JSON;
4. scan the diff for secrets, personal data, provider payloads, raw diagnostic fields, generated artifacts and encoding damage;
5. prove no package, lockfile, configuration, migration, schema, RLS, provider or deployment file changed;
6. record that no network/Auth/mailbox/credential/browser/provider/deployment/alias/data action occurred;
7. document that 036G's historical cause remains unknown and Production remains five/five rollback;
8. keep Sprint 029N gated; and
9. refresh the v8 Architect briefing and proportional lifecycle/roadmap records.

Do not commit or push. Leave the completed local sprint for a later explicit Git instruction.

## Permitted outcomes

- `privacy-safe-authentication-diagnostic-ready-local-clean` - target; the local five-category contract and all validation pass with zero external activity.
- `diagnostic-privacy-contract-blocked-clean` - no implementation can meet the non-enumeration/output/persistence boundary inside the approved files; no external activity occurred.
- `canonical-or-source-baseline-mismatch-blocked-clean` - starting authority or file ownership could not be reconciled safely.
- `diagnostic-scope-or-integrity-failure-blocked-clean` - a material unauthorized dependency/configuration/scope expansion or failed integrity boundary remains after focused correction attempts.

No permitted outcome claims the 036G root cause, live authentication, message delivery, candidate acceptance, Production promotion or Sprint 029N readiness.

============================================================
FILE: planning/sprints/036H-privacy-safe-authentication-failure-diagnostics/acceptance.md
============================================================

# Sprint 036H Acceptance

## Canonical and handoff baseline

- [ ] Current directory and Git top-level equal the permanent canonical path.
- [ ] Starting SHA is exact closed 036G `831d0465b4e71562d3c062bf3f55d6f0080e3173`.
- [ ] Exactly one worktree is registered.
- [ ] Before application, only the Pack and Architect status marker differ.
- [ ] Pack dry-run/apply produces exactly four 036H sprint files.
- [ ] The exact 036H branch is created from the starting SHA.
- [ ] All four starting hashes match before source editing.
- [ ] No unexplained user work is overwritten.

## Diagnostic taxonomy

- [ ] `OtpRequestDisposition` remains exactly `indeterminate | retry-later`.
- [ ] A separate exported type contains exactly five approved diagnostic values.
- [ ] All nine named provider codes map exactly as specified.
- [ ] Code normalization is bounded to string lowercase normalization.
- [ ] Exact known code takes precedence over a conflicting status.
- [ ] Only unknown-code status `429` and `>=500` fall back to approved values.
- [ ] No error, identity-related response and unknown ordinary 4xx input return no diagnostic.
- [ ] No message, stack, cause, header, body, email or other provider field is inspected.
- [ ] Existing retry-later/indeterminate behavior is not broadened or narrowed.

## Server-action boundary

- [ ] Only the existing retry-later result carries `requestDiagnostic`.
- [ ] The field contains only one of the five allowlisted values.
- [ ] Successful/indeterminate, configuration, invalid, unavailable and verification outcomes carry no request diagnostic.
- [ ] No raw error, code, status, message, email, redirect, request identifier or provider response is returned.
- [ ] `shouldCreateUser: false` and existing request/verification behavior remain unchanged.
- [ ] No new Auth/admin/provider call, logging, telemetry, header, cookie or URL path exists.

## User and DOM boundary

- [ ] Visible retry-later copy remains exactly `Sign-in is temporarily unavailable. Wait before requesting another code.`
- [ ] Existing request-may-arrive copy remains truthful and unchanged.
- [ ] No category, raw code/status or reference identifier is visible or added to accessible naming.
- [ ] Exactly one non-visible `data-auth-request-diagnostic` marker exists only for active retry-later state.
- [ ] The marker contains only an allowlisted category.
- [ ] Diagnostic state clears before each request and on every different flow transition/non-retry-later result.
- [ ] No category persists in console, analytics, storage, cookies, URLs, files or durable evidence.
- [ ] Missing identities remain indistinguishable from other existing indeterminate accepted requests.

## Privacy, security and scope

- [ ] No email, OTP, mailbox content, token, cookie, session, identity, customer/stable/horse data or private identifier enters output or evidence.
- [ ] No provider payload, raw message, raw code/status or protected value is retained.
- [ ] No live OTP request, verification, mailbox/provider-log inspection or browser authentication occurs.
- [ ] No credential is created, entered, read, changed or stored.
- [ ] No provider/Auth/SMTP/template/callback/rate-limit setting changes.
- [ ] No deployment, staging, promotion, rollback, alias, DNS, environment or data mutation occurs.
- [ ] No schema, migration, RLS, role, permission, identity, fixture, Storage, dependency, package, lockfile or runtime-configuration change occurs.
- [ ] Changed files remain exactly within the approved set.
- [ ] No commit, push, merge, PR, force-push or history rewrite occurs.

## Validation

- [ ] New `scripts/test-auth-request-diagnostics-036H.mjs` passes with all counted assertions reported.
- [ ] Retained Sprint 035D email OTP source-contract test passes.
- [ ] Retained Sprint 035C passwordless redirect test passes.
- [ ] Retained Sprint 035F OTP recovery test passes.
- [ ] Retained Sprint 035K live-access source-contract test passes.
- [ ] TypeScript passes.
- [ ] Lint passes with zero warnings.
- [ ] Production build passes, or an equivalent-or-stronger local proof is documented under the Evidence-Proportional Execution Standard.
- [ ] `git diff --check`, JSON, exact scope, encoding, secret/private-data and generated-residue checks pass.
- [ ] Validation makes no network or external-system call.

## Documentation and closeout

- [ ] Authentication docs describe only the proven local safe taxonomy and generic public behavior.
- [ ] Operations handoff says 036H cannot identify the historical 036G cause and grants no retry.
- [ ] Review records exact files, assertion arithmetic, commands/results, zero external actions and any substitute proof.
- [ ] State/status/roadmap/lifecycle/evidence/briefing records are updated proportionally.
- [ ] Briefing includes v8 executive summary, readiness signals, exact test counts, Evidence and Plan corrections.
- [ ] Production remains recorded five/five on exact Ready rollback; candidate remains unaccepted.
- [ ] Live trainer access and Sprint 029N remain gated.
- [ ] Final status is exactly one permitted outcome.

Only `privacy-safe-authentication-diagnostic-ready-local-clean` completes Sprint 036H's local objective. It does not complete the live trainer-access gate.

============================================================
FILE: planning/sprints/036H-privacy-safe-authentication-failure-diagnostics/handoff-prompt.md
============================================================

You are Builder for Sprint 036H - Privacy-Safe Authentication Failure Diagnostics.

Your one objective is to create and prove a local privacy-safe OTP-request diagnostic contract that distinguishes five operational failure categories while preserving the existing generic public response, non-enumeration behavior and zero live/external activity.

Start only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`. Resolve current directory and Git top-level; both must equal it after normalizing Windows separators. Require exact closed 036G SHA `831d0465b4e71562d3c062bf3f55d6f0080e3173`, exactly one worktree and only this Pack plus `planning/STATUS.json` as the Architect handoff. The absent local 036G remote-tracking ref is known context and grants no fetch/push/rebase permission.

Dry-run/apply `planning/architect-packs/architect-pack-036H-privacy-safe-authentication-failure-diagnostics.md`, verify exactly four generated files, create only `codex/036H-privacy-safe-authentication-failure-diagnostics` from the exact starting SHA, and execute only from the generated files. Never use a legacy path, `C:\tmp` worktree, deployment directory, alternate history or Sprint 035Q.

Read the agent identity, `AGENTS.md`, all four generated files, current state/status/roadmap/briefing, complete closed 036G authority, the current auth source/tests, authentication/operations/protected-process docs, workflow profile, design/messaging authority and current official Supabase Auth error/rate-limit documentation.

The task contract is:

**objective:** Create and prove a local privacy-safe OTP-request diagnostic contract that distinguishes five operational failure categories while preserving the existing generic public response, non-enumeration behavior and zero live/external activity.

**owns:** Canonical/starting-SHA proof; code-first five-category classifier; safe retry-later-only action propagation; ephemeral non-visible marker; deterministic no-network test; retained focused auth tests; TypeScript/lint/build; proportional docs and closeout.

**must_not:** Send/verify an OTP; access mailbox/provider logs/users/raw responses; expose or persist personal/protected/provider detail; change visible copy or identity indistinguishability; add logs/analytics/storage/cookies/URL diagnostics; change provider/config/deployment/alias/schema/RLS/role/identity/data/dependency/runtime behavior; implement 029N; commit/push/merge/PR/rewrite history.

**acceptance:** Existing public disposition and missing-identity behavior remain unchanged; a separate code-first classifier returns exactly cooldown, delivery-policy, provider-configuration, transport-timeout or provider-unavailable under the exact mapping; only retry-later carries the allowlisted field; the form keeps exact generic copy and one ephemeral non-visible marker with complete clearing; raw/protected detail cannot escape or persist; focused tests/typecheck/zero-warning lint/build and safety scans pass; external activity is zero.

**verification:** Run Pack/four-target and canonical/SHA/worktree/hash proof; new 036H deterministic test; retained 035D/035C/035F/035K focused tests; TypeScript, zero-warning lint and Production build; exact scope/diff/JSON/whitespace/encoding/secret/private-data/residue checks; and close with one permitted outcome.

Before changing source or tests, stop at the Builder code gate and present the exact four-file plan for `lib/auth/otp-request.ts`, `app/auth/actions.ts`, `components/auth/sign-in-form.tsx` and new `scripts/test-auth-request-diagnostics-036H.mjs`, plus the unchanged files, privacy/non-enumeration guards and acceptance checks. Do not edit source until that code-gate response is explicit.

Starting hashes are request classifier `96694B7AF0C1D691B4B76E14AE86E2E960F1CE4C5386894185B7FD84F2F59ADA`, actions `5214A21E3D49BEA8C5C7E093193A92EEA26EBACE67F1E5F7983D4D8607450DF3`, form `6DDEB84FE17141873F9024464F40E99952548C0920882A4E698A975075B1F04D`, and retained 035D test `A8D5467A4EDBAD4AEDFF0EE6C5A7474AD17EAFFDA79CA33B0A9F62DACA7A0367`.

Preserve `classifyOtpRequestError` exactly. Add a separate classifier with five values. Map exact code before status: rate-limit codes to cooldown; `email_address_not_authorized` to delivery-policy; email/OTP disabled to provider-configuration; hook/request timeouts to transport-timeout; unexpected failure to provider-unavailable. Only unknown-code 429 and >=500 receive fallback. Read no error message/body or identity field.

Return only `requestDiagnostic` on the existing retry-later action result. Preserve all accepted/indeterminate and verification behavior. Return no raw code/status/message/error/email/redirect/identifier.

Keep the current visible retry-later text exact. Hold the category only in ephemeral state and expose exactly one non-visible `data-auth-request-diagnostic` marker while that notice is active. Clear it before new requests and every other transition. Do not display or persist it.

The new test is synthetic and no-network. Prove all mappings, code precedence, status fallbacks, null cases, retained disposition behavior, action/form contract, clearing and forbidden-output/persistence rules. Run the exact commands in the blueprint, then inspect the diff and records.

Apply the Evidence-Proportional Execution Standard. Use equivalent or stronger local proof for optional tooling, keep contract-preserving deterministic corrections inside 036H, and stop only for a material target, source ownership, privacy/non-enumeration, scope, integrity or cleanup boundary. No manual live/provider/mailbox action is an acceptable substitute.

Close `privacy-safe-authentication-diagnostic-ready-local-clean` only when the local contract and all proof pass with zero external activity. State plainly that 036G's cause is still unknown, all five Production aliases remain on exact Ready rollback, the candidate is unaccepted, no new retry exists and Sprint 029N remains gated. Do not begin another sprint or any Git/external action.
