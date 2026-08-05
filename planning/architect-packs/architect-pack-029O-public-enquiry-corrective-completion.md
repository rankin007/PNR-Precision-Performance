# Architect Pack - Sprint 029O Public Enquiry Corrective Completion

============================================================
FILE: planning/sprints/029O-public-enquiry-corrective-completion/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/029O-public-enquiry-corrective-completion/blueprint.md
============================================================

# Sprint 029O Blueprint

## Execution sequence

1. Prove canonical CWD/top-level, exact 029O branch/start SHA and inherited dirty-path exclusions. Dry-run, apply and reread the exact four-file Pack.
2. Builder reads the applied sprint, 029N diff/evidence/inspection findings, migration 0022, enquiry modules/routes/tests, operations documentation and current release harness. Return one exact no-edit critical plan with file list, scope guards, every criterion, commands, baselines/arithmetic, closeout, `Pack corrections`, and blockers.
3. A genuinely fresh Architect reviews the full plan under the three-decision budget. Implementation starts only after `pass`; accepted Pack corrections must remain within this Pack's intent.
4. Add discriminating failing tests for raw LF/CR/TAB rejection, nullable/set-null retention, physical bucket deletion with a surviving enquiry, cleanup scheduling, realistic SMTP auth/connection/TLS/pre-envelope/DATA classification and no-send verification.
5. Implement additive migration 0023 and its bounded database-only cleanup job/proof. Update ledger validation from exact 0001-0022 to exact 0001-0023 without weakening earlier migration controls or falsely claiming remote state.
6. Implement validation-before-normalization and SMTP verification/classification through server-only boundaries. Expose a sanitized authenticated internal `smtp-preflight` action; no public endpoint or output gains protected detail.
7. Run focused suites and arithmetic, retained public/auth/role/dashboard/commerce/JSON/static suites, TypeScript, zero-warning lint, Production build, Australian English, encoding, secret/log/client-boundary and scoped-diff scans.
8. Establish one scoped implementation checkpoint commit/push on the 029O branch, excluding inherited method/template dirt. Prove direct remote branch equals the exact checkpoint.
9. Reconcile current CLI/API help and perform sanitized remote preflight: Supabase exact project/head/no-0023/zero aggregates/no job conflict; Vercel exact project/Ready rollback/five aliases/029N zero aliases; environment names/protection/Production targets only.
10. Apply only migration 0023. Read back remote head, FK nullability/delete action, 90-day enquiry retention, short bucket expiry, RLS/grants/functions, cleanup job schedule/command identity and aggregate zero without row contents.
11. Execute the service-only retention proof and require surviving enquiry `1`, deleted bucket `1`, nulled link `1`, proof residue `0`; independently rerun aggregate zero.
12. Create exactly one Production `--skip-domain` 029O candidate from the exact checkpoint. Require exact project/SHA/branch, Ready, and zero aliases.
13. Run immutable public/Privacy/protected/API/commerce/client-secret checks against only that candidate.
14. Run authenticated candidate SMTP `verify()` preflight. If it is not a finite `ready` result, do not send or cut over; diagnose once using safe structural classes and an authoritative process-only source if one exists.
15. After preflight success, submit exactly one new synthetic valid request. Require a new opaque reference, one row/bucket, one attempt and provider status `sent`. Replay the same UUID and require the same reference and unchanged counts/attempts.
16. Run invalid LF/CR/TAB/unknown-key/honeypot/cross-origin/volume controls, bounded rate-limit proof and retention proof. Require zero unintended rows and notifications.
17. Purge the exact live reference and all proof residue. Require exact deletion and final enquiry/bucket aggregate `0/0` before any alias movement.
18. Move the five aliases in fixed candidate order, independently rereading expected `1/4` through `5/0`. At five-of-five repeat non-storing public/Privacy/API/protected/commerce smoke; never send a second notification.
19. A new fresh inspector, distinct from Builder and plan reviewer and without Builder conversation inheritance, judges every acceptance criterion, full diff, real evidence, source/remote state and complete closeout plan under the three-decision budget.
20. After inspection `pass`, update durable closeout truth, mark 029N as inert/superseded and 029O done, set STATUS `sprint-closed`, create/push the scoped closeout commit, then reread disk, direct remote SHA, migration/job metadata, five aliases, live routes and aggregate zero. On any post-cutover failure, restore all aliases to 036L first and close only the truthful safe outcome.

## Architecture trace

```text
Raw browser JSON
  -> parseEnquiryPayload checks raw C0/DEL controls
  -> normalizes ordinary spacing and validates fields
  -> submitEnquiry derives hourly HMAC bucket + UUID idempotency hash
  -> accept_trainer_enquiry updates short-lived abuse bucket
  -> trainer_enquiries stores 90-day PII + temporary nullable bucket link
  -> claim marks one attempt
  -> SMTP send after candidate no-send verify
  -> finite sent/retryable/delivery_unknown completion

Supabase Cron at 5 minutes past each hour
  -> bounded bucket-only cleanup
  -> DELETE expired abuse bucket
  -> FK ON DELETE SET NULL
  -> 90-day enquiry survives without the hash

Authenticated proof/operations
  -> sanitized schema/job/retention/status counts
  -> exact synthetic purge
  -> aggregate zero
```

Source of truth for an enquiry is the locked-down Supabase row. SMTP is notification-only. Source of truth for abuse retention is the physical abuse-bucket table plus nullable FK and scheduled cleanup job, not a prose expiry timestamp. Source of truth for release is independent Vercel deployment and five-alias readback.

## Flight evidence

1. **Class and reason:** `critical`; the change crosses raw public input, server validation, HMAC persistence, an already-applied Production schema, a database scheduler, encrypted SMTP, one external notification, deployment and five live aliases.
2. **Acceptance invariant at risk:** no raw control input is accepted; a pseudonymous network hash is physically removable well before 24 hours while the enquiry may remain 90 days; no live notification occurs before SMTP readiness; one accepted request produces one stored row and at most one notification; no release occurs with synthetic residue or failed proof.
3. **Affected layers and verified paths/symbols:** `lib/enquiries/contract.ts::normalizedText/optionalText/parseEnquiryPayload`; migration 0022 as immutable predecessor and new 0023 FK/functions/cron; `lib/enquiries/provider.ts::classifyProviderError/deliverNotification` plus new verify function; `lib/enquiries/server.ts`; `app/api/internal/enquiries/route.ts`; 029O focused/autonomous scripts; migration-ledger helper/reporter/adversaries; Supabase project `uvskssaecdhxcgytkasc`; one new Vercel candidate and the five named aliases.
4. **Source, transformations and sink:** raw JSON is checked before normalization, converted to typed fields, HMAC/UUID-derived identifiers and a service-only database row, then a claimed plain-text notification; an hourly database job deletes only expired HMAC buckets and FK nulling removes the link while the enquiry row remains; deployment source is an exact direct-remote Git SHA and sink is the five public aliases only after proof.
5. **Discriminating examples:** `"Trainer\nName"`, `"Stable\rName"` and `"0400\t000"` must fail whereas ordinary repeated spaces normalize; a synthetic expired bucket linked to an unexpired 90-day enquiry must be deleted with the row retained/link null, which fails under 0022 `RESTRICT`; `{code:"EAUTH",command:"AUTH PLAIN",responseCode:535}` must be definite authentication failure, while `{command:"DATA"}` must remain terminal ambiguous; replaying one UUID must retain one reference/row/attempt rather than two.
6. **Durable verification source:** exact start `8968415a89dc187e3994cd9bcb8bcecd793a0854`; applied four-file 029O sprint; scoped checkpoint/direct-remote SHA; full Git diff; counted local test outputs; sanitized Supabase migration/FK/job/count projections; exact Vercel project/deployment/alias projections; fresh plan and inspection ledgers.
7. **Known uncertainty:** the historical 029N SMTP cause and possible mailbox receipt are unknowable by design and will not be inspected or retried. Current encrypted bindings may pass or fail prospective no-send verification; only a ready result permits the new send. Cron extension/job availability and current remote state must be freshly preflighted rather than assumed.

## Failure and compensation matrix

| Boundary | Required result | Non-target handling |
| --- | --- | --- |
| Pack/canonical | Exact four destinations and canonical branch/start | Stop before implementation |
| Plan review | Fresh `pass` within three decisions | Correct within Pack intent or stop with ledger |
| Local correction | Raw controls, retention, SMTP classifier/preflight and retained gates pass | Fix in 029O; no micro-sprint |
| Remote preflight | Exact projects, head 0022/no 0023, 0/0, 036L 5/5, no job conflict | Stop before remote write |
| Migration 0023 | Applied once; FK/job/functions/0/0 readback exact | Stop; no destructive rollback; report partial state |
| Retention proof | Row retained, bucket deleted, link null, residue zero | No deployment/cutover |
| Candidate | One exact-source Ready deployment, zero aliases | No second deployment |
| SMTP verify | Sanitized ready before send | No send/cutover; safe single diagnosis |
| Live synthetic | New reference, one row/attempt, `sent`, replay stable | Purge; aliases remain 036L |
| Negatives/cleanup | No unintended writes; final aggregate 0/0 | No cutover; stop if cleanup unproven |
| Alias transition | Expected 1/4 through 5/0 | Reverse-order restore to 036L and prove 5/5 |
| Inspection | Fresh `pass` within three decisions | Builder replans; no direct inspector patch |
| Closeout | Disk/direct-remote/remote/live truth aligned | Do not claim landing |

## Checkpoints and evidence arithmetic

Use one implementation checkpoint after local gates and before remote mutation, and one closeout checkpoint only after inspection pass and durable records. Both commits/pushes are limited to sprint-owned files. Do not amend the 029N checkpoint.

Builder must establish observed baseline counts before edits and publish target arithmetic before implementation. New discriminating assertions are added to, not substituted for, the retained 223/223 and 13/13 029N foundations. Report focused suites separately from retained regressions; never hide a failed group inside aggregate arithmetic.

============================================================
FILE: planning/sprints/029O-public-enquiry-corrective-completion/acceptance.md
============================================================

# Sprint 029O Acceptance

- [ ] A001 Canonical CWD and Git top-level are exact, branch is `codex/029O-public-enquiry-corrective-completion`, start is `8968415a89dc187e3994cd9bcb8bcecd793a0854`, and inherited method/template dirt is classified and excluded.
- [ ] A002 The one Pack dry-runs/applies/rereads exactly four traversal-free 029O files; applied files are Builder authority.
- [ ] A003 Builder returns the complete no-edit critical plan with exact files, task contract, guards, all criteria, commands, baseline/target arithmetic, closeout, Pack corrections and blockers.
- [ ] A004 A genuinely fresh plan reviewer returns `pass` within three decisions with a stable finding ledger.
- [ ] A005 Migration 0022 and migrations 0001-0021 remain byte-for-byte unchanged; exactly one additive 0023 migration is added.
- [ ] A006 The 0023 FK is nullable `ON DELETE SET NULL`; existing/future enquiry rows retain 90-day expiry and no browser grants/policies are introduced.
- [ ] A007 New abuse buckets expire no later than two hours after their hour starts and bounded deletion no longer waits for enquiry deletion.
- [ ] A008 One deterministic database-owned hourly bucket-only cleanup job exists with exact name/schedule/command identity, no SMTP claim/send side effect and no conflicting duplicate.
- [ ] A009 Executable retention proof discriminates 0023 from 0022: expired bucket deleted, unexpired enquiry retained, link null, proof residue zero.
- [ ] A010 Schema/status/maintenance/fixture functions return sanitized truth for nullable links, job state, retention and exact cleanup; RLS/browser denial/service-only safe-search-path boundaries pass.
- [ ] A011 Every raw required/optional text field rejects LF, CR, TAB, all C0 and DEL before normalization; ordinary spaces still normalize and all prior length/format rules pass.
- [ ] A012 Candidate provider layer implements no-send `verify()` with bounded timeouts and no raw protocol/content logging.
- [ ] A013 Realistic `AUTH PLAIN`/`EAUTH`/535 is definite authentication failure; connection/TLS/pre-envelope cases are finite; DATA/DOT/unknown accepted-risk cases remain terminal ambiguous and un-retried.
- [ ] A014 Authenticated internal SMTP preflight returns only finite sanitized status/provider class and cannot be called without the existing constant-time secret boundary.
- [ ] A015 Historical reference `PP-3B4BDEE2D55CB313` is never retried/recreated; no historical SMTP cause or mailbox outcome is claimed.
- [ ] A016 Migration ledger accepts exactly 0001-0023, preserves 0018-0022 identity/encoding controls, rejects missing/duplicate/BOM/future heads, and reports local truth without claiming remote application.
- [ ] A017 Focused test arithmetic includes discriminating raw-control, retention, schedule, SMTP verify/classifier, replay and cleanup cases; the plausible wrong implementations go red.
- [ ] A018 Retained public enquiry, migration, autonomous, trainer, Auth, role, dashboard, commerce, JSON/static and Australian-English suites pass with truthful group counts.
- [ ] A019 TypeScript, zero-warning lint, Production build, encoding, secret-shape, logging, controlled-email, client/server-boundary and scoped-diff scans pass.
- [ ] A020 One scoped implementation checkpoint is committed/pushed on 029O, excludes inherited dirt, and direct remote branch equals the exact SHA.
- [ ] A021 Pre-write Supabase proof is exact project `uvskssaecdhxcgytkasc`, remote head 0022/no 0023, zero enquiry/bucket aggregates and no conflicting cleanup job.
- [ ] A022 Pre-deploy Vercel proof is exact project, encrypted Production binding metadata without values, accepted 036L Ready and five-of-five aliases, with 029N candidate zero-of-five.
- [ ] A023 Exactly migration 0023 is applied once; remote head/FK/nullability/expiry/RLS/grants/functions/job/aggregate readback passes without row contents.
- [ ] A024 Remote service-only retention proof passes the exact retained-row/deleted-bucket/nulled-link/zero-residue contract, followed by aggregate 0/0.
- [ ] A025 Exactly one new Production `--skip-domain` candidate is Ready from the exact checkpoint/project/branch and initially has zero aliases; 029N candidate remains unaliased.
- [ ] A026 Immutable candidate public, Privacy, protected-route, enquiry API, disabled-commerce and client-secret checks pass.
- [ ] A027 Candidate SMTP no-send preflight returns ready before any new live submission; no host/address/credential/error detail is exposed.
- [ ] A028 Exactly one new distinct synthetic valid request produces a new opaque reference, one row/bucket, one attempt and notification status `sent` without mailbox inspection.
- [ ] A029 Exact replay returns the same reference with one row and one total attempt; no second notification is made.
- [ ] A030 Invalid raw controls, unknown key, honeypot, cross-origin, invalid volume and bounded rate-limit cases fail generically with zero unintended storage/notification.
- [ ] A031 Exact synthetic and proof fixtures are purged; reference residue and final aggregate enquiry/bucket counts are 0/0 before alias movement.
- [ ] A032 Only after A001-A031 pass, exactly five aliases move in fixed candidate order with independent expected transition readbacks and final five-of-five candidate routing.
- [ ] A033 Final live smoke is non-storing and proves enquiry/Privacy/public/protected/API/commerce behaviour without a second notification; any failure restores five-of-five accepted 036L in fixed reverse order.
- [ ] A034 A fresh inspector distinct from Builder and plan reviewer returns `pass` within three decisions after judging every applicable criterion, full diff, evidence and closeout plan.
- [ ] A035 Durable closeout truth marks 029N inert/superseded, 029O done only on full live acceptance, records class/evidence/decision ledgers/substitutions/residuals, refreshes the Architect briefing and sets STATUS `sprint-closed`.
- [ ] A036 Scoped closeout commit/push and final disk/direct-remote/migration/job/environment-metadata/deployment/five-alias/live-route/aggregate-zero reread all agree; otherwise no landing is claimed.

Target outcome is `public-enquiry-live-accepted-clean`. Safe fallback is `public-enquiry-corrected-inert-rolled-back-clean`: 0023 may remain installed with zero residue and its database cleanup job, but public aliases are five-of-five on accepted 036L and no defective candidate is promoted. A credential or cleanup boundary that cannot be proven is a truthful block, never grounds to weaken A027-A031.

============================================================
FILE: planning/sprints/029O-public-enquiry-corrective-completion/handoff-prompt.md
============================================================

# Sprint 029O Builder Handoff

You are Builder for critical Sprint 029O in `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`.

First prove canonical CWD/Git top-level, exact branch `codex/029O-public-enquiry-corrective-completion`, start SHA `8968415a89dc187e3994cd9bcb8bcecd793a0854`, and inherited dirty-path exclusions. Dry-run and apply the single 029O Architect Pack, verify exactly four traversal-free destinations, and reread all four applied files. They are your authority.

Do not edit implementation yet. Read migration 0022, enquiry contract/provider/server/routes, 029N tests/harness/operations evidence, migration-ledger tooling, inspector findings and current release truth. Return one exact plan containing the task contract, implementation file list, scope guards, every A001-A036 criterion, verification commands, observed baseline and target arithmetic, standard closeout files/actions, a named `Pack corrections` section (`None` is valid), and any blocking ambiguity. A fresh Architect must pass that plan before implementation.

## Task contract

**objective:** Correct privacy retention and raw validation, add a no-send SMTP readiness boundary, prove one distinct live synthetic notification exactly once, remove all synthetic residue and activate one exact Production candidate only after every critical gate passes.

**owns:** Additive 0023 migration/FK/short bucket expiry/database cleanup job/retention proof; raw-control validation; prospective SMTP verify and finite classification; focused/retained tests and ledger updates; metadata-only environment proof; one checkpoint commit/push; exact 0023 application; one deployment; one new synthetic send after ready preflight; replay/negative/retention/cleanup proof; five-alias cutover/rollback; fresh reviews and scoped closeout.

**must_not:** Expose or request secrets/codes/addresses/mailbox content; edit 0001-0022; retry the old synthetic request; invent its cause; promote the 029N candidate; add vendors/features; weaken RLS/privacy/acceptance; create a second deployment; leave synthetic residue; move unlisted aliases; stage inherited method dirt; merge/PR/push `develop`/force-push/rewrite history.

**acceptance:** A001-A036 in `acceptance.md`, including a nullable set-null FK, database-owned hourly bucket-only cleanup with margin inside 24 hours, discriminating retention and raw-control tests, sanitized no-send SMTP ready result before one new send, exact sent/replay/negative/cleanup evidence, and five-of-five cutover only after aggregate zero.

**verification:** Exact local arithmetic and retained gates; TypeScript/lint/build/static/scans; direct-remote checkpoint; sanitized Supabase migration/FK/job/function/count proof; exact Vercel project/source/candidate/alias proof; candidate no-send verify; one new live synthetic sent result and exact replay; retention/rate/negative proof; exact purge/aggregate zero; fresh inspection; durable closeout and final reread.

Apply the Evidence-Proportional Execution Standard. Stop only for a material target, authority, secret/privacy, destructive, migration, integrity/security, Production, scope or cleanup risk. Use equivalent or stronger safe proof when a supporting tool is unavailable. Keep deterministic harness, credential-transport, scheduler, validator, reporter, formatting and encoding corrections inside 029O. Manual password/code/OTP/secret entry is not part of this sprint and is a last resort only after safe process-only alternatives are exhausted.
