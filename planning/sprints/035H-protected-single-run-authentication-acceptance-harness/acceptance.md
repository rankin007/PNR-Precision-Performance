# Sprint 035H Acceptance

## Baseline and architecture

- [ ] Exact starting branch/SHA, authenticated remote equality and clean worktree pass.
- [ ] Approved project, correction Preview/callback, production/rollback/five aliases, provider classifications, three preserved identities, ledger absence and owned `0/0/0` pass.
- [ ] One top-level runner owns preflight through cleanup with no manual mid-run handoff.
- [ ] External capabilities are isolated behind schema-validated adapters and pure state logic is deterministically testable.
- [ ] Operator entry verifies protected execution, exact source/target and secure credential/ledger handling.

## Protected mailbox

- [ ] Dedicated non-personal test mailbox readiness and plus-alias receipt are privately confirmed.
- [ ] Actual provider adapter uses supported least-privilege read-only OAuth/API or equivalently protected signed-in access.
- [ ] Long-lived authorization is stored only in an approved OS/provider secure store; no mailbox password or token enters environment files, arguments, repository, output or conversation.
- [ ] Polling is bounded to the run window and requires one exact recipient, expected sender/branch, one six-digit code and zero links.
- [ ] Old, wrong-recipient, base-address, other-alias, wrong-sender, multiple, malformed, linked, invitation and timeout cases fail closed.
- [ ] OTP/message objects remain in process memory only and are cleared after use; no mailbox export or broad reader is created.

## Exactly-once and recovery integrity

- [ ] Restricted-ACL atomic ledger implements every required state.
- [ ] `send-reserved` is durable before request and permanently prevents a second send for the run.
- [ ] `verification-reserved` is durable before submission and permanently prevents a second verification for the run.
- [ ] Crash/restart/concurrency tests prove cleanup-only behavior after ambiguous send/verification boundaries.
- [ ] Corrupt, unknown, mismatched or partial ledger state fails closed and preserves recovery evidence.
- [ ] Ledger contains no address, OTP, mailbox content/identifier, credential, cookie or token.

## Exact-Preview live acceptance

- [ ] No-send readiness passes before any live preparation or request.
- [ ] Exactly one fresh live run prepares one exact-owned confirmed identity without preparation email.
- [ ] Exactly one OTP request is issued through the exact correction Preview application path.
- [ ] Protected mailbox acquisition proves intended recipient, one six-digit OTP, zero links and correct OTP branch.
- [ ] Original request context is destroyed; recovered-code verification occurs in a fresh isolated context with no additional send.
- [ ] Exactly one verification preserves the complete normalized plus-address and exact leading-zero-safe six-character OTP with explicit email type.
- [ ] Success proves exact Preview session, `/portal`, conflict-safe bootstrap, permitted dashboard/horse access, wrong-horse denial and RLS agreement; failure emits one allowlisted category only and does not retry.
- [ ] Screenshots, video, traces, HAR, clipboard, downloads, persistent browser state and unrestricted logs remain disabled.

## Cleanup and preserved invariants

- [ ] Cleanup executes on success, rejection, timeout, process interruption and partial bootstrap.
- [ ] Session is revoked, application state removed dependency-safely and Auth deleted last.
- [ ] Exact Auth absence is proven before ledger removal.
- [ ] Final exact-owned application/Auth/Storage is `0/0/0`, Auth-last and ledger absent.
- [ ] Three preserved identities remain unchanged and Participants A/B/C remain untouched.
- [ ] Callback/Site URL, Resend, sender, template, OTP length/expiry/rates, production, rollback and five aliases remain unchanged.

## Validation and closeout

- [ ] Exhaustive fake-adapter/state/crash/concurrency/privacy tests pass before live readiness.
- [ ] Applicable existing OTP/recovery, sanitizer, bootstrap, dashboard/permission, wrapper/no-secret, JSON, lint, typecheck, static, encoding and diff checks pass.
- [ ] Dependency and secure-store integration review passes if a package is added.
- [ ] Live output matches the strict sanitized schema and protected-pattern scan passes across stdout/stderr and durable changes.
- [ ] 035H review and lifecycle files record architecture, one-run counts, result, cleanup and preserved invariants proportionally.
- [ ] No commit or push occurs without separate explicit user authority.

## Stop conditions

Stop before send for wrong target, baseline drift, unavailable least-privilege mailbox automation, insecure credential storage, unexpected protected output, nonzero opening state or failed deterministic readiness. After `send-reserved`, never send again: classify, clean and close. Stop for mailbox ambiguity, verification/session/permission/RLS failure, production regression, unauthorized scope or cleanup uncertainty. Manual OTP entry is never a fallback.

## Permitted outcomes

- `protected-single-run-authentication-proven-clean`
- `protected-mailbox-automation-authority-pending-clean`
- `protected-single-run-readiness-blocked-clean`
- `protected-single-run-authentication-rejected-clean`
- `protected-single-run-cleanup-blocked-recovery-preserved`

Never claim trainer-pilot completion or product-wide Done.
