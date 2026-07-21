# Sprint 021K Administrator Read Diagnosis

Status: diagnosis complete.

## Exact root cause

`auth-issued-session-rejected`

The supported magic-link artifact exchange returned a session object, but the candidate Auth service immediately rejected that same issued access token on the bounded `getUser` identity check. Both the supported access-token Supabase client and direct REST control were unauthorized; helper RPCs therefore never reached database evaluation. Header-only construction also failed, but it is not the causal layer because the independent controls fail identically.

## Evidence classes

- Auth exchange: session returned.
- Auth identity verification with issued token: error.
- Header-only horse read: error / generic-operation / not-one.
- Supported access-token horse read: error / generic-operation / not-one.
- Direct REST control: unauthorized / not-one.
- Database helpers: not evaluated successfully.
- Every minimal diagnostic topology was cleaned to zero, including Auth identity last.

## Branch decision

No Branch A/B/C correction is valid. Branch A is disproved by independent client/REST failure. Branch B cannot repair a token rejected before PostgREST/RLS evaluation. Branch C cannot repair direct Auth/REST rejection and is expressly unavailable while direct RLS fails.

The correction requires hosted Auth/JWT token issuance/verification configuration or provider-level investigation, which is outside the approved conditional scope. Outcome: `diagnosis-complete-blocked-clean`.
