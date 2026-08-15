# Sprint 036N Requirements - Native Consumer and Credential Readback Recovery

## Outcome

Close the provider-native consumer and predecessor-readback gap left by Sprint 036M without involving a trainer, excluded identities, or the retained synthetic graph.

Target outcome: `native-consumer-and-credential-closure-complete-clean`.

Permitted truthful fallbacks:

- `native-closure-blocked-clean`
- `native-closure-compensated-clean`
- `native-closure-blocked-material`

No fallback may be described as launch readiness, trainer readiness, Product Done, or completion of the remaining identity and real-delivery obligations.

## Scope

Sprint 036N owns:

1. A complete, paginated, provider-native inventory of current and still-addressable consumers that may retain predecessor credentials.
2. Exact primary and rollback deployment preparation from the accepted Sprint 036L source, with current Production compatibility proved before any irreversible predecessor action.
3. Native lifecycle and independent predecessor rejection or absence proof for exactly these seven classes:
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `CRON_SECRET`
   - `ENQUIRY_ABUSE_HMAC_SECRET`
   - `PUBLIC_ENQUIRY_SMTP_PASS`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `RAILWAY_API_TOKEN`
4. Exact-ID retirement or protection of predecessor-bearing Vercel deployments after both primary and rollback replacements are verified.
5. Sanitized, append-only evidence and a truthful target or fallback landing.

Sprint 036N does not own:

- trainer contact, OTP delivery, verification, phone observation, or access acceptance
- the two excluded identity dispositions
- trainer or prior synthetic graph creation, cleanup, or retirement
- Product behavior changes, schema or migrations, RLS, roles, permissions, DNS, email policy, commerce, enquiry behavior, dependencies, or lockfile changes
- publication to Git or any broad provider/account cleanup

## Provider Authority

- Use current official provider APIs, CLIs, or signed-in provider UI only for an exact action that has no API/CLI equivalent.
- A UI operation must still be followed by an independent provider-native readback or predecessor rejection probe. Operator confirmation or a screenshot alone never passes.
- Inventory calls must be finite, paginated to exhaustion, exact-account/project scoped, and projected before durable output.
- Raw secrets, tokens, key material, private provider rows, customer data, and full provider error bodies must never enter chat, argv, evidence, logs, repository files, or command output.
- Unavailable or ambiguous provider capability produces `blocked-retained`; it does not authorize a guessed or manual success attestation.

## Deployment and Consumer Closure

- Preserve accepted Sprint 036L behavior until a primary and a rollback deployment from its exact accepted source are both Ready and current-key compatible.
- Enumerate every current and still-addressable Vercel deployment, alias, Cron target, repository consumer, Edge Function, database webhook, `pg_net` target, integration, and externally configured callback or job relevant to the seven classes.
- A generic page response is not a credential-discrimination proof.
- Each predecessor-bearing deployment must be either exact-ID deleted after primary and rollback replacements pass or protected by provider-native proof that it cannot consume or accept the predecessor.
- Unknown pagination, ownership, source, project, target, or credential binding blocks before mutation.
- At most two exact-source deployments may be created: one primary and one rollback.
- The fixed five aliases may move once to the primary, with one bounded compensation move back before an irreversible predecessor action.
- DNS changes, dirty-tree deployment, redeploy of an unknown deployment, and automatic source substitution are forbidden.

## Credential Class Contract

Each class receives exactly one terminal disposition:

- `rotated-and-verified`
- `revoked-not-required`
- `confirmed-inactive-or-absent`
- `blocked-retained`

For `rotated-and-verified`, evidence must prove exact authority and consumers, replacement ownership/install/probe, a pre-call irreversible latch, independent predecessor absence or rejection, and replacement acceptance.

For `revoked-not-required`, provider-native exact predecessor revocation/absence and fail-closed runtime behavior are required. Vercel absence or source inspection alone is insufficient.

For `confirmed-inactive-or-absent`, provider-native inventory must prove the class is absent or inactive in the exact authority boundary and no current consumer requires it.

For `blocked-retained`, no irreversible action is permitted and the exact reason must be recorded without protected values.

## Class-Specific Boundaries

- Supabase service-role: modern secret-key lifecycle is separate from JWT signing and legacy anon/service-role deactivation. Public anon, user JWT, signing-key, and session rotation are forbidden.
- Cron and enquiry HMAC: every current and addressable old route/job consumer must be enumerated; any predecessor-capable old consumer blocks.
- SMTP: no email send. Provider key lifecycle and an authentication-only/no-send probe are required.
- Stripe secret and webhook secret: commerce remains disabled; no payment, checkout, refund, webhook event, endpoint activation, or delivery. Use provider lifecycle/readback only.
- Railway: exact account/project/token ownership and a harmless authenticated metadata probe are required; repository presence or Vercel absence never proves revocation.

## Transaction and Compensation

- Every external mutation has a pre-call latch, exact ceiling, sanitized result, and independent readback.
- Before the first irreversible predecessor attempt, a failure restores the fixed aliases and current compatible bindings, removes exact-owned replacement deployments, and removes only exact-owned replacement credentials.
- After an irreversible predecessor attempt, never restore or reuse the predecessor. Perform readback only and land accepted, blocked-material, or another exact permitted state.
- A mutate-then-throw, timeout, ambiguous response, incomplete pagination, or readback failure is unsafe until independent readback resolves it.
- Exact-ID deletion allowlists must exclude the new primary, new rollback, current aliased deployment, foreign project/team deployments, and unknown ownership.

## Privacy and Evidence

Durable evidence may contain only class names, provider/project aliases, finite status codes, counts, booleans, exact non-sensitive deployment IDs where approved, Brisbane timestamps, dispositions, mutation ceilings, and residue counts.

Evidence must prove zero raw protected output, exact action and compensation counts, provider-native predecessor rejection or absence per successful class, primary and rollback source/readiness/current-key compatibility, exact disposition for predecessor-bearing deployments, and zero unauthorized mutation/residue or an exact material residue ledger.

## Verification

- Add discriminating focused tests for pagination omission, wrong project/team, source mismatch, automatic aliasing, predecessor-bearing deployment survival, mutate-then-throw, timeout, ambiguous readback, invalid compensation, and every class-specific false-positive success path.
- Retain the full Sprint 036M counted proof unless the reviewed Builder plan truthfully revises its arithmetic.
- Run JSON, maintained-text/static, typecheck, zero-warning lint, production build, privacy, exact-scope, lockfile, migration-authority, staged, conflict, external mutation, and residue gates.
- A fresh same-Architect critical plan review is required before implementation.
- A fresh same-Architect implementation/evidence diff review is required before closeout.

## Manual Intervention

Manual provider UI use is allowed only where the exact provider has no API/CLI lifecycle action. Before requesting it, Builder must record the unavailable mechanism and equivalent checks attempted. Instructions must name the exact provider surface and action without placing protected values in chat. Builder then independently verifies the result through provider-native readback or authentication rejection.
