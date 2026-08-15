# Architect Pack — Sprint 028B Longitudinal Trends, History and Saved Views

Created: 2026-08-11
Workflow profile: strict
Flight class: critical
Execution boundary: local Product, schema candidate, tests and synthetic evidence only

This Pack creates the strict Builder sprint files. It does not apply itself, edit Product code, apply a migration, deploy, create credentials, send email/enquiries, move aliases, stage, commit or push.

============================================================
FILE: planning/sprints/028B-longitudinal-trends-history-and-saved-views/requirements.md
============================================================

# Sprint 028B Requirements

## Outcome

Replace the placeholder Portal Reports route with a permission-safe, mobile-first longitudinal biochemistry workspace. An authorised portal user can select one accessible horse, view stored Hydration Score and Biochemistry Trend Score history, view the four current trainer readings, filter AM/PM and a bounded date range, and save personal chart configurations. The presentation remains clinically neutral and version-aware.

## Authority and truthful limitations

- Sprint 025C supplies the accepted local numeric v2 contract and stored snapshots. Migration `0024` is not remotely applied and no Production activation is part of this sprint.
- Use `Biochemistry Trend Score` as the provisional display-only label for stored `health_score`. Do not rename database or TypeScript compatibility fields.
- Current v2 readings are Carbohydrate, Urine pH, Saliva pH and raw Conductivity. Urea remains retained but hidden. Average pH remains legacy-only and hidden.
- Turbidity is named in the canonical Done target but is absent from the current biochemistry test/capture contract. Do not invent, derive or display it. Sprint 028B therefore cannot close the full five-input P39 criterion.
- Green/Amber/Red thresholds, zone meanings, attention filters, recommendations and today guidance remain unavailable under Sprint 025D. Do not infer them from scores, source tables, examples or historical values. P43 and P44 remain open.
- Temperature and its `37.5` reference line are outside this biochemistry-history sprint. P12 remains open.
- Historical v1 and v2 values are immutable stored snapshots. Do not backfill, recalculate or reinterpret either version.

## Required Product behavior

1. `/portal/reports` requires the existing portal session boundary and shows no fixture or sample data when the authorised service is unavailable.
2. List only accessible horses. A `horseId` query value is a hint: accept only an exact accessible ID, silently ignore malformed/missing/inaccessible values, and never disclose whether another horse exists.
3. Query one selected accessible horse only, through existing `biochemistry_tests` RLS, excluding soft-deleted rows and bounding `test_date` by an explicit Brisbane date window.
4. Offer `30`, `90` and `365` day windows, defaulting to `90`. Retrieve every accessible row inside the selected window in stable pages; do not rely on the provider's default row ceiling or use a silent global limit. Validate unique row IDs, exact horse ID and requested date bounds before composition. Any row/query/page inconsistency makes the whole trend result unavailable; do not render partial history as complete.
5. Offer time filters `AM`, `PM`, `AM + PM`, and `All recorded times`. `AM + PM` excludes legacy `unspecified` rows and states the excluded authorised count; `All recorded times` includes them and labels them `Unspecified`. Never silently classify `unspecified` as AM or PM.
6. Present stored Hydration Score and stored `health_score` as percentages. Use the display-only label `Biochemistry Trend Score`; show formula and lookup-source version in point/table detail.
7. Never connect a score line across a `formula_version` or `lookup_source_version` boundary. Render a visible line break and textual version boundary. Missing/unscored/blocked scores are gaps, not zeroes or normal results.
8. Present the four current reading histories with exact units and precision: Carbohydrate `%` to one decimal, Urine pH and Saliva pH to two decimals, and raw Conductivity `mS/cm` to two decimals. Do not chart converted C as if it were the trainer reading.
9. Support individual and compatible combined views without normalising unlike units or adding misleading dual axes:
   - Hydration Score and Biochemistry Trend Score may be combined;
   - Urine pH and Saliva pH may be combined;
   - Carbohydrate and Conductivity remain separate charts.
10. Keep at most two chart groups visible at once. Provide an accessible table containing every currently filtered point and its date, time, workflow/scoring state, version and displayed values.
11. Empty, filtered-empty and unavailable are distinct. Unavailable exposes no count or chart point. A filtered-empty state explains the active filter without implying health, urgency or normality.
12. Add a clear Reports/Trends action from the horse workspace and retain current reciprocal navigation. Do not change route guards, horse permissions, capture permissions or dashboard action semantics.

## Personal saved-view behavior

13. Add local migration candidate `0025_user_trend_view_preferences.sql` for per-user chart preferences. Each preference stores only its owner user ID, a 1–40 character label, score view (`none|hydration|biochemistry|both`), pH view (`none|urine|saliva|both`), Carbohydrate visibility, Conductivity visibility, time filter, range days, default flag and timestamps. It stores no horse/stable/test ID, chart points, notes or clinical classification.
14. Database checks allow one or two visible chart groups, accepted enum/range values and at most one default per user. Preference labels are unique case-insensitively per user.
15. Enable RLS. Authenticated users may select/insert/update/delete only rows whose `user_id = current_app_user_id()`. Do not add an administrator bypass. Server actions derive the user ID from authenticated app context and ignore/reject any client-supplied owner.
16. Saving, renaming, deleting and setting a default fail visibly and atomically. A guarded database function may set the default only for a target preference owned by the current active user and must leave at most one default. Read-only horse users may still manage their own non-horse preference rows; this does not grant horse-record write access.
17. On load, use the user's valid default preference when present; otherwise use the fixed default: both scores, both pH readings, `AM + PM`, `90` days. If a stored preference is missing or invalid, fail that preference visibly and retain the safe fixed default.

## Presentation and evidence

18. Use the existing design system and no new chart dependency. Charts may use semantic HTML plus SVG, but must provide text legends, point/table values, keyboard-visible controls, non-colour version differentiation and accessible names/descriptions.
19. At `414 × 896` CSS pixels, core selection, filters, charts/table entry and saved-view controls have no unintended horizontal overflow or clipped primary action; applicable controls are at least `44 × 44` CSS pixels. At `1440 × 900` and 200% zoom, core content/actions remain available.
20. Use clinically neutral wording: identify changes over time, individual baseline and stored history. Do not imply diagnosis, urgency, treatment, causal meaning, race readiness, ideal score or guaranteed performance.
21. Create synthetic-only screenshots under `evidence/professional-engineering/028B-longitudinal-trends-history-and-saved-views/visuals/`: combined scores at `414 × 896`, current-reading history at `414 × 896`, version-boundary/history table at `414 × 896`, and the trends workspace at `1440 × 900`. Link them in the report/evidence ledger and state that full-page captures were rendered at the named viewport when PNG height differs.
22. Evidence contains no real horse/person/stable name, email, credential, token, provider identifier, note text or confidential record. Synthetic fixtures use obviously fictitious identities and values.

## Hard boundaries

No formula, lookup, capture range, classification, recommendation, Table of Knowledge, auth role, horse RLS, horse permission, upload, voice, public website, commerce or Production behavior change. No remote migration application, database write outside local test isolation, deployment, credential action, email, enquiry, alias movement, real-data submission, stage, commit or push.

## Approved file boundary

Product/schema/test files:

- `app/(portal)/portal/reports/page.tsx`
- `app/(portal)/portal/reports/actions.ts` (new)
- `app/(portal)/portal/horses/[horseId]/page.tsx`
- `components/portal/biochemistry-trends.tsx` (new)
- `components/portal/biochemistry-trend-chart.tsx` (new)
- `lib/domain/biochemistry-trends.ts` (new; pure and path-alias-free)
- `lib/domain/horses.ts`
- `lib/navigation.ts` only if the existing Reports destination needs copy alignment
- `supabase/migrations/0025_user_trend_view_preferences.sql` (new)
- `supabase/bootstrap/remote-init.sql`
- `supabase/tests/028B_user_trend_view_preferences.test.sql` (new)
- `scripts/test-biochemistry-trends-028B.mjs` (new)
- `scripts/test-biochemistry-trends-migration-028B.mjs` (new)
- `scripts/run-validation-suite.mjs`
- `package.json`

Plus Sprint 028B evidence/review/sprint files and required closeout updates to `planning/STATE.md`, `planning/STATUS.json`, `planning/ROADMAP.md`, `planning/ARCHITECT_BRIEFING.md`, `planning/QUESTIONS.md`, `planning/DECISIONS.md`, `planning/RISKS.md`, `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/SPRINT_SCHEDULE.md`, `planning/EVIDENCE_INDEX.md` and `delivery_road_map.md`.

Stop for a required Product/schema file outside this boundary and obtain fresh Architect review. Deterministic test/evidence harness files beneath the named Sprint evidence folder are allowed only when they import the same Product components, contain synthetic data, create no Product route/auth bypass and are never deployed.

## Evidence-Proportional Execution Standard

Stop only for material target, authority, security, privacy, migration, destructive, integrity, Production, scope or cleanup risk. Substitute equivalent or stronger safe evidence for unavailable supporting tools. Keep deterministic in-scope harness, validator, reporter, formatting and migration-test corrections in this sprint. Do not create a follow-up only because Docker, a browser driver, renderer, schema dump or optional CLI is unavailable. Do not replace executable RLS/data-isolation proof with substring checks. Use manual intervention only after safe in-scope alternatives are exhausted and record exact steps plus follow-up verification.

============================================================
FILE: planning/sprints/028B-longitudinal-trends-history-and-saved-views/blueprint.md
============================================================

# Sprint 028B Blueprint

## Flight evidence

- Class: critical because authenticated horse history, row-level access, per-user persistence and a new schema candidate cross privacy and integrity boundaries.
- Primary invariant: a trend result contains complete, stored, version-labelled rows for exactly one currently accessible horse and never reveals another horse, partial query output or another user's preference.
- Source-to-sink trace: `horseId/range/time` query input → accessible-horse exact match → RLS-scoped paged `biochemistry_tests` query → strict row validation/version-aware projection → charts and table. Authenticated app user → validated saved-view form → self-only RLS preference row → fixed/default configuration render.
- Discriminating access fixture: an encoded inaccessible horse ID produces no history query, no count, no chart, no existence clue and a generic selection state.
- Discriminating completeness fixture: one accessible horse has `1,001` in-window rows over stable pages; the final chart/table receives all `1,001`, while a duplicated ID, wrong horse ID or page error yields unavailable with zero partial points.
- Discriminating version fixture: adjacent v1 and v2 scored rows render stored values with a line break and both version labels; neither value is recalculated.
- Discriminating time fixture: `AM + PM` includes only `am`/`pm` and reports one excluded `unspecified`; `All recorded times` includes and labels it.
- Discriminating preference fixture: user A cannot select/update/delete user B's preference; an administrator does not bypass self-only RLS; setting a default leaves exactly one for A and changes nothing for B.
- Architecture gate: crossed. This sprint adds stable longitudinal aggregation, version-boundary derivation and persistent per-user preferences. Keep domain projection pure, server access authoritative and presentation separate.
- Baseline: record canonical CWD/Git top, HEAD, staged state, pre-existing dirty files, current focused tests and migration ledger before mutation. Preserve all unrelated changes.

## Sequence

1. Reconfirm canonical CWD and Git top. Reread all 028B files after Pack application, Sprint 025C scoring authority/closeout, Sprint 035R closeout, design authority, current Done matrix and relevant schema/RLS helpers. Run baseline tests.
2. Produce an exact no-edit critical Builder plan with file-by-file changes, data-flow invariants, migration/RLS design, falsifying fixtures, visual evidence and cleanup. Obtain fresh Architect review before Product edits.
3. Add pure `lib/domain/biochemistry-trends.ts` contracts for range/time validation, strict row projection, stable ordering, score-version segmentation, chart grouping, formatting and empty/unavailable states. It must use no `@/` imports so the Node strip-types test can import it directly.
4. Add the 0025 preference migration: typed/check-constrained columns, self-only RLS, case-insensitive owner/name uniqueness, one-default-per-user index, timestamps and an atomic owner-only default function. Harden helper search paths and grants. Update the bootstrap bundle deterministically; do not apply remotely.
5. Extend the horse domain with one-horse history retrieval. Resolve horse access first, query `30|90|365` Brisbane-date windows in stable pages of at most 500, continue until complete, and validate every page before returning any point. Keep unavailable distinct from empty.
6. Add saved-view server actions. Derive app user identity server-side, validate every field through the same pure contract, use self-only rows, return visible safe errors and revalidate only the reports route. Never accept horse or owner IDs into a preference mutation.
7. Replace the reports placeholder with accessible horse selection, fixed/default/saved controls, time/range filters, version-aware chart groups and the complete filtered table. Add a safe horse-workspace trends link. Preserve portal guards and navigation.
8. Build charts from existing CSS/React/SVG only. At most two groups render. No dual-axis normalisation, threshold band, zone colour, clinical icon or invented baseline. All information needed to understand a line is also available as text/table data.
9. Add focused domain/UI tests and executable migration/RLS tests. Do not count source substring matching as RLS or integrity proof. If isolated PostgreSQL/Supabase execution is unavailable, use an equivalent executable structural model that evaluates valid and malformed records/policies and document why it is sufficient.
10. Cover: exact accessible horse, inaccessible/malformed hint, wrong-horse row, page error, duplicate row, `1,001` rows, stable order, all range/time modes, `unspecified`, empty/filter-empty/unavailable, null score gaps, mixed v1/v2 boundary, no Urea/Average pH/Turbidity/zone language, formatting/units, chart compatibility, self-only preferences, no admin bypass, atomic default, invalid configuration and owner read-only trend access.
11. Run focused tests, retained 025C and 035R regressions, TypeScript, zero-warning lint, build, JSON/static checks, migration self-test and proportional local validation. Diagnose a supporting-tool failure once, then use a documented equivalent safe proof where allowed.
12. Generate the four synthetic visuals from shared Product components. Inspect viewport/full-page dimensions, overflow, clipping, target sizes, focus/labels/landmarks, table accessibility, non-colour version boundaries, 200% zoom, claims and privacy.
13. Obtain fresh critical implementation inspection. Correct every stable in-scope finding and rerun affected proof before closeout.
14. Close with a criterion matrix, changed-file list, migration-not-applied/deployment-not-performed limitations, exact acceptance-matrix changes and final staged/external/residue counts. Correct the existing P11/P39 evidence inconsistency if executable evidence still shows no Turbidity Product field. Do not mark P12, full P39, P43, P44, O04, independent owner acceptance or Production activation passed.

## Builder task contract

Objective: deliver permission-safe, version-aware neutral biochemistry trends and per-user saved chart configurations as a local-only Product/schema candidate.

Owns: the exact file boundary, preference migration/RLS, complete one-horse history retrieval, charts/table, focused tests, synthetic visual evidence, inspection and mandatory closeout.

Must not: invent or activate clinical thresholds, recommendations, Turbidity, Urea display, Average pH, formula changes or cross-version recalculation; weaken auth/RLS; apply migrations remotely; deploy; use real data; create credentials; send email/enquiries; move aliases; stage, commit or push.

Acceptance: every applicable AC passes with falsifiable evidence; unavailable facts stay named and cannot be converted into acceptance by a tool substitution.

Verification: executable domain/UI and migration/RLS proof, retained regressions, typecheck/lint/build, proportional validation, four shared-component synthetic visuals, accessibility/privacy/claims inspection, fresh critical review and final `0/0/0` staged/external/residue proof.

============================================================
FILE: planning/sprints/028B-longitudinal-trends-history-and-saved-views/acceptance.md
============================================================

# Sprint 028B Acceptance

| ID | Criterion | Proof |
| --- | --- | --- |
| AC-01 | CWD and Git top equal the canonical workspace before mutation; baseline/dirty/staged state recorded. | Command ledger. |
| AC-02 | Reports route retains the existing portal auth boundary and never renders sample data on service failure. | Route/auth regression. |
| AC-03 | Only an exact accessible horse is selected; malformed/inaccessible hints disclose nothing and trigger no history query. | Positive/negative access assertions. |
| AC-04 | One selected horse is queried through existing RLS, soft-deleted rows excluded, with exact Brisbane 30/90/365-day bounds. | Query contract assertions. |
| AC-05 | Stable paging returns all 1,001 in-window rows; no provider ceiling/global limit silently truncates history. | Executable discriminating fixture. |
| AC-06 | Wrong-horse row, duplicate ID, invalid date, page/query error or inconsistent page makes the whole result unavailable with zero partial points/count. | Failure matrix. |
| AC-07 | AM, PM, AM+PM and All recorded times behave exactly; unspecified is excluded with an explicit authorised count or included with its label. | Filter assertions/render. |
| AC-08 | Hydration and Biochemistry Trend Scores display stored fractions as percentages with formula/source detail. | Projection/format assertions. |
| AC-09 | Score lines break on formula or source-version change and never recalculate/backfill stored values. | Mixed v1/v2 fixture/render. |
| AC-10 | Null/unscored/blocked scores render gaps and textual state, never zero/normal. | State assertions/table. |
| AC-11 | Carbohydrate, Urine pH, Saliva pH and raw Conductivity use exact accepted units/precision. | Format assertions/render. |
| AC-12 | Urea, Average pH, Turbidity, converted C as trainer reading, zone thresholds and recommendations are absent. | Claims/source/render scan. |
| AC-13 | Individual and combined modes permit only compatible score/pH pairs; no unlike-unit normalisation or dual axis. | Config assertions/render. |
| AC-14 | At most two chart groups render and the accessible table contains every filtered point/version/state/value. | DOM/count assertions. |
| AC-15 | Empty, filtered-empty and unavailable are visibly distinct and clinically neutral. | State matrix/screenshots. |
| AC-16 | Horse workspace links safely to trends and existing route guards/actions remain unchanged. | Navigation/auth regressions. |
| AC-17 | Migration 0025 stores only self-owned chart configuration and no horse/stable/test/chart-point/note/clinical data. | Schema review/executable test. |
| AC-18 | Preference checks accept only valid labels, ranges, filters and one/two chart groups; owner/name and one-default uniqueness hold. | Valid/malformed migration fixtures. |
| AC-19 | Self-only RLS permits no cross-user read/write/delete and has no administrator bypass. | Executed role/RLS matrix. |
| AC-20 | Preference actions derive the current app user, reject client owner identity and fail visibly. | Action assertions. |
| AC-21 | Setting a default is atomic, owner-only and leaves at most one default without changing another user. | Executed concurrency/ownership fixtures. |
| AC-22 | Owner/read-only horse access can view permitted trends and manage only personal preferences without horse-record write capability. | Role journey assertion. |
| AC-23 | Fixed default is both scores + both pH + AM+PM + 90 days; a valid saved default restores and invalid data fails safely. | State/action assertions. |
| AC-24 | 414 × 896 views have no unintended overflow/clipped core action and applicable targets are at least 44 × 44. | Geometry/screenshots. |
| AC-25 | 1440 × 900 and 200% zoom retain core content/actions. | Screenshot/inspection. |
| AC-26 | Charts have accessible names/descriptions, text legends, keyboard-visible controls, table equivalence and non-colour version cues. | DOM/accessibility scan. |
| AC-27 | Copy has no diagnosis, urgency, treatment, race-readiness, ideal-score, causal or guaranteed-performance claim. | Claims scan/render. |
| AC-28 | Four synthetic-only visuals exist, are linked and accurately describe viewport versus full-page capture dimensions. | Manifest/file inspection. |
| AC-29 | Evidence contains no real identities, notes, secrets, tokens, provider identifiers or confidential records. | Privacy scan/manual review. |
| AC-30 | Focused tests, retained 025C/035R regressions, typecheck, zero-warning lint, build, JSON/static and migration proof pass or an allowed stronger substitute is documented. | Command ledger. |
| AC-31 | No remote migration/deployment/credential/email/enquiry/alias/real-data/stage/commit/push occurs; final staged/external/residue counts are 0/0/0. | Final state ledger. |
| AC-32 | Fresh critical inspection passes after all stable findings are resolved. | Review record. |
| AC-33 | Closeout records exact matrix changes and keeps P12, full P39, P43, P44, O04, Production and independent participant acceptance open. | Reconciled planning/report review. |

PASS requires AC-01 through AC-33. A privacy/access leak, partial history presented as complete, cross-version recalculation/connection, cross-user preference access, migration-integrity failure, clinical invention, wrong target, unauthorized Production action or unsafe cleanup is a material stop.

End the Builder report exactly with either:

- `I need nothing from you.`
- `I need the following from you:` followed by numbered plain-English steps, what each step unblocks and what Builder will verify.

============================================================
FILE: planning/sprints/028B-longitudinal-trends-history-and-saved-views/handoff-prompt.md
============================================================

# Sprint 028B Builder Handoff

Work only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`.

## Builder task contract

Objective: deliver permission-safe, version-aware neutral biochemistry trends and per-user saved chart configurations as a local-only Product/schema candidate.

Owns: the exact Product/schema/test boundary, complete single-horse history retrieval, preference RLS/integrity, charts/table, synthetic visual evidence, fresh critical inspection and mandatory closeout.

Must not: invent/activate clinical zones, recommendations, Turbidity, Urea display, Average pH or formula changes; recalculate history; weaken auth/RLS; apply a remote migration; deploy; use real data; create credentials; send email/enquiries; move aliases; stage, commit or push.

Acceptance: AC-01 through AC-33 pass with falsifiable evidence. Keep every authority-dependent or Production claim open.

Verification: focused domain/UI and executable migration/RLS tests, retained 025C/035R regressions, typecheck/lint/build, proportional validation, four shared-component synthetic visuals, accessibility/privacy/claims review, fresh critical inspection and final 0/0/0 proof.

1. Verify canonical CWD/Git top, HEAD, staged/dirty state and preserve unrelated work.
2. Reread AGENTS.md, all applied 028B files, 025C scoring authority/closeout, 035R closeout, design authority, Done matrix and relevant schema/RLS helpers.
3. Produce the exact no-edit critical Builder plan for fresh Architect review before Product edits. Include file changes, source-to-sink access invariants, migration design, discriminating fixtures, visual proof and cleanup.
4. After review, implement the smallest scoped change. Keep stored history immutable, version boundaries visible, query failure fail-closed and preferences self-only.
5. Do not use a Node strip-types test that imports modules containing unresolved `@/` aliases. Keep the new pure domain module directly importable by the focused runner.
6. Prove 1,001-row pagination, wrong-horse/page-error refusal, mixed v1/v2 breaks, all filters, accessible table completeness, no hidden clinical fields, and the full self/cross-user preference matrix.
7. Run retained and full proportional gates. Use equivalent safe proof only for supporting tools; never substitute away RLS/privacy/integrity or actual Product behavior.
8. Produce and inspect four privacy-safe shared-component visuals at the named viewports.
9. Obtain fresh critical implementation inspection, resolve every stable in-scope finding and rerun affected proof.
10. Reconcile closeout truthfully. Do not claim P12, full P39, P43, P44, O04, Production activation or independent owner/trainer acceptance.
11. End the report exactly with `I need nothing from you.` or the required numbered plain-English intervention steps.

No file-scope expansion; no schema/formula/clinical behavior outside 0025 preferences; no migration 0024/0025 application; no deployment/public tunnel/provider/credential/email/enquiry/alias/real-data submission/stage/commit/push.

Stop for material wrong-target, access/privacy, partial-history, cross-version, migration, destructive, Production, scope or unsafe-cleanup risk. Continue through optional-tool failures when equivalent safe evidence exists.
