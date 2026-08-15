# Sprint 025B Versioned Biochemistry Domain Authority Package

## Purpose and safety boundary

This package presents the current Precision Performance biochemistry software contract for accountable human review. It separates established, versioned software facts from product/domain and veterinary decisions that repository evidence cannot authorize.

Package ID: `sprint-025B-authority-v1`
Version: `v1`
Status: `owner-input-required`
Effective date: `OWNER INPUT REQUIRED`
Builds on: `sprint-025-authority-partial-v1`
Supersedes: none. This owner-input package does not supersede the accepted partial structural contract.
Superseded by: none.

This package does not activate classifications, trainer guidance, recommendations, device claims or veterinary escalation. Every unresolved decision is marked `OWNER INPUT REQUIRED`. Product continues to fail closed and Sprint 025C remains blocked.

## 1. Governance, reviewers and sources

| Authority | Named person | Role | Decision date | Decision scope | Status |
| --- | --- | --- | --- | --- | --- |
| Aprec8 product/domain owner | Phillip Rankin | Director, Aprec8 | 2026-08-07 | Devices, formulas, terminology and Product wording | Partial — Section 2 measurement fields accepted; material direction to remove Average pH recorded but not implemented because the replacement score contract remains unresolved |
| Veterinary reviewer | Randell Rankin | Professional Veterinarian | 2026-08-07 | Thresholds, meanings, recommendations, disclaimers and escalation | `OWNER INPUT REQUIRED` |

Aprec8 Pty Ltd is the accountable organisation, but an organisation or job title is not a named-person decision. Both reviewers must decide against this same package ID/version. Any later formula, threshold, terminology, device, rule, disclaimer or escalation change requires a new package version and explicit supersession. Existing saved snapshots retain their original formula, lookup, threshold and recommendation versions and copied wording.

Reviewer identities, roles and decision dates were supplied directly by the user on 2026-08-07. Recording them does not constitute approval or acceptance; exact accepted sections and all remaining owner-input rows are still required.

### Sources reviewed

| Source | Version/effective date | Treatment |
| --- | --- | --- |
| `docs/SPRINT_025_BIOCHEMISTRY_DOMAIN_AUTHORITY.md` | `sprint-025-authority-partial-v1`; 2026-07-29 | Current structural authority and unresolved-boundary record |
| `planning/reviews/025-four-reading-biochemistry-authority-closeout.md` | Sprint 025 closeout | Confirms active structural behavior and unavailable authority |
| `docs/BIOCHEMISTRY_DATA_MODEL_013.md` | Sprint 013 | Versioned data/lookup structure; not health approval |
| `docs/BIOCHEMISTRY_SCORING_014.md` | `biochemistry-score-v1` | Exact-lookup and formula implementation contract |
| `docs/BIOCHEMISTRY_RECOMMENDATIONS_015.md` | Sprint 015 | Fail-closed scaffold; thresholds/rules explicitly fixture-only |
| `docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md` | Sprint 018 | Five-field capture and unavailable-output behavior |
| `docs/BIOCHEMISTRY_WORKFLOW_022.md` | Sprint 022 | Typed workflow; score display label remains provisional |
| `Reading Tables v1.csv` | `v1`; effective date `OWNER INPUT REQUIRED` | Exact numeric lookup source; sanitized metadata: 811 rows, 22 header columns; not named approval |
| `docs/DESIGN_AND_MESSAGING_AUTHORITY.md` | accepted 2026-07-19 | Safe messaging, text-plus-colour and non-diagnostic boundary |

### Candidate client-source authority ledger

For this ledger, approval means an explicit named person, role, decision date, package ID/version `sprint-025B-authority-v1`, and exact accepted sections. Health-adjacent slices require both the applicable product/domain decision and named veterinary decision. A document, organisation, filename, generic approval marker or historical use is not this approval.

| Exact repository filename | SHA-256 | Stated version | Stated effective date | Privacy-safe candidate authority slices | Approval-marker result | Sprint 025B approval conclusion | Treatment |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `Reading Tables v1.csv` | `DC0B9EB4C3E63C6CD1CF3D1675A3C76567AD2F71EEB694CD49DB320A73DFA03D` | `v1` | None supplied | Exact carbohydrate, pH-average, salts and urea lookup tables; formula and lookup structure | No named, dated Sprint 025B product/domain or veterinary approval marker | Establishes a versioned software input only; it does not establish the required named, dated approval | Software source |
| `Precision Performance Done.docx` | `D3B45B94785D85B6538B6D5E91BC08DDEB35435AA4012E22DC35FAE75C9CBBF0` | None supplied | None supplied | Candidate Product requirements for measurements, scoring, classifications, terminology and Table of Knowledge outcomes | Prior privacy-minimized scan found no approval marker | Retains its limited project authority as the expanded Done-definition source under `planning/DECISIONS.md:116`, but that authority does not approve its candidate domain slices for Sprint 025B and is not named, dated product/domain and veterinary acceptance | Candidate evidence plus limited project-level Done authority |
| `Precision Performance Disclaimer.docx` | `DE1B29B484E2D5F3D5E11EC27907592F5DCC1171A4247B5001CB03DA887CC752` | None supplied | None supplied | Candidate informational, non-diagnostic, trainer-observation, veterinary-care and prohibited-claims wording | Prior privacy-minimized scan found no approval marker | Does not establish named, dated Sprint 025B disclaimer or veterinary approval | Candidate evidence |
| `Precision Performance Overview V6 June 26.docx` | `1A3E226A17D630C9361F85D4BA51C8FFA9ABC094C7B38284F2DC28E8822AA888` | `V6` | None supplied; filename date is not treated as an effective date | Candidate terminology, measurement/device context, score presentation and knowledge/recommendation framing | Prior privacy-minimized scan found no approval marker | Does not establish named, dated Sprint 025B product/domain or veterinary acceptance | Candidate evidence |
| `Summary review of Elite Equine Performance Platform 260626.docx` | `C6011EB492F84723073D4AA2DE8FDF1D6844EC30EA1DF54A76FF80948342463C` | `260626` filename/version label only | None supplied; filename date is not treated as an effective date | Candidate domain, operational and review notes | Prior privacy-minimized scan found one generic approval-like marker | The generic marker is not tied to a named product/domain owner or veterinary reviewer, role, decision date, this package version or exact accepted sections; it is not Sprint 025B approval | Candidate evidence |

Client documents, spreadsheets, fixtures, historical examples, screenshots, code behavior and undocumented practice are candidate evidence only unless a named reviewer records an exact decision here.

## 2. Five-measurement and device contract

Five raw measurements produce four exact lookup inputs: carbohydrate → `carbs`; pH saliva plus pH urine → `ph_average`; raw conductivity → converted `salts`; and urea → `urea`. Numeric representation is normalized to six decimal places before exact lookup. This is representation normalization, not biological rounding, interpolation or nearest-value selection. A missing exact row blocks both scores.

| Raw measurement | Trainer-facing name | Device applicability | Raw unit | Converted-unit wording | Input precision | Display precision | Permitted step | Operational range | Range authority | Calibration/preparation | Invalid/out-of-range handling | Source/version | Decision status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Carbohydrate | Carbohydrate | Any compatible Brix refractometer | `%` | `OWNER INPUT REQUIRED` | One decimal place | One decimal place | `0.1%` | Inclusive `0.0%` to `13.0%` | Phillip Rankin, 2026-08-07 | Follow the applicable manufacturer instructions for the exact meter; Aprec8 specifies no additional calibration, preparation, cleaning or reset procedure | Invalid numeric input is rejected and a missing exact lookup blocks scoring; all additional domain handling is `OWNER INPUT REQUIRED` | Sprint 013/014; CSV `v1` | Partial |
| pH saliva | Saliva pH | Any compatible pH meter | pH reading (dimensionless) | `OWNER INPUT REQUIRED` | Two decimal places | Two decimal places | `0.01` | Inclusive `4.80` to `9.00` | Phillip Rankin, 2026-08-07 | Follow the applicable manufacturer instructions for the exact meter; Aprec8 specifies no additional calibration, preparation, cleaning or reset procedure | Invalid numeric input is rejected and a missing derived exact lookup blocks scoring; all additional domain handling is `OWNER INPUT REQUIRED` | Sprint 013/014; CSV `v1` | Partial |
| pH urine | Urine pH | Any compatible pH meter | pH reading (dimensionless) | `OWNER INPUT REQUIRED` | Two decimal places | Two decimal places | `0.01` | Inclusive `4.80` to `9.00` | Phillip Rankin, 2026-08-07 | Follow the applicable manufacturer instructions for the exact meter; Aprec8 specifies no additional calibration, preparation, cleaning or reset procedure | Invalid numeric input is rejected and a missing derived exact lookup blocks scoring; all additional domain handling is `OWNER INPUT REQUIRED` | Sprint 013/014; CSV `v1` | Partial |
| Conductivity | Conductivity | Any compatible conductivity meter; `× 1.43` applies universally to compatible readings entered in `mS/cm` | `mS/cm` | Trainer-facing result name `C reading`; display unit `C` meaning the converted number | Two decimal places | Raw and converted display: two decimal places | `0.01 mS/cm` | Inclusive `0` to `99 mS/cm` | Phillip Rankin, 2026-08-07 | Follow the applicable manufacturer instructions for the exact meter; Aprec8 specifies no additional calibration, preparation, cleaning or reset procedure | Invalid numeric input is rejected and a missing converted exact lookup blocks scoring; all additional device/domain handling is `OWNER INPUT REQUIRED` | Sprint 013/014; CSV `v1` | Partial |
| Urea | Urea | Any compatible nitrate meter | `ppm` | `OWNER INPUT REQUIRED` | Whole ppm input | One decimal place | `1 ppm` | Inclusive `0` to `30 ppm` | Phillip Rankin, 2026-08-07 | Follow the applicable manufacturer instructions for the exact meter; Aprec8 specifies no additional calibration, preparation, cleaning or reset procedure | Invalid numeric input is rejected and a missing exact lookup blocks scoring; all additional domain handling is `OWNER INPUT REQUIRED` | Sprint 013/014; CSV `v1` | Partial |

Product/domain decision — Section 2 trainer-facing names: Phillip Rankin, Director of Aprec8, decision date 2026-08-07, accepts exactly `Carbohydrate`, `Saliva pH`, `Urine pH`, `Conductivity` and `Urea`. The user supplied this decision during the guided review on 2026-08-08. This decision does not accept any device, unit, precision, step, range, calibration, handling, formula, threshold, recommendation, disclaimer, escalation or veterinary field.

Product/domain decision — Section 2 specified device, unit, range and pH precision fields: Phillip Rankin, Director of Aprec8, decision date 2026-08-07, accepts any compatible Brix refractometer (`0.0%` to `13.0%`), any compatible pH meter for both saliva and urine (two decimal places; `4.80` to `9.00`), any compatible conductivity meter (`mS/cm`; `0` to `99 mS/cm`) and any compatible nitrate meter (`ppm`; `0` to `30 ppm`). The user clarified these fields during the guided review on 2026-08-08.

Product/domain decision — Section 2 boundaries, input increments and display precision: Phillip Rankin, Director of Aprec8, decision date 2026-08-07, accepts both endpoints for every stated range; carbohydrate increment `0.1%` and one decimal display; saliva and urine pH increment `0.01` and two decimal display; conductivity increment `0.01 mS/cm` and two decimal display; urea increment `1 ppm` and one decimal display. The final stray “2” in the first response was explicitly withdrawn. Biological suitability and every veterinary field remain unresolved.

Product/domain decision — Section 2 conductivity conversion: Phillip Rankin, Director of Aprec8, decision date 2026-08-07, accepts universal application of `converted C = raw mS/cm × 1.43` for every compatible conductivity meter reading, trainer-facing name `C reading`, display unit `C` meaning the converted number, and two-decimal display. The user supplied this decision during the guided review on 2026-08-08. This does not establish veterinary meaning, thresholds or recommendations.

Product/domain decision — Section 2 calibration/preparation: Phillip Rankin, Director of Aprec8, decision date 2026-08-07, specifies no additional Aprec8 procedure. For each exact compatible meter in use, trainers must follow the applicable calibration, sample-preparation, cleaning and reset instructions supplied by its manufacturer. The user supplied this decision during the guided review on 2026-08-08. This rule does not waive or replace manufacturer instructions.

Established pH calculation: `(pH saliva + pH urine) / 2`, normalized to six decimals for exact lookup. Saliva and urine input/display precision is two decimal places, permitted step is `0.01`, and the inclusive operational range is `4.80` to `9.00`. Calibration/preparation follows the applicable manufacturer instructions for the exact meter; intermediate averaging precision remains `OWNER INPUT REQUIRED`.

Material owner-directed contract conflict — Average pH: Phillip Rankin, Director of Aprec8, decision date 2026-08-07, directed during the guided review on 2026-08-08: `Step 6 should be disregarded. Do not use Average pH at all.` This rejects future Product use of Average pH but does not change the existing software fact, runtime or persisted contract. The treatment of the two raw pH readings, the replacement for `L_pH`, revised formula/weights and veterinary acceptance remain unresolved and require a fresh Architect plan before implementation.

Established conductivity calculation: `converted C = raw meter value × 1.43`, normalized to six decimals for exact salts lookup. Universal applicability to every compatible conductivity meter reading entered in `mS/cm`, trainer-facing name `C reading`, display unit `C` meaning the converted number, two-decimal input/display precision, permitted step `0.01 mS/cm`, inclusive range `0` to `99 mS/cm`, and the manufacturer-instruction calibration/preparation rule are product/domain accepted.

## 3. Formula and score-name contract

Lookup losses are decimal fractions from exact `Reading Tables v1.csv` `v1` rows.

| Output | Formula | Inputs/weights | Domain/precision | Source | Human acceptance |
| --- | --- | --- | --- | --- | --- |
| Hydration Score | `H = 1 - ((L_carbs + L_salts) / 2)` | Carbohydrate loss 1/2; salts loss 1/2 | Structurally normalized to six decimals; accepted domain/display `OWNER INPUT REQUIRED` | `biochemistry-score-v1`; CSV `v1`; exact lookup | Named product/domain and veterinary acceptance `OWNER INPUT REQUIRED` |
| Internal `healthScore` | `B = 1 - ((L_carbs + L_pH + L_salts + L_urea) / 4)` | Each loss 1/4 | Structurally normalized to six decimals; accepted domain/display `OWNER INPUT REQUIRED` | `biochemistry-score-v1`; CSV `v1`; exact lookup | Named product/domain and veterinary acceptance `OWNER INPUT REQUIRED` |

The direction from Phillip Rankin not to use Average pH conflicts with the active `L_pH` term above. No replacement input, weighting or formula is accepted. The active implementation remains unchanged and unavailable for authority-dependent Product activation until a fresh Architect plan and a veterinary decision from Randell Rankin resolve the conflict.

The persisted/internal key `healthScore` remains unchanged. Its final trainer-facing label is `OWNER INPUT REQUIRED`. “Biochemistry Trend Score” is provisional display wording only.

## 4. Classification contract

No complete named-reviewer-approved production threshold set exists. Each accepted future set must cover its complete accepted domain without gap or overlap and state inclusivity/exclusivity at every boundary. Colour may never carry meaning without text and context. Sprint 015 fixtures, examples and marketing are not approval.

### Hydration Score

| Zone | Lower/upper bounds and semantics | Label/context | Source/version/effective date | Reviewer |
| --- | --- | --- | --- | --- |
| Green | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` |
| Amber | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` |
| Red | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` |

### Internal `healthScore`

| Zone | Lower/upper bounds and semantics | Label/context | Source/version/effective date | Reviewer |
| --- | --- | --- | --- | --- |
| Green | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` |
| Amber | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` |
| Red | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` | `OWNER INPUT REQUIRED` |

## 5. Table of Knowledge contract

No production rule has named, dated product/domain and veterinary approval. Every rule remains inactive and unavailable.

| Required future field | Current decision |
| --- | --- |
| Stable rule ID, category, Level 1–5 and supersession | `OWNER INPUT REQUIRED` |
| Exact deterministic input/score/zone trigger | `OWNER INPUT REQUIRED` |
| Complete trainer-facing wording | `OWNER INPUT REQUIRED` |
| Informational, trainer-review or veterinary-review class | `OWNER INPUT REQUIRED` |
| Source document/version/effective date | `OWNER INPUT REQUIRED` |
| Named reviewer attribution | `OWNER INPUT REQUIRED` |
| Required disclaimer/escalation wording | `OWNER INPUT REQUIRED` |
| Active/inactive status | Inactive; activation `OWNER INPUT REQUIRED` |

Future rules must be deterministically expressible from approved Product data. This package prohibits invented diagnosis, prognosis, treatment instructions, supplement doses, prescribed water volumes, performance guarantees and claims that Product replaces veterinary judgement.

## 6. Safety, disclaimer and escalation contract

| Language class | Existing safe boundary | Exact final authority |
| --- | --- | --- |
| Informational/non-diagnostic | Results are informational and non-diagnostic | `OWNER INPUT REQUIRED` |
| Trainer/veterinary relationship | Product supports, never replaces, trainer and veterinary judgement | `OWNER INPUT REQUIRED` |
| Unavailable/incomplete results | Missing exact lookup or authority remains blocked; never guess | `OWNER INPUT REQUIRED` |
| Trainer-review trigger | No approved trigger | `OWNER INPUT REQUIRED` |
| Veterinary-review trigger | No approved trigger or wording | `OWNER INPUT REQUIRED` |
| Prohibited claims | No diagnosis, prognosis, treatment, dose, prescribed water volume, guarantee or veterinary-replacement claim | Named confirmation `OWNER INPUT REQUIRED` |

Generic safe-design language is a boundary, not an approved clinical rule. Escalation triggers and wording require the named veterinary reviewer.

## 7. Decision and supersession record

| Authority slice | Decision |
| --- | --- |
| Five measurements → four exact inputs | Accepted software fact; Sprint 013/014/018/022 and Sprint 025 |
| Six-decimal exact lookup and missing-row blocking | Accepted software fact; `biochemistry-score-v1`, CSV `v1` |
| pH average | Existing software fact; Phillip Rankin directs no future Product use. Raw-pH treatment, replacement `L_pH` contract, revised formula/weights and veterinary acceptance remain `OWNER INPUT REQUIRED`; no implementation changed. |
| Conductivity `1.43` conversion | Universal product/domain applicability and `C reading` wording accepted by Phillip Rankin; veterinary meaning remains unresolved. |
| Both score formulas | Structurally active; named human acceptance `OWNER INPUT REQUIRED` |
| Measurement/device contract | Partially accepted by Phillip Rankin for the fields recorded in Section 2; remaining handling and veterinary meaning remain unresolved. |
| Final trainer-facing score name | `OWNER INPUT REQUIRED` |
| Two complete Green/Amber/Red sets | `OWNER INPUT REQUIRED` |
| Table of Knowledge rules | `OWNER INPUT REQUIRED` |
| Disclaimer and escalation contract | `OWNER INPUT REQUIRED` |
| Named product/domain owner and veterinary reviewer | Phillip Rankin — Director, Aprec8 — 2026-08-07; Randell Rankin — Professional Veterinarian — 2026-08-07. Exact accepted sections remain `OWNER INPUT REQUIRED`. |

Outcome: `versioned-domain-authority-package-owner-input-required-clean`. This package is not accepted authority, does not supersede `sprint-025-authority-partial-v1`, and does not unblock Sprint 025C.

## Reviewer checklist

Product/domain reviewer must decide all device, measurement, formula, domain, display, terminology and Product-wording rows and record name, role, date, package version and exact sections. Veterinary reviewer must decide all health-adjacent formula meanings, thresholds, language, Table of Knowledge rules, disclaimers and escalation rows and record the same identity/version evidence. Conflicts remain unavailable.

## Owner-input steps

1. Name the Aprec8 product/domain decision owner and the veterinary reviewer.
2. Give both reviewers the same package version and the cited source documents, using a private channel for any confidential material.
3. Complete every `OWNER INPUT REQUIRED` item; do not leave verbal assumptions or ranges such as “about” or “normal”.
4. Have the product/domain owner approve device rules, formulas, trainer terminology and Product wording.
5. Have the veterinary reviewer approve health-adjacent thresholds, meanings, recommendation wording, disclaimers and escalation rules.
6. Record each reviewer’s typed name, role, decision date, package version and exact accepted sections.
7. Return the completed package in the canonical workspace or attach it in the task without credentials, identifiable horse data or confidential raw worksheets.
8. Builder will then reconcile the returned version, check completeness/conflicts and report whether 025C is unblocked.
