# Sprint 035B Preview Configuration And Trainer Pilot Completion

## Outcome

Sprint 035B closes `trainer-pilot-participation-partial-clean`.

The exact-candidate non-production Preview and authenticated synthetic matrix passed. Trainer Participants A, B and C did not begin the journey because this Builder session had no protected participant-inbox mapping or provider-operator coordination path. No participant contact detail, account, invitation, credential, OTP, magic link, Auth identifier or personal observation was requested, received or retained. Builder-only testing is not represented as trainer acceptance.

## Exact targets and candidate

- Vercel project: `pnr-precision-performance`; generated Preview only.
- Final accepted Preview: deployment `dpl_HDtvZnnz9osHuyQ7zW7WX1w1mpWE`, URL `pnr-precision-performance-laum4sric-rankin007s-projects.vercel.app`, Ready/Preview, no production or custom alias.
- Exact deployed candidate: `dedc19001acd9229d435718e51ceabbbdd208860`, descended from Sprint 035 final SHA `57bfca225a0a41f639b9fa7b0875589bde9372f1`.
- Supabase: `uvskssaecdhxcgytkasc`, `Precision Performance Clean Rebuild`, Singapore `ap-southeast-1`, healthy, exact migration ledger `0001` through `0021`.
- Old Supabase project `tagnbgkroihagjmvehlx` was not contacted or changed.

Only the three approved Supabase runtime variables were configured for the scoped Vercel Preview branch through protected process/provider paths. Values were never printed, passed as command arguments, retained in repository files or evidence, or reproduced in screenshots. Production and Development variables were not changed.

## Material finding and correction

The first rendered matrix exposed that dashboard/detail actions were derived from role-level permission without independently agreeing horse-specific write authority. `lib/domain/horses.ts` now resolves `can_write_biochemistry_horse` for each accessible horse and fails closed to no write action on RPC error or false. Focused coverage asserts this boundary. No schema, migration, RPC, RLS, role, membership model or assignment contract changed.

Reporter-only defects were diagnosed without product expansion: an incorrect heading-tag assumption, an expected-label mismatch, an overly broad navigation locator, and a fixture that attempted to model read-only access with a trainer role whose existing authority is write-capable. The final matrix used the existing veterinarian read-only role and a genuine authenticated session. Every failed attempt cleaned exact-owned application/Auth/Storage state to `0/0/0` before retry.

## Authenticated synthetic acceptance

Run `035B-20260730-06` passed with one synthetic stable, three synthetic horses, three passwordless synthetic identities and zero Storage objects. One-time magic-link artifacts and sessions remained in process memory and were cleared; no password authentication was used.

- Phone `390x844`: accessible-only worklist, deterministic workflow ordering, incomplete/pending/completed states, visible focus and no horizontal overflow passed.
- Horse workspace: workflow basis, permission-correct action and dashboard return passed.
- Desktop `1440x900`: read-only action suppression and wrong-horse denial passed.
- Tablet `1024x768`: completed state and immediate revoked-access denial without workflow leakage passed.
- Authenticated RLS: read-only write and revoked record read were denied.
- Failed/unavailable sanitisation and no-action behavior are covered by the focused Sprint 035 executable regression. A live server-side database fault was not injected because doing so would require an unauthorized schema/provider fault; the unit boundary is the stronger safe substitute.

Final exact-owned cleanup is application/Auth/Storage `0/0/0`. The exact temporary Preview callback was removed after acceptance; the unchanged production Site URL and production callback remain. No participant accounts or fixtures were created.

## Validation

Passed: focused Sprint 035 dashboard/failure isolation; Sprint 021AH null-safe authorization; Sprint 022 workflow; Sprint 028 workspace; canonical JSON, domain, roles, Supabase self-tests and static validation; direct ESLint on all changed executable source files; TypeScript; `git diff --check`; and Vercel production build for the exact candidate (compile, lint/type validation, 28 static pages and build traces).

The local Next build produced complete `.next` output including `BUILD_ID` but did not exit within 120 seconds or a 300-second retry. The exact-candidate Vercel production build completed successfully and is the stronger environment-relevant substitute. The canonical Next lint wrapper could not unlink its generated `.next/cache/eslint` file (`EPERM`); direct ESLint with `--no-cache` passed and avoids that generated-cache defect.

## Participant results

| Participant | Result | Durable finding |
|---|---|---|
| Trainer Participant A | blocked | Protected inbox/provider coordination unavailable; journey not started. |
| Trainer Participant B | blocked | Protected inbox/provider coordination unavailable; journey not started. |
| Trainer Participant C | blocked | Protected inbox/provider coordination unavailable; journey not started. |

Required protected manual action for a future pilot: the authorized provider operator must privately verify the approved project and Preview, configure each controlled inbox through the protected provider path, issue passwordless invitations without exposing contact or authentication artifacts, and coordinate the five-step journey. Builder must then verify participant-isolated synthetic access and record only A/B/C task outcomes. This cannot be completed through repository files or ordinary chat.

## Production non-impact

The production deployment remained `dpl_fPWqinnfL4YZJq41MQPaXhhuh7hi`. Apex, `www`, the primary project alias and both stable Vercel aliases resolve to that production deployment. A CLI Preview briefly moved one secondary stable alias during initial configuration; it was immediately restored to the exact prior production deployment and reverified before acceptance. No production provider, dataset, domain, DNS, alias or environment value was intentionally changed, and no Preview remains attached to a production/custom alias.

Sprint 035B does not claim trainer acceptance, authenticated participant acceptance, or product-wide Done.
