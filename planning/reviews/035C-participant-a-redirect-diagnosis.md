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
