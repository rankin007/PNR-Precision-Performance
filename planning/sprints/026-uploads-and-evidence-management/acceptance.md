# Sprint 026 — Uploads And Evidence Management Acceptance

## Baseline and scope

- [x] Exact clean baseline `6f8543020e126a4620f09be017744dcc75061e6e`, expected ancestry and isolated branch/worktree are proven.
- [x] Migration ledger is exactly `0001`–`0021`; migrations and remote state are unchanged.
- [x] Sprint 023L closed hosted proof and current fail-closed safety/provider boundary are reconciled.
- [x] Every changed file is in the approved set and mapped in the closeout manifest.
- [x] Dirty `develop` and uncommitted Sprint 025 worktrees are not modified.

## Safe list and status presentation

- [x] Visible evidence is loaded through fresh server-authoritative test/horse/stable/user scope.
- [x] Client-facing items exclude object keys, signed tokens/URLs, hashes, protected errors and unauthorised existence.
- [x] Every relevant lifecycle state has an accurate non-colour label and explanatory context.
- [x] Loading, empty, pending, blocked, retryable failure, deleted/restorable, held, purge-pending, superseded and unexpected-error states are represented safely.
- [x] Replacement lineage preserves the active predecessor until authoritative cutover.
- [x] Unknown or malformed states fail closed with no consequential action.

## Upload and lifecycle management

- [x] Exact acknowledgement starts unchecked and is required before initiation.
- [x] JPEG/PNG/PDF, 5 MiB item, 10-file and 30-MiB test limits are accurate; CSV remains disabled.
- [x] Upload uses the established signed no-overwrite path and distinguishes transfer from safety approval.
- [x] Cancel, safe retry and exact-predecessor replacement behavior are complete.
- [x] Soft delete, restore request/execution, hold/release and governed purge controls appear only when server-authoritative capabilities allow.
- [x] Consequential actions require clear confirmation and cannot double-submit.
- [x] Successful mutations refresh authoritative state; denied/stale/error results never report false success.
- [x] Held evidence cannot be purged and Administrator alone does not gain purge authority.
- [x] Blocked/unavailable evidence exposes no preview, download, signed-read request or availability claim.

## Permission and failure proof

- [x] Positive role/action cases agree with the established application/database/Storage permission contract.
- [x] Anonymous, inactive, suspended, revoked, deleted, unassigned, wrong-horse, wrong-stable, cross-test, insufficient-role, stale and forged cases fail safely.
- [x] Replay, duplicate submission, concurrent mutation and retryable failure behavior is deterministic and idempotent where required.
- [x] Safe errors do not enumerate hidden evidence or reveal internal/provider details.
- [x] No client state or forged capability flag can bypass a fresh server check.

## Privacy, content and accessibility

- [x] The experience remains authenticated and is absent from public pages.
- [x] Purpose, supported limits, Singapore overseas processing, retention/removal authority and unavailable safety status are accurate.
- [x] No diagnosis, guarantee, unsupported safety claim or replacement-of-professional-judgement language appears.
- [x] Status is understandable without colour.
- [x] Keyboard operation, visible focus, error association, live announcements and logical post-action focus pass.
- [x] Reduced motion, 44px touch targets, narrow mobile layout and 200% zoom/reflow pass.
- [x] Tests, fixtures, logs, screenshots and evidence contain no real personal, horse or stable information.

## Validation and closeout

- [x] Maintained Sprint 026 synthetic tests pass.
- [x] Sprint 022 workflow and maintained Sprint 023 evidence regressions pass.
- [x] JSON, domain, roles, Supabase self-test, static, TypeScript and ESLint checks pass.
- [x] Production build passes, or equivalent/stronger safe proof is documented under the Evidence-Proportional Execution Standard.
- [x] `git diff --check`, approved-path, dependency, secret, personal-information and generated-artifact scans pass.
- [x] Documentation, closeout, manifest, planning state and Architect briefing agree.
- [x] No migration, provider/configuration, remote, Production, deployment, alias/domain, staging, commit, push, PR or merge action occurred.

## Acceptable outcomes

`uploads-and-evidence-management-complete-fail-closed-clean` when the full authorised management experience and required proof are complete while unavailable evidence remains safely blocked.

`evidence-management-baseline-blocked-clean` when the exact baseline, ancestry, isolation, ledger or closed Sprint 023L contract cannot be established and no implementation begins.

`evidence-management-contract-conflict-blocked-clean` when implementation requires weakening or materially changing approved lifecycle, role, privacy, retention, deletion, audit, migration or Storage authority.

`evidence-management-validation-blocked-clean` when scoped implementation exists but a required security, permission, privacy, lifecycle, accessibility, regression, build or scope boundary does not pass.
