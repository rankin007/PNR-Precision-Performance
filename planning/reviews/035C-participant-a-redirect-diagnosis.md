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
