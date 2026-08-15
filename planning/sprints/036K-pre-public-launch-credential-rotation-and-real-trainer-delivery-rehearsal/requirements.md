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
