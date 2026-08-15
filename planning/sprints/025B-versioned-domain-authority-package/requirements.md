# Sprint 025B Requirements — Versioned Domain Authority Package

## Outcome

Produce one complete, versioned, human-readable authority package for the Precision Performance biochemistry workflow. The package must distinguish established software facts from health-adjacent decisions, attribute every accepted decision to named accountable reviewers and leave every incomplete authority slice explicitly unavailable.

This sprint packages authority only. It does not activate classifications, trainer guidance or recommendations in Product. Sprint 025C remains the separate runtime activation and proof sprint after this package is accepted.

## Workflow profile

Strict. The package controls health-adjacent score meaning, trainer-facing language and action guidance. Strict means named authority, exact provenance, complete boundaries and fail-closed handling; it does not mean inventing content or repeating irrelevant tooling checks.

## Flight class

`critical`. Although this sprint changes docs/planning only, a falsely complete or corrupted authority package could later activate unsafe health-adjacent classifications or trainer guidance. The flight therefore requires a fresh review of the exact Builder plan before edits and a different fresh inspection before closeout.

## Canonical and working-tree boundary

Builder must work only in:

`C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`

At start, record:

- resolved current working directory;
- `git rev-parse --show-toplevel`;
- current branch and HEAD;
- staged-file count; and
- the pre-existing dirty-path manifest.

Both resolved paths must equal the canonical path. Preserve every pre-existing change. Do not use, copy from, repair or synchronize a legacy checkout or `C:\tmp` worktree. Do not stage, commit, push or open a PR.

## Required baseline reading

Read and reconcile:

- `AGENTS.md`;
- `templates/method/120x-agent-identity.md`;
- `planning/STATE.md`;
- `planning/DECISIONS.md`;
- `planning/DOMAIN.md`;
- `planning/RISKS.md`;
- `planning/QUESTIONS.md`;
- `docs/WORKFLOW_PROFILE.md`;
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`;
- `planning/ARCHITECT_BRIEFING.md`;
- `delivery_road_map.md`;
- `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`;
- `docs/SPRINT_025_BIOCHEMISTRY_DOMAIN_AUTHORITY.md`;
- `planning/reviews/025-four-reading-biochemistry-authority-closeout.md`;
- the applied Sprint 025 files;
- `docs/BIOCHEMISTRY_DATA_MODEL_013.md`;
- `docs/BIOCHEMISTRY_SCORING_014.md`;
- `docs/BIOCHEMISTRY_RECOMMENDATIONS_015.md`;
- `docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md`;
- `docs/BIOCHEMISTRY_WORKFLOW_022.md`;
- `references/client-docs/PNR and RJR EPP Working Information/Reading Tables v1.csv`; and
- relevant client source documents as candidate evidence only.

Client documents, spreadsheets, code, fixtures, prior wording and undocumented practice are not approval by themselves. Do not expose identifiable horse/person data, proprietary formulas or confidential worksheet content in chat, screenshots or public evidence.

## Verified starting truth

Sprint 025 closed `four-reading-structured-operation-proven-authority-partial-clean`:

- five raw measurements produce four exact lookup inputs;
- `Reading Tables v1.csv` version `v1`, six-decimal normalization, pH averaging and conductivity `1.43` conversion compatibility are the established software contract;
- Hydration Score and internal `healthScore` formulas are structurally active under `biochemistry-score-v1`;
- internal `healthScore` remains a persisted compatibility name;
- production Green/Amber/Red thresholds, final score language, measurement/device authority, Table of Knowledge content, veterinary escalation wording and named human approval remain unavailable; and
- Sprint 015 thresholds and recommendations are synthetic fixtures, never production authority.

Builder must verify this truth against the repository before drafting the package. Any material conflict returns to Architect review.

## Required authority package

Create `docs/SPRINT_025B_VERSIONED_DOMAIN_AUTHORITY_PACKAGE.md`. It must be understandable without reading source code and contain all sections below.

### 1. Package identity and governance

Record:

- stable package ID and version;
- status: `owner-input-required`, `under-review` or `accepted`;
- effective date when accepted;
- supersedes/superseded-by relationships;
- named Aprec8 product/domain decision owner, role and dated decision;
- named veterinary reviewer, professional role and dated decision;
- exact source document names, versions and effective dates;
- scope of each reviewer’s decision; and
- change-control rule requiring a new version for later changes.

Do not record an approval that was not actually given. A job title, organisation name, old document or chat inference is not a named-person decision.

### 2. Five-measurement and device contract

For each raw measurement—carbohydrate, pH saliva, pH urine, raw conductivity and urea—record:

- trainer-facing name;
- instrument/device applicability, including make/model or bounded device class where relevant;
- raw unit and any converted unit wording;
- input precision and display precision;
- permitted step;
- permitted operational range and the authority for that range;
- calibration or preparation rule;
- invalid/out-of-range handling; and
- source/version.

Record pH-average calculation and rounding explicitly. Resolve whether the conductivity `1.43` multiplier applies to every supported input or only a named instrument/device configuration. Compatibility in existing code is not sufficient device authority.

### 3. Formula and score-name contract

For Hydration Score and internal `healthScore`, record:

- exact formula in words and mathematical notation;
- inputs and weights;
- score domain;
- normalization/rounding and display precision;
- exact lookup versus interpolation behavior;
- formula ID/version and lookup source/version;
- final trainer-facing label for internal `healthScore`; and
- explicit preservation of the internal persisted key unless a later migration sprint is separately planned.

The named reviewers must explicitly accept the formula contract even where it matches the existing structural implementation.

### 4. Complete classification contract

For each score, supply one complete Green/Amber/Red set with:

- exact lower and upper bounds;
- inclusive/exclusive semantics at every boundary;
- complete coverage of the accepted score domain with no gap or overlap;
- trainer-facing status label;
- short contextual explanation;
- source/version and effective date; and
- named reviewer attribution.

Colour must never carry meaning alone. Do not infer thresholds or explanations from Sprint 015 fixtures, screenshots, marketing copy or historical examples.

### 5. Table of Knowledge contract

For every accepted rule, record:

- stable rule ID;
- category and Level 1–5 value where used;
- exact input/score/zone trigger;
- complete trainer-facing wording;
- whether it is an informational prompt, trainer-review item or veterinary-review item;
- source document, source version and effective date;
- reviewer attribution;
- disclaimer/escalation wording required with the rule;
- active/inactive status; and
- supersession relationship.

Triggers must be deterministic and expressible from approved Product data. Do not create diagnosis, prognosis, treatment instructions, supplement doses, prescribed water volumes, performance guarantees or claims that the Product replaces veterinary judgement.

### 6. Safety, disclaimer and escalation contract

Record the exact approved language for:

- informational/non-diagnostic status;
- trainer observation and veterinary-care relationship;
- unavailable or incomplete results;
- when trainer review is expected;
- when veterinary review is expected; and
- claims that remain prohibited.

Escalation triggers and wording require the named veterinary reviewer. Generic safe-design language may remain a boundary but must not be represented as an approved clinical rule.

### 7. Acceptance and supersession record

End the package with a decision matrix in which every required row is one of:

- `accepted` with named reviewer, date and source/version;
- `not accepted` with reason; or
- `owner input required` with the exact missing decision.

The package status may be `accepted` only when every authority slice required by Sprint 025C is accepted and there are no placeholders, ambiguous ranges, unsigned decisions or unresolved reviewer conflicts.

## Owner-input checkpoint

If complete authority is not already present, Builder must still make safe progress:

1. Prefill established software facts and exact repository citations.
2. Mark every missing decision with the literal text `OWNER INPUT REQUIRED`.
3. Produce a compact reviewer checklist grouped into product/domain and veterinary decisions.
4. Record the exact source documents reviewed and why they do or do not establish approval.
5. Stop at `versioned-domain-authority-package-owner-input-required-clean` without changing Product or activating any rule.

The checkpoint must include these plain-English user steps:

1. Name the Aprec8 product/domain decision owner and the veterinary reviewer.
2. Give both reviewers the same package version and the cited source documents, using a private channel for any confidential material.
3. Complete every `OWNER INPUT REQUIRED` item; do not leave verbal assumptions or ranges such as “about” or “normal”.
4. Have the product/domain owner approve device rules, formulas, trainer terminology and Product wording.
5. Have the veterinary reviewer approve health-adjacent thresholds, meanings, recommendation wording, disclaimers and escalation rules.
6. Record each reviewer’s typed name, role, decision date, package version and exact accepted sections.
7. Return the completed package in the canonical workspace or attach it in the task without credentials, identifiable horse data or confidential raw worksheets.
8. Builder will then reconcile the returned version, check completeness/conflicts and report whether 025C is unblocked.

## Approved files

Builder may change only:

- `docs/SPRINT_025B_VERSIONED_DOMAIN_AUTHORITY_PACKAGE.md`;
- `docs/SPRINT_025_BIOCHEMISTRY_DOMAIN_AUTHORITY.md` only to add an accurate version/supersession pointer;
- `planning/reviews/025B-versioned-domain-authority-package.md`;
- the generated Sprint 025B files;
- `planning/STATE.md`;
- `planning/STATUS.json`;
- `planning/DECISIONS.md`;
- `planning/RISKS.md`;
- `planning/QUESTIONS.md`;
- `planning/EVIDENCE_INDEX.md`;
- `planning/ARCHITECT_BRIEFING.md`;
- `planning/ROADMAP.md`;
- `planning/SPRINT_SCHEDULE.md`;
- `planning/SPRINT_LIFECYCLE_LEDGER.md`;
- `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`; and
- `delivery_road_map.md`.

No file under `app/`, `components/`, `lib/`, `scripts/`, `supabase/`, `references/fixtures/` or package configuration is in scope.

## Explicitly out of scope

- Product/runtime classification, labels, recommendations or UI activation.
- Source, test, schema, migration, fixture or package changes.
- Editing the client’s source documents or raw worksheets.
- Inventing or selecting health, veterinary, biological, device or treatment rules.
- Production data, real horse/person records or private case histories.
- Credentials, keys, passwords, tokens or private configuration.
- Supabase, Vercel, provider, environment, domain, alias or deployment changes.
- Public enquiry work, email, enquiries, mailbox access or external submission.
- Upload/provider/voice work.
- Staging, commit, push, merge or PR.

## Evidence and closeout

Builder must:

- record a before/after path manifest and prove pre-existing changes were preserved;
- review every authority row for a named reviewer, date, source/version and unambiguous value;
- scan changed files for credentials and identifiable horse/person data;
- run `npm run validate:json` and `npm run validate:static` if those commands remain applicable to planning/docs-only changes;
- run `node scripts/test-biochemistry-authority-025.mjs` as a retained structural regression without modifying it;
- run `git diff --check`;
- keep the index empty; and
- reconcile state, status, roadmap, schedule, ledger, risks, questions, evidence and briefing.

The Final Product Acceptance Matrix may change only when the accepted package directly supplies the missing authority for a row. Do not mark runtime behavior passed in 025B; runtime activation and proof remain Sprint 025C.

## Acceptable outcomes

`versioned-domain-authority-package-accepted-clean` when the full package has named, dated product/domain and veterinary decisions, exact sources/versions, no unresolved required row and no Product activation.

`versioned-domain-authority-package-owner-input-required-clean` when the complete prefilled package and reviewer checklist exist but one or more decisions still require named owner review. This outcome does not unblock Sprint 025C.
