# Sprint 036O Requirements - Provider Authority and Trainer-Path Discovery

## Outcome

Establish a current, executable, read-only authority manifest for the exact live provider boundary and prove which of the seven retained credential classes can reach the accepted Sprint 036L trainer/Auth journey.

Target outcome: `trainer-path-provider-authority-manifest-complete-clean`.

Permitted fallback: `provider-authority-discovery-blocked-clean`.

This sprint is discovery and readback only. It does not rotate a credential, create a deployment, move an alias, change an environment binding, disposition an identity, contact a trainer, or claim launch readiness.

## Why This Sprint Exists

Sprints 036K, 036M, and 036N proved strong local safety contracts but did not establish executable provider-native inventory, lifecycle, or predecessor-oracle authority. Sprint 036O narrows the problem before any further live attempt: it must replace guessed provider shapes with current official contracts and sanitized read-only evidence, and it must separate trainer-path blockers from unrelated retained classes.

## Exact Credential Classes

The manifest covers exactly:

1. `SUPABASE_SERVICE_ROLE_KEY`
2. `CRON_SECRET`
3. `ENQUIRY_ABUSE_HMAC_SECRET`
4. `PUBLIC_ENQUIRY_SMTP_PASS`
5. `STRIPE_SECRET_KEY`
6. `STRIPE_WEBHOOK_SECRET`
7. `RAILWAY_API_TOKEN`

Unknown, public, OIDC, historical, provider-wide, and raw-value classes are refused.

## Read-Only Authority Scope

Builder may perform bounded authenticated read-only discovery against the exact existing Vercel, Supabase, Resend, Stripe, and Railway authorities after local privacy and projection tests pass.

Permitted facts are limited to:

- exact provider/account/team/project identity as opaque or approved aliases
- IDs, names, types, targets, status classes, page/cursor counts, and ownership relationships that are non-secret and necessary to reconcile authority
- Vercel project, deployment, alias, environment-variable metadata, Cron, integration, and webhook metadata without decrypting values
- Supabase project API-key metadata with `reveal=false`, Edge Function metadata, and exact read-only SQL catalog projections for database webhooks, `pg_net`, and `pg_cron`
- Resend API-key and domain metadata without key values and without sending email
- Stripe account/mode and webhook-endpoint metadata without payment, event, delivery, activation, or secret retrieval
- Railway token-type classification and account/workspace/project/service/environment/job/integration metadata through read-only GraphQL
- current official lifecycle and predecessor-oracle availability for each class

Every provider call must be exact-scope, finite, projected before durable output, and incapable of mutation. Missing pagination, an unknown response field that affects authority, wrong account/project, ambiguous ownership, or protected output lands the clean fallback.

## Source and Reachability Authority

- Bind the source manifest to accepted Sprint 036L Git object `bfeb0b23c339b819f5dbcd4fe28d61c7a4dd9570`.
- Inspect the Git object directly; never copy from or deploy the dirty worktree.
- Derive direct and transitive consumers for all seven classes, including Next.js server/client boundaries, internal routes, `vercel.json`, Supabase functions/migrations, and provider callbacks represented in source.
- Reconcile source consumers with provider-native metadata.
- For every class, record a falsifiable trainer-path result: `required`, `not-reachable-proven`, or `unknown-blocking`.
- `not-reachable-proven` requires both source-graph exclusion and provider-native absence from Auth, callback, portal, routing, session, trainer, and accepted-live deployment paths. Repository inspection or Vercel absence alone is insufficient.
- Any `unknown-blocking` class continues to block a trainer flight.

## Capability Matrix

For every class, record exactly:

- authoritative provider/account/project
- current consumer inventory and pagination status
- trainer-path reachability disposition
- documented replacement create/select mechanism
- documented install targets
- harmless intended-use authentication/readback mechanism
- predecessor revoke/delete/deactivate mechanism
- independent predecessor absence or rejection oracle
- coupling and refusal conditions
- whether a protected manual UI step would be required
- whether a later mutation sprint is executable, blocked, or needs one named owner action

Documented capability is not permission to execute it in 036O.

## Privacy and Protected Access

- Never request or paste protected values in chat.
- Never use reveal/decrypt endpoints or persist raw provider responses.
- Protected access, if needed, occurs in one visible non-transcribed interactive window after local gates pass.
- Credentials may enter only masked process memory and a bounded child pipe; never argv, environment, clipboard, temp files, repository files, evidence, stdout, or stderr.
- Durable evidence contains only provider/class aliases, finite codes, booleans, counts, approved non-secret IDs, Brisbane timestamps, capability dispositions, and zero-action totals.
- Exact captured-value taint and protected-pattern scans must reject reflection before output.

## Mutation Boundary

All mutation ceilings are zero:

- provider create/update/delete/revoke/deactivate calls: `0`
- Vercel environment, deployment, alias, domain, integration, or webhook writes: `0`
- Supabase key, Auth, session, database, Storage, function, Cron, or configuration writes: `0`
- Resend email/key/domain writes: `0`
- Stripe payment/key/webhook writes or events: `0`
- Railway writes: `0`
- identity, trainer, OTP, message, verification, graph, Product, schema, migration, RLS, role, permission, dependency, lockfile, commit, push, and PR actions: `0`

A read-only endpoint that cannot be proved non-mutating is refused.

## File Boundary

Builder plan must stay within these 12 implementation/evidence files before review:

1. `scripts/provider-authority-discovery-036O.mjs`
2. `scripts/provider-authority-projections-036O.mjs`
3. `scripts/Invoke-ProviderAuthorityDiscovery036O.ps1`
4. `scripts/test-provider-authority-discovery-036O.mjs`
5. `scripts/test-provider-authority-projections-036O.mjs`
6. `scripts/test-provider-authority-transport-036O.mjs`
7. `docs/PROVIDER_AUTHORITY_AND_TRAINER_PATH_036O.md`
8. `evidence/professional-engineering/036O-provider-authority-and-trainer-path-discovery/external-ledger.json`
9. `evidence/professional-engineering/036O-provider-authority-and-trainer-path-discovery/evidence.md`
10. `evidence/professional-engineering/036O-provider-authority-and-trainer-path-discovery/SPRINT-036O-REPORT.md`
11. `package.json`
12. `scripts/run-validation-suite.mjs`

After a different fresh final inspector returns PASS on implementation/evidence, synchronize exactly these 16 closeout files and no substitutes:

1. `planning/ARCHITECT_BRIEFING.md`
2. `planning/DECISIONS.md`
3. `planning/DEFERRED_SCOPE_AND_OWNERSHIP.md`
4. `planning/DEFINITION_OF_DONE.md`
5. `planning/DOMAIN.md`
6. `planning/EVIDENCE_INDEX.md`
7. `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`
8. `planning/QUESTIONS.md`
9. `planning/RISKS.md`
10. `planning/ROADMAP.md`
11. `planning/SPRINT_LIFECYCLE_LEDGER.md`
12. `planning/SPRINT_SCHEDULE.md`
13. `planning/STATE.md`
14. `planning/STATUS.json`
15. `planning/reviews/036O-provider-authority-and-trainer-path-discovery.md`
16. `delivery_road_map.md`

No Product file is authorized. Any user-requested commit or push occurs only after the sprint landing and final readback, outside 036O acceptance and its zero-publication boundary.

## Evidence-Proportional Execution

Stop only for material target, authority, security, privacy, destructive, integrity, production, scope, or cleanup risk. Substitute equivalent or stronger safe evidence when a preferred supporting tool is unavailable. Keep in-scope harness, credential-access, validator, formatting, encoding, reporter, and deterministic corrections in 036O. Do not create another suffix solely because an optional CLI, browser driver, connector, or redundant check is unavailable. Use manual intervention only after safe in-scope alternatives are exhausted.

## Manual Intervention

If read-only provider access genuinely requires an operator:

1. record the unavailable API, connector, CLI, or signed-in-session mechanism and the safe alternatives checked;
2. name the exact provider surface and read-only action;
3. provide numbered instructions that never include a protected value;
4. keep the operator in the protected window and output only the sanitized projection;
5. independently verify scope, page exhaustion, and zero mutations afterward.

Operator attestation or a screenshot alone never passes a provider fact.
