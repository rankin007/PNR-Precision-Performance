# Sprint 035M — First Trainer Preview Access And Core Journey

## Outcome

Prove on one exact non-production Preview candidate that one product-owner-designated human trainer can safely sign in, see only the assigned synthetic horse and stable, open the horse workspace, follow one existing permitted biochemistry action, return to the dashboard, sign out, and sign in again.

Sprint 035M is the explicit follow-up authority for the roadmap's Sprint 035 outcome. It supersedes the existing unsuffixed replacement Pack and all earlier 035-series directions without treating any of them as implementation evidence. The target outcome is `first-trainer-preview-access-and-core-journey-complete-clean`.

## Workflow profile

Strict at authentication, participant privacy, synthetic data, hosted Preview, permission, external mutation and cleanup boundaries. Ordinary UI and deterministic test corrections remain narrow and proportional. This four-file sprint set is the sole 035M authority after Pack application.

## Starting authority

Start only from clean branch `codex/034-reconciled-product-baseline` at exact local and remote-backed SHA `ea8417d3c7450f25c90644f23d8558c9f5938552`. Verify identity before product or external action. Read `AGENTS.md`, the agent identity, Sprint 034 closeout authorities, the roadmap, final acceptance and ownership records, design and messaging authority, auth/RLS evidence, biochemistry workflow evidence, operations handoff, and current candidate source.

Do not use the dirty `develop` root, an older release branch, any prior 035 candidate, 035I lineage, 035J/035K production/provider assumptions, temporary deployment content, or file recency as authority. Sprint 032 remains the accepted public release; 035M does not authorize production deployment.

## Product contract

1. Preserve the existing approved-account passwordless sign-in model unless an in-scope defect prevents the journey. Do not add self-registration, passwords, social login, authentication bypass, mailbox automation, or secret transfer.
2. Present a calm mobile-first trainer dashboard at `/portal`. Only existing authorised server-side contracts may determine visible horses, stable context, workflow state, timestamps, and actions.
3. Missing or inaccessible data must never default to normal, Green, complete, or actionable. Distinguish supported empty, incomplete, pending, completed, unavailable, denied, revoked, and failed states.
4. Use neutral operational language. Do not imply clinical urgency, diagnosis, treatment, supplementation, race readiness, or performance prediction.
5. The horse workspace must preserve horse/stable orientation, show existing supported workflow context, expose one existing permitted action, return clearly to the dashboard, and deny wrong-horse/cross-stable access without leaking existence or state.
6. Sign-out and repeat sign-in must preserve the same bounded permission outcome.
7. Reuse existing schema, migrations, RLS, roles, membership, assignment, and biochemistry contracts. A material contract change requires a clean stop.

## Human Preview acceptance

Use exactly one designated trainer representative and clearly synthetic non-identifying fixtures. The participant privately controls their mailbox and enters authentication material themselves. Never request, inspect, record, transfer, or commit their email address, code, link, mailbox content, cookies, tokens, credentials, session material, or identifiers.

The product owner must privately designate the trainer and authorise any required account/fixture creation. Retain only sanitized task result, route, supported viewport class, timestamp, synthetic labels, and material UX findings.

Use an exact-source alias-free non-production Preview. Read current target/configuration before mutation; add only minimum scoped Preview callback or fixture state if required; preserve production Site URL, aliases, DNS, providers, public release, and data; and remove exact Sprint-owned temporary state after acceptance unless retention is expressly authorised.

Allow at most two diagnosed cooldown-safe human attempts. After a failure, diagnose once with sanitized evidence, make an in-scope correction, revalidate/redeploy, and make at most one further attempt. Do not retry blindly.

## Approved files and actions

Builder may create `codex/035M-first-trainer-preview-access-and-core-journey` from the exact 034 SHA; change only sign-in, `/portal`, horse workspace, narrow shared UI, existing authorised read composition, and sign-out surfaces required by the journey; add focused pure derivations, synthetic fixtures, tests, Preview harness/configuration, and sanitized evidence; correct deterministic validators/reporters/formatting/encoding/harnesses inside the outcome; create and clean exact synthetic Preview records through existing contracts with private product-owner coordination; deploy an exact-source alias-free Preview; commit intentionally and push only the scoped branch when Preview requires it; and update 035M review and canonical closeout records.

## Explicitly out of scope

- Production deployment, production aliases/domains, DNS, production provider/data mutation, merging or pushing `develop`, PR creation, or public reopening.
- New schema, migration, RPC, RLS, role, permission, membership, assignment, or persisted data contract.
- New formulas, thresholds, result labels, recommendations, clinical ranking, or domain guidance.
- Upload lifecycle, voice, OCR, transcription, trends/charts, advanced saved views, commerce, enquiry delivery, pricing, or broad public work.
- Broad onboarding, multiple participant cohorts, real horse/stable/customer data, support operations, or a Core Product Done claim.

## Evidence-proportional execution and manual intervention

Stop only for material baseline/target ambiguity, secret or protected-data exposure, participant ambiguity, destructive uncertainty, unauthorised scope expansion, auth/RLS/privacy/integrity failure, contract expansion, unexpected real data, production impact, partial external mutation, or cleanup that cannot be proven safe.

Substitute equivalent or stronger safe evidence when a preferred supporting tool is unavailable. Keep in-scope tooling, harness, credential-refresh, validator, formatting, encoding, reporter, and deterministic corrections in 035M. Do not create a follow-up solely because Docker, browser automation, a renderer, clipboard control, schema dump, optional CLI path, or redundant verifier is unavailable.

Manual intervention is last resort. Record what is blocked, evidence checked, exact private user action, step-by-step instructions, and what Builder will verify afterward. Never ask the user to paste protected values.
