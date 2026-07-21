# Architect Pack 020D - Supabase CLI Authentication, Linking And Read-Only Connectivity

============================================================
FILE: planning/sprints/020D-supabase-cli-authentication-linking-read-only-connectivity/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/020D-supabase-cli-authentication-linking-read-only-connectivity/blueprint.md
============================================================

# Sprint 020D - Supabase CLI Authentication, Linking And Read-Only Connectivity Blueprint

## Execution Order

1. Reconfirm strict scope, dirty-worktree boundaries, active paused Sprint 020C, intended project reference `tagnbgkroihagjmvehlx`, and production classification.
2. Inspect `package.json`, lockfile, installed binary/shims, `.gitignore`, `supabase/config.toml`, `supabase/.temp` presence, safe CLI-state presence, and available network/client prerequisites without reading secrets.
3. Prove the pinned local CLI is the lockfile-installed `2.109.1` package. Use `npx --no-install`; do not fetch, install, or upgrade.
4. Reproduce and classify the CLI startup result. If user-state writing is blocked by the managed sandbox, request the narrow command-specific execution approval needed for harmless CLI startup/version/help. Do not redirect user state into the repository or weaken host protections.
5. Confirm the exact current official command behavior and flags from installed `--help` output and official Supabase documentation before authenticating or linking.
6. Have the operator complete supported protected authentication without sharing a token. Verify authentication using a sanitized, non-mutating account/project discovery result.
7. Confirm the authenticated account exposes exactly project reference `tagnbgkroihagjmvehlx` and that the operator confirms it is production. Stop on ambiguity or multiple plausible targets.
8. Verify generated link metadata is ignored. Link from the project root to exactly `tagnbgkroihagjmvehlx` using the protected interactive database-credential path when required. Do not put a password or URI in command arguments.
9. Validate the linked reference using safe metadata/presence checks and a CLI read-only project or link-status command. Never print link files wholesale if their sensitivity is uncertain.
10. Prove Management API connectivity with a non-mutating project discovery/status operation.
11. Prove database connectivity with the smallest documented read-only linked operation. Prefer migration-history/status or an explicitly read-only catalog query. Set or verify read-only transaction behavior where the execution path supports it.
12. Confirm the command caused no remote schema, migration-history, row, setting, auth, storage, function, secret, or project change. Compare safe structural evidence with Sprint 020B where applicable.
13. Write `docs/SUPABASE_CLI_CONNECTIVITY_020D.md` with sanitized evidence, exact tested capability, limitations, credential model, recovery procedure, and whether the CLI path is suitable for the remaining 020C metadata audit.
14. Run local static validation and update state, status, schedule, briefing, and relevant decisions/risks/questions. Close accurately as operational, partially operational, or blocked.

## Connectivity Layers And Proof

### Layer 1: Local Runtime

Prove:

- pinned local CLI launches successfully
- version equals the installed lockfile version
- required user-state writes succeed through the approved path
- no network installation or global binary substitution occurred

### Layer 2: Management API Authentication

Prove:

- supported protected authentication completes
- authenticated account can perform non-mutating project discovery
- exact project reference appears in sanitized results
- no token value or credential-store content is exposed

### Layer 3: Repository Link

Prove:

- link target is exactly `tagnbgkroihagjmvehlx`
- operator confirms production classification before link
- `supabase/.temp` link metadata is ignored and unstaged
- link verification succeeds without changing hosted configuration

### Layer 4: Database Connectivity

Prove:

- the CLI can reach the linked hosted database using protected credential handling
- at least one documented non-mutating database/migration/catalog operation completes
- returned evidence contains no application rows or secrets
- no remote write occurs

## Safe Command Selection

Before every remote command, Builder must inspect installed help and classify the command as:

- local-only and non-mutating
- Management API read-only
- database read-only
- local metadata write only
- remote mutation or uncertain

Only the first four categories may proceed, and local metadata writes are limited to supported authentication/link state. Any remote mutation or uncertain command is a stop condition. A `--dry-run` flag is not sufficient unless installed help and documented behavior prove it performs no remote mutation.

## Network And TLS Checks

Confirm only what is needed:

- HTTPS access to official Supabase authentication/Management API endpoints
- DNS and verified TLS to the connection endpoint selected by the CLI
- database endpoint or pooler reachability when required by the selected read-only command

Do not disable certificate verification, add blanket firewall exceptions, expose hosts with embedded credentials, or persist connection URIs. If direct database routing is unavailable, document the supported Supabase pooler/connection alternative and stop for operator confirmation before changing connection mode.

## Recovery

If authentication or linking targets the wrong account/project, stop remote commands, sanitize evidence, use the supported logout/unlink path, and have the operator revoke the affected token/session if warranted. Remove only generated ignored link metadata after resolving and verifying its exact path. Do not delete broad Supabase, home, repository, or credential directories.

If credentials are exposed, treat them as compromised: stop, do not repeat them, direct the operator to revoke/rotate through Supabase, verify invalidation, and repeat authentication only through the protected path.

If CLI connectivity remains blocked, close as blocked/partial with the failed layer, sanitized error class, evidence checked, exact operator steps, and next verification. Do not claim that SQL Editor or application SDK access proves CLI connectivity.

## Sprint 020C Handoff

The closeout must state one of:

- CLI is operational and suitable for the approved metadata-only portion of 020C
- CLI is operational for Management API/linking but not for the required 020C database audit
- CLI remains blocked, with the exact unresolved layer

Do not create the 020C audit account or run its audit under Sprint 020D.

============================================================
FILE: planning/sprints/020D-supabase-cli-authentication-linking-read-only-connectivity/acceptance.md
============================================================

# Sprint 020D - Supabase CLI Authentication, Linking And Read-Only Connectivity Acceptance

## Local Runtime

- [ ] Project-local CLI provenance and version are recorded from package/lockfile and successful execution.
- [ ] CLI launches through an approved state-directory path without redirecting credentials into the repository or weakening filesystem controls.
- [ ] No global install, package download, dependency upgrade, Docker install, or local-stack operation occurs.
- [ ] Generated CLI/link state is ignored and unstaged.

## Authentication And Target Safety

- [ ] Authentication uses a supported protected interactive/browser/native-secret flow.
- [ ] No personal access token, database password, connection URI, credential-store content, or secret fragment appears in conversation, repository files, command arguments, screenshots, or retained output.
- [ ] Authenticated project discovery succeeds and includes exact project reference `tagnbgkroihagjmvehlx`.
- [ ] Operator confirms the exact project is production before linking.
- [ ] Wrong-account, wrong-target, TLS, or credential-exposure stop conditions are tested procedurally and documented.

## Link And Read-Only Connectivity

- [ ] Repository link succeeds against exactly `tagnbgkroihagjmvehlx`.
- [ ] Link metadata is verified by safe fields/presence only and remains ignored/uncommitted.
- [ ] A non-mutating Management API operation succeeds.
- [ ] A non-mutating linked database/migration/catalog operation succeeds using protected database authentication.
- [ ] Evidence identifies which connectivity layers passed and any limitations relevant to Sprint 020C.
- [ ] No remote schema, migration history, row, policy, grant, function, auth, storage, secret, project-setting, billing, or deployment state changes.

## Documentation And Validation

- [ ] `docs/SUPABASE_CLI_CONNECTIVITY_020D.md` contains sanitized runtime, authentication, link, database, limitation, and recovery evidence.
- [ ] Any new validator rejects secret-bearing patterns, prohibited mutation commands, unpinned CLI installation, and tracked `supabase/.temp` content.
- [ ] `planning/STATUS.json` parses and durable planning records distinguish active/closed 020D from paused 020C and completed 020B.
- [ ] `git diff --check` passes, allowing only existing line-ending warnings.
- [ ] No secret is staged or committed.
- [ ] No commit, push, PR, migration, remediation, application change, deployment, Stripe action, public reopening, or Sprint 020C audit-account action occurs.
- [ ] Every manual intervention includes blocker, evidence, exact numbered action, and follow-up verification.

## Outcome Classification

Builder closes with exactly one evidence-backed classification:

- **operational**: all four connectivity layers pass
- **partially operational**: local runtime, authentication, and linking pass, but database connectivity does not
- **blocked**: local runtime, authentication, target confirmation, or linking cannot safely complete

Do not mark operational based only on CLI installation, version output, SQL Editor access, application SDK access, or project discovery.

============================================================
FILE: planning/sprints/020D-supabase-cli-authentication-linking-read-only-connectivity/handoff-prompt.md
============================================================

# Sprint 020D - Builder Handoff Prompt

You are Builder for Sprint 020D under the `strict` workflow profile.

Read `AGENTS.md`, `planning/STATE.md`, every file in this sprint folder, the active paused Sprint 020C artifacts, `docs/BIOCHEMISTRY_REMOTE_READINESS_020.md`, `docs/DATABASE_AUDIT_REVIEW_020C.md`, `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`, package/lockfile CLI evidence, Supabase configuration, existing migrations/verification SQL, risks, questions, and Architect briefing before acting.

Your task is to make the pinned project-local Supabase CLI operational through four proven layers: local runtime, protected Management API authentication, exact project linking, and non-mutating database connectivity. Use `npx --no-install supabase`. Do not install, upgrade, or substitute another CLI.

Resolve the `C:\Users\rrank\.supabase` state-write blocker through a narrowly approved execution path. Do not repurpose `HOME`, `USERPROFILE`, or `CODEX_HOME`; do not create a workspace-local fake home; and do not copy credentials into the repository. External command approval must remain command-specific and must not provide blanket permission for mutation-capable Supabase commands.

Never ask for or accept a personal access token, database password, connection URI, or secret fragment in this conversation. The operator must use a supported protected interactive/browser/native-secret mechanism. Verify project reference `tagnbgkroihagjmvehlx` and its production classification before linking.

Inspect installed help and official documentation before each selected remote command. Proceed only when it is demonstrably non-mutating or writes only supported local authentication/link metadata. Do not run `db push`, `db reset`, migration mutation, seed, deploy, secrets/config writes, schema/data changes, or any uncertain command. Do not treat `--dry-run` as safe without evidence.

Keep Sprint 020C paused. Do not create its audit account, receive its credential, run its audit, or remove its account under this sprint. At close, state whether the CLI is fully operational, partially operational, or blocked and whether it is suitable for 020C's metadata-only audit.

Preserve unrelated dirty-worktree changes. Produce sanitized durable evidence and recovery instructions, validate planning state and ignored link metadata, and do not commit, push, create a PR, deploy, migrate, remediate, or change production state.
