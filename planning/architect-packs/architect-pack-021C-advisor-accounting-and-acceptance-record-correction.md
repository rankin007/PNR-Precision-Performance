============================================================
FILE: planning/sprints/021C-advisor-accounting-and-acceptance-record-correction/requirements.md
============================================================

# Sprint 021C - Advisor Accounting And Acceptance Record Correction Requirements

## Purpose

Correct two durable transcription inconsistencies found during Architect review of closed Sprint 021B and complete its acceptance audit trail without changing technical state.

The authoritative 021B disposition table contains 22 distinct database Security Advisor findings, one for each named `SECURITY DEFINER` function. The hosted leaked-password protection exception is separate and is not part of that 22-warning database-advisor arithmetic. Two surrounding statements are wrong:

- `docs/SPRINT_021_PROGRESS.md` says there are 21 database warnings plus the hosted exception; and
- `planning/reviews/021B-structural-reconciliation-and-advisor-disposition.md` says “All 21 functions below” immediately before a 22-row table.

Sprint 021C corrects those statements, records evidence-backed completion of the 021B acceptance criteria, reconciles canonical closeout wording, and closes as **evidence-corrected — structurally-ready unchanged**.

## Workflow Profile

`strict`

## Source Of Truth

- `AGENTS.md`, including the suffix numbering and Architect/Builder handoff rules
- the applied Sprint 021B four-file set
- `planning/reviews/021B-structural-reconciliation-and-advisor-disposition.md`
- `docs/SPRINT_021_PROGRESS.md`
- `planning/STATUS.json`
- `planning/STATE.md`
- `planning/SPRINT_SCHEDULE.md`
- `planning/ARCHITECT_BRIEFING.md`
- the existing 22-row 021B advisor disposition table and recorded 021B validation evidence

## Required Outcomes

1. Correct advisor accounting everywhere to: **22 database Security Advisor warnings, all individually dispositioned, plus one separate hosted Auth leaked-password plan exception that is not included in the 22-warning database count**.
2. Correct “21 functions” to “22 functions” in the 021B reconciliation review without changing any table row, object, disposition, owner, rationale, or reopen condition.
3. Complete the 021B acceptance audit trail using existing 021B evidence only.
4. Reconcile current status, state, schedule, progress, briefing, and directly relevant decision/risk/question wording where necessary.
5. Close Sprint 021C without altering the established 021B **structurally-ready** technical outcome or claiming authenticated readiness.

## In Scope

- read-only comparison of every canonical 021/021B/021C advisor-count statement
- correction of the two known 21-versus-22 transcription errors
- clarification that the hosted leaked-password control is a separate accepted platform-plan exception
- evidence annotation or checkbox completion in the applied 021B acceptance file, supported by the existing 021B review
- a concise correction record at `planning/reviews/021C-advisor-accounting-and-acceptance-record-correction.md`
- updates to current durable planning/status records only where needed for consistent 021C closeout
- pack verification, JSON parsing, targeted text/count validation, secret-pattern scan, approved-file diff inspection, and `git diff --check`

## Approved File Set

Builder may create or update only:

- `planning/reviews/021B-structural-reconciliation-and-advisor-disposition.md`
- `planning/reviews/021C-advisor-accounting-and-acceptance-record-correction.md`
- `planning/sprints/021B-structural-reconciliation-and-closeout/acceptance.md`
- `docs/SPRINT_021_PROGRESS.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/SPRINT_SCHEDULE.md`
- `planning/ARCHITECT_BRIEFING.md`
- directly relevant 021B/021C entries in `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`

The applied 021C sprint files may be checked off or annotated during normal Builder evidence recording. No other file may be edited.

## Correction Rules

- Treat the existing 22-row advisor table as authoritative. Do not add, remove, merge, reorder, rename, or redisposition a warning.
- The correct database-advisor arithmetic is zero errors / 22 warnings / zero suggestions.
- The correct function count is 22, not 21.
- The leaked-password protection exception remains a separate hosted Auth control. It is not warning 23 and must not replace or be combined with any database warning.
- Preserve joint ownership by Randell Rankin and Philip Rankin and all existing reopen conditions.
- Mark or annotate a 021B acceptance item complete only when the existing reconciliation review or other named 021B durable evidence directly supports it.
- If any 021B acceptance criterion lacks evidence, leave it incomplete, record the exact gap, and do not close 021C as fully reconciled.
- Do not rerun remote advisors, candidate queries, health checks, builds, tests, or implementation validation. This sprint reviews already recorded evidence and validates only its own documentation changes.
- Preserve historical wording that is accurate in its original context. Correct only contradictory or current-state wording.

## Hard Prohibitions

Do not:

- edit migration 0011 or 0012, create migration 0013, or change bootstrap, schema, policies, functions, grants, seeds, or data
- edit source code, tests, validation scripts, configuration, infrastructure, application files, dependencies, or environment files
- add, remove, inspect, or alter callbacks
- request, inspect, use, copy, rotate, reveal, or persist credentials, secrets, keys, tokens, sessions, protected environment values, or inbox contents
- create, inspect, update, or delete Auth identities, fixtures, synthetic users, run anchors, or application data
- perform authenticated, runtime, route, RLS-session, callback, revocation, cleanup, or restoration testing
- query or mutate candidate or old-project application data
- deploy, redeploy, change hosted configuration, cut over production, mutate production, reopen public access, change DNS, or perform Stripe actions
- mutate old project `tagnbgkroihagjmvehlx`
- commit, push, or create a pull request unless separately requested

## Durable Numbering And Outcome

- Use `021C-advisor-accounting-and-acceptance-record-correction` consistently for this follow-up.
- Do not reopen Sprint 021 or 021B, create a new `A` suffix, or consume a new numeric sprint.
- Preserve 021B’s outcome as **structurally-ready**.
- Close 021C as **evidence-corrected — structurally-ready unchanged**.
- Authenticated/runtime/callback/fixture proof remains unperformed and requires a separate Architect Pack using Sprint 021D if pursued next.
- Production cutover remains unauthorized.

## Manual Intervention Rule

No manual intervention is expected. If a required evidence source is missing or contradictory beyond the two defined transcription errors, Builder must record what is blocked, evidence checked, exact safe user action, numbered steps, sanitized response required, and subsequent verification. Manual intervention cannot request credentials or expand this documentation-only scope.

============================================================
FILE: planning/sprints/021C-advisor-accounting-and-acceptance-record-correction/blueprint.md
============================================================

# Sprint 021C - Advisor Accounting And Acceptance Record Correction Blueprint

## Phase 1: Establish The Correction Baseline

1. Read the applied 021B sprint files, 021B reconciliation review, Sprint progress report, status, state, schedule, briefing, and relevant decision/risk/question entries.
2. Inventory the dirty worktree and isolate the approved documentation files.
3. Count the advisor table rows and affected function signatures independently. Confirm there are exactly 22 distinct rows/functions.
4. Confirm the hosted leaked-password exception is documented separately and is not a database-advisor table row.
5. Stop if the table itself, recorded advisor totals, or warning dispositions are inconsistent beyond the two known transcription errors.

## Phase 2: Correct Advisor Accounting

1. Change “All 21 functions below” to “All 22 functions below” in the 021B reconciliation review.
2. Change the Sprint progress statement from 21 database warnings plus leaked-password warning to 22 database warnings plus a separate hosted leaked-password exception.
3. Search all canonical current-state files for `21`, `22`, advisor, warning, and leaked-password wording.
4. Correct any directly conflicting current statement while preserving accurate history and the exact 22-row table.
5. Confirm the final canonical formula everywhere: zero database-advisor errors / 22 individually dispositioned database warnings / zero suggestions; hosted leaked-password exception separate.

## Phase 3: Complete The 021B Acceptance Audit Trail

1. Map every 021B acceptance criterion to a precise section of the existing 021B reconciliation review or another named durable 021B record.
2. Mark supported 021B acceptance items complete, optionally adding concise evidence references without changing their meaning.
3. Do not infer completion from the desired outcome. Leave unsupported items open and record them as blockers.
4. Record the mapping and result in the 021C correction review.
5. Confirm acceptance annotation does not rewrite the 021B scope, behavior, or technical outcome.

## Phase 4: Reconcile Durable Closeout

1. Update `STATUS.json` to identify closed Sprint 021C and its evidence-corrected outcome.
2. Reconcile state, schedule, briefing, progress, and directly relevant decision/risk/question wording.
3. Preserve 021B as closed structurally-ready; state that 021C changed documentation only.
4. Preserve all statements that authenticated/runtime/callback/fixture proof was not performed.
5. Identify Sprint 021D as the next valid suffix only if authenticated proof is later chosen.

## Phase 5: Validate And Stop

1. Validate the applied 021C sprint files against the Architect Pack.
2. Parse `STATUS.json` and validate exact current sprint identifier/outcome wording.
3. Run targeted text/count checks proving 22 advisor rows/functions, no current “21 database warning/function” contradiction, and separate hosted exception language.
4. Inspect the approved-file diff, run a secret-pattern scan over changed durable records, and run `git diff --check` for approved files.
5. Confirm no prohibited file or external state changed.
6. Close 021C only if every acceptance item passes; otherwise record the exact blocker and stop.

============================================================
FILE: planning/sprints/021C-advisor-accounting-and-acceptance-record-correction/acceptance.md
============================================================

# Sprint 021C - Advisor Accounting And Acceptance Record Correction Acceptance

## Scope And Numbering

- [ ] Sprint identity is consistently `021C-advisor-accounting-and-acceptance-record-correction`.
- [ ] Sprint 021 and 021B remain closed historical records and no new numeric or `A`-suffix sprint is created.
- [ ] Only approved documentation/planning files are changed and unrelated dirty-worktree changes are preserved.
- [ ] No implementation, migration, bootstrap, test, script, config, environment, remote, deployment, production, callback, credential, Auth, fixture, or old-project action occurs.

## Advisor Accounting

- [ ] The 021B review states that all 22 functions below correspond to the 22 database warnings.
- [ ] The 021B advisor table remains exactly 22 distinct rows with unchanged objects, dispositions, owners, rationales, and reopen conditions.
- [ ] Sprint progress and every current canonical statement report zero database-advisor errors / 22 individually dispositioned database warnings / zero suggestions.
- [ ] The hosted leaked-password protection exception is consistently separate from the 22-warning database-advisor arithmetic.
- [ ] No current canonical statement says there are 21 database warnings/functions or counts the hosted exception as warning 22 or 23.

## Acceptance Audit Trail

- [ ] Every 021B acceptance item is mapped to named existing evidence.
- [ ] Supported 021B acceptance items are marked complete or explicitly annotated with evidence.
- [ ] No unsupported criterion is marked complete; any gap is recorded as blocking.
- [ ] The 021C correction review records the mapping, the two corrected statements, validation, limitations, and prohibited-action confirmation.

## Durable Closeout

- [ ] `STATUS.json`, `STATE.md`, `SPRINT_SCHEDULE.md`, `ARCHITECT_BRIEFING.md`, and `SPRINT_021_PROGRESS.md` agree that 021C is closed **evidence-corrected — structurally-ready unchanged**.
- [ ] Sprint 021B remains **structurally-ready** and no additional technical-readiness claim is introduced.
- [ ] Authenticated/runtime/callback/identity/fixture/revocation/cleanup/restoration proof remains explicitly unperformed.
- [ ] Production cutover remains unauthorized; Sprint 021D is identified only as a future Architect choice for authenticated proof.

## Validation

- [ ] Applied Sprint 021C files match the validated Pack.
- [ ] `STATUS.json` parses and targeted advisor-count/text checks pass.
- [ ] Secret-pattern scan, approved-file diff inspection, and `git diff --check` pass.
- [ ] No secret value or fragment enters output or durable evidence.

============================================================
FILE: planning/sprints/021C-advisor-accounting-and-acceptance-record-correction/handoff-prompt.md
============================================================

# Sprint 021C - Builder Handoff Prompt

You are Builder for Sprint `021C-advisor-accounting-and-acceptance-record-correction` under the `strict` workflow profile.

Read `AGENTS.md`, the applied Sprint 021B files, the 021B reconciliation review, Sprint progress report, status, state, schedule, briefing, and directly relevant decisions/risks/questions before editing.

Correct documentation only. The authoritative 021B table contains exactly 22 distinct database Security Advisor warnings, all individually dispositioned. The hosted leaked-password protection exception is separate and is not included in that 22-warning database count. Correct the two known transcription errors: “21 database warnings” in the progress report and “All 21 functions below” in the 021B review. Do not alter the 22 table rows or their substance.

Complete the 021B acceptance audit trail by mapping every criterion to existing durable evidence and marking only supported criteria complete. Create the 021C correction review, reconcile current canonical records, and close 021C as **evidence-corrected — structurally-ready unchanged**. Preserve 021B as closed structurally-ready.

Do not rerun remote advisors or technical validation. Do not edit source, migrations, bootstrap, tests, scripts, configuration, dependencies, infrastructure, application, or environment files. Do not create migration 0013. Do not change callbacks, request or use credentials, inspect inboxes, create or inspect Auth identities or fixtures, perform authenticated/runtime testing, deploy, cut over production, mutate production, query application data, or mutate old project `tagnbgkroihagjmvehlx`.

Use only existing sanitized evidence. Preserve unrelated worktree changes and accurate historical wording. If evidence does not support an acceptance criterion, record the precise blocker and stop without broadening scope.

Authenticated proof remains unperformed. If the user later chooses it, Architect must plan Sprint 021D separately. Production cutover remains unauthorized.

If manual intervention becomes necessary, record the blocker, evidence checked, exact safe numbered user action, sanitized response required, and what Builder will verify. Never request credentials. Do not commit, push, or create a pull request unless separately requested.
