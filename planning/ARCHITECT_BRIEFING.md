# Architect Briefing — Sprint 035C Active

## Where things stand

Sprint 035C is active from exact clean Sprint 035B local/remote SHA `497c8628c2fe481dcf2ca1d205f379e311b3df75`. The product-owner/provider-operator confirms protected inbox readiness and availability for Trainer Participants A, B and C. The sprint is limited to an exact no-alias Preview, bounded participant-linked synthetic access, the five-step trainer journey, validation and exact-owned cleanup.

Initial Preview `dpl_3YuZ36Jh8h6U5CgCGw9NQzpDTDfy` was Ready/Preview at candidate `aa0cf5ddb598a73056677e030ec6a39141764cb9` and alias-free before the Participant A redirect finding; its callback is now retired. The accepted protected matcher is administrator-controlled `app_metadata` using only `participant_alias` and `pilot_sprint`, with merge-preservation and cleanup; these fields never authorize application or RLS access.

Participant A is a Sprint-owned confirmed identity but its Dashboard invitation redirect failed; B/C were not started. Artifact-free evidence proves the Preview origin and callback route are healthy and correctly allowlisted. The Dashboard cannot set `redirectTo`, and the Preview passwordless action used a localhost fallback because no site URL variable is approved. Builder is validating a narrow trusted-request-origin correction and a hidden one-participant-at-a-time Admin tagging helper before A authentication is retried.

Correction `07edea49153fb557a2afc2a066f96c30a102e4c7` is pushed. Exact clean-source Preview `dpl_G8StMkGqfTmUsNMpAfNUCwontC42` is Ready/Preview and alias-free; its production build passed and origin/callback checks are healthy. The exact new callback is temporarily allowlisted in place of the old Preview callback, with production configuration unchanged. Participant A tagging/authentication remains pending; B/C remain untouched.

The operator safely terminated a manual secret-conversion attempt before helper execution; there was no inbox entry, metadata change or remote mutation. Builder added a Sprint-owned guarded PowerShell wrapper with child-only secret environment handling and a no-secret static self-test. A remains owned-confirmed-untagged with current owned creation `0/1/0`; B/C remain untouched.

Participant execution is stopped after A's Preview passwordless message redirected to the production root with a code query and the code was disclosed outside the protected path. The compromised value is not retained or exchanged, no portal acceptance is claimed, and B/C remain untouched. Sanitized session/application containment, exact-owned A cleanup and redirect diagnosis are active.

The initial containment helper returned `OWNERSHIP_AMBIGUOUS` without mutation because it incorrectly required one total project Auth identity. Parent secret environment is absent and owned state remains `0/1/0`. The narrow correction allows unrelated Auth identities while requiring one exact protected match, recorded A event-window agreement, untagged/no-conflict metadata, zero access, protected ownership ledger, Auth-last deletion and unchanged unrelated identities.

Participant A containment subsequently passed: prior provider sign-in indicator recorded, production callback not processed, zero application records removed, active session revoked through exact-owned Auth deletion, and owned application/Auth/Storage `0/0/0`. Protected ledger state is A `contained-owned-deleted`, Sprint-owned, with no B/C entries. Post-delete exact A absence and unrelated-identity preservation passed; parent service-role environment is absent. No participant acceptance is claimed.

Fresh exact-source Preview `dpl_CGtFBxpQakJHi3x41hzcgpvmDL3A` at `5b55aea39abcb45db06a42312d3ff9a7f293f3f9` is Ready/Preview, alias-free and healthy after a passing production build. The new callback rotation remains pending; no A identity/message has been recreated and B/C remain untouched.

Callback rotation now passes: exact new Preview callback plus unchanged production callback only; stale callback/wildcard absent; production Site URL unchanged. Supabase target is active/healthy in `ap-southeast-1` with migrations `0001`–`0021` aligned. Preview remains Ready/Preview, alias-free and healthy, stable aliases remain unchanged, owned state is `0/0/0`, A remains absent and B/C remain untouched. A fresh A-only protected handoff may begin; no acceptance is yet claimed.

Fresh A request created the expected untagged Auth identity, but Apply returned `ALIAS_ALREADY_PROCESSED_A` before hidden inbox or metadata mutation because the prior contained-owned-deleted ledger state was rejected unconditionally. The email remains unopened; no session or application state exists; current owned state is `0/1/0`; parent secret environment is absent and B/C remain untouched. Builder is correcting only that deterministic ledger transition.

The corrected transition then tagged A with sanitized ownership `sprint-owned`, and the protected ledger records only A as `existing-tagged`. The exact Preview sign-in request reported sent/next `/portal`, but authentication did not succeed; later old-message landings produced sanitized production-root `otp_expired` with no visible code query. This does not prove a fresh valid message ignores the corrected redirect. Participant acceptance is not claimed. A protected read-only verification checkpoint must prove one tagged A, Sprint ownership, no sign-in indicator and zero application/access state before one controlled fresh-message retry; otherwise use bounded containment.

That protected checkpoint passed with exactly one tagged Sprint-owned A, no sign-in indicator, no application or owned Storage state, and owned counts `0/1/0`. External pre-retry checks reconfirm the exact Preview Ready/exact-source/Preview/zero-alias state, exactly two callbacks (unchanged production plus exact Preview), no stale/wildcard callback, unchanged production Site URL/deployment/five aliases, passing forwarded-origin proof and same-Preview `/portal` callback boundary. Exactly one controlled fresh-message retry for A is authorized. B/C remain untouched; no A acceptance is claimed until a fresh message establishes an authenticated Preview portal session.

That retry failed twice with the same sanitized production-root `otp_expired` result and no authenticated session. The message/thread exposed Sign in and Confirm email address actions. Provider inspection shows these are separate one-action Magic Link and Confirm sign up templates, both using `ConfirmationURL`; signup and email confirmation are enabled. The application omitted `shouldCreateUser: false`, so an unknown participant inbox could be auto-created through the signup/confirmation branch. Supabase also documents that email-link prefetch/security scanning consumes one-time `ConfirmationURL` links and causes expired/invalid-token results, explaining why the first manual action could already fail; opening another/superseded action is not the sole explanation. The narrow source correction makes portal sign-in existing-account-only and rejects callback errors before code exchange. A remains ledger-classified tagged/Sprint-owned with sanitized owned state `0/1/0`; no containment occurred. No further retry is authorized pending Architect review and fresh exact-source Preview/provider preparation.

Sprint 035B is closed `trainer-pilot-participation-partial-clean`. Exact Preview deployment `dpl_HDtvZnnz9osHuyQ7zW7WX1w1mpWE` at source SHA `dedc19001acd9229d435718e51ceabbbdd208860` passed authenticated passwordless synthetic acceptance. Cleanup is application/Auth/Storage `0/0/0`, and the temporary callback is removed.

## Current status

Active. Participant consent, protected inbox readiness and A/B/C availability are confirmed through sanitized operator status. No Sprint 035C Preview, participant application access or trainer acceptance is yet claimed. The public release remains valid and unchanged.

Horse-detail workflow loading now fails closed independently of horse access: sanitized unavailable state, no normal-state inference and no record action. Focused regressions and the full canonical/build suite pass.

The intentional commit series began with reconciliation commit `aeb24d2d038f9875973764b25538caaea6473d02`; planning closeout commit `aa87dfe010ca1ae900f0ce633ee7b2fad2a076bf` was pushed and verified as the exact remote branch tip before the final evidence attestation.

## What changed

Repository lineages and the dirty root were classified; current authority was compressed into state, schedule, evidence index and lifecycle ledger; lean-delivery controls were made durable. No uncertain history was deleted or archived.

## Next action

Builder must create an exact no-alias Sprint 035C Preview, coordinate only sanitized A/B/C timing with the protected provider operator, run the bounded participant journey, validate, and clean exact-owned state Auth-last.

## Watch-items

Do not merge or push `develop` by assumption. Do not claim product Done, clinical outputs, application audio, upload acceptance or timed field acceptance without the missing authority and proof.
