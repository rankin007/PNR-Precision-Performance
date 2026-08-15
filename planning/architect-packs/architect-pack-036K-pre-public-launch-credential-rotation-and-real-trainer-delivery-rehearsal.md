# Architect Pack - Sprint 036K Pre-Public-Launch Credential Rotation And Real Trainer Delivery Rehearsal

Created: 2026-08-12
Workflow profile: strict
Flight class: critical
Execution boundary: bounded Production credential-class disposition, protected Auth identity disposition, one real trainer delivery rehearsal, exact compensation and sanitized evidence

This Pack creates one strict Builder sprint. The user confirmed that one real trainer will be available and approved the conservative credential, identity and delivery contract on 2026-08-12. The Pack does not itself apply, inspect or expose a credential, change a provider, mutate an Auth identity, send a sign-in message, deploy, move an alias, stage, commit or push.

============================================================
FILE: planning/sprints/036K-pre-public-launch-credential-rotation-and-real-trainer-delivery-rehearsal/requirements.md
============================================================

# Sprint 036K Requirements

## Outcome

Resolve the pre-public-launch security and delivery obligation left by Sprint 036L without weakening its accepted Production boundary:

1. classify the finite historically at-risk non-public credential classes by metadata only and rotate, revoke or prove inactive every safely attributable configured class;
2. give both preserved excluded Supabase Auth identities an owner-governed, privacy-safe disposition without guessing, merging or selecting by position;
3. deliver one normal sign-in to one available real trainer through private entry, prove the permitted Production journey with synthetic/private-safe fixtures, and clean every rehearsal-owned artifact; and
4. preserve exact accepted source, five aliases, three binding classes, application authorization and disabled commerce/public-enquiry state, or execute complete proven compensation.

Target outcome: `prelaunch-credentials-identities-and-real-trainer-delivery-complete-clean`.

Permitted safe fallbacks:

- `prelaunch-readiness-blocked-clean`: a material authority, provider capability, target, private-entry, identity-classification or replacement-access gate fails before an unsafe or irreversible write; all completed writes are either accepted exact outcomes or fully compensated and accepted Sprint 036L Production remains intact.
- `prelaunch-readiness-compensated-clean`: an authorized bounded write begins but a downstream gate fails; every sprint-owned reversible mutation is restored or removed, all current aliases/bindings/source remain compatible, trainer/session/rehearsal residue is zero, and exact sanitized residual state is known.
- `prelaunch-readiness-blocked-material`: credential revocation, identity mutation, Production compatibility, privacy, cleanup or compensation cannot be proved safe. Stop immediately and preserve the safest proven state without inventing success.

No fallback may be described as complete, launch-ready or Product Done.

## Approved human authority

The user approved this contract on 2026-08-12 and confirmed that one real trainer will be available during the flight.

- Phillip Norman Rankin remains accountable business, support, privacy and incident owner.
- Randell Rankin remains platform, migration, release and recovery operator.
- Credential rotation/revocation, excluded-identity deletion and retirement of the retained synthetic trainer require exact protected evidence plus the accountable owner decision defined here.
- The real trainer supplies their own private sign-in address/code through a protected interactive surface. Their name, address, phone, code, Auth identifier, horse/stable data and mailbox/provider content must not enter chat, command arguments, logs, screenshots, files or durable evidence.
- The human availability statement does not authorize a second trainer, broad directory inspection, mailbox automation, public enquiry, commerce, or general Production cleanup.

## Credential-class boundary

The only application credential classes eligible for metadata-only classification are:

1. `SUPABASE_SERVICE_ROLE_KEY`;
2. `CRON_SECRET`;
3. `ENQUIRY_ABUSE_HMAC_SECRET`;
4. `PUBLIC_ENQUIRY_SMTP_PASS`;
5. `STRIPE_SECRET_KEY`;
6. `STRIPE_WEBHOOK_SECRET`; and
7. `RAILWAY_API_TOKEN`.

The exact origin is the historical metadata-only finding that repository `.env.example` may have entered OneDrive/version history before repair. Do not inspect that history or try to determine which value appeared. Treat each listed currently configured secret class as potentially exposed; resolve it by exact class and current provider/runtime metadata, never by value, fragment, prefix, hash, timestamp correlation or guess.

For each class, the terminal disposition must be exactly one of:

- `rotated-and-verified`: a fresh provider-supported replacement is privately created, installed through a protected input path, verified in the intended runtime, and the predecessor is revoked/invalidated with no retained plaintext;
- `revoked-not-required`: exact metadata and source prove the class is not required by any current enabled behavior, the provider-side credential is revoked/removed, and the application remains fail-closed;
- `confirmed-inactive-or-absent`: independent provider/runtime metadata proves no current credential/value is active or consumed; no mutation occurs; or
- `blocked-retained`: safe replacement/revocation or exact current target cannot be proved. The sprint cannot reach the target outcome; retain unchanged and close only under a permitted fallback.

Public configuration (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, site/environment markers) is not rotated as a secret. Provider-issued ephemeral Vercel OIDC material is never copied or manually rotated. Custom trainer-auth SMTP/provider controls are not the public-enquiry SMTP class and remain unchanged unless the exact real-delivery path requires only normal consumption. No credential value may be read back, compared, logged or placed in a file.

Replacement access must pass before predecessor revocation. A provider-coupled rotation that would also rotate public keys, JWT signing authority, unrelated credentials, active sessions or unlisted services is outside the exact action unless the provider exposes and the Pack's deterministic tests prove a complete compensated transaction. Otherwise use `blocked-retained` and stop the target outcome.

If a changed Vercel runtime credential requires a new deployment, use only a provider-supported redeploy of exact accepted Sprint 036L deployment/source, with fresh exact source/project/alias proof and no local dirty-worktree publication. At most one redeploy/candidate is permitted. It must begin alias-free, pass immutable safety and reach the five aliases only through the existing fixed compensated transaction. Any mismatch restores all five aliases and every changed binding/class before further work. Do not deploy from canonical local files, create a second candidate or move DNS.

### Seven-row credential mechanism matrix

Before classifying or mutating a class, complete every column below from current source plus fresh target-bound provider/runtime evidence. A missing or unsupported cell is `blocked-retained`; Vercel environment-row absence never proves provider-native absence, revocation or predecessor invalidation.

| Class | Authoritative complete consumers, including still-addressable immutable/old deployments | Create / install / intended-runtime probe | Independent predecessor oracle | Coupling, refusal and compensation |
| --- | --- | --- | --- | --- |
| `SUPABASE_SERVICE_ROLE_KEY` | Current accepted source plus every addressable deployment with Admin/bootstrap/privileged server flows and Supabase project-key authority | Fresh exact-project provider key; process-only install as one complete compatible three-binding set; exact-project Admin probe | Supabase-native predecessor revoke/disable and independent rejection/readback | Refuse public-anon/JWT-signing/session/unrelated-key coupling. Before revoke restore complete bindings and remove replacement; never restore a revoked predecessor. |
| `CRON_SECRET` | Current and every addressable deployment exposing evidence/enquiry internal Cron routes plus scheduled callers | Fresh process-only random secret; exact caller/runtime install; new-secret authorization probe on every addressable consumer without invoking public enquiry | Every addressable consumer rejects the predecessor, or is independently proven incapable of consuming it | Refuse any unprobeable old consumer. Before revoke restore all bindings/callers; after revoke retain replacement and detach incompatible old consumers. |
| `ENQUIRY_ABUSE_HMAC_SECRET` | Current and every addressable deployment that can accept/process enquiry idempotency/abuse state | Fresh process-only random secret; complete consumer install; compatibility probe without enquiry submission | Every addressable consumer rejects/cannot consume predecessor-derived authorization/state; a replaced env row is insufficient | Refuse active-history/immutable-consumer/state-signing coupling that cannot compensate. Restore complete bindings only before revoke. |
| `PUBLIC_ENQUIRY_SMTP_PASS` | Dedicated enquiry SMTP provider credential and every addressable deployment/reference; trainer-auth SMTP excluded | Provider-native fresh credential, exact dedicated install, provider no-send/authentication verification | Provider-native exact predecessor revoke/delete plus independent absence/rejection readback | Refuse shared trainer-auth/account-wide effects. `revoked-not-required` still requires native revoke/absence and fail-closed runtime. |
| `STRIPE_SECRET_KEY` | Disabled Stripe server client in current and every addressable deployment plus provider credential inventory | Provider-native scoped replacement and non-transactional intended-runtime probe only | Stripe-native predecessor revoke/expire plus independent invalidation readback | Refuse public-key/payment/session/account-wide coupling. `revoked-not-required` requires native revoke/absence plus fail-closed runtime; no commerce call. |
| `STRIPE_WEBHOOK_SECRET` | Disabled webhook verifier in every addressable deployment and every endpoint-secret mapping | Provider-native endpoint replacement, exact install, synthetic local signature/runtime proof with no event | Provider-native old endpoint-secret invalidation plus independent rejection/readback | Refuse endpoint recreation/public activation/unlisted endpoint effects. Native revoke/absence plus fail-closed runtime is mandatory. |
| `RAILWAY_API_TOKEN` | Platform-status consumer in every addressable deployment plus Railway token/account inventory | Provider-native exact replacement only for a proven required consumer | Provider-native exact predecessor revoke/delete plus independent absence/rejection readback | Vercel absence/no repo config is insufficient. Unknown provider ownership/access is `blocked-retained`. |

Record one non-secret oracle result per cell/class. Source text, Vercel metadata, a working replacement or failed app request cannot substitute for provider-native predecessor proof. Compensation restores replacements/bindings only before predecessor invalidation. Once revocation is independently proven, never restore that predecessor; retain the verified replacement or stop `blocked-material` if the replacement is unsafe.

## Excluded Auth identity disposition

Start from the Sprint 036L invariant: exactly three Auth identities, exactly one retained governed synthetic identity matched by exact ID plus email hash, and two excluded identities unchanged.

For each excluded identity, the accountable owner must privately provide the exact identity reference or privately confirm the exact protected match through the approved wrapper. Builder reports only a synthetic ordinal and disposition. Selecting by list order, raw email, partial identifier, visible dashboard row, guessed person or count is forbidden.

Each excluded identity must finish as exactly one of:

- `retained-real-authorized`: privately matched to an intended real person, owner-authorized, with an exact application relationship/role decision and no unintended access;
- `deleted-obsolete-clean`: privately confirmed non-real/obsolete, exact application and Storage dependency counts are zero, session revocation precedes Auth deletion, deletion is independently reread and no other identity changes; or
- `unresolved-retained-blocking`: exact person/ownership/dependency authority is unavailable, so the identity remains byte-for-byte unchanged and the sprint cannot claim the target outcome.

Never merge identities. Never modify or delete an identity merely because it is excluded, old, inactive-looking, unconfirmed, or one of two. A real trainer may privately match one excluded identity and have it adopted only after exact owner confirmation and a fail-closed application graph plan. If no existing identity matches the trainer, exactly one new real-trainer Auth identity may be created through the normal provider-supported sign-in path only after protected target confirmation. Duplicate/ambiguous results fail closed.

### Exhaustive identity dependency and session manifest

For each privately exact-matched excluded Auth ID, derive its exact `public.users.id` and `public.member_profiles.id` only through exact equality. Execute a migration-hash-bound manifest derived from every migration `0001`-`0025`; unknown tables, columns, foreign keys or migrations fail closed.

Direct user-reference queries include: `member_profiles.user_id`, `user_membership_levels.user_id`, operational-record creator/recorder columns, `orders/subscriptions/invoices/payments.user_id`, `audit_logs.actor_user_id`, every biochemistry nominated/created/updated/deleted/uploaded user column, `stable_role_assignments.assigned_by_user_id`, `horses.deleted_by_user_id`, `horse_ownership_history.changed_by_user_id`, all evidence registry/attempt/hold/audit user columns, and `user_trend_view_preferences.user_id`.

Profile/indirect queries include `trainers`, `owners`, stable-staff/role and horse-access assignments, trainer/owner horse assignments, every dependent horse/stable operational/history row, every biochemistry test/note/upload and upload lineage, attempt, hold and audit row. Storage joins every upload/attempt `(bucket_id,object_key)` to `storage.objects` and owner metadata where available. Exact zero or exact sprint ownership is required; bucket counts or skipped Storage are insufficient.

Each row emits only table/column class, zero/nonzero and `owned | non-owned | unsupported`. This sprint may not rewrite historical/non-owned dependencies to manufacture zero. Any nonzero, unknown or unsupported cell is `unresolved-retained-blocking`.

Session revocation is separately bounded. Installed Supabase Admin global sign-out requires a valid target-user JWT, not an Auth ID. Deletion therefore requires a protected normal session exact-matched to the target Auth ID, global sign-out using that JWT, and independent refresh/session-reuse rejection before Auth-last deletion. If that exact mechanism is unavailable, retain unresolved. `deleteUser(id)` is not session proof. After zero dependencies/session proof, delete by exact Auth ID last and independently prove `getUserById` absence.

The two excluded-identity write ceiling means at most one Auth terminal mutation per ordinal. Dependency cleanup, exact session revocation and trainer-fixture writes are separately enumerated/bounded; none is hidden inside that ceiling.

## Real trainer delivery rehearsal

Use exactly one real trainer and one bounded rehearsal. Normal application authentication may send exactly one sign-in/OTP message to the trainer's privately entered address. One verification submission is permitted. No resend, mailbox automation, generated Admin link, password, service-role sign-in substitute or agent-visible code is permitted. A provider/cooldown/delivery failure closes safely without retry.

Before delivery:

- exact accepted Sprint 036L source, deployment, five aliases and three binding classes are freshly proved compatible;
- provider and app targets are exact;
- credential dispositions needed by the live path are complete and verified;
- the trainer identity has an exact owner-approved disposition;
- any application profile/membership/horse access uses existing contracts and least privilege;
- one obvious synthetic rehearsal horse/fixture is exact-owned, contains no real customer/horse/stable data, and has a complete cleanup ledger; and
- all negative, privacy, cleanup and compensation tests pass.

The real trainer privately performs the normal journey on a supported phone:

1. open the canonical sign-in surface;
2. privately request and enter the one sign-in code;
3. reach the trainer portal/dashboard;
4. open only the exact synthetic rehearsal horse;
5. reach the permitted data-entry/review surface without submitting a real record;
6. prove a generated wrong horse gives only generic denial;
7. sign out; and
8. confirm signed-out and fresh anonymous portal access redirect to sign-in.

Record only booleans, route classes, sanitized timestamps/durations, viewport class and synthetic labels. Do not record personal identifiers, code/mailbox detail, cookies, protected response bodies or real records. This is delivery/access rehearsal, not O01 under-60 submission proof and not full representative Sprint 035S acceptance.

On success, remove the synthetic rehearsal horse/assignment/application artifacts dependency-safely and prove exact-owned application/Auth/Storage residue. Retain the real trainer identity only if the owner explicitly confirms ongoing access and the exact intended profile/membership/assignment state; otherwise revoke session, delete rehearsal-owned application state, delete rehearsal-created Auth last and prove absence. Retire the prior retained synthetic trainer identity and eight-row graph only after the real trainer journey, exact replacement access and all dependency checks pass; otherwise preserve it unchanged as rollback/support evidence and do not claim the target outcome.

## Production and external-action ceilings

- Provider reads are finite, target-bound and sanitized.
- At most seven credential-class dispositions; no unlisted credential or account mutation.
- At most two excluded-identity disposition writes; no directory-wide cleanup.
- At most one real trainer, one sign-in message, one verification submission and one exact synthetic rehearsal fixture graph.
- At most one provider-supported exact-source redeploy/candidate if a verified credential rotation requires it; otherwise deployment count is zero.
- At most five listed alias writes to candidate and five listed compensation writes; zero DNS changes.
- Public enquiry remains disabled and uninvoked. Commerce/Stripe runtime behavior remains disabled and uninvoked even if an inactive credential is revoked/rotated.
- No schema, migration, RLS, permission, Product behavior, email template, OTP policy, provider delivery policy, public claim or commercial schedule change.
- No commit, push, PR, merge or branch rewrite unless the user separately asks after the sprint.

## Phase-by-phase landing and compensation matrix

Every phase records all state classes below. `accepted-retained` is authorized final state, not residue; `compensated` restores the last proven compatible state. A revoked predecessor is never a compensation target.

| Phase | Replacement env/bindings and predecessor | Candidate/five aliases | Identity/app/Storage/session/fixture | Required landing/readback |
| --- | --- | --- | --- | --- |
| 0 baseline | No write; seven mechanisms and complete three bindings; provider-native predecessor status only | Accepted source/deployment, five aliases, zero candidate | Three-identity projection, retained graph, residue baseline | Exact accepted baseline or stop. |
| 1 prepare | Replacement private/not authoritative; complete affected plan | No writes | No writes | Failure removes replacement and restores pre-revoke bindings; predecessor unchanged. |
| 2 install/probe | Complete affected set installed; all current/old consumers pass; predecessor valid | Redeploy still zero | No writes | Pre-revoke failure restores bindings/removes replacement and rereads 036L. |
| 3 invalidate | Verified replacement authoritative; predecessor provider-native revoke and rejection oracle | Unchanged | No writes | Never restore predecessor; replacement is accepted-retained, otherwise blocked-material. |
| 4 conditional redeploy | Current replacement set only; predecessor remains invalid | Sole alias-free exact-source Ready candidate, immutable safety, five fixed writes | No writes | Failure restores all aliases and compatible current replacement bindings; never predecessor. |
| 5 identity | Credential/predecessor/source/aliases reread | Reread | Each ordinal retained or exact session-revoked then Auth-last deleted; all dependency writes separate | Unsupported/nonzero retains unchanged; reversible partial writes compensate; deleted Auth is never reconstructed. |
| 6 trainer | All credential/routing state reread | Reread | One trainer/session/fixture/message/verification/journey; exact cleanup | Failure cleans exact-owned graph/Storage/session; retain real Auth only by authority, otherwise Auth-last delete if created/owned; no retry. |
| 7 final | Seven dispositions and every revoked predecessor reread | Exact accepted source, one Ready deployment, five aliases, three bindings | Two dispositions; retained real access separate; old synthetic governed-retired or unchanged; zero owned residue | Target only if all pass; otherwise exact clean/compensated/material fallback. |

Ledger states are exactly `not-started | accepted-retained | compensated | removed | revoked-and-invalid | unchanged-blocking | residue`. Final staged, unauthorized-external and residue counts are separate zero targets; authorized replacement bindings, candidate and retained real access are not residue.

## Workflow profile and Flight class

Use `strict`. Flight class is `critical` because the sprint may rotate or revoke credentials, classify/delete Auth identities, send one real authentication message, create/clean bounded Production fixtures and conditionally redeploy/reassign live aliases. It requires an exact Builder plan, genuinely fresh Architect plan review, executable failure/compensation proof, real checks, a distinct fresh implementation inspector and exact closeout/readback.

## Source authority

Use, in order:

1. `AGENTS.md`, 120x Fly doctrine and these four applied sprint files.
2. Sprint 036L applied acceptance/closeout and exact current Production source/deployment/five-alias/three-binding evidence.
3. Sprint 033B operational ownership, incident, rollback and evidence-safety contract.
4. `docs/change password.md`, `docs/OPERATIONS_HANDOFF.md`, `docs/AUTH_RLS_PORTAL_ACCESS.md`, `docs/ENVIRONMENT.md`, `planning/QUESTIONS.md`, `planning/RISKS.md` and current Final Product Acceptance Matrix.
5. Current source, especially the 035K/036J/036L protected identity, session, alias, compensation and privacy-safe controller/tests.
6. Fresh installed CLI/help and exact finite provider metadata. Historical prose never substitutes for current mutable provider, identity, binding or routing truth.

## Task contract

### objective

Resolve the exact pre-launch credential classes and two excluded Auth identities, then prove one privacy-safe normal Production delivery journey for one real trainer with complete fixture/session cleanup and preserved Sprint 036L compatibility.

### owns

Builder may propose the narrowest exact file set from:

- one new non-secret 036K operating/decision document under `docs/`;
- `docs/change password.md`, `docs/OPERATIONS_HANDOFF.md`, `docs/AUTH_RLS_PORTAL_ACCESS.md` and `docs/ENVIRONMENT.md` only for exact sanitized 036K results;
- new pure contract/controller/rehearsal/test files under `scripts/` using a `036K` suffix;
- existing 035K/036J controller/test/wrapper files only for narrow export, exact target binding, privacy-safe input, identity disposition, cleanup or compensation reuse required by the passed plan;
- `scripts/run-validation-suite.mjs` and `package.json` only for focused registration, without dependency/lockfile changes;
- sanitized evidence beneath `evidence/professional-engineering/036K-pre-public-launch-credential-rotation-and-real-trainer-delivery-rehearsal/`;
- `planning/reviews/036K-pre-public-launch-credential-rotation-and-real-trainer-delivery-rehearsal.md`;
- the applied acceptance annotations and mandatory closeout files: `planning/STATE.md`, `planning/STATUS.json`, `planning/DECISIONS.md`, `planning/RISKS.md`, `planning/QUESTIONS.md`, `planning/FINAL_PRODUCT_ACCEPTANCE_MATRIX.md`, `planning/DEFINITION_OF_DONE.md`, `planning/ROADMAP.md`, `planning/SPRINT_SCHEDULE.md`, `planning/SPRINT_LIFECYCLE_LEDGER.md`, `planning/EVIDENCE_INDEX.md`, `planning/ARCHITECT_BRIEFING.md`, `planning/DEFERRED_SCOPE_AND_OWNERSHIP.md` and `delivery_road_map.md`.

Builder must return an exact no-edit file-by-file plan and may leave optional owned files untouched. Any Product/schema/migration/provider-contract file not expressly justified by that plan requires `ask`.

### must_not

Do not expose or request credentials, codes, addresses, identities, cookies, private account data, recovery codes or real horse/stable records in chat/tool output/evidence; inspect repository/OneDrive history for the contaminated value; use raw provider directory/list output; select identity by position/guess; merge identities; delete an unresolved/real identity; rotate public config as a secret; touch trainer-auth SMTP policy, commerce, public enquiry, DNS, schema, migrations, RLS, roles or permissions; deploy from the dirty canonical worktree; make a second deployment/message/verification attempt; retain rehearsal-owned fixtures without exact owner authority; weaken accepted 036L access/denial; stage, commit, push, merge or open a PR.

### acceptance

AC-01 through AC-40 pass. Wrong target, secret/private output, ambiguous identity, unsafe revocation/deletion, partial credential state, unauthorized email/deployment/alias/data effect, failed compensation, real-data contamination, false launch claim or unprovable cleanup is a material stop.

### verification

Run exact counted contract/controller tests; adversarial credential, identity, message-ceiling, privacy, compensation and cleanup cases; retained 036L/role/privacy gates; finite sanitized provider/identity/routing readbacks; one operator-observed real trainer journey when all preconditions pass; typecheck, zero-warning lint, JSON/static/build; fresh critical inspection; and exact staged/external/residue ledgers.

## Evidence-Proportional Execution Standard

Stop only for material target, authority, security, privacy, migration, destructive, integrity, Production, compensation, scope or cleanup risk. Substitute equivalent or stronger safe evidence for supporting-tool failures. Keep in-scope wrapper/controller/test/validator/reporter/formatting/encoding corrections in 036K. Do not create a follow-up solely for browser automation, clipboard control, optional CLI output, renderer, schema dump or redundant proof. Manual intervention is last after protected process-only alternatives. When genuinely required, state the blocked fact, checked evidence, exact private human action, step-by-step instructions and follow-up verification; never ask the trainer or owner to paste protected material into chat.

============================================================
FILE: planning/sprints/036K-pre-public-launch-credential-rotation-and-real-trainer-delivery-rehearsal/blueprint.md
============================================================

# Sprint 036K Blueprint

## Flight evidence

### Class and reason

`critical`: credential replacement/revocation, Supabase Auth identity disposition, one real authentication delivery, bounded Production fixtures and possible exact-source redeploy/live alias compensation can affect security, privacy, access and irreversible external state.

### Acceptance invariant at risk

No potentially exposed configured non-public credential remains silently active; no real or unresolved Auth identity is guessed, merged or deleted; exactly one intended real trainer can receive normal access to only the approved synthetic rehearsal scope; and accepted Sprint 036L source, five aliases, three binding classes, authorization, disabled commerce/public enquiry and cleanup remain exact. Any non-target result must fail closed or compensate completely.

### Affected layers and verified paths

- Historical metadata-only contamination finding -> finite credential-class allowlist -> provider/runtime metadata -> protected replacement/revocation -> exact runtime verification -> predecessor invalidation.
- Private trainer/owner input -> exact Auth identity/hash matching -> excluded-identity disposition -> application profile/membership/assignment -> RLS-permitted portal/horse/workflow.
- Normal sign-in request -> existing Supabase Auth delivery -> private code entry -> SSR session -> dashboard/horse/data-entry -> generic wrong-horse denial -> sign-out/anonymous denial.
- Credential change requiring runtime refresh -> exact accepted 036L provider redeploy -> alias-free immutable candidate -> fixed five-alias transaction -> compatible final source/bindings or complete rollback.
- Exact-owned synthetic fixture/session -> dependency-safe cleanup -> Auth-last where created -> final application/Auth/Storage and temp residue proof.

### Source of truth, transformations and sinks

- The finite name-only credential allowlist and current provider/runtime metadata are the credential-class truth; values are never evidence.
- Provider-supported replacement/revocation status and an intended-runtime behavior check are the rotation sinks.
- Private exact identity matching plus Phillip Norman Rankin's disposition decision is identity authority; position/count/visible row is never authority.
- Existing role/membership/horse-access contracts and Supabase RLS are application authorization truth.
- Sprint 036L exact accepted deployment/source, five aliases and three binding classes are Production compatibility truth.
- Sanitized boolean/count/class results, operator-observed task completion and exact zero-residue readback are evidence sinks.

### Discriminating examples

1. A credential replacement that is installed but leaves the predecessor valid must fail; checking only the new credential would falsely pass rotation.
2. A configured class absent from the finite allowlist must not be mutated; a broad “rotate every secret” implementation must fail scope tests.
3. Two excluded identities with one privately exact-matched real trainer and one unmatched identity must not be treated alike. Count/position deletion would wrongly delete or adopt the unmatched identity.
4. An excluded identity with any application or Storage dependency must fail deletion even if the owner calls it obsolete; an Auth-only check would miss orphaned protected state.
5. A real trainer that can sign in but can open a generated wrong horse, retain a usable session after sign-out or see a fresh anonymous portal must fail the journey.
6. A generated sign-in link or Admin-token substitute must fail even if it reaches the portal; only the normal one-message/one-verification delivery path satisfies this outcome.
7. A credential-triggered candidate with one moved/ambiguous alias or incompatible binding class must compensate all known writes; checking only apex or deployment alias metadata would falsely pass.
8. A cleanup that removes the synthetic horse but leaves assignment, profile, Auth, Storage or ownership ledger residue must fail.

### Git and durable verification state

Canonical workspace and Git top are `C:\Users\rrank\OneDrive\PNR Precision Performance Canonical`; discovery HEAD is `d822c027c58ad88ec7472e35986e7a33d6a3d6c9` on the accepted dirty branch and staged count is zero. The dirty worktree is user-owned and must be preserved. Sprint 036L durable authority records accepted exact source `bfeb0b23c339b819f5dbcd4fe28d61c7a4dd9570`, deployment `dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf`, five/five stable aliases, complete three-binding projection, one retained governed synthetic identity, two excluded identities unchanged and graph `8/1/0/0`. Builder must freshly verify mutable external truth before any action and must never publish the local dirty tree.

### Known uncertainty

- Current provider access, MFA/recovery and safe rotation capability are not proven. A class that cannot be safely attributed/replaced/revoked becomes `blocked-retained` and prevents the target outcome.
- The two excluded identities' owners and dependencies are not known in durable evidence. Private exact classification is mandatory.
- The available trainer's identity may match an excluded identity, an existing other exact identity, or none. The wrapper must fail closed on duplicate/ambiguous results.
- Normal real delivery may be unavailable because of cooldown/provider policy. No resend or substitute link is authorized.
- A runtime credential change may require a provider-supported redeploy. If exact-source redeploy and full compensation cannot be proven, do not change that class.
- This sprint proves one delivery rehearsal, not under-60 submission, full representative acceptance, public enquiry, commerce, provider-native restoration or Product Done.

## Execution sequence

1. Verify canonical path/Git top, HEAD/branch, staged count, accepted dirty-path classification and exact Pack dry-run/apply/readback.
2. Read all applied 036K files plus current 036L/033B authority, credential register, Auth/operations docs and exact current controllers/tests. Produce the complete no-edit critical Builder plan with exact files, AC map, test arithmetic, external ceilings, manual steps, compensation and closeout.
3. Obtain fresh critical Architect `pass` on that exact plan before implementation.
4. Implement deterministic pure contracts and recording fakes for finite credential classes/dispositions, replacement-before-revocation, predecessor invalidation, identity exact-match/disposition, message/verification ceilings, fixture ownership, alias/binding compensation, privacy and cleanup.
5. Run red-first adversarial local proof. No provider or identity action begins until all relevant tests, retained 036L/role/privacy gates, type/lint/build and secret/evidence scans pass.
6. Establish fresh sanitized external baseline: exact Vercel/Supabase targets, accepted deployment/source, five aliases, three binding classes, configured/absent credential classes, Auth population/classification counts and exact-owned residue. Refuse raw provider directory or value output.
7. Use protected private owner/operator entry to classify the two excluded identities and the real trainer target. Record only allowed dispositions/counts. Stop cleanly if either excluded identity remains unresolved.
8. Resolve the seven credential classes sequentially. Before each write, prove exact target, replacement/revocation path, dependent behavior and compensation. Verify replacement before predecessor invalidation. After each class, reread only sanitized status and rerun the affected enabled/disabled boundary.
9. If exact runtime refresh is required, use at most one provider-supported redeploy of accepted 036L source. Require alias-free exact source/project/Ready state, immutable public/protected/API/commerce/enquiry safety, then use the fixed five-alias transaction with full rereads. Compensate aliases and credential/binding changes on any non-target result.
10. Prepare exactly one real trainer and one synthetic rehearsal graph through protected input and existing least-privilege contracts. Do not expose identity or real records.
11. The trainer performs exactly one normal message/request and one verification on a supported phone, then completes portal, exact synthetic horse, permitted workflow/no-submit review, wrong-horse denial, sign-out and anonymous denial. Record sanitized booleans/times only.
12. Revoke session and remove exact-owned synthetic fixture/application/Storage state. Retain or delete the trainer Auth identity only under the owner decision. Retire the prior retained synthetic trainer/8-row graph only after full replacement and cleanup proof; otherwise preserve and use a fallback outcome.
13. Run final credential dispositions, identity dispositions, source/bindings/five aliases, authorization, disabled commerce/enquiry, privacy, message/deployment ceilings and zero-residue proof. Run all declared local quality gates.
14. Give the applied sprint, approved plan, complete diff, sanitized external ledger and real checks to a distinct fresh critical inspector. Any repair returns through no-edit planning and fresh review within decision budgets.
15. Only after inspection `pass`, annotate AC-01 through AC-40 and synchronize the required closeout files. Change only 036K planned -> done on target completion; otherwise record the exact fallback status without falsely advancing downstream prerequisites. Reread the landing from disk.

## Manual/private intervention contract

Manual intervention is expected only where the provider or real trainer must enter protected material. Before each intervention, Builder must provide numbered plain-language steps that identify the provider/surface and expected sanitized result, with transcription/capture disabled. The operator/trainer must never paste a secret, address, code, identity or screenshot into chat.

Builder must verify after each private step:

- exact provider/project/surface class;
- success/failure as an allowlisted boolean/class only;
- no protected value appeared in agent/tool output;
- exact action ceiling remains;
- next mutation is still authorized; and
- compensation/cleanup remains available.

If a safe private channel cannot be established, stop under a permitted outcome. Do not improvise clipboard, screenshot, shell history, visible dashboard enumeration or plaintext temporary files.

## Verification design

The Builder's exact plan must make current executable baselines and truthful target arithmetic explicit. At minimum, tests must cover:

- the exact seven-class allowlist, public/ephemeral exclusions and unknown-class refusal;
- all four credential dispositions, replacement-before-revocation, predecessor invalidation, partial-failure compensation and no-value serialization;
- exact identity match, duplicate/no-match, both permitted terminal dispositions, unresolved retention, dependency refusal, session-before-delete and Auth-last cleanup;
- one-message/one-verification ceilings, normal-delivery-only refusal of Admin/generated-link substitutes and no protected evidence;
- exact trainer role/membership/horse scope, wrong-horse generic denial, sign-out and anonymous denial;
- exact accepted source/five-alias/three-binding identity sets, one-candidate ceiling and full compensation;
- fixture ledger, application/Auth/Storage cleanup, temp/process residue and external mutation accounting;
- retained 036L autonomous session/denial/compensation proof, managed-role/Owner/privacy proof and disabled commerce/enquiry boundaries;
- JSON, encoding, static, typecheck, zero-warning lint, Production build, diff/scope/lock/migration checks; and
- final staged/external/residue arithmetic.

No test may “prove” privacy or revocation by source substring alone when an executable recording adapter or process boundary can falsify the claim.

## Closeout requirements

After inspection pass only:

- annotate every AC row with exact evidence;
- create the critical review with stable PLAN/INSPECT ledgers and all human-authorized private/manual transitions;
- create sanitized evidence/report with exact command exits, counted arithmetic, external mutation/compensation ledger, identity/credential dispositions by synthetic labels, trainer task booleans and limitations;
- reconcile STATE, STATUS, DECISIONS, RISKS, QUESTIONS, Final Product Acceptance Matrix, Definition of Done, ROADMAP, schedule, lifecycle, evidence index, Architect briefing, deferred ownership and detailed delivery road;
- record whether O08/O10/L08/L09, P33/P50 or any other row changed; never upgrade O01/L06/035S/Product Done from this one rehearsal;
- keep public enquiry conditional, commerce disabled, provider-native restoration and remaining representative/legal/customer/Production Done gaps open;
- set next work truthfully from the real result; and
- prove exact final `0/0/0` staged/unauthorized-external/residue or record the approved retained external state separately from residue.

============================================================
FILE: planning/sprints/036K-pre-public-launch-credential-rotation-and-real-trainer-delivery-rehearsal/acceptance.md
============================================================

# Sprint 036K Acceptance

Status: not run.

## Authority, Pack and plan

- [ ] **AC-01** Canonical CWD and Git top are exact; HEAD/branch/staged/dirty baseline is recorded and unrelated work is preserved.
- [ ] **AC-02** Pack dry-run/apply/readback proves exactly four traversal-free 036K destinations and no unexpected overwrite.
- [ ] **AC-03** Flight is `critical`; Builder returns an exact no-edit plan and a genuinely fresh Architect passes it within the decision budget before implementation.
- [ ] **AC-04** The plan maps every AC, exact files, external ceilings, private/manual steps, compensation, commands, arithmetic and mandatory closeout; Pack corrections are explicit.

## Credential classification and rotation

- [ ] **AC-05** Only the seven named non-public credential classes are eligible; unknown classes, public configuration and provider-issued ephemeral OIDC fail closed.
- [ ] **AC-06** Historical contamination is handled without reading repository/OneDrive history or any credential value, fragment, prefix, hash or correlation detail.
- [ ] **AC-07** Fresh metadata-only provider/runtime evidence assigns each class exactly one terminal disposition with no contradictory state.
- [ ] **AC-08** Every configured eligible class reaches `rotated-and-verified`, `revoked-not-required`, `confirmed-inactive-or-absent` or blocking retained state; the target outcome contains no blocking retained class.
- [ ] **AC-09** Replacement access/runtime behavior is verified before predecessor revocation; predecessor invalidation is independently proved without value exposure.
- [ ] **AC-10** Partial credential writes compensate the complete affected class set; coupled/unlisted provider effects are refused before mutation.
- [ ] **AC-11** Trainer-auth SMTP/policy, public configuration, commerce activation, public enquiry and unlisted provider/account credentials remain unchanged.
- [ ] **AC-12** Credential values never enter arguments, stdout/stderr, files, evidence, screenshots, browser/tool output or retained process artifacts.

## Identity disposition

- [ ] **AC-13** Fresh Auth projection remains finite and privacy-safe; exact retained synthetic identity and exactly two excluded identities are classified without raw rows.
- [ ] **AC-14** Each excluded identity is privately exact-matched and owner-dispositioned; position, guess, partial identifier, visible directory row and count cannot authorize mutation.
- [ ] **AC-15** A real/authorized identity is retained with exact least-privilege application role/membership/assignment; no unintended access is granted.
- [ ] **AC-16** An obsolete identity is deleted only after zero application/Storage dependencies, session revocation and independent exact absence; Auth deletion is last.
- [ ] **AC-17** Duplicate, no-match, conflicting-owner or dependency-present cases retain unchanged and prevent the target outcome.
- [ ] **AC-18** No identity is merged; no non-target identity, application row or Storage object changes.

## Real trainer delivery

- [ ] **AC-19** Exactly one available real trainer participates through a protected private path; no personal/contact/code/account/horse detail enters agent-visible or durable evidence.
- [ ] **AC-20** Exactly one normal sign-in message/request and one verification submission occur; resend, mailbox automation, generated Admin link and substitute authentication counts are zero.
- [ ] **AC-21** The trainer identity and one obvious synthetic rehearsal fixture graph are exact-owned, least-privilege and fully ledgered before delivery.
- [ ] **AC-22** The trainer reaches the canonical portal/dashboard, exact synthetic horse and permitted data-entry/review surface on a supported phone without submitting a real record.
- [ ] **AC-23** A generated wrong horse returns only the accepted generic denial with no protected horse/stable/state/count/record output.
- [ ] **AC-24** Sign-out clears the usable session; signed-out and fresh anonymous portal access redirect to sign-in.
- [ ] **AC-25** Evidence contains only task booleans, route classes, sanitized time/duration, viewport class and synthetic labels; no real/private payload or claim of under-60/full representative acceptance.

## Cleanup, retained identity and synthetic retirement

- [ ] **AC-26** Exact-owned rehearsal assignment/horse/application/Storage artifacts are removed dependency-safely and independently reread as absent.
- [ ] **AC-27** A rehearsal-created real-trainer Auth identity is retained only under explicit ongoing-access authority and exact intended state; otherwise session/application cleanup precedes Auth-last deletion.
- [ ] **AC-28** The prior retained synthetic trainer and eight-row graph retire only after complete real replacement and dependency proof; otherwise they remain unchanged and the target outcome is withheld.
- [ ] **AC-29** Final exact-owned application/Auth/Storage/temp ownership-ledger residue and unauthorized external mutation counts are zero; explicitly approved retained real access is reported separately, not called residue.

## Production compatibility and compensation

- [ ] **AC-30** Fresh baseline and final readback prove exact accepted Sprint 036L source/deployment compatibility, five unique aliases and three unique binding classes.
- [ ] **AC-31** No deployment occurs unless a changed live credential requires it and provider-supported exact-source redeploy is proven; deployment count is at most one and never uses the dirty local tree.
- [ ] **AC-32** Any candidate starts alias-free, exact-project/source and Ready, passes immutable public/protected/API/disabled-commerce/enquiry safety, and is the sole candidate.
- [ ] **AC-33** Alias writes use only the five exact aliases/fixed order/full rereads; any mismatch restores all five and every changed credential/binding class before further action.
- [ ] **AC-34** DNS, schema, migrations, RLS, roles, permissions, Product behavior, email template/policy, commerce, public enquiry and unrelated provider state remain unchanged.

## Evidence, inspection and closeout

- [ ] **AC-35** Exact counted focused and retained assertions pass with truthful arithmetic; adversarial replacement, invalidation, identity, privacy, ceiling, compensation and cleanup cases are executable.
- [ ] **AC-36** JSON, encoding, static/privacy/sensitive-output, typecheck, zero-warning lint, Production build, diff/scope/lock/migration checks pass or an equivalent stronger proof is inspection-accepted.
- [ ] **AC-37** A distinct fresh critical inspector judges every applicable AC and the complete diff/evidence; all stable findings resolve within the inspection budget or the flight asks.
- [ ] **AC-38** Durable evidence records exact credential and identity dispositions by non-sensitive class/ordinal, task outcomes, action counts, compensation, cleanup, limitations and no protected value.
- [ ] **AC-39** Acceptance, review, state, status, decisions, risks, questions, matrix, DoD, roadmaps, schedule, lifecycle, evidence index, briefing and deferred ownership are synchronized after inspection pass only.
- [ ] **AC-40** Final readback proves the exact permitted outcome, roadmap truth, briefing v8 fields, no false public-launch/035S/Done claim, and exact staged/unauthorized-external/residue ledgers; no commit/push/PR/deploy beyond the explicitly counted approved external actions.

============================================================
FILE: planning/sprints/036K-pre-public-launch-credential-rotation-and-real-trainer-delivery-rehearsal/handoff-prompt.md
============================================================

# Sprint 036K Builder Handoff

Build only from these applied Sprint 036K files in the permanent canonical repository.

## Task contract

**objective:** Resolve the finite pre-launch credential classes and two excluded Auth identities, then prove one privacy-safe normal Production delivery journey for one real trainer with complete rehearsal cleanup and preserved Sprint 036L compatibility.

**owns:** The narrowest exact 036K docs, contract/controller/wrapper/tests/registrations and sanitized evidence selected from the requirements allowlist; finite protected provider reads/writes for seven credential classes; private exact disposition of two excluded identities; one trainer/one message/one verification/one synthetic rehearsal graph; at most one provider-supported exact-source redeploy and fixed five-alias compensation only if required; mandatory review/closeout files after inspection pass.

**must_not:** Expose credentials, addresses, codes, identities, cookies, private rows or real horse/stable data; inspect contaminated history; use raw provider directories; guess/merge/delete unresolved identities; mutate unlisted credentials/accounts/providers; change Product/schema/migrations/RLS/roles/permissions/DNS/email policy/commerce/public enquiry; deploy from the dirty local tree; make a second deployment/message/verification attempt; retain unapproved rehearsal artifacts; stage, commit, push, merge or PR.

**acceptance:** AC-01 through AC-40 pass. Every configured eligible secret class has an exact safe disposition; both excluded identities have protected owner-governed dispositions; one real trainer completes the normal bounded journey; rehearsal cleanup and accepted Production compatibility pass; every non-target path stops or compensates completely with no protected evidence.

**verification:** Exact counted focused/retained and adversarial tests; sanitized provider/credential/identity/routing ledgers; one operator-observed trainer journey only after all gates; message/deployment/alias ceilings; cleanup/compensation; privacy/static/JSON/type/lint/build/diff/scope/lock/migration checks; fresh critical inspection; synchronized closeout and final readback.

## Builder planning gate

Before editing implementation or touching external state:

1. verify canonical path/Git truth and apply/reread the Pack;
2. read the complete current 036L, 033B, credential register, Auth/operations and relevant controller/test source;
3. return the exact task contract, implementation/evidence/closeout file list, scope guards, AC-01..AC-40 mapping, verification commands, observed baselines/target arithmetic, external-action ledger, private/manual steps, compensation sequence, `Pack corrections` and blocking ambiguity; and
4. wait for the genuinely fresh critical Architect plan decision. Inside this Fly, plan `pass` authorizes implementation and the exact bounded external actions; no second human approval is implied for anything outside the Pack.

## Execution rules

Trust Git and exact provider readback over prose. Preserve the dirty worktree. Never deploy local contents. Build executable recording adapters and red cases before provider action. Use finite sanitized projections and protected stdin/private interactive entry only. Stop on raw identity/credential/provider output.

Treat each credential class and identity as a separate transaction with exact preconditions, target, action, readback and compensation. Verify replacement before revocation. Never call a configured value “rotated” until the predecessor is independently invalid. Never call an identity “obsolete” until the owner and zero-dependency proof agree.

The real trainer handles their own sign-in privately. Builder provides plain numbered steps and records only allowed booleans/classes/times. No person sends protected material to chat. One request and one verification are the hard ceiling. A failed normal delivery is a safe fallback, not authority for a generated link or retry.

Apply the Evidence-Proportional Execution Standard. Diagnose supporting-tool failure once, use an equivalent or stronger safe path, and keep deterministic in-scope corrections in 036K. Manual intervention is last. Material target, authority, security/privacy, destructive identity, partial credential, Production compatibility, compensation or cleanup failure stops the sprint.

After checks, give the full applied sprint, passed plan, diff, exact command evidence and sanitized external ledger to a distinct fresh critical inspector. Only inspection `pass` allows closeout. Then update the approved durable files proportionally, change the roadmap/status truthfully for the actual permitted outcome, and reread the landing from disk. Do not commit or push unless separately requested.
