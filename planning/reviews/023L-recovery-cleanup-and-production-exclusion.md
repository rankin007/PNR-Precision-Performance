# Sprint 023L - Recovery, Cleanup And Production Exclusion

Immediate preflight passed through the operator-reported safe classification. The approved recovery policy remains encrypted Aprec8-controlled copies of synthetic Storage objects, SHA-256 restore verification, 30-day retention and secure deletion after retention unless an incident or governance hold applies. Supabase database backups are not treated as Storage-object recovery.

Pre-application recovery readiness is not yet proven. No concrete protected Aprec8-controlled destination/tool, scoped operator access path, export/restore procedure or retention/secure-deletion control is available to Builder without exposing protected configuration. No synthetic object was created and no recovery mutation was attempted.

## Manual intervention

1. **Blocked/not working:** the approved recovery policy exists, but its protected destination and operational export–restore–delete capability are not verified and available for the required proof.
2. **Evidence checked:** exact target and zero-state preflight passed; repository authority specifies encryption, SHA-256 restore testing, 30-day retention, secure deletion and hold exceptions; database backups exclude Storage object bytes; no protected recovery binding is present in the worktree.
3. **Exact action required:** the approved operator must identify and prepare the encrypted Aprec8-controlled recovery mechanism through a protected channel, without supplying credentials or destination details in conversation.
4. **Steps:** confirm the mechanism accepts only the bounded synthetic proof object; confirm protected export/copy, restore/download and exact-copy deletion are available; confirm encryption at rest/in transit; confirm 30-day expiry/secure deletion and incident/governance-hold handling; confirm Builder can invoke or operator can perform each protected step while returning only hashes, counts and pass/fail classifications.
5. **Builder verification afterward:** before migration application, record readiness classification only; after migrations create the governed private bucket, use one unavailable synthetic object, compare original/recovered SHA-256, remove proof copies exactly, and stop on any access, integrity, retention or cleanup ambiguity.

Outcome before operator verification: `storage-recovery-readiness-blocked-clean`.

## Verified DPAPI CurrentUser readiness

The approved operator verified the bounded Windows recovery mechanism with safe classifications only:

- destination `C:\tmp\aprec8-023l-recovery`, outside the repository and OneDrive;
- artifact-level encryption at rest through Windows DPAPI CurrentUser;
- synthetic encryption/decryption round trip passed;
- restored bytes matched;
- exact encrypted test artifact deletion passed and post-deletion absence was confirmed; and
- no credential or recovery key was exposed.

Governance requires TLS for Supabase transfer, exact owned synthetic Sprint 023L objects only, immediate deletion after successful proof or 30 days maximum, and a recorded authorised incident/governance hold for any paused deletion. Evidence may claim logical deletion and verified absence only, never physical SSD-sector overwriting. DPAPI CurrentUser supersedes the unverified BitLocker requirement for this bounded proof.

The recovery directory exists and contains zero proof artifacts after the readiness test. Outcome: `storage-recovery-readiness-passed-clean`.

## Post-application protected-access gate

Post-application structural verification passed with exactly one aggregate row and every Boolean true. The governed bucket and zero state are proven, but this isolated worktree contains no protected Supabase public/admin environment binding. Builder has no approved Storage API credential surface from which to create, export, restore and delete the one exact-owned synthetic unavailable object. No credential was requested or exposed. No synthetic object or application/Auth fixture was created, and the DPAPI recovery directory remains empty.

1. **Blocked/not working:** the bounded Storage-object recovery proof cannot begin because the protected Supabase URL/anon and service-role bindings are absent from the isolated execution environment.
2. **Evidence checked:** exact project link and remote ledger pass; structural/security and zero-state aggregate classifications all pass; DPAPI CurrentUser readiness and empty recovery destination pass; `.env.local`, `.env.test.local` and `.env.production.local` are absent; no approved secret value exists in the repository or process environment used for the proof.
3. **Exact action required:** the approved operator must make the exact project URL, anon key and service-role key available through the established protected local environment-file mechanism without sending or displaying any value in conversation.
4. **Steps:** in the exact 023L worktree, use ignored local environment files to bind `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to project `uvskssaecdhxcgytkasc`, and `SUPABASE_SERVICE_ROLE_KEY` to that same project; do not add scanner/sanitiser values, Vercel configuration or `CRON_SECRET`; do not stage files or return their contents; report only that protected recovery bindings are ready.
5. **Builder verification afterward:** verify file-name and variable-name presence only, validate the URL host maps exactly to `uvskssaecdhxcgytkasc` without printing keys, acquire protected values only inside a redacting child process, reconfirm remote zero state, then run one exact-owned synthetic unavailable-object export/hash/DPAPI-restore/match/removal/recovery-copy-deletion/final-absence proof and exact cleanup before any Vercel action.

Current outcome: `storage-recovery-protected-binding-operator-blocked-clean`.

## Bounded recovery proof attempt

The approved operator prepared the protected exact-project bindings. Builder verified only required variable-name presence and the exact TLS host classification; no value was printed or retained. An ephemeral non-repository harness used the existing dependency tree and created one exact-owned synthetic Auth/application lineage in preparation for the unavailable-object proof.

The governed `initiate_test_evidence_upload` call returned the sanitised failure classification `INITIATION_FAILED`. The failure occurred before object transfer, so no Storage object, DPAPI recovery copy or restored object was created. The harness removed only its exact owned synthetic application fixtures and deleted Auth last. Final safe counts were Auth `0`, application `0`, Storage `0` and recovery artifacts `0`; cleanup reported no failure. No secret or payload was returned.

1. **Blocked/not working:** the required governed initiation RPC refused the exact-owned synthetic recovery request, so the object recovery proof cannot begin.
2. **Evidence checked:** exact target/TLS binding passed; migration ledger, structural/security aggregate and initial zero state passed; synthetic prerequisites were created through the protected service client; failure was bounded to initiation before Storage transfer; exact cleanup completed with final `0/0/0/0`; the DPAPI directory is empty.
3. **Exact action required:** Architect must reconcile the remote initiation failure against committed migration `0019` and the approved RPC contract, then issue a separately governed corrective or diagnostic sprint if remote contract correction is required.
4. **Steps:** preserve migrations and current remote state; do not retry blindly, repair history, edit migration `0019`, add migration `0020`, create an object manually or use unrestricted SQL; review the sanitised `INITIATION_FAILED` boundary and committed function dependencies; define an additive correction and new remote validation/cleanup gate if needed.
5. **Builder verification afterward:** in the separately authorised sprint, reconfirm exact target, ledger and `0/0/0` state; prove governed initiation first; only then repeat one exact-owned fail-closed object export/hash/DPAPI restore/removal/copy deletion/final-absence proof.

Outcome: `storage-recovery-proof-blocked-clean`. Recovery proof did not pass, so no Vercel Preview configuration or deployment may begin.
