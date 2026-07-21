# Sprint 021E - Authenticated Role, RLS, And Application Proof Acceptance

## Scope, Source, And Target Safety

- [x] Sprint identity is consistently `021E-authenticated-role-rls-and-application-proof`. — **pass**: applied sprint folder and final 021E manifest/results.
- [ ] Exact dirty-worktree inventory and proof-source hashes are recorded before and after testing with no implementation drift. — **not-run**: opening hashes were recorded, but authenticated testing never started and no post-test hash comparison was performed.
- [x] Candidate equals `uvskssaecdhxcgytkasc`; old and unexpected projects are refused. — **pass**: 021E manifest target evidence and harness refusal self-tests.
- [x] Ledger remains 0001-0012; migrations 0011/0012 and structural baseline remain unchanged; no 0013 exists. — **pass**: 021E manifest and 021F authoritative recovery facts.
- [x] No deployment, cutover, production/Vercel/DNS/Stripe action, old-project mutation, package installation, staging, commit, push, or PR occurs. — **pass**: 021E results and 021F review.

## Harness And Protected Handling

- [x] New 021E harness defaults non-mutating and passes all target, run-ID, ceiling, ownership, compensation, cleanup-order, and redaction self-tests. — **pass**: focused harness self-test record; 021F additionally retired all mutation.
- [ ] Protected values are entered only through hidden process-scoped handling and no protected value or fragment is retained. — **fail**: an interactive publishable-key entry exposure was reported; no value was retained, the secret/inbox were unexposed, and the process was cleared.
- [ ] Ten actor sessions are isolated and exact candidate equality is proved without exposing identifiers or tokens. — **not-run**: no actor session was established.
- [x] Temporary callback begins production-only, changes to exactly production plus localhost for the test, and Site URL remains unchanged. — **pass**: callback transition and unchanged Site URL are recorded in the final manifest/results; localhost was later removed.
- [ ] One real passwordless callback succeeds against the candidate local runtime. — **not-run**: no passwordless callback session completed.

## Identity And Fixture Boundaries

- [x] One new valid 021E run ID begins with zero anchors and is never reused. — **pass**: zero-anchor preflight is recorded; `021E-RLS-20260720-01` is abandoned and permanently retired.
- [ ] Exactly ten non-personal identities match the required actor matrix. — **fail**: ten OTP requests were reported, but the authoritative Admin API returned zero persistent Auth users.
- [ ] Exact two-stable/four-horse topology and required role/ownership/assignment relationships are created within ceilings. — **not-run**: no application fixtures were created.
- [ ] At most four biochemistry tests and twelve comments are created; zero uploads or Storage objects are created. — **not-run**: no tests/comments fixture phase ran; authoritative Storage state was zero.
- [ ] Every mutation has exact run ownership, an in-memory ledger entry, and a dependency-safe cleanup path. — **not-run**: authenticated fixture mutation never began; no persistent run-owned state existed.

## Authenticated Positive Matrix

- [ ] Administrator global read and bounded administration/comment-removal cases pass. — **not-run**: no Administrator session or assertion ran.
- [ ] Trainers pass only their accepted horse/stable record, comment, and lower-role management cases. — **not-run**: no Trainer session or assertion ran.
- [ ] Stable Manager passes accepted Stable A horse/record operations only. — **not-run**: no Stable Manager session or assertion ran.
- [ ] Veterinarian passes explicit cross-stable assigned-horse read/comment cases. — **not-run**: no Veterinarian session or assertion ran.
- [ ] Consultant and Stable Hand pass only their explicit assigned-horse read/comment cases. — **not-run**: no Consultant or Stable Hand session/assertion ran.
- [ ] Owners pass read-only access to their own horses and associated records/comments. — **not-run**: no Owner session or assertion ran.

## Denial Matrix

- [ ] Wrong-horse, same-stable-unassigned, cross-user, and cross-stable denials pass. — **not-run**: authenticated denial testing never started.
- [ ] Trainer self-expansion, peer management, and Administrator/Trainer promotion denials pass. — **not-run**: no Trainer denial assertion ran.
- [ ] Stable Manager security-boundary, ownership-change, role-management, and cross-stable denials pass. — **not-run**: no Stable Manager denial assertion ran.
- [ ] Veterinarian, Consultant, and Stable Hand underlying-record edit denials pass. — **not-run**: no applicable denial assertion ran.
- [ ] Owner edit/comment/comment-mutation/self-assignment/ownership-transfer and other-horse denials pass. — **not-run**: no Owner denial assertion ran.
- [ ] Suspended and anonymous actors receive zero protected application-data access. — **not-run**: suspended/anonymous runtime assertions did not run.
- [ ] Denied application behavior does not disclose inaccessible resource existence. — **not-run**: no denied application route was exercised.

## Comments, Revocation, And Route/RLS Agreement

- [ ] Allowed roles can create bounded plain-text comments only within scope. — **not-run**: no comment creation assertion ran.
- [ ] Author own-edit/soft-delete and Administrator removal pass; cross-author mutation is denied. — **not-run**: no comment mutation assertion ran.
- [ ] Empty and over-2,000-character comments are rejected with zero persistence. — **not-run**: no input-boundary assertion ran.
- [ ] Revocation causes immediate denial on a fresh check while historical attribution remains. — **not-run**: no assignment or revocation was performed.
- [ ] Representative application routes/actions and direct RLS agree for every role class. — **not-run**: no authenticated route/RLS comparison ran.
- [ ] Every mandatory assertion is recorded exactly once with expected/result classes and pass/fail. — **not-run**: the mandatory assertion matrix never started.

## Cleanup And Restoration

- [ ] First assertion failure, if any, stops further matrix work and initiates cleanup. — **not-run**: no authenticated assertion ran or failed.
- [ ] Cleanup preview is exact and within ceilings; ambiguous/broad cleanup is refused. — **not-run**: no persistent owned state existed and cleanup preview did not run.
- [ ] All application fixtures are removed in dependency-safe order and prior values are restored. — **not-run**: no application fixtures or prior-value updates existed; authoritative anchors were zero.
- [ ] Exactly run-owned Auth identities are deleted last; final run-owned Auth and application anchors are zero. — **not-run**: Admin API found zero Auth users, so no identity deletion was necessary; final anchors were zero.
- [x] Auth/Storage baselines are restored and Storage remains unchanged with zero run objects. — **pass**: 021E results and 021F authoritative zero-state reconciliation.
- [x] Local sessions/runtime/process values are cleared and stopped. — **pass**: containment and final 021E results record cleared/stopped process state and no session.
- [x] Localhost callback is removed and the production-only callback/Site URL state is proved. — **pass**: final 021E results and 021F review.
- [x] Ledger/structure/advisor baselines, both-project health, and old-project integrity are confirmed after cleanup. — **pass**: authoritative recovery facts and final manifest; old project was unmutated.

## Outcome And Durable Closeout

- [x] Outcome is exactly authenticated-proof-passed-clean, authenticated-proof-failed-clean, or blocked-clean and matches the evidence. — **pass**: final outcome is `blocked-clean`.
- [x] No passed outcome is claimed after any failed/missing assertion, partial matrix, or incomplete cleanup. — **pass**: authenticated proof is explicitly not started/passed.
- [x] Manifest and results contain only sanitized aliases, counts, result classes, and pass/fail codes. — **pass**: final redacted scan and 021F review.
- [x] Status, state, schedule, progress, briefing, decisions, risks, and questions agree. — **pass**: 021F reconciliation updates and canonical wording checks.
- [x] TypeScript, lint, build, focused tests, harness self-tests, JSON, secret scan, source hashes, approved diff, and `git diff --check` pass as applicable. — **pass**: credential-free checks and final 021F local validation record; no remote test is implied.
- [x] Acceptance accounting matches the outcome: passed-clean has zero unchecked items; failed-clean or blocked-clean explicitly annotates every unchecked item `fail` or `not-run`, with evidence/reason and no silent blank item. — **pass**: this file accounts for all 48 criteria individually.

## Evidence Mapping

- `planning/reviews/021E-authenticated-proof-manifest.md`
- `planning/reviews/021E-authenticated-proof-results.md`
- `planning/reviews/021F-recovery-reconciliation-and-safe-restart-method.md`
- `docs/TEST_AUTH_MAILBOX_AND_PROTECTED_PROCESS_RUNBOOK.md`

Final accounting: **17 pass / 2 fail / 29 not-run / 0 unannotated**.
