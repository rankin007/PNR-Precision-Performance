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
