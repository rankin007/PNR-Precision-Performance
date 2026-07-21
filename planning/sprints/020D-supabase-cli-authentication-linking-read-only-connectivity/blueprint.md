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
