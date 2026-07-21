# Sprint 021J Authenticated Proof Manifest

## Operator boundary

`.env.local` is public candidate configuration only; `.env.test.local` is protected candidate configuration only. Builder must not edit, display, copy, stage, or inspect either file through tool output. Stage A validates exact candidate public target and schema before a separate Stage B may read protected configuration.

## Target and run rules

- Candidate only: `uvskssaecdhxcgytkasc`; old project `tagnbgkroihagjmvehlx` and unexpected projects are refused.
- Fresh format: `021J-RLS-YYYYMMDD-NN`, selected only after authoritative zero baselines.
- Prior 020G/021E and every 021G-021I identifier/reservation are refused.
- Current run: none selected.

## Actors, topology, and ceilings

Actors: ADMIN, TRAINER_A, TRAINER_B, MANAGER_A, VET_X, CONSULTANT_X, HAND_A, OWNER_A, OWNER_B, SUSPENDED. Topology: STABLE_A/STABLE_B and A1/A2/B1/B2 with relationships defined in applied requirements.

Ceilings: Auth 10; application users 10; profiles 10; role/membership rows 10; stables 2; horses 4; ownerships 2; combined assignments 10; tests 4; comments 12; Storage 0.

## Evidence allowlist and cleanup

Emit aliases, aggregate counts, expected/actual classes, codes, and pass/fail only. Cleanup is comments → tests → assignments/ownerships → horses → stables → roles/profiles/application users → Auth identities last. Refuse broad, ambiguous, copied-ID, or ceiling-exceeding cleanup.

## Stop conditions

Stop before protected load on target/schema/ignore/tracked failure. Stop before mutation on baseline, health, ledger, advisor, callback, ceiling, or ownership-ledger mismatch. Stop the matrix on first assertion failure and clean immediately. Incomplete cleanup is an active incident.
