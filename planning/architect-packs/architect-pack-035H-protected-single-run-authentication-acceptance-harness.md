============================================================
FILE: planning/sprints/035H-protected-single-run-authentication-acceptance-harness/requirements.md
============================================================

# Sprint 035H — Protected Single-Run Authentication Acceptance Harness

## Goal

Replace the permanently stopped multi-surface manual OTP procedure with one guarded local execution that performs exact-target preflight, exact-owned preparation, one Preview OTP request, protected mailbox polling, in-memory recovered-code verification, exact-Preview session/permission proof and mandatory Auth-last cleanup while emitting sanitized evidence only.

Target outcome: `protected-single-run-authentication-proven-clean`.

## Workflow profile

Strict. The harness handles live authentication delivery, a protected mailbox, transient OTP/session material, production Supabase Auth infrastructure and exact-owned cleanup.

## Starting authority and baseline

Start from closed Sprint 035G branch `codex/035G-correction-preview-callback-and-synthetic-otp-reproof` at exact clean local/remote SHA `bfd4fc494d68a0f53d6c0f5f40c8fd4c8bec7059` and outcome `synthetic-preparation-blocked-clean`.

Create only `codex/035H-protected-single-run-authentication-acceptance-harness`. Do not reopen or rewrite Sprint 035 through 035G.

Preserve:

- approved Supabase project `uvskssaecdhxcgytkasc`, never old project `tagnbgkroihagjmvehlx`;
- Ready alias-free correction Preview `dpl_J7bSHyQ8heNrqHWw38GdFNvpaaK4` at `https://pnr-precision-performance-dwkv3pzey-rankin007s-projects.vercel.app`;
- exact callback set containing unchanged production plus `https://pnr-precision-performance-dwkv3pzey-rankin007s-projects.vercel.app/auth/callback` only;
- production `dpl_9zVS8HSujThkFTP3hisyfBVknKWb`, rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A` and five stable aliases;
- Resend hosted integration, exact sender, one-token/no-link OTP template, six-digit length, `3600`-second expiry and accepted rate-limit classifications;
- the three preserved identities, with no mutation or deletion authority;
- exact-owned starting application/Auth/Storage `0/0/0` and no open ownership/send ledger;
- Participants A/B/C blocked.

## Required architecture

Build one top-level protected runner and one operator entry command. After the operator supplies or unlocks protected prerequisites privately, the runner owns the complete lifecycle without conversational handoffs.

The runner must contain these isolated capabilities:

1. Exact-target and invariant preflight.
2. Exact-owned no-email Auth preparation.
3. Durable run/ownership/send state machine.
4. Exact-Preview browser or equivalent application-path driver.
5. Protected mailbox adapter for the actual dedicated test-mailbox provider.
6. In-memory OTP validation and recovered-code verification.
7. Exact-Preview session, bootstrap and permission assertions.
8. Cleanup/recovery controller with Auth-last proof.
9. Sanitized allowlisted reporter.

Use the provider's supported read-only mailbox API with OAuth or an equivalently protected signed-in provider mechanism. Store long-lived mailbox authorization only in an OS/provider secure credential store. Password-based IMAP, mailbox passwords in environment variables, `.env` files, command arguments, repository files, browser automation output or conversation are prohibited.

If supported programmatic protected mailbox access cannot be established, close before preparation or send as `protected-mailbox-automation-authority-pending-clean`. Do not fall back to manual mailbox opening, code copying, agent-visible OTP entry or repeated browser prompts.

## Durable one-send state machine

Persist only the minimum recovery-safe protected ledger with restricted local ACLs. It may contain run ID, approved project/Preview fingerprints, recipient keyed digest, exact-owned Auth identifier, state, request/verification counters and cleanup state. It must never contain the address, OTP, mailbox message contents, access/refresh tokens, cookies, service-role value or raw provider output.

Required states:

- `preflight`
- `prepared`
- `send-reserved`
- `send-observed`
- `message-acquired`
- `verification-reserved`
- `verification-observed`
- `cleanup-required`
- `clean`
- `recovery`

Write `send-reserved` durably before the application request. Once that state exists, request count can never return to zero and the run can never send again, even after crash or ambiguous response. Write `verification-reserved` before verification; it likewise forbids a second submission. Any restart from `send-reserved` or later is cleanup-only unless deterministic evidence proves the reserved action never crossed the application boundary and the sprint files explicitly permit continuation; live ambiguity always resolves to cleanup-only.

## Protected-data and observability boundary

The address, OTP, mailbox content, message identifiers, headers, OAuth material, service-role value, Auth identifier, cookies and session tokens remain inside the protected process for the minimum necessary time and are zeroed/released after use.

Disable screenshots, video, tracing, HAR, browser history persistence, clipboard use, downloads, console dumps and unrestricted network logging for the live run. Never put protected values in URLs, filenames, process arguments, environment files, durable logs, test output, planning files or conversation.

Output is a strict schema of allowlisted booleans, counts and classifications. Any unexpected output field or protected-pattern match terminates reporting and enters cleanup.

## Approved actions

- Implement and deterministically test the protected runner, state machine, mailbox-adapter contract, exact-Preview driver, sanitizer and recovery/cleanup controller.
- Establish one protected read-only mailbox authorization for the dedicated non-personal test mailbox through an operator-private OAuth/MFA interaction, stored only in the approved secure credential store.
- Perform unlimited credential-free deterministic fake-adapter tests without email or external mutation.
- After every build/readiness gate passes, perform exactly one live top-level run with one fresh exact plus-address, one OTP request and one verification submission.
- Poll only the dedicated test mailbox, only for the bounded run window, and select only one exact-recipient, expected-sender, expected-branch message newer than the send boundary.
- Exercise recovered-code behavior through a fresh application context; do not verify in the original request context.
- Prove exact Preview session/portal/bootstrap/dashboard/permission/RLS behavior.
- Clean exact-owned state Auth-last on every terminal live path.
- Apply narrow deterministic harness, adapter, validator, reporter, formatting or encoding corrections within this architecture.
- Update sprint review and canonical lifecycle evidence.

## Out of scope

- Manual OTP entry, manual mailbox inspection during a run, copied codes, agent-visible protected values or another multi-window handoff.
- More than one live OTP request or one live verification submission in Sprint 035H.
- Participant A/B/C work, messages, fixtures or acceptance.
- Production deployment, alias mutation, callback mutation, DNS, Resend, sender, template, OTP length/expiry, rate-limit, signup-policy, key or unrelated provider mutation.
- Schema, migration, RPC, RLS, role, permission, dashboard, horse, clinical or product behavior changes.
- Deletion or mutation of any preserved identity.
- General-purpose mailbox reader, inbox export, historical mailbox scan or message retention.
- Commit, push, PR, merge, `develop` mutation or history rewrite without separate explicit user authority.
- Trainer-pilot completion or product-wide Done claims.

## Evidence-Proportional Execution and manual intervention

Stop only for material target, authority, secret/protected-data, mailbox isolation, one-send integrity, authentication, permission/RLS, production, scope or cleanup risk. Substitute equivalent or stronger safe evidence when a supporting tool is unavailable, but never substitute metadata for the required delivered-message/session boundary or weaken the protected mailbox/one-send boundary. Keep deterministic harness, adapter, credential-store integration, validator, reporter, formatting and encoding corrections in 035H.

Manual intervention is limited to the one-time private authorization/unlock needed for the dedicated mailbox and protected runner launch. Record the blocked fact, evidence checked, exact private action, prohibited disclosures and subsequent verification. The live journey itself must remain single-run and automated; if it cannot, stop before send.

============================================================
FILE: planning/sprints/035H-protected-single-run-authentication-acceptance-harness/blueprint.md
============================================================

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

============================================================
FILE: planning/sprints/035H-protected-single-run-authentication-acceptance-harness/acceptance.md
============================================================

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

============================================================
FILE: planning/sprints/035H-protected-single-run-authentication-acceptance-harness/handoff-prompt.md
============================================================

You are Builder for Sprint 035H — Protected Single-Run Authentication Acceptance Harness.

Apply Architect Pack `planning/architect-packs/architect-pack-035H-protected-single-run-authentication-acceptance-harness.md`, verify it generates exactly four files under `planning/sprints/035H-protected-single-run-authentication-acceptance-harness/`, then execute only from those generated files.

Start from closed Sprint 035G branch `codex/035G-correction-preview-callback-and-synthetic-otp-reproof` at exact clean local/remote SHA `bfd4fc494d68a0f53d6c0f5f40c8fd4c8bec7059`. Create only `codex/035H-protected-single-run-authentication-acceptance-harness`. Read `AGENTS.md`, agent identity, all 035H files, 035F/035G reviews, Architect briefing, `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md`, current protected preparation/cleanup helpers, recovered-code contracts, diagnostics and bootstrap/permission proof harnesses. Do not reopen or rewrite Sprint 035 through 035G.

Build one guarded local runner and one operator entry command that own the complete lifecycle: exact-target preflight, exact-owned no-email preparation, durable one-send state, one exact-Preview OTP request, protected mailbox polling, in-memory OTP acquisition, fresh-context recovered-code verification, exact-Preview session/bootstrap/dashboard/permission/RLS proof and mandatory Auth-last cleanup. After private prerequisite unlock, the live journey must not pause for conversational or multi-window handoffs.

Preserve approved Supabase project `uvskssaecdhxcgytkasc`, correction Preview `dpl_J7bSHyQ8heNrqHWw38GdFNvpaaK4`, the exact production-plus-correction-Preview callback set, production `dpl_9zVS8HSujThkFTP3hisyfBVknKWb`, rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`, five aliases, Resend/sender/template/six-digit/expiry/rate classifications and all three preserved identities. Never contact old project `tagnbgkroihagjmvehlx`.

Implement capability adapters and a pure, exhaustively tested state controller. Persist `send-reserved` atomically before the request and `verification-reserved` before verification. Either state permanently forbids repeating that action for the run. Any crash, ambiguous response or restart after reservation is cleanup-only. The restricted ledger may retain only recovery-safe identifiers/digests/counters/states; never address, OTP, mailbox content/identifier, credential, cookie or session token.

Use the dedicated non-personal test mailbox through its supported least-privilege read-only OAuth/API or equivalently protected signed-in mechanism. Keep long-lived authorization only in an approved OS/provider secure store. Do not use password-based IMAP or place passwords/tokens in environment files, arguments, repository files, output or conversation. Poll only the bounded run window; require exactly one intended plus-recipient message from the expected sender/branch, one six-digit OTP and zero links. Keep message/code data in process memory only and clear it immediately after use. Build no general inbox reader or export path.

If protected mailbox automation cannot be established, stop before preparation/send with `protected-mailbox-automation-authority-pending-clean`. Do not return to manual mailbox opening, code copying, agent-visible OTP entry or browser handoffs.

For the application path, use an isolated nonpersistent browser context or equivalent deployed end-to-end transport. Disable screenshots, video, trace, HAR, downloads, clipboard and persistent history. Navigate only to the exact Preview. Send once after durable reservation. Destroy the original request context, acquire the OTP privately, open a fresh context, choose `Already have a code?`, and verify once after durable reservation. Prove exact plus-address preservation, trim-only leading-zero-safe six-character token and no recovery send. On success prove exact Preview `/portal`, conflict-safe bootstrap, permitted access, wrong-horse denial and RLS agreement; on failure emit one allowlisted category and never retry.

Before any live action, exhaustively test wrong targets, secure-store refusal, every ledger transition, interrupted writes, crashes around every external boundary, concurrency, mailbox ambiguity/content rejection, exact code preservation, protected-output exclusion, success/rejection and cleanup/recovery. Run the applicable existing OTP/recovery, sanitizer, bootstrap, dashboard/permission, wrapper/no-secret, JSON, lint, typecheck, static, encoding and diff suites. A sanitized no-send readiness mode must pass before the one live run.

The live authority is exactly one top-level run, one fresh exact-owned identity, one OTP request and one verification submission. Operator activity is limited to private mailbox OAuth/MFA or secure-store unlock before send and protected runner launch. After send reservation, no manual interaction is permitted. Under every terminal result, revoke session if present, remove exact-owned application state dependency-safely, prove Storage/dependencies zero, delete Auth last, prove absence and remove the ledger only after final `0/0/0`.

Do not begin A/B/C, deploy production, change aliases/callbacks/DNS/provider/sender/template/OTP/rates/keys, mutate schema/RLS/roles/permissions/product behavior, or alter preserved identities. Do not commit, push, merge, open a PR, push `develop` or rewrite history without separate explicit user authority.

Update the 035H review and lifecycle files with sanitized architecture/readiness, exact request/verification counts, live result, cleanup and preserved invariants. Close with exactly one permitted 035H outcome and never claim trainer-pilot completion or product-wide Done.
