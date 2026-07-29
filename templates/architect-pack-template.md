# Architect Pack Template

Use the delimiter format documented in `planning/architect-packs/README.md`.

For small sprints, prefer one `SPRINT.md` file with sections: Goal, Scope, Out of Scope, Files, Acceptance, Validation, Handoff.

For larger or strict work, use the four-file sprint set.

Every generated Builder sprint must explicitly inherit the Evidence-Proportional Execution Standard in `AGENTS.md`:

- stop only for a material target, security, privacy, migration, destructive, integrity, production, scope-authority, or cleanup risk;
- use equivalent or stronger safe evidence when a preferred supporting tool is unavailable;
- keep in-scope tooling, harness, credential, validator, formatting, encoding, and reporter corrections in the current sprint;
- do not create a follow-up sprint solely for unavailable Docker/browser/render/CLI tooling or redundant verification;
- prefer governed end-to-end runtime proof when it covers the same boundary more strongly than metadata inspection; and
- use manual intervention only after safe in-scope alternatives are exhausted.

Sprint acceptance and handoff wording must not reintroduce a stricter procedural stop that conflicts with this standard unless the Pack names the material risk that requires it.
