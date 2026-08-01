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
