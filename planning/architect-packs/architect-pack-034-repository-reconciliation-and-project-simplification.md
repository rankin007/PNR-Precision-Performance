============================================================
FILE: planning/sprints/034-repository-reconciliation-and-project-simplification/requirements.md
============================================================

# Sprint 034 — Repository Reconciliation And Project Simplification

## Outcome

Create one clean, validated, remotely backed-up product baseline that preserves the accepted production release, authenticated application work, mobile biochemistry workflow and durable evidence while making current project authority easy to find.

This is repository-control and documentation-hygiene work. It does not add trainer functionality. Its purpose is to make Sprint 035 Trainer Pilot And Dashboard MVP safe and straightforward to execute.

The target outcome is `reconciled-product-baseline-and-project-simplification-complete-clean`.

## Workflow profile

Strict. Most file classification and documentation work is ordinary, but strict controls apply because the worktree is materially dirty, branches have diverged, accepted source exists across multiple lineages, historical evidence must remain trustworthy, archival may affect references, and the requested outcome includes commits and a remote backup branch.

## Starting authority

Use these sources in this order:

1. `AGENTS.md` and `templates/method/120x-agent-identity.md`;
2. `planning/STATE.md`;
3. `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`;
4. `planning/DEFERRED_SCOPE_AND_OWNERSHIP.md`;
5. `planning/reviews/033-final-handoff-monitoring-and-done-acceptance.md`;
6. `docs/OPERATIONS_HANDOFF.md`;
7. `planning/EVIDENCE_INDEX.md`;
8. the Sprint 032 release evidence and exact release branch/SHA;
9. accepted Sprint 021AH and Sprint 022/022B evidence;
10. `planning/PROJECT_REVIEW_AND_REVISED_SPRINT_LIST_2026-07-29.md`, using its dated amendment and lean-delivery diagnosis rather than superseded status claims.

Sprint 033 closed `final-handoff-complete-product-not-done-clean`. Sprint 032 remains the valid public release. Product-wide Done is not met. Sprint 034 must preserve those distinctions.

## Required baseline inventory

Before editing or moving any file, record:

- current root path, branch, HEAD and complete tracked/untracked manifest;
- `develop`, `origin/develop`, `codex/032-public-relaunch-production`, `codex/029-marketing-preview-release` and any other branch that contains accepted product work;
- the exact Sprint 032 release SHA and its ancestry;
- every registered Git worktree and any referenced integrated candidate under `C:\tmp` that still exists;
- migrations, lockfile, application source, tests and durable evidence unique to each candidate;
- ignored/generated/local-only/protected paths by name and classification only, without reading or emitting secret values;
- current production identity through maintained Sprint 032/033 evidence, supplemented only by bounded read-only checks if needed to resolve a material ambiguity.

Do not assume the dirty root, remote `develop`, release branch or a temporary worktree is the integrated baseline. Select it from evidence.

## Required deliverables

### 1. Repository reconciliation ledger

Create `planning/reviews/034-repository-reconciliation-ledger.md` containing:

- every material tracked modification and untracked path grouped by sprint/outcome;
- disposition: preserve in baseline, preserve as history, archive, ignore/local-only, reproducible generated output, superseded duplicate, unresolved, or excluded;
- source lineage and evidence for each preserve decision;
- selected baseline branch/SHA and why it is stronger than alternatives;
- exact treatment of local `develop`, `origin/develop`, release branches and separate worktrees;
- migrations and lockfile reconciliation;
- explicit confirmation that no secret or private-data content was copied into evidence;
- any unresolved item and its effect on Sprint 035.

Large homogeneous groups may be summarized by directory and rule when every member has the same proven disposition. Do not reproduce hundreds of filenames merely for ceremony.

### 2. Clean integrated product baseline

Create or use branch `codex/034-reconciled-product-baseline` from the strongest accepted source lineage. Reconcile into it only:

- exact Sprint 032 public release source and metadata required to reproduce the live release;
- accepted Sprint 021AH authenticated application source, migrations through `0017`, tests and current contract documentation;
- accepted Sprint 022/022B mobile biochemistry workflow source, focused tests and current documentation;
- completed Sprint 033 operational handoff and final acceptance authorities;
- necessary current validation, configuration and dependency files;
- Sprint 034 reconciliation, archive/index and closeout artifacts.

Use evidence-led file comparison, commits, patches or narrowly scoped Git operations. Do not copy the entire dirty root, merge blindly, rebase shared history, force-push, or infer acceptance from file recency alone.

Production application behavior must remain unchanged. Deterministic formatting, encoding, broken-reference, validator and manifest corrections discovered within approved files remain in Sprint 034 when they do not change product behavior.

### 3. Planning simplification and archive

Create a concise current planning surface:

- `planning/STATE.md` — current production/product truth and immediate Sprint 035 direction;
- `planning/STATUS.json` — exact Sprint 034 closeout;
- `planning/ARCHITECT_BRIEFING.md` — concise next-Architect briefing;
- `planning/SPRINT_SCHEDULE.md` — operational roadmap beginning with Sprint 035;
- `planning/EVIDENCE_INDEX.md` — current authorities first, history second;
- `planning/SPRINT_LIFECYCLE_LEDGER.md` — compact proposed/applied/completed/superseded/historical status for sprint and pack families where ambiguity matters.

Archive only proven superseded or redundant planning material under a dated path such as `planning/history/through-033/` or an existing compatible history structure. Prefer Git moves that preserve history. Update inbound links for moved files or leave a small index/redirect note where stable references would otherwise break.

Do not archive or delete:

- migrations;
- current application source or tests;
- current canonical authorities;
- Sprint 032 release evidence;
- Sprint 033 final acceptance and operational handoff;
- accepted Sprint 021AH or 022/022B evidence needed to establish the integrated baseline;
- adverse security, privacy, migration, cleanup or production evidence;
- anything whose ownership or redundancy is uncertain.

Historical narrative may remain in place when moving it would create more link churn than clarity. Project simplification is measured by discoverability and authority, not file-count reduction.

### 4. Lean-delivery controls

Update `docs/WORKFLOW_PROFILE.md`, `AGENTS.md`, the schedule or another canonical workflow file only as narrowly required to make these rules durable:

- one sprint produces one user-visible or operationally necessary outcome;
- no new Pack is created while the current sprint remains open;
- ordinary product work uses one `SPRINT.md`; four-file Packs are reserved for genuinely strict/high-risk boundaries;
- deterministic tooling, validator, formatting, encoding and evidence corrections stay within the active sprint;
- a follow-up suffix requires a material out-of-scope source/schema/contract change, genuinely different outcome or external action without authority;
- closeout links to evidence instead of repeating full history;
- every second product sprint includes trainer-visible testing;
- progress is measured through accepted user journeys, not pack or document count;
- strict controls attach to the risky boundary, not automatically to the entire feature;
- voice, OCR, transactional commerce, sophisticated saved views and broad public enhancements remain deferred unless a later sprint explicitly promotes them.

Do not weaken security, privacy, migration, production or evidence-integrity controls.

### 5. Validation, commit and remote backup

On the reconciled branch:

- run canonical JSON, domain, roles, Supabase self-test, static, TypeScript, lint and local validation;
- run production build in the project root or an equivalent reparse-safe clean workspace and record the substitution;
- run focused Sprint 021AH and 022/022B regression checks;
- run `git diff --check`;
- validate maintained links/paths and sprint-pack formatting relevant to changed files;
- scan the exact staged set for secrets, private data, generated output and excluded files;
- inspect the complete staged manifest before each commit.

Create a small intentional commit series, preferably one reconciliation commit and one planning/archive closeout commit. Do not create a commit per file or per historical sprint.

Push only `codex/034-reconciled-product-baseline`. Do not push or force-update `develop`, rewrite any remote branch, open a PR, merge, deploy or change production. Verify the remote branch resolves to the exact final local SHA.

## Approved files and actions

Builder may:

- create the Sprint 034 generated files and review artifacts;
- create `planning/SPRINT_LIFECYCLE_LEDGER.md`;
- update canonical planning/workflow/documentation files necessary for truthful reconciliation and lean-delivery controls;
- preserve accepted application, test, migration, configuration and dependency files on the reconciled branch without changing runtime behavior;
- move proven historical planning/evidence files into a dated archive while maintaining navigability;
- update `.gitignore` only for confirmed generated, local-only or protected paths;
- create/switch to the scoped Sprint 034 branch, stage the exact accepted manifest, commit the validated baseline and push that scoped branch;
- use a clean temporary worktree for safe comparison/build validation;
- remove only Sprint-034-owned temporary worktrees/processes after exact-path and ownership verification.

## Explicitly out of scope

- New trainer/dashboard, scoring, recommendation, upload, trend, voice, commerce or public functionality.
- Product schema, migration, RLS, role, permission or data-contract changes.
- Production deployment, rollback, DNS, Vercel setting, Supabase, Stripe, environment or production-data mutation.
- Merging to or pushing `develop`.
- Force-push, history rewrite, broad reset, blanket staging, blanket commit or blanket deletion.
- Reading, copying or emitting secret values, protected local environment contents or real horse/stable/customer data.
- Declaring product-wide Done.
- Reopening historical sprints or changing their identifiers/outcomes.
- Creating the Sprint 035 Pack.

## Safety and execution standard

Follow the Evidence-Proportional Execution Standard in `AGENTS.md`. Stop only for a material target/lineage ambiguity that cannot be resolved safely, secret/private-data exposure, destructive uncertainty, evidence-integrity failure, unauthorized scope expansion, production impact, unsafe Git history operation, or cleanup whose ownership cannot be proven.

Use equivalent or stronger safe evidence when a preferred supporting tool is unavailable. Keep in-scope validator, formatting, encoding, link, manifest, reporter and deterministic harness corrections in Sprint 034. Do not create a follow-up sprint solely because Docker, browser automation, a renderer, schema dump, optional CLI or another supporting tool is unavailable.

Manual intervention is the last safe option. If genuinely required, record what is blocked, evidence checked, exact user action, step-by-step instructions and what Builder will verify afterward. Never ask the user to paste secrets or private production data.

============================================================
FILE: planning/sprints/034-repository-reconciliation-and-project-simplification/blueprint.md
============================================================

# Sprint 034 Blueprint

## Phase 1 — Freeze and map the truth

1. Record root branch, HEAD, dirty/untracked manifest and remote divergence.
2. Enumerate branches, worktrees and candidate lineages without mutation.
3. Fingerprint migrations, lockfile, accepted application source, focused tests and canonical authorities.
4. Build the reconciliation ledger before moving, staging or deleting anything.
5. Stop only if the accepted source cannot be distinguished without guessing or protected data is exposed.

## Phase 2 — Select the baseline

1. Start from the strongest accepted candidate, giving priority to exact Sprint 032 release reproducibility plus accepted 021AH and 022/022B product source.
2. Create `codex/034-reconciled-product-baseline` without moving shared branches.
3. Reconcile accepted files through narrow comparisons or commits.
4. Confirm migrations `0001`-`0017`, relevant auth/application helpers, mobile workflow and tests agree with accepted evidence.
5. Confirm public-release behavior remains unchanged.

## Phase 3 — Simplify durable project authority

1. Create the sprint lifecycle ledger.
2. Put current authorities and immediate actions at the top of state, schedule, briefing and evidence index.
3. Classify stale packs/sprints as proposed, applied, completed, superseded or historical.
4. Move only proven redundant historical material when links can remain valid.
5. Keep ambiguous material in place and record it instead of forcing cleanup.

## Phase 4 — Install anti-over-governance controls

1. Add the lean-delivery rules narrowly to canonical workflow authority.
2. Remove conflicting current roadmap language without rewriting history.
3. Set Sprint 035 Trainer Pilot And Dashboard MVP as the next product outcome.
4. Keep optional voice, OCR, commerce and broad enhancements deferred.

## Phase 5 — Prove the baseline

1. Run focused and canonical validation.
2. Prove a production build from the reconciled candidate.
3. Check links, encoding, whitespace, approved paths and staged content.
4. Compare key source fingerprints against accepted evidence.
5. Record every evidence substitution proportionately.

## Phase 6 — Commit and back up

1. Stage only the reviewed manifest.
2. Inspect staged name-status and diff summaries.
3. Create the smallest coherent commit series.
4. Push only the scoped Sprint 034 branch.
5. Verify exact local/remote SHA equality.
6. Leave `develop`, production and all providers unchanged.

## Phase 7 — Close and hand off

1. Write `planning/reviews/034-repository-reconciliation-and-project-simplification.md`.
2. Record the selected branch/SHA, validation, archive moves, exclusions and unresolved items.
3. Refresh state, status, schedule, lifecycle ledger, evidence index and Architect briefing.
4. Make Sprint 035 the single next product recommendation; do not create its Pack.

## Preferred evidence hierarchy

1. Exact accepted commit/source and executable behavior.
2. Maintained tests tied to unchanged source.
3. Direct file hash/content comparison.
4. Durable closeout evidence.
5. Planning intent only as classification context, never as completion proof.

## Stop conditions

Stop for unresolved material baseline ambiguity, secret/private-data exposure, unsafe destructive scope, an unexpected production-source mismatch, missing accepted migrations/source, validation failure indicating product/security regression, inability to preserve historical references, or a push target that is not exactly the scoped Sprint 034 branch.

Do not stop merely because the worktree is large, a preferred comparison/render tool is unavailable, encoding/link corrections are needed, or historical files are numerous.

============================================================
FILE: planning/sprints/034-repository-reconciliation-and-project-simplification/acceptance.md
============================================================

# Sprint 034 Acceptance

## Baseline and inventory

- [ ] Root branch, HEAD, dirty/untracked manifest and remote divergence are recorded.
- [ ] Relevant local/remote branches and registered/referenced worktrees are classified.
- [ ] The exact Sprint 032 release source and accepted 021AH and 022/022B source are identified without guessing.
- [ ] Migrations, lockfile, application source, tests and canonical authorities are compared across candidates.
- [ ] Protected/local-only paths are classified without exposing values.

## Reconciled product baseline

- [ ] `codex/034-reconciled-product-baseline` contains the exact accepted public release, auth/application and mobile workflow source required for Sprint 035.
- [ ] Migrations `0001`-`0017` are preserved as immutable accepted history.
- [ ] Sprint 033 final acceptance and operational handoff authorities are preserved.
- [ ] No unaccepted file was absorbed merely because it was newer or present in the dirty root.
- [ ] No product behavior, schema, RLS, role, permission or production state changed.

## Project simplification

- [ ] The reconciliation ledger gives every material dirty path a supported disposition.
- [ ] `planning/SPRINT_LIFECYCLE_LEDGER.md` distinguishes proposed, applied, completed, superseded and historical artifacts where ambiguity matters.
- [ ] Current state, schedule, briefing and evidence index make governing authority and next work discoverable without reading the whole archive.
- [ ] Only proven redundant/superseded material was archived.
- [ ] Historical, adverse, migration, release, security and accepted product evidence remains available and navigable.
- [ ] No uncertain file was deleted or archived to manufacture a clean appearance.

## Lean-delivery controls

- [ ] Canonical workflow authority contains the one-outcome, one-open-sprint and proportional-pack rules.
- [ ] Deterministic corrections remain in the current sprint and the corrective-suffix threshold is explicit.
- [ ] Closeout-by-reference and trainer-visible testing cadence are explicit.
- [ ] Strict governance remains attached to real security/privacy/migration/production risk.
- [ ] Sprint 035 Trainer Pilot And Dashboard MVP is the single next product outcome.
- [ ] Deferred voice, OCR, commerce and broad enhancements were not pulled into Sprint 034 or 035 implicitly.

## Validation and repository proof

- [ ] Canonical JSON, domain, roles, Supabase self-test, static, TypeScript, lint and local validation pass.
- [ ] Focused 021AH and 022/022B regression checks pass.
- [ ] Production build passes in root or a documented equivalent reparse-safe clean workspace.
- [ ] `git diff --check`, encoding, maintained-link/path and relevant pack-format checks pass.
- [ ] Staged secret/private-data/generated-output/exclusion scan passes.
- [ ] Complete staged manifest was inspected before commit.

## Commit and remote backup

- [ ] The reconciled branch has a small intentional commit series with truthful messages.
- [ ] Working tree on the reconciled branch is clean after closeout, excluding explicitly documented ignored/local-only state.
- [ ] Only `codex/034-reconciled-product-baseline` was pushed.
- [ ] Remote branch resolves to the exact final local SHA.
- [ ] `develop`, production aliases/deployments, Supabase, Stripe, DNS and provider configuration remain unchanged.
- [ ] No force-push, history rewrite, blanket staging, blanket commit or broad deletion occurred.

## Closeout

- [ ] Sprint 034 review records baseline choice, archive treatment, validation, commits, remote SHA, exclusions and unresolved items concisely.
- [ ] `planning/STATUS.json`, state, schedule, lifecycle ledger, evidence index and Architect briefing agree.
- [ ] Sprint 035 can begin from the clean remote-backed baseline without reconstructing product history.

## Acceptable outcomes

`reconciled-product-baseline-and-project-simplification-complete-clean` when the accepted product lineage is clean, validated, intentionally committed, remotely backed up, historically navigable and ready for Sprint 035.

`reconciled-product-baseline-complete-archive-limited-clean` when the baseline, validation, commits and remote backup pass but some non-authoritative historical material remains in place because moving it would weaken links or evidence integrity. This is acceptable when current authority is still clear.

`repository-lineage-ambiguity-blocked-clean` when accepted source cannot be selected without guessing and no safe evidence can resolve it. No destructive, commit, push or production action may occur after that finding.

`repository-validation-regression-blocked-clean` when the selected baseline exposes a material product, security, migration or integrity regression that cannot be corrected without changing product scope.

`repository-cleanup-safety-blocked-clean` when cleanup would require uncertain deletion, protected-data handling, history rewrite or another destructive action whose safety cannot be proven.

============================================================
FILE: planning/sprints/034-repository-reconciliation-and-project-simplification/handoff-prompt.md
============================================================

# Builder Handoff — Sprint 034

Apply this Architect Pack, verify the generated four-file Sprint 034 set, then execute only from those sprint files.

Begin with a read-only inventory. Do not edit, move, stage or delete until the reconciliation ledger identifies the candidate lineages and gives each material dirty path a supported disposition. Treat the exact Sprint 032 public release, Sprint 021AH authenticated application proof, Sprint 022/022B mobile workflow and Sprint 033 final acceptance/operations records as distinct authorities that must be preserved in one integrated candidate.

Create `codex/034-reconciled-product-baseline` from the strongest accepted lineage. Reconcile narrowly; do not blanket-copy the dirty root, merge blindly, rebase shared history, reset user work, or infer acceptance from timestamps. Preserve migrations `0001`-`0017` and accepted adverse/security evidence. Do not change product behavior.

Simplify the project by making current authorities obvious, adding a compact sprint lifecycle ledger and archiving only material proven redundant or superseded. Prefer stable links and Git history over reducing file count. Leave uncertain material in place with a recorded disposition.

Install the lean-delivery controls defined in the sprint requirements without weakening strict security, privacy, migration or production boundaries. Sprint 035 Trainer Pilot And Dashboard MVP must be the single next product recommendation, but do not create its Architect Pack or implement it in Sprint 034.

Run canonical and focused validation, a production build, link/encoding/diff checks and an exact staged-content review. Keep deterministic tooling, validator, formatting, encoding, path and reporter corrections inside Sprint 034 when they do not change product behavior.

Create the smallest coherent commit series and push only `codex/034-reconciled-product-baseline`. Verify exact remote SHA equality. Do not push or merge `develop`, open a PR, deploy, roll back, or mutate Vercel, Supabase, Stripe, DNS, environments, providers or production data.

Follow the Evidence-Proportional Execution Standard. Stop only for material lineage ambiguity, secret/private-data exposure, destructive uncertainty, evidence-integrity failure, product/security regression, production impact, scope expansion or an unsafe push target. Substitute equivalent or stronger safe evidence for unavailable supporting tools. Use manual intervention only after safe alternatives are exhausted, and record the blocked fact, evidence checked, exact user steps and subsequent verification without requesting secrets or private data.
