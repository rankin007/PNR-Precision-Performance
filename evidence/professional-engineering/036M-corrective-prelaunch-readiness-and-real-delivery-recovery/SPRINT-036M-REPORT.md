# Sprint 036M Report

Status: closed after same-Architect repair-diff PASS
Outcome: `prelaunch-recovery-blocked-clean`; target not met and ProtectedWindow remains forbidden
Date: 2026-08-13

## Result

The reviewed repair moved pair and binding mutation latches before the potentially mutating provider calls, added exact-name/readback compensation coverage for partial creates, and added end-to-end child failure tests. Trainer graph creation now removes every exact-owned partial row at all eight mutate-then-throw positions in reverse dependency order. A completed graph is also cleaned on interruption after the irreversible legacy latch.

Trainer authority now requires one separately masked, owner-approved exact Auth ID. The controller independently reads that Auth identity, requires exactly zero matching public.users rows before the first graph write, captures last_sign_in as the delivery baseline, and never receives an address, OTP code, cookie or session.

Manual success attestation is no longer authority. Baseline consumer closure, old-deployment closure and seven credential-class dispositions are native-adapter results. Where the present adapter cannot independently enumerate or read back a class, it returns unchanged-blocking or blocked-retained before the irreversible latch; it never converts operator-entered counts or booleans into success.

The wrapper redirects the single child process''s stdin, stdout and stderr. Stderr is drained into a fixed 4097-byte in-memory buffer; any byte is a sanitized protocol failure and content is never emitted. The executable canary passed with only the sanitized success projection visible.

## Local proof

- Focused: recovery 110/110, provider 90/90, identity 70/70, trainer 60/60, compatibility/PKCE 30/30; total 360/360.
- Retained: 036K readiness 260, 036K provider 36, 036J 136, 035K 101, managed roles 157, Owner 36, role matrix 27, operational restoration 130, disabled commerce 24, disabled enquiry 36; total 943/943.
- Combined counted total: 1303/1303.
- PowerShell AST and stderr transport canary: pass.
- JavaScript syntax: pass.
- External/private/provider/trainer/temp-export actions: 0.
- External mutations/residue: 0/0.

## Current boundary

This checkpoint does not authorize ProtectedWindow. The native baseline currently fails closed because exhaustive consumer inventory and old-deployment discrimination are not yet independently available from the configured adapter. Six non-Supabase credential classes land blocked-retained unless a finite native readback is available. The real-trainer phase therefore cannot start.

Same-Architect repair-diff review is required before any protected value is entered or any provider action occurs. No stage, commit, push, PR, deployment or external mutation occurred.
