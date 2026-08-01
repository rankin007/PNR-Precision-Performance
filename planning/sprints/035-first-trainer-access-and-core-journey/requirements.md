# Sprint 035 — First Trainer Access And Core Journey

## Outcome

Prove on one exact non-production Preview candidate that one product-owner-designated human trainer can safely sign in, see only the assigned synthetic horse and stable, open the horse workspace, follow one existing permitted biochemistry action, return to the dashboard, sign out, and sign in again.

This is the first human trainer acceptance outcome on the reconciled product lineage. Existing 035-series Packs and generated artifacts are non-authoritative historical inputs. The target outcome is `first-trainer-access-and-core-journey-complete-clean`.

## Workflow profile

Strict at the authentication, private participant, synthetic data, hosted Preview, permission, external mutation and cleanup boundaries. Ordinary UI and deterministic test corrections remain narrow and proportional. This four-file sprint set is the sole Sprint 035 authority after Pack application.

## Starting authority

Start only from clean branch `codex/034-reconciled-product-baseline` at exact local and remote-backed SHA `ea8417d3c7450f25c90644f23d8558c9f5938552`. Verify this identity before any product or external action. Read:

- `AGENTS.md` and `templates/method/120x-agent-identity.md`;
- the Sprint 034 state, status, briefing, lifecycle ledger, reconciliation review and roadmap;
- `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md` and `planning/DEFERRED_SCOPE_AND_OWNERSHIP.md`;
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`, `docs/AUTH_RLS_PORTAL_ACCESS.md`, `docs/BIOCHEMISTRY_WORKFLOW_022.md` and `docs/OPERATIONS_HANDOFF.md`;
- accepted Sprint 021AH and 022/022B evidence; and
- current sign-in, portal, horse workspace, permission, biochemistry, validation and Preview surfaces on the exact baseline.

Do not use the dirty `develop` root, an earlier release branch, an older 035 candidate, an unproven 035I lineage, or file recency as authority. Sprint 032 remains the accepted public release, but Sprint 035 does not authorize production deployment.

## Product contract

1. Preserve the existing approved-account passwordless sign-in model unless an in-scope defect prevents the journey. Do not add self-registration, passwords, social login, authentication bypass, mailbox automation or secret transfer.
2. Present a calm, mobile-first trainer dashboard at `/portal`. Only existing authorised server-side contracts may determine visible horses, stable context, workflow state, timestamps and actions.
3. Show explicit empty, incomplete, pending, completed, unavailable, denied and failed states only where supported by the accepted contract. Missing or inaccessible data must never default to normal, Green, complete or actionable.
4. Use neutral operational ordering and language. Do not imply clinical urgency, diagnosis, treatment, supplementation, race readiness or performance prediction.
5. The horse workspace must preserve identity and stable context, show the latest supported workflow/result context, expose one existing permitted next action, provide a clear return to the dashboard and deny wrong-horse/cross-stable access without leaking existence or state.
6. Sign-out and repeat sign-in must preserve the same bounded permission outcome.
7. Reuse existing schema, migrations, RLS, roles, membership, assignment and biochemistry contracts. If the journey requires a material contract change, stop cleanly rather than inventing it.

## Human Preview acceptance

Use exactly one designated trainer representative and clearly synthetic, non-identifying fixtures. The participant privately controls their mailbox and enters authentication material themselves. Never request, inspect, record or commit their email address, code, link, mailbox content, cookies, tokens or other protected values.

The product owner must privately designate the trainer and authorise any required account/fixture creation. Builder may prepare a sanitized task script and evidence template. Human acceptance records only task result, route, supported viewport class, timestamp, synthetic labels and material UX findings.

Use an exact-source, alias-free non-production Preview. Read current target/configuration before mutation, add only the minimum scoped Preview callback or fixture state if required, preserve production Site URL, aliases, DNS, providers and data, and remove exact Sprint-owned temporary state after acceptance unless retention is expressly authorised.

Allow at most two diagnosed, cooldown-safe human attempts. After a failure, diagnose once with sanitized evidence, make an in-scope correction, revalidate/redeploy, and make at most one further attempt. Do not retry blindly.

## Approved files and actions

Builder may:

- create a scoped `codex/035-first-trainer-access-and-core-journey` branch/worktree from the exact 034 SHA;
- change only the sign-in, `/portal`, horse workspace, narrow shared UI, existing authorised read composition and sign-out surfaces required by the journey;
- add focused pure derivations, synthetic fixtures, tests, Preview harness/configuration and sanitized evidence;
- make deterministic validator, reporter, formatting, encoding and harness corrections inside the outcome;
- create and later clean exact synthetic Preview account/application records through existing contracts with private product-owner coordination;
- deploy an exact-source alias-free Preview, commit intentionally and push only the scoped branch when required for Preview; and
- update Sprint 035 review evidence and canonical planning closeout files.

## Explicitly out of scope

- Production deployment, production aliases/domains, DNS, production provider/data mutation, merging or pushing `develop`, PR creation or public reopening.
- New schema, migration, RPC, RLS, role, permission, membership, assignment or persisted data contract.
- New formulas, thresholds, result labels, recommendations, clinical ranking or domain guidance.
- Upload/evidence lifecycle, voice, OCR, audio/transcription, trends/charts, sophisticated saved views, commerce, enquiry delivery, pricing or broad public work.
- Broad onboarding, multiple participant cohorts, real horse/stable/customer data, support operations or a Core Product Done claim.

## Evidence-proportional execution and manual intervention

Stop only for material baseline/target ambiguity, secret or protected-data exposure, participant ambiguity, destructive uncertainty, unauthorised scope expansion, auth/RLS/privacy/integrity failure, contract expansion, unexpected real data, production impact, partial external mutation or cleanup that cannot be proven safe.

Substitute equivalent or stronger safe evidence when a preferred supporting tool is unavailable. Keep in-scope tooling, harness, credential-refresh, validator, formatting, encoding, reporter and deterministic corrections in Sprint 035. Do not create a follow-up solely because Docker, browser automation, a renderer, clipboard control, schema dump, optional CLI path or redundant verifier is unavailable.

Manual intervention is the last safe option. When genuinely required, record what is blocked, evidence checked, exact private user action, step-by-step instructions and what Builder will verify afterward. Never ask the user to paste protected values.
