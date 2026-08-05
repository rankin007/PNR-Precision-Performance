# Operations Handoff

Date: 2026-08-04. Owner names are intentionally left as roles until durably assigned.

## Production identity

- Five stable aliases: `https://precisionperformance.com.au`, `https://www.precisionperformance.com.au`, `https://pnr-precision-performance.vercel.app`, `https://pnr-precision-performance-rankin007s-projects.vercel.app`, `https://pnr-precision-performance-rankin007-rankin007s-projects.vercel.app`.
- Vercel project `pnr-precision-performance`; current known-safe deployment `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`; exact source `3be6b6c3622150a3c2009ed8564795b14e3e6c2b`. All five aliases independently resolved to it after Sprint 036 rollback.
- Unaccepted Sprint 036 candidate `dpl_EmfhgcYxjNHk4W9LwH6ruTfASZmf` is Ready but must not receive a stable alias without new exact release authority. Database rollback is not part of this procedure.

## Monitoring

Operations owner daily checks `/`, `/pricing`, `/disclaimer`, one hero asset, `/api/health`, and anonymous `/admin`/`/portal` redirection. Weekly checks compare canonical URL, robots exclusions, sitemap public-only routes, all five aliases, Vercel Ready state and recent error signals. After releases, provider incidents or support reports, repeat the full set with a cache-busting query and capture timestamp, URL, status, deployment ID and privacy-safe screenshot/log excerpt.

## Severity and triage

- **P0:** suspected disclosure, cross-stable access, credential exposure or destructive integrity loss. Stop access/activity, preserve minimal evidence, notify security/privacy and platform owners immediately; do not copy protected data into tickets.
- **P1:** public outage, broken sign-in/protected-route boundary, materially incorrect public claims, or release-wide regression. Verify aliases and deployment; decide rollback promptly.
- **P2:** degraded route/asset or bounded workflow failure with safe fallback. Reproduce, record scope, assign product/platform owner.
- **P3:** cosmetic/documentation issue. Record and schedule normally.

Evidence must use synthetic identifiers or redaction. Never place credentials, tokens, clinical records, customer uploads or personal contact data in ordinary tickets/chat.

## Rollback

Rollback is appropriate for a release-caused P0/P1 regression when the prior deployment is known safe and the incident is not caused by shared provider/database state. Until a later accepted release supersedes it, the known-safe exact target is `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`. An authorized release/platform owner assigns all five recorded aliases to that deployment through Vercel as one bounded transaction. Do not alter DNS, environment values, Supabase or Stripe as part of this outline. Afterwards independently resolve all five aliases, then verify public routes/assets, canonical/robots/sitemap, health, anonymous protected redirects, disabled checkout/webhook posture and Ready status; record the resulting deployment identity. Escalate separately if database/security state is implicated.

## Support and access

Support owner records route, time, browser/device, expected/actual behavior, reproducibility and a redacted artifact; classifies severity; and escalates access/security/privacy cases without requesting raw protected data. Product owner owns workflow defects; platform owner owns hosting/build/provider incidents; security/privacy owners own access or data concerns.

User onboarding/offboarding and membership/horse assignment must use existing admin and role contracts. The authorized access owner verifies requester authority, applies least privilege, records the change, and confirms revoked users no longer access protected routes. No manual database bypass or RLS weakening is permitted.

### Sprint 035K bounded trainer pilot procedure

Sprint 035K uses one privately designated human tester and an obvious synthetic fixture. The tester's address, OTP, mailbox content, credentials, tokens, session material and private identifiers must remain outside chat, commands, logs, URLs, screenshots and durable evidence. Mailbox automation and inspection are prohibited.

The governed operator entrypoint is `scripts/Invoke-LiveTrainerAccess035K.ps1` from a private interactive console with transcription disabled. It exact-matches an adopted tester through hidden email plus exact Auth-ID input and never enumerates unrelated Auth users. If no exact ID is available it may attempt one exact confirmed creation, but a duplicate response without an exact ID fails closed. It refuses the prohibited old Supabase project, uses the existing trainer membership and `horse.records.write` contracts, and maintains a temporary exact-ownership ledger. It may create only the bounded synthetic pilot graph documented in the authentication runbook.

Human acceptance must pass first on an exact-source, alias-free Preview and then on the exact promoted production candidate. Record only task booleans, routes, timestamps, viewport and the approved synthetic labels. A failed first attempt is diagnosed once through sanitized classifications; only one further cooldown-safe attempt is allowed.

At completion, retain the graph only when the operator privately types the exact sanitized retention sentence into the protected helper. Arguments, environment values and inference are refused. Otherwise verify every exact row against its ledger ownership fields, clean application dependencies, prove each surface independently reaches zero, and delete Auth last only when Sprint 035K created it. Preserve the ledger on any mismatch or partial deletion. Preserve adopted pre-existing Auth and all unrelated identities and data.

### Sprint 036 release-control boundary

Sprint 036 closed `production-promotion-rolled-back-clean`. The exact candidate was Ready, but its deployment inspection unexpectedly listed one stable alias despite an explicit no-auto-promotion deployment. Builder immediately restored all five aliases to the compatible rollback before any Production OTP or human trainer journey.

Vercel's deployment-level alias inventory continued to list the project alias after independent inspection proved the alias routed to rollback. Treat per-alias resolution as current routing authority; do not infer current routing from a deployment's alias list alone. Any new promotion requires a fresh exact Architect/Builder plan, independent five-alias pre/post resolution, immediate all-five rollback on discrepancy, and full human Production acceptance. No source, Supabase/Auth configuration, template, DNS, schema, permission, identity, fixture or data change is authorized by this handoff.

### Sprint 036B protected preflight boundary

Sprint 036B independently re-proved all five accepted aliases on Ready rollback and confirmed the explicit one-alias assignment mechanism can bound a future transition to exactly those five names. It stopped before candidate staging when the signed-in Supabase Authentication dashboard rendered protected identity fields into browser-control output during provider preflight.

Do not use an Authentication user-list surface for sanitized provider compatibility checks. A future corrective run requires an allowlisted protected mechanism that returns configuration booleans/counts only for the exact Site URL/callback, SMTP/template, six-digit OTP, expiry/cooldown and retained-pilot invariants. It must not enumerate or render Auth identities. Until such a run is separately planned and applied, retain the five-alias rollback and do not infer live trainer acceptance.

### Sprint 036F blocked lifecycle boundary

Sprint 036F closed `production-management-access-revocation-blocked`. The corrected wrapper and proportional validation passed, but the only authorized private Management lifecycle exited with sanitized code `3`. The operator then confirmed the exact 036F token row absent, no other token changed and no replacement token created. Local protected process-environment and temporary residue are zero.

Exact-row absence proves cleanup only. It does not prove the terminated process's required same-token `401`/`403` invalidation, successful provider projection or a clean Management lifecycle. No second lifecycle, retained-pilot Verify, Vercel inspection/deploy/alias action, OTP, mailbox/session journey or Production acceptance began. Keep all five stable aliases on the historically proven Ready rollback and do not retry, replace the token or continue downstream without a separate Architect Pack and explicit authority.

### Sprint 036G authentication-failed rollback boundary

Sprint 036G closed `production-trainer-authentication-failed-rollback-clean`. Exact retained-pilot preflight, unchanged-Product proof, existing candidate/rollback inspection, baseline, five explicit candidate alias assignments and canonical route safety passed. The first private journey used incorrect input. The one permitted fresh retry returned generic `retry-later` before code request or session, so no accepted Production trainer journey occurred.

Builder then assigned all five aliases to exact rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A` in fixed apex-outward order and independently reread all five after every assignment. Final five/five Ready rollback and canonical public/protected/API/disabled-commerce safety passed. Per-alias resolution remains routing authority. Do not retry sign-in, inspect a mailbox/provider identity surface, diagnose or change provider configuration, or re-cut over under 036G; any future action requires a separate Architect Pack with a genuinely distinct approach.

### Sprint 036H local diagnostic-ready boundary

Sprint 036H closed `privacy-safe-authentication-diagnostic-ready-local-clean`. It adds only a local five-category, code-first request diagnostic on the existing generic `retry-later` branch. The category is non-visible, allowlisted, ephemeral and cleared across flow transitions; public wording and missing-identity indistinguishability are unchanged.

The contract is prospective only. It cannot classify the historical 036G failure because no raw provider code or status was retained. It does not authorize another OTP request, mailbox/provider inspection, credential, hosted configuration change, deployment, alias movement or Production action. Operations must keep all five aliases on exact Ready rollback and treat the candidate as unaccepted unless a later separate Architect Pack grants a distinct, bounded attempt.

### Sprint 036I protected-preflight-blocked boundary

Sprint 036I closed `production-diagnostic-candidate-preflight-blocked-clean`. Exact branch activation and all local Product/privacy gates passed, and the protected wrapper SelfTest exited 0. The required exact-ID retained-pilot Verify then exited 2 without producing accepted `8/1/0/0` evidence. Its private in-console subcode was not retained in agent evidence, so the failure must not be narrowed or reinterpreted.

The owner directed closure without the remaining permitted Verify. No Vercel baseline, candidate deployment, alias assignment, OTP request, mailbox interaction or Production journey began, and no 036I candidate exists. Preserve the last authoritative five/five exact Ready rollback `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`. Do not rerun Verify, deploy, reassign an alias or request a code under 036I; any future action requires a separate Architect decision and exact Pack.

## Governance and unresolved duties

- Privacy owner must define data-subject request, retention/deletion, breach notification and evidence-upload procedures before those capabilities are operationally accepted.
- Platform owner owns provider-account recovery, MFA, credential rotation and least-privilege access; secrets stay in provider secret stores.
- Content/business owner approves public claims, pricing and onboarding; domain/veterinary owner approves formulas, thresholds, terminology, knowledge content and disclaimers. Every change requires versioned source authority, review and regression proof before release.
- Vercel release rollback is verified. Supabase/database and private-storage backup/restore policy and restore rehearsal remain unproven and require platform/privacy ownership.

## Prohibited assumptions

Do not assume commerce, enquiry transmission, clinical scores/recommendations, audio/transcription, full upload lifecycle, real-device timing, trends/favorites or product-wide Done. The public release is valid but narrower than the canonical product target. See `planning/DEFERRED_SCOPE_AND_OWNERSHIP.md`.

## Sprint 034C delivery/operator access boundary

The non-secret register at `docs/change password.md` governs delivery/operator authentication classes, ownership gaps, rotation triggers and recovery verification. It must never contain reusable authentication material or protected personal data.

Read-only inventory on 2026-08-03 established current repository administrator access, Vercel project read access through one team, public registrar/DNS continuity and an authenticated Supabase CLI profile. It did not prove GitHub MFA/recovery, Vercel inherited role/MFA/recovery, registrar-account ownership/recovery, or access to the documented production Supabase target. Those surfaces remain unchanged as `ambiguous-retain` where applicable.

Before any delivery/operator rotation or revocation, the platform owner must privately confirm the exact target, dependent workflows, retained/replacement operator and recovery path. Verify replacement access before revocation, reread the provider afterward and record only sanitized evidence. A shared control that governs trainer sign-in or application authentication is out of scope and must remain unchanged unless a later sprint proves isolation and separately authorizes the change.

## Sprint 034D containment and legacy-workspace boundary

The permanent canonical repository is `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`. Its standalone Git metadata registers exactly that one worktree. Sprint 034D retired the separately owned legacy root, 27 linked worktrees, 17 unregistered directories, two stale administration records and two protected local refs through the exact approved 49-row manifest. Do not recreate, register or adopt a retired legacy path without new explicit authority.

The 64 verified-safe files remain at the approved non-Git destination with 64/64 SHA-256 equality; this safe archive must never receive protected material. Protected material remains separately preserved under the operator-attested encrypted vault root `E:\05_Software\Aprec8PP-034D-Containment`. The accepted `C`/`R`/`H` set passes 29,897/29,897 source-copy and copy-restore byte equality plus two-ref private-history recovery; no protected hash or value is recorded in canonical evidence. Browser profiles remained dormant and were never launched.

Retain the safe archive, accepted vault set, its private manifest and the unaccepted path-length-limited first attempt until a separately approved retention or cleanup action. Do not restore outside the encrypted volume, initialise Git in the vault, share/sync the vault, or delete any recovery material by inference. Cleanup of the unaccepted attempt remains specifically withheld.

Exact containment, retirement and final reconciliation results are in `planning/reviews/034D-stage-2-containment-preservation-and-disposition-plan.md`. Sprint 035Q remains a safe, live-remote-backed alternate lineage, not accepted canonical product history. Do not merge, cherry-pick, rebase, replay or adopt it without a later Architect decision. The pre-existing divergent remote 029F branch is not the protected local 029F history preserved in the private bundle.
