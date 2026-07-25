# Sprint 029L Scoped Release Branch And Remote Backup Evidence

## Final Status

`scoped-release-branch-backed-up`

Sprint 029L applied the scoped release-branch Pack, verified light production state, and backed up the deployed Sprint 029 release lineage to the scoped remote branch `codex/029-marketing-preview-release`.

The remote backup branch points to Sprint 029K closeout commit `7e21c9767f3d53e0f2b8ddf126e22b7352c6def4`. Sprint 029L closeout documentation remains a local follow-up commit and does not claim `develop` reconciliation.

This evidence does not establish full public website completion, product Done, commerce readiness, authenticated readiness, SEO/indexing launch, final launch readiness, production readiness, or `develop` reconciliation.

## Pack Application

- Architect Pack: `planning/architect-packs/architect-pack-029L-scoped-release-branch-and-remote-backup.md`
- Applied sprint: `planning/sprints/029L-scoped-release-branch-and-remote-backup/SPRINT.md`
- Pack validation: `node scripts/apply-architect-pack.js planning/architect-packs/architect-pack-029L-scoped-release-branch-and-remote-backup.md --check` passed.
- Dry run: created only `planning/sprints/029L-scoped-release-branch-and-remote-backup/SPRINT.md`.
- Applied run: created only `planning/sprints/029L-scoped-release-branch-and-remote-backup/SPRINT.md`.

## Git Snapshot

Pre-staging branch state:

```text
## develop...origin/develop [ahead 15]
```

Local commits ahead of the local `origin/develop` tracking ref before 029L closeout:

```text
7e21c97 Close Sprint 029K release state hygiene
52eb7a2 Close Sprint 029J rendered visual correction
14bc568 Fix Sprint 029J rendered marketing preview
227be71 Close Sprint 029I live public reconciliation
3c828ee Close Sprint 029H external alias smoke
5c04af6 Close Sprint 029G alias reconciliation
c3debef Close Sprint 029F deployment evidence
ce88697 Deploy Sprint 029F front page marketing preview
f37bbbd docs: close sprint 002B delivery consolidation
c961d4b chore: consolidate validation and project state
1d50719 docs: close sprint 017F repository baseline
9d74786 chore: establish post-sprint-021 repository baseline
171d3aa chore: establish sprint 017 repository baseline
8bf310a Update shop professional kit pricing
72f6f7f feat: implement Stripe checkout integration with database persistence and webhook handling
```

Uncommitted Sprint 029L files before branch push:

```text
planning/sprints/029L-scoped-release-branch-and-remote-backup/SPRINT.md
```

The sprint chose the allowed push shape: push current local `HEAD` first, because `HEAD` was the Sprint 029K closeout commit and the 029L evidence could then record the exact verified remote SHA without a circular self-reference.

## Remote Branch Verification

Repository:

- `rankin007/PNR-Precision-Performance`

Preferred branch inspection:

- `git ls-remote --heads https://github.com/rankin007/PNR-Precision-Performance.git codex/029-marketing-preview-release` initially returned no branch.

Existing remote Sprint 029 branch check:

- `git ls-remote --heads https://github.com/rankin007/PNR-Precision-Performance.git "codex/*029*" "*029*"` found only `codex/029F-browser-proof-release-and-live-deployment` at `4faf80647932548974144664840a57e4ef179142`.
- Fetching that branch into `refs/remotes/tmp/codex-029F-browser-proof-release-and-live-deployment` showed it is not an ancestor of local `HEAD`; it was not used for 029L.

Scoped push command:

```text
git push https://github.com/rankin007/PNR-Precision-Performance.git HEAD:refs/heads/codex/029-marketing-preview-release
```

Observed command behavior:

- The first HTTPS push timed out locally after 124 seconds without a terminal success/failure result.
- A fail-fast non-interactive HTTPS push attempt also timed out after 124 seconds.
- Orphaned `git` and `git-remote-https` processes from the timed-out push path were stopped.
- Subsequent read-only remote verification proved the scoped branch had been created despite the local timeout.

Final remote verification:

```text
7e21c9767f3d53e0f2b8ddf126e22b7352c6def4	refs/heads/codex/029-marketing-preview-release
502b45a36613fa09c64e4ee7114fe68e220c3284	refs/heads/develop
```

Result:

- Scoped backup branch: `codex/029-marketing-preview-release`
- Remote backup SHA: `7e21c9767f3d53e0f2b8ddf126e22b7352c6def4`
- Backed-up commit: `7e21c97 Close Sprint 029K release state hygiene`
- `origin/develop` was not pushed or targeted by any Sprint 029L command.

The remote `develop` SHA observed over HTTPS differs from the stale local `origin/develop` tracking ref, but Sprint 029L did not fetch or reconcile `develop` beyond read-only verification and did not move it.

## Included Commit Range

The scoped release branch contains the local lineage through Sprint 029K. The relevant Sprint 029 release commits included in the branch history are:

```text
7e21c97 Close Sprint 029K release state hygiene
52eb7a2 Close Sprint 029J rendered visual correction
14bc568 Fix Sprint 029J rendered marketing preview
227be71 Close Sprint 029I live public reconciliation
3c828ee Close Sprint 029H external alias smoke
5c04af6 Close Sprint 029G alias reconciliation
c3debef Close Sprint 029F deployment evidence
ce88697 Deploy Sprint 029F front page marketing preview
```

The branch also includes older local history below the Sprint 029 release commits because the Sprint 029 release lineage is built on those commits. This scoped branch is a backup/review branch only and does not mean `develop` is reconciled.

## Light Production Verification

Public marker smoke:

| URL | Status | Sprint markers | Old markers | Title |
|---|---:|---:|---:|---|
| `https://precisionperformance.com.au/` | 200 | 8/8 | 0 | `Precision Performance` |

Sprint markers checked:

- `Equine Biochemistry`
- `Recovery Intelligence`
- `See what`
- `observation`
- `alone cannot`
- `show`
- `Request a Stable Trial`
- `Recreated sample`

Old markers checked absent:

- `Biochemistry Analysis for Elite Equine`
- `Apply Now`
- `Shop`
- `Testimonials`
- `Phone App Preview`
- `Members Experience`
- `Professional Kit`
- `Monthly Service`
- `$500 per test`

Hero image endpoint:

| URL | Status | Content type | Content length |
|---|---:|---|---:|
| `https://precisionperformance.com.au/under-construction-thoroughbred.jpg` | 200 | `image/jpeg` | `394632` |

Vercel inspect:

| Alias | Project | Deployment | Status |
|---|---|---|---|
| `https://precisionperformance.com.au` | `pnr-precision-performance` | `dpl_CMahP7G62gim3t6HmkhPFwSC1JMy` | Ready |

Sprint 029L did not deploy, promote aliases, change DNS, mutate Vercel settings, mutate environment variables, or touch Supabase, Stripe, auth/RLS, billing, checkout, catalogue, production databases, or production data.

## Remaining Dirty-Worktree Boundary

Tracked files that remain modified outside Sprint 029L:

```text
.env.example
.gitignore
app/(admin)/admin/memberships/actions.ts
app/(ops)/data-entry/biochemistry/actions.ts
docs/AUTH_RLS_PORTAL_ACCESS.md
docs/ENVIRONMENT.md
docs/SPRINT_021_PROGRESS.md
lib/auth/app-context.ts
lib/auth/bootstrap.ts
planning/DECISIONS.md
planning/PROJECT_SPRINT_LIST_2026-07-21.md
planning/QUESTIONS.md
planning/RISKS.md
planning/SPRINT_SCHEDULE.md
scripts/validate-supabase-clean-rebuild-020G.ps1
supabase/bootstrap/remote-init.sql
```

Historical Architect Pack files remain untracked, including 029 through 029L pack files. The active 021-series/auth/Supabase work remains uncommitted and unstaged by Sprint 029L.

## Validation

Passed after closeout file edits and before staging:

- `npm.cmd run validate:json`: passed.
- `npm.cmd run validate:static`: passed.
- `git diff --check -- docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md planning/STATE.md planning/STATUS.json planning/ARCHITECT_BRIEFING.md planning/EVIDENCE_INDEX.md`: passed with only expected CRLF working-copy warnings.

The untracked Sprint 029L sprint and evidence files were included in the subsequent explicit staging set and inspected through `git diff --cached --name-status` before commit.

## Staging And Commit Plan

Stage only:

- `docs/PUBLIC_FRONT_PAGE_MARKETING_PREVIEW_029.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/EVIDENCE_INDEX.md`
- `planning/sprints/029L-scoped-release-branch-and-remote-backup/SPRINT.md`
- `planning/reviews/029L-scoped-release-branch-and-remote-backup-evidence.md`

Do not stage unrelated 021-series/auth/Supabase files or historical Architect Packs.

## Manual Intervention

No blocking manual intervention remains for the scoped remote backup branch because `git ls-remote` verified `codex/029-marketing-preview-release` exists at the Sprint 029K closeout SHA.

Manual caution remains:

1. The local direct push command timed out even though the branch was created.
2. If a future push is needed, first verify whether Git Credential Manager is prompting interactively or hanging in the background.
3. Use `git ls-remote --heads https://github.com/rankin007/PNR-Precision-Performance.git <branch>` after any future push attempt before retrying.
4. Reconcile local `develop`, remote `develop`, and the active 021-series dirty work in a separate repository-control sprint before any broad merge or `develop` push.

## Next Recommended Action

Use `codex/029-marketing-preview-release` as the remote backup/review branch for the Sprint 029 marketing-preview release lineage. Plan broader public website, commerce, authenticated, SEO/indexing, final launch, production-readiness, and `develop` reconciliation work separately.
