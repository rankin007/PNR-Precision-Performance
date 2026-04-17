# External Account Policy

This platform should be provisioned using new, project-specific external infrastructure wherever possible.

## Required New Accounts

- GitHub
- Vercel
- Railway
- Supabase
- Stripe, unless the website owner's existing Stripe account is the intended business account for this platform

## Hard Rules

- do not reuse any previous repository, project, workspace, environment, database, or deployment
- do not reuse API keys, access tokens, webhook secrets, or environment variables from prior work
- do not connect this project to any older billing account or shared infrastructure unless explicitly re-approved later
- the approved Stripe-owner exception applies only when the Stripe account belongs to the website owner and is intentionally being used for this business
- treat this workspace as a clean-start platform

## Operational Implication

When setup begins, every integration and deployment target should be created fresh for this project before configuration work proceeds, except for the approved Stripe-owner exception.
