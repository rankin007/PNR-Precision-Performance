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

## Governance and unresolved duties

- Privacy owner must define data-subject request, retention/deletion, breach notification and evidence-upload procedures before those capabilities are operationally accepted.
- Platform owner owns provider-account recovery, MFA, credential rotation and least-privilege access; secrets stay in provider secret stores.
- Content/business owner approves public claims, pricing and onboarding; domain/veterinary owner approves formulas, thresholds, terminology, knowledge content and disclaimers. Every change requires versioned source authority, review and regression proof before release.
- Vercel release rollback is verified. Supabase/database and private-storage backup/restore policy and restore rehearsal remain unproven and require platform/privacy ownership.

## Prohibited assumptions

Do not assume commerce, enquiry transmission, clinical scores/recommendations, audio/transcription, full upload lifecycle, real-device timing, trends/favorites or product-wide Done. The public release is valid but narrower than the canonical product target. See `planning/DEFERRED_SCOPE_AND_OWNERSHIP.md`.
