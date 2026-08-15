# Sprint 036M Requirements

## Outcome

Recover what Sprint 036K safely withheld:

1. migrate hosted Supabase legacy anon/service_role API keys to publishable/secret keys without rotating JWT signing or invalidating user sessions;
2. independently disposition all seven historically at-risk credential classes;
3. privately disposition both excluded Auth identities without guessing, merging or protected output;
4. complete one normal one-message/one-verification Production journey for one real trainer after Auth-critical, identity and Production gates pass; and
5. preserve or exactly compensate Sprint 036L source, five aliases, bindings, authorization, disabled commerce/public enquiry and non-target state.

Target: prelaunch-credentials-identities-and-real-trainer-delivery-complete-clean.

Allowed non-target outcomes:

- real-trainer-delivery-complete-credential-recovery-partial-clean: Supabase/Auth, identities, Production and trainer pass while unrelated classes remain blocked; launch readiness is withheld.
- prelaunch-recovery-blocked-clean: a gate stops before unsafe/irreversible action.
- prelaunch-recovery-compensated-clean: reversible writes are restored/removed and irreversible accepted state is exact.
- prelaunch-recovery-blocked-material: post-revocation, identity, privacy, Production or cleanup safety is unknown.

No partial/fallback is launch readiness, Product Done, full representative acceptance or authority to activate commerce/public enquiry.

## People and protected window

Phillip owns private identity/business/privacy decisions. Randell owns provider/release/recovery operation. Exactly one real trainer is available.

Builder finishes the lean plan review, implementation and corrected local gates first. Reserve a private 90-minute window after a sanitized readiness checkpoint: Phillip/Randell first; trainer only after green gates for about 20-30 minutes. The earlier local estimate is superseded by the newly discovered protected-window implementation gap; Builder must report a fresh readiness estimate after the corrected gates pass.

No name, address, phone, code, Auth ID, credential, cookie, provider/account row, horse/stable detail or screenshot enters chat, arguments, output, files or evidence. Unavailability stops cleanly and authorizes no replacement person, retry, generated link, mailbox automation or broad output.

### Required executable protected-window seam

The existing `SelfTest` and `CapabilityGate` modes are local evidence only. They do not authorize the three people to begin. Until the following seam is implemented and reviewed, the truthful checkpoint is `implementation-gap-blocked-clean` and Phillip, Randell and the trainer remain stood down.

- `scripts/Invoke-PrelaunchRecovery036M.ps1` permits exactly `SelfTest`, `CapabilityGate` and `ProtectedWindow`.
- `ProtectedWindow` runs once as one visible, interactive, non-transcribed ConsoleHost wrapper session. The outer wrapper refuses redirected input/output, transcript policy, wrong root/HEAD/branch, conflicts, a concurrent or second window and unsafe restart/resume.
- The wrapper starts exactly one controller child for the whole window, using anonymous redirected child-standard-input and child-standard-output pipes owned only by that wrapper. Protected values travel from masked wrapper input through wrapper memory into the child input pipe; they never enter command arguments, environment variables, clipboard, temporary files, repository files, PowerShell history, outer redirected input/output, child output or evidence.
- Project/session/key values, exact identity references, trainer ordinal/exact Auth reference, resulting session-state projection and candidate identifiers live only behind opaque in-memory handles. The controller never receives the trainer's address, one-time code, browser cookie or phone session. Convert a protected value only immediately before its one allowed call and zero/dispose owned buffers where the runtime permits; do not claim erasure of every runtime/native copy.
- The child emits only one allowlisted JSON result per request through its private output pipe; the wrapper refuses malformed, unknown or protected output. Raw provider responses and errors are parsed in child memory and projected to finite codes, booleans, counts, ordinals and sanitized Brisbane timestamps before output.
- One append-only process executes, in order: `baseline`, `pair-prepare`, `bindings-candidate-probes`, `legacy-deactivate-readback`, `credential-dispositions`, `identity-dispositions`, `trainer-prepare-deliver`, `trainer-observe-cleanup`, and `final-readback`.
- Exit before legacy deactivation requires exact compensation and independent reread. Exit after the irreversible latch permits readback-only recovery, never guessed retry or predecessor restoration. Resume after process exit is refused unless independent sanitized readback can reconstruct every required state safely.

The live controller exposes no generic command runner. Its adapters are finite and target-bound: exact-project Supabase Management/Auth operations; exact-project/source Vercel bindings, candidate and fixed aliases; allowlisted zero-business-effect runtime probes; exactly seven credential-class adapters; parameterized two-ordinal identity operations from the pinned migration authority; and one exact eight-row trainer graph plus boolean observation prompts. Any unavailable Supabase, Vercel, SMTP, Stripe or Railway native mechanism produces `blocked-retained`, not a manual success attestation.

## Supabase paired API-key migration

Official current Supabase authority separates legacy JWT-based anon/service_role API keys from publishable/secret API keys. New keys coexist with legacy keys; after all consumers migrate, legacy API keys can be deactivated independently of JWT signing. User Auth continues via personal session JWTs.

Only this coupled transition is allowed:

- NEXT_PUBLIC_SUPABASE_ANON_KEY value becomes the exact-project publishable key;
- SUPABASE_SERVICE_ROLE_KEY value becomes one named exact-project secret key;
- NEXT_PUBLIC_SUPABASE_URL stays exact;
- variable names and authorization contracts remain unless installed behavior proves a separately reviewed compatibility edit necessary;
- JWT signing, sessions, database credentials and unrelated keys do not change;
- legacy anon/service_role deactivates only after all consumers migrate and pass.

Protected Dashboard/Management API use requires exact project/scoped capability. Management token and key values never become agent-visible or persist to disk/history.

Before mutation, enumerate by safe class/name/target every repository, Vercel target, current/old addressable deployment, job, webhook, script, integration, Edge Function, database webhook and pg_net consumer, or prove absent.

Exact order:

1. fresh exact-project legacy/new-key metadata without reveal;
2. private create/select one publishable and one named secret key;
3. install both as one complete binding transaction across the full current target set;
4. materialize only accepted Git object `bfeb0b23c339b819f5dbcd4fe28d61c7a4dd9570` into an exact-owned randomized system-temporary export, verify it byte-for-byte and path-for-path against that Git tree, add only the exact Vercel project-link metadata inside the temporary export, and deploy that explicit directory with installed Vercel CLI `--prod --skip-domain`; never deploy canonical dirty files or use `redeploy` as an alias-free substitute;
5. prove sole candidate alias-free, exact-source/project and Ready; run discriminating public, authenticated-user and server-admin probes;
6. move fixed five aliases through the compensated transaction and reread independently;
7. prove every current consumer uses new keys;
8. deactivate legacy API keys without touching JWT signing;
9. independently prove provider legacy disabled, old predecessor-bound deployments cannot authorize Supabase calls, current runtime uses new keys and Auth remains compatible.

Vercel environment changes affect only new deployments. A row change, working candidate, source scan or generic old page is not predecessor invalidation. Each addressable old deployment needs a privacy-safe discriminator for legacy-bound Supabase authorization.

Before deactivation, failure restores/removes new bindings/candidate/aliases. Revocation attempt is irreversible/unknown until independent readback; never run predecessor compensation afterward. Never silently restore a deactivated predecessor. Ambiguity stops material.

## Seven independent classes

Eligible classes remain exactly SUPABASE_SERVICE_ROLE_KEY, CRON_SECRET, ENQUIRY_ABUSE_HMAC_SECRET, PUBLIC_ENQUIRY_SMTP_PASS, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET and RAILWAY_API_TOKEN.

Unknown classes, other public configuration and provider OIDC fail closed. Do not inspect contaminated history or values/fragments/hashes.

Each class independently reaches rotated-and-verified, revoked-not-required, confirmed-inactive-or-absent or blocked-retained. Existing classes require provider-native creation/revocation/absence and independent readback. Generated shared secrets require all current/old consumers to reject the predecessor or be incapable of consuming it. Vercel/source alone is insufficient.

An unrelated blocked class with proven zero Auth/trainer/portal/rehearsal/routing path does not erase a valid trainer journey, but withholds target/launch readiness. Any uncertain path blocks trainer stage.

Credential proof triggers no payment, email, enquiry, Cron, Railway or webhook business action. Use native metadata, no-send authentication, synthetic local signatures or stronger zero-business-effect proof.

## Identities, sessions and trainer

Retain Sprint 036K raw-byte-anchored 25-migration/50-dependency authority. Protected input exact-matches private ID plus address identity; output uses ordinal/disposition only.

Allowed identity outcomes: retained-real-authorized with least privilege; deleted-obsolete-clean after owner decision, exhaustive zero/sprint-owned app+Storage dependencies, exact session invalidation, Auth-last deletion and absence; or unresolved-retained-blocking unchanged.

Never select by position, row, count, partial value or guess; never merge. deleteUser does not invalidate an access JWT. Without exact target normal-session global sign-out and independent refresh/reuse denial, retain unresolved. Do not rewrite non-owned history to manufacture zero.

Trainer may exact-match an excluded identity, another authorized identity or none. A new identity may arise only from the single normal sign-in after private confirmation. Duplicate/ambiguous results fail closed.


The `ProtectedWindow` remains alive and governs the trainer stage, but the normal authentication calls occur only in the trainer's phone browser. The trainer privately enters their own address, presses Send once, receives and submits the code once, and never discloses either value to the wrapper/controller. The controller must not call `signInWithOtp`, `verifyOtp`, create a link, inject a cookie or transfer a session for the trainer.

Immediately before and after the phone-native actions, the wrapper advances hard one-message/one-verification prompts and accepts only finite yes/no observations. The controller may perform only allowlisted sanitized exact-ordinal/Auth/session-state readback that emits no protected field. The phone then proves the route and denial journey directly. If the single action, independent state or phone journey cannot be established, stop without retry; do not create a second verification or bridge the session.

Trainer stage requires paired migration/five aliases, all possible Auth/trainer-path classes non-blocking, exact private identity authority, one exact-owned obvious synthetic graph, and all local/retained/privacy/type/lint/build gates.

Trainer privately uses one supported phone, requests exactly one normal message and submits exactly one verification. No resend, Admin link, password, service-role substitute, mailbox automation or visible code.

Prove canonical portal/dashboard, exact synthetic horse, permitted no-submit review, generic wrong-horse denial, sign-out, signed-out redirect and fresh anonymous denial. Evidence is booleans, route/viewport classes and sanitized Brisbane times. Failure stops without retry. This is not under-60 or full Sprint 035S acceptance.

## Production, cleanup and scope

Sprint 036L is pre-action Production authority. At most one exact-source candidate, alias-free initially, using fixed five-alias compensation. Never deploy dirty files, change DNS or rely on deployment alias metadata alone.

The only source-materialization mechanism is a non-worktree, non-checkout export under the resolved system temporary directory:

- create one cryptographically randomized directory whose basename begins `036M-exact-source-` and whose resolved path is strictly inside the system temporary root;
- export the accepted Git object directly, never copy files from the canonical worktree;
- require the exact Git-tree path set and blob bytes after export; reject missing, extra, transformed, reparse/symlink, `.git`, protected-content or non-regular entries; allow only the exact committed `.env.example` blob from the accepted Git tree after placeholder-only and protected-pattern checks, and refuse every other `.env*` entry;
- add only `.vercel/project.json` with the privately verified exact project/team linkage; its values stay process-private and out of evidence;
- invoke the installed pinned Vercel CLI against that explicit directory with `deploy --prod --skip-domain --yes`; stdout is privately parsed to the sole candidate identifier and never treated as routing proof;
- after upload, or on any pre-deactivation failure, remove only the previously resolved exact-owned temporary directory and independently prove it absent. No glob, broad temp cleanup, checkout, worktree or canonical-tree deletion is allowed.

The temporary export is an authorized external artifact, not a repository-plan file. Failure to prove exact source, exact project link, alias-free candidate or exact-path cleanup stops before legacy deactivation; unsafe cleanup or unexpected residue stops materially.

Use inspected private append-only landings. Clean exact-owned session, assignment, horse, application and Storage artifacts dependency-safely. Trainer Auth follows owner authority. Prior synthetic trainer/eight-row graph retires only after complete replacement; otherwise remains unchanged.

Builder may change only narrow 036M controllers/wrappers/tests/registrations, demonstrably necessary reviewed compatibility source, operating docs, sanitized evidence and mandatory closeout in the passed plan.

Do not change schema, migrations, RLS, roles, permissions, commerce/enquiry behavior, email policy/templates, DNS, unrelated providers, dependencies/lock or real records. Do not stage, commit, push, merge or PR.

## Evidence-Proportional and manual rules

Stop only for material target, authority, secret/privacy, destructive identity, integrity, provider/Production, compensation, scope or cleanup risk. Diagnose tool failure once; use equivalent/stronger proof; keep deterministic tooling/harness/validator/reporter corrections in sprint. Do not create another follow-up solely for browser/clipboard/CLI limits.

Manual intervention is last and limited to protected provider, identity and trainer entry. State the blocked fact, evidence checked, numbered private action, prohibited output and sanitized verification. People never paste protected content or screenshots into chat.
