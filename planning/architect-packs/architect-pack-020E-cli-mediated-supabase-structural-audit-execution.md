# Architect Pack 020E - CLI-Mediated Supabase Structural Audit Execution

============================================================
FILE: planning/sprints/020E-cli-mediated-supabase-structural-audit-execution/requirements.md
============================================================

# Sprint 020E - CLI-Mediated Supabase Structural Audit Execution Requirements

## Role And Profile

Builder executes this follow-up under the `strict` workflow profile and implements only from this applied sprint folder.

## Goal

Use the operational Sprint 020D Supabase CLI connection to perform a sanitized, project-wide, metadata-only production structure and security audit under a temporary least-privilege `NOLOGIN` role, deliver the findings, remove the role, and prove cleanup without remediating the database.

## Relationship To Sprints 020C And 020D

- Sprint 020D is complete and is the authority that protected CLI authentication, exact production linking, Management API access, and remote database connectivity are operational.
- Sprint 020C remains active and paused. Sprint 020E replaces its stale password-bearing login procedure with the approved CLI-mediated `NOLOGIN` role model and completes the remaining audit lifecycle.
- Builder must preserve the valid 020C catalog/ACL safety work, update stale 020C operational documentation, and close both 020C and 020E accurately only after review delivery and verified role cleanup.
- Sprint 020E does not reopen Sprint 020, 020B, or 020D and does not authorize migration-history reconciliation.

## Sources Of Truth

- `AGENTS.md`
- `planning/STATE.md`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/sprints/020C-temporary-database-audit-access-and-review/**`
- `planning/sprints/020D-supabase-cli-authentication-linking-read-only-connectivity/**`
- `docs/DATABASE_AUDIT_REVIEW_020C.md`
- `docs/SUPABASE_CLI_CONNECTIVITY_020D.md`
- `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md`
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- `supabase/verification/020C-database-audit.sql`
- existing migrations, verification SQL, configuration, and safe link metadata
- installed Supabase CLI `2.109.1` help for `db query`, `db advisors`, and linked operation
- current official PostgreSQL and Supabase documentation relevant to catalogs, ACLs, RLS, role switching, and security advisors

## Confirmed Target And Tooling

- Production project reference: `tagnbgkroihagjmvehlx`
- Project name: `PNR Precision Performance`
- Region: `ap-southeast-1`
- Linked status: operational through the pinned project-local Supabase CLI `2.109.1`
- Invocation: `npx --no-install supabase`
- Exact temporary audit role: `pp_audit_020e_20260720`

Builder must reconfirm safe target equality and production classification immediately before every setup, audit, advisor, or cleanup command. Do not silently update, globally install, or substitute the CLI.

## Accepted Privilege Model

- Create one exact temporary PostgreSQL role named `pp_audit_020e_20260720` with `NOLOGIN`, `NOSUPERUSER`, `NOCREATEDB`, `NOCREATEROLE`, `NOINHERIT`, `NOREPLICATION`, and `NOBYPASSRLS`.
- The role must own no objects, receive no application/admin/service role membership, and receive no table-row `SELECT`, write, function-execute, schema-create, database-create, role-create, replication, or bypass-RLS privilege.
- Grant only `USAGE` on the exact metadata-relevant schemas if catalog resolution requires it. Default to `public` only. Do not grant access to auth-user rows, storage object rows, Vault/secrets, billing, or customer payloads.
- Use the linked privileged CLI connection only for exact role setup, verified privilege downshift, approved security-advisor invocation, and exact cleanup.
- Execute the audit inside `BEGIN TRANSACTION READ ONLY`, then `SET LOCAL ROLE pp_audit_020e_20260720`, then assert `current_user` equals the audit role before any structural query.
- If `SET LOCAL ROLE` is unavailable, identity assertion fails, privileges are broader than specified, or any audit query unexpectedly exposes application-row content, roll back/stop and record manual intervention. Do not add membership or grants merely to bypass the failure.
- The role is `NOLOGIN`; no audit password, connection string, credential delivery, expiry, or separate PostgreSQL client is required.

## In Scope

- replace the stale Sprint 020C login/password/expiry procedure with the accepted CLI-mediated `NOLOGIN` role lifecycle
- create static validators for setup, read-only audit, findings, and cleanup artifacts
- create exact setup and cleanup SQL artifacts, clearly separated from the read-only audit SQL
- expand the audit from the biochemistry subset to project-wide structural metadata while excluding row payloads
- execute setup through `supabase db query --linked --file` only after exact-target preflight
- execute the metadata audit through `supabase db query --linked --file` only after static safety validation
- run the Supabase security advisor in read-only mode and retain sanitized finding identifiers/severity/summaries only
- compare expected migration-defined structures with production metadata and Sprint 020B structural evidence
- identify schema, ownership, RLS, policy, ACL, function, trigger, extension, exposure, and migration-history risks
- produce a severity-ranked audit report with limitations and bounded recommendations
- deliver the completed audit review before cleanup
- revoke any exact audit-specific grants, terminate only exact related sessions if necessary, drop only `pp_audit_020e_20260720`, and verify absence
- verify the Sprint 020B structural baseline and unrelated role/object counts remain unchanged after cleanup
- update durable planning state, status, decisions, risks, questions, schedule, and Architect briefing

## Project-Wide Metadata Coverage

The audit must inventory or assess, without selecting application rows:

- databases and non-secret server/version identity necessary for context
- schemas and installed extensions
- tables, partitioned tables, views, materialized views, sequences, and their owners
- columns, data types, nullability, generated/identity state, and default expressions
- primary, unique, check, exclusion, and foreign-key constraints
- indexes, uniqueness, validity, readiness, predicates, and definitions
- functions/procedures: signatures, languages, owners, volatility, security-definer state, configuration/search path, and definition fingerprints
- triggers and enabled state
- RLS enabled/forced flags and policy definitions/roles/commands
- explicit schema/table/sequence/function ACLs, default ACLs, PUBLIC exposure, and effective privileges for `anon`, `authenticated`, and the temporary audit role where those roles exist
- role attributes and memberships using metadata only; never password/verifier data
- publication/replication metadata necessary to identify exposure, excluding row/change payloads
- Supabase security-advisor findings
- local migration versions `0001`-`0009` compared with remote migration-history presence, without repair or replay
- Sprint 020B biochemistry baseline: five RLS tables, three helpers, seven explicit indexes, thirteen policies, 1,774 lookup rows, and zero duplicate lookup keys; reuse the prior sanitized row-count evidence rather than granting row reads

Metadata inspection of `auth` or `storage` object definitions is permitted only where PostgreSQL catalogs expose structural names, owners, RLS, policies, ACLs, functions, triggers, and constraints without row payloads. Do not query `auth.users`, identities, sessions, tokens, storage object rows, buckets, Vault, secrets, or customer records.

## Findings And Report Boundary

Each finding must include:

- stable identifier
- severity: `critical`, `high`, `medium`, `low`, or `informational`
- affected object or trust boundary
- sanitized evidence
- realistic impact
- bounded recommendation
- remediation dependency or follow-up sprint
- confidence and audit limitation where relevant

Do not remediate findings in this sprint. A critical finding or credible active-exploitation evidence is an immediate stop-and-report condition; cleanup of the exact temporary role remains required when safely possible.

## Authorized Production Mutations

Only these exact changes are included:

1. create `pp_audit_020e_20260720` with the fixed non-elevated `NOLOGIN` attributes
2. grant only the explicitly reviewed minimal schema usage required for metadata name resolution
3. revoke only those audit-specific grants
4. terminate only sessions demonstrably using the exact audit role when necessary for removal
5. drop only `pp_audit_020e_20260720` after zero-ownership and dependency checks

No schema object, table row, policy, function, trigger, extension, owner, default privilege, migration history, auth user, storage record, secret, project configuration, or application role may be changed.

## Prohibited Commands And Effects

- `supabase db push`, `db reset`, `db pull`, or schema-generating `db dump/diff` that writes outside the approved evidence set
- migration replay, `migration repair`, `migration up`, squash, seed, or history reconciliation
- functions deploy/delete, secrets set/unset, project configuration writes, branch writes, auth-user changes, storage mutations, or billing actions
- table/application-row reads, exports, sampling, `COPY`, or retained sensitive definitions containing embedded secrets
- broad grants, `pg_read_all_data`, service/admin/app-role membership, superuser, bypass-RLS, or owner impersonation
- `REASSIGN OWNED`, `DROP OWNED`, wildcard role cleanup, broad session termination, database reset, truncate, or destructive rollback
- application/UI changes, deployment, commit, push, PR, Stripe action, or public reopening

## Credential And Evidence Safety

- Reuse the protected user-level CLI authentication and database connectivity established in 020D without inspecting or copying credential contents.
- Never ask for or accept a token, password, connection URI, verifier, or secret fragment in conversation.
- Never enable CLI debug/trace output during authenticated commands.
- Do not print `.supabase` credential state, environment values, connection URLs, or `supabase/.temp` files wholesale.
- Direct command output only to the active terminal or a temporary sanitized review workflow. Repository evidence must contain summaries, fingerprints, counts, names needed for findings, and no row payloads or secrets.
- If any definition contains a possible embedded secret, do not retain the definition; record only object identity, a fingerprint, and the exposure concern.

## Approved File Set

Builder may edit:

- `planning/sprints/020E-cli-mediated-supabase-structural-audit-execution/**`
- `planning/sprints/020C-temporary-database-audit-access-and-review/OPERATIONS.md`
- `planning/sprints/020C-temporary-database-audit-access-and-review/acceptance.md`
- `docs/DATABASE_AUDIT_REVIEW_020C.md`
- `docs/SUPABASE_STRUCTURAL_AUDIT_020E.md`
- `supabase/verification/020C-database-audit.sql`
- `supabase/verification/020E-audit-role-setup.sql`
- `supabase/verification/020E-structural-audit.sql`
- `supabase/verification/020E-audit-role-cleanup.sql`
- `scripts/validate-database-audit-020C.ps1`
- `scripts/validate-supabase-structural-audit-020E.*`
- `.gitignore` only if a narrow missing exclusion is required for generated/temp audit output
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/SPRINT_SCHEDULE.md`

Generated but never staged or committed:

- `supabase/.temp/**`
- user-level Supabase CLI authentication/credential state
- unsanitized command output or temporary audit capture

Inspection only:

- all other source, migrations, Supabase configuration, database docs, CLI package/help, and safe link metadata
- remote PostgreSQL catalogs and security-advisor outputs within this pack's metadata-only boundaries

## Design And Architecture Carry-Forward

No UI or public messaging is planned. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md` remains binding. This sprint crosses only the dedicated temporary-role and metadata-audit gates. It does not authorize schema/auth/RLS redesign, data/provider/CMS/aggregation/terminology/commerce changes, migration-history repair, deployment, or public reopening.

## Manual Intervention Rule

For target confirmation, CLI access, role creation, role downshift, insufficient/excess privilege, advisor/query failure, unexpected data visibility, suspected secret exposure, critical finding, review delivery, cleanup dependency, session termination, or role removal, Builder must record:

- what is blocked or not working
- evidence already checked
- the exact user/operator action needed
- numbered steps for completing it
- what Builder will verify afterward

Stop on target mismatch, uncertain SQL behavior, failure to prove read-only role-downshift, broader-than-approved access, unexpected row content, secret exposure, remote mutation outside the exact role lifecycle, or cleanup that cannot be proven exact.

============================================================
FILE: planning/sprints/020E-cli-mediated-supabase-structural-audit-execution/blueprint.md
============================================================

# Sprint 020E - CLI-Mediated Supabase Structural Audit Execution Blueprint

## Execution Order

1. Reconfirm strict scope, dirty-worktree boundaries, completed 020D evidence, paused 020C state, exact linked project reference `tagnbgkroihagjmvehlx`, production classification, and fixed role name `pp_audit_020e_20260720`.
2. Read installed CLI `db query` and `db advisors` help plus current official documentation. Classify every intended command before execution.
3. Update stale 020C procedure/review language: remove the password-bearing `LOGIN`, `createuser`, credential-delivery, fixed-expiry, missing-client, and CLI-unavailable path. Preserve its valid least-privilege, review-before-cleanup, and exact-target safeguards.
4. Build separate setup, read-only audit, and cleanup SQL files. Never combine setup/cleanup DDL with the audit query file.
5. Build/extend static validation to enforce exact role name, fixed role attributes, forbidden grants/commands, `BEGIN ... READ ONLY`, early `SET LOCAL ROLE`, immediate identity assertion, catalog-only structural reads, prohibited row-bearing relations, no secret patterns, exact cleanup, and no broad destructive statements.
6. Inventory expected structures from local migrations/docs and define comparison counts/fingerprints without remote row access.
7. Run local static validators and `git diff --check`. Do not connect remotely until they pass.
8. Run a read-only linked preflight that returns only current database/session identity, exact target evidence available through the approved path, existing-role count for the fixed audit role, and safe baseline counts. Stop if the role already exists; do not reuse, alter, or drop an unexplained role.
9. Execute only the validated setup file through `npx --no-install supabase db query --linked --file ...`. Confirm the role's attributes, zero memberships, zero ownership, minimal explicit grants, and ability to downshift. Stop and clean up if any check differs.
10. Execute the validated structural audit file. It must begin a read-only transaction, set the exact local role before structural queries, assert identity/transaction state, query catalogs only, and roll back.
11. Run `npx --no-install supabase db advisors --linked --type security` using default non-debug output. Retain only sanitized advisor identifiers, severity, object, and summary. Do not run any suggested fix.
12. Compare output against local migrations, Sprint 020B evidence, expected Supabase structures, and accepted security boundaries. Investigate inconsistencies with additional locally reviewed catalog-only queries only; amend/validate the audit file before running new queries.
13. Write `docs/SUPABASE_STRUCTURAL_AUDIT_020E.md` and finalize `docs/DATABASE_AUDIT_REVIEW_020C.md` with scope, sanitized evidence, findings, limitations, migration-history mismatch, and bounded recommendations.
14. Deliver the completed audit review to the user before cleanup. Record delivery time and the exact pending cleanup role.
15. After delivery, execute only the validated cleanup file. Revoke exact grants, verify zero ownership/membership/dependencies, terminate only demonstrably exact audit-role sessions if required, and drop only `pp_audit_020e_20260720`.
16. Run post-cleanup verification: zero role references/sessions/grants/ownership, unchanged unrelated role/object counts, unchanged Sprint 020B baseline, ignored link state, and no secret/staged output.
17. Run final validators and update state/status/schedule/briefing/decisions/risks/questions. Close 020C and 020E accurately only when review delivery and cleanup both pass.

## Setup Artifact Requirements

`020E-audit-role-setup.sql` must:

- fail safely if the exact role already exists
- create only `pp_audit_020e_20260720`
- specify every negative role attribute explicitly
- create it as `NOLOGIN`
- grant only reviewed schema usage required for metadata resolution
- contain no password/verifier, membership grant, table/sequence/function privilege, ownership, default privilege, application schema mutation, or unrelated statement
- return sanitized verification of attributes, memberships, owned-object count, and explicit grants

Do not make setup broadly idempotent by adopting an existing role. Existing-role discovery is a stop condition.

## Audit Artifact Requirements

`020E-structural-audit.sql` must:

1. begin a transaction explicitly marked read-only
2. set the exact local role before structural inspection
3. assert the current role, session role context, and read-only transaction state
4. assert the role has no elevated attributes, memberships, ownership, row privileges, or unexpected schema access
5. query only approved catalogs and metadata functions
6. avoid application relations, auth/storage rows, Vault/secrets, user/session/token data, and row-bearing aggregates
7. fingerprint rather than retain sensitive function definitions where appropriate
8. roll back explicitly

Where a catalog expression may reveal confidential literals, return a fingerprint and safe classification rather than the raw expression. Names required to identify structural findings may be retained unless they contain a suspected secret.

## Minimum Structural Result Set

- safe server/database version and identity context
- schemas/extensions inventory
- relation inventory by kind/schema/owner/RLS state
- column/type/default metadata
- constraint and foreign-key inventory
- index inventory and validity
- function/procedure security inventory and fingerprints
- trigger inventory
- policy inventory
- explicit and default ACL inventory plus PUBLIC/anon/authenticated effective privileges
- role-attribute/membership summary relevant to exposed access boundaries
- publication/replication structural summary
- Supabase security-advisor results
- local-versus-remote migration-history mismatch statement
- Sprint 020B biochemistry structure comparison

## Privilege Downshift Proof

The audit is invalid unless retained sanitized evidence proves:

- `session_user` is the linked CLI database session identity
- `current_user` becomes exactly `pp_audit_020e_20260720` before inspection
- transaction state is read-only
- the audit role has no elevated attributes, memberships, owned objects, or application-row privileges

If the linked session cannot `SET LOCAL ROLE`, do not grant membership or change the role. Roll back, remove the temporary role if safely possible, and record manual intervention for a revised access design.

## Advisor Boundary

The security advisor may run through the linked CLI connection because it is a Supabase-provided read-only diagnostic rather than the custom audit transaction. Treat its output as a separate privileged diagnostic source. Do not claim it ran under the temporary role, and do not execute suggested remediation.

## Review Delivery Gate

Before cleanup, Builder must provide the completed sanitized review in conversation and durable files. The review must explicitly state that temporary role cleanup is pending. Delivery is not permission to remediate findings.

## Cleanup Artifact Requirements

`020E-audit-role-cleanup.sql` must:

- resolve the exact literal role only
- revoke only audit-specific grants
- verify zero owned objects, memberships, unexpected grants, and dependencies before drop
- stop instead of using `REASSIGN OWNED` or `DROP OWNED`
- terminate no session unless it is demonstrably attributable to the exact role; because the role is `NOLOGIN` and used through `SET LOCAL ROLE`, expect no direct login session
- drop only `pp_audit_020e_20260720`
- verify zero remaining role, membership, ownership, grant, and direct-session references

If cleanup cannot complete safely, Sprint 020E remains active with a critical manual intervention; do not mark either 020C or 020E complete.

## Migration-History Finding

Record as a separate finding that local versions `0001`-`0009` have no matching remote CLI migration-history records while production objects exist. Do not infer an apply sequence, insert history records, mark migrations applied, replay SQL, repair, push, reset, or reconcile under this sprint.

## Validation

At minimum run:

- Architect Pack check for applied pack provenance
- 020C metadata-audit validator after its updates
- new 020E setup/audit/cleanup static validator
- JSON parse and expected status assertions
- secret-pattern scan over sprint/report/verification artifacts
- forbidden-command/mutation scan
- Git ignore and staged-file checks for `supabase/.temp/**` and temporary output
- `git diff --check`, allowing only existing line-ending warnings

============================================================
FILE: planning/sprints/020E-cli-mediated-supabase-structural-audit-execution/acceptance.md
============================================================

# Sprint 020E - CLI-Mediated Supabase Structural Audit Execution Acceptance

## Preparation And Target Safety

- [ ] Exact project reference `tagnbgkroihagjmvehlx`, production classification, CLI version `2.109.1`, linked state, and fixed role name are reconfirmed without secrets.
- [ ] Sprint 020C stale login/password/expiry/client-unavailable procedure is replaced by the CLI-mediated `NOLOGIN` role model.
- [ ] Setup, read-only audit, and cleanup SQL are separate and pass static safety validation.
- [ ] Existing-role preflight proves `pp_audit_020e_20260720` does not already exist.
- [ ] No credential, connection URI, CLI state, link file, environment value, row payload, or secret fragment is exposed or retained.

## Temporary Role

- [ ] Only `pp_audit_020e_20260720` is created.
- [ ] It is `NOLOGIN`, non-superuser, non-owner, no-inherit, no-create-db, no-create-role, no-replication, and no-bypass-RLS.
- [ ] It has zero memberships and receives only reviewed minimal schema usage.
- [ ] It has no table-row, write, sequence, unrelated-function, auth/storage-row, Vault, service, application-role, or broad read privilege.
- [ ] Setup verification matches the expected role exactly before audit execution.

## Read-Only Audit Execution

- [ ] Audit begins in an explicitly read-only transaction.
- [ ] `SET LOCAL ROLE pp_audit_020e_20260720` occurs before structural inspection.
- [ ] Sanitized evidence proves exact `current_user`, session context, read-only transaction state, zero elevation/membership/ownership, and no application-row privileges.
- [ ] Project-wide metadata coverage includes schemas/extensions, relations, columns/defaults, constraints, indexes, functions, triggers, RLS/policies, ACLs/default ACLs/effective privileges, relevant role metadata, and publication/replication structure.
- [ ] No application, auth, storage, Vault, customer, horse, trainer, upload, token, session, or secret row payload is queried or retained.
- [ ] Supabase security advisor runs separately as a read-only privileged diagnostic and no suggested fix is executed.
- [ ] Sprint 020B biochemistry structure evidence is corroborated or differences are reported without granting row reads.

## Audit Review

- [ ] `docs/SUPABASE_STRUCTURAL_AUDIT_020E.md` contains sanitized scope, evidence, findings, limitations, and recommendations.
- [ ] `docs/DATABASE_AUDIT_REVIEW_020C.md` reflects the completed audit and CLI-mediated role model.
- [ ] Every finding includes identifier, severity, boundary/object, evidence, impact, recommendation, dependency, and confidence/limitation where relevant.
- [ ] Missing remote history for local migrations `0001`-`0009` is reported without repair, replay, push, reset, or inferred reconciliation.
- [ ] The completed review is delivered before cleanup and states that cleanup remains pending.
- [ ] No finding is remediated.

## Cleanup

- [ ] Cleanup begins only after review delivery.
- [ ] Exact audit-specific grants are revoked.
- [ ] Zero ownership, membership, unexpected grants, dependencies, and direct sessions are proven before role removal.
- [ ] No `REASSIGN OWNED`, `DROP OWNED`, wildcard cleanup, broad session termination, reset, or destructive rollback occurs.
- [ ] Only `pp_audit_020e_20260720` is dropped.
- [ ] Post-cleanup checks prove zero remaining role/session/grant/membership/ownership references.
- [ ] Unrelated roles/objects and the Sprint 020B structural baseline remain unchanged.

## Closeout And Validation

- [ ] Updated 020C and new 020E validators pass.
- [ ] Secret-pattern, prohibited-command, staged-file, ignored-link-state, JSON, and status assertions pass.
- [ ] `git diff --check` passes, allowing only existing line-ending warnings.
- [ ] Planning records accurately close 020C and 020E only after review delivery and verified cleanup.
- [ ] Protected CLI authentication/link state remains uninspected and unstaged; any retained connection is explicitly documented for future safe use.
- [ ] No migration/schema/data/policy/function/trigger/extension/owner/default-privilege/history/auth/storage/secret/project-setting change occurs beyond the exact temporary-role lifecycle.
- [ ] No application change, deployment, commit, push, PR, Stripe action, or public reopening occurs.
- [ ] Every manual intervention includes blocker, evidence, exact numbered action, and follow-up verification.

============================================================
FILE: planning/sprints/020E-cli-mediated-supabase-structural-audit-execution/handoff-prompt.md
============================================================

# Sprint 020E - Builder Handoff Prompt

You are Builder for Sprint 020E under the `strict` workflow profile.

Read `AGENTS.md`, `planning/STATE.md`, every file in this sprint folder, all active Sprint 020C artifacts, completed Sprint 020D artifacts, `docs/DATABASE_AUDIT_REVIEW_020C.md`, `docs/SUPABASE_CLI_CONNECTIVITY_020D.md`, `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md`, `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`, all relevant migrations/verification SQL, Supabase configuration, risks, questions, and Architect briefing before acting.

Use the pinned operational CLI through `npx --no-install supabase`. Reconfirm exact linked production project `tagnbgkroihagjmvehlx` before every remote phase. Never inspect, copy, print, or persist CLI credentials, database credentials, connection URLs, user-level CLI state, environment values, or link files wholesale. Keep debug/trace off.

Replace the stale Sprint 020C password/login procedure with the accepted temporary `NOLOGIN` role `pp_audit_020e_20260720`. The linked privileged connection may be used only for exact role setup, role-downshift execution, the separate Supabase security advisor, and exact cleanup. Do not create a password or request any credential.

Keep setup, audit, and cleanup SQL separate. Validate them locally before execution. The audit must begin read-only, set the exact local audit role before inspection, assert identity and privilege boundaries, read only approved catalogs, avoid all row payloads, and roll back. If downshift fails or privileges are broader than specified, stop; do not grant membership or broaden access.

Audit project-wide structural metadata: schemas/extensions, relations, columns/defaults, constraints, indexes, functions, triggers, RLS/policies, ACLs/default ACLs/effective privileges, relevant role metadata, publications/replication, security-advisor findings, the 020B biochemistry baseline, and migration-history divergence. Do not query auth users, sessions, tokens, storage object rows, Vault, application/customer/horse/trainer rows, or secrets.

Produce severity-ranked sanitized findings without remediation. Deliver the completed review before cleanup and state that the exact temporary role remains pending removal. Then revoke only audit grants, prove zero ownership/membership/dependencies/sessions, drop only the exact role, and verify complete absence plus unchanged unrelated structure.

Do not run `db push`, reset, pull, migration repair/replay/up/squash, seed, deploy, secret/config writes, schema/data changes, or any uncertain command. Do not use `REASSIGN OWNED`, `DROP OWNED`, wildcards, or broad termination. Preserve unrelated dirty-worktree changes and generated ignored link state. Do not commit, push, create a PR, deploy, remediate findings, change Stripe, or reopen public surfaces.

Close 020C and 020E only after the review is delivered and cleanup is proven. If cleanup cannot complete safely, leave both active and record the required manual intervention exactly.
