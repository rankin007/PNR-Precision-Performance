# Sprint 035 Implementation Manifest And State Matrix

## Baseline

- Source: clean Sprint 034 candidate `codex/034-reconciled-product-baseline` at `d949069834c375ce4b485a4336eb701944b2d984`.
- Sprint branch: `codex/035-trainer-pilot-and-dashboard-mvp`.
- Accepted prerequisite: `reconciled-product-baseline-and-project-simplification-complete-clean`.
- Migration ledger remains `0001` through `0021`; no migration or lockfile change is approved.

## Approved Implementation Manifest

- `lib/domain/stable-workspace.ts`: pure typed workflow state, ordering and action derivation.
- `lib/domain/horses.ts`: bounded server-side accessible-horse/test composition; no sample records.
- `app/(portal)/portal/page.tsx`: trainer worklist presentation and explicit empty/unavailable/failure states.
- `app/(portal)/portal/horses/[horseId]/page.tsx`: focused identity, latest workflow context, next action and dashboard return.
- `scripts/test-trainer-dashboard-035.mjs`: deterministic derivation, ordering, action and safe-source assertions.
- `package.json`: focused Sprint 035 test registration only if required.
- Sprint 035 review, pilot template, evidence index and standard closeout planning files.

No schema, migration, RPC, RLS, role, membership, assignment, clinical authority, upload, voice, trend, commerce, public-site or production file is approved.

## State And Action Matrix

| Accepted source condition | Trainer-visible state | Basis | Permitted action with write permission | Read-only action |
|---|---|---|---|---|
| No accessible test | `no result` | No current biochemistry record | Capture biochemistry for the selected horse | Open horse workspace |
| Latest `unscored` | `draft / incomplete` | Stored scoring status and test date | Review existing record | Open horse workspace |
| Latest `blocked` | `pending review` | Stored exact-lookup blocker state and test date | Review existing record | Open horse workspace |
| Latest `scored` | `completed` | Stored scoring status, authority versions and test date | Open horse workspace | Open horse workspace |
| Environment not configured | `unavailable` | Server environment readiness | No record action | No record action |
| Authorised query failure | `failed` | Sanitised composition failure | Retry by reloading only | Retry by reloading only |
| Direct inaccessible horse / revoked assignment | `denied` | Existing authenticated context and RLS return no horse | Back to dashboard | Back to dashboard |

Ordering is operational and deterministic: incomplete/pending work first, then no result, completed, unavailable/failed, and finally horse name plus stable name and identifier as stable tie-breakers. It never uses score magnitude, clinical severity, diagnosis, urgency or performance meaning.
