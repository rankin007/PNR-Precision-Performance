# Architect Pack - Sprint 036J Autonomous Trainer Access Recovery And Membership Acceptance

============================================================
FILE: planning/sprints/036J-autonomous-trainer-access-recovery-and-membership-acceptance/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/036J-autonomous-trainer-access-recovery-and-membership-acceptance/blueprint.md
============================================================

# Sprint 036J Blueprint

## Delivery sequence

1. Reconfirm canonical root, exact starting SHA, branch, worktree registrations and inherited dirty-path classification.
2. Validate/dry-run/apply the Pack; prove exactly four generated files under the 036J folder and reread them.
3. Create the 036J branch without disturbing inherited method changes.
4. Reconcile the approved source and existing tests; propose the exact implementation/check plan with assertion accounting and no edits.
5. Obtain a fresh critical Architect review of that plan. A pass is the implementation handoff; fix/ask follows the Fly decision loop with at most three decisions.
6. Implement the root Supabase session-refresh middleware, autonomous harness, protected three-binding transaction and discriminating tests within the approved file set.
7. Run the focused deterministic suite, retained regressions, TypeScript, zero-warning lint and Production build. Correct in-scope deterministic defects without splitting the sprint.
8. Capture the exact clean-project API keys in memory, replace only the three Production Supabase bindings through stdin with automatic all-three compensation, and independently prove all three now target the approved project.
9. Run the live harness through process-only Production environment injection in classify/reconcile mode. Require one authoritative retained identity and exact `8/1/0/0` post-state.
10. Create/push one scoped 036J checkpoint excluding inherited method changes; prove direct-remote equality and a clean Product/runtime scoped diff.
11. Reconcile current Vercel help, exact linked project, exact Ready rollback and independent five/five rollback baseline.
12. Create exactly one Production-target `--skip-domain` candidate; prove exact project/source/Ready and immediate five/five rollback.
13. Smoke the immutable candidate, then assign exactly five aliases in fixed order with complete rereads to five/five candidate.
14. Run the autonomous session journey through the canonical origin: exact trainer portal, exact horse workspace and permitted workflow pass; wrong horse and anonymous/signed-out access fail safely.
15. Rerun exact bindings, graph, five/five candidate, canonical safety, privacy/residue and scoped-diff proof.
16. If any target boundary fails, restore all three original Production bindings; if cutover began, also perform fixed all-five alias rollback with a full reread after every assignment and prove five/five exact Ready rollback.
17. Run a separate fresh critical inspection against the applied sprint, implementation diff and real evidence. Follow pass/fix/ask for at most three decisions.
18. Close one permitted outcome, refresh proportional records, create/push only the scoped closeout commit, and reread final state/status/briefing/acceptance.

## Autonomous harness contract

`scripts/autonomous-trainer-access-036J.mjs` is a noninteractive command with explicit modes and dependency-injected units for deterministic tests. It consumes environment variables from the process only, reads the retained ledger, uses bounded Supabase clients and prints a single sanitized JSON result. Any caught error maps to an allowlisted finite failure code; raw exception/provider content is not printed.

Required live modes:

- `repair-production-bindings`: require the current injected three-value set to classify as the prohibited old project, capture exact approved-project keys through the authenticated Supabase CLI, replace exactly three Vercel Production values via stdin, and automatically restore the full old set on any partial failure.
- `binding-status`: make no remote application-data call; classify the injected URL/anon/service set as `approved`, `prohibited`, `incomplete` or `refused` and output only finite booleans/classes.
- `restore-production-bindings`: require an injected complete prohibited old-project set (normally Vercel Development), reapply exactly those three values to Vercel Production via stdin, and prove command completion without outputting values.
- `classify-reconcile`: validate target and ledger, classify the Auth population in memory, select the exact retained ID/hash, reconcile only exact-owned application rows, and verify the final graph.
- `session-proof`: revalidate exact graph; use Admin `generateLink` for the exact retained user without delivery; keep the token hash in memory; use the anon SSR client and in-memory `getAll`/`setAll` cookie adapter to call `verifyOtp`; send only the resulting Cookie header to canonical protected routes; prove correct and negative journeys; sign out/clear cookies and prove protection is restored.
- `verify`: read-only exact final graph and sanitized counts for final/rollback evidence.

Do not write an env export, session file, cookie jar, response body, screenshot or protected evidence file. A bounded sanitized result may be captured by the execution log. Clear all sensitive references on success and failure.

The deterministic test harness must model protected CLI/Vercel binding adapters plus Supabase/Auth/HTTP adapters and prove that protected values never enter stdout/stderr/result objects. It must make missing/duplicate/mismatched clean-project keys, secret-bearing child output, partial Vercel write, failed compensation, plausible wrong identity mapping, missing membership, stale cookie/missing middleware, non-owned row collision and wrong-horse grant go red.

## Supabase SSR middleware

Create root `middleware.ts` that delegates to `updateSupabaseSession` for request-time Supabase cookie refresh. Use a narrow matcher that excludes Next static/image assets and ordinary static metadata while covering public navigation and protected portal routes. Preserve the existing under-construction/public behavior and redirects. Do not add authorization logic to middleware; `lib/auth/app-context.ts` remains the server authorization source.

`lib/supabase/middleware.ts` may be corrected for current `@supabase/ssr` cookie semantics, safe public fallback and private/no-store response behavior as required by tests. It must not leak session values or turn provider failure into public 500 output.

## Local verification commands

Reconcile actual package scripts first, then run at minimum:

```text
node scripts/test-autonomous-trainer-access-036J.mjs
node scripts/test-live-trainer-access-035K.mjs
npm run test:auth
npm run test:roles
npm run test:dashboard
npm run test:public
npm run typecheck
npm run lint -- --max-warnings=0
npm run build
git diff --check
```

If named aggregate scripts differ, run their exact maintained constituent commands and record a one-for-one mapping. Include existing JSON/static/Supabase-self controls used by the closed auth sprints. A missing optional driver is not a blocker because the harness's real SSR cookie plus HTTP path is the executable browser-equivalent boundary.

## Live process flow

Use current installed CLI help to confirm semantics. The intended protected invocation is:

```text
vercel env run -e production -- node scripts/autonomous-trainer-access-036J.mjs repair-production-bindings
vercel env run -e production -- node scripts/autonomous-trainer-access-036J.mjs binding-status
vercel env run -e production -- node scripts/autonomous-trainer-access-036J.mjs classify-reconcile
```

After five/five candidate cutover:

```text
vercel env run -e production -- node scripts/autonomous-trainer-access-036J.mjs session-proof --origin https://precisionperformance.com.au
```

Final read-only proof uses `verify`. Commands must not echo environment values. Report only allowlisted sanitized result fields.

Every non-target outcome restores the old bindings with:

```text
vercel env run -e development -- node scripts/autonomous-trainer-access-036J.mjs restore-production-bindings
vercel env run -e production -- node scripts/autonomous-trainer-access-036J.mjs binding-status
```

The final status must classify `approved` only for complete target success and `prohibited` for every restored non-target outcome.

## Five-alias ledger

Exact affected set:

1. `precisionperformance.com.au`
2. `www.precisionperformance.com.au`
3. `pnr-precision-performance.vercel.app`
4. `pnr-precision-performance-rankin007s-projects.vercel.app`
5. `pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`

Candidate order:

1. legacy-team alias
2. team-project alias
3. project alias
4. `www`
5. apex

Rollback order:

1. apex
2. `www`
3. project alias
4. team-project alias
5. legacy-team alias

Resolve each alias independently after every write and require the expected candidate/rollback count (`1/4` through `5/0` or rollback `1/4` through `5/0`) with no third deployment. Deployment alias lists are corroborating only.

## Flight evidence

### 1. Flight class

`critical`: authentication, a service-role child process, exact Production synthetic membership repair, real session cookies, one Production deployment and five live alias mutations are in scope.

### 2. Deep invariant

Exact retained Auth ID plus retained email hash -> one active application user -> one active profile -> one active trainer membership -> `horse.records.write` -> exact retained stable/horse/assignment -> valid SSR cookie session -> rendered trainer portal/workspace. Every other Auth identity is excluded. A generated non-owned horse and anonymous/signed-out access are denied without identity leakage.

### 3. Layers and symbols traced

- Authenticated Supabase CLI exact-project key read -> redacting in-memory parser -> stdin-only Vercel Production binding transaction -> `vercel env run` child environment.
- Retained 035K ledger -> exact Auth/application IDs and contract IDs.
- Supabase Admin Auth -> exact user lookup, population classification and `generateLink`.
- Public application tables -> user/profile/membership/stable/trainer/horse/assignment/permission rows.
- Supabase anon SSR client -> token-hash `verifyOtp`, in-memory `getAll`/`setAll` cookies.
- root `middleware.ts` -> `lib/supabase/middleware.ts` cookie refresh.
- `lib/auth/app-context.ts` and bootstrap helpers -> portal membership, permission and row access.
- portal layout/dashboard/horse routes -> rendered positive and identity-free negative sinks.
- Vercel deployment and exact five aliases -> immutable candidate and canonical live origin.

### 4. Source of truth, transformations and sink

The exact approved project reference is binding truth; the authenticated CLI supplies current keys only inside the redacting transaction; the retained ledger is identity/ownership truth; current Supabase exact-ID reads are mutable state truth; membership/permission contracts transform the retained identity into portal capability; Admin link generation plus anon verification transforms it into an SSR cookie session; server app context and RLS transform the session into bounded page data; HTTP status/redirect and finite content markers are the evidence sink. Raw secrets, identities and bodies are not evidence.

### 5. Discriminating examples and probes

- The retained identity maps to exactly eight application rows, one Auth row, active trainer membership and write permission; either ambiguous identity maps to zero accepted graph and cannot be selected.
- Active membership reaches `/portal`; missing/inactive membership redirects or denies. A test that always returns 200 is invalid.
- The exact retained horse workspace renders; a freshly generated non-owned UUID is denied with no name, ID, state or count disclosure.
- Missing/wrong service key, wrong project reference or ledger mismatch fails before remote mutation; valid process injection proceeds without a prompt.
- A complete prohibited old-project binding set is replaced with exactly three approved-project values; a second-write failure restores all three old values, while a naive partial updater leaves a mixed set and fails the red control.
- A valid SSR cookie reaches protected content; a stale/cleared cookie and the pre-fix missing middleware path fail the session-stability probe.
- An exact-owned missing row can be restored idempotently; a non-owned collision or relationship mismatch fails without reassignment.

### 6. Durable Git/source evidence

Starting Git authority is SHA `67f07c455f5ec3f12cbc1748ecec241ec764ef7e` on the closed 036I branch. Inherited dirty method/template changes are classified and excluded. `.vercel/project.json` identifies the exact project. Vercel Production contains the three required variable names as encrypted values. The retained ledger is `retained`, `adopted`, exact-project and contains nine owned IDs plus complete contract IDs. The checkpoint/direct-remote SHA and post-build Product/runtime diff become release provenance.

### 7. Remaining uncertainties at Pack creation

The first protected execution proved all three Production bindings target the prohibited old project; Preview has no complete set and Development retains the old set for compensation. The exact current clean-project graph state and safe classification of the two non-authoritative Auth identities have not yet been queried; 036J performs that classification only after binding repair and never deletes them. The generated-link/SSR-cookie journey has not yet run against the candidate. No uncertainty permits partial binding state, guessed identity selection, broad repair or secret output.

## Outcome and repair limits

Target success is `autonomous-trainer-access-live-accepted-clean` with approved bindings retained and five/five candidate live. Before alias mutation, a material protected preflight conflict closes `autonomous-trainer-access-preflight-blocked-clean` only after all three old bindings are restored and five/five rollback remains unchanged. After alias mutation, any unrepaired failure closes `autonomous-trainer-access-rolled-back-clean` only after all-three binding restoration, five/five alias rollback and safety proof.

At most two focused implementation/verification repair cycles occur before the fresh final inspection. A repair may correct an approved harness/session/auth file but may not broaden identity, data, deployment or alias scope. Rollback itself is not optional and does not count as a repair cycle.

============================================================
FILE: planning/sprints/036J-autonomous-trainer-access-recovery-and-membership-acceptance/acceptance.md
============================================================

# Sprint 036J Acceptance

## Pack, source and plan

- [ ] Canonical current directory and Git top-level are exact at Architect/Builder transitions.
- [ ] Starting SHA is exact; inherited method/template changes are preserved and excluded.
- [ ] Pack parser proves exactly four traversal-free destinations under one 036J folder; dry-run, apply and full readback pass.
- [ ] Only the 036J branch is created; no legacy checkout/worktree or alternate authority is used.
- [ ] Builder proposes an exact no-edit implementation/check plan with assertion accounting.
- [ ] A genuinely fresh critical Architect context passes that plan within at most three decisions.

## Deterministic implementation

- [ ] Approved changed files remain within requirements.
- [ ] Root middleware performs Supabase SSR cookie refresh without duplicating authorization or changing public behavior.
- [ ] The autonomous harness is noninteractive and has binding-status, repair/restore-production-bindings, classify-reconcile, session-proof and verify behavior.
- [ ] Tests prove exact retained selection and reject guessed/positional/ambiguous selection.
- [ ] Tests prove exact-owned idempotent repair and reject non-owned collisions/relationship mismatches.
- [ ] Tests prove active membership/write permission, correct-horse success, wrong-horse denial, anonymous/sign-out denial and session-cookie stability.
- [ ] Wrong/missing env, target or ledger fails before protected query/mutation and never prompts.
- [ ] Red controls fail under plausible wrong identity, missing membership, absent cookie refresh and wrong-horse grant.
- [ ] Secret/email/token/cookie/body non-disclosure assertions pass for stdout, stderr and result objects.

## Local Product gates

- [ ] Focused 036J and retained 035K/auth/role/dashboard/public/static/JSON/Supabase-self checks pass with recorded assertion counts.
- [ ] TypeScript passes.
- [ ] Lint passes with zero warnings.
- [ ] Production build passes.
- [ ] `git diff --check`, JSON and encoding controls pass.
- [ ] Product/runtime scope contains no unexplained change.

## Protected classify and reconcile

- [ ] Sanitized prechange projection proves all three Production bindings are present and target only the prohibited old project.
- [ ] Exact approved-project API keys are captured once in memory through the authenticated CLI; no child output/value reaches evidence.
- [ ] Exactly three Vercel Production bindings are replaced through stdin and a fresh projection classifies all three as approved.
- [ ] The writer omits non-injectable `--sensitive`; tests and live post-read prove the resulting encrypted values are available to `vercel env run` without value exposure.
- [ ] Deterministic tests prove complete planning, stdin-only writes, partial-write compensation, all-three restoration and secret-output refusal.
- [ ] Any partial/failed binding repair restores all three original values and proves the prohibited projection before close.
- [ ] Required Production variable names are available through process-only injection; no value is printed or written.
- [ ] Ledger state/ownership/project/IDs/contracts are exact.
- [ ] Current Auth population count is reported without raw identities.
- [ ] Exactly one record matches retained Auth ID plus email hash; every other record is excluded and unmodified.
- [ ] Final retained graph is exact `application=8`, `auth=1`, `storage=0`, `wrongHorse=0`.
- [ ] User/profile/trainer membership are active and `horse.records.write` is effective.
- [ ] Every repair is exact-ledger-owned and idempotent; conflicts stop without broad mutation.
- [ ] Protected references and process residue are cleared after execution.

## Git and deployment

- [ ] Only scoped 036J files enter the checkpoint commit; inherited method changes remain unstaged.
- [ ] Checkpoint is pushed only to the 036J branch and local/direct-remote equality passes.
- [ ] Exact Vercel project and Ready rollback are freshly proven.
- [ ] Baseline independently proves all five accepted aliases on rollback and no extra affected alias.
- [ ] Exactly one Production-target `--skip-domain` candidate is created from the checkpoint.
- [ ] Candidate is exact-project, source-proven and Ready.
- [ ] Immediate post-deploy resolution proves all five aliases remained on rollback.
- [ ] Immutable candidate public/protected/API/disabled-commerce safety passes.

## Cutover and autonomous session

- [ ] Exactly five candidate assignments occur in fixed low-to-high order.
- [ ] Complete rereads prove `1/4`, `2/3`, `3/2`, `4/1`, `5/0` with no third deployment.
- [ ] Canonical cache-busted safety passes at five/five candidate.
- [ ] Admin link generation targets only the exact retained identity and sends no email.
- [ ] Token hash and SSR cookies remain in memory and out of logs/evidence.
- [ ] Programmatic verification yields a real authenticated server session.
- [ ] `/portal` renders the retained trainer dashboard without redirect loop/bootstrap collision.
- [ ] The exact retained horse workspace and existing permitted workflow render.
- [ ] A generated non-owned horse is denied without identity/existence/state/count leakage.
- [ ] Sign-out clears the session and anonymous protected access is denied.

## Final success or rollback

- [ ] Complete target success retains all three corrected approved-project Production bindings.
- [ ] Final read-only graph verification remains exact and idempotent.
- [ ] Final independent routing is five/five candidate for target success.
- [ ] Final canonical public/protected/API/disabled-commerce safety passes.
- [ ] No ambiguous identity is selected, modified or deleted.
- [ ] No Management operation beyond the one exact key read and no provider/SMTP/template/rate-limit/schema/RLS/contract/Storage/DNS/commerce/029N mutation occurs.
- [ ] Secret/private-data/residue scans pass without printing protected material.
- [ ] On any material post-cutover failure, exactly five rollback assignments occur in fixed order with full rereads after every step.
- [ ] A rollback outcome proves five/five exact Ready rollback and canonical safety before close.
- [ ] Every non-target outcome restores all three original Production bindings from the unchanged Development copy and proves the prohibited projection.

## Inspection and closeout

- [ ] A new fresh critical inspector, distinct from the plan reviewer, checks applied sprint, diff, tests, live evidence, routing and privacy boundaries.
- [ ] Inspection reaches pass within at most three decisions; any fix is scoped and reverified.
- [ ] Proportional state/status/roadmap/lifecycle/schedule/evidence/briefing/auth-operations records reflect the exact outcome.
- [ ] Closeout commit/push contains only scoped 036J records and direct-remote equality passes.
- [ ] Final readback of acceptance, state, status and briefing is coherent.
- [ ] Exactly one final outcome is recorded: target accepted, preflight blocked clean, or rolled back clean.
- [ ] Sprint 029N is released for separate execution only by target success; Sprint 036K remains the pre-launch credential/ambiguous-identity obligation.

============================================================
FILE: planning/sprints/036J-autonomous-trainer-access-recovery-and-membership-acceptance/handoff-prompt.md
============================================================

You are Builder for Sprint 036J - Autonomous Trainer Access Recovery And Membership Acceptance.

Start only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical` from exact SHA `67f07c455f5ec3f12cbc1748ecec241ec764ef7e`. Resolve current directory and Git top-level; both must normalize to the canonical path. Preserve and exclude the inherited dirty method/template changes described in requirements. Dry-run/apply the Architect Pack, prove exactly four traversal-free generated files under one sprint folder, reread them, then create only `codex/036J-autonomous-trainer-access-recovery-and-membership-acceptance`.

The task contract is:

**objective:** Establish exactly one authoritative retained synthetic trainer identity, reconcile only its exact owned membership graph, and prove an autonomous authenticated Production portal/workspace journey through one governed candidate deployment, leaving corrected bindings and the candidate live only on complete success and otherwise restoring the original three bindings plus all five aliases when moved.

**owns:** Canonical/branch/source proof; autonomous harness/tests; focused SSR middleware; one redacted exact-project API-key read; exact three-variable Production binding transaction and full compensation; process-only Production env injection; in-memory Auth classification; exact retained-ID/hash selection and exact-owned graph repair; generated-link/token-hash/cookie session proof; one scoped checkpoint commit/push; one skip-domain candidate; five fixed candidate aliases; automatic all-five alias rollback plus binding restoration; final proof, fresh inspection, proportional closeout and scoped closeout push.

**must_not:** Prompt for/display/persist secrets, raw identities, email, tokens, cookies or bodies; send email/OTP or use a mailbox/human code; use any Management operation except the one exact captured API-key read; guess/select identity by position; delete ambiguous identities; change non-owned data, schema/RLS/contracts/Storage/provider/Vercel project settings, any Vercel env value outside the exact three Production bindings/compensation, DNS/commerce/029N; create a second deployment; move other aliases; stage inherited method changes; merge/PR/develop/force-push/rewrite.

**acceptance:** Exactly three Production bindings move from the prohibited old project to the approved project through one compensated transaction; one exact retained ID/hash is authoritative and every other Auth identity is excluded/unmodified; exact owned graph reaches `8/1/0/0`, active trainer membership and write permission; deterministic/full Product gates pass; one source-proven candidate reaches five/five live only after immutable safety; an in-memory real session renders portal/exact horse/workflow while wrong horse and anonymous access are denied; final bindings/graph/routing/privacy/residue checks pass, or fixed compensation restores all three old bindings and, when moved, five/five exact Ready alias rollback.

**verification:** Pack/canonical/source/diff controls; discriminating binding/harness assertions and retained regressions; TypeScript/lint/build; sanitized binding before/after/compensation projections; process-only classify/reconcile; scoped Git/direct-remote proof; exact Vercel project/rollback/five-alias baseline; one deployment and immutable smoke; per-step cutover/rollback ledgers; live programmatic session journey; final bindings/graph/safety/privacy/residue; separate fresh critical inspection; closeout/readback.

Before editing, read all four applied files and relevant authority, inspect current approved source/tests, and return an exact implementation/check plan. Include exact files, symbols, deterministic assertion accounting, live command sequence, secret-output controls, rollback triggers and changed-file ceiling. Make no edits during this planning pass. A fresh critical Architect review will return pass, fix or ask; a pass hands the exact reviewed plan back for implementation without another human gate.

Implement only the passed amended plan. Extend the existing autonomous harness/tests for the exact three-binding transaction without adding an implementation file. Capture the exact clean-project key JSON and all Vercel child output in memory, select only named anon/service-role keys, use stdin-only ordinary encrypted Vercel writes without `--sensitive`, prove fresh `vercel env run` injection, compensate all three values after any partial failure, and expose only finite classifications. Keep authorization in server app context. The harness must then use process-only standard env names, the exact retained ledger, exact ID/hash selection, exact-owned idempotent repair, sanitized finite JSON and `finally` cleanup. It must generate a link without delivery, verify the token hash through an anon SSR cookie adapter, call real protected routes, prove exact horse access and negative paths, then sign out and prove denial.

Run focused and full local checks. Keep in-scope harness/session/validator corrections inside 036J. Use equivalent or stronger safe evidence if an optional tool is unavailable. Stop only for a material target, privacy, ownership, integrity, partial Production mutation, rollback or cleanup boundary. Do not turn an optional browser/CLI limitation into a new sprint or manual prompt.

Run `repair-production-bindings`, `binding-status`, `classify-reconcile` and final `verify` only through the environment-specific process envelopes in the blueprint. Never place a protected value on the command line or disk. Require an approved all-three binding projection before the first clean-project call. Preserve the two non-authoritative identities unchanged. Require exact target, ledger and one retained ID/hash match before data mutation.

Commit/push only scoped 036J files and prove direct-remote equality. Freshly prove the exact Vercel project, Ready rollback and five/five rollback. Make one `--prod --skip-domain` deployment, require Ready/source/exact-project and prove aliases did not move. Smoke the immutable candidate. Assign exactly the five listed aliases in candidate order with a complete reread after each step.

At five/five candidate, run `session-proof` through canonical HTTPS. Success requires real session, portal, exact retained horse/workflow, wrong-horse denial, sign-out and anonymous denial. On any non-target failure, restore all three original Production bindings from the unchanged Development copy. If cutover began, first assign the exact rollback target to all five aliases in fixed rollback order, rereading all five after every write, then restore/verify bindings. Do not make a second deployment or broader repair.

After implementation and real checks, provide the applied sprint, scoped diff, assertion counts, sanitized live results, deployment/routing ledger, mutation counts and privacy/residue proof to a new fresh critical inspector distinct from the plan reviewer. Follow pass/fix/ask for at most three decisions. Only a pass permits closeout.

Close one permitted outcome, refresh proportional records and create/push only the scoped closeout commit. Final readback must make the authoritative identity rule, exact graph, session journey, candidate/rollback state, ambiguous-identity preservation and Sprint 036K obligation unambiguous. Do not start 029N or 036K in this flight.
