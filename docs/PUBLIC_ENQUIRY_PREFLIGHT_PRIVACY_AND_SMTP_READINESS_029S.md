# Public Enquiry Preflight Privacy and SMTP Readiness - Sprint 029S

## Purpose and limit

Sprint 029S hardens candidate origins, establishes an identity-blind provider inspection path and permits one authenticated SMTP no-send readiness attempt against one new unaliased Production-targeted candidate. It does not submit an enquiry, send email, prove sender acceptance or delivery, inspect a mailbox or delivery logs, change Supabase or migration 0023, move an alias, or activate public enquiry.

## Candidate origins

The JavaScript harness accepts only a plain allowlisted HTTPS origin. It rejects user information, paths other than slash, query, fragment and every explicit port, including explicit 443. The controller accepts only an absolute allowlisted HTTPS URI with no user information, slash-only path, no query or fragment, and effective port 443. Both validators fail closed before a bearer or request is used.

## Identity-blind provider projection

`scripts/provider-browser-projection-029S.mjs` defines one closed raw-snapshot contract and one fixed 28-field output contract. The output contains only a fixed projection name, finite page/state/control classes, booleans and counts. Unknown pages, fields, shapes, access classes, target classes, duplicate target keys and invalid count states return the same fixed refusal schema.

For live signed-in work, raw DOM and the temporary raw snapshot remain inside browser runtime. The browser executes the exact tested `BROWSER_PROJECTOR_SOURCE`, immediately discards raw state and returns only the fixed projection. A browser snapshot, screenshot, console read, broad page state, raw DOM, account identity, address, row text, key name, token or secret fragment must never reach agent output.

Synthetic tests use full snapshots with changing identity, address and token canaries. The safe projection must remain byte-identical when canaries change and contain no canary or fragment.

## Fresh ceilings before mutation

The bounded projections must prove one expected verified domain, two existing sending-access keys, zero full-access keys, zero Sprint 029S target keys and zero raw-secret shapes. The exact Vercel project must have zero dedicated SMTP rows, zero temporary verifier rows, five unchanged generic SMTP metadata rows and five accepted aliases on Sprint 036L.

The Resend create, Copy and dismiss controls and the prepared Vercel Sensitive Production-only blank-branch paste, save and navigation controls must be proven exact before key creation. Clipboard clearing must also be ready. Any mismatch or protected output stops the attempt before mutation.

## Protected transfer interval

Create at most one sending-access key with the exact Sprint 029S name and restrict it to the expected verified domain. While its one-time token is visible, perform only the prevalidated Copy, direct paste into the prepared Sensitive pass field, save, dismissal or navigation, and clipboard-clear steps. Do not take a snapshot or screenshot, evaluate page content, inspect the console, read the clipboard, inspect field state, or use any response that can contain the token. Metadata projection resumes only after the token surface is gone and the clipboard is cleared.

Create only the four dedicated Production-only blank-branch SMTP rows. The pass row is Sensitive. The three public structural values use the approved Resend host, implicit-TLS port and username. Existing keys and generic rows remain unchanged.

## Temporary authentication and one candidate

`scripts/PreflightAuth029S.ps1` uses one new fixed live Credential Manager target and one separate synthetic self-test target. It generates 32 cryptographically random bytes without human input, stores the raw bearer only in Credential Manager and process memory, and sends only its SHA-256 verifier and canonical UTC window to the exact three Sensitive Production rows through stdin. The window is no longer than fifteen minutes.

Create exactly one Production-targeted deployment from the canonical Sprint 029S branch and workspace with automatic domains disabled. Require Ready and zero aliases. Run only the fixed immutable public, privacy, protected, API and disabled-commerce checks. Then perform exactly one authenticated `smtp-preflight` and require only the finite Resend-ready result.

After expiry, use the same bearer exactly once and require sanitized HTTP 404 before the SMTP handler. Remove all three temporary project rows and the fixed live credential, then prove both absent. The candidate remains unaliased and its retained verifier window is expired.

## Compensation and evidence

There is no retry and no second deployment. On any non-target result, remove only newly owned Sprint 029S provider and configuration resources after exact ownership proof. An unaliased candidate may remain inert. Do not claim clean fallback unless cleanup and five-alias safety are complete.

Safe evidence contains only fixed classes, booleans, counts, approved configuration names, safe opaque resource identifiers, hashes and Ready or alias totals. It must prove zero public-enquiry calls, email or notification attempts, mailbox or log inspection, data or migration changes, and alias changes. Public enquiry remains unavailable after either target success or clean fallback.
