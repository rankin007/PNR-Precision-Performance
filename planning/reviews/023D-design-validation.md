# Sprint 023D — Design Validation

Date: 2026-07-28
Outcome: `upload-storage-architecture-approved-clean`

## Contract And Structure

- Twenty of twenty Sprint 023C decisions trace through the architecture table to explicit invariants and future proof.
- The logical model is additive documentation only; immutable migration `0009` is unchanged and no `0018` file exists. It now names the two superseded 0009 checks, defines a blocking legacy inventory, deterministic unavailable-state backfill, exact committed-table foreign keys and composite scope invariant.
- Every lifecycle state records visibility, object/metadata expectation, transition/retry/timeout and recovery; all transitions are server-controlled and audited.
- The application/database/Storage agreement includes every required operation and denies anonymous, wrong-horse, cross-stable, inactive, suspended, revoked, deleted, stale and forged cases.
- Private bucket, opaque keys, no overwrite/listing, 60-second fresh signed delivery, quota locking, idempotency, duplicate confirmation, version replacement and deterministic compensation are explicit.
- `version_group_id` is the stable lineage key; cross-test/fork/cycle/bidirectional-link invariants and exact quota states are specified. Replacement uses one bounded temporary slot, leaves its predecessor unchanged on failure, and performs an atomic available/superseded cutover.
- Safety remains fail closed. CSV is disabled; scanner/sanitiser provider/dependency selection is deferred under the approved boundary.
- Daily production-only UTC Vercel Cron uses exact bearer `CRON_SECRET`, a database lock, bounded idempotent batches, durable recovery and function-duration margin. No `EVIDENCE_RECONCILIATION_SECRET` is proposed.
- Sydney `ap-southeast-2` and separate Storage-object recovery are mandatory verified gates; `ap-southeast-1` is correctly classified as Singapore.

## Platform Evidence

Official Supabase, Vercel and OAIC primary documentation is cited with access date 28 July 2026 in the gap analysis. Claims cover standard upload sizing, Vercel body limits, Storage RLS/private/signed behavior, signed-upload lifetime, Sydney region, Storage exclusion from database backups, Cron production/auth/duplicate/no-retry behavior, and incident-response framing.

## Mechanical Validation

- Pack check/application/post-apply stability: pass.
- Baseline commit, ancestry and canonical 023C blob hashes: pass.
- Maintained JSON parse (`package.json`, `package-lock.json`, `planning/STATUS.json`): pass.
- `git diff --check`: pass.
- Approved-path scope check: pass.
- No migration `0018`, production source, dependency, bucket/policy, environment or runtime file: pass.
- Secret/config wording scan: pass; names only, no values; client-visible evidence secrets prohibited.
- Required architecture headings, twenty-decision trace rows, permission operations, lifecycle states and Manual Intervention five-part fields: pass.
- Corrective legacy inventory/backfill, named constraint replacement, pseudo-DDL foreign keys/invariants, stable lineage and quota/replacement structural assertions: pass.
- Original/source worktrees and remote state: not mutated.

## Evidence Qualification

This is local static architecture validation, not implementation, authenticated runtime, provider suitability, legal certification, remote Storage proof or production readiness. The actual project region was not remotely inspected because that action was not authorised.
