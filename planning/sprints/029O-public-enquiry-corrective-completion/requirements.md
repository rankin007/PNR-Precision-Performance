# Sprint 029O - Public Enquiry Corrective Completion

## Outcome

Correct the two blocking Sprint 029N inspection findings, establish a no-send SMTP readiness gate, prove one new and distinct synthetic enquiry end to end, and activate the governed public stable-trial enquiry only after privacy retention, validation, notification, cleanup and exact Production routing all pass.

Target outcome: `public-enquiry-live-accepted-clean`.

Sprint 029N remains an inert, rolled-back precursor: migration 0022 is installed, its one candidate is unaliased, all five aliases remain on accepted Sprint 036L deployment `dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf`, and synthetic database residue is zero. Sprint 029O is the single corrective completion sprint. Do not create another micro-sprint for a deterministic migration, validation, SMTP classifier, harness, reporter, scheduler, cleanup or credential-transport correction needed for this exact outcome.

## Workflow profile and flight class

Use `strict`. Flight class is `critical` because this work corrects a deployed privacy schema, uses encrypted SMTP credentials, applies an additive Production migration, creates an external email notification, creates a Production deployment and may move five public aliases. A fresh plan reviewer is required before implementation and a different fresh inspector is required after the complete implementation and real evidence.

## Canonical starting authority

Work only in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical` from exact SHA `8968415a89dc187e3994cd9bcb8bcecd793a0854` on branch `codex/029O-public-enquiry-corrective-completion`. Resolve the current directory and `git rev-parse --show-toplevel`; both must normalize to that canonical path before Pack application, implementation, staging, migration, deployment or external mutation.

Preserve and exclude the inherited uncommitted method/template work under `.120x/`, `.agents/`, method templates and method-maintenance scripts. `planning/ROADMAP.md` and `planning/STATUS.json` contain the Architect's 029O activation changes and are sprint-related. Do not use a legacy repository, temporary checkout, alternate history or worktree.

The Pack must dry-run to exactly four traversal-free destinations inside `planning/sprints/029O-public-enquiry-corrective-completion/`, then apply and reread all four files. The applied files become Builder authority.

## Current verified truth and correction boundary

- Remote Supabase project is exactly `uvskssaecdhxcgytkasc`; migration 0022 was applied once and the last verified trainer-enquiry aggregate was zero enquiry rows and zero abuse buckets.
- Accepted public rollback is Ready Sprint 036L deployment `dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf` on all five aliases.
- Sprint 029N candidate `dpl_1r4BKiWXkEis9BXnmnYs4HpK2exB` remains unaliased and must never be promoted because it contains known defects.
- `CONTACT_ENQUIRY_EMAIL` and the SMTP bindings are encrypted Production configuration. Values remain hidden and must not be exported, printed, written to a command line, committed or requested from a person.
- The historical synthetic reference `PP-3B4BDEE2D55CB313` was purged. Its SMTP result remains intentionally ambiguous. Never retry, recreate or use that request/reference as a delivery test.
- `INSPECT-001`: migration 0022 linked a 90-day enquiry to the abuse hash through non-null `ON DELETE RESTRICT`, preventing the promised short hash retention.
- `INSPECT-002`: validation collapsed whitespace before checking control characters, so line-feed, carriage-return and tab input could be accepted.
- The 029N SMTP outcome was `delivery_unknown`. Historical cause is unknown. Correct prospective error classification and require an authenticated no-send transport verification before a new live notification; do not claim the old result was authentication failure.

## Task contract

**objective:** Deliver one corrected and accepted public trainer-enquiry path whose abuse identifier is physically removable well before 24 hours while the enquiry remains for 90 days, whose raw inputs reject every prohibited control character before normalization, whose encrypted SMTP channel passes a no-send readiness check, and whose one new synthetic request is stored, notified once, replay-safe, cleaned and released through one exact Production candidate.

**owns:** Canonical/branch/Pack proof; additive migration `0023_public_trainer_enquiry_retention_correction.sql`; corrected raw validation; SMTP no-send verification and safe prospective error classification; exact 029O tests, migration-ledger changes and autonomous proof; metadata-only encrypted binding checks; process-only credential use; one scoped implementation checkpoint commit/push; application of migration 0023 to exact Supabase project; one new Production `--skip-domain` candidate; one new synthetic notification after preflight; duplicate/negative/retention/rate-limit/cleanup proof; fixed five-alias cutover and rollback; privacy/operations documentation; fresh plan review and inspection; proportional closeout and scoped closeout commit/push.

**must_not:** Edit applied migration 0022 or migrations 0001-0021; display, export, persist, log, commit or place in arguments any environment value, recipient/sender address, SMTP host/user/pass/response, Supabase secret, token, raw network identifier/hash, real enquiry payload, protected identity or mailbox content; ask a person for a password, OTP, code or secret; retry the 029N synthetic request; inspect the mailbox; invent the historical SMTP cause; promote the 029N candidate; add a new email vendor/account, CAPTCHA, analytics, marketing, commerce, onboarding or medical data; expose enquiry data/functions to browser roles; drop/reset/repair remote schema; create more than one 029O deployment; move unlisted aliases; stage inherited method dirt; merge, PR, push `develop`, force-push or rewrite history.

**acceptance:** An additive 0023 correction makes `trainer_enquiries.abuse_bucket_hash` nullable with `ON DELETE SET NULL`, shortens bucket operational expiry, permits physical bucket deletion independently of the 90-day enquiry, installs a database-owned hourly cleanup job with a large safety margin inside 24 hours, and proves an enquiry remains while its expired bucket is deleted and the link becomes null. Raw LF, CR, TAB and every C0/DEL control are rejected before trimming/collapsing. Candidate runtime passes a sanitized `transporter.verify()` no-send check before any live send. Prospective connection/TLS/auth/pre-envelope/DATA outcomes are discriminated without response text; definite auth failure blocks sending, definite safe-retry classes stay bounded, and potentially accepted outcomes remain terminal ambiguous. Exactly one new synthetic request reaches provider-accepted `sent`, exact replay causes no second row/attempt, negative/rate-limit/retention controls pass, exact fixture data is purged and aggregate residue is zero. Only then does one exact-source Ready candidate receive all five aliases; otherwise all aliases remain/return five-of-five to accepted 036L and the corrected empty schema stays locked down.

**verification:** A001-A036; canonical/Git/Pack gates; exact no-edit Builder plan; fresh critical plan review; additive migration semantic and remote readback; scheduled-job identity/status evidence; discriminating retention and raw-control tests; SMTP verify/classifier tests; focused and retained Product/security/commerce tests; TypeScript, zero-warning lint, Production build, static/JSON/encoding/secret/diff scans; exact project/source/deployment/alias ledgers; no-send candidate preflight; one new live synthetic request, replay and negatives; sanitized row/status/count proof; exact purge and aggregate zero; five-alias cutover or proven rollback; distinct fresh critical inspection; scoped closeout commit/push and final disk/direct-remote/remote-state readback.

## Privacy-retention correction

Create only `supabase/migrations/0023_public_trainer_enquiry_retention_correction.sql`; never edit 0022. The migration must:

- replace the 0022 `ON DELETE RESTRICT` relationship with a nullable `ON DELETE SET NULL` relationship;
- keep enquiry expiry at 90 days and preserve all service-role-only/RLS/browser-denial boundaries;
- keep the keyed abuse hash only in the abuse bucket and nullable temporary link, never in logs or evidence;
- set each new abuse bucket to expire no later than two hours after its one-hour window begins, giving more than 21 hours of operational safety margin;
- physically delete expired buckets in bounded batches without waiting for the enquiry row, with FK nulling preserving the 90-day enquiry;
- add opportunistic bounded bucket cleanup on accepted traffic where safe;
- install one deterministic Supabase Cron/`pg_cron` job named for trainer-enquiry abuse cleanup at minute 5 of every hour; preflight the extension/job state and fail closed on an unexpected conflicting job;
- make scheduling and cleanup idempotent and concurrency safe without granting browser execution;
- update the maintenance/schema-status/fixture functions needed for truthful counts, nullable links, schedule identity and residue proof;
- provide a service-only, sanitized, self-cleaning retention proof or equally strong executable proof showing an expired synthetic bucket is removed, its linked enquiry remains, the link is null, and proof residue is zero; and
- remain additive and non-destructive to existing enquiry records. Pre-migration aggregate zero must be re-proved, but the SQL must still be safe if a record appears between planning and execution.

Supabase Cron is the database-owned scheduler. Do not make privacy retention depend on a Vercel hourly schedule: current Vercel plan/frequency must not be assumed, and the existing daily application cron may remain for notification and 90-day maintenance. The database cleanup job performs bucket deletion only; it must not claim or send SMTP work.

## Raw validation correction

Inspect each raw string value for `U+0000` through `U+001F` and `U+007F` before `trim()` or whitespace collapsing. Then preserve the intended trimming/collapsing and existing length/format rules for normal spaces. Add discriminating tests for LF, CR and TAB in every required/optional textual field category, plus the retained non-whitespace control test. A wrong normalize-first implementation must make these tests fail.

## SMTP readiness and delivery correction

Add a provider-layer no-send verification using Nodemailer `transporter.verify()`. Candidate runtime must invoke it through the authenticated internal boundary and return only a finite result/status/provider class; no host, address, command, code, response, exception or credential may enter output or logs. `verify()` tests DNS, TCP, TLS and authentication but does not prove sender acceptance, so one later live synthetic send is still required.

Classify errors from safe structural properties only:

- connection/DNS/socket/TLS setup: definite pre-send class;
- `EAUTH`, SMTP response code 535, or a command beginning `AUTH`: definite authentication/configuration failure that blocks the live send and is never mislabeled ambiguous;
- EHLO/HELO/MAIL FROM/RCPT TO and equivalent pre-DATA failures: definite pre-envelope class;
- DATA/DOT or any accepted-but-indeterminate result: `delivery_unknown`, terminal and never automatically retried; and
- unknown shapes: terminal `delivery_unknown`, not guessed.

Do not output the inspected properties. Unit tests must include realistic `command: "AUTH PLAIN"`, `code: "EAUTH"`, `responseCode: 535`, TLS/connection cases, RCPT, DATA and unknown cases. The existing encrypted Production bindings are used in process only. A no-send failure may be diagnosed and corrected autonomously only from an already available authoritative in-scope encrypted binding source without exposing values or changing provider identity; absence of such a source is a material credential boundary, not permission to invent a credential.

## Release and compensation authority

Before any remote write, freshly prove:

- exact Supabase project, remote head 0022, no 0023, trainer enquiry/bucket aggregate `0/0`, and no conflicting cleanup job;
- exact Vercel project `prj_6To7czLpCEGL6fInkQwE4egePPpq`;
- accepted 036L deployment Ready and all five aliases on it;
- 029N candidate still zero-of-five aliases; and
- required Production environment names/protection/target metadata without values.

Builder is authorized to create one scoped implementation checkpoint commit on the 029O branch, push that exact branch, apply exactly migration 0023 once, and create exactly one new Production `--skip-domain` candidate from that exact direct-remote SHA. No second deployment is authorized.

Run immutable candidate checks, then the authenticated no-send SMTP preflight. Only after preflight passes may the harness submit one new distinct synthetic request with a new UUID/reference and a clearly synthetic `.invalid` submitted email. Provider acceptance must be exactly one accepted recipient and no rejected recipient; do not inspect a mailbox. Replay the same UUID and prove the same reference and one total notification attempt. Run unknown-key, invalid-control, honeypot, cross-origin, invalid-volume and bounded rate-limit controls. Run retention lifecycle proof. Purge the exact live fixture and every proof fixture/bucket; prove reference residue and aggregate residue `0/0`.

Only after every gate passes may the aliases move in this candidate order: legacy-team, team-project, project, `www`, apex. Resolve all five independently after every assignment. On any non-target result after movement, restore apex, `www`, project, team-project, legacy-team to accepted 036L and prove five-of-five. If migration succeeds but release fails before cutover, leave 0023 and its empty locked-down schema/job installed and aliases on 036L. Never promote the 029N candidate.

## Approved implementation and closeout files

The Builder plan must reduce this candidate set to the exact files needed:

- `supabase/migrations/0023_public_trainer_enquiry_retention_correction.sql`
- `lib/enquiries/contract.ts`
- `lib/enquiries/provider.ts`
- `lib/enquiries/server.ts`
- `app/api/internal/enquiries/route.ts`
- the narrowest 029O autonomous/focused test and proof scripts under `scripts/`
- `scripts/lib/migration-ledger-validation.ps1`
- `scripts/validate-supabase-clean-rebuild-020G.ps1`
- `scripts/test-supabase-clean-rebuild-ledger-023G.ps1`
- `docs/PUBLIC_ENQUIRY_PRIVACY_AND_OPERATIONS_029N.md` or a renamed/superseding 029O operations document
- `package.json` only if exact scripts must change; no dependency upgrade is expected
- the four applied 029O sprint files for accepted within-intent Pack corrections and closeout
- standard directly affected closeout records: `planning/STATUS.json`, `planning/STATE.md`, `planning/ROADMAP.md`, `planning/ARCHITECT_BRIEFING.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/SPRINT_SCHEDULE.md`, `planning/EVIDENCE_INDEX.md`, `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`, `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`.

Do not alter public collection concepts, visual design, trainer access, Auth, Storage, Stripe, commerce, retained identities or Sprint 036K. The existing npm audit findings are advisory unless executable evidence shows a direct dependency path can violate this sprint's enquiry boundary; do not run a broad audit rewrite.

## Evidence-proportional execution and manual intervention

Stop only for a material wrong target, authority gap, protected-data/secret exposure, destructive uncertainty, unauthorized scope expansion, migration/application partial state, broken SMTP channel without an authoritative in-scope repair source, failed integrity/privacy/security behaviour, Production impact or cleanup that cannot be proven safe. Substitute equivalent or stronger safe evidence when a preferred supporting tool is unavailable. Keep deterministic validator, harness, credential transport, scheduler, reporter, formatting and encoding corrections inside 029O. Do not create another follow-up solely for Docker, browser automation, a schema dump, renderer, clipboard control, optional CLI path or redundant verification.

No manual password, code, OTP, mailbox inspection or PowerShell secret entry is part of this sprint. If a material external credential boundary truly remains after safe process-only alternatives are exhausted, record what failed, evidence checked, the exact minimum action and what will be verified; do not conceal the block or weaken acceptance.
