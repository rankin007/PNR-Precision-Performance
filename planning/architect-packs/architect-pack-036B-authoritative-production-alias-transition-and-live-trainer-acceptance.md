============================================================
FILE: planning/sprints/036B-authoritative-production-alias-transition-and-live-trainer-acceptance/requirements.md
============================================================

# Sprint 036B — Authoritative Production Alias Transition And Live Trainer Acceptance

## Outcome

Complete the unfinished Sprint 036 business outcome through a routing transition that is independently reconstructable for every accepted Production alias. Stage one fresh zero-product-change Production candidate with automatic domain promotion disabled, prove all five aliases remain on the known-safe rollback, move exactly those five aliases through a timestamped bounded transaction, prove public and protected route safety, and complete the two private human Production trainer sign-ins and governed synthetic trainer journey.

Target outcome: `production-trainer-access-stable-live-accepted-clean`.

Sprint 036B is a corrective continuation of Sprint 036 under the project suffix rule. Sprint 036 safely closed `production-promotion-rolled-back-clean`; it did not establish stable live trainer access. Sprint 029N remains behind this gate.

## Workflow profile

Use `strict`. This sprint touches Vercel Production deployment and aliases, a human trainer identity, private mailbox participation, a retained synthetic pilot fixture, live sessions and rollback.

Strict controls attach to exact targeting, alias mutation, protected evidence, human authentication, Production safety and recovery. They do not authorize product, provider-configuration, schema, identity, fixture or data changes.

## Canonical starting authority

Start only from:

`C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`

Before any action, resolve the current directory and `git rev-parse --show-toplevel`; both must equal that exact path. The expected closed Sprint 036 authority is SHA `6edc4dab04248c36ca57f9722849fcf16b7acb2f` on `codex/036-production-trainer-access-stabilisation-and-live-acceptance`, with exactly one canonical worktree registration. Prove current status and direct remote authority before branching; do not rely on a missing or stale remote-tracking ref.

The only expected Architect handoff changes are this Pack and `planning/STATUS.json`. Any additional uncommitted path, changed starting SHA, unresolved remote divergence or extra worktree is a material baseline mismatch until reconciled.

Create only `codex/036B-authoritative-production-alias-transition-and-live-trainer-acceptance` in the permanent canonical repository. Do not recreate, inspect through or use retired legacy roots, `C:\tmp` worktrees, deployment folders or Sprint 035Q.

## Governing release and pilot state

Fresh execution-time readback governs, with these recorded baselines to reconcile:

- intended Vercel project `rankin007s-projects/pnr-precision-performance`, project ID `prj_6To7czLpCEGL6fInkQwE4egePPpq`;
- known-safe Ready rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`, raw deployment URL `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app`, exact source `3be6b6c3622150a3c2009ed8564795b14e3e6c2b`;
- unaccepted Sprint 036 staged candidate `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf`, which must not be reused or promoted;
- accepted Sprint 035K application correction `76f66f5f9803e5d1f85a6dd3f71adf302b8a1810` in current ancestry and zero unexplained application/source difference since its accepted Preview proof;
- approved Supabase project `uvskssaecdhxcgytkasc`; old project `tagnbgkroihagjmvehlx` remains prohibited;
- Production Site URL `https://precisionperformance.com.au`, exact Production callback only and no wildcard;
- custom SMTP, approved sender classification, one-token/no-link template, six-digit OTP, 3600-second expiry and 60-second cooldown unchanged through sanitized read-only evidence; and
- the retained adopted Sprint 035K trainer identity and exact bounded eight-record synthetic graph remain governed, with no real horse, stable, clinical, customer or Storage data.

The five and only accepted stable aliases are:

1. `precisionperformance.com.au`
2. `www.precisionperformance.com.au`
3. `pnr-precision-performance.vercel.app`
4. `pnr-precision-performance-rankin007s-projects.vercel.app`
5. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`

Before external mutation, independently resolve every alias to the Ready rollback and prove the Vercel project/domain/alias inventory contains no additional Production alias that the planned operation would move. If the exact mutation set cannot be bounded to these five, close `production-alias-transition-preflight-blocked-clean` without deployment or alias mutation.

## Task contract

**objective:** Establish stable, repeatable live Production trainer access through one fresh zero-product-change candidate and an independently provable five-alias transition.

**owns:** Exact canonical and remote reconciliation; read-only Vercel project/deployment/domain/alias/status evidence; a timestamped five-alias routing ledger; unchanged-source validation; one fresh staged Production deployment using `--prod --skip-domain`; exactly five intentional alias assignments; public/protected smoke; two private human Production sign-ins; retained-pilot verification; exact all-five rollback; and proportional planning, operations and closeout records.

**must_not:** Reuse or promote the Sprint 036 candidate; trust a deployment-level alias list as current routing authority; move an unlisted alias; change product/source/test/package files; change Supabase/Auth, callback, SMTP, template, Vercel project/environment/domain settings or DNS; change schema, migrations, RPCs, RLS, roles, permissions, identity, fixture or data; automate or inspect a mailbox; use real data; activate Participants A/B/C; implement Sprint 029N; change commerce, scoring, recommendations, uploads, voice or trends; merge, open a PR, push `develop`, force-push, rewrite history or claim broad rollout/product-wide Done.

**acceptance:** One fresh exact remote-backed candidate is Ready and all five aliases are proven to remain on rollback after staging. Exactly the five accepted aliases then resolve to that candidate through a fully timestamped transition; public/protected safety passes; the retained trainer completes two fresh private code-based Production sign-ins plus dashboard, assigned synthetic horse/workspace/action, identity-safe denial and sign-out; retained pilot/provider state is unchanged; and rollback remains exact and Ready.

**verification:** Run the Pack dry-run and four-target check; canonical path/worktree/status/lineage/direct-remote proof; exact application-byte comparison; installed Vercel CLI/version/help reconciliation; sanitized project/domain/alias inventory; five independent alias inspections at every transition checkpoint; rollback and candidate Ready/source proof; focused retained auth/OTP/redirect/bootstrap/session/dashboard/permission suites; canonical validation, TypeScript, zero-warning lint and Production build; diff/secret/private-data/generated-artifact scans; cache-busted public/protected/API/unsafe-method smoke; two fresh private human Production sign-ins; retained-pilot Verify; final provider/routing/worktree/direct-remote reconciliation; and one exact permitted outcome.

## Authoritative alias evidence rule

Current routing authority is the independently resolved deployment identity for each named alias. Record a sanitized ledger row containing only UTC timestamp, alias, resolved deployment ID, project ID or exact project classification, target, Ready state and checkpoint label.

Required full five-row snapshots are:

1. `baseline` — all five resolve to rollback immediately before staging;
2. `post-stage` — all five still resolve to rollback immediately after the fresh `--skip-domain` candidate is Ready;
3. `promotion-step-1` through `promotion-step-5` — after each intentional alias assignment, reread all five so moved and unmoved aliases are reconstructable;
4. `candidate-live` — all five resolve to the candidate before any human authentication;
5. `final-accepted` — all five still resolve to the candidate after both human sign-ins; or
6. `rollback-step-1` through `rollback-step-5` and `final-rollback` — all five resolve to rollback after recovery.

Vercel deployment-level alias inventory, alias-list output, project status, audit log and public HTTP are corroborating evidence only. None may override a contradictory per-alias resolution. Audit-log access is optional; its absence is not a blocker when the complete per-alias ledger and executable route proof establish the same boundary.

Use the official current Vercel CLI documentation for `--skip-domain` and alias assignment, together with installed CLI help, as mechanism authority:

- `https://vercel.com/docs/cli/deploy`
- `https://vercel.com/docs/cli/alias`
- `https://vercel.com/docs/deployments/promoting-a-deployment`
- `https://vercel.com/docs/rest-api`

Official documentation says `--prod --skip-domain` disables automatic domain promotion. Sprint 036 showed that a deployment's alias list may remain stale, not that an independently resolved alias moved. Sprint 036B therefore proves the flag's actual result through the required five-row `post-stage` snapshot before promotion.

## Zero-product-change candidate boundary

The accepted application behavior is already present. Sprint 036B changes no product, test, package, runtime configuration or provider configuration. Builder may create only the generated sprint files and proportional planning/operations evidence.

Prove current application/source bytes have no unexplained difference from the accepted Sprint 035K behavior and no application/source difference from the validated Sprint 036 candidate. Run the maintained validation on the unchanged tree. Commit and push only the scoped planning/evidence checkpoint, prove exact direct-remote equality, and deploy one fresh Production-target candidate with `--skip-domain` from that exact SHA.

If application bytes differ unexpectedly, validation exposes a product defect, the live journey exposes a source/configuration defect, or a new repository script/harness is materially required, do not edit it in Sprint 036B. Restore all five aliases when needed and close `production-access-source-or-contract-change-required-rollback-clean`. A later corrective Sprint 036C may be planned only for the material source or contract change.

## Exact alias transition transaction

Do not use `vercel promote` or `vercel rollback` by inference. Those platform operations can target all Production domains. They are permitted only if a read-only pre-confirmation mechanism proves their exact affected set equals the five accepted aliases and no other alias. Otherwise use the already proven explicit `vercel alias set` mechanism against the candidate's immutable automatic URL.

Promotion order is fixed so generated aliases move first and the canonical apex moves last:

1. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`
2. `pnr-precision-performance-rankin007s-projects.vercel.app`
3. `pnr-precision-performance.vercel.app`
4. `www.precisionperformance.com.au`
5. `precisionperformance.com.au`

After each assignment, reread all five. Expected state is exactly the completed prefix on the candidate and the remaining suffix on rollback. Any command error, unexpected alias, third deployment, non-Ready state, unplanned automatic movement or irreconcilable response triggers immediate all-five rollback before unrelated action or human authentication.

Rollback order prioritizes the canonical public pair, then the stable generated aliases:

1. `precisionperformance.com.au`
2. `www.precisionperformance.com.au`
3. `pnr-precision-performance.vercel.app`
4. `pnr-precision-performance-rankin007s-projects.vercel.app`
5. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`

Assign every alias to the exact rollback raw URL even if an earlier read already reports rollback, then reread all five after every step. If final five/five rollback cannot be proven, close `production-promotion-partial-mutation-blocked` with the complete manual-intervention record.

## Human Production acceptance

Human mailbox use is mandatory product evidence. The tester controls the retained approved mailbox and privately enters both email and six-digit codes. Builder must not inspect, automate or scrape the mailbox; receive protected values; or retain email, OTP, message, session or private identifiers in chat, commands, URLs, logs, screenshots, Git or evidence.

Only after `candidate-live` and public/protected smoke pass:

1. open the truthful canonical Production sign-in;
2. privately request, receive and enter one current code;
3. reach `/portal` without loop or bootstrap collision;
4. confirm only the retained synthetic stable/horse and accurate workflow state/action;
5. open the synthetic horse workspace and reach or complete the existing permitted action;
6. prove inaccessible-horse denial without identity, existence, state or count leakage;
7. sign out and prove protected access is gone; and
8. after cooldown, use a fresh browser/application session, request and enter a fresh current code, reach `/portal` again and confirm the same bounded assignment.

One sanitized diagnosis is permitted for a human-input, expiry, cooldown or transient failure. A retry is allowed only when no source/provider/configuration change is required and the attempt is not blind. A material authentication, session, permission, privacy or integrity failure triggers all-five rollback.

## Applicable authority and gates

Read and preserve:

- `AGENTS.md`, `docs/WORKFLOW_PROFILE.md` and `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`;
- Sprint 036 requirements, acceptance and review, especially the alias-reporting failure and final rollback;
- Sprint 035K requirements, acceptance and review for the retained pilot and accepted Preview journey;
- `docs/AUTH_RLS_PORTAL_ACCESS.md`;
- `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md`;
- `docs/OPERATIONS_HANDOFF.md`;
- current state/status/roadmap/lifecycle/schedule/evidence/briefing; and
- fresh official Vercel documentation and installed CLI behavior at execution time.

This sprint crosses Production deployment, five-alias routing and human Production authentication gates. It does not cross product/source, Vercel settings, Supabase/Auth configuration, template, DNS, schema, RLS, role, permission, identity, fixture, data, public enquiry, commerce or broad rollout gates.

## Approved files and external actions

Approved repository writes are limited to:

- the four generated Sprint 036B files;
- `planning/reviews/036B-authoritative-production-alias-transition-and-live-trainer-acceptance.md`;
- proportional current updates to `planning/STATE.md`, `planning/STATUS.json`, `planning/ROADMAP.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/SPRINT_SCHEDULE.md`, `planning/EVIDENCE_INDEX.md`, `planning/ARCHITECT_BRIEFING.md`, `planning/DECISIONS.md`, `planning/RISKS.md` and `planning/QUESTIONS.md` only where the final result changes current authority; and
- `docs/OPERATIONS_HANDOFF.md` only for the proven release/rollback procedure and final Production identity.

No application, library, component, test, package, configuration, migration or repository script file may change.

Approved external actions are limited to sanitized read-only Git/Vercel/Supabase/provider/pilot checks; one fresh exact-source staged Production deployment using `--skip-domain`; exactly five candidate alias assignments; public/protected smoke; bounded private human OTP requests/verifications; exact all-five rollback; and intentional commit/push of only the scoped Sprint 036B branch.

## Evidence-proportional execution and manual intervention

Stop only for a material canonical/remote mismatch, unbounded alias set, wrong project/environment/source, alias-routing contradiction, secret/protected-data exposure, authentication/privacy/integrity failure, unauthorized source/provider/schema/contract expansion, partial Production mutation, failed rollback, unexpected real data, destructive uncertainty or cleanup that cannot be proven safe.

Use equivalent or stronger safe proof when an optional supporting tool is unavailable. Keep deterministic command projection, timestamping, JSON parsing, reporting, formatting, encoding and validation corrections inside the current execution without changing repository source. Do not create another sprint solely because an audit log, browser driver, renderer, clipboard path, optional CLI command or redundant verifier is unavailable.

Human trainer mailbox/sign-in participation is required evidence, not fallback intervention. For any other genuine manual intervention, record what is blocked, evidence checked, exact secret-free action, step-by-step instructions and what Builder will verify afterward. Never ask the tester to paste protected values into conversation.

============================================================
FILE: planning/sprints/036B-authoritative-production-alias-transition-and-live-trainer-acceptance/blueprint.md
============================================================

# Sprint 036B Blueprint

## Delivery sequence

1. Verify the permanent canonical directory and Git top-level, one registered worktree, exact closed Sprint 036 SHA, expected Architect handoff diff and direct remote authority.
2. Create the scoped 036B branch in canonical, dry-run and apply the Pack, and verify exactly four generated files under the 036B sprint folder.
3. Read the generated sprint files as execution authority. Present the exact file plan, five-alias mutation plan, fresh candidate, rollback target, provider/pilot boundary, public/human acceptance and recovery transaction before external mutation.
4. Reconcile current application bytes with accepted Sprint 035K and validated Sprint 036 behavior. Prove zero unexplained product difference and keep the repository write set planning/operations-only.
5. Run focused auth/OTP/redirect/bootstrap/session/dashboard/permission tests, canonical validation, TypeScript, zero-warning lint, Production build and exact safety scans on the unchanged application tree.
6. Reconcile installed Vercel CLI version/help with current official deploy/alias/promote/rollback documentation. Treat CLI cache/update-check failure as a supporting limitation when local version/help and the authenticated mechanism remain usable.
7. Read the exact Vercel project, project domains/aliases, Production status, rollback and unaccepted 036 candidate. Prove the planned mutation set contains exactly the five accepted aliases and no other Production alias.
8. Build the `baseline` ledger snapshot by independently inspecting all five aliases. All must resolve to Ready rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`.
9. Reconcile approved Supabase project, Production Site URL/callback, no wildcard, SMTP/template/OTP compatibility and retained Sprint 035K pilot ownership using sanitized read-only evidence.
10. Intentionally commit/push only the scoped planning/evidence candidate and prove exact local/direct-remote/live equality.
11. Deploy one fresh candidate from that exact SHA using `--prod --skip-domain`. Prove exact project, Production target, source metadata, immutable automatic URL and Ready state. Do not reuse the Sprint 036 candidate.
12. Immediately build the `post-stage` five-row snapshot. Every alias must still resolve to rollback. A deployment-level alias list may be recorded as contradictory/stale corroboration but cannot fail this gate when all per-alias routing is exact.
13. Assign the five aliases to the fresh candidate in the fixed promotion order. After every assignment, reread all five and prove the completed prefix is on candidate and remaining suffix is on rollback.
14. Build the `candidate-live` snapshot. Require five/five aliases on the Ready candidate, unchanged DNS and no unlisted alias movement.
15. Run cache-busted canonical homepage, pricing, disclaimer/asset, visibly disabled enquiry, health, truthful sign-in, anonymous portal/horse denial, unsafe-method and protected/API safety smoke before human authentication.
16. Guide the first private Production trainer sign-in and full retained synthetic dashboard/workspace/action/denial/sign-out journey.
17. After cooldown, use a fresh browser/application session and complete a second fresh code-based sign-in to `/portal`, confirming the same bounded assignment.
18. Build `final-accepted`, repeat route safety, provider/pilot readback and exact five-alias reconciliation. Retain the candidate only when every acceptance boundary passes.
19. On any material discrepancy or failed acceptance, perform the all-five rollback in fixed order, rereading all aliases after every assignment. Build `final-rollback`, repeat public/protected safety and reconcile provider/pilot state.
20. Close with one exact permitted outcome and refresh proportional current authority. Do not proceed to Sprint 029N unless stable Production access passed or the owner later makes a separate explicit roadmap decision.

## Routing ledger state machine

| Checkpoint | Expected candidate count | Expected rollback count | Allowed next action |
|---|---:|---:|---|
| `baseline` | 0 | 5 | Stage fresh candidate |
| `post-stage` | 0 | 5 | Begin intentional promotion |
| `promotion-step-1` | 1 | 4 | Promote alias 2 |
| `promotion-step-2` | 2 | 3 | Promote alias 3 |
| `promotion-step-3` | 3 | 2 | Promote alias 4 |
| `promotion-step-4` | 4 | 1 | Promote canonical apex |
| `promotion-step-5` / `candidate-live` | 5 | 0 | Route smoke, then human acceptance |
| `final-accepted` | 5 | 0 | Close accepted |
| Any discrepancy | Any other state | Any other state | All-five rollback |
| `final-rollback` | 0 | 5 | Close truthful non-complete outcome |

No third deployment is permitted in any snapshot. Do not repair only the mismatched row and continue promotion. A discrepancy exits the promotion state machine and enters all-five rollback.

## Exact promotion and rollback commands

Use the fresh candidate's immutable automatic URL, never a stable alias, as the deployment argument. The established command shape is:

```powershell
vercel.cmd alias set <fresh-candidate-automatic-url> <exact-alias>
```

Promotion aliases, in order:

```text
pnr-precision-performance-rankin007-rankin007s-projects.vercel.app
pnr-precision-performance-rankin007s-projects.vercel.app
pnr-precision-performance.vercel.app
www.precisionperformance.com.au
precisionperformance.com.au
```

Rollback target and aliases, in order:

```powershell
vercel.cmd alias set pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app precisionperformance.com.au
vercel.cmd alias set pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app www.precisionperformance.com.au
vercel.cmd alias set pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app pnr-precision-performance.vercel.app
vercel.cmd alias set pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app pnr-precision-performance-rankin007s-projects.vercel.app
vercel.cmd alias set pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app pnr-precision-performance-rankin007-rankin007s-projects.vercel.app
```

If execution-time CLI help requires an exact authenticated scope flag, add only the freshly verified intended scope and record the resulting command shape before the first mutation. Do not place tokens or protected values in command arguments.

## Per-alias inspection protocol

For each snapshot, inspect all five alias hostnames independently through the authenticated Vercel CLI or the official alias/deployment REST read path. The output retained in evidence is allowlisted to:

- UTC timestamp;
- checkpoint;
- alias hostname;
- deployment ID;
- exact intended project ID/classification;
- Production target;
- Ready state; and
- result `candidate`, `rollback` or `unexpected`.

Do not retain raw API/CLI JSON when it contains unrelated account, author, user, token or protected metadata. A deterministic PowerShell projection may parse raw stdout in process and print only the allowlisted fields. If a preferred JSON field changes, diagnose once and correct the projection without modifying repository files.

## Failure and recovery decision tree

- Baseline is not five/five rollback, affected alias set is not exactly five, or project/source is ambiguous: no deployment; close `production-alias-transition-preflight-blocked-clean`.
- Fresh candidate is not exact-source and Ready: no alias mutation; close `production-candidate-staging-blocked-clean`.
- `post-stage` is not five/five rollback: immediately assign all five to rollback and close `production-candidate-staging-alias-drift-rollback-clean` after proof.
- Any promotion snapshot differs from the required prefix/suffix state: assign all five to rollback and close `production-promotion-rolled-back-clean` after proof.
- Route smoke or human acceptance fails without source/configuration change: one sanitized diagnosis and one non-blind cooldown-safe retry may occur; otherwise rollback all five.
- A source, provider configuration, schema, permission, identity, fixture or data change is required: rollback all five and close `production-access-source-or-contract-change-required-rollback-clean`.
- Final rollback is not five/five Ready rollback: stop `production-promotion-partial-mutation-blocked` with the complete intervention record.

## Closeout minimum

Record the exact starting and final SHA/branch, Vercel CLI version, project, rollback, fresh candidate, candidate automatic URL, all ledger snapshots, public/protected smoke, human acceptance booleans, provider/pilot invariants, exact mutation list, rollback result, tests, repository diff and direct remote equality. Retain no protected value or raw provider payload.

============================================================
FILE: planning/sprints/036B-authoritative-production-alias-transition-and-live-trainer-acceptance/acceptance.md
============================================================

# Sprint 036B Acceptance

## Canonical and handoff baseline

- [ ] Current directory and Git top-level both equal the permanent canonical repository exactly.
- [ ] Exactly one canonical worktree registration exists; no retired legacy path, temporary worktree, deployment folder or alternate lineage is used.
- [ ] Exact closed Sprint 036 SHA `6edc4dab04248c36ca57f9722849fcf16b7acb2f` and direct remote authority are proven or a later accepted authority is explicitly reconciled.
- [ ] The pre-branch working state contains only the expected Architect Pack and `planning/STATUS.json` handoff changes.
- [ ] The Pack dry-run reports exactly four new 036B sprint files, application creates exactly those files, and the post-application dry-run reports exactly those four targets as updates.
- [ ] Only the scoped `codex/036B-authoritative-production-alias-transition-and-live-trainer-acceptance` branch is used.

## Zero-product-change candidate

- [ ] Accepted Sprint 035K correction remains in ancestry and current application/source bytes have no unexplained difference from accepted 035K and validated Sprint 036 behavior.
- [ ] No application, library, component, test, package, configuration, migration or repository script file changes.
- [ ] Focused auth/OTP/redirect/bootstrap/session/dashboard/permission tests pass on the unchanged application tree.
- [ ] Canonical validation, TypeScript, zero-warning lint and Production build pass using equivalent or stronger safe evidence where needed.
- [ ] Diff, staged, secret, protected-data, unsafe-path, generated-artifact and encoding scans pass.
- [ ] The scoped planning/evidence candidate is intentionally committed/pushed and exact local/direct-remote/live equality is proven before deployment.

## Vercel mechanism and exact affected set

- [ ] Installed Vercel CLI version and current official deploy/alias/promote/rollback semantics are recorded before mutation.
- [ ] Intended project name/ID, Production environment, rollback and unaccepted Sprint 036 candidate are freshly reconciled.
- [ ] The five accepted aliases are recorded exactly and no additional Production alias would be moved by the selected mechanism.
- [ ] `vercel promote` or `vercel rollback` is not used unless its exact pre-confirmation affected set is proven to equal the five accepted aliases.
- [ ] Deployment-level alias inventory is classified as corroborating only and never overrides per-alias routing.

## Authoritative pre-state and staging

- [ ] `baseline` contains five timestamped independent alias rows; all five resolve to Ready rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A` in the intended project.
- [ ] Approved Supabase project, Production Site URL/callback, no wildcard, SMTP/template/OTP compatibility and retained pilot ownership pass through sanitized read-only evidence.
- [ ] A fresh candidate—not `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf`—deploys from the exact remote-backed 036B SHA using `--prod --skip-domain`.
- [ ] The fresh candidate is Production-targeted, exact-source, Ready and has an immutable automatic URL before alias mutation.
- [ ] `post-stage` independently proves all five aliases still resolve to rollback.
- [ ] No DNS, Vercel project/domain/environment setting, Supabase/Auth, callback, SMTP, template, identity, fixture or data mutation occurs during staging.

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

- [ ] A material failure receives one focused sanitized diagnosis and no blind retry.
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

============================================================
FILE: planning/sprints/036B-authoritative-production-alias-transition-and-live-trainer-acceptance/handoff-prompt.md
============================================================

You are Builder for Sprint 036B — Authoritative Production Alias Transition And Live Trainer Acceptance.

Your one objective is to complete the unfinished Sprint 036 live-access outcome through one fresh zero-product-change Production candidate and an independently reconstructable transition of exactly five stable aliases. Completion requires five/five authoritative alias routing, public/protected safety, two fresh private code-based Production sign-ins, the retained synthetic dashboard/workspace/action journey, identity-safe denial, sign-out and exact rollback readiness.

Start only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`. Resolve current directory and `git rev-parse --show-toplevel`; both must equal that exact path. Verify exactly one canonical worktree. Expected starting authority is closed Sprint 036 SHA `6edc4dab04248c36ca57f9722849fcf16b7acb2f`; prove direct remote authority because a remote-tracking ref may be absent or stale. The only expected Architect handoff changes are this Pack and `planning/STATUS.json`.

Read `templates/method/120x-agent-identity.md`, `AGENTS.md`, all four generated Sprint 036B files, current state/status/roadmap/briefing, Sprint 036 requirements/acceptance/review, Sprint 035K requirements/acceptance/review, `docs/AUTH_RLS_PORTAL_ACCESS.md`, `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md`, `docs/OPERATIONS_HANDOFF.md`, `docs/WORKFLOW_PROFILE.md` and `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`.

Create `codex/036B-authoritative-production-alias-transition-and-live-trainer-acceptance` only in the permanent canonical repository. Dry-run and apply `planning/architect-packs/architect-pack-036B-authoritative-production-alias-transition-and-live-trainer-acceptance.md`. Verify exactly four targets under `planning/sprints/036B-authoritative-production-alias-transition-and-live-trainer-acceptance/`, then execute only from those generated files. Never recreate or use retired legacy paths, `C:\tmp` worktrees, deployment directories or Sprint 035Q.

Before external mutation, record the concrete execution manifest: exact repository file list, zero-product-change comparison, focused validation plan, installed Vercel mechanism, project/domain/alias inventory, fresh candidate command, five-alias promotion order, every routing-ledger checkpoint, public/protected smoke, private human journey, all-five rollback commands, provider/pilot invariants and permitted outcomes.

The task contract is:

**objective:** Establish stable, repeatable live Production trainer access through one fresh zero-product-change candidate and an independently provable five-alias transition.

**owns:** Canonical/direct-remote reconciliation; read-only Vercel/Supabase/provider/pilot proof; unchanged-source validation; one fresh `--prod --skip-domain` candidate; the timestamped five-alias ledger; exactly five alias assignments; route safety; two private human sign-ins; retained-pilot proof; exact all-five rollback; proportional closeout records; scoped branch commit/push.

**must_not:** Reuse/promote `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf`; trust deployment-level alias inventory over per-alias routing; move an unlisted alias; change product/source/test/package/configuration/script files; change Vercel settings, Supabase/Auth, callbacks, SMTP/template, DNS, schema/RLS/roles/permissions, identity/fixture/data; automate/inspect a mailbox; use real data; activate Participants A/B/C; implement 029N; merge/PR/push `develop`/force-push; claim broad rollout or product-wide Done.

**acceptance:** Fresh exact remote-backed candidate Ready; `post-stage` five/five aliases still on rollback; timestamped stepwise transition ends five/five on candidate; route safety passes; retained trainer completes both fresh Production sign-ins and governed journey; pilot/provider state remains unchanged; exact rollback remains Ready.

**verification:** Run these exact or execution-time equivalent commands and record sanitized outcomes:

```powershell
$expectedRoot = 'C:\Users\rrank\OneDrive\PNR Precision Performance Canonical'
if ((Get-Location).Path -ne $expectedRoot) { throw 'WRONG_CURRENT_DIRECTORY' }
$resolvedGitRoot = (git rev-parse --show-toplevel).Replace('/', '\')
if ($resolvedGitRoot -ne $expectedRoot) { throw 'WRONG_GIT_TOP_LEVEL' }
git worktree list --porcelain
git status --short --branch
git rev-parse HEAD
git ls-remote --heads origin refs/heads/codex/036-production-trainer-access-stabilisation-and-live-acceptance
node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036B-authoritative-production-alias-transition-and-live-trainer-acceptance.md --dry-run
node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036B-authoritative-production-alias-transition-and-live-trainer-acceptance.md
node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-036B-authoritative-production-alias-transition-and-live-trainer-acceptance.md --dry-run
vercel.cmd --version
vercel.cmd deploy --help
vercel.cmd alias --help
vercel.cmd inspect --help
vercel.cmd alias list --limit 100
vercel.cmd inspect dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A --format=json | ConvertFrom-Json | Select-Object id,projectId,target,readyState,status,url | ConvertTo-Json -Compress
vercel.cmd inspect precisionperformance.com.au --format=json | ConvertFrom-Json | Select-Object id,projectId,target,readyState,status,url | ConvertTo-Json -Compress
vercel.cmd inspect www.precisionperformance.com.au --format=json | ConvertFrom-Json | Select-Object id,projectId,target,readyState,status,url | ConvertTo-Json -Compress
vercel.cmd inspect pnr-precision-performance.vercel.app --format=json | ConvertFrom-Json | Select-Object id,projectId,target,readyState,status,url | ConvertTo-Json -Compress
vercel.cmd inspect pnr-precision-performance-rankin007s-projects.vercel.app --format=json | ConvertFrom-Json | Select-Object id,projectId,target,readyState,status,url | ConvertTo-Json -Compress
vercel.cmd inspect pnr-precision-performance-rankin007-rankin007s-projects.vercel.app --format=json | ConvertFrom-Json | Select-Object id,projectId,target,readyState,status,url | ConvertTo-Json -Compress
git diff --name-status 76f66f5f9803e5d1f85a6dd3f71adf302b8a1810 HEAD -- app components lib public package.json package-lock.json next.config.ts tsconfig.json vercel.json
git diff --name-status 38ab1acc2776124ba8b54fd33eb346bf7f28f99a HEAD -- app components lib public package.json package-lock.json next.config.ts tsconfig.json vercel.json
npm run test:live-trainer-035k
npm run test:dashboard-035
node --experimental-strip-types scripts/test-email-otp-035D.mjs
node --experimental-strip-types scripts/test-passwordless-redirect-035C.mjs
node --experimental-strip-types scripts/test-bootstrap-concurrency-035F.mjs
node --experimental-strip-types scripts/test-otp-recovery-path-035F.mjs
node --experimental-strip-types scripts/test-protected-synthetic-otp-recovery-035F.mjs
npm run test:public-relaunch-032
npm run validate:json
npm run test:domain
npm run test:roles
npm run test:supabase-self
npm run validate:static
npm run typecheck
npm run lint -- --max-warnings=0
npm run build
git diff --check
git status --short
```

Pipe or project Vercel JSON in process so retained output includes only UTC timestamp, checkpoint, alias, deployment ID, intended project classification/ID, target, Ready state and candidate/rollback/unexpected result. Do not emit raw JSON if it contains unrelated identity or account metadata. If a command alias or JSON field changed, use current installed help or the official read-only REST equivalent and document the exact substitution; do not weaken the five-row fact.

Prove the accepted Sprint 035K correction is in ancestry and compare current application/source paths with accepted 035K and validated Sprint 036 behavior. Sprint 036B must remain planning/operations-only. If any product, test, package, configuration or repository script change is required, do not make it; restore all aliases when needed and close the exact scope-expansion outcome.

Reread the intended Vercel project `rankin007s-projects/pnr-precision-performance`, project ID `prj_6To7czLpCEGL6fInkQwE4egePPpq`, known-safe Ready rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`, project domains, alias inventory and current Production status. Prove the selected mutation mechanism affects exactly these five and no other alias: apex, `www`, project alias, team project alias and legacy team-qualified project alias.

Do not use `vercel promote` or `vercel rollback` unless a read-only pre-confirmation proves their complete affected set is exactly those five. Otherwise use explicit `vercel alias set` against immutable deployment URLs. Deployment-level alias inventory is corroborating only; the independently resolved deployment behind each alias is current routing authority.

Build `baseline` by inspecting all five aliases independently. Require five/five Ready rollback. Reconcile approved Supabase project `uvskssaecdhxcgytkasc`, prohibited old project, Production Site URL/callback/no wildcard, SMTP/template/six-digit OTP/expiry/cooldown and retained Sprint 035K pilot through sanitized read-only evidence. No provider or pilot mutation is permitted.

Intentionally commit/push only the scoped planning/evidence checkpoint and prove exact local/direct-remote/live equality. Deploy one fresh exact candidate with `vercel.cmd deploy --prod --skip-domain --yes` plus the established sanitized exact source/branch metadata. Do not reuse the Sprint 036 candidate. Inspect the returned immutable automatic URL and deployment ID; require the intended project, Production target, exact source and Ready state.

Immediately build `post-stage` by rereading all five aliases. Require five/five rollback. A candidate deployment record that lists an alias does not fail this gate when that alias independently resolves to rollback; record it as stale/contradictory corroboration and continue from routing truth. Any actual alias drift triggers the all-five rollback without human authentication.

Promote in this exact order, using `vercel.cmd alias set <fresh-candidate-automatic-url> <alias>`:

1. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`
2. `pnr-precision-performance-rankin007s-projects.vercel.app`
3. `pnr-precision-performance.vercel.app`
4. `www.precisionperformance.com.au`
5. `precisionperformance.com.au`

After each assignment, reread all five. Require exactly the completed prefix on candidate and remaining suffix on rollback. A command error, third deployment, non-Ready state, unexpected movement or alias outside the exact set exits promotion immediately and enters all-five rollback.

When `candidate-live` is five/five candidate, run cache-busted homepage, pricing, disclaimer/asset, visibly disabled enquiry, health, truthful sign-in, anonymous portal/horse redirect, unsafe-method and protected/API safety checks. Do not begin authentication until they pass.

The tester controls their private mailbox. Never request or receive the mailbox address or code in chat, inspect/automate the mailbox, or retain protected values. Guide the first canonical Production journey: new code, valid `/portal` session, retained synthetic stable/horse, workspace/action, safe wrong-horse denial and sign-out. Prove protected routes are inaccessible after sign-out. After cooldown, use a fresh application/browser session, request and enter a fresh current code, reach `/portal` again and confirm the same bounded assignment. A reload, browser-back action, reused session or old code does not count.

On a material human or route failure, diagnose once with sanitized evidence. Retry only when it is non-blind and requires no source/provider/configuration change. Otherwise roll back all five immediately. Do not create additional identities/fixtures or weaken authentication.

Rollback uses exact target `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app` in this order: apex, `www`, project alias, team project alias, legacy team-qualified alias. Assign all five even when some already report rollback. After every assignment reread all five. Final recovery requires five/five Ready rollback plus public/protected smoke. If that cannot be proven, stop `production-promotion-partial-mutation-blocked` and record what failed, all evidence checked, exact user action, step-by-step instructions and what you will verify afterward.

Close `production-trainer-access-stable-live-accepted-clean` only when `final-accepted` proves five/five candidate after both fresh human sign-ins and the full journey. A clean rollback is safe but incomplete. Reconcile exact Production/rollback/candidate/source/aliases/callback/provider/template/pilot state, mutations, tests, protected-evidence boundary, worktree and direct remote equality. Refresh proportional current planning/operations records, intentionally commit and push only the scoped 036B branch, and stop with one exact permitted outcome. Do not begin Sprint 029N.
