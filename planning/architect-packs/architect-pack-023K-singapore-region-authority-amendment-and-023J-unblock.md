Architect Pack 023K - Singapore Region Authority Amendment And 023J Unblock

Created: 2026-07-28
Workflow profile: strict
Architect outcome: Builder handoff to record Aprec8's explicit approval of Supabase Singapore `ap-southeast-1` for this project/environment, supersede the prior Sydney-only regional gate, reconcile Sprint 023J regional wording, and allow 023J to resume from its remaining non-regional authority/provider/recovery gates without production mutation.

============================================================
FILE: planning/sprints/023K-singapore-region-authority-amendment-and-023J-unblock/requirements.md
============================================================

# Sprint 023K - Singapore Region Authority Amendment And 023J Unblock Requirements

## Governing Authority Amendment

Aprec8 has explicitly decided and approved:

> Supabase region `ap-southeast-1` (Singapore) is accepted and approved for maintaining the Precision Performance project and its environment. The use of Singapore as the project region must not, by itself, block continued delivery, implementation, validation or later production-readiness work.

This is a binding project decision supplied by the Aprec8 authority owner on 28 July 2026. It supersedes the earlier Sprint 023C/023D/023J requirement that the project must use Sydney `ap-southeast-2` and must stop if it uses Singapore `ap-southeast-1`.

The exact approved hard-coded regional identifier is:

`ap-southeast-1`

Do not substitute `ap-southeast-2`, infer a different region, describe Singapore as Australia, or retain a Sydney-only stop condition.

## Effect And Limits

This amendment means:

- `ap-southeast-1` is the approved Supabase project region for Precision Performance;
- Singapore hosting/processing is knowingly accepted by Aprec8 for this project/environment;
- the region alone is not a blocker to Sprint 023J or later delivery;
- documentation, validation, provider decisions and hosted evidence must state Singapore accurately;
- any UI/privacy notice that later describes storage location must say Singapore/international processing accurately and must not claim Australian-only storage; and
- future regional change requires another explicit Aprec8 decision.

This amendment does **not** by itself:

- designate an exact Supabase project reference or Vercel team/project/environment;
- classify an existing project as synthetic-only or non-production;
- authorize production database migration, bucket/policy creation, production deployment, alias movement or production Cron activation;
- approve unknown subprocessors, overseas personnel access or provider-contract terms without review;
- waive private Storage, RLS, access, retention, deletion, audit, incident or recovery controls;
- supply an approved Storage-object recovery method or retention/expiry behavior;
- approve real scanner/sanitiser providers or enable evidence availability;
- enable controlled CSV; or
- authorize secrets to be exposed or stored in Git.

Sprint 023J may resume only after the remaining exact-target, data-classification, operator, rollback, provider/privacy and Storage-recovery gates pass.

## Execution Location And Baseline

Builder applies Sprint 023K in the existing isolated Sprint 023J worktree:

- branch `codex/023J-provider-remote-storage-and-hosted-proof`;
- worktree `C:\tmp\pnr-023j-provider-remote-storage-and-hosted-proof`;
- HEAD `ae5470cb79e7f41f7a8ce30a7ce07e2c796897a9`; and
- current 023J outcome `remote-target-authority-blocked-clean`.

Before editing, verify the index is clean, existing changes are only applied 023J planning/blocked evidence, no migration/source/remote mutation occurred, and the original combined 023E–023I worktree remains clean.

If that controlled baseline does not hold, stop `singapore-region-amendment-baseline-blocked-clean`.

## Required Durable Record

Create `docs/SPRINT_023K_SINGAPORE_REGION_AUTHORITY_AMENDMENT.md` containing:

1. decision date and authority context;
2. the exact approved statement above;
3. approved hard-coded region `ap-southeast-1` and plain-language location Singapore;
4. explicit supersession of Sydney-only `ap-southeast-2` and Singapore-stop wording;
5. accurate international-processing/privacy implication;
6. controls not waived by the decision;
7. affected sprints/documents; and
8. amendment history rule: preserve 023C/023D as historical records and cite this addendum as later authority.

Do not alter the historical Sprint 023C Word record or rewrite its original approval date. Preserve chronology.

## Sprint 023J Reconciliation

Update the four generated Sprint 023J files so that:

- every mandatory Sydney `ap-southeast-2` requirement becomes exact approved Singapore `ap-southeast-1`;
- every statement that Singapore fails the regional gate is removed/replaced;
- provider/region proof must confirm the exact target is `ap-southeast-1` Singapore;
- provider/privacy proof must acknowledge international/overseas processing accurately;
- Australian-only storage claims are prohibited;
- regional acceptance is not confused with exact target authority or production authority;
- existing non-production target, synthetic-only, operator, rollback, provider, recovery, commit and remote-mutation controls remain; and
- no external action is performed during 023K.

Update `planning/reviews/023J-closeout.md` to state that its Singapore-region blocker is superseded by Sprint 023K, while retaining the remaining missing authority items. Do not change 023J to a clean/complete outcome unless every remaining gate independently passes later.

## Planning Reconciliation

Update durable project records to state:

- approved project region: `ap-southeast-1` Singapore;
- prior Sydney-only decision superseded by Sprint 023K;
- no Australian-only storage representation;
- Sprint 023J may resume after remaining target/provider/recovery inputs;
- production mutation remains unapproved in 023K; and
- exact remaining questions/manual interventions.

Where old Sydney wording is historical evidence, retain it and add a supersession reference. Where it is an active requirement, replace it with the Singapore decision.

## Validation

Builder must prove:

- exact string `ap-southeast-1` appears in the amendment and active 023J region requirements;
- no active 023J requirement still mandates `ap-southeast-2` or says Singapore fails;
- `ap-southeast-2` appears only where historical supersession is explained;
- Singapore is never described as Australian storage;
- all non-regional 023J gates remain intact;
- no production/source/migration/package/configuration/provider/remote file or state changed;
- JSON and Architect Pack checks pass; and
- `git diff --check` passes.

## Approved File Set

Builder may edit/create only:

- `docs/SPRINT_023K_SINGAPORE_REGION_AUTHORITY_AMENDMENT.md`;
- `planning/architect-packs/architect-pack-023K-singapore-region-authority-amendment-and-023J-unblock.md`;
- `planning/sprints/023K-singapore-region-authority-amendment-and-023J-unblock/**`;
- all four files under `planning/sprints/023J-provider-remote-storage-migration-application-and-hosted-proof/`;
- `planning/reviews/023J-closeout.md`;
- `planning/reviews/023K-singapore-region-authority-and-supersession-proof.md`;
- `planning/reviews/023K-active-requirement-reconciliation.md`;
- `planning/reviews/023K-closeout.md`;
- `planning/STATE.md`, `planning/STATUS.json`, `planning/ARCHITECT_BRIEFING.md`, `planning/EVIDENCE_INDEX.md`, `planning/SPRINT_SCHEDULE.md`, and `planning/PROJECT_SPRINT_LIST_2026-07-21.md`;
- `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md` only for this regional decision and remaining exact gates.

Any other edit is a scope stop.

## Git, Remote And External Boundaries

Sprint 023K is documentation/planning reconciliation only. Do not edit source, migrations, packages, configuration or provider settings. Do not access/mutate Supabase/Vercel, create projects, configure secrets, apply migrations, create Storage, deploy, stage, commit, push, merge or resume 023J external work inside 023K.

Do not commit unless separately instructed after review.

## Manual Intervention Rule

For every blocker record:

- what is blocked/not working;
- evidence checked;
- exact user/operator action required;
- numbered steps; and
- what Builder will verify afterward.

## Closeout Intent

The successful outcome is `singapore-region-authority-recorded-023J-region-unblocked-clean`. It means the region decision is durable and 023J is no longer blocked merely because the target is Singapore. It does not mean 023J target/provider/recovery authority is complete or any remote/production action is approved.

============================================================
FILE: planning/sprints/023K-singapore-region-authority-amendment-and-023J-unblock/blueprint.md
============================================================

# Sprint 023K - Singapore Region Authority Amendment And 023J Unblock Blueprint

## Phase 1 - Controlled Baseline

1. Verify exact 023J worktree/branch/HEAD, clean index and controlled planning-only changes.
2. Verify no source, migration, configuration or remote action occurred.
3. Apply and verify all four Sprint 023K files.

## Phase 2 - Durable Authority Addendum

1. Create the canonical 023K amendment document.
2. Record exact region `ap-southeast-1` and location Singapore.
3. Record Sydney-only supersession and international-processing implication.
4. Preserve historical 023C/023D records rather than silently rewriting them.

## Phase 3 - Active 023J Reconciliation

1. Replace active Sydney-only requirements with approved Singapore requirements.
2. Remove active Singapore-fails stop wording.
3. Preserve exact-target, non-production, synthetic-data, operator, rollback, provider/privacy, recovery, commit and external-mutation controls.
4. Reconcile 023J closeout chronology without falsely completing it.

## Phase 4 - Planning And Validation

1. Update decision/risk/question/state/briefing/schedule/index records.
2. Scan active 023J files for contradictory region wording.
3. Validate Pack format, JSON, approved paths and `git diff --check`.
4. Prove no source/migration/provider/remote change.

## Phase 5 - Closeout

1. Produce three required 023K reviews.
2. Close with one allowed outcome.
3. Leave work uncommitted and do not resume 023J until separately instructed.

============================================================
FILE: planning/sprints/023K-singapore-region-authority-amendment-and-023J-unblock/acceptance.md
============================================================

# Sprint 023K - Singapore Region Authority Amendment And 023J Unblock Acceptance

## Authority Record

- [ ] Canonical addendum records exact approved region `ap-southeast-1` Singapore.
- [ ] Aprec8 acceptance is dated and stated unambiguously.
- [ ] Prior mandatory Sydney `ap-southeast-2` requirement is explicitly superseded.
- [ ] Singapore region alone is explicitly not a delivery/implementation blocker.
- [ ] International/overseas processing is acknowledged accurately.
- [ ] No Australian-only storage claim remains active.
- [ ] Historical 023C/023D records remain unchanged and are referenced as superseded on region only.

## Sprint 023J Reconciliation

- [ ] All four active 023J sprint files require exact Singapore `ap-southeast-1` instead of Sydney.
- [ ] No active 023J clause says `ap-southeast-1` fails merely because it is Singapore.
- [ ] Exact Supabase/Vercel target authority remains required.
- [ ] Non-production/synthetic-only classification remains required for 023J.
- [ ] Operator, rollback, provider/privacy, recovery, clean-commit and mutation controls remain required.
- [ ] Production mutation remains outside 023K and 023J is not falsely marked complete.
- [ ] 023J closeout records regional supersession and exact remaining blockers.

## Scope And Validation

- [ ] Only approved documentation/planning files changed.
- [ ] No source, migration, package, lockfile, configuration, provider or external state changed.
- [ ] No Supabase/Vercel access, project creation, secret, Storage, migration application or deployment occurred.
- [ ] Active/historical region-wording scan passes.
- [ ] Architect Pack and JSON checks pass.
- [ ] `git diff --check` passes.
- [ ] Nothing is staged or committed.

## Closeout Outcomes

Close with exactly one:

- `singapore-region-authority-recorded-023J-region-unblocked-clean`: durable amendment and active 023J reconciliation pass with no external/source mutation.
- `singapore-region-amendment-baseline-blocked-clean`: controlled 023J worktree cannot be established; no reconciliation begins.
- `singapore-region-amendment-conflict-blocked-clean`: supplied authority cannot be reconciled without changing another governing privacy/access decision; no active gate is silently removed.
- `singapore-region-amendment-validation-blocked-clean`: amendment exists but active wording, scope, chronology or validation does not pass.

No outcome authorizes production mutation, proves provider/recovery readiness, completes 023J, enables scanning/CSV, or claims production readiness.

============================================================
FILE: planning/sprints/023K-singapore-region-authority-amendment-and-023J-unblock/handoff-prompt.md
============================================================

# Sprint 023K - Builder Handoff Prompt

You are Builder for Sprint 023K - Singapore Region Authority Amendment And 023J Unblock.

Apply and verify these four files in the existing isolated Sprint 023J worktree at `C:\tmp\pnr-023j-provider-remote-storage-and-hosted-proof` on branch `codex/023J-provider-remote-storage-and-hosted-proof` and HEAD `ae5470cb79e7f41f7a8ce30a7ce07e2c796897a9`.

Record Aprec8's binding amendment exactly: Supabase `ap-southeast-1` Singapore is accepted and approved for maintaining this project/environment and must not itself block continued work. Create a canonical addendum, preserve historical records, and reconcile all active Sprint 023J Sydney-only clauses.

Hard-code active regional authority to `ap-southeast-1`. Do not retain `ap-southeast-2` as an active requirement or describe Singapore as Australian storage.

Preserve every non-regional control: exact target identity, non-production/synthetic classification, matching Vercel target, operator, rollback, provider/privacy review, Storage recovery, clean commit, fail-closed safety, disabled CSV and external mutation boundaries.

Do not edit source/migrations/configuration, access Supabase/Vercel, create projects/secrets/Storage, apply migrations, deploy, stage, commit, push, merge or resume 023J external work inside this sprint.

Finish with one allowed outcome and report the exact remaining 023J inputs needed after the Singapore regional blocker is removed.
