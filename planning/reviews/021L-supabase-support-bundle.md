# Sprint 021L Sanitized Supabase Support Bundle

## Request

Please investigate an internally inconsistent Auth/JWT state for project `uvskssaecdhxcgytkasc`. During a bounded 2026-07-21 UTC diagnostic window, supported passwordless exchange issued a session and access token, but the same token was immediately rejected by the project Auth identity endpoint and Data API.

## Sanitized evidence

- Exchange: success.
- Immediate SDK `getUser(access_token)`: error.
- Direct Auth user endpoint: unauthorized.
- Data API with candidate publishable key in `apikey` and issued user JWT in `Authorization`: unauthorized.
- Token classes: valid structure; exact-project issuer; expected audience; authenticated role; supported asymmetric algorithm; key ID present and advertised by JWKS; issue and expiry valid; clock skew within limit; session subject matched created identity.
- JWKS: available; one supported asymmetric key; issued-token key match advertised.
- Hosted signing lifecycle: current asymmetric key present; no standby key; one previous legacy key remains in the verification lifecycle; no revoked-key evidence observed.
- API keys: candidate publishable and secret classes present/enabled; legacy anon and service-role classes present. Server secret was never used as a user actor.
- Request construction follows the documented API-key/JWT separation. Database/RLS and application code were not reached by the failing Auth controls.
- Exactly one synthetic `.invalid` identity was used; it was deleted. Final Auth/application/Storage counts are all zero. No hosted setting was changed.

No token, claim value, key identifier/material, UUID, address, response body, or customer data is included.

## Reproduction sequence

1. Create one confirmed synthetic Auth identity through the candidate Admin API.
2. Generate a supported magic-link verification artifact without delivery.
3. Exchange its token hash using `verifyOtp` with email type.
4. Call `getUser` with the returned access token.
5. Call the direct Auth user endpoint with candidate publishable key plus the issued bearer token.
6. Call a bounded Data API endpoint with the same documented credential separation.
7. Observe exchange success followed by unauthorized verification/API controls.
8. Delete the identity and confirm zero state.

## Operator submission and resumption

1. Open Supabase Dashboard Help and create a technical support request for the candidate project.
2. Paste this sanitized bundle only; do not attach environment files, tokens, keys, claims, raw logs, or screenshots containing identifiers.
3. Ask Supabase to inspect Auth-issued JWT verification and propagation for the current asymmetric signing key and the previous legacy verification state.
4. Record the support case reference outside credential files and wait for provider confirmation or remediation.
5. When resolved, tell Builder that Supabase has resolved the 021L provider issue; do not send credentials.

Builder will then verify unchanged target/configuration, authoritative zero state, two fresh minimal Auth chains, and only after those pass run the full authenticated matrix under a new Pack or resumed authorized 021L scope.
