# Supabase Clean Rebuild - Sprint 020G

## Current Outcome

Status: **candidate-ready and closed**. Clean candidate migration, Gate A, structural/security verification, hosted configuration, and credential-incident containment are complete. Synthetic Auth/RLS and candidate-connected application-runtime testing did not complete and transfer to Sprint 021 discovery.

Candidate uvskssaecdhxcgytkasc is verified as Precision Performance Clean Rebuild in organization hohxquwkfehiuyrysufu, ap-southeast-1, ACTIVE_HEALTHY and linked. The approved plan is Free. Old project tagnbgkroihagjmvehlx remains unlinked, ACTIVE_HEALTHY, unchanged, and available for rollback.

No legacy public rows, Auth users/identities/MFA/sessions, Storage buckets/objects/metadata, or seven retired remote-only surfaces will be migrated. No Vercel/environment change, deployment, production cutover, old-project mutation, commit, push, or PR is authorized.

## Repository Readiness

Migrations 0001-0009 retain their 020F hashes. New migration 0010_secure_helper_execution.sql has SHA-256 0915AD24DEFA6754C4F198B7E9C816041A9CBEE3E055FD4F8487D599DCB8E8B5. It fixes all eleven SECURITY DEFINER helper search paths to pg_catalog, public, revokes execution from PUBLIC and anon, and grants exact execution to authenticated.

Generated bootstrap SHA-256 after EOF normalization: 27CFEF62DD43858F70108A84011570E35A766A24CDFE3D14D31C27F8EEC8E212.

Passed:

- migration order, target, legacy-surface, destructive-statement, helper-security, and verification static checks
- bootstrap regeneration
- ESLint
- TypeScript no-emit validation
- diagnostic production build
- biochemistry scoring fixtures
- recommendation scaffold fixtures

The first standard build attempt had a transient Next.js worker exit; an immediate diagnostic production build completed successfully. Expected dynamic-route diagnostics were emitted for authenticated routes.

## Historical Candidate Preflight Evidence

- Exact linked candidate: uvskssaecdhxcgytkasc, ACTIVE_HEALTHY.
- Old project: tagnbgkroihagjmvehlx, ACTIVE_HEALTHY and unlinked.
- Candidate application-owned public relations: 0.
- Retired legacy surfaces: 0.
- Auth users: 0.
- Storage buckets: 0.
- Storage objects: 0.
- Migration ledger relation: 0.
- At that checkpoint, pending local migrations were exactly 0001 through 0010 in order with remote entries blank.

At that checkpoint, the first dry-run stopped before applying SQL because the pinned CLI rejected auth.enable_confirmations at the auth root. The approved compatibility change and repeated preflight subsequently passed; migrations were then applied once. This section is historical evidence, not current status.

## Historical Protected Linking Intervention

Blocked: Builder cannot safely provide the database password to the CLI from this conversation or retained command output.

Evidence: the supported link command accepts --password or prompts interactively. Supplying the flag would expose the secret in process arguments.

Required action:

1. Open a local terminal in the repository root.
2. Run: npx --no-install supabase link --project-ref uvskssaecdhxcgytkasc
3. Enter the new candidate database password only at the protected terminal prompt.
4. Do not use --password, paste the password into conversation, or copy terminal output containing credentials.
5. Return only: linked successfully.

Builder will then verify exact linked-reference equality, candidate health, old-project health, empty application structure, pending migration versions and the exact apply target. Builder will stop on ambiguity or migration failure.

This intervention is complete and retained as historical evidence.

## Config Compatibility Intervention

Blocked: migration dry-run cannot parse supabase/config.toml.

Evidence checked: linked identity, candidate/old health, empty candidate counts, exact migration list, CLI error, local config location, and current official Supabase config documentation.

Required decision:

1. Approve editing supabase/config.toml, which is outside the 020G approved file set.
2. Move only enable_confirmations = true from the auth section into a new auth.email section.
3. Preserve every other setting.

Builder will validate config parsing, repeat identity/emptiness/migration preflight, rerun the dry-run, and apply 0001-0010 once only if all checks pass.

This intervention is complete. The exact two-line section insertion passed review, repeated preflight passed, and migrations were applied once.

## Clean Migration Result

- Genuine remote ledger: local/remote versions 0001-0010 match exactly.
- Public tables: 33.
- RLS-enabled public tables: 33.
- Public policies: 78.
- SECURITY DEFINER helpers: 11, safe fixed search paths, zero PUBLIC/anon execute.
- Lookup rows: carbs 151, ph_average 521, salts 801, urea 301; total 1774; duplicates 0.
- Retired legacy surfaces: 0.
- Auth users: 0.
- Storage buckets/objects: 0/0.
- Security advisor: zero errors; eleven authenticated-helper warnings accepted with joint owner/reason because current RLS requires authenticated execution.
- Candidate: linked and ACTIVE_HEALTHY.
- Old project: unlinked and ACTIVE_HEALTHY.

## Protected Hosted-Configuration Result

Current sanitized operator state: Site URL remains `https://precisionperformance.com.au`; callback allowlist is restored to only `https://precisionperformance.com.au/auth/callback`; the temporary localhost callback is removed; Email and email confirmation remain enabled; unsupported providers remain disabled; leaked-password protection remains disabled under the accepted Free-plan/passwordless exception; exposed schemas remain exactly `graphql_public` and `public`.

Sanitized dashboard evidence is recorded in `planning/reviews/020G-new-project-manifest.md`. The security linter rerun reports zero errors, eleven accepted authenticated-helper warnings, and zero informational suggestions. A later browser inspection retained legacy candidate credential material; containment is recorded below without reproducing any value or fragment. No OAuth, SMTP, Storage, billing, Vercel, production environment, deployment, cutover, or old-project setting changed.

The protected synthetic Auth/RLS execution plan is recorded in `planning/reviews/020G-synthetic-auth-rls-test-plan.md`. It was not executed. No test inbox, Auth identity, fixture, or candidate-connected runtime was created. The work transfers to Sprint 021 discovery. Production cutover remains prohibited.
## Gate A Read-Only Orchestration

Gate A is complete: A1-A5, B1-B6, C1-C14, D1-D3, and E1-E3 passed. Candidate Local Runtime Preflight is separate from Gate A and did not complete; it must not be treated as a failed or incomplete Gate A assertion. The JavaScript harness did not run against Supabase and provides no authenticated proof.

## Credential Incident And Containment

- Browser inspection retained legacy candidate credential material.
- Execution stopped before harness execution, runtime startup, Auth identity creation, or fixture creation.
- The affected credential-containing Builder task was deleted; the current Architect/review task was retained.
- Replacement publishable and secret keys are present.
- Legacy anon and service_role keys are disabled.
- No credential value or fragment is reproduced in this or any other durable closeout record.
- No API-key page was inspected during closeout and no billing or charge occurred.

## Candidate-Ready Definition And Closeout

Sprint 020G closes **candidate-ready**, meaning:

- clean candidate migrations 0001-0010 completed;
- Gate A completed;
- database structure, RLS enablement, policies, helpers, lookup data, managed-data baselines, hosted configuration, and advisor disposition were verified;
- the candidate credential incident was contained;
- candidate and old project were last confirmed `ACTIVE_HEALTHY`;
- production cutover was not performed and remains unauthorized; and
- synthetic Auth/RLS and application-runtime testing was not completed and is not reported as passed.

## Sprint 021 Transfer

Sprint 021 discovery must define the definitive role matrix; synthetic Auth identities; trainer, owner, and expanded-role permission cases; assigned-horse, wrong-horse, cross-user, and cross-stable denial cases; application-route and authenticated-RLS proof; controlled fixture creation, ownership, cleanup, and zero-count verification; and protected review of replacement publishable/secret-key consumption. No credential value may enter an Architect Pack, sprint file, repository file, retained output, or conversation. Sprint 021 implementation has not begun and no Architect Pack has been applied.
