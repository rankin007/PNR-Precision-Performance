# Sprint 021J Authenticated Proof Results

## Current phase

`authenticated-role-rls-proof-failed-clean`

Credential-free validation passed: Pack identity, source hashes, 19/19 new harness safety tests, Sprint 021 static/focused tests, TypeScript, lint, and production build. `.env.local` is ignored/untracked and exists; `.env.test.local` is ignored/untracked and does not yet exist. Neither file was displayed or edited by Builder. No protected file has been loaded, no run selected, and no remote mutation has occurred.

## Manual intervention record

- Blocker: Sprint 021I proved no autonomous exact-candidate protected-secret injector is available.
- Evidence checked: process injection absent or old-target-bound; dashboard paths require prohibited reveal/output transfer; no alternate protected injector exists.
- Required action: operator privately provisions the two ignored local files exactly as specified in the applied 021J requirements.
- Exact private steps:
  1. Open `.env.local` in a trusted local editor outside Codex and any captured terminal/browser tool.
  2. Set the public Supabase URL and public anon/publishable value for candidate `uvskssaecdhxcgytkasc`.
  3. Remove the service-role variable and all old-project Supabase URL/key duplicates from `.env.local`.
  4. Open or create `.env.test.local` in the same trusted editor.
  5. Put exactly one non-comment entry in `.env.test.local`: the service-role variable with the candidate service-role/secret value.
  6. Save both files without pasting values into conversation, commands, screenshots, or reports.
  7. Reply only with the approved readiness phrase.
- Safe response phrase: `021J candidate local configuration is ready.`
- Builder verification afterward: ignored/untracked status, schema separation, exact candidate Stage A before protected Stage B, sanitized protected presence, authoritative remote baselines, and full proof readiness.

## First operator-checkpoint verification

- Readiness phrase was received without credential material.
- Both filenames are ignored and untracked.
- `.env.local` exists, but Stage A stopped with sanitized `ENV_NAME_REFUSED`; at least one variable name is outside the permitted public pair.
- `.env.test.local` is absent at the project root.
- Stage B did not read protected material. No run, remote request, or mutation occurred.
- Required correction: reduce `.env.local` to exactly the two permitted public Supabase entries and create the correctly named `.env.test.local` at the project root with exactly the one permitted service-role entry, then return the readiness phrase again.

## Second operator-checkpoint verification

- Both files now exist and remain ignored/untracked.
- Stage A again stopped with sanitized `ENV_NAME_REFUSED`; `.env.local` still contains at least one non-comment name outside the permitted public pair.
- Stage B again did not open `.env.test.local`; no protected material, run, request, or mutation occurred.

## Third operator-checkpoint verification

- Selected readiness annotation was accepted as the safe readiness response.
- Both files remain present, ignored, and untracked.
- Stage A again returned `ENV_NAME_REFUSED`, proving an additional active variable remains in `.env.local`.
- Stage B did not open the protected file; no protected material, run, request, or mutation occurred.

## Corrected provisioning and protected preflight

- Stage A eventually passed exact candidate target and public-file schema after sanitized correction rounds.
- Stage B passed protected-file schema, candidate binding, presence/category, no-request, and clearing checks.
- The first authorized read-only candidate remote preflight stopped at `AUTH_BASELINE_QUERY_FAILED`; no data was returned and no mutation occurred.
- Protected state was cleared and the child process ended. No run ID was selected.
- Required operator correction: privately verify `.env.test.local` contains the exact candidate service-role/secret credential, with no quotes, spaces, placeholder markers, anon/publishable value, or old-project value, then return only the approved readiness phrase.

## Final protected run

- Fresh run: `021J-RLS-20260721-01`, selected after exact-target and authoritative zero-state preflight.
- Target-first public validation passed.
- Protected schema, presence/category, candidate binding, no-output, and clearing checks passed.
- Both candidate and old project were `ACTIVE_HEALTHY`; candidate was linked and old project unlinked.
- Candidate migration ledger was exactly `0001`–`0012`.
- Starting Auth/application/Storage baseline was zero.
- Ten deterministic `.invalid` Auth identities and genuine isolated candidate sessions were created without delivery.
- The bounded application/role/two-stable/four-horse/access/ownership/test topology was created within ceilings.
- The first Administrator direct-RLS horse-read assertion returned an operation error rather than the required allowed result. The assertion matrix stopped immediately with `HORSE_READ_FAILED_ADMIN`; no later direct-RLS, comment, revocation, or application-route assertion was credited.
- Cleanup ran dependency-safe with application state before Auth identities.

## Closing restoration evidence

- Final Auth users: zero.
- Final application users, profiles, stables, horses, access assignments, tests, and notes: zero.
- Final Storage buckets: zero; 021J created no Storage objects.
- Candidate ledger remains exactly `0001`–`0012`.
- Candidate and old project remain `ACTIVE_HEALTHY`; old-project application data and credentials were not accessed and the old project was not mutated.
- Security Advisor remains zero errors / 22 warnings / zero suggestions.
- Site URL remains production and the redirect allowlist contains only the production callback.
- Protected sessions, artifacts, values, child process, and dashboard verification state were cleared.
- Operator-managed `.env.local` and `.env.test.local` remain ignored, untracked, undisplayed, and untouched by Builder.

## Coverage boundary and next scope

Authenticated session/bootstrap and cleanup are proved. The authorization matrix did not pass: the first Administrator direct-RLS read errored. Representative application-route agreement, comment, role, denial, and revocation proof are not run and must not be implied. Email delivery and real passwordless callback certification remain outside 021J and were not tested.

The smallest next Architect scope is a corrective Sprint 021K investigation of the sanitized Administrator direct-RLS operation error, preserving the successful target-first credential boundary and exact cleanup method. No production cutover or main-roadmap return is warranted.
