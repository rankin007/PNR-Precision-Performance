# Architect Briefing — Sprint 035I Closeout

## Where things stand

The Gmail API and exact External/Testing, sole-test-user and `gmail.readonly` configuration are established. Deterministic Gmail/OAuth/Credential Manager contracts pass, but the protected live path did not start.

## Current status

Closed `gmail-secure-adapter-readiness-blocked-clean`. Request/verification is `0/0`, exact-owned state is `0/0/0`, both fixed credential targets and the ledger are absent.

## Since last sprint

Applied the four-file 035I Pack, implemented Gmail OAuth/MIME/request and Credential Manager contracts, enabled Gmail API and configured the test-only OAuth surface. A protected-output incident during Desktop-client creation was contained by deleting the exact client before enrollment or OAuth.

## Architecture / file map

- `scripts/gmail-oauth-035I.mjs`: PKCE/state/scope/token contracts.
- `scripts/gmail-mailbox-035I.mjs`: bounded list/get, plus-address and MIME contracts.
- `scripts/CredentialManager035I.ps1`: fixed current-user credential targets.
- `scripts/test-gmail-secure-adapter-035I.mjs`: deterministic Gmail/OAuth matrix.
- `planning/reviews/035I-gmail-secure-mailbox-adapter-and-single-run-acceptance.md`: sanitized closeout evidence.

## Decisions

Browser-control output is not an acceptable channel for Desktop-client material. The rendered client was not enrolled or reused and was deleted exactly.

## Risks / watch-items

Do not recreate a client through a surface that exposes its material to agent-visible output. Gmail API and test OAuth configuration remain, but there is no retained client or grant.

## Open questions for the Architect

Which operator-only enrollment mechanism can create and transfer Desktop-client material directly to Windows Credential Manager without agent-visible rendering?

## Validation / test status

Gmail/OAuth 35 checks, inherited 035H 32 checks and synthetic Credential Manager round trip passed. OAuth, Gmail profile/list, identity preparation, email request and verification were not run.

## Recommended next Architect action

Design a non-observable operator-only client enrollment path. Do not authorize a live retry until the protected-output boundary is demonstrably preserved. Trainer-pilot completion and product-wide Done remain unclaimed.
