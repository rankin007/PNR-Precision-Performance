# Sprint 028 — Stable Dashboard And Horse Workspace

## Outcome

Deliver one dependable authenticated workspace that helps an authorised stable user answer four operational questions without scanning disconnected screens:

1. Which horses need attention?
2. What changed?
3. What is incomplete?
4. What action comes next?

The stable dashboard must provide a concise, permission-aware overview. Each horse workspace must bring together the horse's operational context, current and historical biochemistry results, approved recommendations, evidence, trends and safe action entry points already supported by the completed product lineage.

This is an operational organisation sprint, not a clinical-priority engine. The product must not invent urgency, diagnosis, treatment, performance prediction or biological meaning.

## Workflow profile

Strict. The UI work is ordinary product work, but the feature aggregates authenticated multi-user horse data and introduces attention, incomplete-record, change-summary and next-action derivations. Strict controls apply to permissions, protected data, aggregation correctness, source authority and remote-state boundaries.

## Baseline and source of truth

Builder must start by identifying the trustworthy integrated candidate produced by Sprint 027B and verifying its exact ancestry, worktree, branch, closeout outcome and clean/dirty state. The intended prerequisite outcome is `completed-product-lineage-reconciled-combined-proof-clean`. Do not infer that the current `develop` worktree is that candidate, and do not overwrite or absorb unrelated dirty work.

If 027B did not reach that outcome, or its source identity materially differs from its recorded manifest, stop with `integrated-baseline-unavailable-clean`. Do not recreate Sprints 025–027 by guesswork inside Sprint 028.

Read and preserve:

- `AGENTS.md`
- `planning/STATE.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/PROJECT_SPRINT_LIST_2026-07-21.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/ARCHITECT_BRIEFING.md`
- Sprint 027B requirements, manifest, overlap matrix, proof, closeout and lineage document
- completed Sprint 025, 026 and 027 sprint artifacts and maintained proof
- `docs/WORKFLOW_PROFILE.md`
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- `docs/AUTH_RLS_PORTAL_ACCESS.md`
- `docs/BIOCHEMISTRY_WORKFLOW_022.md`
- applicable scoring, recommendation, evidence, voice/fallback, history and trend authority records
- existing `/portal`, horse, report, result and data-entry routes and their server-side data access contracts

The older schedule text that assigns this outcome to Sprint 023 or describes Sprint 028 as stakeholder access is stale for this handoff. This Pack establishes `028 — Stable Dashboard And Horse Workspace`. Builder must reconcile current planning records to this exact identifier and title at closeout without rewriting historical artifacts.

## Required product contract

### 1. Authority and derivation matrix

Before implementing attention or summary behaviour, create a durable Sprint 028 decision record that maps every displayed item to:

- its source record and query;
- the roles/permissions allowed to see it;
- its exact derivation and time basis;
- its label, explanation and destination action;
- its empty, unavailable, stale and error behaviour;
- its governing Sprint 025–027 authority/version where applicable.

The record must classify each proposed rule as `approved`, `unavailable`, or `out-of-scope`. Historical UI text, fixture values, colour, recommendation content and developer intuition are not authority.

### 2. Stable dashboard

Implement a stable-level overview within existing authenticated portal boundaries. It must:

- show only horses the current user is already authorised to access;
- provide a calm, scan-friendly horse list or grouped overview with horse identity, last relevant activity, approved current status/context, incomplete items and the next permitted action;
- distinguish attention, incomplete, changed, unavailable, empty and error states in text, not colour alone;
- make the basis and time window of every derived indicator understandable;
- provide direct, permission-aware navigation to the relevant horse workspace or existing action;
- avoid leaking counts, names, status or activity for inaccessible horses or stables;
- avoid unbounded client-side fetching, N+1 query growth or loading all protected history merely to compute summaries.

Attention ordering may use only approved, deterministic non-clinical rules. If attention authority is incomplete, show a neutral operational overview and explicit unavailable treatment rather than ranking horses by guessed severity.

### 3. Horse workspace

Create or strengthen the canonical horse workspace so an authorised user can understand and act without moving through unrelated shells. It must provide, where already supported and permitted:

- horse identity and operational context;
- latest completed result with approved label, value, explanation and authority/version context;
- historical results and trend/saved-view entry points from the completed lineage;
- evidence/attachment state from the completed lineage, including blocked or unavailable treatment;
- typed/device-dictation note context without adding microphone, recording, audio storage or transcription;
- incomplete workflow state and safe next permitted action;
- links to existing capture, review, correction or evidence actions only when the current permission contract allows them.

Do not duplicate domain logic in React components. Reuse or introduce narrow typed selectors/view models whose derivations can be tested independently.

### 4. Operational derivations

Define exact, testable contracts for:

- `attention`: a non-clinical operational review signal with an explicit reason and source;
- `incomplete`: a known workflow requirement missing from a record whose completion contract is already approved;
- `changed`: an explicit comparison between compatible, version-aware snapshots over a stated interval;
- `next action`: the highest-priority action already permitted by the current user's role and the record state.

Derivations must be deterministic, permission-neutral in their domain semantics, and presentation-safe. They must not:

- compare incompatible authority versions without an explicit compatible treatment;
- reinterpret historical snapshots under current rules;
- convert missing or failed data into Green/normal/complete;
- treat absence of a test as a clinical problem;
- infer urgency from age, sex, stable, trainer, owner, free text or attachment content;
- expose an action the user cannot perform;
- create a new permission, RLS, aggregation or recommendation contract implicitly.

### 5. Responsive and accessible product UI

Apply the accepted portal design direction from `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`:

- utilitarian authenticated surfaces using the established racing-green/midnight-navy/data/status palette and typography;
- status colour always accompanied by label, value/context and, where useful, an icon;
- keyboard-operable navigation and actions, logical headings, meaningful landmarks and visible focus;
- usable phone, tablet and desktop layouts without horizontal page overflow;
- progressive disclosure: overview first, focused detail second, no wall of simultaneous charts;
- loading, empty, unavailable, stale, permission-denied and failure states that do not collapse into one another;
- safe, informational language that supports trainer judgement and professional veterinary care without replacing either.

## Approved implementation scope

Builder may change only files directly necessary for:

- authenticated `/portal` stable-dashboard and horse-workspace routes;
- narrow reusable portal/horse/status/navigation components;
- existing server-side authorised horse/result/evidence/history queries or typed read models needed for bounded aggregation;
- deterministic non-clinical derivation modules approved in the Sprint 028 decision record;
- focused synthetic fixtures and tests;
- maintained validation registration where required;
- Sprint 028 documentation, evidence and standard planning closeout files.

An additive database migration, new RPC, new table/view, RLS policy change or permission change is not approved. If existing authorised queries cannot meet correctness or bounded-performance acceptance without one, document the exact need and close `data-contract-expansion-required-clean`.

## Explicitly out of scope

- New or changed roles, permissions, memberships, stable/horse assignment rules, RLS policies or stakeholder-access workflows.
- Clinical triage, diagnosis, treatment, supplement or veterinary instructions, race-readiness claims, predictions or automated urgency.
- New thresholds, scoring formulas, recommendation content or internal rename of `healthScore`.
- New trend formulas, saved-view semantics, evidence lifecycle, upload/storage behaviour, microphone/audio/transcription behaviour or provider integration.
- New schema, migration, RPC, materialized view, database function or remote query infrastructure.
- Public website, pricing, commerce, onboarding, SEO/indexing or public claims.
- Real identifiable horse/stable data in fixtures, logs, screenshots or evidence.
- Remote migration application, production data access/mutation, Supabase/Vercel/provider mutation, deployment, alias/domain changes, staging, commit, push, merge or PR.

## Safety and execution standard

Builder follows the Evidence-Proportional Execution Standard in `AGENTS.md`:

- stop only for material baseline/target, authority, security, privacy, migration, destructive, integrity, production, scope or cleanup risk;
- substitute equivalent or stronger safe evidence when a preferred supporting tool is unavailable;
- keep in-scope tooling, harness, credential, validator, formatting, encoding, reporter and deterministic corrections in this sprint;
- do not create a follow-up sprint solely because Docker, browser automation, a renderer, clipboard control, schema dump, optional CLI path or redundant verifier is unavailable;
- use manual intervention only after safe in-scope alternatives are exhausted.

When manual intervention is genuinely required, record what is blocked, evidence checked, exact user action, step-by-step instructions and what Builder will verify afterward. Never request or reproduce secrets or real private horse/stable information.
