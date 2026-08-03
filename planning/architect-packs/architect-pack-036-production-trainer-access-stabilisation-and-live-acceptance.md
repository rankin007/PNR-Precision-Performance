============================================================
FILE: planning/sprints/036-production-trainer-access-stabilisation-and-live-acceptance/requirements.md
============================================================

# Sprint 036 — Production Trainer Access Stabilisation And Live Acceptance

## Outcome

Establish stable trainer access on the live Production site for the retained Sprint 035K pilot trainer. Promote one exact, Preview-accepted application candidate through a controlled rollback-ready release; prove the trainer can privately receive and enter a six-digit code on the canonical live domain; reach the trainer dashboard and assigned synthetic horse workspace; use the existing permitted action; receive identity-safe wrong-horse denial; sign out; and complete a second fresh sign-in.

Target outcome: `production-trainer-access-stable-live-accepted-clean`.

Preview success alone does not satisfy this sprint. A Ready deployment, green automated tests, a successful public smoke, or the presence of authentication environment variables does not establish stable trainer access. The required proof is the complete human Production journey, including a second fresh sign-in after sign-out.

Sprint 029N and unrelated product work remain behind this access boundary. If Production access cannot be established safely, roll back and close with the truthful non-complete outcome; do not describe the trainer page as stable or move forward as though the access requirement passed.

## Workflow profile

Use `strict`. This sprint includes a human trainer identity, Production authentication, protected mailbox participation, a retained synthetic pilot fixture, Vercel Production deployment and aliases, Supabase/Resend compatibility, session and permission proof, rollback, and live-domain acceptance.

The strict boundary applies to Production mutation, authentication, protected evidence, exact targeting, rollback, and retained pilot data. It does not authorize broad product, schema, provider, identity, or infrastructure changes.

## Canonical starting authority

Start only from:

`C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`

Before any action, resolve the current directory and `git rev-parse --show-toplevel`; both must equal that exact path. The expected starting authority is closed Sprint 034D SHA `7d1210ddef836867bfdb3cf4932a0dbafb701028` on `codex/034D-legacy-worktree-retirement-and-canonical-authority-finalisation`, with one registered worktree, clean status and exact remote equality. If the permanent canonical repository proves a later accepted remote-backed closeout before Pack application, reconcile it explicitly.

Do not recreate, use, inspect through, or write into any retired legacy root or `C:\tmp` worktree. Create the scoped branch `codex/036-production-trainer-access-stabilisation-and-live-acceptance` in the permanent canonical repository only.

## Product and release authority

The accepted application correction is Sprint 035K commit `76f66f5f9803e5d1f85a6dd3f71adf302b8a1810`, proven on replacement Preview deployment `dpl_9ws41xCwDk1jqSKtiKJVrwLPnVtc`. That Preview was Ready, Preview-classified and alias-free. The human trainer journey passed there, including sign-in, dashboard, assigned synthetic horse, workspace/action, denial, sign-out and repeat sign-in.

The current accepted Production deployment remains `dpl_9zVS8HSujThkFTP3hisyfBVknKWb`; compatible rollback remains `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`. Five accepted stable aliases, Production Site URL, Production callback, replacement Preview callback, DNS, public website and Production data remained unchanged through Sprint 034D.

Before mutation, Builder must prove:

- current canonical application/source bytes have no unexplained product difference from the accepted 035K candidate;
- the intended Vercel project and Production environment are exact;
- the five stable aliases and canonical public domain are identified without changing DNS;
- current Production and compatible rollback are Ready and recorded;
- the approved Supabase target is exact project `uvskssaecdhxcgytkasc`, while old project `tagnbgkroihagjmvehlx` remains prohibited;
- Production Site URL and callback remain exact, with no wildcard;
- Resend/custom SMTP, approved sender, one-token/no-link template, six-digit OTP, expiry and cooldown remain compatible through sanitized evidence;
- the retained Sprint 035K pilot identity and eight-record synthetic graph remain exact and no real horse, stable, clinical, customer or Storage data enters the journey; and
- Sprint 035Q remains alternate non-authoritative history and contributes no release content.

If product bytes, target identity, pilot ownership, rollback, callback or provider compatibility is materially ambiguous, stop before Production mutation with `production-target-or-lineage-blocked-clean`.

## Task contract

**objective:** Establish and prove repeatable live Production trainer access for the retained Sprint 035K pilot trainer from one exact rollback-ready candidate.

**owns:** Exact baseline reconciliation; narrow sign-in, OTP, callback, bootstrap, session, dashboard or horse-workspace correction only when the live journey exposes an in-scope defect; focused tests; exact-source Preview revalidation when needed; scoped Production deployment and stable-alias promotion; Production public/protected smoke; two private human Production sign-ins; exact rollback; retained-pilot verification; and proportional closeout records.

**must_not:** Recreate a legacy workspace; adopt Sprint 035Q; automate or inspect a mailbox; remove or redesign trainer authentication; add signup, passwords, social login or bypasses; change schema, migrations, RPCs, RLS, roles, permission meaning or assignment contracts; use real horse/stable/clinical/customer data; activate Participants A/B/C; implement Sprint 029N; change commerce, scoring, recommendations, uploads, voice, trends, DNS or unrelated public content; merge, open a PR, push `develop`, rewrite history, or claim broad rollout or product-wide Done.

**acceptance:** The exact accepted candidate is Ready in Production with all five stable aliases and compatible rollback. On the canonical live domain, the designated trainer privately completes code request/receipt/entry, `/portal`, assigned synthetic horse/workspace/action, safe wrong-horse denial, sign-out and a second fresh code-based sign-in. Public and protected safety smokes pass, retained pilot ownership remains exact, and no known-broken candidate remains on stable aliases.

**verification:** Prove canonical lineage and product-byte agreement; exact Production/rollback/project/alias/callback/provider/pilot baselines; focused auth/OTP/redirect/bootstrap/session/dashboard/permission tests; canonical validation, TypeScript, lint and Production build; exact-source Preview proof when source/configuration changes; Ready Production source and alias mapping; public/protected/API/unsafe-method smoke; two private human Production sign-ins; dashboard/workspace/action and denial behavior; secret/private-data/diff/staged scans; pilot and provider reconciliation; clean canonical worktree; and exact local/remote branch equality.

## Stable Production access definition

Stable access requires all of the following on the canonical live domain:

1. The trainer opens the truthful Production sign-in page and confirms it describes approved-account access and the trainer dashboard accurately.
2. The trainer privately enters the retained approved mailbox address, requests one code, confirms a current six-digit code arrived, and enters it privately.
3. A valid Production session lands on `/portal` without redirect loops, bootstrap collisions or a misleading unavailable/normal state.
4. The dashboard shows only the retained assigned synthetic stable and horse with the correct existing workflow state, basis/time and permitted next action.
5. The trainer opens the synthetic horse workspace, completes or reaches the existing permitted capture/review action, and returns safely.
6. The inaccessible-horse case denies access without leaking horse, stable, state, count or existence information.
7. The trainer signs out and the protected page becomes inaccessible.
8. After the applicable cooldown, the trainer uses a fresh browser context or cleared application session, requests/receives/enters a fresh current code, reaches `/portal` again and sees the same permitted assignment.
9. No email address, OTP, mailbox content, session material, private identifier or real record enters chat, commands, URLs, logs, screenshots, Git or durable evidence.

The second sign-in must exercise authentication again. Reusing an existing session, browser back navigation, or merely reloading the dashboard is not repeat access.

## Exact release and rollback boundary

Prefer zero product-source change: the accepted 035K application behavior is already present in canonical ancestry. If baseline and current product bytes agree, create only the scoped Sprint 036 planning/evidence commit, validate the exact release candidate, and deploy from the exact scoped remote-backed SHA.

If executable Preview or Production proof exposes a narrow inherited defect in sign-in, OTP, callback, bootstrap, session, dashboard composition or permission-state presentation, correct it within the approved files, re-run all focused/canonical gates, create a fresh exact-source alias-free Preview, repeat the complete human Preview journey, and only then consider Production promotion. A schema, RLS, role, permission, provider replacement or broader product contract change is outside scope.

Immediately before Production promotion, reread Production, rollback, exact candidate source, project/environment and all five stable aliases. Deploy the candidate as Ready before remapping aliases. Change no DNS. After mapping, reread every alias and run public/protected smoke before human authentication.

If any material Production smoke or human access step fails, diagnose once using sanitized evidence. Make at most one focused in-scope correction/redeployment attempt when safe. Otherwise restore all five aliases to the exact recorded compatible rollback, prove the rollback Ready and live, reconcile protected/pilot state, and close `production-promotion-rolled-back-clean`. Never leave a known-broken or partially mapped candidate live.

## Authentication, privacy and pilot boundary

Human mailbox use is mandatory acceptance. Gmail API, OAuth clients, IMAP/POP, mailbox scraping, forwarding rules, copied messages and automated OTP retrieval remain prohibited. The Builder never receives the mailbox address or code in chat; the tester enters both privately.

Do not remove, replace or redesign trainer authentication. Preserve approved-account-only `shouldCreateUser:false`, six-digit OTP, generic anti-enumeration, transient email/code handling, resend cooldown, safe invalid/expired/reused behavior, normalized `/portal` redirect, session enforcement and membership/permission checks.

Use only the retained Sprint 035K pilot identity and exact synthetic graph. Do not enumerate unrelated identities. Before and after Production acceptance, verify ownership and the exact field-minimal ceiling through sanitized results. Do not create additional trainers, horses, stables, memberships, assignments, Auth identities or Storage objects unless exact retained-pilot recovery is required and remains within the existing contract.

Retain the accepted pilot identity/fixture unless the product owner separately gives an exact cleanup direction. Sprint 036 does not infer permission to delete it.

## Applicable authority

Read and preserve:

- `AGENTS.md` and `docs/WORKFLOW_PROFILE.md`;
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md` for truthful trainer-facing copy, portal status/accessibility and public/authenticated separation;
- `docs/AUTH_RLS_PORTAL_ACCESS.md` for existing authentication, bootstrap, membership and permission boundaries;
- `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md` and `docs/OPERATIONS_HANDOFF.md` for private human procedure and current operations;
- Sprint 035K requirements, acceptance and review for accepted Preview proof and retained pilot authority;
- Sprint 034D final state for sole-canonical-workspace and alternate-lineage boundaries; and
- current Production/rollback/provider evidence reread at execution time.

This sprint crosses the Production deployment and authentication gates. It does not cross schema, RLS, role, permission, DNS, public enquiry, commerce or broad rollout gates.

## Approved files and actions

Builder may create the four Sprint 036 files, one proportional Sprint 036 review, and narrowly update current state/status/roadmap/lifecycle/schedule/evidence/briefing and directly affected operations documentation.

Product/source edits are permitted only if live executable evidence proves a narrow defect, and only in files directly governing the accepted journey:

- `app/sign-in/page.tsx`;
- `components/auth/sign-in-form.tsx`;
- `app/auth/actions.ts` and `app/auth/callback/route.ts`;
- `lib/auth/otp-entry-flow.ts`, `lib/auth/otp-request.ts`, `lib/auth/otp-verification.ts`, `lib/auth/redirect-origin.ts`, `lib/auth/bootstrap-concurrency.ts`, `lib/auth/bootstrap.ts`, `lib/auth/session.ts` and `lib/auth/app-context.ts`;
- `app/(portal)/portal/page.tsx`, `app/(portal)/portal/horses/[horseId]/page.tsx`, `lib/domain/horses.ts` and `lib/domain/stable-workspace.ts`;
- narrow directly used auth/portal components and focused tests;
- the existing bounded Sprint 035K pilot verification helper or a narrow Sprint 036 wrapper with protected input and sanitized output; and
- `package.json` only for a focused maintained test registration.

Approved external actions are limited to sanitized read-only baseline/provider/deployment checks; exact-source alias-free Preview deployment and callback handling only if required by a changed candidate; bounded human OTP requests/verifications; exact Production deployment and stable-alias remap; exact rollback; and intentional commit/push of only the scoped Sprint 036 branch.

Any other file or action must be demonstrably necessary to the same outcome, recorded before mutation and remain within the existing contracts. Stop for material expansion.

## Explicitly out of scope

- Treating Preview acceptance as Production acceptance.
- Proceeding to Sprint 029N or unrelated product work before this sprint closes truthfully.
- Recreating or using retired legacy paths, temporary worktrees or alternate lineage.
- Merging, cherry-picking, rebasing, replaying or adopting Sprint 035Q.
- Trainer authentication removal, redesign, bypass, public signup, password login, social login or broad invitations.
- Mailbox automation, Gmail/OAuth, IMAP/POP, message inspection or protected-value retention.
- Schema, migration, RPC, RLS, role, permission, membership-code or assignment-contract changes.
- Real horse, stable, trainer-business, owner, customer, clinical, upload or Storage data.
- Participants A/B/C, broad trainer rollout or self-service onboarding.
- Public enquiry submission/storage/email, commerce, billing, Stripe, pricing, clinical scoring, recommendations, evidence uploads, voice, transcription, trends or broad reporting.
- DNS changes, unrelated provider settings, provider replacement, public-content redesign, merge/PR, `develop` push, force-push or history rewrite.
- Product-wide Done or readiness claims beyond the exact retained pilot journey.

## Evidence-proportional execution and manual participation

Stop only for material wrong/ambiguous canonical lineage, product bytes, target/project/environment, pilot ownership, secret/protected-data exposure, authentication/privacy/integrity failure, schema/contract expansion, partial Production mutation, failed rollback, unexpected real data, destructive uncertainty, Production impact or cleanup that cannot be proven safe.

Use equivalent or stronger safe proof when an optional supporting tool is unavailable. Keep deterministic validator, reporter, encoding, formatting, focused test, protected-input wrapper and non-product harness corrections inside Sprint 036. Do not create a follow-up solely because browser automation, a renderer, clipboard control, optional CLI, schema dump or redundant verifier is unavailable.

Human trainer mailbox/sign-in participation is required product evidence, not a fallback. Other manual intervention is last resort. Record what is blocked, evidence checked, exact secret-free human step and what Builder will verify afterward. Never ask the tester to paste the email, OTP, mailbox content, credential, token, session or private identifier into chat.

============================================================
FILE: planning/sprints/036-production-trainer-access-stabilisation-and-live-acceptance/blueprint.md
============================================================

# Sprint 036 Blueprint

## Delivery sequence

1. Verify the permanent canonical directory and Git top-level, exact closed Sprint 034D SHA, one registered worktree, clean status and remote equality.
2. Apply the Pack, verify exactly four generated Sprint 036 files, read them as execution authority, and create the scoped Sprint 036 branch in canonical only.
3. Present the exact file plan, current/rollback/candidate deployments, five aliases, provider/pilot boundaries, external actions, rollback transaction and acceptance checks before source or Production mutation.
4. Reconcile accepted 035K application bytes against current canonical. Prove the 035K correction is in ancestry and no later planning/operations sprint changed product behavior.
5. Reread exact Vercel Production/rollback/project/environment/aliases, Supabase project/Site URL/callbacks, Resend/template/OTP compatibility and retained pilot ownership using sanitized evidence.
6. Prefer a zero-source-change candidate. Run focused auth/OTP/bootstrap/session/dashboard/permission tests, canonical validation, TypeScript, lint, Production build, exact safety scans and candidate/source identity proof.
7. If source or relevant runtime configuration must change, diagnose once, correct only the narrow in-scope defect, deploy a fresh exact-source alias-free Preview, and repeat complete Preview human acceptance before Production.
8. Commit intentionally and push only the scoped Sprint 036 branch. Prove exact local/direct-remote/live SHA equality before Production deployment.
9. Reread Production and rollback immediately before mutation. Deploy the exact accepted candidate as Ready without changing aliases or DNS; verify its source and health.
10. Remap the five accepted stable aliases to the Ready candidate as one bounded release transaction. Reread each alias and prove public homepage, pricing, disabled enquiry, health, sign-in, anonymous protected redirect and unsafe-method safety.
11. Conduct the first private Production trainer journey on the canonical domain: fresh code, session, dashboard, assigned synthetic horse, workspace/action, safe denial and sign-out.
12. After cooldown, use a fresh browser/application session and conduct a second code-based sign-in to `/portal`, rechecking the same membership/assignment behavior.
13. On material failure, diagnose once. Apply at most one safe in-scope correction through a new exact candidate or roll back all aliases immediately. Prove the resulting live state; never leave partial mappings.
14. Reconcile Production/rollback/aliases/callbacks/provider/template, pilot identity/fixture, public boundary, source diff, protected evidence, canonical status and remote equality.
15. Close only with an exact permitted outcome. Stable access is complete only when both human Production sign-ins and the full journey pass.

## Zero-source-change release preference

The current canonical lineage contains the accepted 035K correction and Sprints 034B–034D report planning/operations-only changes. Builder should prove this by exact path/tree comparison rather than assume it from prose. If product bytes agree, do not edit application source merely to create activity. Generate the release from the scoped, remote-backed Sprint 036 candidate and record the unchanged product boundary.

If comparison exposes an unexplained product difference, do not promote either version until lineage is reconciled. Do not select by timestamp, branch name, deployment recency or remembered behavior.

## Production release transaction

Treat Production promotion as one recoverable transaction:

1. record exact target project/environment, old Production, candidate, rollback and five aliases;
2. prove old Production and rollback Ready;
3. prove candidate exact-source and Ready before alias mutation;
4. remap only the five recorded aliases, without DNS changes;
5. reread all aliases and route/public safety;
6. run the two human Production sign-ins and trainer journey;
7. retain the candidate only after full acceptance; otherwise remap all five aliases to the recorded rollback and prove recovery; and
8. record sanitized pre-state, mutations, post-state and rollback evidence.

If alias mapping becomes partial or post-state is unexpected, stop further unrelated actions and restore the exact rollback mappings. If rollback cannot be proven, close `production-promotion-partial-mutation-blocked` and provide the complete intervention record.

## Human acceptance protocol

The tester controls their mailbox and enters all protected values privately. Builder may guide visible application steps but must not inspect the mailbox, receive the address/code, retain session material or render unrelated/real data.

For each of two sign-ins, record only sanitized facts:

- canonical Production origin reached;
- request accepted without identity enumeration;
- one current code arrival confirmed by the tester;
- verification/session passed;
- expected `/portal` destination passed;
- exact synthetic assignment/workspace/action passed;
- wrong-horse denial passed during the first journey;
- sign-out passed; and
- no protected value entered retained evidence.

The second sign-in must start after explicit sign-out, applicable cooldown and removal of the first application session. It must request and verify a fresh current code. Two page loads under one session do not count.

## Defect handling

The first material failure receives one sanitized diagnosis. Builder may correct an in-scope application, fixture, validator or configuration defect and revalidate/redeploy once. Do not repeat OTP sends blindly, weaken security, bypass membership, create additional identities/fixtures or inspect provider/mailbox content broadly.

If the defect requires schema, RLS, role, permission, provider replacement, mailbox automation or a different product outcome, roll back when Production was changed and close `production-access-scope-expansion-required-clean`.

## Permitted outcomes

- `production-trainer-access-stable-live-accepted-clean`
- `production-promotion-rolled-back-clean`
- `production-target-or-lineage-blocked-clean`
- `production-trainer-authentication-failed-rollback-clean`
- `production-access-scope-expansion-required-clean`
- `production-promotion-partial-mutation-blocked`

Only `production-trainer-access-stable-live-accepted-clean` establishes stable access and allows the roadmap to move beyond this gate. A rollback is safe but does not satisfy the business outcome.

============================================================
FILE: planning/sprints/036-production-trainer-access-stabilisation-and-live-acceptance/acceptance.md
============================================================

# Sprint 036 Acceptance

## Canonical and release baseline

- [ ] Work starts only in the permanent canonical repository; current directory and Git top-level exact-match checks pass.
- [ ] Exact Sprint 034D closeout lineage, one canonical registration, clean status and local/direct-remote/live equality are recorded before branching.
- [ ] The accepted 035K correction is in canonical ancestry and current application/source bytes have no unexplained difference from the accepted Preview candidate.
- [ ] Sprint 035Q remains alternate non-authoritative history and contributes no release content.
- [ ] Exact intended Vercel project/environment, current Production, compatible rollback and five stable aliases are recorded from fresh readback.
- [ ] Exact approved Supabase project, Production Site URL/callback, no wildcard, Resend/template/six-digit OTP/expiry/cooldown compatibility and retained pilot ownership are proven through sanitized evidence.
- [ ] No legacy workspace, temporary worktree, older candidate, deployment folder or alternate branch is used as implementation authority.

## Candidate safety

- [ ] Zero product-source change is used when current canonical application bytes already equal the accepted 035K behavior.
- [ ] Any product/source edit is limited to an executable in-scope defect and the exact approved file set.
- [ ] Focused auth/OTP/redirect/bootstrap/session/dashboard/permission tests pass.
- [ ] Canonical JSON/domain/roles/Supabase-self/static validation, TypeScript, lint and Production build pass using equivalent or stronger safe evidence where appropriate.
- [ ] Exact diff/staged scans pass for secrets, protected data, generated artifacts, unsafe paths and unrelated product changes.
- [ ] If source or relevant runtime configuration changes, a fresh exact-source alias-free Preview passes complete human trainer acceptance before Production.
- [ ] The exact scoped Sprint 036 candidate is intentionally committed, pushed and locally/remotely equal before deployment.

## Production promotion and route safety

- [ ] Current Production and compatible rollback are Ready immediately before mutation.
- [ ] The exact Sprint 036 candidate deploys Ready to the intended Production project before alias mapping.
- [ ] All five accepted stable aliases map to the exact candidate; DNS remains unchanged and no mapping is partial.
- [ ] Canonical homepage, pricing, visibly disabled enquiry, health and truthful sign-in pass.
- [ ] Anonymous `/portal` and horse routes return safely to sign-in without loops or leakage.
- [ ] Unsafe methods and protected/API boundaries retain expected denial behavior.
- [ ] Compatible rollback remains Ready throughout acceptance.

## First human Production journey

- [ ] The designated retained pilot trainer privately opens the canonical live sign-in page.
- [ ] One fresh code is requested after cooldown, one current six-digit code arrival is privately confirmed, and the code is entered without exposure.
- [ ] Verification establishes a Production session and lands on `/portal` without redirect loop or bootstrap collision.
- [ ] Dashboard shows only the retained assigned synthetic stable/horse with accurate existing workflow state, basis/time and permitted next action.
- [ ] Trainer opens the horse workspace, reaches/completes the existing permitted action and returns safely.
- [ ] Wrong-horse access is denied without name, stable, state, count or existence leakage.
- [ ] Sign-out invalidates application access and protected routes become inaccessible.

## Second fresh Production sign-in

- [ ] After sign-out and the applicable cooldown, a fresh browser/application session contains no first-session authentication state.
- [ ] A fresh current code is requested, privately received and entered; an old/reused code is not used.
- [ ] The second verification creates a valid Production session and reaches `/portal` again.
- [ ] The same retained assignment and permitted access are present without broadened visibility.
- [ ] The tester confirms the Production trainer journey is usable without providing protected details.
- [ ] Email, OTP, mailbox content, identifiers, credentials, tokens and session material remain absent from chat, commands, URLs, logs, screenshots, Git and durable evidence.

## Pilot, authentication and non-regression

- [ ] Retained Sprint 035K pilot identity and eight-record synthetic graph remain exact, bounded and clearly non-real.
- [ ] No additional trainer, Auth identity, stable, horse, membership, assignment, clinical record or Storage object is created outside exact in-scope recovery.
- [ ] Approved-account-only OTP, anti-enumeration, cooldown, transient inputs, safe errors, session enforcement and membership/permission checks remain intact.
- [ ] Trainer authentication is not removed, bypassed, weakened or redesigned.
- [ ] No schema, migration, RPC, RLS, role, permission meaning, assignment contract, DNS, public enquiry, commerce, scoring, upload, voice, trend or unrelated public change occurs.
- [ ] Participants A/B/C, real data, broad onboarding and public self-registration remain untouched.

## Failure, rollback and closeout

- [ ] A material failure receives one focused sanitized diagnosis and no blind resend/retry.
- [ ] If full Production acceptance does not pass, all five aliases return to the exact Ready rollback and public/protected safety is re-proven.
- [ ] No known-broken candidate or partial alias mapping remains live.
- [ ] Final Production/rollback/aliases/callbacks/provider/template/pilot state is reconciled through sanitized evidence.
- [ ] Review, state, status, roadmap, lifecycle, schedule, evidence index, operations handoff and Architect briefing agree on one permitted outcome.
- [ ] Canonical worktree is clean and the exact closeout commit equals its scoped remote branch.
- [ ] Sprint 029N remains unstarted unless this sprint closes `production-trainer-access-stable-live-accepted-clean` or the owner later makes an explicit contrary roadmap decision.
- [ ] No merge, PR, `develop` push, force-push, DNS change, broad rollout or product-wide Done declaration occurs.

============================================================
FILE: planning/sprints/036-production-trainer-access-stabilisation-and-live-acceptance/handoff-prompt.md
============================================================

You are Builder for Sprint 036 — Production Trainer Access Stabilisation And Live Acceptance.

Your one objective is to establish stable trainer access on the live Production site for the retained Sprint 035K pilot trainer. Preview access is already proven but is not the finish line. Completion requires two fresh private code-based Production sign-ins plus the trainer dashboard, assigned synthetic horse/workspace/action, identity-safe denial, sign-out, public/protected safety and exact rollback readiness.

Start only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`. Resolve current directory and `git rev-parse --show-toplevel`; both must equal that exact path. Read `templates/method/120x-agent-identity.md`, `AGENTS.md`, all four generated Sprint 036 files, current state/status/roadmap/briefing, Sprint 035K requirements/acceptance/review, Sprint 034D closeout, `docs/AUTH_RLS_PORTAL_ACCESS.md`, `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md`, `docs/OPERATIONS_HANDOFF.md`, and `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`.

Dry-run and apply `planning/architect-packs/architect-pack-036-production-trainer-access-stabilisation-and-live-acceptance.md`. Verify it generates exactly four files under `planning/sprints/036-production-trainer-access-stabilisation-and-live-acceptance/`. Execute only from those generated files. Create `codex/036-production-trainer-access-stabilisation-and-live-acceptance` in the permanent canonical repository. Never recreate or use a retired legacy path or temporary worktree.

Expected baseline is exact closed Sprint 034D SHA `7d1210ddef836867bfdb3cf4932a0dbafb701028`, one canonical registration and clean remote equality. Accepted trainer application behavior is Sprint 035K correction `76f66f5f9803e5d1f85a6dd3f71adf302b8a1810`, proven on Preview `dpl_9ws41xCwDk1jqSKtiKJVrwLPnVtc`. Current Production is recorded as `dpl_9zVS8HSujThkFTP3hisyfBVknKWb`; compatible rollback is `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`. Treat every identifier as a baseline to reread, not a substitute for current evidence.

Before source or external mutation, present the exact file-by-file plan, product-byte comparison, intended candidate, Production/rollback/project/environment, five aliases, provider/pilot boundary, external actions, rollback transaction and acceptance checks. Wait for explicit approval of that concrete Builder plan.

Prove the 035K correction is in canonical ancestry and current canonical application bytes contain no unexplained change from accepted 035K behavior. Sprints 034B–034D were planning/operations work, but verify this through exact source comparison. Do not choose a candidate by recency, branch name or memory. Keep Sprint 035Q remote-backed and non-authoritative; adopt nothing from it.

Reread the exact intended Vercel project and Production environment; current Production and compatible rollback; all five accepted stable aliases; approved Supabase project `uvskssaecdhxcgytkasc`; prohibited old project `tagnbgkroihagjmvehlx`; Production Site URL/callback and no wildcard; Resend/custom SMTP, approved sender, one-token/no-link template, six-digit OTP, expiry/cooldown; and the retained Sprint 035K pilot identity/eight-record synthetic graph. Use sanitized evidence only. Stop before mutation if target, source, rollback, pilot ownership or provider compatibility is materially ambiguous.

Prefer no product-source edit. If canonical application bytes match the accepted Preview behavior, validate and release the exact scoped Sprint 036 candidate without touching source. If executable proof exposes a narrow inherited defect, correct only the approved sign-in/OTP/callback/bootstrap/session/dashboard/workspace files, run all focused/canonical gates, deploy a fresh exact-source alias-free Preview and repeat the complete human Preview journey before Production. Do not change schema, migrations, RPCs, RLS, roles, permissions, assignments, provider class or broader product behavior.

The tester controls their private mailbox. Do not inspect, automate or scrape it, and do not request the email address or code in chat. The tester privately enters the retained approved mailbox address and each current six-digit code. Gmail API/OAuth, IMAP/POP, forwarding rules, mailbox browser inspection, copied messages, passwords, social login, signup and auth bypass remain prohibited.

Run focused auth/OTP/redirect/bootstrap/session/dashboard/permission tests; canonical JSON/domain/roles/Supabase-self/static validation; TypeScript; zero-warning lint; Production build; exact diff/staged secret, protected-data, generated-artifact and scope scans; and exact candidate/source proof. Use equivalent or stronger evidence for an unavailable supporting tool, but do not substitute metadata for the human Production sign-ins, session, permission, denial, alias or rollback behavior.

Intentionally commit and push only the scoped Sprint 036 branch, then prove exact local/direct-remote/live SHA equality. Immediately before Production mutation, reread the old Production, Ready rollback, Ready exact candidate, intended project/environment and all five aliases. Deploy the candidate Ready before remapping aliases. Change no DNS. Map only the five accepted aliases, reread each, and run canonical homepage, pricing, visibly disabled enquiry, health, sign-in, anonymous protected redirect and unsafe-method/API safety checks.

Guide the retained trainer through the first canonical Production journey: private code request/receipt/entry, valid `/portal` session, assigned synthetic stable/horse, exact workspace/action, wrong-horse denial, return and sign-out. Record only sanitized booleans/task outcomes. Confirm protected routes are inaccessible after sign-out.

After the applicable cooldown, use a fresh browser/application session without the first authentication state. The trainer requests and privately enters a fresh current code, reaches `/portal` again and confirms the same bounded assignment and permitted access. A reload, browser-back action or reused session/code does not count as stable repeat access.

On a material failure, diagnose once using sanitized evidence. Make at most one safe in-scope correction/redeployment attempt. Otherwise remap all five aliases to the exact recorded rollback and prove the rollback Ready and live. Never leave a known-broken candidate or partial alias mapping on Production. If rollback cannot be proven, stop with `production-promotion-partial-mutation-blocked` and the complete intervention record.

Preserve the retained pilot identity and synthetic graph unless the product owner separately directs exact cleanup. Do not enumerate or mutate unrelated identities. Do not create real or additional trainer/horse/stable/clinical/customer data, activate Participants A/B/C, alter schema/RLS/roles/permissions, implement the public enquiry, change commerce/scoring/uploads/voice/trends/DNS, merge, open a PR, push `develop`, force-push or claim product-wide Done.

Close `production-trainer-access-stable-live-accepted-clean` only when the exact candidate is live and both fresh Production sign-ins plus dashboard/workspace/action/denial/sign-out and route safety pass. A successful rollback is safe but does not establish stable access. Sprint 029N remains behind this boundary unless the owner later makes an explicit contrary roadmap decision.

At closeout, reconcile exact Production/rollback/aliases/source/callbacks/provider/template/pilot state, public/protected behavior, mutations, rollback status, tests, protected-evidence boundary, canonical worktree and remote equality. Refresh the proportional Sprint 036 review and current state, status, roadmap, lifecycle, schedule, evidence, operations handoff and Architect briefing. Commit intentionally and push only the scoped Sprint 036 branch. Stop with one exact permitted outcome.
