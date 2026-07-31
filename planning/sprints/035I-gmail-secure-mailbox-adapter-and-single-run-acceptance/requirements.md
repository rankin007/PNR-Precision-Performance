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
