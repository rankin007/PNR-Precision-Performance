============================================================
FILE: planning/sprints/021D-acceptance-audit-trail-closeout/requirements.md
============================================================

# Sprint 021D - Acceptance Audit Trail Closeout Requirements

## Purpose

Complete the documentation-only acceptance audit trail left open after Sprint 021C. Sprint 021C correctly reconciled the advisor accounting and completed all 26 Sprint 021B acceptance items, but its own acceptance checklist remained unchecked despite its declared completed outcome.

Sprint 021D maps every 021C acceptance criterion to existing durable evidence, marks only supported criteria complete, validates canonical closeout consistency, and ensures the 021D acceptance record itself is also evidence-mapped and checked before 021D closes.

This sprint changes no technical state. Sprint 021B remains **structurally-ready** and Sprint 021C remains **evidence-corrected — structurally-ready unchanged**.

## Workflow Profile

`strict`

## Source Of Truth

- `AGENTS.md`, including suffix numbering and Architect/Builder handoff rules
- the applied Sprint 021B and 021C four-file sets
- `planning/reviews/021B-structural-reconciliation-and-advisor-disposition.md`
- `planning/reviews/021C-advisor-accounting-and-acceptance-record-correction.md`
- `planning/sprints/021B-structural-reconciliation-and-closeout/acceptance.md`
- `planning/sprints/021C-advisor-accounting-and-acceptance-record-correction/acceptance.md`
- `docs/SPRINT_021_PROGRESS.md`
- `planning/STATUS.json`, `planning/STATE.md`, `planning/SPRINT_SCHEDULE.md`, and `planning/ARCHITECT_BRIEFING.md`

## Required Outcomes

1. Map every Sprint 021C acceptance criterion to named existing evidence.
2. Mark every evidence-supported 021C criterion complete; leave unsupported criteria open and block closure.
3. Create a durable 021D closeout review recording the evidence map, validation, limitations, and prohibited-action confirmation.
4. Complete and check the Sprint 021D acceptance record itself before declaring 021D closed.
5. Reconcile canonical records to close 021D as **acceptance-audit-complete — structurally-ready unchanged**.
6. Preserve authenticated proof as unperformed and reserve Sprint 021E for that work only if later chosen.

## In Scope

- read-only review of the applied 021C files and existing 021B/021C durable evidence
- evidence annotations and checkbox completion in the Sprint 021C acceptance record
- evidence annotations and checkbox completion in the applied Sprint 021D acceptance record
- a new review at `planning/reviews/021D-acceptance-audit-trail-closeout.md`
- reconciliation of current status, state, schedule, progress, briefing, and directly relevant decision/risk/question entries
- pack format/application-match verification before acceptance annotation
- JSON parsing, checkbox counts, targeted sprint/outcome/advisor wording checks, secret-pattern scan, approved-file diff inspection, and `git diff --check`

## Approved File Set

Builder may create or update only:

- `planning/sprints/021C-advisor-accounting-and-acceptance-record-correction/acceptance.md`
- `planning/sprints/021D-acceptance-audit-trail-closeout/acceptance.md`
- `planning/reviews/021D-acceptance-audit-trail-closeout.md`
- `docs/SPRINT_021_PROGRESS.md`
- `planning/STATE.md`
- `planning/STATUS.json`
- `planning/SPRINT_SCHEDULE.md`
- `planning/ARCHITECT_BRIEFING.md`
- directly relevant 021C/021D entries in `planning/DECISIONS.md`, `planning/RISKS.md`, and `planning/QUESTIONS.md`

The applied 021D requirements, blueprint, and handoff files must remain unchanged. No other file may be edited.

## Acceptance Evidence Rules

- Count the 021C acceptance criteria before editing and record the checked/unchecked totals.
- Map each criterion to a precise section of the existing 021C review or another named durable record.
- Do not mark a criterion complete from the desired outcome alone.
- If any criterion lacks direct evidence, leave it unchecked, record the gap, and stop without declaring 021D complete.
- Add a concise evidence-mapping section to the 021C acceptance record without changing criterion meaning.
- Validate the 021D Architect Pack match immediately after application and before annotating the applied 021D acceptance file.
- Map each 021D acceptance criterion to evidence generated during 021D, then check it only after the supporting check passes.
- At closeout, both the 021C and 021D acceptance files must contain zero unchecked criteria.
- Record that post-application evidence annotations intentionally change the two acceptance files after initial exact pack matching; requirements, blueprint, and handoff must continue to match the Pack.

## Canonical Facts To Preserve

- Database Security Advisor: zero errors / 22 individually dispositioned database warnings / zero suggestions.
- The 22 warnings correspond to 22 distinct named `SECURITY DEFINER` functions.
- Hosted Auth leaked-password protection is a separate accepted Free-plan/passwordless exception and is not included in the 22-warning database count.
- Sprint 021B remains closed structurally-ready.
- Sprint 021C remains closed evidence-corrected — structurally-ready unchanged.
- Authenticated/runtime/callback/identity/fixture/revocation/cleanup/restoration proof remains unperformed.
- Production cutover remains unauthorized.

## Hard Prohibitions

Do not:

- rerun remote advisors, candidate queries, project-health checks, builds, tests, static validators, or implementation validation
- edit source, migrations, bootstrap, verification SQL, tests, scripts, dependencies, configuration, infrastructure, application, or environment files
- edit migrations 0011/0012, create migration 0013, or modify schema, policies, functions, grants, seeds, or data
- add, remove, inspect, or change callbacks
- request, inspect, use, copy, rotate, reveal, or persist credentials, secrets, keys, tokens, sessions, protected environment values, or inbox contents
- create, inspect, update, or delete Auth identities, fixtures, synthetic users, run anchors, or application data
- perform authenticated, runtime, route, RLS-session, callback, revocation, cleanup, or restoration testing
- query or mutate candidate or old-project application data
- deploy, redeploy, change hosted configuration, cut over production, mutate production, reopen public access, change DNS, or perform Stripe actions
- mutate old project `tagnbgkroihagjmvehlx`
- commit, push, or create a pull request unless separately requested

## Durable Numbering And Outcome

- Use `021D-acceptance-audit-trail-closeout` consistently.
- Do not reopen Sprint 021, 021B, or 021C; do not create a new `A` suffix or consume a new numeric sprint.
- Close Sprint 021D as **acceptance-audit-complete — structurally-ready unchanged** only when both 021C and 021D acceptance files have zero unchecked criteria.
- If authenticated proof is later desired, it requires a separate Sprint 021E Architect Pack.

## Manual Intervention Rule

No manual intervention is expected. If evidence is missing or contradictory, Builder must record the blocker, evidence checked, exact safe user action, numbered steps, sanitized response required, and subsequent verification. Manual intervention cannot request credentials or expand this documentation-only scope.

============================================================
FILE: planning/sprints/021D-acceptance-audit-trail-closeout/blueprint.md
============================================================

# Sprint 021D - Acceptance Audit Trail Closeout Blueprint

## Phase 1: Establish Baseline

1. Read all required source-of-truth files and inventory the dirty worktree.
2. Confirm the Sprint 021C acceptance file is the only incomplete predecessor checklist.
3. Count and record all 021C checked and unchecked criteria.
4. Confirm canonical advisor accounting and 021B/021C outcomes remain internally consistent.
5. Apply no correction outside the approved documentation set.

## Phase 2: Complete Sprint 021C Acceptance

1. Map every 021C criterion to a precise section in the 021C correction review or another named durable record.
2. Mark only directly supported criteria complete.
3. Add a concise evidence-mapping section to the 021C acceptance record.
4. Recount the checklist and require zero unchecked criteria.
5. If any evidence gap exists, record it and stop without closing 021D.

## Phase 3: Create The 021D Closeout Record

1. Record initial and final 021C checkbox totals.
2. Record the criterion-group evidence map and whether every criterion is supported.
3. Record the exact 021D approved files changed.
4. Record validation results, limitations, canonical facts preserved, and prohibited-action confirmation.
5. State explicitly that no technical or external-state validation was rerun.

## Phase 4: Complete Sprint 021D Acceptance

1. Verify the applied 021D requirements, blueprint, acceptance, and handoff files initially matched the validated Pack.
2. Run each documentation-only validation required by 021D.
3. Map every 021D acceptance criterion to the 021D review or named validation evidence.
4. Mark each supported 021D criterion complete and add a concise evidence-mapping section.
5. Require zero unchecked 021D criteria before closeout.

## Phase 5: Reconcile Canonical Closeout

1. Update `STATUS.json` to Sprint `021D-acceptance-audit-trail-closeout` with status `acceptance-audit-complete-structurally-ready-unchanged`.
2. Reconcile state, schedule, progress, briefing, and directly relevant decision/risk/question entries.
3. Preserve the established 021B/021C outcomes and advisor accounting.
4. Preserve authenticated proof as unperformed and production cutover as unauthorized.
5. Identify Sprint 021E only as the future suffix for authenticated proof if chosen.

## Phase 6: Validate And Stop

1. Parse `STATUS.json` and verify exact sprint/outcome wording.
2. Count both acceptance files and require zero unchecked criteria.
3. Run targeted checks for the 22-warning database count, separate hosted exception, unchanged 021B/021C outcomes, and 021E future wording.
4. Run secret-pattern scan, approved-file diff inspection, and `git diff --check` over approved files.
5. Confirm requirements, blueprint, and handoff still match the Pack and acceptance-file changes are evidence annotations only.
6. Confirm no prohibited file or external state changed, close 021D, and stop.

============================================================
FILE: planning/sprints/021D-acceptance-audit-trail-closeout/acceptance.md
============================================================

# Sprint 021D - Acceptance Audit Trail Closeout Acceptance

## Scope And Numbering

- [ ] Sprint identity is consistently `021D-acceptance-audit-trail-closeout`.
- [ ] Sprint 021, 021B, and 021C remain closed historical records; no numeric or `A`-suffix sprint is created.
- [ ] Only approved documentation/planning files are changed and unrelated dirty-worktree changes are preserved.
- [ ] No technical, remote, credential, callback, Auth, fixture, migration, deployment, production, or old-project action occurs.

## Sprint 021C Acceptance Completion

- [ ] Initial 021C checked/unchecked criterion totals are recorded.
- [ ] Every 021C criterion is mapped to precise existing evidence.
- [ ] Only evidence-supported 021C criteria are checked.
- [ ] The final 021C acceptance file has zero unchecked criteria and includes an evidence map.
- [ ] No 021C scope, behavior, advisor disposition, or technical outcome is changed.

## Sprint 021D Audit Trail

- [ ] The 021D review records evidence mapping, changed files, validation, limitations, and prohibited-action confirmation.
- [ ] Applied 021D files initially matched the validated Pack before acceptance annotation.
- [ ] Every 021D criterion is mapped to named evidence and only supported criteria are checked.
- [ ] The final 021D acceptance file has zero unchecked criteria and includes an evidence map.

## Canonical Closeout

- [ ] Canonical records agree that 021D is closed **acceptance-audit-complete — structurally-ready unchanged**.
- [ ] Sprint 021B remains structurally-ready and Sprint 021C remains evidence-corrected — structurally-ready unchanged.
- [ ] Advisor accounting remains zero database-advisor errors / 22 database warnings / zero suggestions, with the hosted exception separate.
- [ ] Authenticated/runtime/callback/identity/fixture/revocation/cleanup/restoration proof remains unperformed.
- [ ] Production cutover remains unauthorized and Sprint 021E is only a future Architect choice for authenticated proof.

## Validation

- [ ] `STATUS.json` parses and exact sprint/outcome checks pass.
- [ ] Both acceptance files contain zero unchecked criteria.
- [ ] Targeted wording/count, secret-pattern, approved-file diff, and `git diff --check` validations pass.
- [ ] Requirements, blueprint, and handoff remain Pack-identical; acceptance changes are evidence annotations only.
- [ ] No secret value or fragment enters output or durable evidence.

## Evidence Mapping

Builder must replace this instruction with concise references to the final 021D review sections and validation evidence, then check every supported criterion above. Sprint 021D must not be declared complete while any checkbox remains unchecked.

============================================================
FILE: planning/sprints/021D-acceptance-audit-trail-closeout/handoff-prompt.md
============================================================

# Sprint 021D - Builder Handoff Prompt

You are Builder for Sprint `021D-acceptance-audit-trail-closeout` under the `strict` workflow profile.

Read `AGENTS.md`, the applied Sprint 021B and 021C files, their reviews, both acceptance records, and current status/state/schedule/progress/briefing records before editing.

Complete documentation only. Map every unchecked Sprint 021C acceptance criterion to existing evidence and check only supported items. Create the 021D closeout review. Then map and check every Sprint 021D acceptance criterion against evidence produced during this sprint. Both 021C and 021D acceptance files must contain zero unchecked criteria before you declare 021D closed.

Verify all four applied 021D files match the Pack immediately after application and before annotating acceptance. After annotation, requirements, blueprint, and handoff must remain Pack-identical; only the acceptance file may differ through checkbox and evidence-map completion.

Close 021D as **acceptance-audit-complete — structurally-ready unchanged**. Preserve Sprint 021B as structurally-ready and Sprint 021C as evidence-corrected — structurally-ready unchanged. Preserve zero database-advisor errors / 22 individually dispositioned database warnings / zero suggestions, with the hosted Auth leaked-password exception separate.

Do not rerun remote advisors, candidate queries, health checks, builds, tests, static validators, or implementation validation. Do not edit source, migrations, bootstrap, verification, tests, scripts, dependencies, configuration, infrastructure, application, or environment files. Do not create migration 0013. Do not change callbacks, request or use credentials, inspect inboxes, create or inspect Auth identities or fixtures, perform authenticated/runtime testing, deploy, cut over production, mutate production, query application data, or mutate old project `tagnbgkroihagjmvehlx`.

Authenticated proof remains unperformed. If later chosen, it requires a separate Sprint 021E Architect Pack. Production cutover remains unauthorized.

If evidence is missing, record the precise blocker and stop without checking the unsupported criterion or broadening scope. If manual intervention becomes necessary, record the blocker, evidence checked, exact safe numbered user action, sanitized response required, and what Builder will verify. Never request credentials. Do not commit, push, or create a pull request unless separately requested.
