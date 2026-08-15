# Sprint 035R Acceptance

| ID | Criterion | Proof |
| --- | --- | --- |
| AC-01 | CWD and Git top equal canonical before mutation. | Command output. |
| AC-02 | Brisbane date and truthful accessible counts for today, incomplete/pending and no-result. | Pure assertions/render. |
| AC-03 | Failure shows unavailable with no inferred counts/actions. | Failure assertion. |
| AC-04 | Cards show workflow/date, prior change/unchanged/no-prior and one action. | State matrix/screenshots. |
| AC-05 | No clinical priority, urgency, treatment, race-readiness or color-only meaning. | Claims/visual scan. |
| AC-06 | Writable no-result/completed carries encoded horseId; incomplete/pending opens current record. | URL/action assertions. |
| AC-07 | Read-only opens workspace; failed has no action; detail shares semantics. | Permission assertions. |
| AC-08 | Query preselects only accessible exact match; unknown/inaccessible is silent. | Positive/negative assertions. |
| AC-09 | Brisbane date/AM-PM passes pre-noon/noon, remains editable and preserves edits. | Pure/component assertions. |
| AC-10 | Review shows exact context/four readings; note/repeat-tap safeguards remain. | Regression/screenshot. |
| AC-11 | Ranges retain Carbohydrate 0.0–15.0, both pH 4.80–9.00 and conductivity 0.00–99.00 mS/cm, inclusive. | Boundary assertions/render. |
| AC-12 | “Exact lookup only” absent; copy does not contradict exact-or-next-lower v2. | Text assertion/render. |
| AC-13 | Reciprocal dashboard/capture navigation retains guards. | Assertion/render. |
| AC-14 | Three 414 × 896 views have no overflow/clipped core action. | Measurement/screenshots. |
| AC-15 | 44 × 44 targets, labels, focus/errors, landmarks and text status pass. | DOM/geometry check. |
| AC-16 | 1440 × 900 and 200% zoom retain core content/actions. | Screenshot/inspection. |
| AC-17 | Four privacy-safe visuals exist and are linked in report/handoff. | Manifest/links. |
| AC-18 | Guided iPhone reaches complete review without submit and records timing/fixture/friction. | User observation + no-submit proof. |
| AC-19 | Observation is not independent trainer acceptance or public/universal under-60 claim. | Claims scan. |
| AC-20 | No real data, secrets, provider identifiers or confidential records in evidence. | Evidence scan. |
| AC-21 | No formula, migration, schema, RLS, auth, permission or clinical-authority change. | Diff/regressions. |
| AC-22 | Focused tests, typecheck, lint, build and proportional local suite pass or stronger substitute proof is recorded. | Command ledger. |
| AC-23 | Staged/external mutation/residue counts 0/0/0; no commit/push/deploy/migration/email/enquiry/alias action. | Final state. |
| AC-24 | Required state/status/roadmap/briefing/matrix/report records reconcile exact limitations. | File review. |

PASS requires AC-01 through AC-24. If AC-18 cannot safely complete, report local-workflow-complete-real-device-review-pending and do not call the sprint fully accepted. Privacy, wrong-horse/access, clinical-claim, destructive, migration, Production or unsafe-cleanup uncertainty is a material stop.

End the Builder report exactly with either:

- I need nothing from you.
- I need the following from you: followed by numbered steps, what they unblock and what Builder will verify.
