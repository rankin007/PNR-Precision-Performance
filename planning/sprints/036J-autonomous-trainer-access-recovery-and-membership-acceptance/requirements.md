# Sprint 036J - Autonomous Trainer Access Recovery And Membership Acceptance

## Outcome

Restore a stable, fully program-operated path from the authoritative retained synthetic trainer identity through active membership and permission data to a real Production server session, trainer portal and exact owned horse workspace. Correct the three misbound Vercel Production Supabase variables through a protected in-memory transaction, then consume them only in process memory. Do not ask a person to enter a service-role value, email code, password or other protected value.

Target outcome: `autonomous-trainer-access-live-accepted-clean`.

This is one consolidated recovery and release sprint. Deterministic harness, validator, session-cookie, reporting and in-scope auth/session corrections stay inside 036J. A supporting-tool failure does not create another micro-sprint when the same acceptance boundary can be proved by an equivalent or stronger safe method.

The retained Sprint 035K ledger identity is the sole authoritative synthetic trainer identity. The Production Auth population is classified in memory. Exactly one identity must match both the retained Auth ID and retained email hash; every other identity is excluded from acceptance and left unchanged. No ambiguous Auth identity is deleted in 036J. Its later disposition belongs to Sprint 036K.

## Workflow profile and Flight class

Use `strict`. Flight class is `critical` because this sprint crosses authentication, protected retrieval and replacement of three Production bindings, process-only service-role use, exact Production synthetic-data repair, a Production-target deployment, five live alias writes and an authenticated Production journey.

Critical controls attach to exact target/project/identity/row ownership, bounded mutation, non-disclosure, deterministic negative paths, one deployment, fixed alias sequencing, automatic rollback, fresh plan review and a separate post-build inspection. Strict means stronger boundaries and proof, not repeated human prompts or redundant ceremony.

## Canonical starting authority

Start only from `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical` at exact starting SHA `67f07c455f5ec3f12cbc1748ecec241ec764ef7e`. Resolve the current directory and `git rev-parse --show-toplevel`; both must normalize to that path before every Architect/Builder transition.

The starting branch is closed `codex/036I-diagnostic-guided-production-trainer-acceptance`. Create only `codex/036J-autonomous-trainer-access-recovery-and-membership-acceptance` in the canonical repository. Do not use a legacy clone, `C:\tmp` checkout/worktree, alternate history or deployment directory as implementation authority.

Known inherited uncommitted method/template changes under `.120x/`, `.agents/`, method templates and method-maintenance scripts belong to the user. Preserve them, exclude them from 036J edits/staging/commits, and prove the Product/runtime diff separately. Do not require a globally clean worktree when exact path classification and a clean scoped Product/runtime set provide stronger evidence.

Dry-run and apply this Pack, validate exactly four traversal-free destinations beneath one sprint folder, and reread all four generated files. Applied sprint files become Builder authority.

## Source authority

Use, in descending order:

1. `AGENTS.md`, the 120x Fly doctrine and the canonical-workspace guard.
2. These four applied Sprint 036J files.
3. Closed 036I, 036G and 035K records for the known rollback, exact five-alias set, retained ledger and exact-owned application graph.
4. Current source, especially `lib/supabase/env.ts`, `lib/supabase/admin.ts`, `lib/supabase/middleware.ts`, `lib/auth/bootstrap.ts`, `lib/auth/bootstrap-concurrency.ts`, `lib/auth/app-context.ts`, portal layouts/routes, and the 035K core/tests.
5. `docs/AUTH_RLS_PORTAL_ACCESS.md`, `docs/OPERATIONS_HANDOFF.md`, `planning/EVIDENCE_INDEX.md`, `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`, workflow and design authority.
6. Current official Vercel environment/deployment/alias documentation and Supabase Admin generate-link, token-hash verification and SSR-cookie documentation. Official documentation establishes mechanism only; fresh executable evidence establishes mutable state.

## Task contract

**objective:** Establish exactly one authoritative retained synthetic trainer identity, reconcile only its exact owned membership graph, and prove an autonomous authenticated Production portal/workspace journey through one governed candidate deployment, leaving corrected bindings and the candidate live only on complete success and otherwise restoring the original three bindings plus all five aliases when moved.

**owns:** Canonical/branch/source reconciliation; exact four-file Pack application; a privacy-safe deterministic 036J harness and tests; focused Supabase SSR middleware correction; one authenticated-CLI read of exact clean-project API keys into a redacting child process; one bounded three-variable Vercel Production binding transaction with automatic full compensation; process-only `vercel env run -e production` injection; in-memory classification of the Production Auth population; exact retained-ID/hash selection; exact-owned application-graph read/repair; programmatic Supabase Admin magic-link generation without email delivery; in-memory token-hash verification and cookie capture; authenticated and anonymous HTTP journey proof; one scoped checkpoint commit/push and direct-remote equality; one Production-target `--skip-domain` deployment; immutable-candidate safety; five fixed candidate alias assignments; fixed all-five alias rollback plus binding restoration on failure; final state/safety/privacy proof; proportional closeout records; and a scoped closeout commit/push.

**must_not:** Prompt for, display, persist, copy to a file, log or commit any secret, service-role value, anon key, URL token, token hash, access/refresh token, session cookie, raw email or protected response body; send an email or OTP; use a mailbox; accept a human code; use a Supabase Management operation except the single authenticated-CLI `projects api-keys --project-ref uvskssaecdhxcgytkasc --reveal --output json` read captured wholly in memory; change provider/SMTP/template/callback/rate-limit settings; enumerate/output raw identities; select an identity by position or guessed email; delete either ambiguous identity; modify non-owned rows; change schema, migrations, RLS, role/permission contracts, Storage, DNS, Vercel project settings, any Vercel environment variable other than the exact three Production Supabase bindings and their compensating restoration, Stripe/commerce or Sprint 029N; make a second deployment; move an unlisted alias; merge, open a PR, push `develop`, force-push or rewrite history; stage or commit inherited method changes.

**acceptance:** The current three Production bindings are classified as the prohibited old project without value exposure; exact clean-project keys are acquired in memory and validated; exactly three Production bindings reach the approved project as one compensated transaction; exact target/project/ledger guards then pass; the Auth population is exactly classified with one authoritative retained ID/hash match and all others excluded/unmodified; the retained synthetic graph is exactly eight owned application rows plus one Auth identity, active trainer membership and `horse.records.write`, with Storage and wrong-horse rows zero; missing exact-owned rows are repaired idempotently while conflicts fail before broad mutation; local focused tests and full Product checks pass; one exact checkpoint is on its direct remote; one exact-project Ready candidate initially leaves five/five rollback live; immutable smoke passes; five fixed assignments reach five/five candidate; a programmatically created in-memory session reaches `/portal`, the exact retained horse workspace and permitted workflow, while a generated non-owned horse and a signed-out/anonymous request are denied without identity leakage; final exact graph/routing/safety/privacy/residue checks pass and corrected bindings remain only on complete target success; or every other outcome restores all five aliases when moved and restores all three original Production bindings from the unchanged Development copy.

**verification:** Canonical/SHA/status/dirty-path classification; Pack target/parser/dry-run/application/readback; deterministic harness tests covering protected key parsing, stdin-only three-binding replacement, partial-write compensation, full restoration, selection, graph repair boundaries, wrong target/key, wrong horse, missing membership, cookie refresh and red controls; retained auth/roles/dashboard/public/static/JSON tests; TypeScript, zero-warning lint and Production build; installed CLI help/version; sanitized before/after Production binding projections; live classify/reconcile result counts; scoped Git status/commit/push/direct-remote equality; Vercel project/rollback/five-alias baseline; one deployment/source/Ready/post-deploy route proof; immutable/canonical smoke; per-step five-alias ledgers; autonomous session journey; final graph/routing/privacy/residue/diff proof; failure-path three-binding restoration; fresh critical inspection; closeout readback; and exactly one permitted final outcome.

## Identity, secrets and mutation boundary

Use `vercel env run -e production -- <command>` so `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` enter only the child process. The harness consumes standard variable names directly and must be noninteractive. It must never accept protected values as command-line arguments or emit them. Clear references, cookies and token material in `finally` blocks.

Read the retained ledger from `%TEMP%\pnr-035k-live-trainer-access-owned.json`. Require `state=retained`, `authOwnership=adopted`, exact project reference `uvskssaecdhxcgytkasc`, a retained Auth ID, retained email hash, all eight owned application IDs and complete membership/permission contract IDs. Output only finite statuses, booleans, counts, approved IDs already present in non-secret planning authority when necessary, and one-way hashes when the contract explicitly needs comparison. Never output a raw email.

Classify the current Auth population in memory. Require exactly one record matching both retained Auth ID and retained email hash. Report `identityCount`, `authoritativeCount=1` and `excludedCount`; do not report identity fields. A retained-ID/hash disagreement, duplicate authoritative match, missing authoritative match or unexpected target fails before application mutation.

Reconcile only exact ledger-owned rows. Read every expected row by exact primary/foreign ID. Insert/update only a missing or drifted exact-owned row whose ownership and relationships are proven by the ledger. Never reassign a non-owned row, overwrite a conflicting identity relationship, change contract tables, or repair by email/enumeration. Reread to require exact `application=8`, `auth=1`, `storage=0`, `wrongHorse=0`, active user/profile/trainer membership and `horse.records.write`.

## Production binding repair

The authorized repair affects exactly `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel `production`. Current sanitized proof classifies all three as the prohibited old project. Vercel `preview` has no complete set. Vercel `development` contains the unchanged original old-project set and is the compensation source only.

Acquire the approved project's keys once with installed authenticated Supabase CLI `2.109.1` using exact project `uvskssaecdhxcgytkasc`, `--reveal` and JSON output captured by a child process. Select exact `anon` and `service_role` entries by name/role, validate project/role locally where the format permits, and combine them with the fixed approved HTTPS origin. Never inherit the CLI output streams, print the JSON or pass a value in an argument.

Replace each of the three Vercel Production values as ordinary Vercel encrypted variables through stdin-only `vercel env add <name> production --force --yes`, capturing all child output. Do not use `--sensitive`: live execution proved that Vercel accepts that class but deliberately omits it from `vercel env run`, which breaks the required process-only injection. Standard environment variables remain encrypted at rest and become available only to the authorized child process. Build the full replacement plan before the first write. If any write or sanitized post-read fails, reapply all three prechange values held in memory and require a fresh all-three old-project projection. Partial repair without proven compensation is a material stop.

After a complete binding repair, run a fresh process-only projection and require all three values present and bound to the approved project before any Supabase graph call. On complete target success, retain the corrected Production bindings. On every pre-deployment failure, candidate/session failure, alias rollback or non-target close, restore all three original Production values from the unchanged Vercel Development set and prove the old-project projection without exposing values. Current immutable rollback behavior is unaffected by environment-setting edits because it was already built.

## Approved file set

Product/runtime/test implementation remains limited to:

- `middleware.ts` (new root session-refresh entrypoint);
- `lib/supabase/middleware.ts`;
- `scripts/autonomous-trainer-access-036J.mjs` (new);
- `scripts/test-autonomous-trainer-access-036J.mjs` (new);
- `lib/auth/app-context.ts`, `lib/auth/bootstrap.ts`, and `lib/auth/bootstrap-concurrency.ts` only if an executable 036J discriminating test demonstrates a deterministic defect inside the stated identity-to-render invariant.

Proportional closeout may update only the 036J sprint files plus `planning/STATUS.json`, `planning/STATE.md`, `planning/ROADMAP.md`, `planning/ARCHITECT_BRIEFING.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/SPRINT_SCHEDULE.md`, `planning/EVIDENCE_INDEX.md`, `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`, and directly relevant existing auth/operations documentation. Do not edit method/template changes inherited at start.

## Release and rollback boundary

Known rollback authority:

- deployment `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`;
- immutable target `pnr-precision-performance-qpd244v93-rankin007s-projects.vercel.app`;
- recorded source `3be6b6c3622150a3c2009ed8564795b14e3e6c2b`;
- exact Vercel project `prj_6To7czLpCEGL6fInkQwE4egePPpq`, `rankin007s-projects/pnr-precision-performance`.

The five and only stable aliases are apex, `www`, project alias, team-project alias and legacy-team alias listed in the blueprint. Begin release work only after the three corrected Production bindings are independently proven. Prove five/five rollback before deployment. Create exactly one Production-target candidate with current-help-confirmed `vercel deploy --prod --skip-domain --yes`. Immediately prove all five aliases still resolve to rollback. Any automatic movement or target ambiguity triggers fixed alias recovery, full three-binding restoration and no second deployment.

Assign candidate in low-to-high public importance order, rereading all five after each write. On any material failure after the first alias write, assign rollback in apex-to-outward order and reread all five after every write. Only complete target acceptance leaves five/five candidate live.

## Evidence-Proportional Execution Standard

Stop only for a material wrong/ambiguous target, unexpected protected-data exposure, identity/ownership conflict, unauthorized scope expansion, partial/failed Production mutation, failed security/privacy/integrity behavior, rollback uncertainty or cleanup that cannot be proven safe. Do not stop merely because an optional CLI path, browser driver, clipboard mechanism, renderer or reporter is unavailable.

Use an equivalent or stronger safe proof when a preferred supporting tool fails. Keep deterministic harness, validator, credential-injection, formatting, encoding, reporter, session-cookie and other non-product corrections inside 036J. Diagnose a failure once, choose the safest effective alternate path and continue. Manual intervention is the last safe option and must include the exact blocked fact, evidence checked, exact action, steps and post-action verification.
