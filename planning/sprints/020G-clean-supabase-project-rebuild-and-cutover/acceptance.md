# Sprint 020G - Clean Supabase Project Rebuild And Cutover Acceptance

## User Decisions And Safety

- [ ] Accepted clean-start decisions are recorded: no legacy public rows, Auth users, Storage, or seven remote-only surfaces are migrated.
- [ ] Organization, project name, region, plan/cost, administrator, maintenance owner, and rollback owner are confirmed before creation.
- [ ] Old project `tagnbgkroihagjmvehlx` is explicitly protected from mutation and retained for rollback.
- [ ] No credential, secret, connection URI, Auth/Storage payload, environment value, or CLI state is exposed or retained.

## Repository Readiness

- [ ] Migrations `0001`-`0009` are hashed, ordered, dependency-reviewed, deterministic on an empty project, and free of legacy-surface/data assumptions.
- [ ] Bootstrap is regenerated from and agrees with the reviewed migration chain.
- [ ] Every current helper's owner, security-definer status, search path, signature, policy use, and execute grants are reviewed.
- [ ] Unintended `PUBLIC`/`anon` routine execution is removed through a new reviewed migration while required authenticated behavior remains valid.
- [ ] Expected object/migration/seed/security manifest is complete.
- [ ] Repository validators, fixtures, lint, TypeScript, build, route safety, secret scans, and diff checks pass.

## New Project

- [ ] Exactly one separate project is created in the confirmed organization, `ap-southeast-1` region unless explicitly changed, and confirmed plan.
- [ ] Safe new reference/name/region/status are recorded; credentials remain protected.
- [ ] Candidate starts without application-owned legacy structure/data.
- [ ] Repository links to the exact new reference only after identity confirmation.
- [ ] Safe rollback relink/reference procedure to the old project is validated.

## Clean Migration And Structure

- [ ] Migrations apply once in order to the empty candidate without repair, replay, fabricated history, or bootstrap double-application.
- [ ] Remote migration ledger truthfully contains the applied repository versions.
- [ ] Expected tables, functions, constraints, indexes, RLS, policies, grants, extensions, and seed/reference data match the manifest.
- [ ] Biochemistry lookup counts and uniqueness match `151/521/801/301`, total `1,774`, duplicates `0`.
- [ ] All seven legacy remote-only surfaces are absent.
- [ ] No old public/Auth/Storage data is imported.

## Hosted Configuration And Security

- [ ] Only current required Auth/project configuration is recreated from protected sources.
- [ ] Required secrets are rotated/re-entered through protected channels and not copied into artifacts.
- [ ] Leaked-password protection remains disabled only under the approved Free-plan/passwordless exception jointly owned by Randell Rankin and Philip Rankin; no password sign-in flow exists, and any future password-authentication feature must reopen and resolve the control before implementation.
- [ ] Security-advisor errors are zero; every warning is fixed, explicitly accepted with owner/reason, or blocks cutover.
- [ ] Current security-definer routines have fixed safe search paths and minimum justified execution grants.
- [ ] No legacy eTrakka/client-application security finding exists because legacy surfaces are absent.

## Synthetic Application Validation

- [ ] Synthetic-only Auth/application fixtures have named owner, identifiers, purpose, and cleanup.
- [ ] Current approved Auth/RLS permitted and denied cases pass without inventing the Sprint 021 role matrix.
- [ ] Mobile biochemistry capture/result persistence and exact scoring fixtures pass.
- [ ] Public under-construction gate, callback/sign-in, protected redirects, portal, admin, operations, and failure states pass.
- [ ] Synthetic fixtures are removed or explicitly retained under a documented testing policy before cutover acceptance.

## Cutover And Rollback

- [ ] Cutover/rollback document identifies old/new references, maintenance window, environment scopes, secret owners, deployment/restart steps, smoke tests, triggers, time limit, and old-project retention.
- [ ] Operator confirms cutover window and rollback readiness after all pre-cutover checks pass.
- [ ] Only approved Supabase environment targets/secrets are changed through protected Vercel/environment configuration.
- [ ] Application is redeployed/restarted only as required and safely proves the new project reference.
- [ ] Immediate smoke passes, or rollback restores the old reference and verifies service.
- [ ] Old project remains unchanged and is not deleted, reset, paused, repaired, or decommissioned.
- [ ] Public under-construction gate remains active.

## Closeout

Closeout classification: **candidate-ready**.

Completed basis: migrations 0001-0010, Gate A, database structure, RLS enablement, policies, helpers, lookup data, managed-data baselines, hosted configuration, advisor disposition, and credential-incident containment.

Explicitly not completed: synthetic Auth/RLS, candidate-connected application runtime, Auth identities, application fixtures, production cutover, Vercel/environment change, deployment, or cutover smoke. These unchecked original acceptance items remain historical evidence of unperformed scope and must not be interpreted as failures of the narrower candidate-ready outcome. Authenticated testing transfers to Sprint 021 discovery.

- [x] `docs/SUPABASE_CLEAN_REBUILD_020G.md` records sanitized build, migration, configuration, validation, cutover, rollback, and outcome evidence.
- [x] New-project manifest, security disposition, and cutover/rollback reviews are complete.
- [x] Planning records accurately classify the outcome and future old-project decommissioning gate.
- [x] No old-project mutation, legacy-data import, public reopening, Stripe/DNS/product-feature change, commit, push, or PR occurs.
- [x] All required validators, JSON/status, secret/staged-file, CLI-link, and `git diff --check` checks pass for candidate-ready closeout.
- [x] Every manual intervention records blocker, evidence, exact numbered action/decision, and follow-up verification.

## Outcome Classification

Builder closes with exactly one:

- **cutover-complete**: new project is active, accepted, and old project retained for rollback
- **candidate-ready**: new project passes build/validation but production cutover remains pending
- **rolled-back**: cutover attempted and safely returned to old project
- **blocked**: project creation, migration, configuration, security, validation, or rollback readiness cannot safely pass
