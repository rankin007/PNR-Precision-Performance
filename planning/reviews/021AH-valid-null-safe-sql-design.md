# Sprint 021AH Valid Null-Safe SQL Design

Status: `pass` before migration application.

Migration `0017_valid_null_safe_authenticated_biochemistry_comment_soft_delete.sql` replaces only the exact boolean RPC. It preserves 0016 actor derivation, active user/profile gates, target row lock, authorization boundary, timestamp, attribution, row-count agreement, security definer, hardened search path, owner, and authenticated-only grants.

Administrator, author equality, and comment permission use valid `IS TRUE` expressions. Combined authorization is denied with `authorized IS NOT TRUE`. No schema-qualified conditional expression, nullable negated authorization, caller identity, dynamic SQL, returned detail, exception allow, policy/schema/owner change, or privilege expansion exists.

Focused 021AH parser/truth-table tests, 021AG/021AF and preserved 021AD/021R/021T/021V/021AC tests, exact 0001–0017 validation, bundle generation/header checks, canonical validations, TypeScript, lint, prohibition/output/scope/index/diff checks, and the clean reparse-safe production build all passed before remote application.
