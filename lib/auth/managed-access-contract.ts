export const MANAGED_ACCESS_ROLES = ["veterinarian", "stable_hand"] as const;

export type ManagedAccessRole = (typeof MANAGED_ACCESS_ROLES)[number];
export type ManagedActorRole = "administrator" | "trainer";

export const MANAGED_ACCESS_ROLE_LABELS: Record<ManagedAccessRole, string> = {
  veterinarian: "Veterinarian",
  stable_hand: "Stable Staff",
};

export type ManagedCandidate = {
  id: string;
  userId: string;
  displayName: string;
  roleCode: ManagedAccessRole;
};

export type ManagedHorse = {
  id: string;
  name: string;
  stableId: string;
};

export type ManagedAssignment = {
  id: string;
  horseId: string;
  stableId: string;
  memberProfileId: string;
  roleCode: ManagedAccessRole;
  accessLevel: "read";
  startsAt: string | null;
  endsAt: string | null;
};

export type ManagedAccessSnapshot =
  | {
      availability: "available";
      actorAppUserId: string;
      actorMemberProfileId: string;
      actorRole: ManagedActorRole;
      candidates: ManagedCandidate[];
      horses: ManagedHorse[];
      assignments: ManagedAssignment[];
    }
  | { availability: "unavailable" };

type RawProfile = {
  id?: unknown;
  user_id?: unknown;
  display_name?: unknown;
  is_active?: unknown;
  users?: unknown;
};

type RawHorse = { id?: unknown; name?: unknown; stable_id?: unknown };

type RawAssignment = {
  id?: unknown;
  horse_id?: unknown;
  stable_id?: unknown;
  member_profile_id?: unknown;
  role_code?: unknown;
  access_level?: unknown;
  starts_at?: unknown;
  ends_at?: unknown;
};

export const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

export function parseManagedAccessRole(value: unknown): ManagedAccessRole | null {
  return typeof value === "string" && MANAGED_ACCESS_ROLES.includes(value as ManagedAccessRole)
    ? (value as ManagedAccessRole)
    : null;
}

export function isManagedActorRole(value: unknown): value is ManagedActorRole {
  return value === "administrator" || value === "trainer";
}

function firstRelation(value: unknown): Record<string, unknown> | null {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && typeof candidate === "object" ? (candidate as Record<string, unknown>) : null;
}

function validInstant(value: unknown): value is string | null {
  return value === null || (typeof value === "string" && Number.isFinite(Date.parse(value)));
}

export function isActiveWindow(
  startsAt: string | null,
  endsAt: string | null,
  reference: Date,
) {
  const timestamp = reference.getTime();
  return (
    (startsAt === null || Date.parse(startsAt) <= timestamp) &&
    (endsAt === null || Date.parse(endsAt) >= timestamp)
  );
}

export function composeManagedAccessSnapshot(input: {
  actorAppUserId: unknown;
  actorMemberProfileId: unknown;
  actorRole: unknown;
  profiles: unknown;
  horses: unknown;
  manageableHorseIds: unknown;
  assignments: unknown;
  queryFailed?: boolean;
  reference?: Date;
}): ManagedAccessSnapshot {
  if (
    input.queryFailed ||
    !isUuid(input.actorAppUserId) ||
    !isUuid(input.actorMemberProfileId) ||
    !isManagedActorRole(input.actorRole) ||
    !Array.isArray(input.profiles) ||
    !Array.isArray(input.horses) ||
    !Array.isArray(input.manageableHorseIds) ||
    !Array.isArray(input.assignments) ||
    !input.manageableHorseIds.every(isUuid)
  ) {
    return { availability: "unavailable" };
  }

  const manageableHorseIds = new Set(input.manageableHorseIds);
  const horses: ManagedHorse[] = [];
  for (const value of input.horses as RawHorse[]) {
    if (!isUuid(value.id) || typeof value.name !== "string" || !value.name.trim() || !isUuid(value.stable_id)) {
      return { availability: "unavailable" };
    }
    if (input.actorRole === "administrator" || manageableHorseIds.has(value.id)) {
      horses.push({ id: value.id, name: value.name.trim(), stableId: value.stable_id });
    }
  }
  const horseIds = new Set(horses.map((horse) => horse.id));

  const candidates: ManagedCandidate[] = [];
  for (const value of input.profiles as RawProfile[]) {
    const user = firstRelation(value.users);
    const roleCode = parseManagedAccessRole(user?.primary_role_code);
    if (
      !isUuid(value.id) ||
      !isUuid(value.user_id) ||
      typeof value.display_name !== "string" ||
      !value.display_name.trim() ||
      value.is_active !== true ||
      !user ||
      user.id !== value.user_id ||
      user.status !== "active"
    ) {
      return { availability: "unavailable" };
    }
    if (roleCode && value.id !== input.actorMemberProfileId) {
      candidates.push({
        id: value.id,
        userId: value.user_id,
        displayName: value.display_name.trim(),
        roleCode,
      });
    }
  }
  const candidatesByProfileId = new Map<string, ManagedCandidate[]>();
  for (const candidate of candidates) {
    const group = candidatesByProfileId.get(candidate.id) ?? [];
    group.push(candidate);
    candidatesByProfileId.set(candidate.id, group);
  }

  const assignments: ManagedAssignment[] = [];
  const reference = input.reference ?? new Date();
  for (const value of input.assignments as RawAssignment[]) {
    const roleCode = parseManagedAccessRole(value.role_code);
    if (
      !isUuid(value.id) ||
      !isUuid(value.horse_id) ||
      !isUuid(value.stable_id) ||
      !isUuid(value.member_profile_id) ||
      !roleCode ||
      value.access_level !== "read" ||
      !validInstant(value.starts_at) ||
      !validInstant(value.ends_at)
    ) {
      return { availability: "unavailable" };
    }
    const matchingCandidates = candidatesByProfileId.get(value.member_profile_id) ?? [];
    if (
      matchingCandidates.length !== 1 ||
      matchingCandidates[0].roleCode !== roleCode
    ) {
      return { availability: "unavailable" };
    }
    if (
      isActiveWindow(value.starts_at, value.ends_at, reference) &&
      horseIds.has(value.horse_id) &&
      horses.find((horse) => horse.id === value.horse_id)?.stableId === value.stable_id
    ) {
      assignments.push({
        id: value.id,
        horseId: value.horse_id,
        stableId: value.stable_id,
        memberProfileId: value.member_profile_id,
        roleCode,
        accessLevel: "read",
        startsAt: value.starts_at,
        endsAt: value.ends_at,
      });
    }
  }

  return {
    availability: "available",
    actorAppUserId: input.actorAppUserId,
    actorMemberProfileId: input.actorMemberProfileId,
    actorRole: input.actorRole,
    candidates: candidates.sort((a, b) => a.displayName.localeCompare(b.displayName, "en-AU")),
    horses: horses.sort((a, b) => a.name.localeCompare(b.name, "en-AU")),
    assignments,
  };
}

export function resolveManagedAssignmentRequest(
  snapshot: ManagedAccessSnapshot,
  input: { horseId: unknown; memberProfileId: unknown; roleCode: unknown },
) {
  const roleCode = parseManagedAccessRole(input.roleCode);
  if (
    snapshot.availability !== "available" ||
    !isUuid(input.horseId) ||
    !isUuid(input.memberProfileId) ||
    !roleCode
  ) {
    return { accepted: false as const };
  }
  const horses = snapshot.horses.filter((horse) => horse.id === input.horseId);
  const candidates = snapshot.candidates.filter(
    (candidate) => candidate.id === input.memberProfileId && candidate.roleCode === roleCode,
  );
  if (horses.length !== 1 || candidates.length !== 1 || input.memberProfileId === snapshot.actorMemberProfileId) {
    return { accepted: false as const };
  }
  return { accepted: true as const, horse: horses[0], candidate: candidates[0], roleCode };
}

export function resolveManagedRevocationRequest(
  snapshot: ManagedAccessSnapshot,
  assignmentId: unknown,
) {
  if (snapshot.availability !== "available" || !isUuid(assignmentId)) {
    return { accepted: false as const };
  }
  const matches = snapshot.assignments.filter((assignment) => assignment.id === assignmentId);
  return matches.length === 1
    ? { accepted: true as const, assignment: matches[0] }
    : { accepted: false as const };
}

export type ManagedAssignmentKey = {
  horseId: string;
  memberProfileId: string;
  roleCode: ManagedAccessRole;
};

export type ManagedAssignmentPayload = {
  horse_id: string;
  stable_id: string;
  member_profile_id: string;
  role_code: ManagedAccessRole;
  access_level: "read";
  nominated_by_user_id: string;
  starts_at: string;
  ends_at: null;
};

export type ManagedMutationTarget = ManagedAssignmentKey & { assignmentId: string };
export type ManagedMutationQueryResult = { data: unknown; error: unknown };

export type ManagedAssignmentMutationAdapter = {
  findExisting(key: ManagedAssignmentKey): PromiseLike<ManagedMutationQueryResult>;
  create(payload: ManagedAssignmentPayload): PromiseLike<ManagedMutationQueryResult>;
  reactivate(target: ManagedMutationTarget, payload: ManagedAssignmentPayload): PromiseLike<ManagedMutationQueryResult>;
  revoke(target: ManagedMutationTarget): PromiseLike<ManagedMutationQueryResult>;
};

export type ManagedMutationOutcome =
  | { outcome: "assigned"; operation: "create" | "reactivate"; assignmentId: string }
  | { outcome: "revoked"; operation: "revoke"; assignmentId: string }
  | { outcome: "unavailable" };

type ExistingMutationRow = { id?: unknown; starts_at?: unknown; ends_at?: unknown };

function exactReturnedAssignmentId(data: unknown, expectedId?: string): string | null {
  if (!Array.isArray(data) || data.length !== 1 || !isUuid(data[0]?.id)) return null;
  return expectedId === undefined || data[0].id === expectedId ? data[0].id : null;
}

export async function executeManagedAssignmentMutation(
  adapter: ManagedAssignmentMutationAdapter,
  input: {
    horse: ManagedHorse;
    candidate: ManagedCandidate;
    roleCode: ManagedAccessRole;
    actorAppUserId: string;
    reference: Date;
  },
): Promise<ManagedMutationOutcome> {
  if (
    !isUuid(input.actorAppUserId) ||
    input.candidate.roleCode !== input.roleCode ||
    !isUuid(input.horse.id) ||
    !isUuid(input.horse.stableId) ||
    !isUuid(input.candidate.id)
  ) return { outcome: "unavailable" };

  const key: ManagedAssignmentKey = {
    horseId: input.horse.id,
    memberProfileId: input.candidate.id,
    roleCode: input.roleCode,
  };
  const existing = await adapter.findExisting(key);
  if (existing.error || !Array.isArray(existing.data) || existing.data.length > 1) {
    return { outcome: "unavailable" };
  }
  const current = existing.data[0] as ExistingMutationRow | undefined;
  if (
    current &&
    (!isUuid(current.id) ||
      !validInstant(current.starts_at) ||
      !validInstant(current.ends_at) ||
      isActiveWindow(current.starts_at, current.ends_at, input.reference))
  ) return { outcome: "unavailable" };

  const payload: ManagedAssignmentPayload = {
    horse_id: input.horse.id,
    stable_id: input.horse.stableId,
    member_profile_id: input.candidate.id,
    role_code: input.roleCode,
    access_level: "read",
    nominated_by_user_id: input.actorAppUserId,
    starts_at: input.reference.toISOString(),
    ends_at: null,
  };
  const target = current ? { ...key, assignmentId: current.id as string } : null;
  const mutation = target
    ? await adapter.reactivate(target, payload)
    : await adapter.create(payload);
  if (mutation.error) return { outcome: "unavailable" };
  const returnedId = exactReturnedAssignmentId(mutation.data, target?.assignmentId);
  return returnedId
    ? { outcome: "assigned", operation: target ? "reactivate" : "create", assignmentId: returnedId }
    : { outcome: "unavailable" };
}

export async function executeManagedRevocationMutation(
  adapter: ManagedAssignmentMutationAdapter,
  assignment: ManagedAssignment,
): Promise<ManagedMutationOutcome> {
  const target: ManagedMutationTarget = {
    assignmentId: assignment.id,
    horseId: assignment.horseId,
    memberProfileId: assignment.memberProfileId,
    roleCode: assignment.roleCode,
  };
  const mutation = await adapter.revoke(target);
  if (mutation.error) return { outcome: "unavailable" };
  const returnedId = exactReturnedAssignmentId(mutation.data, target.assignmentId);
  return returnedId
    ? { outcome: "revoked", operation: "revoke", assignmentId: returnedId }
    : { outcome: "unavailable" };
}
