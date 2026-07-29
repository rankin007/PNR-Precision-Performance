# Completed Product Lineage 027B

## Purpose

Sprint 027B combines three independently completed candidates based on exact commit `6f8543020e126a4620f09be017744dcc75061e6e` into one isolated, uncommitted candidate for future Sprint 028 planning. It does not redefine their accepted behaviour or authorise Production use.

## Source lineage

| Sprint | Immutable source | Accepted outcome | Integrated responsibility |
|---|---|---|---|
| 025 | `codex/025-four-reading-biochemistry-authority` | `four-reading-structured-operation-proven-authority-partial-clean` | Five raw measurements, four exact lookup inputs, structural threshold authority and fail-closed unavailable production content. |
| 026 | `codex/026-uploads-and-evidence-management` | `uploads-and-evidence-management-complete-fail-closed-clean` | Authenticated, redacted, permission-aware evidence lifecycle management with blocked/unknown reads unavailable. |
| 027 | `codex/027-voice-assisted-capture` | `voice-assisted-typed-device-fallback-complete-provider-deferred-clean` | Typed/device-keyboard note input, mandatory non-empty-note review and no application audio/transcription path. |

The per-file source sizes and hashes are in `planning/reviews/027B-source-worktree-snapshot-manifest.md`. Shared decisions are in `planning/reviews/027B-overlap-and-reconciliation-matrix.md`.

## Preserved boundaries

- Existing scoring formulas, exact lookup, normalization, source/version snapshots and internal `healthScore` compatibility remain unchanged.
- Fixture thresholds and recommendations are not Production authority. Final thresholds, terminology, measurement/device limits and Table of Knowledge content remain unavailable.
- Evidence projections remain server-derived and redacted. Every mutation retains fresh server/database authority checks. Held evidence cannot be purged; unknown/blocked evidence exposes no read affordance.
- Typed notes remain permanently available. Device-keyboard dictation remains device-controlled, is never claimed local/private/offline/accurate, and creates no application audio or provider pathway.
- Notes remain plain text and never populate structured measurement/result fields.
- Dependencies, lockfile, migrations `0018`–`0021`, schema, roles/RLS, retention, audit and persistence contracts remain unchanged.

## Combined validation

The maintained 025, 026 and 027 tests are registered exactly once in the canonical domain group alongside their required regressions. Final executed and structural proof, integrity hashes, security/privacy scans and source non-mutation comparison are recorded in `planning/reviews/027B-combined-validation-and-security-proof.md`.

## Change control

Sprint 028 must start from an explicitly selected reconciled 027B baseline after this candidate is committed or otherwise made durable through a separately authorised Git action. It must not infer authority for domain content, evidence safety providers, transcription providers, remote systems, deployment or Production.
