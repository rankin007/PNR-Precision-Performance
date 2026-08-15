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
