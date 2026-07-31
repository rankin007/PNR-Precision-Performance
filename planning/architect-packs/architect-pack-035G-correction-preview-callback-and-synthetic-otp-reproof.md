============================================================
FILE: planning/sprints/035G-correction-preview-callback-and-synthetic-otp-reproof/requirements.md
============================================================

# Sprint 035G — Correction Preview Callback And Synthetic OTP Reproof

## Goal

Replace only the superseded temporary Preview callback with the exact Sprint 035F correction Preview callback, then perform one bounded exact-owned synthetic recovered-code authentication proof against that Preview and clean all Sprint-owned state Auth-last.

Target outcome: `correction-preview-synthetic-otp-proven-clean`.

## Workflow profile

Strict. This follow-up mutates shared Supabase Auth callback configuration and performs one live transactional OTP request against production authentication infrastructure.

## Starting authority and baseline

Start from completed Sprint 035F branch `codex/035F-resend-hosted-integration-and-trainer-pilot-completion` at exact clean local/remote branch-tip SHA `7c43712edc352e5e153e7962c5105569a9bfce8f`.

Create branch `codex/035G-correction-preview-callback-and-synthetic-otp-reproof`. Do not reopen or rewrite Sprint 035 through 035F.

Preserve these accepted facts:

- correction commit `566f308a0c6c1b104531afe22d89580d643f799a`;
- alias-free Ready Preview `dpl_J7bSHyQ8heNrqHWw38GdFNvpaaK4` at `https://pnr-precision-performance-dwkv3pzey-rankin007s-projects.vercel.app`;
- exact new callback `https://pnr-precision-performance-dwkv3pzey-rankin007s-projects.vercel.app/auth/callback`;
- superseded callback belongs to prior Preview `dpl_9HDfeHLHJgcU6TzZqAR9vGEHzEYb` and must be identified from protected current readback, not guessed;
- production Site URL and production callback remain unchanged;
- production `dpl_9zVS8HSujThkFTP3hisyfBVknKWb`, rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`, and five stable aliases remain unchanged;
- Resend hosted integration, sender, OTP template, OTP length `6`, expiry `3600`, rate limit and preserved identities remain unchanged;
- exact-owned pre-run application/Auth/Storage state is `0/0/0` and the ownership ledger is absent;
- Participants A/B/C remain blocked.

## Approved actions

- Read-only target, callback, deployment, provider, identity and clean-state preflight.
- Replace exactly the superseded temporary Preview callback with the exact 035F correction Preview callback.
- Independent post-save readback proving exactly the unchanged production callback plus the new correction Preview callback, with no wildcard or stale Preview callback.
- Fresh exact-owned, already-confirmed synthetic preparation through the existing guarded no-email helper and private operator input path.
- Exactly one OTP request through the exact correction Preview after all gates pass.
- Protected delivery confirmation limited to intended synthetic recipient, one six-digit OTP, zero links and no invitation/confirmation branch.
- Deliberate client-state loss followed by `Already have a code?` private re-entry and exactly one verification submission without another send.
- Sanitized session, landing, permission and dashboard proof, or one allowlisted diagnostic category on failure.
- Dependency-safe exact-owned cleanup with session revocation, application deletion and Auth deletion last, followed by absence proof and ledger removal.
- Focused deterministic harness, validator, reporter, formatting or encoding corrections that do not change product/provider contracts.
- Planning, review, status, schedule, evidence-index and briefing closeout updates.

## Out of scope

- Participant A, B or C authentication, messages, fixtures, access or acceptance.
- A second OTP request, resend, supersession, retry with the same or another synthetic identity, or participant fallback.
- Production deployment, alias assignment/change, rollback deployment, DNS, Resend integration, sender, template, OTP length/expiry, rate-limit, signup-policy, key or unrelated provider mutation.
- Production Site URL or production callback mutation.
- Schema, migration, RPC, RLS, role, permission, dashboard, horse, clinical or product behavior changes.
- Deletion or mutation of Participant A or either ambiguous preserved identity.
- Merge, PR, `develop` push, production push or history rewrite.
- Commit or branch push without a separate explicit user request.
- Product-wide Done or trainer-pilot completion claims.

## Protected-data boundary

Never request, display, record or transmit passwords, MFA codes, API keys, service-role values, participant addresses, synthetic addresses, OTP values, Auth identifiers, provider message identifiers, mailbox headers or raw provider errors. Private operator input stays in the protected execution surface. Durable evidence may contain only sanitized classifications, hashes already permitted by the guarded helper, counts and allowlisted diagnostic categories.

## Evidence-Proportional Execution and manual intervention

Stop only for a material wrong-target, authority, protected-data/secret, callback integrity, authentication, production, scope or cleanup boundary. Use equivalent or stronger safe evidence when a preferred supporting tool is unavailable. Keep deterministic harness, validator, reporter, formatting and encoding corrections in 035G. Do not repeat a failed action blindly and do not create another sprint solely because an optional browser, renderer, CLI or metadata view is unavailable.

Manual intervention is last. If genuinely required, record the blocked fact, evidence checked, exact private operator steps, prohibited disclosures and what Builder will verify afterward. Callback mutation and OTP execution must not proceed through manual guesswork.

============================================================
FILE: planning/sprints/035G-correction-preview-callback-and-synthetic-otp-reproof/blueprint.md
============================================================

# Sprint 035G Blueprint

## 1. Open and reconcile safely

1. Verify current branch, exact SHA `7c43712edc352e5e153e7962c5105569a9bfce8f`, authenticated remote equality and clean worktree.
2. Create `codex/035G-correction-preview-callback-and-synthetic-otp-reproof` without changing prior branches.
3. Read all 035G files, the complete 035F review and closeout, current state/status/briefing, guarded synthetic helper contracts and callback/provider evidence.
4. Record sanitized read-only proof of the exact approved Supabase project, current Site URL/callback classifications, new Ready alias-free Preview, production/rollback/five aliases, provider invariants, preserved-identity classifications, ledger absence and exact-owned `0/0/0`.
5. Stop before mutation if the current callback set, target project, Preview identity or zero-state boundary differs materially from the recorded 035F state.

## 2. Rotate only the temporary Preview callback

1. Capture a protected restorable representation of the current callback set and sanitized classification of the superseded Preview callback.
2. Remove only the callback belonging to prior Preview `dpl_9HDfeHLHJgcU6TzZqAR9vGEHzEYb`.
3. Add exactly `https://pnr-precision-performance-dwkv3pzey-rankin007s-projects.vercel.app/auth/callback`.
4. Preserve the production Site URL and production callback byte-for-byte.
5. Save once, then independently read back the configuration.
6. Prove exactly two allowed callbacks remain: unchanged production plus the exact correction Preview callback. Prove no wildcard, stale Preview or duplicate callback remains.
7. Recheck an artifact-free callback request remains on the correction Preview and returns to the intended sign-in/portal boundary.
8. Reconcile production, rollback and all five aliases before any identity or email action.

If save or readback is partial, target identity is uncertain, production values differ, or exact rollback cannot be established, restore the prior callback set when safe and stop without preparing an identity or sending email.

## 3. Fresh guarded preparation

1. Confirm the ownership ledger is absent and exact-owned application/Auth/Storage is `0/0/0`.
2. Confirm provider readiness, six-digit OTP contract, cooldown and protected mailbox readiness without exposing values.
3. Run the existing guarded no-email preparation path with one fresh run identifier and one exact plus-address supplied privately.
4. Accept only sanitized `prepared` output with exact target, ownership and `preparation-email-sent=false` classifications.
5. Refuse `preparing`, `recovery`, ambiguous, mismatched or unverified ledger state. Apply the helper's exact compensation/recovery procedure before any send.

## 4. One recovered-code authentication proof

1. Open only the exact correction Preview `/sign-in` path and request exactly one OTP.
2. Record only sanitized request acceptance and protected delivery classifications: intended synthetic recipient, one six-digit code, zero links and no invitation/confirmation branch.
3. Do not enter the code in the original request state. Close or discard that client state deliberately without logging or persisting email/OTP material.
4. Reopen the exact correction Preview, select `Already have a code?`, privately enter the complete synthetic plus-address and exact six-character OTP, and submit verification exactly once.
5. Prove no second send occurred, the verification payload uses case-normalized complete plus-address, trim-only exact six-character token and explicit `type: "email"`.
6. On success, prove session establishment, landing host equals the exact correction Preview, `/portal` is reached, bootstrap is conflict-safe, permitted dashboard/horse access agrees with RLS and wrong-horse access is denied.
7. On failure, record only one allowlisted category: `expired`, `invalid`, `already-used`, `email-mismatch`, `malformed`, `rate-limited`, `provider/configuration` or `unknown`. Never record raw provider text or protected values. Do not request another OTP.

## 5. Cleanup on every terminal path

1. Revoke the exact-owned session first when one exists.
2. Remove exact-owned application data dependency-safely.
3. Verify dependent records and owned Storage are zero.
4. Delete the exact-owned Auth identity last.
5. Prove exact Auth absence, then remove the ownership ledger.
6. Independently prove final application/Auth/Storage `0/0/0`, Auth-last and ledger absent.
7. Preserve Participant A and both ambiguous identities without mutation or new access.

Cleanup is mandatory after success, provider rejection, browser failure, partial bootstrap or operator interruption. Stop and report a material blocker if exact cleanup cannot be proven.

## 6. Reconcile and close

1. Reverify the exact two-callback set, unchanged Site URL and absence of stale/wildcard callbacks.
2. Reverify Resend integration, sender, OTP template, OTP length/expiry, rate limit and unrelated provider settings are unchanged.
3. Reverify production, rollback, five stable aliases and the alias-free correction Preview.
4. Run focused recovered-code, OTP, redirect, plus-address, diagnostic-sanitizer, bootstrap-concurrency, dashboard/permission, recovery/wrapper/no-secret, JSON, lint, typecheck, static, encoding, diff and privacy checks. Use the hosted Preview build as substitute build proof if the local OneDrive build again stalls without a product error.
5. Update 035G review evidence and canonical lifecycle files. Record mutation, readback, request/verification counts, sanitized outcome, cleanup and preserved invariants proportionally.
6. Do not commit or push unless the user separately asks. If asked later, stage only the approved 035G file set, scan for protected material, commit intentionally and push only the 035G branch.

## Rollback

Before callback mutation, establish the exact prior two-callback representation. If callback mutation fails before an OTP request, restore only that prior set and prove exact readback. After the single OTP request, do not rotate callbacks merely to obscure a runtime failure; first clean exact-owned state, preserve diagnostic evidence and stop for Architect review. Never alter the production Site URL/callback or production deployment/aliases as rollback.

## Approved files

Builder may edit only:

- the generated four Sprint 035G files;
- `planning/reviews/035G-correction-preview-callback-and-synthetic-otp-reproof.md`;
- current `planning/STATE.md`, `planning/STATUS.json`, schedule, evidence index and `planning/ARCHITECT_BRIEFING.md` when required for lifecycle closeout;
- focused existing guarded proof, cleanup, sanitizer or deterministic test files only if a non-product correction is necessary inside the approved outcome.

Any application/server source, schema, provider-contract or product-behavior change is outside 035G and requires Architect review before editing.

============================================================
FILE: planning/sprints/035G-correction-preview-callback-and-synthetic-otp-reproof/acceptance.md
============================================================

# Sprint 035G Acceptance

## Baseline and callback rotation

- [ ] Exact starting branch/SHA, authenticated remote equality and clean worktree pass.
- [ ] Approved Supabase project, correction Preview, production, rollback, five aliases, provider invariants, preserved identities, ledger absence and exact-owned `0/0/0` pass before mutation.
- [ ] A protected restorable prior callback representation is established.
- [ ] Only the superseded temporary Preview callback is replaced.
- [ ] Production Site URL and production callback remain exactly unchanged.
- [ ] Independent readback proves exactly production plus `https://pnr-precision-performance-dwkv3pzey-rankin007s-projects.vercel.app/auth/callback`, with no wildcard, stale or duplicate callback.
- [ ] Artifact-free callback and Preview/production/alias reconciliation pass before preparation.

## Synthetic recovered-code proof

- [ ] Fresh synthetic preparation is exact-owned, already-confirmed, no-email and finalized `prepared` with no ambiguous/recovery state.
- [ ] Exactly one OTP request occurs through the exact correction Preview.
- [ ] Protected delivery proves intended synthetic recipient, one six-digit OTP, zero links and no invitation/confirmation branch.
- [ ] Original request state is deliberately discarded and recovery starts through `Already have a code?` without another send.
- [ ] Exactly one verification submission uses the complete case-normalized plus-address, trim-only exact six-character token, leading-zero-safe string semantics and explicit `type: "email"`.
- [ ] No address, OTP, Auth identifier, raw provider error or mailbox artifact enters logs, URLs, analytics, durable evidence or conversation.
- [ ] Success proves exact Preview session, `/portal`, conflict-safe bootstrap, permitted dashboard/horse access, wrong-horse denial and RLS agreement; or failure records exactly one allowlisted diagnostic category without retry.

## Cleanup and invariants

- [ ] Session revocation and dependency-safe application cleanup occur before Auth deletion.
- [ ] Exact-owned Auth is deleted last and absence is proven before ledger removal.
- [ ] Final exact-owned application/Auth/Storage is `0/0/0`, Auth-last, ledger absent.
- [ ] Participant A and both ambiguous identities remain preserved and unmodified; B/C remain untouched.
- [ ] Callback readback still proves exact production plus correction Preview only.
- [ ] Resend integration, sender, OTP template, OTP length `6`, expiry `3600`, rate limit and unrelated provider settings remain unchanged.
- [ ] Production, rollback and five aliases remain Ready/unchanged; correction Preview remains Ready/Preview/alias-free.

## Validation and closeout

- [ ] Applicable recovery, OTP, redirect, plus-address, diagnostic, concurrency, dashboard/permission, cleanup/wrapper and no-secret regressions pass.
- [ ] JSON, lint, typecheck, static, encoding, diff and privacy checks pass.
- [ ] Production build evidence passes locally or through equivalent/stronger clean hosted Preview build evidence.
- [ ] Review, state, status, schedule, evidence index and Architect briefing record the bounded mutation, exact request/verification counts, result, cleanup and preserved invariants.
- [ ] No commit or push occurs without separate explicit user authority.

## Stop conditions

Stop and restore safely for wrong project/Preview/callback target, partial or unprovable callback mutation, production Site URL/callback change, secret or protected-data exposure, non-final preparation ledger, unexpected email branch, second-send risk, session/permission/RLS failure, production regression, unauthorized source/provider scope or cleanup uncertainty. A runtime verification rejection is not authority for a second request: classify once, clean, document and stop.

## Permitted outcomes

- `correction-preview-synthetic-otp-proven-clean`
- `correction-preview-synthetic-otp-rejected-clean`
- `callback-rotation-blocked-restored-clean`
- `synthetic-preparation-blocked-clean`
- `cleanup-blocked-protected-state-preserved`

Never claim trainer-pilot completion or product-wide Done.

============================================================
FILE: planning/sprints/035G-correction-preview-callback-and-synthetic-otp-reproof/handoff-prompt.md
============================================================

You are Builder for Sprint 035G — Correction Preview Callback And Synthetic OTP Reproof.

Apply Architect Pack `planning/architect-packs/architect-pack-035G-correction-preview-callback-and-synthetic-otp-reproof.md`, verify it generates exactly four files under `planning/sprints/035G-correction-preview-callback-and-synthetic-otp-reproof/`, and then execute only from those generated sprint files.

Start from completed Sprint 035F branch `codex/035F-resend-hosted-integration-and-trainer-pilot-completion` at exact clean local/remote branch-tip SHA `7c43712edc352e5e153e7962c5105569a9bfce8f`. Create only `codex/035G-correction-preview-callback-and-synthetic-otp-reproof`. Read `AGENTS.md`, agent identity, every generated 035G file, the complete 035F review/closeout, current state/status/briefing and the existing guarded preparation, recovery, sanitizer and cleanup contracts. Do not reopen or rewrite Sprint 035 through 035F.

Your approved outcome is to replace only the superseded temporary Preview callback with `https://pnr-precision-performance-dwkv3pzey-rankin007s-projects.vercel.app/auth/callback`, prove independent exact readback, run one fresh exact-owned recovered-code synthetic authentication attempt against Ready alias-free Preview `dpl_J7bSHyQ8heNrqHWw38GdFNvpaaK4`, and finish with exact-owned application/Auth/Storage `0/0/0`, Auth-last and ledger absent.

First prove the exact starting SHA, remote equality, clean worktree, approved Supabase project, current callback set, correction Preview identity, production `dpl_9zVS8HSujThkFTP3hisyfBVknKWb`, rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`, five stable aliases, provider invariants, preserved identities, ledger absence and exact-owned `0/0/0`. Capture a protected restorable prior callback representation. Stop before mutation if any material baseline differs.

Remove only the callback belonging to prior Preview `dpl_9HDfeHLHJgcU6TzZqAR9vGEHzEYb`, add the exact correction Preview callback, preserve production Site URL and production callback byte-for-byte, save once and independently read back. Prove exactly two callbacks remain—unchanged production plus the correction Preview—with no wildcard, stale or duplicate callback. Reprove artifact-free same-Preview callback routing and all deployment/alias invariants before identity preparation.

Use the existing guarded no-email helper with one fresh run identifier and one exact plus-address entered privately. Accept only finalized sanitized `prepared` output. Never expose passwords, MFA codes, keys, service-role values, addresses, OTPs, Auth identifiers, provider message identifiers, mailbox headers or raw errors.

Request exactly one OTP through the correction Preview. Protected delivery must confirm only the intended synthetic recipient, one six-digit OTP, zero links and no invitation/confirmation branch. Deliberately discard the original request client state. Reopen the exact Preview, choose `Already have a code?`, privately re-enter the complete plus-address and exact six-character OTP, and submit verification exactly once. Do not send or request another OTP under any result.

On success, prove exact Preview session, `/portal`, conflict-safe bootstrap, permitted dashboard/horse access, wrong-horse denial and RLS agreement. On failure, record only one of `expired`, `invalid`, `already-used`, `email-mismatch`, `malformed`, `rate-limited`, `provider/configuration` or `unknown`. Never retain raw provider detail.

On every terminal path, revoke the exact-owned session when present, delete exact-owned application state dependency-safely, verify owned Storage/dependencies zero, delete exact-owned Auth last, prove absence, then remove the ownership ledger. Independently prove final `0/0/0`, Auth-last and ledger absent. Preserve Participant A and both ambiguous identities; do not begin A, B or C.

Do not deploy production, assign/change aliases, mutate DNS, Resend integration, sender, template, OTP length/expiry, rate limits, signup policy, keys, production Site URL/callback, schema, migrations, RLS, roles, permissions, dashboard/product behavior or preserved identities. Do not merge, open a PR, push `develop` or rewrite history. Do not commit or push any branch unless the user separately and explicitly asks.

Run the proportional focused recovery/OTP/redirect/plus-address/diagnostic/concurrency/dashboard/permission/cleanup/no-secret regressions plus JSON, lint, typecheck, static, encoding, diff and privacy checks. Use equivalent or stronger clean hosted build proof if the local OneDrive build stalls without a product error. Keep only deterministic in-scope harness/reporting corrections in 035G; stop before any application/server source, schema, provider-contract or product-behavior change.

Refresh the 035G review, state, status, schedule, evidence index and Architect briefing with the callback mutation/readback, exact request and verification counts, sanitized result, cleanup and preserved invariants. Close with exactly one permitted 035G outcome. Never claim trainer-pilot completion or product-wide Done.
