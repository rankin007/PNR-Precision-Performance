# Sprint 035R Builder Report

Date: 2026-08-11
Outcome: `trainer-daily-cockpit-and-guided-mobile-review-complete-clean`

## Delivered

- A Brisbane-dated trainer cockpit with truthful counts for latest record today, incomplete/pending and no result.
- Every accessible horse is retained; latest-two comparison and permission uncertainty fail closed.
- Each card shows clinically neutral workflow/date/change context and exactly one permission-safe next action.
- Horse-aware capture silently accepts only an exact accessible horse, defaults Brisbane date and AM/PM, preserves edits and reviews four readings without submission.
- Mobile, desktop and 200% responsive evidence uses the same Product `TrainerCockpit` and `BiochemistryCaptureWorkflow` components.

## Guided iPhone XS Max review

The project user completed the guided synthetic **Capture another test** to **Review test** path in 6 minutes. Reported observations: no clipping or sideways scrolling, no difficult taps, no confusing wording and no incorrect defaults. The instructions stopped before **Submit test** and the corrected server log recorded zero POST requests.

This is one guided owner observation. It is not independent trainer acceptance and does not prove an under-60-second creation or submission claim.

## Verification result

- Cockpit tests: `64/64`.
- Retained dashboard assertions: `33`.
- Exact focused target: `33 + 64 = 97`.
- Workspace regression, typecheck, lint with zero warnings/errors, corrected Production build, JSON, role and field-trial controls: pass.
- Axe 4.12.1: dashboard, capture and review each `0 violations, 0 incomplete`.
- Final critical inspection: PASS on review 3/3 after `INSPECT-001`, `INSPECT-002` and `INSPECT-003` were resolved.

Supporting-tool limitations are recorded in `evidence.md`: optional `playwright-core`, the stale 020G migration-ceiling validator, OneDrive browser/image-viewer ACL failures and the inspector's later `.next` `readlink EINVAL`. Direct in-scope proof and the prior corrected Product build provide the accepted substitutes.

## Evidence

- [Detailed evidence ledger](evidence.md)
- [Critical review](../../../planning/reviews/035R-trainer-daily-cockpit-and-timed-mobile-workflow.md)
- `01-mobile-dashboard-414x896.png`
- `02-mobile-capture-defaults-414x896.png` - full-page capture from a 414 x 896 viewport; bitmap 414 x 2003.
- `03-mobile-review-414x896.png` - full-page capture from a 414 x 896 viewport; bitmap 414 x 1505.
- `04-desktop-dashboard-1440x900.png`
- `05-desktop-dashboard-200-percent.png`

## Safety and cleanup

No real horse/client/provider data or credentials entered evidence. No deployment, migration, email, enquiry, alias movement, stage, commit or push occurred. The local browser/server stopped; port 3135, owned browser processes, harness `.next`, patch/view copies and the exact zero-byte `({links` residue are absent. Final staged/external/residue counts are `0/0/0`.

## Acceptance impact

Sprint 035R strengthens P01, P05, P14 and L05 with local/guided mobile evidence. P02, O01 and L06 remain `not-proven` because the measured path took 6 minutes and stopped before submission. Product-wide Done remains false.

## What's next

The Architect should determine whether complete 025D classification/recommendation/today-guidance authority exists. If it does not, 028B trends, history and saved views is the next executable planning candidate. Neither path changes this sprint's clean closeout.

I need nothing from you.
