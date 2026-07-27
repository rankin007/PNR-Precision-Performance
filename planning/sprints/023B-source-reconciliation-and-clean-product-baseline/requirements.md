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
