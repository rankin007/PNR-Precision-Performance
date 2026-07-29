# Sprint 031 Acceptance

## Source, target and safety

- [ ] Exact Sprint 030 integrated worktree, branch, HEAD, dirty manifest and outcome are recorded.
- [ ] Pre-existing Sprint 025–030 paths, migrations, lockfile and references are frozen and preserved except documented in-scope corrections/shared additions.
- [ ] Exact generated Vercel Preview has no Production custom-domain alias.
- [ ] Exact approved Singapore Supabase project and ledger `0001`–`0021` are proven without secret values.
- [ ] Initial exact-owned Auth/application/Storage state is zero and creation ceilings/ownership ledger are active.
- [ ] All fixtures are visibly synthetic and contain no real person, horse, stable, customer, payment or clinical data.

## Authentication and authorization

- [ ] Anonymous protected routes redirect safely.
- [ ] Active administrator, record writer and read-only identities bootstrap correctly.
- [ ] Assigned/authorized horse visibility and actions agree with existing permissions.
- [ ] Wrong-horse/cross-stable data, counts, ordering, routes and actions are denied.
- [ ] Inactive/non-member or equivalent denial passes.
- [ ] Revoked session loses access and cannot continue protected actions.
- [ ] No role, permission, RLS or assignment semantics changed.

## Capture and persistence

- [ ] Phone and desktop capture cover horse, date/time, five raw measurements, context, review and submit.
- [ ] Five raw values map correctly to four lookup inputs.
- [ ] Validation, correction, pending/retry and duplicate-submit prevention pass.
- [ ] Non-empty typed notes require review confirmation and editing invalidates confirmation.
- [ ] Device-keyboard dictation is described accurately; no application audio path exists.
- [ ] Persisted record belongs to the exact horse and acting user.
- [ ] Production-authority absence produces safe unavailable output rather than fixture classification.
- [ ] Any observed timing records sample/device/network/setup and is not promoted to an under-60-second claim.

## Results, history and workspace

- [ ] Current result retains safe label/value/context and authority/version metadata.
- [ ] Historical snapshots are not reinterpreted by current rules.
- [ ] Compatible literal change and incompatible/missing history treatments pass.
- [ ] Trend/history navigation and accessible alternative pass where implemented.
- [ ] Dashboard represents complete, incomplete and unavailable/empty synthetic horses correctly.
- [ ] Incomplete reason and next action are deterministic and permission-aware.
- [ ] Clinical priority remains unavailable and ordering neutral.
- [ ] Read-only users do not receive write actions.
- [ ] No inaccessible record influences bounded 100-horse/200-test aggregation.

## Evidence lifecycle

- [ ] Permitted synthetic file type/size/declaration and safety authority checks pass.
- [ ] Unknown/blocked/unacknowledged evidence fails closed.
- [ ] Integrated upload/finalise/authorized-access action chain passes where authority permits.
- [ ] Wrong-horse/cross-stable evidence access is denied.
- [ ] Cancellation/retry/idempotency and soft-delete/removal pass where applicable.
- [ ] CSV remains unavailable if still disabled.
- [ ] No public/unrestricted object URL or unowned Storage object is created.
- [ ] Reused Sprint 023L evidence is explicitly mapped to unchanged equivalent contracts.

## Intentional unavailable boundaries

- [ ] Production thresholds and trainer recommendations remain unavailable.
- [ ] Clinical-priority ranking remains unavailable.
- [ ] Application microphone, recording, audio storage and transcription remain absent.
- [ ] Pricing/commerce remains disabled-safe with zero Stripe session/order/payment mutation and webhook `503`.
- [ ] Enquiry presentation is not claimed to transmit if still non-submitting.
- [ ] Unavailable states are clear, accessible and not reported as implemented capability.

## Accessibility, responsiveness and failure

- [ ] Phone, tablet and desktop layouts pass without horizontal page overflow.
- [ ] Keyboard-only traversal, visible focus, headings, landmarks, labels and accessible action names pass.
- [ ] Status is not communicated by colour alone.
- [ ] 200% zoom/reflow or equivalent rendered proof passes.
- [ ] Loading, empty, missing, stale, partial, denied, unavailable and error states remain distinct.
- [ ] Interrupted/retried actions and expired/revoked sessions fail safely.
- [ ] No unsafe diagnosis, treatment, supplement, performance or guarantee language appears.

## Cleanup and non-production boundary

- [ ] Exact-owned evidence objects and application fixtures are removed dependency-safely.
- [ ] Sessions and Auth identities are removed/revoked last.
- [ ] Final exact-owned Auth/application/Storage state is `0/0/0`, with no run/recovery orphans.
- [ ] Migration ledger, non-owned data, Production Supabase/Vercel state and all Stripe state are unchanged.
- [ ] Protected processes/browser contexts and temporary secret material are cleared.
- [ ] No Production deployment, alias/domain movement, public reopening, stage, commit, push, merge or PR occurred.

## Validation and recommendation

- [ ] Focused Sprint 031 harness/fixture/output/cleanup tests pass.
- [ ] Maintained Sprint 021/022/025–030 and canonical validation matrix passes.
- [ ] TypeScript, ESLint, production build and local route smoke pass.
- [ ] Authenticated rendered Preview matrix covers the primary happy path plus denial, revocation, unavailable and failure slices.
- [ ] `git diff --check`, approved-path, migration/lockfile identity and secret/private-data/claim/artifact scans pass.
- [ ] Every matrix result names evidence class; substitute proof is at least equivalent and documented.
- [ ] Live-acceptance recommendation separates passed capabilities, accepted limitations, residual risks and material blockers.
- [ ] Durable planning state and Architect briefing agree on the exact outcome.

## Acceptable outcomes

`end-to-end-preview-field-trial-passed-clean` when the integrated authenticated/rendered matrix, governed evidence chain, unavailable boundaries and final zero cleanup all pass, supporting Production release planning with documented limitations.

`end-to-end-preview-field-trial-passed-with-accepted-limitations-clean` when all safety/integrity/permission/cleanup boundaries pass and only already-declared unavailable authority/provider/commerce capabilities remain limitations.

`end-to-end-field-trial-contract-expansion-required-clean` when a material product/schema/RLS/permission/provider/authority change outside scope is required.

`end-to-end-field-trial-target-or-transport-blocked-clean` when exact non-production target/protected transport cannot be established after safe alternatives, before ungoverned mutation.

`end-to-end-field-trial-failed-restored-clean` when a material functional, authorization, privacy, integrity or accessibility boundary fails but all exact-owned state is restored to zero.

`end-to-end-field-trial-cleanup-blocked` only when exact-owned remote state cannot be proven restored after exhausting safe cleanup mechanisms; this is a material stop requiring immediate explicit reporting.
