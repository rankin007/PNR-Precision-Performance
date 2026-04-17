# PNR Precision Performance

This workspace is the foundation for a standalone, professional-grade digital platform build.

## Platform Direction

The current product direction is a racehorse-focused equine platform with:

- structured performance and biochemistry data capture
- personalised member access
- multi-level member roles including owners and trainers
- e-commerce capability
- a database-backed website and app ecosystem

## What is included

- A modern `Next.js` + `TypeScript` + `Tailwind CSS` starter structure
- A design-system-ready global styling layer
- An `ORCHESTRATOR.md` file that acts as the repo's delivery conductor
- An `.agents/` registry for specialist roles and future expansion
- A `content/` area for briefs, requirements, copy, and structured inputs
- A local Git repository foundation with CI and pull-request scaffolding
- A fresh-account launch sequence for GitHub, Supabase, Vercel, Railway, Stripe, and GoDaddy

## Project initiation status

The workspace has now been initiated locally:

- local Git repository initialized
- baseline CI workflow added in `.github/workflows/ci.yml`
- pull request template added in `.github/pull_request_template.md`
- environment contract expanded in `.env.example`
- fresh-account launch sequence documented in `content/requirements/fresh-account-launch-sequence.md`

External services have not been connected yet. Core infrastructure should come from brand-new project-specific accounts, with Stripe allowed to use the website owner's existing business account when intentionally approved.

## Deployment and Backend Readiness

The repository now includes:

- `supabase/config.toml` for local Supabase project scaffolding
- `npm run db:bundle` to generate a one-shot Supabase activation SQL file
- `vercel.json` for Vercel project scaffolding
- `/api/health` for deployment health checks
- `/api/setup/status` for environment and integration readiness checks
- initial Stripe checkout scaffolding through `/api/checkout` and `/api/stripe/webhook`

## How this workspace is intended to work

1. Business and website inputs are added into the repository over time.
2. `ORCHESTRATOR.md` is updated as the active source of truth.
3. Specialist agents work from that orchestrator and the agent registry.
4. The site is iteratively expanded without losing structure or quality.

## Suggested next step

When you are ready, provide the first batch of:

- business overview
- brand direction
- website goals
- member roles and permissions
- data fields to capture for horses, performance, and biochemistry
- pages required
- target audience
- contact details
- preferred integrations

The repository is ready to receive them.
