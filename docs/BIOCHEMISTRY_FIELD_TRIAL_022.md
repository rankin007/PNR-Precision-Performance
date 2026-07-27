# Sprint 022 - Biochemistry Field Trial Checklist

## Scope

Use this checklist for a later authenticated field trial. Sprint 022 local work does not prove hosted authenticated acceptance.

Do not record real horse, stable, trainer, mailbox, credential, or private production data in screenshots, URLs, logs, or reports.

## Devices And Viewports

| Surface | Target |
|---|---|
| Phone | 390 x 844 or nearest available stable phone viewport |
| Desktop | 1440 x 900 or nearest desktop viewport |
| Zoom | 200% browser zoom, no horizontal page scroll |
| Keyboard | Tab and Shift+Tab through the full workflow |
| Screen-reader-oriented inspection | Labels, required/invalid state, error summary, stage status, and pending status are programmatically visible |

## Timing Points

Record time from:

1. first visible capture screen after authentication;
2. horse selected;
3. last required reading entered;
4. review screen reached;
5. submit activated;
6. result or safe failure screen reached.

Do not claim an under-60-second result from this checklist unless a later sprint explicitly approves that claim and supplies enough field evidence.

## Cases

| Case | Expected outcome | Sprint 022 local status |
|---|---|---|
| Capture page opens | Authenticated writer reaches `/data-entry/biochemistry`; anonymous access stays behind existing auth guard. | NOT RUN - provider/auth dependency |
| Empty required fields | Review is blocked with an error summary and field-level errors. | Locally covered by focused test |
| Invalid number | Review is blocked with a numeric error. | Locally covered by focused test |
| Non-finite number | Review is blocked with a finite-number error. | Locally covered by focused test |
| Optional notes blank | Review shows `No notes added`. | Locally covered by focused test/static contract |
| Notes too long | Review is blocked at more than 2,000 characters. | Locally covered by focused test |
| Valid capture to review | Values persist and every submitted value is visible. | Locally covered by focused test/static contract |
| Edit from review | Capture returns without clearing values. | Source-inspected; browser trial still needed |
| Submit pending | Submit shows `Submitting test...` and repeat activation is guarded. | STATIC SOURCE CONTRACT; rendered interaction NOT RUN |
| Success result | Saved result route shows horse/test, raw readings, derived readings, score snapshot, source/version, unavailable thresholds, and unavailable recommendations. | NOT RUN - provider/auth/schema dependency |
| Blocked lookup | Saved result shows exact missing lookup blockers and no guessed score. | Locally covered by focused test/domain contract; hosted case not run |
| Unavailable environment | Live submit is disabled and distinct from user validation error. | Source-inspected; browser trial still needed |
| Safe retry after server failure | Sanitized failure is shown with a correction path and no values in query parameters. | Source-inspected; hosted case not run |

## Evidence To Record

Allowed:

- anonymized viewport size
- timings
- control labels and state descriptions
- sanitized error codes or user-facing messages
- route names without private query data
- defect notes using synthetic horse names

Do not record:

- real horse/stable/person names
- credentials, cookies, tokens, mailbox content, or secret fragments
- typed notes containing private stable information
- production data screenshots

## Observation Record

| Field | Entry |
|---|---|
| Tester | |
| Date/time | |
| Device/browser | |
| Viewport/zoom | |
| Case ID | |
| Outcome | PASS / FAIL / NOT RUN |
| Timing notes | |
| Accessibility notes | |
| Defect/observation | |
| Follow-up needed | |

## Manual Intervention Required

Blocked item: authenticated hosted field trial.

Evidence checked:

- Sprint 022 completed only local/source and credential-free deterministic workflow proof.
- Current project state keeps authenticated hosted proof and provider/auth dependency separate.

Exact user/manual action needed:

Provide an explicitly approved later sprint with safe authenticated test users, assigned synthetic horses, schema readiness, cleanup expectations, and field-trial evidence boundaries.

Steps:

1. Confirm provider/auth proof is ready to support hosted testing.
2. Create synthetic non-identifiable users and horses through the approved path.
3. Confirm the Sprint 013 biochemistry schema is applied in the target environment.
4. Run the cases above using synthetic data only.
5. Record only allowed evidence.
6. Clean fixtures according to the later sprint plan.

Builder will verify afterward:

- authenticated route access and denial behavior;
- capture/review/edit/submit/result behavior;
- blocked lookup behavior;
- safe retry behavior;
- no private data or protected material in evidence.
