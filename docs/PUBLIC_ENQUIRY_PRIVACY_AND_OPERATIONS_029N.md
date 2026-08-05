# Public Enquiry Privacy And Operations - Sprint 029N

## Purpose and boundary

The public stable-trial form collects seven approved enquiry concepts only. It is used to respond about a stable trial, consultation and related Precision Performance services. It is not marketing consent and does not start commerce, onboarding, profiling, analytics, model training or horse-health assessment.

The browser sends strict JSON to `POST /api/enquiries`. Server validation, same-origin and content-type checks, a honeypot, a one-hour HMAC abuse bucket and UUID idempotency all fail closed. The raw network identifier is discarded immediately after HMAC derivation. The response never echoes submitted values or notification state.

## Storage and access

Migration `0022_public_trainer_enquiries.sql` creates `trainer_enquiries` and `trainer_enquiry_abuse_buckets` in approved Supabase project `uvskssaecdhxcgytkasc` in Singapore. Both tables have RLS enabled, no browser policy, explicit browser-role revokes and service-role-only functions.

Enquiries expire exactly 90 days after creation. HMAC abuse buckets expire within 24 hours. Daily authenticated maintenance marks abandoned SMTP attempts `delivery_unknown`, claims only definite retryable work and deletes expired rows in bounded batches. No maintenance result contains enquiry content.

The protected recipient must delete the operational mailbox copy within the same 90-day period unless the person separately enters a governed customer relationship. The recipient address is not recorded in this repository or evidence.

## Notification state machine

Supabase is the source of truth; SMTP is notification-only.

1. Atomically reserve the idempotency hash and abuse bucket, then store the enquiry and opaque reference.
2. Mark one notification attempt before opening the SMTP transaction.
3. Classify provider acceptance as `sent` without claiming inbox delivery or reading a mailbox.
4. A definite connection, authentication or pre-envelope failure becomes `retryable`, with backoff and a maximum of three total attempts.
5. A potentially accepted or otherwise ambiguous result becomes `delivery_unknown` and is never automatically retried.
6. A duplicate returns the original reference and never creates or notifies twice.

Notification mail is plain text with no HTML, image, attachment, tracking or remote content. It contains the seven necessary values, submission time and reference, and goes only to `CONTACT_ENQUIRY_EMAIL` through the existing encrypted SMTP bindings.

## Configuration

Required server-only Production bindings are:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
- `CONTACT_ENQUIRY_EMAIL`
- `ENQUIRY_ABUSE_HMAC_SECRET`
- `CRON_SECRET`
- the existing approved Supabase URL, anon key and service-role key

`CONTACT_ENQUIRY_EMAIL` is metadata-only evidence. Operators and automation must never read, export, replace, delete/recreate or print its value. Runtime classifies the protected SMTP host into a finite provider disclosure class; an unclassified provider disables online submission.

## Maintenance and incidents

Vercel Cron calls `GET /api/internal/enquiries` with the platform-supplied `Authorization: Bearer CRON_SECRET`. The same route permits bounded, authenticated status and exact synthetic-fixture cleanup for governed proof. It returns status classes and counts only.

On an enquiry incident:

1. Do not inspect or log raw request bodies, database rows, SMTP responses, mailbox content or protected configuration.
2. Use the opaque reference and authenticated count/status projection.
3. If delivery is `delivery_unknown`, contact handling is a manual Aprec8 operational decision; never resend automatically.
4. If public release safety fails, restore all five aliases to accepted Sprint 036L deployment `dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf` in the governed rollback order. The additive locked-down schema may remain inert.
5. Prove exact synthetic row/bucket residue is zero before declaring a clean rollback or accepted cutover.

Access, correction and deletion requests use the published business contact method and the opaque receipt reference. Aprec8 may perform reasonable identity verification before acting.

## Evidence limits

Safe evidence contains only timestamps, opaque references, provider/status/result classes, deployment/project identifiers, booleans and counts. SMTP provider acceptance does not prove inbox delivery or reading. No mailbox access, OTP, password, code or manual secret entry is part of this workflow.
