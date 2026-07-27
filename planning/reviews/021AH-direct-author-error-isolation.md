# Sprint 021AH Direct Author Error Isolation

Status: `pass`.

One genuine active-author diagnostic began from candidate Auth/application/Storage `0/0/0`, created one actor and one note, invoked the deployed 0016 RPC through the actor client, and independently inspected mutation and attribution.

Fixed result class: `rpc-syntax-or-resolution-error-no-row`. No row mutated. Repository migration 0016 contains schema-qualified `pg_catalog.coalesce`; no remote function body or raw error content was emitted.

The diagnostic used no retry, weakening, or service-role mutation. It removed exact application rows in reverse dependency order and Auth last; closing state was `0/0/0`. Old project was not contacted.
