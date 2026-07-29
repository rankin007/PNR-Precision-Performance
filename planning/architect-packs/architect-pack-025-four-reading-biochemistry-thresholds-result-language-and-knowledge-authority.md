============================================================
FILE: planning/sprints/025-four-reading-biochemistry-thresholds-result-language-and-knowledge-authority/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/025-four-reading-biochemistry-thresholds-result-language-and-knowledge-authority/blueprint.md
============================================================

# Sprint 025 Blueprint

## Delivery sequence

### Phase 1 — Reconcile the existing contract

1. Verify the clean baseline and inspect the current capture, scoring, zone and recommendation paths.
2. Map five raw measurements to four lookup inputs and two score outputs.
3. Identify all fixture-only or provisional values and ensure none are active in runtime production behavior.
4. Record the accepted provider/upload and voice deferrals; leave their implementation dormant and fail closed.

### Phase 2 — Create the authority record

1. Create `docs/SPRINT_025_BIOCHEMISTRY_DOMAIN_AUTHORITY.md` as the canonical contract.
2. Use numbered Question and Answer entries with a recommendation, accepted answer/status, rationale and source/version where applicable.
3. Include tables for measurement rules, formulas, thresholds, result labels, recommendation rules, disclaimer/review rules and change control.
4. Separate accepted production authority from proposals and unresolved items visually and structurally.
5. Do not infer approval from old fixtures, code, marketing language or undocumented practice.

### Phase 3 — Encode accepted authority

1. Prefer version-controlled data structures consumed by the existing `lib/domain/biochemistry.ts` interfaces.
2. Keep formula, threshold and recommendation versions independently traceable.
3. Validate active threshold sets before classification:
   - one Green, Amber and Red interval per activated score;
   - finite ordered bounds;
   - no overlap;
   - no unintended gap;
   - explicit inclusive/exclusive boundary semantics;
   - complete coverage of the accepted score domain.
4. Validate active recommendations:
   - stable unique rule ID;
   - approved score kind, zone, category and level;
   - non-empty approved content;
   - source/version/effective metadata;
   - explicit review or escalation classification;
   - no active conflicting replacement.
5. Keep unavailable states for any authority slice that is incomplete.
6. Integrate approved display labels and contextual text without changing internal persisted key names.

### Phase 4 — Verify the structured operational path

Use synthetic cases only. Prove:

- the five raw measurements map deterministically to the four lookup inputs;
- pH average and conductivity conversion agree with the accepted contract;
- exact lookup remains exact unless the accepted decision explicitly authorizes interpolation;
- score calculations and rounding are deterministic;
- every activated zone boundary classifies correctly;
- missing/incomplete authority blocks rather than guesses;
- recommendation snapshots retain their original version and wording;
- status uses label, value and context in addition to colour;
- wording is informational, non-diagnostic and does not replace trainer or veterinary judgement.

### Phase 5 — Close proportionately

1. Run focused and maintained validation appropriate to the changed files.
2. Review the complete diff and approved-path manifest.
3. Record activated and unavailable authority separately.
4. Record whether any additive migration candidate exists and confirm it was not applied remotely.
5. Leave the index clean and work unstaged/uncommitted unless the user separately instructs staging or commit.

## Preferred implementation shape

- `docs/SPRINT_025_BIOCHEMISTRY_DOMAIN_AUTHORITY.md`: canonical accepted contract.
- A versioned source-controlled authority module or JSON document for accepted thresholds and rules, if approved values exist.
- Narrow additions to `lib/domain/biochemistry.ts` only where existing contracts cannot enforce the accepted authority.
- Focused synthetic tests for mapping, boundaries, versioning, unavailable states and wording.
- Minimal result UI changes required to consume accepted labels/rules.

## Architectural boundaries

This sprint crosses the existing production-threshold and Table of Knowledge gates only for content explicitly accepted in the canonical contract. It does not cross upload, provider, voice, stakeholder-access, public-site, deployment or production-data gates.

============================================================
FILE: planning/sprints/025-four-reading-biochemistry-thresholds-result-language-and-knowledge-authority/acceptance.md
============================================================

# Sprint 025 Acceptance Criteria

## Baseline and scope

- [ ] Builder used a clean isolated baseline containing the accepted four-reading workflow and recorded the exact commit.
- [ ] The changed-file manifest contains only approved Sprint 025 paths.
- [ ] The accepted PDF/image/CSV/provider and voice deferrals are recorded; those capabilities remain disabled or fail closed.
- [ ] No provider account, purchase, credential, remote mutation, deployment, push, merge or PR occurred.

## Measurement and formula authority

- [ ] The canonical record clearly distinguishes five raw measurements from four scoring lookup inputs.
- [ ] Every raw measurement has an accepted or explicitly unresolved name, unit, precision, step and permitted range.
- [ ] pH-average and conductivity-conversion rules are recorded with rounding and applicability.
- [ ] Exact lookup/interpolation policy is explicit.
- [ ] Hydration Score and internal `healthScore` formulas, precision and source versions are traceable.
- [ ] Internal `healthScore` compatibility is preserved unless an expressly approved migration/compatibility plan exists.

## Threshold authority

- [ ] Each activated score has exactly one complete Green/Amber/Red threshold set.
- [ ] Bounds, inclusivity and score-domain coverage are explicit.
- [ ] Active sets have no gap, overlap, inversion or non-finite value.
- [ ] Exact boundary and adjacent-value tests pass.
- [ ] Missing, incomplete or invalid threshold authority remains blocked/unavailable.
- [ ] Fixture-only thresholds are not activated.

## Result language and knowledge authority

- [ ] Trainer-facing score names and status labels are explicitly accepted and versioned.
- [ ] Colour is accompanied by label, numerical value and explanatory context.
- [ ] Every activated recommendation has an approved category, level, trigger, wording, source, version and review/escalation class.
- [ ] No Builder-invented biological threshold, diagnosis, treatment, supplement dose, water prescription or guarantee appears.
- [ ] Missing or conflicting recommendation authority remains unavailable.
- [ ] Supersession and historical snapshots prevent silent reinterpretation of prior results.
- [ ] Disclaimer and trainer/veterinary review language are accepted and present where required.

## Operational proof

- [ ] Synthetic tests prove the five-raw-to-four-lookup mapping.
- [ ] Existing scoring, recommendation, capture and workflow regressions pass.
- [ ] Invalid, missing, out-of-range and exact-lookup-miss cases fail safely.
- [ ] Maintained JSON, static, TypeScript and lint checks pass.
- [ ] A production build passes, or an equivalent/stronger safe build proof is recorded under the Evidence-Proportional Execution Standard.
- [ ] `git diff --check` passes.
- [ ] Secret, personal-information and generated-artifact scans report no prohibited content.

## Durable closeout

- [ ] `planning/STATE.md`, `planning/STATUS.json`, `planning/DECISIONS.md`, `planning/RISKS.md`, `planning/QUESTIONS.md`, `planning/EVIDENCE_INDEX.md` and `planning/ARCHITECT_BRIEFING.md` agree.
- [ ] Closeout distinguishes activated authority from unresolved/unavailable authority.
- [ ] Any additive migration candidate is justified, hashed, locally validated and confirmed remotely unapplied.
- [ ] Work remains unstaged and uncommitted unless separately instructed.

## Acceptable outcomes

`four-reading-domain-authority-encoded-clean` when all authority required for activated operational results is accepted, encoded and locally proven.

`four-reading-structured-operation-proven-authority-partial-clean` when the structured reading/scoring path is proven but one or more production threshold or recommendation slices remain deliberately unavailable because domain authority was not supplied. This is a valid bounded outcome and must not block later non-dependent product work.

============================================================
FILE: planning/sprints/025-four-reading-biochemistry-thresholds-result-language-and-knowledge-authority/handoff-prompt.md
============================================================

# Builder Handoff — Sprint 025

Apply this sprint in a new isolated worktree based on the latest clean Sprint 023/022-compatible product lineage. Do not use or modify the dirty original `develop` worktree.

Start by reconciling the exact baseline, existing five raw measurements, four lookup inputs, formulas, source/version metadata, provisional labels, fixture-only thresholds and unavailable recommendation behavior. Record the accepted deferral of PDF/image/CSV/provider work and voice input. Do not implement or configure those deferred capabilities.

Create the canonical Sprint 025 Question-and-Answer authority contract. Recommend existing safe contract choices where possible, but never invent biological thresholds, clinical interpretations or trainer advice. Encode only explicitly accepted authority. For any incomplete authority slice, preserve the current blocked/unavailable result and continue all other in-scope work.

Prove the structured operational path with synthetic tests: five raw measurements to four lookup inputs, derived readings, exact lookup, score formulas, every activated threshold boundary, safe failure states, recommendation versioning and historical snapshots. Keep internal `healthScore` compatibility unless the accepted contract expressly supplies a migration and compatibility plan.

Follow the Evidence-Proportional Execution Standard. Stop only for material target, authority, security, privacy, migration, destructive, integrity, production, scope or cleanup risk. Substitute equivalent or stronger safe proof when a preferred supporting tool is unavailable. Keep deterministic tooling, harness, validator, formatting, encoding and reporter corrections inside this sprint. Do not create another sprint solely for Docker, browser automation, rendering, schema-dump or optional CLI limitations. Use manual intervention only after safe in-scope alternatives are exhausted, and then record all five required intervention elements.

Do not access or mutate Production, apply a remote migration, purchase/configure a provider, deploy, push, merge or open a PR. Do not stage or commit unless separately instructed.

At closeout, report the exact activated authority, unavailable authority, validation evidence, changed-file manifest, migration status if any, and whether the result is `four-reading-domain-authority-encoded-clean` or `four-reading-structured-operation-proven-authority-partial-clean`.
