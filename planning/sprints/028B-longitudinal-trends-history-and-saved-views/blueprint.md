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
