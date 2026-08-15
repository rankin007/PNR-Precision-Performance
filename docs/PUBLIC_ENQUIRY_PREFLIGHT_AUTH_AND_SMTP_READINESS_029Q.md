# Public Enquiry Dedicated Preflight Authentication and SMTP Readiness - Sprint 029Q

## Purpose and limit

Sprint 029Q establishes one temporary authentication path for an SMTP no-send check and one dedicated Resend transport candidate. It does not submit an enquiry, send email, prove sender acceptance or delivery, inspect email logs or a mailbox, mutate Supabase, move an alias, or activate public enquiry.

## Independent authentication boundary

The temporary path reads only `PUBLIC_ENQUIRY_PREFLIGHT_AUTH_SHA256`, `PUBLIC_ENQUIRY_PREFLIGHT_AUTH_NOT_BEFORE`, `PUBLIC_ENQUIRY_PREFLIGHT_AUTH_EXPIRES_AT` and the four dedicated `PUBLIC_ENQUIRY_SMTP_*` bindings. It never reads or changes shared `CRON_SECRET`, calls the full enquiry-environment reader, or enters the ordinary maintenance dependency path.

The candidate accepts a dedicated bearer only when its SHA-256 matches the configured lowercase verifier in constant time, its canonical UTC window is ordered and no longer than fifteen minutes, current time is inside that window, the bearer is at least 32 characters, and the parsed action is exact `smtp-preflight`. A matching bearer with malformed input, another action, an invalid window, or an expired window receives the same sanitized 404 denial and cannot fall through to shared authentication. Non-matching requests retain the existing shared authentication and response ordering.

## Encrypted local lifecycle

`scripts/PreflightAuth029Q.ps1` owns one new fixed Windows Credential Manager target and one separate synthetic self-test target. `Provision` refuses a pre-existing local target or any pre-existing temporary remote name, generates 32 random bytes without human input, stores the bearer only in Credential Manager, and sends only its verifier and timestamps to Vercel through redirected stdin. Output contains fixed states and counts only.

`VerifyReady` reads the bearer into process memory for one exact internal request and requires only the finite ready result. After the configured expiry, `VerifyExpiredAndCleanup` issues one same-bearer request, requires sanitized 404, deletes the three exact temporary bindings and local credential, and proves absence. `Compensate` requires the owned local record and removes only the temporary resources recorded by that run. Transcripts, manual entry, value arguments, clipboard inspection, value output, and plaintext files are prohibited.

## Protected provider transfer

Before provider key creation, prevalidate the exact restricted-key creation, Copy, Vercel Sensitive pass-field, save, dismissal/navigation, and clipboard-clear controls. During the token-visible interval, perform no screenshot, DOM/accessibility read, console inspection, page capture, clipboard read, field-value response, or other tool-visible observation. Transfer the one-time token directly into the prepared Production-only dedicated pass binding, save it, leave every token-bearing surface, clear the clipboard, and only then resume metadata-only inspection.

Create exactly one sending-access key restricted to the already verified project domain, four Production-only blank-branch dedicated SMTP bindings, three temporary verifier-window bindings, and one Production-targeted deployment with automatic domains disabled. Existing keys, generic SMTP bindings, and all aliases remain unchanged.

## One-attempt evidence and compensation

Local focused and retained tests, build gates, and the metadata-only protected scanner must pass before provider mutation. Only scanner-clean files may enter a content diff or candidate manifest. The candidate may run immutable non-storing checks, one successful no-send preflight, and one post-expiry denial. It has no public submission, delivery, fixture, purge, retry, or alias-write authority.

Any non-target key, configuration, candidate, or preflight result permits no retry or second deployment. Remove only exact newly created Sprint 029Q resources whose ownership is proven. Do not claim a clean fallback if cleanup is incomplete or uncertain. On target success, retain only the restricted provider key, four dedicated SMTP bindings, and unaliased candidate for later planning; remove all temporary authentication resources. Public enquiry remains unavailable and all five aliases remain on accepted Sprint 036L.

## Safe evidence

Durable evidence may contain fixed state classes, aggregate counts, exact configuration names, safe opaque provider/deployment identifiers, file hashes, Ready/alias counts, request counts, and finite result classes. It must not contain credentials, bearer fragments, addresses, environment values, protected responses, provider account details, token-bearing browser state, or clipboard contents.

## Closed fallback status

Sprint 029Q closed `dedicated-preflight-auth-and-smtp-readiness-recovery-blocked-clean`. The local implementation passed 616/616 counted assertions and all mapped local gates, but a broad signed-in provider snapshot rendered protected account identity/address in tool output. No protected detail is retained here. Execution stopped immediately before any provider/configuration/deployment/request mutation; final dedicated and temporary binding counts are zero, the live credential is absent, browser tabs are zero and accepted Sprint 036L remains live.

No secret or manual credential action is requested. Resumption requires a new approved follow-up/Fly after `INSPECT-001` rejects JavaScript non-default ports and PowerShell user information or ports other than 443, and after an identity-blind bounded provider projection/browser bridge is approved. Builder must then reprove the hardened URL matrix, scanner-clean source, zero-resource baseline and exact critical plan before mutation.
