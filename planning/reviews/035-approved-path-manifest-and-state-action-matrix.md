# Sprint 035 Approved Path Manifest And State/Action Matrix

## Baseline identity

- Required parent: `codex/034-reconciled-product-baseline` at `ea8417d3c7450f25c90644f23d8558c9f5938552`.
- Local and authenticated GitHub remote parent refs: exact match.
- Scoped worktree: `C:\tmp\pnr-035-first-trainer-access-and-core-journey`.
- Scoped branch: `codex/035-first-trainer-access-and-core-journey`.
- Pack dry-run and application each identified exactly the four required Sprint files.
- Starting product tree was clean at the exact parent before the planning-only Pack import.

## Approved product-path manifest for the code gate

| Path | Intended bounded change |
|---|---|
| `app/(portal)/portal/page.tsx` | Replace scaffold language with a truthful assigned-horse trainer overview and explicit loading/error/empty orientation. |
| `app/(portal)/portal/horses/[horseId]/page.tsx` | Present stable/horse/workflow context, one existing permitted biochemistry action, and a clear return to `/portal`; keep denial non-leaking. |
| `lib/domain/horses.ts` | Return typed, fail-closed overview/detail results without sample horse data when service configuration is unavailable; preserve RLS-backed queries and persisted contracts. |
| `components/layout/app-shell.tsx` | Improve trainer orientation, focus visibility, and sign-out affordance without changing session or permission contracts. |
| `components/auth/sign-in-form.tsx` | Clarify approved-account/passwordless and private-mailbox instructions; improve accessible field/control semantics. |
| `app/auth/actions.ts` | Preserve passwordless OTP and callback behavior; return successful sign-out to sign-in for the repeat-access journey. |
| `scripts/test-trainer-core-journey-035.mjs` | Add deterministic assertions for bounded visibility, fail-closed states, denial wording, navigation, sign-out, accessibility, and responsive composition. |
| `package.json` | Register the focused Sprint 035 test command and include it in the maintained validation surface where the current runner supports it. |

No other product, source, test, app, template, or script path is approved at this gate. Planning/docs closeout paths remain separately governed by the Sprint.

## Typed state/action matrix

| Authorised state | Display contract | Permitted action | Fail-closed rule |
|---|---|---|---|
| Signed out / anonymous | Approved-account passwordless guidance only | Request private single-use link | Protected routes redirect; no horse, stable, count, or workflow detail. |
| Signed in, inactive/no portal membership | Generic portal-access-unavailable state | Sign out | No record existence, assignment, count, or role detail. |
| Active member, zero accessible horses | Explicit empty assigned-horse state | Sign out | Zero is not complete, normal, or a service error. |
| Active member, one accessible horse | Exact authorised stable/horse identity and workflow summary | Open that workspace | Inaccessible records affect no count, order, text, or link. |
| Active member, many accessible horses | Alphabetical authorised horses only | Open an authorised workspace | RLS remains authority; client filtering is not authority. |
| Latest biochemistry absent | Explicit unavailable context | Existing permitted capture only when write permission exists | Missing never becomes Green, normal, complete, or scored. |
| Latest biochemistry incomplete/pending | Neutral status plus supported date/source | Existing action from current derivation | No clinical priority, diagnosis, treatment, supplementation, or readiness claim. |
| Latest biochemistry completed | Neutral completed state plus supported context | Existing result/capture action only when derivation permits | Colour is paired with text/context; no new thresholds or recommendations. |
| Query unavailable/failed | Generic operational-data-unavailable state | Return/retry navigation | No raw provider error, partial horse list, or false empty. |
| Wrong/cross-stable/unknown horse | Generic `Horse not available` | Return to dashboard | Same response shape; no existence, stable, workflow, or count leakage. |
| Revoked session/membership | Generic sign-in/access flow | Sign in again or sign out | Former assignment is not cached or displayed. |
| Signed out after journey | Sign-in page with no retained protected values | Repeat private approved-account sign-in | Existing server session is cleared. |

## Contract boundary

The plan reuses existing auth, session, bootstrap, schema, migrations, RLS, roles, membership, assignment, Supabase query, biochemistry action, and operational derivation contracts. Any required change to those contracts ends product implementation with `trainer-contract-expansion-required-clean`.

## Manual intervention — scoped remote publication approval

- Blocked action: push exact local implementation commit `36a87ce341c7a7c1ad7144f97cec62dec913b38d` to the private GitHub repository `rankin007/PNR-Precision-Performance` on branch `codex/035-first-trainer-access-and-core-journey`, which is required before exact-source Preview deployment.
- Evidence checked: local branch and parent identity are exact; the eight approved product paths and planning artifacts are committed; all local validation and the production build pass; staged checks found zero unexpected product paths, secret-pattern groups, non-placeholder email addresses, or generated directories.
- Required user action: explicitly authorise publication of this committed private project source to that exact repository and branch. No credential or protected value should be supplied.
- Steps: reply with explicit approval naming `rankin007/PNR-Precision-Performance` and `codex/035-first-trainer-access-and-core-journey`; Builder will then push only that branch, verify local/remote SHA equality, and continue to the alias-free non-production Preview gate.
- Subsequent verification: remote branch SHA equality; read-before-write Vercel target identity; alias-free Preview identity and readiness; health/sign-in rendering; anonymous protected-route denial; phone and larger-viewport checks; then private designated-trainer acceptance and dependency-safe cleanup.

## Publication and Preview evidence

- Scoped GitHub publication: local and remote branch tips both equal `36a87ce341c7a7c1ad7144f97cec62dec913b38d`.
- Vercel target read before write: project `pnr-precision-performance`, ID `prj_6To7czLpCEGL6fInkQwE4egePPpq`, owner `rankin007's projects`, root directory `.`, Next.js preset.
- Exact deployment source: detached clean worktree at `36a87ce341c7a7c1ad7144f97cec62dec913b38d`; the unstaged planning-only record was excluded.
- Preview: deployment `dpl_F8nk4bA3V84zsP9k7Wj91V8fGy9E`, target `preview`, state `READY`, direct deployment URL `pnr-precision-performance-8dfggt4rv-rankin007s-projects.vercel.app`.
- Alias check: zero aliases point to the Preview deployment. No production alias, domain, DNS, provider, Site URL, or production-data mutation was performed.
- Authenticated Preview request proof: `/api/health` returned `ok: true`, production Node runtime, and Vercel environment `preview`; `/sign-in` rendered the approved passwordless form and private-mailbox guidance; anonymous `/portal` returned the Next redirect contract to `/sign-in?next=%2Fportal` with status 307.
- Rendered browser gate: standard Vercel deployment protection intercepts the direct Preview URL before the app. In-app browser reached the Vercel login boundary; Chrome access was blocked before app rendering. No credential, cookie, token, mailbox, or session material was inspected or transferred.

## Manual intervention — protected Preview human access

- Blocked work: rendered phone/larger-viewport verification and one designated trainer's private task journey.
- Evidence checked: exact-source Preview is Ready, alias-free, healthy, renders sign-in through the authenticated Preview request path, and denies anonymous portal access; ordinary browser access stops at Vercel deployment protection.
- Required authority: product owner must explicitly approve creation of one revocable per-deployment Vercel shareable link for `dpl_F8nk4bA3V84zsP9k7Wj91V8fGy9E`, privately designate exactly one trainer representative, and authorise the minimum clearly synthetic stable/horse/workflow fixtures through existing contracts.
- Private participant action after approval: open only the supplied protected Preview access path; enter all mailbox and authentication material privately; complete sign-in, assigned-horse dashboard, horse workspace, one existing permitted biochemistry action, dashboard return, secure sign-out, and repeat sign-in on a supported phone; repeat orientation on one larger viewport.
- Builder verification after action: rendered accessibility/responsive checks, sanitized task result and material UX findings, bounded permission agreement, at-most-two attempt count, fixture/account/callback/shareable-link ownership, dependency-safe cleanup, and unchanged production state.

## Exact Preview backend classification

- Exact deployment: `dpl_F8nk4bA3V84zsP9k7Wj91V8fGy9E`, project `prj_6To7czLpCEGL6fInkQwE4egePPpq`, source `cli`, state `READY`, zero aliases, and no Git branch or Git SHA metadata. The clean detached source was exact commit `36a87ce341c7a7c1ad7144f97cec62dec913b38d`.
- Vercel environment metadata: this CLI deployment uses the generic `preview` environment, not the historical `codex/035B-preview-configuration-and-trainer-pilot-completion` override. Generic Preview-scoped entries exist for `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`; production has separately scoped entries. No value or credential was printed, persisted, or retained.
- Durable target authority: generic Vercel Preview for `pnr-precision-performance` maps exclusively to Supabase organisation `hohxquwkfehiuyrysufu`, project `Precision Performance Clean Rebuild`, reference `uvskssaecdhxcgytkasc`, region `ap-southeast-1` Singapore, classified non-production, synthetic-only, and containing no real customer, horse, or production data. Accepted production is the distinct project reference `tagnbgkroihagjmvehlx`.
- Cross-check: deployment `/api/health` reports Vercel `preview` with Supabase public/admin configuration present. Repository target guards in the maintained 021/031 harnesses refuse any hostname other than `uvskssaecdhxcgytkasc.supabase.co`, and accepted 031C evidence records this same Vercel Preview-to-candidate mapping with final Auth/application/Storage `0/0/0`.
- Classification result: the exact Preview is bound to the already-authorised isolated non-production Supabase/Auth/database/storage target. The production Supabase reference is not selected. Synthetic fixture creation under existing contracts would not mutate accepted production data.
- Supporting-tool substitution: the Supabase CLI executable was unavailable in this worktree and no decrypted Vercel environment set was requested. Equivalent non-secret Vercel deployment/environment metadata plus durable exact-target authority and maintained runtime target guards establish the same boundary without exposing protected values.

## Field-minimal Sprint 035 fixture graph

All labels use a new `035-TRAINER-JOURNEY` synthetic run prefix or an equally explicit non-identifying equivalent. No real horse, stable, trainer-business, clinical, owner, or customer information is permitted.

1. **Participant identity:** exactly one privately designated participant controls their mailbox. An Auth identity and matching `public.users` / `public.member_profiles` records may be created only after separate authority. The email remains inside Auth/application contracts and is never copied to repository evidence, commands, screenshots, logs, or chat. A pre-existing or ambiguous identity is adopted, not Sprint-owned, and is never deleted.
2. **Existing authority records:** reuse the seeded `membership_levels.code = 'trainer'` and its existing `horse.records.write` permission mapping. Do not create or modify membership levels, permissions, roles, RLS, or schema.
3. **Trainer application link:** one `user_membership_levels` row links the participant's `public.users.id` to the existing trainer membership level. `public.users.primary_role_code` remains the existing `trainer` contract; `member_profiles.is_active` is true and its display label is synthetic.
4. **Assigned fixture:** create one synthetic stable, one synthetic horse in that stable, and one `biochemistry_horse_access_assignments` row linking the participant profile to that horse with existing `role_code = 'trainer'`, `access_level = 'manage'`, active start time, and a synthetic run note.
5. **Denial control:** create a second synthetic stable and one synthetic horse with no participant access assignment. It exists only to prove that cross-stable identity, count, workflow, navigation, and writes remain unavailable.
6. **Workflow fixture/action:** begin with no required pre-existing biochemistry result. The permitted human action creates at most one synthetic `biochemistry_tests` row through the existing typed capture/review/submit path and, only if the participant adds the instructed synthetic note, one `biochemistry_test_notes` row. No upload or Storage object is created.

## Ownership, retention, cleanup, and proof

- Sprint-owned after explicit creation: the shareable link, exact synthetic stables/horses/access assignment, trainer membership link, workflow test/note, and only an unambiguously new Sprint-created Auth/application identity. Existing seed authority and any adopted identity are not owned.
- Retention decision: none is authorised. Revoke the shareable link and remove all exact Sprint-owned fixtures after acceptance or abandonment. Any retention requires new explicit authority.
- Dependency-safe deletion order: `biochemistry_test_uploads`/Storage objects if unexpectedly present (expected zero), `biochemistry_test_notes`, `biochemistry_tests`, `biochemistry_horse_access_assignments`, synthetic horses, synthetic stables, `user_membership_levels`, `member_profiles`, dependent application rows, `public.users`, then exact Sprint-created Auth identity last. Revoke temporary callback or shareable-link state after the participant no longer needs it. Stop on ambiguous ownership or a failed/partial delete.
- Post-cleanup proof: run exact-prefix and owned-ID counts for tests/notes/access/horses/stables/membership/profile/user rows; list Auth users through the protected admin path and count only the run-owned identity; list the governed Storage bucket by exact synthetic prefix; require Auth/application/Storage `0/0/0`, zero orphans, and cleared process/browser state. Separately re-read production deployment/aliases and confirm the accepted production Supabase reference, production data, Site URL, DNS, providers, and aliases were unchanged.

## Human authorization, acceptance, and closeout

The human supplied all three required statements: authority for one revocable link on the exact deployment, self-designation as the one trainer representative, and authority for the recorded minimum synthetic fixture graph against non-production project `uvskssaecdhxcgytkasc`. No protected participant value accompanied or is retained with those statements.

- One revocable Vercel Sharable Link was created for exact deployment `dpl_F8nk4bA3V84zsP9k7Wj91V8fGy9E`; its bearer URL was kept out of repository evidence and commentary and opened privately.
- Opening baseline at `2026-08-01T09:07:37.945Z` proved the Sprint prefix zero. The seeded trainer level included required `horse.records.write` and an additional pre-existing `horse.comments.write`; neither permission was changed.
- Attempt 1 failed before challenge creation. Audit proved zero new Auth identities and zero Sprint prefix/application/Storage state. A fresh attempt-2 cutoff was established at `2026-08-01T09:13:38.847Z`.
- Attempt 2 successfully caused a private Auth email challenge, but the message supplied a numeric OTP while the approved product exposes no OTP entry/verification control and instructs link completion. The participant disclosed no code or protected authentication material. Phone/core journey and larger-viewport orientation could not proceed.
- The mismatch requires a material authentication-contract choice outside the approved Sprint: implement numeric OTP verification or change the isolated email template to provide a link. No third attempt was made and no product, provider, schema, role, permission, membership, assignment or persisted contract was changed.
- No fixture graph was created. Final cutoff and exact-prefix proof found zero Sprint-created Auth identities, application records and Storage objects: `0/0/0`, zero orphans.
- The Sharable Link was revoked through the Vercel deployment Share control. Final state says only people with access can view/comment and Copy Link is disabled. Operator browser state was finalized.
- Exact Sprint-owned alias-free Preview deployment `dpl_F8nk4bA3V84zsP9k7Wj91V8fGy9E` was deleted after revocation. A read-only follow-up returned not found and confirmed zero alias matches.
- Production Supabase `tagnbgkroihagjmvehlx`, production aliases, DNS, Site URL, providers and data remained unchanged.

Exactly one Sprint outcome applies: `trainer-contract-expansion-required-clean`. Core Product Done remains false.
