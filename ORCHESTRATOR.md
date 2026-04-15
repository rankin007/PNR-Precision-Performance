# Website Orchestrator

This file is the operating guide for building and evolving the standalone platform in this workspace.

## Mission

Build a polished, high-performing digital platform for the equine industry, centered on racehorse performance and biochemistry data, with this file acting as the single source of orchestration truth.

## Core Rules

1. Treat this file as the current execution brief.
2. Read repository context before making structural decisions.
3. Prefer extending existing systems over creating parallel patterns.
4. Keep output production-grade, accessible, responsive, secure, and easy to maintain.
5. Design for scale across web, app, data, and operations.
6. When a needed specialist agent does not exist, define one in `.agents/registry/` before or during the task.

## Product Purpose

Create a scalable digital platform for the equine industry with an initial focus on racehorses.

The platform is expected to support:

- structured performance data capture
- structured biochemistry data capture
- database-backed website and app experiences
- personalised member access
- multi-level member access for owners, trainers, and future roles
- e-commerce capability
- future integrations and background processing

## Recommended Platform Stack

- Orchestration: Antigravity
- Version control: GitHub
- Database, authentication, and storage: Supabase
- Web deployment: Vercel
- Background services and integrations: Railway
- Domain registrar: GoDaddy

## External Account Rule

All external platforms for this project must be created and used from brand-new, project-specific accounts.

This applies to:

- GitHub
- Vercel
- Railway
- Supabase
- Stripe

Do not connect, reuse, import, or reference accounts, projects, environments, credentials, deployments, or configurations from any previous workspace or past project.

## Workflow

1. Read this file.
2. Read active inputs from `content/briefs/`, `content/brand/`, and `content/requirements/`.
3. Identify whether the task is primarily strategy, UX, frontend, backend, data, auth, integrations, or operations.
4. Select the best existing agent from `.agents/registry/`.
5. If no suitable agent exists, create a new agent brief using the template in `.agents/templates/agent-template.md`.
6. Execute work in small, verifiable increments.
7. Record important architecture decisions in `content/requirements/` or supporting docs.
8. Update this file when scope, priorities, or assumptions change.

## Delivery Phases

### Phase 1 - Business Definition

- confirm business scope, primary users, and access boundaries
- define membership levels, permissions, and commercial rules
- write the data dictionary for every required field and measurement unit
- define what content is public, member-only, staff-only, and admin-only
- confirm payment model: products only, subscriptions only, or hybrid

### Phase 2 - Technical Foundation

- create the GitHub repository and branch strategy
- set up Supabase, Vercel, and Railway projects
- connect the GoDaddy domain to Vercel
- set up environment variables for development, staging, and production
- create baseline documentation so Antigravity works from stable specifications

### Phase 3 - Database and Security

- build the relational schema in Supabase
- implement authentication and user profile flows
- create row-level security policies for horse, stable, and member-specific data
- set up file storage for documents, reports, or images if required
- create audit logging and backup rules

### Phase 4 - Public Website

- build the core brand site pages
- create the contact and enquiry flows
- build the product catalogue shell and shop pages
- create the login and account-entry points
- deploy the first public version to staging and then production

### Phase 5 - Member Portal

- build the secure dashboard shell
- create personalised member homepages based on permissions
- build horse profile views, stable views, and reporting pages
- create account management and password-reset flows
- test member isolation thoroughly so users only see their authorised data

### Phase 6 - Data-Entry App

- build fast phone-first forms for daily horse records
- add horse selection, date and time capture, and validation rules
- sync records directly into Supabase
- create edit history and submission logging
- optimise the interface for both phone and PC use

### Phase 7 - Membership Administration

- build the admin interface for levels, permissions, and user assignments
- allow new levels to be created without a code rewrite
- map content gating and feature gating to permissions
- support organisation-specific or premium custom tiers if needed

### Phase 8 - Shop and Payments

- add the payment gateway and checkout flow
- link purchases to user accounts where relevant
- add order confirmation, receipt, and webhook handling
- support future subscription billing if memberships become paid tiers

### Phase 9 - Reporting and Insights

- build horse history views and trend dashboards
- create trainer, stable, and member summary views
- add exports and printable reports where useful
- only add advanced alerts and automations after baseline data quality is proven

### Phase 10 - Testing, Launch, and Operations

- run end-to-end testing across permissions, data entry, web, and payments
- deploy production with backups, monitoring, and rollback procedures
- create a maintenance cycle for new products, new tiers, and future feature releases
- use analytics and real user behaviour to prioritise the next development wave

## Default Workstreams

- Strategy
- Information architecture
- Brand translation
- UX copywriting
- UI design system
- Frontend implementation
- Platform architecture
- Data architecture
- Authentication and access control
- API and integration design
- Background jobs and automations
- E-commerce
- Performance and accessibility
- SEO and structured data
- QA and release readiness

## Current Baseline Assumptions

- The repository is starting from a fresh foundation.
- The website stack is `Next.js` with the App Router and `TypeScript`.
- Styling is handled with `Tailwind CSS` plus design tokens in `app/globals.css`.
- Supabase will be the primary backend platform for auth, relational data, and storage.
- Vercel will be the primary web hosting target.
- Railway will support background services, workers, and external integrations.
- Content and requirements will be added incrementally.
- The final platform should support premium positioning, future scale, and an eventual app ecosystem.

## Core Audience and Access Model

Known member types currently include:

- owners
- trainers

Confirmed access rules:

- trainers can access all horses under their control
- owners can access only their own horses
- owner access is assigned by trainers or administrators
- users may hold multiple membership levels as assigned by administrators

The access model should remain extensible for future roles such as:

- administrators
- staff
- veterinarians
- analysts
- syndicates
- public visitors

## Core Capability Areas

- horse profiles and records
- performance tracking
- biochemistry capture and interpretation support
- member dashboards
- role-based access control
- content management
- e-commerce
- reporting
- integration pipelines

## Confirmed Entity Groups

The current confirmed entity groups are:

- `users`, `member_profiles`, `membership_levels`, `permissions`
- `horses`, `stables`, `trainers`, `owners`, `horse_assignments`
- `daily_records`, `temperature_logs`, `weight_logs`, `water_intake_logs`
- `food_menus`, `feeding_logs`
- `track_sessions`
- `weather_logs`
- `products`, `product_categories`, `orders`, `order_items`
- `subscriptions`, `payments`, `invoices`
- `audit_logs`

## Architecture Direction

Until replaced by a more detailed architecture brief, build toward:

- `Next.js` frontend on Vercel
- Supabase Postgres with row-level security
- Supabase Auth for role-aware member access
- Supabase Storage for managed files and media
- Railway services for async jobs, ETL, or third-party integration processes
- GitHub as the source of truth for code and delivery workflow
- local repository initialized with CI and pull request scaffolding before external account connection

Confirmed commercial and measurement decisions:

- payment model supports products, subscriptions, and hybrid operation
- canonical units are `C`, `kg`, `L`, and `m`

## Active Inputs

Populate these folders as information is provided:

- `content/briefs/`
- `content/brand/`
- `content/requirements/`
- `content/copy/`
- `content/research/`

Recommended documents to add next:

- product brief
- member role matrix
- entity relationship model
- field and unit data dictionary
- page and app sitemap
- feature priorities
- integration requirements
- fresh-account launch sequence

## Decision Standard

When information is missing:

- make a reasonable professional default
- record the assumption in the relevant brief or implementation
- keep the structure flexible so later inputs can replace assumptions cleanly

## Quality Standard

Every significant deliverable should aim for:

- clear hierarchy
- strong visual intent
- responsive behavior
- semantic HTML
- accessibility awareness
- maintainable component architecture
- fast loading performance
- secure data handling
- role-based access awareness
- scalable schema and service boundaries

## Immediate Repo Objective

Establish the foundational architecture required to build the platform safely and quickly as new information arrives.
