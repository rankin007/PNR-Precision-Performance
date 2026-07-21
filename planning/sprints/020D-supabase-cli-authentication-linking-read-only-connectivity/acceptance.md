# Sprint 020D - Supabase CLI Authentication, Linking And Read-Only Connectivity Acceptance

## Local Runtime

- [x] Project-local CLI provenance and version are recorded from package/lockfile and successful execution.
- [x] CLI launches through an approved state-directory path without redirecting credentials into the repository or weakening filesystem controls.
- [x] No global install, package download, dependency upgrade, Docker install, or local-stack operation occurs.
- [x] Generated CLI/link state is ignored and unstaged.

## Authentication And Target Safety

- [x] Authentication uses a supported protected interactive/browser/native-secret flow.
- [x] No personal access token, database password, connection URI, credential-store content, or secret fragment appears in conversation, repository files, command arguments, screenshots, or retained output.
- [x] Authenticated project discovery succeeds and includes exact project reference `tagnbgkroihagjmvehlx`.
- [x] Operator confirms the exact project is production before linking.
- [x] Wrong-account, wrong-target, TLS, or credential-exposure stop conditions are tested procedurally and documented.

## Link And Read-Only Connectivity

- [x] Repository link succeeds against exactly `tagnbgkroihagjmvehlx`.
- [x] Link metadata is verified by safe fields/presence only and remains ignored/uncommitted.
- [x] A non-mutating Management API operation succeeds.
- [x] A non-mutating linked database/migration/catalog operation succeeds using protected database authentication.
- [x] Evidence identifies which connectivity layers passed and any limitations relevant to Sprint 020C.
- [x] No remote schema, migration history, row, policy, grant, function, auth, storage, secret, project-setting, billing, or deployment state changes.

## Documentation And Validation

- [x] `docs/SUPABASE_CLI_CONNECTIVITY_020D.md` contains sanitized runtime, authentication, link, database, limitation, and recovery evidence.
- [x] No new validator was needed; existing static checks plus direct package provenance, ignore, JSON, staged-file, secret-pattern, and prohibited-command validation cover the 020D artifacts.
- [x] `planning/STATUS.json` parses and durable planning records distinguish active/closed 020D from paused 020C and completed 020B.
- [x] `git diff --check` passes, allowing only existing line-ending warnings.
- [x] No secret is staged or committed.
- [x] No commit, push, PR, migration, remediation, application change, deployment, Stripe action, public reopening, or Sprint 020C audit-account action occurs.
- [x] Every manual intervention includes blocker, evidence, exact numbered action, and follow-up verification.

## Outcome Classification

Builder closes with exactly one evidence-backed classification:

- **operational**: all four connectivity layers pass
- **partially operational**: local runtime, authentication, and linking pass, but database connectivity does not
- **blocked**: local runtime, authentication, target confirmation, or linking cannot safely complete

Do not mark operational based only on CLI installation, version output, SQL Editor access, application SDK access, or project discovery.
