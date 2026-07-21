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
