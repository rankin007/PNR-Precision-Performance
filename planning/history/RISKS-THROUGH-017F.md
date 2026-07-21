# Archived Risks Through Sprint 017F

Archived: 2026-07-22
Source: `planning/RISKS.md`
Status: Superseded by the active/historical 002B risk record. The source text below is preserved as historical evidence and is not current authority.

---

# Risks

| Risk | Likelihood | Impact | Mitigation | Status |
|---|---:|---:|---|---|
| Temporary NOLOGIN role pp_audit_020e_20260720 remains after the 020E privilege-model stop. | High | High | Protected supabase_admin context must revoke only the automatic creator membership; Builder then runs validated exact ACL revoke/drop and absence checks. | Active - critical manual intervention |
| Ambient PUBLIC/default privileges invalidate a nominal zero-row-privilege audit role. | High | High | Inventory the two effective privilege sources through a revised read-only design before any audit-role retry; do not remediate within 020E. | Active |
| Linked production schema exists without corresponding local `0001`-`0009` records in remote CLI migration history. | High | High | Treat Sprint 020B structural verification as schema truth; prohibit replay/repair/reconciliation until separately planned, reviewed, and authorized. | Active |
| A future CLI command mutates the linked production project unintentionally. | Medium | High | Keep `supabase/.temp/**` ignored, classify installed command behavior before execution, and require explicit sprint scope for every remote write. | Active |
| Migration 0009 is replayed against an unknown, partial, or divergent remote state. | Medium | High | Run the Sprint 020 read-only inventory first, verify the hash and recovery posture, and require explicit mutation authorization; prefer forward-fix over destructive rollback. | Active |
| Future global Node upgrades reintroduce the Next.js build hang. | Medium | Medium | Keep `npm run build` pinned to project-local Node `22.14.0`; test runtime upgrades in a dedicated maintenance sprint. | Active |
| Codex restricted sandbox hangs while normal unsandboxed local build succeeds. | Medium | Low | Use the bounded wrapper and, when needed, run final Next build validation outside the restricted sandbox; record this distinction in validation docs. | Active |
| OneDrive offline placeholders return under `node_modules` or generated output. | Medium | Medium | Rebuild dependencies with `npm ci` if direct reads or Next build stall on placeholder files; avoid relying on dehydrated dependency trees. | Active |
| Dirty worktree makes it unclear which changes belong to future product work. | High | Medium | Sprint 003 recorded the baseline. Sprint 004 should avoid unrelated reversions and record only its own changed files at close. | Active |
| Auth, RLS, admin service-role, Stripe, or webhook flows are scaffolded but not production-verified. | Medium | High | Sprint 004 verifies auth/RLS/portal access first; Stripe and commerce remain scheduled for Sprint 006. | Active |
| `.release-main/` and duplicated/generated artifacts continue to confuse inspection. | Medium | Medium | Inspect only when relevant; defer removal/archival to an approved cleanup sprint with OneDrive-aware permissions. | Active |
| npm audit reports dependency vulnerabilities. | Medium | Medium | Review audit output in a dependency/security maintenance sprint; do not run `npm audit fix --force` during feature work. | Active |
| Secret values or fragments leak into logs during environment verification. | Medium | High | Verify variable names, presence, and requiredness only; diagnostics may report configured/missing status only. | Active |
| Deployment target assumptions send later work toward the wrong platform. | Low | High | Sprint 003 documented Vercel as the local evidence-backed target; production project/domain confirmation remains a launch question. | Active |
| RLS fixes accidentally broaden member data visibility. | Medium | High | Use a documented admin/member/non-member access matrix and verify with real Supabase test users before closing Sprint 004. | Active |
| Test-user setup requires credentials or remote access the Builder does not have. | Medium | Medium | Do not print or request secret values in chat; record blocked cases and the smallest non-secret setup/access request needed. | Active |
| Auth hardening expands into admin commerce, Stripe, or data-entry workflow work. | Medium | Medium | Keep Sprint 004 limited to sign-in, callback, bootstrap, role gates, RLS, and access documentation. Defer commerce and data-entry to Sprints 005-006. | Active |
| Data-entry workflows pass code validation but fail with seeded production-like data. | Medium | High | Carry Sprint 005 live smoke blockers forward; verify assigned-horse fixtures, writer/non-writer users, and direct RLS checks before launch. | Active |
| Operational write permission is configured incorrectly for launch users. | Medium | High | Ensure trainer/admin launch users have `horse.records.write`; verify read-only owner/non-member users are denied from `/data-entry`. | Active |
| Stripe checkout/webhook behavior passes code validation but has not been replayed with test-mode Stripe events. | Medium | High | Sprint 007 should run Stripe test checkout and webhook replay, including duplicate delivery, before launch. | Active |
| Admin commerce visibility reveals too much operational payment detail if expanded carelessly. | Low | Medium | Keep `/admin/commerce` read-only and limited to persisted reconciliation fields; require a future approved sprint for commerce mutations. | Active |
| Product catalogue/pricing seeds may not match final launch offer. | Medium | Medium | Confirm final product catalogue, active statuses, pricing, and currency before Sprint 007 launch smoke. | Active |
| Production launch proceeds without live Supabase/RLS/Stripe proof. | Medium | High | Treat Sprint 007 status as no-go until the manual-intervention checklist in `docs/PRODUCTION_LAUNCH_READINESS.md` is complete. | Active |
| Raw operational errors leak to visitors during launch smoke. | Low | Medium | Keep user-facing failure states generic and record detailed diagnostics only as safe structural codes. Sprint 007 hardened product detail catalogue-load messaging. | Active |
| Remote Supabase is not migrated with the Sprint 008 launch membership seed. | Medium | High | Apply `0008_launch_membership_permission_seeds.sql` through an explicitly authorized Supabase migration path before live smoke. | Active |
| Production Stripe env entries are present but not recognizable as direct key shapes from local file inspection. | Medium | High | Verify production Vercel Stripe values in the dashboard and run Stripe test checkout/webhook replay before deployment. | Active |
| Malformed checkout POSTs without a form content type return `500` in production. | Low | Medium | Sprint 010 confirmed the intended missing-slug form case redirects safely; consider a later checkout hardening sprint to catch malformed body parsing errors before `request.formData()`. | Active |
| Vercel CLI filtered log scans are not available with the installed CLI behavior. | Medium | Low | Use dashboard logs or a bounded approved logging path in a later verification pass; do not start unbounded log follows during closeout. | Active |
| Scoring formulas for Hydration Score and Health Score are not yet locked. | High | High | Treat formulas as required product/domain inputs; do not implement scoring from assumptions. | Active |
| Recommendation content could be clinically or operationally misleading if Table of Knowledge rules are vague. | Medium | High | Require approved recommendation categories, level comments, disclaimers, and review workflow before launch use. | Active |
| Table of Knowledge content is only defined as a scaffold, not a complete recommendation library. | High | Medium | Build editable scaffold separately from final content and mark placeholder content as not production-ready. | Active |
| OCR/photo recognition may produce wrong readings from pH strips, refractometers, or meter screens. | Medium | High | Scope automatic extraction deliberately; require trainer confirmation and audit trail before readings affect scores. | Active |
| Voice-to-text could mishear horse names, notes, quantities, or readings. | Medium | Medium | Provide review/edit before save, structured confirmation, and manual fallback. | Active |
| Uploads introduce storage, privacy, retention, and access-control obligations. | Medium | High | Define storage buckets, allowed file types, retention rules, signed access, and RLS/storage policies before implementation. | Active |
| The under-60-second trainer workflow may fail without mobile performance and UX constraints. | Medium | High | Set a mobile performance budget and test capture flow on phone-width devices before acceptance. | Active |
| Vet and stable-staff exceptions could broaden data visibility beyond assigned-horse intent. | Medium | High | Define trainer-managed access rules and verify no cross-stable visibility with RLS tests. | Active |
| MVP/MVP2 boundary ambiguity could cause Builder to overbuild or underbuild. | High | Medium | Record explicit sprint scope and defer uncertain OCR, advanced recommendations, and access exceptions until approved. | Active |
| Trend charts and saved favorites may require additional schema and privacy boundaries. | Medium | Medium | Design chart preferences, snapshots, and access rules in the data-model sprint before UI build. | Active |
| Live acceptance can still remain partial even when public/safety smoke passes. | High | Medium | Keep Supabase, authenticated workflow/RLS, and Stripe replay gates tracked separately from public smoke. | Active |
| Local checkout hardening is not production-effective until deployed, despite local validation. | Medium | Medium | Record deployment status separately and re-smoke after any explicitly authorized production deployment. | Active |
| Reconstructed candidate is not yet a committed Git baseline. | Low | Medium | Sprint 012D converted the candidate into reviewed branch `codex/012d-production-baseline` at commit `358e1fc`; use that branch/commit for any future approval path. | Mitigated |
| Sprint 012D baseline is validated locally but not deployed. | Medium | Medium | Require explicit deployment authorization, deploy from the recorded 012D branch/commit only, and re-run production smoke after deployment. | Active |
| Cleanup accidentally changes runtime behavior before Sprint 013. | Low | High | Sprint 012E archived only low-risk non-runtime files, reversed the `build/` move when validation showed a typecheck side effect, and left ambiguous/runtime-adjacent candidates deferred. | Mitigated |

| Archived generated output under references can affect validation. | Medium | Medium | Keep generated TypeScript/build output in ignored root locations or adjust validation config only in an approved sprint; Sprint 012E documented and reversed the uild/ archive move. | Active |
| Public website remains visible while product is incomplete. | High | High | Sprint 012F hides public marketing/shop/contact/product routes locally behind a holding page and blocks checkout; production remains visible until deployment is explicitly authorized. | Partially mitigated locally; production pending |
| Under-construction gate accidentally breaks auth callback, health checks, or webhook handling. | Medium | High | Sprint 012F requires an explicit route allow/deny matrix and local smoke for auth/API safety routes before deployment. | Active |
| Public sign-up form collects personal data without approved storage/provider rules. | Medium | High | Sprint 012F forbids persistent visitor data collection or third-party transmission without explicit user approval. | Active |

| Local under-construction gate is not production-effective until deployed. | High | Medium | Require explicit deployment authorization, deploy the validated Sprint 012F state, and run production smoke on the route matrix. | Active |
| Exact reading lookup tables are mis-modeled with rounding or interpolation. | Medium | High | Sprint 013 requires exact-match lookup only and should store unscored/blocked state if a reading has no exact lookup. | Active |
| Pricing sources conflict between shop text and older product seeds. | High | Medium | Sprint 013 treats shop-written pricing as latest user-approved pricing and documents older seed values as stale/conflicting evidence. | Active |
| Local schema work is accidentally applied to remote Supabase. | Medium | High | Sprint 013 forbids remote migration application and production data mutation; remote application requires later explicit authorization. | Active |
| Sprint 013 remote biochemistry migration has not been applied. | Medium | High | Apply `0009_biochemistry_test_data_model.sql` only through a later explicitly authorized Supabase migration path, then run non-destructive schema/RLS smoke checks. | Active |
| Exact lookup rows may need domain review before production scoring. | Medium | High | Review imported Carbs, pH Average, Salts, and Urea lookup rows against `Reading Tables v1.csv` before remote production use. | Active |
| Sprint 014 scoring can drift from Sprint 013 database constraints. | Medium | Medium | Use `lib/domain/biochemistry.ts` helpers/constants and validate fixture inserts against the local migration before closure. | Active |
| Capture UI may mishandle blocked scoring states. | Medium | High | Future UI/server action work must use `scoreBiochemistryReadings` result status and persist/display blockers instead of assuming scores always exist. | Active |
| Fixture subset is representative, not the full production lookup table. | Medium | Medium | After remote migration, validate production-like lookup counts and a broader fixture set before enabling live capture. | Active |
| Production thresholds are still unsupplied. | High | High | Require approved Hydration Score and Health Score Green/Amber/Red thresholds before production classification or trainer-facing zone UI. | Active |
| Production Table of Knowledge content is still unsupplied. | High | High | Require approved rule content, source/version, and review/disclaimer decisions before trainer-facing recommendations. | Active |
| Fixture-only Sprint 015 thresholds could be mistaken for production thresholds. | Medium | High | Keep fixture file and docs clearly labeled fixture-only; do not surface fixture values in UI or production data. | Active |
| Tracked production-adjacent env file may contain sensitive or environment-specific values. | Medium | High | Sprint 017 removed `.env.vercel.production` from Git tracking while preserving the local ignored file and without printing values. | Mitigated locally |
| Deleted `middleware.ts` could hide route-safety regressions if accepted without review. | Medium | High | Sprint 017 accepted the deletion only after source inspection, production build, and route-safety smoke passed. | Mitigated locally |
| Dirty tree remains too broad for safe feature work without baseline decision. | High | Medium | Sprint 017 validated and created the approved local baseline commit, excluding env values and manual/user-preference folders. | Mitigated locally |
| Sprint 018 capture UI cannot complete live persistence until the biochemistry migration exists remotely. | High | High | Keep missing schema as a clear blocked state; plan a remote Supabase biochemistry migration/live smoke sprint only after explicit operator authorization. | Active |
| Trainer-facing result screens could be mistaken for final recommendations while thresholds/content are unavailable. | Medium | High | Sprint 018 displays unavailable/blocked states for zones and recommendations until approved thresholds and Table of Knowledge rules are supplied. | Active |
| Unsupported performance, medical, causal, or outcome claims reduce trust and create compliance exposure. | High | High | Apply `docs/DESIGN_AND_MESSAGING_AUTHORITY.md`; classify claims by evidence level and reject guarantees, diagnosis, prediction, proof, and unvalidated score/recommendation claims. | Active |
| Visual redesign silently expands into storage, voice, auth/RLS, schema, CMS, aggregation, or deployment work. | High | High | Every relevant sprint must identify architecture gates explicitly and keep unapproved functional changes outside visual/content scope. | Active |
| Status colours are interpreted without labels or context. | Medium | High | Always pair Green/Amber/Red with text, appropriate icons, numerical values where applicable, and explanatory context. | Active |
| Confidential operational records or identifiable horse/stable data appear in public marketing assets. | High | High | Use recreated anonymised charts, exclude raw records/formulas, and require explicit releases for identifiable people, horses, and stables. | Active |
| Conflicting brand names, pricing, or product claims reach public surfaces. | High | High | Apply the accepted brand hierarchy; keep pricing unpublished until one commercial schedule is approved; preserve the public gate until separately reopened. | Active |
| A repository-led Supabase replacement destroys hosted Auth, Storage, business data, configuration, or required legacy records. | Medium | Critical | Treat every 020F preserve-data, recreate-manually, and unknown-stop item as a hard gate; require protected backups and a disposable recovery rehearsal before 020G. | Active |
| Leaked-password protection is disabled on the Free candidate. | Low while passwordless-only; High if password auth is added | High | Keep Email OTP/magic-link as the only Auth flow. Any password-auth feature must reopen and resolve this control before implementation. Joint owners: Randell Rankin and Philip Rankin. | Accepted exception |
| Candidate keys or sessions leak through shell history, command arguments, environment dumps, logs, screenshots, or files during local testing. | Medium | Critical | The 020G browser-inspection incident is contained: affected task deleted, replacement keys present, legacy keys disabled, no durable value fragments. Sprint 021 must design a protected consumption path that never exposes DOM credential values to retained inspection output. | Contained incident; design risk remains active |
| Temporary localhost callback or synthetic candidate data remains after testing. | Low | High | The temporary callback was removed and the allowlist restored to the sole production URL. No Auth identity or fixture was created. Sprint 021 must retain exact callback and zero-count cleanup controls for any future test. | 020G contained; future-test risk remains active |
| Synthetic rows without a neutral direct run-ID column could be missed or broadly deleted. | Medium | Critical | Anchor the run in stable code, horse slugs, profile aliases, and available notes fields; trace remaining rows only through exact joins and protected A/B mapping; require bounded aggregate plan and stop on ambiguity. | Active |
| Structural readiness could be mistaken for authenticated proof or production cutover readiness. | High | High | Sprint 021E closed blocked-clean and authenticated proof did not start. Sprint 021F reconciles zero owned state and requires a separate 021G-or-later Pack for any retry. | Active |
| A personal or conversation-disclosed mailbox is reused for synthetic authentication. | Medium | Critical | The 021F runbook requires a new dedicated non-personal mailbox, unique password, MFA, plus-alias proof, and address non-retention. | Active |
| Browser mailbox inspection emits private message metadata while locating the test account. | Medium | Critical | Sprint 021G stopped before mutation, cleared protected state, and closed blocked-clean. A later Pack must use an account-scoped mailbox interface that returns readiness/address internally without traversing message DOM. | Active |
# Sprint 021H risk — protected acquisition output

Dashboard DOM/snapshot inspection can expose visible API-key values. Reopen authenticated proof only with an acquisition surface that keeps both publishable and secret values inside protected process memory and outside tool output.
# Sprint 021I risk — target-bound credential injection

Existing local protected configuration is bound to the protected old project, while candidate dashboard retrieval requires exposure-prone transfer. Any future mechanism must bind target metadata before protected use and keep the value inside one protected process.
# Sprint 021J risk — authenticated Administrator read error

Genuine candidate sessions and fixtures can be established, but the first Administrator horse read errored before authorization results could be credited. Structural readiness must not be mistaken for authenticated readiness until the operation error is diagnosed and the full matrix reruns cleanly.
# Sprint 021K risk — Auth-issued token rejection

Candidate Auth can return a session object whose access token is immediately rejected by Auth and Data API. No authenticated-readiness claim is valid until hosted token issuance/verification compatibility is resolved and the complete matrix passes.

# Sprint 021L risk — provider JWT verification inconsistency

Candidate Auth may continue rejecting newly issued, JWKS-advertised user tokens until Supabase investigates or repairs provider state. Reopen only after provider confirmation; first rerun two fresh minimal Auth chains from authoritative zero state. Do not infer authenticated/RLS/runtime readiness or attempt speculative signing/Auth changes.

# Sprint 021M risk — persistent provider JWT rejection

Two timed independent attempts prove the provider inconsistency persists beyond an immediate propagation window. Do not repeat reproductions or infer authenticated readiness. Supabase must inspect project-level Auth/Data API JWT trust; after resolution, require two successive fresh minimal passes from zero before any matrix.

# Sprint 017B risk — broad post-baseline working tree

The post-017 baseline now contains 255 classified status entries, including high-risk runtime/auth/database groups, one protected support record, and a 22,166-file nested release snapshot. Do not broadly stage, clean, archive, or ignore these paths. Resolve exact 017C treatments first, then segment reviewed 017D staging groups.

# Sprint 017C risk — local-only boundary leakage into staging

Root `.release-main/` and `.claude/` are now correctly ignored but remain on disk. 017D must verify they remain excluded and must not use broad forced-add behavior. The samples scaffold and relocated DOCX require explicit staging review rather than automatic inclusion.

# Sprint 017D risk — validation ledger drift

Repository baseline commits remain blocked because the Sprint 020G clean-rebuild validator encodes an exact `0001`–`0010` migration ledger while accepted immutable history now extends through `0012`. Do not bypass the validator or omit migrations `0011`/`0012`; reconcile the expected ledger under a narrow follow-up Pack, then rerun the complete baseline gate from the beginning.
