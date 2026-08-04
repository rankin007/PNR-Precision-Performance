# Sprint 036H Acceptance

## Canonical and handoff baseline

- [x] Current directory and Git top-level equal the permanent canonical path.
- [x] Starting SHA is exact closed 036G `831d0465b4e71562d3c062bf3f55d6f0080e3173`.
- [x] Exactly one worktree is registered.
- [x] Before application, only the Pack and Architect status marker differ.
- [x] Pack dry-run/apply produces exactly four 036H sprint files.
- [x] The exact 036H branch is created from the starting SHA.
- [x] All four starting hashes match before source editing.
- [x] No unexplained user work is overwritten.

## Diagnostic taxonomy

- [x] `OtpRequestDisposition` remains exactly `indeterminate | retry-later`.
- [x] A separate exported type contains exactly five approved diagnostic values.
- [x] All nine named provider codes map exactly as specified.
- [x] Code normalization is bounded to string lowercase normalization.
- [x] Exact known code takes precedence over a conflicting status.
- [x] Only unknown-code status `429` and `>=500` fall back to approved values.
- [x] No error, identity-related response and unknown ordinary 4xx input return no diagnostic.
- [x] No message, stack, cause, header, body, email or other provider field is inspected.
- [x] Existing retry-later/indeterminate behavior is not broadened or narrowed.

## Server-action boundary

- [x] Only the existing retry-later result carries `requestDiagnostic`.
- [x] The field contains only one of the five allowlisted values.
- [x] Successful/indeterminate, configuration, invalid, unavailable and verification outcomes carry no request diagnostic.
- [x] No raw error, code, status, message, email, redirect, request identifier or provider response is returned.
- [x] `shouldCreateUser: false` and existing request/verification behavior remain unchanged.
- [x] No new Auth/admin/provider call, logging, telemetry, header, cookie or URL path exists.

## User and DOM boundary

- [x] Visible retry-later copy remains exactly `Sign-in is temporarily unavailable. Wait before requesting another code.`
- [x] Existing request-may-arrive copy remains truthful and unchanged.
- [x] No category, raw code/status or reference identifier is visible or added to accessible naming.
- [x] Exactly one non-visible `data-auth-request-diagnostic` marker exists only for active retry-later state.
- [x] The marker contains only an allowlisted category.
- [x] Diagnostic state clears before each request and on every different flow transition/non-retry-later result.
- [x] No category persists in console, analytics, storage, cookies, URLs, files or durable evidence.
- [x] Missing identities remain indistinguishable from other existing indeterminate accepted requests.

## Privacy, security and scope

- [x] No email, OTP, mailbox content, token, cookie, session, identity, customer/stable/horse data or private identifier enters output or evidence.
- [x] No provider payload, raw message, raw code/status or protected value is retained.
- [x] No live OTP request, verification, mailbox/provider-log inspection or browser authentication occurs.
- [x] No credential is created, entered, read, changed or stored.
- [x] No provider/Auth/SMTP/template/callback/rate-limit setting changes.
- [x] No deployment, staging, promotion, rollback, alias, DNS, environment or data mutation occurs.
- [x] No schema, migration, RLS, role, permission, identity, fixture, Storage, dependency, package, lockfile or runtime-configuration change occurs.
- [x] Changed files remain exactly within the approved set.
- [x] No commit, push, merge, PR, force-push or history rewrite occurs.

## Validation

- [x] New `scripts/test-auth-request-diagnostics-036H.mjs` passes with all counted assertions reported.
- [x] Retained Sprint 035D email OTP source-contract test passes.
- [x] Retained Sprint 035C passwordless redirect test passes.
- [x] Retained Sprint 035F OTP recovery test passes.
- [x] Retained Sprint 035K live-access source-contract test passes.
- [x] TypeScript passes.
- [x] Lint passes with zero warnings.
- [x] Production build passes, or an equivalent-or-stronger local proof is documented under the Evidence-Proportional Execution Standard.
- [x] `git diff --check`, JSON, exact scope, encoding, secret/private-data and generated-residue checks pass.
- [x] Validation makes no network or external-system call.

## Documentation and closeout

- [x] Authentication docs describe only the proven local safe taxonomy and generic public behavior.
- [x] Operations handoff says 036H cannot identify the historical 036G cause and grants no retry.
- [x] Review records exact files, assertion arithmetic, commands/results, zero external actions and any substitute proof.
- [x] State/status/roadmap/lifecycle/evidence/briefing records are updated proportionally.
- [x] Briefing includes v8 executive summary, readiness signals, exact test counts, Evidence and Plan corrections.
- [x] Production remains recorded five/five on exact Ready rollback; candidate remains unaccepted.
- [x] Live trainer access and Sprint 029N remain gated.
- [x] Final status is exactly one permitted outcome.

Only `privacy-safe-authentication-diagnostic-ready-local-clean` completes Sprint 036H's local objective. It does not complete the live trainer-access gate.
