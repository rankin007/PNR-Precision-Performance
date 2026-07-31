# Architect Briefing — Sprint 035G Closeout

## Where things stand

Sprint 035G is closed `synthetic-preparation-blocked-clean`. The correction Preview callback is exact and preserved. No OTP was requested, and exact-owned cleanup is independently clean `0/0/0`, Auth-last, ledger absent.

## Current status

The manual multi-surface synthetic acceptance procedure is operationally unsuitable and permanently stopped. This is not another OTP verification failure. Trainer-pilot completion and product-wide Done are not claimed.

## Since last sprint

Replaced only the superseded Preview callback, proved the exact two-callback set, corrected a command-scoped wrapper line-ending preflight defect, prepared one no-email exact-owned identity, then cleaned it Auth-last before any send.

## Architecture / file map

- `planning/reviews/035G-correction-preview-callback-and-synthetic-otp-reproof.md`: sanitized closeout evidence.
- `scripts/Invoke-ProtectedSyntheticOtp035F.ps1`: guarded 035G branch/baseline and command-scoped safecrlf preflight.
- `scripts/test-protected-synthetic-otp-wrapper-035F.ps1`: deterministic wrapper guard coverage.

## Decisions

Preserve the correct production-plus-correction-Preview callback set. Do not resume the manual OTP workflow. Keep Participants A/B/C blocked.

## Risks / watch-items

End-to-end delivered OTP/session/permission acceptance remains unproved. Future automation must enforce one-send durability, protected mailbox handling, in-memory OTP use and mandatory cleanup without emitting protected values.

## Open questions for the Architect

Define 035H authority and protected mailbox integration for a single-run automated acceptance harness without weakening security, privacy, provider or cleanup boundaries.

## Validation / test status

Wrapper, recovery, no-secret, sanitizer, OTP/recovery, dashboard, JSON, typecheck, static/encoding and diff checks passed. Ready correction Preview supplies hosted build evidence. Final callbacks, preserved Auth count and ledger absence were independently read back.

## Recommended next Architect action

Create, but do not apply, a 035H Architect Pack for a protected single-run end-to-end synthetic authentication acceptance harness covering preflight, preparation, exactly one send, mailbox polling, in-memory OTP consumption, exact-Preview verification, permissions and Auth-last cleanup with sanitized-only evidence.
