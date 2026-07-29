# Sprint 035 Trainer Dashboard Implementation And Validation

Date: 2026-07-30
State: `implementation-validated-preview-and-pilot-pending`

## Delivered locally

- Replaced the portal-shell wording with a trainer operational worklist.
- Removed all unauthorised sample-horse fallbacks.
- Added pure typed derivation for `no result`, `draft / incomplete`, `pending review` and `completed` states.
- Added deterministic operational ordering and permission-aware existing actions.
- Kept horse and test composition server-side, RLS-filtered and bounded to 100 horses and 200 latest rows.
- Reduced the horse page to accessible identity, latest stored workflow context, existing next action and dashboard return.
- Added explicit unavailable, failed, empty and denied presentation without clinical inference.

No schema, migration, RPC, RLS, role, assignment, clinical authority, upload, voice, trend, commerce, public-site or production behavior changed.

## Evidence

Passed: focused Sprint 035 and retained Sprint 028 tests; `test:domain`; JSON, roles, Supabase self-test, static, TypeScript, lint and local validation; two exact production builds; and `git diff --check`.

A bounded local browser check proved `/portal` redirects to the secure setup state when Supabase is not configured. Phone `390x844` and desktop `1280x800` checks had no horizontal overflow, one `h1`, a main landmark, and disabled sign-in controls. This is protected-entry proof only; it is not authenticated dashboard or trainer acceptance.

## Remaining preview and pilot boundary

Blocked/not working: authenticated rendered dashboard acceptance, exact-candidate non-production preview verification and trainer participation are unavailable because the clean worktree has no approved Supabase runtime configuration, synthetic pilot account or designated trainer participants.

Evidence checked: the exact Sprint 034 baseline is valid; all local automated/static/build gates pass; the local server correctly denies protected access without configuration; no safe test-only auth bypass exists or is approved.

Exact user/operator action needed:

1. Designate one to three trainer representatives without supplying credentials in chat or repository files.
2. Confirm the authorised non-production Supabase/Vercel preview target and synthetic, non-identifying fixture authority.
3. Coordinate participant account invitations through the approved provider path.
4. Confirm when accounts and preview are ready; do not send passwords, tokens or real identifiers.

Builder will verify the exact candidate, run synthetic phone and larger-viewport permission/accessibility acceptance, conduct the five-step task script, record privacy-safe findings, correct in-scope failures, clean owned fixtures Auth-last, and close to one accepted outcome.

No preview was deployed, no participant was contacted and no production system changed.

## Independent biochemistry failure correction — 2026-07-30

`getAccessibleHorseDetail` now captures the horse-access and biochemistry query results independently. Safe denial takes precedence when the horse query returns no accessible row or an error. When the horse is accessible but the biochemistry query fails, the composition returns sanitized `Unavailable`/`failed`, clears the latest snapshot, derives no normal workflow state and exposes no record action. The horse page renders an alert plus `No record action is available while workflow information is unavailable.` Raw provider errors are not returned or rendered.

Focused regression proves successful empty query => `No result` and permitted capture for writers; failed query => `failed`, not `No result`, with a null action and fixed sanitized message; provider detail exclusion; wrong-horse/cross-stable/revoked denial agreement; all accepted workflow states; deterministic ordering; and read-only/write action agreement.

Exact correction validation passed:

- `npm.cmd run test:dashboard-035`
- `npm.cmd exec -- node scripts/test-valid-null-safe-soft-delete-authorization-021AH.mjs`
- `npm.cmd run test:domain` including Sprint 022 and Sprint 028/031 maintained regressions
- `npm.cmd run test:workspace-028`
- `npm.cmd run validate:json`
- `npm.cmd run test:roles`
- `npm.cmd run test:supabase-self`
- `npm.cmd run validate:static`
- `npm.cmd run validate:local`
- `npm.cmd run lint`
- `npm.cmd run typecheck`
- `npm.cmd run build` — 28 static pages and expected route inventory completed
- `git diff --check`

No supporting-tool substitution was required. Authenticated preview and trainer-visible acceptance remain not run and are not inferred.

## Scoped branch publication

Implementation commit: `1b21785` (`Implement Sprint 035 trainer dashboard MVP`). Initial evidence commit: `12e3f81` (`Record Sprint 035 validation and pilot boundary`). The configured SSH push failed before remote mutation because no usable SSH identity was available. Builder diagnosed once and used the existing authenticated GitHub CLI HTTPS credential as an equivalent scoped transport. Local and remote branch tips then matched exactly at `12e3f81b3d1b9fb84a5385372b4e1b5a719b0c74`.

Only `codex/035-trainer-pilot-and-dashboard-mvp` was pushed. No merge, `develop` push, PR, history rewrite, preview deployment or production action occurred.
