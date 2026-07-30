# Sprint 035C Participant A Redirect Diagnosis

## Sanitized participant state

- Trainer Participant A: Sprint-035C-owned Auth identity exists; email confirmation completed; app-metadata matching not yet applied; authenticated Preview session not yet proven.
- Trainer Participants B and C: not started; no identity or application access created.
- No password was created and no user metadata was changed.
- Current Sprint-owned creation: application/Auth/Storage `0/1/0`.

No consumed invitation URL, token, confirmation code, OTP, magic link, inbox, Auth UUID, access/refresh token or browser storage was requested or inspected.

## Exact environment verification

Deployment `dpl_3YuZ36Jh8h6U5CgCGw9NQzpDTDfy` remained Ready, Preview-classified, exact-source for `aa0cf5ddb598a73056677e030ec6a39141764cb9` and alias-free. The exact Preview origin returned HTTP `200`; artifact-free `/auth/callback?next=/portal` returned a safe `307` to the same Preview origin `/portal`. The Supabase allowlist contained exactly the production callback and the exact Preview callback. Scheme, host, path, punctuation and casing matched; no stale Preview, production hostname, duplicate path, whitespace or malformed value was present. Production Site URL, callback, deployment and five accepted aliases remained unchanged.

## Root cause and mechanism decision

The Supabase Dashboard invitation dialog exposes only an inbox field and cannot set or prove `redirectTo`; it is unsuitable for Sprint 035C and must not be retried. Supabase documents that admin email invitations do not support PKCE. The application callback supports the SSR PKCE `code` form by calling `exchangeCodeForSession`.

The Preview sign-in server action created `emailRedirectTo` from `NEXT_PUBLIC_SITE_URL` and otherwise used `http://localhost:3000`. The approved Preview does not configure that variable. The observed unreachable post-invitation destination is therefore consistent with a redirect-origin defect, while direct Preview reachability and callback routing are healthy.

## In-scope correction

The passwordless action now derives the current same-origin request origin, accepts only the approved production hosts or generated `pnr-precision-performance-*-rankin007s-projects.vercel.app` hosts over HTTPS, rejects paths/queries/fragments/credentials/ports and fails closed when no approved origin exists. The existing callback remains the PKCE `code` exchange authority.

The protected Admin helper now processes one alias at a time, requires a hidden TTY inbox entry, searches before mutation, refuses absent or duplicate identities, merges existing administrator-controlled `app_metadata`, tags only `participant_alias` and `pilot_sprint`, emits sanitized status and records exact sanitized ownership for Auth-last cleanup. It does not invite or resend and never uses metadata for authorization/RLS.

## Pre-deployment validation

- Passwordless redirect-origin regression: pass.
- Protected helper self-test: pass, including hidden input, search-before-mutation, existing-only matching, metadata preservation, owned ledger and sanitized output.
- Sprint 035 trainer-dashboard regression: pass.
- Sprint 021AH, Sprint 022 and Sprint 028 focused regressions: pass (Sprint 022/028 also passed in the canonical local suite).
- TypeScript and focused ESLint: pass.
- Canonical local validation passed JSON, domain, roles, Supabase self-tests, static validation, transport isolation, encoding and the affected regressions. Its integrated lint step encountered a Windows `.next` cache unlink lock after an earlier overlapping validation run; standalone lint had already passed before the lock.
- Local Next production build reached the Next builder but produced no compilation output within bounded 180-second and 600-second runs. The exact clean-source Vercel Preview production build is the approved stronger substitute and must pass before operator handoff.
- `git diff --check` and maintained-text encoding validation: pass.

## Exact corrected Preview

Correction commit `07edea49153fb557a2afc2a066f96c30a102e4c7` was pushed only to the scoped Sprint 035C branch. Exact clean-archive Preview deployment `dpl_G8StMkGqfTmUsNMpAfNUCwontC42` is Ready, Preview-classified and alias-free at `https://pnr-precision-performance-n7xbelwg8-rankin007s-projects.vercel.app`. Its Vercel production build compiled, linted, type-checked and generated all routes successfully, providing the approved substitute for the stalled local build.

Artifact-free checks returned `200` for the origin and `307` from `/auth/callback?next=/portal` to the exact same Preview origin `/portal`. The Supabase allowlist now contains exactly the unchanged production callback and `https://pnr-precision-performance-n7xbelwg8-rankin007s-projects.vercel.app/auth/callback`; the stale Preview callback was removed. The production Site URL remains unchanged.

## Protected operator wrapper correction

The operator safely terminated an attempted manual handoff after an accidental duplicate SecureString-to-BSTR allocation. The participant helper did not run, no inbox was entered, no app metadata changed and no remote mutation occurred. Participant A remains owned-confirmed-untagged/session-unproven; B/C remain not started; owned application/Auth/Storage remains `0/1/0`.

Sprint-owned wrapper `scripts/Invoke-SupabaseParticipantHandoff035C.ps1` replaces all manual pointer and environment handling. It accepts only A/B/C, guards the exact project, branch, remote-equal HEAD and clean worktree, refuses redirected/non-console execution and detected transcription, prompts for the service-role value as a SecureString, performs exactly one BSTR allocation, supplies the secret only in the child Node environment, inherits console streams for hidden inbox input, removes the child environment value and zeroes/disposes owned memory in `finally`, and passes through only the helper's sanitized output and exit code. It writes no secret-bearing file and leaves the parent secret environment unset.

Static/self-test `scripts/test-supabase-participant-wrapper-035C.ps1` uses no service-role value and proves the alias/project/repository guards, child-only secret environment, argument exclusion, single allocation/free/disposal structure, success/failure/cancellation/exception cleanup control paths, interactive child configuration, transcription/file-write refusal and sanitized passthrough contract. The existing Node helper self-test also passes.

## Participant A containment event

- A passwordless request was initiated from the Preview.
- The email redirected to the production root with a code query.
- The Preview callback was not reached.
- The code was disclosed outside the protected path and is treated as compromised.
- Participant execution stopped immediately; B/C were not started; no participant portal acceptance is claimed.

The compromised value is not recorded, requested, reproduced, retained, tested or exchanged. Session/application impact, exact-owned Auth cleanup and redirect diagnosis are pending sanitized proof.

### Containment and redirect correction prepared

Preview environment-name inspection confirms `NEXT_PUBLIC_SITE_URL` is not configured, so no such environment fallback overrides Preview. The deployed correction build includes the sign-in action and `/auth/callback`, but the action trusted the optional `Origin` header and did not bind the redirect to Vercel's forwarded host/proto boundary. The observed production redirect proves that header-based selection did not preserve the requested Preview origin; no environment fallback explains it.

The narrow correction now derives HTTPS origin from the first `x-forwarded-host`/`x-forwarded-proto` values (falling back to `host` only as the forwarded host source), validates the exact approved generated-Preview or production hostname, refuses malformed/HTTP forwarded values without falling through to production, and uses `Origin` only when forwarded headers are absent. `NEXT_PUBLIC_SITE_URL` is development-local fallback only. The outbound Auth option remains explicitly `emailRedirectTo` and is built as the exact origin `/auth/callback?next=...`; Preview and production cases have focused regression coverage.

The protected helper adds A-only containment. It accepts the inbox through hidden TTY input, requires the exact project, one exact matching Auth identity, the recorded A creation window, and untagged metadata. It checks exact application user/profile/membership and assignment state, refuses access or ownership ambiguity, removes only a bootstrap-only application user/profile if present, deletes the exact Sprint-owned Auth identity last (invalidating its session state), verifies Auth/application absence, and emits sanitized exchange-indicator, production-bootstrap, session-revocation and `0/0/0` status only. No compromised authentication artifact is accepted by this path.

### Containment guard correction

The first protected A containment attempt returned `OWNERSHIP_AMBIGUOUS` and stopped before mutation because the helper incorrectly required the entire approved project to contain exactly one Auth identity. No metadata, application or Auth record changed, the child process ended, and the parent service-role environment was verified absent. Current owned application/Auth/Storage remains `0/1/0`; the temporary Preview callback remains present.

The corrected guard permits unrelated Auth identities while requiring exactly one protected inbox match. It separately refuses zero or duplicate exact matches, any different identity tagged `participant_alias=A` plus `pilot_sprint=035C`, participant tags on the candidate, and creation outside the recorded A creation window bounded after protected handoff commit `e83f959f76fd868dd4d89ef6ed5e978dba25bb44` and before redirect-correction commit `07edea49153fb557a2afc2a066f96c30a102e4c7`. These event boundaries must agree; inbox/date alone do not establish ownership.

Before mutation, the helper writes only sanitized A ownership classification to the protected containment ledger. It retains exact application cardinality and zero membership/assignment requirements, removes bootstrap-only application state before Auth, deletes Auth last, verifies owned Auth/application absence, and proves the unrelated Auth identity set is unchanged without emitting its count or identifiers. The twelve-case no-secret containment test covers the required accept/refuse, ordering, isolation, zero-owned and output boundaries.

Validation passed: twelve-case containment regression, helper self-test, protected wrapper static self-test, passwordless redirect regression, Sprint 035 dashboard regression, TypeScript, focused ESLint, canonical JSON, maintained-text encoding and `git diff --check`. No real service-role value, inbox, Auth identifier, authentication artifact or unrelated-user count was used or emitted.

### Participant A containment checkpoint

The corrected protected containment returned only the accepted sanitized result: pass; A contained-owned-deleted; prior provider sign-in indicator present; production callback not processed; active session revoked by owned-identity deletion; zero application records removed; owned application/Auth/Storage `0/0/0`.

Independent local proof confirms the parent service-role environment is absent and the protected ledger contains exactly the sanitized A entry `contained-owned-deleted`, `sprint-owned`, `recorded-a-creation-window`, with no B/C entry. The helper can produce the accepted result only after proving the exact A Auth identity and application user are absent and the unrelated Auth identity set is unchanged. Because no application user existed, no profile, membership, stable/staff role, trainer/owner or biochemistry access dependency could remain for A. Storage stayed zero because neither the failed flow nor containment created or mutated Storage.

The prior provider sign-in indicator is retained only as that classification. The compromised code, prior message, deleted identity and old session are not retained, reconstructed or reusable. Participant acceptance remains unclaimed.

Read-only provider reconciliation confirms the temporary callback remains exactly `https://pnr-precision-performance-n7xbelwg8-rankin007s-projects.vercel.app/auth/callback` beside the unchanged production callback, with production Site URL unchanged. Deployment `dpl_G8StMkGqfTmUsNMpAfNUCwontC42` remains Ready/Preview and alias-free. All five stable aliases remain mapped to accepted production source `pnr-precision-performance-khx3yoqq4-rankin007s-projects.vercel.app`. B/C remain untouched.
