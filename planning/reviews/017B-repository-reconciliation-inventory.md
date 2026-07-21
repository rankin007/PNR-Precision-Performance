# Sprint 017B Repository Reconciliation Inventory

Outcome: `inventory-complete`.

This is a non-destructive classification baseline. It does not clean the tree, decide 017C treatments, prepare 017D staging, commit, contact a remote service, or establish product readiness.

## Opening and closing Git evidence

| Evidence | Opening | Closing |
|---|---:|---:|
| Branch | `develop` | `develop` |
| HEAD | `171d3aa4186e04c656a50d91b52b1f086f95f89a` | same |
| Upstream | `origin/develop` | same |
| Ahead / behind, local refs only | 3 / 0 | 3 / 0 |
| Staged entries | 0 | 0 |
| Unstaged tracked modifications | 35 | 35 |
| Tracked deletions | 0 | 0 |
| Untracked status entries | 218 | 220 |
| Total status entries | 253 | 255 |

The two expected closing-only entries are this Markdown inventory and its JSON companion. Pack application had already added the four 017B sprint files before opening capture. The Git index was empty at opening and remained byte-for-byte logically empty (`git diff --cached --name-status` returned no entries) throughout.

## Comparison baseline

Sprint 016 recorded a broad pre-baseline tree and deferred `.release-main/`, `.claude/`, `samples/`, environment, generated, and deletion decisions. Sprint 017 resolved the tracked environment/deletion gates and created baseline commit `171d3aa`. Current HEAD is still exactly that commit. The current delta is post-baseline work from Sprints 018-021M plus accepted project-review/planning inputs and the still-deferred local/tool/reference groups. There are no current tracked deletions or staged entries.

The earlier pre-Pack project-review counts were orientation only. Authoritative 017B opening counts above include the four applied Pack files.

## Classification totals

Totals count Git status entries, not filesystem descendants. They reconcile to the 255-entry closing state.

| Primary class | Entries |
|---|---:|
| `accepted-sprint-work` | 70 |
| `planning-or-evidence` | 178 |
| `generated-or-cache` | 0 |
| `dependency-or-tool-output` | 0 |
| `local-environment-or-protected` | 1 |
| `reference-or-archive` | 1 |
| `tool-preference-or-agent-config` | 3 |
| `duplicate-or-superseded-candidate` | 0 |
| `nested-repository-or-release-snapshot` | 1 |
| `unresolved-ownership` | 1 |
| **Total** | **255** |

Ignored and unchanged auxiliary paths have zero status-entry weight and therefore do not change these totals.

## Complete grouped classification

Every group below is homogeneous for class and advisory treatment. Detailed schema fields, evidence references, risk, rationale, origins, and manual-input flags are in `017B-file-classification.json`.

| Path/group | State | Count | Class | Origin | Treatment | Risk |
|---|---|---:|---|---|---|---|
| `.gitignore` | modified | 1 | accepted sprint work | 020G/021I | future staging | medium |
| Agent/workflow/method files | modified | 6 | planning/evidence | 018-021 | future staging | medium |
| Tracked app surfaces | modified | 8 | accepted sprint work | 018/019/019B | future staging | high |
| Tracked auth/layout components | modified | 3 | accepted sprint work | 019/019B | future staging | high |
| Tracked auth/navigation/site libraries | modified | 4 | accepted sprint work | 018/019/021 | future staging | high |
| `package.json`, `package-lock.json` | modified | 2 | accepted sprint work | 019 | future staging | high |
| Canonical tracked planning files | modified | 8 | planning/evidence | 018-021/017B | future staging | medium |
| Supabase bootstrap/config | modified | 2 | accepted sprint work | 020G/021 | future staging | high |
| `tailwind.config.ts` | modified | 1 | accepted sprint work | 019 | future staging | medium |
| `.claude/commands/*` | untracked | 3 descendants | tool preference/config | unknown | review in 017C | medium |
| `.release-main/` | untracked nested repo | 1 entry / 22,166 file descendants | nested release snapshot | 012C/unknown | review in 017C | high |
| `Sprint list 190726.docx` | untracked | 1 | reference/archive | planning input | review in 017C | medium |
| `planning/PROJECT_SPRINT_LIST_2026-07-21.md` | untracked | 1 | planning/evidence | planning input | future staging | low |
| Untracked app group | untracked | 4 | accepted sprint work | 018 | future staging | high |
| Untracked components group | untracked | 3 | accepted sprint work | 018/019 | future staging | high |
| Untracked docs group | untracked | 11 | planning/evidence | 018-021 | future staging | medium |
| `lib/auth/role-matrix.ts` | untracked | 1 | accepted sprint work | 021 | future staging | high |
| Architect Packs | untracked | 23 | planning/evidence | 017B-021M | future staging | low |
| Reviews excluding protected 021M support | untracked | 29 | planning/evidence | 020F-021M/review | future staging | medium |
| `planning/reviews/021M-supabase-support-escalation.md` | untracked protected | 1 | local environment/protected | 021M | preserve | protected review required |
| Applied sprint files | untracked | 98 | planning/evidence | 017B-021M | future staging | low |
| 017B inventory outputs | closing-only untracked | 2 | planning/evidence | 017B | future staging | low |
| `samples/README.md` | untracked | 1 | unresolved ownership | unknown | unresolved | medium |
| Sprint validation/proof scripts | untracked | 28 | accepted sprint work | 020C-021M | future staging | high |
| Migrations 0010-0012 | untracked | 3 | accepted sprint work | 020G/021 | future staging | high |
| Sprint 021 structural test | untracked | 1 | accepted sprint work | 021 | future staging | medium |
| Verification SQL | untracked | 9 | accepted sprint work | 020-021 | future staging | high |

No current status entry qualified primarily as generated/cache, dependency output, or duplicate/superseded. Those zero totals are explicit rather than omitted.

## Sprint provenance summary

- **018:** mobile biochemistry routes/actions/component and documentation.
- **019/019B:** design tokens, shared UI/layout/auth presentation, Tailwind, package metadata, and mobile-heading correction.
- **020 through 020G:** remote-readiness/audit/replacement evidence, validation scripts, verification SQL, candidate bootstrap/configuration, and migration 0010.
- **021 through 021M:** definitive role matrix, migrations 0011-0012, structural tests, authenticated-proof harnesses/reviews, recovery evidence, JWT diagnosis, timed provider escalation, and cumulative progress/planning updates.
- **017B/project review:** accepted project sprint list, Architect Pack, applied sprint files, and the two inventory outputs.

Historical documentation supports provenance but was correlated with paths, approved sprint sets, current purpose, and safe Git metadata. Mixed-origin canonical planning and auth/navigation groups are identified as such and should be segmented deliberately in 017D.

## High-risk and protected-review entries

High-risk groups are individually visible above: tracked runtime app/auth/library changes, package metadata, Supabase bootstrap/config, untracked app/components, scripts, migrations, verification SQL, and `.release-main/`.

The sole protected status entry is `planning/reviews/021M-supabase-support-escalation.md`. It was classified by filename, Git state, and durable 021M state only. Its correlation values were not opened, printed, hashed, diffed, copied, or reproduced.

Named ignored environment paths `.env.local`, `.env.test.local`, and `.env.vercel.production` are `local-environment-or-protected`, `local-only`, and `protected-review-required`; they contribute zero status entries. Their contents were not read, measured, hashed, or diffed. `.next/`, `build/`, `.validation-logs/`, and `node_modules/` are already ignored; their contents were not enumerated.

## Ambiguous and nested paths

- `.release-main/`: one untracked Git status entry, 22,166 file descendants, and its own `.git` boundary. Ownership/treatment is a mandatory 017C decision.
- `references/archive/sprint-001-cleanup/.release-main/.git`: a separate tracked, unchanged historical nested boundary; preserve.
- `.claude/commands/*`: three homogeneous tool-command descendants; project-versus-user ownership is unresolved.
- `samples/README.md`: one entry with unresolved ownership.
- `Sprint list 190726.docx`: source/reference treatment is unresolved even though the distilled Markdown list is accepted planning evidence.
- No additional untracked generated-output equivalent was discovered in status.

## Manual intervention record

**Blocked decision:** treatment ownership for `.release-main/`, `.claude/commands/*`, `samples/README.md`, and `Sprint list 190726.docx`.

**Evidence checked:** Git state, filenames, descendant counts, nested `.git` boundaries, Sprint 016/017 evidence, later sprint provenance, and the accepted project sprint list. Protected contents were not used.

**Exact user/Architect action:** decide whether each named path group should be preserved, archived, local-only, or excluded in a separately approved 017C Pack.

**Steps:**

1. Review the four named path groups and their risk statements above.
2. Choose one advisory disposition for each group without supplying protected content.
3. Have Architect create 017C with exact targets and rollback/safety boundaries.
4. Apply 017C before changing files or ignore rules.

**Builder verification afterward:** confirm 017C names exact targets, respects nested/protected boundaries, does not silently stage or delete work, and leaves 017D commit preparation separate.

These unresolved decisions do not block `inventory-complete` because each has evidence, risk, treatment, and a named decision owner.

## Proposed 017C boundary

017C should decide only ignore/generated treatment, local/protected boundaries, archive/reference placement, `.release-main/`, `.claude/`, `samples/`, the supplied DOCX, nested-repository handling, and unresolved ownership. It should not stage or commit.

## Proposed 017D boundary

017D should consume the accepted 017C dispositions and define exact staging groups for: application/design work; auth/role work; database/migrations/verification; scripts/tests; planning/evidence; and references. It must exclude protected/local/nested/tool-preference paths unless explicitly resolved, validate each coherent group, and decide commit segmentation. Remote review remains separate.

## Validation and non-mutation statement

- Pack identity: four sections valid and applied.
- Opening/closing branch and HEAD match.
- Index remained empty; no stage/unstage occurred.
- Markdown and JSON totals reconcile to 255 closing status entries.
- JSON schema, enums, duplicate/missing group coverage, and parse checks passed.
- Approved-output safety scan found no credential, token, environment value, or private correlation material.
- `git diff --check` passed for approved 017B text outputs.
- No application, configuration, migration, script, test, package, general documentation, reference, environment, or protected-support content changed.
- No delete, move, archive, restore, branch, commit, push, pull, fetch, PR, deployment, remote call, migration, diagnostic, production, billing, DNS, Stripe, or public-reopening action occurred.

017B does not create a clean working tree, staging plan, commit, remote backup, or product-readiness result.
