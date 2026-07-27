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
