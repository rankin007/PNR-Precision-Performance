# Sprint 034G Blueprint - Product and Database Integration

## Implementation design

### 1. Establish immutable source and safety invariants

- Recheck canonical cwd/Git root, branch, base and excluded untracked state before each mutation phase.
- Enumerate the base-to-continuity delta only for the approved source roots and named files. Reject absolute paths, traversal, case-collisions, unapproved destinations and any attempt to read protected environment material.
- Record source commit, Git object identity and SHA-256 for materialised blobs; record exact deleted paths without reading excluded live environment content.
- The governing invariant is: Product code, schema and migrations form one internally coherent fail-closed continuity snapshot, while no remote/provider/Production state changes.

### 2. Materialise Product and database atomically

- Apply immutable continuity additions, modifications, renames and deletions under the five approved source roots.
- Include SQL tests and verification queries under `supabase/` because they directly support migration/RLS proof; do not import the broader historical JavaScript/PowerShell test corpus.
- Materialise the coupled root/runtime files and accepted design/messaging authority.
- Do not cherry-pick, merge or replay the continuity branch wholesale.

### 3. Reconcile dependencies without importing stale commands

- Use the continuity dependency/devDependency versions and matching lock graph, including `server-only`, current `nodemailer` typings/runtime and the local Supabase CLI dependency.
- Retain application scripts `dev`, `build`, `start`, `lint` and `db:bundle`; add `typecheck` and `test:product-database-034G` only.
- The focused verifier must establish that every package imported by Product code resolves from the manifest or Node built-ins and that package/lock root dependency metadata agrees.
- Do not create placeholder commands for deferred 034H scripts.

### 4. Prove critical boundaries

- Verify migration filenames are unique, ordered and exactly match the accepted continuity ledger from `0001` through `0025`; prove the old-main conflicting `0008`-`0016` variants are absent.
- Exercise or structurally prove negative cases for anonymous initial-admin claim, malformed/ambiguous role data, managed read-only roles, unauthorized biochemistry comment mutation, evidence upload ownership/storage boundaries, public enquiry admission/retention and internal reconciliation authentication.
- Run `typecheck`, lint and a production build with non-secret placeholder environment inputs only if required for compilation. Do not contact providers.
- Attempt local Supabase/database execution safely. If the daemon/runtime is unavailable, combine exact migration hashes, SQL parser/ledger assertions, policy/function contract assertions and existing SQL verification queries as substitute evidence; record the substitution.
- Review representative public, authentication, portal, operations and administrator routes for render success, console/server failures, navigation isolation, responsive layout and copy alignment with the design authority.

### 5. Close proportionally

- A fresh context that did not implement the slice inspects the full diff, manifest, critical negative cases, check output and UI evidence against every acceptance criterion.
- Resolve only bounded in-scope findings, rerun affected checks and repeat inspection as required.
- After PASS, update current planning/roadmap/briefing/review/status records, mark 034G done, leave 034H and 034I planned, keep Production readiness unaccepted and Product Done false.

## Flight evidence

1. **Class and reason:** `critical`; authentication, role/RLS enforcement, migrations, sensitive horse/biochemistry information, public enquiries and commerce coexist in the changed runtime.
2. **Acceptance invariant at risk:** an authenticated user can reach only the data/actions permitted by one unambiguous role matrix, and schema/runtime remain coherent without any remote mutation.
3. **Affected layers and verified paths/symbols:** Next routes and middleware; Supabase clients/session/bootstrap; `role-matrix`, managed-access adapters, evidence/enquiry/commerce contracts; migrations `0001`-`0025`; RLS policies/functions/storage; package and runtime config.
4. **Source, transformations and sink:** exact base `fcbe38d...`; immutable continuity tree `3dce7add...`; exact tree materialisation plus one bounded package-script adaptation and one current verifier/manifest; sink is the fresh 034G branch only.
5. **Discriminating examples:** anonymous or unauthenticated admin claim/reconciliation fails while the correct authenticated path is structurally permitted; managed veterinarian/stable-hand access reads allowed data while mutations fail; the accepted migration ledger passes while any old-main conflict, omission, duplicate or reordering fails.
6. **Durable verification source:** Git object/SHA manifest, focused test output, type/lint/build output, local SQL execution or documented equivalent proof, route/UI review and final diff.
7. **Known uncertainty:** Docker daemon availability may prevent local Supabase execution. It is a supporting-tool uncertainty, not permission to weaken migration/RLS proof or access a remote database.
