# Sprint 021L Hosted Auth/JWT Diagnosis And Reconciliation

Status: complete — `provider-escalation-required-clean`.

## Sanitized diagnosis

- Exactly one confirmed `.invalid` Auth identity was created; no application or Storage fixture was created.
- Supported one-time exchange succeeded and returned a genuine candidate session.
- The issued token had valid structure, exact-candidate issuer, expected audience, `authenticated` role, supported asymmetric algorithm, present key ID, advertised JWKS match, valid issue/expiry classes, acceptable skew, and matching subject.
- Candidate JWKS was available with one supported asymmetric verification key. Dashboard state showed a current asymmetric key, no standby key, and one still-trusted previous legacy key.
- Immediate `getUser` failed; independent direct Auth and authenticated Data API controls were unauthorized. The publishable API key was rejected as an actor; the candidate-bound secret key was used only for administration.
- Local request construction, issuer/time validity, missing JWKS trust, database/RLS, and application integration are ruled out by the independent controls.

## Decision

Root cause: `provider-internal-inconsistency`. Branch: **E — Provider escalation**.

No safe tenant-side correction is supported. Current and desired hosted state are therefore identical; no signing, Auth, API-key, callback, schema, or application mutation was made and no rollback is required. The stop condition is provider confirmation or repair of issued-token verification. After provider resolution, Builder must rerun a fresh one-identity minimal chain before any full matrix.

Cleanup proved Auth 0, application 0, and Storage 0.
