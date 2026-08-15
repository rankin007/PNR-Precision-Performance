import fs from "node:fs";
import path from "node:path";
import {
  MANAGED_ACCESS_ROLE_LABELS,
  MANAGED_ACCESS_ROLES,
  composeManagedAccessSnapshot,
  executeManagedAssignmentMutation,
  executeManagedRevocationMutation,
  isActiveWindow,
  isUuid,
  parseManagedAccessRole,
  resolveManagedAssignmentRequest,
  resolveManagedRevocationRequest,
} from "../lib/auth/managed-access-contract.ts";
import { createManagedAccessMutationAdapter } from "../lib/auth/managed-access-mutation-adapter.ts";

const counts = { contract: 0, snapshot: 0, assignment: 0, revocation: 0, semantic: 0, adapter: 0, source: 0 };
function check(group, condition, label) {
  counts[group] += 1;
  if (!condition) throw new Error(`${group} assertion ${counts[group]} failed: ${label}`);
}

const id = (value) => `00000000-0000-4000-8000-${String(value).padStart(12, "0")}`;
const actorUser = id(1);
const actorProfile = id(2);
const vetUser = id(3);
const vetProfile = id(4);
const staffUser = id(5);
const staffProfile = id(6);
const consultantUser = id(7);
const consultantProfile = id(8);
const horseA = id(9);
const horseB = id(10);
const stableA = id(11);
const stableB = id(12);
const assignmentA = id(13);
const now = new Date("2026-08-11T04:00:00.000Z");

check("contract", parseManagedAccessRole("veterinarian") === "veterinarian", "veterinarian accepted");
check("contract", parseManagedAccessRole("stable_hand") === "stable_hand", "stable hand accepted");
for (const refused of ["consultant", "stable_manager", "owner", "trainer"]) {
  check("contract", parseManagedAccessRole(refused) === null, `${refused} refused`);
}
check("contract", MANAGED_ACCESS_ROLES.length === 2, "two Product roles");
check("contract", MANAGED_ACCESS_ROLE_LABELS.veterinarian === "Veterinarian", "vet label");
check("contract", MANAGED_ACCESS_ROLE_LABELS.stable_hand === "Stable Staff", "staff label");
check("contract", isUuid(vetProfile), "well-formed UUID");
check("contract", !isUuid("not-a-uuid"), "malformed UUID refused");
check("contract", !isUuid(id(1).replace("-4000-", "-7000-")), "unsupported UUID version refused");
check("contract", isActiveWindow(null, null, now), "open window active");
check("contract", !isActiveWindow("2026-08-12T00:00:00.000Z", null, now), "future window inactive");

const profiles = [
  { id: vetProfile, user_id: vetUser, display_name: "Synthetic Veterinary Reviewer", is_active: true, users: { id: vetUser, status: "active", primary_role_code: "veterinarian" } },
  { id: staffProfile, user_id: staffUser, display_name: "Synthetic Stable Staff", is_active: true, users: { id: staffUser, status: "active", primary_role_code: "stable_hand" } },
  { id: consultantProfile, user_id: consultantUser, display_name: "Synthetic Consultant", is_active: true, users: { id: consultantUser, status: "active", primary_role_code: "consultant" } },
];
const horses = [
  { id: horseA, name: "Synthetic Horse Alpha", stable_id: stableA },
  { id: horseB, name: "Synthetic Horse Bravo", stable_id: stableB },
];
const assignments = [
  { id: assignmentA, horse_id: horseA, stable_id: stableA, member_profile_id: vetProfile, role_code: "veterinarian", access_level: "read", starts_at: "2026-08-10T00:00:00.000Z", ends_at: null },
];
function snapshot(overrides = {}) {
  return composeManagedAccessSnapshot({
    actorAppUserId: actorUser,
    actorMemberProfileId: actorProfile,
    actorRole: "trainer",
    profiles,
    horses,
    manageableHorseIds: [horseA],
    assignments,
    reference: now,
    ...overrides,
  });
}
const scoped = snapshot();
check("snapshot", scoped.availability === "available", "snapshot available");
if (scoped.availability !== "available") throw new Error("fixture unavailable");
check("snapshot", scoped.actorAppUserId === actorUser, "actor app user retained");
check("snapshot", scoped.actorMemberProfileId === actorProfile, "actor profile retained");
check("snapshot", scoped.actorRole === "trainer", "actor role retained");
check("snapshot", scoped.candidates.length === 2, "only two candidates");
check("snapshot", scoped.candidates.every((candidate) => candidate.roleCode !== "consultant"), "Consultant absent");
check("snapshot", scoped.candidates[0].displayName === "Synthetic Stable Staff", "candidates sorted");
check("snapshot", scoped.horses.length === 1, "only manageable horse");
check("snapshot", scoped.horses[0].id === horseA, "managed horse exact");
check("snapshot", scoped.assignments.length === 1, "active assignment visible");
check("snapshot", scoped.assignments[0].id === assignmentA, "assignment exact");
check("snapshot", snapshot({ queryFailed: true }).availability === "unavailable", "query error fails closed");
check("snapshot", snapshot({ profiles: [{ ...profiles[0], display_name: "" }] }).availability === "unavailable", "malformed profile fails closed");
check("snapshot", snapshot({ horses: [{ id: horseA, name: "", stable_id: stableA }] }).availability === "unavailable", "malformed horse fails closed");
check("snapshot", snapshot({ assignments: [{ ...assignments[0], access_level: "manage" }] }).availability === "unavailable", "non-read assignment fails closed");
check("snapshot", snapshot({ actorRole: "owner" }).availability === "unavailable", "non-manager actor fails closed");

const candidateRoleMismatch = snapshot({
  assignments: [{ ...assignments[0], role_code: "stable_hand" }],
});
check("snapshot", candidateRoleMismatch.availability === "unavailable", "candidate and assignment role mismatch fails closed");
check("snapshot", snapshot({ profiles: [...profiles, { ...profiles[0] }] }).availability === "unavailable", "ambiguous candidate rows fail closed");
check("snapshot", scoped.assignments[0].roleCode === scoped.candidates.find((candidate) => candidate.id === vetProfile)?.roleCode, "exact candidate role retained");
check("snapshot", candidateRoleMismatch.availability !== "available", "mismatched assignment cannot become revocable");

function makeSemanticAdapter(seedRows = [], options = {}) {
  const rows = structuredClone(seedRows);
  const calls = [];
  const result = (data, error = null) => ({ data, error });
  return {
    rows,
    calls,
    async findExisting(key) {
      calls.push(["findExisting", key]);
      if (options.findError) return result(null, new Error("synthetic"));
      const matches = rows.filter((row) =>
        row.horse_id === key.horseId &&
        row.member_profile_id === key.memberProfileId &&
        row.role_code === key.roleCode
      );
      return result(matches.map(({ id: rowId, starts_at, ends_at }) => ({ id: rowId, starts_at, ends_at })));
    },
    async create(payload) {
      calls.push(["create", payload]);
      if (options.createRows !== undefined) return result(options.createRows);
      const row = { id: id(14), ...payload };
      rows.push(row);
      return result([{ id: row.id }]);
    },
    async reactivate(target, payload) {
      calls.push(["reactivate", target, payload]);
      if (options.reactivateRows !== undefined) return result(options.reactivateRows);
      const matches = rows.filter((row) =>
        row.id === target.assignmentId &&
        row.horse_id === target.horseId &&
        row.member_profile_id === target.memberProfileId &&
        row.role_code === target.roleCode &&
        !isActiveWindow(row.starts_at, row.ends_at, now)
      );
      if (matches.length === 1) Object.assign(matches[0], payload);
      return result(matches.map((row) => ({ id: row.id })));
    },
    async revoke(target) {
      calls.push(["revoke", target]);
      if (options.revokeRows !== undefined) return result(options.revokeRows);
      const matches = rows.filter((row) =>
        row.id === target.assignmentId &&
        row.horse_id === target.horseId &&
        row.member_profile_id === target.memberProfileId &&
        row.role_code === target.roleCode &&
        isActiveWindow(row.starts_at, row.ends_at, now)
      );
      if (matches.length === 1) matches[0].ends_at = now.toISOString();
      return result(matches.map((row) => ({ id: row.id })));
    },
  };
}

const mutationInput = {
  horse: scoped.horses[0],
  candidate: scoped.candidates.find((candidate) => candidate.id === vetProfile),
  roleCode: "veterinarian",
  actorAppUserId: actorUser,
  reference: now,
};
if (!mutationInput.candidate) throw new Error("candidate fixture unavailable");

const createMemory = makeSemanticAdapter();
const createOutcome = await executeManagedAssignmentMutation(createMemory, mutationInput);
check("semantic", createOutcome.outcome === "assigned", "create assigned");
check("semantic", createOutcome.outcome === "assigned" && createOutcome.operation === "create", "create operation exact");
check("semantic", createOutcome.outcome === "assigned" && isUuid(createOutcome.assignmentId), "create returned UUID valid");
check("semantic", createMemory.calls.filter(([name]) => name === "create").length === 1, "create called once");
check("semantic", createMemory.rows.length === 1 && createMemory.rows[0].role_code === "veterinarian", "create exact row added");
check("semantic", createMemory.calls[0][1].horseId === horseA && createMemory.calls[0][1].memberProfileId === vetProfile, "create lookup key exact");

const inactiveRow = { ...assignments[0], ends_at: "2026-08-10T01:00:00.000Z" };
const reactivateMemory = makeSemanticAdapter([inactiveRow]);
const reactivateOutcome = await executeManagedAssignmentMutation(reactivateMemory, mutationInput);
check("semantic", reactivateOutcome.outcome === "assigned", "reactivate assigned");
check("semantic", reactivateOutcome.outcome === "assigned" && reactivateOutcome.operation === "reactivate", "reactivate operation exact");
check("semantic", reactivateOutcome.outcome === "assigned" && reactivateOutcome.assignmentId === assignmentA, "reactivate same ID");
check("semantic", reactivateMemory.calls.some(([name]) => name === "reactivate"), "reactivate called");
check("semantic", reactivateMemory.rows[0].starts_at === now.toISOString() && reactivateMemory.rows[0].ends_at === null, "reactivate exact window");
check("semantic", !reactivateMemory.calls.some(([name]) => name === "create"), "reactivate does not create");

const duplicateMemory = makeSemanticAdapter([assignments[0]]);
const duplicateBefore = JSON.stringify(duplicateMemory.rows);
const duplicateOutcome = await executeManagedAssignmentMutation(duplicateMemory, mutationInput);
check("semantic", duplicateOutcome.outcome === "unavailable", "active duplicate denied");
check("semantic", !duplicateMemory.calls.some(([name]) => name === "create"), "duplicate does not create");
check("semantic", !duplicateMemory.calls.some(([name]) => name === "reactivate"), "duplicate does not reactivate");
check("semantic", JSON.stringify(duplicateMemory.rows) === duplicateBefore, "duplicate changes zero rows");

const ambiguousMemory = makeSemanticAdapter([inactiveRow, { ...inactiveRow, id: id(15) }]);
const ambiguousBefore = JSON.stringify(ambiguousMemory.rows);
const ambiguousOutcome = await executeManagedAssignmentMutation(ambiguousMemory, mutationInput);
check("semantic", ambiguousOutcome.outcome === "unavailable", "ambiguous rows denied");
check("semantic", ambiguousMemory.calls.length === 1, "ambiguous stops after lookup");
check("semantic", JSON.stringify(ambiguousMemory.rows) === ambiguousBefore, "ambiguous changes zero rows");
check("semantic", !ambiguousMemory.calls.some(([name]) => name === "create" || name === "reactivate"), "ambiguous has no mutation");

const revokeMemory = makeSemanticAdapter([assignments[0]]);
const revokeOutcome = await executeManagedRevocationMutation(revokeMemory, scoped.assignments[0]);
check("semantic", revokeOutcome.outcome === "revoked", "exact revoke succeeds");
check("semantic", revokeOutcome.outcome === "revoked" && revokeOutcome.operation === "revoke", "revoke operation exact");
check("semantic", revokeOutcome.outcome === "revoked" && revokeOutcome.assignmentId === assignmentA, "revoke same ID");
check("semantic", revokeMemory.calls.length === 1 && revokeMemory.calls[0][0] === "revoke", "revoke called once");
check("semantic", revokeMemory.rows[0].ends_at === now.toISOString(), "revoke ends exact row");
check("semantic", revokeMemory.rows.length === 1, "revoke preserves row count");

const staleMemory = makeSemanticAdapter([{ ...assignments[0], ends_at: "2026-08-10T01:00:00.000Z" }]);
const staleBefore = JSON.stringify(staleMemory.rows);
const staleOutcome = await executeManagedRevocationMutation(staleMemory, scoped.assignments[0]);
check("semantic", staleOutcome.outcome === "unavailable", "stale revoke denied");
check("semantic", JSON.stringify(staleMemory.rows) === staleBefore, "stale changes zero rows");
check("semantic", staleMemory.calls.length === 1, "stale attempted exact revoke");
check("semantic", staleOutcome.outcome !== "revoked", "stale has generic outcome");

const foreignMemory = makeSemanticAdapter([{ ...assignments[0], horse_id: horseB }]);
const foreignBefore = JSON.stringify(foreignMemory.rows);
const foreignOutcome = await executeManagedRevocationMutation(foreignMemory, scoped.assignments[0]);
check("semantic", foreignOutcome.outcome === "unavailable", "foreign revoke denied");
check("semantic", JSON.stringify(foreignMemory.rows) === foreignBefore, "foreign changes zero rows");
check("semantic", foreignMemory.calls.length === 1, "foreign exact filter attempted");
check("semantic", foreignOutcome.outcome !== "revoked", "foreign has generic outcome");

const refusalMemory = makeSemanticAdapter();
const refusalResults = await Promise.all([
  executeManagedAssignmentMutation(refusalMemory, { ...mutationInput, roleCode: "stable_hand" }),
  executeManagedAssignmentMutation(refusalMemory, { ...mutationInput, actorAppUserId: "bad" }),
]);
check("semantic", refusalResults.every((result) => result.outcome === "unavailable"), "denial inputs return generic unavailable");
check("semantic", refusalMemory.calls.length === 0 && refusalMemory.rows.length === 0, "denial inputs mutate zero rows");

class RecordingBuilder {
  constructor(client, table) {
    this.client = client;
    this.client.operations.push(["from", table]);
  }
  select(columns) { this.client.operations.push(["select", columns]); return this; }
  eq(column, value) { this.client.operations.push(["eq", column, value]); return this; }
  or(filters) { this.client.operations.push(["or", filters]); return this; }
  insert(payload) { this.client.operations.push(["insert", structuredClone(payload)]); return this; }
  update(payload) { this.client.operations.push(["update", structuredClone(payload)]); return this; }
  then(resolve, reject) {
    const value = this.client.results.shift() ?? { data: [], error: null };
    return Promise.resolve(value).then(resolve, reject);
  }
}
class RecordingClient {
  constructor(results) { this.results = structuredClone(results); this.operations = []; }
  from(table) { return new RecordingBuilder(this, table); }
}
const key = { horseId: horseA, memberProfileId: vetProfile, roleCode: "veterinarian" };
const target = { ...key, assignmentId: assignmentA };
const exactPayload = {
  horse_id: horseA, stable_id: stableA, member_profile_id: vetProfile,
  role_code: "veterinarian", access_level: "read", nominated_by_user_id: actorUser,
  starts_at: now.toISOString(), ends_at: null,
};
const op = (operations, name, detail) => operations.find((entry) => entry[0] === name && (detail === undefined || entry[1] === detail));

const lookupClient = new RecordingClient([{ data: [{ id: assignmentA, starts_at: null, ends_at: null }], error: null }]);
const lookupAdapter = createManagedAccessMutationAdapter(lookupClient, now.toISOString());
const lookupResult = await lookupAdapter.findExisting(key);
check("adapter", lookupClient.operations[0][1] === "biochemistry_horse_access_assignments", "lookup table exact");
check("adapter", op(lookupClient.operations, "select", "id,starts_at,ends_at"), "lookup select exact");
check("adapter", lookupClient.operations.some((entry) => entry[0] === "eq" && entry[1] === "horse_id" && entry[2] === horseA), "lookup horse eq");
check("adapter", lookupClient.operations.some((entry) => entry[0] === "eq" && entry[1] === "member_profile_id" && entry[2] === vetProfile), "lookup profile eq");
check("adapter", lookupClient.operations.some((entry) => entry[0] === "eq" && entry[1] === "role_code" && entry[2] === "veterinarian"), "lookup role eq");
check("adapter", lookupResult.data[0].id === assignmentA, "lookup rows returned");

const createClient = new RecordingClient([{ data: [{ id: id(14) }], error: null }]);
const createAdapter = createManagedAccessMutationAdapter(createClient, now.toISOString());
const createResult = await createAdapter.create(exactPayload);
check("adapter", createClient.operations[0][1] === "biochemistry_horse_access_assignments", "create table exact");
check("adapter", createClient.operations[1][0] === "insert", "create insert operation");
check("adapter", JSON.stringify(createClient.operations[1][1]) === JSON.stringify(exactPayload), "create payload exact");
check("adapter", op(createClient.operations, "select", "id"), "create select exact");
check("adapter", createResult.data[0].id === id(14), "create rows returned");

const reactivateClient = new RecordingClient([{ data: [{ id: assignmentA }], error: null }]);
const reactivateAdapter = createManagedAccessMutationAdapter(reactivateClient, now.toISOString());
const reactivateResult = await reactivateAdapter.reactivate(target, exactPayload);
check("adapter", reactivateClient.operations[0][1] === "biochemistry_horse_access_assignments", "reactivate table exact");
check("adapter", reactivateClient.operations[1][0] === "update", "reactivate update operation");
check("adapter", JSON.stringify(reactivateClient.operations[1][1]) === JSON.stringify(exactPayload), "reactivate payload exact");
for (const [column, value] of [["id", assignmentA], ["horse_id", horseA], ["member_profile_id", vetProfile], ["role_code", "veterinarian"]]) {
  check("adapter", reactivateClient.operations.some((entry) => entry[0] === "eq" && entry[1] === column && entry[2] === value), `reactivate ${column} eq`);
}
check("adapter", op(reactivateClient.operations, "or", `starts_at.gt.${now.toISOString()},ends_at.lt.${now.toISOString()}`), "reactivate inactive filter");
check("adapter", op(reactivateClient.operations, "select", "id"), "reactivate select exact");
check("adapter", reactivateResult.data[0].id === assignmentA, "reactivate rows returned");

const revokeClient = new RecordingClient([{ data: [{ id: assignmentA }], error: null }]);
const revokeAdapter = createManagedAccessMutationAdapter(revokeClient, now.toISOString());
const revokeResult = await revokeAdapter.revoke(target);
check("adapter", revokeClient.operations[0][1] === "biochemistry_horse_access_assignments", "revoke table exact");
check("adapter", revokeClient.operations[1][0] === "update", "revoke update operation");
check("adapter", JSON.stringify(revokeClient.operations[1][1]) === JSON.stringify({ ends_at: now.toISOString() }), "revoke payload exact");
for (const [column, value] of [["id", assignmentA], ["horse_id", horseA], ["member_profile_id", vetProfile], ["role_code", "veterinarian"]]) {
  check("adapter", revokeClient.operations.some((entry) => entry[0] === "eq" && entry[1] === column && entry[2] === value), `revoke ${column} eq`);
}
check("adapter", op(revokeClient.operations, "or", `starts_at.is.null,starts_at.lte.${now.toISOString()}`), "revoke active-start filter");
check("adapter", op(revokeClient.operations, "or", `ends_at.is.null,ends_at.gte.${now.toISOString()}`), "revoke active-end filter");
check("adapter", op(revokeClient.operations, "select", "id"), "revoke select exact");
check("adapter", revokeResult.data[0].id === assignmentA, "revoke rows returned");

for (const [label, rows, accepted] of [
  ["zero", [], false],
  ["one", [{ id: id(14) }], true],
  ["multiple", [{ id: id(14) }, { id: id(15) }], false],
]) {
  const client = new RecordingClient([{ data: [], error: null }, { data: rows, error: null }]);
  const result = await executeManagedAssignmentMutation(createManagedAccessMutationAdapter(client, now.toISOString()), mutationInput);
  check("adapter", (result.outcome === "assigned") === accepted, `create ${label} row cardinality`);
}
for (const [label, rows, accepted] of [
  ["zero", [], false],
  ["one", [{ id: assignmentA }], true],
  ["multiple", [{ id: assignmentA }, { id: id(15) }], false],
]) {
  const client = new RecordingClient([{ data: [{ id: assignmentA, starts_at: null, ends_at: "2026-08-10T01:00:00.000Z" }], error: null }, { data: rows, error: null }]);
  const result = await executeManagedAssignmentMutation(createManagedAccessMutationAdapter(client, now.toISOString()), mutationInput);
  check("adapter", (result.outcome === "assigned") === accepted, `reactivate ${label} row cardinality and same-ID check`);
}
for (const [label, rows, accepted] of [
  ["zero", [], false],
  ["one", [{ id: assignmentA }], true],
  ["multiple", [{ id: assignmentA }, { id: id(15) }], false],
]) {
  const client = new RecordingClient([{ data: rows, error: null }]);
  const result = await executeManagedRevocationMutation(createManagedAccessMutationAdapter(client, now.toISOString()), scoped.assignments[0]);
  check("adapter", (result.outcome === "revoked") === accepted, `revoke ${label} row cardinality and same-ID check`);
}

const acceptedVet = resolveManagedAssignmentRequest(scoped, { horseId: horseA, memberProfileId: vetProfile, roleCode: "veterinarian" });
check("assignment", acceptedVet.accepted, "scoped vet accepted");
check("assignment", acceptedVet.accepted && acceptedVet.horse.id === horseA, "horse returned");
check("assignment", acceptedVet.accepted && acceptedVet.candidate.id === vetProfile, "candidate returned");
check("assignment", acceptedVet.accepted && acceptedVet.roleCode === "veterinarian", "role returned");
const acceptedStaff = resolveManagedAssignmentRequest(scoped, { horseId: horseA, memberProfileId: staffProfile, roleCode: "stable_hand" });
check("assignment", acceptedStaff.accepted, "scoped staff accepted");
check("assignment", acceptedStaff.accepted && acceptedStaff.candidate.roleCode === "stable_hand", "staff role exact");
for (const [label, request] of [
  ["Consultant", { horseId: horseA, memberProfileId: consultantProfile, roleCode: "consultant" }],
  ["forged", { horseId: horseA, memberProfileId: id(999), roleCode: "veterinarian" }],
  ["wrong horse", { horseId: horseB, memberProfileId: vetProfile, roleCode: "veterinarian" }],
  ["role mismatch", { horseId: horseA, memberProfileId: vetProfile, roleCode: "stable_hand" }],
  ["malformed horse", { horseId: "bad", memberProfileId: vetProfile, roleCode: "veterinarian" }],
  ["malformed profile", { horseId: horseA, memberProfileId: "bad", roleCode: "veterinarian" }],
  ["owner role", { horseId: horseA, memberProfileId: vetProfile, roleCode: "owner" }],
  ["stable manager", { horseId: horseA, memberProfileId: vetProfile, roleCode: "stable_manager" }],
  ["trainer", { horseId: horseA, memberProfileId: vetProfile, roleCode: "trainer" }],
  ["empty role", { horseId: horseA, memberProfileId: vetProfile, roleCode: "" }],
]) {
  check("assignment", !resolveManagedAssignmentRequest(scoped, request).accepted, `${label} denied`);
}
check("assignment", !resolveManagedAssignmentRequest({ availability: "unavailable" }, { horseId: horseA, memberProfileId: vetProfile, roleCode: "veterinarian" }).accepted, "unavailable snapshot denied");
const selfSnapshot = snapshot({ actorMemberProfileId: vetProfile });
check("assignment", !resolveManagedAssignmentRequest(selfSnapshot, { horseId: horseA, memberProfileId: vetProfile, roleCode: "veterinarian" }).accepted, "self denied");

const acceptedRevoke = resolveManagedRevocationRequest(scoped, assignmentA);
check("revocation", acceptedRevoke.accepted, "visible active assignment accepted");
check("revocation", acceptedRevoke.accepted && acceptedRevoke.assignment.horseId === horseA, "revoke horse exact");
check("revocation", acceptedRevoke.accepted && acceptedRevoke.assignment.memberProfileId === vetProfile, "revoke profile exact");
check("revocation", !resolveManagedRevocationRequest(scoped, id(999)).accepted, "forged assignment denied");
check("revocation", !resolveManagedRevocationRequest(scoped, "bad").accepted, "malformed assignment denied");
check("revocation", !resolveManagedRevocationRequest({ availability: "unavailable" }, assignmentA).accepted, "unavailable denied");
check("revocation", !resolveManagedRevocationRequest(snapshot({ assignments: [] }), assignmentA).accepted, "stale denied");
check("revocation", !resolveManagedRevocationRequest(snapshot({ assignments: [{ ...assignments[0], ends_at: "2026-08-10T01:00:00.000Z" }] }), assignmentA).accepted, "ended denied");
check("revocation", !resolveManagedRevocationRequest(snapshot({ manageableHorseIds: [] }), assignmentA).accepted, "foreign horse denied");
check("revocation", !resolveManagedRevocationRequest(snapshot({ profiles: profiles.slice(1) }), assignmentA).accepted, "foreign profile denied");

const root = path.resolve(import.meta.dirname, "..");
const source = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const server = source("lib/auth/managed-access-server.ts");
const actions = source("app/(ops)/data-entry/access/actions.ts");
const page = source("app/(ops)/data-entry/access/page.tsx");
const workspace = source("components/ops/managed-access-workspace.tsx");
const session = source("lib/auth/session.ts");
const navigation = source("lib/navigation.ts");
const narrowActions = actions.slice(actions.indexOf("function managedField"));
const adapterSource = source("lib/auth/managed-access-mutation-adapter.ts");
const contractSource = source("lib/auth/managed-access-contract.ts");
check("source", server.includes("createSupabaseServerClient"), "signed-in server client used");
check("source", !server.includes("createSupabaseAdminClient"), "no admin client");
check("source", !server.includes("service_role"), "no service role");
check("source", server.includes("partialResults: \"unavailable\""), "partial state unavailable");
check("source", narrowActions.includes("getManagedAccessSnapshot(context)"), "action rebuilds snapshot");
check("source", narrowActions.includes("resolveManagedAssignmentRequest"), "assignment uses executable contract");
check("source", narrowActions.includes("resolveManagedRevocationRequest"), "revocation uses executable contract");
check("source", !adapterSource.includes(".upsert("), "adapter avoids ambiguous upsert");
check("source", contractSource.includes('access_level: "read"'), "read access exact");
check("source", narrowActions.includes("actorAppUserId: context.appUserId"), "nominator server-derived");
check("source", page.includes("requireManagedAccessAppContext"), "page guard exact");
check("source", page.includes("assignManagedHorseAccessAction") && page.includes("revokeManagedHorseAccessAction"), "only narrow actions imported");
check("source", !page.includes("updateScopedUserLifecycleAction") && !page.includes("changeHorseOwnerAction"), "lifecycle/owner actions absent");
check("source", workspace.includes('value="veterinarian"') && workspace.includes('value="stable_hand"'), "two visible role codes");
check("source", !workspace.includes("Consultant") && !workspace.includes("Stable Manager"), "broader roles absent");
check("source", session.includes('context.primaryRole === "administrator"') && session.includes('context.primaryRole === "trainer"'), "guard role pair");
check("source", navigation.includes("opsNavigationForRole") && navigation.includes('href: "/data-entry/access"'), "role navigation composed");
check("source", workspace.includes("No protected detail is shown") && workspace.includes('role="alert"'), "generic accessible failure");

const expected = { contract: 14, snapshot: 20, assignment: 18, revocation: 10, semantic: 36, adapter: 41, source: 18 };
if (JSON.stringify(counts) !== JSON.stringify(expected)) {
  throw new Error(`Sprint 021AI managed assertion ledger drift: ${JSON.stringify(counts)}`);
}
const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
if (total !== 157) throw new Error(`Expected 157 assertions, received ${total}`);
console.log("Sprint 021AI managed-role journey assertions passed: 157/157.");
