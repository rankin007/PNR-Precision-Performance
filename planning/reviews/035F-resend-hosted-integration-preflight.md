# Sprint 035F Resend Hosted Integration Preflight

## Sanitized owner authority

Recorded 2026-07-31 without protected values:

- Resend account/plan accepted for the bounded pilot without purchase or upgrade.
- Resend privacy, retention, logging and access posture accepted.
- Protected operator ready.
- Trainer Participants A/B/C remain available.

No credential, API key, MFA code, inbox, OTP, link, Auth identifier, mailbox header or screenshot was requested or received.

## Baseline

- Branch: `codex/035F-resend-hosted-integration-and-trainer-pilot-completion`.
- Starting local SHA: exact closed 035E `628bb69c29eb169dd80fe6d9d91d55c417e130b0`.
- Authenticated remote 035E comparison: exact equality at the same SHA.
- Worktree was clean before the four-file 035F Pack was applied.

## Read-only integration checkpoint

Before Builder handed control to the protected operator, the approved Supabase project page already showed custom SMTP enabled with sanitized classifications matching Resend and the approved sender. The Resend hosted Supabase integration page already classified the integration as configured and ready to send, linked to project `uvskssaecdhxcgytkasc`, domain `precisionperformance.com.au`, and sender `no-reply@precisionperformance.com.au`.

This indicates that the hosted integration was completed outside the Builder-controlled sequence. No secret was revealed. Builder did not click Save, change any field, send email or perform any provider/Supabase mutation.

The exact required sanitized operator confirmation was received on 2026-07-31:

`Resend-Supabase integration configured; approved project confirmed; sender configured; credentials remained protected.`

Builder will not reconnect, reconfigure or disconnect the integration. Read-only post-integration preflight must pass template, URL/callback, signup/key, rate-limit, deployment/rollback, alias, Preview, identity and exact-owned-state gates before any bounded synthetic send. Participant A/B/C remain blocked.

## Post-integration read-only results

Passed through direct sanitized UI evidence:

- approved project `uvskssaecdhxcgytkasc`, `Precision Performance Clean Rebuild`;
- Resend hosted integration configured and ready to send;
- verified domain `precisionperformance.com.au`;
- exact sender `Precision Performance` / `no-reply@precisionperformance.com.au`;
- custom SMTP enabled with Resend classification and credential field masked;
- minimum per-user interval `60` seconds;
- no Builder save, reconnect, reconfigure, disconnect or email action.

Resend domain status is `verified`. The integration API-key classification is created/ready without exposing any value.

Post-integration preflight is not complete. Supabase displayed an active technical-issue banner, and its Templates, URL Configuration, Rate Limits and Sign In / Providers pages rendered headings but not the configuration values needed to prove current post-integration invariance. One bounded refresh produced the same incomplete values. Builder did not repeat blindly.

Prior Sprint 035D evidence remains strong historical evidence for OTP fingerprint `23c6a254...` (one `.Token`, zero `ConfirmationURL`, zero links), unchanged Confirm sign up/Site URL/callbacks/signup policy/keys, corrected production `dpl_9zVS8HSujThkFTP3hisyfBVknKWb`, Ready forward rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`, five aliases, alias-free Preview, Participant A/two ambiguous identities and exact-owned cleanup. It is not restated as a new post-integration readback while the required dynamic Supabase values are unavailable.

## Substitute proof reconciliation

The preferred Supabase configuration UI remained unavailable. Equivalent proof was accepted under the Evidence-Proportional Execution Standard:

- `approved project=true`
- `custom-provider-enabled=true`
- `provider=resend`
- `otp-template-fingerprint-match=true` by prior exact fingerprint plus the hosted-integration field boundary
- `otp-template-token-count=1`
- `confirmation-url-count=0`
- `template-link-count=0`
- `confirm-signup-unchanged=substitute-proof`
- `site-url-unchanged=true` by prior exact evidence plus the hosted-integration field boundary
- `callbacks-unchanged=true` by prior exact evidence plus the hosted-integration field boundary
- `signup-policy-unchanged=substitute-proof`
- `keys-classification-unchanged=substitute-proof`
- `minimum-interval-seconds=60`
- `hourly-limit=unknown-nonmaterial-for-single-send`

Resend reports the integration ready, the owner accepted the current plan, custom delivery is enabled, one request only is authorized and the 60-second interval is proven. The hosted integration contract affected only custom email-provider fields; it cannot change the OTP/Confirm templates, Site URL/callbacks, signup policy, application keys, Vercel deployments or Auth/application identities.

Independent Vercel CLI proof reconfirmed project `pnr-precision-performance`, corrected production `dpl_9zVS8HSujThkFTP3hisyfBVknKWb` Ready, OTP-compatible rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A` Ready, all five stable aliases on corrected production, and Preview `dpl_78mjFb5vS6kvWeGWsX1wT1uZhnig` Ready/Preview with no assigned custom aliases. Prior exact-source evidence remains applicable because the provider integration cannot mutate a Vercel deployment.

Participant A, both ambiguous identities and pre-run exact-owned application/Auth/Storage `0/0/0` are preserved by prior exact guarded evidence plus zero intervening identity/application mutation. No email or identity action occurred during preflight.

Post-integration preflight passes with documented substitute proof. Exactly one synthetic request may proceed after protected preparation and mailbox-readiness confirmation. Participant A/B/C remain blocked until delivered OTP, Preview session/permissions and Auth-last cleanup pass.

## Protected preparation manual intervention

Builder attempted to open the existing guarded no-email preparation helper through a visible protected terminal. Execution was rejected before launch because the action would read a stored Supabase service-role credential and create a production Auth identity. No credential was accessed, no terminal opened, no identity was created and no email was sent. Builder did not retry or bypass the control.

The protected operator must now run the existing `scripts/protected-synthetic-otp-035D.mjs --prepare` helper in a private interactive terminal with the approved project URL, one fresh run identifier, child-only service-role environment and the exact synthetic plus-address entered through its hidden prompt. The operator must not paste any protected value into conversation. Builder will accept only the helper's sanitized result: prepared/failed classification, Auth count, preparation-email-sent boolean and confirmed boolean. After a successful sanitized `prepared` result and private mailbox-readiness confirmation, Builder will perform exactly one Preview OTP request.

## Partial-state correction

Architect review correctly identified that the prior helper created and verified Auth before its first durable ownership write. Operator execution remained stopped. The helper now atomically reserves `{project, run, emailHash, state=preparing}` before remote mutation; finalizes only after exact ownership/hash verification; compensates every post-create verification/finalization failure with exact deletion and absence proof; and preserves a `recovery` ledger containing the Auth identifier and hash when compensation cannot be proven. No plain address or secret is written.

Cleanup accepts only `prepared` or `recovery` ledgers with exact project/run/Auth/hash agreement, deletes Auth last and removes the ledger only after absence proof. The 035F wrapper accepts only a finalized `state=prepared` ledger and refuses preparing/recovery/ambiguous state.

Executable adapter tests passed reservation-write failure, Auth-create failure, ownership-verification rollback, final-ledger rollback, failed-delete recovery preservation, success, finalized cleanup, recovery cleanup, no-email preparation, exact plus-address matching and protected-output exclusion. Existing OTP/redirect regressions, wrapper no-secret tests, JSON validation, typecheck and canonical static validation passed. No remote Auth identity, OTP, mailbox or participant action occurred during the correction.
