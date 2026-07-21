# Sprint 020G - Clean Supabase Project Rebuild And Cutover Blueprint

## Execution Phases

### Phase 1: Reconfirm Decisions And Current State

1. Reconfirm strict scope, dirty-worktree boundaries, completed 020F evidence, old project reference `tagnbgkroihagjmvehlx`, and the accepted no-preservation decisions.
2. Record that all old public rows, Auth users/identities/sessions/MFA, Storage buckets/objects, and seven remote-only surfaces are intentionally not migrated.
3. Confirm organization, project name, `ap-southeast-1` region, billing plan/cost, administrator, rollback owner, and maintenance owner. Stop until confirmed.
4. Verify old-project access remains read-only for this sprint except safe reference checks; no old-project mutation command may be selected.

### Phase 2: Repository Rebuild Readiness

1. Inventory and hash migrations `0001`-`0009`; validate lexical/numeric order and dependencies.
2. Compare migrations with generated bootstrap and runtime consumers.
3. Scan for destructive SQL, legacy remote-only object names, old project reference coupling, row/data assumptions, unsafe owners/search paths, missing RLS, broad grants, and non-determinism.
4. Review all eleven helper functions and every routine/view for `SECURITY DEFINER`, search path, owner, signature, use in RLS, and necessary caller roles.
5. Add the smallest new corrective migration after `0009` for security/reproducibility. Do not edit historical migrations silently.
6. Regenerate bootstrap through the existing script and verify it matches the migration chain.
7. Produce a new-project expected manifest: objects, policies, indexes, function signatures, grants, seed counts, and migration versions.
8. Run repository validators, scoring/recommendation fixtures, lint, TypeScript, production build, route safety, secret scans, and `git diff --check`.

### Phase 3: Create Separate Candidate Project

1. Use protected Supabase authentication and supported project-creation flow.
2. Present/record organization, region, plan, expected charge, and candidate name before the irreversible create action.
3. Create exactly one project. Capture only reference, display name, region, status, and creation timestamp.
4. Wait for healthy status using bounded checks; do not create a second project on delay/failure.
5. Configure a protected database credential through the supported operator flow; never expose it.
6. Confirm the candidate is empty of application-owned public objects and has only expected managed baseline/migration infrastructure.
7. Save a safe old/new identity map and rollback relink procedure.

### Phase 4: Apply Clean Migration Chain

1. Link to the new candidate only after exact equality confirmation.
2. Run migration dry-run/status/preflight where supported and confirm only expected versions are pending.
3. Apply migrations once in order through the supported CLI path.
4. Stop on the first error. Do not use repair or mark-applied workarounds.
5. Verify remote migration ledger contains exactly the applied repository versions/checksums supported by the CLI.
6. Verify repository-defined objects and deterministic seed/reference data against the manifest.
7. Verify the seven legacy surfaces are absent.

### Phase 5: Hosted Configuration And Security

1. Recreate only current required site URL, callbacks/redirects, Auth provider/email settings, exposed schemas, and platform configuration from protected current sources.
2. Preserve the accepted Free-plan/passwordless exception: leaked-password protection remains disabled, no paid upgrade is allowed, and any future password-authentication feature must reopen and resolve the control.
3. Rotate/create required project keys and server/provider secrets through protected channels.
4. Do not configure uploads/storage features beyond current application requirements; create no legacy buckets/objects.
5. Run security advisors and structural verification.
6. Fix only issues within repository/configuration scope approved by this sprint; any scope-expanding issue is a stop condition.
7. Record every advisor item as fixed, accepted with owner/reason, or blocking. No advisor error may be accepted for cutover.

### Phase 6: Synthetic Validation

1. Define minimal synthetic stable, user/profile, membership, horse assignment, biochemistry test, and optional note fixtures required by current workflows. No upload fixture.
2. Name the fixture owner, identifiers, purpose, creation time, and cleanup responsibility.
3. Create fresh synthetic Auth accounts through protected operator flows.
4. Validate current approved roles/permissions only; expanded definitive role matrix remains Sprint 021.
5. Prove permitted and denied Auth/RLS paths, including wrong-horse/cross-boundary cases supported by existing policies.
6. Validate mobile biochemistry capture/result persistence and exact lookup/scoring behavior.
7. Validate public gate, Auth callback, sign-in, protected redirects, portal, admin, operations, and failure states.
8. Clean up synthetic fixtures unless explicitly retained in a documented non-production-candidate testing namespace/account set.

### Phase 7: Cutover Readiness Review

1. Produce `planning/reviews/020G-cutover-and-rollback.md` with exact safe identifiers, environment scopes, maintenance window, secret owners, deployment/restart steps, smoke checklist, rollback triggers, and old-project retention.
2. Verify old project remains healthy and unchanged for rollback.
3. Verify new project is healthy, migration-complete, security-accepted, fixture-clean, and application-smoked.
4. Confirm no data migration/final delta is required because the user accepted a clean start.
5. Obtain operator confirmation of maintenance window, plan/cost, protected environment update readiness, and rollback owner before cutover.

### Phase 8: Controlled Cutover

1. Enter the agreed maintenance window while keeping the public under-construction gate active.
2. Update only the approved Supabase endpoint/public and server-side credentials in the required Vercel/environment scopes through protected configuration.
3. Redeploy/restart only if required to load the new configuration.
4. Confirm by safe hostname/reference that the application targets the new project.
5. Run immediate public safety, Auth, protected-route, portal/admin/operations, and biochemistry synthetic smoke.
6. On any rollback trigger, restore the old project environment references through the protected procedure, redeploy/restart if needed, and verify rollback. Do not modify either database to force acceptance.
7. If accepted, retain old project unchanged and record the future decommissioning gate.

### Phase 9: Closeout

1. Rerun structural verification, migration history, advisors, application tests, secret/staged-file scans, and `git diff --check`.
2. Record safe new-project reference and outcome without secrets.
3. Update all required docs/planning records.
4. Close accurately as cutover-complete, candidate-ready-but-not-cut-over, rolled-back, or blocked.

## New Corrective Migration Requirements

If required, a migration after `0009` may:

- revoke unintended function execution from `PUBLIC` and `anon`
- grant exact function signatures to `authenticated` only where current RLS/application behavior requires them
- correct security-definer search paths/owners within current repository-defined helpers
- normalize current repository-defined grants/policies needed for clean reproducibility

It must not:

- add the seven legacy surfaces
- invent the Sprint 021 expanded role matrix
- add production thresholds/recommendation content
- import old data
- create Storage/upload/provider architecture
- repair old migration history

## Migration Apply Gate

Before applying to the new candidate, Builder must record:

- exact new project reference and candidate classification
- empty application-schema proof
- reviewed migration hashes/order
- expected objects, policies, grants, seeds, and migration versions
- project health and recovery posture
- no command targets old project `tagnbgkroihagjmvehlx`
- exact apply command/path and post-apply verification

## Verification Requirements

At minimum verify:

- migration ledger contains every applied version once and no fabricated record
- 33 baseline repository tables plus reviewed post-0009 additions only
- 11 expected baseline helpers plus reviewed additions/changes
- every expected constraint/index/function/policy/grant/RLS state
- exact biochemistry lookup counts `151`, `521`, `801`, `301`; total `1,774`; zero duplicate keys
- seven legacy remote-only surfaces absent
- no legacy Auth users or Storage objects/buckets
- leaked-password protection remains disabled only under the recorded Free-plan/passwordless exception; the application has no password sign-in flow
- security-advisor errors zero and warnings dispositioned
- routine `PUBLIC`/`anon` execution limited to reviewed need
- application targets the new reference after cutover
- old project remains unchanged and available for rollback

## Rollback Requirements

Rollback changes application environment references back to the old project. It must not merge candidate data into the old project or mutate the old project.

Define triggers including:

- migration/structure mismatch
- Auth callback/login failure
- critical RLS denial/bypass
- application persistence failure
- missing required hosted configuration
- security-advisor error
- deployment/runtime failure
- inability to verify new-project identity

## Validation

At minimum run:

- Architect Pack provenance check
- migration hash/order/safety/reproducibility validator
- bootstrap regeneration and equivalence validator
- new-project target guard rejecting old project reference for mutating commands
- migration-history/object/RLS/policy/grant/seed verification
- security-advisor checks
- Auth/RLS/application synthetic smoke
- existing scoring/recommendation fixtures
- lint, TypeScript, production build, route safety
- secret-pattern, credential-state, generated-link, staged-file, and dirty-worktree checks
- JSON/status assertions
- `git diff --check`, allowing only existing line-ending warnings
