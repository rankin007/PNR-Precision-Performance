# Sprint 021H Authenticated Proof Manifest

## Immutable target and run rules

- Candidate: `uvskssaecdhxcgytkasc`; old project `tagnbgkroihagjmvehlx` is refused.
- Fresh run format: `021H-RLS-YYYYMMDD-NN`, selected only after authoritative zero-anchor proof.
- Retired runs include `020G-RLS-20260720-01`, `021E-RLS-20260720-01`, and every prior 021G reservation.
- Current run: **none selected**. Protected preflight stopped before zero-anchor completion.

## Actors and topology

Ten aliases: ADMIN, TRAINER_A, TRAINER_B, MANAGER_A, VET_X, CONSULTANT_X, HAND_A, OWNER_A, OWNER_B, SUSPENDED. Planned topology is STABLE_A/STABLE_B and A1/A2/B1/B2 exactly as specified by the applied requirements.

## Ceilings

Auth identities 10; application users 10; profiles 10; primary roles/memberships 10; stables 2; horses 4; ownership relationships 2; combined access assignments 10; biochemistry tests 4; comments 12; Storage objects 0.

## Evidence allowlist

Only run IDs, actor/fixture aliases, aggregate counts, expected/result classes, message codes, and pass/fail states may be emitted. Addresses, credentials, links, tokens, cookies, Auth UUIDs, and private identifiers are prohibited.

## Cleanup graph

Comments → tests → access/ownership assignments → horses → stables → membership/profile/application users → Auth identities last. Cleanup must use exact in-memory ownership anchors and refuse broad, wildcard, ambiguous, or ceiling-exceeding targets.

## Stop conditions

Stop before mutation for wrong target, reused run, non-zero unexplained baseline, missing protected acquisition, unsafe output, callback/config difference, ledger/structure/advisor mismatch, or project-health uncertainty. Stop the assertion matrix on first failure and enter exact compensation/cleanup.
