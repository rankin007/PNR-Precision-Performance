============================================================
FILE: planning/sprints/025B-versioned-domain-authority-package/requirements.md
============================================================

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

============================================================
FILE: planning/sprints/025B-versioned-domain-authority-package/blueprint.md
============================================================

# Sprint 025B Blueprint — Versioned Domain Authority Package

## Delivery sequence

### Phase 1 — Reconcile the existing authority boundary

1. Verify canonical path, Git root, branch, HEAD, index and dirty manifest.
2. Compare the Sprint 025 authority record and closeout with current Product contracts and planning truth.
3. Inventory candidate client sources without treating them as approval.
4. Separate established software facts, proposed/candidate content and unresolved health-adjacent decisions.

## Flight evidence

1. **Class and reason:** `critical`; false attribution, ambiguous thresholds or accidental conversion of candidate content into accepted authority could silently corrupt later health-adjacent Product behavior.
2. **Acceptance invariant at risk:** no Sprint 025C authority dependency is accepted unless its exact value/wording, source/version, named reviewer, role and date are present; incomplete or conflicting slices remain `OWNER INPUT REQUIRED`, and Product/runtime remains unchanged.
3. **Affected layers and verified paths:** candidate client sources under `references/client-docs/` and the established structural contract in `docs/SPRINT_025_BIOCHEMISTRY_DOMAIN_AUTHORITY.md` are read-only origins; the Builder classifies facts versus candidate evidence in `docs/SPRINT_025B_VERSIONED_DOMAIN_AUTHORITY_PACKAGE.md`; planning review/closeout records carry the package status; Sprint 025C is the future and separate Product sink.
4. **Source of truth, transformations and sink:** versioned repository contracts establish current software behavior; named product/domain and veterinary decisions establish health-adjacent authority; 025B performs attribution, completeness and conflict classification only; the sink is a versioned accepted package or a fail-closed owner-input checkpoint, never runtime activation.
5. **Discriminating examples:** a threshold written as “Green from 0.70” without saying whether `0.70` is inclusive must remain unresolved because inclusive and exclusive implementations classify the same boundary differently; a blanket `1.43` conversion and a conversion limited to a named conductivity device produce different results for another device, so device applicability must be explicit; a complete-looking recommendation without the veterinary reviewer/date remains `OWNER INPUT REQUIRED` rather than accepted.
6. **Durable verification source:** canonical branch `codex/025B-versioned-domain-authority-package`, starting HEAD `d822c027c58ad88ec7472e35986e7a33d6a3d6c9`, current Git diff/status and the applied Sprint 025/Sprint 025B artifacts.
7. **Known uncertainty:** the repository does not currently contain named, dated product/domain and veterinary acceptance for all required measurement, threshold, language, recommendation, disclaimer and escalation rows. Builder must not resolve this uncertainty by inference.

### Phase 2 — Build the reviewable package

1. Create `docs/SPRINT_025B_VERSIONED_DOMAIN_AUTHORITY_PACKAGE.md`.
2. Prefill only facts directly supported by current versioned contracts.
3. Create exact tables for governance, measurements/devices, formulas, score naming, thresholds, Table of Knowledge rules, disclaimers, escalation and supersession.
4. Mark every missing decision `OWNER INPUT REQUIRED`.
5. Include source name, version, effective date and reviewer attribution on every accepted row.

### Phase 3 — Reconcile named review

1. Check that the product/domain owner and veterinary reviewer are named people with roles and dates.
2. Check that both reviewed the same package version.
3. Resolve or explicitly record every conflict; silence is not agreement.
4. Accept the package only when every Sprint 025C authority dependency is complete.
5. Otherwise stop at the clean owner-input checkpoint with the exact user instructions from requirements.

### Phase 4 — Prove the boundary

1. Confirm no Product, source, test, schema, fixture, package or client-source file changed.
2. Confirm no active rule is derived from fixtures or undocumented practice.
3. Confirm the package contains no credential or identifiable horse/person data.
4. Run the retained Sprint 025 structural test and proportionate planning/static checks.
5. Review the full diff and changed-path manifest.

### Phase 5 — Close truthfully

1. Record the exact package version and status.
2. Distinguish accepted authority from `OWNER INPUT REQUIRED` rows.
3. State whether Sprint 025C is unblocked; do not imply activation occurred.
4. Reconcile durable planning files and leave work unstaged/uncommitted.

## Package structure

The package should use this order:

1. Plain-English purpose and safety boundary.
2. Package identity, sources and reviewers.
3. Existing accepted structural facts.
4. Measurement/device decision table.
5. Formula and score-name decision table.
6. Hydration threshold and language table.
7. Internal `healthScore` threshold and trainer-language table.
8. Table of Knowledge rule table.
9. Disclaimer and escalation table.
10. Change control and supersession.
11. Final decision matrix.
12. Reviewer checklist and owner-input instructions when incomplete.

## Architecture trace

`025 established structural scoring` → `025B supplies named versioned authority` → `025C activates only accepted rules` → `035R/028B present and test visible workflow/trends`.

025B must not collapse these separate acceptance boundaries.

## Failure handling

| Condition | Required treatment |
| --- | --- |
| Named reviewer absent | Mark owner input required; do not accept package |
| Source version/effective date absent | Mark affected row owner input required |
| Threshold gap, overlap or ambiguous boundary | Reject affected set; do not choose a value |
| Product/domain and veterinary reviewers conflict | Record conflict; keep affected slice unavailable |
| Client document contains candidate values without named approval | Cite as candidate evidence only |
| Confidential or identifiable content encountered | Stop exposure, record sanitized fact and preserve source privately |
| Runtime/source change appears necessary | Stop and return to Architect; defer implementation to 025C |
| Supporting validator unavailable | Use equivalent safe review evidence under AGENTS.md and record substitution |

============================================================
FILE: planning/sprints/025B-versioned-domain-authority-package/acceptance.md
============================================================

# Sprint 025B Acceptance — Versioned Domain Authority Package

## Canonical and scope integrity

- [ ] Current directory and Git root both equal the canonical workspace.
- [ ] Branch, HEAD, index and pre-existing dirty manifest are recorded.
- [ ] Pre-existing changes are preserved and Sprint 025B changed paths are within the approved set.
- [ ] No legacy checkout or `C:\tmp` worktree was used as an implementation workspace.
- [ ] No staging, commit, push, merge or PR occurred.

## Package completeness

- [ ] `docs/SPRINT_025B_VERSIONED_DOMAIN_AUTHORITY_PACKAGE.md` exists and has a stable ID/version/status.
- [ ] Established software facts are distinguished from candidate evidence and owner decisions.
- [ ] Every accepted row has a named reviewer, role, date, source and source version.
- [ ] Every missing decision is marked exactly `OWNER INPUT REQUIRED`.
- [ ] The package records effective date, change control and supersession.

## Measurement, device and formula authority

- [ ] All five raw measurements have explicit names, device applicability, units, precision, step, range, calibration/preparation and invalid-input handling, or are marked owner input required.
- [ ] pH average, rounding and calibration semantics are explicit.
- [ ] Conductivity device applicability, raw/converted units and the `1.43` rule are explicit.
- [ ] Both score formulas, inputs, weights, domains, rounding, display precision, IDs and source versions are explicit.
- [ ] The final trainer-facing label for internal `healthScore` is explicit while the persisted key remains unchanged.

## Classification and language authority

- [ ] Each accepted score has one complete non-overlapping Green/Amber/Red set covering the approved domain.
- [ ] Every boundary has explicit inclusive/exclusive semantics.
- [ ] Every zone has text label, context, source/version and named reviewer attribution.
- [ ] No fixture value, marketing phrase or historical example is treated as approval.

## Table of Knowledge and safety authority

- [ ] Every accepted rule has stable ID, category, level, deterministic trigger, exact wording, review class, source/version, effective date, status and supersession.
- [ ] Disclaimer, trainer-review and veterinary-review wording is exact and attributed.
- [ ] No diagnosis, prognosis, treatment, dose, prescribed water volume, guarantee or replacement-of-veterinary-judgement claim was invented.
- [ ] Missing/conflicting rules remain unavailable.

## No activation boundary

- [ ] No file under `app/`, `components/`, `lib/`, `scripts/`, `supabase/`, `references/fixtures/` or package configuration changed for Sprint 025B.
- [ ] No Product classification, recommendation, label or UI was activated.
- [ ] Sprint 025C remains the separate activation/proof boundary.
- [ ] No credentials, Production/external mutation, deployment, alias movement, email or enquiry occurred.

## Validation and closeout

- [ ] Retained Sprint 025 structural authority test passes without modification.
- [ ] Applicable JSON/static checks pass or an equivalent safe substitute is documented.
- [ ] `git diff --check` passes.
- [ ] Changed-file credential and identifiable horse/person scans are clean.
- [ ] Planning state, status, roadmap, schedule, ledger, matrix, risks, questions, evidence and briefing agree.
- [ ] Index is empty and work remains uncommitted.

## Outcome record

- [ ] Exact outcome is one of the two defined below.
- [ ] Final report states the package version/status, accepted sections, unresolved rows and whether Sprint 025C is unblocked.
- [ ] If owner input is required, the final report gives the eight plain-English user steps and ends with the exact things required from the user.
- [ ] If owner input is not required, the final report ends: `I need nothing from you.`

### Outcome A

`versioned-domain-authority-package-accepted-clean`

Use only when every required authority row is accepted by named, dated product/domain and veterinary reviewers using the same package version. This unblocks Architect planning for Sprint 025C but does not claim runtime activation.

### Outcome B

`versioned-domain-authority-package-owner-input-required-clean`

Use when the prefilled package and reviewer checklist are complete but named decisions remain missing or conflicting. Product remains fail closed and Sprint 025C remains blocked.

============================================================
FILE: planning/sprints/025B-versioned-domain-authority-package/handoff-prompt.md
============================================================

# Sprint 025B Builder Handoff — Versioned Domain Authority Package

## Task contract

**objective:** Produce one versioned, reviewable biochemistry domain authority package with named product/domain and veterinary decisions, or a complete owner-input checkpoint that makes every missing decision explicit.

**owns:** The 025B authority package, its review record, generated sprint files and approved planning/docs closeout files only.

**must_not:** Do not edit Product/runtime/source/test/schema/fixture/package files; invent domain or veterinary rules; expose confidential or identifiable data; create credentials; access or mutate Production/external systems; deploy; move aliases; send email/enquiries; stage; commit; push; merge; or open a PR.

**acceptance:** Every required authority row is either accepted with named reviewer/date/source/version or marked `OWNER INPUT REQUIRED`; the Product remains unchanged and fail closed; the exact outcome and 025C dependency are recorded truthfully.

**verification:**

1. Verify canonical CWD and Git root, branch/HEAD, index and dirty manifest.
2. Review changed paths against the approved file set.
3. Run `node scripts/test-biochemistry-authority-025.mjs` without modifying it.
4. Run `npm run validate:json` and `npm run validate:static` when applicable.
5. Run `git diff --check`.
6. Scan changed files for credentials and identifiable horse/person data.
7. Confirm staged count is zero and no external action occurred.

## Required order

1. Apply this Pack only after a dry-run and reread all four generated sprint files plus the Sprint 025 authority record and closeout.
2. Record canonical/worktree truth and preserve every pre-existing change.
3. Inventory candidate sources without treating them as approval.
4. Build the exact package structure in the blueprint.
5. Reconcile named product/domain and veterinary decisions.
6. If any required decision is absent or conflicting, complete the owner-input checkpoint and stop cleanly.
7. If every decision is complete, record the accepted package without changing Product.
8. Validate, reconcile durable records and report the exact outcome.

## Evidence-Proportional Execution Standard

Use equivalent or stronger safe proof when a supporting tool is unavailable. A renderer or optional checker failure is not itself a blocker when the package content and boundary can be established safely. Stop only for a material target, confidentiality, authority, integrity, destructive, scope or external-state issue.

## Manual intervention

Manual intervention is required only for decisions that cannot be supplied by repository evidence and genuinely need named human authority. When reached, give the user the eight numbered steps in `requirements.md`, state what Builder already checked, and state that Builder will verify package identity, completeness, reviewer scope, conflicts and 025C readiness after the completed package is returned.

## Final report

Report:

- exact package ID/version/status;
- named reviewers recorded, or the exact reviewer roles still required;
- accepted authority sections;
- every `OWNER INPUT REQUIRED` section;
- source documents/versions reviewed;
- changed-file manifest;
- validation results;
- external effects (`0` expected);
- staged count (`0` expected);
- exact outcome; and
- whether Sprint 025C is unblocked.

End by stating exactly what you require from the user. If nothing is required, write: `I need nothing from you.`
