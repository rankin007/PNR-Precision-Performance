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
