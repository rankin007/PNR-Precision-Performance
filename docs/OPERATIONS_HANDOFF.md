# Operations Handoff

Date: 2026-07-30. Owner names are intentionally left as roles until durably assigned.

## Production identity

- URLs: `https://precisionperformance.com.au`, `https://www.precisionperformance.com.au`, `https://pnr-precision-performance.vercel.app`.
- Vercel project `pnr-precision-performance`; deployment `dpl_fPWqinnfL4YZJq41MQPaXhhuh7hi`; release branch `codex/032-public-relaunch-production`; SHA `f7242ee0785ae9b87022394206c89ebdd5c9f6ad`.
- Ready rollback target: `dpl_6F1TMjNRECmTCyMbyWXA6ohG8Q2R`. Database rollback is not part of this procedure.

## Monitoring

Operations owner daily checks `/`, `/pricing`, `/disclaimer`, one hero asset, `/api/health`, and anonymous `/admin`/`/portal` redirection. Weekly checks compare canonical URL, robots exclusions, sitemap public-only routes, all three aliases, Vercel Ready state and recent error signals. After releases, provider incidents or support reports, repeat the full set with a cache-busting query and capture timestamp, URL, status, deployment ID and privacy-safe screenshot/log excerpt.

## Severity and triage

- **P0:** suspected disclosure, cross-stable access, credential exposure or destructive integrity loss. Stop access/activity, preserve minimal evidence, notify security/privacy and platform owners immediately; do not copy protected data into tickets.
- **P1:** public outage, broken sign-in/protected-route boundary, materially incorrect public claims, or release-wide regression. Verify aliases and deployment; decide rollback promptly.
- **P2:** degraded route/asset or bounded workflow failure with safe fallback. Reproduce, record scope, assign product/platform owner.
- **P3:** cosmetic/documentation issue. Record and schedule normally.

Evidence must use synthetic identifiers or redaction. Never place credentials, tokens, clinical records, customer uploads or personal contact data in ordinary tickets/chat.

## Rollback

Rollback is appropriate for a release-caused P0/P1 regression when the prior deployment is known safe and the incident is not caused by shared provider/database state. An authorized release/platform owner selects the existing project and promotes/rolls back to `dpl_6F1TMjNRECmTCyMbyWXA6ohG8Q2R` through Vercel. Do not alter DNS, environment values, Supabase or Stripe as part of this outline. Afterwards verify the three aliases, public routes/assets, canonical/robots/sitemap, health, anonymous protected redirects, disabled checkout/webhook posture and Ready status; record the resulting deployment identity. Escalate separately if database/security state is implicated.

## Support and access

Support owner records route, time, browser/device, expected/actual behavior, reproducibility and a redacted artifact; classifies severity; and escalates access/security/privacy cases without requesting raw protected data. Product owner owns workflow defects; platform owner owns hosting/build/provider incidents; security/privacy owners own access or data concerns.

User onboarding/offboarding and membership/horse assignment must use existing admin and role contracts. The authorized access owner verifies requester authority, applies least privilege, records the change, and confirms revoked users no longer access protected routes. No manual database bypass or RLS weakening is permitted.

### Sprint 035K bounded trainer pilot procedure

Sprint 035K uses one privately designated human tester and an obvious synthetic fixture. The tester's address, OTP, mailbox content, credentials, tokens, session material and private identifiers must remain outside chat, commands, logs, URLs, screenshots and durable evidence. Mailbox automation and inspection are prohibited.

The governed operator entrypoint is `scripts/Invoke-LiveTrainerAccess035K.ps1` from a private interactive console with transcription disabled. It exact-matches an adopted tester through hidden email plus exact Auth-ID input and never enumerates unrelated Auth users. If no exact ID is available it may attempt one exact confirmed creation, but a duplicate response without an exact ID fails closed. It refuses the prohibited old Supabase project, uses the existing trainer membership and `horse.records.write` contracts, and maintains a temporary exact-ownership ledger. It may create only the bounded synthetic pilot graph documented in the authentication runbook.

Human acceptance must pass first on an exact-source, alias-free Preview and then on the exact promoted production candidate. Record only task booleans, routes, timestamps, viewport and the approved synthetic labels. A failed first attempt is diagnosed once through sanitized classifications; only one further cooldown-safe attempt is allowed.

At completion, retain the graph only when the operator privately types the exact sanitized retention sentence into the protected helper. Arguments, environment values and inference are refused. Otherwise verify every exact row against its ledger ownership fields, clean application dependencies, prove each surface independently reaches zero, and delete Auth last only when Sprint 035K created it. Preserve the ledger on any mismatch or partial deletion. Preserve adopted pre-existing Auth and all unrelated identities and data.

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

The permanent canonical repository is `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`. Its standalone Git metadata registers exactly that one worktree. Separate Git metadata under the legacy OneDrive repository owns the legacy root and 27 linked `C:\tmp` worktrees; those 28 registrations do not confer canonical authority. Seventeen additional inventoried legacy directories are unregistered.

Do not remove, force-remove, prune, recycle, move or delete a legacy worktree, directory, metadata record, lock or branch. The 64 verified-safe files are preserved at the approved non-Git destination with 64/64 SHA-256 equality; this safe archive must never receive protected material.

Protected material is separately preserved under the operator-attested encrypted vault root `E:\05_Software\Aprec8PP-034D-Containment`. The accepted `C`/`R`/`H` set passes 29,897/29,897 source-copy and copy-restore byte equality plus two-ref private-history recovery; no protected hash or value is recorded in canonical evidence. Browser profiles remained dormant and were never launched. Four non-browser directory reparse nodes were not followed; zero browser reparse nodes were skipped. Retain the accepted set, its private manifest and the unaccepted path-length-limited first attempt until successful post-retirement verification. Do not initialise a Git repository, share/sync the vault, or delete vault material without separate approval.

Exact containment results and the final non-destructive retirement manifest are in `planning/reviews/034D-stage-2-containment-preservation-and-disposition-plan.md`.

Sprint 035Q is a safe, live-remote-backed alternate lineage, not accepted canonical product history. Do not merge, cherry-pick, rebase, replay or adopt it without a later Architect decision. Private containment and restore proof are complete; Stage 2 still requires separate approval of the exact target-by-target manifest.
