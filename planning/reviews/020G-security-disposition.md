# Sprint 020G Security Disposition

| Surface | Disposition | Evidence / next verification |
|---|---|---|
| Eleven repository SECURITY DEFINER helpers | Accepted with joint owners | Migration 0010 is remotely verified: pg_catalog, public search path; PUBLIC/anon execute revoked; authenticated execute retained because current RLS policies call these helpers as authenticated users. Randell Rankin and Philip Rankin jointly own this disposition. Advisor reports 11 authenticated-callable warnings and zero errors. |
| Legacy eTrakka SECURITY DEFINER view | Retired | Must remain absent on clean candidate. |
| Legacy client_applications permissive policies | Retired | Table and policies must remain absent. |
| Leaked-password protection | Accepted Free-plan exception | Unavailable on the approved Free plan and remains disabled. Current application uses Email OTP/magic-link only and has no password sign-in flow. Randell Rankin and Philip Rankin jointly own the exception. Any future password-authentication feature must reopen and resolve this control before implementation. No plan upgrade or charge is authorized. |
| Security advisor errors | Passed after hosted configuration | The candidate linter was rerun on 2026-07-20: zero errors and zero informational suggestions. |
| Advisor warnings | Accepted and stable after hosted configuration | Rerun reports the same eleven authenticated-helper warnings accepted for current RLS necessity with joint owners; no PUBLIC/anon exposure. |
| Candidate credential incident | Contained | Browser inspection retained legacy candidate credential material. Execution stopped before harness/runtime/Auth/fixtures; affected Builder task deleted; replacement publishable/secret keys present; legacy anon/service_role keys disabled. No value or fragment is reproduced. |
| Synthetic Auth/RLS validation | Transferred to Sprint 021 discovery; not passed | Exact historical procedure is recorded in `020G-synthetic-auth-rls-test-plan.md`; no harness execution, synthetic user, fixture, or candidate-connected runtime completed. |

Sprint 020G is candidate-ready, not cutover-complete. No production cutover may proceed until later authenticated proof and cutover gates have evidence-backed disposition. The leaked-password exception applies only while the application remains passwordless.
