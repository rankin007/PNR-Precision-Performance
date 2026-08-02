# Sprint 035N Review — Exact Preview Callback And Trainer Acceptance

**Outcome:** `preview-callback-mutation-blocked-clean`

## Governing identity

- Branch: `codex/035N-exact-preview-callback-and-trainer-acceptance`
- Exact baseline SHA: `143f03344561c622a074ab40052c2dbb132a6fb3`
- Governing implementation candidate: `b1bf770dc6ab3839cfc24c53563f6ed6310e08ba`
- Exact alias-free Preview deployment: `dpl_6NBk2VKPZZUS4QqdstqDHtGk8EVV`
- Starting evidence: 58 maintained local checks passed, 14 authenticated rendered checks unrun, zero human attempts and zero Sprint-owned external state.

## Fixed expected-count arithmetic

Before either Sprint 035N assertion file or harness was authored, the focused lifecycle target was fixed at **18 assertions**:

| Focused category | Count |
|---|---:|
| Exact callback contract | 10 |
| Privacy and protected-value suppression | 4 |
| Dependency ownership and exact cleanup | 4 |
| **Focused 035N total** | **18** |

Complete automated target: `58 maintained local + 18 focused 035N lifecycle + 14 authenticated rendered = 90 automated checks`.

The private human journey has eight observed steps and is a separate acceptance boundary. It contributes zero automated assertions.

## Callback lifecycle authority

The temporary callback is owned only by Sprint 035N. The sanitized provider before-state is the rollback authority. Cleanup order is: stop participant activity; end Sprint-owned sessions; remove synthetic application dependencies; remove an exact Sprint-created Auth identity last among application/Auth records; remove only the exact temporary callback; reread provider configuration; prove exact Site URL and redirect-allowlist restoration. Adopted, pre-existing or ambiguous state must not be deleted.

## Sanitized provider reconciliation

Read-only inspection used the signed-in Supabase dashboard for the exact clean-rebuild project after the Management API credential was absent from the private process environment. The Site URL remained the production Site URL. The complete allowlist had two entries: the required production callback and one pre-existing alternate Preview callback. It did not contain the governing 035M callback.

Repository evidence did not identify the alternate Preview callback or establish its owner, purpose, retention decision or cleanup authority. Sprint 035N classifies an unknown pre-existing provider value as a material stop. No callback was added, removed or rewritten. Before/delta/after is `sanitized read / zero delta / unchanged by Sprint 035N`.

## Rendered, human and fixture result

- Authenticated rendered checks: `0/14` run because the provider gate stopped before protected activity.
- Human journey: zero attempts; all eight observed steps remain unrun.
- Fixtures and sessions: none created.
- Sprint-owned Auth/application/Storage/provider state: zero.
- Production deployment, aliases, DNS, Site URL, public release, production data and `develop`: unchanged.

## Validation

**Tests:** 76 passing, 0 failing within the runnable local boundary; 14 authenticated rendered checks unrun.

- Maintained Sprint 035M: `58/58` (`42 executable + 16 static/source`).
- Focused Sprint 035N lifecycle: `18/18` (`10 callback + 4 privacy + 4 cleanup`).
- Complete target remains `58 + 18 + 14 = 90`; achieved evidence is `76 passing + 14 unrun = 90`.
- The separate eight-step human journey contributes zero automated assertions and was not attempted.
- JSON, domain including maintained 022/022B, roles, Supabase self-tests, static validation, TypeScript, lint and production build passed.
- Initial clean-worktree validation lacked dependencies. Exact `npm ci --ignore-scripts` from the worktree lockfile supplied the safe equivalent environment; rerun local validation and build passed. The historical optional `playwright-core` transport check remains unavailable and is superseded for this stopped boundary by the provider read plus maintained scoped checks.

## Manual intervention

**Blocked:** ownership and intended lifecycle of the one pre-existing alternate Preview callback are unknown.

**Evidence checked:** exact project identity in the signed-in dashboard; production Site URL; complete two-entry allowlist; repository-wide URL/ownership search; 035M closeout; lifecycle ledger; earlier provider evidence.

**Private action required:**

1. An authorised Supabase project owner privately opens Authentication → URL Configuration for the clean-rebuild project.
2. Identify which sprint, operator or live dependency owns the non-production callback. Do not paste the URL, credentials or account details into chat.
3. If required, document its owner and retention authority. If obsolete, obtain explicit removal authority and remove only that exact entry through the provider UI.
4. Confirm privately that the production Site URL and production callback remain unchanged and report only `retained with owner` or `removed as obsolete`.

**Subsequent verification:** a future authorised Builder must reread the complete configuration and reconcile the sanitized before-state before adding the governing callback. No human acceptance may start before that verification.
