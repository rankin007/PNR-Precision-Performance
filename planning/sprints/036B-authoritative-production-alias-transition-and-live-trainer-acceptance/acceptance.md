# Sprint 036B Acceptance

## Canonical and handoff baseline

- [x] Current directory and Git top-level both equal the permanent canonical repository exactly.
- [x] Exactly one canonical worktree registration exists; no retired legacy path, temporary worktree, deployment folder or alternate lineage is used.
- [x] Exact closed Sprint 036 SHA `6edc4dab04248c36ca57f9722849fcf16b7acb2f` and direct remote authority are proven or a later accepted authority is explicitly reconciled.
- [x] The pre-branch working state contains only the expected Architect Pack and `planning/STATUS.json` handoff changes.
- [x] The Pack dry-run reports exactly four new 036B sprint files, application creates exactly those files, and the post-application dry-run reports exactly those four targets as updates.
- [x] Only the scoped `codex/036B-authoritative-production-alias-transition-and-live-trainer-acceptance` branch is used.

## Zero-product-change candidate

- [x] Accepted Sprint 035K correction remains in ancestry and current application/source bytes have no unexplained difference from accepted 035K and validated Sprint 036 behavior.
- [x] No application, library, component, test, package, configuration, migration or repository script file changes.
- [x] Focused auth/OTP/redirect/bootstrap/session/dashboard/permission tests pass on the unchanged application tree.
- [x] Canonical validation, TypeScript, zero-warning lint and Production build pass using equivalent or stronger safe evidence where needed.
- [x] Diff, staged, secret, protected-data, unsafe-path, generated-artifact and encoding scans pass.
- [ ] The scoped planning/evidence candidate is intentionally committed/pushed and exact local/direct-remote/live equality is proven before deployment. — No deployment occurred; the closeout checkpoint is published after the preflight stop.

## Vercel mechanism and exact affected set

- [x] Installed Vercel CLI version and current official deploy/alias/promote/rollback semantics are recorded before mutation.
- [x] Intended project name/ID, Production environment, rollback and unaccepted Sprint 036 candidate are freshly reconciled.
- [x] The five accepted aliases are recorded exactly and no additional Production alias would be moved by the selected mechanism.
- [x] `vercel promote` or `vercel rollback` is not used unless its exact pre-confirmation affected set is proven to equal the five accepted aliases. — Neither command was used; explicit one-alias assignment remained selected.
- [x] Deployment-level alias inventory is classified as corroborating only and never overrides per-alias routing.

## Authoritative pre-state and staging

- [x] `baseline` contains five timestamped independent alias rows; all five resolve to Ready rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A` in the intended project.
- [ ] Approved Supabase project, Production Site URL/callback, no wildcard, SMTP/template/OTP compatibility and retained pilot ownership pass through sanitized read-only evidence.
- [ ] A fresh candidate—not `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf`—deploys from the exact remote-backed 036B SHA using `--prod --skip-domain`.
- [ ] The fresh candidate is Production-targeted, exact-source, Ready and has an immutable automatic URL before alias mutation.
- [ ] `post-stage` independently proves all five aliases still resolve to rollback.
- [x] No DNS, Vercel project/domain/environment setting, Supabase/Auth, callback, SMTP, template, identity, fixture or data mutation occurs during staging. — Staging did not begin.

## Five-alias promotion ledger

- [ ] Promotion uses the fixed generated-first/canonical-apex-last order.
- [ ] After promotion step 1, exactly one alias resolves to candidate and four to rollback.
- [ ] After promotion step 2, exactly two aliases resolve to candidate and three to rollback.
- [ ] After promotion step 3, exactly three aliases resolve to candidate and two to rollback.
- [ ] After promotion step 4, exactly four aliases resolve to candidate and one to rollback.
- [ ] After promotion step 5, exactly five aliases resolve to candidate and zero to rollback.
- [ ] Every snapshot contains five independent timestamped rows and no third deployment, non-Ready state or unlisted alias movement.
- [ ] `candidate-live` proves all five aliases resolve to the exact Ready candidate before human authentication.

## Public and protected route safety

- [ ] Canonical homepage, pricing, disclaimer/hero asset, visibly disabled enquiry, health and truthful sign-in pass with cache-busting where appropriate.
- [ ] Anonymous `/portal` and horse routes return safely to sign-in without loops or identity leakage.
- [ ] Unsafe methods and protected/API boundaries retain their expected denial behavior.
- [ ] DNS and public/authenticated separation remain unchanged.
- [ ] Compatible rollback remains Ready throughout promotion and human acceptance.

## First private Production trainer journey

- [ ] The retained designated trainer privately opens the canonical Production sign-in page.
- [ ] One current six-digit code is requested, privately received and privately entered after the applicable cooldown.
- [ ] Verification establishes a Production session and lands on `/portal` without redirect loop or bootstrap collision.
- [ ] Dashboard shows only the retained assigned synthetic stable/horse with accurate existing workflow state, basis/time and permitted next action.
- [ ] Trainer opens the synthetic horse workspace, reaches or completes the existing permitted action and returns safely.
- [ ] Inaccessible-horse access is denied without name, stable, state, count or existence leakage.
- [ ] Sign-out invalidates application access and protected routes become inaccessible.

## Second fresh Production sign-in

- [ ] A fresh browser/application session contains no first-session authentication state after sign-out and cooldown.
- [ ] A new current code is requested, privately received and entered; no old or reused code/session counts.
- [ ] The second verification reaches `/portal` and shows the same bounded assignment without broadened visibility.
- [ ] The tester confirms the live journey is usable without providing protected details.
- [ ] Email, OTP, mailbox content, identifiers, credentials, tokens and session material remain absent from conversation, commands, URLs, logs, screenshots, Git and durable evidence.

## Pilot, provider and scope invariants

- [ ] Retained Sprint 035K adopted identity and exact eight-record synthetic graph remain governed and unchanged.
- [ ] No additional trainer, Auth identity, stable, horse, membership, assignment, clinical record or Storage object is created.
- [ ] Approved-account-only OTP, anti-enumeration, cooldown, transient inputs, safe errors, session enforcement and membership/permission checks remain intact.
- [ ] Participants A/B/C, unrelated identities, real data, broad onboarding and public self-registration remain untouched.
- [ ] No source/test/package, provider configuration, callback, template, schema, RLS, role, permission, DNS, enquiry, commerce, scoring, upload, voice, trend or unrelated public change occurs.

## Failure and rollback

- [x] A material failure receives one focused sanitized diagnosis and no blind retry.
- [ ] Any staging drift, transition discrepancy, route failure, material authentication failure or scope expansion triggers the exact all-five rollback.
- [ ] Rollback assigns all five aliases to the exact immutable rollback URL in the fixed canonical-first order, even when one or more already appear safe.
- [ ] After each rollback assignment, all five aliases are reread and recorded.
- [ ] `final-rollback`, when required, proves five/five aliases resolve to Ready rollback and final public/protected smoke passes.
- [ ] No known-broken candidate, third deployment or partial alias mapping remains live.
- [ ] If five/five rollback cannot be proven, outcome is `production-promotion-partial-mutation-blocked` with complete step-by-step manual intervention.

## Final acceptance and closeout

- [ ] `final-accepted` proves five/five aliases remain on the exact Ready candidate after both fresh sign-ins.
- [ ] Final Production/rollback/source/aliases/callback/provider/template/pilot state is reconciled through sanitized evidence.
- [ ] Review and current state/status/roadmap/lifecycle/schedule/evidence/operations/briefing records agree on one permitted outcome.
- [ ] Canonical worktree is clean and exact closeout commit equals the scoped direct remote branch.
- [ ] Sprint 029N remains unstarted unless outcome is `production-trainer-access-stable-live-accepted-clean` or the owner later makes a separate explicit roadmap decision.
- [ ] No merge, PR, `develop` push, force-push, DNS change, broad rollout or product-wide Done declaration occurs.

## Permitted outcomes

- `production-trainer-access-stable-live-accepted-clean`
- `production-alias-transition-preflight-blocked-clean`
- `production-candidate-staging-blocked-clean`
- `production-candidate-staging-alias-drift-rollback-clean`
- `production-promotion-rolled-back-clean`
- `production-trainer-authentication-failed-rollback-clean`
- `production-access-source-or-contract-change-required-rollback-clean`
- `production-promotion-partial-mutation-blocked`

Only `production-trainer-access-stable-live-accepted-clean` completes the live trainer-access gate. A clean rollback is safe but does not complete the business outcome.

## Closeout disposition — 2026-08-04

Outcome: `production-alias-transition-preflight-blocked-clean`.

Canonical, zero-product-change, validation, Vercel mechanism/target/affected-set and five/five rollback baseline criteria passed. The exact Supabase project was healthy, but the signed-in Authentication dashboard rendered protected identity fields into browser-control output before provider compatibility and retained-pilot checks completed. Builder stopped immediately and finalized the browser surface. No candidate, alias, provider, identity, fixture, data, OTP or human-session mutation occurred. Promotion and human-acceptance criteria remain intentionally unmet, and Sprint 029N remains gated.
