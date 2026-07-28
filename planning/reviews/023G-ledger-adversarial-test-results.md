# Sprint 023G — Ledger Adversarial Test Results

`test-supabase-clean-rebuild-ledger-023G.ps1` passed valid contiguous 0001–0018 and rejected missing 0018, earlier gap, duplicate prefix, renamed/empty 0018, 0019, malformed numeric prefix. Unrelated files are ignored, ordering is numeric, diagnostics say candidate repository chain and do not claim application, and temporary artifacts are removed. The maintained 020G validator passes with exact filename and independent legacy/constraint/scope/lineage/table/lock/RLS/revocation markers.
