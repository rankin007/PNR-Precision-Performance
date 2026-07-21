# Sprint 021F - Builder Handoff Prompt

You are Builder for Sprint `021F-recovery-reconciliation-and-safe-restart-method` under the `strict` profile.

Apply this Pack, verify all four generated sprint files, and work only from them. Reconcile the stale 021E records to the authoritative recovery evidence: zero Auth users, zero run-owned application records, zero Storage artifacts, no deletion required, production-only callback restored, protected memory cleared, and authenticated proof not started. Close 021E as `blocked-clean` and permanently retire `021E-RLS-20260720-01`.

Create the durable mailbox/protected-process runbook. Builder must run PowerShell, repository, API, runtime, verification, and cleanup steps itself. Do not send routine commands to the operator. Limit operator involvement to creating/owning the test mailbox and other protected provider interactions Builder cannot safely perform. Never request or retain the mailbox address, password, MFA value, key, OTP, magic link, cookie, token, session, or UUID.

Do not create a plaintext `.env` or credential document. Do not use any address disclosed in conversation. If harness hardening is required, keep it default-nonmutating and within the approved files; do not add testing capability or start a new run.

Do not perform authenticated testing, callback mutation, identity/fixture/session creation, migration 0013, application/schema/RLS changes, deployment, cutover, production change, old-project mutation, stage, commit, push, or PR. Any later authenticated attempt requires a separate 021G-or-later Architect Pack with a new run ID.

Validate pack matching, evidence wording, JSON, redacted secret/address scan, applicable focused harness tests, approved-file diff, and whitespace. Close only as **recovery-reconciled — 021E blocked-clean**.
