# Sprint 035D Email OTP Cutover And Mailbox Checkpoint

## Status

Sprint 035D remains active. Application and provider cutover gates pass; delivered synthetic acceptance and participant execution are paused at the protected mailbox authentication boundary. No permitted closeout outcome is claimed at this checkpoint.

## Proven baseline and application candidate

- Exact starting local/remote Sprint 035C SHA: `819f09add752a64dbf10213f3d481ad3132da9e9`.
- Scoped branch: `codex/035D-prefetch-resistant-email-otp-authentication`.
- Exact application candidate: `3be6b6c3622150a3c2009ed8564795b14e3e6c2b`.
- Generated Preview: `dpl_2ftdehCW4dZTwb5FegppGou9W9XH`, Ready, Preview-classified, exact candidate in Git and `ppSourceSha`, assigned alias array empty.
- Production release: `dpl_EUJyBLQp7okgbPwtBU6nmMH88L6A`, Ready. Prior Ready rollback remains `dpl_fPWqinnfL4YZJq41MQPaXhhuh7hi`.
- Apex, `www` and all five accepted stable aliases were reconciled to the Ready Sprint 035D production deployment. Public health returned `200`; the two Vercel-owned stable hosts retain their expected deployment-protection redirect behavior.

## Provider cutover

- Approved project: `uvskssaecdhxcgytkasc`, Precision Performance Clean Rebuild, Healthy, Singapore `ap-southeast-1`.
- Provider migration ledger was visibly verified as exactly `0001` through `0021`.
- The prior Magic Link/OTP template was captured exactly in protected browser-session memory before mutation. Durable evidence retains only sanitized fingerprint `3e7f17fc3a148193493aedf4567467946ebbf198c7f7931c17b021e748e0554c` and restoration-ready classification.
- Only Magic Link/OTP subject/body changed. Read-before-save and read-after-write prove one `.Token`, zero `ConfirmationURL`, zero links, and saved fingerprint `dc83e62af2ba9644a18f0908f0b42cfa17d95500ec67b7d797f659a5d9df6194`.
- Confirm sign up and unrelated templates/settings were not opened for editing or submitted.
- Production Site URL remains `precisionperformance.com.au`.
- Redirect allowlist is exactly the production callback plus the exact generated Preview callback. The superseded `c16cgcork` Preview callback was removed before `bg9t5lfca` was added.

## Application proof

- `shouldCreateUser:false` remains explicit.
- OTP verification uses `verifyOtp` with email type.
- Email and code remain transient POST/server-action inputs and do not enter URL, storage or committed fixtures.
- Exact plus-address identity is trimmed only; no plus-tag removal or canonicalization was added.
- Generic request behavior does not expose provider identity lookup failure.
- Focused Sprint 035D OTP, Sprint 035C redirect and Sprint 035 dashboard tests pass.
- Typecheck, focused lint, canonical static validation, production build, encoding and diff checks pass.
- Protected rendered Preview smoke shows the six-digit code journey and normalized `/portal` destination.

## Manual intervention required

Blocked fact: no protected synthetic mailbox session is authenticated in the only available browser. Gmail and Outlook both stop at their sign-in screens. Therefore delivered-code, one-action email, prefetch resistance, successful session, safe-failure runtime matrix and participant gates cannot yet be claimed.

Evidence checked: exact Preview/application/provider/deployment gates pass; both supported mailbox origins were checked without entering or recording an address; no synthetic or participant request was sent.

Required operator action:

1. In the open Chrome browser, sign in to one controlled mailbox that may be used for a Sprint-owned synthetic plus-address identity.
2. Complete any provider MFA directly in Chrome; do not send an inbox, password, OTP, recovery code, token or mailbox header through Builder conversation.
3. Leave the authenticated inbox open and report only `protected synthetic mailbox ready`.

Builder will then verify only a sanitized signed-in classification, derive/use the synthetic address in protected browser memory, create the minimum exact-owned prepared identity, run delivered OTP and failure acceptance, clean application/Auth/Storage Auth-last to `0/0/0`, and only then consider guarded Participant A coordination.

## Current cleanup boundary

This checkpoint created no synthetic or participant Auth/application/Storage state and sent no authentication email. Sprint-attempt creation is `0/0/0`; inherited Participant A remains at the prior sanitized Sprint-owned `0/1/0` state pending guarded reverification. The exact Preview callback remains temporarily required for subsequent acceptance.
