# Sprint 034D — Legacy Worktree Retirement And Canonical Authority Finalisation

## Outcome

Make `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical` the sole active Precision Performance workspace. Preserve or remotely back up every genuinely unique safe commit, reconcile every dirty legacy entry through a sanitized evidence-backed disposition, retire all legacy worktrees, prune only proven-safe stale Git metadata, classify Sprint 035Q as an alternate historical lineage, correct stale canonical planning authority, and finish with zero legacy contamination, zero unbacked commits, and one clean remotely backed canonical repository.

The target outcome is `legacy-worktrees-retired-canonical-authority-final-clean`.

This is a strict repository-integrity and destructive-cleanup sprint. It is not a product, authentication, provider, deployment, data, or feature sprint.

## Starting authority and workspace boundary

Start only from the permanent canonical repository:

`C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`

Before any inspection or mutation, resolve both the current working directory and `git rev-parse --show-toplevel`; both must equal that exact canonical path. The accepted starting lineage is the clean, remotely equal Sprint 034C closeout at `8e923c66909ea47f96e8276e2e54aa5a38d9989c` on `codex/034C-delivery-access-and-credential-cleanup`, unless the canonical repository proves a later accepted remote-backed closeout before Pack application. Record any such later authority explicitly rather than silently changing the baseline.

Do not operate from, change directory into, execute Git from, or write into:

- `C:\Users\rrank\OneDrive\PNR Precision Performance`
- any `C:\tmp` checkout or worktree
- any other Precision Performance checkout outside the canonical repository

Legacy locations may be inspected only from the canonical repository through sanitized, read-only Git and filesystem metadata needed to establish identity, registration, HEAD/branch/SHA, ancestry, tracking, dirty-state categories, untracked-path categories, locks, ownership, remote-backup state, and safe disposition. Do not open or reproduce protected file contents merely to classify them.

## Required reconciliation ledger

Create a sanitized Sprint 034D reconciliation ledger under `planning/reviews/`. It must enumerate every registered worktree, legacy Precision Performance root, temporary checkout, related local branch with unique commits, and stale administrative entry discovered from canonical metadata.

For each entry record:

- a neutral identifier and sanitized path;
- entry type and whether it is registered, present, missing, locked, stale, dirty, or clean;
- branch, HEAD SHA, upstream and remote-equality status where applicable;
- ahead/behind and ancestry relationship to the canonical accepted lineage;
- tracked-change count/category and untracked-path count/category without protected content;
- unique-commit count and sanitized commit identifiers/subjects;
- whether the unique history is safe to preserve in Git;
- exact disposition, evidence, dependencies, rollback/recovery path, and result.

Every dirty entry must receive exactly one evidence-backed disposition:

1. `safe-history-backed-up-then-retire` — safe unique commits are pushed to a clearly named archival branch before retirement;
2. `safe-history-already-represented-retire` — all meaningful history is proven reachable from a remote-backed retained lineage;
3. `non-secret-uncommitted-material-preserved-outside-active-workspace-then-retire` — genuinely unique safe material is archived without making the legacy location active and with a manifest/hash record;
4. `generated-or-disposable-proven-retire` — changes are proven generated, duplicate, ignored, cache, build, or otherwise disposable;
5. `protected-material-contained-outside-git-then-retire` — secrets or protected data are handled privately outside Git, chat, logs, screenshots, and evidence, with only a sanitized containment record;
6. `blocked-cleanup-unsafe-to-retire` — permitted only when a material safety boundary remains after safe alternatives are exhausted; this is not compatible with the target outcome and must stop the sprint.

File recency, filename similarity, branch naming, an apparently clean status, or a remembered purpose is not sufficient disposition evidence.

## Safe-history and remote-backup policy

No commit may become unreachable or remain only local at closeout. Before deleting a worktree, directory, branch, or administrative reference:

- enumerate commits unique to that entry against all retained local and remote refs;
- prove whether each unique commit is already remotely reachable, safe and worth preserving, or intentionally disposable with evidence;
- push genuinely unique safe history to a non-current archival branch under a clear `archive/` or `codex/archive-` namespace without force-updating any existing remote ref;
- reread the remote ref and prove exact local/remote SHA equality;
- never push commits containing secrets, credentials, protected personal data, unsafe generated evidence, or uncertain material;
- keep alternate history visibly non-authoritative and do not merge it merely to make it reachable.

Sprint 035Q must be classified as an alternate historical lineage. Preserve safe unique history remotely when it is not already backed up, document its relationship to the accepted canonical line, and ensure it is not described as the current product, planning, release, or sprint authority. Do not merge, cherry-pick, rebase, replay, or adopt Sprint 035Q product/planning changes in Sprint 034D.

## Retirement and pruning policy

Retire legacy worktrees only after their ledger entry has complete pre-state, backup/disposition proof, exact target validation, and recovery information. Prefer Git-supported worktree removal/pruning for registered entries. For an unregistered legacy directory, deletion is allowed only after its resolved absolute path is rechecked against the exact approved legacy targets and its contents have a complete disposition.

Before any recursive delete or move, prove the resolved target is the exact legacy directory being retired and is neither the canonical repository nor a parent/ancestor of it. Do not use unresolved variables, broad globs, `~`, `$HOME`, a drive root, a workspace root, or cross-shell path composition for destructive operations.

Prune only stale Git worktree administrative metadata whose backing entry is absent or has been safely retired. Resolve locks deliberately: distinguish active protection from stale lock residue, record why removal is safe, then use supported Git commands where possible. Do not use `git reset --hard`, force-push, broad branch deletion, history rewrite, or blanket cleanup.

Local legacy branches may be deleted only after their commits are proven remotely reachable or disposable and the branch is not required for the alternate-history record. Remote archival branches created for safe history remain retained unless separately governed later.

## Canonical authority corrections

After all physical and metadata retirement proof passes, narrowly correct canonical planning authority so current records agree that:

- the permanent canonical repository is the sole active workspace;
- Sprint 034D is the current closed foundation authority;
- Sprint 035Q is alternate historical lineage, not current authority;
- Sprint 034B, 034C, and 034D lifecycle/roadmap facts are accurate;
- Sprint 036 and Sprint 029N remain planned but unauthorized unless separately changed;
- Preview acceptance remains distinct from production promotion;
- no retired worktree or legacy root is described as active, canonical, required, or pending cleanup.

Approved canonical record updates are limited to proportional changes in `planning/STATE.md`, `planning/STATUS.json`, `planning/ROADMAP.md`, `planning/DECISIONS.md`, `planning/RISKS.md`, `planning/QUESTIONS.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/PROJECT_SPRINT_LIST_2026-07-21.md`, `planning/EVIDENCE_INDEX.md`, `planning/ARCHITECT_BRIEFING.md`, the Sprint 034D review/ledger, and directly affected operational documentation. Do not rewrite historical sprint artifacts to manufacture agreement; record corrections in current authority.

## Secrets, protected data, and authentication boundary

Passwords, passphrases, tokens, API keys, cookies, MFA seeds/codes, recovery codes, private credentials, protected personal data, private URLs, and reusable authentication material must remain outside Git, chat, command output, logs, screenshots, Pack files, ledgers, and evidence.

`docs/change password.md` must remain a non-secret rotation register. It may receive only a narrow factual correction if legacy-workspace authority is stale; it must not store protected values or become a cleanup dump.

Trainer authentication is a protected non-target. Do not remove, redesign, disable, bypass, migrate, or reconfigure trainer sign-in, identities, email OTP, magic links, OAuth, participant access, application Auth, RLS, roles, permissions, assignments, sessions, provider credentials, or recovery. If legacy inspection exposes or suggests protected material, stop content inspection, contain it privately, rotate only under separately applicable authority, and record sanitized facts only.

## Approved actions

Builder may, from the canonical repository only:

- apply this Pack and create the four Sprint 034D files;
- create a scoped `codex/034D-legacy-worktree-retirement-and-canonical-authority-finalisation` branch in the canonical repository;
- use sanitized read-only metadata to inventory exact legacy targets;
- create the reconciliation ledger and proportional evidence;
- archive genuinely unique safe commits to clearly non-authoritative remote branches and verify remote equality;
- preserve genuinely unique safe non-secret uncommitted material outside active workspaces through a manifest/hash-backed archive when Git history is not appropriate;
- retire exact reconciled legacy worktrees/directories and prune proven-safe stale worktree metadata;
- delete exact local legacy branches only after reachability/disposition proof;
- narrowly correct canonical planning and directly affected operational authority;
- intentionally commit canonical Sprint 034D records and push only the scoped canonical branch plus required safe archival branches.

## Explicitly out of scope

- Writing, committing, staging, building, testing, installing, or executing project code from a legacy root or `C:\tmp` worktree.
- Copying uncertain legacy content into the canonical working tree or treating a legacy checkout as a synchronization source.
- Product source, tests, schema, migrations, Auth/RLS, trainer authentication, roles, permissions, provider configuration, production data, deployment, DNS, billing, commerce, public content, or feature changes.
- Adopting, merging, rebasing, cherry-picking, or promoting Sprint 035Q or any alternate lineage into canonical authority.
- Secret rotation or provider/account cleanup beyond a private containment response required by an actual exposure.
- Force-push, history rewrite, destructive reset, blanket staging, speculative deletion, broad recursive cleanup, or deletion of uncertain history.
- Merging to `develop`, opening a PR, deploying, promoting Production, or declaring Core Product Done.

## Evidence-proportional execution and manual intervention

Stop only for a material wrong-target, ownership, secret/protected-data, destructive, integrity, remote-backup, production, scope, partial-mutation, or cleanup-safety boundary. A supporting tool failure is not itself a blocker when equivalent or stronger safe evidence proves the same fact. Keep deterministic ledger, validator, path, formatting, encoding, reporter, and non-product harness corrections inside Sprint 034D.

Do not create a follow-up solely because a preferred Git UI, renderer, browser, clipboard path, optional CLI, or redundant validator is unavailable. Diagnose once, choose the safest effective alternative, and continue when evidence is sufficient.

Manual intervention is the last safe option. When required, record what is blocked, evidence already checked, exact secret-free user action, and what Builder will verify afterward. Never ask the user to paste a protected value or legacy file content into chat.
