============================================================
FILE: planning/sprints/035I-gmail-secure-mailbox-adapter-and-single-run-acceptance/requirements.md
============================================================

# Sprint 035I — Gmail Secure Mailbox Adapter And Single-Run Acceptance

## Goal

Complete the protected Sprint 035H harness with a Gmail-specific, least-privilege, Windows-secure-store-backed mailbox adapter and exact-Preview driver, then perform one fully automated synthetic authentication proof with one OTP request, one verification submission and mandatory Auth-last cleanup.

Target outcome: `gmail-protected-single-run-authentication-proven-clean`.

## Workflow profile

Strict. This sprint establishes restricted-scope Gmail OAuth, handles transient email/OTP/session material, calls production Supabase Auth delivery through an alias-free Preview and owns exact cleanup.

## Starting authority and baseline

Start from closed Sprint 035H branch `codex/035H-protected-single-run-authentication-acceptance-harness` at exact clean local/remote SHA `106324dbaba1c4a5099b261f7632dbb055c32701` and outcome `protected-mailbox-automation-authority-pending-clean`.

Create only `codex/035I-gmail-secure-mailbox-adapter-and-single-run-acceptance`. Do not reopen or rewrite Sprint 035 through 035H.

Preserve:

- approved Supabase project `uvskssaecdhxcgytkasc`; never contact old project `tagnbgkroihagjmvehlx`;
- Ready alias-free Preview `dpl_J7bSHyQ8heNrqHWw38GdFNvpaaK4` and exact origin `https://pnr-precision-performance-dwkv3pzey-rankin007s-projects.vercel.app`;
- exact callback set containing unchanged production plus the exact correction Preview callback only;
- production `dpl_9zVS8HSujThkFTP3hisyfBVknKWb`, rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A` and five stable aliases;
- Resend hosted integration, exact sender, one-token/no-link OTP template, six-digit OTP, `3600`-second expiry and accepted rate-limit classifications;
- the three preserved identities and Participants A/B/C untouched;
- exact-owned starting application/Auth/Storage `0/0/0` and no open ledger;
- the implemented 035H state controller, sanitizer, guarded runner and tests.

## Current official Gmail authority

Use the official Gmail API and Google OAuth documentation current on 2026-08-01:

- `https://developers.google.com/workspace/gmail/api/auth/scopes`
- `https://developers.google.com/identity/protocols/oauth2/native-app`
- `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/list`
- `https://developers.google.com/workspace/gmail/api/reference/rest/v1/users.messages/get`
- `https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification`

Message-body inspection requires exactly `https://www.googleapis.com/auth/gmail.readonly`. Google classifies this as restricted. Do not request `https://mail.google.com/`, `gmail.modify`, `gmail.compose`, `gmail.send`, settings, Drive, profile or unrelated scopes.

Use a Desktop OAuth client, system browser, loopback `127.0.0.1` redirect on an ephemeral port, PKCE S256 and validated OAuth `state`. Manual copy/paste/OOB authorization and embedded webviews are prohibited.

## Owner/provider authority checkpoint

Before creating or changing Google Cloud/OAuth state, obtain sanitized owner confirmation that:

- the dedicated non-personal Gmail test mailbox remains the sole account in scope and plus-address receipt is privately proven;
- an owner-controlled Google Cloud project may be used solely for this local Precision Performance test harness;
- Gmail API enablement, an OAuth consent configuration and one Desktop client are accepted;
- the application remains local development/testing with only the dedicated mailbox as an authorized test user unless the account is governed by an owner-approved Internal Workspace configuration;
- the owner accepts Google's restricted-scope consent warning and limited test-token lifetime without publishing the app or initiating public verification;
- Gmail content remains local/in-memory and is never transmitted to a third-party server;
- the operator is ready for one private system-browser OAuth/MFA consent before any Auth identity or email action.

If the provider/account classification requires administrator approval, public publishing, restricted-scope verification, security assessment, billing, organization policy change or broader user access not already accepted, stop before mutation with `gmail-oauth-authority-pending-clean`.

## Gmail OAuth and secure-store contract

Implement OAuth protocol calls with Node built-ins and HTTPS/fetch unless a narrowly reviewed official client is demonstrably safer. Do not use sample `credentials.json`, `token.json`, `.env` files or repository-stored credentials.

Windows Credential Manager is the only approved durable store. Use current-user Generic Credentials with fixed non-secret target names and no account identity embedded in target names. Store:

- Desktop OAuth client identifier/configuration needed by the local flow;
- refresh token;
- approved Google Cloud project/client fingerprint and granted-scope classification;
- no access token beyond its process lifetime.

Credential values must never appear in process arguments, parent/global environment variables, stdout/stderr, exception text, PowerShell history, clipboard, screenshots, browser traces or repository files. Verify current-user access, expected target names and round-trip behavior using synthetic fixtures before OAuth.

External OAuth clients may return a seven-day refresh token when the consent screen is External/Testing. Treat expiry/revocation/`invalid_grant` as a pre-send reauthorization requirement. Reauthorize only before preparation and `send-reserved`; after reservation, authorization failure is cleanup-only and never permits another send.

## Gmail adapter contract

The adapter must use `userId=me` and privately verify the Gmail profile account matches the dedicated mailbox authorization. It derives one fresh plus-address from the authenticated mailbox profile and fresh run ID in process memory; no address is typed, stored or reported.

For the live run:

- record a monotonic/local send boundary and Gmail-compatible time boundary before requesting;
- use `users.messages.list` with `gmail.readonly`, a bounded sender/time query, `includeSpamTrash=false`, small `maxResults` and response-field restriction;
- fetch only bounded candidate messages using `users.messages.get` and the minimum format/fields that still provide exact recipient headers and MIME body;
- require internal/received time within the run window, expected Resend/Supabase sender classification, exact complete plus-recipient in protected headers, exactly one six-digit code, zero links and no invitation/confirmation branch;
- reject old, base-address, other-plus-alias, wrong-recipient, wrong-sender, multiple-message, multiple-code, malformed MIME, linked content, invitation branch, timeout and Gmail/API ambiguity;
- perform no Gmail mutation: no mark-read, label change, archive, delete, forward, draft or send;
- retain message IDs, headers, body and OTP only in process memory and clear them immediately after verification.

The adapter must not expose a general mailbox reader, arbitrary query, historical export or message-output mode.

## Exact-Preview driver and one-run contract

Complete the 035H top-level runner using the existing local Playwright/Chromium capability or an equivalent protected end-to-end driver. Use isolated nonpersistent contexts with screenshots, video, tracing, HAR, downloads, clipboard and persistent browser state disabled.

After all deterministic and no-send gates pass, one live top-level run may:

1. privately unlock OAuth/secure-store prerequisites;
2. prepare one fresh exact-owned confirmed Auth identity without preparation email;
3. durably write `send-reserved`;
4. request exactly one OTP through the exact Preview application path;
5. poll Gmail automatically and acquire the exact OTP in memory;
6. destroy the request context;
7. open a fresh context and choose `Already have a code?`;
8. durably write `verification-reserved`;
9. submit exactly one verification with complete normalized plus-address, exact leading-zero-safe six-character token and explicit email type;
10. prove exact Preview `/portal`, session, conflict-safe bootstrap, dashboard/horse permission, wrong-horse denial and RLS agreement;
11. clean exact-owned state Auth-last under every terminal outcome.

No manual action is permitted after `send-reserved`. No retry or second live run is authorized in 035I.

## Approved actions

- Implement/test the Gmail OAuth, Windows Credential Manager, MIME/parser, bounded polling and exact-Preview driver adapters.
- Create/configure one owner-controlled test-only Google Cloud project if an approved suitable project does not already exist; enable Gmail API; configure testing/internal audience as applicable; add only the dedicated mailbox test user; create one Desktop OAuth client; request only `gmail.readonly`.
- Perform one private OAuth/MFA consent and store only approved credential material in Windows Credential Manager.
- Run unlimited credential-free deterministic tests and Gmail API no-message/no-send readiness calls after authorization.
- Perform exactly one live protected run only after all gates pass.
- Revoke/delete the specific OAuth grant/client/project only if rollback is required and exact target/ownership is proven; otherwise preserve the reviewed local test integration for future governed proof.
- Update review and lifecycle evidence.

## Out of scope

- Gmail password, app password, IMAP/POP, service account, domain-wide delegation, browser scraping or manual mailbox/code handling.
- Any Gmail scope beyond `gmail.readonly`, mailbox mutation, broad/historical reading or third-party transmission/storage.
- Public OAuth publication/verification, production audience, additional test users or organizational policy changes.
- More than one live OTP request or verification submission.
- Participant A/B/C activity.
- Production deployment, alias/callback/DNS/Resend/sender/template/OTP/rate/key mutation.
- Schema, migration, RPC, RLS, role, permission, dashboard or product behavior changes.
- Preserved-identity mutation/deletion.
- Commit, push, PR, merge, `develop` mutation or history rewrite without separate explicit user authority.
- Trainer-pilot completion or product-wide Done claims.

## Evidence-Proportional Execution and manual intervention

Stop only for material target, owner/provider authority, restricted-scope policy, secret/protected-data, secure-store, one-send integrity, authentication, permission/RLS, production, scope or cleanup risk. Substitute equivalent or stronger safe evidence for supporting tools, but never replace the delivered-message/session boundary with metadata or weaken Gmail/OAuth/one-send protections. Keep deterministic adapter, credential-store, runner, validator, reporter, formatting and encoding corrections inside 035I.

Manual intervention is limited to owner confirmation and one private Google OAuth/MFA interaction before send. The live run must be automated end-to-end. If it cannot, stop before send or enter cleanup-only after reservation.

============================================================
FILE: planning/sprints/035I-gmail-secure-mailbox-adapter-and-single-run-acceptance/blueprint.md
============================================================

# Sprint 035I Blueprint

## 1. Open from exact 035H

1. Verify branch/SHA `106324dbaba1c4a5099b261f7632dbb055c32701`, authenticated remote equality and clean worktree.
2. Create only `codex/035I-gmail-secure-mailbox-adapter-and-single-run-acceptance`.
3. Read every 035I file, the complete 035H implementation/review, mailbox runbook, OAuth/Gmail official references and current provider/application evidence.
4. Prove exact approved Supabase/Preview/callback/provider/deployment/identity/zero-state baseline without mutation.

## 2. Confirm Google authority before mutation

Obtain only sanitized owner confirmations required by the requirements. Record provider class `Gmail`, local-only testing/internal classification, sole dedicated test user, restricted-scope acceptance, no-server data handling, private OAuth readiness and whether a suitable owner-controlled Google Cloud project already exists.

Do not request project credentials, client identifiers, mailbox address, password, MFA, OAuth code or token in conversation. Stop if public verification, security assessment, billing, broader access or admin policy mutation is unexpectedly required.

## 3. Build and prove Windows Credential Manager adapter

1. Add a narrowly scoped current-user Generic Credential adapter using Windows Credential APIs through PowerShell/.NET interop or an equivalently native mechanism.
2. Use fixed target names that disclose no mailbox/account identity.
3. Support write/read/delete only for the exact 035I targets and refuse enumeration, arbitrary target names and machine/global persistence.
4. Keep credential blobs as mutable buffers where practical and clear them after handoff.
5. Ensure child-only delivery to the protected Node process without command arguments, files, parent/global environment or output.
6. Deterministically prove synthetic round-trip, wrong-user/target refusal, absent/locked/corrupt credential handling and zero output leakage.

## 4. Implement Desktop OAuth securely

1. Create pure PKCE/state/token-validation logic and deterministic fixtures first.
2. Bind the callback listener only to `127.0.0.1` on an ephemeral port and accept one bounded callback.
3. Generate high-entropy PKCE verifier/challenge and OAuth state in memory.
4. Open the system browser to Google's authorization endpoint; never use an embedded webview or OOB copy/paste.
5. Request exactly `gmail.readonly`, authorization code response and offline access for the dedicated local adapter.
6. Validate state, redirect host/port, code presence and token response shape; reject unexpected scopes or account/provider classification.
7. Store refresh token and client configuration only in Windows Credential Manager. Keep access token in process memory only.
8. Implement bounded refresh and classify consent denial, scope mismatch, expiry/revocation and `invalid_grant` without raw output.
9. Permit private reauthorization only in pre-send readiness. Refuse it after `send-reserved`.

## 5. Protected Google Cloud setup

Through an operator-private browser session:

1. Select or create only the owner-controlled local test project.
2. Enable Gmail API only as needed for this adapter.
3. Configure branding/contact classifications without recording protected addresses.
4. Configure Internal audience only if genuinely available under the owning Workspace organization; otherwise Testing with only the dedicated mailbox as test user.
5. Declare only `gmail.readonly` in Data Access.
6. Create one Desktop OAuth client.
7. Transfer its configuration directly into the protected secure-store enrollment path; do not save `credentials.json` in the repository/worktree or leave a downloaded credential file behind.
8. Complete private system-browser consent/MFA and verify the exact granted scope.
9. Record only sanitized project/client fingerprints, audience classification, scope match, credential-store readiness and token-expiry classification.

If the browser downloads a credential file despite the protected path, move it immediately into a protected transient location, enroll it, securely delete the exact owned file, prove absence and record only that cleanup occurred.

## 6. Implement Gmail bounded mailbox adapter

1. Use `users.getProfile` privately to prove the authorized mailbox and derive one fresh run plus-address in memory.
2. Use REST with `Authorization: Bearer` header only; never token query parameters.
3. Poll `users.messages.list` with `userId=me`, bounded sender/time query, `includeSpamTrash=false`, small `maxResults`, and restricted response fields.
4. Fetch only returned candidates with `users.messages.get` using the minimum fields/format required for exact headers and MIME content.
5. Recursively decode supported MIME text/plain and text/html parts from base64url in memory, normalize safely and pass protected candidate objects to the existing classifier.
6. Require exact complete plus-recipient, expected sender/branch, bounded internal date, one six-digit code and zero links.
7. Reject every ambiguity and provider error without widening the query or reading historical mail.
8. Clear candidate/message/code buffers after use and prove no Gmail mutation endpoint/path exists in source.

## 7. Complete exact-Preview driver and integration

1. Reuse the installed Playwright/Chromium capability without adding a dependency unless exact review proves one is required.
2. Launch an isolated nonpersistent browser with protected artifacts disabled.
3. Count only the relevant send/verification application boundaries privately; never log request bodies.
4. Integrate preparation, ledger transitions, Gmail polling, fresh-context recovery verification, session/portal/bootstrap/permission assertions and cleanup under one `try/finally` controller.
5. Ensure `send-reserved` and `verification-reserved` persist before their actions and force cleanup-only on ambiguity/restart.

## 8. Exhaustive deterministic and no-send readiness

Extend tests for:

- Credential Manager scope/target/round-trip/deletion/refusal and leakage;
- PKCE/state/loopback/scope/token response and reauthorization rules;
- testing-token expiry and `invalid_grant` before/after reservation;
- Gmail profile mismatch, bounded list/get requests, partial fields, pagination refusal or cap, API errors and timeouts;
- MIME nested multipart, encoded headers/body, wrong/base/other-plus recipient, sender, old/future time, spam/trash exclusion, duplicates, multiple codes, links and invitation branch;
- one-send/one-verification crash/concurrency semantics;
- browser artifact disablement and no request-body logging;
- exact Preview session/bootstrap/dashboard/permission/RLS success and all cleanup paths;
- source absence of Gmail mutation scopes/endpoints and protected persistence.

Run all inherited 035H and relevant OTP/recovery/wrapper/bootstrap/dashboard, JSON, lint, typecheck, static, encoding, dependency, diff and protected-data checks. Run a credentialed no-send readiness mode that may call profile/list with a future/empty bounded window but cannot prepare an identity or request email.

## 9. One live automated proof

Only after readiness passes:

1. Reconfirm exact external baseline, owned `0/0/0`, ledger absent, cooldown and secure-store/OAuth freshness.
2. Start one protected top-level command.
3. Allow no operator or conversational handoff after launch except a pre-send secure-store unlock if the OS requires it.
4. Execute exactly one preparation, send, bounded Gmail acquisition, fresh-context verification and permission proof.
5. Under every result, revoke session, remove application state dependency-safely, delete Auth last, prove exact absence and remove ledger only after final `0/0/0`.
6. Emit only strict sanitized counts/classifications.

Do not rerun in 035I. A failed or ambiguous live boundary closes rejected/cleanup-only after exact cleanup.

## 10. Closeout and rollback

Reconcile Gmail OAuth scope/audience/secure-store classifications, exact callbacks/provider/deployments/aliases, preserved identities and final zero state. Update review and lifecycle files.

For OAuth rollback, delete only the exact Windows Credential Manager entries and revoke the exact Google grant/client/project only with exact ownership proof and when required. Never delete a shared/unproven Google Cloud resource. Record sanitized rollback evidence. Do not commit or push without separate explicit user authority.

## Approved files

Builder may edit only:

- generated 035I sprint files and `planning/reviews/035I-gmail-secure-mailbox-adapter-and-single-run-acceptance.md`;
- focused 035H runner/core/wrapper/tests and new Gmail OAuth, Credential Manager, MIME/mailbox, Preview-driver and deterministic test files under `scripts/`;
- mailbox protected-process runbook;
- `package.json`/lockfile only if a narrowly reviewed official dependency is unavoidable;
- current state/status/schedule/evidence-index/Architect-briefing lifecycle files.

Application/server source, schema, migrations, RLS, roles, permissions and product behavior are not approved.

============================================================
FILE: planning/sprints/035I-gmail-secure-mailbox-adapter-and-single-run-acceptance/acceptance.md
============================================================

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

============================================================
FILE: planning/sprints/035I-gmail-secure-mailbox-adapter-and-single-run-acceptance/handoff-prompt.md
============================================================

You are Builder for Sprint 035I — Gmail Secure Mailbox Adapter And Single-Run Acceptance.

Apply Architect Pack `planning/architect-packs/architect-pack-035I-gmail-secure-mailbox-adapter-and-single-run-acceptance.md`, verify it generates exactly four files under `planning/sprints/035I-gmail-secure-mailbox-adapter-and-single-run-acceptance/`, then execute only from those generated files.

Start from closed Sprint 035H branch `codex/035H-protected-single-run-authentication-acceptance-harness` at exact clean local/remote SHA `106324dbaba1c4a5099b261f7632dbb055c32701`. Create only `codex/035I-gmail-secure-mailbox-adapter-and-single-run-acceptance`. Read `AGENTS.md`, agent identity, all 035I files, the complete 035H implementation/review, mailbox runbook and the official Google references named in requirements. Do not reopen or rewrite Sprint 035 through 035H.

Your outcome is a Gmail-specific adapter and completed protected runner: current-user Windows Credential Manager, Desktop OAuth through the system browser with ephemeral `127.0.0.1` loopback, PKCE S256 and validated state, exactly `https://www.googleapis.com/auth/gmail.readonly`, bounded `users.getProfile` and `users.messages.list/get`, in-memory MIME/OTP handling, an isolated exact-Preview driver, permanent one-send/one-verification reservations and mandatory Auth-last cleanup.

Before Google mutation, obtain sanitized owner confirmation for the dedicated non-personal Gmail test mailbox, privately proven plus addressing, owner-controlled local test project, restricted-scope consent, local-only/no-server handling, sole test user or genuine Internal Workspace classification and one private OAuth/MFA interaction. Never request or expose the mailbox address, password, MFA, OAuth code, client configuration, refresh/access token, message, OTP, Auth identifier or headers. Stop if public publishing, broader users, billing, verification/security assessment or organization policy change is unexpectedly required.

Use only a Desktop OAuth client and system browser. Bind only `127.0.0.1` on an ephemeral port, generate/validate PKCE and state, and prohibit embedded webviews and OOB copy/paste. Store client configuration and refresh token only in fixed non-identifying current-user Windows Credential Manager targets. Keep access tokens in memory only. Do not create `credentials.json`, `token.json`, `.env` or token files. Handle External/Testing seven-day expiry and `invalid_grant` before send only; after `send-reserved`, authorization failure is cleanup-only.

Use `users.getProfile` privately to prove the account and derive one fresh exact plus-address in memory. Poll Gmail only for the bounded run using `userId=me`, bearer header, small capped `messages.list` sender/time query, spam/trash exclusion and restricted fields; fetch only bounded candidates with `messages.get`. Require exact recipient/sender/time/OTP branch, one six-digit code and zero links. Reject every old, wrong, base/other-plus, duplicate, malformed, linked, invitation, timeout or provider-ambiguous case. Perform no Gmail mutation and build no general reader/export path.

Complete the 035H runner and exact-Preview driver using isolated nonpersistent browser contexts with screenshots, video, trace, HAR, downloads, clipboard and persistent state disabled. Persist `send-reserved` before exactly one request and `verification-reserved` before exactly one recovered-code submission. Destroy the request context before verification. Prove exact leading-zero-safe token, complete normalized plus-address, exact Preview `/portal`, conflict-safe bootstrap, permitted dashboard/horse access, wrong-horse denial and RLS agreement. No manual action or retry is allowed after send reservation.

Before live work, exhaustively test Credential Manager, OAuth, Gmail/MIME, state/crash/concurrency, browser privacy, sanitizer, session/permission and cleanup paths. Run inherited 035H plus OTP/recovery/wrapper/bootstrap/dashboard, JSON, lint, typecheck, static, encoding, dependency, diff and protected-data suites. A credentialed no-send readiness mode must pass without preparing an identity or requesting email.

The live authority is one top-level run, one fresh exact-owned identity, one OTP request and one verification submission. Under every terminal result, revoke session if present, remove application state dependency-safely, prove Storage/dependencies zero, delete Auth last, prove absence and remove the ledger only after final `0/0/0`. Never rerun in 035I.

Do not begin A/B/C, deploy production, change aliases/callbacks/DNS/Resend/sender/template/OTP/rates/keys, mutate schema/RLS/roles/permissions/product behavior or alter preserved identities. Do not commit, push, merge, open a PR, push `develop` or rewrite history without separate explicit user authority.

Update the 035I review and lifecycle files with sanitized provider authority, architecture/readiness, exact request/verification counts, live outcome, cleanup and preserved invariants. Close with exactly one permitted 035I outcome and never claim trainer-pilot completion or product-wide Done.
