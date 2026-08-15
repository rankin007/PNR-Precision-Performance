# Sprint 029W public-enquiry final readiness attempt

## Purpose

Sprint 029W is the final transport-recovery attempt for the public-enquiry path. It repairs only the Vercel deployment-inventory boundary and then permits one bounded no-send readiness attempt if every local, ownership, routing, activation and queue gate passes.

Accepted Production remains Sprint 036L deployment `dpl_4bjHgm4KL3DBo7wmbVPW4VJUk2Sf` on all five aliases. Sprint 029W must not move an alias, promote a deployment, enable public submissions, send email, submit or store an enquiry, or access a mailbox.

## Isolated inventory boundary

- Raw `vercel list --format json --no-color` output exists only inside `scripts/vercel-deployment-inventory-projection-029W.mjs`.
- The child pins Vercel CLI `50.42.0` and the installed list implementation SHA-256 `8376a6d957c6fe20a9a1d4738000eb60a519bd079c70f0a82c9e7b59ba9ee367`.
- Raw stdout is capped at 4,194,304 bytes.
- `creator` and `meta` containers are type-checked without enumerating, copying, logging, serializing or returning their contents.
- PowerShell receives only `projectionVersion: 1`, strict deployment hostnames, state class, target class, creation timestamp and bounded pagination.
- A Sprint 029W hostname is independently inspected. Its canonical deployment ID is accepted only with exact Sprint 029W metadata, canonical source, Production/READY state and zero aliases. Only that recovered ID may be used for cleanup.

## Local evidence before inspection

- Inventory projector: 57/57.
- Guarded controller: 54/54.
- Retained provider projection: 16/16.
- Retained alias isolation: 26/26.
- Executable branch-valid assertion total: 153.
- Sprint 029W controller SelfTest: pass.
- PowerShell parse: pass.
- Typecheck, lint, production build, JSON validation and static validation: pass.
- The historical 029V controller harness remains an expected branch-lock refusal on the 029W branch and is not counted as a pass.

## Live decision sequence

No live mutation may start until fresh critical code inspection passes.

1. Prove the exact Vercel project, accepted 036L deployment, five-of-five aliases, zero 029W deployments and zero active queue.
2. Inspect the public-enquiry dashboard toggle through the value-free projection. If it is already false, leave it false. If it is exactly true and every other gate passes, change it once to false. Hard-reload and reprove persistent false plus unchanged routing and inventories.
3. Only if every gate remains green, perform the single approved readiness attempt: one restricted operator-private Resend key, four dedicated and three temporary Sensitive Production rows, at most one unaliased `--prod --skip-domain` 029W deployment, and at most three no-send/no-storage requests.
4. Never enable `PUBLIC_ENQUIRY_SUBMISSION_ENABLED`, move aliases, send email, submit or store an enquiry, or expose a protected value.

## Terminal branches

- `final-readiness-recovered-clean`: retain the restricted key and four dedicated Sensitive Production SMTP rows; retain the accepted unaliased 029W candidate only as required by sprint acceptance; remove the three temporary preflight rows and local temporary bearer record; keep activation false and all five aliases on 036L.
- `public-enquiry-parked-clean`: remove all safely compensable Sprint 029W resources, keep activation false and all five aliases on 036L, create no further 029 transport suffix, and move next to 025B then 035R.
- `final-readiness-blocked-material`: remove every safely compensable Sprint 029W resource; identify any residue by class/count only and give the exact safe manual action if one genuinely remains.

This file contains no credentials and is not an instruction to send email, submit an enquiry, activate public submissions, move aliases, deploy before inspection, or publish Git changes.

## Closed result

Closed 2026-08-07 as `final-readiness-blocked-material`. The final reviewed read-only Inventory retry returned fixed `INVENTORY_PROJECTOR_REFUSED` before any inventory was accepted. No dashboard, credential, environment, deployment, request, email, enquiry, activation or alias action occurred; Sprint 029W external residue is zero. Public enquiry is parked, no later 029 transport-recovery suffix is planned, and the road advances to 025B then 035R.
