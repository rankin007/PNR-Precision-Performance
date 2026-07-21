# Supabase CLI Connectivity - Sprint 020D

## Outcome

Classification: **operational**.

On 2026-07-20, all four approved connectivity layers passed against the operator-confirmed production project reference `tagnbgkroihagjmvehlx` without a remote mutation.

Sprint 020C remains paused. Sprint 020D did not create an audit account, receive or retain a database credential, execute the 020C audit, change grants, or remove an account.

## Sanitized Evidence

| Layer | Evidence | Result |
|---|---|---|
| Local runtime | Project dependency and lockfile resolve Supabase CLI `2.109.1`; `npx --no-install supabase --version` returned `2.109.1`. | Passed |
| Protected authentication | The non-TTY login attempt stopped without requesting a secret. The operator completed the supported browser flow in a visible interactive PowerShell window. Credential contents were not inspected or copied. | Passed |
| Management API | `supabase projects list` returned the exact project reference, name `PNR Precision Performance`, region `ap-southeast-1`, and status `ACTIVE_HEALTHY`. | Passed |
| Repository link | The operator confirmed the exact reference as production before `supabase link --project-ref tagnbgkroihagjmvehlx`. Safe equality validation passed and project discovery reported `linked: true`. | Passed |
| Database | `supabase migration list --linked` initialized the login role, connected to the remote database, and completed successfully. | Passed |

The generated `supabase/.temp/**` state is ignored by Git. Validation reads the project-reference file only for exact equality and does not print link files wholesale.

## Migration-History Limitation

The linked read returned local migrations `0001` through `0009` with no corresponding remote migration-history versions. This does not mean the production schema is absent: Sprint 020B independently verified the expected tables, helpers, indexes, policies, RLS states, lookup counts, and uniqueness.

The safe inference is that the existing production objects were not recorded in the CLI migration-history table under these local version identifiers. Do not run `db push`, migration repair, replay, reset, or any reconciliation command from this evidence. Migration-history alignment requires separately planned and authorized work.

## Credential Model

- The Supabase personal access token authenticates Management API commands and remains in supported user-level CLI state.
- PostgreSQL authentication is separate and was entered only through the interactive CLI prompt.
- No token, database password, connection URI, credential-store content, or secret fragment was written to repository artifacts or retained command arguments.
- User-level CLI state was checked only by presence and successful behavior, never by reading credential contents.

## Command Classification

- `supabase --version` and `--help`: local-only, non-mutating apart from normal user-level telemetry/config state.
- `supabase login`: protected authentication and supported user-level credential state.
- `supabase projects list`: Management API read-only.
- `supabase link --project-ref ...`: supported local link metadata only.
- `supabase migration list --linked`: database read-only migration-history inspection.

No migration, schema, row, policy, grant, function, auth, storage, secret, project setting, billing, deployment, Stripe, public-surface, commit, push, or PR action occurred.

## Stop And Recovery Procedures

### Wrong account or target

1. Stop all remote commands.
2. Run `npx --no-install supabase unlink` from this repository only after verifying the working directory and generated metadata path.
3. Run `npx --no-install supabase logout` if the authenticated account is wrong.
4. Revoke the affected personal access token/session in the Supabase account settings when warranted.
5. Re-authenticate through the protected browser flow, confirm the exact project reference, and repeat sanitized project discovery before linking.

Builder will verify that the repository is unlinked, generated state remains ignored, the intended account exposes the exact reference, and no remote command ran against an ambiguous target.

### Credential exposure

1. Stop immediately and do not repeat the exposed value.
2. Remove or sanitize retained output without copying the value elsewhere.
3. Revoke the personal access token or rotate the database password through Supabase, according to the exposed credential type.
4. Verify invalidation through a protected operator-controlled path.
5. Re-authenticate or relink only after rotation.

Builder will verify that old authentication fails, new protected authentication succeeds, and repository/history scans contain no exposed value.

### Stale link

1. Confirm the repository root and expected `supabase/.temp` path.
2. Use `npx --no-install supabase unlink`.
3. Remove only the exact generated ignored link metadata if the supported unlink leaves stale files.
4. Reconfirm the production reference before linking again.

Builder will verify safe equality, ignored/untracked state, Management API visibility, and read-only database connectivity.

## Sprint 020C Handoff

The CLI is operational and suitable as connectivity for the approved metadata-only portion of Sprint 020C. This does not authorize Sprint 020C account creation, credential delivery, audit execution, grant changes, or account removal. Architect/user must decide how the verified CLI path is incorporated into the remaining 020C lifecycle.
