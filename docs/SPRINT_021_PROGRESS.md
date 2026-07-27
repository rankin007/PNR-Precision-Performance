# Sprint 021 / 021B / 021C / 021D / 021E / 021F Progress Report

Sprint 021G closed **blocked-clean** during protected browser preflight after a no-message-content output violation. No protected value was retained, no fresh run or mutation occurred, Auth/Storage remained zero, and callback state remained production-only. Authenticated proof did not start.

Status: Sprint `021F-recovery-reconciliation-and-safe-restart-method` closed **recovery-reconciled — 021E blocked-clean** on 2026-07-20. Admin API evidence established zero Auth users, zero run/application anchors, and zero Storage artifacts; no deletion was necessary. Production-only callback state is restored. Sprint 021E authenticated proof did not start, and run `021E-RLS-20260720-01` is permanently retired. Any replacement attempt requires a separate 021G-or-later Pack.

## Completed evidence

- Sprint 021 applied migration `0011` once. Lifecycle and policy defects discovered afterward were corrected only through forward-only migration `0012`; `0011` was never modified or reapplied.
- Sprint 021B applied exactly four strict-profile sprint files and audited the completed structural work without editing source, migration, bootstrap, verification, test, script, configuration, application, infrastructure, or environment files.
- Opening and closing migration hashes match. Candidate `uvskssaecdhxcgytkasc` has genuine ledger `0001`-`0012`, with 0011/0012 once and in order and no 0013.
- Candidate structure remains 35/35 public tables with RLS, 87 policies, 11 fixed-path core role helpers with zero anonymous execution, seven role seeds, six comment permission mappings, four comment audit columns, the 2,000-character constraint, three indexes, ownership-history trigger, zero horse/stable DELETE policies, 1,774 lookups, zero Auth users, zero Storage buckets, and zero Storage objects.
- Linked database lint has no errors. Candidate and protected old project `tagnbgkroihagjmvehlx` are `ACTIVE_HEALTHY`; the old project was not selected for application-data access or mutation.
- The current database Security Advisor has 22 individually named authenticated `SECURITY DEFINER` warnings: zero database-advisor errors, 22 individually dispositioned database warnings, and zero suggestions. The hosted Auth leaked-password plan exception is separate and is not included in that 22-warning database count.
- Static role validation, focused role/comment tests, TypeScript, lint, production build, pack checks, JSON parsing, secret scan, migration hashes, approved-file diff inspection, and `git diff --check` pass.
- Full evidence and warning dispositions are in `planning/reviews/021B-structural-reconciliation-and-advisor-disposition.md`.
- Sprint 021C corrected the two 21-versus-22 transcription errors and completed the 021B acceptance audit trail using existing evidence only; it made no technical or external-state change.
- Sprint 021D completed the remaining acceptance audit trail: 21/21 Sprint 021C and 23/23 Sprint 021D criteria are checked with named evidence, leaving zero unchecked items. It made no technical or external-state change.

## Deliberately unperformed

Authenticated positive/denial testing, passwordless callback work, protected runtime setup, identity/fixture creation, application-route proof, comment authorization runtime proof, revocation proof, cleanup, and restoration were outside Sprint 021B and were not performed. Structural readiness does not imply authenticated, runtime, cutover, or production readiness.

If authenticated proof is pursued later, it requires a separate Architect Pack for Sprint 021E.

## Environment limitation

Local container replay is unavailable because this environment has no Docker, PostgreSQL, Podman, or installed WSL distribution. This is not a 021B blocker; the supported integration evidence is the candidate's empty-project origin and genuine sequential ledger 0001-0012.

## Safety state

No callback, credential, key, token, session, inbox, Auth identity, fixture, run anchor, hosted configuration, deployment, production cutover, DNS, Stripe, commit, push, PR, or old-project mutation occurred in 021B. Production cutover remains unauthorized.
# Sprint 021H Closeout

Sprint 021H closed `blocked-clean`. The Pack was applied and the new nonmutating harness, self-tests, manifest, and results record were created. Harness safety passed 15/15; existing static/focused Sprint 021 role checks, lint, and TypeScript passed. Protected dashboard acquisition stopped before secret access after a complete publishable-key value appeared in visible tool output. No fresh run, Auth/application state, fixtures, sessions, callbacks, Storage objects, authenticated assertions, or remote mutations occurred. Email delivery/passwordless callback proof remains not tested.
# Sprint 021I Closeout

Sprint 021I closed `credential-boundary-blocked-clean`. The production build gate passed after one diagnostic rerun and one unchanged confirmation build. No supported exact-candidate protected injection mechanism is available: process injection is absent, local protected configuration targets the refused old project, browser transfer would require prohibited reveal/output handling, and no alternate injector exists. No remote request or mutation occurred. Authenticated role/RLS/application proof remains not performed.
# Sprint 021J Closeout

Sprint 021J closed `authenticated-role-rls-proof-failed-clean`. Target-first provisioning, zero baselines, ten genuine isolated sessions, and bounded fixtures succeeded. The first Administrator direct-RLS horse read returned `HORSE_READ_FAILED_ADMIN`, so the matrix stopped. Exact cleanup restored zero Auth/application/Storage state. Ledger 0001-0012, advisor 0/22/0, both-project health, and production-only callback configuration remain unchanged. Remaining authenticated and application-route proof did not run.
# Sprint 021K Closeout

Sprint 021K closed `diagnosis-complete-blocked-clean`. Minimal controls proved `auth-issued-session-rejected`: Auth returned a session but rejected the same issued token; supported client and REST controls were unauthorized before database/RLS evaluation. The correction requires hosted Auth/JWT investigation outside 021K. No migration/correction occurred, cleanup restored zero Auth/application/Storage state, and ledger remains 0001-0012.

# Sprint 021L Closeout

Sprint 021L closed `provider-escalation-required-clean`. One bounded identity proved candidate Auth issued a valid, current, exact-project authenticated JWT whose asymmetric signing key was advertised by candidate JWKS, while immediate SDK, direct Auth, and Data API verification controls rejected it. This supports `provider-internal-inconsistency` and Branch E; local key pairing, request construction, issuer/time, database/RLS, and application integration were ruled out. No tenant-side correction was safe, the full matrix correctly did not run, and cleanup restored zero Auth/application/Storage state. A sanitized Supabase support bundle records the required operator action.

# Sprint 021M Closeout

Sprint 021M closed `provider-escalation-required-clean`. Two independent provider-directed one-identity attempts began 1,330 seconds apart and consistently reproduced successful exchange followed by unauthorized SDK identity, direct Auth-user, and authenticated Data API verification. The outcome is `provider-internal-inconsistency-persistent`. Correlation identifiers are confined to the sanitized support-escalation record. Both identities were deleted, final Auth/application/Storage state is zero, no hosted correction occurred, and the stable Auth/full-matrix gates did not run.

# Sprint 021O Closeout

Sprint 021O closed `minimal-auth-gate-passed-clean`. After the operator-observed re-enablement of legacy JWT API keys, all three public and all three server aliases passed independent bounded acceptance controls. The declared preference orders selected `PUBLIC_SPRINT01` and `SERVER_SPRINT01`. Two successive fresh minimal Auth chains then passed supported exchange, internal claim-class checks, SDK identity, direct Auth-user verification, authenticated Data API access, and anonymous denial. Each pass began and ended with Auth 0, application 0, and Storage 0. No full role/RLS or application-route matrix ran; Sprint 021P remains separate strict work.

# Sprint 021P Closeout

Sprint 021P closed `direct-authenticated-rls-passed-clean`. Selected-alias runtime equality, fresh development/test loading, and server-only exposure passed. The exact ten-actor, two-stable, four-horse fixture produced 38/38 passing direct authenticated RLS assertions, including scoped positives, cross-scope write denials, role-escalation denials, and suspended/anonymous zero access. Cleanup ran in reverse dependency order with Auth identities last and restored Auth/application/Storage zero. Application routes, comments, revocation, and browser-cookie agreement remain 021Q work.

# Sprint 021Q Closeout

Sprint 021Q closed `comment-authorization-failed-clean`. Its opening credential-free action audit found that comment update and delete classify only the Supabase error result and do not verify exactly one affected row. An RLS-denied peer or cross-author mutation can therefore affect zero rows while the application reports success. The mandatory first-failure stop prevented every hosted request, local server, identity, fixture, comment, session, and revocation step. No 021Q cleanup was required because no remote state was created. Production source remained unchanged; a later strict corrective Pack is required.

# Sprint 021R Closeout

Sprint 021R closed `application-route-agreement-failed-clean`. Comment update and soft-delete now require exactly one returned active row, with focused regressions and a passing production build after the operator cleared generated cache. The bounded hosted proof passed 19 assertions, then stopped because `SUSPENDED` was accepted at `/portal` rather than generically denied. Later route/comment/revocation assertions did not run. Exact reverse-order/Auth-last cleanup restored Auth/application/Storage zero; the old project was not contacted.

# Sprint 021S Closeout

Sprint 021S closed `blocked-clean` before implementation. The Pack requires all initial-Administrator callers to use the full fail-closed actor/global eligibility contract, but the directly callable bootstrap action is outside its approved production file set. Correcting only portal context and Administrator detection would leave direct action invocation incomplete, so Builder refused a partial authorization fix. No source, environment, hosted, fixture, session, key, configuration, or cleanup state changed.

# Sprint 021T Closeout

Sprint 021T closed `initial-admin-concurrency-unproven-clean`. One server-only fail-closed decision now protects both portal fallback and direct bootstrap action, recognizes `administrator` and legacy `admin`, denies uncertainty/history/inactive states, assigns canonical `administrator`, and passes focused local regressions/build. The bounded two-actor control stopped at `BOOTSTRAP_ACTION_MISSING` before claim or concurrency assertions because the built portal response did not expose the expected progressive-enhancement action handle. No retry occurred. Exact Auth-last cleanup restored Auth/application/Storage zero; the main matrix did not run.

# Sprint 021U Closeout

Sprint 021U closed `bootstrap-action-transport-unproven-clean`. The supported browser/DOM capability can submit rendered forms but cannot establish a genuine isolated passwordless actor session without prohibited mailbox/OTP inspection, protected handoff, private framework protocol, dependency installation, or a test-only endpoint. The sprint stopped before browser navigation, hosted requests, identities, fixtures, or mutations. Production source remained unchanged and the ten-actor matrix did not run.

# Sprint 021V Closeout

Sprint 021V closed `atomic-initial-admin-claim-passed-clean`. Reviewed migration 0013 was applied once to the exact candidate and retained. Its authenticated-only, no-argument security-definer RPC serializes all eligibility and mutation work with a transaction advisory lock. Genuine Actor A first/repeat, Actor B sequential, exact reset, and near-simultaneous two-actor controls all passed with exactly one canonical assignment and matching primary role. Exact reverse-order/Auth-last cleanup restored Auth/application/Storage zero. Browser/application-route/comment/revocation proof remains 021W.

# Sprint 021W Closeout

Sprint 021W closed `protected-browser-bridge-unavailable-clean`. Credential-free bridge safety passed 15/15, and installed Chrome 150 proved loopback CDP, isolated context lifecycle, hidden process shutdown, and exact temporary-profile removal. The required loopback passwordless callback is incompatible with the preserved production-only candidate callback allowlist, while 021W forbids changing Auth settings. No Supabase request, actor, fixture, server, application assertion, or hosted cleanup occurred. Browser/application agreement remains future 021X work.

# Sprint 021X Closeout

Sprint 021X closed `protected-session-cookie-bridge-unavailable-clean`. Its safety suite passed 22 checks and confirmed the installed SSR adapter/browser capability, isolation, cookie-origin/options, refusal, ceilings, and cleanup rules. The production-built application cannot load the required server-only Supabase key from the accepted environment layout without a prohibited environment or cross-process transfer. No protected value was loaded, no server/browser actor context started, and no hosted request or fixture occurred. Production runtime secret loading and browser application proof move to 021Y.

# Sprint 021Y Closeout

Sprint 021Y closed `production-runtime-configuration-unavailable-clean`. After the exact operator notice, `.next` was absent and `.env.production.local` existed ignored and untracked, but Windows classified the file as a OneDrive reparse point rather than the required ordinary file. First-failure handling stopped before protected schema/equality access, build, runtime/browser start, or hosted contact. No actor, fixture, mutation, or cleanup occurred; 021V remains the latest authoritative hosted final zero.

# Sprint 021Z Closeout

Sprint 021Z closed `browser-bootstrap-agreement-failed-clean`. OneDrive-aware Cloud Files validation, protected schema/equality, one clean production build, client-secret exclusion, runtime readiness, and local safety/validation gates passed. The bounded rendered bootstrap run timed out after exactly one owned actor. No assertion was accepted or retried. Exact recovery removed application rows and Auth last, removed the temporary browser profile, and proved final Auth/application/Storage zero. The main route/comment/revocation matrix did not begin.

# Sprint 021AA Closeout

Sprint 021AA closed `browser-harness-diagnostic-exhausted-clean`. Its instrumented harness passed 29 credential-free safety checks. Exactly three one-actor attempts stopped at fixed runtime/browser-context/CDP infrastructure classes; an exact generated `.next` recovery and unchanged production build passed between attempts 1 and 2. Every attempt restored Auth/application/Storage zero, and final owned ports/profiles are clear. One/two-actor rendered bootstrap and the full route/comment/revocation matrix were not run.

# Sprint 021AB Closeout

Sprint 021AB closed `process-isolated-browser-transport-failed-clean`. Three local-only process/profile/port/page-CDP attempts stopped at `PAGE_ENABLE_TIMEOUT`, `PAGE_ENABLE_TIMEOUT`, and `PAGE_TARGET_DISCOVERY_TIMEOUT`. Exact recovery cleared ports `34200`-`34212` and the owned temporary profile root. Protected loading and Supabase contact remained `none`; no actor or hosted fixture existed, so bootstrap/matrix/revocation were not run.
# Sprint 021AC closeout — 2026-07-27

Sprint 021AC closed `application-correction-scope-exhausted-clean`. Mature Playwright/installed-Chrome isolation and one/two-actor rendered bootstrap passed. Direct RLS passed 38/38 and the rendered ten-actor matrix passed 42/43. Authenticated own soft-delete remained generically denied due to the existing active-row SELECT policy; the required RLS/RPC/schema decision is outside 021AC. All hosted attempts and final cleanup returned Auth/application/Storage `0/0/0`.

## Sprint 021AD closeout — 2026-07-27

021AD closed `blocked-clean` before remote migration. Local 0014/RPC/action contract is implemented and focused checks pass, but two required preserved validators reject the planned change and are outside the approved file set. Hosted state remains `0/0/0`.

## Sprint 021AE closeout — 2026-07-27

021AE closed `rendered-proof-failed-clean`. Validators and all local gates/build passed; migration 0014 was applied once and candidate ledger is `0001`-`0014`. Exact function metadata/grants passed, but the unchanged genuine rendered matrix remained 42/43 because own soft-delete was generically denied. Auth-last cleanup and independent preflight proved final `0/0/0`. A new Architect-approved database authorization design is required.

## Sprint 021AF closeout — 2026-07-27

021AF closed `direct-authorization-proof-failed-clean`. Direct isolation selected Branch B; 0015 applied once; author direct RPC and rendered 48/48 passed. The expanded direct matrix detected an unsafe Owner mutation caused by nullable authorization logic, stopped immediately, and restored `0/0/0`. Ledger remains `0001`-`0015`; a new strict 0016 correction is required.

## Sprint 021AG closeout — 2026-07-27

021AG closed `direct-authorization-proof-failed-clean`. All local gates/build passed and 0016 applied once; ledger is `0001`-`0016`, function metadata/grants passed, the policy count stayed three, and the second dry run was clean. The genuine direct matrix stopped at the first active-author positive (`0/1`), so rendered proof did not run. Auth-last cleanup and independent preflight proved final `0/0/0`. Preserve 0014–0016 and require a strict additive 0017 diagnostic/correction Pack.

## Sprint 021AH closeout — 2026-07-27

021AH closed `supabase-application-proof-complete-clean`. A one-shot author diagnostic classified 0016 as a syntax/resolution error with no mutation. Migration 0017 replaced only the exact RPC using valid exact-true SQL; ledger is `0001`-`0017`, metadata/expression/grant/policy checks and the second dry run passed. Direct authorization passed 17/17 before the unchanged rendered matrix passed 48/48. Auth-last cleanup and independent final preflight proved `0/0/0`.
