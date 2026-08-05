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
