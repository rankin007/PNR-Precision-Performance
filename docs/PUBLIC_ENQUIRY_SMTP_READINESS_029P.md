# Public Enquiry SMTP Readiness - Sprint 029P

## Purpose and limit

Sprint 029P establishes a dedicated Resend transport contract and proves only authenticated no-send readiness on one new unaliased Production-targeted candidate. It does not submit an enquiry, send email, prove sender acceptance or delivery, inspect provider email logs or a mailbox, mutate Supabase, move an alias or activate public enquiry.

## Dedicated server-only contract

The public-enquiry path reads only:

- `PUBLIC_ENQUIRY_SMTP_HOST`
- `PUBLIC_ENQUIRY_SMTP_PORT`
- `PUBLIC_ENQUIRY_SMTP_USER`
- `PUBLIC_ENQUIRY_SMTP_PASS`

It does not fall back to generic `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` or `SMTP_PASS`. The existing `SMTP_FROM`, `CONTACT_ENQUIRY_EMAIL`, abuse HMAC, internal-auth and approved Supabase contracts remain unchanged. The dedicated Resend structural values are host `smtp.resend.com`, implicit-TLS port `465` and username `resend`; the password is one new domain-restricted sending key held only by Resend and Vercel.

## Protected blind transfer

Before key creation, prevalidate the exact Resend create, Copy and dismiss controls and prepare the exact Vercel Sensitive Production-only blank-branch password form, value field, save control and post-save navigation. Do not create a key unless the transfer can complete without a screenshot, DOM/accessibility read, console inspection, page capture, clipboard read, field-content response or other tool-visible token state.

After creation, enter the no-observation interval. Blindly invoke Copy, paste directly into the prepared Vercel field, save, dismiss or navigate away from every token-bearing surface, clear the clipboard, and only then resume metadata-only inspection. The action may return only a fixed completion or failure class. Never print, persist, manually enter, place in arguments, compare or reconstruct the value.

## One-attempt release boundary

Local focused and retained gates, metadata-only protected-content scans and a scanner-clean exact diff/manifest precede provider mutation. Provider preflight requires the verified domain and exactly two pre-existing masked sending-access keys. Create exactly one new key named `Precision Performance public enquiry 029P`, with sending access restricted to `precisionperformance.com.au`, and exactly four new Production-only blank-branch bindings in the exact Vercel project.

Create exactly one candidate with domain auto-assignment disabled. The readiness controller permits immutable checks and one authenticated `smtp-preflight` only. It has no submission, fixture, purge, live-candidate or alias-write mode. Success is exactly `result=smtp-preflight`, `status=ready`, `providerClass=resend`, `errorClass=null`; all output remains finite and sanitized.

## Failure and compensation

Before deployment, any non-target result removes only exact newly created 029P resources after ownership proof. A candidate or preflight failure permits no retry or second deployment: keep all aliases on accepted Sprint 036L, remove the four exact new bindings and revoke only the exact new key if cleanup can be proven complete. An unaliased candidate may remain inert. If cleanup cannot be proven, stop at the material cleanup boundary and do not claim clean fallback.

On success, retain the one key, four bindings and unaliased candidate for later 029Q discovery. Public enquiry remains unavailable. Existing Resend keys, generic SMTP bindings, migration 0023, its empty locked-down database state, all five aliases and both earlier enquiry candidates remain untouched.

## Safe evidence

Protected-content scanning always runs before content-emitting diff or file inspection and reruns after any post-external local mutation. Scanner output is limited to a fixed class, status, aggregate count and file names if containment requires them. A positive result stops content output immediately.

Durable evidence may record opaque provider/deployment IDs, branch and file hashes, binding names/types/targets, key/domain counts, Ready/alias counts, finite result classes, request counts and live alias targets. It must not contain a credential, address, token fragment, provider response, command detail, mailbox information or token-bearing browser/tool state.
