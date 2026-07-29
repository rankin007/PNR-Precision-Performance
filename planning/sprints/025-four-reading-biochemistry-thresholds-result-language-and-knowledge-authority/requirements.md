# Sprint 025 — Four-Reading Biochemistry Thresholds, Result Language And Knowledge Authority

## Outcome

Establish versioned, reviewable authority for the four scoring inputs used by the biochemistry process, then encode only the accepted rules needed to produce safe operational results from structured readings. The sprint must preserve blocked/unavailable behavior wherever authority remains incomplete.

## Workflow profile

Strict. This sprint controls health-adjacent result classifications and trainer-facing knowledge content. Strict means strong authority, traceability and fail-closed behavior, not repetitive tooling ceremony.

## Baseline and source of truth

Builder must begin from a clean isolated worktree whose ancestry includes commit `6f8543020e126a4620f09be017744dcc75061e6e` and the completed Sprint 022 four-reading capture/scoring foundation. Before editing, reconcile the actual selected baseline and record it.

Read and preserve:

- `AGENTS.md`
- `planning/STATE.md`
- `planning/DECISIONS.md`
- `planning/RISKS.md`
- `planning/QUESTIONS.md`
- `planning/PROJECT_SPRINT_LIST_2026-07-21.md`
- `docs/WORKFLOW_PROFILE.md`
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`
- `docs/BIOCHEMISTRY_DATA_MODEL_013.md`
- `docs/BIOCHEMISTRY_SCORING_014.md`
- `docs/BIOCHEMISTRY_RECOMMENDATIONS_015.md`
- `docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md`
- `docs/BIOCHEMISTRY_WORKFLOW_022.md`
- `lib/domain/biochemistry.ts`
- maintained scoring, recommendation and workflow validators and fixtures

The accepted product decision is:

> External evidence-file ingestion and safety-provider integration are deferred. PDF, image and CSV uploads remain disabled and fail closed. Voice input is also deferred. Development proceeds with structured biochemistry readings. Deferred evidence/provider work may return later as Sprint 023R.

Sprint 025 must not depend on completion of Sprint 023Q or Sprint 024.

## Four-input terminology

The established scoring engine has four lookup inputs:

1. Carbohydrate reading.
2. pH average, derived from pH saliva and pH urine.
3. Salts/conductivity value, derived from the raw conductivity meter value using the established conversion contract.
4. Urea reading.

The form therefore contains five raw measurements: carbohydrate, pH saliva, pH urine, raw conductivity and urea. Builder must describe this distinction clearly and must not silently remove or merge a raw measurement merely to call the workflow “four readings.”

## Required work

### 1. Baseline and authority reconciliation

- Confirm the existing formulas, exact-lookup behavior, source/version metadata, numeric normalization, conductivity multiplier and blocked states.
- Confirm that existing fixture-only thresholds and recommendation text are not production authority.
- Record the accepted upload/provider and voice deferrals without changing the dormant evidence implementation.
- Produce a concise authority matrix covering every value or statement needed for production classification and guidance.

### 2. Domain decision contract

Create one canonical, human-readable decision record. It must use Question and Answer format, provide recommendations where defensible, and distinguish accepted answers from unresolved items.

At minimum it must resolve or explicitly leave unavailable:

- names, units, display precision and permitted input ranges for all five raw measurements;
- pH saliva and urine calibration/step rules and pH-average rounding;
- conductivity device applicability, raw unit, `1.43` conversion applicability and converted-unit wording;
- exact-lookup versus interpolation policy;
- Hydration Score and internal `healthScore` formulas and display precision;
- trainer-facing name for internal `healthScore` without internally renaming persisted contracts;
- complete, non-overlapping Green/Amber/Red boundaries for each activated score;
- inclusivity at every boundary and behavior outside the score domain;
- status labels and explanatory text that accompany colour;
- approved recommendation categories, levels, wording, triggers, source and version;
- whether recommendations are informational prompts, trainer-review items or veterinary-review items;
- disclaimers, escalation wording, activation, supersession and change control;
- the named decision owner, role, effective date and source/version identifiers.

Recommendations may be proposed from existing project contracts, but Builder must not invent biological thresholds, clinical interpretations, treatment instructions, supplement doses, water volumes or veterinary advice.

### 3. Versioned implementation

Once the decision contract contains complete accepted authority for a behavior, implement that behavior narrowly through existing domain contracts.

- Preserve the existing four-lookup scoring formulas unless the accepted contract explicitly changes them.
- Preserve internal `healthScore` compatibility; use an accepted display-only label unless a separate migration/compatibility plan is expressly supplied.
- Encode threshold and recommendation records with stable identifiers, source document, source version and effective version.
- Reject overlapping, gapped, inverted, non-finite or incomplete active threshold sets.
- Preserve historical snapshot semantics so a later rule change cannot silently reinterpret a saved result.
- Keep any unapproved score zone or recommendation category unavailable.
- Ensure colour is always accompanied by text, value and context.
- Keep output informational and non-diagnostic.

If complete threshold or recommendation authority is not supplied, Builder must still complete all safe in-scope work: produce the decision record, validate the existing structured-reading path, preserve unavailable behavior and close with a precise authority-pending classification. Missing domain authority is not permission to insert fixture values.

### 4. Proof and closeout

- Add deterministic boundary tests for every activated threshold set.
- Test exact lower/upper boundaries, immediately adjacent representable values, gaps, overlaps, invalid ranges and missing authority.
- Test the four lookup inputs and the five-raw-measurement mapping.
- Test exact-lookup failure and unavailable result behavior.
- Test recommendation activation, missing content, superseded content, snapshots and safe wording.
- Run focused Sprint 014, 015, 018 and 022 regressions plus maintained JSON, static, TypeScript, lint and production-build checks proportionate to changed surfaces.
- Refresh durable state, decisions, risks, questions, evidence index and Architect briefing.

## Approved implementation scope

Builder may change only files directly necessary for:

- biochemistry domain types, scoring/classification and recommendation logic;
- structured biochemistry capture/result presentation;
- version-controlled domain authority data and synthetic fixtures;
- focused tests and maintained validators that must understand the approved Sprint 025 contract;
- Sprint 025 documentation, decision records and standard planning closeout files.

An additive migration is permitted only if existing persisted snapshot fields cannot represent the accepted versioned contract safely. Builder must first prove that necessity. Any migration must be the next exact ledger entry, additive, locally validated, remotely unapplied and separately identified in closeout.

## Explicitly out of scope

- OPSWAT, Cloudmersive or any safety-provider selection, purchase, account, API, secret or integration.
- PDF, image, CSV or arbitrary file uploads; CSV remains disabled even when structured CSV templates are discussed.
- Voice recording or transcription.
- OCR, laboratory or device integration.
- Production data, remote migration application, Supabase/Vercel mutation, deployment, Production configuration, domain/alias movement, push, merge or PR.
- New clinical claims, diagnosis, treatment prescriptions or guarantees.
- Broad dashboard, trends, saved views, stakeholder access or public-site work.
- Internal rename of `healthScore` without an explicit migration and compatibility plan.

## Safety and execution standard

Builder follows the Evidence-Proportional Execution Standard in `AGENTS.md`:

- stop only for material target, authority, security, privacy, migration, destructive, integrity, production, scope or cleanup risk;
- substitute equivalent or stronger safe evidence when a preferred supporting tool is unavailable;
- keep in-scope tooling, harness, credential, validator, formatting, encoding, reporter and deterministic corrections in this sprint;
- do not create a follow-up sprint solely because Docker, browser automation, a renderer, clipboard control, a schema dump, optional CLI path or redundant verifier is unavailable;
- use manual intervention only after safe in-scope alternatives are exhausted.

When manual intervention is genuinely required, record what is blocked, evidence checked, exact user action, step-by-step instructions and what Builder will verify afterward.
