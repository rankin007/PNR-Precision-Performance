# Sprint 016 - Repository Alignment And Done-State Baseline Acceptance

## Required Acceptance Criteria

- `planning/STATE.md` says Sprint 016 implementation is authorized before Builder edits files.
- Builder reads the Sprint 016 four-file sprint set before implementation.
- Builder captures current branch and commit.
- Builder captures full working-tree status.
- Every modified, deleted, and untracked file from `git status --short` is represented in the inventory directly or through a clear grouped rule.
- Each dirty item receives one of the required classifications:
  - `keep-sprint-work`
  - `keep-user-work`
  - `archive-candidate`
  - `ignore-candidate`
  - `manual-review`
  - `blocked`
- Possible secret/env files are handled without exposing values or fragments.
- No files are deleted.
- No user changes are reverted.
- No production behavior is intentionally changed.
- No auth, RLS, Stripe, deployment, DNS, remote Supabase, or production data changes are made.
- Public under-construction/shop-blocking state remains preserved.
- Sprint 013-015 local biochemistry work remains preserved.
- `.gitignore` is changed only for evidence-backed generated/local-only artifacts.
- Any archived files are non-runtime and have a manifest.
- `docs/REPOSITORY_ALIGNMENT_016.md` is created.
- `planning/reviews/sprint-016-working-tree-inventory.md` is created.
- Planning files are updated to reflect Sprint 016 status and next-step recommendations.
- Validation is run and recorded, or blocked with exact manual-intervention evidence.
- Builder stops before commit, push, PR, deployment, remote migration, or production mutation unless separately authorized.

## Inventory Acceptance Matrix

| Case | Expected acceptance |
|---|---|
| Modified tracked source file | Classified with rationale; not reverted unless separately authorized. |
| Deleted tracked file | Classified as manual-review or archive/obsolete candidate; not removed from git history by destructive command. |
| Untracked sprint artifact | Classified as keep-sprint-work if supported by sprint evidence. |
| Generated/cache/local output | Classified as ignore-candidate with targeted ignore recommendation. |
| Runtime-adjacent ambiguous file | Classified as manual-review. |
| Env/config file | Safe metadata only; no value exposure. |
| Possible secret-bearing file | Stop and record manual intervention; do not print or copy secret material. |

## Cleanup Acceptance Matrix

| Action | Expected acceptance |
|---|---|
| Documentation/planning update | Allowed if it improves source-of-truth accuracy. |
| `.gitignore` update | Allowed only for narrow generated/local-only patterns. |
| Archive move | Allowed only for clearly non-runtime files with manifest. |
| Permanent delete | Not allowed. |
| Revert | Not allowed without explicit user request. |
| Feature implementation | Not allowed. |
| Commit/push/PR | Not allowed unless separately authorized. |

## Validation Acceptance

If Builder changes only planning/docs/gitignore/archive files:

- record final `git status --short`
- run any available pack/status formatting checks if applicable
- explain why full app validation was not required

If Builder changes application source, package files, scripts, migrations, or runtime config:

- run focused domain validators when available
- run lint
- run TypeScript
- run build through the known bounded path if source/runtime behavior changed
- document sandbox limitations separately from successful outside-sandbox validation

## Manual Intervention Record

Manual intervention entries must include:

- blocked item
- evidence checked
- exact action needed from user/operator
- step-by-step action instructions
- Builder verification after completion

Expected manual-review topics include:

- production/env files
- ambiguous deleted tracked files
- runtime-adjacent dirty files whose sprint ownership is unclear
- whether and when to make a baseline commit
- whether Sprint 017 should be trends/history or mobile capture/results UI
- whether remote Supabase migration should proceed later
