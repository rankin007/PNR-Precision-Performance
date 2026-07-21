# Sprint 020D - Supabase CLI Authentication, Linking And Read-Only Connectivity Requirements

## Role And Profile

Builder executes this follow-up under the `strict` workflow profile and implements only from this applied sprint folder.

## Goal

Make the project-local Supabase CLI operational against the confirmed hosted Precision Performance project through protected authentication, exact project linking, and sanitized read-only connectivity proof, without applying migrations or changing remote state.

## Relationship To Sprint 020C

Sprint 020C remains active but paused before temporary audit-account creation. Sprint 020D is a bounded connectivity prerequisite and does not close, replace, broaden, or execute Sprint 020C. After 020D closes, Architect/user decides how its verified CLI path is used by the remaining 020C audit lifecycle.

## Sources Of Truth

- `AGENTS.md`
- `planning/STATE.md`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/sprints/020C-temporary-database-audit-access-and-review/**`
- `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md`
- `docs/DATABASE_AUDIT_REVIEW_020C.md`
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- `package.json` and `package-lock.json`
- `supabase/config.toml`
- existing migrations and verification SQL
- current official Supabase CLI documentation for login, link, projects, migration inspection, and database commands

## Known Starting State

- Project-local Supabase CLI `2.109.1` is installed as a dev dependency.
- Invoke the pinned local binary with `npx --no-install supabase`; do not silently install or upgrade another CLI.
- The hosted project reference is `tagnbgkroihagjmvehlx` and must be confirmed by the operator as production.
- `supabase/.temp` is absent, so the repository is not currently linked.
- No CLI authentication state has been proven.
- In the managed Codex session, CLI startup currently fails while attempting to write user-level telemetry/config state under `C:\Users\rrank\.supabase`.
- Docker is unavailable. Docker is not required for hosted login, link, or approved remote read-only checks and must not be installed in this sprint.

## In Scope

- verify the pinned project-local CLI binary and its checksum/package-lock provenance without network installation
- establish an approved execution path that permits required CLI user-state writes without broad filesystem authorization
- authenticate the CLI using the supported interactive/browser or protected token flow
- keep access tokens, database passwords, connection strings, refresh material, and credential-store contents out of conversation and repository artifacts
- confirm the authenticated Supabase account can see project reference `tagnbgkroihagjmvehlx`
- link this repository to exactly that confirmed production project
- verify the safe link metadata exists and matches the project reference without printing secret-bearing files
- perform only documented non-mutating CLI/API/database checks sufficient to prove Management API and database connectivity
- capture sanitized command names, versions, identity/project reference, timestamps, exit status, and non-sensitive summary results
- document logout/unlink/token-revocation and stale-link recovery procedures without performing cleanup when the verified connection is still required for 020C
- update durable planning records with the actual result and remaining 020C dependency

## Credential And Secret Boundary

- Supabase personal access tokens authenticate the Management API; PostgreSQL credentials authenticate database connections. Treat them as separate secrets.
- Do not ask for or accept any secret in this conversation.
- Do not place a token, database password, connection URI, secret fragment, or credential-store export in command arguments, environment files, scripts, SQL, Markdown, screenshots, clipboard notes, shell history, retained logs, staging, or commits.
- Use only a supported protected interactive/browser flow, OS credential store, approved native secret mechanism, or operator-controlled process that does not expose the secret to Builder output.
- Do not print environment-variable values. Presence-only checks are allowed.
- Do not inspect or copy user-level credential-store contents.
- If a secret appears in output or a repository path, stop, do not repeat it, sanitize retained evidence, and record exact revocation/rotation intervention.

## Runtime State Boundary

- Prefer the CLI's normal user-level state location through a narrowly approved execution path.
- Do not repurpose `HOME`, `USERPROFILE`, `CODEX_HOME`, or another broad system variable to redirect CLI state.
- Do not copy authentication state into the repository or a workspace-local fake home.
- Do not disable TLS verification or weaken credential storage to bypass the startup blocker.
- Any outside-sandbox approval must be command-specific and must not authorize mutation-capable Supabase commands categorically.

## Authorized Remote Actions

Only non-mutating actions are included:

1. protected CLI authentication
2. authenticated project discovery sufficient to confirm the exact project reference
3. repository linking to that exact project
4. read-only project, migration-history, connection, and catalog/status inspection
5. logout/unlink or token revocation only as recovery from wrong-target linking, credential exposure, or explicit closeout instruction

Linking may write local ignored metadata under `supabase/.temp` and user-level CLI/credential state. It must not modify the hosted database or project configuration.

## Prohibited Commands And Effects

Builder must not run or approximate:

- `supabase db push`
- `supabase db reset`
- `supabase migration up`, `repair`, `squash`, or other migration-history mutation
- `supabase seed`
- remote schema pull/diff when the selected command writes tracked migration/schema files, unless Builder first proves and documents a no-write mode inside the approved file set
- functions deploy/delete, secrets set/unset, project configuration writes, branching writes, storage mutations, auth-user changes, or generated remote writes
- SQL that creates, alters, grants, revokes, inserts, updates, deletes, truncates, drops, comments, copies, calls mutating routines, or changes sessions beyond read-only safety settings
- Docker installation or local-stack startup/reset
- CLI upgrade, global installation, or dependency change
- temporary audit-user creation, credential delivery, audit execution, or removal from Sprint 020C
- migration, remediation, application change, deployment, commit, push, PR, Stripe action, or public reopening

## Approved File Set

Builder may edit:

- `planning/sprints/020D-supabase-cli-authentication-linking-read-only-connectivity/**`
- `docs/SUPABASE_CLI_CONNECTIVITY_020D.md`
- `scripts/validate-supabase-cli-connectivity-020D.*`, if a local non-secret/static validator is useful
- `.gitignore` only if the existing rules do not exclude generated Supabase link/runtime metadata, and only for the narrow missing patterns
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/ARCHITECT_BRIEFING.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/SPRINT_SCHEDULE.md`

Generated but never staged or committed:

- `supabase/.temp/**`
- supported user-level Supabase CLI state and native credential-store entries outside the repository

Inspection only:

- `package.json`, `package-lock.json`, `node_modules/.bin/supabase*`, and the installed Supabase package metadata
- `supabase/config.toml`, existing migrations, verification SQL, and safe environment-name/presence evidence
- `.gitignore` when no correction is needed
- user-level CLI state by presence and safe metadata only; never credential contents

## Design And Architecture Carry-Forward

No UI, content, schema, auth/RLS, data, provider, CMS, aggregation, terminology, commerce, public-surface, or deployment change is planned. `docs/DESIGN_AND_MESSAGING_AUTHORITY.md` remains binding. This sprint crosses only the dedicated CLI authentication/linking boundary and must not be treated as migration, database-write, application-auth, or public-reopening authority.

## Manual Intervention Rule

For sandbox/state-directory access, browser/interactive login, token provisioning, database-password prompting, project confirmation, network/firewall failure, TLS failure, wrong-account access, wrong-target link, insufficient database access, or credential exposure, Builder must record:

- what is blocked or not working
- evidence already checked
- the exact user/operator action needed
- numbered steps for completing that action
- what Builder will verify afterward

Builder stops on target mismatch, unverifiable production classification, secret exposure, TLS verification failure, an unexpected write prompt/effect, a command whose mutation behavior is uncertain, or any request for broader access than this sprint defines.
