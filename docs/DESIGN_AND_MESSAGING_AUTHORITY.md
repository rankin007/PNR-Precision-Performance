# Design And Messaging Authority

## Status

Accepted by the user on 2026-07-19.

Source document: `C:\Users\rrank\OneDrive\1.0_Trading\Ai Website Folder\Design Profile Precision Performance .docx`

This document is the durable Builder-facing interpretation of the accepted design profile. The source DOCX remains the design-profile source authority. Future Architect Packs and sprints must bring these requirements forward when their scope touches public pages, portal or operations UI, charts, status presentation, product naming, claims, pricing, photography, or content.

## Core Direction

The product should feel like professional horsemanship made more measurable. Technology supports trainer judgment; it does not replace trainers, veterinarians, or other qualified professionals.

Public and authenticated experiences share one brand but have different priorities:

- Public website: authentic equine authority, credible product/data presentation, restraint, trust, and qualified-trainer conversion.
- Portal and operations: utilitarian mobile workflows, legible data, rapid entry, clear status, trends, and next-action context.

The profile does not authorize a broad architectural rewrite. Prefer the existing Next.js route groups, Tailwind/component system, Supabase boundaries, and permission model unless a future approved sprint explicitly changes them.

## Brand Hierarchy

- Master brand: **Equine Precision Performance**
- Short public name: **Precision Performance**
- Descriptor: **Equine Biochemistry and Recovery Intelligence**
- Software product: **Precision Performance Portal**
- Physical product: **Precision Performance Testing Kit**
- Methodology: **The Precision Performance Method**

Balance Energy Australia may appear in corporate history, ownership, and legal information, but should not visually compete with the equine brand on every page.

## Visual System

| Role | Value | Use |
|---|---|---|
| Racing green | `#12352F` | Primary brand, header, footer |
| Midnight navy | `#111D2B` | Portal surfaces and technical sections |
| Warm bone | `#F4F1E9` | Main marketing background |
| White | `#FFFFFF` | Cards, forms, reading surfaces |
| Data blue | `#278BC2` | Metrics, links, chart highlights |
| Heritage gold | `#C3A15B` | Premium accent and logo detail |
| Slate | `#68747A` | Secondary text |
| Status green | `#36845B` | Positive status |
| Status amber | `#D39A2E` | Review required |
| Status red | `#C8514A` | Attention required |

Use Newsreader or Source Serif 4 for major headings, quotations, and editorial sections; Inter or Manrope for body copy, navigation, tables, charts, forms, and portal UI. Reserve uppercase for short labels.

Red, amber, and green are functional portal colours, not dominant marketing-brand colours. Status colour must always be accompanied by a text label and, where applicable, an icon, numerical value, and explanatory context.

## Photography And Public Evidence

Prefer authentic horses, trainers, stable professionals, equipment, instruments, and real working environments. Public hero imagery should lead with a horse and trainer in a credible stable context with only a restrained suggestion of measurement or technology.

Do not lead with sample containers, pathology records, dense spreadsheets, artificial anatomical overlays, glowing/cyber-styled horses, or dashboards floating out of context.

Raw horse spreadsheets, pathology records, confidential worksheets, proprietary formulas, or identifiable stable data must not appear publicly. Use recreated, anonymised charts and obtain explicit releases for identifiable people, horses, and stables.

## Messaging And Claims

Prefer language such as supports more informed decisions, helps identify changes over time, provides trend-based visibility, establishes an individual baseline, complements trainer observation and professional veterinary care, reduces reliance on estimates, and supports targeted review.

Avoid guarantees, predictions, proof claims, diagnosis, exact biological need, always race-ready, ensured recovery, winning formula, or statements implying the platform replaces veterinary assessment.

Public claims must be classified as demonstrated platform capability, internal observational finding, trainer testimonial, case-study correlation, independently validated finding, or future product objective. Do not present correlation as causation. Marketing must align with the educational/informational and non-medical disclaimer.

## Public Experience Direction

Use the existing application architecture initially, with section-led content for How It Works, For Trainers, Platform, Evidence, Kit and Services, About, and Insights.

The primary acquisition action is **Request a Stable Trial**. **Trainer Login** is a utility action. Recommended hero direction:

- Eyebrow: Equine Biochemistry and Recovery Intelligence
- Headline: See what observation alone cannot show.
- Primary action: Request a Stable Trial
- Secondary action: See How It Works

A CMS, publishing system, or broad multi-page route expansion is not implied and requires explicit scope.

## Portal And Operations Direction

The authenticated experience should be visually related but substantially more utilitarian. It should eventually make it easy to answer which horses need attention, what was entered today, which records are incomplete, what changed, and what action comes next.

The mobile workflow direction is horse, date/time, measurements, photos, voice or typed notes, review, and submit. This does not authorize uploads, storage, voice recording, transcription, or schema changes.

Do not overload results with many simultaneous charts. Prefer legible status, individual baselines, longitudinal comparison, and focused next-action context.

## Terminology

`Health Score` remains an unsettled public label. A future UI sprint may use an approved display-only label such as **Biochemistry Trend Score** while retaining internal compatibility. Any internal rename of database fields, TypeScript contracts, snapshots, fixtures, or reporting keys requires an explicit migration and compatibility plan.

## Architecture Approval Gates

The following require dedicated approved scope:

1. Photo/PDF uploads, storage, retention, deletion, storage RLS, or attachment schema changes.
2. Voice recording/transcription providers, permissions, fallback, retention, or privacy handling.
3. Expansion or redefinition of Trainer, Stable Manager, Stable Staff, Owner, Veterinarian, Consultant, or Administrator permissions and RLS boundaries.
4. Internal renaming of `healthScore` or related persisted/domain contracts.
5. CMS integration, an Insights publishing system, or broad public route expansion.
6. Stable aggregation, incomplete-record detection, attention ranking, longitudinal queries, or status derivation.
7. Production status thresholds or Table of Knowledge recommendation content.
8. Public/shop reopening, pricing publication, deployment, remote migration, production mutation, push, or PR.

## Commercial And Evidence Gates

Do not publish pricing until one approved commercial schedule resolves GST, kit contents, training, software, support, horse limits, subscription duration, cancellation, postage, buyback, and trial conditions.

Do not market scores or automated recommendations as validated until production thresholds, formulas, intended interpretations, and approved Table of Knowledge content are accepted. Do not publish an under-60-second claim until consistently demonstrated in real stable use.

## Sprint Carry-Forward Rule

Every future Architect Pack or sprint touching a relevant surface must:

1. Reference this document in its source-of-truth section.
2. Identify applicable design, messaging, terminology, accessibility, privacy, and claims requirements.
3. State whether an architecture gate is crossed.
4. Keep visual/content work separate from schema, auth/RLS, provider, CMS, aggregation, and deployment scope unless explicitly approved.
5. Include relevant acceptance checks for colour-plus-label status, responsive/mobile behaviour, safe claims, confidential-data exclusion, and public/authenticated separation.
6. Record manual intervention whenever photography/releases, domain content, provider choice, thresholds, pricing, or operator access is required.
