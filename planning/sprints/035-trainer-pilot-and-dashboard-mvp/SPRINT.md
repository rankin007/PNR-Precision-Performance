# Sprint 035 — Trainer Pilot And Dashboard MVP

## Outcome

Deliver and validate one dependable trainer-facing MVP journey on the reconciled Sprint 034 product baseline:

1. an authorised trainer signs in and lands on a useful dashboard;
2. the trainer sees only horses already assigned to an accessible stable;
3. the trainer can identify each horse's latest available biochemistry workflow state and any known incomplete step without clinical ranking;
4. the trainer opens one horse, understands the available current result context, and follows the next action already permitted by the existing role and record state; and
5. the trainer returns to the dashboard without losing orientation.

The dashboard is an operational worklist, not a clinical-priority engine. It must make the existing product usable enough for a bounded trainer pilot while preserving the accepted authentication, RLS, horse-access and mobile biochemistry contracts.

The target outcome is `trainer-pilot-and-dashboard-mvp-complete-clean`.

## Workflow profile

Standard product delivery with strict controls attached to authenticated multi-user access, private horse/stable data, pilot evidence, provider mutation and deployment. Use this single `SPRINT.md` as the sprint authority. Do not expand ordinary UI work into additional planning sprints or documents.

## Starting baseline and prerequisites

Builder must first read:

- `AGENTS.md` and `templates/method/120x-agent-identity.md`;
- `planning/STATE.md`, `planning/STATUS.json`, `planning/ARCHITECT_BRIEFING.md` and `planning/SPRINT_SCHEDULE.md`;
- the Sprint 034 closeout, reconciliation ledger and selected branch/SHA;
- `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md` and `planning/DEFERRED_SCOPE_AND_OWNERSHIP.md`;
- `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`;
- `docs/AUTH_RLS_PORTAL_ACCESS.md`;
- `docs/BIOCHEMISTRY_WORKFLOW_022.md` and `docs/BIOCHEMISTRY_CAPTURE_RESULTS_018.md`;
- applicable Sprint 021AH and 022/022B closeout evidence;
- current `/portal`, horse and biochemistry routes, access helpers, tests and data contracts.

The only acceptable implementation baseline is the clean, validated, remotely backed-up candidate selected and closed by Sprint 034, expected on `codex/034-reconciled-product-baseline` at the exact recorded local/remote SHA. Verify the branch, SHA, worktree state, migrations, lockfile and recorded Sprint 034 outcome before editing product files.

Do not implement from the current dirty `develop` worktree, an older Sprint 028 candidate, the public-release branch alone, a temporary worktree, or reconstructed historical Packs. If Sprint 034 is not closed at an accepted outcome or its exact candidate is unavailable/dirty in an unexplained way, record the evidence and close `reconciled-baseline-unavailable-clean` without product edits.

Accepted Sprint 034 prerequisite outcomes are:

- `reconciled-product-baseline-and-project-simplification-complete-clean`; or
- `reconciled-product-baseline-complete-archive-limited-clean`, provided its recorded limitations do not affect application source, authentication/RLS, horse access, biochemistry workflow, validation, deployment reproducibility or Sprint 035 file authority.

Sprint 032 remains the accepted public release, but it is not permission to deploy Sprint 035 to production. Product-wide Done remains unmet.

## MVP product contract

### 1. Trainer dashboard

Replace the authenticated `/portal` placeholder with a calm, responsive operational dashboard for users who already hold the required existing portal/horse permissions. The dashboard must:

- show only accessible horses and stable context returned through existing server-side authorisation boundaries;
- show a concise card or row for each horse with identity, latest relevant biochemistry activity when available, explicit workflow state, and one permitted next action;
- distinguish `no result`, `draft/incomplete`, `pending review`, `completed`, `unavailable`, `denied` and `failed` states where those states exist in the accepted contract;
- explain the basis and timestamp of any displayed latest activity or state;
- use neutral deterministic ordering, such as incomplete operational work first and then horse name, without guessing clinical severity or urgency;
- provide direct links to the horse workspace or existing capture/review route only when the user can perform that action;
- provide useful empty, loading, unavailable and failure treatment without showing sample horses as if they were authorised records; and
- remain bounded and server-composed, with no client-side N+1 history loading or inaccessible records influencing rows, counts or order.

The dashboard must not calculate or imply race readiness, health urgency, diagnosis, treatment, supplementation or performance prediction.

### 2. Focused horse workspace

Strengthen the existing `/portal/horses/[horseId]` route only as needed to complete the MVP journey. It must:

- confirm horse identity and accessible stable context;
- show the latest available biochemistry workflow/result context already supported by the accepted source and version contract;
- preserve stored labels, values, explanations and unavailable states without inventing new thresholds or recommendations;
- identify a known incomplete workflow step and expose the next existing permitted action;
- link to existing capture, review or correction flows rather than duplicating those workflows;
- provide a clear route back to the trainer dashboard; and
- deny wrong-horse, cross-stable and revoked access without leaking horse identity, counts, result state or existence.

Broad timelines, charts, trends, saved views, evidence galleries, uploads, notes expansion and voice capture are not part of this MVP.

### 3. Typed composition and permission agreement

Create the smallest typed server-side composition boundary needed for the dashboard and horse workspace. Reuse existing authenticated context, RLS, membership, horse-access and biochemistry contracts. Domain/workflow derivations must be pure and independently testable; UI components must render typed states rather than recalculate them.

Every row, count, state, reason, timestamp and action must agree with the current user's existing permissions. Missing, failed, stale or inaccessible information must never default to Green, normal, complete or actionable. Use explicit clock/time-zone inputs for time-dependent labels or ordering.

No schema, migration, RPC, RLS, role, membership, stable assignment, horse assignment or permission change is approved. If correct bounded composition cannot be achieved through existing authorised contracts, document the exact missing contract and close `dashboard-data-contract-expansion-required-clean` without inventing it.

### 4. Responsive, accessible and safe presentation

Follow `docs/DESIGN_AND_MESSAGING_AUTHORITY.md` for authenticated surfaces:

- utilitarian racing-green, midnight-navy and established data/status styling;
- mobile-first phone usability, practical tablet use and clear desktop scanning without horizontal page overflow;
- logical headings and landmarks, keyboard-operable controls, visible focus and meaningful accessible names;
- status communicated by text and context, never colour alone;
- distinct empty, loading, unavailable, denied and error states; and
- concise informational language that supports trainer judgement and professional veterinary care without replacing either.

## Trainer-visible pilot acceptance

This sprint must include a bounded trainer-visible pilot after automated and synthetic rendered acceptance passes. The pilot is an acceptance activity, not permission for production launch or broad customer onboarding.

Use a preview or other non-production hosted environment tied to the exact Sprint 035 candidate. Builder may deploy to a scoped non-production preview only when the target is verified, existing environment authority covers it, no production alias/domain is changed, and no real production data is copied. If a suitable existing preview can be proven without a new deployment, use it.

Pilot scope:

- one to three authorised trainer representatives designated by the product owner;
- synthetic or specifically approved non-identifying pilot horse/stable records only;
- the exact five-step MVP journey in this sprint;
- phone first, with at least one desktop or tablet pass;
- a short task-based feedback record covering task completion, confusing language, missing orientation, mobile friction and any permission/access disagreement;
- no secrets, account credentials, personal contact details, real horse identifiers, free-text clinical notes or screenshots containing protected data in repository evidence.

Builder may prepare the preview, synthetic fixtures, pilot script and evidence template. Creating external user accounts, inviting real participants or asking them to perform the pilot requires the product owner's explicit operational coordination. Never request passwords or secret values.

If participants or account provisioning are not available after the product and preview are otherwise ready, record the automated/rendered proof and the exact remaining pilot action, then close `trainer-pilot-participation-pending-clean`. Do not claim trainer acceptance from Builder-only testing.

Material pilot findings that prevent completion of the approved journey, expose inaccessible data, contradict permission rules or create unsafe clinical meaning must be corrected and re-tested within Sprint 035 when the correction remains inside this contract. Cosmetic preferences and genuinely different feature requests are recorded for later prioritisation, not absorbed automatically.

## Approved files and actions

Builder may change only files directly required for:

- authenticated `/portal` dashboard and focused horse-workspace routes;
- narrow reusable portal, horse, status, navigation, empty/error and action components;
- existing authorised server-side horse/biochemistry queries or typed read composition;
- pure deterministic workflow-summary derivations;
- focused synthetic fixtures and automated/rendered tests;
- validation registration and deterministic test/harness corrections;
- a bounded non-production preview configuration only where already supported and necessary for the pilot;
- Sprint 035 review evidence and standard closeout updates to current planning/docs.

Builder may create a scoped Sprint 035 branch from the exact Sprint 034 SHA and may commit and push only that scoped branch when needed to create the verified preview. Use a small intentional commit series and inspect the exact staged manifest. Do not merge, open a PR, push `develop`, or rewrite history unless separately requested.

## Explicitly out of scope

- Clinical triage, automated urgency, diagnosis, treatment, supplement advice, race-readiness or performance prediction.
- New or changed thresholds, scoring formulas, recommendation content or historical-result interpretation.
- Upload/storage/evidence lifecycle, OCR, microphone, audio, transcription, voice-provider or broad notes functionality.
- Trend formulas, charts, saved views, broad reporting or owner/public dashboards.
- New schema, migration, RPC, RLS, role, permission, membership or assignment behaviour.
- Transactional commerce, pricing, checkout, public website enhancement, SEO/indexing or enquiry transmission.
- Production deployment, rollback, production aliases/domains, DNS, production Supabase/Stripe mutation or real production-data access/copy.
- Broad customer onboarding, support operations or declaring product-wide Done.
- Real identifiable horse, stable, trainer, owner or customer data in fixtures, logs, screenshots or committed evidence.
- Refactoring unrelated authenticated, admin, public or commerce surfaces.

## Delivery sequence

1. Verify the exact closed Sprint 034 branch/SHA, clean state and prerequisite evidence.
2. Inventory the current portal, horse, biochemistry, permission and test surfaces on that candidate.
3. Record a concise implementation manifest and the typed dashboard/workspace state-and-action matrix before product edits.
4. Implement the smallest authorised server composition and deterministic summary derivations.
5. Build the responsive trainer dashboard and focused horse-workspace journey using existing actions.
6. Add synthetic permission, state, responsive and accessibility proof.
7. Run focused regressions and all canonical validation/build gates.
8. Verify a scoped non-production preview without changing production.
9. Run or prepare the bounded trainer-visible pilot and reconcile material in-scope findings.
10. Record evidence, limitations and exactly one accepted outcome; refresh current planning state and the Architect briefing.

## Acceptance criteria

### Baseline and scope

- [ ] Sprint 034 is closed at an accepted prerequisite outcome and its exact branch/SHA, clean state, migrations and lockfile are recorded.
- [ ] Sprint 035 starts from that exact candidate without absorbing the dirty `develop` root or reconstructing historical work.
- [ ] The approved-path manifest and dashboard/workspace state-and-action matrix exist before implementation.
- [ ] No out-of-scope schema, auth/RLS, clinical, upload, voice, trend, commerce, public or production behavior changed.

### Trainer journey

- [ ] An authorised trainer lands on a useful `/portal` dashboard rather than the placeholder shell.
- [ ] Only accessible horses and stable context appear; inaccessible records affect neither rows, counts, ordering nor navigation.
- [ ] Each horse shows an accurate latest available biochemistry workflow state, basis/time and one existing permitted next action, or an explicit unavailable/empty state.
- [ ] Neutral ordering is deterministic and does not imply clinical severity.
- [ ] The trainer can open a horse, understand the available current result/workflow context, follow an existing permitted capture/review/correction action, and return to the dashboard.
- [ ] Wrong-horse, cross-stable and revoked access deny safely without identity or state leakage.
- [ ] Missing, stale, failed and inaccessible data never appear normal, Green, complete or actionable by default.

### Quality and presentation

- [ ] Typed derivations are tested independently from UI components with deterministic time-zone/clock boundaries where applicable.
- [ ] Zero, one and many horses plus draft/incomplete, pending, completed, unavailable, denied, failed and revoked cases are covered with synthetic non-identifying data as applicable to the accepted contract.
- [ ] Primary dashboard composition is server-side, field-minimal and bounded, with no per-horse unbounded history loading.
- [ ] Phone, tablet and desktop layouts have no horizontal page overflow and preserve clear task orientation.
- [ ] Keyboard navigation, visible focus, heading hierarchy, landmarks, accessible names and text-plus-context status presentation pass.
- [ ] Language remains informational, non-diagnostic and free of unapproved urgency, treatment, supplement, prediction or race-readiness claims.

### Pilot and evidence

- [ ] A verified non-production preview points to the exact Sprint 035 candidate and does not change a production alias, domain, provider or dataset.
- [ ] Automated and rendered synthetic acceptance passes before trainer-visible pilot activity.
- [ ] One to three designated trainer representatives complete, or are explicitly pending for, the five-step pilot journey on phone plus at least one larger viewport.
- [ ] Pilot evidence records task completion and material findings without credentials, personal details, real identifiers or protected horse/stable data.
- [ ] Material in-scope pilot failures are corrected and re-tested; genuinely different requests are recorded without scope expansion.
- [ ] Builder-only testing is not represented as trainer acceptance.

### Validation and closeout

- [ ] Focused dashboard/workspace derivation, permission, route, component, responsive and accessibility tests pass.
- [ ] Maintained Sprint 021AH and 022/022B regressions relevant to this journey pass.
- [ ] Canonical JSON, domain, roles, Supabase self-test, static, TypeScript, lint and local validation pass.
- [ ] Production build passes from the Sprint 035 candidate in the project root or an equivalent clean reparse-safe workspace, with any substitution recorded.
- [ ] `git diff --check`, approved-path, staged-manifest, secret/private-data and generated-artifact checks pass.
- [ ] Exact local/remote SHA and preview identity are recorded when commit/push/preview actions occur.
- [ ] Production, public aliases/domains, production providers and production data remain unchanged.
- [ ] `planning/STATE.md`, `planning/STATUS.json`, `planning/SPRINT_SCHEDULE.md`, `planning/EVIDENCE_INDEX.md` and `planning/ARCHITECT_BRIEFING.md` agree on the final outcome and remaining limitations.

## Evidence-proportional execution and manual intervention

Follow the Evidence-Proportional Execution Standard in `AGENTS.md`. Stop only for a material wrong/ambiguous baseline or target, secret/protected-data exposure, destructive uncertainty, unauthorised scope expansion, auth/RLS/privacy failure, migration or data-contract requirement, integrity/security regression, production impact, preview-target uncertainty, or cleanup whose ownership cannot be proven.

Substitute equivalent or stronger safe evidence when a preferred supporting tool is unavailable. Keep in-scope tooling, harness, credential-refresh, validator, formatting, encoding, reporter, deterministic fixture and preview-configuration corrections in Sprint 035. Do not create a follow-up sprint solely because Docker, browser automation, a renderer, clipboard control, a schema dump, an optional CLI path or another redundant verifier is unavailable.

Manual intervention is the last safe option. When genuinely required, record:

- what is blocked;
- the evidence already checked;
- the exact user/manual action needed;
- step-by-step instructions that do not request secrets or protected data; and
- what Builder will verify after the action.

## Acceptable outcomes

`trainer-pilot-and-dashboard-mvp-complete-clean` when the full trainer journey, automated/rendered proof and bounded trainer-visible pilot pass, with production unchanged.

`trainer-pilot-participation-pending-clean` when the MVP and verified non-production preview pass all non-participant acceptance, but designated participant availability or authorised account coordination remains outstanding and is recorded precisely.

`reconciled-baseline-unavailable-clean` when the exact accepted Sprint 034 candidate cannot be established safely; no product edits, preview deployment or reconstruction by guesswork occurs.

`dashboard-data-contract-expansion-required-clean` when correct, bounded and permission-safe dashboard composition requires a schema, migration, RPC, RLS, permission or assignment change outside this sprint.

`trainer-dashboard-validation-blocked-clean` when in-scope implementation exists but a material permission, privacy, integrity, accessibility, build, pilot-safety or cleanup boundary fails and cannot be corrected within this contract.

## Builder handoff

Apply this Architect Pack, verify the generated single-file Sprint 035 authority, and execute only from that `SPRINT.md`.

Start from the exact clean Sprint 034 reconciled branch/SHA recorded at closeout. Do not build from the dirty root or infer an integrated baseline from file recency. If the prerequisite cannot be proven, close cleanly without product edits.

Deliver the narrow five-step trainer journey using existing authentication, RLS, horse access and biochemistry contracts. Keep composition server-side and bounded, derivations typed and deterministic, actions permission-aware, unavailable states explicit, and language non-clinical. Do not add schema, roles, permissions, clinical rules, uploads, voice, trends, commerce or production changes.

Prove the journey with synthetic permission/state coverage, responsive/accessibility evidence, maintained regressions and canonical validation/build gates. Then use a verified non-production preview for the bounded trainer-visible pilot. External participant invitations or account provisioning require product-owner coordination; never request credentials or store protected evidence.

Use equivalent or stronger safe evidence for unavailable supporting tools and keep deterministic corrections inside Sprint 035. Stop only at a material boundary. Record one accepted outcome and refresh the current durable handoff without declaring product-wide Done.
