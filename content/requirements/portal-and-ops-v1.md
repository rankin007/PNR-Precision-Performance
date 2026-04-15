# Portal And Operations V1

This document records the first instantiated portal horse view and multi-form operations workflow.

## Implemented Portal Slice

- assigned horse summary grid in `/portal/horses`
- dynamic horse detail route in `/portal/horses/[horseId]`
- recent metric snapshots for temperature, weight, and water intake

## Implemented Operations Slice

- daily record form in `/data-entry`
- feeding log form in `/data-entry/feeding`
- track session form in `/data-entry/track`
- recent submissions queue in `/data-entry/submissions`
- submission review and correction flows in `/data-entry/submissions/[submissionId]`
- correction support for daily-record notes and physiological measurements
- correction support for feeding-log notes
- correction support for track session notes, type, surface, distance, and duration

## Live-Aware Behaviour

- when Supabase is connected, pages query real records through the signed-in context
- when Supabase is not connected, pages fall back to structural preview states and sample data where useful

## Next Expansion Opportunities

- horse history timelines and charting
- explicit approval states and change-reason capture for corrected submissions
- audit-log writes for submission edits
- feeding and track validation rules by horse and stable
- richer permission-aware portal summaries by membership level
