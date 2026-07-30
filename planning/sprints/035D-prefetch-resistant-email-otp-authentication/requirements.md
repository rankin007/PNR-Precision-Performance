# Sprint 035D — Prefetch-Resistant Email OTP Authentication

## Goal

Replace the trainer portal's scanner-vulnerable email magic-link journey with a production-safe email one-time-password (OTP) journey, prove it through the shared Supabase provider without weakening identity or access boundaries, and complete the remaining Trainer Participants A/B/C acceptance and exact-owned cleanup.

Target outcome: `trainer-email-otp-and-dashboard-pilot-complete-clean`.

## Workflow profile

Strict. This sprint changes authentication behavior and a shared hosted Auth template, releases backward-compatible application support before provider cutover, handles participant identities, and requires production-safe rollback evidence.

## Starting authority and baseline

Start from branch `codex/035C-trainer-participation-and-final-mvp-acceptance` at exact clean local/remote SHA `819f09add752a64dbf10213f3d481ad3132da9e9`.

Create branch `codex/035D-prefetch-resistant-email-otp-authentication`. Do not reopen or rewrite Sprint 035, 035B or 035C. Preserve Sprint 035C's failed/unclaimed Participant A outcome and provider-design-boundary evidence.

Read before mutation:

- `AGENTS.md` and `templates/method/120x-agent-identity.md`;
- Sprint 035, 035B and 035C authorities and closeout evidence;
- `planning/reviews/035C-participant-a-redirect-diagnosis.md`;
- current state, status, evidence index, schedule and Architect briefing;
- existing authentication actions, callback, Supabase clients/middleware and tests;
- applicable deployment, provider, privacy, RLS and cleanup authorities.

## Approved targets

### Vercel

- Project: `pnr-precision-performance`.
- Preview: generated alias-free Preview deployments only for candidate proof.
- Production: one controlled release of the backward-compatible OTP-capable application is in scope only after Preview gates pass and before the shared template is changed.
- Preserve all five accepted stable aliases and verify their mapping before and after the production release.
- Keep the immediately preceding Ready production deployment as the proven rollback target.

### Supabase

- Project reference: `uvskssaecdhxcgytkasc`.
- Project name: `Precision Performance Clean Rebuild`.
- Region: `ap-southeast-1` Singapore.
- Migration ledger: exactly `0001` through `0021`; no migration is approved.
- Old project `tagnbgkroihagjmvehlx` is prohibited.
- The shared Magic Link email template may be changed only after compatible application code is live and rollback artifacts are verified.
- Preserve the production Site URL, production callback, Auth security settings, keys, Confirm sign up template and unrelated templates/settings.

## Product behavior

1. Existing prepared trainer identities authenticate without passwords by requesting an email OTP.
2. Unknown email addresses receive the same generic response but cannot create an Auth identity because `shouldCreateUser:false` remains mandatory.
3. The email presents one clear OTP code and no direct `ConfirmationURL` verification action.
4. The trainer enters the code in the same originating browser journey. The application verifies it with Supabase `verifyOtp` using the correct email authentication type.
5. Successful verification establishes the normal Supabase session and continues to the normalized same-origin `next` path, defaulting to `/portal`.
6. Email address and OTP must not appear in a URL, log, durable evidence, analytics payload or committed fixture. Keep address state transient in the browser or another narrowly justified protected mechanism; do not add schema solely for the challenge.
7. Incorrect, expired, reused, superseded or malformed codes fail generically and create no application bootstrap or access.
8. Rate limiting, resend timing and expiry messaging must be accurate without revealing whether an identity exists.
9. Exact plus-address matching remains trim-and-case normalization only; never strip or canonicalize the `+tag`.
10. Existing callback handling remains available during rollout and rollback, but the OTP email must not depend on a clickable verification link.

## Participant and privacy boundary

- Durable evidence uses only Trainer Participant A/B/C.
- Never request, return, print, log, screenshot, commit or retain participant inboxes, Auth UUIDs, OTPs, magic links, authorization codes, tokens, credentials or mailbox headers.
- The product owner remains the protected provider/mailbox operator.
- A begins from the last accepted sanitized state `0/1/0`, tagged and Sprint-owned, with no observed sign-in indicator. Reverify through the guarded path immediately before use.
- B/C ownership must be classified individually. Never delete a pre-existing identity; remove only Sprint-owned metadata/application access where exact ownership permits.
- Participants run sequentially: A first; B only after A passes and state is reconciled; C only after B passes.

## Approved implementation and operational scope

- Add the minimum OTP request, code-entry, verification, resend and error-state UI/server behavior.
- Preserve portal routing, dashboard behavior, roles, permissions and RLS contracts.
- Add deterministic tests and a bounded synthetic end-to-end OTP harness.
- Create only minimum synthetic identities/application access needed for proof; no real horse/stable data, clinical text, uploads, Storage, commerce, audio or transcription.
- Deploy an exact-source alias-free Preview.
- After all Preview gates, deploy the backward-compatible OTP-capable application to production while the existing Magic Link template still operates.
- Capture a protected rollback representation and sanitized fingerprint of the existing Magic Link template, then change only that template to a single-code OTP presentation using supported Supabase variables.
- Run immediate synthetic production-boundary smoke and exact Preview participant-path proof after cutover.
- Restore the captured template and roll back application deployment if a material authentication, redirect, session, privacy or availability gate fails.
- Complete A/B/C trainer dashboard acceptance only after synthetic OTP proof passes.

## Out of scope

- Password authentication, social login, SMS OTP, MFA, passkeys or account recovery redesign.
- Schema, migration, RPC, RLS, role, permission, membership or assignment-contract changes.
- Changing Confirm sign up or unrelated provider templates/settings.
- New user self-registration.
- Changing production Site URL, production callback, stable domain ownership, DNS or keys.
- Retaining both a verification link and OTP as competing participant actions.
- New dashboard/product features unrelated to authentication acceptance.
- Real participant names or inboxes in files or Builder conversation.

## Evidence-Proportional Execution Standard

Stop only for a material wrong-target, protected-data, secret, destructive, migration, authentication-integrity, production-impact, scope-authority or cleanup risk. Use equivalent or stronger safe evidence when a preferred supporting tool is unavailable. Keep in-scope harness, validator, formatting, encoding, credential-refresh and reporter corrections in this sprint. Do not create another follow-up solely because browser automation, mailbox automation, Docker, a renderer, schema dump or optional CLI is unavailable. Manual intervention is last, after safe alternatives are exhausted, and must include the exact blocked fact, evidence checked, operator action and Builder verification.
