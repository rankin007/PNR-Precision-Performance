# Sprint 035M Approved Path Manifest And State/Action Matrix

Date: 2026-08-02

## Baseline identity

- Worktree: `C:\tmp\pnr-035m-first-trainer-preview-access-and-core-journey`
- Branch: `codex/035M-first-trainer-preview-access-and-core-journey`
- Exact parent: `ea8417d3c7450f25c90644f23d8558c9f5938552`
- Parent authority: clean re-attested `codex/034-reconciled-product-baseline`
- Dirty `develop`, prior 035 branches/Packs, provider assumptions and temporary deployment content are excluded.

## Existing approved path

| Journey step | Existing source/contract | 035M disposition |
|---|---|---|
| Approved-account sign-in | `app/sign-in/page.tsx`, `components/auth/sign-in-form.tsx`, `app/auth/actions.ts`, `app/auth/callback/route.ts` | Preserve passwordless OTP and callback contracts; correct only trainer-facing clarity, focus and privacy-safe presentation. |
| Protected session and portal denial | `lib/auth/app-context.ts`, `lib/auth/session.ts`, `lib/auth/access.ts`, portal route-group layout | Reuse unchanged permission/session decisions; add no bypass or permission behavior. |
| Assigned horse/stable reads | `lib/domain/horses.ts` through the signed-in Supabase server client and existing RLS | Preserve query contracts; compose explicit fail-closed trainer states without adding fields or widening visibility. |
| Trainer dashboard | `app/(portal)/portal/page.tsx` | Replace scaffold-oriented presentation with a truthful assigned-horse journey using existing authorised values only. |
| Horse workspace and denial | `app/(portal)/portal/horses/[horseId]/page.tsx`, `getAccessibleHorseDetail` | Preserve non-leaking unavailable result; improve stable/horse orientation, dashboard return and permitted action handoff. |
| Existing permitted action | `/data-entry/biochemistry`, `requireOperationalWriteAppContext`, Sprint 022 typed capture and server action | Reuse capture/review/submit contracts; carry only the authorised horse identifier as an optional initial selection and re-check it against accessible options. |
| Sign-out and repeat sign-in | `components/layout/app-shell.tsx`, `signOutAction` | Preserve server sign-out; present a clear privacy-safe action and verify protected denial afterward. |
| Hosted proof | Existing protected Preview and Supabase proof patterns | Add a 035M-specific, alias-free, synthetic-only harness and sanitized evidence; do not reuse older 035 authority. |

## Typed state/action matrix

| State | Authorised basis | Trainer presentation | Permitted action | Fail-closed rule |
|---|---|---|---|---|
| zero accessible horses | successful RLS-filtered horse query with zero rows | `empty`: no assigned horses are currently available | sign out; contact authorised access owner outside the app | no sample cards, inferred counts or normal/complete state |
| one accessible horse | one RLS-visible horse row | `ready`: stable and horse orientation plus supported workflow context | open that horse workspace | no inaccessible record affects text, count, order or links |
| many accessible horses | multiple RLS-visible rows ordered by existing query | `ready`: alphabetical assigned-horse list | open one visible workspace | no ranking by unavailable clinical priority |
| incomplete workflow | latest visible record is `blocked` or `unscored` | `incomplete`: operational review needed | open the existing record when write permission exists | never call incomplete normal, safe or clinically urgent |
| pending action | client submit stage or callback/request transition | `pending`: action is in progress or mailbox action remains private | wait; use one explicit correction path on failure | no duplicate or blind retry |
| completed workflow | latest visible record is `scored` under stored versions | `completed`: stored workflow step completed | open workspace; capture another permitted record only when authorised | completion is operational, not clinical approval |
| unavailable workflow | missing record, missing supported comparison, missing authority, or unavailable service | `unavailable`: exact supported context is not available | open workspace or retry later where safe | never default missing information to Green/normal/complete |
| failed load/action | authorised query or action returns a sanitized failure | `failed`: data/action could not be completed | retry only after diagnosis or return safely | no raw provider error, protected value or partial data |
| denied horse/route | anonymous, wrong-horse, cross-stable or absent RLS-visible record | `denied`: requested workspace is not available | return to dashboard or sign in | no existence, identity, count or workflow leakage |
| revoked session/access | session absent/expired or membership/permission inactive | `revoked`: protected access no longer available | sign in again or contact authorised access owner | no cached protected content or fallback fixture |

## Fixture ownership and cleanup order

Before hosted creation, the product owner privately designates exactly one trainer and authorises synthetic state. Sprint-owned application records use non-identifying synthetic labels and are recorded only by sanitized ownership class. Cleanup order is biochemistry comments/evidence dependencies, biochemistry tests, horse assignment, synthetic horse, membership/role dependencies, synthetic stable, application user/profile dependencies, temporary Preview callback state, then an exact 035M-created Auth identity last. Pre-existing, adopted or ambiguous identities are never deleted.

No participant email, authentication code/link, mailbox content, cookie, token, credential, session material or personal identifier may enter chat, commands, URLs, logs, screenshots or repository evidence.

## Revised code-gate test target

Sprint 035M will add **72 new machine assertions/checks**. Maintained Sprint 021AH, 022 and 022B regressions are required validation but contribute **zero** to this new-assertion count.

| Category | Executable pure/integration assertions | Static/source assertions | Rendered Preview checks | Category total |
|---|---:|---:|---:|---:|
| State composition | 24 | 0 | 0 | 24 |
| Navigation/action handoff | 6 | 2 | 0 | 8 |
| Denial/non-leakage | 7 | 1 | 2 | 10 |
| Privacy | 3 | 3 | 2 | 8 |
| Accessibility/responsive contracts | 0 | 10 | 0 | 10 |
| Preview lifecycle/cleanup | 2 | 0 | 10 | 12 |
| **Totals** | **42** | **16** | **14** | **72** |

Arithmetic: `24 + 8 + 10 + 8 + 10 + 12 = 72`; by evidence class, `42 + 16 + 14 = 72`.

The 24 state-composition assertions include an explicit `3 states x 6 consumers = 18` regression matrix for unconfigured environment, empty authorised result and query failure across portal overview, portal horse list/detail composition, operations data-entry landing, feeding, track and biochemistry consumption groups. The remaining six cover ready one/many, incomplete, completed, unavailable and failed/revoked composition. Every shared-consumer case must prove no sample horse appears and no unavailable result becomes normal, ready or actionable.

The separate human acceptance journey is not counted as an automated assertion. It has eight observed steps: private approved-account sign-in, exact assigned synthetic stable/horse visibility, workspace open, one existing permitted biochemistry action, return to dashboard, sign-out/protected denial, repeat sign-in with the same bounded assignment, and phone completion plus larger-viewport orientation.

## Revised shared-surface boundaries

`lib/domain/horses.ts` remains shared by portal list/detail and operations landing, feeding, track and biochemistry routes. Removing fallback/sample leakage must preserve truthful fail-closed behavior for every existing consumer. The focused regression matrix above covers every consumer under unconfigured, authorised-empty and query-failure states.

`components/layout/app-shell.tsx` remains shared by portal, operations and administration. It may receive only a narrow opt-in privacy prop whose default preserves current email presentation. `app/(portal)/layout.tsx` will set that prop for the trainer portal. Admin and operations layouts will remain unchanged and source assertions will prove their default behavior is preserved.
