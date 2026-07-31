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

## Input-refusal correction and zero-state proof

The operator's failed attempt returned `PREPARATION_INPUT_REFUSED`. Local proof found no ownership ledger. Executable invalid-input tests prove all malformed structures fail before ledger write, Auth listing or Auth creation: zero Admin calls, zero ledger writes and Auth/application/Storage `0/0/0`. The helper has no application-table or Storage mutation path during preparation.

Validation now requires exactly one address separator, a nonempty local base, a nonempty `+tag`, no whitespace, bounded local/domain lengths, permitted local characters and a valid dotted domain before reservation or remote mutation. Trim/case normalization remains comparison-only and never strips the plus tag. The helper assigns a dedicated sanitized exit classification for `PREPARATION_INPUT_REFUSED`; the wrapper maps it exactly instead of collapsing it to an unexpected/helper failure.

Recovery, wrapper, no-secret, OTP, redirect, JSON, typecheck, static/encoding and diff checks pass after the correction. No Auth identity, application record, Storage object, OTP, mailbox access or participant action occurred.

## Six-digit contract drift containment

- `application-expected-length=6`
- `provider-issued-length=8`
- `authentication-session=not-established`
- `exact-preview-portal=not-reached`

The issued value, recipient, message, headers and provider identifier are not recorded. The value was not entered and no second request was made. Participant A/B/C remain blocked. Architect classifies this as provider configuration drift; application/server tests remain correctly six-digit.

Guarded cleanup then passed with `application=0`, `auth=0`, `storage=0`, `authLast=true`, `ownership=none`. The helper verified exact Auth absence before removing the finalized ownership ledger; Builder independently confirmed the ledger is absent. The failed synthetic run is clean `0/0/0`. No protected identity value is recorded.

## Six-digit provider correction

Builder opened the Email provider control in exact Supabase project `uvskssaecdhxcgytkasc`, captured sanitized rollback classification `email-otp-length=8`, changed only that field to `6`, saved once, and reopened the control for independent readback. The current sanitized readback is `email-otp-length=6`; OTP expiry remained `3600`. No other provider field was edited.

Post-correction invariants remain: `minimum-interval=60`, OTP template one `.Token`, zero `ConfirmationURL`, zero links, Resend hosted integration and exact sender unchanged, Site URL/callbacks unchanged, and production/rollback/five aliases/exact Preview unchanged. These values combine the new exact OTP-length/expiry readback with the immediately preceding exact or documented substitute proof; the narrowly scoped provider edit cannot mutate those separate controls or Vercel deployments.

Deterministic six-digit OTP contract, protected recovery, guarded wrapper/no-secret, JSON, typecheck and canonical static/encoding tests pass after the correction. Fresh synthetic preparation remains the next guarded action; no OTP has been requested and Participant A/B/C remain blocked.

## Preview verification runtime correction

One six-digit OTP was requested and accepted by Supabase. Exact Preview server logs correlated digest `798523165` to SQLSTATE `23505`: concurrent authenticated render/bootstrap requests both observed no application user, one created it, and the other failed on the unique `users.auth_user_id` constraint. Sanitized state proved `verification=accepted`, `session=established`, `landing-host=preview`, `landing-path=/portal`, and `bootstrap=partial`. Exact-owned counts were application user `1`, profile `1`, session `1`; memberships, trainer/owner records, stable staff, horse assignments, biochemistry access and Storage were all `0`.

Bootstrap now uses conflict-safe, ignore-duplicate upserts on the existing `auth_user_id` and `user_id` unique constraints followed by canonical user resolution. No schema, migration, RLS, role, permission or unrelated dashboard behavior changed. An executable eight-way concurrent regression proves one application user, one profile and one stable bootstrap result. Focused OTP, redirect, participant containment, trainer dashboard, protected recovery and wrapper/no-secret tests pass with typecheck, JSON and canonical static validation. The local Next build stalled without an error; the fresh Vercel Preview production build compiled, linted, typechecked and generated all routes successfully as stronger substitute proof.

The affected session was revoked first. The exact application user/profile were removed next; dependent record and Storage counts remained zero. The exact Auth identity was deleted last and absence was proven before removing the ownership ledger. Final exact-owned application/Auth/Storage state is `0/0/0`, Auth-last.

Correction source is `fa2232fe1a2e11cbf5516a04217ffc15b4ad9b66`. Fresh deployment `dpl_91SvHNeZgSyEwdScVJbqhHuRDaZm` is Ready/Preview, built from the clean corrected worktree, and has zero aliases. Its callback replaced only the superseded Preview callback; production Site URL and production callback remain unchanged with exactly two allowed callbacks. Production `dpl_9zVS8HSujThkFTP3hisyfBVknKWb` and rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A` remain Ready; all five stable aliases, including the independently inspected fifth alias, still resolve to accepted production.

Email provider remains enabled, Confirm email remains enabled, email OTP length is `6`, expiry remains `3600`, and the OTP template remains unchanged by disabled-save/substitute fingerprint evidence: one `.Token`, zero `ConfirmationURL`, zero links. Resend hosted integration, exact sender and preserved Participant A/ambiguous identities are unchanged. A fresh synthetic attempt is safe; the consumed identity and OTP will not be reused. Participant A/B/C remain blocked until the corrected fresh synthetic proof and Auth-last cleanup pass.

## Resumable code-entry recovery

The subsequently stopped synthetic attempt was guarded-cleaned to application/Auth/Storage `0/0/0`, Auth-last, ownership none; Builder independently confirmed the ownership ledger absent. No identity, recipient or OTP is recorded.

The sign-in form now exposes `Already have a code?`. It enters a client-memory-only recovery state with editable private email and exactly six numeric digits, invokes no send action, and retains the existing `verifyOtp` email flow, `shouldCreateUser:false`, anti-enumeration responses, trim-only plus-address preservation and normalized `/portal`. Email and OTP are not placed in URLs, logs, analytics, localStorage or durable evidence.

Executable tests pass same-tab, reopened-tab, reload-recovery, zero-extra-send, leakage exclusion, malformed/reused/superseded/expired generic failure, exact plus-address preservation and the existing concurrent-bootstrap regression. OTP, redirect, participant containment, trainer dashboard, recovery/wrapper, typecheck, JSON and canonical static validation also pass.

Source `a3583c3` built successfully in fresh Preview `dpl_9HDfeHLHJgcU6TzZqAR9vGEHzEYb`, Ready/Preview and alias-free. Deployed browser proof exercised `Already have a code?`, confirmed editable email plus six-digit entry, and proved no send action. Supabase callbacks are exactly unchanged production plus the fresh Preview; the superseded Preview callback is absent and Site URL is unchanged. Email provider and Confirm email remain enabled, OTP length is `6`, expiry `3600`; Resend, sender and OTP-template fingerprint invariants remain unchanged. Production, rollback and all five stable aliases remain Ready/preserved. A guarded fresh Prepare is safe; A/B/C remain blocked.
