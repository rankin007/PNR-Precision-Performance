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
