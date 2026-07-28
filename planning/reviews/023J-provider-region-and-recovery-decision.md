# Sprint 023J — Provider, Region And Recovery Decision

Status: authority supplied and exact target/read-only preflight verified; local candidate completion may proceed.

The approved target is the Vercel `Preview` environment using a generated `*.rankin007s-projects.vercel.app` deployment URL with no custom domain, mapped exclusively to Supabase `uvskssaecdhxcgytkasc`. The supplied decisions remain exactly: accepted Singapore/international processing; encrypted Aprec8-controlled copies of synthetic Storage objects; SHA-256 restore testing; 30-day retention; secure deletion after retention unless an incident or governance hold applies.

Repository authority requires Sydney `ap-southeast-2`, Aprec8 approval of current Supabase/Vercel DPA/subprocessor/overseas-access boundaries, and a separately approved/testable Storage-object recovery method with retention/expiry behavior. Existing candidate records instead identify Singapore `ap-southeast-1`; database backups are already documented as excluding Storage object bytes.

On 28 July 2026 Phillip N Rankin, Director, approved exact `ap-southeast-1` Singapore and the current Supabase/Vercel privacy, DPA, subprocessor and international-processing boundaries for this non-production proof. He approved copying synthetic Storage objects to encrypted Aprec8-controlled storage, SHA-256 restore testing, 30-day retention and secure deletion afterward unless an incident or governance hold applies.

Direct project-region/provider and recovery-mechanism verification has not begun because `precisionperformance.com.au` is locally proven to be a production alias rather than the required Vercel preview environment. No external access occurred.

## Current official-source and target recheck

Accessed 28 July 2026:

- Supabase regions: https://supabase.com/docs/guides/platform/regions — `ap-southeast-1` is Singapore.
- Supabase Storage access control: https://supabase.com/docs/guides/storage/security/access-control — Storage uses Postgres RLS; service keys bypass RLS and remain server-only.
- Supabase database backups: https://supabase.com/docs/guides/platform/backups — database backups exclude Storage object bytes.
- Supabase DPA: https://supabase.com/downloads/docs/Supabase%2BDPA%2B260601.pdf.
- Vercel environments: https://vercel.com/docs/deployments/environments — Preview is pre-production and receives generated deployment URLs without production promotion.
- Vercel environment variables: https://vercel.com/docs/environment-variables — Preview variables are separately scoped.
- Vercel Cron: https://vercel.com/docs/cron-jobs/manage-cron-jobs — `CRON_SECRET` is sent as an `Authorization: Bearer` header and concurrency/overlap must be handled.
- Vercel DPA: https://vercel.com/legal/Vercel_Inc_-_Data_Processing_Addendum.pdf.

Read-only Supabase CLI project listing directly confirmed reference `uvskssaecdhxcgytkasc`, project `Precision Performance Clean Rebuild`, organisation `hohxquwkfehiuyrysufu`, region `ap-southeast-1`, status `ACTIVE_HEALTHY`, and unlinked state. Read-only Vercel CLI inspection confirmed team `rankin007's projects` and project `pnr-precision-performance`. These agree with the authority statement. No secret or environment value was read.
