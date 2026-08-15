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
