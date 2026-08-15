# Sprint 028B evidence

Date: 2026-08-11
Class: critical
Data class: synthetic only

## Outcome

The shared Product `BiochemistryTrends` and `BiochemistryTrendChart` components now present complete stored longitudinal history for one exact accessible horse. The route is portal-guarded, history is fail-closed and version-aware, and saved chart configurations are active-user/self-only. Migrations 0024 and 0025 remain local candidates and were not applied remotely.

## Visual manifest

All four PNGs are viewport captures from the non-deployed synthetic harness under `visuals/`. Their bitmap dimensions equal the named CSS viewport dimensions.

| File | View | SHA-256 |
| --- | --- | --- |
| `01-mobile-combined-scores-414x896.png` | Stored Hydration Score and Biochemistry Trend Score at 414 x 896 | `85CD2D2967532CE728B34D9CD8FCA69BF550BF89E89572D78D4528A5F11664BA` |
| `02-mobile-current-readings-414x896.png` | Carbohydrate and raw Conductivity histories at 414 x 896 | `C373AE797EA4D90D026FDA4C905F4BBD93823F47B351665AC0F9FD776D89EE3D` |
| `03-mobile-version-history-table-414x896.png` | Complete textual history with v2/v3 and v1/v1 boundaries at 414 x 896 | `D6347DA34976D5300CD9C693CF3678CFCFF3EAD17630F8E4195AF6A252812A21` |
| `04-desktop-trends-workspace-1440x900.png` | Trends controls and saved views at 1440 x 900 | `83E3A323395C29777529AB41B44A224DAD4F0D2EEBF3681C15FD9A1A27F6C80B` |

## Browser, responsive and accessibility evidence

- Exact iPhone XS Max emulation: viewport/client/document scroll width `414/414/414`; five selects, two charts and one complete table remained present.
- Desktop: viewport `1440 x 900`, client/document scroll width `1425/1425`; five selects, two charts and one table remained present.
- 200% equivalent: a `720 x 450` CSS viewport at device-pixel ratio 2 represents `1440 x 900` physical pixels. Client/document/body widths were `705/705/705`; five selects, two charts, one table and all headings remained present.
- Minimum primary-control height and checkbox-label target height were both `44` CSS pixels.
- Wider SVG and table content is contained inside labelled keyboard-focusable horizontal scrollers; document-level horizontal overflow is zero.
- Charts provide figure headings, SVG title/description, text legends, solid/dashed cues and exact table equivalents. Missing, blocked and unscored stored scores are gaps, not zeroes.
- The four screenshots were visually inspected. The in-app browser runtime and direct image viewer were blocked by the Windows ACL helper; installed Chrome headless plus its local DevTools protocol supplied the safe rendered substitute without external browsing.

## Data and privacy proof

- An inaccessible/malformed horse hint returns selection-required and makes zero history-page calls.
- One exact accessible horse is queried through existing RLS with `deleted_at is null`, exact Brisbane bounds, exact count and pages of at most 500.
- Two complete passes must match count, stable order and every selected Product field fingerprint before any count/point is available.
- The discriminating `1,001`-row fixture uses three pages in each pass and retains all rows.
- Wrong horse, duplicate ID, invalid date, page error, count drift or same-count content drift makes the result unavailable with zero partial output.
- Stored score lines break on formula/source changes. Blocked or unscored non-null compatibility values remain gaps.
- Preference rows contain configuration only. User, horse, stable, test, note and point identity are not accepted from preference forms.
- Executed RLS proof shows user A cannot read/write/delete user B, and an administrator has no cross-user bypass.
- The visual harness uses only `Synthetic Alpha`, `Example Stable`, obviously fictitious values and non-provider source labels. No real identity, note, secret, token, credential or provider identifier appears.

## Migration and concurrency proof

- `supabase/tests/028B_user_trend_view_preferences.test.sql`: `24/24` pgTAP cases passed against disposable local PostgreSQL.
- Table shape, checks, owner/name uniqueness, one-default uniqueness, grants, active-user self-only RLS and no-admin-bypass behavior executed.
- The uncounted concurrency gate used two overlapping authenticated PostgreSQL sessions. Session B was observed waiting on the database lock held by session A, then completed with exactly two rows, one default, the exact B target default and A false.
- Deterministic fixture user, preferences, backend sessions and locks were removed; fixture/session/lock residue was `0/0/0`.
- The disposable local Supabase stack was stopped without backup after proof. No remote database was contacted or changed.

## Verification ledger

Freshly executed counted proof:

- Sprint 028B focused Product/domain: `56/56`.
- Sprint 028B executable migration/RLS: `24/24`.
- Sprint 025C direct retained: `18 + 8 + 6 = 32`.
- Sprint 035R cockpit retained: `64/64`.
- Sprint 035 dashboard retained: `33`.
- Exact fresh counted total: `56 + 24 + 32 + 64 + 33 = 209`.
- Prior accepted Sprint 025C source-integrity proof: `12/12`; the extractor dependency `@oai/artifact-tool` is unavailable locally, so this is not misreported as fresh.
- Exact evidence-covered total: `209 fresh + 12 prior accepted = 221`.

Additional gates:

- `npm run typecheck`: pass.
- `npm run lint`: pass, zero warnings/errors.
- `npm run build`: pass; optimized Product compiled and 28 static pages plus dynamic routes completed.
- The first build attempt stopped before compilation on a OneDrive `.next` reparse `readlink EINVAL`. The exact ignored generated cache was rotated recoverably inside the canonical workspace; one clean build passed and the exact backup residue is zero.
- `npm run validate:json`: pass.
- `npm run validate:static`: encoding and validators through 020F passed, then the known out-of-scope 020G metadata validator stopped because it hard-codes migration versions 0001-0023 while approved candidates 0024/0025 exist. The remaining role validator ran directly and passed. No validator scope expansion was made.
- `git diff --check` over the exact implementation set: pass.
- Fresh critical implementation inspection: PASS with no Product blocker.

## Tool corrections and substitutions

- Docker Desktop was initially stopped. It was started only for disposable local PostgreSQL proof, then the local stack and Docker Desktop were stopped to restore the pre-sprint state.
- Early pgTAP runs exposed exact expected-message, active-member fixture and nested data-changing CTE defects in the test harness. Each was corrected in scope; the final 24-case execution passed.
- The Windows `npx.cmd` child launcher returned `EINVAL`; the wrapper now launches the repository-pinned Supabase JavaScript entry point directly and shell-free.
- Chrome's minimum headless outer window made a nominal 414 screenshot a cropped 500 CSS-pixel page. Final mobile evidence instead uses DevTools device metrics and proves an exact `414 x 896` CSS viewport.
- The first mobile render exposed document overflow caused by intrinsic SVG/table widths. Shared Product scrollers were constrained with `min-w-0`/`w-full`; the focused invariant and exact geometry now prevent regression.

## Safety and cleanup

No deployment, remote migration, credential action, email, enquiry, alias movement, real-data submission, stage, commit or push occurred. The local evidence server, Supabase containers, Docker Desktop, owned Chrome processes, port 3136 listener, harness `.next`, browser profiles, intermediate screenshots/logs and patch/review copies are absent. Final staged/external/residue counts are `0/0/0`.
