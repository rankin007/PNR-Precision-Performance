# Sprint 035H Blueprint

## 1. Open from the clean 035G baseline

1. Verify exact branch/SHA `bfd4fc494d68a0f53d6c0f5f40c8fd4c8bec7059`, authenticated local/remote equality and clean worktree.
2. Create only `codex/035H-protected-single-run-authentication-acceptance-harness`.
3. Read all 035H files, 035F/035G reviews, the Architect briefing, `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md`, current guarded preparation/cleanup helpers, recovered-code contracts, diagnostics and bootstrap/permission proof harnesses.
4. Record the exact approved external baseline without mutation. Refuse any wrong project, Preview, callback, deployment, alias, provider, identity or nonzero owned-state classification.

## 2. Design the protected runner before external access

Create a single top-level runner with dependency-injected adapters and a strict phase controller. Keep pure logic separate from external adapters so failure, crash and ambiguity behavior can be exhaustively tested without credentials.

Define typed/schema-validated adapter contracts for:

- secure secret acquisition and disposal;
- exact-owned Supabase preparation and cleanup;
- durable restricted-ACL state ledger;
- Preview application request and recovered-code verification;
- bounded mailbox polling;
- session/bootstrap/dashboard/permission assertions;
- sanitized reporting.

The operator entry wrapper must verify interactive protected execution, no transcription, correct branch/SHA, no conflicts, expected source hashes/contracts and secure ledger permissions. It obtains protected values through secure prompts, provider OAuth/MFA or OS credential storage and passes them only to the protected child process. It must not echo or inherit secrets into parent/global environments.

## 3. Implement permanent one-send and recovery controls

1. Reserve a fresh run with approved project/Preview fingerprints and a keyed recipient digest.
2. Atomically persist `prepared` only after exact Auth ownership verification.
3. Atomically persist `send-reserved` before the Preview send action.
4. Intercept/count the application request privately and persist `send-observed` with count exactly `1` without request bodies.
5. Refuse all send-capable execution from `send-reserved` or later.
6. Persist `verification-reserved` before verification and refuse all further verification-capable execution from that point.
7. On process termination, ambiguity or adapter exception, transition to `cleanup-required` or `recovery` and expose only cleanup/reconcile operations.
8. Remove the ledger only after exact Auth absence and final application/Auth/Storage `0/0/0` proof.

Use atomic replace/write-through semantics and restrictive ACL verification. Test interrupted writes and corrupted/unknown states as fail-closed.

## 4. Implement the mailbox adapter

Use the dedicated non-personal test mailbox already governed by the mailbox runbook. Determine its provider class privately and implement only the supported read-only API/OAuth or equivalently protected signed-in adapter needed for that provider.

The adapter must:

1. Obtain/refresh authorization without exposing credentials to Builder output or repository state.
2. Restrict access to the smallest supported read-only message scope.
3. Start from the live run boundary and ignore older messages.
4. Poll with a bounded deadline and backoff that cannot trigger another email.
5. Match the complete intended plus-address privately, expected sender/domain, expected OTP branch and time window.
6. Require exactly one matching message, exactly one six-digit code, zero links and no invitation/confirmation branch.
7. Reject ambiguity, multiple codes, malformed content, wrong recipient/sender, unexpected links/branch or timeout.
8. Return the OTP only as an in-memory value to the runner and clear message/code objects immediately after verification.
9. Never mark, delete, forward, download, export or otherwise mutate mailbox content unless the provider requires a minimal read-state mutation and the operator separately accepts it; prefer no mailbox mutation.
10. Emit only allowlisted mailbox classifications.

Do not implement a general inbox search/export interface. Deterministic adapter tests use generated fixtures containing no real address, token or provider artifact.

## 5. Implement exact-Preview application proof

Use an isolated nonpersistent browser context or an equivalent end-to-end application transport that exercises the deployed application request and verification actions. For a browser driver, disable screenshots, video, traces, HAR, downloads, clipboard and persistent profiles.

1. Navigate only to the exact correction Preview `/sign-in` origin.
2. Privately fill the complete fresh plus-address.
3. After durable `send-reserved`, click/send exactly once and count exactly one outbound OTP request.
4. Wait for mailbox acquisition without interacting with the original request state.
5. Destroy the original browser/application context.
6. Open a new isolated context, select `Already have a code?`, fill the complete address and exact six-character code from process memory, then persist `verification-reserved` and submit exactly once.
7. Prove no send action occurs in recovery and verification uses complete case-normalized plus-address, trim-only leading-zero-safe six-character token and explicit email type.
8. On success, prove exact Preview host, `/portal`, one conflict-safe application user/profile, permitted dashboard/horse access, wrong-horse denial and RLS agreement.
9. On failure, retain only the existing allowlisted diagnostic category and enter cleanup. Never retry.

## 6. Exhaustive deterministic proof before live readiness

Test at minimum:

- wrong branch/SHA/project/Preview/callback/provider and nonzero opening state refusal;
- secure-store absent/locked/refused behavior before preparation or send;
- ledger ACL, atomicity, corruption and every state transition;
- crash before/after preparation, send reservation, request observation, message acquisition, verification reservation, verification observation and cleanup stages;
- exactly-once request and verification under re-entry/concurrency;
- mailbox old-message, wrong-recipient, base-address, other-plus-alias, wrong-sender, multiple-message, multiple-code, link, invitation, malformed, timeout and provider-error rejection;
- exact six-character and leading-zero preservation;
- protected-output exclusion across stdout, stderr, exceptions, process lists, URLs, browser artifacts and durable files;
- session success and each allowlisted rejection;
- dependency cleanup, Auth-last, failed-delete recovery preservation and clean resume;
- preservation of unrelated identities and zero production/alias/provider mutation paths.

Run applicable existing OTP/recovery, sanitizer, bootstrap-concurrency, dashboard/permission, protected-helper, JSON, lint, typecheck, static, encoding and no-secret suites. Do not authorize the live run until every deterministic gate passes and a no-send readiness mode reports only sanitized readiness.

## 7. One live single-run proof

1. Privately authorize/unlock the dedicated mailbox adapter once. Confirm `test_mailbox_ready=yes`, `plus_alias_verified=yes`, least-privilege access and bounded run readiness without revealing the provider account/address.
2. Run the no-send readiness mode and independently prove callback/provider/deployment/alias/identity/zero-state invariants.
3. Start one fresh live run. The runner performs preparation, one request, mailbox polling, recovered-code verification, exact-Preview/session/permission proof and cleanup without pausing for conversational input.
4. The operator may complete provider OAuth/MFA privately only if required before send; after `send-reserved`, no manual interaction or handoff is permitted.
5. Emit one sanitized final report containing exact request/verification counts, mailbox classification, authentication/session/permission classification, cleanup counts, Auth-last and preserved-invariant booleans.

If the live run cannot remain automated, if authorization expires after send reservation, or if any result is ambiguous, do not rerun. Enter cleanup-only and close with the applicable blocked/rejected outcome.

## 8. Cleanup and closeout

Cleanup executes in `finally` and through a separately callable recovery-only mode:

1. revoke exact-owned session;
2. remove exact-owned application state dependency-safely;
3. verify dependent rows and owned Storage zero;
4. delete exact-owned Auth last;
5. prove Auth absence;
6. remove ledger only after final `0/0/0` and invariant reconciliation.

Reverify callback set, Site URL, Resend/sender/template/OTP/rate limits, production, rollback, five aliases and preserved identities. Update 035H review, state, status, schedule, evidence index and Architect briefing. Do not commit or push without separate explicit user authority.

## Approved files

Builder may edit only:

- generated Sprint 035H files and `planning/reviews/035H-protected-single-run-authentication-acceptance-harness.md`;
- focused new or existing protected runner, wrapper, mailbox adapter, state-machine, sanitizer, recovery/cleanup and deterministic test files under `scripts/` and narrowly shared test-only helpers when justified;
- `package.json`/lockfile only if a narrowly required official mailbox/browser client dependency is selected and dependency review passes;
- the mailbox protected-process runbook when the implemented secure adapter requires exact operator instructions;
- current state/status/schedule/evidence-index/Architect-briefing lifecycle files.

Application/server source, schema, migration, RLS, role, permission, dashboard/product behavior and external configuration changes are not approved.
