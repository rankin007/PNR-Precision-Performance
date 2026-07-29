# Sprint 035C Protected Participant Matching Contract

## Accepted correction

The product owner accepted a narrow protected-coordination correction before participant-account mutation. The original process-memory-only mapping cannot bridge the provider-operator handoff because Builder must discover the operator-managed A/B/C identities without receiving inboxes, Auth UUIDs or authentication artifacts. Administrator-controlled Supabase Auth `app_metadata` is the protected matching mechanism for this sprint.

`user_metadata` is prohibited as alias authority because an authenticated user can generally influence user-controlled metadata. `app_metadata` is administrator-controlled through the trusted provider/Admin path and is therefore the safer bounded handoff marker. It is coordination metadata only, not application access authority.

## Exact allowlist

Only these fields and values may be added:

- `participant_alias`: exactly `A`, `B` or `C`;
- `pilot_sprint`: exactly `035C`.

All existing `app_metadata` keys must be preserved and merged. No complete identifiable metadata payload may be recorded. Durable evidence records field names and sanitized counts only.

Participant matching remains in protected process memory after sanitized discovery. Inboxes, Auth UUIDs, OTPs, magic links, tokens, credentials and identifiable metadata payloads must never enter repository files, ordinary chat, screenshots, logs or durable evidence.

## Non-authorization boundary

Neither `participant_alias` nor `pilot_sprint` may be used by application code, memberships, assignments, permissions, policies or RLS. Existing application users/profiles, trainer memberships, horse assignments, permissions and RLS remain the only access authority.

## Trusted helper boundary

If the Dashboard cannot guarantee the exact redirect, any Admin API helper must run only in a trusted protected environment, obtain the approved Supabase URL and service credential from protected process configuration, search before create/invite, avoid duplicate identities, use passwordless invitation only, set the exact approved callback, merge existing `app_metadata`, process A/B/C individually, retain an exact protected ownership ledger and emit only sanitized alias states.

Read-only inspection confirmed the Dashboard invitation dialog has no redirect control. Source inspection also confirmed the existing Preview sign-in action uses `NEXT_PUBLIC_SITE_URL` and otherwise falls back to localhost; that variable is outside the approved Preview configuration. Neither path guarantees the exact callback. The bounded helper `scripts/supabase-participant-handoff-035C.mjs` is therefore the accepted handoff path. It consumes the protected A/B/C inbox mapping and service credential only from protected process configuration, uses the exact approved redirect, and emits sanitized ownership states for later Auth-last cleanup.

After a complete successful handoff, the helper writes one fixed temporary sanitized ownership ledger containing only sprint ID, aliases A/B/C and `existing-tagged` or `invited-tagged`. Cleanup consumes and removes that ledger. It contains no inbox, Auth UUID, token, credential or metadata payload and prevents ownership from being reconstructed from identity details or retransmitted in chat.

## Cleanup

For a Sprint-035C-owned Auth identity, delete it Auth-last after application cleanup and operator approval. For a pre-existing/not-owned identity, preserve the identity and all unrelated metadata while removing only Sprint 035C fields `participant_alias` and `pilot_sprint`. Final evidence records owned Auth deletion counts or explicit not-owned/excluded treatment, never identifiers.
