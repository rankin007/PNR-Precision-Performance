# Final Product Acceptance Matrix

Date: 2026-07-30
Decision: **Not Done — operational handoff complete**
Public release: Sprint 032 remains valid and Ready with accepted limitations.

Sprint 035P update — 2026-08-02: authorised obsolete callback removal and the exact temporary Preview callback lifecycle completed with production configuration preserved and final rollback exact. Local evidence is `98/98`; two hosted synthetic attempts each stopped at `6/14` because the harness used an unsupported page-wide alert-count assertion and cleaned Auth/application/Storage to `0/0/0`. No trainer participated. P01/L05 limitations and P02/L06 not-proven dispositions remain unchanged; Core Product Done is false.

Sprint 035O update — 2026-08-02: ten focused sanitized callback-disposition/lifecycle assertions pass, bringing the local 035 target to 86/86. No authorised callback-owner disposition was supplied, so no provider mutation, fixture or human attempt occurred; 14 rendered checks remain unrun. Product acceptance dispositions remain unchanged and Core Product Done is false.

Sprint 035N update — 2026-08-02: the 035M candidate remains machine-validated, but trainer access acceptance remains not proven. A read-only provider gate found an unknown pre-existing alternate Preview callback and stopped before mutation. Zero rendered authenticated checks, human attempts, fixtures or external Sprint-owned state were created in 035N. P01/L05 limitations and P02/L06 not-proven dispositions remain unchanged.

Evidence classes: `production` current live/read-only proof; `hosted` authenticated/provider proof; `executable` maintained automated proof; `static` source/contract proof; `historical` dated qualified evidence; `authority` unresolved owner decision.

| ID | Canonical criterion | Disposition | Evidence | Production relevance / limitation | Owner role | Next action |
|---|---|---|---|---|---|---|
| P01 | Trainer reaches assigned-horse workflow quickly on mobile | passed-with-accepted-limitation | hosted/executable: Sprint 021AH and 022/022B records | Auth and workflow proven; real-device field timing not proven | Product owner | Run real-device acceptance |
| P02 | Trainer creates a test record in under 60 seconds | not-proven | historical: `planning/reviews/022B-evidence-reconciliation-and-closeout-correction.md` | Mandatory timing acceptance absent | Product owner | Timed real-device trial |
| P03 | Voice-to-text notes attach to test | deferred-by-approved-scope | production: Sprint 032 review | Audio/transcription unavailable | Product/privacy owner | Approve provider/privacy/fallback contract |
| P04 | Photos and PDFs attach to test | not-proven | historical: Sprint 023 chain has no accepted final product evidence in this root | Upload acceptance cannot be inferred from plans/source | Privacy/product owner | Reconcile accepted hosted upload evidence |
| P05 | Numeric instrument values can be confirmed before submission | passed-with-accepted-limitation | executable/static: Sprint 022/022B workflow evidence | Typed four-reading confirmation proven locally | Product owner | Real-device confirmation |
| P06 | Result returns both scores, recommendations and today guidance | authority-required | `planning/DEFINITION_OF_DONE.md:32`; Sprint 032 limitations | Clinical thresholds/recommendations unavailable | Domain owner | Approve formulas/content and validate |
| P07 | Carbohydrate accepts 0–15% | passed | executable: domain validation and Sprint 022 evidence | Local/product contract | Domain owner | — |
| P08 | Conductivity accepts 0–70C | passed | executable: domain validation | Local/product contract | Domain owner | — |
| P09 | Pink Horiba input receives 1.43 multiplier | authority-required | `planning/DEFINITION_OF_DONE.md:38`; open authority questions | Applicability rule unresolved | Domain owner | Approve exact applicability |
| P10 | Urine and saliva pH use .1 calibration | authority-required | `planning/DEFINITION_OF_DONE.md:39` | Final interpretation unresolved | Domain owner | Approve calibration contract |
| P11 | Turbidity uses levels 1–5 | passed | executable: domain/workflow validation | Implemented input boundary | Domain owner | — |
| P12 | Temperature chart ideal line is 37.5 | not-proven | no accepted chart evidence | Trends UI not accepted | Product owner | Implement/prove trends |
| P13 | Water intake uses .5 litre increments | not-proven | no accepted end-to-end evidence | Not in accepted capture boundary | Product owner | Implement/prove |
| P14 | Workload/context notes can be recorded | passed-with-accepted-limitation | executable/static: Sprint 022 | Typed context notes proven; voice absent | Product owner | Real-device acceptance |
| P15 | Hydration Score uses carbohydrate and conductivity | authority-required | canonical DoD and open formula decision | Exact approved formula absent | Domain owner | Approve formula |
| P16 | Hydration classification uses approved Green/Amber/Red meanings | authority-required | canonical DoD | Thresholds/wording absent | Domain owner | Approve thresholds/language |
| P17 | Health Score uses all five readings | authority-required | canonical DoD | Exact approved formula absent | Domain owner | Approve formula/weights |
| P18 | Health classification uses approved Green/Amber/Red meanings | authority-required | canonical DoD | Thresholds/wording absent | Domain owner | Approve thresholds/language |
| P19 | Editable Table of Knowledge scaffold exists | passed | static: existing recommendation scaffold documented in project review | Scaffold only, not approved content | Product owner | — |
| P20 | Recommendation categories cover hydration/feed/supplement/water/other | authority-required | canonical DoD | Approved content absent | Domain owner | Supply/review content |
| P21 | Knowledge columns include Level 1–5 Comments | passed | static: canonical scaffold contract | Does not prove approved recommendations | Product owner | — |
| P22 | Recommendations are immediately actionable | authority-required | Sprint 032 accepted limitation | No approved clinical output | Domain/veterinary owner | Approve and field-test |
| P23 | Formula/recommendation content is approved, not invented | passed-with-accepted-limitation | production: unavailable/fail-closed behavior | Safety boundary passes because output stays unavailable | Domain owner | Provide authority before activation |
| P24 | PDFs, notes and photos attach to test | not-proven | no reconciled accepted hosted evidence | Upload product boundary not established | Privacy/product owner | Reconcile and validate |
| P25 | Supported photo subjects are defined | not-proven | canonical intent only | No accepted upload workflow | Product owner | Confirm scope and test |
| P26 | OCR/colour/meter interpretation remains future unless promoted | deferred-by-approved-scope | canonical DoD | Safe deferral | Product owner | Reconsider only by new scope |
| P27 | Automatic extraction requires trainer confirmation | deferred-by-approved-scope | canonical DoD | Extraction inactive | Product owner | Preserve if promoted |
| P28 | Trainer writes assigned-horse data | passed | hosted: Sprint 021AH rendered/direct matrices | Authenticated boundary proven | Security owner | Maintain regression suite |
| P29 | Owner is read-only | passed | hosted: Sprint 021AH | Authenticated boundary proven | Security owner | Maintain |
| P30 | Vet read-only unless managed exception | passed-with-accepted-limitation | hosted/static: role proof; managed exception authority remains open | Base denial/read contract proven | Product/security owner | Finalize exception rules |
| P31 | Stable staff has limited write | passed-with-accepted-limitation | hosted: accepted role matrix | Exact future access changes remain governed | Security owner | Maintain |
| P32 | Admin has full approved access/control | passed | hosted: Sprint 021AH | Within existing product contracts | Security owner | Maintain |
| P33 | Users see assigned horses only | passed | hosted: Sprint 021AH | Direct and rendered proof | Security owner | Maintain |
| P34 | No cross-stable visibility | passed | hosted: Sprint 031C accepted evidence cited by Sprint 032 | Synthetic denial boundary passed | Security owner | Maintain |
| P35 | Corrections are audited | passed | hosted/executable: Sprint 021AH | Comment/correction lifecycle proven | Security owner | Maintain |
| P36 | Upload access matches horse/test boundary | not-proven | no reconciled accepted final upload proof | Security/privacy criterion remains mandatory | Privacy/security owner | Reconcile hosted denial evidence |
| P37 | Hydration Score trend is viewable | not-proven | no direct accepted product evidence | Trends acceptance absent | Product owner | Implement/prove |
| P38 | Health Score trend is viewable | not-proven | no direct accepted product evidence | Trends acceptance absent | Product owner | Implement/prove |
| P39 | Five input trends are viewable | not-proven | no direct accepted product evidence | Trends acceptance absent | Product owner | Implement/prove |
| P40 | Charts show individual or combined series | not-proven | no direct accepted product evidence | Trends acceptance absent | Product owner | Implement/prove |
| P41 | Charts support AM/PM/both | not-done | canonical “Not Yet Done” | Mandatory feature absent/unaccepted | Product owner | Implement/prove |
| P42 | Favorite/default chart configurations save | not-done | canonical “Not Yet Done” | Mandatory feature absent/unaccepted | Product owner | Implement/prove |
| P43 | History highlights Green/Amber/Red | not-done | canonical “Not Yet Done” | Mandatory feature absent/unaccepted | Product owner | Implement after domain authority |
| P44 | History filters Red and Amber+Red | not-done | canonical “Not Yet Done” | Mandatory feature absent/unaccepted | Product owner | Implement after domain authority |
| P45 | Public website clearly explains offer and portal CTA | passed | production: Sprint 032 and 2026-07-30 live checks | Live/indexable across three aliases | Content owner | Monitor |
| P46 | Portal is secure, mobile-first, fast and returns real-time scores/recommendations | authority-required | hosted auth proof plus Sprint 032 limitation | Security/mobile partly proven; clinical output unavailable | Product/domain owner | Complete missing mandatory parts |
| P47 | Test model contains all required fields | not-proven | mixed static/implemented evidence | Upload, voice, approved scores/recommendations not accepted | Product/data owner | Reconcile schema against full contract |
| P48 | Horse model contains trainer/owner/baseline/performance range | not-proven | static source is insufficient for final acceptance | Full contract acceptance absent | Product/data owner | Validate integrated model |
| P49 | Protocol records support actions and risk levels | authority-required | recommendation scaffold only | Approved domain records absent | Domain/data owner | Approve/version content |
| P50 | User/assignment records support role/membership/horse access | passed | hosted: Sprint 021AH | Auth/RLS matrix passed | Security owner | Maintain |
| O01 | Trainer submits a test in under 60 seconds | not-proven | historical: Sprint 022B qualified boundary | Timed field evidence absent | Product owner | Timed real-device trial |
| O02 | Voice-to-text is reliable or has clear manual fallback | deferred-by-approved-scope | Sprint 032 limitation; typed notes exist | Audio inactive; typed fallback available | Privacy/product owner | Approve provider/fallback contract |
| O03 | Photos/PDFs upload quickly to the correct test | not-proven | no reconciled accepted final upload proof | Speed/attachment acceptance absent | Privacy/product owner | Hosted field acceptance |
| O04 | Scores appear immediately after submission | authority-required | clinical scores unavailable | Formula and runtime acceptance absent | Domain owner | Approve and prove |
| O05 | Recommendations are approved, clear and actionable | authority-required | clinical recommendations unavailable | Domain content absent | Domain/veterinary owner | Approve and field-test |
| O06 | Owner views permitted horse scores and trends | not-proven | read-only role proven; score/trend journey absent | Mandatory journey incomplete | Product owner | End-to-end owner acceptance |
| O07 | Owner understands outputs without write access | authority-required | read-only security proven; approved outputs absent | Domain language unavailable | Domain/product owner | Approve and usability-test |
| O08 | Admin manages users and horses within scope | passed-with-accepted-limitation | hosted/static: 021AH plus admin foundations | Named operational acceptance absent | Operations owner | Assign owner and rehearse |
| O09 | Admin audits corrections | passed | hosted: Sprint 021AH | Accepted correction lifecycle | Security owner | Maintain |
| O10 | Admin views data required for support/launch | passed-with-accepted-limitation | hosted/static admin evidence | Support ownership/rehearsal incomplete | Operations owner | Assign and rehearse support |
| L01 | Production Supabase configured and migrated | passed | hosted: Sprint 021AH ledger 0001–0017 | Accepted application boundary | Platform owner | Maintain migration ledger |
| L02 | RLS validated with real role/horse fixtures | passed | hosted: Sprint 021AH direct 17/17, rendered 48/48 | Synthetic governed fixtures | Security owner | Maintain |
| L03 | Auth boundaries cover all roles/inactive/anonymous | passed | hosted: Sprint 021AH and Sprint 032 protected-route checks | Accepted boundary | Security owner | Maintain |
| L04 | Stripe tested where commerce remains in launch scope | deferred-by-approved-scope | production: Sprint 032 commerce-disabled checks | Commerce explicitly outside released scope | Business owner | Approve schedule before activation |
| L05 | Portal workflows stable mobile and desktop | passed-with-accepted-limitation | hosted/rendered: Sprint 031B/031C and 032 review | Real-device field acceptance remains unproven | Product owner | Real-device trial |
| L06 | Mobile UX optimized for under-60-second workflow | not-proven | no accepted timed field result | Mandatory timing evidence absent | Product owner | Timed trial |
| L07 | No preview/placeholder data in production launch flows | passed | production: Sprint 032 source/live scans | Public release boundary passed | Release owner | Monitor |
| L08 | Monitoring and rollback path documented | passed | `docs/OPERATIONS_HANDOFF.md`; 2026-07-30 Ready checks | Role assignments remain placeholders | Operations owner | Assign named roles |
| L09 | Offering, benefits, pricing, onboarding and support plan are clear | not-proven | public offering/pricing exists; operational ownership incomplete | Product-wide criterion not fully accepted | Business/operations owner | Approve ownership and support plan |

## Mechanical decision

Mandatory criteria include `authority-required`, `not-proven`, and `not-done` outcomes. Therefore the project cannot be called Done or Done with accepted limitations under the canonical authority. Sprint 033 closes the evidence and operational handoff as `final-handoff-complete-product-not-done-clean`; the valid Sprint 032 public release is unchanged.
