# Sprint 017F — Local Baseline Completion Review

## Outcome

Sprint `017F-repository-baseline-completion` completed **local-baseline-complete** on 2026-07-22. The accumulated post-Sprint-021 repository baseline is now captured in a validated local content commit, with this concise planning closeout prepared as the second commit.

## Commit Evidence

Commit 1:

- hash: `9d7478657d1220777758e40e8611456dbce46ce1`;
- parent: `171d3aa4186e04c656a50d91b52b1f086f95f89a`;
- subject: `chore: establish post-sprint-021 repository baseline`;
- files: 278;
- statistics: 37,129 insertions and 165 deletions.

Commit 2 intended closeout set:

- `planning/reviews/017F-local-baseline-completion-review.md`;
- `planning/sprints/017F-repository-baseline-completion/SPRINT.md`;
- `planning/STATE.md`;
- `planning/STATUS.json`;
- `planning/ARCHITECT_BRIEFING.md`; and
- `planning/SPRINT_SCHEDULE.md`.

Commit 2 subject: `docs: close sprint 017F repository baseline`.

## Repairs And Governance

- Repaired all 28 authorized whitespace findings across 19 files.
- Proved normalized non-whitespace SHA-256 identity for all 19 files.
- Removed one additional blank EOF line in the new 017F Pack under the bounded formatting allowance; normalized content stayed identical.
- Created the dependency-free Node JSON validator and eight-case self-test. Seven staged JSON files passed, including `package-lock.json`.
- Corrected the validator’s Windows CLI entry-point detection under bounded validation-plumbing scope.
- Documented standard as the ordinary-work default while preserving strict controls for auth/RLS, protected material, migrations, production data, billing, destructive/external actions, and deployment.
- No feature, product rule, visible behavior, schema, migration, permission, formula, threshold, recommendation, pricing, hosted configuration, or production state changed in 017F.

## Validation Summary

Passed before Commit 1:

- exact 278-path manifest/index equality and zero unstaged/untracked candidates;
- mandatory exclusions absent from the index;
- all 27 staged Architect Packs;
- Node validator self-test and all seven staged JSON files;
- staged high-confidence secret scan, mode review, expected single DOCX binary review, and whitespace check;
- biochemistry scoring and recommendation fixtures;
- Sprints 019, 020, 020C, 020E, 020F, 020G, and 021 static validators;
- Sprint 021 focused role/comment tests;
- all nine credential-free `test-supabase-*.mjs` self-tests;
- ESLint, TypeScript, and production build on the first attempt; and
- final repeat of manifest, exclusion, Pack, JSON, secret, binary, mode, and whitespace gates.

No protected or remote execution harness ran.

## Final Repository State

- Branch: `develop`.
- Commit 1 parent matches the opening HEAD exactly.
- After Commit 1: empty index and zero non-ignored status entries.
- Final HEAD will be Commit 2; its hash is reported in the Builder handoff.
- Final local ahead/behind relation and clean status are verified after Commit 2.
- Residual ignored/local-only names preserved: `.release-main/`, `.claude/`, `planning/reviews/021M-supabase-support-escalation.md`, local environment files, `.next/`, `build/`, `node_modules/`, validation/log directories, Supabase temporary link directories, caches, IDE state, and generated logs as applicable.

No push, fetch, pull, PR, remote backup, deployment, migration action, production mutation, billing action, provider action, authenticated proof, public reopening, or protected-content inspection occurred.

## Next Recommendation

Plan combined validation/CI and planning consolidation as a useful delivery outcome. Do not create another Sprint 017 repository child sprint.
