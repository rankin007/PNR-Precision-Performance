# Sprint 021M Timed JWT Reproduction Results

Outcome: `provider-escalation-required-clean`.

Correlation values are prohibited from this file and are retained only in the support-escalation record.

- T0: supported exchange succeeded; SDK `getUser`, direct `/auth/v1/user`, and authenticated `/rest/v1/horses?select=id&limit=1` were unauthorized. The sole identity was deleted and zero state proved.
- Clean interval: no identity, session, artifact, token, protected process, runtime, browser state, application fixture, or Storage object remained.
- T+20: began 1,330 seconds after T0 end, inside the 20-30 minute rule. A different identity/session/client reproduced the same fixed result classes and was deleted.
- Classification: `provider-internal-inconsistency-persistent`.
- Stable Auth gate: failed; recovery confirmation and full authenticated matrix correctly not run.
- Final state: Auth 0, application 0, Storage 0; no hosted or repository behavior mutation.
- Escalation submission: operator confirmed submitted on 2026-07-21; provider response remains pending.

## Source hashes (SHA-256)

- timed harness: `18A39CADA17330E755005E92F20E507228B6AFA077468CF35F10F1119788CA3E`
- timed self-test: `E06F06BF0AF6C226AFFC5B116B205AC2F337C1A36E06AF267972AD1FD86D1287`
- proof-gate harness: `8B0CF56E49B5AE4931CFBC8F3F3A0E751E250C29A2F0311757CDE2CD0AC1AD00`
- proof-gate self-test: `6F53F58B6F2255EF57F342B09FD08F2D115375FEEAF4728183AE4077A4BF824C`
