# Sprint 035I Acceptance

## Baseline and owner/provider authority

- [ ] Exact 035H branch/SHA, remote equality and clean worktree pass.
- [ ] Exact Supabase/Preview/callback/provider/deployment/identity/zero-state baseline passes.
- [ ] Owner confirms dedicated Gmail mailbox, plus-alias readiness, local testing/internal classification, restricted-scope acceptance, no-server handling and private OAuth readiness through sanitized evidence only.
- [ ] No public publishing, broader test user, billing, verification/security-assessment or organization-policy change is required or performed.

## Gmail OAuth and secure store

- [ ] Google Cloud project is exact/owner-controlled/test-only; Gmail API and one Desktop client are the only relevant additions.
- [ ] OAuth requests exactly `gmail.readonly` and no other Google scope.
- [ ] System-browser Desktop flow uses `127.0.0.1` ephemeral loopback, PKCE S256 and validated state; no webview or OOB copy/paste exists.
- [ ] Only the dedicated mailbox test user/internal account can authorize the local adapter.
- [ ] Client configuration and refresh token are stored only in current-user Windows Credential Manager under fixed non-identifying targets.
- [ ] Access tokens remain process-memory-only; no credential/token file, argument, global/parent environment, history, clipboard or output exposure occurs.
- [ ] Testing-token expiry/revocation and `invalid_grant` reauthorize only before send; after reservation they force cleanup-only.
- [ ] Exact granted scope, secure-store readiness and sanitized project/client fingerprints are independently verified.

## Gmail mailbox adapter

- [ ] `users.getProfile` privately proves the dedicated mailbox and derives a fresh plus-address in memory.
- [ ] `messages.list/get` use `userId=me`, bearer header, bounded sender/time window, small result cap, spam/trash exclusion and restricted fields.
- [ ] Exactly one matching message has exact complete plus-recipient, expected sender/OTP branch, bounded time, one six-digit OTP and zero links.
- [ ] Old/base/other-plus/wrong-recipient/wrong-sender/multiple/malformed/linked/invitation/timeout/API ambiguity fails closed.
- [ ] Nested MIME and base64url handling are deterministic and protected.
- [ ] Message ID, headers, body and OTP remain in memory only and are cleared after verification.
- [ ] No Gmail mutation scope, endpoint, mailbox change, general reader or export path exists.

## One-run integrity and exact Preview acceptance

- [ ] All deterministic, privacy and credentialed no-send readiness gates pass before preparation.
- [ ] One protected command owns the complete live lifecycle without mid-run handoff.
- [ ] Exactly one fresh confirmed exact-owned identity is prepared without email.
- [ ] `send-reserved` persists before exactly one exact-Preview OTP request.
- [ ] Gmail acquisition succeeds without another request or manual mailbox action.
- [ ] Original request context is destroyed and recovered-code verification uses a fresh isolated context.
- [ ] `verification-reserved` persists before exactly one submission using complete normalized plus-address, exact leading-zero-safe six-character token and explicit email type.
- [ ] Exact Preview session, `/portal`, conflict-safe bootstrap, permitted dashboard/horse access, wrong-horse denial and RLS agreement pass; or one allowlisted rejection is recorded without retry.
- [ ] Screenshots, video, tracing, HAR, downloads, clipboard, persistent browser state and unrestricted logging remain disabled.

## Cleanup and invariants

- [ ] Cleanup runs on success, rejection, timeout, OAuth/API/browser failure, process interruption and partial bootstrap.
- [ ] Session revocation and dependency-safe application cleanup precede Auth deletion.
- [ ] Auth is deleted last; exact absence is proven before ledger removal.
- [ ] Final exact-owned application/Auth/Storage is `0/0/0`, Auth-last and ledger absent.
- [ ] Three preserved identities and Participants A/B/C remain unchanged.
- [ ] Callback/Site URL, Resend/sender/template/OTP/rates, production/rollback/five aliases remain unchanged.

## Validation and closeout

- [ ] Credential Manager, OAuth, Gmail/MIME, ledger/crash/concurrency, Preview driver, sanitizer and cleanup tests pass.
- [ ] Inherited OTP/recovery/wrapper/bootstrap/dashboard, JSON, lint, typecheck, static, encoding, dependency, diff and protected-data checks pass.
- [ ] Output matches the strict sanitized schema; durable changes contain no mailbox address, token, message, OTP, Auth identifier or secret.
- [ ] Review and lifecycle files record provider authority, architecture, exact live counts/outcome, cleanup and preserved invariants proportionally.
- [ ] No commit or push occurs without separate explicit user authority.

## Stop conditions

Stop before Google mutation for missing owner authority, wrong/shared project, unexpected billing/admin/public-verification requirement or broader access. Stop before send for scope mismatch, insecure credential storage, OAuth/profile mismatch, token expiry not safely renewed, Gmail adapter ambiguity, target drift, nonzero owned state or failed readiness. After `send-reserved`, never reauthorize, resend or manually inspect mail: classify, clean and close. Stop for session/permission/RLS/production/cleanup uncertainty.

## Permitted outcomes

- `gmail-protected-single-run-authentication-proven-clean`
- `gmail-oauth-authority-pending-clean`
- `gmail-secure-adapter-readiness-blocked-clean`
- `gmail-protected-single-run-authentication-rejected-clean`
- `gmail-protected-single-run-cleanup-blocked-recovery-preserved`

Never claim trainer-pilot completion or product-wide Done.
