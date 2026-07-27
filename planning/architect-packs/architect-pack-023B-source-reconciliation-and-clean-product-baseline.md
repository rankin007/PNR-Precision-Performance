Architect Pack 023B - Source Reconciliation And Clean Product Baseline

Created: 2026-07-28
Workflow profile: strict
Architect outcome: Builder handoff to reconcile the accepted Sprint 021AH and Sprint 022/022B product source into one validated clean baseline while preserving Sprint 029M release lineage and leaving the original dirty `develop` worktree unchanged.

============================================================
FILE: planning/sprints/023B-source-reconciliation-and-clean-product-baseline/requirements.md
============================================================

# Sprint 023B - Source Reconciliation And Clean Product Baseline Requirements

## Role And Method

Builder executes this corrective sprint under the `strict` workflow profile. Architect created this Pack only. Builder applies it, verifies all four generated Sprint 023B files, and executes from those sprint files.

Sprint 023B exists only to remove the clean-baseline blocker recorded for Sprint 023. It does not implement test-evidence uploads or decide any upload, privacy, retention, ownership, consent, Storage, or lifecycle behaviour.

## Starting Point

- The original `develop` worktree is materially dirty and must remain unchanged by this sprint.
- Current `develop` HEAD was recorded as `b8961b9` during the 2026-07-28 review.
- Sprint 029M release lineage was recorded at `ad9d419bc40f0be2e13aa297535d3d8e5e151625`.
- Neither inspected commit contains migration `0017` or the inspected Sprint 022 workflow/test paths.
- `git log --all` found no reachable commit containing the required migration `0017` or inspected Sprint 022 workflow/test paths.
- Accepted Sprint 021AH and Sprint 022/022B source, tests, evidence, and planning provenance currently exist only among modified and untracked files in the dirty `develop` worktree.
- Sprint 023 stopped `evidence-upload-baseline-blocked-clean` because its scope prohibited this reconciliation.
- `planning/reviews/023-pack-application-stop-and-next-step-review.md` records the diagnosis and recovery recommendation.

All recorded SHAs and path claims are evidence to reverify, not assumptions to carry forward silently.

## Goal

Produce a reviewable and validated clean product baseline that:

1. descends from or otherwise preserves the accepted Sprint 029M release lineage without rewriting it;
2. contains the accepted Sprint 021AH migration ledger through `0017` and its required authenticated application/access source;
3. contains the accepted Sprint 022/022B mobile biochemistry workflow source, focused tests, documentation, and evidence corrections;
4. excludes unrelated, temporary, generated, secret-bearing, abandoned, or unproven dirty-worktree material;
5. records exact source provenance, ancestry, selected paths, excluded paths, hashes, validation, and residual uncertainty; and
6. leaves the original dirty `develop` worktree byte-for-byte and index-for-index unchanged.

If separately instructed to commit after validation, produce one clean reachable reconciliation commit and record its SHA for Sprint 023. Without that separate instruction, stop at a fully validated `ready-for-commit` handoff.

## Hard Safety Gates

Before copying or editing reconciled source, Builder must:

1. capture original worktree branch, HEAD, porcelain status, staged state, and a safe path inventory without printing secret values;
2. verify `b8961b9`, `ad9d419`, their ancestry relationship, and all relevant local and remote-tracking refs;
3. verify that the proposed isolated base contains the accepted Sprint 029M public-release source and rollback provenance;
4. create a separate isolated worktree and `codex/023B-source-reconciliation-and-clean-product-baseline` branch from the selected verified base;
5. prove the isolated worktree is clean before reconciliation; and
6. record how the original dirty worktree will be checked for non-mutation at closeout.

Prefer `ad9d419` as the candidate base only if ancestry and content checks prove it is the accepted 029M release-lineage tip and it safely contains the required earlier committed history. If it fails, stop and report rather than choosing another lineage without evidence.

Builder must not reset, stash, clean, stage, commit, switch, rebase, merge, or otherwise mutate the original dirty `develop` worktree. Builder must not delete `.codex-temp/` or any unclassified file.

## Source Classification Contract

Every modified or untracked path in the original worktree must be classified in the reconciliation manifest as exactly one of:

- `include-021AH`;
- `include-022`;
- `include-022B`;
- `include-shared-required`;
- `planning-provenance-only`;
- `exclude-029-or-other-sprint`;
- `exclude-temporary-or-generated`;
- `exclude-secret-or-local-only`;
- `exclude-unproven`; or
- `requires-manual-decision`.

Classification must be supported by sprint artifacts, closeout evidence, file content, focused tests, and source comparison. A dirty file must not be included merely because it is present or newer.

Any path classified `requires-manual-decision` that affects runtime behaviour, migration history, auth/access, tests, or accepted evidence blocks final reconciliation until the user supplies the decision.

## Accepted Source Boundaries

The reconciled baseline must include, when proven accepted and required:

- immutable migrations `0013` through `0017`, with earlier migration history unchanged;
- deterministic alignment of `supabase/bootstrap/remote-init.sql` with accepted immutable migration history;
- the narrow authenticated application/access helpers required by accepted 021AH behaviour;
- the Sprint 021AH focused validators, direct/rendered proof harnesses, and safe cleanup evidence required to substantiate the accepted source;
- the Sprint 022 mobile biochemistry workflow components and state model;
- the Sprint 022 focused deterministic workflow test and registered dependency-free script entries;
- accepted 022/022B workflow and field-trial documentation;
- 021AH and 022/022B sprint artifacts, Architect Packs, and review evidence necessary for durable provenance; and
- conflict-safe planning updates needed to describe the reconciled baseline accurately.

Builder must compare modified tracked files against the selected base and include only hunks required by accepted 021AH or 022/022B outcomes. Mixed-purpose files require hunk-level reconciliation; blanket copying is prohibited.

## Preservation Boundaries

- Preserve migrations `0001` through `0017` as immutable history. Do not edit earlier migration bytes to silence validation.
- Preserve the accepted Sprint 029M public-site source and release evidence from the selected base.
- Preserve existing behaviour outside accepted 021AH and 022/022B outcomes.
- Do not weaken authentication, role, RLS, comment deletion, initial-administrator, route, or revocation contracts.
- Do not change scoring, thresholds, recommendations, uploads, Storage, voice, commerce, public routing, deployment, or provider configuration.
- Do not include credentials, runtime secrets, `.env*` values, private payloads, user files, screenshots containing protected content, or local machine caches.
- `.codex-temp/**`, build output, dependency directories, logs, downloaded browser/runtime data, and other generated material remain excluded.

## Required Reading

Builder must read:

1. `templates/method/120x-agent-identity.md`
2. `AGENTS.md`
3. `docs/WORKFLOW_PROFILE.md`
4. `planning/STATE.md`
5. `planning/STATUS.json`
6. `planning/ARCHITECT_BRIEFING.md`
7. `planning/DECISIONS.md`
8. `planning/DOMAIN.md`
9. `planning/RISKS.md`
10. `planning/QUESTIONS.md`
11. `planning/EVIDENCE_INDEX.md`
12. `planning/SPRINT_SCHEDULE.md`
13. `planning/PROJECT_SPRINT_LIST_2026-07-21.md`
14. `planning/reviews/023-pack-application-stop-and-next-step-review.md`
15. Sprint 021AH Pack, generated sprint files, and all 021AH review evidence
16. Sprint 022 and 022B Packs, generated sprint files, and closeout reviews
17. Sprint 029M Pack, sprint artifact, closeout evidence, and relevant release commits
18. relevant source and tests changed by the candidate reconciliation

## Approved File Set

Builder may create or edit only in the isolated Sprint 023B worktree:

- `app/(admin)/admin/memberships/actions.ts`, only proven accepted 021AH behaviour;
- `app/(ops)/data-entry/biochemistry/actions.ts`;
- `app/(ops)/data-entry/biochemistry/page.tsx`;
- `components/ops/biochemistry-result-panel.tsx`;
- `components/ops/biochemistry-capture-workflow.tsx`;
- `components/ops/biochemistry-workflow-state.ts`;
- `lib/auth/app-context.ts`;
- `lib/auth/bootstrap.ts`;
- `supabase/migrations/0013_atomic_initial_administrator_claim.sql`;
- `supabase/migrations/0014_authenticated_biochemistry_comment_soft_delete.sql`;
- `supabase/migrations/0015_hardened_authenticated_biochemistry_comment_soft_delete.sql`;
- `supabase/migrations/0016_null_safe_authenticated_biochemistry_comment_soft_delete.sql`;
- `supabase/migrations/0017_valid_null_safe_authenticated_biochemistry_comment_soft_delete.sql`;
- `supabase/bootstrap/remote-init.sql`, only accepted alignment;
- focused `scripts/**` files proven to belong to 021AH or 022/022B;
- `scripts/README.md`, only registration/documentation for included focused scripts;
- `scripts/run-validation-suite.mjs`, only proven required registration;
- `package.json` and `package-lock.json`, only proven dependency-free script registration; no dependency additions;
- `docs/AUTH_RLS_PORTAL_ACCESS.md`;
- `docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md`, only conflict-safe accepted clarification;
- `docs/BIOCHEMISTRY_WORKFLOW_022.md`;
- `docs/BIOCHEMISTRY_FIELD_TRIAL_022.md`;
- `docs/ENVIRONMENT.md` and `docs/VALIDATION.md`, only proven required 021AH/022 operational documentation;
- `docs/SPRINT_021_PROGRESS.md`, only accepted 021AH historical correction;
- the Sprint 021AH, 022, 022B, 023, and 023B Architect Packs and generated sprint artifacts required for provenance;
- `planning/reviews/021AH-*.md`;
- `planning/reviews/022-*.md`;
- `planning/reviews/022B-*.md`;
- `planning/reviews/023-*.md` and `planning/reviews/023B-*.md`;
- `planning/STATE.md`;
- `planning/STATUS.json`;
- `planning/ARCHITECT_BRIEFING.md`;
- `planning/EVIDENCE_INDEX.md`;
- `planning/SPRINT_SCHEDULE.md`;
- `planning/PROJECT_SPRINT_LIST_2026-07-21.md`;
- `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` only where reconciliation evidence changes them; and
- `.gitignore` and `.env.example` only if hunk-level proof shows an accepted 021AH requirement and no secret value is present.

Any other runtime, test, migration, documentation, or planning path requires a stop and Architect scope correction. Reading and inventorying excluded paths is allowed where necessary for classification, but protected contents and secret values must not be printed or copied.

## External And Git Boundaries

This Pack permits creation and use of the isolated local worktree and named local branch. It does not permit:

- remote mutation;
- push, PR, merge, rebase, force operation, deployment, provider access, or production mutation;
- changes to `develop` or its index;
- deletion or cleanup of any existing worktree or branch; or
- a commit unless the user separately instructs Builder to commit after reviewing the validation result.

If the user separately asks for the validated reconciliation commit, Builder must stage only explicit approved paths, inspect the staged diff, rerun the final staged/source gates, create one intentional local commit, and report its SHA. That instruction does not permit push, merge, or modification of `develop`.

## Explicitly Out Of Scope

- Sprint 023 upload/Storage implementation or application of its Pack;
- the twenty Sprint 023 privacy/storage/lifecycle decisions;
- bucket creation, Storage RLS, signed URLs, upload UI, file handling, retention, deletion, consent, or incident design;
- Sprint 028 dashboard work;
- new product behaviour beyond accepted 021AH and 022/022B outcomes;
- remote Supabase operations or authenticated hosted reproof;
- public-site changes, 029M follow-up implementation, deployment, DNS, Vercel, or route mutation;
- checkout, Stripe, commerce, scoring, recommendation, OCR, or voice work;
- broad refactors, dependency additions, formatting sweeps, or opportunistic fixes; and
- commit, push, PR, merge, rebase, reset, stash, clean, or destructive operations except the single later user-requested local reconciliation commit described above.

## Manual Intervention Rule

For every blocker or required user/operator action, Builder must record:

- what is blocked or not working;
- evidence already checked;
- exact user/manual action needed;
- numbered steps for the action; and
- what Builder will verify afterward.

Known interventions include ambiguous mixed-purpose files, missing accepted source, unexpected ancestry, validation failures that require scope expansion, and the separate user instruction required before committing the validated baseline.

============================================================
FILE: planning/sprints/023B-source-reconciliation-and-clean-product-baseline/blueprint.md
============================================================

# Sprint 023B - Source Reconciliation And Clean Product Baseline Blueprint

## Phase 1 - Preserve And Inventory

1. Record the original `develop` branch, HEAD, porcelain status, staged state, worktree list, and refs without mutation.
2. Record hashes or other safe fingerprints needed to prove the original worktree and index remain unchanged.
3. Inventory every modified and untracked path and classify it under the requirements contract.
4. Read the accepted 021AH, 022, 022B, and 029M artifacts and build a source-to-outcome mapping.
5. Record ambiguous, mixed-purpose, generated, local-only, secret-risk, and unrelated paths before reconciliation.

Deliver `planning/reviews/023B-dirty-source-classification-and-provenance.md` in the isolated worktree.

## Phase 2 - Select And Isolate The Base

1. Verify `b8961b9` and `ad9d419` identities and ancestry.
2. Verify that `ad9d419` contains the accepted 029M release source and rollback provenance.
3. Compare the candidate base with current `develop` and relevant refs.
4. Create the isolated branch/worktree from the verified candidate base.
5. Prove the isolated worktree begins clean.
6. Record why the selected base preserves, rather than replaces or falsely absorbs, the 029M lineage.

Deliver `planning/reviews/023B-base-ancestry-and-isolation.md`.

## Phase 3 - Reconcile Accepted Source

1. Reconstruct the accepted 021AH source set from sprint requirements, evidence, tests, migrations, and dirty-source comparison.
2. Reconstruct the accepted 022/022B source set in the same manner.
3. Copy or reproduce only accepted files and accepted hunks into the isolated worktree.
4. Preserve migration bytes and ordering through `0017`.
5. Reconcile shared files at hunk level so 021AH, 022/022B, and 029M requirements coexist without unrelated changes.
6. Add only provenance artifacts required to make the accepted outcomes durable.
7. Review the full diff for unexpected public-site, auth, schema, role, route, scoring, recommendation, upload, commerce, or generated-file changes.

Do not use a blanket copy, broad staging command, merge, rebase, stash, reset, or worktree clean operation.

Deliver `planning/reviews/023B-reconciled-source-manifest.md` with included paths, excluded paths, hunk rationale, and relevant hashes.

## Phase 4 - Validate The Reconciled Baseline

Run the focused tests associated with included 021AH and 022/022B source, then run at minimum:

- `npm.cmd run validate:json`
- `npm.cmd run test:domain`
- `npm.cmd run test:roles`
- `npm.cmd run test:supabase-self`
- the included focused 021AH tests that do not contact remote systems
- the Sprint 022 deterministic workflow test
- `npm.cmd run validate:static`
- `npm.cmd run typecheck`
- `npm.cmd run lint`
- `npm.cmd run build`
- `git diff --check`

Run `npm.cmd run validate:ci` and `npm.cmd run validate:local` when their documented prerequisites are satisfied without remote/provider access. Classify the inherited migration `0009` Windows byte-hash issue exactly if encountered; do not alter immutable history to silence it.

Validation must also prove:

- ledger presence and ordering through `0017`;
- required 022 workflow components, state model, and test presence;
- no new dependency;
- no secret, credential fragment, signed URL, private payload, or real client data in the diff;
- no unintended upload, Storage, scoring, recommendation, public-route, commerce, or deployment behaviour;
- the selected 029M public source remains present and unchanged except for conflict-safe planning reconciliation; and
- the original dirty worktree branch, HEAD, status, staged state, and safe fingerprints remain unchanged.

Deliver `planning/reviews/023B-validation-and-non-mutation-evidence.md`.

## Phase 5 - Reviewable Handoff Or Separately Requested Commit

If all validation passes and no commit instruction has been given:

1. leave the isolated worktree with only the validated reconciliation diff;
2. provide the explicit file list, validation summary, residual limitations, and proposed commit message;
3. record the outcome `source-reconciled-ready-for-commit`; and
4. request the user's separate commit instruction.

If the user separately instructs Builder to commit:

1. stage only explicit approved paths;
2. inspect the staged name/status and full staged diff;
3. confirm excluded and secret-risk files are absent;
4. rerun `git diff --cached --check` and the final proportionate gates;
5. create one local reconciliation commit;
6. verify the worktree is clean and the commit is reachable on the isolated branch;
7. record the commit SHA, parent/base SHA, ancestry, required path presence, and relevant hashes; and
8. do not push, merge, or change `develop`.

Deliver `planning/reviews/023B-clean-baseline-closeout.md` and refresh the required planning state only with evidence-backed facts.

## Stop Conditions

Stop cleanly if:

- the recorded 029M base or ancestry cannot be verified;
- accepted 021AH or 022/022B source cannot be distinguished from unrelated dirty work;
- a mixed-purpose runtime hunk requires product judgment beyond existing evidence;
- migration history is inconsistent or would require editing an applied migration;
- validation exposes a failure requiring scope expansion;
- any secret/private payload would need to be inspected, copied, or recorded;
- the original dirty worktree changes during execution; or
- a clean reconciled commit is required but the user has not separately requested a commit.

Use the Manual Intervention Rule for every stop.

============================================================
FILE: planning/sprints/023B-source-reconciliation-and-clean-product-baseline/acceptance.md
============================================================

# Sprint 023B - Source Reconciliation And Clean Product Baseline Acceptance

## Isolation And Provenance

- [ ] The original dirty `develop` branch, HEAD, status, index state, and safe fingerprints are recorded before work.
- [ ] `b8961b9`, `ad9d419`, relevant refs, and their ancestry are independently verified.
- [ ] The selected base is justified by exact committed source and preserves the accepted 029M release lineage.
- [ ] A separate `codex/023B-source-reconciliation-and-clean-product-baseline` branch/worktree begins clean.
- [ ] Every original modified or untracked path is classified under the required classification contract.
- [ ] Every included file or hunk maps to accepted 021AH, 022, 022B, shared-required, or durable provenance evidence.
- [ ] Every excluded or unresolved path has a recorded reason.

## Reconciled Product Baseline

- [ ] Migrations `0001` through `0017` are present in order and immutable historical bytes were not edited.
- [ ] The accepted 021AH authenticated application/access helpers and focused local proof source are present.
- [ ] The accepted Sprint 022 workflow components, state model, route integration, focused test, and documentation are present.
- [ ] Sprint 022B evidence corrections are represented without inventing stronger runtime claims.
- [ ] Shared source was reconciled at hunk level rather than copied indiscriminately.
- [ ] The accepted Sprint 029M public-site source and release/rollback provenance remain intact.
- [ ] No unrelated 021-series experiment, 029 follow-up, temporary, generated, local-only, secret-bearing, or unproven file is included.
- [ ] No upload, Storage, privacy/lifecycle decision, scoring, recommendation, voice, commerce, public release, or deployment behaviour is added.

## Validation

- [ ] Focused included 021AH local tests pass without remote/provider contact.
- [ ] Sprint 022 deterministic workflow tests pass.
- [ ] JSON, domain, role, Supabase self-test, static, TypeScript, and lint gates pass.
- [ ] Production build passes from the exact isolated reconciled source.
- [ ] `validate:ci` and `validate:local` pass when their documented local prerequisites are available, or exact inherited/environment blockers are recorded without weakening gates.
- [ ] Migration ledger and bootstrap alignment checks pass through `0017`.
- [ ] `git diff --check` passes for the reconciliation.
- [ ] No dependency was added.
- [ ] No secret, credential fragment, signed URL, private payload, or real client data appears in the diff or evidence.
- [ ] Route/source inventory proves no unintended public, protected, upload, scoring, recommendation, checkout, or deployment change.
- [ ] Original dirty-worktree non-mutation proof passes at closeout.

## Commit And Handoff

- [ ] Without a separate commit instruction, the isolated reconciliation remains reviewable and uncommitted with an explicit proposed commit message.
- [ ] If separately instructed to commit, only approved paths are staged and the staged diff is inspected before one local commit.
- [ ] If committed, the final isolated worktree is clean and the commit SHA, parent/base, ancestry, required path presence, and relevant hashes are recorded.
- [ ] No push, PR, merge, rebase, deployment, remote mutation, or `develop` mutation occurs.
- [ ] Sprint 023 receives an exact clean-baseline SHA only after a commit exists; a ready-for-commit worktree is not misreported as a clean committed baseline.

## Closeout Outcomes

Close with exactly one:

- `source-reconciled-ready-for-commit`: accepted source is reconciled and validated in the isolated worktree, but no separate user commit instruction has been given.
- `clean-product-baseline-established`: the user separately requested the commit; the validated reconciliation is one clean local commit with recorded SHA and all acceptance gates pass.
- `source-reconciliation-blocked-clean`: provenance, scope, source separation, migration integrity, isolation, or validation prevents safe reconciliation; no original-worktree or remote mutation occurs.

No outcome implies Sprint 023 upload implementation, privacy-decision completion, remote readiness, deployment, public launch, commerce readiness, production readiness, or project Done.

============================================================
FILE: planning/sprints/023B-source-reconciliation-and-clean-product-baseline/handoff-prompt.md
============================================================

# Sprint 023B - Builder Handoff Prompt

You are Builder for Sprint 023B - Source Reconciliation And Clean Product Baseline.

Apply and verify all four Sprint 023B files, then execute strictly from them.

Work only in a new isolated worktree and branch after proving the candidate base and ancestry. Treat `ad9d419` as a candidate, not an assumption. Preserve the original dirty `develop` worktree exactly; do not switch it, stage it, stash it, clean it, reset it, commit it, or delete anything from it.

Classify every dirty path before selection. Reconstruct accepted 021AH and 022/022B source from sprint artifacts, tests, evidence, and hunk-level comparison. Do not blanket-copy the dirty tree. Preserve migrations through `0017`, accepted auth/application behaviour, the typed mobile workflow, and accurate evidence boundaries while retaining the accepted 029M public-release lineage.

Run focused and canonical local validation, production build, secret/diff checks, route/source inventory, and original-worktree non-mutation proof. Do not contact remote providers, run hosted authenticated proof, deploy, push, merge, or implement Sprint 023 uploads.

Do not commit unless the user separately instructs you after the validated reconciliation is presented. Without that instruction, close `source-reconciled-ready-for-commit`. If separately instructed, stage explicit approved paths, inspect the staged diff, create one local reconciliation commit, record its SHA and ancestry, and close `clean-product-baseline-established` only if every gate passes.

For any ambiguity or blocker, use the five-part Manual Intervention Rule. Do not invent accepted source, silently include unrelated files, edit immutable migration history, or weaken validation to obtain a clean baseline.
