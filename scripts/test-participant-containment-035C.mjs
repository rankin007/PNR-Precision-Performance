import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { classifyContainmentIdentity, classifyMatchOwnership, priorLedgerStateForApply } from "./supabase-participant-handoff-035C.mjs";

const within = "2026-07-30T00:30:00Z";
const candidate = { key: "candidate", exactInbox: true, createdAt: within };
const unrelated = { key: "unrelated", exactInbox: false, createdAt: "2025-01-01T00:00:00Z" };

assert.equal(classifyContainmentIdentity([unrelated, candidate]).key, "candidate");
assert.throws(() => classifyContainmentIdentity([unrelated]), /IDENTITY_MATCH_MISSING/);
assert.throws(() => classifyContainmentIdentity([candidate, { ...candidate, key: "duplicate" }]), /DUPLICATE_IDENTITY_A/);
assert.throws(() => classifyContainmentIdentity([candidate, { ...unrelated, participantAlias: "A", pilotSprint: "035C" }]), /ALIAS_TAG_AMBIGUOUS_A/);
assert.throws(() => classifyContainmentIdentity([{ ...candidate, createdAt: "2026-07-29T23:40:00Z" }]), /OWNERSHIP_TIME_REFUSED/);
assert.throws(() => classifyContainmentIdentity([{ ...candidate, participantAlias: "A" }]), /UNEXPECTED_METADATA_REFUSED/);
assert.equal(classifyMatchOwnership({ alias: "A", createdAt: "2026-07-30T03:24:00Z", priorLedgerState: "contained-owned-deleted" }), "sprint-owned");
assert.equal(classifyMatchOwnership({ alias: "A", createdAt: "2026-07-30T03:23:00Z", priorLedgerState: "contained-owned-deleted" }), "not-owned");
assert.equal(classifyMatchOwnership({ alias: "B", createdAt: "2026-07-30T03:24:00Z", priorLedgerState: null }), "not-owned");
const contained = { participants: { A: { state: "contained-owned-deleted", ownership: "sprint-owned", window: "recorded-a-creation-window" } } };
assert.equal(priorLedgerStateForApply(contained, "A"), "contained-owned-deleted");
assert.throws(() => priorLedgerStateForApply({ participants: { A: { ...contained.participants.A, ownership: "not-owned" } } }, "A"), /OWNERSHIP_LEDGER_REFUSED/);
assert.throws(() => priorLedgerStateForApply({ participants: { A: { ...contained.participants.A, state: "existing-tagged" } } }, "A"), /ALIAS_ALREADY_PROCESSED_A/);
assert.throws(() => priorLedgerStateForApply({ participants: { B: contained.participants.A } }, "B"), /ALIAS_ALREADY_PROCESSED_B/);
assert.equal(priorLedgerStateForApply({ participants: {} }, "A"), null);

const source = readFileSync("scripts/supabase-participant-handoff-035C.mjs", "utf8");
assert(!source.includes("known.length !== 1"));
assert(source.includes('if (membershipCount !== 0 || assignmentCount !== 0) fail("APPLICATION_ACCESS_REFUSED")'));
assert(source.indexOf('admin.from("users").delete()') < source.indexOf("admin.auth.admin.deleteUser(user.id, false)"));
assert(source.indexOf("admin.auth.admin.deleteUser(user.id, false)") < source.indexOf('if (remainingAuth !== 0 || remainingApp !== 0'));
assert(source.includes("JSON.stringify(unrelatedAfter) !== JSON.stringify(unrelatedBefore)"));
assert(source.includes('state: "containment-qualified", ownership: "sprint-owned"'));
assert(source.includes('state: "contained-owned-deleted", ownership: "sprint-owned"'));
assert(source.includes('ownedCounts: "0/0/0"'));
assert(source.includes('report[alias] = "owned-deleted"'));
assert(source.includes('report[alias] = "not-owned-tags-removed"'));
assert(source.includes('const priorLedgerState = priorLedgerStateForApply(ledger, alias)'));
assert(source.includes('if (user.last_sign_in_at) fail("SESSION_STATE_REFUSED")'));
assert(source.includes('if (appState.error || appState.count !== 0) fail("APPLICATION_STATE_REFUSED")'));
assert(source.includes('if (priorLedgerState === "contained-owned-deleted" && ownership !== "sprint-owned") fail("OWNERSHIP_TIME_REFUSED")'));
assert(source.indexOf("admin.auth.admin.updateUserById(user.id") < source.indexOf('ledger.participants[alias] = { state: "existing-tagged", ownership }'));
assert(source.includes('const restored = await admin.auth.admin.updateUserById(user.id, { app_metadata: original })'));
assert(source.includes('participant: `${alias}-existing-tagged`, ownership'));
assert(source.includes("renameSync(pending, LEDGER)"));
assert(!source.includes("unrelatedUserCount"));

console.log("Sprint 035C participant ownership and containment tests passed.");
