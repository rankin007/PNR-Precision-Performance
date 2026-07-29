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
