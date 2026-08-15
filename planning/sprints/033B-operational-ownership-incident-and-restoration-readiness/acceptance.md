# Sprint 033B Acceptance

Builder annotates every criterion `pass`, `fail` or `not-run` with evidence.

| ID | Criterion | Required proof |
| --- | --- | --- |
| AC-01 | Canonical/Git baseline and unrelated work recorded/preserved. | Command/status ledger. |
| AC-02 | Pack produces exactly four traversal-free files, reread. | Import/hashes. |
| AC-03 | Fresh exact critical plan review passes before implementation. | Plan ledger. |
| AC-04 | Phillip Norman Rankin named business/support/privacy/incident owner. | Contract assertions. |
| AC-05 | Randell Rankin named platform/migration/release/recovery operator. | Contract assertions. |
| AC-06 | Rollback/restoration approval requires both named people. | Matrix/scenarios. |
| AC-07 | Historical `Philip` evidence unchanged; new records canonical. | Diff/source. |
| AC-08 | Monitored address exact; no new public channel. | Assertions. |
| AC-09 | Support intake uses only approved diagnostic/redacted fields. | Scenarios. |
| AC-10 | Access correction uses Admin/RLS and rejects bypass. | Negative tests. |
| AC-11 | Privacy request requires identity/authority and safe ledger. | Matrix. |
| AC-12 | 30-day target/refusal-delay handling/no legal-advice claim. | Assertions. |
| AC-13 | 4-hour acknowledgement, immediate containment, 24-hour assessment exact. | Timeline tests. |
| AC-14 | Incident order is contain/assess/notify-if-required/review. | Order tests. |
| AC-15 | P0-P3 mapping/ownership complete and non-overlapping. | Table tests. |
| AC-16 | Tickets/chat/evidence prohibit credentials/private data. | Sentinel tests. |
| AC-17 | RPO <=24h and RTO one business day, internal/provider-dependent. | Contract tests. |
| AC-18 | Cadence quarterly/pre-sensitive-launch/post-material-change. | Schedule tests. |
| AC-19 | Database and Storage recovery separate; no implied object recovery. | Discriminating tests. |
| AC-20 | Rollback requires compatible source/five aliases/three bindings. | Scenarios. |
| AC-21 | Logical export has versions/tables/PK/FK/counts/migration head. | Rehearsal. |
| AC-22 | Storage inventory has safe relative paths/metadata/SHA-256. | Rehearsal. |
| AC-23 | AES-256-GCM uses one process-only unreported/unpersisted key, separate fresh distinct 12-byte database/Storage IVs, pre-encryption collision refusal and owned-key-buffer zeroing without a total-runtime-erasure claim. | Runtime/residue and discriminating IV tests. |
| AC-24 | Success deletes source, restores isolated, validates all integrity. | Result. |
| AC-25 | Corruption, wrong key/tag and injected IV reuse/collision fail closed. | Adversarial cases. |
| AC-26 | Missing/extra data, broken relationships, version drift fail. | Adversarial cases. |
| AC-27 | Traversal/absolute paths/manifest disagreement fail pre-restore. | Adversarial cases. |
| AC-28 | Success cleanup has zero owned residue. | Cleanup ledger. |
| AC-29 | Every controlled failure cleanup has zero owned residue. | Failure ledger. |
| AC-30 | Evidence is synthetic/aggregate; no protected/provider/key/payload value. | Scan/inspection. |
| AC-31 | Ledger accepts exactly local 0001-0025, rejects drift, labels 0024/25 local-only, and the registered clean-rebuild success output states exact local 0001-0025 with remote status uninspected. | Executable tests and registered-output assertion. |
| AC-32 | No Product/schema/migration/RLS/role/permission/dependency/lock change. | Diff/hashes. |
| AC-33 | No provider/remote/email/enquiry/deploy/Production/backup/restore action. | External zero. |
| AC-34 | Focused operational/migration/rehearsal assertions pass with exact arithmetic. | Commands. |
| AC-35 | Applicable retained role/privacy/static/JSON gates pass or stronger substitute recorded. | Validation. |
| AC-36 | Applicable typecheck/zero-warning lint/build pass. | Quality ledger. |
| AC-37 | Fresh critical inspection passes authority/privacy/cleanup/falsifiability/scope/claims. | Inspection. |
| AC-38 | O08/O10/L08 only strengthen locally; L04/L09/provider/Production/036K/representative/Done limits remain. | Matrix/roadmap. |
| AC-39 | Closeout files agree; staged/external/residue exactly 0/0/0. | Cross-file safety. |
| AC-40 | Report exact user-action ending. | Report inspection. |

PASS requires AC-01 through AC-40. Wrong ownership, protected exposure, remote effect, destructive ambiguity, false restore claim, integrity bypass, permission widening or cleanup failure is a material stop.

End the report exactly with either `I need nothing from you.` or `I need the following from you:` followed by numbered steps and follow-up verification.

## Closeout annotations

| ID | Status | Closeout evidence |
| --- | --- | --- |
| AC-01 | pass | Canonical guard, HEAD/branch and dirty baseline recorded; unrelated work preserved. |
| AC-02 | pass | Pack applied to exactly four traversal-free sprint files and hashes reread. |
| AC-03 | pass | Corrected critical plan review passed before implementation. |
| AC-04 | pass | Named-owner contract and documentation assertions. |
| AC-05 | pass | Named-operator contract and documentation assertions. |
| AC-06 | pass | Joint-approval and exact-set rollback tests. |
| AC-07 | pass | Historical `Philip` evidence unchanged; new records use `Phillip`. |
| AC-08 | pass | Exact monitored address and no-new-public-channel assertions. |
| AC-09 | pass | Approved fields, redacted-reference and high-confidence value sentinel tests. |
| AC-10 | pass | Existing Admin/RLS accepted; bypass/service-role/widening refused. |
| AC-11 | pass | Identity/authority verification and safe-ledger matrix. |
| AC-12 | pass | 30-day internal target, explanation requirement and no-legal-advice assertions. |
| AC-13 | pass | Immediate containment, Brisbane business-time and 24-hour boundary tests. |
| AC-14 | pass | Exact contain/assess/notify-if-required/review order. |
| AC-15 | pass | Complete non-overlapping P0-P3 mapping. |
| AC-16 | pass | Phone/PEM/AWS/Stripe/GitHub and private-data value refusal; no mutation/I/O/echo. |
| AC-17 | pass | Internal 24-hour RPO/one-business-day RTO; provider-dependent and no public SLA. |
| AC-18 | pass | Exact quarterly/pre-launch/post-material-change cadence. |
| AC-19 | pass | Separate database and Storage packages and validation. |
| AC-20 | pass | Exact unique five-alias/three-binding sets; missing/extra/duplicate/wrong refused. |
| AC-21 | pass | Three-table/PK/FK/count/head logical package and reread. |
| AC-22 | pass | Safe paths, exact `contentType`, bytes and SHA-256 inventory/reread. |
| AC-23 | pass | AES-256-GCM, fresh distinct 12-byte IVs, collision refusal and narrow owned-buffer zeroing. |
| AC-24 | pass | Source removed; isolated successful restore and full integrity reread. |
| AC-25 | pass | Both ciphertext corruption paths, wrong key/tag and IV collision fail closed. |
| AC-26 | pass | Missing/extra rows/objects, broken FK, head drift and metadata drift refused. |
| AC-27 | pass | Traversal, absolute path and manifest disagreement refused. |
| AC-28 | pass | Success cleanup residue zero. |
| AC-29 | pass | Sixteen controlled failures each clean; aggregate residue zero. |
| AC-30 | pass | Synthetic aggregate evidence; synthetic-aware secret scan found zero unexpected matches. |
| AC-31 | pass | `42/42`; exact local `0001`-`0025`, local-only `0024`/`0025`, remote uninspected. |
| AC-32 | pass | No Product/schema/migration/RLS/role/permission/dependency/lock change. |
| AC-33 | pass | External/provider/remote/Production mutation count zero. |
| AC-34 | pass | `130 + 42 + 220 = 392/392`; standalone rehearsal `17/17`, not double-counted. |
| AC-35 | pass | Role/privacy/evidence/orchestrator/JSON/encoding/static retained gates passed. |
| AC-36 | pass | Typecheck, zero-warning lint and 29-route optimized build passed. |
| AC-37 | pass | Inspection history recorded; final human-authorized read-only inspection/readback passed. |
| AC-38 | pass | O08/O10/L08 local-only strengthening; L04/L09 and all provider/Production/036K/Done limits retained. |
| AC-39 | pass | Closeout synchronized; final staged/external/residue `0/0/0`. |
| AC-40 | pass | Builder report ends with the exact no-user-action statement. |
