============================================================
FILE: planning/sprints/034D-legacy-worktree-retirement-and-canonical-authority-finalisation/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/034D-legacy-worktree-retirement-and-canonical-authority-finalisation/blueprint.md
============================================================

# Sprint 034D Blueprint

## Delivery sequence

1. From the permanent canonical repository, verify the exact working directory, Git top-level, clean accepted Sprint 034C lineage, upstream, remote equality, and absence of unexpected canonical changes.
2. Apply the Pack, verify exactly four generated Sprint 034D files, read them as execution authority, and create the scoped 034D branch in the canonical repository only.
3. Before file edits or external/destructive mutation, present the exact canonical file plan, legacy target classes, proposed archival branches, retirement operations, safety guards, acceptance criteria, and rollback/recovery approach at the Builder code gate.
4. Build the sanitized reconciliation ledger from canonical-side Git and filesystem metadata. Enumerate all registered worktrees, legacy roots/checkouts, locks/stale entries, related branches, HEADs, upstreams, unique commits, dirty tracked categories, untracked categories, and remote reachability.
5. Establish a complete disposition for every dirty or divergent entry. Inspect content only to the minimum safe extent needed; stop and contain privately if a secret or protected-data boundary appears.
6. Reconcile unique history before cleanup. Prove already-remote reachability or push genuinely unique safe commits to clearly non-authoritative archival refs, then reread exact remote equality. Preserve unique safe non-secret uncommitted material through a manifest/hash-backed archive only when necessary and never by activating or writing into the legacy workspace.
7. Classify Sprint 035Q as alternate historical lineage. Preserve its safe unique history remotely if needed, document ancestry/divergence, and prohibit adoption into current authority.
8. Retire entries one at a time. Revalidate the resolved absolute target, canonical exclusion, disposition completeness, backup state, and recovery path; use supported Git worktree removal where registered, then prove the target and registration are absent.
9. Prune only proven-safe stale worktree administration and remove only safe local legacy branches. Reread worktree, branch, lock, and reachability state after every bounded batch.
10. Prove final physical authority: exactly one active Precision Performance workspace, no legacy worktree registrations or directories in scope, no stale worktree metadata, no legacy contamination, and no local-only commits intended for retention.
11. Narrowly correct current planning, lifecycle, roadmap, risk, decision, evidence, operational, status, and briefing authority. Preserve historical artifacts and the Preview-versus-Production boundary.
12. Run canonical repository validation, JSON/static/link/path checks, Pack agreement, `git diff --check`, exact changed/staged secret and protected-data scans, UTF-8/encoding checks, Git fsck/reachability checks, remote-ref equality checks, and a final canonical clean/remote-backed proof.
13. Commit intentionally on the scoped canonical branch, push it, prove exact local/remote equality and a clean canonical worktree, then close with one permitted final outcome.

## Per-entry retirement transaction

Treat each legacy entry as an independent transaction:

1. identify the exact entry from canonical metadata;
2. record sanitized pre-state;
3. prove branch/HEAD/unique commits and dirty/untracked categories;
4. assign and evidence one approved disposition;
5. complete required safe archive/remote backup and reread it;
6. re-resolve and guard the destructive target;
7. remove the registered worktree or exact legacy directory;
8. prune only associated safe stale metadata;
9. reread filesystem, worktree registry, refs, reachability, and remote state;
10. update the ledger with result and recovery evidence before moving on.

If post-state differs from expectation, stop further destructive operations, preserve the remaining entries, diagnose once, and use the supported recovery or containment path. Do not normalize an unexpected state by broad deletion.

## Sprint 035Q lineage treatment

The 035Q record must answer:

- its exact HEAD, branch/ref, baseline and divergence point;
- commits unique to it and whether they contain only safe material;
- remote reachability before and after any archival push;
- why it is alternate history rather than accepted current authority;
- which current canonical records previously misstated or ambiguously described it;
- the retained archival ref or other evidence that prevents history loss.

Classification does not authorize product comparison, adoption, merge, replay, or reconciliation into the accepted candidate.

## Final proof model

`zero legacy contamination` means no in-scope legacy directory remains an active checkout or registered worktree; no canonical file, configuration, tooling pointer, status marker, or current planning authority identifies a retired location as active; and no uncertain legacy content was copied into canonical history.

`zero unbacked commits` means every safe commit intentionally retained by Sprint 034D is reachable from an exact verified remote ref. Disposable commits must have a recorded rationale and no secret/protected content. Alternate Sprint 035Q history may remain on an archival remote ref without becoming canonical.

`one clean remotely backed canonical repository` means the permanent canonical path is the only active workspace, its scoped 034D closeout commit equals its upstream remote SHA, its worktree is clean, repository integrity checks pass, and current planning authority agrees.

## Permitted outcomes

- `legacy-worktrees-retired-canonical-authority-final-clean`
- `unique-safe-history-backup-blocked-clean`
- `protected-material-containment-blocked-clean`
- `legacy-disposition-ambiguous-blocked-clean`
- `legacy-retirement-partial-mutation-blocked`
- `canonical-integrity-or-remote-equality-blocked-clean`

Only the first outcome satisfies the approved Sprint 034D objective.

============================================================
FILE: planning/sprints/034D-legacy-worktree-retirement-and-canonical-authority-finalisation/acceptance.md
============================================================

# Sprint 034D Acceptance

## Canonical baseline and boundary

- [ ] All work begins and executes from `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`; current directory and Git top-level exact-match checks pass before inspection and mutation.
- [ ] The accepted starting SHA, branch, upstream, remote equality, and any later accepted canonical closeout are explicitly recorded.
- [ ] No command is run from and no file is written into the legacy OneDrive root, any `C:\tmp` worktree, or another checkout.
- [ ] Legacy inspection uses only minimum necessary sanitized read-only metadata from the canonical repository.

## Complete inventory and dispositions

- [ ] The reconciliation ledger enumerates every registered worktree, legacy root/checkout, relevant local branch, lock, missing/stale entry, dirty state, untracked category, unique commit, upstream, and remote-backup state.
- [ ] Every dirty legacy entry has exactly one approved evidence-backed disposition, with pre-state, dependencies, recovery path, execution result, and post-state.
- [ ] No disposition relies only on recency, naming, apparent cleanliness, similarity, or memory.
- [ ] Generated/disposable material is positively identified; genuinely unique safe material is preserved; ambiguous material is not silently discarded.
- [ ] The ledger and command/evidence output contain no secret, credential, MFA/recovery material, protected data, private URL, or reusable authentication artifact.

## Unique history and Sprint 035Q

- [ ] Every commit unique to a retired entry is classified against all retained local and remote refs.
- [ ] Every genuinely unique safe commit retained by the sprint is reachable from an exact verified remote ref before its legacy location or local-only ref is removed.
- [ ] No unsafe, secret-bearing, protected, or uncertain commit is pushed merely to satisfy backup acceptance.
- [ ] Sprint 035Q is documented as alternate historical lineage with exact ancestry/divergence, safe unique-commit disposition, remote reachability, and a clearly non-authoritative retained reference where required.
- [ ] No Sprint 035Q commit is merged, rebased, cherry-picked, replayed, or adopted into the accepted canonical lineage.
- [ ] At final proof there are zero safe retained commits that exist only locally.

## Retirement and metadata pruning

- [ ] Every retired target is re-resolved to an exact approved absolute path and proven not to be the canonical repository or its ancestor before destructive action.
- [ ] Registered worktrees are retired using supported Git operations after complete disposition and backup proof.
- [ ] Unregistered legacy directories are removed only after complete content disposition, target validation, and recovery proof.
- [ ] Stale worktree metadata and locks are pruned only after proving they are no longer active or required.
- [ ] Local legacy branches are removed only after remote reachability or evidenced disposable classification; retained archival remote refs remain intact.
- [ ] Final Git/filesystem rereads show no in-scope legacy worktree registration, legacy active checkout, unsafe stale worktree metadata, or retired directory remaining.
- [ ] No broad reset, blanket deletion, force-push, history rewrite, unresolved-variable deletion, or destructive operation against a broad path occurs.

## Canonical authority and protected boundaries

- [ ] Current planning, lifecycle, roadmap, risk, decision, evidence, status, briefing, and directly affected operational records agree that the permanent canonical repository is the sole active workspace.
- [ ] Sprint 034D is recorded as the current closed foundation authority and Sprint 035Q only as alternate historical lineage.
- [ ] Sprint 036 and Sprint 029N remain planned but unauthorized, and Preview acceptance remains distinct from Production promotion.
- [ ] No retired location remains described by current authority as active, canonical, required, or awaiting cleanup.
- [ ] Historical sprint artifacts are preserved rather than rewritten to manufacture agreement.
- [ ] `docs/change password.md` remains a non-secret rotation register and contains no protected values.
- [ ] Trainer authentication, identities, participant access, Auth/RLS, roles, permissions, assignments, sessions, schema, provider configuration, product behavior, production data, DNS, billing, deployment, and public content remain unchanged.

## Validation and closeout

- [ ] Pack agreement proves exactly four generated Sprint 034D files with no unauthorized generated target.
- [ ] Canonical JSON/static/link/path validation, encoding checks, `git diff --check`, and exact changed/staged scans pass.
- [ ] Repository integrity, ref reachability, worktree registry, branch tracking, and exact remote-ref equality checks pass using safe equivalent evidence where needed.
- [ ] Final evidence proves zero legacy contamination, zero unbacked safe retained commits, and exactly one clean remotely backed canonical repository.
- [ ] The exact Sprint 034D closeout commit is pushed only to its scoped canonical branch and local/upstream SHAs match; required archival pushes are exact, non-force, and separately verified.
- [ ] Closeout records one permitted outcome, every mutation and substitute proof, all retained archival refs, and any manual intervention without reproducing protected content.
- [ ] No merge to `develop`, PR, deployment, production promotion, provider/product mutation, or Core Product Done declaration occurs.

============================================================
FILE: planning/sprints/034D-legacy-worktree-retirement-and-canonical-authority-finalisation/handoff-prompt.md
============================================================

You are Builder for Sprint 034D — Legacy Worktree Retirement And Canonical Authority Finalisation.

Your objective is one outcome: make the permanent canonical repository the sole active Precision Performance workspace; preserve or remotely back up every genuinely unique safe history item; reconcile every dirty legacy entry through evidence; retire all legacy worktrees; prune safe stale metadata; classify Sprint 035Q as alternate historical lineage; correct current canonical planning authority; and finish with zero legacy contamination, zero unbacked commits, and one clean remotely backed canonical repository.

Start only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`. Before anything else, resolve `(Get-Location).Path` and `git rev-parse --show-toplevel`; both must equal that exact path. Read `templates/method/120x-agent-identity.md`, `AGENTS.md`, all four generated Sprint 034D files, `planning/STATE.md`, `planning/STATUS.json`, `planning/DECISIONS.md`, `planning/RISKS.md`, `planning/QUESTIONS.md`, `planning/ROADMAP.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/ARCHITECT_BRIEFING.md`, the 034B/034C closeout evidence, and directly affected operational authority.

Apply `planning/architect-packs/architect-pack-034D-legacy-worktree-retirement-and-canonical-authority-finalisation.md` from the canonical repository, dry-run first. Verify it creates exactly the four files under `planning/sprints/034D-legacy-worktree-retirement-and-canonical-authority-finalisation/`. Execute from those generated sprint files, not from the Pack. Create the scoped `codex/034D-legacy-worktree-retirement-and-canonical-authority-finalisation` branch in the canonical repository only.

The expected starting authority is clean, remotely equal Sprint 034C closeout SHA `8e923c66909ea47f96e8276e2e54aa5a38d9989c` on `codex/034C-delivery-access-and-credential-cleanup`. If the canonical repository proves a later accepted remote-backed closeout before Pack application, reconcile and record it explicitly. Do not silently substitute a different lineage.

Before editing any file or performing external/destructive mutation, present the exact canonical file-by-file plan, legacy target classes, proposed archival refs, retirement operations, destructive guards, acceptance criteria, and rollback/recovery approach at the Builder code gate and wait for explicit approval of that plan.

Do not change directory into, execute Git from, or write into `C:\Users\rrank\OneDrive\PNR Precision Performance` or any `C:\tmp` checkout/worktree. Inspect legacy entries only from the canonical repository using minimum necessary sanitized read-only Git and filesystem metadata. You may determine exact identity, registration, paths, HEAD/branch/SHA, upstream, ancestry, remote reachability, dirty counts/categories, untracked counts/categories, locks, ownership, and disposition. Do not open or emit protected content merely to classify a file.

Create a sanitized reconciliation ledger under `planning/reviews/`. Enumerate every registered worktree, legacy Precision Performance root/checkout, relevant local branch with unique commits, missing/stale administrative entry, and lock. For each, record neutral identity, sanitized path, state, branch/HEAD/upstream, ahead/behind and ancestry, dirty/untracked categories, unique commits, remote reachability, exact disposition, dependencies, recovery path, and post-state.

Give every dirty entry exactly one approved disposition from `requirements.md`. Prove meaningful history by reachability and content safety, not recency or naming. If genuinely unique safe commits are not remotely backed, push them without force to a clearly named non-authoritative archival branch and reread exact remote equality before retirement. If unique safe non-secret uncommitted material must be retained, preserve it outside active workspaces with a manifest and hashes without activating or writing into the legacy checkout. Never push secrets, credentials, protected data, uncertain commits, unsafe generated evidence, or private authentication material.

Classify Sprint 035Q as alternate historical lineage. Establish its exact baseline, divergence, unique commits, safety, and remote reachability. Preserve safe unique history on a clearly non-authoritative remote ref if required. Do not merge, cherry-pick, rebase, replay, compare into product changes, or adopt any 035Q commit as current product, planning, release, or sprint authority.

Retire entries one at a time. Before every recursive delete, move, worktree removal, lock removal, prune, or branch deletion, re-resolve the exact absolute target and prove it is the approved legacy entry, not the canonical repository and not an ancestor of it. Confirm complete disposition, safe-history backup, dirty/untracked handling, and recovery path. Prefer supported Git worktree removal/pruning. Never use `$HOME`, `~`, a drive/workspace root, a broad glob, unresolved variables, cross-shell path composition, `git reset --hard`, force-push, history rewrite, blanket staging, or broad cleanup.

After each retirement, reread the filesystem, worktree registry, locks, refs, reachability, and remote state. If post-state is unexpected, stop further destructive actions, preserve remaining entries, diagnose once, and use the supported recovery or containment path. Do not delete more state to hide a partial result.

Only after physical and metadata retirement proof passes, correct current canonical planning authority. Record Sprint 034D as the closed foundation authority; the permanent canonical repository as the sole active workspace; Sprint 035Q as alternate historical lineage; Sprint 034B/034C/034D lifecycle and roadmap truth; Sprint 036 and 029N as still planned but unauthorized; and Preview acceptance as not Production promotion. Remove stale current-authority claims about retired locations, but preserve historical artifacts rather than rewriting history.

Your owned changes are the four generated Sprint files, the sanitized 034D ledger/review, proportional current planning/closeout records, and directly affected operational authority. You may create verified safe archival remote refs, retire exact reconciled legacy targets, prune proven-safe stale worktree metadata, and remove exact safe local legacy branches. You must not change product source/tests, schema, migrations, Auth/RLS, trainer authentication, identities, roles, permissions, assignments, sessions, provider settings, data, DNS, billing, deployment, public content, or features.

Preserve all passwords, tokens, keys, cookies, MFA material, recovery codes, credentials, protected personal data, private URLs, and reusable authentication artifacts outside Git, chat, command output, logs, screenshots, and evidence. `docs/change password.md` remains a non-secret rotation register. Do not remove or redesign trainer authentication. If protected material is encountered, stop content inspection, contain it privately, and record sanitized facts; do not paste, hash, screenshot, echo, or commit it.

Verification must prove: exact canonical start; complete ledger coverage; one evidenced disposition per dirty entry; remote reachability of every safe retained commit; alternate/non-authoritative 035Q classification; absence of all in-scope legacy registrations, active checkouts, unsafe stale metadata, and retired directories; no current canonical pointer to a retired workspace; Pack agreement; JSON/static/link/path/encoding validation; `git diff --check`; exact changed/staged secret and protected-data scans; Git integrity and reachability; clean canonical status; and exact local/upstream equality for the final scoped closeout commit and each archival ref created.

Use equivalent or stronger safe evidence when a preferred supporting tool is unavailable. Keep deterministic ledger, validator, reporter, path, formatting, encoding, and non-product harness corrections in this sprint. Do not create a follow-up merely because an optional CLI, UI, renderer, browser, clipboard route, or redundant check fails. Manual intervention is last resort; record the blocked fact, evidence checked, exact secret-free user steps, and what you will verify afterward.

Stop only for a material wrong-target, ownership, secret/protected-data, destructive, integrity, remote-backup, production, scope, partial-mutation, or cleanup-safety boundary. A blocked outcome must preserve all remaining uncertain state. Only `legacy-worktrees-retired-canonical-authority-final-clean` completes the objective.

At closeout, intentionally commit the exact Sprint 034D canonical changes, push only the scoped canonical branch and any required safe archival refs without force, prove exact remote equality and a clean canonical worktree, and refresh the review, ledger, state, status, lifecycle, roadmap, evidence index, risks/decisions/questions as needed, and Architect briefing. Do not merge to `develop`, open a PR, deploy, promote Production, mutate product/provider state, or declare Core Product Done.
