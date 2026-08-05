# Public Enquiry Privacy And Operations - Sprint 029O

## Purpose and corrected boundary

The public stable-trial form collects the seven approved enquiry concepts only so Aprec8 can respond about a stable trial, consultation and related Precision Performance services. It is not marketing consent and does not start commerce, onboarding, profiling, analytics, model training or horse-health assessment.

The browser sends strict JSON to `POST /api/enquiries`. Every raw string is checked for C0 and DEL control characters before trimming or whitespace normalization. Same-origin, content-type, body-size, honeypot, UUID idempotency and one-hour HMAC abuse controls fail closed. The raw network identifier is discarded immediately after HMAC derivation, and responses never echo submitted values or notification state.

## Storage, retention and access

Migration `0022_public_trainer_enquiries.sql` remains immutable. Additive migration `0023_public_trainer_enquiry_retention_correction.sql` makes the temporary abuse-bucket link nullable with `ON DELETE SET NULL`. Enquiries still expire exactly 90 days after creation. New HMAC buckets expire two hours after their one-hour window begins.

One database-owned Supabase Cron job runs at minute 5 of every hour and invokes only bounded abuse-bucket cleanup. Deleting an expired bucket nulls the temporary link while preserving an unexpired enquiry. Accepted traffic and daily application maintenance may also invoke the same bounded bucket-only cleanup. Notification claiming or SMTP sending is never part of the database Cron job.

Both tables retain RLS, no browser policies, explicit browser-role revokes and service-role-only functions in approved Supabase project `uvskssaecdhxcgytkasc` in Singapore. The keyed HMAC is not logged or included in evidence. A service-only self-cleaning proof verifies that an unexpired enquiry survives, its expired bucket is deleted, its link is null and proof residue is zero.

The protected recipient must delete the operational mailbox copy within the same 90-day period unless the person separately enters a governed customer relationship. The recipient address is not recorded in the repository or evidence.

## Notification readiness and state machine

Supabase is the source of truth; SMTP is notification-only.

1. Candidate runtime first runs Nodemailer `verify()` through the authenticated internal boundary. This checks DNS, TCP, TLS and authentication without sending a message.
2. Only a finite `ready` result permits a new governed live submission. Output contains provider/status/error classes only, never a host, address, command, response, exception or credential.
3. The application atomically reserves the idempotency hash and abuse bucket, stores the enquiry and opaque reference, then marks one notification attempt before opening SMTP.
4. Exactly one accepted recipient and zero rejected recipients becomes `sent`; it proves provider acceptance, not inbox delivery.
5. Definite connection/TLS, authentication or pre-envelope failure uses a finite pre-send class. `EAUTH`, response code 535 and commands beginning `AUTH` are authentication failures.
6. DATA, DOT, accepted-but-indeterminate and unknown outcomes become terminal `delivery_unknown` and are never automatically retried.
7. A duplicate returns the original reference and never creates a second row or notification attempt.

Notification mail remains plain text, single-recipient and necessary-fields-only, with no HTML, image, attachment, tracking or remote content.

## Configuration and safe evidence

Required server-only Production bindings remain `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CONTACT_ENQUIRY_EMAIL`, `ENQUIRY_ABUSE_HMAC_SECRET`, `CRON_SECRET`, and the approved Supabase URL, anon key and service-role key. Values stay in provider-managed encrypted configuration and process memory. Operators and automation must not print, export, persist, place values in arguments or ask a person to re-enter them. A specifically reviewed app-owned credential-transport correction may rotate one binding only through process memory and stdin or an API request body, while preserving exact name, type, target and branch metadata and returning metadata-only evidence.

Sprint 029O used that exception once for `CRON_SECRET`. The first API update returned `api_error` and was transactionally unchanged. An exact-key `env add ... --force` stdin substitute then preserved one Sensitive Production blank-branch record and returned metadata-only `updatedAt=1785957325573`; the value was not exposed or manually entered. SMTP, recipient, Supabase and provider-identity bindings were not changed.

Safe evidence is limited to timestamps, opaque references, provider/status/result/error classes, project/deployment identifiers, booleans and counts. No mailbox access, OTP, password, code or manual secret entry is part of the workflow. Historical reference `PP-3B4BDEE2D55CB313` is permanently excluded from retry or recreation, and its historical SMTP cause or mailbox outcome is not inferred.

## Release, incidents and cleanup

Before release, remote proof must show migration head 0023, the nullable set-null FK, exact cleanup job, RLS/grants/functions, passing retention proof and aggregate enquiry/bucket counts `0/0`. One exact-source candidate must pass immutable checks and the no-send preflight before one new synthetic `.invalid` request is permitted.

The new request must be `sent` once, replay-safe, negative/rate/retention safe and then purged exactly. Aggregate `0/0` is required before any alias moves. Five aliases move only in the governed candidate order with independent readback after each assignment. Any failure restores all five in reverse order to accepted Sprint 036L deployment `dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf`. Sprint 029N candidate `dpl_1r4BKiWXkEis9BXnmnYs4HpK2exB` is never promoted.

If migration 0023 succeeds but delivery or release does not, the corrected empty locked-down schema and database cleanup job may remain installed while all aliases remain on 036L. A clean outcome always requires proven zero synthetic residue.

## Sprint closeout outcome

Sprint 029O closed as `public-enquiry-corrected-inert-rolled-back-clean`, not live accepted. Exact migration 0023 is installed and the self-cleaning retention proof passed with final enquiry/bucket aggregate `0/0`. Candidate `dpl_GA8Y3d8RGnqUv5WGHUmkrgP8hFFq` is Ready, Production-targeted and unaliased. Authenticated internal schema/retention checks passed, but the SMTP no-send preflight returned sanitized non-ready status before any `/api/enquiries` request.

No email, stored public enquiry, notification attempt, replay, live negative submission, submission-fixture purge, alias assignment or second deployment occurred. All five public aliases remain on accepted Sprint 036L deployment `dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf`; Sprint 029N and 029O candidates remain inert. Do not retry SMTP, deploy again or promote either candidate under closed 029O authority.
