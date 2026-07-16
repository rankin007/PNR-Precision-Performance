# Sprint 016 Working Tree Inventory

Captured: 2026-07-17
Branch: `develop`
HEAD: `8bf310a`

## Raw Status Summary

`git status --short` showed a heavily dirty tree with:

- modified tracked files
- staged modified files
- deleted tracked files
- untracked planning/docs/source/reference folders
- tracked env/config risk

No files were deleted, reverted, committed, pushed, deployed, or migrated during this inventory.

## Staged Changes

These files appear staged in `git diff --cached --name-status` and need manual review before any baseline commit:

| Status | Path | Classification | Rationale |
|---|---|---|---|
| M | `.env.vercel.production` | manual-review | Tracked env/production-adjacent file. Do not expose or edit values. Needs user/operator decision before commit. |
| A | `.eslintrc.json` | keep-sprint-work | Build/lint infrastructure from earlier readiness work; safe to preserve, but include in baseline review. |
| M | `.gitignore` | keep-sprint-work | Contains targeted generated/local-only ignores such as `.validation-logs/`; preserve, but review before baseline. |
| M | `app/api/checkout/route.ts` | keep-sprint-work | Earlier checkout safety/public gate work; runtime-adjacent, preserve and validate before baseline. |
| M | `lib/auth/app-context.ts` | keep-sprint-work | Earlier auth/RLS portal access work; runtime-adjacent, preserve and validate before baseline. |
| M | `lib/auth/bootstrap.ts` | keep-sprint-work | Earlier auth bootstrap work; runtime-adjacent, preserve and validate before baseline. |
| M | `lib/domain/horses.ts` | keep-sprint-work | Earlier domain/access work; runtime-adjacent, preserve and validate before baseline. |
| M | `lib/domain/operations.ts` | keep-sprint-work | Earlier operations/data-entry work; runtime-adjacent, preserve and validate before baseline. |
| M | `lib/domain/products.ts` | keep-sprint-work | Earlier commerce/product work; runtime-adjacent, preserve and validate before baseline. |
| M | `lib/supabase/middleware.ts` | keep-sprint-work | Earlier auth/middleware work; runtime-adjacent, preserve and validate before baseline. |
| M | `next.config.ts` | keep-sprint-work | Earlier build/readiness config work; preserve and validate before baseline. |
| M | `package-lock.json` | keep-sprint-work | Earlier dependency/script baseline drift; manual review with `package.json` before commit. |
| M | `package.json` | keep-sprint-work | Earlier validation/build script work; manual review with lockfile before commit. |

## Modified Tracked Files

| Path / group | Classification | Rationale |
|---|---|---|
| `.env.example` | keep-sprint-work | Placeholder-only env guidance from earlier launch/env work; safe metadata only. |
| `.gitignore` | keep-sprint-work | Evidence-backed ignore additions already present; no new ignore edits made in Sprint 016. |
| `README.md` | manual-review | Documentation/runtime project entrypoint. Preserve; review before baseline. |
| `app/(admin)/**` | keep-sprint-work | Admin hardening and commerce visibility from prior sprints. Runtime-adjacent; preserve and validate. |
| `app/(marketing)/home/page.tsx`, `app/contact/page.tsx`, `app/page.tsx`, `app/shop/**`, `app/api/checkout/route.ts` | keep-sprint-work | Sprint 012F public under-construction gate and checkout block behavior. Preserve public safety state. |
| `app/(ops)/**`, `components/ops/**` | keep-sprint-work | Prior data-entry workflow hardening. Runtime-adjacent; preserve and validate. |
| `app/(portal)/**` | keep-sprint-work | Prior portal/access workflow work. Runtime-adjacent; preserve and validate. |
| `app/api/stripe/webhook/route.ts`, `lib/stripe/commerce.ts` | keep-sprint-work | Prior commerce hardening. Stripe-adjacent; preserve and manual-review before baseline. |
| `app/auth/**`, `components/auth/**`, `lib/auth/**`, `lib/supabase/middleware.ts` | keep-sprint-work | Prior auth/RLS work. Auth-adjacent; preserve and manual-review before baseline. |
| `lib/domain/operations.ts`, `lib/navigation.ts` | keep-sprint-work | Prior workflow/navigation updates. Preserve and validate. |
| `next.config.ts`, `package.json`, `package-lock.json`, `tsconfig.json`, `.eslintrc.json` | keep-sprint-work | Build/readiness and validation baseline work. Preserve; validate before baseline commit. |
| `supabase/bootstrap/remote-init.sql`, `supabase/migrations/0002_rls_policies.sql` | keep-sprint-work | Prior local schema/RLS/bootstrap work. Local-only until separately authorized for remote apply. |

## Deleted Tracked Files

| Path | Classification | Rationale |
|---|---|---|
| `ORCHESTRATOR-export.docx` | archive-candidate | Root handoff duplicate was archived in Sprint 012E. Git deletion should be reviewed in baseline commit decision; do not restore or force-delete here. |
| `ORCHESTRATOR.docx` | archive-candidate | Root handoff duplicate was archived in Sprint 012E. Git deletion should be reviewed in baseline commit decision; do not restore or force-delete here. |
| `ORCHESTRATOR.md` | archive-candidate | Root handoff duplicate was archived in Sprint 012E. Git deletion should be reviewed in baseline commit decision; do not restore or force-delete here. |
| `middleware.ts` | manual-review | Runtime-adjacent tracked deletion. Prior Sprint 012F chose page/API gate rather than middleware, but baseline commit should review route behavior before accepting deletion. |

## Untracked Top-Level Groups

These appear as collapsed groups in `git status --short` and are represented by grouped rules.

| Group | Classification | Rationale / examples |
|---|---|---|
| `.120x/` | keep-sprint-work | 120x method metadata. Preserve unless user chooses to externalize method assets. |
| `.agents/skills/` | keep-sprint-work | 120x Architect/Builder local skill files. Preserve as project method support. |
| `.claude/` | manual-review | Tool-specific command files. Not runtime, but tool ownership/user preference unclear. |
| `.release-main/` | manual-review | Production/reference snapshot with runtime source and nested metadata. Do not archive/delete without explicit decision. |
| `AGENTS.md` | keep-sprint-work | Current project agent rules. Preserve. |
| `app/(admin)/admin/commerce/` | keep-sprint-work | Sprint 006 admin commerce visibility. Runtime route; preserve and validate. |
| `components/ops/` | keep-sprint-work | Sprint 005 operations workflow support. Runtime component; preserve and validate. |
| `docs/` | keep-sprint-work | Sprint documentation and evidence, including Sprint 012F-016 docs. Preserve. |
| `lib/domain/biochemistry.ts` | keep-sprint-work | Sprint 013-015 biochemistry domain/scoring/recommendation work. Preserve. |
| `planning/` | keep-sprint-work | 120x planning source of truth and applied sprint files. Preserve. |
| `public/` | keep-sprint-work | Sprint 012F under-construction image asset. Preserve public gate evidence. |
| `references/` | keep-sprint-work | Source materials, archives, and Sprint 014/015 fixtures. Preserve. |
| `samples/` | manual-review | Non-runtime sample docs. Existing README, but broader ownership unclear. |
| `scripts/README.md`, `scripts/apply-architect-pack.js`, `scripts/run-validation-command.ps1`, `scripts/update-method.js` | keep-sprint-work | 120x/validation tooling used by completed sprints. Preserve. |
| `scripts/validate-biochemistry-scoring.ts`, `scripts/validate-biochemistry-recommendations.ts` | keep-sprint-work | Sprint 014/015 fixture validators. Preserve. |
| `supabase/migrations/0008_launch_membership_permission_seeds.sql` | keep-sprint-work | Sprint 008 local migration. Remote apply remains separate. |
| `supabase/migrations/0009_biochemistry_test_data_model.sql` | keep-sprint-work | Sprint 013 local migration. Remote apply remains separate. |
| `templates/` | keep-sprint-work | 120x templates and method starter files. Preserve. |

## Ignored / Ignore Candidates

Evidence from `git check-ignore -v`:

| Path | Rule | Classification | Rationale |
|---|---|---|---|
| `.validation-logs/` | `.gitignore:22` | ignore-candidate | Generated validation logs. Already ignored. |
| `.next/` | `.gitignore:2` | ignore-candidate | Generated Next output. Already ignored. |
| `build/` | `.gitignore:5` | ignore-candidate | Generated build output. Already ignored. |
| `node_modules/` | `.gitignore:1` | ignore-candidate | Dependency folder. Already ignored. |

No new `.gitignore` changes were made in Sprint 016 because the visible generated/local-only candidates already have targeted rules.

## Environment / Secret Safety

Tracked env/config files requiring manual review:

| Path | Status | Classification | Notes |
|---|---|---|---|
| `.env.vercel.production` | staged modified, tracked, now ignored by `.gitignore` | manual-review | Production-adjacent env file. Values were not printed or copied. Needs operator decision before baseline commit. |
| `.env.example` | modified tracked | keep-sprint-work | Placeholder guidance file. Filename-only secret-pattern scan flagged expected placeholder terms; no values printed. |

A filename-only secret-pattern scan reported secret-like pattern counts in expected env/docs/source files. Values were not printed. `.env.vercel.production` is the main manual-review item because it is tracked and production-adjacent.

## Baseline Commit Recommendation

Do not commit yet without a separate user instruction.

Recommended baseline approach after user approval:

1. Manually review `.env.vercel.production` and decide whether it should be removed from tracking in a dedicated safe step.
2. Review `middleware.ts` deletion and root `ORCHESTRATOR*` deletions.
3. Review runtime-adjacent staged files as a baseline set.
4. Run full validation once more.
5. Commit a named repository baseline only after the review items are accepted.
